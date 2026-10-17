# C Target (`source/targets/genC.hexa`)

`class GenCxx` — generates **C with C++ compatibility** (`cpp: Bool` toggles `spawn()` vs `spawnCpp()`).
Some features require C11. Input is `NiceProject` (post-`Normalizer` + `ArcInserter` IR),
output is a single C file (`\r\n` line endings) assembled from string-buffer sections.

Entry: `perform(normalizer, target, options) -> stringify(target)`.
Option: `extraUnderscore` (adds `__link` prefix for `_link` names — LLVM 32-bit linker workaround).

Runtime prologue/epilogue comes from disk, not from the generator itself:

- `header` = `library/cxx/hexa.c` + `extern "C" {` guard (`HEXA_NEW`, `HEXA_FREE`,
  `HEXA_LINK(name) asm(name)`, `HEXA_MAIN`, `HEXA_UNREACHABLE`, `true_`/`false_`,
  `Any_` forward, platform includes).
- `Defaults` = `library/c/hexa.c` (currently only `HEXA_UNREACHABLE` body).
- `String`/`Array`/`Map` runtimes (`String_$combine_`, `String_$fromInt32_`,
  `Array_$new_`/`$from_`, etc.) are **assumed to exist** — they are not emitted here.

## Output assembly (`stringify`)

Single `return` concatenates sections in fixed order (all are `[String]` ropes joined at the end):

```
header.join('\n')
+ '// Forward\n'           + forward.join('\n')            // struct Foo_; typedef...; #define; #include; String_N decls
+ '// Typedef functions\n' + typedefFunctions.join('')    // closure/func-pointer typedefs _$N
+ '// Forward functions\n' + forwardFunctions.join('')     // Class_$method_; Enum_$method_; _$temp;
+ '// Types\n'             + types.join('')                // struct bodies + vtables + static-method inline decls
+ '// Global variables\n'  + globalVariables.join('')     // Class_$var_; globals
+ '// Global functions\n'  + globalFunctions.join('')     // lambdas/closures _$N bodies
+ '// Defaults\n'          + library/c/hexa.c
+ '// Statements\n'        + out.join('') with %%%HEXA_STRINGS@@@ expanded
```

`out` holds everything else: complex-enum factories, `$this_`/`$new_` pairs,
method bodies, static methods, global functions, and finally `HEXA_MAIN`.

Note: there is a large **dead-code block after the `return`** (legacy `_x`-prefixed
emitter). It is unreachable. It documents an older naming scheme, keep for archaeology
until deleted.

## Configuration

- `memory64: Bool` + `defaultCallingConvention: String` are derived from
  `project.memory`: `Modern64` → `''`, else `'__stdcall '` + `memory64 = false`.
  On x64 always fastcall; on Win32-i686 stdcall is the default (matches Win32/COM).
- `globalAccessor = ''`, `nativeIterators = false`.
- `currentReturnType: Type?` — thread for `return` conversions (`printTypeConverter`).
- `thisArgument: String?` / `customThis: String?` — thread for `$this` (`Foo_* $this`)
  vs `this` inside methods vs `$this_` initializers.
- `tabs: String` + `pushTab()`/`popTab()` — indent state for `printBlock`/`printStatement`.
- `metaBlock: [String]` + `tempId: Int` — hoisted temporaries for side-effect-once
  evaluation (see Meta blocks below).
- `declarationsOfStringsMap: [String:Int]` + `declarationsOfStrings: [String]` —
  interned string literals (`''` = id 0, `'null'` = id 1 pre-registered).
- `duplicates: [String]` — local dedup guard for `struct Foo_;` forwards.

## Name mangling

- Class member `Foo.bar` → `Foo_->bar_`, static `Foo.bar` → `Foo_$bar_`.
- Method `Foo.m()` → `Foo_$m_(Foo_* $this, ...)`, ctor split into
  `Foo_$this_(Foo_* $this, ...)` (field inits + body, returns `$this`) and
  `Foo_$new_(...)` (`HEXA_NEW(sizeof(Foo_))` + vtable bind + forward to `$this_`).
- Global `f` → `f_`, local `x` → `x_`, anonymous function → `_$<tempId>`,
  interned string literal → `String_<id>` (+ `String_<id>_` wide literal).
