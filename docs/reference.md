# Hexa Syntax Reference

This document is a draft of the Hexa syntax reference. It is not yet complete and may change.

Is does *not* correspond to the full actual syntax of Hexa yet. It's a draft of the syntax changes that will be released in the future. The compiler already released on the GitHub will catch up ASAP.

Below is a comprehensive list of the syntax elements of Hexa.
Every syntax element is shown with an examples of all possible variations.

Most ideas have been validated through real-world Hexa usage in web and systems programming.

> NOTE: This file will be transformed into an auto-test for a parser.

> NOTE: Only minimal semantic overview is provided here. Syntax is key.

# State

Reference is a work in progress:

- [x] Initial Draft (must cover at least every feature briefly)
- [ ] Internal Review
- [ ] Complete Draft (must cover every feature in detail)
- [ ] External References Check
- [ ] Tree-Sitter Reference Grammar
- [ ] Full Review
- [ ] Final Draft
- [ ] Release to hexalang.github.io (with navigation)

# Goals

Hexa syntax is designed to follow those standards:

- [x] Declarative -> Code flows in a straightforward and unambiguous way
- [x] Easy to read and write -> Both by humans and tools
- [x] Performant -> Features do not come at a noticeable runtime cost
- [x] Safe -> Behavior is well defined and sound by default
- [x] Scalable -> Code is easy to maintain with a growing team and project complexity
- [x] Minimalistic -> As little syntax and as few special forms as possible
- [x] Target-agnostic -> Syntax and core semantics stay identical across all targets
- [x] Fast to compile -> High parsing speed is key to a smooth development experience

# Syntax

Keep in mind that Hexa is targetting output platforms like JavaScript/TypeScript, C/C++ and direct LLVM/WASM binaries. Syntax is designed to be as close to the output as possible both visually and semantically, yet still allows for automatic performance optimizations and advanced features.

Semicolons are never required. Files are UTF-8 (with optional BOM skipping and optional shebang at the first line starting with `#!` also skipped).

## Comments

Hexa supports single-line, multi-line, and documentation comments.

```hexa
// Single-line comment
// Supports minimal `markdown` syntax in highlighting (assumed that every Hexa-compliant editor supports it)

/*
   Multi-line comment

   /* Nested */
*/

/// Documentation comment (single-line)
/// Can have more lines - they will combine into single doc comment
/// They do not interact with decorators
/// NOTE requires expression below it
fun foo() {}
// NOTE super easy to transform // into /// even for lazy developers
```

### Design Considerations (Comments)
- **Doc tags**: Support doc tags like `@param` and `@returns` with example usage like `fun square(x Int) Int { return x * x }`

## Identifiers

Identifiers can contain alphanumeric characters and underscores `_`. They must start with a *lowercase* letter or underscore.

Unicode characters are not allowed. Only latin alphabet is supported, with numbers and underscores.

```hexa
var myVariable = 1 // Type is inferred
var myVariable T = 1 // no `:` and no `;` semicolons (syntax is context-free so they are not required) -> no automatic semicolon insertion either
let _ssa = 2 // Read-only
```

## Variables

Variables are declared using `var` (mutable) or `let` (immutable, readonly variable itself, aka single-assignment).

```hexa
// Mutable variable
var x = 1
x = 2

// Shadowing is fine (local to the block)
let x = 1
let x = 2

// Immutable constant (can be computed at runtime, but not re-assigned)
let y = 3
// y = 4 // Error

// Type annotation
var z Int = 5

// External declarations
declare var externalVar Int // NOTE no `= value` assignment allowed
// Readonly external declaration
declare let externalConst String // Type is required for `declare`
```

## Literals

### Keywords

Keywords are reserved words that cannot be used as identifiers.

They are not contextual and always reserved in any syntax construct.

```hexa
true false
null
fun return
var let
declare private static
throw try catch
for while in break continue
if else
switch case
class enum type interface super
async await
```

#### Design Considerations (Keywords)
- **Missing keywords**: Are there any missing keywords

#### Reserved Words

Some words are reserved for possible future use.

They will be either removed and available as identifiers or transformed into keywords.

```hexa
const // Possibly for `const [1, 2, 3]` for readonly array literals (i.e. `ReadonlyArray<T>`)
readonly // ^ or this one
defer yield
default
public protected out
template macro abstract
when with
guard infer
implements extends
export of from using inout
```

Anything that starts with `#` is reserved for future use: `#foo`.

##### Design Considerations (Reserved Words)
- **Missing reserved words**: Are there any missing reserved words

NOTE: reserved words and keywords are chosen to not conflict with JSX function names (i.e. HTML tag names).

### Numbers

Hexa supports integers and floating-point numbers.

```hexa
// Integers
let a = 123
let hex = 0xFF
let hex = 0xff
let bin = 0b101

// Floats
let b = 1.23 // 64-bit float by default
let exp = 1.2e-5

// Suffixes
let u8 = 123u8
let u16 = 123u16
let u32 = 123u32
let u64 = 123u64
let u128 = 123u128
let i8 = 123i8 // Also `123_i8`
let i16 = 123i16
let i32 = 123i32
let i64 = 123i64
let i128 = 123i128
let f32 = 1.23f32 // Also `1.2e-5f32` etc

// All integer suffixes compatible with hexadecimals
let hex = 0xFFu128
let hex = 0xffu128

// BigInt
let big = 123n
let hex = 0xFFn
let bin = 0b101n
let readability = 0b101_010n // Underscore separators compatible with sizes

// Underscore separators
let big = 1_000_000
let hexadecimal = 0xFF_FFn
let underscores = 0xFF__FFn // Multiple underscores is fine -> they serve as readability tools
```

#### Design Considerations (Numbers)
- **Compact suffixes**: Compact float suffixes and complex numbers etc + 123ptr.
- **Negation**: Should `-123` be a token for negation or a unary operator? Token-wise it would allow proper inference of the integer size (i.e. `let x Int16 = -123` would be `-123i16`).

### Strings

Strings can be enclosed in double quotes `"`, single quotes `'`, or backticks `` ` ``.

```hexa
let s1 = "Hello"
let s2 = 'World' // No difference in meaning
let s3 = `
    Multi-line
    String
`
let s4 = "Hello \n World"
let s5 = "Hello \"World\"" + 'Hello \'World\'' // Concatenation with `+` operator

// Regular expression
let s6 = /Hello World/
let s7 = /Hello World/gi

// String interpolation
let s8 = "Hello \(1 + 2) World"
let s9 = "Hello \(foo.bar) World" // Any expression is valid
// NOTE `\()` allows to avoid reserving normal characters like `$` for interpolation and adding new syntax for strings themselves
// `()` is a clear group around expression avoiding problems like "Hello $a + $b World" vs "Hello $(a + b) World" having only "Hello \(1 + 2) World" syntax

