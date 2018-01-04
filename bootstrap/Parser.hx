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

import Data;
import Token;
import Lexer;
import NodeJs;

class Parser {
	public var allCode:Node;
	public function new(lexe: Tokens) {
		lex = lexe;

		var el = [];
		while (i < lex.length && tok() != Eof) {
			el.push(parseExpr());
		}
		// TODO return just expr if el.length == 1
		// TODO what if no expr (el == 0)?
		result = TBlock(el);
		if (atts.length > 0) {
			Process.stdout.write('\n');
			throw "Not all attributes conceived";
		}
		allCode = (result);
	}

	function parseFields() {
		var fields = [];
		while (tok() != BrClose) {
			var _static = false;
			if(tok() == KStatic) {
				_static = true;
				i++;
			}

			switch (tok()) {
			case At: fields.push(parseExpr());
			case KPrivate:
				i++;
			case KVar, KFunction, KLet:
				var f = parseExpr();
				if(_static) f = TStatic(f);
				fields.push(f);
			case KNew:
				i++;
				var expr = null;
				var vars = [];
				var types = [];
				var values = [];
				step(POpen);
				while (tok() != PClose) {
					vars.push(getgo(LIdent));
					if (tok() == DblDot) {
						i++;
						types.push(parseType());
					}
					if (tok() == OpAssign) {
						i++;
						values.push(parseExpr());
					}
					if (tok() == Comma) i++;
				}
				step(PClose);
				if (tok() != BrClose)
					expr = parseExpr();

				var v = [];
				for(i in 0...vars.length) {
					v.push(TVar(vars[i], types[i], values[i], true));
				}
				fields.push(TFunction('new', expr, v, null));
			case _:
				Console.log('\n\nparseFields ' + tok().stringify());
				throw 'KClass';
			}
		}
		return fields;
	}

	//------------------
	//       DATA
	//------------------

	// Lexemes input directly from lexer
	@readonly public var result: Node = null;
	private var lex: Tokens;
	private var atts: Array < { name: String, values: Array<Node> } > = [];
	// The pointer
	private var i = 0;
	private var lasttok = -1;
	private var lasttokchecks = 10;

	//------------------
	//     HELPERS
	//------------------

	static var uuid = 0;
	static function uid() return uuid++;

	// Current token
	function tok() {
		if (i > lex.length) {
			trace("Parser is out of token space!");
			trace("This should NOT happen.");
			trace("Please, issue a developer (with a code sample).");
			throw lex.fileName + ": Parser Internal Error: Out of token space";
		}
		var t = lex.token[i];
		if (lasttok != i) {
			lasttok = i; lasttokchecks = 40;
		} else {
			lasttokchecks--;
			if (lasttokchecks < 0) {
				throw '${lex.fileName}:${lex.line[i]}:${lex.column[i]}' + ": Parser Internal Error: Same token parsed too many times: " + '`${print()}`';
			}
		}
		return t;
	}

	function print() return lex.token[i].stringify(lex.value[i]);

	function expect(t) if (t != tok()) expected(t.stringify());

	function getgo(t) : String {
		expect(t);
		return lex.value[i++];
	}

	function step(t) : Void {
		expect(t);
		i++;
	}

	inline function next() : Void {
		i++;
	}

	inline function offset(v): Token {
		return lex.token[i+v];
	}

	//------------
	//   ERRORS
	//------------

	function unexpected() {
		var token = lex.token[i].stringify(lex.value[i]);
		throw '\n${lex.fileName}:${lex.line[i]}:${lex.column[i]}: Unexpected `$token`';
	}

	function expected(str : String) {
		var token = lex.token[i].stringify(lex.value[i]);
		throw '\n${lex.fileName}:${lex.line[i]}:${lex.column[i]}: Expected `$str` before `$token`';
	}

	//-----------------
	//   EXPRESSIONS
	//-----------------

