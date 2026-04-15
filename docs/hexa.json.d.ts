/**
 * TypeScript definitions for Hexa project configuration (hexa.json)
 */

export interface HexaConfig {
	/** Schema URL for validation */
	$schema?: string;

	/** Project/package name */
	name: string;

	/** Semver compatible version */
	version: string;

	/** The root module/file to start compilation (omit .hexa extension) */
	entry: string;

	/** Project description */
	description?: string;

	/** Author name or contact info (email or username) */
	author?: string;

	/** Project license (SPDX format recommended: "MIT", "LGPL-3.0-only", etc.) */
	license?: string;

	/** List of build configurations */
	targets: Target[];

	/** Default target to build */
	defaultTarget?: string;

	/** LSP tries targets in order and uses the first one that provides type info for a selected code range.
	 * If none provides type info, it falls back to the "defaultTarget" target */
	languageServerTargets?: string[];

	/** Array of paths included in every build regardless of the entry graph.
	 * Files included in the compilation graph for every target */
	global?: string[];

	/** Directories where the compiler looks for source files (default: same as hexa.json location) */
	roots?: string[];

	/** Global preprocessor toggles (accessible in code via #if) */
	define?: Record<string, boolean>;

	/** Environment-specific defines used only for IDEs/Code Editors */
	defineForCodeEditor?: DefineProfile[];

	/** If true, the "license" text is injected as a comment header in output */
	addLicenseNoticeToOutput?: boolean;

	/** Maximum allowed lines per source file (linter constraint) */
	linesPerFileLimit?: number;

	/** Integer seed to ensure the compiler generates byte-for-byte identical output.
	 * Ensures deterministic/reproducible builds */
	randomSeed?: number;

	/** External dependency management */
	depends?: Dependency;

	/** Funding/Monetization */
	funding?: Funding[];

	/** For whole-package deprecation, it may appear at top level or affect all versions */
	deprecated?: string;
}

export interface Target {
	/** Target identifier (used in CLI via --target) */
	name: string;

	/** Output backend: "js" | "c" | "cpp" | "lua" */
	generator: "js" | "c" | "cpp" | "lua";

	/** Destination path for the compiled file */
	output: string;

	/** Generator-specific platform flags */
	options?: Record<string, any>;

	/** If true, creates a package.json alongside JS output */
	generatePackageJson?: boolean;

	/** Internal target dependencies used for linking */
	dependsTarget?: TargetDependency[];
}

export interface TargetDependency {
	/** Target alias (used in code via #target) */
	alias: string;

	/** Target name (used in code via #target) */
	target: string;
}

export interface DefineProfile {
	profile: string;
	define: Record<string, boolean>;
}

export interface Dependency {
	alias: string;
	name: string;
	target: string;
}

export interface Funding {
	type: "opencollective" | "github" | "patreon" | "individual" | string;
	url: string;
}
