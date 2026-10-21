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
- Default (no decorator) is fat even when the target captures nothing: `genC` emits a thin forwarding wrapper paired with the **sentinel-null** env (D2), so all call sites use one uniform fat-call shape (two call shapes only if we keep the `native.md` zero-overhead direct-call optimization — see F1-Q). Function types default to capturing: `let f () => Void = funcReturningVoid` is fat (thin wrapper + sentinel-null env).
- A return of function-reference type expands to **`void**` out-param for the code pointer + return value is the closure ref** (unifies ARC: only the returned ref is ref-counted, no fake countable arg).
- Capturing-function reference accepting a non-capturing function: compiler generates a **thin wrapper** that calls through.
- Non-capturing references accept **only** non-capturing functions (typer-enforced).
- `@noCapture` stays single raw pointer for C ABI.
- Closure captured state is lowered to a **classic helper object** (heap-allocated, ARC-managed like a
  class instance; fields = captures) — never C++ `[&]` lambdas, never a boxed tuple.
- `Arrow` (=>) differs from `Function` only before codegen: arrows are eliminated in the pre-generator
  lowering (converted into global functions), so `genC` sees plain `Function` only.
- Closure lowering (capture lifting into the helper object) runs **before** the ARC pass (F3) —
  either inside `Normalizer` or as a separate pass; the optimal path is to be decided (F1-Q).
- ABI adapters: if a function's own ABI (calling convention) differs from the expected fat-call ABI, a **wrapper** is generated that calls into the original function (limitation: native **variadics** cannot be wrapped portably in C ABI — no `va_list` forwarding; see F1-A).
- Fastcall scope: capturing function refs **and** non-COM 32-bit class methods (vtable + static) are `__fastcall`; globals stay platform-default. `regcall` may replace fastcall for Hexa-specific functions later; on x64 it is a no-op (single ABI).
- Capturing calls get their own `CallKind.Closure` (Nice `CallKind` extension, F1.2).
- Exception to the no-struct rule: contexts that need a single addressable value — **arrays of
  function refs** and **function-as-`Any` boxing** — may still use a small `{ptr, env}` mini-struct
  (or a boxed heap object) plus one singular referential value, so equality stays meaningful
  (cross-check F7-A for element layout).

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
- Scope (decided): sentinels apply to **managed refs + fat pointers only**. Native C pointers
  (`ArrayPointer`/`ConstArrayPointer`, `@rename`d FFI pointers, ...) keep raw zero — their `!= null`
  compiles to a true null check (`ptr != nullptr`), never a sentinel compare. The exemption predicate
  is decorator-based: `ArrayPointer`-style types carry `@struct` in their std `.hexa` declarations
  (`@struct`+`@byValue` combos exist too).
- Scalar nullability is **in-band**, not pointer-sentinel: `Bool_` tri-state (1/0/2) and similar
  encodings for most nullable integer types are intentional optimizations (no heap object for
  `Bool?`/`Int?`). Encoding plan: **≤32-bit nullable scalars = single larger C type + reserved
  scalar sentinel code** (widening always buys a spare code); **>32-bit (64-bit ints/floats) = the
  two-var approach like function refs** (value + presence halves) instead of `Null$*{value_, has_}`
  structs.
- Interned globals (`String_<id>`, ...) are **immortal** — never deallocated, since external C code
  may depend on them unpredictably and indefinitely.

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

### D6. Memory manager is deferred ref counting (atomic inc/dec, sweep-on-alloc)
- The ARC pass inserts **atomic `rc++`/`rc--` only** — it never emits a refcount check (`if rc == 0`)
  at any use site.
- Deallocation is deferred: "sometimes", when an allocation happens, the manager traverses its
  linked list of allocated objects and frees the ones observed at `rc == 0`.
- A `rc--` therefore can never double-free (nothing frees at decrement); conversely a **skipped**
  decrement is a permanent leak (object never observed at 0). Refines D4/D5: a throw can only leak,
  never double-free — but the RAII decrements (F4) remain mandatory.
- Consistent with D2: sentinels carry a huge refcount and are never observed at 0.
- The linked list is intrusive in allocation headers (`rc` + link) — this is the core of the F11
  allocator, not a bolt-on GC. Lists are per **size group** (16-byte-aligned): `N*2` roots
  (N in-use, N unused); allocation takes a free chunk, else scans the in-use roots and **migrates**
  `rc == 0` entries to the unused roots — that scan is the "sometimes" sweep.

