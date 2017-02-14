// The Hexa Compiler
// Copyright (C) 2017  Oleg Petrenko
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

class Parser {
	public function new(lexe: Tokens) {
		lex = lexe;

		var el = [];
		while (i < lex.length && tok() != Eof) {
			el.push(parseExpr());
		}
		result = TBlock(el);
		if (atts.length > 0) {
			untyped process.stdout.write('\n');
			throw "Not all attributes conceived";
		}
	}

	function parseFields() {
		var fields = [];
		while (tok() != BrClose) {
			// TODO switch (let tk = tok()) {
			switch (tok()) {
			case At: parseExpr();
			case KPrivate:
				i++;//parseExpr(); // TODO before-after!
			case KStatic: i++;
			case KVar, KFunction: fields.push(parseExpr());
			case KNew:
				i++;
				step(POpen);
				while (tok() != PClose) {
					step(LIdent);
					if (tok() == DblDot) {
						i++;
						parseType();
					}
					if (tok() == OpAssign) {
						i++;
						parseExpr();
					}
					if (tok() == Comma) i++;
				}
				step(PClose);
				if (tok() != BrClose)
					parseExpr();
			case _:
				trace('\nerr ' + Lexer.str(tok()));
				throw 'KClass';
			}
		}
		return fields;
	}

	//------------------
	//       DATA
	//------------------

	// Lexemes input directly from lexer
	// TODO wrap result into enum
	@readonly public var result: Node = null;
	var lex: Tokens;
	var atts: Array < { name: String, values: Array<Node> } > = [];
	// The pointer
	var i = 0;
	var lasttok = -1;
	var lasttokchecks = 10;

	//------------------
	//     HELPERS
	//------------------

	// Current token
	function tok() {
		if (i > lex.length) {
			trace("Parser is out of token space!");
			trace("This should NOT happen.");
			trace("Please, issue a developer (with a code sample).");
			throw "Parser Internal Error: Out of token space";
		}
		var t = lex.tokens[i];
		if (lasttok != i) {
			lasttok = i; lasttokchecks = 40;
		} else {
			lasttokchecks--;
			if (lasttokchecks < 0) {
				throw "Parser Internal Error: Same token parsed too many times: " + '`${print()}`';
			}
		}
		return t;
	}

	function print() return Lexer.print(lex, i);

	function expect(t) if (t != tok()) expected(Lexer.str(t));

	function getgo(t) : String {
		expect(t);
		return lex.params[i++];
	}

	function step(t) : Void {
		expect(t);
		i++;
	}

	//------------
	//   ERRORS
	//------------

	function unexpected() {
		var token = Lexer.print(lex, i);
		var pos = 0;
		var line = 0;
		var file = "frontend/Parser.hexa";
		trace(
			'$file:$line: characters $pos-${token.length + pos} : Unexpected `$token`'
		);
		throw 5;
	}

	function expected(str : String) {
		var token = Lexer.print(lex, i);
		var pos = 0;
		var line = 0;
		var file = "frontend/Parser.hexa";
		trace(
			'$file:$line: characters $pos-${token.length + pos} : Expected `$str` before `$token`'
		);
		throw 4;
	}

	//-----------------
	//   EXPRESSIONS
	//-----------------

