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

using StringTools;

@:keep
/**
 * @author PeyTy
 **/
class Main {
	function new() {
		// Debug information
		untyped __js__("require('source-map-support').install()");
		trace("Hexa", " Alpha");

		// Self-test
		#if debug
		TestLexer.test();
		TestParser.test();
		#end

		if(Process.argv[2] == null) {
			trace("Usage: hexa project.json");
			Process.exit(1);
		}

		// Initialize compiler
		Lexer.init();

		// Get inputs
		var json: String = Path.resolve(Process.argv[2]);
		var input: { main: String, output: String, target:{} } =
		haxe.Json.parse(Fs.readFileSync(json).toString('utf8'));
		trace(input);

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

	static function main() new Main();
}
