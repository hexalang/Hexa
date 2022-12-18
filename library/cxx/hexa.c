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
		#include <new> // Placement new
		// TODO include if C++11:
		// #include <functional> // For [&]
	#endif

	#include <stdint.h>
	#include <stdarg.h>
	#include <stddef.h>

	#include <stdio.h> // printf
	#include <stdlib.h> // malloc
	#include <string.h> // strlen
	#ifndef UNICODE
		#define UNICODE
	#endif
	#ifdef _WIN32
		#include <windows.h>
	#endif
#endif

#define true_ (uint8_t)1
#define false_ (uint8_t)0

#ifndef HEXA_MAIN
	#define HEXA_MAIN main
#endif

#ifndef HEXA_NEW
	#ifdef _WIN32
		// TODO cache GetProcessHeap
		#define HEXA_NEW(z) HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, z)
		static void HEXA_UNREACHABLE(uint32_t where) {
			unsigned long $_;
			HANDLE _ = GetStdHandle((DWORD)(uint32_t)(-11));
			WriteFile(_, "UNREACHABLE", 11, &$_, nullptr);
			FlushFileBuffers(_);
			ExitProcess(where);
		}
	#else
		#define HEXA_NEW(z) malloc(z)
		#define HEXA_UNREACHABLE(where) {} // TODO
	#endif
#endif

#ifndef HEXA_FREE
	#ifdef _WIN32
		#define HEXA_FREE(p, z) HeapFree(GetProcessHeap(), 0, p)
	#else
		#define HEXA_FREE(p, z) free(p)
	#endif
#endif

// DLL precise (unmangled) linking names
#define HEXA_LINK(name) asm(name)
#ifndef __GNUC__
    #ifndef __clang__
		// Not supported by MSVC
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
struct Any_ {};
typedef struct Any_ Any_;
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
	#define __stdcall __stdcall
#else
	#define __stdcall__
#endif
#define _try
#define _catch(_)
#define _throw(_) {}

// COM interop
struct IUnknown_ {
//	// IUnknown interface
//	virtual HRESULT __stdcall__ QueryInterface_(_REFIID riid, void **ppvObject) const {
//		*ppvObject = nullptr;
//		return 0;
//	};
//	virtual uint32_t __stdcall__ AddRef_() { return 0; };
//	virtual uint32_t __stdcall__ Release_() { return 0; };
};

// Types
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
struct Object_ {};

#if 0
	extern "C++" {
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

//template <typename T>
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

struct Null$Float64 {
	double value_;
	uint8_t has_;
};
typedef struct Null$Float64 Null$Float64;

struct Null$Float32 {
	float value_;
	uint8_t has_;
};
typedef struct Null$Float32 Null$Float32;

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