- Generic instance `Foo<Bar,Baz>` → `Foo_$Bar$Baz_*` (`omitPointer(stringifyType(param, prefixNull:true))`
  joined by `$`; trailing `_` kept as `Name_*`).
- Function type → fresh `typedef ... (_$N)(args);` in `typedefFunctions`, use site refers `_$N`.

## Type mapping (`stringifyType`)

- Primitives: `Int→int32_t`, `Int8/16/32/64`, `UInt8/16/32/64`, `Float→double`,
  `Float32→float`, `Bool→Bool_` (3-state `uint8_t`: `true_ 1`, `false_ 0`, null `2`),
  `Void→void`, `Bool32→int32_t`, `Bool8→uint8_t`.
- `Any→Any_*` (`struct Any_*`), `Generic→Any_*`, `null Type→Any_*`.
- `Nullable<T>`: numerics become value+flag structs (`int32_t$`, `Null$UInt64`,
  `Null$Int64`, `Null$Float64`/`Null$Float`, `Null$Float32`); else erased to inner name.
  `prefixNull:true` forces `Null$Name` for generic args.
- `@rename('CName')` / `@struct`+`@byValue` honored: `s` vs `s*`.
  Must be `@struct` to be `@byValue`, else throw.
- `ByValue<T>` → `omitPointer(stringify(T))`; `ArrayByValue<T,N>` → `T[N]`-ish
  (`stringify(T)[stringify(N)]`); `ConstArrayPointer<T>` → `const T*`,
  `ArrayPointer<T>` → `T*`.
- `ClassInstance` with generics → mangled name above; without → `Name_*`.
  `Class→Name_*`. `Enum` with `fieldsTypeSimple` → inner type (or `@castTo`),
  else `Name_*`; `EnumInstance` unwraps to `Enum`.
- `Function(args,returns)` → fresh `typedef` (respects `defaultCallingConvention`),
  returns `_$N`. `Constant(v)→v`.
- `stringType(NodeType)` / `printType(NodeType)` is legacy syntactic path, mostly `void*`/`_xName`.

## Object model

- Every non-`@struct` / non-`StructureNoVirtual` class:

  ```c
  struct Foo__ { <ret> (*const m_) (Foo_* $this, ...); ... }; // vtable type
  struct Foo_ { const struct Foo__ * const _; <fields> };     // instance, vtable first
  const struct Foo__ Foo__$ = { &Foo_$m_, ... };               // vtable value
  ```

  Empty vtable gets `uint8_t padding_;` (C `struct{}` is size 0, C++ size 1).
- `@struct`/`@union`/`@packed`/`@bits(N)` read from `project.mapDecorators`:
  `union` vs `struct`, `#pragma pack(1)/pack()`, `T name_ : N;` bitfields.
- `@struct` methods are still emitted as `Foo_$m_` + vtable slot today (see Questions).
- Fields: `stringifyType(T) name_;`, except `ArrayByValue` inline-expanded to
  `T name_[N];` (pop + repush hack). Missing `toString` gets synthesized
  `Foo_$toString_(Foo_* this_) { return String_<"[object Object]">; }`.
- `externals` (`c.external`): `@require('#include...')` (`jsRequire`) injected into
  `forward`; `@rename` (`jsNative`) becomes `#define Orig Renamed`; `Any`/`Bool`
  skipped; `template` skipped with `console.log`.
- Simple enums: only `struct Name_;` forward (+ statics as `Name_$x_` globals/functions);
  values themselves emit nothing. Complex enums: `struct Name_ : Unknown_` shape with
  `Any_** enum_; uint16_t is_; uint8_t length_;`, per-tag factory
  `Name_$Tag_(...) { HEXA_NEW; length_; HEXA_NEW(enum_); is_=i; enum_[k]=toAny(arg); }`.

## Functions and globals

- `printFunctionArguments(args, funcType, variadic)`: `(T a_, ...)` from
  `Type.Function(types,_)`, prepending `thisArgument` (`Foo_* $this`) when set;
  `()` → `(void)`; `NativeVariadic` drops last arg, appends `...`.
