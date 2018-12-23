### The Hexa Compiler

Description of compiler internals with corresponding tasks (TODOs).

Feel free to contribute!

## Table of contents

- [Folder structure](#folder-structure)
- [Compiler components](#compiler-components)
- [Targets](#targets)

## Legend

- `rfc` - request for comments (i. e. needs discussion)

## Folder structure

- [`docs`](https://github.com/hexalang/hexa/tree/master/docs) — This online documentation
- [`source/compiler`](https://github.com/hexalang/hexa/tree/master/source/compiler) — Compiler itself
- [`source/tests`](https://github.com/hexalang/hexa/tree/master/source/tests) — Integrated compiler tests, they compiled *into* `hexa` executable and run before compilation (managed by `define.debug` of [`hexa.json`](https://github.com/hexalang/hexa/blob/master/hexa.json))
- [`library`](https://github.com/hexalang/hexa/tree/master/library) — Standard library and target-specific libraries

## Compiler components

- [Lexer](lexer.md)
- [Parser](parser.md)
- [Typer](typer.md)
- [Normalizer](normalizer.md)

## Targets

- [JavaScript](target-javascript.md)
- [Haxe](target-haxe.md)
