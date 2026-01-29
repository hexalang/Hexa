# Hexa Design Justifications

This document explains the design decisions behind Hexa.

AI GENERATED DRAFT

AI GENERATED DRAFT

AI GENERATED DRAFT

# Goals

- **Declarative**: Code flows in a straightforward and unambiguous way
  - Reduces cognitive load when reading code
  - Makes control flow explicit and predictable
  - Enables better tooling and static analysis
  - Minimizes "action at a distance" bugs

- **Easy to read and write**: Both by humans and tools
  - Lowers barrier to entry for new developers
  - Reduces time spent understanding existing code
  - Enables better IDE support and autocomplete
  - Facilitates code generation and transformation

- **Performant**: Features do not come at a noticeable runtime cost
  - Zero-cost abstractions where possible
  - Predictable performance characteristics
  - Enables optimization by compiler
  - No hidden allocations or expensive operations

- **Safe**: Behavior is well defined and sound by default
  - Prevents entire classes of bugs at compile time
  - Reduces security vulnerabilities
  - Makes code more maintainable
  - Builds developer confidence

- **Scalable**: Code is easy to maintain with a growing team and project complexity
  - Modular design encourages separation of concerns
  - Clear ownership and visibility rules
  - Refactoring-friendly syntax
  - Supports large codebases without degradation

- **Minimalistic**: As little syntax and as few special forms as possible
  - Reduces language learning curve
  - Fewer edge cases to remember
  - Easier to implement tooling
  - More consistent mental model

- **Target-agnostic**: Syntax and core semantics stay identical across all targets
  - Write once, deploy anywhere
  - Reduces platform-specific bugs
  - Easier to port code between targets
  - Unified developer experience

- **Fast to compile**: High parsing speed is key to a smooth development experience
  - Context-free grammar enables efficient parsing
  - No complex lookahead requirements
  - Enables incremental compilation
  - Improves developer productivity

## MISRA Compliance

- Designed to be mostly MISRA compliant
  - Enables use in safety-critical industries (automotive, aerospace, medical)
  - Enforces best practices by default
  - Reduces certification costs
  - Builds trust in industrial contexts

## Error Philosophy

- No "warnings", only "errors" or programmer wisdom
  - Clear distinction between acceptable and unacceptable code
  - Reduces decision fatigue
  - Prevents warning fatigue and ignored warnings
  - Trusts developers to make informed decisions
  - External tools can provide additional linting

# Syntax

## File Format

- UTF-8 with optional BOM skipping
  - Universal character encoding support
  - Compatible with all modern editors
  - Handles international characters properly

- Optional shebang at first line
  - Enables direct script execution on Unix-like systems
  - Familiar to shell script users
  - No special syntax needed

- Semicolons never required
  - Cleaner, more readable code
  - Reduces visual noise
  - Context-free grammar makes them unnecessary
  - No automatic semicolon insertion pitfalls

- Arbitrary number of top-level expressions without strict ordering
  - Flexibility in code organization
  - Easier refactoring
  - No artificial constraints on structure

- Case-sensitive
  - Industry standard
  - Prevents confusing bugs
  - Enables meaningful naming conventions

- Prefers tabs for indentation
  - Token-efficient
  - Accessibility (users can set their preferred width)
  - Faster to type
  - Clear visual hierarchy

## Comments

### Single-line comments (`//`)

- Simple and familiar syntax
  - Used in C, C++, Java, JavaScript, etc.
  - No learning curve
  - Easy to type

- Supports minimal markdown syntax in highlighting
  - Better documentation readability
  - Inline formatting without special tools
  - Assumed editor support

### Multi-line comments (`/* */`)

- Not parsed to AST
  - Faster parsing
  - Simpler compiler implementation
  - Comments are for humans, not machines

- Supports nesting
  - Easier to comment out blocks containing comments
  - Prevents common commenting mistakes
  - More flexible than C-style comments

### Documentation comments (`///`)

- Present in AST
  - Enables documentation generation
  - LSP can provide hover information
  - Attached to specific declarations

- Can have more lines that combine
  - Natural multi-line documentation
  - No special continuation syntax needed

- Do not interact with decorators
  - Clear separation of concerns
  - Decorators are compile-time, docs are metadata

- Prose-like tags `[param]` are LSP-supported
  - Better IDE integration
  - Type-safe documentation
  - Hard error if incomplete (all params must be documented if one is)

- Can document parameters inline
  - Documentation close to what it describes
  - Easier to keep in sync

- Can document local variables
  - Helpful for complex functions
  - Self-documenting code

- Easy to transform `//` into `///`
  - Low friction for adding documentation
  - Encourages documentation culture
  - Busy developers can quickly upgrade comments

## Identifiers

- Must start with lowercase letter or underscore
  - Clear distinction from types (which start uppercase)
  - Prevents naming conflicts
  - Consistent naming convention

- Only Latin alphabet, numbers, underscores
  - Universal keyboard support
  - No Unicode confusion (lookalike characters)
  - Better cross-platform compatibility
  - Easier code review and collaboration

- No Unicode characters
  - Prevents security issues (homograph attacks)
  - Ensures code is accessible to all developers
  - Simplifies parsing and tooling

## Variables

### `var` (mutable) and `let` (immutable)

- Clear distinction between mutable and immutable
  - Explicit intent in code
  - Easier to reason about data flow
  - Enables compiler optimizations
  - Prevents accidental mutations

- Space-separated type annotations (no colons)
  - Cleaner syntax
  - Context-free grammar (no ambiguity)
  - Consistent with function signatures
  - Less visual noise

- No semicolons
  - Consistent with overall language design
  - Reduces clutter
  - Context-free parsing makes them unnecessary

