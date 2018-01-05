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

	//
	// Helpers
	//

	// Parses `input` into AST and stringifies, checks by trimmed `test`
	static function shouldEqual(input:String, test:String) {
		test = test.deepTrim();
		shouldEqualWithoutTrim(input, test);
	}

	// Same as `shouldEqual`, but does no trimming of `test`
	static function shouldEqualWithoutTrim(input:String, test:String) {
		test = "TBlock([" + test + "])";
		var lexe = Lexer.tokenize(Buffer.from(input), "TEST");
		var parser = new Parser(lexe);
		var res = stringify(parser.result);
		if (test != res) {
			throw 'TestParser test fail: `$input` != `$test`\nwas parsed: `$res`';
		}
	}

	// Operates `shouldEqual` on all key-vallue pairs of `input => test`
	static function shouldAllEqual(map: Map<String, String>) {
		for (input in map.keys()) {
			var test = map.get(input);
			shouldEqual(input, test);
	    }
	}

	// Does `shouldEqual` without triming `=> test` parts
	static function shouldAllEqualWithoutTrim(map: Map<String, String>) {
		for (input in map.keys()) {
			var test = map.get(input);
			shouldEqualWithoutTrim(input, test);
	    }
	}

	// Removes all internal and trailing whitespace and newlines
	static function deepTrim(s:String) {
		return s.replace('\n', '').replace('\r', '').replace('\t', '').replace(' ', '');
	}

	// Creates a testable consistent string representation of node
	static function stringify(node: Node): String {
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
		case TIs(expr, type): 'TAs(' + expr.stringify() + "," + type.stringifyType() + ")";
		case TAs(expr, kind, type): 'TAs(' + expr.stringify() + "," + kind.stringify() + "," + type.stringifyType() + ")";
		case TBinop(op, a, b): 'TBinop(' + op.stringify() + ',' + a.stringify() + ',' + b.stringify() + ')';
		case TBlock(els): 'TBlock(' + els.stringifyNodeArray() + ')';
		case TVar(name, t, expr, const):
		'TVar($name,' + ((t != null) ? t.stringifyType() : "null") +
		"," + ((expr != null) ? expr.stringify() : "null") +',$const)';
		case TVars(vars): 'TVars(' + vars.stringifyNodeArray() + ")";

		case TFunction(name, expr, vars, rettype):
			'TFunction($name,' + expr.stringify() + "," + vars.stringifyNodeArray() + ',' + ((rettype != null) ? rettype.stringifyType() : "null") + ")";

		case TCall(e, el, argNames):
			var res = 'TCall(' + e.stringify() + ',[';
			for (i in 0...el.length) {
				res += argNames[i] == null ? "" : argNames[i] + ":";
				res += el[i] + ((i != el.length - 1) ? "," : "");
			}
			res + "])";

		case TParenthesis(e): 'TParenthesis(' + e.stringify() + ')';
		case TReturn(e): 'TReturn(' + e.stringify() + ')';
		case TThrow(e): 'TThrow(' + e.stringify() + ')';
		case TEnum(t, els): 'TEnum(' + t + ',' + els.stringifyNodeArray() + ')';
		case TUsing(a): 'TUsing(' + a.join(',') + ")";
		case TModule(paths, els):
			"TModule(" + paths.join('.') + "," + els.stringifyNodeArray() + ")";

		case TClass(type, extend, implement, fields, external):
			var res = "TClass(" + type.stringifyType() + ",";
			res += extend != null ? extend.stringifyType() : "null" + ",";
			res += implement.stringifyNodeTypeArray() + ",";
			res += fields.stringifyNodeArray() + ",";
			res += external;
			res;

		case TNew(t, args, names, values):
			'TNew(' + t.stringifyType() + ',[' + names.join(",") + "]," + values.stringifyNodeArray() + ")";

		case NodeTypeValue(type): 'NodeTypeValue(' + type.stringifyType() + ")";
		case TDot(l, r): "TDot(" + l.stringify() + "," + r + ")";

		case e: '<!--' + e + '-->';
		}
	}

	static function stringifyNodeArray(arr: Array<Node>) {
		return "[" + [for (e in arr) e.stringify()].join(',') + "]";
	}

	static function stringifyNodeTypeArray(arr: Array<NodeType>) {
		return "[" + [for (e in arr) e.stringifyType()].join(',') + "]";
	}

	// Creates a testable consistent string representation of type
	static function stringifyType(node: NodeType): String {
		return switch (node) {
		case Type(s): 'Type($s)';
		case ParamentricType(name, params): 'ParamentricType($name,[' + params.join(',') + "])";
		case Function(args, rettype): 'Function(['+[for (e in args) e.stringifyType()].join(',')+"],"+rettype.stringifyType()+ ')';
		case Object(names, types): 'Object(['+ names.join(',') +"],["+ [for (e in types) e.stringifyType()].join(',') +"])";
		case e: '<!--' + e + '-->';
		}
	}

}
