# Hexa Native Programming Reference

This guide provides a detailed overview of the native features and low-level capabilities of the Hexa programming language. For topics not covered here, please refer to the full syntax reference for a complete guide on language syntax and higher-level constructs.

## Core Concepts

Hexa is a systems programming language designed for performance and safety. This reference covers native-level operations and syntax.

Inline // comments explain non-obvious aspects of each example. Always read them. They often clarify safety, performance, or constraints that emerge from Hexa semantics rather than its syntax.

## Stable ABI/API Promise


## FFI

Every section explores a relevant C or C++ counterpart on a by-example basis.

You may see what headers Hexa produces for seamless interop with other programming languages.

Please note, that Hexa will not generate headers until explicitly requested.

## C++ Interoperability

Hexa aims at limited, but pragmatic, C++ feature subset.
Most of the time, adding a plain `@cpp` decorator to the subject would cause a C++ versions to be produced (for example, `enum class` instead of a plain `enum`).

On native platforms, Hexa exceptions are compatible with the C++ exception ABI. On C targets, exceptions cause the program to panic (abort).

## Primitive Types

| Type | Description | Size |
| :--- | :--- | :--- |
| `Int8`, `Int16`, `Int32`, `Int64` | Signed Integers | 1, 2, 4, 8 bytes |
| `UInt8`, `UInt16`, `UInt32`, `UInt64` | Unsigned Integers | 1, 2, 4, 8 bytes |
| `Float32`, `Float64` | Floating Point | 4, 8 bytes |
| `Bool` | Boolean | 1 byte |
## Inline Functions

The `@inline` decorator hints the compiler to inline a function call for performance optimization.

```hexa
// Hints the compiler to inline this function
@inline fun add(a Int, b Int) Int {
	return a + b
}
```

### Variadic Functions

Hexa supports variadic functions for handling variable numbers of arguments, essential for systems programming interfaces.

```hexa
// Basic variadic function with ...args
fun printf(format ClangString, ...args) Int {
	// args is automatically converted to array for processing
	for arg in args {
		// Process each argument
	}
	return args.length
}

// Forwarding variadic arguments
fun forwardToPrintf(format ClangString, ...args) Int {
	return printf(format, ...args) // Spread operator forwards all arguments
}

// @nativeVariadic disables automatic array collection for direct C-style variadics
@nativeVariadic
```


```hexa
## Foreign Functions

Seamless interoperability with C libraries through external function declarations and bindings.

```hexa
}
```

### Stack vs Heap Allocation Tracking

Hexa tracks structure allocations to prevent stack references from escaping:

```hexa
@struct
class Buffer {
	var data ArrayByValue<UInt8, 256>
}

fun process() {
	// Stack allocation - tracked to ensure it doesn't escape
	let stackBuffer = Buffer()

	// Heap allocation - can be returned or stored
	let heapBuffer = @heap Buffer()

	// stackBuffer cannot be returned or stored in a field
	// return stackBuffer // Error: stack reference would escape

	// heapBuffer can be returned
	return heapBuffer // OK
}
```

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
	MyTaggedUnion$Int,
	MyTaggedUnion$Float
} MyTaggedUnion$tag;

typedef struct {
	MyTaggedUnion$tag $tag;
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


## Arrays by Value

Arrays by value are fixed-size arrays that are allocated on the stack or within a structure (as a field).

Various methods to create and initialize fixed-size arrays with compile-time size deduction and value filling.

```hexa
// Creating an array by value with a 3 elements
let arr ArrayByValue<Int, 3> = [1, 2, 3] // Using normal array syntax for initialization

// Size of 0 is a special case for arrays of unknown length, they are not bounds checked
@struct declare class FileHeader { // Assume some file format with arbitrary payload
	let data Int // Some data
	let payload ArrayByValue<UInt8, 0> // Payload of unknown length
}

// Size deduction
let arr ArrayByValue<Int> = [1, 2, 3] // Size deduced from the initializer
// TODO _?