- Initial assignment required for local variables
  - Enforces declarative style
  - Prevents uninitialized variable bugs
  - Definite assignment analysis
  - Clear initialization point

- Shadowing is allowed
  - Enables local scope refinement
  - Can make variable readonly via shadowing
  - Reduces need for unique names
  - Scoped to block

- External variable declarations with `declare`
  - FFI support
  - No assignment allowed (external source)
  - Type required for safety

- Lazy initialization support
  - Deferred computation until first read
  - May capture outside variables (closure)
  - Type cannot be nullable (null used as marker)
  - `.meta.computed` to check initialization state

## Literals

### Keywords

- Not contextual, always reserved
  - Simpler parser
  - No ambiguity
  - Predictable behavior
  - Easier for developers to remember

- Underscore `_` is special literal
  - Cannot be used as identifier
  - Used for wildcards and ignoring values
  - Clear semantic meaning

- Dollar `$` reserved for future use
  - Prevents ecosystem fragmentation
  - Allows language evolution
  - Common in other languages for special purposes

### Numbers

#### Integers

- Defaults to `Int` (i32)
  - Reasonable default for most use cases
  - Matches common platform integer size
  - Explicit when other sizes needed

- Only lowercase `x` in `0x` hexadecimal
  - Consistency
  - No confusion with uppercase X
  - Easier to parse

- Only lowercase `b` in `0b` binary
  - Consistency with hex
  - Clear visual distinction

- Negative numbers parsed as single token
  - Proper type inference for sized integers
  - Works well with patterns (`case -n`)
  - Works well with enum variants

- Suffixes for explicit sizing (u8, i16, etc.)
  - Type-safe integer literals
  - No implicit conversions
  - Clear intent

- Compatible with hexadecimals
  - Flexibility in literal notation
  - Useful for bit manipulation

- BigInt support with `n` suffix
  - Arbitrary precision integers
  - Compatible with all integer types (auto-cast)
  - Useful for cryptography and large numbers

- Underscore separators for readability
  - Easier to read large numbers
  - Multiple underscores allowed (readability tool)
  - Works with all number formats

#### Floats

- 64-bit by default
  - Precision for most use cases
  - Matches JavaScript Number
  - Explicit when other precision needed

- Requires `0.` prefix for float literals
  - No ambiguity with integer literals
  - Prevents common mistakes
  - Clear intent

- Suffix `.0` required (not `123.`)
  - Consistency
  - No trailing dot confusion
  - Explicit float type

- Supports scientific notation
  - Compact representation
  - Standard notation
  - Useful for very large/small numbers

#### Complex numbers

- `i` suffix for imaginary part
  - Mathematical notation
  - Clear semantic meaning
  - Supports various precision (ComplexHalf, ComplexFloat, ComplexDouble)

### Strings

- Double quotes, single quotes, or backticks
  - Flexibility in string literals
  - No semantic difference (unlike JavaScript)
  - Backticks for multi-line

- Always immutable
  - Thread-safe by default
  - Prevents accidental modifications
  - Enables string interning optimizations

- Unicode by default
  - Modern text handling
  - International character support
  - Consistent with UTF-8 file encoding

- Newlines always converted to `\n`
  - Cross-platform consistency
  - Predictable behavior
  - No CRLF issues

- String interpolation with `{}`
  - No prefix needed (unlike `${}` or `$()`)
  - Avoids common pitfalls like "[object Object]"
  - Clear grouping around expressions
  - No reserved characters like `$`
  - Escape with `\{` and `\}`

- JSX-like interpolation blocks
  - Can contain complex expressions
  - Nested interpolation supported
  - Works like a block expression

- Concatenation with `+`
  - Familiar operator
  - Works with any type having `toString`
  - Intuitive behavior

- Raw strings via `meta.embedString()`
  - Large strings belong in files
  - Configurable line endings
  - Cleaner source code

- Regular expression literals `/pattern/`
  - First-class regex support
  - No space after leading `/` (parser rule)
  - Flags supported
  - Escaped space `\ ` allowed after leading `/`

- Array-like access with bounds checking
  - Indices 0...length are valid
  - Returns `null` for out-of-bounds
  - No negative indexing (returns `null`)
  - Safe by default

- String comparison operators
  - `==`, `!=`, `<`, `>` supported
  - `<=` and `>=` not allowed (too rare, use functions)
  - Explicit behavior choice

- Formatting methods
  - `truncate`, `ellipsis`, `align` for managed strings
  - Native strings require arena context
  - Compiler-aware allocation tracking

#### Design Considerations

- Raw strings with `r"""` or similar
  - Future enhancement
  - Multiple quote styles for flexibility
  - Avoids escaping in complex strings

### Booleans

- `true` and `false` keywords
  - Clear and explicit
  - No truthy/falsy confusion
  - Type-safe

### Null

- Can only be passed to nullable type `T?`
  - Prevents null reference errors
  - Explicit nullability
  - Type safety

- Cannot infer type from `null` alone
  - Ambiguous without context
  - Forces explicit type annotation
  - Prevents errors

### Arrays

- Type syntax `[T]` or `Array<T>`
  - Concise and readable
  - Familiar to many languages
  - Generic type support

- Nullable values `[T?]` vs non-nullable `[T]`
  - Explicit nullability control
  - Prevents certain operations on non-nullable
  - `[T?]` can be used as `[T]` but not vice versa

- Immutable arrays with `readonly`
  - Deep immutability support
  - Prevents accidental mutations
  - Thread-safe sharing

- Spread operator `...`
  - Copy arrays
  - Combine arrays
  - Copy and update pattern

- Any integer type as index
  - Flexibility (including BigInt)
  - Negative indices produce `null` (safe)
  - Consistent behavior