// Unicode escape
let s10 = "\u{1F600}"
```

#### Design Considerations (Strings)
- **Extended formatting**: Describe extended formatting via `\(value : format)` i.e. `\(value : '0000')` for padding. Should support external format variables like `let formatted = "0000" \(value : formatted)` and `let zeros = 4 \(value : '0*(zeros)')`.
- **Raw strings**: Support for raw strings with `r"""` or `r""`.
- **Nested string interpolation**: Support for string interpolation with `\(value \(anotherValue))` and nested escaping `"Hello \(foo.bar(baz[\"key\"]))"`.

### Booleans

```hexa
let t = true
let f Bool = false
```

### Null

The `null` can only be passed to a known nullable type (`T?` with a question mark suffix):

```hexa
let n T? = null // Ok
let n T = null // Error: expected nullable type `T?`, got `T`
let n = null // Error: there's no actual baking type, just `null`
```

### Arrays

```hexa
let arr = [1, 2, 3]
let empty [Int] = []
let none [Int]? = null
let oneNull [Int?] = [null]

// Trailing comma
let array = [1, 2, 3,]

// Spread operator
let a = [1, 2, 3]
let b = [4, 5, 6]
let c = [0, ...a, ...b]

// Switch with destructuring
switch arr {
    case [x, y, z]: // No trailing comma allowed in patterns
        console.log(x, y, z)
    case [1, _, z]: // Match and capture, ignoring the second element
        console.log(z)
    case [x, ...rest]: // Match and capture rest
        console.log(x, rest)
    case []:
        console.log("Empty")
    case _:
        console.log("Other")
}
```

#### Design Considerations (Arrays)
- **Nullable destructuring**: Should `let [x, y, z] = arr` be allowed for nullable arrays, or force `switch`
- **More patterns**: What other array patterns should be supported

### Maps/Dictionaries

Map is a simple key-value store. It's not an object like {}. Keys are arbitrary expressions of any type.

```hexa
let map = ["key": "value", "one": "two"] // Inferred as [String: String]
let emptyMap [String: String] = [:]
// Immutable map
let immutableMap [String: String] = let ["key": "value", "one": "two"]

// Trailing comma
let map = ["key": "value", "one": "two",]

// Switch with destructuring
switch map {
    case ["key": "value", "one": "two"]: // No trailing comma allowed in patterns
        console.log("Match")
    case _:
        console.log("Other")
}

// Any expression works as a key
let map = [1 + 1: "two", 2 + 1: "three", getFour(): "four"]
```

#### Design Considerations (Maps)
- **Immutability**: Should maps be immutable by default
- **More patterns**: What other map patterns should be supported

### Objects

Object is a simple fixed key-value store. It's not a map like []. Keys cannot be changed (added/removed) syntactically, only via reflection.

```hexa
let obj = { x: 1, y: 2 } // Inferred as type/interface { var x Int var y Int }
// NOTE mutable by default
let obj2 = let { x: 1, y: 2 } // Immutable

// Switch with destructuring
switch obj {
    case { x: 1, y: 2 }:
        console.log("Match")
    case _:
        console.log("Other")
}

// Shorthand for two or more fields (single value would confuse with a block)
let value = 132
let obj = { value, x: 1, y: 2 }
let obj = { value } // Special case for single value

// Computed field names
let name = "x" // Compile-time known field names will be included in the inferred type declaration
let obj = { (foo()): 1, (name): 2 } // Uses same `()` syntax for computations as in pattern matching
obj.x // Safe to access
obj.(foo()) // Error: unknown field name, requires runtime reflection (`Reflect.get`)
obj.(name) // Safe to access -> can compute the name at compile-time

// Object spread-copy for Redux-like updates
let obj = { ...obj, z: 3 }
```

#### Design Considerations (Objects)
- **Type inference**: Should untyped objects be inferred as `type` or `interface`? (for typed objects it's clear)
- **Immutability**: Should objects be immutable by default
- **More patterns**: What other object patterns should be supported
- **Shorthand**: Rethink shorthand for two or more fields. Maybe allow special case for single value? `{ value }` could be a special case for block with only a single identifier inside -> was actually useful in some cases; this syntax is useless anyway for any other purpose so no confusion.
- **Computed fields**: Are computed field names really useful

## Decorators (Attributes/Annotations)

Decorators are compile-time concept, like C++ attributes.

Decorators start with `@` and are placed before a declaration. Multiple decorators are allowed (in any order). Their names are camelCase (like identifiers), any name is allowed (including reserved keywords).

They may alter behavior of the declaration they are attached to or even trigger compile-time actions like AST transformations via macros.

```hexa
@struct // NOTE decorators are not expressions and they require one below them
@packed
@sizeOf(16) // Expected size of the type in bytes checked by the compiler versus actual size
class AcpiTableHeader {
    @bits(8) var signature UInt8 // Decorators may fine-tune the generated code (bit fields, etc)
}

// Work with types too
@decoratorOnVariable var x @example Int = 123

@inline fun foo() {} // Any expression, type or declaration can be decorated
x = @example 123

// Decorators can contain any expressions as parameters
@example("example") // Unnamed
@example(example: "example") // Named
@example(1, 2, name: value) // Multiple parameters
fun foo() {}

// Decorators on function arguments
fun someFunction(@readonly some Type) {
    // ...
}

// Decorators on externals
@external declare fun foo() // Also let/var/class/etc
```

### Design Considerations (Decorators)
- **Duplicate decorators**: Should `@sameName @sameName` be allowed? `@sameName @sameName fun foo() {}`
- **Namespaces**: Should we support `@namespace.decorator` syntax? `@namespace.decorator fun foo() {}` -> unrelated to modules
- **Order semantics**: Is `@a @b fun f()` equivalent to `@b @a`

## Operators

### Arithmetic

```hexa
a + b
a - b
a * b
a / b
a % b  // Remainder
a \ b  // Integer divide
// ++a NOTE prefix form is not allowed for clarity
// --a
a++ // Only one way to avoid confusion (both syntactically and semantically)
a--
some.field++
// NOTE not allowed over `array[index]++` as indexed value may be null/non-existent

// Unary operators
// NOTE no prefix form `+a` due to confusion with platform-specific behavior
-a

// Overflow runtime check is optional
@checked { // Also @wrapping @wrapAround
    var x Int = 2147483647
    x++ // ERROR: Overflow -> exception is thrown (depends on the target platform)
    console.log(x)
}
```

### Comparison

```hexa
a == b
a != b
a < b
a > b
a <= b
a >= b
```

### Logical

Logical operators are short-circuiting, easy to read and write.

```hexa
a and b // Same as classical &&
a or b  // Same as classical ||
not a   // Same as classical !
// NOTE ^ they accept only boolean operands (i.e. `Bool`)
```

### Bitwise

```hexa
a & b   // Bitwise AND
a | b   // Bitwise OR
a ^ b   // Bitwise XOR
~a      // Bitwise NOT
a << b  // Left shift
a >> b  // Right shift
a >>> b // Unsigned right shift
```

### Assignment

```hexa
a = b
a += b
a -= b
a *= b
a /= b
```

### Design Considerations (Operators)
- **Integer division**: Rethink `\` operator
- **Assignment operators**: Add other assignment operators

### Other

```hexa
obj.prop // Property access
arr[index] // Element access
map[key] = value // Forks for map too (also assignment)
a ... b     // Interval
cond ? a : b // Ternary operator (NOTE nested ternary is not allowed)
expr = if cond { a } else { b } // {} are required
(args) => expr // Arrow function
(args) => { expr } // Arrow function with block that returns `expr` -> if block should not return then use `fun`
// NOTE arrow functions have no types, they are inferred
// To use types, use a function (as value expression):
fun (args) return { expr } // NOTE shorthand for `fun (args) { return expr }` i.e. functional programming style -> `{}` is required as we do not respect one-liners, `{}` "enforces" putting the body on a new line
_ = call() // Indicate that not using a returned value is intentional
```

## Control Flow

### Top-Level Statements

Useful for simple scripts. Hexa has no main function.

```hexa
// At the .hexa file level
let x = 1
let y = 2
console.log(x + y)
```

### Blocks

```hexa
// Blocks create a scope
{
    let x = 1
    let y = 2

    // Standalone blocks are allowed
    {
        // Shadowing is allowed -> scope limited to the block
        let x = 1
        let y = 2
    }
}

// Blocks can be used as expressions
let result = {
    let x = 1
    let y = 2
    x + y // The last expression is the result
}
```

### If / Else

`if` can be used as a statement or an expression. {} are required

```hexa
if x > 0 {
    console.log("Positive")
} else if x < 0 {
    console.log("Negative")
} else {
    console.log("Zero")
}

// Multiple conditions
if x > 0, y < 10 { // Same as `if (x > 0) and (y < 10)`
    console.log("Positive")
}

// Compatible with bindings
if let x = a, y > b, let z = c { // NOTE `let z` is allowed
    console.log(x, y, z)
}

// Expression
let result = if x > 0 { "Positive" } else { "Non-positive" }

// `=` assignment is not an expression
if a = b { // Error
    // Will not compile, eliminates typos from if (a = b) instead of if (a == b)
}

// `if` can be used as an expression with {} required, `else` is required
let result = if x > 0 { "Positive" } else { "Non-positive" }
// Useful for cases like `if let` unsupported by the ternary operator
```

### Loops

NOTE `for`, `do` and `while` loops are not expressions.

```hexa
// While
while x > 0 {
    x--
}

// While with multiple conditions and bindings
while let x = a, y < 10 {
    y++
}

// Do-While
do {
    x++
} while x < 10 // NOTE no () for consistency and no `,` after the condition to avoid unnecessary complication of the `do while` loops (they are already pretty rare and confusing)

// For-In
for item in items { // NOTE no `let` required but still creates a local read-only variable, `var` is not allowed
    console.log(item)
    break // No labels allowed or supported, outer break is done with meta methods
    continue
}

// For loop with range
for i in 0 ... 10 { // NOTE `i` is not visible outside the loop and is read-only
    console.log(i)
}

// Iterating over a number (0 to N-1)
var count = 100
for i in count { // Can be any integer expression including sized like `1u8`
    // Idiomatic -> iterates from 0 to count-1
}

// Iterating over a number (0 to N-1) without a variable
for i in 100 { // NOTE some variable name is always required
    // i is 0, 1, ..., 99
}

// Loops from n to m-1 (thus allows to iterate over an array.length)
for i in n ... m {}
for i in 0 ... array.length {}

// Shorthand for numbers - can omit 0
for i in array.length {}

// Inclusive loop syntax N/A, just use +1
for i in n + 1 {}
for i in 0 ... n + 1 {} // Interval accepts expressions on both sides
```

#### Design Considerations (Loops)
- **Omit variable**: Allow to omit variable name with `_` in `for _ in iterable` loops (suppress unused warning)
- **Key-Value**: Support for key-value iteration

### Switch

Exhaustiveness checking is done when the type allows for it.

```hexa
switch value { // Plain integer is not exhaustive
    case 1:
        console.log("One")
        // no break needed, assumed to break by default
    case 2:
        console.log("Two")
    case x if x > 10: // Pattern guard can work over captured `x` (captured from `value`)
        // NOTE guards are not exhaustive, they are runtime checks
        console.log("Greater than 10")
    case _ ... 123:
        console.log("Less than 123")
    case 1 ... 123:
        console.log("Between 1 and 122")
    case 123 ... _:
        console.log("Greater than 123")
    case _:
        console.log("Other")

    // case 1: case 2: // Error when `case` on the same line to avoid confusion for C programmer (should use `case 1 or 2:` instead)
}
```

### Branching

```hexa
break
continue
return value // Always picks next expression (until `return` is the last expression itself)
{ return } // Just-return without picking next expression -> less confusion compared to automatic semicolon insertion
throw error
```

### Try / Catch

There's no `finally` block.

```hexa
try {
    risky()
} catch e Error {
    handle(e)
}

// Multiple catch blocks
try {
    risky()
} catch e Error {
    handle(e)
} catch e Exception {
    throw e // Re-throw
}
```

#### Throw

Checked and unchecked exceptions are supported.

```hexa
throw Error("message") // Checked by default
@unchecked throw Error("message", cause)

// Throwing arbitrary values is allowed
throw "any value" // When the target supports it, otherwise wrapped in an error
```

##### Design Considerations (Throw)
- **Checked exceptions**: Describe `@throws` and checked/unchecked exceptions in more detail

## Functions

Closures follow same rules as a JavaScript functions (capture by reference), including arrow functions.

```hexa
// Basic function
fun add(a Int, b Int = 5) Int { // Default arguments are allowed
    return a + b // {} around body is required for clarity (when no `return` short-hand is used instead of the body itself)

    // Nested functions
    fun nested() {}
    nested()

    // Arguments are not re-assignable (assume `let`)
    // a = 123 // Error
}

// Calls
add(1, 2)
add(1) // b is optional

// Optionally can be called with same argument names as in function declaration (no need for separate named arguments set)
add(a: 1, b: 2) // NOTE order is required to match arguments
add(a: 1, 2) // Does not matter which one to name, developer decides for clarity at call site
add(1, b: 2)

// Generic function - implicit
fun identity(x) { // NOTE lack of type parameters (both <T> and T)
    // NOTE this function is still fully generic, it just infers the type
    return x
}

// Arrow function
let double Callback = (x) => x * 2 // NOTE arrow functions require known expeted type to infer their arguments

// Arrow function lowering to a plain function
let plain = (x) => x * 2 // Lack of known types when assigned directly to a new constant is lowered to a plain `fun` function:
fun plain(x) { // NOTE preserves genericity
    return x * 2
}
plain(1)

// Function  type
let func (x Int, y Int) => Int = add // NOTE arguments are required to be named for clarity

// External function
declare fun externalFunc() Void // NOTE no body

// Generic function - explicit
fun identity<T>(x T) T {
    return x
}

// Generic function - trait bound at argument level
fun identity(x BoxTrait<Int>) Int { // NOTE using traits as types makes the whole function generic
    return x
}

// Generic function - trait bound at argument level - advanced
fun identity<T>(x BoxTrait<T>) T { // NOTE passing <T> into a trait
    return x
}

// Usage -> <T> is inferred where possible
let x = identity(123)

// Calling generic function with explicit type arguments
let y = identity<String>("hello") // NOTE no space in between < and T

// Generic function with trait bound
fun identity<T BoxTrait<Int>>(x T) T {
    return x
}

// Generic function with multiple trait bounds `<T Bound1, U Bound2>`
fun identity<A BoxTrait<Int>, B BoxTrait<String>>(x A, y B) Void {
    console.log(x)
    console.log(y)
}

// Overloading
fun fooForInt(x Int) Int {
    return x
}

fun fooForString(x String) String {
    return x
}

// Function as value
let func = fooForInt
let func = fun (x Int) Int { return x } // NOTE can be named or unnamed
func(123)

// Recursion
fun fib(n Int) Int {
    if n <= 1 {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

// Recursion with function by value
let fibAsValue = fun fib(n Int) Int { // Needs name to be recursive -> arrow function cannot be recursive but `fun` syntax is interchangeable
    if n <= 1 {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

fibAsValue(10)
```

### Design Considerations (Functions)
- **Argument order**: Should we enforce order when all arguments are named? Could enable custom evaluation order i.e. `add(b: 1, a: 2)`
- **Implicit generics**: Possibly make implicit generic functions `private` to avoid confusion (thus they are either module-local or private to a class)
- **Rest parameters**: Support for `...rest` parameters and Variadic Functions
- **Arrow function short-hand**: Should we support `example(_ => { })`

### Overloading

Hexa supports clean compile-time function overloading via declarative `is` / `or` syntax.

Alternatives are tried left-to-right, and the feature works inside classes too (to define methods and static methods).

```hexa
fun foo is fooForInt or fooForString // Allowed at the use site too
foo(123)
foo("hello")
```

## Classes and Interfaces

Types (classes, interfaces, traits, enums) always start with a capital letter.

### Classes

```hexa
class Point {
    var x Int
    private var y Int // NOTE only `private` is supported, it behaves like `protected` in other languages

    // Constructor
    // Can be `private` (then only accessible from within the static methods and descendants)
    new (x Int, y Int) {
        this.x = x
        this.y = y
    }

    fun move(dx Int, dy Int) {
        this.x += dx
        y += dy // NOTE `this` is optional when there are no name conflicts
    }

    static var xx Int // NOTE static members are allowed
    private static var yy Int // NOTE private static members are allowed

    static fun origin() Point {
        return Point(0, 0) // `new` not required and not allowed
    }

    fun noMethodBody() Void // NOTE turns into abstract class
}

// External class or structure (with @struct)
@final // Disallow inheritance
declare class Point {
    var x Int
    let y Int // Can be read-only
}
```

### Design Considerations (Classes)
- **Nested classes**: Inner/nested classes are currently not supported for code clarity. Should this change

### Class Constructors

```hexa
class Point {
    // Order is not important if compiler can prove it (with simple control flow analysis)
    let z Int = y // If `y` can be computed upfront, `z` will be evaluated after it (in the constructor body)

    var x Int // No default value -> must be either assigned in `new` or at creation site with `Point { x: 1 }`
    var y Int = 0 // Can have default values

    // NOTE only single, non-overloaded constructor is allowed
    new (x Int, y Int = 0) { // NOTE default values are allowed in `new`
        this.x = x
        this.y = y
    }
}

let point = Point(1, 2) // NOTE `new` not allowed i.e. `new Point`

// Alternatively
class Point {
    var x Int
    var y Int

    // NOTE `new` assumed by default
    // `private new() {}` to disable construction outside, allowed to be called only from within static methods
}

// JSON-like syntax
let point = Point() { x: 1, y: 2 }
let point = Point { x: 1, y: 2 } // Can omit `()` when `new` does not require any arguments or they have defaults
// NOTE either `()` or `{}` at least should be present

// Alternatively even more JSON-like
let point Point = { x: 1, y: 2 } // Type inference -> Point type omitted on the right side
let point Point = { "x": 1, y: 2 } // NOTE `"x"` is okay if corresponding field is called `x` too
let point Point = { "x": 1, "y": 2 } // Enables copy-paste of actual JSON into the code -> field names are checked and should match

// Making a copy (when `new` does not require any arguments)
let point2 = { ...point }
// Copy with altered fields
let point3 = { ...point, x: 3 }
// With arguments
let point4 = Point(a, b) { ...point, x: 3 }
// With argument names
let point5 = Point(x: a, y: b) { ...point, x: 3 }
```

#### Design Considerations (Class Constructors)
- **Overloaded constructors**: Should overloaded constructors be allowed? Like `new is fromString or fromInt`. At least for `type` traits

### Generic Template Classes

Generics work as compile-time templates (unless opted-in to be a runtime generic).

```hexa
class Box<T> {
    var value T

    new (value T) {
        this.value = value
    }
}

let box = Box<Int>(123)

// More complex example
let box2 = Box<Box<Int>>(Box(123))

// Generic Classes with Multiple Type Parameters
class Box<T, U = Int> { // NOTE default type parameter value
    var value T
    var value2 U

    new (value T, value2 U) {
        this.value = value
        this.value2 = value2
    }
}

let box3 = Box<Int, String>(123, "hello")
```

### Const Generics

Const generics allow to create types that depend on values.

```hexa
class Box<T, let size T> { // NOTE `let` is used to declare a const generic and can depend on other generics (e.g. `T`)
    var value T

    new (value T) {
        this.value = value * size
    }
}

let box = Box<Int, 1>(123)
let box = Box<Int, size: 1>(123) // Explicitly named const generic

// Default const generic value
class Box<T, let size T = 123> { /* ... */ }

// Enumerations cannot be used as const generics -> they must be of a simple basic type
enum AsyncMode Int { Async AutoAwait CallerDecides }
class MyWorker<let mode AsyncMode> { }
MyWorker<AsyncMode.Async>() // Error: conflicts with `<T.U>` type namespace syntax
// Would also make impossible to use this pattern:
let mode = meta.getDefine('asyncMode') // Arbitrarty-named compilation flag passed globally into the project (plain integer, boolean or string only)
```

#### Design Considerations (Const Generics)
- **Syntax conflict**: Conflicts with `<T.U>` type namespace syntax. Could still make sense if compiler sees that the final `.U` is a enum tag
- **Syntax**: Rethink if `<let size T>` or just `<size T>`

### Type Traits

Traits reuse `type` keyword but overall parsed same way as a class.

Usage of `trait` keyword would reduce adoption and semantically does not fully match the concept of the `type`. The `type` fits better as in "structural typing". Types are compile-time concept and usage of `type` reinforces this.

```hexa
// Parsing rules same as of classes
type BoxTrait { // NOTE traits use `type` keyword but overall parsed same way as a class
    fun box() Void
}

// Generic trait
type BoxTrait<T> {
    fun box(value T) Void
}

// Implementing trait
class Box BoxTrait<Int> { // NOTE traits are implemented just mentioning them in the class declaration
    fun box(value Int) Void {
        // Do something
    }
}

// Implicitly implementing a trait
class Box { // NOTE no need to mention trait in the class declaration
    fun box(value Int) Void {
        // Do something
    }
}

// Trait can be used structurally
let box BoxTrait<Int> = Box()

// Enums can implement traits too
enum Color BoxTrait<Int> { Red Green Blue fun box(value Int) Void { } }

// Generic class with a trait as a type limit
class Box<T BoxTrait<Int>> { // NOTE `BoxTrait<Int>` is a type limit placed after the type parameter with a space in between
    var value T

    new (value T) {
        this.value = value
    }
}

// Generic class with multiple trait bounds `<T Bound1, U Bound2>`
class Box<T Trait1, U Trait2> {
    var value T
    var value2 U
    // ...
}

class Box<T, U BoxTrait<T>> { // NOTE can pass <T> to the trait left-to-right
    var value T
    var value2 U

    new (value T, value2 U) {
        this.value = value
        this.value2 = value2
    }
}
```

### Associated Types

Hexa supports family polymorphism:

```hexa
type BoxTrait<T> {
    type Value = T
}

// Type bundles
type Traits {
    type A // NOTE when `=` absent, the implementor should provide it
    type B
    type C
}

type TraitsFor<T> {
    type A = T
    type B = T
    type C = T
}

// Implementing them explicitly
type TraitsBundleX Traits {
    type A = Int
    type B = String
    type C = Float
}

type TraitsBundleY Traits {
    type A = Bool
    type B = String
    type C = Float
}

// Using them as namespaces
var x TraitsBundleX.A = 123
var y TraitsBundleY.A = true

// Generic type bundles
type GenericTraitsBundle<K> {
    type Collection<V> = Map<K, V> // NOTE `V` is a generic type parameter of `type` field inside of the trait
}

// Usage
var x GenericTraitsBundle<Int>.Collection<String> = Map<Int, String>()

// Also as local namespaces
class Box<Types Traits> {
    type Alias = Types.A

    var value Types.B = ""
    var value2 Types.C = 0.0
}
```

#### Associated Types in Type and Const Patterns

Important to note that evaluated const patterns are immutable (pure) and cannot call any methods (macro system is supposed to be used for complex cases) except non-mutating meta-methods (e.g. `meta.alignOf`).

```hexa
let box = Box<TraitsFor<Int>>()
let padding = 8

// Type patterns can be associated types too
class Box<T, U, Z, let size Int> {
    // Still works as normal `let`, possibility to be used in type patterns is decided on-demand
    let align = U.meta.alignOf

    type Value = switch T, size {
        // T == Int, size == 1
        case Int, 1: Int

        // T == Array<U>, size == 2
        case Array<U>, 2: Array<Z>

        // T == Map<U, anything captured as V>, size == 3
        case Map<U, _ as V>, 3: Map<V, Z>

        // `()` for expressions (any compile-time known expression is valid)
        case _, (padding + U.meta.sizeOf): Z

        // Same for `if` guards
        case _, (padding + U.meta.sizeOf) as size if size > align: Z

        // Custom type error -> allows co make custom type limits/concepts
        case _, 0: throw "Invalid size, expected non-zero, got: " + size // String-only

        // Fallback
        case _, _: Z
    }
}

// Enables fine-grained types with `meta`
class Box<T> {
    type Allocator = switch T.meta.sizeOf {
        case 1: switch T {
            case Bool: BitAllocator
            case _: ByteAllocator<1>
        }
        case 2 ... 4096 as size: ByteAllocator<size>
        case _: PageAllocator
    }
}
```

### Inheritance

```hexa
class Shape {
    fun draw() {}
}

// Single inheritance (first in the list) but any number of traits or interfaces allowed (in any order)
class Circle Shape Trait Interface {
    fun draw() { // NOTE `override` is not required - but signature must match
        // Draw circle
        super.draw() // Call parent method
    }

    new () {
        // Call constructor of the parent class
        super()
    }
}
```

### Interfaces

Compared to traits, interface is a runtime feature (via reflection and virtual methods if the platform supports it). Interfaces are parsed the same way as classes.

```hexa
// Parsing rules same as of classes
interface Drawable { // NOTE runtime feature compared to traits
    fun draw() Void
}

class Box Drawable { // NOTE no need to use `implements` keyword
    fun draw() {
        // Draw box
    }
}
```

#### Design Considerations (Interfaces)
- **Implicit implementation**: Should we support implicit interface implementation

### Properties

```hexa
class Rect {
    var width Int
    var height Int

    var area Int {
        get {
            // Assumes `return` as if it were `get return { expr }` (not actual syntax)
            // This makes properties more declarative
            width * height
        }

        // Optional setter
        // set(v) { /* ... */ }
    }
}
```

#### Design Considerations (Properties)
- **Setters**: Rethink setter syntax

### Destructuring

```hexa
// NOTE `let` is required for clarity, does not work with `var`
let {width, height} = Rect {width: 1, height: 2}

switch value {
    case {width, height}: // NOTE `let` is NOT required
        console.log("Width: ", width, "Height: ", height)
    case {width: 123}: // NOTE checking a specific value
        console.log("Width: ", width)
    case {width: _ > 123 and _ != 0, height}: // NOTE checking a condition with compile time known expression
        console.log("Width: ", width)
        console.log("Height: ", height) // NOTE height is not checked

    case SomeEnum(rect: {width, height}): // NOTE destructuring inside the pattern
    case SomeEnum(rect: {width: 123}): // NOTE checking a specific value inside the pattern
        console.log("Width: ", rect.width)
        // NOTE with nested pattern {} the `rect` itself is not captured
        console.log("Width: ", width, "Height: ", height)

    // Capture with renaming
    case SomeEnum(rect as rectangle: _): // Capture any `rect` as a variable `rectangle`
        console.log("Rectangle width: ", rectangle.width)

    // Advanced patterns
    case {width: _ > 123 and _ != 0, height}: // NOTE checking a condition with compile time known expression
        console.log("Width: ", width)
        console.log("Height: ", height) // NOTE height is not checked

    case {width} if width > 123: // NOTE checking a condition with runtime expression
        console.log("Width: ", width)

    // With alias
    case {width as w: _ < 123}: // NOTE checking a condition
        console.log("Width: ", w)
}
```

#### Design Considerations (Destructuring)
- **Ensure ambiguity**: Make sure every pattern is soundly disambiguated

## Enumerations

```hexa
// Complex enums
enum Color {
    // NOTE tags are always capitalized (uppercase first letter) and not confused with variables in pattern matching
    Red
    Green
    Blue // No separator required (i.e. no `,`)

    // With payload
    Other(r Int, g Int, b Int, a Int = 255) // Both name and type are required
    // NOTE can have defaults

    // Nested
    Nested(value Color)
}

// Simple tag (no payload)
Color.Red != Color.Red // Every instance is unique value for non-baked enums

// Enum with values -> has a baked type (here `Int`)
enum Status Int { // NOTE adding basic type after the space turns it into a constant enum
    Ok = 200
    NotFound = 404
    BadRequestError = 404 // Duplicate value is NOT allowed with constant
    BadRequest = NotFound // Duplicate value is allowed with alias
    Overloaded // Inferred value as BadRequest + 1 (auto-increment)
}

Status.Ok == Status.Ok // Every tag is just a raw value with a name
var plain Int = Status.Ok // ERROR: Sound type system disallows this
```

### Enumerations in Conditions

Special case for `==` and `!=` operators:

```hexa
if value == Status.Ok { // NOTE otherwise would parse as `Status.Ok {}` class constructor
    console.log("Ok")
}
```

There's no use for `==` operator with newly constructed values as every instance is unique. The `==` would just return `false` in such cases.

From this point of view, its not an "exception" as it utilizes otherwise useless syntax construct.

## Pattern Matching

Compared to classic `switch` statement, pattern matching matches over patterns by the logic of "more specific first". The order of cases is not important (most of the time -> when patterns are not depending on runtime values).

```hexa
switch value { // uses `switch` keyword for pattern matching thus familiar to C-family developers
    case 1:
        console.log("One")
        // NOTE assumes `break` at the end of each case by default
    case 2:
        if Math.random() > 0.5 {
            break // NOTE `break` is allowed only when `switch` is not used as an expression (i.e. does not return a value)
        }
        console.log("Two")
    case _: // NOTE exhaustive match by default, requires `_` to be present if not all cases are covered
        console.log("Other")
    case null: // NOTE `null` always checked first no matter where it is placed
        console.log("Null")
}
```

Enumeration tag can be made non-exhaustive by adding `nonExhaustive` modifier. This is useful for cases when you want to allow for new tags to be added in the future without breaking the code.

```hexa
// @nonExhaustive -> optionally make the whole enum non-exhaustive
enum Status Int {
    A
    B
    @nonExhaustive C // NOTE `C` is not exhaustive
}
```

### Design Considerations (Pattern Matching)
- **Non-exhaustive**: Should we use `@nonExhaustive` or `@exhaustive(false)`

### Switch as Expression

A `switch` can be used as an expression, its always exhaustive.

The `case _:` is used instead of `default` to be consistent with nested pattern matching: `case Other(_):` allowing for wildcard pattern matching without confusing `case Other(default):` syntax.

```hexa
var three = 3 // NOTE `var` i.e. can be any actual value at the moment of pattern matching

let result = switch value { // NOTE no `()`
    case _: // NOTE always checked last no matter where it is placed
        "Other"
    case 1 if value >= 1: // NOTE `if` is a runtime check, its executed when pattern is matched but if evaluates to `false` then next case is checked
        "One"
    case 2:
        "Two"
    case (three): // NOTE `()` pick runtime value to match to
        "Equal to variable called `three`"
}
```

### Enum Pattern Matching

```hexa
enum Color {
    Red
    Green
    Blue
    Other(r Int, g Int, b Int)
    Nested(color Color)

    // May have fields
    let some = 123
}

switch value {
    case Red: // NOTE `case Color.Red:` and `case .Red:` are NOT allowed
        console.log("Red")
        // NOTE assumes `break` at the end of each case by default
    case Green or Blue:
        console.log("Green or Blue")
    case Other(r, g, b as blue):
        // NOTE exact same names are required (i.e. `r` and `g`)
        // NOTE order of parameters is NOT important due to names requirement above
        // NOTE `b as blue` allows to rename parameter
        // NOTE parameters are captured as readonly local variables scoped to the case body
        console.log("Other", r, g, blue) // NOTE only `blue` is accessible here

    // Advanced patterns with nested enums
    case Nested(color: Red):
        console.log("Nested Red")
    case Nested(color: Green or Blue):
        console.log("Nested Green or Blue")
    case Nested(color: Other(r, g, b as blue)):
        console.log("Nested Other", r, g, blue)
    case Nested(color: Nested(color: Red)):
        console.log("Nested Nested Red")
}
```

#### Design Considerations (Enum Pattern Matching)
- **Enum Pattern Matching**: How to match both by internal value, fields and tag? Like `case Other(color: Red) { some: 123 }:`

### Enum Flags

```hexa
switch flags {
    // 1. EXACT Match
    // Transpiles to: if (flags == Flag1)
    case Flag1:
        // ...

    // 2. PARTIAL Match (Has Flag1 set, ignores others)
    // Transpiles to: if ((flags & Flag1) == Flag1)
    case Flag1 | ...:
        // ...

    // 3. EXCLUSION (Has Flag1, but DEFINITELY NOT Flag2)
    // Transpiles to: if ((flags & Flag1) == Flag1 && (flags & Flag2) == 0)
    case Flag1 | ... | not Flag2:
        // ...

    // 4. COMBINATION (Has Flag1 AND Flag2)
    // Transpiles to: if ((flags & (Flag1|Flag2)) == (Flag1|Flag2))
    case Flag1 | Flag2 | ...:
        // ...
}
```

Compatible with multiple matches and alternatives:

```hexa
switch value {
    case A | B | C or D | E | F: // NOTE `or` has lower precedence than `|` here
        console.log("Either exact (A | B | C) or exact (D | E | F)")
}

switch value1, value2 {
    case A | B or D | E, 123: // NOTE `123` matches `value2` because its separated by comma
        console.log("Either exact (A | B and also 123) or exact (D | E and also 123)")
}
```

Can be nested:

```hexa
switch value {
    // NOTE named parameters checked with `name: pattern`
    case Other(flags: Flag1 | Flag2 | ..., otherValue1, otherValue2):
        console.log("Exact (Flag1 | Flag2 | ...) and also captures otherValue1, otherValue2")
}
```

#### Enum Flags Shorthands

```hexa
if value & A {
    console.log("A")
}

if value & (A | B) { // NOTE requires () because the (A | B) is a *value* not pattern
    console.log("A and B")
}

// Same as
let requiredFlags = A | B
if value & requiredFlags {
    console.log("A and B")
}
```

## Types

### Basic Types

- `Int`: Integer
- `Float`: Floating-point number
- `Bool`: Boolean
- `String`: String
- `Void`: No return value
- `Any`: Dynamic type

### Composite Types

- `[T]`: Array of T
- `[K: V]`: Map with key K and value V
- `T?`: Optional T (nullable)
- `type { let x Int let y Int }`: Object type

```hexa
// Shorthand for a type -> otherwise just inferred
var point type { let x Int let y Int } = { x: 1, y: 2 }
```

### Type Aliases

```hexa
type ID = String
type Generic<T> = Other<T>
type Callback = (result Int) => Void
type GenericCallback<T> = (result T) => Void
```

### Casts

```hexa
// Old way
expr is Type
expr as Type   // Safe cast (exception on failure)
expr as? Type  // Safe cast (returns nullable)
expr as! Type  // Force unsafe cast

// New way - good for chaining and avoids precedence confusion
// Example: `123 + 345 as T` is confusing: `123 + (345 as T)` or `(123 + 345) as T`
expr.as(Type).as(OtherType<T>).method() // Enables chaining

// Enables rich casting options when targeting C++, Java, C#, etc
expr.as(Type, 'static_cast')
expr.as(Type, 'dynamic_cast')
expr.as(Type, 'const_cast')
expr.as(Type, 'reinterpret_cast')

// Enables to do straight-forward casts with compile time known values
let cast = 'reinterpret_cast'
expr.as(Type, cast)
```

#### Design Considerations (Casts)
- **Multi-casts**: Support for multi-casts? I.e. `expr.as(Type, 'dynamic_cast', 'const_cast', 'reinterpret_cast')`
- **Behavior**: Behaviour specification for dynamic casts (throw vs null)
    - `expr.as(Type, 'dynamic_cast', 'throw') // cast-or-throw`
    - `expr.as(Type, 'dynamic_cast', 'null') // cast-or-null`
- **Syntax**: `expr.as(Type)` vs `expr.as(Type, 'static_cast')` vs `.as?` `.as!`
- **Is operator**: Describe `is` operator

### Type Matching

The captured variable is introduced in the narrowest possible scope, no extra `let` and no chance to use the wrong cast later.

Compile-time for known types (plays well with generics), runtime for `Any`.

```hexa
switch type value {
    case Bool:
        console.log("Bool")
    case Int(captureAsInt): // NOTE captureAsInt is readonly and equals to `value` casted to Int
        console.log("Int", captureAsInt)
    case String(captureAsString):
        console.log("String", captureAsString)
    case String({ length }):
        // Destructuring in type patterns
        console.log("String.length", length)
    case Array<Int>(captureAsArray): // NOTE generics too
        console.log("Array of Int", captureAsArray)
    case _:
        console.log("Other")

    // Optionally capture value as-is
    case other:
        console.log("Other", other)
}

// Works as expression too
let result = switch type value {
    case Int(captureAsInt):
        "Int"
    case String(captureAsString):
        "String"
    case Array<Int>(captureAsArray):
        "Array of Int"
    case _:
        "Other"

    // Optionally capture value as-is
    case other:
        console.log("Other", other)
}

// Allows for rich fine-tuned generic templates
class MyArray<T> {
    let storage SizeOfPointer
    let capacity Int

    // ... omitted ...

    fun resize(newCapacity Int) {
        switch type T {
            case Bool:
                // Allocate single bit per value
                storage = realloc(storage, newCapacity / 8)
            case _:
                // Allocate full size per value
                let sizeOfItem = T.meta.sizeInBytes
                storage = realloc(storage, newCapacity * sizeOfItem)
        }

        capacity = newCapacity
        // ...
    }
}
```

## Nullability

The `null`-safety is checked and enforced at compile-time.

Important note: unwrapping operator `!` is guaranteed to throw an exception immediately at the position of its use.

Even when platform does not throw exceptions for null-access normally, or optimizes null-access away (say, due to devirtualization), the compiler will generate extra code that throws an exception at runtime exactly at the position of the `!` operator.

```hexa
let x Int? = null
let y Int? = 123
let z Int = null // Error

// NOTE this syntax is not allowed
// let z Int! = null // Error

a ?? defaultValue // Elvis operator (null coalescing)
a ?? return 123 // Guard with return out of function if `a` is `null`
a ?? throw Error("a is null") // Guard with throw out of function if `a` is `null`
// NOTE `break` and `continue` are not allowed, this would lend to abuse in the loops making unreadable code

// `value!` is a force unwrap operator -> esentially independent postfix operator
x = value! // Removes the `?` from the type -> exception if value is null
// Essentially same as `x = value ?? throw Error("value is null")`

// Those cases are not special operators, just `!` and then `.field`
x = value!.field // Force unwrap and then access the field -> exception if value is null (`value!.field` would throw anyway due to immediate null-dereference)

// `value?` is an optional chaining operator that can only be used in a combination with some other operators
value?.field // Optional chaining -> null if value is null
value?.field ?? defaultValue // Optional chaining works with default value operator

// Safe navigation
a?.b?.c()

// Double exclamation mark is not allowed to type because it implies some other "not just !" operator exists to the reader
// x = value!! // Error: Not allowed to avoid confusion
```

### Design Considerations (Nullability)
- **Array access**: Support optional chaining for array access too etc
- **Unchecked unwrap**: Better do `value.meta.unwrapWithoutRuntimeCheck()` or similar

## Modules

Using one `import` per each module allows cleaner syntax when imports are done within small scopes, compared to a bulky `import { /* lots of imports from many modules */ }` syntax.

```hexa
import NameSpace
import Math // Can import static fields into current scope and associated types (e.g. `sin()`)
import Math { sin cos as cosine } // Import specific members

// No separators needed, but users expected to add newlines for readability
import Math {
    sin
    cos as cosine
}

import NameSpace.TypeName // Nested is possible
import Deep.Nested.NameSpace.TypeName // Deeply nested is possible
import NameSpace as AliasNameSpace // Can alias
import NameSpace.TypeName as AliasTypeName // Can alias
```
### Exports

Named declarations at the top level are exported by default, unless `private` is specified:

```hexa
// Exported by default
let x Int = 123
var y Int = 123
fun z() {}
class C {}
type T {}
interface I {}
enum E {}

// Not exported
private let w Int = 123
private fun x() {}
private class D {}
private type T {}
private interface I {}
private enum E {}
```

### Design Considerations (Modules)
- **Import scope**: Allow `import` only at module level or block scope/class level too
- **More features**: What other module features are needed

## Preprocessor

Conditional compilation is done at token level before the AST parsing.

Defined values are type checked.

```hexa
// Assuming `hexa --define debug=true ...`
#if debug
    console.log("Debug mode")
#elseif release
    console.log("Release mode")
#else
    console.log("Other mode")
#end

// Same line is fine
type Entity = #if debug EntityDebug #else EntityRelease #end
```

May use enumeration for a checked set of flags:

```hexa
enum Mode {
    Debug
    Release
}

#if mode == Mode.Debug
    console.log("Debug mode")
#end
```

Usage assumes an `import`-like behavior for periods (e.g. `Mode.Debug` namespaces):

```sh
hexa --define mode=Mode.Debug ...
```

Simple expressions:

```sh
hexa --define apiLevel=2 ...
```

```hexa
#if apiLevel >= 2
    console.log("API level 2")
#end
```

## JSX

```hexa
fun div(props: { var children [Node]? }) {}

// Lowercase tag names allow for HTML like syntax
let element = <div>Hello, world!</div>

// Transpiles to
let element = div({ children: ["Hello, world!"] })

// Class components
class MyComponent { /* ... */ }
let element = <MyComponent>Hello, world!</MyComponent>
```

### Design Considerations (JSX)
- **Integration**: Support for styled components, Tailwind, MobX, etc

## Meta Methods

Meta methods allow to access type information and other metadata at compile time (like size of structure akin to sizeof in C).

NOTE due to Hexa targeting both C/C++ and JavaScript, having built-in for `sizeof` is impractical. `meta` allows to have target-specific meta methods without polluting the language.

The `meta` is a keyword and cannot be used as an identifier. This syntax is LSP-friendly and great for discoverability.

```hexa
let x = 1.meta.something // `.meta` is a special pseudo-field on any expression
SomeClass.meta.something // Works on types as well
meta.something // `meta` is a special pseudo-object
meta.something(123) // callable pseudo-method
meta.something(name: "value") // callable pseudo-method with named arguments

let value = someValue
let sizeof = value.meta.type.sizeInBytes

// `meta` itself is not a real value, and you can't pass it to functions, store it
// let value = someValue.meta // ERROR
// let value = meta // ERROR
```

### Design Considerations (Meta Methods)
- **Redundancy**: Is `value.meta.type` redundant and just use `value.type`/`value.type.meta`/`value.meta`

## Async

```hexa
async fun fetchData() {
    let data = await fetch("https://api.example.com/data")
    return data
}
```

Removing the "color" (colorless asyncronosity):

```hexa
let isAsyncModule Bool = false

class MyWorker<let isAsync Bool> {
    async(isAsync) fun fetchData() {
        let data = await fetch("https://api.example.com/data")
        return data
    }

    async(isAsyncModule) static fun fetchDataStatic() {
        let data = await fetch("https://api.example.com/data")
        return data
    }
}
```

Another idea is more flexible and combines all concepts together:

```hexa
// Possible values:
let isAsyncModule String = 'async'
let isAsyncModule String = 'autoAwait'
let isAsyncModule String = 'callerDecides'

// Lets the caller pick the strategy at use-site instead of inside the class
class MyWorker<let isAsync String> {
    async(isAsync) fun fetchData() {
        let data = await fetch("https://api.example.com/data")
        return data
    }

    async(isAsyncModule) static fun fetchDataStatic() {
        let data = await fetch("https://api.example.com/data")
        return data
    }
}

// Usage
async fun someAsyncFunction() {
    // Current context is async -> called functions are promoted to async

    // Assuming `isAsyncModule = 'callerDecides'`
    let callerDecides = await MyWorker.fetchDataStatic()

    // Without await returns a promise
    let callerDecides2 Promise = MyWorker.fetchDataStatic()
}
```

Alternative is `meta.spawn()` or similar for actual OS threads, on supported platforms.

### Design Considerations (Async)
- **Syntax**: `async(isAsync)` or `async<isAsync>`? `()` is syntactically closer to the decorator syntax and less pointy

### Auto-Await

It's like async but inverted. You write await fun and inside you can use sync-looking code, but it's actually async under the hood. You can still async inside if you want.

It's for people who want async without coloring or script-like convenience (especially in the leaf code).

```hexa
// Function that awaits by default
await fun fetchData() {
    let data = fetch("https://api.example.com/data")
    return data

    // Can un-await with
    let promise = async fetch("https://api.example.com/data")
    return await promise
}
```

### Design Considerations (Auto-Await)
- **Syntax**: `await fun` is confusing. Maybe add `@autoAwait`, `@await`, or `@auto`

## Regular Expressions

Regular expressions are supported as patterns for advanced pattern matching:

```hexa
switch string {
    case /abc/:
        console.log("abc")
    case /def/gi:
        console.log("def")
}
```

### Design Considerations (Regular Expressions)
- **Regex**: Captures
- **More patterns**: What other patterns should be supported
- **More syntax**: JS regex syntax subset? Unlikely PCRE, or do platform specific

# Advanced Memory Management (Optional Ownership Semantics)

Hexa prioritizes safety and performance by default: most types use automatic reference counting or platform garbage collection where appropriate, with no overhead for simple cases.

For fine-grained control in performance-critical code, optional ownership semantics are available via decorators: they enforce uniqueness and lifetimes without altering core syntax.

```hexa
// Ownership decorators are just normal decorators and don't need an overview in the syntax reference:
fun process(
    @someOwnershipDecorator buffer Buffer
) { /* ... */ }
```
