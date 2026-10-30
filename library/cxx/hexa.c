// Include only basic language features
#ifdef __cplusplus
	#define _Static_assert(value, error) static_assert(value, error)
#else
	#define nullptr NULL
	#ifndef _Static_assert
		#define _Static_assert(value, error)
	#endif
	#ifndef true
		// TODO include std bool when possible
		#define true 1
		#define false 0
		typedef unsigned char bool;
	#endif
#endif

#ifdef __BYTE_ORDER__
	#if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
		// Ok
	#else
		#error "Unsupported endianness"
	#endif
#else
	#if defined(__BIG_ENDIAN__) || defined(_BIG_ENDIAN)
		#error "Unsupported endianness"
	#endif
#endif

#if defined(CHAR_BIT) && (CHAR_BIT != 8)
	#error "Unsupported char size"
#endif
#if defined(__CHAR_BIT__) && (__CHAR_BIT__ != 8)
	#error "Unsupported char size"
#endif

#ifndef HEXA_NO_DEFAULT_INCLUDES
	#ifdef __cplusplus
		// #include <new> // Placement new
		// TODO include if C++11:
		// #include <functional> // For [&]
		#ifdef __GNUC__
			#define restrict __restrict__
		#else
			#if defined(_MSC_VER) || defined(__clang__)
				#define restrict __restrict
			#else
				#define restrict
			#endif
		#endif
	#else
		// TODO include if C11:
		#include <stdbool.h>
	#endif

	#include <stdint.h>
	#include <stdarg.h>
	#include <stddef.h>

	#ifndef HEXA_NO_PLATFORM_INCLUDES
		// TODO don't include any at all,
		// just let module bindings import them
		#include <stdio.h> // printf
		#include <stdlib.h> // malloc
		// #include <string.h> // strlen

		// TODO defines before includes
		#ifndef UNICODE
			#define UNICODE
		#endif
		#ifndef WIN32_LEAN_AND_MEAN
			#define WIN32_LEAN_AND_MEAN
		#endif
		#ifndef WIN32_EXTRA_LEAN
			#define WIN32_EXTRA_LEAN
			#define NOSERVICE
			#define NOMCX
			#define NOIME
			#define NOSOUND
			#define NOCOMM
			#define NOKANJI
			#define NORPC
			#define NOPROXYSTUB
			#define NOIMAGE
			#define NOTAPE
			#define NOGDI
			#define NOUSER
		#endif
		#ifdef _WIN32
			#include <windows.h>
		#endif
	#endif
#endif

#define true_ (uint8_t)1
#define false_ (uint8_t)0

//#define variadicArgumentsInit() va_list va_lst; va_start(va_lst, c);

#ifndef HEXA_MAIN
	#define HEXA_MAIN main
#endif

#ifdef __cplusplus
	extern "C"
#endif
int HEXA_MAIN(int, char **);

// Per-function linkage (F9: async funs are C++ for coroutines, rest stay C
// for direct host links without pragma aliasing — pragma only covers
// `__imp_` DLL thunks, NOT same-TU Hexa<->host symbols, so `extern "C"`
// DOES work (prevents mangling). Outer `extern "C" {` wrapper is retained
// for variables/prototypes; functions carry explicit linkage (inner wins).
#ifdef __cplusplus
	#define HEXA_C extern "C"
	#define HEXA_CPP extern "C++"
#else
	#define HEXA_C
	#define HEXA_CPP
#endif

#ifndef HEXA_NEW
	#ifndef HEXA_NO_PLATFORM_INCLUDES
		#ifdef _WIN32
			// TODO cache GetProcessHeap !
			// TODO should be part of hexa runtime
			#define HEXA_NEW(z) HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, z)
			#define HEXA_UNREACHABLE_PRESENT 1
			static void HEXA_UNREACHABLE(uint32_t where);
			//	unsigned long $_;
			//	HANDLE _ = GetStdHandle((DWORD)(uint32_t)(-11));
			//	WriteFile(_, "UNREACHABLE", 11, &$_, nullptr);
			//	FlushFileBuffers(_);
			//	ExitProcess(where);
			//}
			// NOTE the definition lives in `library/c/hexa.c` (inside its own
			// `extern "C"`) — a plain `static` forward declaration here would
			// contradict that linkage (C2732), and all call sites come after
			// the Defaults section anyway
		#else
			#define HEXA_NEW(z) malloc(z)
			#define HEXA_UNREACHABLE(where) {}
			// TODO ^
		#endif
	#else
		#define HEXA_NEW(z) malloc(z)
		#define HEXA_UNREACHABLE_PRESENT 0
		#define HEXA_UNREACHABLE(where) {}
		// TODO ^
	#endif