- Multidimensional indexing `[x, y]` or `[x, y, z]`
  - Optimization-friendly (arbitrary memory layout)
  - Up to 3 dimensions
  - Enables `=` operator
  - Beyond 3D, use functions

- Index cascade assignment `.[ index: value ]`
  - In-place mutation
  - Multiple assignments at once
  - Indices can be runtime expressions
  - Returns original array (enables chaining)
  - Clear distinction from copy-update `[...array, value]`

- Destructuring support
  - Pattern matching
  - Variables may be nullable (unknown length)
  - Rest patterns `...rest`
  - Guards supported

### Maps/Dictionaries

- Syntax `[K: V]`
  - Clear key-value distinction
  - Not an object `{}`
  - Keys are arbitrary expressions

- Values always nullable
  - Consistent with missing keys
  - Explicit null handling
  - Safe by default

- Immutable maps with `readonly`
  - Deep immutability support
  - Prevents accidental mutations

- Access with `[]` or `get/set`
  - Flexible API
  - Familiar syntax
  - Explicit methods available

- Index cascade assignment
  - Same syntax as arrays
  - In-place updates
  - Runtime computed keys

- Pattern matching support
  - Key-value matching
  - Rest patterns
  - Reverse lookups
  - Dynamic patterns with `()`

### Objects

- Fixed key-value store
  - Keys cannot be added/removed syntactically
  - Reflection for dynamic changes
  - Structural typing

- Mutable by default
  - Practical default
  - `readonly` on-demand
  - Clear intent

- Property access with `.`
  - Familiar syntax
  - Type-safe
  - IDE-friendly

- Structural typing
  - Duck typing
  - Interfaces and types satisfied structurally
  - Flexible and powerful

- Pattern matching support
  - Destructuring
  - Value checking
  - Guards

- Shorthand when field name matches variable
  - Less repetition
  - Cleaner code
  - Common pattern

- Computed field names with `@as`
  - Compile-time known names
  - Type-safe
  - Included in inferred type

- Object spread-copy
  - Redux-like updates
  - Immutable patterns
  - Type-safe

- Meta methods
  - `hashCode`, `equalsByFields`, `dump`, etc.
  - Common operations built-in
  - Reflection support

#### Mutation Cascades

- Fluent cascade syntax `.{}`
  - Pure declarative multi-field mutation
  - Fields only, nested via `sub.{}`
  - JSON look and feel

- Returns original object
  - In-place mutation
  - Distinct from copy-update `{...obj}`
  - Clear intent

- Prevents bugs
  - Error on repeated fields
  - Explicit syntax
  - No accidental mutations

- Chaining support
  - Configure then call methods
  - Returned values ignored after `.{}`
  - Original object returned

- Trailing comma allowed
  - Multi-line formatting
  - Easier to add/remove fields

- Shorthand for matching field names
  - Less repetition
  - Cleaner code

- Spread fields from other object
  - Copy fields in-place
  - Must go first
  - Update fields after

- Nested cascades
  - Deep mutation support
  - Array cascades `.[]`
  - Clear syntax

## Decorators (Attributes/Annotations)

- Compile-time concept
  - Like C++ attributes
  - No runtime overhead
  - AST transformations

- Start with `@`
  - Clear visual marker
  - Familiar from other languages
  - Easy to spot

- Placed before declaration
  - Attached to what they modify
  - Multiple decorators allowed
  - Any order (unless macro enforces)

- CamelCase names
  - Consistent with identifiers
  - Any name allowed (including keywords)

- No duplicates
  - Avoids confusion
  - Clear intent
  - Use parameters for multiple values

- Can contain expressions as parameters
  - Unnamed or named
  - Multiple parameters
  - Flexible configuration

- Work with types, expressions, declarations
  - Universal application
  - Consistent syntax

- Can have one-level namespace
  - Organization
  - Avoids conflicts

## Operators

### Arithmetic

- Standard operators: `+`, `-`, `*`, `/`, `%`
  - Familiar to all developers
  - Mathematical notation
  - Universal understanding

- Power operator `**`
  - Exponentiation
  - Common in modern languages
  - Clear intent

