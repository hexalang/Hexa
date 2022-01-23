# Typer

## Tasks 0.1

- [ ] Evaluate syntax transformers upfront
- [ ] Make generators registrable at runtime
- [x] Handle `if-else` as expression
  - [ ] Support single variable binding
    - [ ] Extend to multiple and mixed variable binding `if(,let,,let)`
  - [ ] Support multiple conditions `if(,,)`
  - [ ] Disable `break` and `continue` in them for now
- [ ] Detect and validate closures
- [ ] Handle checked exceptions
  - [ ] Possibility to suppress them (of course, this is not idiomatic)
  - [ ] Fill (infer) function info
  - [ ] Validate with function info
- [ ] Implement non-erasured generics
- [ ] Implement basic type constraints and dependent types (very draftily)
- [ ] Restore string escape sequences validation feature