// Size from a compile time known value
let size = 3
let arr ArrayByValue<Int, size> = [1, 2, 3] // Size deduced from the compile time known value `size`

// Zero-filled array by value
// `0` is a special value that can be used to zero-fill an array by value of any type
let arr ArrayByValue<Int, 3> = [...0] // Using `...` with a compile time known value

// Fill an array by value with a compile time known value for all elements
let arr ArrayByValue<Int, 3> = [...42] // Using `...` with a compile time known value other than `0`

// May be initialized with runtime values too
var x = 42 + other()
let arr ArrayByValue<Int, 3> = [...x] // Using `...` with a runtime value

// May be initialized with structures
let arr ArrayByValue<MyStruct, 3> = [...{}] // Type of `{}` constructor is deduced from the array type
// NOTE `{}` constructor is executed for every index independently

// May be initialized with a callback
let arr ArrayByValue<MyStruct, 3> = [...index => MyStruct(x: index, y: index)]
// NOTE `index => result` callback is executed for every index independently
// The computation is compile time if possible

// Fill an array by value with a default value for all implicit elements
let arr ArrayByValue<Int, 256> = [1, 2, 3, ...0]

// Leave uninitialized
let arr ArrayByValue<Int, 3> = [] // Must explicitly mark as uninitialized with `[]`
// TODO error prone, also 0 is not valid value for structures etc, better:
let arr ArrayByValue<Int, 3> = [1, 2, ...meta.zeroed] // Fine control
let arr ArrayByValue<Int, 3> = [1, 2, ...meta.uninitialized]
// TODO allow/sample [for] to return meta.zeroed and meta.uninitialized

// String initialization (null terminated)
let arr ArrayByValue<Char, 6> = "hello" // Using string initialization
// TODO non-null terminated strings, UTF-8, UTF-16, plain integers
// Maybe just end string with "\0" to make it null terminated?
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

#### Arrays by Value FFI

The C representation of arrays by value is as follows:

```c
typedef int32_t ArrayByValue_Int_3[3];
```

## Strings

Hexa's own managed strings (aka `String`) are objects that exisits only in a single unique copy per string value.

Essentially they a deduplicated and interned strings on creation. Default encoding is UTF-16.

On the other hand, string literals implementation depends on the context they are used in.

### Native Strings

Plain string literals are encoded the way functions and variables expect them:

```hexa
// Passing a normal "string" literal to a function no matter what encoding it expects
SDL.createWindow("My Window", 100, 100, 640, 480, SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE)
```

If the string is a not a literal, then explicit encoding must be specified:

```hexa
// This creates a string copy attached to the string object with a requested encoding which will be reused in next calls (cached)
SDL.createWindow("My Window".utf8(), /* ...etc */)
SDL.createWindow("My Window".utf16(), /* ...etc */)
```

### Native Strings Pattern Matching
```hexa
// ClangString is a native string pointer type that assumes the string is null terminated
let str ClangString = "hello"

switch str {
	case "hello": console.log("hello")
	case "world": console.log("world")
	case /hi/i: console.log("hi") // Regex is fine too
	case _: console.log("other")
}
```

#### Native Strings FFI

The C representation of native string types is as follows:

```c
typedef const char* ClangString;
typedef const wchar_t* ClangWideString;
```


### Compile-Time Known Values

Compiler may use `let` variables when can prove that they are compile-time computable.

```hexa
// Can set size with a compile-time known value of a let variable
let size = 256

// May be evaluated at compile time from size
let lightsCount = size * 2

// Pass the array's size as a const generic parameter
let lights ArrayByValue<Light, lightsCount> = [...0]
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

### Compile-Time Assertions

Hexa supports systems-programming specific compile-time assertions for ensuring code correctness or to follow external requirements.

Use decorators like `@sizeOf` to enforce compile-time checks:

```hexa
@sizeOf(256)
@struct
class NativeStructure {
	let bytes ArrayByValue<UInt8, 256> // @sizeOf enforces the total size of the structure
}