- Integer divide `\`
  - Explicit integer division
  - No implicit truncation
  - Clear semantics

- No prefix increment/decrement
  - Only postfix `a++`, `a--`
  - Avoids confusion
  - One way to do it
  - Does not return value (prevents `v = a++`)

- No prefix `+a`
  - Platform-specific behavior
  - Confusing semantics
  - Not needed

- Overflow checking optional
  - `@checked` decorator
  - Runtime exception on overflow
  - Target-dependent

### Comparison

- Standard operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
  - Universal operators
  - Clear semantics
  - Type-safe

### Logical

- Word operators: `and`, `or`, `not`
  - More readable than `&&`, `||`, `!`
  - Easy to write
  - Short-circuiting
  - Only accept `Bool` (no truthy/falsy)

- `xor` as method
  - Rare operation
  - Confusing as operator
  - Prevents abuse

### Bitwise

- Standard operators: `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`
  - Familiar to C-family developers
  - Clear bit manipulation
  - Unsigned right shift `>>>` for portability

### Assignment

- Simple assignment `=`
  - Does not return value
  - Prevents `a = b = c`
  - Avoids `if (a = b)` typo

- Compound assignment
  - `+=`, `-=`, `*=`, `/=`, `%=`, etc.
  - Convenient shorthand
  - Clear intent

- No `??=`
  - Confusing (keeps type `T?`)
  - Doesn't help escape nullability
  - Use explicit pattern instead

### Operator Overloading

- Limited to logically complete operator sets
  - Prevents abuse
  - Clear semantics
  - Pre-defined sets

- Must explicitly implement operator set
  - No implicit behavior
  - Type-safe
  - Clear contract

## Control Flow

### Top-Level Statements

- Useful for simple scripts
  - No main function needed
  - Quick prototyping
  - Scripting support

### Blocks

- Create scope
  - Local variables
  - Shadowing allowed
  - Standalone blocks allowed

- Can be used as expressions
  - Last expression is result
  - Can alter outer control flow
  - `return`, `continue`, `break` allowed

- Empty block `{}`
  - As statement: does nothing
  - As expression: constructor for inferred type

### If / Else / Ternary

- Braces `{}` required
  - No dangling else
  - Clear scope
  - Consistent style

- Can be used as expression
  - Functional programming style
  - `else` required for expression
  - Type-safe

- Error prevention
  - `} if` requires `else` on same line
  - Prevents accidental separate conditions

- Multiple conditions with `,`
  - Same as `and`
  - Cleaner syntax
  - Compatible with bindings

- Bindings with `if let`
  - Null-check and bind
  - Shorthand `if let value`
  - Works with guards

- Assignment not an expression
  - Prevents `if (a = b)` typo
  - Explicit comparison needed

#### Ternary Operator

- `cond ? a : b` syntax
  - Familiar operator
  - Concise for simple cases
  - Nested ternary requires `()`

- Nested ternary must be wrapped
  - Prevents unreadable code
  - Forces clarity
  - Use `if` for complex cases

#### Guard

- Early returns and validation
  - Swift-like syntax
  - Requires transfer of control in `else`
  - `return`, `break`, `continue`, `throw`

- Null checks and multiple conditions
  - Bindings available after guard
  - Validated state
  - Cleaner than nested ifs

- Works in loops
  - Skip invalid items
  - Early continue
  - Clear intent

### Loops

- Not expressions
  - Side-effect oriented
  - Clear semantics
  - Use other constructs for expressions

#### While

- Standard while loop
  - Familiar syntax
  - Multiple conditions and bindings
  - No braces on condition

- Halting problem detection
  - Error when solvable
  - `@infinite` decorator for `while true`
  - Prevents accidental infinite loops

#### Do-While

- Post-condition loop
  - Executes at least once
  - No `()` for consistency
  - No `,` after condition (simplicity)

#### For-In

- Iteration over collections
  - No `let` required (implicit readonly)
  - `var` not allowed
  - `break` and `continue` supported

- No labels
  - Outer break via meta methods
  - Simpler syntax
  - Less complexity

- Forced null-unwrapping with `!`
  - `for item! in items`
  - Removes nullability
  - Explicit intent

- Auto null-skipping with `@skipNulls`
  - Decorator-based
  - Clear intent
  - Convenient pattern

- Key-value iteration
  - `for key: value in map`
  - Mimics map syntax
  - Null-unwrapping supported

- Range iteration
  - `for i in 0 ... 10`
  - Exclusive end (0 to 9)
  - Works with array.length

- Number iteration
  - `for i in count`
  - 0 to count-1
  - Idiomatic pattern
  - Any integer expression

- Ignoring value with `_`
  - Suppress unused warning
  - Clear intent

- Variable name always required
  - Consistency
  - No implicit iteration

### Switch

- Exhaustiveness checking
  - When type allows
  - Compile-time safety
  - Requires `_` for non-exhaustive

- No break needed
  - Assumed by default
  - Prevents fall-through bugs
  - Explicit break allowed (non-expression)

- Pattern guards
  - Runtime checks
  - Not exhaustive
  - Works over captured values

- Range patterns
  - `_ ... 123`, `1 ... 123`, `123 ... _`
  - Inclusive start, exclusive end
  - Convenient for ranges

- String and regex literals
  - First-class patterns
  - Native null-terminated strings supported
  - Powerful matching

- Null handling
  - Checked in order
  - May shadow nullable patterns
  - Explicit null case

- Nullable binding with guards
  - `case value? if let value`
  - Bound values readonly and `@local`
  - Safe by default

- Postfix form `.switch`
  - Expression context only
  - Fluent style
  - Alternative to prefix `switch`

### Branching

- `break`, `continue`, `return`, `throw`
  - Standard control flow
  - Clear semantics

- `{ return }` for just-return
  - No expression picked
  - Avoids automatic semicolon insertion confusion

### Try / Catch

- Exceptions are exceptional
  - Use sparingly
  - Performance hit of `??` checks avoided
  - Special cases only

- No `finally` block
  - Simpler syntax
  - Scope-based patterns or decorators instead
  - Less complexity

- Multiple catch blocks
  - Specific error handling
  - Guarded catch with `if let`
  - Re-throw supported

- Try-catch as expression
  - Functional style
  - Last expression is result
  - Can escape control flow

#### Result

- Nullable types with `??` pattern encouraged
  - Simpler than Result type
  - Standard functionality
  - No special syntax

- Result-like approach possible
  - User-defined enums
  - Computed property for unwrapping
  - Forces null-checks with `??`

- `@orReturn` shorthand
  - Automated unwrapping
  - Type-safe
  - Convenient pattern

#### Throw

- Tracked exceptions
  - Not checked until boundary
  - Silent tracking during recursion
  - Precise enforcement at edges

- Zero-cost happy paths
  - Performance optimization
  - Complicated control flow supported
  - C++ exception ABI on native

- `@throws` and `@noThrow` annotations
  - Compile-time enforcement
  - Narrowing exception sets
  - Boundary control

- Throwing arbitrary values allowed
  - Quick prototyping
  - Wrapped in error if needed
  - Target-dependent

- Wildcard `_` in `@throws`
  - Allow any throw
  - Pretend to throw specific types
  - API consistency

## Functions

- Closures follow JavaScript rules
  - Capture by reference
  - Familiar semantics
  - Arrow functions supported

- Names start with lowercase or underscore
  - Consistent with identifiers
  - Distinct from types

- Return type optional
  - Comes after arguments
  - Inferred when possible
  - Explicit when needed

- Body `{}` always required
  - Clarity
  - No one-liners (use arrow functions)
  - Consistent style

- Default arguments allowed
  - Convenient
  - Optional parameters
  - Clear defaults

- Arguments not re-assignable
  - Assume `let`
  - Prevents confusion
  - Clear data flow

- Named arguments optional
  - Same names as declaration
  - Order not required (custom evaluation)
  - Mix named and positional
  - Clarity at call site

- Indicate unused return with `_`
  - Optional syntax
  - Some functions may enforce
  - Clear intent

- Generic functions
  - Implicit (no `<T>`) for prototyping
  - Explicit `<T>` for libraries
  - Gradual typing
  - Placeholder types for partial checking

- Arrow functions
  - Require known expected type
  - Infer argument types
  - Short form for simple cases
  - Can ignore unneeded arguments

- Arrow function lowering
  - Lack of known types → plain `fun`
  - Preserves genericity
  - Convenient syntax

- Function types
  - Arguments must be named
  - Clarity
  - Self-documenting

- External functions with `declare`
  - FFI support
  - No body
  - Type required

- Trait bounds
  - At argument level or `<T>`
  - Generic constraints
  - Flexible and powerful

- Overloading with `is` / `or`
  - Declarative syntax
  - Left-to-right alternatives
  - Static polymorphism
  - Zero runtime cost
  - Works in classes too

- Recursion supported
  - Named functions
  - Function by value needs name
  - Arrow functions cannot be recursive

- Variadic functions
  - `...args` syntax
  - Packing and forwarding
  - Variadic templates

## Classes and Interfaces

- Types start with capital letter
  - Clear distinction from variables
  - Consistent naming convention

- Fields start with keyword
  - `var`, `let`, `fun`, etc.
  - Explicit declaration
  - Clear intent

- Enum tags start with capital letter
  - Distinct from variables
  - Pattern matching clarity

### Classes

- Fields without `=` imply late init
  - Definitive assignment analysis
  - Flexible initialization
  - Type-safe

- `private` behaves like `protected`
  - Only one visibility modifier
  - Accessible from descendants
  - Simpler model

- Constructor with `new`
  - Can be `private`
  - Only one constructor (no overloading)
  - Default values allowed

- `this` optional when no conflicts
  - Less verbose
  - Clear when needed

- Nested functions
  - `this` from outer scope
  - Not this-bindable
  - Closure support

- Static members allowed
  - Class-level data
  - Can be `private`
  - Factory methods

- No method body → abstract class
  - Implicit abstraction
  - No `abstract` keyword needed

- External class with `declare`
  - FFI support
  - `@final` to disallow inheritance
  - Readonly fields with `let`

- Nested classes
  - Namespace with type parameters
  - Can be `private`
  - Privacy preserved
  - Cannot be defined in function body

#### Immutability

- `readonly class` for external immutability
  - Compile-time check
  - Separate types (mutable vs readonly)
  - Clear lifecycle: creation → initialization → stabilization → observation

- Controlled internal mutation
  - Public non-readonly methods
  - Direct field writes forbidden
  - Trust layering (core team, library team, users)

- `readonly fun` for non-mutating methods
  - Explicit purity
  - Cannot mutate `this` or arguments
  - Self-documenting

- Efficient builder patterns
  - In-place mutation during creation
  - Zero allocation
  - Performance optimization

- Inheritance of mutability
  - Decided by descendant
  - Flexible design
  - Fine-tuning control

#### Field Access

- Instance and static fields
  - Dot notation
  - Private fields inaccessible
  - Clear semantics

- Static fields accessible as instance fields
  - Refactoring purposes
  - Convenience
  - No ambiguity

### Class Constructors

- Order not important
  - Compiler proves initialization order
  - Simple control flow analysis
  - Flexible field declarations

- No default value → must be assigned
  - In `new` or at creation site
  - Definite assignment
  - Type-safe

- Only single constructor
  - No overloading
  - Default values instead
  - Simpler model

- `new() {}` assumed by default
  - Convenient
  - Can be `private` for "parse, don't validate"
  - Factory methods pattern

- JSON-like syntax
  - `Point() { x: 1, y: 2 }`
  - Can omit `()` with defaults
  - Type inference
  - String keys allowed (checked)

- Copy with spread
  - `{ ...point }`
  - Altered fields
  - With arguments
  - Named arguments

- `{}` shorthand
  - All fields and constructor have defaults
  - Convenient

### Generic Template Classes

- Compile-time templates
  - Unless opted-in to runtime
  - Zero-cost abstraction
  - Type-safe

- Multiple type parameters
  - Default values
  - Flexible generics

### Const Generics

- Types depend on values
  - Compile-time known
  - Associated constants
  - Static fields

- CamelCase for constant generics
  - Distinct from type parameters
  - Can depend on other generics

- Default values
  - Convenient
  - Flexible

- Enumerations as constant generics
  - Type-safe flags
  - Compile-time selection
  - Enum tag as value

- Compilation flags
  - Globally passed
  - Plain integer, boolean, or string
  - Convert to enum tag

### Type Traits

- Reuse `type` keyword
  - Structural typing concept
  - Compile-time feature
  - Better adoption than `trait`

- Parsing rules same as classes
  - Consistent syntax
  - Familiar structure

- Generic traits
  - Type parameters
  - Default implementations (extensions)
  - Flexible

- Implementing traits
  - Mention in class declaration
  - Implicit implementation (structural)
  - Signature must match

- Used structurally
  - Duck typing
  - Type-safe
  - Flexible

- Enums can implement traits
  - Consistent model
  - Powerful abstraction

- Trait bounds
  - Type limits
  - Generic constraints
  - Multiple bounds

- Compose traits (supertrait)
  - Complex bounds
  - Named constraints
  - Reusable abstractions

- Compile-time type validation
  - Concepts with `switch`
  - Custom type errors
  - Flexible constraints

- Higher-kinded types
  - Type constructors
  - Advanced generics
  - Powerful abstractions

### Associated Types

- Family polymorphism
  - Type bundles
  - Namespaces
  - Generic type bundles

- Implementor provides types
  - When `=` absent
  - Flexible implementation

- Used as namespaces
  - Access with `.`
  - Local namespaces in classes

#### Associated Types in Patterns

- Constant patterns immutable
  - Pure evaluation
  - Cannot call methods (except meta)
  - Macro system for complex cases

- Type patterns
  - Associated types
  - Conditional constraints
  - Compile-time switch

- Generics as associated types
  - Static pseudo-fields
  - Access with `.`
  - Fine-grained types with `meta`

### Inheritance

- Single inheritance
  - First in list
  - No diamond problem
  - Clear hierarchy

- Multiple traits/interfaces
  - Any order
  - Flexible composition

- No `override` keyword
  - Signature must match
  - Simpler syntax

- `super` for parent access
  - Call parent methods
  - Call parent constructor

### Interfaces

- Runtime feature
  - Protocols via reflection
  - Virtual methods
  - Platform-dependent

- High-level tasks
  - Better real-world performance
  - Eliminates manual plumbing
  - High-level constructs

- Parsing rules same as classes
  - Consistent syntax

- No `implements` keyword
  - Mention in declaration
  - Implicit implementation (structural)

- Structural typing
  - Duck typing
  - Flexible
  - Type-safe

### Properties

- `let` can have only `get`
  - Readonly property
  - Computed value

- `var` requires `get` and `set`
  - Mutable property
  - Encapsulation

- Backing fields
  - Multiple allowed
  - Different type than property
  - Implicitly `private` class-wide
  - Ultimately private in block

- `get` assumes `return`
  - Declarative style
  - Last expression is result

- Optional `set`
  - Encapsulation
  - Validation

- Observers
  - `willSet`, `didSet`
  - React to changes
  - Encapsulation

### Destructuring

- `let` required
  - Clarity
  - Not `var` (safety)
  - No confusion with field assignment

- Nullables supported
  - Variables may be nullable
  - Type-safe

- Pattern matching
  - In `switch` cases
  - No `let` required
  - Value checking
  - Conditions with compile-time expressions
  - Nested patterns
  - Nullability rules
  - Capture with renaming
  - Advanced patterns with guards

## Enumerations

- Complex enums by default
  - Reflection-capable
  - No backing type
  - Unique instances

- Constant enums with backing type
  - Plain values
  - Equality works
  - Efficient

### Complex Enums

- Passed by reference
  - Managed
  - Methods and properties
  - Payloads in tags

- Tags capitalized
  - Distinct from variables
  - Pattern matching clarity

- No separator required
  - Cleaner syntax

- Payloads with named fields
  - Order doesn't matter
  - Defaults allowed
  - Type-safe

- Nested enums
  - Recursive types
  - Powerful patterns

- Methods and shared fields
  - Behavior attached
  - Shared state
  - Compile-time rule: no shadowing

- Tag-confined fields
  - Writable fields
  - Sealed methods
  - Encapsulation

- Every instance unique
  - Non-baked enums
  - Reference semantics

### Constant Enums

- Backing type after space
  - `enum Status Int`
  - Plain values
  - Efficient

- Duplicate values
  - Not allowed with constant
  - Allowed with alias
  - Clear semantics

- Well-known value names
  - For tags
  - Set initial value
  - Auto-increment

- Out-of-range values
  - `or _` for catch-all
  - Pattern matching
  - FFI support

- Direct comparison disallowed
  - Tag constructors
  - Use `()` to workaround
  - Sound type system

- Tag as type
  - Well-known tag
  - Static dispatch
  - Function overloading

### Enumerations Inference

- Inferred from left side
  - Short syntax
  - Type-safe
  - Ambiguity resolution

- Generic functions
  - Placeholder types
  - Partial pro-active typing
  - Flexible

### Enumerations in Conditions

- Special case for `==` and `!=`
  - Parsed as tag name
  - No `{}` constructor
  - Utilizes otherwise useless syntax

### Enumerations Inheritance

- Can inherit from other enums
  - Add methods and fields
  - Add tags with `@extensibleTags`
  - Flexible extension

- `@extensibleTags` decorator
  - Allows derived enums to add tags
  - Forces `case _` for parent
  - Runtime extensibility

- Compatible types
  - Normal and extended enums
  - Runtime type check
  - Cast support

- Plain enums
  - Baked by simple types
  - No runtime extensibility
  - Efficient

### Enum Flags

- `@flags` decorator
  - Marks as bit flags
  - Smallest integer type
  - Values inferred (1, 2, 4, ...)

- Bitwise OR with `|`
  - Combine flags
  - Inferred tags

- Methods for operations
  - `has`, `delete`, `toggle`
  - Similar to `Set`
  - No `&= ~` syntax

- Pattern matching
  - Exact match
  - Partial match (at least)
  - Exclusion (not)
  - Combination (and)
  - Dynamic partial match
  - Alternatives (or)

- Multiple matches
  - `or` lower precedence than `|`
  - Switch over multiple values
  - Nested patterns

#### Enum Flags Shorthands

- `if value & A`
  - Check single flag
  - Convenient

- `if value & (A | B)`
  - Check multiple flags
  - Requires `()` (value not pattern)

## Types

### Basic Types

- `Int`, `Float`, `Bool`, `String`, `Void`, `Infer`
  - Standard types
  - Clear semantics
  - Platform-appropriate

### Dynamic Types

- `Any` for dynamic type
  - Runtime checks
  - Platform-dependent
  - Nullable variant `Any?`

- `Unknown` requires cast
  - More restrictive than `Any`
  - Explicit type conversion
  - Safety

### Composite Types

- `[T]` for arrays
  - Concise syntax
  - Generic

- `[K: V]` for maps
  - Clear key-value
  - Generic

- `T?` for nullable
  - Explicit nullability
  - Nested nullables collapse
  - `Nullable<T>` alias

- `type {}` and `interface {}`
  - Inline object types
  - Structural typing
  - Optional variants

### Type Aliases

- Simple substitutions
  - Not types in their own right
  - Convenient naming
  - Generic aliases

- Expression type reuse
  - `.type` to bind
  - Convenient pattern

### Casts

- Method-based `.as(Type)`
  - Good for chaining
  - Avoids precedence confusion
  - Defaults to `null`

- Behavior options
  - `'null'`, `'throw'`, `'force'`
  - Compile-time checked strings
  - Exhaustive list

- Rich casting options
  - `'static_cast'`, `'dynamic_cast'`, etc.
  - Target-specific
  - Flexible

- Compile-time known values
  - Variable for cast type
  - Convenient

- Inferred type with `_`
  - Placeholder
  - Type inference

- Emulate `is` with `if let`
  - Default `null` behavior
  - Pattern matching
  - Type-safe

### Type Matching

- Captured variable in narrowest scope
  - No extra `let`
  - No wrong cast later
  - Safe

- Compile-time for known types
  - Runtime for `Any`
  - Generics support

- Switch over `.type`
  - Type patterns
  - Destructuring
  - Capture as type

- Works as expression
  - Functional style
  - Type-safe

- Rich generic templates
  - Fine-tuned behavior
  - Type-dependent logic
  - Zero-cost

### Unions

- Different types in same variable
  - Platform-dependent
  - Stored as `Any` normally
  - JSON access
  - Mixed types from FFI

- `@union` decorator
  - Explicit union
  - Runtime switch over type

- Works like C unions
  - Shared memory
  - Type-safe access via switch

## Nullability

- Null-safety at compile-time
  - Prevents null reference errors
  - Explicit nullability
  - Type-safe

- Unwrapping operator `!`
  - Guaranteed exception
  - Immediate at position
  - Platform-independent behavior

- `null!` for force initialization
  - Single token
  - Platform-default value
  - Temporary hack (easy to grep)
  - Screams "fix me"

- Non-nullable by default
  - No `if obj != null` needed
  - Better performance
  - Safe

- Elvis operator `??`
  - Null coalescing
  - Guard with `return` or `throw`
  - No `break`/`continue` (prevents abuse)

- Force unwrap `!`
  - Removes `?` from type
  - Exception if null
  - Postfix operator

- Optional chaining `?`
  - `value?.field`
  - Returns `null` if value is `null`
  - Works with calls `?()`
  - Works with index `?[0]`

- Force index `![0]`
  - Exception if array is `null`
  - Clear intent

- No double exclamation `!!`
  - Not allowed
  - Avoids confusion
  - Single `!` is enough

### Nullable

- `Nullable<T>` alias for `T?`
  - Additional methods
  - `assumeNotNull` for unchecked unwrap
  - `map` for transformation
  - `filter` for conditional preservation
  - `scream` for throwing on null
  - `look` for peeking at value

## Modules

- One `import` per module
  - Cleaner syntax
  - Small scopes
  - No bulky imports

- `.hexa` files in `hexa.json`
  - Order affects initialization
  - Namespace control
  - Export control

- Namespaces always available
  - No import needed
  - Direct access
  - Classes as namespaces

- Wildcard import
  - `import Math`
  - Everything in namespace
  - Convenient

- Specific members
  - `import Math { sin cos }`
  - Alias with `as`
  - Mixed imports

- Nested imports
  - `import NameSpace.TypeName`
  - Deeply nested
  - Alias support

- Function-level imports
  - Top of function body
  - Not nested blocks
  - Scoped imports

- Re-exporting
  - `@export import`
  - Easy packaging

- Easy packaging
  - `@github` decorator
  - Simple dependency management

### Exports

- Named declarations exported by default
  - Convenient
  - Explicit `private` to hide
  - Clear intent

- `private` for non-exported
  - File or parent type
  - Encapsulation

## Preprocessor

- Conditional compilation at AST level
  - After parsing
  - Preserves preprocessor feel
  - Avoids parsing pitfalls

- `#if` syntax
  - Familiar
  - Clear intent