#endif

// OOM diagnosis: HEXA_NEW call-site tracking (watchdog dumps top 10).
// BSS array indexed by __LINE__ (hexa-native.cpp < 400k lines) — no heap, so
// the tracker can't OOM itself or hide the leak it's measuring (a std hash
// table would allocate). Totals are allocated; frees are no-ops on native
// Phase-1, so totals == live. Dumped by HexaDumpAllocTop() on watchdog.
#ifdef _WIN32
#ifndef HEXA_NO_PLATFORM_INCLUDES
#ifndef HEXA_ALLOC_TRACK_MAX_LINE
#define HEXA_ALLOC_TRACK_MAX_LINE 400000
#endif
static size_t hexaAllocCount_[HEXA_ALLOC_TRACK_MAX_LINE];
static size_t hexaAllocBytes_[HEXA_ALLOC_TRACK_MAX_LINE];
HEXA_C void* HexaTrackAlloc(size_t z, int line) {
	if (line >= 0 && line < HEXA_ALLOC_TRACK_MAX_LINE) {
		hexaAllocCount_[line]++;
		hexaAllocBytes_[line] += z;
	}
	return HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, z);
}
HEXA_C void HexaDumpAllocTop(const char* path) {
	FILE* f = fopen(path, "w");
	if (!f) return;
	fprintf(f, "%s%c", "# Hexa native alloc top (HEXA_NEW __LINE__ in hexa-native.cpp; totals allocated, no frees on Phase-1 so totals == live)", 10);
	fprintf(f, "%s%c", "# rank line count bytes avg", 10);
	size_t totalCount = 0, totalBytes = 0;
	for (int i = 0; i < HEXA_ALLOC_TRACK_MAX_LINE; i++) { totalCount += hexaAllocCount_[i]; totalBytes += hexaAllocBytes_[i]; }
	fprintf(f, "%s%llu%s%llu%c", "# total count=", (unsigned long long)totalCount, " bytes=", (unsigned long long)totalBytes, 10);
	int reported[10]; for (int k = 0; k < 10; k++) reported[k] = -1;
	for (int rank = 0; rank < 10; rank++) {
		size_t bestBytes = 0; int bestLine = -1;
		for (int i = 0; i < HEXA_ALLOC_TRACK_MAX_LINE; i++) {
			int dup = 0; for (int k = 0; k < rank; k++) if (reported[k] == i) { dup = 1; break; }
			if (dup) continue;
			if (hexaAllocBytes_[i] > bestBytes) { bestBytes = hexaAllocBytes_[i]; bestLine = i; }
		}
		if (bestLine < 0 || bestBytes == 0) break;
		reported[rank] = bestLine;
		size_t c = hexaAllocCount_[bestLine];
		size_t b = hexaAllocBytes_[bestLine];
		size_t avg = c ? b / c : 0;
		fprintf(f, "%d %d %llu %llu %llu%c", rank + 1, bestLine, (unsigned long long)c, (unsigned long long)b, (unsigned long long)avg, 10);
	}
	fclose(f);
}
#undef HEXA_NEW
#define HEXA_NEW(z) HexaTrackAlloc(z, __LINE__)
#endif
#endif
//#define Array_$Null$int32_t$_ Array_$int32_t$_
//#define Array_$int32_t$_ Array_$int32_t_
//#define Array_$int32_t$_$new_ Array_$int32_t_$new_
//#define Map_$int32_t$$int32_t_$new_ Map_$int32_t$int32_t_$new_

// TODO malloc must be at #ifdef _WIN32 or NOT USED AT ALL, but use HEXA_NEW in code gen
#ifdef _WIN32
	//#define malloc(z) HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, z)
#endif
//#define (z) wprintf(L"trace: <%s>\n", z)
#define HEXA_TRACE(z) wprintf(L"Trace: %s\n    at %hs:%d\n", z, __func__, __LINE__)

#ifndef HEXA_FREE
	#ifdef _WIN32
		#define HEXA_FREE(p, z) HeapFree(GetProcessHeap(), 0, p)
	#else
		#define HEXA_FREE(p, z) free(p)
	#endif
#endif

#ifdef __cplusplus
// C++ has no C99 compound literals `(T[]){...}` (C4576) — the generator emits
// `hexaItems<T>(...)` for array/map literals instead. NOTE the buffer leaks
// for now: lifetimes land with the F11 allocator
template <typename T, typename... A>
static inline T* hexaItems(A... a) {
	if constexpr (sizeof...(A) == 0) {
		return (T*)(HEXA_NEW(sizeof(T)));
	} else {
		T* buffer = (T*)(HEXA_NEW(sizeof(T) * sizeof...(A)));
		T items[] = {(T)a...};
		for (size_t i = 0; i < sizeof...(A); i++) buffer[i] = items[i];
		return buffer;
	}
}

