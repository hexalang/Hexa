// Based on https://www.codeproject.com/Articles/1253835/The-Structure-of-import-Library-File-lib

#include <Windows.h>
#include <stdio.h>
#include <time.h>

//..........................................................................................

#define ARCHITECTURE_X86				0x14C

#define ARCHITECTURE_X64				0x8664

#define PREDEFINED_SYMBOLS_COUNT		3

#define free(ptr) {}

//..........................................................................................

struct FILE_INFO
{
	char *pFileName;
	HANDLE Handle;
	UCHAR *pAddress;
	DWORD MaxSize;
	DWORD Offset;
};

struct SYMBOL_INFO
{
	SYMBOL_INFO *pNext;
	char *pSymbolName;
	DWORD SymbolNameLength;
	DWORD OffsetIndex;
	union
	{
		DWORD Hint;
		DWORD Ordinal;
		DWORD Value;
	};
	DWORD Type;
};

enum CALLING_CONVENTION
{
	CALLING_CONVENTION_UNDECORATED,
	CALLING_CONVENTION_CDECL,
	CALLING_CONVENTION_STDCALL,
	CALLING_CONVENTION_FASTCALL,
	CALLING_CONVENTION_VECTORCALL
};

enum IMPORT_TYPE
{
	IMPORT_BY_ORDINAL,			// requires .def file
	IMPORT_BY_SPECIFIED_NAME,	// requires .def file
	IMPORT_BY_DECORATED_NAME	// does not require .def file
};

struct INFO_ALL
{
	FILE_INFO *pFileInfo;
	SYMBOL_INFO *pSymbolList;
	DWORD SymbolCount;
	DWORD FunctionCount;
	DWORD Architecture;
	DWORD *pOffsets;
	LONGLONG Id;
	char *pModuleName;
	DWORD ModuleNameLength;
	char *pHeaderName;
	DWORD HeaderNameLength;
	BOOLEAN bHeaderName;
	BOOLEAN bX64;
};

//..........................................................................................

#pragma pack(1)

struct FILE_HEADER							// size = 0x3C
{
	char Part1[16];
	char Id[24];
	char Part3[8];
	char BodyLength[10];
	char Part5[2];
};

struct DATA_DESCRIPTOR						// size = 0x14
{
	WORD Architecture;
	WORD a;
	DWORD Id;
	DWORD Length;
	DWORD b;
	DWORD Flags;
};

struct SECTION_DESCRIPTOR_LONG				// size = 0x28
{
	char SectionName[16];
	DWORD Length;
	DWORD Offset;
	DWORD AOffset;
	DWORD a;
	DWORD ACount;
	DWORD b;
};

struct DATA_ENTRY							// size = 0xA
{
	DWORD a;
	DWORD b;
	WORD c;
};

struct SECTION_DESCRIPTOR_SHORT				// size = 0x12
{
	union
	{
		char SectionName[8];
		struct
		{
			DWORD a;
			DWORD Offset;
		};
	};
	DWORD b;
	DWORD c;
	WORD Type;
};

struct SYMBOL_DESCRIPTOR					// size = 0x14
{
	WORD a;
	WORD b;
	WORD c;
	WORD Architecture;
	DWORD Id;
	DWORD Length;
	union
	{
		WORD Hint;
		WORD Ordinal;
		WORD Value;
	};
	WORD Type;
};

//..........................................................................................

DWORD SwapBytes(DWORD Value);
char* CopyString(char *pString, DWORD *pLength);
char* CopyString2(char *pString, char *pString2, DWORD *pLength);
SYMBOL_INFO** GetSymbolInfoArray0(SYMBOL_INFO *pSymbolList);
SYMBOL_INFO** GetSymbolInfoArray1(SYMBOL_INFO *pSymbolList);
SYMBOL_INFO** GetSymbolInfoArray2(SYMBOL_INFO *pSymbolList);
SYMBOL_INFO** GetSymbolInfoArray3(SYMBOL_INFO *pSymbolList);
SYMBOL_INFO** GetSymbolInfoArray4(SYMBOL_INFO *pSymbolList);
SYMBOL_INFO** GetSymbolInfoArray5(SYMBOL_INFO *pSymbolList);
void AddFunction(SYMBOL_INFO *pSymbolList, char *pFunctionName, DWORD Value, DWORD ArgListSizeInBytes, CALLING_CONVENTION CallingConvention, IMPORT_TYPE ImportType);
SYMBOL_INFO* CreateSymbolList(char *pName);
void DestroySymbolList(SYMBOL_INFO *pSymbolList);
FILE_INFO* CreateMappedFile(char *pFileName, DWORD MaxSize);
void DestroyMappedFile(FILE_INFO *pFileInfo);
void WriteMappedFile(FILE_INFO *pFileInfo, UCHAR *pData, DWORD Length);
DWORD GetMappedFileOffset(FILE_INFO *pFileInfo);
DWORD SeekMappedFile(FILE_INFO *pFileInfo, DWORD Offset, DWORD Mode);
void WriteImportLibrary(char *pName, char *pExt, SYMBOL_INFO *pSymbolList);
void WriteImportLibrary1();
void WriteImportLibrary2();
void WriteImportLibrary3();
void WriteImportLibrary4();
void WriteImportLibrary5();
void WriteImportLibrary6();
void WriteImportLibraryFunction(SYMBOL_INFO *pSymbolInfo);
void WriteFileHeader(FILE_INFO *pFileInfo, char *pString, BOOLEAN b, LONGLONG Id, DWORD a, DWORD BodyLength);
char* UnDecorateFunction(char *pFunctionName, DWORD *pLength);
char* DecorateCdeclFunction(char *pFunctionName, DWORD *pLength);
char* DecorateStdCallFunction(char *pFunctionName, DWORD ArgListSizeInBytes, DWORD *pLength);
char* DecorateFastCallFunction(char *pFunctionName, DWORD ArgListSizeInBytes, DWORD *pLength);
char* DecorateVectorCallFunction(char *pFunctionName, DWORD ArgListSizeInBytes, DWORD *pLength);
void ProcessFunction(SYMBOL_INFO *pSymbolInfo, char *pFunctionName, DWORD Value, DWORD ArgListSizeInBytes, CALLING_CONVENTION CallingConvention, IMPORT_TYPE ImportType);

//..........................................................................................

INFO_ALL g_InfoAll;

UCHAR g_Data0[12] = { 0x02, 0x00, 0x00, 0x00, 0x34, 0x00, 0x09, 0x00, 0x00, 0x00, 0x00, 0x00 };

UCHAR g_Data1[41] = { 0x27, 0x00, 0x13, 0x10, 0x07, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
					  0x0C, 0x00, 0x00, 0x00, 0x0D, 0x52, 0x12, 0x4D, 0x69, 0x63, 0x72, 0x6F, 0x73, 0x6F, 0x66, 0x74,
					  0x20, 0x28, 0x52, 0x29, 0x20, 0x4C, 0x49, 0x4E, 0x4B };