- Contextually-evaluated
  - During type checking
  - Template instantiations

- Defined values type checked
  - Safe
  - No string macros

- Same line allowed
  - Compact
  - Flexible

- Enable-if pattern
  - Const generics
  - Conditional features

- Enumeration for flags
  - Checked set
  - Type-safe
  - Clear semantics

- Simple expressions
  - Comparisons
  - Arithmetic
  - Type-safe

## JSX

- First-class syntax
  - Backend decided per file or target
  - `hexa.json` configuration

- `fun TitleCase` for JSX
  - Special syntax
  - Cannot be called directly

- Lowercase tag names
  - HTML-like syntax
  - Backend-specific

- Class components
  - Inherit from `Component`
  - Familiar pattern

## Meta Methods

- Access type information at compile time
  - Like `sizeof` in C
  - Target-specific
  - No language pollution

- `meta` is keyword
  - Cannot be used as identifier
  - LSP-friendly
  - Great discoverability

- `.meta` pseudo-field
  - On any expression
  - On types
  - Pseudo-object

- Callable pseudo-methods
  - Named arguments
  - Flexible

- Not a real value
  - Cannot pass to functions
  - Cannot store
  - Compile-time only

- Introspection
  - Field names
  - Type information
  - Reflection support

### Macros Metaprogramming

