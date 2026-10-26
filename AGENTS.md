Here is source code of Hexa compiler project:

Hexa is a high level, strictly typed programming language that compiles to JavaScript and native apps.
JavaScript-inspired syntax and behavior (with bits of TypeScript, Swift and Go), static types,
smart type inference, null safety, fast compilation, human-readable output for all targets.
The Hexa compiler is written in Hexa itself (self-hosted, pre-built bootstrapper already in repo).

Fresh bootstrap is always created on every build and re-builds the compiler itself as a regression test.

Hexa is a programming language that we are making (uses .hexa file extension)

No need to indent manually, LSP autoformat handles that.

Edit/read only .hexa files until requested otherwise.

Leave // concise comments at the functional blocks to describe the meaning of the code.

File structure brief (see hexa.json `global` for compile order, `entry: cli`):
Only `source\...` (compiler) and `library\...` (std) are described below, ignore everything else.
- source\main.hexa compiler driver — `declare class Package` (hexa.json shape: name/version/roots/global/entry/files/targets/define/randomSeed), `class Main` (full build pipeline: `processFile`/`processModule`/`loadModules`/`loadPackage`/`perform` + `repl`/`typeCheck` + `simplyCompileToJs`): Lexer.tokenize → Parser.parseNodes → Typer.fillModules → Normalizer.normalize → GenJs/GenCxx/GenLua.perform, CLI flags (`--target`, `--output-folder`, `--define`, `syntax-linter`, `targets`, `init`, `symlink`), `setLibrary`/`availableGenerators` target wiring, timing/line-count success message
- source\cli.hexa CLI entry (`entry: cli` in hexa.json, pre-parses process.argv and dispatches to help/version/init/symlink/listen/build/REPL)
- source\cli\args.hexa parsed-arguments enum (Help/Listen/Version/Init/Symlink/Build/Repl)
- source\cli\help.hexa `printHelp`/`printVersion` + ANSI color helpers (indigo/blue/ocean)
- source\cli\init.hexa `init()` — asks package questions and creates hexa.json
- source\cli\symlink.hexa `symlink()` — PATH install stub (linux/mac/win32 switch)
- source\repl.hexa REPL stdin helper (`question()` sync read over Buffer/Fs, win32 vs /dev/stdin)
- source\compiler\lexer.hexa tokenizer (`class Tokens` token/value/kind/line/column/fileName buffers + `Lexer.tokenize`/`Lexer.init`)
- source\compiler\preprocessor.hexa `#if` conditional compilation over token stream (zero-alloc fast path when no `#`)
- source\compiler\parser.hexa recursive-descent parser (`class Parser`: tokens → `[Node]`, `toNode`/`parseNodes`, lint/fast modes)
- source\compiler\typer.hexa type checker (`class Typer.fillModules`: untyped parser `Node` → typed tree, `onlyTypeCheck` mode for language server)
- source\compiler\normalizer.hexa simplifier (`class Normalizer.normalize`: typed AST → `NiceProject` nice nodes for codegen, keyword/globalAccessor handling, inline opts)
- source\compiler\normalizing\arc.hexa ARC ref-counting pass (`ArcInserter`: inserts RefInc/DeferRefDec after Normalizer)
- source\compiler\normalizing\reflect.hexa reflect pre-lowering pass (`ReflectLowerer`: lowers dynamic `Any` shapes to explicit reflection calls after Normalizer, before ClosureLifter; genC stays almost-pure C AST printer)
- source\compiler\normalizing\renaming.hexa field renaming strategy (`@asTitleCase`/`@asIs` → `FieldRenaming`)
- source\data\data.hexa `enum Node` — full untyped syntax tree (String/Import/Var/Class/Function/Call/…)
- source\data\nodes.hexa `NodeData` position info (line/column/fileName) + `ClassKind` (Class/Interface/Type)
- source\data\nodeType.hexa `enum NodeType` — syntactic type annotations (`Optional`/`Type`/`ParametricType`/`Function`/…)
- source\data\types.hexa `enum Type` — typer-resolved semantic types (Constant/Generic/Unknown/Class/Function/…), input to normalizer
- source\data\token.hexa `enum Token` — full lexeme/token list
- source\data\project.hexa `class Module` (file/path/nodes/exported/imported) + `class Project` (global container: moduleName/moduleInfo/mapModules/globals/data/hints/defines)
- source\data\helper.hexa `DataHelper` node extensions (`varName`/`nameOf`/…)
- source\data\decorator.hexa `class Decorator` (`@name(values)` + `getDecorator`)
- source\data\comments.hexa `class Comment` — doc-comment storage (line/block/doc kinds)
- source\data\compilerError.hexa `CompilerError`/`CompilerErrors`/`Fail` + `alternativeErrorFormat` flag (thrown at any stage)
- source\data\hints.hexa compiler hint list (printed after normalize, before generate)
- source\data\nice.hexa `NiceProject`/nice nodes — simplified typed IR consumed by generators
- source\targets.hexa target registry (`enum Generators` JavaScript/Native, `availableGenerators(name)`, `setLibrary(target, options, defines)`)
- source\targets\genJs.hexa JS generator (`class GenJs`: nice nodes → modern JS with classes/let/const/=>, `.js` extension)
- source\server.hexa legacy compiler-server protocol (`ServerCommandKind`: GetWholeFileSyntaxErrors/SyncFileContents/FindProjectFile/AutocheckProject/Completion/Hover/…)
- source\server\api.hexa server API types stub (TODO only)
- source\server\lsp.hexa standard LSP server (`class LspServer`: JSON-RPC over stdin/stdout for VSCode/Zed/…, document sync + diagnostics)
- source\server\format.hexa legacy formatter entry (delegates to beautify)
- source\server\beautify.hexa two-phase token-based formatter (Phase 1 enrichment: bracket depth/line adjacency, Phase 2 assembly: gap + indent rules, deterministic/idempotent)
- source\server\prettify.hexa prettifier variant (formatter alternative, WIP)
- source\tests\testLexer.hexa integrated lexer unit tests (run under `#if debug` + `#if times` before compile in Main.perform)
- source\tests\testParser.hexa integrated parser unit tests
- source\tests\testTyper.hexa integrated typer unit tests
- source\tests\testFormat.hexa integrated formatter unit tests
- source\toHexa\clang\clangMain.hexa C-to-Hexa entry (`c2hexa`: minify/generate actions over `ClangProject` config)
- source\toHexa\clang\clangTree.hexa C AST tree types (libclang dump shape)
- source\toHexa\clang\clangMinifier.hexa C header/source minifier (feeds generator)
- source\toHexa\clang\clangGenerator.hexa C-to-Hexa code emitter
- library\... Hexa stdlib declares (type surface only — all `declare` + `@rename`, no runtime code; consumed by typer + name mangling in generators):
  - library\js\js.hexa JS intrinsic declares (@rename'd globals: undefined/globalThis/Infinity/NaN, encode/decodeURI(Component), typeof/__js__/eval, parseInt/parseFloat/BigInt, instanceof/strictEqual, timers, requestAnimationFrame, performance, document/window/navigator/clipboard, fetch, TextDecoder, WebSocket, AbortController + wrapper classes Any/Number/Int*/UInt*/Float*/Bool/String/Array/Object/Symbol/Math/JSON/Set/Map/WeakMap/WeakSet/Console/Date/Reflect/Promise/RegExp/Error/*Error/AggregateError + `selfVersion`)
  - library\js\bootstrap.js.hexa bootstrap glue for the prebuilt compiler (bootstrapper-only, not part of language surface)
  - library\nodejs\nodejs.hexa Node.js runtime declares (require/__dirname/__filename, Buffer/ArrayBuffer, process, fs/path/os modules)
  - library\browser\html.hexa browser DOM declares (document/window legacy globals)
  - library\c\c.hexa C-target runtime declares (primitives for GenC/GenCxx output)
  - library\c\array.hexa + map.hexa + string.hexa + runtime.hexa C-target containers/runtime (array/map/string/memory glue emitted alongside native output)
  - library\cs\cs.hexa C#-target declares (for genCSharp, WIP)
  - library\cxx\... + library\native\... + library\haxe\... emitted native/haxe helpers (`.c`/`.cpp`/`.asm` payloads, not Hexa type surface)
- hexa.json has file list for compiler
