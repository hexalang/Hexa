# C Target (`source/targets/genC.hexa`) — future-work guide

- Keep edits to this doc as small bullet-point diffs (one bullet per fact/decision).
- Small diffs keep reviews fast; avoid rewording untouched lines.
- This doc is a **guide for future work**, not just a description of today.
First half is reference (what `genC` + `Normalizer` + `Nice` + `ArcInserter` actually do,
verified against source). Second half is **actionable TODOs** implementing the binding
architecture decisions below. Checkboxes are work items; bullet `Q:`s under each TODO are
the implementation questions that must be answered while doing that item.

`class GenCxx` generates **C with C++ compatibility** (`spawn()` vs `spawnCpp()`; some
features require C11). Input is `NiceProject` (`source/data/nice.hexa`) from
`Normalizer.normalize()` (`source/compiler/normalizer.hexa`); output is one C file
(`\r\n`). Entry: `perform(normalizer, target, options) -> stringify(target)`.
Option: `extraUnderscore` (LLVM 32-bit linker workaround).

Pipeline fact (`source/main.hexa`, ~L810-843): `Main` copies
`generator.nativeEnums / nativeIterators / globalAccessor / keywords` into the `Normalizer`,
calls `normalize()`, then `generator.perform(normal, target, options)` directly.
**`ArcInserter` (`source/compiler/normalizing/arc.hexa`) is currently disconnected**
(no `new ArcInserter` / `insertArc()` call site). `genC` sets `nativeIterators = false`,
`globalAccessor = ''`, `nativeEnums` stays default `false`.

Runtime prologue/epilogue comes from disk:

- `header` = `library/cxx/hexa.c` + `extern "C" {` (`HEXA_NEW/FREE/LINK/MAIN/UNREACHABLE`,
  `true_/false_`, `Any_` forward, platform includes).
- `Defaults` = `library/c/hexa.c` (only `HEXA_UNREACHABLE` body today).
- `String/Array/Map` ops (`String_$combine_`, `Array_$new_/$from_`, ...) are **assumed**,
  not emitted here.

## Binding architecture decisions (do not re-litigate without compiler-dev sign-off)

### D1. Function values are two variables, never a struct
- A Hexa function value is **two C values**: raw C function pointer + closure-object pointer.
- No `{funcPtr, objRef}` mini-struct: not every C/C++ compiler optimizes struct passing.
- C callee takes env as **first** argument (`f$ptr(f$env, args...)`).
- A param of function-reference type expands to **two C params** (`f$ptr`, `f$env`).
- In objects, a method-typed field is **two fields** (`name$f_`, `name$e_` or equivalent).
- As locals/params, a function value is **two locals** (never a two-field struct value).
- Default (no decorator) is fat even when the target captures nothing: `genC` emits a thin forwarding wrapper paired with the sentinel env (D2), so all call sites use one uniform fat-call shape (two call shapes only if we keep the `native.md` zero-overhead direct-call optimization — see F1-Q).
- A return of function-reference type expands to **`void**` out-param for the code pointer + return value is the closure ref** (unifies ARC: only the returned ref is ref-counted, no fake countable arg).
- Capturing-function reference accepting a non-capturing function: compiler generates a **thin wrapper** that calls through.
- Non-capturing references accept **only** non-capturing functions (typer-enforced).
- `@noCapture` stays single raw pointer for C ABI.

### D2. All nulls are sentinels, never raw zero for managed refs
- Every `null` of managed/nullable/fat-pointer type is an **addressable sentinel**.
- `Bool` as `Any` uses **two global sentinel objects** (one for `true`, one for `false`).
- `Bool`/`BigInt` stay stored **plainly** (not as heap objects) until converted to `Any`.
- `as Any` conversion must preserve **referential equality**: `((true as Any) == (true as Any)) == true`.
- `BigInt` as `Any` needs **interning similar to `String`** (see `library/c/string.hexa` dedup via `root`/`next`).
- ARC over any sentinel is **effectively a no-op** (doing ARC over it IS safe).
- Null sentinel is **singular for the whole app** and shared between DLLs/`.o` in the future.
- Sentinel gets a **huge refcount** but the manager never checks it for deallocation (if implementable).
- Sentinel carries placeholder data + vtable (for reflection), page-aligned, **4096 bytes total**.
- This avoids null-check branches on the hot path (classic `if obj != null obj.rc++` goes away).
- Same shape applies to other sentinels (`Bool`, etc).
- `genC` today emits a mix (`nullptr`, `int32_t$null`, `(uint8_t)2`, ...). F2 unifies this.

