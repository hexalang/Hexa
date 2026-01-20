# Hexa Syntax Reference

This is a living document of the Hexa syntax reference. It is not yet complete and may change.

> Hexa is your missing bridge between the worlds of high-level expressiveness and low-level control.

It does not correspond to the full actual syntax of Hexa yet. It represents the syntax changes that will be released in the future. The compiler already released on the GitHub will catch up ASAP.

Below is a comprehensive list of the syntax elements of Hexa.
Every syntax element is shown with examples of all possible variations.

Most ideas have been validated through real-world Hexa usage in web and systems programming.

> [!NOTE]
> This file will be transformed into an auto-test for a parser.

> [!IMPORTANT]
> Only minimal semantic overview is provided here. Syntax is key.

# State

The reference is a work in progress:

- [x] Initial Specification (must cover at least every feature briefly)
- [ ] Internal Review
- [ ] Complete Specification (must cover every feature in detail)
- [ ] External References Check
- [ ] Tree-Sitter Reference Grammar
- [ ] Full Review
- [ ] Release

# Goals

Hexa syntax is designed to follow these standards:

- [x] Declarative -> Code flows in a straightforward and unambiguous way
- [x] Easy to read and write -> Both by humans and tools
- [x] Performant -> Features do not come at a noticeable runtime cost
- [x] Safe -> Behavior is well defined and sound by default
- [x] Scalable -> Code is easy to maintain with a growing team and project complexity
- [x] Minimalistic -> As little syntax and as few special forms as possible
- [x] Target-agnostic -> Syntax and core semantics stay identical across all targets
- [x] Fast to compile -> High parsing speed is key to a smooth development experience

Hexa features are designed to be mostly MISRA compliant, allowing them to satisfy industrial safety guidelines.

> Motor Industry Software Reliability Association (MISRA) is an automotive industry safety standard for systems programming languages.

# Syntax

Keep in mind that Hexa is targeting output platforms like JavaScript/TypeScript, C/C++ and direct LLVM/WASM binaries. Syntax is designed to be as close to the output as possible both visually and semantically, yet still allows for automatic performance optimizations and advanced features.

Semicolons are never required. Files are UTF-8 (with optional BOM skipping and optional shebang at the first line starting with `#!` also skipped).

Hexa is case-sensitive and prefers (token-efficient) tabs for indentation. Standard Library mostly follows `Node.js` API on the native platforms.

Inline // comments explain non-obvious aspects of each example. Always read them. They often clarify safety, performance, or constraints that emerge from Hexa semantics rather than its syntax.

## Comments

Hexa supports single-line, multi-line, and documentation comments. It's assumed that `NOTE` and `TODO` are highlighted in a distinct way by the syntax highlighter scheme.

```hexa
// Single-line comment
// Supports minimal `markdown` syntax in highlighting (assumed that every Hexa-compliant editor supports it)

/*
	Multi-line comment

	Comments are not parsed to AST.

	/* Nested */
*/

/// Documentation comment (single-line) present in the AST (attached to an expression/statement node)
/// Can have more lines - they will combine into single doc comment
/// They do not interact with decorators
// NOTE A documentation comment requires an expression/statement immediately below it:
fun foo() {}
// NOTE super easy to transform // into /// even for busy developers
```

### Design Considerations (Comments)
- **Doc tags**: Support doc tags like `@param` and `@returns` with example usage like `fun square(x Int) Int { return x * x }`

## Identifiers

Identifiers can contain alphanumeric characters and underscores `_`. They must start with a *lowercase* letter or underscore.

Unicode characters are not allowed. Only Latin alphabet is supported, with numbers and underscores.

```hexa
// Variable names must start with a lowercase letter or underscore
var myVariable = 1 // Type is inferred
var myVariable T = 1 // NOTE no `:` colons and no `;` semicolons (syntax is context-free so they are not required) -> no automatic semicolon insertion either
let _ssa = 2 // Read-only
```

## Variables

Variables are declared using `var` (mutable) or `let` (immutable, readonly variable itself, aka single-assignment).

Hexa uses space-separated type annotations, never colons: `var name Type = value` (no `:` colons and no `;` semicolons).

```hexa
// Mutable variable
var x = 1 // NOTE initial assignment `=` is required for local variables
x = 2

// Shadowing is fine (local to the block)
let x = 1
let x = 2

// Can make a variable readonly with shadowing
var x = 1 // Writeable
let x = x // Readonly in the current scope

// Immutable constant (can be computed at runtime, but not re-assigned)
let y = 3
// y = 4 // Error

// Type annotation
var z Int = 5 // Type comes after the name, separated by space

// External variable declarations
declare var externalVar Int // NOTE no `= value` assignment allowed
// Readonly external variable declarations
declare let externalConst String // Type is required for `declare`
```

## Literals

Atoms of the Hexa language.

### Keywords

Keywords are reserved words that cannot be used as identifiers.

They are not contextual and always reserved in any syntax construct.

Singular underscore `_` is a special literal that cannot be used as an identifier. Literal `$` is reserved for future use.

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
await async
meta readonly
```

#### Design Considerations (Keywords)
- **Missing keywords**: Are there any missing keywords

#### Reserved Words

Some words are reserved for possible future use.

They will be either removed and available as identifiers or transformed into keywords.

```hexa
defer yield
default hexa
public protected out
template macro abstract
when with
guard infer
implements extends
export of from using inout
```

Anything that starts with `#` is reserved for future use: `#foo` and such.

##### Design Considerations (Reserved Words)
- **Missing reserved words**: Are there any missing reserved words

NOTE reserved words and keywords are chosen to not conflict with JSX function names (i.e. HTML tag names).

### Numbers

Hexa supports integers and floating-point numbers.

```hexa
// Integers
let a = 123 // Defaults to `Int` aka `i32` (signed 32-bit integer) when not inferred to a different type
let b UInt64 = 123 // Explicitly inferred to unsigned 64-bit integer
let hex = 0xFF // Only lowercase `x` in `0x` is supported
let hex = 0xff
let bin = 0b101 // Only lowercase `b` in `0b` is supported

// Floats
let exp = 1.2e-5
let b = 1.23 // 64-bit float by default, inferred from the usage
0.123 // NOTE 0. upfront suffix is required for float literals
// .123 // Error
// 123. // Error - suffix .0 is required

// Suffixes
let u32 = 123u32
let f32 = 1.23f32 // Also `1.2e-5f32` etc
let u8 UInt8 = 123u8
let u16 UInt16 = 123u16
let u64 UInt64 = 123u64
let u128 UInt128 = 123u128
let i8 Int8 = 123i8 // Also `123_i8`
let i16 Int16 = 123i16
let i32 Int32 = 123i32
let i64 Int64 = 123i64
let i128 Int128 = 123i128

// All integer suffixes compatible with hexadecimals
let hex = 0xFFu128
let hex = 0xffu128

// BigInt
let big BigInt = 123n
let hex = 0xFFn
let bin = 0b101n
let readability = 0b101_010n // Underscore separators compatible with sizes
let autoCast = 123n + 345u8 // Other integer types are automatically casted to BigInt on demand

// Underscore separators
let big = 1_000_000
let hexadecimal = 0xFF_FFn
let underscores = 0xFF__FFn // Multiple underscores are fine -> they serve as readability tools
```

#### Design Considerations (Numbers)
- **Compact suffixes**: Compact float suffixes and complex numbers etc + 123ptr
- **Negation**: Should `-123` be a token for negation or a unary operator? Token-wise it would allow proper inference of the integer size (i.e. `let x Int16 = -123` would be `-123i16`/`case -n`)

### Strings

