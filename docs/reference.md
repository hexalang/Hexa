# Hexa Syntax Reference Draft

This document is a draft of the Hexa syntax reference. It is not yet complete and may change in the future.

Is does *not* correspond to the actual syntax of Hexa. It's a draft of the syntax that will be released in the future.

Below is a comprehensive list of the syntax elements of Hexa.
Every syntax element is shown with an examples of all possible variations.

> NOTE: This file will be transformed into a auto-test for a parser.

> NOTE: Only minimal semantic overview is provided here. Syntax is key.

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
/// Can have more lines
/// NOTE requires expression below it
fun foo() {}
// NOTE super easy to transform // into /// even for lazy developers

// TODO support doc tags
```

## Identifiers

Identifiers can contain alphanumeric characters and underscores `_`. They must start with a *lowercase* letter or underscore.

```hexa
var myVariable = 1
var myVariable T = 1 // no `:` and no `;`
let _ssa = 2
```

## Variables

Variables are declared using `var` (mutable) or `let` (immutable).

```hexa
// Mutable variable
var x = 1
x = 2

// Immutable constant
let y = 3
// y = 4 // Error

// Type annotation
var z Int = 5

// External declarations
declare var externalVar Int
declare let externalConst String
```

## Literals

### Keywords

Keywords are reserved words that cannot be used as identifiers.

```hexa
true false
null
// TODO
```

Some words are reserved for possible future use.

```hexa
trait
interface
// TODO
```

### Numbers

Hexa supports integers and floating-point numbers.

```hexa
// Integers
let a = 123
let hex = 0xFF
let hex = 0xff
let bin = 0b101

// Floats
let b = 1.23
let exp = 1.2e-5

// Suffixes
let big = 123n // BigInt
let u8 = 123u8
let u16 = 123u16
let u32 = 123u32
let u64 = 123u64
let u128 = 123u128
let i8 = 123i8
let i16 = 123i16
let i32 = 123i32
let i64 = 123i64
let i128 = 123i128
let f32 = 1.23f32
```

### Strings

Strings can be enclosed in double quotes `"`, single quotes `'`, or backticks `` ` ``.

```hexa
let s1 = "Hello"
let s2 = 'World'
let s3 = `
    Multi-line
    String
`
let s4 = "Hello \n World"
let s5 = "Hello \"World\""
let s6 = "Hello \(1 + 2) World" // Formatting
```

### Booleans

```hexa
let t = true
let f Bool = false
```

### Null

```hexa
let n T? = null // Requires known expected type
```

### Arrays

```hexa
let arr = [1, 2, 3]
let empty [Int] = []
let none [Int]? = null
let oneNull [Int?] = [null]

// TODO nullable? or just disallow and use switch?
let [x, y, z] = arr

switch arr {
    case [x, y, z]:
        console.log(x, y, z)
    case []:
        console.log("Empty")
    case _:
        console.log("Other")
    // TODO more patterns
}
```

### Maps

```hexa
let map = ["key": "value", "one": "two"] // Inferred as [String: String]
let emptyMap [String: String] = [:]
// Immutable map TODO by default?
let immutableMap [String: String] = let ["key": "value", "one": "two"]
```

### Objects

```hexa
let obj = { x: 1, y: 2 } // Inferred as type { var x Int var y Int }
// NOTE mutable by default
let obj2 = let { x: 1, y: 2 } // Immutable
// TODO make immutable by default?
```

## Decorators (Attributes/Annotations)

Decorators start with `@` and are placed before a declaration. Multiple decorators are allowed (in any order). Their name are camelCase.

```hexa
@struct // NOTE decorators are not expressions and they require one below them
@packed
class AcpiTableHeader {}

// Work with types too
var x @example Int = 123

@inline fun foo() {} // Any expression can be decorated
x = @example 123

// TODO same names allowed?
@sameName @sameName fun foo() {}

// TODO decorator namespaces?
@namespace.decorator fun foo() {}

// Decorators can contain any expressions as parameters
@example("example") // Unnamed
@example(example: "example") // Named
@example(1, 2, name: value) // Multiple parameters
fun foo() {}

// Decorators on function arguments
fun someFunction(@readonly some Type) {
    // ...
}
```

