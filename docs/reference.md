# Hexa Syntax Reference Draft

This document is a draft of the Hexa syntax reference. It is not yet complete and may change in the future.

Is does *not* correspond to the actual syntax of Hexa. It's a draft of the syntax that will be released in the future.

Below is a comprehensive list of the syntax elements of Hexa.
Every syntax element is shown with an examples of all possible variations.

> NOTE: This file will be transformed into a auto-test for a parser.

> NOTE: Only minimal semantic overview is provided here. Syntax is key.

# State

Reference is a work in progress:

- [ ] Initial Draft (must cover at least every feature briefly)
- [ ] Patreon Post
- [ ] Complete Draft (must cover every feature in detail)
- [ ] Internal Review
- [ ] External References Check
- [ ] Tree-Sitter Reference Grammar
- [ ] External Review
- [ ] Final Draft

# Syntax

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

// TODO support doc tags like
/// @param x the value
/// @returns squared value
fun square(x Int) Int { return x * x }
```

## Identifiers

Identifiers can contain alphanumeric characters and underscores `_`. They must start with a *lowercase* letter or underscore.

Unicode characters are not allowed. Only latin alphabet is supported, with numbers and underscores.

```hexa
var myVariable = 1 // Type is inferred
var myVariable T = 1 // no `:` and no `;` semicolons (syntax is context-free so they are not required)
let _ssa = 2 // Read-only
```

## Variables

Variables are declared using `var` (mutable) or `let` (immutable).

```hexa
// Mutable variable
var x = 1
x = 2

// Shadowing is fine (local to the block)
let x = 1
let x = 2

// Immutable constant
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
class enum type interface
async await
// TODO
```

Some words are reserved for possible future use.

```hexa
trait
override
const // Possibly for `const [1, 2, 3]` for readonly array literals
readonly
match
finally
default
public protected
template macro
when
guard
implements extends
export
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

// BigInt
let big = 123n
let hex = 0xFFn
let bin = 0b101n
let readability = 0b101_010n // Underscore separators compatible with sizes

// Underscore separators
let big = 1_000_000
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

// String interpolation
let s6 = "Hello \(1 + 2) World"
let s7 = "Hello \(foo.bar) World" // Any expression is valid
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

// Trailing comma
let array = [1, 2, 3,]

// Spread operator
let a = [1, 2, 3]
let b = [4, 5, 6]
let c = [0, ...a, ...b]

// Switch with destructuring
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

Map is a simple key-value store. It's not an object like {}. Keys are arbitrary expressions of any type.

```hexa
let map = ["key": "value", "one": "two"] // Inferred as [String: String]
let emptyMap [String: String] = [:]
// Immutable map TODO by default?
let immutableMap [String: String] = let ["key": "value", "one": "two"]

// Switch with destructuring
switch map {
    case ["key": "value", "one": "two"]:
        console.log("Match")
    case _:
        console.log("Other")
    // TODO more patterns
}

// Any expression works as a key
let map = [1 + 1: "two", 2 + 1: "three", getFour(): "four"]
```

### Objects

Object is a simple fixed key-value store. It's not a map like []. Keys cannot be changed (added/removed) syntactically, only via reflection.

```hexa
let obj = { x: 1, y: 2 } // Inferred as type/interface (TODO?) { var x Int var y Int }
// NOTE mutable by default
let obj2 = let { x: 1, y: 2 } // Immutable
// TODO make immutable by default?

// Switch with destructuring
switch obj {
    case { x: 1, y: 2 }:
        console.log("Match")
    case _:
        console.log("Other")
    // TODO more patterns
}

// Shorthand for two or more fields (single value would confuse with a block) -> TODO rethink, maybe allow special case?
let value = 132
let obj = { value, x: 1, y: 2 }

// Computed field names TODO is this really useful?
let obj = { (foo()): 1 }

// Object spread for Redux-like updates
let obj = { ...obj, z: 3 }
```