// F9 true suspension (Phase-1 was pass-through `.value` reads, no suspend).
// Async funs are C++ coroutines returning `Promise<T>*`; `await p` is
// `co_await p` (suspends only when `p` is pending, resumes via the frame
// pump). JS ordering: `initial_suspend=suspend_never` runs sync until the
// first suspending `co_await` (like JS runs sync until the first suspending
// await); `final_suspend=suspend_never` destroys the frame at `co_return`
// (fire-and-forget safe, no leak; the returned `Promise*` heap object leaks
// like every other Phase-1 heap object until F11).
// ARC/F11 note: no ARC guards yet (ArcInserter disconnected), no sweep
// (HEXA_NEW is malloc/HeapAlloc) — nothing can free a suspended frame's
// env, so suspension is use-after-free safe by construction (leaks only).
#include <coroutine>
#include <vector>
// Common prefix of every generated `Promise<T>` struct (vtable first, then
// `state/value/reason` — verified uniform incl. `Promise<void>` whose value
// is still `Any?*`). `operator co_await` (emitted per Promise by genC)
// reinterprets to this; no layout change to Hexa structs.
struct HexaPromiseBase {
	const void* _;
	int32_t state_;
	struct Any_* value_;
	struct Any_* reason_;
};
struct HexaAwaiter {
	void* promise_;
	bool await_ready() noexcept {
		if (promise_ == nullptr) return true;
		return ((HexaPromiseBase*)promise_)->state_ != 0;
	}
	void await_suspend(std::coroutine_handle<> h) noexcept;
	struct Any_* await_resume() noexcept {
		if (promise_ == nullptr) return nullptr;
		return ((HexaPromiseBase*)promise_)->value_;
	}
};
// Pending `co_await`s: `{promise, handle}` pairs suspended on pending
// promises. Drained by `hexaPumpResumes()` (called from Hexa `timerPump()`
// each frame — the F9 resume driver, zero host edits). Resuming happens
// synchronously on the pump thread (frame-granular, like the `.then` 0ms
// re-arm it replaces); each resume returns to the pump (no deep recursion:
// a resume either suspends again or completes via `final_suspend=never`).
struct HexaPendingAwait { void* promise_; std::coroutine_handle<> handle_; };
inline std::vector<HexaPendingAwait>& hexaPendingAwaits() {
	static std::vector<HexaPendingAwait> v;
	return v;
}
inline void HexaAwaiter_await_suspend_impl(void* promise_, std::coroutine_handle<> h) noexcept {
	hexaPendingAwaits().push_back(HexaPendingAwait{promise_, h});
}
inline void HexaAwaiter::await_suspend(std::coroutine_handle<> h) noexcept {
	HexaAwaiter_await_suspend_impl(promise_, h);
}
// Pump: resume every waiter whose promise settled since suspension.
// Swap-remove iteration (order not guaranteed — matches JS microtask
// *eventual* delivery, not exact order; in-tree callers don't depend on
// cross-promise resume order, only on single-promise settle-before-resume).
// `extern "C"` so Hexa `timerPump()` can call it via plain `@rename`
// (unmangled, like the `hexa*` host shims); body is C++ (coroutine_handle).
extern "C" inline void hexaPumpResumes() noexcept {
	auto& v = hexaPendingAwaits();
	size_t i = 0;
	while (i < v.size()) {
		void* p = v[i].promise_;
		int32_t settled = 0;
		if (p != nullptr) settled = ((HexaPromiseBase*)p)->state_ != 0;
		else settled = 1;
		if (settled) {
			auto h = v[i].handle_;
			v[i] = v.back();
			v.pop_back();
			if (h) h.resume();
		} else {
			i++;
		}
	}
}
// F9 per-Promise coroutine wiring (invoked by genC `printCoroutines()` as
// `HEXA_PROMISE_CORO(Promise_X_)` inside one inner `extern "C++"` block after
// Types). Single-line macro (no `\` continuations) so `edit_file` never
// double-escapes backslashes; braces are fine in `.c`. `S` is the mangled
// struct (`Promise_$String_`); vtable `S##_$` = `Promise_X__$` (struct `_` +
// `_$`); `HEXA_NEW` zeroes (pending state). `unhandled_exception` exits 3
// (matches crash net; F5 `throw` across coroutines is later work).
// Single `return_value(Any_*)` only (no `return_void` — C3782 forbids both;
// void `co_return;` is emitted as `co_return (Any_*)nullptr` by genC).
// `operator co_await(S&)` takes a class-type reference (C2803 rejects `S*`
// pointer params); genC emits `co_await (*p)` (deref).
#define HEXA_PROMISE_CORO(S) struct HexaPromiseType_##S { S* promise_; S* get_return_object() noexcept { void** mem = (void**)HEXA_NEW(sizeof(S)); mem[0] = (void*)&S##_$; promise_ = (S*)mem; return promise_; } std::suspend_never initial_suspend() noexcept { return {}; } std::suspend_never final_suspend() noexcept { return {}; } void unhandled_exception() noexcept { ExitProcess(3); } void return_value(Any_* v) noexcept { promise_->value_ = v; promise_->state_ = 1; } }; HexaAwaiter operator co_await(S& p) noexcept { return HexaAwaiter{(void*)&p}; } namespace std { template<typename... A> struct coroutine_traits<S*, A...> { using promise_type = HexaPromiseType_##S; }; }
#endif
/*
#ifdef __cplusplus
	serialPrintln(L"<Tofita> __cplusplus");
#else
	serialPrintln(L"<Tofita> !__cplusplus");
#endif
#if defined(__clang__)
	serialPrintln(L"<Tofita> __clang__");
#elif defined(__GNUC__) || defined(__GNUG__)
	serialPrintln(L"<Tofita> __GNUC__");
#elif defined(_MSC_VER)
	serialPrintln(L"<Tofita> _MSC_VER");
#endif
*/

