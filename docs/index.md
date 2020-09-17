### The Hexa Compiler

Description of compiler internals with corresponding tasks (TODOs).

Feel free to contribute!

## Table of contents

- [Legend](#legend)
- [Folder structure](#folder-structure)
- [Compiler components](#compiler-components)
- [Targets](#targets)
- [Project home page](#project-home-page)
- [Changelog and release notes](changelog/versions.md)

## Legend

- `rfc` - request for comments (i. e. needs discussion)

## Folder structure

- [`docs`](https://github.com/hexalang/hexa/tree/kawaii/docs) — This online documentation
- [`source/compiler`](https://github.com/hexalang/hexa/tree/kawaii/source/compiler) — Compiler itself
- [`source/tests`](https://github.com/hexalang/hexa/tree/kawaii/source/tests) — Integrated compiler tests, they compiled *into* `hexa` executable and run before compilation (managed by `define.debug` of [`hexa.json`](https://github.com/hexalang/hexa/blob/kawaii/hexa.json))
- [`source/localization`](https://github.com/hexalang/hexa/tree/kawaii/source/localization) — Contribute translation to your native language
- [`library`](https://github.com/hexalang/hexa/tree/kawaii/library) — Standard library and target-specific libraries

## Compiler components

- [Lexer](lexer.md)
- [Parser](parser.md)
- [Typer](typer.md)
- [Normalizer](normalizer.md)

## Targets

- [JavaScript](target-javascript.md)
- [LLVM](target-llvm.md)
- [Haxe](target-haxe.md)

## Project home page

Also visit [hexalang.github.io](https://hexalang.github.io)