### D7. Dynamic conversions mimic JavaScript semantics
- Principle: wherever runtime semantics are not fixed by static types, mimic JS as closely as
  possible — always, not just for `Any`.
- The typer enforces non-null for non-nullable simple values (`Bool`, `Int`, ...) — those types never
  observe "missing"; the coercion from `Any` to them follows JS: `Any`→`Bool` is JS truthiness
  (`null`/`undefined`/`''`/`0`/`NaN`/`false` are falsy), not a raw `_toBool()` bit read.
- This resolves the `printTypeConverter` TODOs `((==null)?false:_toBool)` / `((==null)?0:_toInt)`:
  the JS-style coercion helper is the answer, not an extra null check.
- Interned `'null'` (string id 1) is exactly the JS `ToString(null)` result — consistent with this rule.

### D8. Nice is the canonical IR; generators stay thin
- Move as much logic as possible into pre-generator passes and into Nice nodes/types (`NiceType`,
  field indices, `CapturedVar` TODOs in `nice.hexa`); the C/C++ generator implements only what C
  output strictly requires.
- Motivation: future LLVM/.asm generators must consume the same fully-lowered Nice IR.
- Direction for `genC`'s "TODO do it in normalizer" (`Switch`→if-ladder, `guards/binds`, captures);
  `nativeIterators`/`nativeEnums`/`globalAccessor` are the existing capability-flag pattern to extend.
- `Switch` stays a **native switch** in Nice when it is plain non-pattern matching (LLVM supports
  switch at IR level); only pattern-matching switches become step-machines/if-ladders.

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

  On x64 always fastcall; on Win32-i686 stdcall is the default (matches Win32/COM).
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
- `source/compiler/normalizer.hexa` + `source/compiler/normalizing/arc.hexa` — what IR
  shape `genC` can assume (closures? ARC nodes? `Switch` guards/binds?).
- `source/targets/genJs.hexa` — the reference dynamic semantics (`instanceof`,
  `delayedInits`, `Enum_N` arrays) to port to static C.
`out` = complex-enum factories, `$this_/$new_` pairs, method/static/global bodies, `HEXA_MAIN`.
Dead code after `return` (legacy `_x` emitter) is archaeology — delete per F8.
- Definitions are sorted before generation so the ones that depend on each other see them first
  (limitation of the C language); the forward section + sorting together cover mutual references.

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
- `CallKind{Static,Function,VirtualMethod}` (+ `Closure` planned for capturing calls, F1.2), `VariadicKind`, `CallingConvention`,
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
- Nullable numerics surface: `Null$*` structs (`{value_, has_}` — `null => has_ == 0 and value == 0`),
  wrap via `toNull$UInt64(...)`, unwrap `.value_`, `==`/`!=` via `equalNull$UInt64`/`equalNull$Float32`;
  `printValueToNullableConverter`/`printNullableToValueConverter` are `%...%` stubs (feed F2/F8).
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
Each `Q:` is followed by `A:` bullet(s) exploring candidate answers with a rated recommendation —
informative, not binding until the item lands.
Do items in order F1 → F5; F6–F8 can parallelize after F1/F2 land.

## F1. Two-var function values end-to-end (closures, methods, `@noCapture`)