- `printFunctionReturnType` / `getFunctionReturnType` unwrap `Type.Function`, else `void`.
- `printFunctionBody(s, returns)`: appends `return 0;` for non-`void` scalar/pointer
  returns (stack-corruption guard for falling off end).
- Global funcs honor `NiceLink`: `rename`, `linkName→ HEXA_LINK("name")`
  (with `extraUnderscore` `HEXA_LINK("_name")` for dllexport `_x`), `dllimport/dllexport`,
  `emitHeader`, `customHeader` (verbatim override), `convention` (`__fastcall/__cdecl/__stdcall/default`),
  `aligned(N)`. Declaration goes to `types` if `expr==null` or `shouldEmitHeader`;
  definition goes to `out` via `printFunctionBody`.
- Global vars go to `globalVariables` as `T name_;` (+ `HEXA_LINK`, `aligned`, `dllexport`);
  initializers run inside `HEXA_MAIN` (except `ArrayByValue`/`ByValue` aggregate `{...}`
  initializers which emit at declaration). Zero-int fast path: `(int32_t)0` initializers
  are skipped (C zero-inits globals; avoids Heap-offset-after-strings bug — see comment).
- `HEXA_MAIN(int argc, char **argv)`: expands `%%%HEXA_STRINGS@@@` to
  `String_$root_ = String_$new_(); String_N = String_$fromUTF16z_(String_N_);...`,
  then static-var inits (simple/complex enums, classes), global var/const inits,
  then `printStatement(project.init[0])` (throws if `init.length > 1`), then
  `fflush(stdout); return 0;`.

## Statements

- `Block`: `{` + `metaBlock`-aware per-line emit (`printMetaBlock` drains hoisted
  `metaBlock` lines before the statement, joined `;\n<tabs>`), `;`-terminated.
  `printBlock` collapses singletons to `{ s; }`, `{}` for empty.
- `Statements` is flat `\n<tabs>s;` list. `Var/Const`: `T x_ = converter(init);`
  with `ArrayByValue` (`T x_[N] = {...}` / `"..."` / `L"..."` / `wchar_t` string forms,
  throws on overlong/no-init) and `ByValue` (`T x_; ` + deferred `$this_(&x_)` note) specials.
  `Const` delegates to `Var` path (first `return` is live; second is dead).
- Local `Function` (closure literal as statement): fresh `_$temp` global function
  (`forwardFunctions` decl + `globalFunctions` body with `tabs=''`), use site is
  `FuncType name_ = _$temp` — **no environment** (see Questions).
- `Return(e)`: `return converter(e, getType(e)→currentReturnType)`.
- `If`: `if (c) {then} else {else}` (block-forced then-branch).
- `Call(_,_,_,VirtualMethod)` as statement: temp-spill receiver
  (`T _$t = recv` in `metaBlock`), then `_$t->_->m_(_$t, ...)` (or `Omits$ m_` for structs).
- `Try`: `_try { struct Any_* $try = 0; body } $catch: ; } _catch(T _xV) { handler }`
  (single-catch shape; `t[0]/v[0]/catches[0]` only).
- `Assign(Dot(...))`: `Any`/untyped receiver → `-> $set(String_N, toAny(v))` or
  `->let_(String_N)` reads; `Class TitleCase` receiver → `Recv_$field_ = init`;
  `Index` on non-`Array` → `recv[idxConv] = v`, on `Array` → `recv->set_(i,v)` call.
  Else `a = init(aType, v)`.
- `Assignop`: `String +` → `String_$combine_`; `Index += String` spills index+storage
  temps and does `set(get+append)`; else `a <op>= b`.
- `While(pre)` → `while(c) s` / `do{s}while(c)`; `Increment/Decrement` postfix;
  `For` is `FIXME TODO` stub (`for (Any_* x_; over;) body`).
- `Switch`: lowered to `{ T switch_ = v; if (switch_==c...) {...} else ... }`
  (`Null→switch_==-1`). `guards`/`binds` ignored; second half of the `case` is dead
  code after the first `return r + '}'` (real C `switch` emitter, unreachable).
- Unknown → `console.error + console.trace`.
- `RefInc/DeferRefDec` (from `ArcInserter`) have **no case** → fall into unknown (see Questions).

