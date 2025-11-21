# Hexa Syntax Reference Draft

This document is a draft of the Hexa syntax reference. It is not yet complete and may change in the future.

Is does *not* correspond to the actual syntax of Hexa. It's a draft of the syntax that will be released in the future.

Below is a comprehensive list of the syntax elements of Hexa.
Every syntax element is shown with an examples of all possible variations.

> NOTE: This file will be transformed into a auto-test for a parser.

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

### Numbers

Hexa supports integers and floating-point numbers.

```hexa
// Integers
let a = 123
let hex = 0xFF
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
// ... and so on for other operators
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
a ?? b      // Elvis operator (null coalescing)
a ... b     // Interval
cond ? a : b // Ternary operator
expr = if cond { a } else { b } // {} are required
(args) => expr // Arrow function
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
} while x < 10

// For-In
for item in items {
    console.log(item)
}

// For loop with range
for i in 0 ... 10 {
    console.log(i)
}

// Loops from n to m-1 (thus allows to iterate over an array.length)
for i in n ... m {}
for i in 0 ... array.length {}

// Shorthand for numbers - can omit 0
for i in array.length {}

// Inclusive loop syntax N/A, just use +1
for i in n + 1 {}
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

// Generic function
fun identity<T>(x T) T {
    return x
}

// Arrow function
let double = (x Int) => x * 2

// External function
declare fun externalFunc() Void
```

## Classes and Interfaces

Types always start with a capital letter.

### Classes

```hexa
class Point {
    var x Int
    var y Int

    // Constructor
    new (x Int, y Int) {
        this.x = x
        this.y = y
    }

    fun move(dx Int, dy Int) {
        this.x += dx
        this.y += dy
    }

    static fun origin() Point {
        return Point(0, 0) // `new` not required and not allowed
    }
}
```

### Inheritance

```hexa
class Shape {
    fun draw() {}
}

class Circle extends Shape {
    override fun draw() {
        // Draw circle
    }
}
```

### Interfaces

```hexa
interface Drawable {
    fun draw() Void
}

class Box implements Drawable {
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
    }
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
enum Status Int {
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

### Enum Pattern Matching

```hexa
enum Color {
    Red
    Green
    Blue
    Other(r Int, g Int, b Int)
}

switch value {
    case Red: // NOTE `case Color.Red:` and `case .Red:` are NOT allowed
        console.log("Red")
		// NOTE assumes `break` at the end of each case by default
    case Green:
        console.log("Green")
    case Blue:
        console.log("Blue")
    case Other(r, g, b as blue):
		// NOTE exact same names are required (i.e. `r` and `g`)
		// NOTE order of parameters is NOT important due to names requirement above
		// NOTE `b as blue` allows to rename parameter
		// NOTE parameters are captured as readonly local variables scoped to the case body
        console.log("Other", r, g, blue) // NOTE only `blue` is accessible here
}
```

### Enum Flags Pattern Matching

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
    case Other(flags: Flag1 | Flag2 | ..., otherValue1, otherValue2):
        console.log("Exact (Flag1 | Flag2 | ...) and also captures otherValue1, otherValue2")
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
- `{ x: Int, y: Int }`: Object type

### Type Aliases

```hexa
type ID = String
type Callback = (Int) => Void
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
