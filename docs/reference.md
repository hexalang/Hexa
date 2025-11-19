# Hexa Syntax Reference Draft

This document is a draft of the Hexa syntax reference. It is not yet complete and may change in the future.

Is does *not* correspond to the actual syntax of Hexa. It's a draft of the syntax that will be released in the future.

Below is a comprehensive list of the syntax elements of Hexa.
Every syntax element is shown with an examples of all possible variations.

## Comments

Hexa supports single-line, multi-line, and documentation comments.

```hexa
// Single-line comment

/*
   Multi-line comment
*/

/// Documentation comment (single-line)
fun foo() {}

/**
 * Documentation comment (multi-line)
 */
class Bar {}
```

## Identifiers

Identifiers can contain alphanumeric characters and underscores `_`. They must start with a letter or underscore.

```hexa
var myVariable = 1
let _private = 2
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
var z: Int = 5

// External declarations
declare var externalVar: Int
declare let externalConst: String
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
let i32 = 123i32
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
let f = false
```

### Null

```hexa
let n = null
```

### Arrays

```hexa
let arr = [1, 2, 3]
let empty: [Int] = []
```

### Maps

```hexa
let map = ["key": "value", "one": "two"]
let emptyMap: [String: String] = [:]
```

### Objects

```hexa
let obj = { x: 1, y: 2 }
```

## Operators

### Arithmetic

```hexa
a + b
a - b
a * b
a / b
a % b  // Remainder
a \ b  // Integer divide
++a
--a
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
a && b  // Logical AND
a || b  // Logical OR
!a      // Logical NOT
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
```

### Type Operators

```hexa
expr is Type
expr as Type   // Unsafe cast
expr as? Type  // Safe cast (returns nullable)
expr as! Type  // Force cast
```

### Other

```hexa
a ?? b      // Elvis operator (null coalescing)
a ... b     // Interval
cond ? a : b // Ternary operator (if supported, otherwise use if/else expression)
(args) => expr // Arrow function
```

## Control Flow

### If / Else

`if` can be used as a statement or an expression.

```hexa
if x > 0 {
    print("Positive")
} else if x < 0 {
    print("Negative")
} else {
    print("Zero")
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
    print(item)
}

// For loop with range
for i in 0 ... 10 {
    print(i)
}
```

### Switch

```hexa
switch value {
    case 1:
        print("One")
    case 2:
        print("Two")
    case _:
        print("Other")
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
} catch e: Error {
    handle(e)
}
```

## Functions

```hexa
// Basic function
fun add(a: Int, b: Int): Int {
    return a + b
}

// Generic function
fun identity<T>(x: T): T {
    return x
}

// Arrow function
let double = (x: Int) => x * 2

// External function
declare fun externalFunc(): Void
```

## Classes and Interfaces

### Classes

```hexa
class Point {
    var x: Int
    var y: Int

    // Constructor
    new(x: Int, y: Int) {
        this.x = x
        this.y = y
    }

    fun move(dx: Int, dy: Int) {
        this.x += dx
        this.y += dy
    }

    static fun origin(): Point {
        return new Point(0, 0)
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
    fun draw(): Void
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
    var width: Int
    var height: Int

    var area: Int {
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
enum Color {
    Red
    Green
    Blue
}

// Enum with values
enum Status: Int {
    Ok = 200
    NotFound = 404
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
declare type ID = String
declare type Callback = (Int) => Void
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
