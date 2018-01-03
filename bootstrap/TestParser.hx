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

import Data;
import Token;
import Lexer;
import Parser;
import NodeJs;

using TestParser;
using StringTools;

class TestParser {
	public static function test() {
		trace("TestParser begin");
		var input = '1 2 3 trace("Hello!", "World!") + 5 * 6 / 3';
		var test = 'TBlock([
				   TInt(1),
				   TInt(2),
				   TInt(3),
				   TBinop(+,
				   TCall(TIdent(trace),[TString(Hello!),TString(World!)]),
				   TBinop(*,TInt(5),TBinop(/,TInt(6),TInt(3))))
				   ])'.replace('\n', '').replace('\r', '').replace('\t', '').replace(' ', '');
		var lexe = Lexer.tokenize(Buffer.from(input));
		var parser = new Parser(lexe);
		if (test != stringify(parser.result)) throw "TestParser test fail";
		trace("TestParser done");
	}

	public static function stringify(node: Node): String {
		return switch (node) {

		// Have no sub-nodes
		case TString(s): 'TString($s)';
		case TIdent(s): 'TIdent($s)';
		case TBool(b): 'TBool($b)';
		case TThis: 'TThis';
		case TSuper: 'TSuper';
		case TInt(s): 'TInt($s)';
		case TFloat(s): 'TFloat($s)';
		case TNull: 'TNull';
		case TBreak: 'TBreak';
		case TContinue: 'TContinue';

		// Have sub-nodes
		case TBinop(op, a, b): 'TBinop(' + op.stringify() + ',' + a.stringify() + ',' + b.stringify() + ')';
		case TBlock(el): 'TBlock([' + [for (e in el) e.stringify()].join(',') + '])';
		case TCall(e, el): 'TCall(' + e.stringify() + ',[' + [for (e in el) e.stringify()].join(',') + '])';
		case TParenthesis(e): 'TParenthesis(' + e.stringify() + ')';
		case TReturn(e): 'TReturn(' + e.stringify() + ')';
		case TThrow(e): 'TThrow(' + e.stringify() + ')';
		case e: '<!--' + e + '-->';
		}
	}
}
