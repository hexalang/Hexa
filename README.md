<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<img align="left" width="96px" height="96px" src="https://hexalang.github.io/favicon/apple-icon.png" />
<!-- markdownlint-enable MD041 -->
<!-- markdownlint-enable MD033 -->

# Hexa

`Her name is [Geksa]`

[![Telegram Chat](https://img.shields.io/badge/Chat-on%20Telegram-blue.svg?logo=telegram)](https://t.me/hexalang)
[![Discord](https://img.shields.io/badge/Discord-Join-758EDC.svg?logo=discord)](https://discord.gg/SsAWf9M)
[![GitHub Feed](https://img.shields.io/badge/GitHub-Feed-green.svg?logo=GitHub)](https://t.me/hexalang_github)
[![Blog](https://img.shields.io/badge/Read-Blog-CC317C.svg)](https://hexalang.github.io/book/hexa-compiles-itself)
[![Book](https://img.shields.io/badge/Learn-Book-5F5FFB.svg)](https://hexalang.github.io/book/)
[![Website](https://img.shields.io/badge/Web-hexalang.github.io-3fa5bf.svg)](https://hexalang.github.io)

Hexa is a high level, strictly typed programming language that compiles to JavaScript and native apps

[![Try Hexa online without installation](preview.svg?raw=true)](https://hexalang.github.io/try/)

[![GitHub Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/PeyTy)
[![Patreon](https://img.shields.io/badge/Patreon-become%20a%20patron-F86753.svg)](https://www.patreon.com/PeyTy)
[![Donate](https://img.shields.io/badge/Sponsor-crypto%20and%20$-gold.svg)](https://hexalang.github.io/donate/)
[![Telegram feed](https://img.shields.io/badge/News-on%20Telegram-blue.svg?logo=telegram)](https://t.me/s/hexalang_news)

## Key features of Hexa

- JavaScript-inspired syntax and behavior: Feel yourself right at home!
	- With the bits of TypeScript, Swift and Go
- Native performance with static types and optimizing compiler
- Follows Node.js (and browser) API
- Fast compilation
- Compiles to JavaScript, WebAssembly, [OSDev](https://github.com/GreenteaOS/Tofita), LLVM, C, C++, ObjC, ... you name it! **(WIP)**
- Transpilation to almost anything: Lua, AutoCAD Lisp, C#, PHP, etc **(WIP)**
	- Simple API for custom third-party transpilers **(WIP)**
- Produces human-readable code for all targets
- Null safety, crash resistance, pattern matching, classes **(WIP)**
- Real multithreading, parallelism, async/await, no GC **(WIP)**
- Smart type inference makes programming clean and simple
- Friendly and helpful error messages
- Supports `#!shebang` and scripting (just call `hexa script.hexa`) **(WIP)**
- REPL (enable with just `hexa` command) **(WIP)**
- Metaprogramming with syntax tree, generics and contracts **(WIP)**
- Completely cross-platform
- Stable long-term backward-compatible syntax **(WIP)**
- We are working on an optional memory ownership model (similar to borrow checker) and side effects system **(WIP)**
- Experimental C-to-Hexa and TypeScript-to-Hexa automatic conversion/import **(WIP)**
- JSX-style inline templating **(WIP)**
- And of course, IDE plugins with Language Server built right into Hexa!
- (this feature is yet to be decided) Precise optional systems-friendly Garbage Collector (GC) in addition to Hexa memory management that runs **sometimes/manually** to clean circular dependencies for you

> **WIP — Work in progress, coming soon**

## Download

- [`kawaii`](https://github.com/hexalang/hexa/tree/kawaii) is the development branch and accepts pull requests
- [`artifacts`](https://ci.appveyor.com/project/PeyTy/hexa/build/artifacts) are built from each *kawaii* branch commit

### Stable

- [Try Hexa online without installation](https://hexalang.github.io/try/)
- [**Latest stable release**](https://github.com/hexalang/hexa/releases/latest)
- [All releases](https://github.com/hexalang/hexa/releases)

### Unstable

#### Windows

- [Latest build from git](https://ci.appveyor.com/project/PeyTy/hexa/build/artifacts)
- [Build from source](https://github.com/hexalang/hexa#build)

#### Linux

Builds are made from the latest commit:

- [Install with Arch Linux AUR](https://aur.archlinux.org/packages/hexa-git) (maintained by [@expwez](https://github.com/expwez))
- If you're maintainer, make a Pull Request!

#### Mac

- Coming Soon!

### Tools & IDE

- [Visual Studio Code / VSCode](https://marketplace.visualstudio.com/items?itemName=PeyTy.vshexa) — [hexalang/hexa-vscode-bundle](https://github.com/hexalang/hexa-vscode-bundle) is the best supported IDE plugin right now!
- [Sublime Text 3](https://packagecontrol.io/packages/Hexa) — [hexalang/hexa-sublime-bundle](https://github.com/hexalang/hexa-sublime-bundle)
- [Atom](https://atom.io/packages/hexa) — [hexalang/hexa-atom-bundle](https://github.com/hexalang/hexa-atom-bundle)
- [Package manager](https://hexalang.github.io/book/package-manager) — [hexalang/packages](https://github.com/hexalang/packages)

#### AI Autocomplete

Install [Codeium](https://marketplace.visualstudio.com/items?itemName=Codeium.codeium) then open `.hexa` file and confirm experimental Hexa support.

[Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) also works just fine! Seems to be activated for `.hexa` files by default. Remember to login via `Command Palette`.

## Study

- [Follow progress](https://github.com/hexalang/hexa/issues)
- [Sources of inspiration](https://hexalang.github.io/book/syntax-and-inspiration)
- [Getting started guide for beginners](https://hexalang.github.io/book/hello-hexa)
- [Some code examples](https://hexalang.github.io/book/syntax-examples)
- [Comparison with other languages for experienced developers](https://hexalang.github.io/book/comparison-with-other-languages)
- [Why Hexa?](https://hexalang.github.io/book/why-hexa)
- [Contribute your compilation target](https://hexalang.github.io/book/third-party-compilation-targets)

## Build

You need to download latest long-term [Node.js LTS](https://nodejs.org/en/download/).
The Hexa Compiler is written in Hexa itself. Pre-built compiler (bootstrapper) already included in the repo.

```sh
git clone --recursive --depth 100 https://github.com/hexalang/Hexa.git
cd Hexa
node bootstrap.js hexa.json
node hexa-node.js hexa.json
# This results in a `hexa-node.js` file in the root of the repo
# Call `node hexa-node.js project.json` to build your projects
```

You may now add the folder into your PATH.

[Learn more about compiler development](https://hexalang.github.io/book/lexer)

## License

See LICENSE files for full license texts and headers of each file
(files in same directory may use different licensing models).
If license is not mentioned in header then LICENSE file in upper directory level to be considered.

Compiler and some tools are under Lesser GPL 3.0 (feel free to include as a library in closed source projects),
standard libraries and examples are under MIT.
