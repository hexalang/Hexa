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

enum Node {
	TString(s: String);
	TIdent(s: String);
	TBool(b: Bool);
	TThis;
	TSuper;
	TInt(s: String);
	TFloat(s: String);
	TNull;

	TBinop(op: Token, a: Node, b: Node);
	//TBinopAssign(op: Token, a: Node, b: Node);
	TBlock(el: Array<Node>);
	TBreak;
	TCall(e: Node, el: Array<Node>);
	TContinue;
	TIf(econd: Node, eif: Node, eelse: Null<Node>);
	TParenthesis(e: Node);
	TReturn(e: Null<Node>);
	TThrow(e: Node);
	TUnop(op: Token, postfix: Bool, e: Node);
	TWhile(econd: Node, e: Node, pre: Bool);
	TFunction(name:String, expr: Node, vars:Array<String>, types:Array<NodeType>, values:Array<Node>);
	TVar(name: String, t: NodeType, expr: Node);
	TClass(/*name: String,*/ t: NodeType, ext: NodeType, impl: Array<NodeType>, fields: Array<Node>);
	TTry(expr: Node, vars:Array<String>, t: Array<NodeType>, catches:Array<Node>);
	TDot(expr: Node, name: String);
	TNew(t: NodeType, args: Array<Node>);
	TArray(el: Array<Node>);
	TIndex(expr: Node, index: Node);
	TSwitch(exprs: Array<Node>, cases: Array<Node> /*, conds: Array<Node>*/);
	TModule(path: Array<String>, el: Array<Node>);
	TObject(names: Array<String>, el: Array<Node>);
	TEnum(t: NodeType, fields: Array<String>);
	TType(name: String, t: NodeType);
	TAs(expr: Node, kind: Token, t: NodeType);
	// NUnderscore
	TMeta(name: String, values: Array<Node>, node:Node);
}


enum NodeType {
	Type(name:String);
	ParamentricType(name:String, params:Array<NodeType>);
	Function(args:Array<NodeType>, ret:NodeType);
	Object(names:Array<String>, types:Array<NodeType>);
}

//typedef Node = {
//	var kind: NodeKind;
//}