	function parseExpr(): Node {
		//untyped process.stdout.write(' [');
		while (tok() == At) parseAttribute();
		if (tok() == KPrivate) i++; // TODO
		if (tok() == KExtern) i++;
		if (tok() == KPrivate) i++;
		if (tok() == KStatic) i++;
		var node = tok();

		//-------------
		// PREFIX STEP
		//-------------
		var result: Node =
		switch (node) {
		//case At:
		//	parseAttribute();

		case BrOpen:
			i++;
			if (tok() == BrClose) { // Empty block
				i++;
				TBlock([]);
			} else if (tok() == DblDot) { // Empty object
				i++;
				step(BrClose);
				TObject([], []);
				// TODO [], [] => null, null? speedup! less memory!
			} else if (tok() == LIdent && lex.tokens[i + 1] == DblDot) { // Object
				var names: Array<String> = [], el: Array<Node> = [];
				while (tok() != BrClose) {
					names.push(getgo(LIdent));
					step(DblDot);
					el.push(parseExpr());
					if (tok() == Comma) i++;
				}
				step(BrClose);
				TObject(names, el);
			} else
				// Block
			{
				var el = [];
				while (tok() != BrClose) {
					el.push(parseExpr());
				}
				step(BrClose);
				TBlock(el);
			}
		//if (tok() != BrClose)
		//{ // Not closed permamently
		//	var exprs: Array<Node> = [];
		//	while (tok() != BrClose) {
		//		exprs.push(parseExpr() });
		//		if (tok() == Semicolon) i++;
		//	}
		//	step(BrClose);
		//	result = TBlock(exprs);
		//} else {
		//	step(BrClose);
		//	result = TBlock([]);
		//}
		case KIf:
			i++;
			step(POpen);
			var econd = parseExpr();
			step(PClose);
			var eif = parseExpr();
			var eelse: Null<Node> = null;
			if (tok() == KElse) {
				i++;
				eelse = parseExpr();
			}
			TIf(econd, eif, eelse);
		case KWhile:
			i++;
			step(POpen);
			var econd = parseExpr();
			step(PClose);
			var e = parseExpr();
			TWhile(econd, e, true);
		case KDo:
			i++;
			var e = parseExpr();
			step(KWhile);
			step(POpen);
			var econd = parseExpr();
			step(PClose);
			TWhile(econd, e, false);
		case POpen:
			i++;
			var expr = parseExpr();
			step(PClose);
			TParenthesis(expr);
		case KReturn: i++;
			var expr = parseExpr();
			TReturn(expr);
		case KThrow: i++; TThrow(parseExpr());
		case KContinue: i++; TContinue;
		case KBreak: i++; TBreak;
		case OpNegBits: i++; TUnop(OpNegBits, false, parseExpr());
		case OpSub: i++; TUnop(OpSub, false, parseExpr());
		case OpNot: i++; TUnop(OpNot, false, parseExpr());
		case OpIncrement: i++; TUnop(OpIncrement, false, parseExpr());
		case OpDecrement: i++; TUnop(OpDecrement, false, parseExpr());
		case LFloat: TFloat(getgo(LFloat));
		case LInt: TInt(getgo(LInt));
		case LIdent: TIdent(getgo(LIdent));
		case LString: TString(getgo(LString));
		case KTrue:  i++; TBool(true); // TODO CTrue
		case KFalse: i++; TBool(false);
		case KThis: i++; TThis; // TODO rename to TThis
		case KNull:  i++; TNull;
		case KSuper:  i++; TSuper;

		case KVar, KLet:
			i++;
			var name = getgo(LIdent);
			var expr = null;
			while (tok() == Dot) {
				i++;
				step(LIdent);
			}
			// Enum extractor
			if (tok() == POpen) {
				// TODO to function parseCase
				while (tok() != PClose) {
					i++;
				}
				step(PClose);
				step(OpAssign);
				parseExpr();
				return null;
			}
			var t = null;
			if (tok() == DblDot) {
				i++;
				t = parseType();
			}
			if (tok() == OpAssign) {
				i++;
				parseExpr();
			}
			TVar(name, t, expr);

		case KTry:
			i++;
			var expr = parseExpr();
			var vars = [];
			var t = [];
			var catches = [];
			while (tok() == KCatch) {
				step(KCatch);
				step(POpen);
				//while (tok() != PClose) {
				vars.push(getgo(LIdent));
				//if (tok() == DblDot)
				step(DblDot);
				{
					//i++;
					t.push(parseType());
				}
				//if (tok() == OpAssign) {
				//	i++;
				//	parseExpr();
				//}
				//if (tok() == Comma) i++;
				//}
				step(PClose);
				catches.push(parseExpr());
			}
			TTry(expr, vars, t, catches);

		case KPackage:
			i++;
			var path = [getgo(LIdent)];
			while (tok() == Dot) {
				i++;
				path.push(getgo(LIdent));
			}
			step(BrOpen);
			var el = [];
			while (tok() != BrClose) {
				el.push(parseExpr());
			}
			step(BrClose);
			TModule(path, el);

		case KEnum:
			i++;
			//var name = getgo(LIdent);
			//if (tok() == OpLt) {
			//	i++;
			//	step(LIdent);//parseType();
			//	while (tok() == Comma) {
			//		i++;
			//		step(LIdent);//parseType();
			//	}
			//	//while (tok() != OpGt && tok() == Comma) {
			//	//	i++;
			//	//	parseType();
			//	//	//if (tok() == Comma) i++; // TODO [a,b,]
			//	//}
			//	step(OpGt);
			//}
			var t = parseType();
			var names = [];
			step(BrOpen);
			while (tok() != BrClose) {
				while (tok() == At) parseAttribute();
				var name = getgo(LIdent);
				if (tok() == POpen) {
					step(POpen);
					while (tok() != PClose) {
						step(LIdent);
						if (tok() == DblDot) {
							i++;
							parseType();
						}
						//if (tok() == OpAssign) {
						//	i++;
						//	parseExpr();
						//}
						if (tok() == Comma) i++;
					}
					step(PClose);
				}
				names.push(name);
			}
			step(BrClose);
			TEnum(t, names);

		// TODO rename to Talias?
		case KType:
			i++;
			var name = getgo(LIdent);
			if (tok() == OpLt) {
				i++;
				step(LIdent);//parseType();
				while (tok() == Comma) {
					i++;
					step(LIdent);//parseType();
				}
				//while (tok() != OpGt && tok() == Comma) {
				//	i++;
				//	parseType();
				//	//if (tok() == Comma) i++; // TODO [a,b,]
				//}
				step(OpGt);
			}
			if (tok() == OpAssign) {
				step(OpAssign);
				//parseType();
				TType(name, parseType());
			} else { // TODO remove me
				step(DblDot);
				parseType();
				step(BrOpen);
				parseFields();
				step(BrClose);
				TType(name, null);
			}

		case KClass, KInterface:
			// if tok KInterface ...
			i++;
			//var name = getgo(LIdent);
//
			//if (tok() == OpLt) {
			//	i++;
			//	step(LIdent);//parseType();
			//	while (tok() == Comma) {
			//		i++;
			//		step(LIdent);//parseType();
			//	}
			//	//while (tok() != OpGt && tok() == Comma) {
			//	//	i++;
			//	//	parseType();
			//	//	//if (tok() == Comma) i++; // TODO [a,b,]
			//	//}
			//	step(OpGt);
			//}
			var t = parseType();

			var ext = if (tok() == KExtends) {
				i++;
				parseType();
			} else null;

			var impl = [];
			while (tok() == KImplements) {
				i++;
				impl.push(parseType());
			}

			step(BrOpen);
			var fields = parseFields();
			step(BrClose);
			// TODO return coz no postfix op?
			TClass(/*name*/t, ext, impl, fields);

		case KFunction:
			i++;
			var expr = null;
			var name = null;
			var vars = [];
			var types = [];
			var values = [];
			if (tok() == LIdent) name = getgo(LIdent);
			if (tok() == POpen) {
				i++;
				while (tok() != PClose) {
					var expr = null;
					var t = null;
					var name = getgo(LIdent);
					if (tok() == DblDot) {
						i++;
						t = parseType();
					}
					if (tok() == OpAssign) {
						i++;
						expr = parseExpr();
					}
					vars.push(name);
					types.push(t);
					values.push(expr);
					if (tok() == Comma) i++;
				}
				step(PClose);
			}
			if (tok() == DblDot) {
				i++;
				parseType();
			}
			//if (tok() != BrClose)
			//	parseExpr();
			switch (tok()) {
			case BrClose, KStatic, KNew, KPrivate: {}
			case _: expr = parseExpr();
			}
			TFunction(name, expr, vars, types, values);

		//case Dot:
		//	i++;
		//	// TODO .<T>
		//	step(LIdent);

		case BkOpen:
			i++;
			var el = [];
			while (tok() != BkClose) {
				el.push(parseExpr());
				if (tok() == Comma) i++; // TODO [a,b,]
			}
			step(BkClose);
			TArray(el);
		//if(tok() != POpen) {
		//	i++;
		//	while (tok() != PClose) {
		//		parseExpr();
		//		if (tok() == Semicolon) i++;
		//	}
		//	step(PClose);
		//}

		// --
		//case KPrivate:
		// --

		//case KExtern: i++;
		//case KPrivate: i++;
		//case KStatic: i++;

		case KNew:
			i++;
			//var name = getgo(LIdent);
			//if (tok() == OpLt) {
			//	i++;
			//	parseType();
			//	while (tok() == Comma) {
			//		i++;
			//		parseType();
			//	}
			//	//while (tok() != OpGt && tok() == Comma) {
			//	//	i++;
			//	//	parseType();
			//	//	//if (tok() == Comma) i++; // TODO [a,b,]
			//	//}
			//	step(OpGt);
			//}

			var t = parseType();
			step(POpen);
			var el = [];
			while (tok() != PClose) {
				el.push(parseExpr());
				if (tok() == Comma) i++; // TODO [a,b,]
			}
			step(PClose);
			TNew(t, el);

		case KSwitch:
			i++;
			step(POpen);
			var exprs = [];
			while (tok() != PClose) {
				exprs.push(parseExpr());
				if (tok() == Comma) i++;
				/*
				if (tok() == Comma) {i++; continue ;}
				break;
				to make: (a,b,,) -> (a,b)
				*/
			}
			step(PClose);
			step(BrOpen);

			var cases = [];

			while (tok() != BrClose) {
				step(KCase);
				while (tok() != DblDot) {
					if (tok() == Underscore) {
						i++;
					} else parseExpr();
					if (tok() == Comma) i++;
				}
				step(DblDot);
				cases.push(parseExpr());
			}

			step(BrClose);
			TSwitch(exprs, cases);

		case _: unexpected(); null;
		}

		if (result == null) {
			untyped process.stdout.write('\n');
			throw "Expression is incomplete";
		}

		//--------------
		// POSTFIX STEP
		//--------------
		var done = false; // TODO [i]
		while (!done) {
			result = switch (tok()) {
			case BkOpen: // []
				i++;
				//while (tok() != BkClose) {
				//	parseExpr();
				//	if (tok() == Comma) i++;
				//}
				var index = parseExpr();
				step(BkClose);
				TIndex(result, index);
			case KAs:
				i++;
				var kind = tok(); // as? as!
				if (tok() == OpNot) i++;
				else if (tok() == Question) i++;
				TAs(result, kind, parseType());
			case POpen: { // call
				var args : Array<Node> = [];
				i++;
				while (tok() != PClose) {
					args.push(parseExpr());
					if (tok() == Comma) i++;
				}
				step(PClose);
				TCall(result, args);
			}
			case OpIncrement: i++; TUnop(OpIncrement, true, result);
			// TODO done?
			// TODO increment of a[i]++
			case OpDecrement: i++; TUnop(OpDecrement, true, result);
			case Dot: i++;
				var name = getgo(LIdent);
				TDot(result, name);
			case Question: i++;
				var eif = parseExpr();
				step(DblDot);
				var eelse = parseExpr();
				TIf(result, eif, eelse);
			case t if (isBinop(t)):
				i++;
				if (tok() == OpAssign) {
					i++;
				}

				var b = parseExpr();
				var a = result;
				switch (b) {
				case TBinop(op, aa, bb):
					var tp = precedence(t);
					var tLeft = tp > 99;
					tp = tp % 100;
					var bp = precedence(op);
					var bLeft = bp > 99;
					bp = bp % 100;
					if (bp > tp)
						TBinop(op, TBinop(t, result, aa), bb);
					else
						TBinop(t, result, b);

				case _: TBinop(t, result, b);
				}
			case _: done = true; result;
			}
		}
		if (result == null) {
			untyped process.stdout.write('\n');
			throw "Expression postfix is incomplete";
		}
		while (atts.length > 0) {
			var meta = atts.pop();
			result = TMeta(meta.name, meta.values, result);
		}
		return result;
	}

