@echo off
call "%ProgramFiles(x86)%\Microsoft Visual Studio\2019\BuildTools\VC\Auxiliary\Build\vcvars64.bat"
cl main.cpp /Felibgen.exe /Os /INCREMENTAL:NO /nologo
