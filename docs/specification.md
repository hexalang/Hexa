Hexa Programming Language Specification
---------------------------------------

This file is kept in sync with the compiler.

# Introduction

Hexa is a high-level, strictly typed programming language designed to provide seamless compilation to both JavaScript and native applications. It aims to combine the flexibility and performance needed for modern software development with the robustness of strict typing.

# Example Code

Below is a sample code snippet written in Hexa:

```hexa
class PlatformDetector {
    static fun detect() {
        switch process.platform {
            case 'win32': return 'Windows'
            case 'darwin': return 'macOS'
            case 'linux': return 'Linux'
            case _: return 'Platform: \(process.platform)'
        }
    }
}

let supported = ['Windows', 'macOS', 'Linux']

if let yours = PlatformDetector.detect(), supported.includes(yours) {
    console.log('Yes, your platform \(yours) is supported!')
}
```

This example demonstrates a simple platform detection class and checks if the detected platform is supported. The language syntax is designed to be clear and concise, promoting readability and maintainability.

# File Format

Source code uses `.hexa` extension for modules.

Files must be in UTF-8 or ASCII encoding, preferably with Unix-style line endings (LF). Only latin symbols are allowed for declaration names. Everything, not described in the grammar as a token, and not contained inside of a string literal, is ignored by the lexer if its a whitespace or cause parsing error. Whitespace in the grammar is ignored by default until explicitly captured within a pattern.

UTF-8 BOM **\239\187\191** is ignored, same goes for the shebang **#!** line.

CRLF aka `\r\n` line ending format is considered to be valid.

Having a semicolon `;` is always syntax error.

# Grammar

Here is a simplified grammar overview in a normalized (Backus–Naur) form. Compiler follows this rules list exactly, where possible, but may unify or split some elements to ease parsing. Use it to make your own parsers, syntax highlighters, macro preprocessors or compilers.

## Keywords

They are always considered reserved within whole file scope, except string literals.

Some keywords are reserved for future use.

## Grammar Legend

Syntax tree formal language.

```js
// Syntax Tree Node
Node = Pattern

// Set of Contiguous Patterns
Node = FirstPattern SecondPattern
Node = FirstPattern SecondPattern ThirdPattern

// Either
Node = Pattern | Pattern
Node = Pattern | Pattern | Pattern

// Precedence is Left to Right
Node = FirstPattern | SecondPattern
Node = FirstPattern SecondPattern | ThirdPattern

// Atomic Token
Node = `keyword`

// One or More
Node = Pattern+

// Zero or More
Node = Pattern*

// One or None
Node = Pattern?

// Group
Node = (Pattern | Pattern)? | Pattern

// Exact Repetition
Node = Pattern*3
Node = Pattern Pattern Pattern

// No Empty Space Between Patterns
Node = Pattern ~ Pattern
Node = `@` ~ Pattern

// Regular Expression
Node = /[a-z]/
```

## Grammar

Module is defined as follows:

```ts
Module = `\239\187\191`? (`#!shebang` ~ `\r`? ~ `\n`? )? (Expression | Comment)*
```

Syntax tree definition:

```js
// Comments
Documentation = `///` ~ /.*/? ~ `\n`
Comment = CommentLine | CommentNestable
CommentLine = `//` ~ /.*/? ~ `\n`
// Nested multiline comments /* /* nested */ */
CommentNestable = `/*` ~ (/.*/ | CommentNestable | `\n`)* ~ `*/`

// Literals
Title = /[A-Z][a-Z_0-9]*/
Camel = /[a-z_][a-Z_0-9]*/

// Decorators @example(name: value)
Decorator = `@` ~ Camel ~ DecoratorParameters?
DecoratorParameter = (Camel `:`)? Expression
DecoratorParameters = `(` (DecoratorParameter `,`)+ | DecoratorParameter `)`
Decorators = Decorator*

// Expressions example(123)
Expression = Documentation* Decorator* ExpressionBody
ExpressionBody = Camel | Case
Case = `{` Expression*3 `}`
```