	function parseAttribute() {
		i++;
		var name = getgo(LIdent);
		var values = [];
		if (tok() == POpen) {
			i++;
			while (tok() != PClose) {
				values.push(parseExpr());
				if (tok() == Comma) i++;
			}
			step(PClose);
		}
		atts.push({ name: name, values: values });
	}

	function parseType(): NodeType {
		// TODO parse meta
		var result =
		switch (tok()) {
		case LIdent:
			var name = getgo(LIdent);
			//var result = Type(getgo(LIdent));
			// TODO: parsing <T> to function
			var result = if (tok() == OpLt) {
				i++;
				var params: Array<NodeType> = [parseType()];
				while (tok() == Comma) {
					i++;
					parseType();
				}
				//while (tok() != OpGt && tok() == Comma) {
				//	i++;
				//	parseType();
				//	//if (tok() == Comma) i++; // TODO [a,b,]
				//}
				step(OpGt);
				ParamentricType(name, params);
			} else Type(name);

			// A => B
			// TODO:
			/*
			var a:A => B => C => D
			var a:A => (B => (C => D))
			var a:((A => B) => C) => D
			*/
			if (tok() == OpArrow) {
				i++;
				result = Function([result], parseType());
			}

			result;
		case BkOpen: // []
			i++;
			var key = parseType();
			var result = if (tok() == DblDot) { // Map
				i++;
				ParamentricType("Map", [key, parseType()]);
			} else ParamentricType("Array", [key]);
			step(BkClose);
			if (tok() == OpArrow) {
				i++;
				result = Function([result], parseType());
			}
			result;
		case BrOpen: // {}
			i++;
			var result = if (tok() == DblDot) { // Empty
				i++;
				//step(BrClose);
				Object([], []); // TODO null, null? EmtpyObject?
			} else {
				var names: Array<String> = [];
				var types: Array<NodeType> = [];
				while (tok() != BrClose) {
					names.push(getgo(LIdent));
					if (tok() == DblDot) {
						i++;
						types.push(parseType());
					}
					if (tok() == Comma) i++;
				}
				Object(names, types);
			}
			step(BrClose);
			result;
		case POpen: // ()
			i++;
			//var types = [];
			var args = [];
			while (tok() != PClose) {
				step(LIdent); // TODO arg name
				if (tok() == DblDot) {
					i++;
					args.push(parseType());
				}
				//if (tok() == OpAssign) {
				//	i++;
				//	parseExpr();
				//}
				if (tok() == Comma) i++;
			}
			step(PClose);
			step(OpArrow);
			Function(args, parseType());
		case _:
			trace('\n' + Lexer.str(tok()));
			throw 'parseType';
		}
		if (tok() == Question) i++;
		return result;
	}

	function precedence(op: Token) {
		var left = 100;
		var right = 0;
		return switch (op) {
		case OpMod : 0 + left;
		case OpMult | OpDiv : 1 + left;
		case OpAdd | OpSub : 2 + left;
		case OpShl | OpShr | OpUShr : 3 + left;
		case OpOr | OpAnd | OpXor : 4 + left;
		case OpEq | OpNotEq | OpGt | OpLt | OpGte | OpLte : 5 + left;
		case OpBoolAnd : 7 + left;
		case OpBoolOr : 8 + left;
		case OpAssign : 10 + right;
		case _: throw "No precedence for " + Lexer.str(op);
		}
	}

	function isBinop(t: Token): Bool {
		return switch (t) {
		case	OpAdd,
				OpMult,
				OpDiv,
				OpSub,
				OpAssign,
				OpEq,
				OpNotEq,
				OpGt,
				OpGte,
				OpLt,
				OpLte,
				OpAnd,
				OpOr,
				OpXor,
				OpBoolAnd,
				OpBoolOr,
				OpShl,
				OpShr,
				OpUShr,
				OpMod
				: true;
		case _: false;
		}
	}
}
