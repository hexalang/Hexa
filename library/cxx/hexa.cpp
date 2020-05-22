// Include only basic language features
#include <stdint.h>
#include <stdarg.h>
#include <stdio.h> // printf
#include <stdlib.h> // malloc
#ifdef __cplusplus
#include <new> // Placement new
extern "C" {
#endif
	// Runtime code is under MIT license
	// Forward
	struct Unknown_;
	struct String_;
	struct Array_;
	struct Map_;
	#define Any_ Unknown_
	typedef long LONG;
	typedef unsigned long ULONG;
	typedef LONG HRESULT;
	typedef unsigned long DWORD;
	typedef unsigned short WORD;
	typedef unsigned char BYTE;
	typedef struct _GUID { DWORD Data1; WORD Data2; WORD Data3; BYTE Data4[8]; } _GUID;
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
	struct String_* String_fromUTF8z(const char* this_) {
		return (String_*)0;
	};
	struct String_* String_fromInt(const int32_t this_) {
		return (String_*)0;
	};
	struct String_* String__null_;
	struct String_* String_opAdd(struct Unknown_* a_, struct Unknown_* b_) {
		struct String_* sa_ = (a_ == (struct Unknown_*)0)? String__null_ : a_->toString_();
		struct String_* sb_ = (b_ == (struct Unknown_*)0)? String__null_ : b_->toString_();
		return String__null_;
	};
	struct Array_* Array_from(...) {
		return (struct Array_*)0;
	};
	// name, value, name, value
	struct Object_* Object_from(...) {
		return (struct Object_*)0;
	};
	// key, value, key, value
	struct Map_* Map_from(...) {
		return (struct Map_*)0;
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
	struct Any_* Bool_true;
	struct Any_* Bool_false; // So `==` works
	struct Any_* Any_fromBool(const uint8_t this_) {
		if (this_) return Bool_true;
		return Bool_false;
	}
	struct Any_* Any_fromInt(const int32_t this_) {
		return (struct Any_*)0;
	}
	// End of runtime code under MIT license
#ifdef __cplusplus
};
#endif
