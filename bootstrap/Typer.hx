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
import Parser;

class Typer {
	public function new(node: Node) {
		typing(node);
	}
	public var result: Any = null;

	function typing(node: Node) {
		switch (node) {

		// Have no sub-nodes
		case TString(s): {}
		case TIdent(s): {}
		case TBool(b): {}
		case TThis: {}
		case TSuper: {}
		case TInt(s): {}
		case TFloat(s): {}
		case TNull: {}
		case TBreak: {}
		case TContinue: {}

		// Have sub-nodes
		case TBinop(op, a, b): typing(a); typing(b);
		case TBlock(el): for (e in el) typing(e);
		case TCall(e, el): typing(e); for (e in el) typing(e);
		case TParenthesis(e): typing(e);
		case TReturn(e): typing(e);
		case TThrow(e): typing(e);
		case TArray(el): for (e in el) typing(e);
		case TIf(econd, eif, eelse): typing(econd); typing(eif);
			if (eelse != null) typing(eelse);
		case TUnop(op, postfix, e): typing(e);
		case TWhile(econd, e, pre): typing(econd); typing(e);
		case TDot(expr, name): typing(expr);
		case TIndex(expr, index): typing(expr); typing(index);
		case TAs(expr, kind, t): typing(expr);
		case TMeta(name, values, node): typing(node);
		case TFunction(name, expr, vars, types, values): if (expr != null) typing(expr);
		case TVar(name, t, expr): if (expr != null) typing(expr);
		case TTry(expr, vars, t, catches): typing(expr); for (c in catches) typing(c);
		case TNew(t, args): for (a in args) typing(a);
		case TSwitch(exprs, cases):
			for (e in exprs) typing(e);
			for (c in cases) typing(c);
		case TClass(t, ext, impl, fields): for (f in fields) typing(f);
		case TModule(path, el): for (e in el) typing(e);
		case TObject(names, el): for (e in el) typing(e);
		case TEnum(t, fields): for (f in fields) {}
		case TType(name, t): {}
		}
	}
}
