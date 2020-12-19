@set HEXA=cmd /c "hexa.cmd"
@echo :: build the compiler ::
@%HEXA% hexa.json
@echo :: run single file ::
@%HEXA% test\lts\hello\main.hexa
@echo :: LTS ::
@%HEXA% test\lts\hello\hexa.json
@echo :: ALL DONE ::
@color