// Deallocation of all resources
#ifndef HEXA_END
	#define HEXA_END hexaEnd();
#endif

// DLL precise (unmangled) linking names
// Note: requires -std=gnu17 in C mode
#define HEXA_LINK(name) asm(name)
#ifndef __GNUC__
    #ifndef __clang__
		// Not supported by MSVC — undef first to avoid C4005 redefinition
		#undef HEXA_LINK
		#define HEXA_LINK(name)
	#endif
#endif

//#define $null ((Any_ *)0)
//#define $bool uint8_t
//#define $true 1        // 0b00000001
//#define $false 0       //          ^
//#define $bool_null 254 // 0b11111110
// Runtime code is under MIT license
// Forward
struct String_;
struct Any_;
// Dynamic object surface for `Any` values — the generated dynamic paths
// (`obj.field` via `let_`/`$set`, `Any`→primitive conversions) call these.
// Phase 1: stubs that keep every call site compiling; real reflection
// (accessor tables, JS-truthiness per D7) lands with F10.
// `AnyValue_` is the call/get proxy: `any->let_(name)` and `proxy(args...)`
// return it so DYNAMIC CHAINS (`path_->let_(L"join")(a, b)->let_(...)`) type
// check; every operation is a no-op placeholder (Phase 1 acceptance: the API
// exists, semantics land with F10/F9)
struct AnyValue_ {
	struct Any_* value_;
	// Chains `proxy->member(...)` back through `Any_` (never null)
	struct Any_* operator->() const;
	// Used as `Any_*` (casts, implicit params, assignments)
	operator struct Any_*() const { return value_; }
	// Converts to ANY typed slot the code generator expects (pointers and
	// scalars alike) — Phase 1 stub semantics, F10 reflection replaces it
	template <typename T> operator T() const { return T(); }
	// Dynamic call (`fn(...)` on `Any`) — returns another proxy
	template <typename... A> struct AnyValue_ operator()(A... args) const { return AnyValue_{value_}; }
	// Placeholder comparisons/arithmetic so dynamic values survive typed
	// contexts (real semantics per D7 with F10)
	template <typename T> uint8_t operator==(T other) const { return 0; }
	template <typename T> uint8_t operator!=(T other) const { return 1; }
	// Null checks ARE meaningful even in Phase 1 (JS: `x != null` is false
	// exactly when x is null) — and guards like `if (obj.field != null)`
	// must not pass on a null receiver, or the guarded deref AVs. These
	// non-template overloads win over the templates above for nullptr
	// (`decltype(nullptr)` needs no includes).
	uint8_t operator==(decltype(nullptr)) const { return value_ == nullptr; }
	uint8_t operator!=(decltype(nullptr)) const { return value_ != nullptr; }
	// Compound assignment on dynamic members (`obj.field += 1`) — F10
	// turns these into real `set` reflections
	template <typename T> AnyValue_ operator+=(T) const { return *this; }
	template <typename T> AnyValue_ operator-=(T) const { return *this; }
	template <typename T> AnyValue_ operator*=(T) const { return *this; }
	template <typename T> AnyValue_ operator/=(T) const { return *this; }
};