## Expressions and conversions

- `This→customThis ?? 'this'`, `Ident→name_` (verbatim if `project.native`),
  `Null(of)` → `int32_t$null` / `uint32_t$null` / `int16_t$null` / `uint16_t$null` /
  `int8_t$null` / `uint8_t$null` / `(uint8_t)2` for `Bool`, else `nullptr`.
- `Int→(int32_t)v`, `MetaInt` per kind, `Float→(double)v(.0)`, `True/False→true_/false_`.
- `String(s)`: intern via `declarationsOfStringsMap` → `String_<id>`; escape loop handles
  only `' " \n \r \\` (see Questions); registration defers `String_<id>_` wide literal
  to `forward` at `HEXA_MAIN` expansion time.
- `Dot`: `toZeroOrOne` on `Bool` is identity; `ByValue.ref/pointer→(&e)`,
  `ArrayByValue.ref→(&e[0])`, `address→(size_t)&(e)/(e)`; `This→this->x_`;
  `TitleCase` ident → `Id_$field_` static; `Any` → `->let_(String_...)`;
  `fieldRenames.includes(name)` → `->name` verbatim else `->name_`.
- `Call Static/Function` → `f(args)`; `VirtualMethod Dot` → spill receiver temp,
  `offsetItems[_Back]` on `(Const)ArrayPointer` folds to `(recv)+(arg)`,
  struct → `Recv$m_(_$t,...)`, else `_$t->_->m_(_$t,...)`.
  `expects:[Type]` drives per-arg `printTypeConverter`.
- `Function/Arrow` expressions: same fresh-`_$temp` global as statements (no captures).
- `New(result)`: struct → `Name$this_((Name*)HEXA_NEW(sizeof(Name))[, args])` or bare
  `HEXA_NEW` if external; class → `Omit*$new_(args)`.
- `Array([])→Omit$new_(0)`, else `Omit$from_(Omit$new_(n), (T[]){...})`;
  `Map→Type$from_(Type$new_(), n, (K[]){...}, (V[]){...})`; `Object→Object_from(k,v,...)`.
- `Binop`: `==/!=` on `Null$UInt64/Null$Float32` → `equalNull$X(a,b)` (+`!`);
  `+` with either side `String` → `String_$combine_` (+converter);
  `IntegerDivide→/`; else infix.
- `Index`: non-`Array` → `recv[intConv]`; `Array` → `recv->get_(i)` virtual call.
- `If` expr → `(c)?(a):(b)`; `EnumTag(e)→(e==0?-1:e->is_)`;
  `Enum(t,tag,_,args)→Type_$Tag_(args)`; `EnumParameter→e->enum_[i]`.
- `NativeOperator`: `Infix→((a)s(b))`, `Function→s(args)` (`*sizeof/&sizeof` → `sizeof`),
  `Prefix/Postfix` parenthesized. `UnsafeBitCast→converter`.
- `printInitializer(T,v)`: `ArrayByValue [0]→{0}` single-element fast path, else converter.
- `printTypeConverter(s,from,to)` (the big matrix): identity; `UInt16→Int` cast;
  `Bool↔Any` via `Any_fromBool/->_toBool()`, `Any→Int/Float` via `->_toInt/Float()`,
  numerics→`String` via `String_$fromInt32/UInt64/Int64/Bool_`; `String→ConstCharPointer→bytes_`,
  `→(Const)ArrayPointer→bytes_` (`ClangWideChar→(wchar_t*)bytes_`); any non-`Any`→`String`
  via `Clean$toString_(s)`; `→Any` via `printToAnyConverter`; nullables:
  `T?←T?` identity/`toNull$UInt64`/bit-cast, `T?←T` wrap (`(int32_t$)`, `(Null$U64){v,1}`...),
  `null→T?/T` sentinels (`int32_t$null`, `(Null$U64){0,0}`, `(Null$F64){0.0,0}`, `Bool 2`,
  `ClangWideChar (wchar_t)0`), `T←T?` unwrap (`.value_` for U64/F64/F32, `(int32_t)(s)` for Int);
  struct `ByValue→struct*` via `&(s)`, `ByValue→ByValue` via `*(T*)&(s)`;
  `UInt32←ptr` via `(uint32_t)(size_t)(s)`; fallback `(To)(s)`.

