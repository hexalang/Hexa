#ifdef __cplusplus
extern "C" {
#endif

#if defined(HEXA_UNREACHABLE_PRESENT) && (HEXA_UNREACHABLE_PRESENT == 1)
	#ifdef _WIN32
		// TODO cache GetProcessHeap !
		// TODO should be part of hexa runtime
		static void HEXA_UNREACHABLE(uint32_t where) {
			unsigned long $_;
			HANDLE _ = GetStdHandle((DWORD)(uint32_t)(-11));
			WriteFile(_, "UNREACHABLE", 11, &$_, nullptr);
			FlushFileBuffers(_);
			ExitProcess(where);
		}
	#else
		// TODO
	#endif
#endif

#ifdef __cplusplus
}
#endif
