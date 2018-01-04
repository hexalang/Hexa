// The Hexa Compiler
// Copyright (C) 2018  Oleg Petrenko
// Copyright (C) 2018  Bogdan Danylchenko
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

import NodeJs;
import Lexer;
import Parser;
import Typer;
import Data;

using StringTools;

@:enum
abstract Generator(String) {
  var JavaScript = "JavaScript";
  var C = "C";
  var Haxe = "Haxe";
}

typedef Target = {
	generator: Generator,
	instance: Dynamic
}

typedef Package = {
	name: String,
	version: String,
	description: String,
	main: String,
	author: String,
	license: String,
	target: Target,
	files: Array<String>
};

/**
 * @author PeyTy
 **/
class Main {
	function init() {
		var currentDirTmp = Process.argv[1].split(Path.sep);
		var packageFileName = currentDirTmp.splice(0, -1).join(Path.sep) + Path.sep + "hexa.json";
		var currentDir = currentDirTmp[currentDirTmp.length - 2];
		var name = Readline.question('Enter package name ($currentDir): ');
		if(name == "") name = currentDir;

		var version = Readline.question("Enter package version (1.0.0): ");
		if(version == "") version = "1.0.0";

		var description = Readline.question("Enter package description: ");

		var main = Readline.question("Enter main file (main.hexa): ");
		if(main == "") main = "main.hexa";

		var target: Target = { generator: Generator.JavaScript, instance: { generatePackageJson: false } };
		var generatorstr = Readline.question("Enter generator type (JavaScript):\n1. JavaScript\n2. C\n3. Haxe");
		if(generatorstr.toUpperCase() == "C" || generatorstr == "2") target.generator = Generator.C;
		else if(generatorstr.toUpperCase() == "HAXE" || generatorstr == "3") target.generator = Generator.Haxe;

		while(!(main.endsWith(".hexa"))) {
			Process.stdout.write("Wrong file name. Must ends with '.hexa'.\n");
			main = Readline.question("Enter main file (main.hexa): ");
		}

		var author = Readline.question("Enter package author name: ");
		var license = Readline.question("Enter license: ");

		var pack: Package = {
			name: name, version: version, description: description,
			main: main, author: author, license: license, target: target, files: []
		};
		var packageStr = haxe.Json.stringify(pack, null, "\t");
		var answ = Readline.question('About to write to: $packageFileName:\n$packageStr\nIs this ok? (yes)');
		if(answ != "") Process.exit(1);

		Fs.writeFileSync("hexa.json", packageStr);
		Process.stdout.write("Hexa package initialized!\n");
	}

	function processFile(target: String): Parser {
		var content = Fs.readFileSync(target);
		var tokens = Lexer.tokenize(content, target);
		var parser = new Parser(tokens);
		Typer.fillScopes(parser.allCode);
		return parser;
	}

	function new() {
		// Debug information
		untyped __js__("require('source-map-support').install()");
		trace("Hexa", " Alpha");

		// Self-test
		#if debug
		TestLexer.test();
		TestParser.test();
		#end

		// Usage examples
		if(Process.argv[2] == null) {
			trace("Usage: `node hexa.js project.json` or `node hexa.js init`");
			Process.exit(1);
		}
		else if(Process.argv[2] == "init") {
			init();
			Process.exit(0);
		}

		// Initialize compiler
		Lexer.init();

		// Get inputs
		var currentFile = Path.resolve(Process.argv[2]);
		var currentParsedFile: ParsedPath = Path.parse(currentFile);
		// Build the selected project
		if(currentParsedFile.ext == ".json") {
		}
		// Evaluate file directly
		else if(currentParsedFile.ext == ".hexa") {
			eval('"use strict"\r\n' + GenJs.stringify(processFile(currentFile).allCode));
			return;
		}

		// Perform compilation
		var target = Path.resolve(Process.argv[2] + '/../') + Path.sep + (input.main);
		trace(target);

		var content = Fs.readFileSync(target);
		var tokens = Lexer.tokenize(content);
		var parser = new Parser(tokens);

		trace('\n\n');

		Typer.fillScopes(Parser.allCode);

		// Perform Codegeneration
		if(input.output.endsWith('.js')) {
			var outs = '"use strict"\r\n' + GenJs.stringify(Parser.allCode);
			var target = Path.resolve(Process.argv[2] + '/../') + Path.sep + (input.output);
			Fs.writeFileSync(target, outs);
		} else {
			var outs = '' + GenC.stringifyMain(Parser.allCode, input.target);
			var target = Path.resolve(Process.argv[2] + '/../') + Path.sep + (input.output);
			Fs.writeFileSync(target, outs);
		}
	}

	static function eval(code) js.Lib.eval(code);

	static function main() new Main();
}
