# Normalizer

Transforms typed abstract syntax tree to a [simpler representation](https://en.wikipedia.org/wiki/Intermediate_representation) called "nice nodes", suitable for code generation.

Also does some basic optimizations.

## Source code

- [source/compiler/normalizer.hexa](https://github.com/hexalang/hexa/blob/kawaii/source/compiler/normalizer.hexa)
- [source/data/nice.hexa](https://github.com/hexalang/hexa/blob/kawaii/source/data/nice.hexa)

## Tasks 0.1

- [x] Handle `if-else` as expression
  - [ ] Support single variable binding
    - [ ] Extend to multiple and mixed variable binding `if(,let,,let)`
  - [ ] Support multiple conditions `if(,,)`
- [x] `[for()]` array comprehension
  - [ ] Validate implementation
  - [ ] Unwrap when resulting value is unused
- [ ] Transfer closures information
- [ ] Transfer positional information (for source-maps)
- [ ] Generate and transfer reference counting information
- [ ] Implement `@defer` (very basic for now)
- [ ] Improve builds randomization
- [ ] Eliminate never used external declarations
