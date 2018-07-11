nexe hexa.js --target win32-x86-9.8.0 --ico icon.ico --name hexa -o hexa
set ResourceHacker="ResourceHacker.exe"
@echo off
if exist %ResourceHacker% (
	echo Replacing icon...
	%ResourceHacker% -addoverwrite "hexa.exe", "hexa.exe", "icon.ico", ICONGROUP, MAINICON, 0
)