// Arithmetic/comparison with dynamic values — THREE overloads per operator
// (both dynamic / dynamic-left / dynamic-right) so no call is ambiguous
// (Phase 1 stubs — real semantics per D7 with F10)
#define HEXA_ANY_BINOP(op, ret) \
	static inline ret operator op(AnyValue_ a, AnyValue_ b) { return 0; } \
	template <typename T> static inline ret operator op(AnyValue_ a, T b) { return 0; } \
	template <typename T> static inline ret operator op(T a, AnyValue_ b) { return 0; }
HEXA_ANY_BINOP(+, int64_t)
HEXA_ANY_BINOP(-, int64_t)
HEXA_ANY_BINOP(*, int64_t)
HEXA_ANY_BINOP(/, int64_t)
HEXA_ANY_BINOP(%, int64_t)
HEXA_ANY_BINOP(<, uint8_t)
HEXA_ANY_BINOP(>, uint8_t)
HEXA_ANY_BINOP(<=, uint8_t)
HEXA_ANY_BINOP(>=, uint8_t)
#undef HEXA_ANY_BINOP
struct Any_ {
	// Field get (`obj.field`) — the receiver stands in for the result so
	// chains keep a live pointer (Phase 1 no-op)
	struct AnyValue_ let_(struct String_* name_) { return AnyValue_{this}; }
	// Field set (`obj.field = value`)
	void $set(struct String_* name_, struct Any_* value_) { }
	// JS-truthiness conversions (D7 — TODO real tables)
	uint8_t _toBool() { return 1; }
	int32_t _toInt() { return 0; }
	double _toFloat() { return 0.0; }
	// JS `ToString` (D7 — TODO real reflection)
	struct String_* toString_() { return nullptr; }
	// Dynamic call (`fn(...)` where `fn` is an `Any` value)
	template <typename... A> struct AnyValue_ operator()(A... args) { return AnyValue_{this}; }
};
typedef struct Any_ Any_;
inline Any_* AnyValue_::operator->() const {
	static Any_ stub;
	return (value_ != nullptr)? value_ : &stub;
}
//#define Any_ void*
//struct String_** Strings_ = nullptr;
//#define Any_ Any_
//#define ConstCharPointer_ const char *
//typedef long LONG;
//typedef int32_t HRESULT;
//typedef unsigned long DWORD;
//typedef unsigned short WORD;
//typedef unsigned char BYTE;
// TODO just use GUID [128bit uint8_t] or uint64_t*
//typedef struct _GUID { DWORD Data1; WORD Data2; WORD Data3; BYTE Data4[8]; } _GUID;
//typedef struct _GUID { uint8_t data[16]; } _GUID;
//typedef _GUID _IID;
//typedef _IID* _REFIID;
#ifdef _WIN32
	// TODO better just HEXA_STDCALL no wait, its just in case if compiler has no
	// If compiler has no __stdcall built-in, then create it
	// TODO maybe __attribute__((stdcall))
	#ifndef __stdcall
		#define __stdcall __stdcall
	#endif
#else
	// TODO is even applicable? what about COM
	#define __stdcall__
#endif
// TODO use actual SEH headers
#define _try
#define _catch(_)
#define _throw(_) {}

// ARC retain/release (D6): plain non-atomic `rc++`/`rc--`, single-threaded
// programs for now (relaxed atomics when threads land). No explicit null
// test: null (0) falls inside the immediate range below. No `rc == 0` test:
// deallocation is the sweep's job (F11), never the decrement site's.
// Immediates (tagged small ints, incl. 0/null — same test as the unboxers)
// carry no header and are skipped.
struct HexaHeader_ { const void* _; int32_t rc_; };
HEXA_C void hexaRef(void* p) {
	int64_t v_ = (int64_t)(p);
	if (v_ >= (int64_t)-65535 && v_ <= (int64_t)65535) return;
	((struct HexaHeader_*)(p))->rc_++;
}
HEXA_C void hexaUnref(void* p) {
	int64_t v_ = (int64_t)(p);
	if (v_ >= (int64_t)-65535 && v_ <= (int64_t)65535) return;
	((struct HexaHeader_*)(p))->rc_--;
}
// D4 scope guard: `DeferRefDec` lowers to one of these per retained value
// (constructed where ArcInserter put the Defer, destructs at block exit —
// normal returns AND C++ unwinding both release, D5). Trivial
// non-throwing ctor keeps the inc-to-guard window empty by construction.
// C++ only: pure-C targets use the inline best-effort form (F4.4).
#ifdef __cplusplus
template <typename T>
struct HexaDeferDec_ { T o_; HexaDeferDec_(T o): o_(o) {} ~HexaDeferDec_() { hexaUnref((void*)o_); } };
#endif

