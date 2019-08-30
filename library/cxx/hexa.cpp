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
		virtual ULONG   __stdcall__ AddRef();
		virtual ULONG   __stdcall__ Release();
		uint32_t rc_;
	};
	// Functions
	String_* String_fromUTF8z(const char* str) {
		return nullptr;
	};
	Array_* Array_from(...) {
		return nullptr;
	};
	Map_* Map_from(...) {
		return nullptr;
	};
	ULONG class_::AddRef() {
		return ++this->rc_;
	}
	ULONG class_::Release() {
		return --this->rc_;
	}
	HRESULT class_::QueryInterface(REFIID riid, void **ppvObject) {
		return 0;
	}
	// End of runtime code under MIT license
}