// Compiler will error if the actual size doesn't match the expected size
```

### Native Cast Types

When targeting C++, Java, C#, and similar platforms, Hexa supports rich casting options:

```hexa
expr.as(Type, 'static_cast')

// Dynamic cast (runtime type checking)
expr.as(Type, 'dynamic_cast')

// Const cast (remove const qualifier)
expr.as(Type, 'const_cast')

// Reinterpret cast (low-level bit reinterpretation)
expr.as(Type, 'reinterpret_cast')

// Using compile-time known values
let cast = 'reinterpret_cast'
expr.as(Type, cast)
```

### Custom Entry Points

Use the `@entry` decorator to define custom program entry points:

```hexa
@entry
fun customMain() {
	// Custom entry point for the program
	console.log("Starting from custom entry point")
}
```

### Weak References

```hexa
@weak var weakRef SomeClass? = someInstance
// weakRef may become null if someInstance is garbage collected
```

### Span and Memory Views

`Span<T>` provides a safe view over contiguous memory without ownership:

```hexa
	// Safe access to memory without copying
	for i in data.length {
### Volatile Access

The `@volatile` decorator is used for hardware register access where reads/writes should not be optimized away.

```hexa
@volatile var hwRegister UInt32 = 0x40000000.as(UInt32)
```

Applicable to fields, variables and function arguments.

### Packed Structures

The `@packed` decorator removes padding between fields in structures for precise memory layout control.

```hexa
@packed
@struct
class PackedData {
	var a UInt8
	var b UInt32 // No padding between a and b
}
```

#### Packed Structures FFI

The C representation of packed structures is as follows:

```c
#pragma pack(1)
typedef struct {
    uint8_t a;
    uint32_t b;
} PackedData;
#pragma pack()
```


### Bit Fields

The `@bits` decorator supports bit fields for efficient flag storage.

```hexa
@struct
class Flags {
	@bits(1) var flag1 UInt8
	@bits(1) var flag2 UInt8
	@bits(6) var reserved UInt8
}
```

#### Bit Fields FFI

The C representation of bit fields is as follows:

```c
typedef struct {
    uint8_t flag1 : 1;
    uint8_t flag2 : 1;
    uint8_t reserved : 6;
} Flags;
```

It may be generated for outside C bindings.

### Pointer Restriction

The `@restrict` decorator provides pointer aliasing optimization hints to the compiler. In C/C++ output, it translates to the `restrict` keyword (or `__restrict` depending on the compiler) for function arguments, and `__declspec(restrict)` for function return types (MSVC only).

```hexa
// When applied to function arguments, tells compiler that the pointer doesn't alias with other pointers
fun memcpy(@restrict dest ArrayPointer<UInt8>, @restrict src ArrayPointer<UInt8>, size UIntSize) {
	// Compiler can assume dest and src don't overlap
	for i in size {
		dest[i] = src[i]
	}
}

// When applied to function return type, tells compiler returned pointer is freshly allocated
// (MSVC only - produces __declspec(restrict))
}
```

#### Pointer Restriction FFI

The C representation of pointer restriction is as follows:

```c
void memcpy(restrict uint8_t* dest, restrict uint8_t* src, size_t size) {
    for (size_t i = 0; i < size; ++i) {
        dest[i] = src[i];
    }
}

__declspec(restrict) uint8_t* allocateBuffer(size_t size);
```

# COM Interop

Component Object Model interoperability features for Windows component integration.

TBA

```

# Conclusion

Hexa offers a powerful and pragmatic approach to systems programming, maintaining a C-like stable ABI/API while providing seamless FFI capabilities for interoperability with other languages. Through its comprehensive exploration of C and C++ counterparts in each section, developers can generate headers and bindings that integrate effortlessly into existing ecosystems.

By combining advanced features with robust memory management and type safety, Hexa enables the creation of high-performance, reliable native applications that are both maintainable and interoperable.