UCHAR g_Data2[20] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };

//..........................................................................................

char* CopyString(char *pString, DWORD *pLength)
{
	DWORD StringLength;
	char *pCopyString;

	StringLength = strlen(pString);

	pCopyString = (char*)malloc(StringLength + 1);

	strcpy(pCopyString, pString);

	*pLength = StringLength;

	return pCopyString;
}

char* CopyString2(char *pString, char *pString2, DWORD *pLength)
{
	DWORD StringLength;
	char *pCopyString;

	StringLength = strlen(pString) + strlen(pString2);

	pCopyString = (char*)malloc(StringLength + 1);

	strcpy(pCopyString, pString);
	strcat(pCopyString, pString2);

	*pLength = StringLength;

	return pCopyString;
}

SYMBOL_INFO** GetSymbolInfoArray5(SYMBOL_INFO *pSymbolList)
{
	SYMBOL_INFO **pSymbolInfoArray, *pSymbolInfo;

	pSymbolInfoArray = (SYMBOL_INFO**)malloc(g_InfoAll.FunctionCount * sizeof(SYMBOL_INFO*));

	pSymbolInfo = pSymbolList;

	for (DWORD i = 0; i < PREDEFINED_SYMBOLS_COUNT; ++i)
	{
		pSymbolInfo = pSymbolInfo->pNext;
	}

	for (DWORD i = 0; i < g_InfoAll.FunctionCount; ++i)
	{
		pSymbolInfoArray[i] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext->pNext;
	}

	return pSymbolInfoArray;
}

SYMBOL_INFO** GetSymbolInfoArray4(SYMBOL_INFO *pSymbolList)
{
	SYMBOL_INFO **pSymbolInfoArray;

	pSymbolInfoArray = (SYMBOL_INFO**)malloc(sizeof(SYMBOL_INFO*));

	pSymbolInfoArray[0] = pSymbolList->pNext->pNext;

	return pSymbolInfoArray;
}

SYMBOL_INFO** GetSymbolInfoArray3(SYMBOL_INFO *pSymbolList)
{
	SYMBOL_INFO **pSymbolInfoArray;

	pSymbolInfoArray = (SYMBOL_INFO**)malloc(sizeof(SYMBOL_INFO*));

	pSymbolInfoArray[0] = pSymbolList->pNext;

	return pSymbolInfoArray;
}

SYMBOL_INFO** GetSymbolInfoArray2(SYMBOL_INFO *pSymbolList)
{
	SYMBOL_INFO **pSymbolInfoArray, *pSymbolInfo;

	pSymbolInfoArray = (SYMBOL_INFO**)malloc(PREDEFINED_SYMBOLS_COUNT * sizeof(SYMBOL_INFO*));

	pSymbolInfo = pSymbolList;

	for (DWORD i = 0; i < PREDEFINED_SYMBOLS_COUNT; ++i)
	{
		pSymbolInfoArray[i] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext;
	}

	return pSymbolInfoArray;
}

SYMBOL_INFO** GetSymbolInfoArray1(SYMBOL_INFO *pSymbolList)
{
	DWORD j;
	SYMBOL_INFO **pSymbolInfoArray, *pSymbolInfo;

	pSymbolInfoArray = (SYMBOL_INFO**)malloc(g_InfoAll.SymbolCount * sizeof(SYMBOL_INFO*));

	pSymbolInfo = pSymbolList;

	for (DWORD i = 0; i < PREDEFINED_SYMBOLS_COUNT - 1; ++i)
	{
		pSymbolInfoArray[i] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext;
	}

	pSymbolInfoArray[g_InfoAll.SymbolCount - 1] = pSymbolInfo;

	pSymbolInfo = pSymbolInfo->pNext;

	j = PREDEFINED_SYMBOLS_COUNT - 1;

	for (DWORD i = 0; i < g_InfoAll.FunctionCount; ++i)
	{
		pSymbolInfoArray[j + g_InfoAll.FunctionCount] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext;

		pSymbolInfoArray[j] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext;

		++j;
	}

	return pSymbolInfoArray;
}

SYMBOL_INFO** GetSymbolInfoArray0(SYMBOL_INFO *pSymbolList)
{
	DWORD j;
	SYMBOL_INFO **pSymbolInfoArray, *pSymbolInfo;

	pSymbolInfoArray = (SYMBOL_INFO**)malloc(g_InfoAll.SymbolCount * sizeof(SYMBOL_INFO*));

	pSymbolInfo = pSymbolList;

	for (DWORD i = 0; i < PREDEFINED_SYMBOLS_COUNT; ++i)
	{
		pSymbolInfoArray[i] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext;
	}

	j = PREDEFINED_SYMBOLS_COUNT;

	for (DWORD i = 0; i < g_InfoAll.FunctionCount; ++i)
	{
		pSymbolInfoArray[j + 1] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext;

		pSymbolInfoArray[j] = pSymbolInfo;

		pSymbolInfo = pSymbolInfo->pNext;

		j += 2;
	}

	return pSymbolInfoArray;
}

char* UnDecorateFunction(char *pFunctionName, DWORD *pLength)
{
	DWORD Length;
	char *pDecoratedFunctionName;

	// Original: Length = strlen(pFunctionName) + 1;
	Length = strlen(pFunctionName) + 0;
	// Original: pDecoratedFunctionName = (char*)malloc(Length + 1);
	pDecoratedFunctionName = (char*)malloc(Length + 0);

	strcpy(pDecoratedFunctionName, "");
	strcat(pDecoratedFunctionName, pFunctionName);

	*pLength = Length;
	return pDecoratedFunctionName;
}

char* DecorateCdeclFunction(char *pFunctionName, DWORD *pLength)
{
	DWORD Length;
	char *pDecoratedFunctionName;

	Length = strlen(pFunctionName) + 1;
	pDecoratedFunctionName = (char*)malloc(Length + 1);

	strcpy(pDecoratedFunctionName, "_");
	strcat(pDecoratedFunctionName, pFunctionName);

	*pLength = Length;
	return pDecoratedFunctionName;
}

char* DecorateStdCallFunction(char *pFunctionName, DWORD ArgListSizeInBytes, DWORD *pLength)
{
	DWORD Length;
	char Buffer[20];
	char *pDecoratedFunctionName;

	sprintf(Buffer, "%d", ArgListSizeInBytes);

	Length = strlen(pFunctionName) + strlen(Buffer) + 2;
	pDecoratedFunctionName = (char*)malloc(Length + 1);

	strcpy(pDecoratedFunctionName, "_");
	strcat(pDecoratedFunctionName, pFunctionName);
	strcat(pDecoratedFunctionName, "@");
	strcat(pDecoratedFunctionName, Buffer);

	*pLength = Length;
	return pDecoratedFunctionName;
}

