// Include only basic language features
#include <stdint.h>
#include <stdarg.h>
#include <new> // Placement new

#ifndef HEXA_NO_DEFAULT_INCLUDES
	#include <stdio.h> // printf
	#include <stdlib.h> // malloc
	#include <string.h> // strlen
	#include <wchar.h>
#endif

#ifndef HEXA_MAIN
	#define HEXA_MAIN main
#endif

#ifndef HEXA_NEW
	#ifdef _WIN32
		// TODO cache GetProcessHeap
		#define HEXA_NEW(z) HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, z)
	#else
		#define HEXA_NEW(z) malloc(z)
	#endif
#endif

#ifndef HEXA_FREE
	#ifdef _WIN32
		#define HEXA_FREE(p, z) HeapFree(GetProcessHeap(), 0, p)
	#else
		#define HEXA_FREE(p, z) free(p)
	#endif
#endif

	// Runtime code is under MIT license
	// Forward
	struct Unknown_;
	struct String_;
	struct Array_;
	struct Map_;
	#define Any_ Unknown_
	typedef struct _GUID { uint8_t data[16]; } _GUID;
	typedef _GUID _IID;
	typedef _IID* _REFIID;
	#define __stdcall__
	// Types
	struct Unknown_ {
		// IUnknown interface
		virtual HRESULT __stdcall__ QueryInterface_(_REFIID riid, void **ppvObject);
		virtual ULONG __stdcall__ AddRef_();
		virtual ULONG __stdcall__ Release_();
		uint32_t rc_;
		// Reflection
		// Set field
		virtual Any_* var_(String_* name_, Any_* value_) { return (Any_*)0; };
		// Get field
		virtual Any_* let_(String_* name_) { return (Any_*)0; };
		virtual String_* toString_() { return (String_*)0; }; // TODO '[object Object]'
	};
	// Just {}, allows new fields adding via reflection
	struct Object_ : Unknown_ {};
	extern "C++" {
	template <typename T>
	// Only for basic types! DO *NOT* USE AS POINTER!!!
	struct null_ {
		T this_;
		bool nullptr_;
		bool operator == (std::nullptr_t) {
			return this->nullptr_ == true;
		};
		bool operator != (std::nullptr_t) {
			return this->nullptr_ != true;
		};
	};};
	// Functions
	String_* String_fromUTF8z(const char* this_) {
		return (String_*)0;
	};
	String_* String_fromInt(const int32_t this_) {
		return (String_*)0;
	};
		struct String_* sa_ = (a_ == (struct Unknown_*)0)? String__null_ : a_->toString_();
		struct String_* sb_ = (b_ == (struct Unknown_*)0)? String__null_ : b_->toString_();
	String_* String__null_;
	String_* String_opAdd(Unknown_* a_, Unknown_* b_) {
		return String__null_;
	};
	Array_* Array_from(...) {
		return (Array_*)0;
	};
	// name, value, name, value
	Object_* Object_from(...) {
		return (Object_*)0;
	};
	// key, value, key, value
	Map_* Map_from(...) {
		return (Map_*)0;
	};
	ULONG Unknown_::AddRef_() {
		return ++this->rc_;
	};
	ULONG Unknown_::Release_() {
		return --this->rc_;
	};
	HRESULT Unknown_::QueryInterface_(_REFIID riid, void **ppvObject) {
		return 0;
	};
	Any_* Bool_true;
	Any_* Bool_false; // So `==` works
	Any_* Any_fromBool(const uint8_t this_) {
		if (this_) return Bool_true;
		return Bool_false;
	}
	Any_* Any_fromInt(const int32_t this_) {
		return (Any_*)0;
	}
	// End of runtime code under MIT license

// wchar_t is UTF-16LE with -fshort-wchar
static_assert(sizeof(wchar_t) == 2, "bad sizeof");