// COM interop DEL
struct IUnknown_ {
//	// IUnknown interface
//	virtual HRESULT __stdcall__ QueryInterface_(_REFIID riid, void **ppvObject) const {
//		*ppvObject = nullptr;
//		return 0;
//	};
//	virtual uint32_t __stdcall__ AddRef_() { return 0; };
//	virtual uint32_t __stdcall__ Release_() { return 0; };
};

// Types DEL
//String_* String__object_Object_ = nullptr;
//struct _Any_ : IUnknown_ {
//	uint32_t rc_ = 0;
	// IUnknown interface
	/*virtual HRESULT __stdcall__ QueryInterface_(_REFIID riid, void **ppvObject) const {
		*ppvObject = nullptr;
		return 0;
	}
	virtual uint32_t __stdcall__ AddRef_() {
		this->rc_++;
		return this->rc_;
	}
	virtual uint32_t __stdcall__ Release_() {
		this->rc_--;
		return this->rc_;
	}
	virtual void Free_() {
		// Should be virtual
	}
		// Reflection
		// Set field
//		virtual Any_* var_(String_* name_, Any_* value_) { return (Any_*)0; };
		// Get field
//		virtual Any_* let_(String_* name_) { return (Any_*)0; };
//		virtual String_* toString_() { return (String_*)0; }; // TODO '[object Object]'
		// []
//		virtual Any_* get_(int32_t index_) {};
		// []=
//		virtual Any_* set_(int32_t index_, Any_* value_) {};
		// As in JavaScropt: true if object exists
//		virtual uint8_t _toBool() { return 1; };
//		virtual int32_t _toInt() { return 0; };
//		virtual double _toFloat() { return 0.0; };
	operator String_*() const {
		printf("Any_ String_*()");
		//return Strings_[4];
		//String__object_Object_;
		return this->toString_();
	}

	virtual String_* toString_() const {
		//printf("Any_ String_* toString_()");
		//return String__object_Object_;
		return Strings_[4];
	}*/
//};

//template <typename T>
//struct Any : Any_ {
//	T value = 0;
//	static Any<T> from(T src) {
//		Any<T> result;
//		result.value = src;
//		return result;
//	}
//};
//
//// Primitives as Any
//struct AnyInt32 : Any_ {
//	int32_t value = 0;
//	AnyInt32 () {};
//	virtual String_* toString_() const {
//		// TODO ARC & string gen
//		return Strings_[4];
//	}
//};
//
//struct AnyTrue : Any_ {
//	AnyTrue () {};
//	virtual String_* toString_() const {
//		// TODO ARC
//		return Strings_[1];
//	}
//};
//
//struct AnyFalse : Any_ {
//	AnyFalse () {};
//	virtual String_* toString_() const {
//		// TODO ARC
//		return Strings_[0];
//	}
//};
//
// Dummy values

// Just empty global single object, used to convert
// normal functions to closures without unnecessary
// actual closure allocation
//struct _Dummy {
//	virtual uint32_t __stdcall__ AddRef_() {/*nothing*/};
//	virtual uint32_t __stdcall__ Release_() {/*never deallocated*/};
//};
//struct Any_ _dummy;
// Note global instance is defined here, but
// should be created in main function

// So `==` works
//AnyTrue* _true = new AnyTrue();
//AnyFalse* _false = new AnyFalse();

struct AnyTrue {};
struct AnyTrue _true;
struct AnyFalse {};
struct AnyFalse _false;
struct Any_* _bool[3] = {(struct Any_*)&_false, (struct Any_*)&_true, nullptr};
struct Any_* Any_fromBool(const uint8_t this_) {
	return _bool[this_];
}

// Just {}, allows new fields adding via reflection
// NOTE `struct Object_` is emitted by the generated code (class `Object`) —
// a duplicate definition here would be C2011, so no struct in the prologue

#if 0
	extern "C++" { DEL
	template <typename T>
	// Only for basic types! DO *NOT* USE AS POINTER!!!
//	try!global var+stack save\restore!+goto/defer early ret
//arena: set malloc ptr as a struct field before new()
	//fast value-type optionals (int as int64->struct with conversion operator and .unwrap())
	struct null_ {
		T this_;
		uint8_t nullptr_;
		// let i: Int? = null
		//null_() { this.has_ = 0; };
		// let i: Int? = 123
		//null_(T set_) { this.value_ = set_; this.has_ = 1; };
		// let i: Int? = v
		//T operator null_<T>(T value_) {
		//	return
		//}
		//T* operator null_<T>(T value_) {
		//	return
		//}
		//operator T*() { return &this->value_; };
		// ^ makes sense? any difference vs var i; &i; at all? cause should result in same ptr
		// waaaaait... what sense of ptr* tu Null<T>? tag is not updated!
		// should be just ptr* to T
		/*null_ &this_, */
		uint8_t operator == (std::nullptr_t) {
			return this->nullptr_ == 1;
		};
		uint8_t operator != (std::nullptr_t) {
			return this->nullptr_ != 1;
		};
		//uint8_t operator != (null_ &this_, std::nullptr_t) {
		//	return this_->has_ == 0;
		//}
	};};