char* DecorateFastCallFunction(char *pFunctionName, DWORD ArgListSizeInBytes, DWORD *pLength)
{
	DWORD Length;
	char Buffer[20];
	char *pDecoratedFunctionName;

	sprintf(Buffer, "%d", ArgListSizeInBytes);

	Length = strlen(pFunctionName) + strlen(Buffer) + 2;
	pDecoratedFunctionName = (char*)malloc(Length + 1);

	strcpy(pDecoratedFunctionName, "@");
	strcat(pDecoratedFunctionName, pFunctionName);
	strcat(pDecoratedFunctionName, "@");
	strcat(pDecoratedFunctionName, Buffer);

	*pLength = Length;
	return pDecoratedFunctionName;
}

char* DecorateVectorCallFunction(char *pFunctionName, DWORD ArgListSizeInBytes, DWORD *pLength)
{
	DWORD Length;
	char Buffer[20];
	char *pDecoratedFunctionName;

	sprintf(Buffer, "%d", ArgListSizeInBytes);

	Length = strlen(pFunctionName) + strlen(Buffer) + 2;
	pDecoratedFunctionName = (char*)malloc(Length + 1);

	strcpy(pDecoratedFunctionName, pFunctionName);
	strcat(pDecoratedFunctionName, "@@");
	strcat(pDecoratedFunctionName, Buffer);

	*pLength = Length;
	return pDecoratedFunctionName;
}

void ProcessFunction(SYMBOL_INFO *pSymbolInfo, char *pFunctionName, DWORD Value, DWORD ArgListSizeInBytes, CALLING_CONVENTION CallingConvention, IMPORT_TYPE ImportType)
{
	if (g_InfoAll.bX64)
	{
		if (CallingConvention == CALLING_CONVENTION_VECTORCALL)
		{
			pSymbolInfo->pSymbolName = DecorateVectorCallFunction(pFunctionName, ArgListSizeInBytes, &pSymbolInfo->SymbolNameLength);
		}
		else
		{
			pSymbolInfo->pSymbolName = CopyString(pFunctionName, &pSymbolInfo->SymbolNameLength);
		}

		switch (ImportType)
		{
		case IMPORT_BY_ORDINAL:
			pSymbolInfo->Ordinal = Value;
			pSymbolInfo->Type = 0;
			break;
		case IMPORT_BY_SPECIFIED_NAME:
			pSymbolInfo->Hint = Value;
			if (CallingConvention == CALLING_CONVENTION_VECTORCALL) pSymbolInfo->Type = 0xC;
			else pSymbolInfo->Type = 4;
			break;
		case IMPORT_BY_DECORATED_NAME:
			pSymbolInfo->Hint = Value;
			pSymbolInfo->Type = 4;
			break;
		}
	}
	else
	{
		switch (CallingConvention)
		{
		case CALLING_CONVENTION_UNDECORATED:
			pSymbolInfo->pSymbolName = UnDecorateFunction(pFunctionName, &pSymbolInfo->SymbolNameLength);
			break;
		case CALLING_CONVENTION_CDECL:
			pSymbolInfo->pSymbolName = DecorateCdeclFunction(pFunctionName, &pSymbolInfo->SymbolNameLength);
			break;
		case CALLING_CONVENTION_STDCALL:
			pSymbolInfo->pSymbolName = DecorateStdCallFunction(pFunctionName, ArgListSizeInBytes, &pSymbolInfo->SymbolNameLength);
			break;
		case CALLING_CONVENTION_FASTCALL:
			pSymbolInfo->pSymbolName = DecorateFastCallFunction(pFunctionName, ArgListSizeInBytes, &pSymbolInfo->SymbolNameLength);
			break;
		case CALLING_CONVENTION_VECTORCALL:
			pSymbolInfo->pSymbolName = DecorateVectorCallFunction(pFunctionName, ArgListSizeInBytes, &pSymbolInfo->SymbolNameLength);
			break;
		}

		switch (ImportType)
		{
		case IMPORT_BY_ORDINAL:
			pSymbolInfo->Ordinal = Value;
			pSymbolInfo->Type = 0;
			break;
		case IMPORT_BY_SPECIFIED_NAME:
			pSymbolInfo->Hint = Value;
			if (CallingConvention == CALLING_CONVENTION_CDECL) pSymbolInfo->Type = 8;
			else pSymbolInfo->Type = 0xC;
			break;
		case IMPORT_BY_DECORATED_NAME:
			pSymbolInfo->Hint = Value;
			if (CallingConvention == CALLING_CONVENTION_CDECL) pSymbolInfo->Type = 8;
			else pSymbolInfo->Type = 4;
			break;
		}
	}
}

void AddFunction(SYMBOL_INFO *pSymbolList, char *pFunctionName, DWORD Value, DWORD ArgListSizeInBytes, CALLING_CONVENTION CallingConvention, IMPORT_TYPE ImportType)
{
	SYMBOL_INFO *pSymbolInfo;

	pSymbolInfo = pSymbolList;

	while (pSymbolInfo->pNext) pSymbolInfo = pSymbolInfo->pNext;

	pSymbolInfo->pNext = (SYMBOL_INFO*)malloc(sizeof(SYMBOL_INFO));
	pSymbolInfo = pSymbolInfo->pNext;

	ProcessFunction(pSymbolInfo, pFunctionName, Value, ArgListSizeInBytes, CallingConvention, ImportType);
	pSymbolInfo->OffsetIndex = PREDEFINED_SYMBOLS_COUNT + g_InfoAll.FunctionCount;

	pFunctionName = pSymbolInfo->pSymbolName;

	pSymbolInfo->pNext = (SYMBOL_INFO*)malloc(sizeof(SYMBOL_INFO));
	pSymbolInfo = pSymbolInfo->pNext;

	pSymbolInfo->pSymbolName = CopyString2("__imp_", pFunctionName, &pSymbolInfo->SymbolNameLength);
	pSymbolInfo->OffsetIndex = PREDEFINED_SYMBOLS_COUNT + g_InfoAll.FunctionCount;
	pSymbolInfo->Value = 0;
	pSymbolInfo->Type = 0;

	pSymbolInfo->pNext = NULL;

	++(g_InfoAll.FunctionCount);
}

