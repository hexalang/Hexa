# JavaScript Target

[Node.js](https://nodejs.org) inclusive

...and [WebAssembly](https://en.wikipedia.org/wiki/WebAssembly) with asm.js in future

## Tasks

- [ ] Generate toString(value) for enums at compile time (instead of  placing enum tag names at runtime)
  - [ ] Make them look pretty!
- [ ] Optimize enums
  - [ ] Do not store tag name
  - [ ] Store combined UID+TAGID in first element
- [ ] Make sure all enums are unique (disable cache for now)
- [ ] Generate type-specific `??` elvis operators
- [ ] Fill bindings for basic types
  - [ ] String
  - [ ] Map
  - [ ] Array
  - [ ] Math
  - [ ] RegExp
  - [ ] JSON
  - [ ] etc
- [ ] Optionally include documentation in generated code
  - [ ] And normal comments, too
- [ ] Generate source maps
- [ ] Properly print all escape sequences
- [ ] Make distinction between browser and node
