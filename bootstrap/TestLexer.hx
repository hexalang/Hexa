// The Hexa Compiler
// Copyright (C) 2018  Oleg Petrenko
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

import Token;
import Lexer;
import NodeJs;

using TestLexer;

class TestLexer {
	public static function test() {
		trace("TestLexer begin");
		Lexer.init();

		// Empty (whitespace, comments)
		compare("", [], []);
		compare("\n", [], []);
		compare("\n\n", [], []);
		compare("\r\r\n\r\n\r\t", [], []);
		compare(" ", [], []);
		compare("  ", [], []);
		compare("	", [], []);
		compare("		", [], []);
		compare("	 	", [], []);

		// Int
		compare("123", [LInt], ["123"]);
		compare(" 0 ", [LInt], ["0"]);
		compare("0", [LInt], ["0"]);
		compare("1 2 3", [LInt, LInt, LInt], ["1", "2", "3"]);
		compare("0x1", [LInt], ["0x1"]);
		compare("0x0", [LInt], ["0x0"]);
		compare("0xF", [LInt], ["0xF"]);
		compare("0xFA", [LInt], ["0xFA"]);
		compare("0xFABCDEF", [LInt], ["0xFABCDEF"]);
		compare("0x1F2A3B4C5D6E7F0", [LInt], ["0x1F2A3B4C5D6E7F0"]);

		// Float
		compare("0.123", [LFloat], ["0.123"]);
		compare("0.0", [LFloat], ["0.0"]);

		// String
		compare("'s'", [LString], ["s"]);
		compare("\"s\"", [LString], ["s"]);

		trace("TestLexer done");
	}

	// Token and value equality
	static function compare(
		input: String,
		expect: Array<Token>,
		expectValue: Array<String>,
		expectColumn: Array<Int> = null,
		expectLine: Array<Int> = null
	): Void {
		expect.push(Eof);
		var output = Lexer.tokenize(Buffer.from(input));//streamToArray(input);
		var pos = 0;
		for (ex in expect) {
			if (ex == Eof) break ;

			function incorrect(text: String) {
				var got = output.token[pos].stringify(output.value[pos]);
				trace('Incorrect token `$got` in string `$input` at index $pos');
				trace(text);
			}

			if (ex != output.token[pos]) {
				return incorrect('Expected `${ex.stringify()}`');
			}

			if (expectValue[pos] != output.value[pos]) {
				return incorrect('Expected value `${expectValue[pos]}` but got `${output.value[pos]}`');
			}
		}

	}
}