SYMBOL_INFO* CreateSymbolList(char *pName)
{
	char Buffer[200];
	SYMBOL_INFO *pSymbolList, *pSymbolInfo;

	strcpy(Buffer, "__IMPORT_DESCRIPTOR_");
	strcat(Buffer, pName);

	pSymbolList = (SYMBOL_INFO*)malloc(sizeof(SYMBOL_INFO));
	pSymbolInfo = pSymbolList;

	pSymbolInfo->pSymbolName = CopyString(Buffer, &pSymbolInfo->SymbolNameLength);
	pSymbolInfo->OffsetIndex = 0;
	pSymbolInfo->Value = 0;
	pSymbolInfo->Type = 0;

	strcpy(Buffer, "__NULL_IMPORT_DESCRIPTOR");

	pSymbolInfo->pNext = (SYMBOL_INFO*)malloc(sizeof(SYMBOL_INFO));
	pSymbolInfo = pSymbolInfo->pNext;

	pSymbolInfo->pSymbolName = CopyString(Buffer, &pSymbolInfo->SymbolNameLength);
	pSymbolInfo->OffsetIndex = 1;
	pSymbolInfo->Value = 0;
	pSymbolInfo->Type = 0;

	strcpy(Buffer, "\x7F");
	strcat(Buffer, pName);
	strcat(Buffer, "_NULL_THUNK_DATA");

	pSymbolInfo->pNext = (SYMBOL_INFO*)malloc(sizeof(SYMBOL_INFO));
	pSymbolInfo = pSymbolInfo->pNext;

	pSymbolInfo->pSymbolName = CopyString(Buffer, &pSymbolInfo->SymbolNameLength);
	pSymbolInfo->OffsetIndex = 2;
	pSymbolInfo->Value = 0;
	pSymbolInfo->Type = 0;

	pSymbolInfo->pNext = NULL;

	g_InfoAll.FunctionCount = 0;

	return pSymbolList;
}

void DestroySymbolList(SYMBOL_INFO *pSymbolList)
{
	SYMBOL_INFO *pSymbolInfo = pSymbolList, *pSymbolInfoNext;

	while (pSymbolInfo)
	{
		pSymbolInfoNext = pSymbolInfo->pNext;

		free(pSymbolInfo->pSymbolName);
		free(pSymbolInfo);

		pSymbolInfo = pSymbolInfoNext;
	}
}

FILE_INFO* CreateMappedFile(char *pFileName, DWORD MaxSize)
{
	FILE_INFO *pFileInfo;
	HANDLE MappingHandle;
	DWORD FileNameLength;

	pFileInfo = (FILE_INFO*)malloc(sizeof(FILE_INFO));

	pFileInfo->pFileName = CopyString(pFileName, &FileNameLength);

	pFileInfo->Handle = CreateFileA(pFileName, 0xC0000000, 0, NULL, 2, 0x80, NULL);

	MappingHandle = CreateFileMappingW(pFileInfo->Handle, NULL, 4, 0, MaxSize, NULL);

	pFileInfo->pAddress = (UCHAR*)VirtualAlloc(NULL, MaxSize, 0x102000, 4);

	VirtualFree(pFileInfo->pAddress, 0, 0x8000);

	MapViewOfFileEx(MappingHandle, 0xF001F, 0, 0, MaxSize, pFileInfo->pAddress);

	CloseHandle(MappingHandle);

	pFileInfo->MaxSize = MaxSize;
	pFileInfo->Offset = 0;

	return pFileInfo;
}

void DestroyMappedFile(FILE_INFO *pFileInfo)
{
	UnmapViewOfFile(pFileInfo->pAddress);

	SetFilePointer(pFileInfo->Handle, pFileInfo->Offset, NULL, 0);

	SetEndOfFile(pFileInfo->Handle);

	CloseHandle(pFileInfo->Handle);

	free(pFileInfo->pFileName);

	free(pFileInfo);
}

void WriteMappedFile(FILE_INFO *pFileInfo, UCHAR *pData, DWORD Length)
{
	memcpy(pFileInfo->pAddress + pFileInfo->Offset, pData, Length);

	pFileInfo->Offset += Length;
}

DWORD GetMappedFileOffset(FILE_INFO *pFileInfo)
{
	return pFileInfo->Offset;
}

DWORD SeekMappedFile(FILE_INFO *pFileInfo, DWORD Offset, DWORD Mode)
{
	DWORD PrevOffset = pFileInfo->Offset;

	if (Mode == 0) pFileInfo->Offset = Offset;
	else pFileInfo->Offset += Offset;

	return PrevOffset;
}

void WriteImportLibrary(char *pLibName, char *pName, char *pExt, SYMBOL_INFO *pSymbolList)
{
	DWORD *pOffsets;
	FILE_INFO *pFileInfo;
	//char *pLibName, *pModuleName, *pHeaderName;
	char *pModuleName, *pHeaderName;
	DWORD LibNameLength, ModuleNameLength, HeaderNameLength;
	DWORD OffsetCount;
	BOOLEAN bHeaderName;

	OffsetCount = 2 + PREDEFINED_SYMBOLS_COUNT + g_InfoAll.FunctionCount;
	pOffsets = (DWORD*)malloc(OffsetCount * sizeof(DWORD));

	//pLibName = CopyString2(pName, ".lib", &LibNameLength);
	pModuleName = CopyString2(pName, pExt, &ModuleNameLength);

	if ((ModuleNameLength + 1) > 0x10)
	{
		pHeaderName = CopyString("0", &HeaderNameLength);
		bHeaderName = TRUE;
	}
	else
	{
		pHeaderName = CopyString(pModuleName, &HeaderNameLength);
		bHeaderName = FALSE;
	}

	pFileInfo = CreateMappedFile(pLibName, 0x100000);

	g_InfoAll.pFileInfo = pFileInfo;
	g_InfoAll.pSymbolList = pSymbolList;
	g_InfoAll.SymbolCount = PREDEFINED_SYMBOLS_COUNT + (g_InfoAll.FunctionCount * 2);

	if (g_InfoAll.bX64) g_InfoAll.Architecture = ARCHITECTURE_X64;
	else g_InfoAll.Architecture = ARCHITECTURE_X86;

	g_InfoAll.pOffsets = pOffsets;
	g_InfoAll.Id = _time64(NULL);
	g_InfoAll.pModuleName = pModuleName;
	g_InfoAll.ModuleNameLength = ModuleNameLength;
	g_InfoAll.pHeaderName = pHeaderName;
	g_InfoAll.HeaderNameLength = HeaderNameLength;
	g_InfoAll.bHeaderName = bHeaderName;

	WriteMappedFile(pFileInfo, (UCHAR*)"!<arch>\n", 8);

	WriteImportLibrary1();
	WriteImportLibrary2();
	WriteImportLibrary3();
	WriteImportLibrary4();
	WriteImportLibrary5();
	WriteImportLibrary6();

	free(pOffsets);
	//free(pLibName);
	free(pModuleName);
	free(pHeaderName);

	DestroyMappedFile(pFileInfo);
}