Strings can be enclosed in double quotes `"`, single quotes `'`, or backticks `` ` ``. Assume Unicode by default. They are always immutable.

```hexa
let s1 = "Hello"
let s2 = 'World' // No difference in meaning
let s3 = `
	Multi-line
	String
` // NOTE newlines always converted into a \n
let s4 = "Hello \n World"
let s5 = "Hello \"World\"" + 'Hello \'World\'' // Concatenation with `+` operator
// Anything can be concatenated with `+` as long as it has a `toString` method
let s5_1 = "Hello " + 1 + " World" // "Hello 1 World"

// Regular expression
let s6 = /Hello World/ // Per parser rules, there should be no space after the leading `/` to start a regex
// With flags
let s7 = /\ Hello World/gi // Space when escaped `\ ` after the leading `/` is allowed to start a regex

// String interpolation
let s8 = "Hello \(1 + 2) World"
let s9 = "Hello \(foo.bar) World" // Any expression is valid
// NOTE `\()` allows to avoid reserving normal characters like `$` for interpolation and adding new syntax for strings themselves
// `()` is a clear group around an expression avoiding problems like "Hello $a + $b World" vs "Hello $(a + b) World" having only "Hello \(1 + 2) World" syntax

// Unicode escape
let s10 = "\u{1F600}"

// JSX-like and JS-like
let s11 = "Hello \{1 + 2} World"
let s12 = "Hello \{
	var a = 1
	var b = 2
	a + b // Works like a block
} World"
console.log("Something: \{1 + 2}") // Easier to type and read than `"Something: \(1 + 2)"` due to the lack of `(())` nesting

// Array-like access NOTE only 0...length are valid indices, otherwise `null` is returned
let s13 = "Hello"[0] // "H"
let s14 = "Hello"[10] // null
let s15 = "Hello"[-1] // null

