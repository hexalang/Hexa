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

enum Constant {
	CString(s: String);
	CIdent(s: String);
	CBool(b: Bool);
	CThis;
	CSuper;
	CInt(s: String);
	CFloat(s: String);
	CNull;
}

@demo
enum NodeKind {
	// var t:Type
	TBinop(op: Token, a: Node, b: Node);
	//TBinopAssign(op: Token, a: Node, b: Node);
	TBlock(el: Array<Node>);
	@demo(1) @demos TBreak;
	TCall(/*@demo*/ e: /*@demo*/ Node, el: Array</*@demo*/ Node>);
	TConst(c: Constant);
	TContinue;
	TIf(econd: Node, eif: Node, eelse: Null<Node>);
	TParenthesis(e: Node);
	TReturn(e: Null<Node>);
	TThrow(e: Node);
	TUnop(op: Token, postfix: Bool, e: Node);
	TWhile(econd: Node, e: Node, pre: Bool);
	// NUnderscore
}

typedef Node = NodeKind;

//typedef Node = {
//	var kind: NodeKind;
//}
