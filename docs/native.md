# Hexa Native Programming Reference

This guide provides a detailed overview of the native features and low-level capabilities of the Hexa programming language. For topics not covered here, please refer to the full syntax reference for a complete guide on language syntax and higher-level constructs.

## Core Concepts

Hexa is a systems programming language designed for performance and safety. This reference covers native-level operations and syntax.

Inline // comments explain non-obvious aspects of each example. Always read them. They often clarify safety, performance, or constraints that emerge from Hexa semantics rather than its syntax.

## Primitive Types

| Type | Description | Size |
| :--- | :--- | :--- |
| `Int8`, `Int16`, `Int32`, `Int64` | Signed Integers | 1, 2, 4, 8 bytes |
| `UInt8`, `UInt16`, `UInt32`, `UInt64` | Unsigned Integers | 1, 2, 4, 8 bytes |
| `Float32`, `Float64` | Floating Point | 4, 8 bytes |
| `Bool` | Boolean | 1 byte |

## Variable Declarations

```hexa
let immutableVal Int = 10
```

## Functions

```hexa
## Unions

Unions allow multiple fields to share the same memory space, similar to C unions.

### Tagged Structural Unions

The `enum` in a combination with a `@struct` decorator can be used as a tagged union:

```hexa
@struct // Forces a struct layout with unmanaged allocation
enum MyTaggedUnion {
	Int(asInt Int)
}

// The tag is implicitly managed by the compiler
// Allocation pattern in the same as for normal `@struct`
let data MyTaggedUnion = MyTaggedUnion.Int(asInt: 123)

// Access via switch is happens with a normal syntax
switch data {
	case Int(int):
		console.log(int)
	case Float(float):
		console.log(float)
}
```

#### Tagged Structural Unions FFI

The C representation of the tagged structural union is as follows:

```c
typedef enum {
	MyTaggedUnion$Tag_Int,
	MyTaggedUnion$Tag_Float
} MyTaggedUnion$Tag;

typedef struct {
	MyTaggedUnion$Tag $tag;
	union {
		int asInt;
		float asFloat;
	} data;
} MyTaggedUnion;
```

It may be generated for outside C bindings.


### Untagged Structural Unions

For direct memory overlay without tagging overhead, use plain `@union` with `@struct`:

```hexa
@union @struct
class UntaggedUnion {
	// Works exactly like C union
	var asBytes ArrayByValue<UInt8, 4>
	var asInt Int32
	var asFloat Float32
}

// Manual tag placement - can be elsewhere
// You would need to wrap the union into parent structure to place a tag
// Or use a separate variable to store the tag
var tag Int
```

Due to lack of tags, conventional access via `switch` should be performed with a guard:

```hexa
switch union {
	// Compiler enforces `if` guard to be present for `@union @struct` types
	case Int32(int) if tag == 0:
		// In the scope of the `case`, `int` would have a type of `Int32`
		console.log(int)
	case Float32(float) if tag == 1:
		console.log(float)
	case _:
		console.log("Fallback")
}
```

#### Untagged Structural Unions FFI

The C representation of the untagged structural union is as follows:

```c
typedef union {
	uint8_t asBytes[4];
	int32_t asInt;
	float asFloat;
} UntaggedUnion;
```

It may be generated for outside C bindings.


## Enumeration Bit Flags

Enums can be used as bit flags for efficient state management.

```hexa
@flags enum Permission Int {
	Read    // 1 aka 0b001 aka 1 << 0
	Write   // 2 aka 0b010 aka 1 << 1
	Execute // 4 aka 0b100 aka 1 << 2
}

// Bitwise OR operator for combining flags
var p = Permission.Read | Permission.Write

// Pattern matching with flags
switch p {
	case Read | Write | ...: // Partial match (at least has both)
		console.log("Can read and write")
}
```

#### Enumeration Bit Flags FFI

The C representation of the enumeration bit flags is as follows:

```c
typedef enum {
	Permission_Read = 1,
	Permission_Write = 2,
	Permission_Execute = 4,

	// Size enforcement to align with `Int` size
	Permission_$padding = 2147483647
} Permission;
```

It may be generated for outside C bindings.


## Control Flow

```hexa
if x > 0 {
	// code
} else {
	// code
}

for i in 10 {
	// code
}

while condition {
	// code
}
```

## Arrays by Value

### Creating Arrays by Value

```hexa
// Creating an array by value with a 3 elements
let arr ArrayByValue<Int, 3> = [1, 2, 3] // Using normal array syntax for initialization

// Zero-filled array by value
let arr ArrayByValue<Int, 3> = [...0] // Using `...` with a compile time known value

// Fill an array by value with a compile time known value for all elements
let arr ArrayByValue<Int, 3> = [...42] // Using `...` with a compile time known value other than `0`

// May be initialized with runtime values too
var x = 42 + other()
let arr ArrayByValue<Int, 3> = [...x] // Using `...` with a runtime value

// Leave uninitialized
let arr ArrayByValue<Int, 3> = [] // Must explicitly mark as uninitialized with `[]`
```

### Copying Arrays by Value

```hexa
// Copy an array by value
let arr ArrayByValue<Int, 3> = [1, 2, 3]
let copy ArrayByValue<Int, 3> = arr

// Can be inferred
let copy = arr

// Can re-assign an array by value if its marked with `var`
var arr ArrayByValue<Int, 3> = [1, 2, 3]
arr = [4, 5, 6] // Re-initialize
arr = [...0] // Re-initialize with a compile time known value
arr = [...42] // Re-initialize with a compile time known value other than `0`
arr = copy // Re-initialize with a copy of another array by value
```

### Creating Arrays by Value with Compile Time Known Size

```hexa
// Can set size with a compile time known value of a `let` variable
let size = 256

// May be evaluated at compile time from `size` i.e. depend from other compile time known values
let lightsCount = size

// We can pass the ararys size as a const generic parameter
let lights ArrayByValue<Light, lightsCount> = [1, 2, 3, 4, 5]
```

## Null

The `null` is a special object that can be assigned to any nullable and even non-nullable type.

Instead of simply using `0` of so called `null-pointer`, Hexa utilizes a default global sentinel value for references. This is a compile-time constant that is guaranteed to be unique, exactly the same across all libraries/modules and never used for any other purpose.

Note that `null` is not used for `@struct` references, as they are native pointers. Hexa does conversions between `null` and `0` for `@struct` references and managed references.

### Null Optimization

Due to `null` (including `null!`) being a well known, always present in memory object, we can avoid null-checks in the reference counting operations.

This avoids a common source of performance bottlenecks in languages with reference counting.

Reference counting operations over `null` are ignored and are not tracked by memory manager.

Due to Hexa doing immediate null checks when using forced null dereference operator `!` and casts, the misuse of the `null` object is not a concern.

# Conclusion

Hexa provides a robust foundation for systems programming by balancing high-level abstractions with low-level control. The features discussed—efficient value-based arrays and optimized null handling—demonstrate the language's commitment to performance, predictability, and memory safety.