#endif

//template <typename T> DEL
//struct Null {
//	T value_;
//	bool has_ : 1;
//
//	bool operator == (Null<T> &v) const {
//		if (v.has_ && has_ && v.value_ == value_) return true;
//		if (!v.has_ && !has_) return true;
//		return false;
//	};
//
//	bool operator != (Null<T> &v) const {
//		return !(*this == v);
//	};
//
//	bool operator == (T v) const {
//		if (!has_) return false;
//		return value_ == v;
//	};
//
//	bool operator != (T v) const {
//		if (!has_) return true;
//		return value_ != v;
//	};
//
//	operator T() const {
//		if (!has_) return 0;
//		return value_;
//	}
//
//	//explicit operator T() const {
//	//    if (!has_) return 0;
//	//	return value_;
//	//}
//
//	operator T*() const {
//		if (!has_) return nullptr;
//		return &value_;
//	}
//
//	//explicit operator T*() const {
//	//    if (!has_) return nullptr;
//	//	return &value_;
//	//}
//
//	bool demo() {
//		Null<T> a;
//		Null<T> b;
//		return a == b;
//	};
//
//	bool demo2() {
//		Null<T> a;
//		Null<T> b;
//		T c = 0;
//		return a != b && (a != c) && (a == c);
//	};
//};
//
// TODO generate from @primitiveType
//typedef Null<int32_t> struct Null$Int32;
//typedef Null<double> struct Null$Float64;

// The idea here is zero-cost conversion of integer to optional
// Impossible 32-bit value is "null"
// TODO 0x instead of 0b for compiler compat
#define uint32_t$ uint64_t
#define uint32_t$null (uint64_t)0b1111111111111111111111111111111111111111111111111111111111111111ULL

#define int32_t$ int64_t
#define int32_t$null (int64_t)0b1111111111111111111111111111111111111111111111111111111111111111LL

#define uint16_t$ uint32_t
#define uint16_t$null (uint32_t)0xFFFFF

#define int16_t$ int32_t
#define int16_t$null (int32_t)0xFFFFF

#define uint8_t$ uint16_t
#define uint8_t$null (uint16_t)0xFFF

#define int8_t$ int16_t
#define int8_t$null (int16_t)0xFFF

#define Bool_ uint8_t
//#define Array_$int32_t_ Array_$Int_
//#define Array_$int32_t_$new_ Array_$Int_$new_
//#define Array_$int32_t_$from_ Array_$Int_$from_

// The first bit is a sign bit, so nullable is `second bit equals 1`
//#define int32_t$null (int64_t)0b1100000000000000000000000000000000000000000000000000000000000000LL
//#define int32_t$null$ (int64_t)0b0100000000000000000000000000000000000000000000000000000000000000LL
//struct Null$Int32 {
//	int32_t value_;
//	uint8_t has_;
//};
//typedef struct Null$Int32 Null$Int32;
struct Null$Float64 {
	double value_;
	uint8_t has_;
};
typedef struct Null$Float64 Null$Float64;

// TODO maybe there some bit-exact sentinel that can be used as null?
// if ((uint32_t*)value)[0] != sentinel { non null }
struct Null$Float32 {
	float value_;
	uint8_t has_;
};
typedef struct Null$Float32 Null$Float32;

// TODO static + att visibility(hidden)
uint8_t equalNull$Float32(Null$Float32 a, Null$Float32 b) {
	if (a.has_ && b.has_ && a.value_ == b.value_) return 1;
	if ((a.has_ + b.has_) == 0) return 1;
	return 0;
}

struct Null$UInt64 {
	uint64_t value_;
	uint8_t has_;
};
typedef struct Null$UInt64 Null$UInt64;

// TODO unit test this carefully
// TODO move this to `class UInt64`? Or, create new `@keep @struct @byValue class NullUInt64`
uint8_t equalNull$UInt64(Null$UInt64 a, Null$UInt64 b) {
	// if (a.has_ == 0 && b.has_ == 0) return 1;
	//if (a.has_ != b.has_) return 1;
	// TODO short-circuit version `(a.has_ + b.has_ + (uint8_t)(a.value_ == b.value_)) == 3` + cache `a.has_ + b.has_`
	if (a.has_ && b.has_ && a.value_ == b.value_) return 1;
	// if (!a.has_ && !b.has_) return true;
	if ((a.has_ + b.has_) == 0) return 1;
	return 0;
}