- Syntax tree manipulation
  - Declare `@decorator`
  - Macro callback

- Not part of syntax
  - Separate sub-projects
  - Not included in main project
  - Executed before compilation

- Access to compiler API
  - Normal code
  - Reusable `.hexa` files

## Async

- Universal asynchrony primitive
  - Other features platform-specific
  - Flexible
  - Combines all async/await concepts

- `async` and `await` keywords
  - Familiar
  - Clear intent

### Removing Color (Colorless Asynchrony)

- `async(mode)` parameter
  - `'async'` default
  - `'autoAwait'` auto-wait all calls
  - `'callerDecides'` use-site strategy
  - `'disable'` no async

- Caller picks strategy
  - API-friendly
  - Flexible
  - Zero-cost when disabled

- Current context promotion
  - Async context → async calls
  - Without await → promise
  - Convenient

- Alternative: `meta.spawn()`
  - OS threads/pools
  - Platform-dependent

### Fluent Await

- Postfix `.await`
  - Readable chaining
  - Alternative to prefix `await`

- Chained async functions
  - `fetch().await.json().await`
  - Clear data flow

### Auto-Await

- Inverted async
  - Implicitly awaiting
  - Sync-looking code
  - Actually async

- For async without coloring
  - Script-like convenience
  - Leaf code

