# hexa.json Syntax Reference

Main configuration file for Hexa projects and the Hexa compiler.

Inline // comments explain aspects of each example. Always read them.

```js
// hexa.json Full configuration schema reference
{
	// [REQUIRED] Unique project identifier
	"name": "My Project",

	// [REQUIRED] SemVer compatible version string
	"version": "2023.7.2",

	// [REQUIRED] The root module/file to start compilation (omit .hexa extension)
	"entry": "cli",

	// Optional project description
	"description": "My super cool project",

	// Author name string or contact info
	"author": "Oleh (PeyTy)",

	// Project license (SPDX format recommended: "MIT", "LGPL-3.0-only", etc.)
	"license": "LGPL-3.0-only",

	// [REQUIRED FOR BUILD] List of backend configurations
	"targets": [
		{
			// Target identifier (used in CLI via --target)
			"name": "default",
			// Output backend: "js" | "c" | "cpp" | "lua"
			"generator": "js",
			// Destination path for the compiled code
			"output": "hexa-node.js",
			// Generator flags (e.g., "nodejs", "extraUnderscore", "no-main")
			"options": ["nodejs"],
			// If true, creates a package.json alongside JS output
			"generatePackageJson": true,
			// Internal target dependencies used for linking
			"dependsTarget": [{
				// Target alias (used in code via #target)
				"alias": "LIBN",
				// Target name (used in code via #target)
				"target": "windows"
			}]
		}
	],

	// Array of paths included in every build regardless of the entry graph
	"global": [
		"data/token",
		"compiler/lexer",
		"compiler/parser"
	],

	// Directories where the compiler looks for source files (default: ["source"])
	"roots": [
		"source",
		"vendor"
	],

	// Global preprocessor toggles (accessible in code via #if)
	"define": {
		"debug": false,
		"experimental": true,
		"imports": false
	},

	// Environment-specific defines used only for IDEs/Code Editors
	"defineForCodeEditor": [
		{
			"profile": "default",
			"define": {
				"editor": true,
				"editor-set-in-init": true
			}
		}
	],

	// If true, the "license" text is injected as a comment header in output
	"addLicenseNoticeToOutput": true,

	// Maximum allowed lines per source file (linter constraint)
	"linesPerFileLimit": 1000,

	// Integer seed to ensure the compiler generates byte-for-byte identical output
	"randomSeed": 1,

	// External dependency management
	"depends": {
		"alias": "LIBN",
		"name": "libname",
		"target": "windows"
	}
}
```

Happy Hexa hacking!