void WriteImportLibrary1()
{
	FILE_INFO *pFileInfo;
	DWORD Offset, Offset2;
	DWORD SymbolCount;
	SYMBOL_INFO **pSymbolInfoArray;
	DWORD Length;

	pFileInfo = g_InfoAll.pFileInfo;

	//............................................................................................
	// FILE 1
	//............................................................................................

	Offset = GetMappedFileOffset(pFileInfo);
	g_InfoAll.pOffsets[0] = Offset;

	SeekMappedFile(pFileInfo, sizeof(FILE_HEADER), 1);

	SymbolCount = SwapBytes(g_InfoAll.SymbolCount);

	WriteMappedFile(pFileInfo, (UCHAR*)&SymbolCount, sizeof(SymbolCount));

	SymbolCount = g_InfoAll.SymbolCount;

	SeekMappedFile(pFileInfo, SymbolCount * sizeof(DWORD), 1);

	pSymbolInfoArray = GetSymbolInfoArray0(g_InfoAll.pSymbolList);

	for (DWORD i = 0; i < SymbolCount; ++i)
	{
		WriteMappedFile(pFileInfo, (UCHAR*)pSymbolInfoArray[i]->pSymbolName, pSymbolInfoArray[i]->SymbolNameLength + 1);
	}

	free(pSymbolInfoArray);

	Offset2 = GetMappedFileOffset(pFileInfo);

	SeekMappedFile(pFileInfo, Offset, 0);

	WriteFileHeader(pFileInfo, "", FALSE, g_InfoAll.Id, 0, Offset2 - (Offset + sizeof(FILE_HEADER)));

	SeekMappedFile(pFileInfo, Offset2, 0);

	if (Offset2 & 1) WriteMappedFile(pFileInfo, (UCHAR*)"\n", 1);

	//............................................................................................
	// FILE 2
	//............................................................................................

	Offset = GetMappedFileOffset(pFileInfo);
	g_InfoAll.pOffsets[1] = Offset;

	SeekMappedFile(pFileInfo, sizeof(FILE_HEADER), 1);

	SymbolCount = PREDEFINED_SYMBOLS_COUNT + g_InfoAll.FunctionCount;

	WriteMappedFile(pFileInfo, (UCHAR*)&SymbolCount, sizeof(SymbolCount));

	SeekMappedFile(pFileInfo, SymbolCount * sizeof(DWORD), 1);

	SymbolCount = g_InfoAll.SymbolCount;

	WriteMappedFile(pFileInfo, (UCHAR*)&SymbolCount, sizeof(SymbolCount));

	SeekMappedFile(pFileInfo, SymbolCount * sizeof(WORD), 1);

	pSymbolInfoArray = GetSymbolInfoArray1(g_InfoAll.pSymbolList);

	for (DWORD i = 0; i < SymbolCount; ++i)
	{
		WriteMappedFile(pFileInfo, (UCHAR*)pSymbolInfoArray[i]->pSymbolName, pSymbolInfoArray[i]->SymbolNameLength + 1);
	}

	free(pSymbolInfoArray);

	Offset2 = GetMappedFileOffset(pFileInfo);

	SeekMappedFile(pFileInfo, Offset, 0);

	WriteFileHeader(pFileInfo, "", FALSE, g_InfoAll.Id, 0, Offset2 - (Offset + sizeof(FILE_HEADER)));

	SeekMappedFile(pFileInfo, Offset2, 0);

	if (Offset2 & 1) WriteMappedFile(pFileInfo, (UCHAR*)"\n", 1);

	Length = g_InfoAll.ModuleNameLength + 1;

	if (Length > 0x10)
	{
		WriteFileHeader(pFileInfo, "/", FALSE, g_InfoAll.Id, 0, Length);

		WriteMappedFile(pFileInfo, (UCHAR*)g_InfoAll.pModuleName, Length);

		if (Length & 1) WriteMappedFile(pFileInfo, (UCHAR*)"\n", 1);
	}
}

void WriteImportLibrary2()
{
	FILE_INFO *pFileInfo;
	SYMBOL_INFO **pSymbolInfoArray;
	DWORD Offset, Offset2;
	DWORD Length, Offset3;
	DATA_DESCRIPTOR DataDescriptor;
	SECTION_DESCRIPTOR_LONG SectionDescriptorLong;
	DATA_ENTRY DataEntry;
	SECTION_DESCRIPTOR_SHORT SectionDescriptorShort;
	UCHAR ModuleNameLength;

	pFileInfo = g_InfoAll.pFileInfo;

	//....................................................................................
	// FILE
	//....................................................................................

	Offset = GetMappedFileOffset(pFileInfo);
	g_InfoAll.pOffsets[2] = Offset;

	SeekMappedFile(pFileInfo, sizeof(FILE_HEADER), 1);

	//....................................................................................
	// DATA DESCRIPTOR
	//....................................................................................

	ModuleNameLength = g_InfoAll.ModuleNameLength;
	Length = (sizeof(DATA_DESCRIPTOR) + (sizeof(SECTION_DESCRIPTOR_LONG) * 3)) +
		(sizeof(g_Data0) + sizeof(ModuleNameLength) + ModuleNameLength + sizeof(g_Data1)) +
		(sizeof(g_Data2) + (sizeof(DATA_ENTRY) * 3)) +
		(ModuleNameLength + 1);

	DataDescriptor.Architecture = g_InfoAll.Architecture;
	DataDescriptor.a = 3;
	DataDescriptor.Id = g_InfoAll.Id;
	DataDescriptor.Length = Length;
	DataDescriptor.b = 8;
	DataDescriptor.Flags = g_InfoAll.bX64 ? 0 : 0x1000000;

	WriteMappedFile(pFileInfo, (UCHAR*)&DataDescriptor, sizeof(DataDescriptor));

	//....................................................................................
	// DATA HEADER 1
	//....................................................................................

	Length = sizeof(g_Data0) + sizeof(ModuleNameLength) + ModuleNameLength + sizeof(g_Data1);
	Offset3 = sizeof(DATA_DESCRIPTOR) + (sizeof(SECTION_DESCRIPTOR_LONG) * 3);

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".debug$S");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.b = 0x42100040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA HEADER 2
	//....................................................................................

	Offset3 += Length;
	Length = sizeof(g_Data2);

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".idata$2");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.AOffset = Offset3 + Length;
	SectionDescriptorLong.ACount = 3;
	SectionDescriptorLong.b = 0xC0300040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA HEADER 3
	//....................................................................................

	Offset3 += Length + (sizeof(DATA_ENTRY) * 3);
	Length = ModuleNameLength + 1;

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".idata$6");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.b = 0xC0200040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA 1
	//....................................................................................

	WriteMappedFile(pFileInfo, g_Data0, sizeof(g_Data0));
	WriteMappedFile(pFileInfo, &ModuleNameLength, sizeof(ModuleNameLength));
	WriteMappedFile(pFileInfo, (UCHAR*)g_InfoAll.pModuleName, ModuleNameLength);
	WriteMappedFile(pFileInfo, g_Data1, sizeof(g_Data1));

	//....................................................................................
	// DATA 2
	//....................................................................................

	WriteMappedFile(pFileInfo, g_Data2, sizeof(g_Data2));

	DataEntry.a = 0xC;
	DataEntry.b = 3;
	DataEntry.c = g_InfoAll.bX64 ? 3 : 7;

	WriteMappedFile(pFileInfo, (UCHAR*)&DataEntry, sizeof(DataEntry));

	DataEntry.a = 0;
	DataEntry.b = 4;
	DataEntry.c = g_InfoAll.bX64 ? 3 : 7;

	WriteMappedFile(pFileInfo, (UCHAR*)&DataEntry, sizeof(DataEntry));

	DataEntry.a = 0x10;
	DataEntry.b = 5;
	DataEntry.c = g_InfoAll.bX64 ? 3 : 7;

	WriteMappedFile(pFileInfo, (UCHAR*)&DataEntry, sizeof(DataEntry));

	//....................................................................................
	// DATA 3
	//....................................................................................

	WriteMappedFile(pFileInfo, (UCHAR*)g_InfoAll.pModuleName, ModuleNameLength + 1);

	//....................................................................................

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	memcpy(SectionDescriptorShort.SectionName, "@comp.id", 8);
	SectionDescriptorShort.b = 0xDD520D;
	SectionDescriptorShort.c = 0xFFFF;
	SectionDescriptorShort.Type = 3;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	Offset3 = sizeof(Length);

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	SectionDescriptorShort.Offset = Offset3;
	SectionDescriptorShort.c = 2;
	SectionDescriptorShort.Type = 2;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	memcpy(SectionDescriptorShort.SectionName, ".idata$2", 8);
	SectionDescriptorShort.b = 0xC0000040;
	SectionDescriptorShort.c = 2;
	SectionDescriptorShort.Type = 0x68;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	memcpy(SectionDescriptorShort.SectionName, ".idata$6", 8);
	SectionDescriptorShort.b = 0;
	SectionDescriptorShort.c = 3;
	SectionDescriptorShort.Type = 3;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	memcpy(SectionDescriptorShort.SectionName, ".idata$4", 8);
	SectionDescriptorShort.b = 0xC0000040;
	SectionDescriptorShort.c = 0;
	SectionDescriptorShort.Type = 0x68;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	memcpy(SectionDescriptorShort.SectionName, ".idata$5", 8);
	SectionDescriptorShort.b = 0xC0000040;
	SectionDescriptorShort.c = 0;
	SectionDescriptorShort.Type = 0x68;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	pSymbolInfoArray = GetSymbolInfoArray2(g_InfoAll.pSymbolList);
	Offset3 += pSymbolInfoArray[0]->SymbolNameLength + 1;

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	SectionDescriptorShort.Offset = Offset3;
	SectionDescriptorShort.c = 0;
	SectionDescriptorShort.Type = 2;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	Offset3 += pSymbolInfoArray[1]->SymbolNameLength + 1;

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	SectionDescriptorShort.Offset = Offset3;
	SectionDescriptorShort.c = 0;
	SectionDescriptorShort.Type = 2;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	Offset3 += pSymbolInfoArray[2]->SymbolNameLength + 1;

	Length = Offset3;
	WriteMappedFile(pFileInfo, (UCHAR*)&Length, sizeof(Length));

	for (DWORD i = 0; i < PREDEFINED_SYMBOLS_COUNT; ++i)
	{
		WriteMappedFile(pFileInfo, (UCHAR*)pSymbolInfoArray[i]->pSymbolName, pSymbolInfoArray[i]->SymbolNameLength + 1);
	}

	free(pSymbolInfoArray);

	//....................................................................................

	Offset2 = GetMappedFileOffset(pFileInfo);

	SeekMappedFile(pFileInfo, Offset, 0);

	WriteFileHeader(pFileInfo, g_InfoAll.pHeaderName, g_InfoAll.bHeaderName, g_InfoAll.Id, 0, Offset2 - (Offset + sizeof(FILE_HEADER)));

	SeekMappedFile(pFileInfo, Offset2, 0);

	if (Offset2 & 1) WriteMappedFile(pFileInfo, (UCHAR*)"\n", 1);
}