**Goal.** Stop emitting every function value as a bare capture-less top-level `_$temp(args)` function (today's behavior — captures silently dropped). Every function value becomes two vars `(f$ptr, f$env)`: calls pass env first, returns use the out-param form, `@noCapture` stays a raw pointer.

**Current state.** `Function/Arrow` ⇒ `_$temp` with no env; no capture analysis; `typedef _$N` has no env param; `CallKind.Function` passes only declared args.

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
- [ ] F1.2 Extend `Nice` IR with captures + `CallKind.Closure` for capturing calls (`source/data/nice.hexa`).
- [ ] F1.3 Compute captures + lower closures to helper objects in a pre-ARC pass (late `Normalizer` phase or separate pass — see Q), typer-enforce `@noCapture`-only-accepts-`@noCapture` (`source/compiler/normalizer.hexa` / new `source/compiler/normalizing/` pass).
- [ ] F1.4 Emit env-first signatures + per-closure structs + factories (`source/targets/genC.hexa`).
- [ ] F1.5 Rewrite `CallKind.Function` sites to fat-call; generate thin wrappers for non-capturing fn → capturing ref; pair with sentinel env.
- [ ] F1.6 Thread pairs through fields/arrays/globals/params/returns (double slots, not structs).
- [ ] F1.7 Tests: nested closures, returned closures, method-as-value, `@noCapture` FFI.

**Acceptance.** Captures survive return; fat calls thread env; returns use out-param; no silent capture drop.
- Q: wrapper cache: one wrapper per non-capturing function, or per (function, signature)?
- A: ideas: (a) one thin wrapper per function (each function has exactly one C signature), (b) per
  (function, fat-signature) pair for ad-hoc casts; **recommend (a)** — Hexa types are strict and
  ad-hoc `as` casts route through the ABI-wrapper table anyway.
- Q: null-fat value shape: `(nullWrapper, sentinelEnv)` — which half does `== null` test?
- A: constraint: sentinel-null **is** the env of wrappers around non-capturing functions (D1), so
  the env half cannot distinguish null from "plain function". Ideas: (a) test the code-ptr half
  against a unique `f$null` wrapper, (b) test both halves; **recommend (b) for `==` (one `&&`), with
  (a) as the single-compare `== null` fast path**.
- Q: methods: `(methodPtr, thisRef)` with ARC on `thisRef`; vtable slots env-first?
- A: **recommend yes to both** — `this` is the env for methods (retain `thisRef` per D3) and
  env-first vtable slots give one uniform fat-call shape shared with closures (ties F6-Q).
- Q: copies assign + `RefInc(env)` only; raw code ptr never retained?
- A: **yes (settled)** — the code ptr is not heap memory; D3 releases only the env half. Encode in
  `arc.hexa` (F3.3).
- Q: `typedef _$N` is emitted per `stringifyType(Function)` call (tempId counter), even nested in
  `printFunctionArguments` — dedup function-type signatures after F1 (source TODO says dedup in
  normalizer), or keep per-emission typedefs?
- A: ideas: (a) dedup in `genC` short-term (signature→typedef map), (b) dedup in normalizer as
  `funcTypes[id]` (nice.hexa TODO) per D8; **recommend (b)** with (a) as stopgap — fat typedefs
  (`ret (*)(void* env, ...)`) make dedup matter more.
- Q: closure-lowering placement (D1) — late phase inside `Normalizer.normalize()`, or a separate pass
  object (like `ArcInserter`) called from `source/main.hexa` between `normalize()` and `insertArc()`?
  Decide the optimal path.
- A: ideas: (a) late `Normalizer` phase (reuses `unique`/renames/`parentNames`), (b) separate pass in
  `source/compiler/normalizing/` invoked from `main.hexa` (ArcInserter pattern — explicit pre-ARC
  ordering, D8-style); **recommend (b)** — keeps `Normalizer` stable and the pipeline explicit;
  (a) viable if pass plumbing feels heavy.
- Q: helper object shape — a synthesized `NiceClass` in Nice IR (uniform ARC/type treatment) vs an
  opaque runtime struct? Mutable captures: per-var cell/box fields so mutation is shared between
  closures (nice.hexa `capture let with [=]` TODO)?
- A: **recommend synthesized `NiceClass`** (free `needsARC`/`stringifyType`/reflection integration)
  with per-var cell fields for mutable `var` captures and by-value copies for `let` (`[=]`); uniform
  cells for everything is simpler but adds allocs; opaque runtime struct only if class machinery
  gets in the way.
- Q: ABI adapters (D1) share the wrapper table with the F1.5 thin wrappers — cache keyed by
  (function, signature, convention)? Is `__fastcall` for capturing refs meaningful only on
  `Memory.Old32` (i686, where `defaultCallingConvention` is `__stdcall`) and a no-op on x64 —
  env-first pairs with fastcall there (env travels in ECX)?
- A: **recommend one wrapper table keyed (function, signature, convention)** shared by thin + ABI
  wrappers. Fastcall scope is decided (D1): closures and non-COM 32-bit class methods (vtable +
  static) fastcall, globals platform-default, possible future `regcall`; a no-op on x64. Open
  limitation: native **variadics** cannot be wrapped portably (no `va_list` forwarding) — likely
  require matching convention + typer error otherwise.

## F2. Sentinel nulls everywhere

**Goal.** No raw-zero managed nulls. Every nullable/fat-pointer null is a well-known sentinel;
ARC ignores it; checks compare against it.

**Current state.** `genC` mixes `nullptr`, `int32_t$null`, `(uint8_t)2`, `(Null$U64){0,0}`, ...;
sentinel defs assumed but absent from `hexa.c`; `EnumTag(null)==-1` special-cased; fat null undefined.

**Steps.**
- [ ] F2.5 Document `wchar_t` width + `bytes_` caching interaction (UTF-16 literals vs sentinels are orthogonal, but touch the same `String` bootstrap). File: this doc + `docs/native.md`.
- [ ] F2.1 Define ref/numeric sentinels in `library/cxx/hexa.c` + `library/c/hexa.c`.
- [ ] F2.2 Add two global `Bool` sentinels; `true as Any` / `false as Any` return them.
- [ ] F2.3 Intern `BigInt` like `String` (`library/c/string.hexa` `root`/`next` pattern).
- [ ] F2.4 Unify `Null(of)` + converter null arms; add fat-null construction.
- [ ] F2.5 Compare `== null` / `if let` / fat-null against sentinels.
- [ ] F2.6 ARC-over-sentinel = no-op in runtime.

**Acceptance.** One lowering per `Null` type; `((true as Any) == (true as Any)) == true`; interned `BigInt` referential equality; sentinel ops safe.
- Q: fat-null equality — env-only or both halves?
- A: constraint: sentinel-null doubles as the env of non-capturing wrappers (D1), so env-only
  conflates. Ideas: (a) both halves vs `(f$null, nullEnv)`, (b) code-ptr half only; **recommend (a)**
  for `==` and (b) as the `== null` fast path (same resolution as F1-Q).
- Decided: `String_<id>`/interned globals are **immortal**, never deallocated (external C code may
  depend on them unpredictably and indefinitely) — D2.
- Q: `BigInt` interning key — value hash + compare, like `fromUTF16` hash/length walk?
- A: **recommend yes** — mirror `library/c/string.hexa` `root`/`next` dedup keyed by (bit-length,
  hash, word compare); `BigInt` has no `-0`/`NaN` normalization pitfalls (floats should NOT be
  interned for that reason). Alternative: intern only when boxing to `Any` (weaker referential
  equality).
- Decided: scalar nullability stays **in-band** (`Bool_` tri-state 1/0/2 and similar integer
  encodings) — an intentional optimization, no pointer sentinels for scalars (D2).
- Q: exact in-band encoding per width — reserved bit-pattern in a widened slot vs the current
  `Null$*{value_, has_}` pair structs (64-bit/floats today)? Which widths lack a spare code
  (`UInt64` has none) and must keep the pair struct?
- A: **decided direction (D2)**: ≤32-bit nullable scalars = single larger C type + reserved scalar
  sentinel (widening always buys a spare code); >32-bit (`Int64`/`UInt64`/`Float64`) = the **two-var**
  approach like function refs (value + presence halves) replacing `Null$*{value_, has_}` structs —
  so no width keeps a pair struct. `Float32?` fits the ≤32-bit rule via exact widening to double
  (or its own reserved NaN-ish code — TBS).
- Q: native-pointer exemption (D2) — which type kinds qualify (`@rename`d externals,
  `ArrayPointer`/`ConstArrayPointer`, `@struct*`)? Encode the predicate once (typer `Type` kind vs
  decorator).
- A: **recommend decorator-based predicate** — `ArrayPointer`-style types already carry `@struct`
  in their std `.hexa` declarations (incl. `@struct`+`@byValue` combos), matching `genC`'s existing
  `isStruct` derivation; typer `Type`-kind alternative only if decorators prove too coarse.
- Q: after the null sentinel, does `EnumTag` collapse (`(e == 0? -1 : e->is_)` → plain `e->is_`
  with the sentinel carrying `is_ == -1`/tag), or does the tag special-case stay?
- A: **recommend collapse** — the sentinel enum carries `is_` (and empty `enum_[]`), making
  `EnumTag` a plain field read per D2 "no null-check branches"; keep `-1` as the sentinel's tag and
  verify `getTag()` numbering interplay with `Switch` lowering.

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
- A: **recommend per-D3 everywhere** — any store (local assign incl. old-value release, field write,
  element `set`, `enum_` factory, `Any` boxing, `Map` value) retains the env half; container/`Any`
  helpers keep an internal inc/dec contract (documented per F7.1) rather than caller-side retains.
  Alternative (caller-side retain before each helper call) is more codegen-visible but easier to get
  wrong in runtime internals; rate helper-contract higher.
- Q: params on entry (`RefInc`+`Defer` at top, as today) vs call-site retain: both, or is entry-side
  enough? Return values: +1 (caller releases) or borrow (callee keeps)? Pick one, document, enforce.
- A: D6 warning: a borrowed ref reaching 0 mid-call can be swept at the callee's next allocation →
  **recommend entry-side retain (today's shape) + returns +1 (caller guards via F4)**; call-site
  retains for lvalue args are then unnecessary (callee retains before any allocation). Alternative
  all-+1 everywhere (call-site + entry) — belt-and-braces, more inc/dec traffic; rate entry-side.
- Q: rvalue temps (`temp_call_arg`): retain or just `Defer` (today: temp + dec, no inc — correct only
  if the rvalue is already +1)? Order of evaluation + exception between args (F5)?
- A: **recommend today's shape** (temp + `DeferRefDec`, no inc) under the F7.2 contract that
  factories/computed rvalues return +1; each temp gets its F4 guard at materialization, making
  argument-order throws safe. Uniform inc+dec is a safe-but-slower debug mode.
- Q: `globalVars`/statics/field defaults: ARC at `HEXA_MAIN` init time with immortal lifetime
  (no `Defer`), or excluded? (`String_<id>` globals are settled: immortal per D2.)
- A: **recommend immortal globals** — excluded from the sweep lists or tagged with huge rc (D2
  sentinel trick), no `Defer` at `HEXA_MAIN`; rc-managed-at-exit adds teardown ordering problems
  (static destructors vs sweep) for zero benefit. Rate immortal.

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
- A: **recommend one guard per `DeferRefDec` list** (matches the IR batching; LIFO within the block;
  modest destructor count). Per-object if debugging needs 1:1 traceability; per-block aggregate if
  generated C++ compile times hurt. Rate per-list > per-object > per-block.
- Q: where exactly does the guard live when `arc.hexa` puts `RefInc/Defer` at different indices
  (today: inc at `i+1`, dec at `i+2`)? Must the guard declaration sit **adjacent to the inc**
  (D3 "immediately nearby") to be exception-correct between inc and guard?
- A: **yes — guard emitted immediately after (same statement group as) the `RefInc`**, before any
  further evaluation can allocate/throw; `arc.hexa` should treat `RefInc`/`Defer` as one conceptual
  pair (F3.3) and `genC` prints them adjacently. Alternative guard-before-inc with later assignment
  adds moving parts for no gain.
- Q: interaction with `printFunctionBody`'s appended `return 0` and with `metaBlock` lines that
  evaluate receivers/args — can an exception occur **between** `RefInc` and guard construction?
  If yes, reorder (construct guard first with null, then assign+inc?).
- A: only if the guard ctor can throw — **recommend a trivial (non-allocating, non-throwing) guard
  struct**, making the window empty by construction; `metaBlock` temps get their own guards at
  materialization. Keep the construct-then-assign pattern as fallback for non-trivial guards.
- Q: IIFE boundaries (`Block`/`Switch`/`Elvis`/`[for]` lowered to `Call(Function(...))`): does the
  guard belong inside the IIFE body (correct) — and does `arc.hexa`'s `processExpression→Function body`
  recursion place it there?
- A: **yes, inside the IIFE body** — the guard belongs to the Block owning the `RefInc`;
  `arc.hexa`'s `processExpression→Function body` recursion already visits it, F3.2 must keep pair
  placement inside that Block. Hoisting out would over-extend lifetimes and break LIFO.
- Q (per D6): decrements can never double-free — does that allow simpler guards (e.g. a `catch(...)`
  re-dec table instead of per-object RAII), or keep pure RAII for uniformity? Skipped decs are still
  permanent leaks, so "best-effort scope-end dec" stays a pure-C-only option.
- A: **recommend keeping RAII (D4)** — it also covers `return`/`break`/`continue` exits that a
  `catch(...)` table misses, and D6 only removed double-free risk, not leak risk; the re-dec table
  remains an emergency simplification if generated C++ compile times demand it.

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
- A: **recommend uniform `Any_*` thrown values** (matches D7 JS-ish semantics and today's `$try`
  shape) with catch tests via the same type-tag check `Is` uses (F10 metadata); fully-typed
  `catch (Foo_*)` C++ throws are a later optimization but break uniform lowering.
- Q: `Await/async` (no `genC` case): reject under both modes until async design lands, or map onto
  exceptions/coroutines? Explicitly out of scope — but say so.
- A: **recommend a clear rejection in `c`/`cpp` until F9 lands** (no silent miscompile); mapping
  onto exceptions would fake semantics that F9 must later unwind. Out of scope for F5.

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
- A: **recommend uniform env-first** (`m_(This* env, ...)`) — `this` IS the env for methods (F1-Q
  agreed) and one call shape serves closures and methods; distinct shapes save nothing on x64 and
  fork codegen.
- Q: `StructureNoVirtual` (normalizer never sets it today): set it for `@struct`, or keep
  decorator-derived `isStruct`? One source of truth.
- A: **recommend normalizer sets `api = StructureNoVirtual` for `@struct`** (D8: IR is canonical),
  migrating `genC`'s decorator re-derivations to read `c.api`; decorators remain the *input* the
  normalizer reads.

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
- A: **recommend two slots per element** with the D1 return convention (`get_` fills the `void**`
  code-ptr out-param, returns the env ref; `set_` takes the pair and retains the env per F7.1).
  Per D1's exception, a **single-slot mini-struct** element is the fallback if two-slot `get_/set_`
  gets awkward — decide together with the F1 array decision (D1 notes arrays/`Any`-boxing may need
  a mini-struct + singular referential value). Alternative boxed closure objects per element
  (uniform `Any_`-like storage) costs an alloc + indirection per element; rate two-slots >  mini-struct > boxed.
- Q: `String` interning + immortal globals (F2-Q) vs refcounted strings — which?
- A: **recommend both, split by origin** — literal `String_<id>` globals immortal (D2); computed
  strings (`String_$combine_`, `fromInt32`, ...) refcounted +1 and also interned via `root`/`next`,
  the intern table holding weak links removed by the sweep (D6) once rc hits 0. Alternative
  "intern ⇒ immortal" leaks computed strings — reject.

## F9. `async`/`await` on C++ coroutines
- Coroutine shape: every `async` func **always `co_return`s something** (forces compiler to treat it as a coroutine).
- Own `co_`-runner with **start-after-create executor** mimicking JS/Node.js async ordering.
- `genC` gap today: no `Await` case, `isAsync` ignored — reject or lower per this design.
- [ ] F9.1 Define `co_`-runner + executor placement (runtime headers vs emitted helpers).
- [ ] F9.2 Lower `async`/`await` to `co_return`/`co_await` in `genC` (`cpp` only); clear error on pure C.
- Q: how do ARC guards (F4) interact with coroutine frames (suspension = scope exit?)?
- A: suspension is **not** scope exit — locals live on in the coroutine frame; **recommend guards as
  frame locals** whose destructors run at promise destruction (final suspend/destroy), preserving D4
  semantics. A static "no ARC across `await`" restriction is a possible v1 simplification.
- Q: how do fat-pair closures (F1) cross suspension points (env lifetime)?
- A: **recommend +1 in the frame** — a fat value held across `co_await` retains its env (F3 entry
  rule) and the frame's guard releases at frame destruction; borrowing across suspension would race
  the sweep (D6).

## F10. Reflection (`Any`, `JSON.parse`, ...)
- Dynamic surface stays: `Any` field/method access, `is`/`as`, `JSON.parse`-like materialization.
- Interface semantics are TypeScript-like: **field** access (not just methods), `JSON.parse` dynamic
  object creation, reflection.
- Object shape: no hash table — a sequential `keys[]` array plus a parallel accessor `funcs[]`
  array; keys are interned-string pointers (pointer identity, no hashing).
- `Reflect.get` traverses linearly: `key == keys[i]` → `funcs[i](i, self, args)`. The accessor is
  per-field-type (reads by known offset and converts to `Any`, e.g. raw `uint8_t` Bool → `Any`);
  method fields' accessors ignore `i` (the index rides in a register anyway — nothing to optimize).
- Few fields per object by design: structural, nominal & Zig-style compile-time structural typing
  means runtime-structural interfaces are rare. Users may opt into Go-style typed JSON
  serialization into nominal class instances (`JSON.parse` takes a field-count hint to avoid
  realloc during first fill).
- Uniform mutation: `delete(obj.field)` and `a.newField = 123` both work through the same table.
  Write/delete accessors operate on the raw `uint64_t` key (interned name ref) with a constant
  xor/& mask landing in an impossible address range (tombstone marker — no name+prefix
  allocations). Deleting writes `null` into the slot; `ownKeys` iteration skips nulls and tolerates
  slots appearing during iteration (new fields append at the end, so they are eventually traversed).
- Possible future `@optimized interface{}` decorator for Go-like static shape (opt-in).
- [ ] F10.1 Define `Any` metadata/vtable surface needed by `genC` dynamic paths (`let_/$set/get_/set_`).
- [ ] F10.2 Scope `JSON.parse` return ownership under ARC (who retains the tree?).
- Q: does reflection reuse fat-pair/sentinel machinery, or need its own type tags?
- A: **recommend the accessor-table design above** — the accessor IS the type knowledge (no
  per-object type tags), reusing D2 sentinels for `Any` null/Bool boxes; fat-pairs appear only if
  reflection ever exposes function values.
- Q (per D7): exact truthiness table for `Any`→`Bool` — `0`, `NaN`, `''`, empty arrays/objects? One
  runtime `Any_toBool` implementing JS truthiness, or per-type fast paths?
- A: **recommend the exact JS table** (falsy: `false`, `±0`, `NaN`, `''`, `null`, `undefined`;
  `[]`/`{}` truthy) in one `Any_toBool` runtime helper; per-type inlined fast paths are a later
  codegen optimization, not a semantic difference.
- Q (per D7): `Any`→`Int`/`Float` — JS `ToNumber` (`null → 0`, `'12' → 12`)? `Any`→`String` — JS
  `ToString` (`null → 'null'`, i.e. interned id 1)? Who owns the returned strings under ARC?
- A: **recommend JS `ToNumber`/`ToString`** (`null → 0`, `'12' → 12`, `ToString(null) = 'null'` =
  interned id 1, consistent with the string table); converted strings are +1 (caller-side F4
  guard), interned literal results immortal (D2). Strict `as!` conversions keep today's casts
  (D7 governs dynamic semantics, not `as!`).

## F11. Memory allocator in Hexa itself
- Allocator is written in `.hexa`, not C++ `new`/`malloc` sprinkled in codegen.
- `HEXA_NEW/FREE` become calls into that allocator; `genC` only emits allocation sites.
- The manager itself is deferred ref counting (D6): intrusive `rc` + linked-list link in the
  allocation header. The lists are per **size group** (16-byte-aligned): `N*2` roots — N in-use,
  N unused. Allocation picks an available chunk from the unused roots; when a group runs dry it
  scans the in-use roots, checks `rc == 0`, and **migrates** those entries to the unused roots
  (that scan is the "sometimes" sweep).
- [ ] F11.1 Define allocator interface + refcount header layout (where does `rc` live?).
- [ ] F11.2 Route `HEXA_NEW`, closure/env allocs, `String`/`Array`/`Map`/interned `BigInt` through it.
- [ ] F11.3 Runtime linkage model: inline the Hexa runtime into plain `.exe` (static-CRT-like,
  default), share one runtime across `.dll`s, future: dedicated runtime `.dll` export.
  Files: `library/cxx/hexa.c`, `library/c/hexa.c`, the F11 allocator.
- Q: freestanding targets (no libc `malloc`) — which paths must avoid libc entirely?
- A: **recommend confining libc to the allocator bottom layer** (page backends: VirtualAlloc/mmap or
  a linker-provided heap) plus debug printing; all container/runtime logic is generated/Hexa code.
  A fully libc-free runtime is a later audit, not a design constraint.
- Q: sweep policy (D6) — full list walk on every allocation, or budgeted/periodic? What makes an
  allocation trigger a sweep "sometimes" (every N allocs, bytes threshold, explicit call)?
- A: **recommend the size-group migrate-on-pressure scheme** (decided direction): no sweep while
  unused roots have chunks; when a group runs dry, scan that group's in-use root and migrate
  `rc == 0` entries — self-budgeting, O(group size). Periodic full sweeps only as a leak-debug aid.
- Q: `rc` atomics — memory order (relaxed?), which threads are expected today, and does the sweep
  need synchronization against concurrent allocs?
- A: **recommend `relaxed` atomics + a documented "no cross-thread object sharing without external
  sync" rule** for now (programs are effectively single-threaded; atomics buy future-proofing
  cheaply); the sweep needs no locking under that rule. Upgrade to acquire/release when real
  threads land; plain non-atomic counters behind the same ops are a single-thread build option.
- Q: retained cycles (instance ↔ closure helper objects) are invisible to plain RC — accepted leak,
  or trial-deletion during the sweep?
- A: **recommend accepting cycle leaks for now** (classic RC semantics, documented); the sweep walk
  is the natural place to add trial-deletion/cycle-collection later.
- Q: shared runtime across `.dll`s — who owns the alloc list + sentinels (exported symbols,
  init-once)? What happens when an exe and its DLLs each statically link a runtime and objects
  cross the boundary?
- A: **recommend one runtime instance per process** (init-once exported state: roots + sentinels,
  matching D2 "singular, shared between DLLs"); objects are freed by their owning runtime via the
  narrow C ABI (`hexa_release` back into the owner). Per-module runtimes must forbid cross-boundary
  frees — workable but a footgun; rate single-instance higher.
- Q: runtime `.dll` ABI/versioning for the future export mode?
- A: **recommend a narrow exported C ABI** (`hexa_alloc/retain/release`, sentinel accessors,
  `hexa_abi_version()` checked at load) — C++ classes would freeze compiler-specific ABI; the
  inlined exe mode `static inline`s the same functions.

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
- [ ] Delete dead `_x` emitter + dead second `Switch` + pipe-operator comment block; silence `template/duplicate` logs; resolve `%...%` stubs and
  `ConstCharPointer` debug throws.
- [ ] Per D8 prefer pre-generator lowering over `genC` special cases: `guards/binds`, arrow
  elimination move to normalizer/passes (target-gated like `nativeIterators`); plain non-pattern
  `Switch` stays a **native switch** in Nice (LLVM supports it) — only pattern switches become
  step-machines, and `genC`'s dead C-`switch` emitter gets revived for those (or deleted consciously).
- Q: target-specific lowering (C lacks rich `switch`) — per-target capability flags in the
  normalizer (existing `nativeIterators`/`nativeEnums` pattern) vs always-generic lowering?
- A: **recommend capability flags + native switch retained in IR** — normalizer keeps plain switches
  intact for LLVM, lowers pattern switches generically, and only truly target-specific shapes (C's
  switch limits) fall to `genC` printer choices; always-lowering would permanently degrade future
  LLVM output.
- Q: which Nice enrichments land first (`NiceType`, field indices, `CapturedVar`) so a future
  LLVM/.asm generator avoids re-deriving them (D8)?
- A: **recommend order**: (1) `NiceType` + field-index `Field/DynamicField` (unblocks F1.6/F7 and
  LLVM value typing), (2) `CapturedVar`/closure IR + `CallKind.Closure` (F1), (3) `ToNullable/IsNull`
  (F2/F7); ordering by codegen pain yields the same list.

## How to read this doc next to the others
- `source/data/nice.hexa` — IR (`NiceName`/`CapturedVar` TODOs are now F1 inputs).
- `source/compiler/normalizer.hexa` — F1 captures + F3 predicate inputs live here.
- `source/compiler/normalizing/arc.hexa` — F3 work site (bug list in F3); header comment already
  states the `defer` intent D4 implements.
- `source/main.hexa` (~L810-843) — F3.4 reconnection point; `c`/`cpp` registry.
- `source/targets/genJs.hexa` — dynamic-semantics reference (not the ARC/fat model); JS-semantics
  baseline for D7 coercions.
- `docs/target-llvm.md` — future consumer of the same fully-lowered Nice IR (D8).
- `library/cxx/hexa.c` + `library/c/hexa.c` + `library/c/*.hexa` — F2 sentinels, F4 guard type,
  F5 handlers live here.
- `docs/native.md` (Function Pointers and Closures; Null Handling) — update the C sketches to the
  chosen two-var/two-field + sentinel forms once F1/F2 decide.