- `async('autoAwait')`
  - Implicitly awaited calls
  - Explicit opt-out with `async`
  - Only function calls auto-awaited

## Regular Expressions

- Patterns for pattern matching
  - Advanced matching
  - First-class support

- With `or`
  - Multiple patterns
  - Alternatives

- With flags
  - `gimsu` flags
  - Standard regex

- Named groups
  - Bind to variables
  - Guards for checks
  - No regex recompilation

- Array patterns
  - Repeated groups
  - Bind to arrays

- Optional groups
  - Bind to nullables
  - Type-safe

- Whole match binding
  - `as` for capture
  - Convenient

- Guards
  - Extra checks
  - Re-bind with conversions
  - Type-safe

- Repeated groups
  - `*`, `+`, `{n,m}`, etc.
  - Bind to arrays
  - Powerful patterns

- Future optimization
  - Transform to parser code
  - Compile-time optimization

- JavaScript RegExp subset
  - Lowest common denominator
  - Platform-specific fallback

# Advanced Memory Management Beyond Ownership Model

- ARC or GC by default
  - Safe and performant
  - No overhead for simple cases
  - Platform-appropriate

- Optional ownership semantics
  - Via decorators
  - Enforce uniqueness and lifetimes
  - No core syntax changes

- Track general data flow
  - Not just memory
  - RAII model
  - Resource tracking