## Operators

### Arithmetic

```hexa
a + b
a - b
a * b
a / b
a % b  // Remainder
a \ b  // Integer divide TODO rethink
// ++a NOTE N/A for clarity
// --a NOTE N/A for clarity
a++
a--
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

```hexa
// a && b  // Logical AND NOTE N/A for clarity
// a || b  // Logical OR NOTE N/A for clarity
// !a      // Logical NOT NOTE N/A for clarity
a and b // Alias for &&
a or b  // Alias for ||
not a   // Alias for !
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
// TODO and so on for other operators
```

### Access

```hexa
obj.prop
arr[index]
obj?.prop // Optional chaining
obj!.prop // Force unwrap
```

### Type Operators

```hexa
expr is Type
expr as Type   // Unsafe cast
expr as? Type  // Safe cast (returns nullable)
expr as! Type  // Force cast
// TODO expr.as(Type) and expr.as(Type, 'static_cast') and .as? .as!
```

### Other

```hexa
a ... b     // Interval
cond ? a : b // Ternary operator
expr = if cond { a } else { b } // {} are required
(args) => expr // Arrow function
// NOTE arrow functions have no types, they are inferred
// To use types, use a function (as value expression):
fun (args) return {} // NOTE shorthand for fun (args) { return expr }
```

## Control Flow

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

// Expression
let result = if x > 0 { "Positive" } else { "Non-positive" }
```

### Loops

```hexa
// While
while x > 0 {
    x--
}

// Do-While
do {
    x++
} while x < 10 // NOTE no () for consistency

// For-In
for item in items { // NOTE no `let` required but still creates a local read-only variable, `var` is not allowed
    console.log(item)
    break
    continue
}

// For loop with range
for i in 0 ... 10 { // NOTE `i` is not visible outside the loop and is read-only
    console.log(i)
}

// Iterating over a number (0 to N-1)
var count = 100
for i in count {
    // i is 0, 1, ..., 99
}

// Iterating over a number (0 to N-1) without a variable
for i in 100 { // NOTE some variable name is always required
    // i is 0, 1, ..., 99
}

// TODO allow to omit variable name with `_`?

// Loops from n to m-1 (thus allows to iterate over an array.length)
for i in n ... m {}
for i in 0 ... array.length {}

// Shorthand for numbers - can omit 0
for i in array.length {}

// Inclusive loop syntax N/A, just use +1
for i in n + 1 {}

// TODO kv
```

### Switch

```hexa
switch value {
    case 1:
        console.log("One")
    case 2:
        console.log("Two")
    case _:
        console.log("Other")
}
```

### Branching

```hexa
break
continue
return value
throw error
```

### Try / Catch

```hexa
try {
    risky()
} catch e Error {
    handle(e)
}
```

## Functions

```hexa
// Basic function
fun add(a Int, b Int) Int {
    return a + b
}

// Generic function - implicit
fun identity(x) { // NOTE lack of type parameters (both <T> and T)
    // NOTE this function is still fully generic, it just infers the type
    return x
}

// Arrow function
let double Callback = (x) => x * 2 // NOTE arrow functions require known expeted type to infer their arguments

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

// Usage
let x = identity(123)
let y = identity<String>("hello") // NOTE no space in between < and T

// Generic function with trait bound
fun identity<T BoxTrait<Int>>(x T) T {
    return x
}
```

## Classes and Interfaces

Types always start with a capital letter.

### Classes

```hexa
class Point {
    var x Int
    private var y Int // NOTE only `private` is supported, it behaves like `protected` in other languages

    // Constructor
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
}
```

### Class Constructors

```hexa
class Point {
    var x Int
    var y Int

    new (x Int, y Int) {
        this.x = x
        this.y = y
    }
}

let point = Point(1, 2) // NOTE `new` not allowed

// Alternatively
class Point {
    var x Int
    var y Int

    // NOTE `new` assumed by default
    // `private new() {}` to disable construction outside, allowed only in static methods
}

let point = Point() { x: 1, y: 2 } // JSON-like syntax
let point = Point { x: 1, y: 2 } // Can omit `()` then

// Alternatively even more JSON-like
let point Point = { x: 1, y: 2 } // Type inference -> Point type omitted on the right side
```