void WriteImportLibrary3()
{
	FILE_INFO *pFileInfo;
	SYMBOL_INFO **pSymbolInfoArray;
	DWORD Offset, Offset2;
	DWORD Length, Offset3;
	DATA_DESCRIPTOR DataDescriptor;
	SECTION_DESCRIPTOR_LONG SectionDescriptorLong;
	SECTION_DESCRIPTOR_SHORT SectionDescriptorShort;
	UCHAR ModuleNameLength;

	pFileInfo = g_InfoAll.pFileInfo;

	//....................................................................................
	// FILE
	//....................................................................................

	Offset = GetMappedFileOffset(pFileInfo);
	g_InfoAll.pOffsets[3] = Offset;

	SeekMappedFile(pFileInfo, sizeof(FILE_HEADER), 1);

	//....................................................................................
	// DATA DESCRIPTOR
	//....................................................................................

	ModuleNameLength = g_InfoAll.ModuleNameLength;
	Length = (sizeof(DATA_DESCRIPTOR) + (sizeof(SECTION_DESCRIPTOR_LONG) * 2)) +
		(sizeof(g_Data0) + sizeof(ModuleNameLength) + ModuleNameLength + sizeof(g_Data1)) +
		(sizeof(g_Data2));

	DataDescriptor.Architecture = g_InfoAll.Architecture;
	DataDescriptor.a = 2;
	DataDescriptor.Id = g_InfoAll.Id;
	DataDescriptor.Length = Length;
	DataDescriptor.b = 2;
	DataDescriptor.Flags = g_InfoAll.bX64 ? 0 : 0x1000000;

	WriteMappedFile(pFileInfo, (UCHAR*)&DataDescriptor, sizeof(DataDescriptor));

	//....................................................................................
	// DATA HEADER 1
	//....................................................................................

	Length = sizeof(g_Data0) + sizeof(ModuleNameLength) + ModuleNameLength + sizeof(g_Data1);
	Offset3 = sizeof(DATA_DESCRIPTOR) + (sizeof(SECTION_DESCRIPTOR_LONG) * 2);

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".debug$S");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.b = 0x42100040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA HEADER 2
	//....................................................................................

	Offset3 += Length;
	Length = sizeof(g_Data2);

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".idata$3");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.b = 0xC0300040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA 1
	//....................................................................................

	WriteMappedFile(pFileInfo, g_Data0, sizeof(g_Data0));
	WriteMappedFile(pFileInfo, &ModuleNameLength, sizeof(ModuleNameLength));
	WriteMappedFile(pFileInfo, (UCHAR*)g_InfoAll.pModuleName, ModuleNameLength);
	WriteMappedFile(pFileInfo, g_Data1, sizeof(g_Data1));

	//....................................................................................
	// DATA 2
	//....................................................................................

	WriteMappedFile(pFileInfo, g_Data2, sizeof(g_Data2));

	//....................................................................................

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	memcpy(SectionDescriptorShort.SectionName, "@comp.id", 8);
	SectionDescriptorShort.b = 0xDD520D;
	SectionDescriptorShort.c = 0xFFFF;
	SectionDescriptorShort.Type = 3;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	Offset3 = sizeof(Length);

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	SectionDescriptorShort.Offset = Offset3;
	SectionDescriptorShort.c = 2;
	SectionDescriptorShort.Type = 2;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	pSymbolInfoArray = GetSymbolInfoArray3(g_InfoAll.pSymbolList);
	Length = Offset3 + (pSymbolInfoArray[0]->SymbolNameLength + 1);

	WriteMappedFile(pFileInfo, (UCHAR*)&Length, sizeof(Length));
	WriteMappedFile(pFileInfo, (UCHAR*)pSymbolInfoArray[0]->pSymbolName, pSymbolInfoArray[0]->SymbolNameLength + 1);

	free(pSymbolInfoArray);

	//....................................................................................

	Offset2 = GetMappedFileOffset(pFileInfo);

	SeekMappedFile(pFileInfo, Offset, 0);

	WriteFileHeader(pFileInfo, g_InfoAll.pHeaderName, g_InfoAll.bHeaderName, g_InfoAll.Id, 0, Offset2 - (Offset + sizeof(FILE_HEADER)));

	SeekMappedFile(pFileInfo, Offset2, 0);

	if (Offset2 & 1) WriteMappedFile(pFileInfo, (UCHAR*)"\n", 1);
}

