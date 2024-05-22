Hexa Programming Language Specification
---------------------------------------

This file is kept in sync with the compiler.

# Grammar Legend

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

# Grammar

Syntax tree definition.

```js
// Literals
Title = /[A-Z][a-Z_0-9]*/
Camel = /[a-z_][a-Z_0-9]*/

// Decorators @example(name: value)
Decorator = `@` ~ Camel ~ DecoratorParameters?
DecoratorParameter = (Camel `:`)? Expression
DecoratorParameters = `(` (DecoratorParameter `,`)+ | DecoratorParameter `)`

// Expressions example(123)
Expression = Camel | Case
Case = `{` Expression*3 `}`
```
