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
import Data;
import Main;

using GenHaxe;

class GenHaxe {
	static var id = 0;
	static var tabs = '';
	// Reserved for special names, because Haxe has no $ character allowed
	static inline var postfix = '___';

	// Only non-Hexa keywords, because 'var','enum' reserved by hexa anyway
	static var reserved = ['untyped', 'trace', 'abstract', 'public', 'extern'];

	static function rename(name:String) {
		if(reserved.indexOf(name) != -1) {
			return name + postfix;
		}
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
			// Single binding condition if(let bind = value)
			case TIf([cond = TVar(oname, t, expr, const)], eif, eelse):
				r += "\n" + tabs + '{\n';
				pushTab();
				pushScope();
				parentNames.set(cond, oname);
				r += tabs + "var " + oname + " = " + expr.stringify() + ';\n' + tabs;
				r += 'if(' + oname + " != null) ";
				r += switch(eif) {
					case TBlock(_): eif.stringify();
					case _: TBlock([eif]).stringify();
				}
				if (eelse != null) r += ' else ' + eelse.stringifyBlockExpression() + ';';
				popTab();
				popScope();
				r + "\n" + tabs + '}';

			// Single non-binding condition
			case TIf([econd], eif, eelse):
				r += 'if(' + econd.stringify() + ') ';
				r += switch(eif) {
						case TBlock(_): eif.stringify();
						case _: TBlock([eif]).stringify();
					}
				if (eelse != null) r += ' else ' + eelse.stringifyBlockExpression();
				r;

			// Multiple (probably) mixed conditions
			case TIf(econd, eif, eelse):
				pushTab();
				r += '{\n' + tabs;

				if(eelse != null) {
					addToScope('else$postfix');
					r += 'var else$postfix = function() ' + eelse.stringify() + "\n" + tabs;
				}

				var depth = 0;
				var econds = econd;
				var i = 0;
				var condsstr = "";
				var constsstr = "";
				var addCond = function(cond: String) {
					return condsstr == "" ? cond : " && " + cond;
				}

				while(econds[i] != null) {
					var cond = econds[i];
					condsstr = "";
					constsstr = "";
					do {
						var innercond = econds[i];
						switch(innercond) {
							case TVar(oname, t, expr, const):
								trace("const for " + oname);
								addToScope(oname);
								var name = oname.rename();
								parentNames.set(cond, name);
								constsstr += "var " + name + " = " + expr.stringify() + ";\n" + tabs;
								condsstr += addCond(name + " != null");
							case _: condsstr += addCond(innercond.stringify());
						}
						if(econds[i+1] != null)
							switch(econds[i+1]) { case TVar(oname, t, expr, const): break;
								case _: i;
							}
						i++;
					} while(econds[i] != null);
					r += constsstr;
					r += "if(" +  condsstr + ") {";
					pushTab();
					r += "\n" + tabs;
					depth++;
					i++;
				}
				r += switch(eif) {
					case TBlock(_): eif.stringify();
					case _: TBlock([eif]).stringify();
				}
				while(depth > 0) {
					popTab();
					r += "\n" + tabs + '}';
					if (eelse != null) r += ' else else$postfix();';
					depth--;
				}
				popTab();
				r += "\n" + tabs + '}';
				r;

			case TFunction(name, expr, vars, _):
				var newname = name.rename();
				var vars = [for(v in vars)
					switch (v) {
						case TVar(name, _, _), TIdent(name):
							parentNames.set(v, name.rename());
							parentNames.get(v);
						case TParenthesis(null): '';
						case _: throw v;
					}
				].join(', ');
				var funcbody = "";
				if (expr != null) {
					switch (expr) {
						case TBlock(el): funcbody = expr.stringify();
						case _:
							pushScope();
							pushTab();
							funcbody = '{\n$tabs'+expr.stringify()+'\n\t$tabs}';
							popTab();
							popScope();
					}
				}
				else funcbody = '{}';
				'var $newname = function($vars) $funcbody';
			case _:
				trace(node);
				node.stringify();
		}
	}

	static function getAtt(atts:Array<Attribute>, atname: String):Attribute {
		trace(atts);
		if(atts != null && atts.length > 0) for(att in atts) {
			if(att.name == atname) return att;
		}
		return null;
	}

	static var parentNames: JSMap<Node, String> = new JSMap();

	static var scopes: Array<JSMap<String, Bool>> = [new JSMap()];

	static function pushScope() {
		scopes.push(new JSMap());
	}
	static function popScope() {
		scopes.pop();
	}
	static function hasInScope(name:String) {
		return scopes[scopes.length-1].get(name) != null;
	}
	static function addToScope(name:String) {
		scopes[scopes.length-1].set(name, true);
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
		// We print here in "doublequtes" to avoid Haxe' string interpolation
		case TString(s): /*'\'' + s
			.split('\\').join('\\\\')
			.split('\n').join('\\n')
			.split('\r').join('\\r')
			.split('\'').join('\\\'')
			+ '\'';*/
			var s = s.split('');
			var charsOut = [];
			while(s.length > 0)
			{
				switch(s[0]) {
					case '"':
					charsOut.push('\\"');
					s.shift();
					case "\n":
					charsOut.push("\\n");
					s.shift();
					case "\r":
					charsOut.push("\\r");
					s.shift();
					case "\\":
					s.shift();
					if(s[0] == '"') {
						charsOut.push('\\"');
						s.shift();
					} else {
						charsOut.push('\\');
					}
					case _:
					charsOut.push(s[0]);
					s.shift();
				}
			}

			'"' + charsOut.join('') + '"';
		case TIdent(s):
			trace('`$s`');
			var source = Project.mapNames.get(node);
			var n = switch(source) {
				case null: throw 'Unmapped $node';
				case TEnum(Type(name), _): name;
				case TFor(name, _, _): parentNames.get(source);
				case TIdent(name): parentNames.get(source);
				case TVar(name, _, _):
					var n = parentNames.get(source);
					if(n==null) throw 'TVar `$name` parentNames null == '+parentNames.get(source);
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
			n;
		case TBool(b): '$b';
		case TThis: 'this';
		case TSuper: 'super';
		case TInt(s): s;
		case TFloat(s): s;
		case TNull: 'null';
		case TBreak: 'break';
		case TContinue: 'continue';
		case TBinop(op, a, b):
			a.stringify() + ' ' + op.stringify() + ' ' + b.stringify();
		case TBlock([]): '{}';
		case TBlock(elements):
			r = '{\n';
			pushScope();
			pushTab();
			for (element in elements)
				switch(element) {
					case _:
						var code = tabs + element.stringifyBlockExpression() + ';\n';
						// TODO if(!element.match(TBlock(_),TTry(_)))
						if(!element.match(TBlock(_)) && code.length < 256)
						trace('Generated block expression `${untyped code.trim()}`');
						r += code;
				}
			popTab(); // This is nearest to pushTab for cache locality
			popScope();
			r + tabs + '}';

		case TElvis(a, b): a.stringify() + '||' + b.stringify();
		case TFor(n, a, b):
			var name = n.rename();
			if(hasInScope(name)) name += (++id) + postfix;
			addToScope(name);
			parentNames.set(node, name);
			'for(' + name.rename() + ' in ' + a.stringify() + ') '
			+ b.stringify();

		case TCall(TIdent('__instanceof__'), [of, type]):
		of.stringify() + ' instanceof ' + type.stringify();
		case TCall(TIdent('__typeof__'), [of]):
		'typeof ' + of.stringify();

		case TCall(e, el): e.stringify() + '(' + [for (e in el) e.stringify()].join(',') + ')';
		case TParenthesis(e): '(' + e.stringify() + ')';
		case TReturn(null), TReturn(TBlock([])): 'return ';
		case TReturn(e): 'return ' + e.stringify();
		case TThrow(e): 'throw ' + e.stringify() + '';
		case TArray([TFor(oname, array, expr)]):
			r += '((function(){';
			r += 'var return$postfix = [];';
			var name = oname.rename();
			if(hasInScope(name)) name += postfix + (++id);
			addToScope(name);
			parentNames.set(node, name);
			r += 'for(' + name + ' in ' + array.stringify() + ') ';
			r += 'return$postfix.push(';
			r += expr.stringify();
			r += '); return$postfix;';
			r += '})())';

		case TArray(el): '[' + [for (e in el) e.stringify()].join(',') + ']';
		case TMap([],_): 'new Map()';
		case TMap(keys,values):
			'[' +
			[for(i in 0...keys.length) '' + keys[i].stringify()+ ' => ' + values[i].stringify() + ''].join(',')
			+ ']';

		case TIf(econd, eif, eelse):
		//	throw '' + node;
			r = '(' + [for(e in econd) e.stringify()].join(' && ') + ')? (' +  eif.stringify();
			if (eelse != null) r += ') : (' + eelse.stringify() + ')';
			r;

		case TUnop(op, isPostfix, e): isPostfix ? e.stringify() + op.stringify() : op.stringify() + e.stringify();
		case TWhile(econd, e, true): 'while(' + econd.stringify() + ') ' + e.stringify();
		case TWhile(econd, e, false): 'do{' + e.stringify() + '}while(' + econd.stringify() + ')';
		case TDot(TString(s), 'length'): ''+s.length;
		case TDot(expr, name):
		trace('.`$name`');
		expr.stringify() + '.' + name.rename();
		case TIndex(expr, index): expr.stringify() + '[' + index.stringify() + ']';
		case TAs(expr, kind, t): '(' + expr.stringify() + ')';
		case TFunction(name, expr, vars, _):
			r = 'function';
			if(name != null) r += ' ' + name.rename();
			//if(name != null) r += 'const  ' + name.rename() + " = ";
			r += '(' + [for(v in vars)
				switch (v) {
					case TVar(name, _, _), TIdent(name):
						parentNames.set(v, name.rename());
						parentNames.get(v);
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
			if (expr != null) es = ' = ' + expr.stringify();
			addToScope(oname);
			var name = oname.rename();
			if(hasInScope(oname)) {
				name += (++id) + postfix;
			}
			parentNames.set(node, name);
			if(name == null) throw 'name is null for $node';
			r = (const?'var ':'var ') + name + es;
			r;
		case TTry(expr, vars, t, v, catches):
			r = 'try {\n$tabs\t';
			pushTab();
			switch(expr) {
				case TBlock(el): r += [for(e in el) e.stringifyBlockExpression()].join(';\n'+tabs);
				case _:	r += expr.stringify();
			}

			popTab();
			r += '\n' + tabs + '} catch('+vars[0]+') {\n$tabs\t';
			pushTab();
			parentNames.set(v[0], vars[0]);
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
				for(c in conds[i])
					r += 'case ' + c.stringify() + ':';
				r += ' {\n';
				r += tabs + '\t' + c.stringify() + ';\n';
				r += tabs + '\t' + '\n' + '$tabs}' + '\n';
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
			r += '/* extern class $cname */';
		case TClass(t, ext, impl, fields, external):
			var cname = extractTypeName(t);
			r = (external?'/* extern class ' : 'class ') + cname;
			if (ext != null) r += ' extends ' + extractTypeName(ext);
			r += ' {\n';
			var after = [];
			for (f in fields) {
				var code = '';
				var isafter = false;

				function unmeta(f) {
					switch(f) {
						case _: return f;
					}
				}

				f = unmeta(f);

				switch(f) {
					case TStatic(field): f = field; isafter = true;
					case _: {};
				}

				f = unmeta(f);
				switch(f) {
					case TFunction(name, expr, vars, _):
						{
							if(name == 'new') name = 'constructor';
							if(isafter) code += cname + '.' + name.rename() + ' = function';
							else code += '\t'+name.rename();
							code += '(' + [for(v in vars)
								switch (v) {
									case TVar(name, _, _):
									var name = name.rename();
									parentNames.set(v, name);
									parentNames.get(v);
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
										code += '{\n$tabs' + expr.stringify();
										popTab();
										code += ';\n$tabs}';
								}
							}
							else code += '{}';
						}
					case TVar(name, t, expr, const):
						isafter = true;
						code += cname + '.' + name.rename();
						if(expr != null) {  ///expwezcode
							code += ' = ' + expr.stringify();
						}
					case _: code += ''+f;
				}

				if(isafter) after.push(tabs + code) else r += '\t' + code;

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
		case TObject(names, el): '{' + [for (i in 0...el.length) names[i].rename() + ':' + el[i].stringify()].join(', ') + '}';

		case TStatic(field): 'static ' + field.stringify();

		// Types
		case TEnum(t, fields):
			r = '@:enum abstract ' + extractTypeName(t) + '(String)';
			r += ' {\n';
			pushTab();
			for (f in fields) {
				switch(f) {
					case TBinop(OpAssign, TIdent(name), val):
					r += tabs + 'var ' + name + ' = ' + val.stringify() + ';\n';
					case TIdent(name):
					r += tabs + 'var ' + name + ' = {};\n';
					case _: throw '!' + f;
				}
			}
			popTab();
			r + tabs + '}';
		case TType(name, t): ''; // TODO Print aliases?
		case TUnderscore: '_';
		case TDeclare(name, node):
			parentNames.set(node, name);
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

	public static function generatePackageJson(pack: Package): String {
		var jspackage = {  name: pack.main,
			version: pack.main,
			description: pack.description,
			main: pack.main,
			author: pack.author,
			license: pack.license
		}
		return haxe.Json.stringify(jspackage, null, "\t");
	}
}
