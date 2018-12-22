# Lexer

Transforms input source files into array of simpler meaningful particles.

## Source code

- [source/compiler/lexer.hexa](https://github.com/hexalang/hexa/blob/master/source/compiler/lexer.hexa)
- [source/data/token.hexa](https://github.com/hexalang/hexa/blob/master/source/data/token.hexa)

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
  - [ ] Comments
  - [ ] Multi-line comments
  - [ ] Documentation comments

## Tasks 0.2

- [ ] Validate integer representations
	- [ ] Disallow trailing `_` underscore (rfc) example: `123_`, `123__`
- [ ] Validate float representations
	- [ ] Disallow trailing `_` underscore (rfc) example: `123._`, `123.0__`, etc