### Generic classes

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

class Box<T, U> {
    var value T
    var value2 U

    new (value T, value2 U) {
        this.value = value
        this.value2 = value2
    }
}

let box3 = Box<Int, String>(123, "hello")
```

### Traits

```hexa
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

// Enums can implement traits too
enum Color BoxTrait<Int> { Red Green Blue fun box(value Int) Void { } }

// Generic class with a trait as a type limit
class Box<T BoxTrait<Int>> { // NOTE `BoxTrait<Int>` is a type limit placed after the type parameter with a space in between
    var value T

    new (value T) {
        this.value = value
    }
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

### Associated types

```hexa
type BoxTrait<T> {
    type Value = T
}

// Type bundles
type Traits {
    type A
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

// Also as local namespaces
class Box<Types Traits> {
    type Alias = Types.A

    var value Types.B = ""
    var value2 Types.C = 0.0
}

let box = Box<TraitsFor<Int>>()
```

### Inheritance

```hexa
class Shape {
    fun draw() {}
}

class Circle extends Shape {
    fun draw() { // NOTE `override` is not required - but signature must match
        // Draw circle
    }
}
```

### Interfaces

```hexa
interface Drawable { // NOTE runtime feature compared to traits
    fun draw() Void
}

class Box Drawable { // NOTE no need to use `implements` keyword
    fun draw() {
        // Draw box
    }
}
```

### Properties

```hexa
class Rect {
    var width Int
    var height Int

    var area Int {
        get {
            return width * height
        }
        // Optional setter
        // set(v) { ... }
        // TODO rethinking this
    }
}
```
### Destructuring

```hexa
// NOTE `let` is required for clarity, does not work with `var`
let {width, height} = Rect {width: 1, height: 2}

switch value {
    case {width, height}: // NOTE `let` is NOT required
        console.log("Width: ", width, "Height: ", height)
    case {width: 123}: // NOTE checking a specific value
        console.log("Width: ", width)
    case SomeEnum(rect: {width, height}): // NOTE destructuring inside the pattern
        console.log("Width: ", rect.width, "Height: ", rect.height)
    case SomeEnum(rect: {width: 123}): // NOTE checking a specific value inside the pattern
        console.log("Width: ", rect.width)

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

## Enums

```hexa
// Complex enums
enum Color {
    Red
    Green
    Blue
    Other(r Int, g Int, b Int) // Both name and type are required
}

Color.Red != Color.Red // Every instance is unique value

// Enum with values
enum Status Int { // NOTE Adding basic type after the space turns it into a constant enum
    Ok = 200
    NotFound = 404
    BadRequestError = 404 // Duplicate value is NOT allowed with constant
    BadRequest = NotFound // Duplicate value is allowed with alias
    Overloaded // Inferred value as BadRequest + 1
}

Status.Ok == Status.Ok // Every tag is just a raw value with a name
var plain Int = Status.Ok // ERROR: Sound type system disallows this
```

## Pattern Matching

```hexa
switch value { // uses `switch` keyword for pattern matching thus familiar to C-family developers
    case 1:
        console.log("One")
        // NOTE assumes `break` at the end of each case by default
    case 2:
        console.log("Two")
    case _: // NOTE exhaustive match by default, requires `_` to be present if not all cases are covered
        console.log("Other")
    case null: // NOTE `null` always checked first no matter where it is placed
        console.log("Null")
}
```

### Switch as Expression

```hexa
let result = switch value {
    case 1:
        "One"
    case 2:
        "Two"
    case _:
        "Other"
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
type Callback = (result Int) => Void
```

### Casts

```hexa
expr as! Type      // force/unsafe cast
expr as? Type      // safe cast (returns null on failure)
expr as Type       // safe cast (exception on failure)
```

## Nullability

```hexa
let x Int? = null
let y Int? = 123

// NOTE this syntax is not allowed
// let z Int! = null // Error

a ?? b // Elvis operator (null coalescing)
```

## Modules

```hexa
// Import module
import std.io

// Import from specific path
import mylib in "libs/mylib"
```

## Preprocessor

```hexa
#if debug
    console.log("Debug mode")
#end
```
