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

		//if (tok() != KPackage && namespace != "") throw "Expected package namespace: " + namespace;
		//else
		//if (tok() == KPackage/* && namespace != ""*/) {
		//	i++;
		//	var ns = getgo(LIdent);
		//	while (tok() == Dot) {
		//		i++;
		//		ns += "." + getgo(LIdent);
		//	}
		//	if (ns.toLowerCase() != ns) throw "Package namespace must be lowercase";
		//	//if (ns != namespace) throw 'Package namespace must be $namespace but got $ns';
		//} //else if (tok() == KPackage && namespace == "") throw "Do not use `package` in root namespace (just remove keyword)";

		while (i < lex.length && tok() != Eof) {
			parseExpr();
			//if (tok() == LDoc) i++;
			//switch (tok()) {
			//case KClass:
			//	// class
			//	var clas : Dynamic = {};
			//	i++;
			//	clas.name = getgo(LIdent);
			//	clas.type = "class";
			//	clas.fields = [];
			//	step(BrOpen);
			//	while (tok() != BrClose) {
			//		clas.fields.push(parseField());
			//	}
			//	step(BrClose);
			//	var path = /*namespace +*/ "." + /*module +*/ "." + clas.name;
			//	//if (proj.types.exists(path)) throw "Type already exists";
			//	//proj.types[path] = clas;
			//case _: unexpected();
			//}
		}
	}

	function parseFields() {
		//var field: Dynamic = {};
		//var tk = tok();
		//if (tk == KStatic) {
		//	field.isStatic = true;
		//	i++;
		//	tk = tok();
		//}
		//if (tk == KFunction) {
		//	field.type = "function";
		//	i++;
		//	field.name = getgo(LIdent);
		//	step(POpen);
		//	step(PClose);
		//	field.args = [];
		//	field.expr = parseExpr();
		//	return field;
		//}
		//unexpected();
		//return null;

		while (tok() != BrClose) {
			// TODO switch (let tk = tok()) {
			switch (tok()) {
			case At: parseExpr();
			case KPrivate:
				i++;//parseExpr(); // TODO before-after!
			case KStatic: i++;
			case KVar, KFunction: parseExpr();
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
	}

	//------------------
	//       DATA
	//------------------

	// Lexemes input directly from lexer
	var lex : Tokens;
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
			//untyped process.stdout.write(Lexer.print(lex, i));
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

	function parseExpr(): NodeKind {
		//untyped process.stdout.write(' [');
		while (tok() == At) parseAttribute();
		if (tok() == KPrivate) i++; // TODO
		if (tok() == KExtern) i++;
		if (tok() == KPrivate) i++;
		if (tok() == KStatic) i++;
		var node = tok();
		//if (node == PClose || node == BrClose)
		//	return null;
		var result : NodeKind = null;

		//-------------
		// PREFIX STEP
		//-------------
		switch (node) {
		//case At:
		//	parseAttribute();

		case BrOpen:
			i++;
			if (tok() == BrClose) { // Empty block
				i++;
			} else if (tok() == DblDot) { // Empty object
				i++;
				step(BrClose);
			} else if (tok() == LIdent && lex.tokens[i + 1] == DblDot) { // Object
				while (tok() != BrClose) {
					step(LIdent);
					step(DblDot);
					parseExpr();
					if (tok() == Comma) i++;
				}
				step(BrClose);
			} else
				// Block
			{
				while (tok() != BrClose) {
					parseExpr();
				}
				step(BrClose);
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
			//if (tok() == Semicolon) i++;
			if (tok() == KElse) {
				i++;
				eelse = parseExpr();
			}
			result = TIf(econd, eif, eelse);
		case KWhile:
			i++;
			step(POpen);
			var econd = parseExpr();
			step(PClose);
			var e = parseExpr();
			result = TWhile(econd, e, true);
		case KDo:
			i++;
			var e = parseExpr();
			step(KWhile);
			step(POpen);
			var econd = parseExpr();
			step(PClose);
			result = TWhile(econd, e, false);
		case POpen:
			i++;
			result = TParenthesis(parseExpr());
			step(PClose);
		case KReturn: i++;
			var expr = parseExpr();
			result = TReturn(expr == null ? null : expr);
		//case KFunction:
		case KThrow: i++; result = TThrow(parseExpr());
		case KContinue: i++; result = TContinue;
		case KBreak: i++; result = TBreak;
		case OpNegBits: i++; result = TUnop(OpNegBits, false, parseExpr());
		case OpSub: i++; result = TUnop(OpSub, false, parseExpr());
		case OpNot: i++; result = TUnop(OpNot, false, parseExpr());
		case OpIncrement: i++; result = TUnop(OpIncrement, false, parseExpr());
		case OpDecrement: i++; result = TUnop(OpDecrement, false, parseExpr());
		case LFloat: result = TConst(CFloat(getgo(LFloat)));
		case LInt: result = TConst(CInt(getgo(LInt)));
		case LIdent: result = TConst(CIdent(getgo(LIdent)));
		case LString: result = TConst(CString(getgo(LString)));
		case KTrue: result = TConst(CBool(true)); i++;
		case KFalse: result = TConst(CBool(false)); i++;
		case KThis: result = TConst(CThis); i++;
		case KNull: result = TConst(CNull); i++;
		case KSuper: result = TConst(CSuper); i++;

		case KVar, KLet:
			i++;
			step(LIdent);
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
			if (tok() == DblDot) {
				i++;
				parseType();
			}
			if (tok() == OpAssign) {
				i++;
				parseExpr();
			}

		case KTry:
			i++;
			parseExpr();
			while (tok() == KCatch) {
				step(KCatch);
				step(POpen);
				//while (tok() != PClose) {
				step(LIdent);
				//if (tok() == DblDot)
				step(DblDot);
				{
					//i++;
					parseType();
				}
				//if (tok() == OpAssign) {
				//	i++;
				//	parseExpr();
				//}
				//if (tok() == Comma) i++;
				//}
				step(PClose);
			}

		case KPackage:
			i++;
			step(LIdent);
			while (tok() == Dot) {
				i++;
				step(LIdent);
			}
			step(BrOpen);
			while (tok() != BrClose) {
				parseExpr();
			}
			step(BrClose);

		case KEnum:
			i++;
			step(LIdent);
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
			step(BrOpen);
			while (tok() != BrClose) {
				while (tok() == At) parseAttribute();
				step(LIdent);
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
			}
			step(BrClose);

		case KType:
			i++;
			step(LIdent);
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
				parseType();
			} else {
				step(DblDot);
				parseType();
				step(BrOpen);
				parseFields();
				step(BrClose);
			}


		case KClass, KInterface:
			// if tok KInterface ...
			i++;
			step(LIdent);

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

			if (tok() == KExtends) {
				i++;
				parseType();
			}

			while (tok() == KImplements) {
				i++;
				parseType();
			}

			step(BrOpen);
			parseFields();
			step(BrClose);
			//untyped process.stdout.write('<CLASS DONE>');

		case KFunction:
			i++;
			if (tok() == LIdent) step(LIdent);
			if (tok() == POpen) {
				i++;
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
			}
			if (tok() == DblDot) {
				i++;
				parseType();
			}
			//if (tok() != BrClose)
			//	parseExpr();
			switch (tok()) {
			case BrClose, KStatic, KNew, KPrivate: {}
			case _: parseExpr();
			}

		//case Dot:
		//	i++;
		//	// TODO .<T>
		//	step(LIdent);

		case BkOpen:
			i++;
			while (tok() != BkClose) {
				parseExpr();
				if (tok() == Comma) i++; // TODO [a,b,]
			}
			step(BkClose);

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
			step(LIdent);
			if (tok() == OpLt) {
				i++;
				parseType();
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
			}

			step(POpen);
			while (tok() != PClose) {
				parseExpr();
				if (tok() == Comma) i++; // TODO [a,b,]
			}
			step(PClose);

		case KSwitch:
			i++;
			step(POpen);
			while (tok() != PClose) {
				parseExpr();
				if (tok() == Comma) i++;
				/*
				if (tok() == Comma) {i++; continue ;}
				break;
				to make: (a,b,,) -> (a,b)
				*/
			}
			step(PClose);
			step(BrOpen);

			while (tok() != BrClose) {
				step(KCase);
				while (tok() != DblDot) {
					if (tok() == Underscore) {
						i++;
					} else parseExpr();
					if (tok() == Comma) i++;
				}
				step(DblDot);
				parseExpr();
			}

			step(BrClose);

		case _: unexpected();
		}

		//--------------
		// POSTFIX STEP
		//--------------
		var done = false; // TODO [i]
		while (!done) {
			switch (tok()) {
			case BkOpen:
				i++;
				while (tok() != BkClose) {
					parseExpr();
					if (tok() == Comma) i++;
				}
				step(BkClose);
			case KAs:
				i++;
				if (tok() == OpNot) i++;
				parseType();
			case POpen: { // call
				var args : Array<Node> = [];
				i++;
				while (tok() != PClose) {
					args.push(parseExpr());
					if (tok() == Comma) i++;
				}
				step(PClose);
				result = TCall(result, args);
			}
			case OpIncrement: i++; result = TUnop(OpIncrement, true, result);
			// TODO done?
			// TODO increment of a[i]++
			case OpDecrement: i++; result = TUnop(OpDecrement, true, result);
			case Dot: i++; step(LIdent);
			case Question: i++;
				var eif = parseExpr();
				step(DblDot);
				var eelse = parseExpr();
				result = TIf(result, eif, eelse);
			case t if (isBinop(t)): i++;
				if (tok() == OpAssign) {
					i++;
				}

				var b = parseExpr();
				var a = result;
				switch (b) {
				case null: {}
				case TBinop(op, aa, bb):
					var tp = precedence(t);
					var tLeft = tp > 99;
					tp = tp % 100;
					var bp = precedence(op);
					var bLeft = bp > 99;
					bp = bp % 100;
					if (bp > tp)
						result =
							TBinop(op, TBinop(t, result, aa), bb);
					else
						result = TBinop(t, result, b);

				case _: result = TBinop(t, result, b);
				}
			case _: done = true;
			}
		}
		// TODO if (result == null) throw "Expression is incomplete";
		//untyped process.stdout.write(']');
		return result;
	}

	function parseAttribute() {
		i++;
		step(LIdent);
		if (tok() == POpen) {
			i++;
			while (tok() != PClose) {
				parseExpr();
				if (tok() == Comma) i++;
			}
			step(PClose);
		}
	}

	function parseType() {
		switch (tok()) {
		case LIdent:
			i++;

			// TODO: parsing <T> to function
			if (tok() == OpLt) {
				i++;
				parseType();
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
			}

			// A => B
			// TODO:
			/*
			var a:A => B => C => D
			var a:A => (B => (C => D))
			var a:((A => B) => C) => D
			*/
			if (tok() == OpArrow) {
				i++;
				parseType();
			}
		case BkOpen:
			i++;
			parseType();
			if (tok() == DblDot) { // Map
				i++;
				parseType();
			}
			step(BkClose);
			if (tok() == OpArrow) {
				i++;
				parseType();
			}
		case BrOpen:
			i++;
			if (tok() == DblDot) { // Empty
				i++;
				//step(BrClose);
			} else
				while (tok() != BrClose) {
					step(LIdent);
					if (tok() == DblDot) {
						i++;
						parseType();
					}
					if (tok() == Comma) i++;
				}
			step(BrClose);
		case POpen:
			i++;
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
			step(OpArrow);
			parseType();
		case _:
			trace('\n' + Lexer.str(tok()));
			throw 'parseType';
		}
		if (tok() == Question) i++;

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
