# Hexa Native Programming Reference

This guide provides a detailed overview of the native features and low-level capabilities of the Hexa programming language. For topics not covered here, please refer to the full syntax reference for a complete guide on language syntax and higher-level constructs.

## Core Concepts

Hexa is a systems programming language designed for performance and safety. This reference covers native-level operations and syntax.

Inline // comments explain non-obvious aspects of each example. Always read them. They often clarify safety, performance, or constraints that emerge from Hexa semantics rather than its syntax.

## Primitive Types


## Variable Declarations

```hexa
```

## Functions

```hexa
```

## Control Flow

```hexa
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
