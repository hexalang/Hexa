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

class Typer {
	public static function fillScopes(node: Node) {

		var scopes:Array<Map<String, Node>> = [new Map()];
		var currentClass:Array<Node> = [];
		function pushScope() scopes.push(new Map());
		function popScope() scopes.pop();
		function addScope(name, node)
			scopes[scopes.length-1][name] = node;
		var prevnode_s = null;

		function fill(node: Node) {
			switch (node) {
				case TBlock([]): {}
				case TVars(e): for(e in e) fill(e);
				case TIdent(null), TVar(null,_,_), TFor(null,_,_): throw ''+node;

				case TBlock(el):
					pushScope();
					for(e in el) fill(e);
					trace(untyped JSON.stringify(scopes[scopes.length-1].keys()));
					popScope();
				case TIdent(name):
					if(name == 's')
						if (prevnode_s == null) {
							prevnode_s = node;
							trace('mapNames $node $name == ${Project.mapNames.get(node)}');
						} else {
							//throw('== ${prevnode_s == node} "$name" $prevnode_s $node, ${Project.mapNames[node]}');
						}
					var subj = null;
					trace('SCOPESSSSSSSSSS '+scopes.length);
					for(i in 0...scopes.length) {
						subj = scopes[scopes.length-i-1][name];
						if(subj != null) {
							//Project.mapNames[node] = subj;
							break;
						}
					}

					if(subj == null) throw('Cannot find name `$name` for $node');
					if(Project.mapNames.get(node) != null) throw('mapNames overwitten from ${Project.mapNames.get(node)} to $subj for node $node');
					Project.mapNames.set(node, subj);
							trace('mapNames $node $name == ${Project.mapNames.get(node)}');

					switch (subj) {
						case TVar(_):
						trace('Found $subj => ${Project.mapNames.get(node)} == ${subj}');
						case _:
					}

					//if(subj == null) trace('No scope subj for $node');
					//if(name == 'Console') trace('----> scopes for Console: '+Project.mapNames[node]);
					//Project.mapNames[node] = scopes[scopes.length-1][name];
				case TUsing(names): {};

				case TVar(name,_,null, true): throw 'Constant should have a value `let $name = value`';
				case TVar(name,_,null, const):
					addScope(name, node);

				case TVar(name,_,e, const):
					fill(e);
					addScope(name, node);

				case TArray(el): for(e in el) fill(e);
				case TMap(keys, values):
					for(i in 0...keys.length) {
						fill(keys[i]);
						fill(values[i]);
					}
				case TAs(e, _, _): fill(e);
				case TBinop(_,a,b): fill(a); fill(b);
					switch (node) {
						case TBinop(_,TDot(_),_): // Ok
						case TBinop(OpAssign,TIdent(_),_):
							var parent: Node = Project.mapNames.get(a);
							switch (parent) {
								case TVar(name,_,_,true): throw 'Cannot reassign a constant `$name`';
								case _: // Ok
							}
						case TBinop(OpAssign,_,_):
							throw 'Cannot assign value to `$a`';
						case _: // Ok
					}
				case TBreak: {};
				case TCall(e, el): fill(e); for(e in el) fill(e);
				case TClass(t,ex,i,f,e):
					var name = GenJs.extractTypeName(t);
					addScope(name, node);
					currentClass.push(node);
					pushScope();
					// Fill class scope, also check for existence of field
					for(field in f) {
						var name = switch (field) {
							case TFunction(null,_): 'new';
							case
							TStatic(TVar(name,_)),
							TVar(name,_),
							TStatic(TFunction(name,_)),
							TFunction(name,_):
								trace('Class field fill $name');
								name;
							case _: throw 'Incorrect class field node: $field';
						}
						var map = scopes[scopes.length-1];
						if(map.exists(name)) throw 'Class field $name already exists';
						map[name] = field;

						Project.mapNames.set(field, node);
					}

					// Fill expressions
					for(field in f) {
						switch (field) {
							case
							TFunction(_,null,_), TStatic(TFunction(_,null,_)),
							TVar(_,_,null,_), TStatic(TVar(_,_,null,_)):
								{};
							case TFunction(_,e,v,r), TStatic(TFunction(_,e,v,r)):
								fill(TFunction(null,e,v,r));
							case TVar(_,_,e,_), TStatic(TVar(_,_,e,_)):
								fill(e);
							case _: {};
						}
					}

					popScope();
					currentClass.pop();
				case TDeclare(name, t):
					//Project.mapNames[node] = node;
					addScope(name, node);
					fill(t);

				case TDot(e, n): fill(e);
				case TElvis(a,b): fill(a); fill(b);
				case TEnum(t,f):
					var name = GenJs.extractTypeName(t);
					addScope(name, node);
				case TFor(name, over, by):
					fill(over);
					pushScope();
					addScope(name, node);
					fill(by);
					popScope();

				case TFunction(name, expr, vars, rettype):
					trace('TFunction $name');
					if(name != null) scopes[scopes.length-1][name] = node;
					pushScope();
					for(v in vars) {
						switch (v) {
							case TVar(vname, _, _): scopes[scopes.length-1][vname] = v;
							case TIdent(vname): scopes[scopes.length-1][vname] = v;
							case TParenthesis(null): {}
							case _: throw v;
						}
					}
					if(expr != null) fill(expr);
					popScope();
				case TIf(econd, eif, null):
					for(e in econd) fill(e); fill(eif);
				case TIf(econd, eif, eelse):
					for(e in econd) fill(e); fill(eif); fill(eelse);
				case TIndex(e,i): fill(e); fill(i);
				case TModule(_): {};
				case TNew(t,el): for(e in el) fill(e);
				case TObject(names, el): for(e in el) fill(e);
				case TParenthesis(e): fill(e);
				case TReturn(null): {};
				case TReturn(e):
					fill(e);
				case TStatic(e):
					trace('TStatic $e');
					fill(e); // throw! not in class!
				case TSuper, TThis: Project.mapNames.set(node, currentClass[currentClass.length-1]);
				case TSwitch(exprs, conds, cases): {
					for (e in exprs) { pushScope(); fill(e); popScope(); }
					for (e in conds) for (e in e) { pushScope(); fill(e); popScope(); }
					for (e in cases) { pushScope(); fill(e); popScope(); }
				};
				case TThrow(e): fill(e);
				case TTry(e, vars, t, v, ca):
					fill(e);
					for(e in 0...ca.length) {
						pushScope();
						scopes[scopes.length-1][vars[e]] = v[e];
						fill(ca[e]);
						popScope();
					}
				case TType(_): {};
				case TUnop(_,_,e): fill(e);
				case TWhile(econd, e, _): fill(econd); fill(e);

				case TUnderscore, TNull, TContinue, TString(_), TBool(_), TInt(_), TFloat(_): {};
			};
		}

		fill(node);
	}
}