- Ownership decorators
  - Normal decorators
  - Fine-tuning
  - Flexible

- `@local` for call-tree tracking
  - Never leaves call tree
  - Stack-like behavior
  - Compatible with non-local

- `@hide` for defensive programming
  - Hide sensitive intermediates
  - Prevent mistakes
  - Explicit usage

- Defer with ownership
  - Single-owning
  - Executes on scope exit
  - Transferable

# Native Programming

- Multi-paradigm language
  - High-level and low-level
  - No explicit native syntax
  - Existing concepts reused

- `@struct` decorator
  - Native structure
  - Constructor and methods
  - No virtual table by default

- Stack allocation by default
  - Compiler enforced
  - Not to leave stack
  - Tracked

- Heap allocation with `@heap`
  - Explicit
  - Still tracked

- Referential type by default
  - Pointer
  - Cast from address

- `ByValue<T>` for value types
  - Explicit value-ness
  - Inferred when possible
  - `.ref` to get reference

- Direct construction
  - No constructor call
  - Manual initialization

- Union structures
  - `@union @struct`
  - Same as C unions
  - Tracked allocation

- Other features
  - `@entry`, `@volatile`, `@weak`
  - `Span<T>`, SIMD
  - `@synchronized` for thread-safety

### Assertions/Debuggability

- Compile-time checks
  - `@sizeOf` decorator
  - Enforces structure size

- Runtime checks
  - `console.assert`
  - Condition and message

- Meta methods for debugging
  - `meta.scream` for unreachable
  - `.meta.echo` for tracing
  - `.meta.dump` for inspection

# Intentional Omissions

- No `goto` statements
  - Structured control flow
  - Code safety
  - Readability

- No multiple class inheritance
  - Single inheritance + traits
  - No diamond problem
  - Sufficient flexibility

- No `finally` blocks
  - Simple exception handling
  - Scope-based patterns
  - Decorators for resources

- No `protected` and `public`
  - Only `private`
  - Module-level exports
  - Less noise

- No inline macros or `comptime`
  - Separate macro files
  - Explicit APIs
  - Clarity in main source

- No tuple types
  - Named fields preferred
  - `{ x, y }` shorthand
  - Self-documenting
  - Maintainability
  - Positional via other means

# Conclusion

- Safe, fast, and clear programming
  - Web, mobile, desktop, bare-metal
  - Universal targets

- Deliberately boring in right places
  - Familiar control flow
  - Mainstream operators
  - No kitchen-sink syntax

- Radical where it saves time-to-market
  - Exhaustive matches
  - Null-safety
  - Target-agnostic FFI
  - Zero-cost opt-outs

- Declarative syntax
  - Advanced pattern matching
  - Rich type system
  - Strict nullability
  - Decorator-driven features

- Cuts complexity without losing expressiveness
  - Minimal syntax
  - Powerful features
  - Clear semantics

- Powers ambitious projects
  - Game engines
  - Applications
  - Systems programming
