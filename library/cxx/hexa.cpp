#include <stdint.h>
#include <stdarg.h>
#include <stdio.h> // printf
#include <stdlib.h> // malloc
#include <new> // placement new
#ifdef __cplusplus
extern "C" {
#endif
#define $null ((void*)0)
	// Runtime code is under MIT license
	// Forward
	struct class_;
	struct String_;
	struct Array_;
	struct Map_;
	#define Any_ class_
	typedef long LONG;
	typedef unsigned long ULONG;
	typedef LONG HRESULT;
	typedef unsigned long DWORD;
	typedef unsigned short WORD;
	typedef unsigned char BYTE;
	typedef struct _GUID { DWORD Data1; WORD Data2; WORD Data3; BYTE Data4[8]; } GUID;
	typedef GUID IID;
	typedef IID* REFIID;
	#define __stdcall__
	// Data
	// Types
	struct class_ {
		// IUnknown interface
		virtual HRESULT __stdcall__ QueryInterface(REFIID riid, void **ppvObject);
		virtual ULONG __stdcall__ AddRef();
		virtual ULONG __stdcall__ Release();
		uint32_t rc_;
		// Reflection
		// Set field
		virtual Any_* var_(String_* name_, Any_* value_) { return (Any_*)0; };
		// Get field
		virtual Any_* let_(String_* name_) { return (Any_*)0; };
		virtual String_* toString_() { return (String_*)0; }; // TODO '[object Object]'
	};
	// Just {}, allows new fields adding via reflection
	struct Object_ : class_ {};
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
	String_* String__null_;
	String_* String_opAdd(class_* a_, class_* b_) {
		String_* sa_ = (a_ == nullptr)? String__null_ : a_->toString_();
		String_* sb_ = (b_ == nullptr)? String__null_ : b_->toString_();
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
	ULONG class_::AddRef() {
		return ++this->rc_;
	};
	ULONG class_::Release() {
		return --this->rc_;
	};
	HRESULT class_::QueryInterface(REFIID riid, void **ppvObject) {
		return 0;
	};
	Any_* Bool_true;
	Any_* Bool_false; // So `==` works
	Any_* Any_fromBool(const bool this_) {
		if (this_) return Bool_true;
		return Bool_false;
	}
	Any_* Any_fromInt(const int32_t this_) {
		return (Any_*)0;
	}
	// End of runtime code under MIT license
#ifdef __cplusplus
};
#endif