## Decorators (Attributes/Annotations)

Decorators are compile-time concept, like C++ attributes.

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

// TODO decorator namespaces? -> unrelated to module system
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

// TODO Decorator order semantics — is @a @b fun f() same as @b @a?
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
// Not allowed: a && b  // Logical AND NOTE N/A for clarity
// Not allowed: a || b  // Logical OR NOTE N/A for clarity
// Not allowed: !a      // Logical NOT NOTE N/A for clarity
a and b // Same as classical && -> short-circuit
a or b  // Same as classical || -> short-circuit
not a   // Same as classical !
// NOTE ^ they accept only boolean operands
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

### Other

```hexa
a ... b     // Interval
cond ? a : b // Ternary operator
expr = if cond { a } else { b } // {} are required
(args) => expr // Arrow function
(args) => { expr } // Arrow function with block that returns `expr` -> if block should not return then use `fun`
// NOTE arrow functions have no types, they are inferred
// To use types, use a function (as value expression):
fun (args) return {} // NOTE shorthand for fun (args) { return expr }
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
// Standalone blocks create a scope
{
    let x = 1
    let y = 2
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
if x > 0, y < 10 { // Same as `if (x > 0) && (y < 10)`
    console.log("Positive")
}

// Compatible with bindings
if let x = a, y > b, let z = c { // NOTE `let z` is allowed
    console.log(x, y, z)
}

// Expression
let result = if x > 0 { "Positive" } else { "Non-positive" }
```

### Loops

NOTE `for`, `do` and `while` loops are not expressions.

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
    break // No labels allowed or supported, outer break is done with meta methods
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

Exhaustiveness checking is done when the type allows for it.

```hexa
switch value { // Plain integer is not exhaustive
    case 1:
        console.log("One")
        // no break needed, assumed to break by default
    case 2:
        console.log("Two")
    case x if x > 10: // Pattern guard can work over captured `x` (captured from `value`)
        console.log("Greater than 10")
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

Closures follow same rules as a JavaScript functions (capture by reference), including arrow functions.

```hexa
// Basic function
fun add(a Int, b Int = 5) Int { // Default arguments are allowed
    return a + b
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

// TODO possibly make implicit generic functions `private` to avoid confusion (thus they are either module-local or private to a class)

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

// TODO ...rest parameters

// Overloading
fun fooForInt(x Int) Int {
    return x
}

fun fooForString(x String) String {
    return x
}

// Odin-style left-to-right overloading
fun foo is fooForInt or fooForString
foo(123)
foo("hello")
// NOTE overloading allowed in classes too with this syntax -> compile-time only feature

// Function as value
let func = fooForInt
let func = fun (x Int) Int { return x }
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

// External class
@final // Disallow inheritance
declare class Point {
    var x Int
    var y Int
}

// TODO Inner/nested classes currently decided to not support them for code clarity
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

let point = Point(1, 2) // NOTE `new` not allowed i.e. `new Point`

// Alternatively
class Point {
    var x Int
    var y Int

    // NOTE `new` assumed by default
    // `private new() {}` to disable construction outside, allowed only in static methods
}

let point = Point() { x: 1, y: 2 } // JSON-like syntax
let point = Point { x: 1, y: 2 } // Can omit `()` then
// NOTE either `()` or `{}` at least should be present

// Alternatively even more JSON-like
let point Point = { x: 1, y: 2 } // Type inference -> Point type omitted on the right side
let point Point = { "x": 1, y: 2 } // NOTE `"x"` is okay if corresponding field is called `x` too
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

// TODO rethink if <let size T> or just <size T>
```

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

// Single inheritance (first in the list) but any number of traits or interfaces allowed (in any order)
class Circle Shape Trait Interface {
    fun draw() { // NOTE `override` is not required - but signature must match
        // Draw circle
    }
}
```

### Interfaces

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

## Enumerations

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
        console.log("Two")
    case _: // NOTE exhaustive match by default, requires `_` to be present if not all cases are covered
        console.log("Other")
    case null: // NOTE `null` always checked first no matter where it is placed
        console.log("Null")
}
```

### Switch as Expression

```hexa
var three = 3 // NOTE `var` i.e. can be any actual value at the moment of pattern matching