### D3. ARC = `RefInc` immediately followed by nearby `DeferRefDec`
- Ownership rule: whenever `arc.hexa` retains an object (passing/assigning/storing it does `rc++`
  via `RefInc`), it **immediately nearby** emits the matching release (`DeferRefDec`) for the
  end of the enclosing scope. The release always applies to the **second half of the fat pointer**
  (closure-or-`this`-for-methods-or-sentinel object ref) — never to the raw code pointer.
- `RefInc/DeferRefDec` take `[Expression]` (lists, so params/locals can be batched) and are
  inserted by `ArcInserter` **after** `Normalizer`, operating purely on `Nice` IR.

### D4. `DeferRefDec` lowers to RAII `defer` in `genC`, so unwinding is exception-safe
- Plain C has no unwinding hook: a manually emitted `rc--` at scope end is skipped by
  `return`/`break`/`continue`/`throw` paths. C++ does (destructors run during stack unwinding).
- So `genC` must lower each `DeferRefDec([o...])` to a **defer-like RAII statement**: an object
  whose destructor performs the `rc--`. Then normal returns **and** C++ exception unwinding both
  release. This is why D5 is required.
- Scope discipline: RAII guards are emitted in the same `Block` that owns the `RefInc`, in LIFO
  order (last declared, first released). `metaBlock` temps and IIFE boundaries need explicit rules (F4).