// String comparison
let s16 = "Hello" == "Hello" // True
let s17 = "Hello" == "hello" // False
let s18 = "Hello" != "Hello" // False
let s19 = "Hello" != "hello" // True
let s20 = "Hello" < "Hello" // False
let s21 = "Hello" > "hello" // False
// let s22 = "Hello" <= "Hello" // NOT allowed because they seem to be redundant/too rare
// let s23 = "Hello" >= "hello" // NOT allowed
```

#### Design Considerations (Strings)
- **Extended formatting**: Describe extended formatting via `\(value : format)` i.e. `\(value : '0000')` for padding. Should support external format variables like `let formatted = "0000" \(value : formatted)` and `let zeros = 4 \(value : '0*(zeros)')`
- **Raw strings**: Support for raw strings with `r"""` or `r""` or similar to format string with any number of quotes `style```some text````
- **Nested string interpolation**: Support for string interpolation with `\(value \(anotherValue))` and nested escaping `"Hello \(foo.bar(baz[\"key\"]))"`
- **String interpolation**: Consider leaving only `\{value}` syntax and removing `\()`
- **Escape sequences**: Support for escape sequences like `\f` and `\b`
- **Error-prone**: Possibly use `"{value}"` instead of `"\{value}"` thus removing the need for `\` in string interpolation, while reserving `\{\}` this would allow to avoid a problem with forgetting to escape `\` in string interpolation (also mimics JSX)

### Booleans

```hexa
let t = true
let f Bool = false
```

### Null

The `null` literal can only be passed to a known nullable type (`T?` with a question mark suffix):

```hexa
let n T? = null // Ok
let n T = null // Error: expected nullable type `T?`, got `T`
let n = null // Error: there's no actual backing type, just `null`
```

### Arrays

Array type syntax is `[T]` where `T` is the type of the elements, or alternatively `Array<T>`.

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
let d = [...a] // Copy
let e = [...a, index: 4] // Copy and update

// Indexing
let first = arr[0] // NOTE any integer type (including BigInt) is allowed as an index
let second = arr[1i8] // Any integer type is allowed including negative
let third = arr[-1i8] // Produces `null`
let fourth = arr[-1i8]! // Unsafe convenience operator

// Assignment
arr[0] = 1
arr[1i8] = 2
arr[-1i8] = 3 // Does not affect `.length`
// arr[0] += 1 // Not allowed as `[0]` may be `null`

// Index cascade assignment
arr.[ 0: 1, 1: 2 ] // arr[0] = 1, arr[1] = 2
arr.[
	0: 1,
	1: 2, // Trailing comma is allowed when the line ends with a newline
]
// Indices can be expressions computed at runtime
let index = 0
arr.[ index: 1 ]
arr.[ index: 1, index + 1: 2 ]
// Updates the original array in-place
arr.[ 0: 1, 1: 2 ].pop() == 2 // True
arr.[ 0: 1, 1: 2 ] == arr // True

// The explicit distinction between mutation `.[]` and copy-update `[...array, index: value]`
let copy = [...arr, 4]
arr.[ 0: 1, 1: 2 ] == arr // True
arr.[ 0: 1, 1: 2 ] == copy // False

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
	case [x, [1, _, y]]:
		console.log("Nested pattern", x, y)
	case _:
		console.log("Other")
}
```

#### Design Considerations (Arrays)
- **Nullable destructuring**: Should `let [x, y, z] = arr` be allowed for nullable arrays, or force `switch`
- **More patterns**: What other array patterns should be supported

### Maps/Dictionaries

A map is a simple key-value store. It's not an object like {}. Keys are arbitrary expressions of any type.

```hexa
let map = ["key": "value", "one": "two"] // Inferred as [String: String]
let emptyMap [String: String] = [:]
// Immutable map
let immutableMap [String: String] = let ["key": "value", "one": "two"]

// Trailing comma
let map = [
	"key": "value",
	"one": "two", // Trailing comma is allowed when the line ends with a newline
]

// Index cascade assignment (same syntax as arrays)
map.[ "key": "value", "one": "two" ] // map["key"] = "value", map["one"] = "two"
map.[
	"key": "value",
	"one" + "two": "two" // Indices can be expressions computed at runtime
] == map // True, updates the original map in-place

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

An object is a simple fixed key-value store. It's not a map like []. Keys cannot be changed (added/removed) syntactically, only via reflection.

```hexa
let obj = { x: 1, y: 2 } // Inferred as `interface { var x Int var y Int }`
let obj interface { var x Int var y Int } = { x: 1, y: 2 } // Explicitly typed object
// NOTE mutable by default
let obj2 = readonly { x: 1, y: 2 } // Immutable on-demand

// Structural typing
type Point = { var x Int var y Int }
let obj Point = { x: 1, y: 2 }
let obj type { var x Int var y Int } = { x: 1, y: 2 } // Explicitly typed object

// Satisfies interfaces and types structurally
interface IPoint { var x Int var y Int }
let obj IPoint = { x: 1, y: 2 } // Object satisfies interface
let obj2 Point = obj // Interface satisfies type
let obj3 IPoint = obj2 // Type satisfies interface (if runtime-compatible)

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
let obj = { (foo()): 1, (name): 2 } // Uses the same `()` syntax for computations as in pattern matching
obj.x // Safe to access
obj.(foo()) // Error: unknown field name, requires runtime reflection (`Reflect.get`)
obj.(name) // Safe to access -> can compute the name at compile-time
// Alternatively:
let named = "xx"
let obj = { @as(named) foo: 1, @as("baz") bar: 2 }
obj.foo = 123 // Safe to access, compiled into `{ xx: 1, baz: 2 }`

// Object spread-copy for Redux-like updates
let obj = { ...obj, z: 3 } // Infeffed from the `...obj` type
let obj = Point { ...obj, x: 4 } // Shorthand for `Point() { y: obj.y, x: 4 }`
```

#### Mutation Cascades

The fluent cascade syntax `.{}` is a pure declarative multi-field mutation block (fields only, nested via `sub.{}`).

Chaining rule: in a chain, `object.{}.method().method().{}.method().method()` calls run for side effects and their **returned values are ignored** when the call follows `.{}` or `.[]` - the original base object replaces the returned value with itself instead.

```hexa
// Efficient, clear, scoped multiple-field mutation on mutable objects with cascades:
let obj = { x: 1, y: 2 } // Mutable sample object
// JSON look and feel and mimics declarative construction syntax
obj.{ x: 3, y: 4 } // Configuring an existing object with multiple fields in one expression

// Returns an existing object with the fields updated:
obj.{ x: 3, y: 4 }.x // 3
// Distinct syntax from the `{ ...obj }` operator (copy-update) prevents accidental hidden mutations and makes intent crystal clear
obj == obj.{ x: 3, y: 4 } // True, same object returned

// Configure then call a method with chaining:
form.{ username, password }.validate()
person.{ salary: 1000 }.work() // Update and call a method with chaining
let originalSalary = person.salary
// Implementation of `fun work()` returned value is irrelevant and replaced with `person`
person.{ salary: originalSalary * 2 }.work().{ salary: originalSalary }.salary // Temporary mutation pattern
person.salary == originalSalary // True
person == person.{ salary: 1000 }.work() // True, as chained method calls over `.{}` always return the original object
// NOTE Compilation error if the method enforces a return value usage (with annotations)

// Trailing comma is allowed when the line ends with a newline
let obj = {
	x: 1,
}
obj.{
	x: 2,
}

// Shorter syntax for a cascade fields when the variable in the scope matches the field name
let x = 123
obj.{ x } // Shorthand for `obj.{ x: x }`
let y = 123
obj.{ x, y } // Shorthand for `obj.{ x: x, y: y }`

// Nested mutation cascade
obj.{ x.{ y: 1 }, arr.[ index: 1 ] } // `obj.{ x: { y: 1 }, arr: [ ...arr, { index: 1 } ] }`

// Deep nested mutation cascade
object.{
	// Normal cascades
	a: q,
	// Nested cascades
	b.{ // NOTE `field.{}` syntax
		w: 1,
	},
	// Array or map cascades
	arrayOrMap.[ // NOTE `field.[index]` syntax
		index: 1
	],
	// Deep nested mutation cascades
	c.{
		d: 1,
		e.{
			f: 1,
		},
	}
}
```

#### Design Considerations (Objects)
- **Type inference**: Should untyped objects be inferred as `type` or `interface`? (for typed objects it's clear)
- **Immutability**: Should objects be immutable by default
- **More patterns**: What other object patterns should be supported
- **Shorthand**: Rethink shorthand for two or more fields. Maybe allow special case for single value? `{ value }` could be a special case for block with only a single identifier inside -> was actually useful in some cases; this syntax is useless anyway for any other purpose so no confusion
- **Computed fields**: Are runtime computed field names really useful

## Decorators (Attributes/Annotations)

Decorators are a compile-time concept, like C++ attributes.

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
fun someFunction(@example some Type) {
	// ...
}

// Decorators on externals
@external declare fun foo() // Also let/var/class/etc
```

### Design Considerations (Decorators)
- **Duplicate decorators**: Should `@sameName @sameName` be allowed? `@sameName @sameName fun foo() {}`
- **Namespaces**: Should we support `@namespace.decorator` syntax? Only two level deep to keep lean? `@namespace.decorator fun foo() {}` -> unrelated to modules
- **Order semantics**: Is `@a @b fun f()` equivalent to `@b @a`

## Operators

### Arithmetic

```hexa
a + b
a - b
a * b
a ** b
a / b
a \ b  // Integer divide
a % b // Remainder
// NOTE for clarity prefix form of increment/decrement is not allowed
// `++a` and `--a` are not allowed
a++ // Only one way to avoid confusion (both syntactically and semantically)
a-- // Does not return a value, thus `v = a++` is not allowed to avoid one-liners
some.field++
// NOTE not allowed over `array[index]++` as indexed value may be null/non-existent

// Unary operators
// NOTE no prefix form `+a` due to confusion with platform-specific behavior
-a

// Overflow runtime check is optional
@checked { // Also @wrapping @wrapAround
	var x Int = 2147483647
	x++ // ERROR Overflow -> exception is thrown (depends on the target platform)
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
// Simple assignment
a = b

// NOTE `a = b = c` is not allowed, `a = b` returns `Void`
// a = b = c // Error: `Void` cannot be assigned to `a`
// a = b += c // Error: not works either

// Compound assignment
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
map[key] = value // Works for maps too (also assignment)
a ... b // Interval
arg => expr // Arrow function short form
(arg1, arg2) => expr // Arrow function with arguments -> argument types are inferred and cannot be specified
(args) => { expr } // Arrow function with block that returns `expr` -> if block should not return then use `fun`
// NOTE arrow functions have no types, they are inferred
// To use types, use a function (as value expression):
fun (args) return { expr } // NOTE shorthand for `fun (args) { return expr }` i.e. functional programming style -> `{}` is required as we do not respect one-liners, `{}` "enforces" putting the body on a new line
_ = call() // Indicate that not using a returned value is intentional
```

### Operator Overloading

Hexa limits overloading to the logically complete operator sets. Operator sets are pre-defined and sole operators cannot be overloaded.

```hexa
// Concept, actual operator sets are defined by the standard library and compiler
type ArrayOperators<T> {
	fun get(index Int) T
	fun set(index Int, value T) Void
	// ... other operators
}

// Should explicitly implement the operator set
class MyArray<T> ArrayOperators<T> {
	fun get(index Int) T {
		// ... code omitted
	}
	fun set(index Int, value T) Void {
		// ... code omitted
	}
	// ... other operators and fields
}

// Usage
let x = MyArray<Int>(10)
x[0] = 1
let v = x[0]
```

## Control Flow

### Top-Level Statements

They are useful for simple scripts. Hexa has no main function.

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

	// Can alter outer control flow
	// NOTE This enables the `let a = value ?? continue` pattern
	return
	continue
	break

	x + y // The last expression is the result
}
```

#### Design Considerations (Blocks)
- **Block as expression**: Blocks can be used as expressions, but their compatibility with `defer` and `RAII` could be limited

### If / Else / Ternary

`if` can be used as a statement or an expression. Braces `{}` are required.

```hexa
value = if cond { a } else { b } // NOTE {} are required

if x > 0 {
	console.log("Positive")
} else if x < 0 {
	console.log("Negative")
} else {
	console.log("Zero")
}

// Error prevention:
if x > 0 {
	console.log("Positive")
} if x < 0 { // Error: `else` is required in the `{ } if` pattern on the same line
	console.log("Negative")
}

// Multiple conditions
if x > 0, y < 10 { // Same as `if (x > 0) and (y < 10)`
	console.log("Positive")
}

// Compatible with bindings - vibes with do-notation
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

#### Ternary Operator

```hexa
cond ? a : b // Ternary operator (NOTE nested ternary is not allowed)

// Error prevention: nested ternary should be wrapped with a `(` and `)`
let result = x > 0 ? "Positive" : (x < 0 ? "Negative" : "Zero")
```

### Loops

NOTE `for`, `do` and `while` loops are not expressions.

The `for` loop may accept user-defined iterable types (not covered in the syntax reference, API-covered).

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
} while x < 10 // NOTE no () for consistency and no `,` after the condition to avoid unnecessary complications of the `do while` loops (they are already pretty rare and confusing)

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
for i in 100 { // NOTE a variable name is always required
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
- **Nullability**: `for item in items` is null-safe and skips null items and add `for item? in items`/`for item! in items`/`for item in? items` to iterate over nullable items explicitly, current design iterates over null items

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
return value // Always picks the next expression (until `return` is the last expression itself)
{ return } // A just-return without picking the next expression -> less confusion compared to automatic semicolon insertion
throw error
```

### Try / Catch

Hexa offers exception handling for special cases where performance hit of the `??` checks is undesired or other means of result propagation is not available or impractical.

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

#### Result

Hexa encourages the use of nullable types with the `??` pattern, but a Result-like approach is possible with standard functionality:

```hexa
@extensibleTags
enum Result<T> {
	Ok(value T)

	// Computed property for safe unwrapping
	let result T? {
		get {
			switch this {
				case Ok(value): value
				case _: null // Forces downstream null-checks with `??`
			}
		}
	}
}
```

Example usage with a `@orReturn` shorthand:

```hexa
// Arbitrary user type used for final resulting value of operations
/// Payload type for successful IO operations
interface IoPayload {
	let path String
	let operation String
}

// Domain-specific Result-like enumeration is also user-defined
enum IoResult Result<IoPayload> {
	NotFound
	PermissionDenied
	IoError(message String)
	Timeout
}

fun readFile(path String) IoResult {
	// ... implementation concept
	if not exists(path) { return IoResult.NotFound }
	// ... return using the Ok tag inherited from Result
	return IoResult.Ok({ contents: data, path: path })
}

fun processFile(path String) IoResult {
	// Automated with the `@orReturn` shorthand
	// Type of the `payload` is `IoPayload`
	let payload = @orReturn readFile(path)

	// Manual unwrap with null-coalescing (same logic as `@orReturn` built-in)
	let payload = {
		// Cache the outcome to not call `readFile` twice
		let outcome = readFile(path)
		// Propagate whole `outcome` if its tag is not Ok (i.e. `.result` getter returns null)
		outcome.result ?? return outcome
	}

	// Use payload...
	console.log(payload.path, payload.operation)

	// Return Ok
	return IoResult.Ok(payload)
}
```

#### Throw

Checked and unchecked exceptions are supported. On native platforms, exceptions are translated to C++ exception ABI by default.

```hexa
throw Error("message") // Checked by default
@unchecked throw Error("message", cause)

// Throwing arbitrary values is allowed
throw "any value" // When the target supports it, otherwise wrapped in an error

// Allow throwing only a specific subset
@throws(IOException, ParseError)
fun readConfig(path String) Config {
	if not exists(path) {
		throw IOException("File not found")
	}
	// Also forces the user to catch other calls if they throw other exceptions
	try {
		functionThatThrowsTypeError()
	} catch e TypeError {
		throw ParseError("Failed to parse config")
	}
}

@throws(Void) // No throws -> forces the user to catch all in caller
fun caller() {
	try {
		readConfig("config.json")
	} catch e IOException {
		// handle
	} catch e ParseError {
		// handle
	}
	// Compiler error if not all thrown types handled/propagated
}

@unchecked
fun risky() {
	throw RuntimeError("boom") // No need to declare/catch
}
```

##### Design Considerations (Throw)
- **Checked exceptions**: Describe `@throws` and checked/unchecked exceptions in more detail

## Functions

Closures follow the same rules as JavaScript functions (capture by reference), including arrow functions.

Function names follow same rules as identifiers: must start with a *lowercase* letter or underscore.

```hexa
// Function names must start with a lowercase letter or underscore
fun camelCase() Void { // Return type is optional and comes right after the arguments closing parenthesis
	// Function body `{}` is always required for clarity
}

// Basic function
fun add(a Int, b Int = 5) Int { // Default arguments are allowed
	return a + b // Braces `{}` around the body are required for clarity (when no `return` short-hand is used instead of the body itself)

	// Nested functions
	fun nested() {}
	nested()

	// Arguments are not re-assignable (assume `let`)
	// a = 123 // Error
}

// Calls
add(1, 2)
add(1) // b is optional

// Optionally can be called with the same argument names as in function declaration (no need for separate named arguments set)
add(a: 1, b: 2) // NOTE order is required to match arguments
add(a: 1, 2) // Does not matter which one to name, developer decides for clarity at call site
add(1, b: 2)

// Generic function - implicit - enables gradual typing (e.g. when prototyping)
fun identity(x) { // NOTE lack of type parameters (both <T> and T)
	// NOTE this function is still fully generic, it just infers the type
	return x
}

// Generic function a pro-actively type-checked with placeholder types
// This enables partial type-checking even when the function is not used by the library itself anywhere
fun example<T>(x T) T {
	T.hello() // Allowed, `T` is a placeholder type - unknown before instantiation
	x.hello() // Allowed too, as `x` of type `T`
	"string".nonExistingMethod() // Error, `String` is not a placeholder, but a well-known type
	return x + 5 // Inferred to placeholder type
}

// Arrow function
let double Callback = (x) => x * 2 // NOTE arrow functions require known expected type to infer their arguments

// Arrow function lowering to a plain function
let plain = (x) => x * 2 // Lack of known types when assigned directly to a new constant is lowered to a plain `fun` function:
fun plain(x) { // NOTE preserves genericity
	return x * 2
}
plain(1)

// Function type
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
fun fooForInt(i Int) Int {
	return i
}

fun fooForString(s String) String {
	return s
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
let fibAsValue = fun fib(n Int) Int { // It needs a name to be recursive -> arrow function cannot be recursive but `fun` syntax is interchangeable
	if n <= 1 {
		return n
	}
	return fib(n - 1) + fib(n - 2)
}

fibAsValue(10)

// bind call apply
let f = fun (x Int) Int { return x + 1 }
let bind = f.bind(1)
let call = f.call(1)
let apply = f.apply(null, [1])
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
foo(123)
foo("hello")
fun foo is fooForInt or fooForString // Allowed to define an overloading at the use site (local scope) too
```

## Classes and Interfaces

Types (classes, interfaces, traits, enums) always start with a capital letter.

Fields of class-like types (`class`, `type`, `interface`, `enum`) start with a keyword, like `var`, `let`, `fun`, etc. Enum tags start with a capital letter.

### Classes

```hexa
class Point {
	var x Int // NOTE lack of `=` default value implies late init (definitive assignment analysis is applied)
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

		fun nested() {
			this // NOTE `this` is a class's `Point` instance from the outer scope, not this-bindable function
		}
	}

	static var xx Int = 123 // NOTE static members are allowed
	private static var yy Int = 123 // NOTE private static members are allowed

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

#### Immutability

Classes can be marked as `readonly` to make their instances immutable from outside of the class. This is a compile-time check.

Immutables are separate types: a mutating function can take a mutable instance, while a non-mutating function can take any instance (mutable or readonly).

Clarity: `readonly fun` explicitly documents purity, `private fun` signals encapsulated mutation, `fun` allows for performance-sensitive escape hatches.

The `readonly class` means instances are externally immutable by default, but allow controlled internal mutation during creation or when owned mutably (via public non-readonly methods).

This creates a clear lifecycle: creation phase (mutable internally) -> initialization (controlled mutation) -> stabilization (`return readonly p`) -> observation phase (immutable projection):

```hexa
readonly class Point() { /* ... */ fun adjust(x Int, y Int) { this.x += x; this.y += y } }

fun makePoint() /* readonly Point <- inferred from returned value */ {
	// Creation phase
	let p = Point() // `readonly class Point` but not `let p = readonly Point()` at use-site
	// Initialization phase
	p.adjust(1, 1) // Mutation is still controlled and allowed here *only* via public non-readonly methods
	// p.x = 10 // Error! Not allowed to mutate directly
	// Stabilization phase
	return readonly p // Now we apply `readonly` to the *value*

	// Alternatively apply `readonly` to the function return *type*
	// fun makePoint() readonly Point
	// return p // Still works as the stabilization point due to explicit `readonly` type
}

// Observation phase
makePoint().adjust(1, 1) // Error! Not allowed to mutate explicit `readonly Point`
```

Even though `let p = Point()` (where `Point` is a readonly class) allows mutation via public non-readonly methods (e.g. `p.adjust()`), it is *not* fully freely mutable like a normal mutable class would be: direct field writes (e.g. `p.x = 10`) are still forbidden.

Trust layering: core team can afford careful interior mutability (inside the class itself), application/library team uses the reduced API surface (controlled via `readonly class`), downstream users get strongest guarantee possible without runtime cost (via `readonly T`/`readonly value`).

Full syntax:

```hexa
// Readonly from outside, writeable from inside of the class
readonly class Point {
	var x Int // No need for getters just to prevent external mutation
	var y Int // NOTE `var` usage here
	let origin Origin = { x: 0, y: 0 } // NOTE `let` can still be used to enforce immutability of the field even inside of the class
	// `Origin` is a nested object, it does not inherit `readonly` allowing mutation from the *inside*

	// Enables efficient builder patterns due to in-place mutation
	new (x Int, y Int) {
		this.x = x
		this.y = y
	}

	// Allows efficient in-place mutation when needed (e.g., `move` updates coordinates without allocation)
	fun move(x Int, y Int) {
		// Can overwrite own fields from inside
		this.x += x
		// Nested objects do not inherit `readonly` from the *inside*
		this.origin.x += x

		// Access to other (non-`this`) instance fields is still `readonly`
		let other = Point(1, 2)
		other.x = 10 // Error: cannot assign to readonly field
		// You cannot take a readonly instance, pass it into a method of the same class, and mutate it there: the only way to mutate a readonly instance is through a method call on that exact instance
	}

	static var s Int = 0 // Statics are `readonly` from outside, writeable from inside

	// Non-mutating methods can be marked as `readonly` and cannot change anything that they create and touch, including `this`
	readonly fun distance(other Point, origin Origin = { x: 0, y: 0 }) Int { // Assumes `readonly Origin` despite creating its default value
		return (this.x - other.x) * (this.y - other.y)
		// Cannot mutate `this` or any other instance fields
		this.x = 10 // Error: cannot mutate `this`
		origin.x = 10 // Error: cannot mutate anything it receives as an argument
	}
}

// Instance fields are implicitly marked as `let` and `readonly` from outside
let p = Point(1, 2) // Effectively `let p = readonly Point(1, 2)`
p.x = 10 // Error: cannot assign to readonly field
let origin = p.origin // Effectively `let origin = readonly p.origin`
origin.x = 10 // Error: fields inherit `readonly` from outside

// Inheritance of mutability allows fine-tuning: classes do *not* become `readonly` when their base is `readonly`, this is decided by the descendant
// With writeable base class:
class A { var a } // `.a` is writeable from outside
class B readonly A { var b } // `.a` is readonly inside of the class, `.b` is writeable
readonly class B A { var b } // `.a` and `.b` are readonly outside of the class

// With readonly base class:
readonly class A { var a } // `.a` is readonly from outside
class B A { var b } // `.a` is readonly from inside, `.b` is writeable
readonly class B A { var b } // `.a` is readonly from inside and outside, `.b` is readonly from outside
```

#### Field Access

```hexa
// Field access
let p = Point(1, 2)
p.x = 10 // Instance field access
// p.y = 20 // Error: private instance field

p.move(5, 5) // Instance method call

Point.xx = 100 // Static field access
// Point.yy = 200 // Error: private static field

let origin = Point.origin() // Static method call
```

Static fields can be accessed as instance fields too, for refactoring purposes:

```hexa
Point.xx = 100 // Static field access
p.xx = 100 // Instance field access of the static field
p.origin() // Same with methods
```

#### Design Considerations (Classes)
- **Nested classes**: Inner/nested classes are currently not supported for code clarity. Should this change

### Class Constructors

```hexa
class Point {
	// Order is not important if the compiler can prove it (with simple control flow analysis)
	let z Int = y // If `y` can be computed upfront, `z` will be evaluated after it (in the constructor body)

	var x Int // No default value -> must be either assigned in `new` or at creation site with `Point { x: 1 }`
	var y Int = 0 // Can have default values

	// NOTE only a single, non-overloaded constructor is allowed
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

	// NOTE `new() {}` assumed by default
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

// When all fields and constructor arguments have defaults, the `{}` shorthand can be used
let point6 Point = {}
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

Const generics allow the creation of types that depend on values.

```hexa
class Box<T, let size T> { // NOTE `let` is used to declare a constant generic and can depend on other generics (e.g. `T`)
	var value T

	new (value T) {
		this.value = value * size
	}
}

let box = Box<Int, 1>(123)
let box = Box<Int, size: 1>(123) // Explicitly named constant generic

// Default constant generic value
class Box<T, let size T = 123> { /* ... */ }

// Enumerations cannot be used as constant generics -> they must be of a simple basic type
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

Traits reuse the `type` keyword but are overall parsed in the same way as a class.

Usage of the `trait` keyword would reduce adoption and semantically does not fully match the concept of the `type`. The `type` fits better as in "structural typing". Types are a compile-time concept and the usage of `type` reinforces this.

```hexa
// Parsing rules same as of classes
type BoxTrait { // NOTE traits use `type` keyword but are overall parsed in the same way as a class
	fun box() Void
}

// Generic trait
type BoxTrait<T> {
	fun box(value T) Void

	// Traits can provide default implementations (extensions)
	// NOTE the implementor is *not* required to provide an existing field
	fun extension(value T) Void {
		// Do something
	}
}

// Implementing trait
class Box BoxTrait<Int> { // NOTE traits are implemented just mentioning them in the class declaration
	fun box(value Int) Void {
		// Do something
	}
}

// Implicitly implementing a trait
class Box { // NOTE no need to mention the trait in the class declaration
	fun box(value Int) Void {
		// Do something
	}
}

// Trait can be used structurally
let box BoxTrait<Int> = Box()
box.box(123)

// Using extension traits
box.extension(123)

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

// Compose multiple traits into one (supertrait-like for generics constraints / complex bounds)
type AddableCopyable Add Copy {} // Empty trait requiring both Add and Copy (conceptual traits)

// Named constraint encourages reusable abstractions
fun merge<R AddableCopyable>(a R, b R) R {
	return a + b // Both are Add and Copy
}

// Compile-time type validation with concepts
type Valid<T> = switch T {
	case Int: T
	case _ if T.meta.sizeOf < 4: throw "Type is too small"
	case _: throw "Unsupported type"
}

let x Valid<Int> = 123
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
	type Collection<V> = Map<K, V> // NOTE `V` is a generic type parameter of the `type` field inside the trait
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

#### Associated Types in Type and Constant Patterns

Important to note that evaluated constant patterns are immutable (pure) and cannot call any methods (macro system is supposed to be used for complex cases) except non-mutating meta-methods (e.g. `meta.alignOf`).

```hexa
let box = Box<TraitsFor<Int>>()
let padding = 8

// Type patterns can be associated types too
class Box<T, U, Z, let size Int> {
	// Still works as normal `let`, possibility to be used in type patterns is decided on-demand
	let align = U.meta.alignOf

	// Effectively conditional constraints - happens at compile-time (for `type T = switch` patterns)
	type Value = switch T, size {
		// T == Int, size == 1
		case Int, 1: Int

		// T == Array<U>, size == 2
		case Array<U>, 2: Array<Z>

		// Any Array
		case Array<_>, _: Array<Z>

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

// Generics become associated types and static pseudo-fields too:
console.log(Box<Int, String, Float, 123>.size) // Access <size>
let int Box<Int, String, Float, 123>.T = 123 // Access <T>

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

##### Design Considerations (Associated Types)

- **Simpler syntax**: The `let` in `<let a B>` may imply the availability of `var` and that it becomes a field of the class, which may be confusing

### Inheritance

```hexa
class Shape {
	fun draw() {}
}

// Single inheritance (the first in the list) but any number of traits or interfaces allowed (in any order)
class Circle Shape Trait Interface {
	fun draw() { // NOTE `override` is not required - but signature must match
		// Draw circle
		super.draw() // Call the parent method
	}

	new () {
		// Call the parent class constructor
		super()
	}
}
```

### Interfaces

Compared to traits, an interface is a runtime feature (via reflection and virtual methods if the platform supports it). Interfaces are parsed the same way as classes.

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

	// `let` can have only `get`, `var` requires `get` and `set`
	let area Int {
		get {
			// Assumes `return` as if it were `get return { expr }` (not actual syntax)
			// This makes properties more declarative
			width * height
		}

		// Optional setter -> does not return anything
		// set (v) { /* ... */ }
	}
}
```

#### Design Considerations (Properties)
- **Setters**: Rethink setter syntax

### Destructuring

```hexa
// NOTE `let` is required for clarity
// Does not work with `var` for safety reasons: `var` could confuse the reader into thinking that the `Rect` object fields are being re-assigned
let {width, height} = Rect {width: 1, height: 2}

// Nullables are fine
let {value} = Some {value: null} // `value` is nullable here

switch value {
	case {width, height}: // NOTE `let` is NOT required
		console.log("Width: ", width, "Height: ", height)
	case {width: 123}: // NOTE checking a specific value
		console.log("Width: ", width)
	case {width: _ > 123 and _ != 0, height}: // NOTE checking a condition with a compile-time known expression
		console.log("Width: ", width)
		console.log("Height: ", height) // NOTE height is not checked

	case SomeEnum(rect: {width, height}): // NOTE destructuring inside the pattern
		// NOTE with nested pattern {} the `rect` itself is not captured
		console.log("Width: ", width, "Height: ", height)

	case SomeEnum(rect: {width as w: 123}): // NOTE checking a specific value inside the pattern
		// NOTE `width` is captured as `w`, otherwise `width` is not captured and only checked against the pattern `123`
		console.log("Width: ", w)

	// Capture with renaming
	case SomeEnum(rect as rectangle: _): // Capture any `rect` as a variable `rectangle`
		console.log("Rectangle width: ", rectangle.width)

	// Advanced patterns
	case {width: _ > 123 and _ != 0, height}: // NOTE checking a condition with a compile-time known expression
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
- **Nullability**: Need to decide if `case Some(nested)` here `nested` takes `null` (T?) too or better make it always be non-null (T) and require explicit `case Some(null)`/`case Some(nested?)`/`case Some(nested? as nullable)` or similar (this would also make `case some: case null:` soundly disambiguated)

## Enumerations

```hexa
// Complex enums
enum Color { // Should not inherit from the basic type (like `Int`)
	// NOTE tags are always capitalized (uppercase first letter) and not confused with variables in pattern matching
	Red
	Green
	Blue // No separator required (i.e. no `,`)

	// With payload
	Other(r Int, g Int, b Int, a Int = 255) // Both name and type are required
	// NOTE can have defaults

	// Nested
	Nested(value Color)

	// May have methods
	fun method () {
		switch this {
			case Red: console.log("Red")
			case _: console.log("Other")
		}
	}
}

// Simple tag (no payload)
Color.Red != Color.Red // Every instance is a unique value for non-baked enums

// Payload with named fields -> order of the arguments doesn't matter
Color.Other(r: 255, g: 0, b: 0) != Color.Other(g: 0, b: 0, r: 255)
// This allows you to control the order of evaluation or to improve code readability
Color.Other(
	// NOTE `getNextByte()` is called in source order (left-to-right)
	// Let's imagine that the file format is binary and stores `a, r, g, b` in that order
	// Thus reading from the stream in the wrong order would yield an invalid color
	a: getNextByte(),
	r: getNextByte(),
	g: getNextByte(),
	b: getNextByte()
)

// Nested
Color.Nested(Color.Red)

// Can omit type name when tag type is known up front (here `Color`)
Color.Nested(Other(r: 0, g: 255, b: 0))

// Enum with values -> has a baked type (here `Int`)
enum Status Int { // NOTE adding a basic type after the space turns it into a constant enum
	Ok = 200
	NotFound = 404
	BadRequestError = 404 // Duplicate value is NOT allowed with constant
	BadRequest = NotFound // Duplicate value is allowed with alias
	Overloaded // Inferred value as BadRequest + 1 (auto-increment)
}

// NOTE direct comparison (`==`, `!=`) of enum tag *constructors* is not allowed
// Status.Ok == Status.Ok // ERROR Disallowed at compile time as not making any sense
// Status.Ok != Status.Ok // ERROR too

{
	// NOTE adding `()` parenthesis is required to workaround the `==` operator
	(Status.Ok) == (Status.Ok) // Every tag is just a raw value with a name
}
var plain Int = Status.Ok // ERROR Sound type system disallows this

// Tag as a type (NOTE still requires a `switch` to extract associated tag values if any)
var status Status.Ok = Status.Ok // Well-known tag
var status Status.NotFound = switch Status.Ok {
	case _: Status.NotFound
	case Status.NotFound as code: code // Well-known tag as a variable
}

// Compatible with function overloading - akin to static dispatch
fun onStatusOk(status Status.Ok) {
	console.log("Ok")
}

fun onStatusNotFound(status Status.NotFound) {
	console.log("Not found")
}

fun onStatus is onStatusOk or onStatusNotFound
onStatus(Status.Ok)
onStatus(Status.NotFound)
```

### Enumerations Inference

Enum tags can be inferred from the value on the left side. This allows for a short syntax for them.

Here is an ambiguity resolution example:

```hexa
var status Status = Ok // Well-known tag - inferred from the value on the left side
setStatus(Ok) // Same idea

fun genericFunction<T>(value T) {
	if value == Ok { // Allowed as `value` type expected, so assumed that `Ok` is a tag name, not class
		console.log("Ok")
	}

	let some T = Ok // Allowed as `some` expects some `T` too
	let status = T.Ok // Allowed too

	// NOTE in all cases above `Ok` would have a placeholder type for the partial pro-active typing of the generic functions

	let other = Ok // This would assume that `Ok` is a class name, as type of `other` is not known up front
	// It may error if no `Ok` found in scope or if it cannot be used like that
}
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

### Enumerations Inheritance

Enumerations can inherit from other enumerations. They may add methods, fields in case of complex enums, and tags if the parent enum specifies `@extensibleTags` decorator:

```hexa
@extensibleTags // Allows derived enums to add tags and forces `case _` for the parent enum
enum Color {
	Red
	Green
	Blue

	fun getColor() {
		switch this {
			case Red: return "Red"
			case Green: return "Green"
			case Blue: return "Blue"

			// This pattern is enforced by the `@extensibleTags` decorator
			case _: return "Other"
		}
	}
}

enum ExtendedColor Color {
	Yellow
	Purple
}

// Both normal and extended enums are compatible with each other
var color Color = ExtendedColor.Yellow

// Complex enums also use a runtime-known extensibility mechanism similar to the classes
let unknown Any = ExtendedColor.Yellow // Instance of `ExtendedColor` is an instance of `Color` too
switch unknown {
	// Runtime type check and a cast
	case Color(color): switch color {
		// Can now match it as a `Color`
		case Red: console.log("Red")
		case Green: console.log("Green")
		case Blue: console.log("Blue")

		// NOTE at usage sites the `_` pattern is required to be present even if all cases are covered due to `@extensibleTags`
		case _: console.log("Other")
	}
	case _: console.log("Other")
}

// NOTE plain enums are baked by simple types like `Int` so the do not offer such functionality
```

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
	case "String": // NOTE string literals are allowed - can match native null-terminated strings too
		console.log("String")
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
- **Fluent**: Should we allow `value.switch {}` in addition to `switch value {}`

### Switch as Expression

A `switch` can be used as an expression, and it's always exhaustive.

The `case _:` is used instead of `default` to be consistent with nested pattern matching: `case Other(_):` allowing for wildcard pattern matching without confusing `case Other(default):` syntax.

```hexa
var three = 3 // NOTE `var` i.e. can be any actual value at the moment of pattern matching

let result = switch value { // NOTE no `()`
	// Order of wildcard pattern does not matter and always acts as fallback
	case _: // NOTE always checked last no matter where it is placed
		"Other"
	case 1 if value >= 1: // NOTE `if` is a runtime check, its executed when pattern is matched but if evaluates to `false` then next case is checked
		"One"
	case 2:
		"Two"
	// Switch over computable values
	case (three): // NOTE `()` picks runtime value to match to
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
	// Names are not positional -> they were in original design, now names are required to match and order is not important
	// Newer design allows for future extension of enum values, and avoids issues with positional matching when names can matched in the wrong order
	case Other(r, g, b as blue):
		// NOTE exact same names are required (i.e. `r` and `g`)
		// NOTE order of parameters is NOT important due to names requirement above
		// NOTE `b as blue` allows renaming the parameter
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

Enumerations can be marked as bit flags, allowing for bitwise operations.

```hexa
// @flags -> marks the enum as flags, defaults to the smallest integer type
@flags enum Flags Int {
	A // Values inferred as 1, 2, 4, ...
	B
	C
}

var flags = Flags.A | Flags.B
flags |= Flags.C
flags |= C // Infered as `Flags.C`
flags &= ~Flags.B
```

Pattern matching can be used to match flags:

```hexa
switch flags {
	// 1. EXACT Match (Has Flag A)
	// Transpiles to: if (flags == Flags.A)
	case A:
		// ...

	// 2. PARTIAL Match (Has at least Flag A set, ignores others)
	// Transpiles to: if ((flags & Flags.A) == Flags.A)
	case A | ...:
		// ...

	// 3. EXCLUSION (Has Flag1, but DEFINITELY NOT Flag2)
	// Transpiles to: if ((flags & Flags.A) == Flags.A && (flags & Flags.B) == 0)
	case A | ... | not B:
		// ...

	// 4. COMBINATION (Has at least Flag A AND Flag B)
	// Transpiles to: if ((flags & (Flags.A|Flags.B)) == (Flags.A|Flags.B))
	case A | B | ...:
		// ...
}
```

Compatible with multiple matches and alternatives:

```hexa
switch value {
	case A | B | C or D | E | F: // NOTE `or` has lower precedence than `|` here
		console.log("Either exact (A | B | C) or exact (D | E | F)")
}

// Switch over multiple values
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
- `Null<T>`: Nullable value of type T, an alias for `T?`

#### Design Considerations (Basic Types)
- **Nullability**: `Nullable<T>` as an alias for `T?` instead of `Null<T>`

### Dynamic Types

- `Any`: Dynamic type - can be anything at runtime and not checked at compile time, platform-dependent
- `Any?`: Optional dynamic type - requires null check before use and every returned field is nullable too
- `Unknown` and `Unknown?`: Same, but needs to be casted to a specific type before use

### Composite Types

- `[T]`: Array of T
- `[K: V]`: Map with key K and value V
- `T?`: Optional T (nullable)
- `type { let x Int var y Int }?`: Object type + optional
- `interface { let x Int var y Int }?`: Object interface + optional

```hexa
// Shorthand for a type -> otherwise just inferred
var point type { let x Int let y Int } = { x: 1, y: 2 }

// Shorthand for an interface
let point interface { let x Int let y Int } = { x: 1, y: 2 }
```

### Type Aliases

```hexa
type ID = String
type Generic<T> = Other<T>
type Callback = (result Int) => Void
type GenericCallback<T> = (result T) => Void
```

### Casts

Previous approach with infix operators was not very good for chaining and caused precedence confusion.

Feedback from the community also shows some dissatisfaction with `as!` exclamation mark operator.

```hexa
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

// Cast to an inferred known type `T` with `_` placeholder
let some T = expr.as(_)
```

#### Design Considerations (Casts)
- **Behavior**: Behaviour specification for dynamic casts (throw vs null)
	- `expr.as(Type, 'dynamic_cast', 'throw') // cast-or-throw`
	- `expr.as(Type, 'dynamic_cast', 'null') // cast-or-null`
- **Syntax**: `expr.as(Type)` vs `expr.as(Type, 'static_cast')` vs `.as?` `.as!`
- **Is operator**: Describe `is` operator or remove entirely in favor of `switch` over type and `if let = x.as(T)`

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

### Unions

Unions are a way to store different types of data in the same variable. Work on any platform, normally stored as `Any` but the exact implementation is platform-dependent. Enables JSON access and mixed types coming from the foreign languages.

```hexa
@union
class Union {
	var i Int
	var s String
}

let x = Union { i: 1 }
let y = Union { s: "2" }

x.i = 2
y.s = "3"

// Runtime switch over the type is performed for `@union` values
switch x {
	case Int(int):
		console.log("Int", int)
	case String(str):
		console.log("String", str)
	case _:
		// `_` is a wildcard pattern that fallbacks when no other pattern matches
		// Not enforced at compile-time, but may be usefull for complex scenarios not handled by the default runtime type-matching algorithm

		let other = x.as(Any) // Cast manually
		console.log("Other", other)
	// Alternative fallback syntax NOTE only either `_` or `Any` can be used as a fallback
	case Any(other):
		console.log("Other", other)
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
let z Some = null! // Force null-initialization (useful for prototyping)

// NOTE this syntax is not allowed
// let z Int! = null // Error `T!` is not allowed

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

// Example of optional chaining
let name = user?.profile?.name ?? "Guest"

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

Hexa files `.hexa` are listed in the `hexa.json` project file, their order within the project file affects the initialization order. Project file also controls the namespace of each module.

```hexa
import NameSpace
import Math // Can import static fields into current scope and associated types (e.g. `sin()`)
// Can import static fields into current scope and associated types (e.g. `sin()`)
import Math { sin cos as cosine } // Import specific members

// No separators needed, but users expected to add newlines for readability
import Math {
	sin
	cos as cosine
}

import NameSpace { TypeName1 TypeName2 as MyName } // Import the type itself, alias as needed
import NameSpace { TypeName1 TypeName2 method1 method2 } // Mixed imports (take methods from the namespace)

import NameSpace.TypeName // Nested is possible
import Deep.Nested.NameSpace.TypeName // Deeply nested is possible
import NameSpace as AliasNameSpace // Can alias, does not do a wildcard import when aliased
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

// Not exported from the .hexa file or parent type (e.g. class)
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

### Design Considerations (Preprocessor)
- **Segregation**: Support period for namespaces like `--define mylib.mode=Mode.Debug` or even multiple like `--define com.example.mylib.mode=Mode.Debug`
- **Enums**: Support enums in preprocessor requires to think how to resolve them before the tokenization: maybe add `preprocessor` file list into the hexa.json that is pre-parsed separately upfront

## JSX

```hexa
fun div(props: { var children [Node]? }) {}

// Lowercase tag names allow for HTML-like syntax
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

Meta methods allow access to type information and other metadata at compile time (like size of structure akin to sizeof in C).

NOTE due to Hexa targeting both C/C++ and JavaScript, having a built-in for `sizeof` is impractical. `meta` allows to have target-specific meta methods without polluting the language.

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

// Introspection - other meta-methods are also available beyond examples above
fun printFields<T>(value T) {
	// @unroll // Enforce unrolling of the loop for a well-known iterable (here `meta.fieldNames`)
	for field in meta.fieldNames(T) { // Can be stored into [String]
		console.log("Field: {field}")
	}
}

printFields(Point(1, 2))
```

### Design Considerations (Meta Methods)
- **Redundancy**: Is `value.meta.type` redundant and just use `value.type`/`value.type.meta`/`value.meta`

### Macros Metaprogramming

Macros are a way to perform syntax tree manipulation in Hexa. They declare the `@decorator` which then calls into the macro callback.

Macros are not part of the syntax. They are compiled as separate sub-projects and `.hexa` files that define the macro are not included into the main project.

They are executed before the main project is compiled and have access to the compiler API. They are normal code and their `.hexa` files can be reused within the main project (as long as the file in question does not touch the compiler API).

## Async

Async is the only universal asyncronosity primitive in Hexa. Other features are platform-specific.

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

Alternative is `meta.spawn()` or similar for actual OS threads/pools, on supported platforms.

### Design Considerations (Async)
- **Syntax**: `async(isAsync)` or `async<isAsync>`? `()` is syntactically closer to the decorator syntax and less pointy

### Fluent Await

Fluent postfix await is a syntax that allows writing chained async function calls in a more readable way.

```hexa
// Prefix form
async fun fetchData() {
	let data = await fetch("https://api.example.com/data")
	return data
}
```

Can be written as:

```hexa
// Postfix form
async fun fetchData() {
	let data = fetch("https://api.example.com/data").await
	return data
}
```

This enables more readable code when chaining async functions:

```hexa
let data = fetch("https://api.example.com/data").await.json().await
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

	// With flags
	case /def/gi:
		console.log("def")

	// With named groups
	case /(?<name1>\w+) (?<name2>\w+) (?<name3>\w+)/ {name1: "John", name2: "Snow"}:
		console.log("Perfect match for John Snow, name3 is captured as-is:", name3)

	// With named groups and array pattern
	case /^cmd (?<name>\w+) (?<arg>\w+)*$/:
		console.log(command, "with args:", arg.join(", "))
}
```

Future work may transform the whole `case /regex/` pattern set of a single `switch` into optimized parser code at compile time.

### Design Considerations (Regular Expressions)
- **More patterns**: What other patterns should be supported
- **More syntax**: JS regex syntax subset? Unlikely PCRE, or do platform specific

# Advanced Memory Management

Hexa prioritizes safety and performance by default: most types use automatic reference counting or platform garbage collection where appropriate, with no overhead for simple cases.

For fine-grained control in performance-critical code, optional ownership semantics are available via decorators: they enforce uniqueness and lifetimes without altering core syntax.

```hexa
// Ownership decorators are just normal decorators and don't need an overview in the syntax reference:
fun process(
	@someOwnershipDecorator buffer Buffer
) { /* ... */ }
```

# Native Programming

Hexa is a multi-paradigm language, supporting both high-level and low-level programming styles.

This sample briefly covers the low-level features of Hexa. Note that Hexa does not offer any explicit syntax for native code. Instead, existing syntax elements and concepts are used to represent native code.

```hexa
@struct
class NativeStructure {
	var x Int
	var y Int

	// Can have constructor and methods, they are not present in the virtual method table by default
	new (x Int, y Int) {
		this.x = x
		this.y = y
	}

	fun add(other NativeStructure) {
		this.x += other.x
		this.y += other.y
	}

	// Other features like RAII are managed by the @decorators
}

// Allocated on the stack, enforced by the compiler not to leave the stack on the call tree
let x = NativeStructure(x: 1, y: 2)
// Structure types are passed by reference, and they are tracked so as not to leak
x.add(NativeStructure(x: 3, y: 4))

// Allocated on the heap
let y = @heap NativeStructure(x: 1, y: 2)
x.add(y) // `y` is still tracked so as not to leave the `fun add` call stack

// @struct is a referential type (pointer) by default
let x = 0x1234.as(NativeStructure)
let byValue ByValue<NativeStructure> = @byValue NativeStructure(x: 123, y: 345)
// Alternatively value-ness can be inferred
let byValue ByValue<NativeStructure> = NativeStructure(x: 123, y: 345)
x.add(byValue.ref) // Access the `.ref` field to get a reference (pointer)

// `ByValue` may be constructed directly to avoid calling the constructor
let byValue ByValue<NativeStructure> = ByValue<NativeStructure>() // No arguments are allowed
// Has to be initialized manually
byValue.ref.x = 123
byValue.ref.y = 345

// Union structures
@union @struct
class Union {
	let x Int
	let y Int
	let z ByValue<NativeStructure>
}

// Allocated and tracked exactly the same as structures
let x = Union { x: 1 }
let y = Union { y: 2 }
let z = Union { z: NativeStructure(x: 1, y: 2) }

// Unions work exactly the same as in C
x.x = 2
y.y = 3
z.z.x = 4
z.z.y = 5

// Other features
// Custom @entry
// @volatile @weak Span<T> SIMD @syncronized (thread-safety)
// ...etc as per documentation
```

### Assertions

Some decorators allow for compile-time checks performed:

```hexa
@sizeOf(256)
@struct
class NativeStructure {
	let bytes ArrayByValue<UInt8, 256> // `@sizeOf` enforces the total size of the structure
}
```

For the runtime checks, `console.assert` can be used:

```hexa
console.assert(condition, "message")
```

---

# Intentional Omissions

Hexa deliberately excludes certain features to maintain minimalism, readability, and target-agnostic consistency:

- `goto` statements - avoided to encourage structured control flow and improve code safety
- Multiple class inheritance - **single inheritance** combined with traits provides sufficient flexibility without the diamond problem's complexity
- `finally` blocks in try/catch - omitted to keep exception handling syntax simple; resource management is encouraged via scope-based patterns or decorators
- `protected` and `public` visibility - only `private` is supported; module-level exports control visibility, reducing access modifier noise
- Inline macros or `comptime` blocks in regular code - metaprogramming is confined to **separate macro files** with explicit APIs to preserve clarity in main source files
- Tuple types - in favor of `{ x, y }` short-hand syntax, structural objects and maps with **named fields** are preferred for better self-documentation and maintainability, positional destructuring is done by other means (like giving class field an index as an alias)

# Conclusion

Hexa delivers safe, fast, and clear programming across web, mobile, desktop and bare-metal targets.

Hexa is deliberately boring in the right places (familiar control flow, mainstream operators, no kitchen-sink syntax) and radical only where it saves **time-to-market**: exhaustive matches, null-safety, target-agnostic FFI, and zero-cost opt-outs for the 3% of code that has to be "C in disguise".

With declarative syntax, advanced pattern matching, a rich type system, strict nullability and decorator-driven features, it cuts complexity without losing expressiveness.

Hexa powers today's and tomorrow's game engines, applications and ambitious systems projects.
