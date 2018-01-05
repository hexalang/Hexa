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

typedef Attribute = {name:String, values: Array<Node>};

class Project {
	public static var mapAttributes:JSMap<Node, Array<Attribute>> = new JSMap();
	public static var mapNames:JSMap<Node, Node> = new JSMap();
	public static var isExternal:JSMap<Node, Bool> = new JSMap();
}

enum Node {
	// Constants
	TString(s: String);
	// ident
	TIdent(s: String);
	// true/false
	TBool(b: Bool);
	// this
	TThis;
	// super
	TSuper;
	// 123
	TInt(s: String);
	// 0.123
	TFloat(s: String);
	// null
	TNull;

	// Syntax Tree
	// a op b
	TBinop(op: Token, a: Node, b: Node);
	// { el[0] ... el[n] }
	TBlock(el: Array<Node>);
	TBreak;
	TCall(e: Node, el: Array<Node>);
	TContinue;
	// if(econd[0], ...econd[n]) { eif } [else { eelse }]
	TIf(econd: Array<Node>, eif: Node, eelse: Null<Node>);
	TParenthesis(e: Node);
	TReturn(e: Null<Node>);
	TThrow(e: Node);
	// postfix ? e op : op e
	TUnop(op: Token, postfix: Bool, e: Node);
	// while(econd) { e } or if pre == true then do { e } while(econd)
	TWhile(econd: Node, e: Node, pre: Bool);
	TFunction(name:String, expr: Node, vars:Array<Node>, rettype:NodeType);
	TVar(name: String, t: NodeType, expr: Node, const:Bool);
	TVars(vars:Array<Node>);
	TClass(t: NodeType, ext: NodeType, impl: Array<NodeType>, fields: Array<Node>, external:Bool);
	// try { expr } catch(v[0]) { } ... catch(v[n]) { }
	TTry(expr: Node, t: Array<NodeType>, v: Array<Node>, catches: Array<Node>); /*vars: Array<String>, */
	// expr.name
	TDot(expr: Node, name: String);
	TNew(t: NodeType, args: Array<Node>);
	TArray(el: Array<Node>);
	TMap(keys: Array<Node>, values:Array<Node>);
	// expr[index]
	TIndex(expr: Node, index: Node);
	// switch (exprs) {
	//     case cases[0]: conds[0]
	//     case cases[n]: conds[n]
	// }
	TSwitch(exprs: Array<Node>, conds: Array<Array<Node>>, cases: Array<Node>);
	// module path[0].path[1]...path[n] { el }
	TModule(path: Array<String>, el: Array<Node>);
	// { name[0]: el[0], name[1]: el[1], ... name[n]: el[n] }
	// NOTE: Do not use Map here
	TObject(names: Array<String>, el: Array<Node>);
	// enum t { fields[0], ..., fields[n] }
	TEnum(t: NodeType, fields: Array<Node>);
	TType(name: String, t: NodeType);
	TDeclare(name: String, t: Node);
	TUsing(names: Array<String>);
	// expr as t
	TAs(expr: Node, kind: Token, t: NodeType);
	TUnderscore;
	TStatic(field:Node);
	TFor(name:String, over:Node, by:Node);
	TElvis(original:Node, othewise:Node);
}

class DataHelper {
	public static function varName(v:Node) {
		return switch (v) {
			case TVar(name,_): name;
			case _: throw 'varName got not a TVar, but `$v`';
		}
	}
}

enum NodeType {
	Type(name:String);
	ParamentricType(name:String, params:Array<NodeType>);
	Function(args:Array<NodeType>, ret:NodeType);
	Object(names:Array<String>, types:Array<NodeType>);
}
