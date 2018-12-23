# LLVM Target

## Tasks

- [ ] Back-port implementation from prototypes
- [ ] Bootstrap the compiler over LLVM
  - [ ] Windows (kernel32.dll)
  - [ ] Linux (syscalls? no libc?)
  - [ ] macOS (syscalls? no libc?)
  - [ ] Link to a single .exe
- [ ] Implement closures
- [ ] Implement exceptions
  - [ ] Functions ABI
  - [ ] Throwing
  - [ ] Catching
  - [ ] Possibility to suppress them - crash with error message?
- [ ] Implement automatic reference counting
  - [ ] Weak-ones too
  - [ ] Properly handle inline classes and basic types
  - [ ] Thread safety
- [ ] Handle OOM (by crashing)
- [ ] Implement with code-reuse WebAssembly and C targets, and bootstrap compiler over C one
- [ ] Client-side sizeof computation
- [ ] Fields reordering, and attribute to keep order with padding/packing
- [ ] Virtual method calls (inheritance)
- [ ] Virtual method calls (interfaces)
- [ ] Support inline assembly
- [ ] Build binary automatically (add option for generation only)
