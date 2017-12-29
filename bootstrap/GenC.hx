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

using GenC;

class GenC {
	static var nowrap = true;
	static var id = 0;
	static var tabs = '';

	static function rename(name:String) {
		if(name != 'WinMain')
			return '$' +
			name;
		return name;
	}

	static function unblock(e:Node):Node {
		return switch (e) {
			case TBlock([e]): e;
			case _: e;
		}
	}

	// Control indentation
	static inline function pushTab() tabs += '\t';
	static inline function popTab() tabs = tabs.substring(0, tabs.length - 1);

	static function stringifyBlockExpression(node: Node): String {
		var r = '';
		return switch (node) {
			case TIf(econd, eif, eelse):
					r += 'if(' + econd[0].stringify() + ') ';
					r += switch(eif) {
						case TBlock(_): eif.stringify();
						case _: TBlock([eif]).stringify();
					}
					if (eelse != null) r += ' else ' + eelse.stringifyBlockExpression();
					r;
			case _: node.stringify();
		}
	}

	static function getAtt(atts:Array<Attribute>, atname: String):Attribute {
		trace(atts);
		if(atts != null && atts.length > 0) for(att in atts) {
			if(att.name == atname) return att;
		}
		return null;
	}

	static var parentNames:Map<Node, String> = new Map();

	static var scopes:Array<Map<String, Bool>> = [new Map()];
	static function pushScope() {
		scopes.push(new Map());
	}
	static function popScope(): Map<String, Bool> {
		return scopes.pop();
	}
	static function hasInScope(name:String) {
		return scopes[scopes.length-1][name] != null;
	}
	static function addToScope(name:String) {
		scopes[scopes.length-1][name] = true;
	}

	public static function stringifyMain(node: Node, target:Dynamic): String {
		nowrap = true;
		var r = '';
		if(target.include.length > 0) r += '#include ' + target.include.join('\r\n#include ') + '\r\n\r\n';
		r += '// Hexa declarations\r\n';
		r += '#define Int int\r\n';
		r += '\r\n';
		r += node.stringify();
		return r;
	}