## Strings, interning, init order

- `registerString('')/.set('',0)`, `registerString('null')/.set('null',1)` seed the table.
- First print of a literal interns (`charsOut.join`) and returns `String_<id>`;
  the `forward` entry `String_* String_<id>; static const wchar_t *String_<id>_ = L"...";`
  and the `HEXA_MAIN` line `String_<id> = String_$fromUTF16z_(String_<id>_);` are emitted later —
  so **all literals must be printed before `HEXA_MAIN` strings section is frozen**
  (comment in file: gather after ALL expressions printed).

## Open questions (unclear from `genC.hexa` alone)

### 1. Closures — where is the environment?
- `Statement.Function` and `Expression.Function/Arrow` all lower to a plain top-level
  `_$temp(args)` with no hidden env parameter and no capture struct. `docs/native.md`
  promises `Closure{ x,y }` + `ClosureFunc(Closure*,z)` + `$funcPtr/$closure` split and
  `@noCapture` wrappers. None of that appears in `genC.hexa`.
- Q: does `Normalizer` lambda-lift/curry captures into explicit params before `genC`
  runs? If so, where is the capture list stored (`NiceProject` has no closure field;
  `normalizer.md` lists "Transfer closures information" as TODO)? If not, are closures
  with captures currently miscompiled to capture-less functions?
- Q: how should `Arrow` (single-expr body wrapped as `Return`) vs `Function` vs
  `isAsync` differ in C? `isAsync` is ignored. Is `async` rejected in typer for C,
  or silently emitted as sync?
- Q: what is the intended ABI for a capturing `Type.Function` value (`typedef _$N`
  has no env param)? Should it become `(env*, args...)` + fat-pointer pair, or
  `struct { func*, env* }`? How do `CallKind.Function` vs `VirtualMethod` calls pass it?

### 2. ARC — intentionally leaked, or wired elsewhere?
- `data/nice.hexa` defines `RefInc/DeferRefDec`; `compiler/normalizing/arc.hexa`
  inserts them (locals, params, rvalue call-args via `temp_call_arg`, reassign via
  `temp_old`, `Assignop` desugar). `genC.hexa` has **no `case RefInc/DeferRefDec`**
  in `printStatement` — they hit `Unknown statement kind`.
- Q: is C currently GC-less/leak-by-design (rely on `HEXA_NEW` + process exit), with ARC
  only honored by another target? Or should `genC` emit `$ref/$unref` (the commented-out
  `virtual abstract $unref/$ref` hints at this) / `HEXA_FREE` + `defer` on scope exit?
- Q: what are the intended retain/release semantics for: params on entry, locals on scope
  exit vs `defer`, rvalue temps, `return` values (borrow vs +1), enum payloads
  (`enum_[]`), `Array`/`Map` elements, `String_<id>` globals, exceptions (`$try`)?
- Q: `needsARC` returns true for **any** `ClassInstance` (including `@struct` pointers
  and `ArrayPointer`?). Should structs/pointers/by-value really be refcounted? How do
  `@weak`, cycles, and thread-safety (`target-llvm.md` lists them) map to C?

### 3. Reflection / dynamic `Any`
- `Dot` on `Any` → `->let_(String_$fromUTF16z_(L"name"))`, `Assign` → `->$set(String_N,toAny(v))`,
  `Index` on `Array` → `->get_/set_`. Where is the metadata (field offsets, method table
  for arbitrary `Any`)? Is `let_/$set/get_/set_/_toBool/_toInt/_toFloat` part of `Any_`
  vtable? Not visible in `hexa.c` stub (only `struct Any_ {};`).
- Q: how are `Is(e,t)` / `as` / `RemoveNullability(!)` / `Elvis` supposed to codegen in C?
  `genJs` has `instanceof` logic; `genC` has no `Is` case. Same for `Object` literals
  (`Object_from` — defined where?) and `Map` key equality/hashing.
- Q: is dynamic access monomorphic (direct `->field_`) when typer knows the class, and only
  `Any`-typed receivers go dynamic? What about `Unknown/UnknownNullable` receivers?