	// TODO переконвертировать всё это барахло в генератор таблицы переходов?
	// TODO to separate functions result == => return expr + postfix
	// TODO rename to just parse()
	var class_external = false;
	function parseExpr(): Node {
		while (tok() == At) parseAttribute();
		var node = tok();
		//-------------
		// PREFIX STEP
		//-------------
		var result: Node =
		switch (node) {
		case KUsing:
			next();
			var names = [getgo(LIdent)];
			while (tok() == Comma) {
				step(Comma);
				names.push(getgo(LIdent));
			}
			TUsing(names);

		case KExtern:
			i++;
			switch(tok()) {
				case LIdent:
					var name = getgo(LIdent);
					step(OpAssign);
					TDeclare(name, parseExpr());
				case KClass:
				class_external = true;
				var f = parseExpr();
				class_external = false;
				f;
				case KFunction:
				var name = lex.value[i+1];
				TDeclare(name, parseExpr());
				case KVar, KLet:
				var name = lex.value[i+1];
				if(name == null) throw 'TDeclare name null';
				TDeclare(name, parseExpr());

				case _: throw "declare expects name or type";
			}
		case BrOpen:
			i++;
			if (tok() == BrClose) { // Empty block
				i++;
				TBlock([]);
			} else if (tok() == DblDot) { // Empty object
				i++;
				step(BrClose);
				TObject([], []);
			} else if (tok() == LIdent && lex.token[i + 1] == DblDot) { // Object
				var names: Array<String> = [], el: Array<Node> = [];
				while (tok() != BrClose) {
					names.push(getgo(LIdent));
					step(DblDot);
					el.push(parseExpr());
					if (tok() == Comma) i++;
				}
				step(BrClose);
				TObject(names, el);
			} else { // Block
				var el = [];
				while (tok() != BrClose) {
					el.push(parseExpr());
				}
				step(BrClose);
				TBlock(el);
			}
		case KIf:
			i++;
			step(POpen);
			var econd = [parseExpr()];
			while(tok() == Comma) {
				next();
				econd.push(parseExpr());
			}
			step(PClose);
			var eif = null;
			if (tok() != DblDot) {
				eif = parseExpr();
			}
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
			next();
			if(
				// () =>
				(tok() == PClose && offset(1) == OpArrow) ||
				// (a, ...) =>
				(tok() == LIdent && offset(1) == Comma) ||
				// (a: ...) =>
				(tok() == LIdent && offset(1) == DblDot) ||
				// (a) =>
				(tok() == LIdent && offset(1) == PClose && offset(2) == OpArrow)
			) {
				var vars = [];
				var types = [];
				var values = [];
				while (tok() != PClose) {
					vars.push(getgo(LIdent));
					if (tok() == DblDot) {
						i++;
						types.push(parseType());
					}
					if (tok() == OpAssign) {
						i++;
						values.push(parseExpr());
					}
					if (tok() == Comma) i++;
				}
				step(PClose);
				step(OpArrow);
				var v = [];
				for(i in 0...vars.length) {
					v.push(TVar(vars[i], types[i], values[i], true));
				}
				TFunction(null, parseExpr(), v, null);
			} else
			{
				var expr = parseExpr();
				step(PClose);
				TParenthesis(expr);
			}
		case KReturn: i++;
			switch (tok()) {
				case BrClose, KVar: TReturn(null);
				case _: TReturn(parseExpr());
			}
		case KThrow: i++; TThrow(parseExpr());
		case KContinue: i++; TContinue;
		case KBreak: i++; TBreak;
		case Underscore: i++; TUnderscore;
		case OpNegBits: i++; TUnop(OpNegBits, false, parseExpr());
		case OpSub: i++; TUnop(OpSub, false, parseExpr());
		case OpNot: i++; TUnop(OpNot, false, parseExpr());
		case OpIncrement: i++; TUnop(OpIncrement, false, parseExpr());
		case OpDecrement: i++; TUnop(OpDecrement, false, parseExpr());
		case LFloat: TFloat(getgo(LFloat));
		case LInt: TInt(getgo(LInt));
		case LIdent:
			var name = getgo(LIdent);
			if(name.charAt(0) == name.charAt(0).toUpperCase() && lex.token[i+1] == OpLt) {
				i++;
				parseType();
				step(OpGt);
			}
			TIdent(name);
		case LString: TString(getgo(LString));
		case KTrue:  i++; TBool(true);
		case KFalse: i++; TBool(false);
		case KThis: i++; TThis;
		case KNull:  i++; TNull;
		case KSuper:  i++; TSuper;
		case KVar, KLet:
			var const = tok() == KLet;
			i++;
			var name = getgo(LIdent);
			var expr = null;
			while (tok() == Dot) {
				i++;
				step(LIdent);
			}
			// Enum extractor
			if (tok() == POpen) {
				while (tok() != PClose) {
					i++;
				}
				step(PClose);
				step(OpAssign);
				parseExpr();
				return TNull;
			}
			var t = null;
			if (tok() == DblDot) {
				i++;
				t = parseType();
			}
			if (tok() == OpAssign) {
				i++;
				expr = parseExpr();
			}
			if(tok() == Comma && offset(1) == LIdent) {
			var vars = TVar(name, t, expr, const);
				var vars = [vars];

				while (tok() == Comma && offset(1) == LIdent) {
					next();
					var name = getgo(LIdent);
					var t = null;
					if (tok() == DblDot) {
						i++;
						t = parseType();
					}
					if (tok() == OpAssign) {
						i++;
						expr = parseExpr();
					}
					vars.push(TVar(name, t, expr, const));
				}

				TVars(vars);
			} else vars;

		case KTry:
			i++;
			var expr = parseExpr();
			var vars = [];
			var t = [];
			var v = [];
			var catches = [];
			while (tok() == KCatch) {
				step(KCatch);
				step(POpen);
				var name = getgo(LIdent);
				vars.push(name);
				step(DblDot);
				var type = parseType();
				{
					t.push(type);
				}
				v.push(TVar(name, type, null, true));
				step(PClose);
				catches.push(parseExpr());
			}
			TTry(expr, vars, t, v, catches);

		case KPackage:
			i++;
			var path = [];
			if(tok() == LIdent) {
				path.push(getgo(LIdent));
				while (tok() == Dot) {
					i++;
					path.push(getgo(LIdent));
				}
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
			var t = parseType();
			if(tok() == DblDot) {
				i++;
				parseType();
			}
			step(BrOpen);
			var names = [];
			while (tok() != BrClose) {
				while (tok() == At) parseAttribute();
				atts = [];
				names.push(parseExpr());
			}
			step(BrClose);
			TEnum(t, names);
		case KType:
			i++;
			var name = getgo(LIdent);
			if (tok() == OpLt) {
				i++;
				step(LIdent);
				while (tok() == Comma) {
					i++;
					step(LIdent);
				}
				step(OpGt);
			}
			if (tok() == OpAssign) {
				step(OpAssign);
				TType(name, parseType());
			} else {
				step(DblDot);
				parseType();
				step(BrOpen);
				parseFields();
				step(BrClose);
				TType(name, null);
			}

		case KClass, KInterface:
			var att = atts;
			atts = [];
			i++;
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
			var me = TClass(t, ext, impl, fields, class_external);
			Project.mapAttributes.set(me, att);
			me;
		case KFunction:
			i++;
			var expr = null;
			var name = null;
			var vars = [];
			var types = [];
			var values = [];
			if (tok() == LIdent) name = getgo(LIdent);
			step(POpen);
			{
				while (tok() != PClose) {
					var expr = null;
					var t = null;
					if (tok() == Interval) {
						i++;
					}
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
			var rettype = null;
			if (tok() == DblDot) {
				i++;
				rettype = parseType();
			}
			switch (tok()) {
			case KNew if(lex.token[i+1] == POpen): {}
			case BrClose, KStatic, KPrivate, KFunction: {}
			case _: expr = parseExpr();
			}

			var v = [];
			for(i in 0...vars.length) {
				v.push(TVar(vars[i], types[i], values[i], true));
			}
			(TFunction(name, expr, v, rettype));
		case BkOpen:
			i++;
			var el = [];
			var values = [];
			var isMap = false;

			while (tok() != BkClose) {
				if(tok() == DblDot) {
					isMap = true;
					next();
					break;
				}
				el.push(parseExpr());
				if (tok() == DblDot) {
					i++;
					values.push(parseExpr());
					isMap = true;
				}
				if (tok() == Comma) i++;
			}
			step(BkClose);

			if(isMap)
				TMap(el, values) else TArray(el);
		case KNew:
			i++;
			var t = parseType();
			step(POpen);
			var el = [];
			while (tok() != PClose) {
				el.push(parseExpr());
				if (tok() == Comma) i++;
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
			}
			step(PClose);
			step(BrOpen);

			var cases = [];
			var conds = [];

			while (tok() != BrClose) {
				step(KCase);
				var cond = [];
				while (tok() != DblDot) {
					if (tok() == Underscore) {
						i++;
						cond.push(TUnderscore);
					} else cond.push(parseExpr());
					if (tok() == Comma) i++;
				}
				conds.push(cond);
				step(DblDot);
				var exs = [];
				while(tok()!=KCase && tok()!=BrClose) {
					exs.push(parseExpr());
				}
				cases.push(TBlock(exs));
			}

			step(BrClose);
			TSwitch(exprs, conds, cases);

		case KFor:
			i++;
			step(POpen);
			var n = getgo(LIdent);
			step(KIn);
			var a = parseExpr();
			step(PClose);
			var b = parseExpr();
			TFor(n, a, b);
		case _: unexpected(); null;
		}

		if (result == null) {
			Process.stdout.write('\n');
			throw "Expression is incomplete";
		}

		if(atts.length > 0) {
			Project.mapAttributes.set(result, atts);
			atts = [];
		}

		//--------------
		// POSTFIX STEP
		//--------------
		var done = false;
		while (!done) {
			result = switch (tok()) {
			case BkOpen:
				i++;
				var index = parseExpr();
				step(BkClose);
				TIndex(result, index);
			case KAs:
				i++;
				var kind = tok();
				if (tok() == OpNot) i++;
				else if (tok() == Question) i++;
				TAs(result, kind, parseType());
			case POpen: { // call
				var args : Array<Node> = [];
				i++;
				while (tok() != PClose) {
					args.push(parseExpr());
					if(tok() == DblDot) {
						step(DblDot);
						parseType();
					}
					if (tok() != PClose) step(Comma);
				}
				step(PClose);
				TCall(result, args);
			}
			case OpArrow:
				next();
				TFunction(null, parseExpr(), [result], null);

			case OpIncrement: i++; TUnop(OpIncrement, true, result);
			case OpDecrement: i++; TUnop(OpDecrement, true, result);
			case Dot: i++;
				var name = getgo(LIdent);
				TDot(result, name);

			// a ? b : c
			// a ?? b
			// a ?. b
			case Question: i++;
				if(tok() == Dot) {
					var name = getgo(LIdent);
					TDot(result, name);
				} else

				if(tok() == Question) {
					i++;
					TElvis(result, parseExpr());
				} else {
					var eif = parseExpr();
					step(DblDot);
					var eelse = parseExpr();
					TIf([result], eif, eelse);
				}
			case OpChain: i++;
				parseExpr();
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
			Process.stdout.write('\n');
			throw "Expression postfix is incomplete";
		}

		if(atts.length > 0) {
			Project.mapAttributes.set(result, atts);
			atts = [];
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

	var parametricTypeNesting = 0;
	var parametricTypeNestingToken = Eof;
	function parseType(): NodeType {
		var result =
		switch (tok()) {
		case LIdent:
			var name = getgo(LIdent);
			while (tok() == Dot) {
				i++;
				getgo(LIdent);
			}
			var result = if (tok() == OpLt) {
				i++;
				parametricTypeNesting++;
				var params: Array<NodeType> = [parseType()];
				while (tok() == Comma) {
					i++;
					parseType();
				}

				if(parametricTypeNestingToken == Eof) parametricTypeNestingToken = tok();

				switch(parametricTypeNestingToken) {
					case OpGt: parametricTypeNesting-=1; parametricTypeNestingToken = Eof; i++;
					case OpShr: parametricTypeNesting-=1; parametricTypeNestingToken = OpGt;
					case OpUShr: parametricTypeNesting-=1; parametricTypeNestingToken = OpUShr;
					case _: unexpected();
				}
				if(parametricTypeNesting < 0) throw "parametricTypeNesting < 0";

				ParamentricType(name, params);
			} else Type(name);

			// A => B
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
				Object([], []);
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
			if (tok() == OpArrow) {
				i++;
				result = Function([result], parseType());
			}
			result;
		case POpen: // ()
			i++;
			var args = [];
			while (tok() != PClose) {
				parseType();
				if (tok() == DblDot) {
					i++;
					args.push(parseType());
				}
				if (tok() == Comma) i++;
			}
			step(PClose);
			step(OpArrow);
			Function(args, parseType());
		case _:
			trace('\n' + tok().stringify());
			throw 'parseType';
		}
		while (tok() == Question) i++;
		if (tok() == OpArrow) {
			i++;
			result = Function([result], parseType());
		}
		return result;
	}

	function precedence(op: Token) {
		var left = 100;
		var right = 0;
		return switch (op) {
		case _: throw "No precedence for " + op.stringify();
			case OpMod : 0 + left;
			case OpMult | OpDiv : 1 + left;
			case OpAdd | OpSub : 2 + left;
			case OpShl | OpShr | OpUShr : 3 + left;
			case OpOr | OpAnd | OpXor : 4 + left;
			case OpEq | OpNotEq | OpGt | OpLt | OpGte | OpLte : 5 + left;
			case OpBoolAnd : 7 + left;
			case OpBoolOr : 8 + left;
			case OpAssign : 10 + right;
		}
	}

	static function isBinop(t: Token): Bool {
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
