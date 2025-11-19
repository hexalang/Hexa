# Hexa Syntax Reference Draft

This document is a draft of the Hexa syntax reference. It is not yet complete and may change in the future.

Is does *not* correspond to the actual syntax of Hexa. It's a draft of the syntax that will be released in the future.

## Syntax

Below is a comprehensive list of the syntax elements of Hexa.
Every syntax element is shown with an examples of all possible variations.

### Comments

```hexa
// This is a comment
/// This is also a comment, but documentational and requires an expression
fun someFunction() {}
```

### Variables

```hexa
let x = 1
var y = 2
```

### Functions

```hexa
fun add(x Int, y Int) Int {
    return x + y
}
```