void WriteImportLibrary4()
{
	FILE_INFO *pFileInfo;
	SYMBOL_INFO **pSymbolInfoArray;
	DWORD Offset, Offset2;
	DWORD Length, Offset3, Pad[2], PadLength;
	DATA_DESCRIPTOR DataDescriptor;
	SECTION_DESCRIPTOR_LONG SectionDescriptorLong;
	SECTION_DESCRIPTOR_SHORT SectionDescriptorShort;
	UCHAR ModuleNameLength;

	pFileInfo = g_InfoAll.pFileInfo;

	//....................................................................................
	// FILE
	//....................................................................................

	Offset = GetMappedFileOffset(pFileInfo);
	g_InfoAll.pOffsets[4] = Offset;

	SeekMappedFile(pFileInfo, sizeof(FILE_HEADER), 1);

	//....................................................................................
	// DATA DESCRIPTOR
	//....................................................................................

	ModuleNameLength = g_InfoAll.ModuleNameLength;

	if (g_InfoAll.bX64) PadLength = 8;
	else PadLength = 4;

	Pad[0] = 0;
	Pad[1] = 0;

	Length = (sizeof(DATA_DESCRIPTOR) + (sizeof(SECTION_DESCRIPTOR_LONG) * 3)) +
		(sizeof(g_Data0) + sizeof(ModuleNameLength) + ModuleNameLength + sizeof(g_Data1)) +
		PadLength +
		PadLength;

	DataDescriptor.Architecture = g_InfoAll.Architecture;
	DataDescriptor.a = 3;
	DataDescriptor.Id = g_InfoAll.Id;
	DataDescriptor.Length = Length;
	DataDescriptor.b = 2;
	DataDescriptor.Flags = g_InfoAll.bX64 ? 0 : 0x1000000;

	WriteMappedFile(pFileInfo, (UCHAR*)&DataDescriptor, sizeof(DataDescriptor));

	//....................................................................................
	// DATA HEADER 1
	//....................................................................................

	Length = sizeof(g_Data0) + sizeof(ModuleNameLength) + ModuleNameLength + sizeof(g_Data1);
	Offset3 = sizeof(DATA_DESCRIPTOR) + (sizeof(SECTION_DESCRIPTOR_LONG) * 3);

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".debug$S");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.b = 0x42100040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA HEADER 2
	//....................................................................................

	Offset3 += Length;
	Length = PadLength;

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".idata$5");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.b = g_InfoAll.bX64 ? 0xC0400040 : 0xC0300040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA HEADER 3
	//....................................................................................

	Offset3 += Length;
	Length = PadLength;

	memset(&SectionDescriptorLong, 0, sizeof(SectionDescriptorLong));
	strcpy(SectionDescriptorLong.SectionName, ".idata$4");
	SectionDescriptorLong.Length = Length;
	SectionDescriptorLong.Offset = Offset3;
	SectionDescriptorLong.b = g_InfoAll.bX64 ? 0xC0400040 : 0xC0300040;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorLong, sizeof(SectionDescriptorLong));

	//....................................................................................
	// DATA 1
	//....................................................................................

	WriteMappedFile(pFileInfo, g_Data0, sizeof(g_Data0));
	WriteMappedFile(pFileInfo, &ModuleNameLength, sizeof(ModuleNameLength));
	WriteMappedFile(pFileInfo, (UCHAR*)g_InfoAll.pModuleName, ModuleNameLength);
	WriteMappedFile(pFileInfo, g_Data1, sizeof(g_Data1));

	//....................................................................................
	// DATA 2
	//....................................................................................

	WriteMappedFile(pFileInfo, (UCHAR*)Pad, PadLength);

	//....................................................................................
	// DATA 3
	//....................................................................................

	WriteMappedFile(pFileInfo, (UCHAR*)Pad, PadLength);

	//....................................................................................

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	memcpy(SectionDescriptorShort.SectionName, "@comp.id", 8);
	SectionDescriptorShort.b = 0xDD520D;
	SectionDescriptorShort.c = 0xFFFF;
	SectionDescriptorShort.Type = 3;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	Offset3 = sizeof(Length);

	memset(&SectionDescriptorShort, 0, sizeof(SectionDescriptorShort));
	SectionDescriptorShort.Offset = Offset3;
	SectionDescriptorShort.c = 2;
	SectionDescriptorShort.Type = 2;

	WriteMappedFile(pFileInfo, (UCHAR*)&SectionDescriptorShort, sizeof(SectionDescriptorShort));

	//....................................................................................

	pSymbolInfoArray = GetSymbolInfoArray4(g_InfoAll.pSymbolList);
	Length = Offset3 + (pSymbolInfoArray[0]->SymbolNameLength + 1);

	WriteMappedFile(pFileInfo, (UCHAR*)&Length, sizeof(Length));
	WriteMappedFile(pFileInfo, (UCHAR*)pSymbolInfoArray[0]->pSymbolName, pSymbolInfoArray[0]->SymbolNameLength + 1);

	free(pSymbolInfoArray);

	//....................................................................................

	Offset2 = GetMappedFileOffset(pFileInfo);

	SeekMappedFile(pFileInfo, Offset, 0);

	WriteFileHeader(pFileInfo, g_InfoAll.pHeaderName, g_InfoAll.bHeaderName, g_InfoAll.Id, 0, Offset2 - (Offset + sizeof(FILE_HEADER)));

	SeekMappedFile(pFileInfo, Offset2, 0);

	if (Offset2 & 1) WriteMappedFile(pFileInfo, (UCHAR*)"\n", 1);
}

void WriteImportLibrary5()
{
	SYMBOL_INFO **pSymbolInfoArray;

	pSymbolInfoArray = GetSymbolInfoArray5(g_InfoAll.pSymbolList);

	for (DWORD i = 0; i < g_InfoAll.FunctionCount; ++i)
	{
		g_InfoAll.pOffsets[2 + PREDEFINED_SYMBOLS_COUNT + i] = GetMappedFileOffset(g_InfoAll.pFileInfo);

		WriteImportLibraryFunction(pSymbolInfoArray[i]);
	}

	free(pSymbolInfoArray);
}

