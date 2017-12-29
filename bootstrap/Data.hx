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
	TBinop(op: Token, a: Node, b: Node);
	TBlock(el: Array<Node>);
	TBreak;
	TCall(e: Node, el: Array<Node>);
	TContinue;
	TIf(econd: Array<Node>, eif: Node, eelse: Null<Node>);
	TParenthesis(e: Node);
	TReturn(e: Null<Node>);
	TThrow(e: Node);
	TUnop(op: Token, postfix: Bool, e: Node);
	TWhile(econd: Node, e: Node, pre: Bool);
	TFunction(name:String, expr: Node, vars:Array<Node>, rettype:NodeType);
	TVar(name: String, t: NodeType, expr: Node, const:Bool);
	TVars(vars:Array<Node>);
	TClass(t: NodeType, ext: NodeType, impl: Array<NodeType>, fields: Array<Node>, external:Bool);
	TTry(expr: Node, vars:Array<String>, t: Array<NodeType>, v:Array<Node>, catches:Array<Node>);
	TDot(expr: Node, name: String);
	TNew(t: NodeType, args: Array<Node>);
	TArray(el: Array<Node>);
	TMap(keys: Array<Node>, values:Array<Node>);
	TIndex(expr: Node, index: Node);
	TSwitch(exprs: Array<Node>, conds: Array<Array<Node>>, cases: Array<Node>);
	TModule(path: Array<String>, el: Array<Node>);
	TObject(names: Array<String>, el: Array<Node>);
	TEnum(t: NodeType, fields: Array<Node>);
	TType(name: String, t: NodeType);
	TDeclare(name: String, t: Node);
	TUsing(names: Array<String>);
	TAs(expr: Node, kind: Token, t: NodeType);
	TUnderscore;
	TStatic(field:Node);
	TFor(name:String, over:Node, by:Node);
	TElvis(original:Node, othewise:Node);
}

enum NodeType {
	Type(name:String);
	ParamentricType(name:String, params:Array<NodeType>);
	Function(args:Array<NodeType>, ret:NodeType);
	Object(names:Array<String>, types:Array<NodeType>);
}