// This is done to not evaluate `value` twice (also useful for ABI)
// TODO consider adding meta-block unroll
Null$UInt64 toNull$UInt64(uint64_t value) {
	return (Null$UInt64){value, (uint8_t)(value != 0)};
}

struct Null$Int64 {
	// TODO fat value? aka inline struct, but what about return from function?
	int64_t value_;
	uint8_t has_;
};
typedef struct Null$Int64 Null$Int64;
// TODO conversion methods

//namespace std {
//    void __throw_bad_function_call() {}
//}

// Functions
//String_* String_fromUTF8z(const char* this_) {
//	//String_* result = (String_*)malloc(sizeof(String_) + strlen(this_));
//	return (String_*)0;
//};
//String_* String_fromInt(const int32_t this_) {
//	return Strings_[2];
//};
//String_ String__empty_;
//String_* String__empty_; // Root
//String_* String__null_;

// TODO just force register as Strings_[0] = 'false', etc, to reuse that global array
//String_* String__false_true_null_[3] = {nullptr, nullptr, nullptr};
//	// TODO actual concat
//	// TODO ARC here
//	String_* left = a_? a_->toString_() : Strings_[2];
//	String_* right = b_? b_->toString_() : Strings_[2];
//	//if (a_) return a_->toString_();
//	//if (b_) return b_->toString_();
//	return Strings_[2]; // "null"
//	//return (String_*)a_;
//	//String_* sa_ = (a_ == (Any_*)0)? String__null_ : a_->toString_();
//	//String_* sb_ = (b_ == (Any_*)0)? String__null_ : b_->toString_();
//	//return String__null_;
//};
//String_* String_combine(int32_t a_, Any_* b_) { // overloads
//	//String_* sa_ = (a_ == $null)? String__null_ : a_->toString_();
//	String_* sb_ = (b_ == $null)? String__null_ : b_->toString_();
//	return String__null_;
//};
//struct Array_* Array_from(void* stub, ...) {
//	return (struct Array_*)0;
//};
// name, value, name, value
struct Object_* Object_from(void* stub, ...) {
	return (struct Object_*)0;
};
// key, value, key, value
struct Map_* Map_from(void* stub, ...) {
	return (struct Map_*)0;
};

//uint32_t Any_::AddRef_() {
//	// return InterlockedIncrement(&m_lRefCount);
//	//return ++this->rc_;
//	return this->rc_;
//};
//
//uint32_t Any_::Release_() {
//	/*
//	uint32_t  ulCount = InterlockedDecrement(&m_lRefCount);
//	if(0 == ulCount)
//	{
//		delete this;
//	}
//	return ulCount;
//	*/
//	//return --this->rc_;
//	return this->rc_;
//};
//
//HRESULT Any_::QueryInterface_(_REFIID riid, void **ppvObject) {
//	/*
//	if (riid == __uuidof(IUnknown) ||
//		riid == __uuidof(IDispatch) ||
//		riid == __uuidof(IScheduler))
//	{
//		*ppvObj = this;
//	}
//	else
//	{
//		*ppvObj = NULL;
//		return E_NOINTERFACE;
//	}
//	AddRef_();
//	return NOERROR;
//	*/
//	*ppvObject = nullptr;
//	return 0;
//};
//
// Allows to avoid making Null<Bool> as structure or pointer
// TODO move to hexa.h for using hexa dlls from c
// struct A : T {} type wrapper instead of @distinct, @inline and @trait
// Opt guide: Boolean takes 8 bit both Bull and Bull? 2 is a special value,,
//#define $true 1
//#define $false 0
//#define $bool_null 2
//#define Bool$Null_true 1
//#define Bool$Null_false 0
//#define Bool$Null_null 2
struct Any_* Any_fromInt(const int32_t this_) {
	// Cache special cases like 0 1 -1
	return (struct Any_*)0;
}

// `Float` as `Any` boxing (Phase 1: no-op placeholder per D2/F2)
struct Any_* Any_fromFloat(const double this_) {
	return (struct Any_*)0;
}
//#define String_op String_* operator + (String_ *right) { return $null; }
//String_* operator + (String_ left, String_ *right) {
//    return $null;
//};
//operator int32_t*(int32_t &this_) {
//	return this_;
//};
// End of runtime code under MIT license

// wchar_t is UTF-16LE with -fshort-wchar
_Static_assert(sizeof(wchar_t) == 2, "bad wchar_t sizeof");