### 4. Exceptions
- `Throw→_throw(e)`, `Try→_try{...Any_* $try...}$catch:_catch(T _xV){...}`. Neither
  `_try`/`_catch`/`_throw` nor `$try` propagation checks ("test $try for null at each call
  and goto $catch" TODO) exist in `library/cxx/hexa.c` / `library/c/hexa.c`.
- Q: is the plan C++-ABI exceptions (`throw/catch`, `native.md` says compatible) when
  `cpp==true`, and `panic/abort` (`HEXA_UNREACHABLE`/`ExitProcess`) in pure C? How are
  multiple `catches`, `finally`/`defer`, ARC cleanup on unwind, and `HEXA_MAIN` top-level
  handler supposed to compose?
- Q: what is `$try` (the commented "transfer &$try as function argument")? Hidden
  out-param for thrown value vs thread-local?

### 5. Inheritance, interfaces, virtuals
- `NiceClass.extend/implement/implementParams`, `interfaces`, `api`, `usedByValueDepth`,
  `genericParams/implementationForGenericParams` are read only for skipping (`useless`,
  `template`, `external`). Vtables are flat per-class `Foo__$ = { &Foo_$m,... }`, no parent
  chaining, no `extends` emit, `super` (`SuperConstructor`) has no C case.
- Q: is single inheritance + interfaces unimplemented for C (all calls devirtualized to
  `Foo_$m_`)? What is the intended layout (vtable prefix, thunk, interface table)?
  What does `ClassBinaryInterface.StructureNoVirtual` vs `Normal` guarantee for ABI?

### 6. Nullables and value types
- `printValueToNullableConverter` / `printNullableToValueConverter` are `%...%` stubs.
  `Null` literal and `printTypeConverter` enumerate sentinels per type (`int32_t$null`,
  `(Null$U64){0,0}`, `Bool (uint8_t)2`, `(wchar_t)0`) but where are `Null$Int32`,
  `int32_t$`, `Null$Float...` **defined**? Not in `hexa.c`.
- Q: what is the canonical ABI: `{ value_, has_ }` struct vs sentinel vs separate flag?
  How does `if let` unwrap codegen (`.value_` + `has_` check vs `!=null`)? How are
  nullable structs / `ByValue?` / `ArrayByValue?` / `String?` / `Any?` represented?
- Q: `omitPointer` + `prefixNull:true` for generic args — is `Foo<Bar?>` supposed to
  mangle differently from `Foo<Bar>`? Who instantiates `Foo_$..._` bodies (normalizer
  monomorphization vs C `typedef hexa<...>` TODO at top)?

### 7. Strings / interning
- Literals become `L"..."` with a 4-case escaper (`' " \n \r \\`). What about `\0 \t`,
  backslash-end, non-ASCII/UTF-16 surrogates, embedded `"` breaks, `//` inside literal?
  `String_199` debug `throw 'bye'` suggests a known bad case — which one?
- Q: who owns `String_<id>` (refcount? immortal globals after `String_$root_`?)?
  Where are `String_$fromUTF16z_/fromInt32_/combine_/fromBool_/fromNullableInt32_` and
  `->bytes_` caching (`utf8/utf16`) defined for C? UTF-16 (`wchar_t` 16-bit vs 32-bit
  platform `wchar_t`?) vs UTF-8 interop (`ClangString` adaptation in `native.md`)?
- Q: `String_$combine_` in `Assignop`/`Binop(Add)` — does it allocate a new ref (+1) and
  who releases the old LHS? Same for `Index += String` `set(get+append)` path.

### 8. Enums
- Simple enums emit no values — how do `==`, `switch`, `@flags`, `@castTo`, and
  `EnumTag(null → -1)` work without constants? Is `nativeEnums` (genJs flag) planned for C?
- Complex enums `HEXA_NEW` per construction + `HEXA_NEW(enum_)` per payload, `is_:uint16_t`,
  `length_:uint8_t` (max 255 args?), `Any_**` payload via `toAny`. Who retains/releases
  elements? How are `EnumParameter` out-of-range, `switch` with `guards`/`binds`
  (ignored in C lowering), and exhaustive `default` supposed to behave?
- Q: should simple/complex enums lower in `Normalizer` to ints/structs before `genC`
  (like `Switch` TODO "do it in normalizer"), or should `genC` grow guard/bind support?

### 9. Structs, pointers, arrays-by-value
- `ArrayByValue` decl-init supports `T x_[N]={...}` / `"..."` / `L"..."` but expression
  `printInitializer` only handles `[0]→{0}`; assignment `arr=[...]` / `arr=copy` /
  `[...x]` fill / `[...i=>...]` (per `native.md`) has no path. `ByValue` local is
  `T x_;` with a "Just print `init(&x_)`" comment but no call emitted.
- Q: where is stack-vs-heap tracking (`@heap`/`@local`, escape analysis) enforced —
  typer/normalizer or `genC`? Who calls the struct dtor / `HEXA_FREE` for
  `New(struct)` vs `@heap` vs `ByValue`? What is `usedByValueDepth` ordering for
  (incomplete-type forward problem) and why isn't `genC` using it yet?
- Q: `ref/address/pointer/pointerToSelf` + `offsetItems` folding are special-cased by
  class **name** (`ByValue`, `ArrayByValue`, `(Const)ArrayPointer`). Is that robust
  against `@rename`? What about `first/address/pointerToSelf` fields on `ArrayPointer`?

### 10. Globals, entry, linking
- Only `project.init[0]` is emitted (throws if `>1`). What creates multiple inits,
  and what is the intended cross-module init order (vs `delayedInits` in genJs)?
- Q: why do static/global initializers run **inside** `HEXA_MAIN` after string bootstrap
  instead of at declaration (`int a=123;` TODO in file)? Which initializers are
  compile-time-constant-safe vs need runtime (`String_<id>` heap offsets — the
  "zero global integers" bug comment)?
- Q: `NiceLink` surface (`dllimport/dllexport/emitHeader/customHeader/convention/aligned/linkName`)
  + `HEXA_LINK(asm)` + `extraUnderscore`: what compilers support `asm("name")` in C mode
  (`gnu17` note) vs MSVC (define empties it)? How do `customHeader` + `dllexport` errors,
  `@restrict/@volatile` (documented in `native.md`, absent in `genC`), and header-generation
  mode ("will not generate headers until explicitly requested") fit together?
- Q: `defaultCallingConvention` is `__stdcall` for all 32-bit — including internal
  `Foo_$m_`/`_$temp` calls? Should internal calls stay fastcall/cdecl with only
  FFI boundaries stdcall, or is uniform stdcall intended?

### 11. Misc file-internal TODOs that need owner decisions
- `typedef hexa<SomeType> $SomeType;` speedup; `duplicates` forward-dedup workaround vs
  proper symbol table; `addLicenseNoticeToOutput` rename comment; `printFunctionBody`
  unconditional `return 0` (wrong for `struct`-by-value / `void`?); `metaBlock`
  rope-promotion; `printCallArgumentsVirtual` missing `expects` in struct path;
  `console.log('template'/'duplicate')` noise; `String_199` / `ConstCharPointer` debug throws.
- Q: can the dead `_x`-prefixed emitter after `return` be deleted now, or does some
  test still diff against it (`genC.diff.txt` in repo root)? Same for the unreachable
  second `Switch` (real C `switch`) — which lowering is canonical?

## How to read this file next to the others
- `source/data/nice.hexa` — the IR (`Statement`/`Expression`/`NiceClass`/`NiceLink`/etc.)
  `genC` pattern-matches on.
- `source/compiler/normalizer.hexa` + `source/compiler/normalizing/arc.hexa` — what IR
  shape `genC` can assume (closures? ARC nodes? `Switch` guards/binds?).
- `source/targets/genJs.hexa` — the reference dynamic semantics (`instanceof`,
  `delayedInits`, `Enum_N` arrays) to port to static C.
- `library/cxx/hexa.c` + `library/c/hexa.c` + `library/c/*.hexa` — the runtime `genC`
  assumes (`HEXA_*` macros, `Any_/String_/Array_/Map_` ops, nullable structs).
- `docs/native.md` — the promised native ABI (closures, structs, strings, flags, spans)
  that `genC` must eventually honor; `docs/target-llvm.md` — sibling native TODOs.