let result = switch value {
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
expr.as(Type).as(OtherType).method() // Enables chaining

// Enables rich casting options when targeting C++, Java, C#, etc
expr.as(Type, 'static_cast')
expr.as(Type, 'dynamic_cast')
expr.as(Type, 'const_cast')
expr.as(Type, 'reinterpret_cast')

// Enables to do straight-forward casts with compile time known values
let cast = 'reinterpret_cast'
expr.as(Type, cast)

// TODO multi-casts?
expr.as(Type, 'dynamic_cast', 'const_cast')
expr.as(Type, 'dynamic_cast', 'const_cast', 'reinterpret_cast')

// TODO behaviour specification?
expr.as(Type, 'dynamic_cast', 'throw') // cast-or-throw
expr.as(Type, 'dynamic_cast', 'null') // cast-or-null

// TODO expr.as(Type) and expr.as(Type, 'static_cast') and .as? .as!
// TODO is
```

### Type Matching

```hexa
switch type value {
    case Bool:
        console.log("Bool")
    case Int(captureAsInt): // NOTE captureAsInt is readonly and equals to `value` casted to Int
        console.log("Int", captureAsInt)
    case String(captureAsString):
        console.log("String", captureAsString)
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

```hexa
let x Int? = null
let y Int? = 123

// NOTE this syntax is not allowed
// let z Int! = null // Error

a ?? b // Elvis operator (null coalescing)

value!.field // Force unwrap -> exception if value is null
value?.field // Optional chaining -> null if value is null

// TODO same for array access etc

x = value! // Force unwrap -> exception if value is null
x = value!! // Force unwrap -> unchecked and may crash elsewhere
// value!!.field // Not allowed to avoid abuse/confusion (!.field will throw anyway due to immediate null-dereference)
```

## Modules

```hexa
// Old way
// Import module
import std.io

// Import from specific path
import mylib in "libs/mylib"

// New way
import NameSpace // TODO allow at module level or scope/class level too?
import TypeName // Can import static fields into current scope and associated types
import NameSpace.TypeName // Nested is possible
import NameSpace as AliasNameSpace // Can alias
import NameSpace.TypeName as AliasTypeName // Can alias
// TODO
```

## Preprocessor

```hexa
#if debug
    console.log("Debug mode")
#end
```

## JSX

```hexa
fun div(props: { var children [Node]? }) {}

// Lowercase tag names allow for HTML like syntax
let element = <div>Hello, world!</div>

// Transpiles to
let element = div({ children: ["Hello, world!"] })
```

## Meta Methods

Meta methods allow to access type information and other metadata at compile time (like size of structure akin to sizeof in C).

NOTE due to Hexa targeting both C/C++ and JavaScript, having built-in for `sizeof` is impractical. `meta` allows to have target-specific meta methods without polluting the language.

`meta` is a keyword and cannot be used as an identifier.

```hexa
let x = 1.meta.something // `.meta` is a special pseudo-field on any expression
SomeClass.meta.something // Works on types as well
meta.something // `meta` is a special pseudo-object
meta.something(123) // callable pseudo-method
meta.something(name: "value") // callable pseudo-method with named arguments

let value = someValue
let sizeof = value.meta.type.sizeInBytes // TODO maybe redundant

// `meta` itself is not a real value, and you can't pass it to functions, store it
// let value = someValue.meta // ERROR
// let value = meta // ERROR
```

## Async

```hexa
async fun fetchData() {
    let data = await fetch("https://api.example.com/data")
    return data
}
```

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
    return await promise // TODO hmm `await fun` is confusing
}
```
