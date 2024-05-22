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

# Grammar

Here is a simplified grammar overview in a normalized (Backus–Naur) form. Compiler follows this rules list exactly, where possible, but may unify or split some elements to ease parsing. Use it to make your own parsers, syntax highlighters, macro preprocessors or compilers.

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

Syntax tree definition.

```js
// Literals
Title = /[A-Z][a-Z_0-9]*/
Camel = /[a-z_][a-Z_0-9]*/

// Decorators @example(name: value)
Decorator = `@` ~ Camel ~ DecoratorParameters?
DecoratorParameter = (Camel `:`)? Expression
DecoratorParameters = `(` (DecoratorParameter `,`)+ | DecoratorParameter `)`
Decorators = Decorator*

// Expressions example(123)
Expression = Camel | Case
Case = `{` Expression*3 `}`
```
