#include <stdint.h>
#include <stdarg.h>
#include <stdio.h> // printf
#include <stdlib.h> // malloc
extern "C" {
	// Runtime code is under MIT license
	// Forward
	class class_;
	class String_;
	class Array_;
	class Map_;
	#define Any_ class_
	// Data

	// Types
	class class_ {
		public:
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
	// End of runtime code under MIT license
}