DWORD SwapBytes(DWORD Value)
{
	DWORD SValue;
	SValue = Value & 0xFF;
	SValue = (SValue << 8) | ((Value >> 8) & 0xFF);
	SValue = (SValue << 8) | ((Value >> 16) & 0xFF);
	SValue = (SValue << 8) | ((Value >> 24) & 0xFF);
	return SValue;
}

void WriteImportLibrary6()
{
	WORD OffsetIndex;
	DWORD Offset, Offset2;
	FILE_INFO *pFileInfo;
	SYMBOL_INFO **pSymbolInfoArray;

	pFileInfo = g_InfoAll.pFileInfo;

	Offset = GetMappedFileOffset(pFileInfo);

	// emit offsets
	// {
	SeekMappedFile(pFileInfo, g_InfoAll.pOffsets[0] + sizeof(FILE_HEADER) + sizeof(DWORD), 0);

	pSymbolInfoArray = GetSymbolInfoArray0(g_InfoAll.pSymbolList);

	for (DWORD i = 0; i < g_InfoAll.SymbolCount; ++i)
	{
		Offset2 = g_InfoAll.pOffsets[2 + pSymbolInfoArray[i]->OffsetIndex];
		Offset2 = SwapBytes(Offset2);
		WriteMappedFile(pFileInfo, (UCHAR*)&Offset2, sizeof(DWORD));
	}

	free(pSymbolInfoArray);
	// }

	// emit offset table
	// {
	SeekMappedFile(pFileInfo, g_InfoAll.pOffsets[1] + sizeof(FILE_HEADER) + sizeof(DWORD), 0);

	for (DWORD i = 0; i < (PREDEFINED_SYMBOLS_COUNT + g_InfoAll.FunctionCount); ++i)
	{
		WriteMappedFile(pFileInfo, (UCHAR*)(g_InfoAll.pOffsets + (2 + i)), sizeof(DWORD));
	}
	// }

	// emit offset indexes
	// {
	SeekMappedFile(pFileInfo, sizeof(DWORD), 1);

	pSymbolInfoArray = GetSymbolInfoArray1(g_InfoAll.pSymbolList);

	for (DWORD i = 0; i < g_InfoAll.SymbolCount; ++i)
	{
		OffsetIndex = pSymbolInfoArray[i]->OffsetIndex + 1;

		WriteMappedFile(pFileInfo, (UCHAR*)&OffsetIndex, sizeof(OffsetIndex));
	}

	free(pSymbolInfoArray);
	// }

	SeekMappedFile(pFileInfo, Offset, 0);
}

void WriteImportLibraryFunction(SYMBOL_INFO *pSymbolInfo)
{
	DWORD Length;
	FILE_INFO *pFileInfo;
	SYMBOL_DESCRIPTOR SymbolDescriptor;

	pFileInfo = g_InfoAll.pFileInfo;

	//....................................................................................
	// FILE
	//....................................................................................

	Length = g_InfoAll.ModuleNameLength + pSymbolInfo->SymbolNameLength + 2;

	WriteFileHeader(pFileInfo, g_InfoAll.pHeaderName, g_InfoAll.bHeaderName, g_InfoAll.Id, 0, Length + sizeof(SymbolDescriptor));

	SymbolDescriptor.a = 0;
	SymbolDescriptor.b = 0xFFFF;
	SymbolDescriptor.c = 0;
	SymbolDescriptor.Architecture = g_InfoAll.Architecture;
	SymbolDescriptor.Id = g_InfoAll.Id;
	SymbolDescriptor.Length = Length;
	SymbolDescriptor.Value = pSymbolInfo->Value;
	SymbolDescriptor.Type = pSymbolInfo->Type;

	WriteMappedFile(pFileInfo, (UCHAR*)&SymbolDescriptor, sizeof(SymbolDescriptor));

	WriteMappedFile(pFileInfo, (UCHAR*)pSymbolInfo->pSymbolName, pSymbolInfo->SymbolNameLength + 1);

	WriteMappedFile(pFileInfo, (UCHAR*)g_InfoAll.pModuleName, g_InfoAll.ModuleNameLength + 1);

	if (GetMappedFileOffset(pFileInfo) & 1) WriteMappedFile(pFileInfo, (UCHAR*)"\n", 1);
}

void WriteFileHeader(FILE_INFO *pFileInfo, char *pString, BOOLEAN b, LONGLONG Id, DWORD a, DWORD BodyLength)
{
	FILE_HEADER FileHeader;
	DWORD StringLength = 0;

	StringLength = strlen(pString);

	if (!b)
	{
		memcpy(FileHeader.Part1, pString, StringLength);
		FileHeader.Part1[StringLength] = 0x2F;
	}
	else
	{
		FileHeader.Part1[0] = 0x2F;
		memcpy(FileHeader.Part1 + 1, pString, StringLength);
	}

	++StringLength;
	memset(FileHeader.Part1 + StringLength, ' ', sizeof(FileHeader.Part1) - StringLength);

	sprintf(FileHeader.Id, "%-12I64d", Id);
	StringLength = 12;
	memset(FileHeader.Id + StringLength, ' ', sizeof(FileHeader.Id) - StringLength);

	sprintf(FileHeader.Part3, "%-8ho", a);

	sprintf(FileHeader.BodyLength, "%-10d", BodyLength);

	FileHeader.Part5[0] = 0x60;
	FileHeader.Part5[1] = 0xA;

	WriteMappedFile(pFileInfo, (UCHAR*)&FileHeader, sizeof(FILE_HEADER));
}

int main(int argc, char* argv[])
{
	char *pName;
	char *fileName;
	SYMBOL_INFO *pSymbolList;

	if (argc < 5) {
		printf("Not enough arguments: 64/32 dllname filename.lib funcname1 funcname2 etc\n");
		fflush(0);
		exit(123);
	}

	g_InfoAll.bX64 = TRUE;
	if (argv[1][0] == '3') {
		g_InfoAll.bX64 = FALSE;
	}

	pName = "long_dll_name_long_dll_name_long_dll_name";
	pName = argv[2];
	fileName = argv[3];

	pSymbolList = CreateSymbolList(pName);

	int i = 4;
	while (i < argc) {
		AddFunction(pSymbolList, argv[i], 0, 0, CALLING_CONVENTION_UNDECORATED, IMPORT_BY_DECORATED_NAME);
		// TODO add verbose mode
		// printf("AddFunction %s\n", argv[i]);
		i++;
	}

	fflush(0);
	//AddFunction(pSymbolList, "function100", 0, 0, CALLING_CONVENTION_STDCALL, IMPORT_BY_DECORATED_NAME);
	//AddFunction(pSymbolList, "fibonacci_index", 0, 0, CALLING_CONVENTION_STDCALL, IMPORT_BY_DECORATED_NAME);

	WriteImportLibrary(fileName, pName, ".dll", pSymbolList);
	fflush(0);

	//DestroySymbolList(pSymbolList);

	return 0;
}