### D5. C++ exception mechanism is required for ARC; pure-C output panics
- ARC without unwinding-safe release leaks (or double-frees) on throws. C offers nothing
  compatible (`setjmp/longjmp` don't run cleanups; error-code threading would require rewriting
  every call site and still wouldn't compose with ARC temps). Hence: **`cpp == true` uses the
  C++ exception ABI** (`throw/catch`, RAII guards participate); **pure C keeps today’s
  panic behavior** (`HEXA_UNREACHABLE` / `abort`) and ARC is best-effort/leak-tolerated there.
- `_try/_catch/_throw/$try` stubs in `genC` today are placeholders for this split (F5).

## Reference I — output assembly (`stringify`)

```
header.join('\n')
+ '// Forward\n'           + forward.join('\n')      // struct Foo_; typedef...; #define; #include; String_N decls
+ '// Typedef functions\n' + typedefFunctions.join('') // func-pointer typedefs _$N (→ fat-pointer typedefs, F1)
+ '// Forward functions\n' + forwardFunctions.join('') // Class_$method_; Enum_$method_; _$temp;
+ '// Types\n'             + types.join('')          // struct bodies + vtables + static decls
+ '// Global variables\n'  + globalVariables.join('') // Class_$var_; globals (→ fat fields are pairs, F1)
+ '// Global functions\n'  + globalFunctions.join('') // lambda bodies _$N (→ env-first signatures, F1)
+ '// Defaults\n'          + library/c/hexa.c
+ '// Statements\n'        + out.join('') with %%%HEXA_STRINGS@@@ expanded
```

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
`out` = complex-enum factories, `$this_/$new_` pairs, method/static/global bodies, `HEXA_MAIN`.
Dead code after `return` (legacy `_x` emitter) is archaeology — delete per F8.

## Reference II — what `Normalizer` guarantees `genC`

- **Single init.** One `Block(init)` in `niceProject.init` (per-file `Block(initial)`s inside).
  `genC`'s `init[0]` + `length > 1` throw is a future-guard. Order = `moduleInfo` order.
- **Class order.** Stable sorts: externals/non-inherited first, then `usedByValueDepth`
  descending. `genC` relies on it (+ local `duplicates` guard), does no depth sort itself.
- **Names.** Scope-aware `unique` + `parentNames` + `renameClassFields` upfront; globals get
  `globalAccessor + name` (`''` for C); `getClassDotField`/`getNative` resolve renames.
- **Const prop + folding.** `inline[]` for literals, `Var→Const` promotion, `"a"+"b"`, `1+1`,
  `Bool` logic, `null == nonNullable → False`, `charCodeAt`, `.length`.
- **`if-let` desugared** to `step`-machines (stmt + IIFE expr forms).
- **`for` mostly lowered.** `nativeIterators=false` ⇒ `Array`/`Int`/range loops become
  `While`; only exotic iterables reach `genC`'s `For` stub (`FIXME TODO`).
- **`switch` desugared.** `Block(Const(temp,v), Switch(...))` + `EnumTag` promotion,
  `getTag()` tags, `EnumParameter` binders, `guards`/`binds` arrays (which `genC` ignores — F8).
- **IIFE wrapping.** `Block`/`Switch` expressions, `[for]`, `??`, expr `if-let` ⇒ immediately-invoked
  `Function` calls. `genC`'s `Expression.Elvis` case is dead; `If` + IIFE `Call` is live.
- **`Call` enriched.** Defaults filled, `expects` filled, `CallKind` classified
  (`Static`/`VirtualMethod`/`Function`), `@infix/@operator` ⇒ `NativeOperator`,
  `as?/as!/as` ⇒ `UnsafeBitCast`, `is` ⇒ `Is`, `super()` ⇒ `SuperConstructor`,
  `guard` ⇒ `Statements`, `string[i]` ⇒ `StringIndex`.
- **NOT done:** no capture lifting (F1); no ARC pass (F3); `api` stays `Normal` (`@struct`
  validated only — `genC` re-derives struct-ness from decorators); `NiceLink` full only for
  top-level functions, `aligned/dllExport` only for top-level vars.

## Reference III — `Nice` IR shape (`nice.hexa`)

- `Statement`: `Statements/Block/Call(e,args,expects,kind)/Var/Const/`
  `Function(name,expr,args,defaults,funcType,variadic,isAsync)/Return/If/Try(expr,t,v,catches,temp)/`
  `Throw/Assign/Assignop/For(name,over,by,reverse)/While/Increment/Decrement/`
  `Switch(expr,cases,statements,guards,binds)/Continue/Break/SuperConstructor/RefInc/DeferRefDec`.
- `Expression`: literals, `Ident/Null/This/Dot/Call(e,args,result,kind) [no expects]/New/Binop/Unop/`
  `Function [no variadic]/Arrow/Parenthesis/Object/Array/Map/Await/Elvis(Node,Node)/If/Index/`
  `UnsafeBitCast/Is/RemoveNullability/Assignop/NativeOperator/EnumTag/Enum/EnumParameter/`
  `Underscore/Spread/StringConcatenation/StringIndex`.
- `CallKind{Static,Function,VirtualMethod}`, `VariadicKind`, `CallingConvention`,
  `Memory`, `ClassBinaryInterface{Normal,StructureNoVirtual}`, `NiceLink`, `NiceProject`
  (note `native[]`, `expressionType/Position`, `mapDecorators`, `memory`),
  `NiceClass` (note `extend/implement/usedByValueDepth/template`), enum types.
- In-file TODOs point the way: `NiceName`, `CapturedVar`, `ToNullable/IsNull`, field-index
  `Field/DynamicField`, `CallMethod`, `NiceType`.

## Reference IV — `genC` today (pressure points for the TODOs)

- Mangling: `Foo_->bar_`, `Foo_$bar_`, `Foo_$m_(Foo_* $this,...)`, `$this_/$new_` ctor split,
  `f_`, `x_`, `_$temp`, `String_<id>`, `Foo_$Bar$Baz_*`, `typedef _$N` per function type.
- Types: numerics/`Bool_`/`Any_*`/`ByValue`/`ArrayByValue`/`(Const)ArrayPointer`/generics/`@rename`.
- Object model: flat per-class vtable `Foo__` + instance `Foo_` (vtable ptr first) + `Foo__$`
  value; `@struct/@union/@packed/@bits` from decorators; synthesized `toString` fallback.
- `printFunctionArguments` (`thisArgument`, `(void)`, `...`), `printFunctionBody` (`return 0` guard),
  `NiceLink` (`HEXA_LINK`, `dllimport/dllexport`, `convention`, `aligned`, `customHeader`).
- `HEXA_MAIN`: string bootstrap (`String_$root_`, `String_N = ...fromUTF16z_...`), static/global
  inits (`(int32_t)0` skipped), `init[0]`, `fflush`, `return 0`.
- Statements: `metaBlock` temp-spilling, `Try` single-catch stub, `Assign(Dot/Index)` dynamic
  `Any` paths (`let_/$set/get_/set_`), `String_$combine_`, `Switch` ⇒ if-ladder (`Null→-1`,
  guards/binds ignored, second C-`switch` emitter dead), `SuperConstructor/RefInc/DeferRefDec`
  unhandled, `For` stub.
- `Bool_` is in-band tri-state (comment: 1=true, 0=false, 2=null); `Bool.null` ⇒ `(uint8_t)2`;
  empty vtables get `uint8_t padding_` because empty struct is size 0 in C, size 1 in C++ —
  both facts matter for D2 sentinel layout.
- Expressions: interning (`''`=0, `'null'`=1; escaper only `' " \n \r \\`), `Dot` specials
  (`ByValue.ref`, `offsetItems` folding), `New/Array/Map/Object`, `Binop` string-combine,
  `EnumTag/Enum/EnumParameter`, `NativeOperator`, big `printTypeConverter` matrix, `%...%` stubs.
- Gaps (live): no `Is/RemoveNullability/Await/StringIndex/Underscore/Spread/StringConcatenation`
  cases; `getType` throws on them (normalizer **does** emit `Is`, `!`, `string[i]`).

---

# Future work (actionable)

Conventions: each item lists **Goal**, **Current state**, **Steps** (`- [ ]`, with files),
**Acceptance**, and **`Q:` implementation questions** to resolve while doing it.
Do items in order F1 → F5; F6–F8 can parallelize after F1/F2 land.

## F1. Two-var function values end-to-end (closures, methods, `@noCapture`)

**Goal.** No more capture-less `_$temp(args)`. Every function value is `(funcPtr, env)`; every
call passes env first; `@noCapture` stays a single raw pointer for C ABI.

**Current state.** `Statement/Expression.Function/Arrow` ⇒ top-level `_$temp` with no env
(`genC`); `Normalizer` preserves `args/defaults/body` only, no capture analysis; `Nice` has no
capture field (only `// CapturedVar` comment); `typedef _$N` has no env param; `CallKind.Function`
call sites pass only declared args.

**Steps.**
- [ ] F1.1 Decide representation (one decision, then uniform): two parallel C vars/fields
  (`f$f_`, `f$e_`) vs one two-field struct (`struct FatFn { Ret(*f_)(Env*,...); Env* e_; }`).
  Record in this doc. Files: `docs/target-c.md`, `docs/native.md` (update C sketch to the
  two-var/two-field form actually chosen).
- [ ] F1.2 Extend `Nice` IR: add captures to `Expression/Statement.Function` (e.g.
  `captures [String]` + captured types, or `CapturedVar` nodes). File: `source/data/nice.hexa`.
- [ ] F1.3 Compute captures in `Normalizer` (free-variable analysis for `Function`/`Arrow`
  bodies; respect scopes/`unique`; methods capture `this` as env). File: `source/compiler/normalizer.hexa`.
- [ ] F1.4 Emit env-first signatures: `Ret _$t(Env_* env_, Args...)`; closure-struct per
  capturing function (`struct Closure_N { captured...; }`); factory at definition site
  (`HEXA_NEW` + fill). Files: `source/targets/genC.hexa` (`printExpression/Statement.Function`,
  `typedefFunctions`, `globalFunctions`, `printFunctionArguments`).
- [ ] F1.5 Rewrite all `CallKind.Function` sites to fat-call (`p_(e_, args...)`); add
  `@noCapture` single-pointer path + wrapper generation for converting a plain C function to a
  fat value (pair with sentinel env, D2). Files: `genC.hexa` (`printExpression(Call)`,
  `printStatement(Call)`), `normalizer.hexa` (`@noCapture` handling).
- [ ] F1.6 Store/load through fields, arrays, globals: field pairs, assignment, param passing,
  returns. Files: `genC.hexa` (`Dot/Assign/Index`), `nice.hexa` if field-pair nodes needed.
- [ ] F1.7 Tests: capture-by-value semantics, nested closures, closure returned from function
  (`native.md` `outer()` example), method-as-value, `@noCapture` FFI call.
**Acceptance.** `outer()`-style test compiles to env-first C, captures survive return, fat calls
thread env, `@noCapture` emits raw pointer; no capture is silently dropped (typer errors until F1 lands).
- Q: two vars vs one struct — which keeps `metaBlock` spilling, `Assign`, `Index`, and
  `expects` conversion simplest? Who owns the decision — `Normalizer` (lowers to pairs early) or
  `genC` (lowers typedefs late)?
- Q: keep `native.md`'s optimization (direct call when callee provably capture-less) or force
  uniform fat-call (wrapper + sentinel env) for simplicity? Cost/benefit?
- Q: env layout per function (anonymous `Closure_N` struct) vs shared `Any_*`-style base — how do
  function **types** (`Type.Function`) mangle when env types differ (`Foo_$...` naming)?
- Q: methods: is `this` just the env (slot reuse), or `(methodPtr, this)` a separate fat shape from
  `(closurePtr, closureEnv)`? How do `VirtualMethod` (`_$t->_->m_(_$t,...)`) and fat closures interact
  in one call path?
- Q: copies: does assigning a fat value `RefInc` the env (D3) — i.e. is the env the only ARC target?
- [ ] F1.1 Freeze two-var ABI (no struct): params double up; returns take extra `void**` out-param for code ptr and return env ref; fields double up (`name$f_`, `name$e_`).
- [ ] F1.2 Extend `Nice` IR with captures (`source/data/nice.hexa`).
- [ ] F1.3 Compute captures in `Normalizer`, typer-enforce `@noCapture`-only-accepts-`@noCapture` (`source/compiler/normalizer.hexa`).
- [ ] F1.4 Emit env-first signatures + per-closure structs + factories (`source/targets/genC.hexa`).
- [ ] F1.5 Rewrite `CallKind.Function` sites to fat-call; generate thin wrappers for non-capturing fn → capturing ref; pair with sentinel env.
- [ ] F1.6 Thread pairs through fields/arrays/globals/params/returns (double slots, not structs).
- [ ] F1.7 Tests: nested closures, returned closures, method-as-value, `@noCapture` FFI.

**Acceptance.** Captures survive return; fat calls thread env; returns use out-param; no silent capture drop.
- Q: wrapper cache: one wrapper per non-capturing function, or per (function, signature)?
- Q: null-fat value shape: `(nullWrapper, sentinelEnv)` — which half does `== null` test?
- Q: methods: `(methodPtr, thisRef)` with ARC on `thisRef`; vtable slots env-first?
- Q: copies assign + `RefInc(env)` only; raw code ptr never retained?
- Q: `typedef _$N` is emitted per `stringifyType(Function)` call (tempId counter), even nested in
  `printFunctionArguments` — dedup function-type signatures after F1 (source TODO says dedup in
  normalizer), or keep per-emission typedefs?

## F2. Sentinel nulls everywhere

**Goal.** No raw-zero managed nulls. Every nullable/fat-pointer null is a well-known sentinel;
ARC ignores it; checks compare against it.

**Current state.** `genC` mixes `nullptr`, `int32_t$null`, `(uint8_t)2`, `(Null$U64){0,0}`, ...;
sentinel defs assumed but absent from `hexa.c`; `EnumTag(null)==-1` special-cased; fat null undefined.

**Steps.**
- [ ] F2.2 Unify `Null(of)` + `printTypeConverter` null arms to those sentinels; add fat-null
  construction. File: `source/targets/genC.hexa` (`printExpression(Null)`, converter matrix).
- [ ] F2.3 Make `== null` / `!= null` / `if let` (already `step` + `!=Null/False`) compare against
  sentinels, including fat values (compare env half? both halves?). Files: `genC.hexa`
  (`Binop(Equal/Unequal)`), `normalizer.hexa` (if-let condition shapes).
- [ ] F2.4 Define ARC-over-sentinel = no-op in the runtime (`rc++`/`rc--` early-out). File: runtime headers.
- [ ] F2.5 Document `wchar_t` width + `bytes_` caching interaction (UTF-16 literals vs sentinels are orthogonal, but touch the same `String` bootstrap). File: this doc + `docs/native.md`.
- Q: fat-null equality — env-only compare, or `(func==nullWrapper && env==sentinel)`? What does
  `Unknown/UnknownNullable` (unresolved generics) compare against before monomorphization?
- Q: `String_<id>` globals + `String_$root_` bootstrap (inside `HEXA_MAIN`) — immortal (never
  released) or refcounted? Who decides — immortal simplifies F3 enormously.
- [ ] F2.1 Define ref/numeric sentinels in `library/cxx/hexa.c` + `library/c/hexa.c`.
- [ ] F2.2 Add two global `Bool` sentinels; `true as Any` / `false as Any` return them.
- [ ] F2.3 Intern `BigInt` like `String` (`library/c/string.hexa` `root`/`next` pattern).
- [ ] F2.4 Unify `Null(of)` + converter null arms; add fat-null construction.
- [ ] F2.5 Compare `== null` / `if let` / fat-null against sentinels.
- [ ] F2.6 ARC-over-sentinel = no-op in runtime.

**Acceptance.** One lowering per `Null` type; `((true as Any) == (true as Any)) == true`; interned `BigInt` referential equality; sentinel ops safe.
- Q: fat-null equality — env-only or both halves?
- Q: `String_<id>` globals — immortal or refcounted?
- Q: `BigInt` interning key — value hash + compare, like `fromUTF16` hash/length walk?
- Q: `Bool?` null is in-band `2` today (`Bool_` tri-state) — keep the in-band third state
  (D2 says `Bool`/`BigInt` stay stored plainly) or promote `Bool?` null to a sentinel object?
  How does the tri-state interact with the two `Bool`-as-`Any` sentinels?
- Q: after the null sentinel, does `EnumTag` collapse (`(e == 0? -1 : e->is_)` → plain `e->is_`
  with the sentinel carrying `is_ == -1`/tag), or does the tag special-case stay?

## F3. Revive `ArcInserter` (fix, gate, reconnect)

**Goal.** `arc.hexa` goes from disabled/buggy to the single place that inserts
`RefInc` + immediately-nearby `DeferRefDec` per D3 — starting behind a flag, with tests.

**Current state.** Disconnected (no caller); `needsARC` over-broad (every `ClassInstance`);
`getType(Node)` called with `Stmt/Expr`; counter `unique`; missed recursions; `Assignop`
identity; param shadowing; `Not a block` throw; `For` arity; skipped `globalVars`/field inits;
missed expression kinds (see Reference + prior Q2 list).

**Steps.**
- [ ] F3.1 Fix `needsARC`: ARC only for heap-managed (`Normal`, not `@struct`/pointers/`ByValue`?)
  + recurse through `Nullable/UnknownNullable/Unknown`. Decide the predicate once, encode it.
  File: `source/compiler/normalizing/arc.hexa` (`needsARC`).
- [ ] F3.2 Fix typing/plumbing: `getType` over `Nice` nodes (use `expressionType` + statement
  `dataType` fields, not `typer.types[Node]`); scope-aware `unique` (or reuse normalizer's);
  `opWithoutAssign` real mapping (`+=→+`, ...); `pre_stmts` insertion order; non-`Block` bodies
  (wrap, don't throw); `For` full arity; recurse into `Var/Assign` payloads, `binds`, all
  expression kinds; cover `globalVars`/field/static initializers or explicitly defer them with a TODO.
  File: `arc.hexa` (`processStatement/processExpression/helpers`).
- [ ] F3.3 Narrow the model to D3/D4: `RefInc` on pass/assign/store/return of the **env half**;
  `DeferRefDec` in the **same Block**, LIFO. Encode fat-env-only rule (D1+D3) explicitly —
  raw code pointers never retained. File: `arc.hexa`.
- [ ] F3.4 Gate + reconnect: additive flag (e.g. `--define arc=true` or target option), then call
  `new ArcInserter(normal).insertArc()` between `normalize()` and `perform()` in `source/main.hexa`.
  Keep default OFF until F4+F5 land; add golden tests with ARC on/off. Files: `source/main.hexa`,
  `hexa.json` targets/options, tests.
- [ ] F3.5 Fuzz on real programs: enable flag on `examples/`, diff ARC-on vs ARC-off behavior
  (leaks expected off; use-after-free/crashes indicate F3 bugs, not F4 missing — triage accordingly).

**Acceptance.** With flag on, every owned value has a visible `RefInc` + same-block `DeferRefDec`;
flag off reproduces today's output; `needsARC` unit cases (struct vs class vs nullable vs fat env) pass.
- Q: who owns the env on **copy** (`x = f` where `f` is fat): `RefInc(env)` + `DeferRefDec(oldEnv)`?
  What about copies through fields/array elements/`Any` payloads/`enum_`/`Map` values?
- Q: params on entry (`RefInc`+`Defer` at top, as today) vs call-site retain: both, or is entry-side
  enough? Return values: +1 (caller releases) or borrow (callee keeps)? Pick one, document, enforce.
- Q: rvalue temps (`temp_call_arg`): retain or just `Defer` (today: temp + dec, no inc — correct only
  if the rvalue is already +1)? Order of evaluation + exception between args (F5)?
- Q: `globalVars`/statics/field defaults: ARC at `HEXA_MAIN` init time with immortal lifetime
  (no `Defer`), or excluded? `String_<id>` globals (F2-Q): immortal?

## F4. Lower `DeferRefDec` to RAII `defer` in `genC`

**Goal.** Every `DeferRefDec([o...])` becomes an exception-safe release: normal scope exit
**and** C++ unwinding both run it. This is what makes D3 sound under D5.

**Current state.** `genC.printStatement` has no `RefInc/DeferRefDec` case (would hit unknown);
`arc.hexa` header says "implemented in code gen as automatic `defer`" but no lowering exists.

**Steps.**
- [ ] F4.1 Choose the RAII shape: e.g. `struct DeferDec_N { Any_* o_; ~DeferDec_N(){ dec(o_); } } deferVar_N(o_);`
  per retained object (or batched list version matching `DeferRefDec([o...])`). Constraints: must work
  in every `Block` position `genC` emits (incl. `HEXA_MAIN`, `$this_`, `_$temp`, IIFE bodies, `Switch`
  if-ladder branches, `While` bodies). Files: `genC.hexa` (`printStatement`), `library/cxx/hexa.c`
  (guard type + `dec` no-op on sentinel).
- [ ] F4.2 Emit `RefInc` as `inc(env)` inline at the insertion point; emit the RAII guard **in the
  same block**, LIFO. Preserve `metaBlock` ordering (temps hoisted before the guarded statement).
  File: `genC.hexa`.
- [ ] F4.3 Handle abrupt exits: `Return/Break/Continue/Throw` inside a guarded `Block` need no extra
  code (destructors run), but **verify** for each (C++ scoping!): early `return` in `printFunctionBody`
  (`return 0` guard), `Switch` lowering braces, `While`/`For` bodies, IIFE `Call` boundaries.
  Add tests with `throw` across guarded scopes. Files: `genC.hexa`, tests.
- [ ] F4.4 Pure-C fallback: when `cpp == false`, lower `DeferRefDec` to a plain scope-end `dec`
  (best-effort, documents leak-on-throw since C throws panic anyway per D5) — or reject ARC-on + pure-C.
  Decide and encode. File: `genC.hexa` (`cpp` branch).

**Acceptance.** ARC-on + `cpp` output releases on all paths including throws (test: allocate in `try`,
throw past guarded scopes, assert balanced inc/dec); ARC-on + pure C either works best-effort or errors clearly.
- Q: guard granularity — one RAII var per object vs one per `DeferRefDec` list vs one per `Block`
  (aggregate)? Per-object is simplest to reason about; per-block is fewer destructors. Measure?
- Q: where exactly does the guard live when `arc.hexa` puts `RefInc/Defer` at different indices
  (today: inc at `i+1`, dec at `i+2`)? Must the guard declaration sit **adjacent to the inc**
  (D3 "immediately nearby") to be exception-correct between inc and guard?
- Q: interaction with `printFunctionBody`'s appended `return 0` and with `metaBlock` lines that
  evaluate receivers/args — can an exception occur **between** `RefInc` and guard construction?
  If yes, reorder (construct guard first with null, then assign+inc?).
- Q: IIFE boundaries (`Block`/`Switch`/`Elvis`/`[for]` lowered to `Call(Function(...))`): does the
  guard belong inside the IIFE body (correct) — and does `arc.hexa`'s `processExpression→Function body`
  recursion place it there?

## F5. Exception model split (C++ ABI vs C panic)

**Goal.** `Try/Throw` mean C++ exceptions under `cpp`, panic under pure C — and ARC guards (F4)
compose with both.

**Current state.** `_try/_catch/_throw/$try` placeholders; single-catch read (`t[0]/v[0]/catches[0]`);
no runtime defs; `$try`-as-arg vs thread-local undecided.

**Steps.**
- [ ] F5.1 `cpp==true`: lower `Try` to `try/catch`, `Throw` to `throw`, multi-catch arrays in order,
  `temp` as catch-var. File: `genC.hexa` (`Try/Throw`).
- [ ] F5.2 `cpp==false`: lower `Throw` to `HEXA_UNREACHABLE`/abort path; `Try` to straight-line body
  (or reject `try` in pure C with a clear error — decide). File: `genC.hexa`.
- [ ] F5.3 Define `$try`/propagation: delete the "test `$try` after every call" idea if C++ exceptions
  carry the value; keep a thread-local/explicit out-param only if the C fallback needs it. File: this doc + `genC.hexa`.
- [ ] F5.4 Top-level: `HEXA_MAIN` handler (report + nonzero exit) for uncaught; `defer`/`finally`
  composition rules with F4 guards. Files: `genC.hexa`, runtime headers.

**Acceptance.** Throw across ARC-guarded scopes releases exactly once under `cpp`; pure-C throw aborts
with location; multi-catch order respected.
- Q: exception value type — always `Any_*` (today's `$try` shape) or typed (`t[i]`)? How do
  `catch` type tests codegen (`Is`-like check vs vtable compare)?
- Q: `Await/async` (no `genC` case): reject under both modes until async design lands, or map onto
  exceptions/coroutines? Explicitly out of scope — but say so.

## F6. Methods, `this`, and vtables under fat pointers + ARC

**Goal.** Method values and virtual dispatch compose with F1/F3 (env = `this` where applicable).

**Current state.** Flat per-class vtables, no parent chaining; `This`/`thisArgument`/`customThis`
  threading; `VirtualMethod` temp-spill call; `SuperConstructor` unhandled; `extend/implement`
  ignored.

**Steps.**
- [ ] F6.1 Decide: method-as-value = `(methodFuncPtr, thisRef)` fat pair with ARC on `thisRef` (D1+D3).
  Virtual call stays `env->_->m_(env,...)` where env is `this`. File: `genC.hexa`.
- [ ] F6.2 `SuperConstructor`, `extend/implement`, interface dispatch: implement or explicitly defer
  (with typer errors, not silent miscompile). Files: `genC.hexa`, `normalizer.hexa` (set `api` properly).

**Acceptance.** Method reference keeps `this` alive; virtual + fat paths don't double-retain.
- Q: vtable slot signature — env-first uniformly (`m_(This*,...)`), so closures and methods share
  the fat-call shape? Or distinct?
- Q: `StructureNoVirtual` (normalizer never sets it today): set it for `@struct`, or keep
  decorator-derived `isStruct`? One source of truth.

## F7. Collections, strings, enums under the new rules

**Goal.** `String/Array/Map`, complex enums, `ByValue/ArrayByValue` obey sentinel + ARC + fat rules.

**Steps.**
- [ ] F7.1 Ownership: enum payloads (`enum_[]`), `Array/Map` elements, `String` buffers — who
  retains on construction/`$from_`/element `set`, who releases on scope exit/reassign? Encode in
  `arc.hexa` + runtime, not ad hoc in `genC`.
- [ ] F7.2 `String_$combine_`/`set(get+append)` returns: +1 with caller-owned guard (F4), documented.
- [ ] F7.3 `ArrayByValue`/`ByValue` (stack/inline): never ARC-managed (or explicitly so); close the
  `printInitializer [0]→{0}`-only gap and the missing `init(&x_)` call.

**Acceptance.** Element/payload lifetimes tested (append/reassign/throw-past-container).
- Q: containers of fat values (array of closures): element = two slots? `get_/set_` signatures?
- Q: `String` interning + immortal globals (F2-Q) vs refcounted strings — which?

## F9. `async`/`await` on C++ coroutines
- Coroutine shape: every `async` func **always `co_return`s something** (forces compiler to treat it as a coroutine).
- Own `co_`-runner with **start-after-create executor** mimicking JS/Node.js async ordering.
- `genC` gap today: no `Await` case, `isAsync` ignored — reject or lower per this design.
- [ ] F9.1 Define `co_`-runner + executor placement (runtime headers vs emitted helpers).
- [ ] F9.2 Lower `async`/`await` to `co_return`/`co_await` in `genC` (`cpp` only); clear error on pure C.
- Q: how do ARC guards (F4) interact with coroutine frames (suspension = scope exit?)?
- Q: how do fat-pair closures (F1) cross suspension points (env lifetime)?

## F10. Reflection (`Any`, `JSON.parse`, ...)
- Dynamic surface stays: `Any` field/method access, `is`/`as`, `JSON.parse`-like materialization.
- [ ] F10.1 Define `Any` metadata/vtable surface needed by `genC` dynamic paths (`let_/$set/get_/set_`).
- [ ] F10.2 Scope `JSON.parse` return ownership under ARC (who retains the tree?).
- Q: does reflection reuse fat-pair/sentinel machinery, or need its own type tags?

## F11. Memory allocator in Hexa itself
- Allocator is written in `.hexa`, not C++ `new`/`malloc` sprinkled in codegen.
- `HEXA_NEW/FREE` become calls into that allocator; `genC` only emits allocation sites.
- [ ] F11.1 Define allocator interface + refcount header layout (where does `rc` live?).
- [ ] F11.2 Route `HEXA_NEW`, closure/env allocs, `String`/`Array`/`Map`/interned `BigInt` through it.
- Q: freestanding targets (no libc `malloc`) — which paths must avoid libc entirely?

## F8. Parity gaps and hygiene (do alongside, unblock cheaply)

- [ ] `guards`/`binds` (always filled, always ignored): implement in if-ladder or lower away in
  normalizer for C. Multi-`exprs` switch: keep upstream error or implement.
- [ ] Missing expression cases: `Is`, `RemoveNullability(!)`, `StringIndex` (live!), `Await`,
  `Underscore`, `Spread`, `StringConcatenation` survivors — implement or typer-reject for C with
  clear errors (no silent `<!--...-->`).
- [ ] `SuperConstructor`, `Object_from`/empty-`{}` ambiguity, `Map` key equality, `getType` throw
  coverage.
- [ ] `usedByValueDepth`: keep relying on normalizer sort (sufficient?) — assert, don't re-sort.
- [ ] `NiceLink`/`HEXA_LINK`/`extraUnderscore`/32-bit `__stdcall` scope (internal vs FFI-only),
  `customHeader`+`dllexport` errors, `@restrict/@volatile`, header-gen mode.
- [ ] String escaper beyond `' " \n \r \\` (`\0 \t`, surrogates, `String_199` throw); `wchar_t` width.
- [ ] Delete dead `_x` emitter + dead second `Switch` + pipe-operator comment block; confirm no test
  diffs (`genC.diff.txt`); silence `template/duplicate` logs; resolve `%...%` stubs and
  `ConstCharPointer` debug throws.

## How to read this doc next to the others
- `source/data/nice.hexa` — IR (`NiceName`/`CapturedVar` TODOs are now F1 inputs).
- `source/compiler/normalizer.hexa` — F1 captures + F3 predicate inputs live here.
- `source/compiler/normalizing/arc.hexa` — F3 work site (bug list in F3); header comment already
  states the `defer` intent D4 implements.
- `source/main.hexa` (~L810-843) — F3.4 reconnection point; `c`/`cpp` registry.
- `source/targets/genJs.hexa` — dynamic-semantics reference (not the ARC/fat model).
- `library/cxx/hexa.c` + `library/c/hexa.c` + `library/c/*.hexa` — F2 sentinels, F4 guard type,
  F5 handlers live here.
- `docs/native.md` (Function Pointers and Closures; Null Handling) — update the C sketches to the
  chosen two-var/two-field + sentinel forms once F1/F2 decide.