	public static function stringify(node: Node): String {
		var r = '';
		if (node == null) throw 'Unable to print: node is null';

		var atts = Project.mapAttributes.get(node);
		var a = '';
		if(atts != null && atts.length > 0) for(att in atts) {
			a += '/* @' + att.name + '*/ ';
		}

		return a + switch (node) {

		case TUsing(names): '/*using $names*/';
		case TVars(e): [for(e in e) stringify(e)].join('; ');

		// Have no sub-nodes
		case TString(s): 'L\"'+
		s
		.split('\n').join('\\n')
		.split('\r').join('\\r')
		.split('\"').join('\\\"')
		+'\"';
		case TIdent(s):
			trace('`$s`');

			var source = Project.mapNames.get(node);
			var n = switch(source) {
				case null: throw 'Unmapped $node';
				case TEnum(Type(name), _): name;
				case TFor(name, _, _): parentNames[source];
				case TIdent(name): parentNames[source];
				case TVar(name, _, _):
					var n = parentNames[source];
					if(n==null) throw 'TVar $name parentNames null == '+parentNames.get(source);
					n;
				case TStatic(f = TVar(name, _, _)):
				var static_source = Project.mapNames.get(source);
				switch (static_source) {
					case TClass(t, _), TEnum(t,_):
						t.extractTypeName().rename() + '.' + name.rename();
					case _: throw 'static_source is $static_source';
				}
				case TFunction(name, _): name.rename();
				case TClass(t, _):
					var rename = getAtt(Project.mapAttributes.get(source), 'native');
					var name = t.extractTypeName().rename();
					if(rename != null) trace('Got @native!');
					if(rename != null) switch (rename.values[0]) {
						case null: name;
						case TString(s): s;
						case _: name;
					} else name;
				case _:
				throw '$s '+source;
			}
			if(Project.isExternal.get(source) == true) n = parentNames[source];
			if(s == 'BeginPaint') trace('BeginPaint --> $n, parent -> $source');
			n;
		case TBool(true): '1';
		case TBool(false): '0';
		case TThis: 'this';
		case TSuper: 'super';
		case TInt(s): s;
		case TFloat(s): s;
		case TNull: 'NULL';
		case TBreak: 'break';
		case TContinue: 'continue';

		// Have sub-nodes
		case TBinop(op, a, b):
			a.stringify() + op.stringify() + b.stringify();
		case TBlock(el):
			var wrap = !nowrap;
			nowrap = false;
			if(wrap) r = '{\n';
			pushScope();
			if(wrap) pushTab();
			for (e in el)
				switch(e) {

					case _: r += tabs + e.stringifyBlockExpression() + ';\n';
				}
			if(wrap) popTab(); // This is nearest to pushTab for cache locality
			popScope();
			r += tabs;
			if(wrap) r += '}';
			r;

		case TElvis(a, b): a.stringify() + '||' + b.stringify();
		case TFor(n, a, b):
			var name = n.rename();
			if(hasInScope(name)) name += '$$' + (++id);
			addToScope(name);
			parentNames[node] = name;
			'for(const ' + name.rename() + ' of ' + a.stringify() + ') '
			+ b.stringify();


		case TCall(TIdent('__instanceof__'), [of, type]):
			of.stringify() + ' instanceof ' + type.stringify();
		case TCall(TIdent('__typeof__'), [of]):
			'typeof ' + of.stringify();
		case TCall(TIdent('refof'), [of]):
			'(&' + of.stringify() + ')';

		case TCall(e, el): e.stringify() + '(' + [for (e in el) e.stringify()].join(',') + ')';
		case TParenthesis(e): '(' + e.stringify() + ')';
		case TReturn(null), TReturn(TBlock([])): 'return';
		case TReturn(e): 'return ' + e.stringify();
		case TThrow(e): 'throw ' + e.stringify() + '';
		case TArray(el): '[' + [for (e in el) e.stringify()].join(',') + ']';
		case TMap([],_): 'new Map()';
		case TMap(keys,values):
			'new Map([' +
			[for(i in 0...keys.length) '[' + keys[i].stringify()+ ',' + values[i].stringify() + ']'].join(',')
			+ '])';

		case TIf(econd, eif, eelse):
			r = 'if(' + [for(e in econd) e.stringify()].join(' && ') + ') ' +  eif.stringify();
			if (eelse != null) r += ' else ' + eelse.stringify();
			r;
		case TUnop(op, postfix, e): postfix ? e.stringify() + op.stringify() : op.stringify() + e.stringify();
		case TWhile(econd, e, true): 'while(' + econd.stringify() + ') ' + e.stringify();
		case TWhile(econd, e, false): 'do{' + e.stringify() + '}while(' + econd.stringify() + ')';
		case TDot(TString(s), 'length'): ''+s.length;
		case TDot(expr, name):
			trace('.`$name`');
			var parent = Project.mapNames.get(expr);
			switch(parent) {
				case TEnum(_, fields):
					var v = '';
					for(f in fields) switch (f) {
						case TBinop(OpAssign, TIdent(n), TInt(value)): if(name == n) v = '' + value;
						case _: throw ''+f;
					}
					v;
				case _: expr.stringify() + '.' + name;
			}
		case TIndex(expr, index): expr.stringify() + '[' + index.stringify() + ']';
		case TAs(expr, kind, t): '(('+t.extractTypeName()+')(' + expr.stringify() + '))';
		case TFunction(name, expr, vars, rettype):
			r += rettype.extractTypeName();
			r += ' CALLBACK';
			if(name != null) r += ' ' + name.rename();
			r += '(' + [for(v in vars)
				switch (v) {
					case TVar(name, t, _):
						var name = name.rename();
						parentNames[v] = name;
						t.extractTypeName() + ' ' + name + " lol";
					case TIdent(name):
						var name = name.rename();
						parentNames[v] = name;

					case TParenthesis(null): '';
					case _: throw v;
				}
			].join(', ') + ') ';
			if (expr != null) {
				switch (expr) {
					case TBlock(el): r += expr.stringify();
					case _:
						pushScope();
						pushTab();
						r += '{\n$tabs'+expr.stringify()+'\n\t$tabs}';
						popTab();
						popScope();
				}
			}
			else r += '{}';
			r;
		case TVar(oname, t, expr, const):
			if(oname == null) throw 'name is null for $node';
			var es = '';
			switch(expr) {
				case TVar(oname1, t1, exp1, _):
					var a = 1;
				case _:
			}
			if (expr != null) es = ' = ' + expr.stringify();
			addToScope(oname);
			var name = oname.rename();
			if(hasInScope(oname)) name += '$$' + (++id);
			parentNames[node] = name;
			if(name == null) throw 'name is null for $node';
			if(parentNames[node] == null) throw 'parentNames[node] is null for $node';
			if(t != null) r = t.extractTypeName();
			if(t == null) r = 'auto';
			r += ' ' + name + es;
			r;
		case TTry(expr, vars, t, v, catches):
			r = 'try {\n$tabs\t';
			pushTab();
			switch(expr) {
				case TBlock(el): r += [for(e in el) e.stringify()].join(';\n'+tabs);
				case _:	r += expr.stringify();
			}
			popTab();
			r += '\n' + tabs + '} catch('+vars[0]+') {\n$tabs\t';
			pushTab();
			parentNames[v[0]] = vars[0];
			switch(catches[0]) {
				case TBlock(el): r += [for(e in el) e.stringify()].join(';\n'+tabs);
				case _:	r += catches[0].stringify();
			}
			popTab();
			r + '\n' + tabs + '}';
		case TNew(t, args): 'new ' + extractTypeName(t) + '(' + [for (e in args) e.stringify()].join(',') + ')';
		case TSwitch(exprs, conds, cases):
			r = 'switch (';
			r += exprs[0].stringify();
			r += ') {\n';
			pushTab();
			for (i in 0...cases.length) {
				var c = cases[i];
				r += tabs;
				for(c in conds[i]) switch (c) {
					case TUnderscore: r += 'default:';
					case _: r += 'case ' + c.stringify() + ':';
				}
				r += ' {\n';
				r += tabs + '\t' + c.stringify() + ';\n';
				r += tabs + '\tbreak;\n$tabs;}\n';
			}
			popTab();
			r + tabs + '}';
		case TClass(t, ext, impl, fields, true):
			var cname = extractTypeName(t);
			var require = getAtt(Project.mapAttributes.get(node), 'require');
			if(require != null) switch [require.values[0], require.values[1]] {
				case [TString(s), null]: r += 'const $cname = require("$s");\n$tabs';
				case [TString(s), TString(f)]: r += 'const $cname = require("$s").$f;\n$tabs';
				case _: throw '@require takes string as argument';
			};
			r += '/* declare class $cname */';
		case TClass(t, ext, impl, fields, external):
			var cname = extractTypeName(t);
			r = (external?'/* declare class ' : 'class ') + cname;
			if (ext != null) r += ' extends ' + extractTypeName(ext);
			r += ' {\n';
			var after = [];
			for (f in fields) {
				var code = '';
				var statics = false;

				function unmeta(f) {
					switch(f) {
						case _: return f;
					}
				}

				f = unmeta(f);

				switch(f) {
					case TStatic(field): f = field; statics = true;
					case _: {};
				}
				f = unmeta(f);

				switch(f) {
					case TFunction(name, expr, vars, rettype):
						{
							if(name == 'new') name = 'constructor';
							if(statics) code += cname + '.' + name.rename() + ' = function';
							else code += '\t' + name.rename();
							code += '(' + [for(v in vars)
								switch (v) {
									case TVar(name, _, _):
									var name = name.rename();
									parentNames[v] = name;
									case _: throw v;
								}
							].join(', ') + ') ';
							if (expr != null) {
								switch (expr) {
									case TBlock(el):
									pushTab();
									code += expr.stringify();
									popTab();
									case _:
										pushTab();
										code += '{\n$tabs'+expr.stringify();
										popTab();
										code += '\n$tabs}';
								}
							}
							else code += '{}';
						}
					case TVar(name, t, expr, _): code += cname + '.' + name.rename() + ' = ' + expr.stringify();
					case _: code += '' + f;
				}
				if(statics) after.push(tabs + code) else r += '\t' + code;
			}
			r += '\n' + tabs + '}' + (external?' */':'');
			r += '\n'+after.join(';\n');
			r;

		case TModule(path, el):
			r = 'module ' + path.join('.') + ' {\n';
			pushTab();
			for (e in el) {
				r += tabs + e.stringify() + ';\n';
			}
			popTab();
			r + tabs + '}';
		case TObject([], _): '{}';
		case TObject(names, el): '{' + [for (i in 0...el.length) names[i].rename() + ':' + el[i].stringify()].join(',') + '}';

		case TStatic(field): 'static ' + field.stringify();

		// Types
		case TEnum(t, fields):
			r = '/*const ' + extractTypeName(t);
			r += ' = {\n';
			pushTab();
			for (f in fields) {
				switch(f) {
					case TBinop(OpAssign, TIdent(name), val):
					r += tabs + name + ':' + val.stringify() + ',\n';
					case TIdent(name):
					r += tabs + name + ':{},\n';
					case _: throw '!' + f;
				}
			}
			popTab();
			r + tabs + '}*/';
		case TType(name, t): '';
		case TUnderscore: '_';
		case TDeclare(name, node):
			parentNames[node] = name;
			Project.isExternal.set(node, true);
			'//declare $name';
		}
	}

	// Converts { expr } to expr
	static function unwrapBlock(e: Node): Node {
		return switch (e) {
		case TBlock([e]): e;
		case TBlock(el): throw 'Unwrapped block has multiple expressions';
		case _: e;
		}
	}

	public static function extractTypeName(t: NodeType): String {
		return switch (t) {
		case Type(name), ParamentricType(name, _): name;
		case _: throw 'Type has no name: ' + t;
		}
	}
}
