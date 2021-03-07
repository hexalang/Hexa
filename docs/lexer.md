# Lexer

Transforms input source files into array of simpler [meaningful particles](https://github.com/hexalang/hexa/blob/kawaii/source/data/token.hexa). Only [UTF-8](https://en.wikipedia.org/wiki/UTF-8) supported.

Lexer ignores [UTF-8 BOM](https://en.wikipedia.org/wiki/Byte_order_mark) header and `#!/bin` [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)).

- Note: "lexer" also referred as "tokenizer"

## Tasks 0.1

- [ ] Support full JSON token set
  - [ ] Write tests
- [ ] Read regular expressions ` ~/.../i`
- [ ] Parse all integer representations
  - [ ] `123`
  - [ ] `1_000_000`
- [ ] Parse all float representations
- [ ] Add extra tokens
  - [ ] RegExp
  - [ ] Comments `//`
  - [ ] Multi-line comments `/* */`
    - [ ] Nesting
  - [ ] Documentation comments `///`

## Tasks 0.2

- [ ] Validate integer representations
    - [ ] Disallow trailing `_` underscore (rfc) example: `123_`, `123__`
- [ ] Validate float representations
    - [ ] Disallow trailing `_` underscore (rfc) example: `123._`, `123.0__`, etc
