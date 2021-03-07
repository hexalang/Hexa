# Parser

Takes [array of tokens](https://github.com/hexalang/hexa/blob/kawaii/source/data/token.hexa) as input, outputs [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

## Tasks 0.1

- [ ] Convert `@atts` decorators to nodes
- [ ] Evaluate conditionals `#if #else` upfront
- [ ] Return flag if conditionals `#if #else` exists in file (for syntax linter)
- [ ] Ensure `private @att static @att var` and alikes are impossible (BTW may be useful for syntax transformers - move to typer?)
- [ ] Support decorators for function arguments declaration
- [ ] Ignore comments tokens
  - [ ] Implement them as nodes
- [ ] Parse [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) `var\let []\{} = ...`
- [ ] Test all unop operators
- [ ] Test all binop operators
- [ ] Test all operators predecense
