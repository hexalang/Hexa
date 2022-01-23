<img align="left" width="96px" height="96px" src="https://hexalang.github.io/favicon/favicon-96x96.png" />

# Hexa

`Her name is [geksa]`

[![Telegram chatroom](https://img.shields.io/badge/chat-on%20telegram-blue.svg?logo=telegram)](https://t.me/hexalang)
[![Telegram feed](https://img.shields.io/badge/news-on%20telegram-blue.svg?logo=telegram)](https://t.me/s/hexalang_news)
[![GitHub Feed](https://img.shields.io/badge/github-feed-green.svg?logo=GitHub)](https://t.me/hexalang_github)
[![Blog](https://img.shields.io/badge/read-blog-CC317C.svg)](https://hexalang.github.io/blog/)
[![Book](https://img.shields.io/badge/learn-book-5F5FFB.svg)](https://hexalang.github.io/book/)
[![Build status](https://ci.appveyor.com/api/projects/status/gi6cm17w4r0l3ahj/branch/kawaii?svg=true)](https://ci.appveyor.com/project/PeyTy/hexa/branch/kawaii)
[![Website](https://img.shields.io/badge/web-hexalang.github.io-3fa5bf.svg)](https://hexalang.github.io)

Hexa is a high level, strictly typed programming language that compiles to JavaScript and native apps

[![Try Hexa online without installation](preview.png?raw=true)](https://hexalang.github.io/try/)

[![AUR GIT](https://img.shields.io/badge/archlinux--aur-hexa--git-0088CC.svg?logo=Arch-Linux)](https://aur.archlinux.org/packages/hexa-git)
[![Donate](https://img.shields.io/badge/donate-crypto%20and%20$-gold.svg)](https://hexalang.github.io/donate/)
[![Patreon](https://img.shields.io/badge/Patreon-become%20a%20patron-F86753.svg)](https://www.patreon.com/PeyTy)
[![Discord](https://img.shields.io/badge/Discord-join-758EDC.svg?logo=discord)](https://discord.gg/SsAWf9M)

## Key features of Hexa

- JavaScript-inspired syntax and behavior, feel yourself like at home!
- Native performance with static types and optimizing compiler
- Follows node.js (and browser) API
- Fast compilation
- Compiles to JavaScript, WebAssembly, [osdev](https://github.com/GreenteaOS/Tofita), LLVM, C, C++, ObjC, ... you name it! **(WIP)**
- Transpilation to almost anything: Lua, AutoCAD Lisp, C#, PHP, etc **(WIP)**
- Transpilation produce human-readable code for all targets
- Null safety, crash resistance, pattern matching, classes **(WIP)**
- Real multithreading, parallelism, async\await, no GC **(WIP)**
- Smart type inference makes other typed languages look boring
- Friendly and helpful error messages
- Supports `#!shebang` and scripting (just call `hexa script.hexa`)
- REPL (enable with just `hexa` command)
- Metaprogramming with syntax-tree, generics and contracts **(WIP)**
- Completely cross-platform

> **WIP — Work in progress, coming soon**


## Download

- [`kawaii`](https://github.com/hexalang/hexa/tree/kawaii) is the development branch and accepts pull requests
- [`artifacts`](https://ci.appveyor.com/project/PeyTy/hexa/build/artifacts) are built from each kawaii commit *and* pull requests

#### Stable

- [Try Hexa online without installation](https://hexalang.github.io/try/)
- [**Latest stable release**](https://github.com/hexalang/hexa/releases/latest)
- [All releases](https://github.com/hexalang/hexa/releases)

#### Unstable

- [Latest build from git](https://ci.appveyor.com/project/PeyTy/hexa/build/artifacts)
- [Build from source](https://github.com/hexalang/hexa#build)
- [Install with Arch Linux AUR](https://aur.archlinux.org/packages/hexa-git)

### Tools & IDE

- [Visual Studio Code / VSCode](https://marketplace.visualstudio.com/items?itemName=PeyTy.vshexa) — [hexalang/hexa-vscode-bundle](https://github.com/hexalang/hexa-vscode-bundle) is the best supported IDE plugin right now!
- [Sublime Text 3](https://packagecontrol.io/packages/Hexa) — [hexalang/hexa-sublime-bundle](https://github.com/hexalang/hexa-sublime-bundle)
- [Atom](https://atom.io/packages/hexa) — [hexalang/hexa-atom-bundle](https://github.com/hexalang/hexa-atom-bundle)
- [Package manager](https://hexalang.github.io/book/Packages.html) — [hexalang/packages](https://github.com/hexalang/packages)

## Study

- [Follow progress](https://github.com/hexalang/hexa/issues)
- [Sources of inspiration](https://hexalang.github.io/blog/Syntax-and-Inspiration.html)
- [Getting started guide for beginners](https://hexalang.github.io/book/Hello.html)
- [Some code examples](https://hexalang.github.io/book/Examples.html)
- [Comparison with other languages for experienced developers](https://hexalang.github.io/book/Comparison.html)
- [Why Hexa?](https://hexalang.github.io/book/Profit.html)
- [Contribute your compilation target](https://hexalang.github.io/book/Targets.html)

## Enjoy!

While compiler is in dev, here's some cool music to listen :headphones:

* [Cyberpunk 2077 Radio Mix](https://www.youtube.com/watch?v=Q9yn1DpZkHQ)
* [Home Cooked](https://www.youtube.com/watch?v=EyLlOio4bUU)
* [Drip](https://www.youtube.com/watch?v=Bm-q0v0ZYf4)
* [Stay Here Tonight](https://soundcloud.com/just-portals/stay-here-tonight)
* [Standing Over Here](https://soundcloud.com/just-portals/standing-over-herexx)
* [Paranoid](https://soundcloud.com/pistutm/dansette-junior-paranoid-official-video)
* [Gifted](https://soundcloud.com/josecfmarques/n-a-s-a-feat-kanye-west)

## Build

You need to download latest long-term [Node.js LTS](https://nodejs.org/).
The Hexa Compiler is written in Hexa itself. Pre-built compiler (bootstrapper) already included in the repo.

```sh
git clone --recursive --depth 100 https://github.com/hexalang/hexa.git
cd hexa
node bootstrap.js hexa.json
# This results in a `hexa-node.js` file in the root of the repo
# Call `node hexa-node.js project.json` to build your projects
```

Optionally to build .exe and add icon:

```sh
npm i -g nexe
nexe-build.bat
```

[Learn more about compiler development](https://hexalang.github.io/hexa/)

## License

See LICENSE files for full license texts and headers of each file
(files in same directory may use different licensing models).
If license is not mentioned in header then LICENSE file in upper directory level to be considered.

Compiler and some tools are under Lesser GPL 3.0 (feel free to include as a library in closed source projects),
standard libraries and examples are under MIT.
