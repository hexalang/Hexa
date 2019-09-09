#include <stdint.h>
#include <stdarg.h>
#include <stdio.h> // printf
#include <stdlib.h> // malloc
#include <new> // placement new
extern "C" {
	// Runtime code is under MIT license
	// Forward
	class class_;
	class String_;
	class Array_;
	class Map_;
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
	class class_ {
		public:
		// IUnknown interface
		virtual HRESULT __stdcall__ QueryInterface(REFIID riid, void **ppvObject);
		virtual ULONG __stdcall__ AddRef();
		virtual ULONG __stdcall__ Release();
		uint32_t rc_;
		// Reflection
		// Set field
		virtual Any_* var_(String_* name_, Any_* value_) { return nullptr; };
		// Get field
		virtual Any_* let_(String_* name_) { return nullptr; };
		virtual String_* toString_() { return nullptr; };
	};
	// Just {:}, allows new fields adding via reflection
	class Object_ : public class_ {};
	extern "C++" {
	template <typename T>
	// Only for basic types! DO *NOT* USE AS POINTER!!!
	class null_ {
		public:
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
		return nullptr;
	};
	String_* String_fromInt(const int32_t this_) {
		return nullptr;
	};
	String_* String__null_;
	String_* String_opAdd(class_* a_, class_* b_) {
		String_* sa_ = (a_ == nullptr)? String__null_ : a_->toString_();
		String_* sb_ = (b_ == nullptr)? String__null_ : b_->toString_();
		return String__null_;
	};
	Array_* Array_from(...) {
		return nullptr;
	};
	// name, value, name, value
	Object_* Object_from(...) {
		return nullptr;
	};
	// key, value, key, value
	Map_* Map_from(...) {
		return nullptr;
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
		return nullptr;
	}
	// End of runtime code under MIT license
};
