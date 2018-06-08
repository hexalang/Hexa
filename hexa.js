// LICENSE LGPL-2.1-or-later
{
	"use strict"
	let Token
	let NodeType
	let DataHelper
	let Node
	let NodeData
	let Project
	let Extentions
	let ParsedPath
	let Fail
	let CompilerError
	let Lexer
	let Tokens
	let TestLexer
	let Parser
	let TestParser
	let TestTyper
	let Typer
	let GenJs
	Token/*!1*/ = {
		Eof:0,
		Default:123,
		Underscore:1,
		KBreak:3,
		KCase:4,
		KCatch:6,
		KClass:7,
		KContinue:8,
		KDo:9,
		KElse:10,
		KEnum:11,
		KExtends:12,
		KDeclare:13,
		KFalse:14,
		KFor:15,
		KFunction:16,
		KIf:17,
		KImplements:18,
		KIn:20,
		KInterface:22,
		KLet:23,
		KNew:25,
		KNull:26,
		KModule:28,
		KPrivate:29,
		KReturn:31,
		KStatic:32,
		KSwitch:33,
		KThis:34,
		KThrow:35,
		KTrue:36,
		KTry:37,
		KUsing:39,
		KVar:40,
		KWhile:41,
		KIs:57,
		KAs:58,
		KSuper:59,
		LFloat:60,
		LUpper:61,
		LLower:62,
		LInt:63,
		LString:64,
		LDoc:65,
		At:70,
		BkClose:71,
		BkOpen:72,
		BrClose:73,
		BrOpen:74,
		Comma:75,
		DblDot:76,
		Dot:77,
		Sharp:78,
		PClose:79,
		POpen:80,
		Question:81,
		Semicolon:82,
		Query:83,
		Interval:98,
		OpDecrement:86,
		OpIncrement:87,
		OpNegBits:88,
		OpNot:89,
		OpArrow:90,
		OpAssign:91,
		OpBoolAnd:92,
		OpBoolOr:93,
		OpDiv:94,
		OpEq:95,
		OpGt:96,
		OpGte:97,
		OpLt:99,
		OpLte:100,
		OpMod:101,
		OpMult:102,
		OpNotEq:103,
		OpOr:104,
		OpShl:105,
		OpShr:106,
		OpSub:107,
		OpUShr:108,
		OpXor:109,
		OpIntDiv:110,
		OpAdd:111,
		OpAnd:112,
		OpChain:113,
		stringify:(token, param) => {
				const x = token + param;
				{
				const $switch$ = token;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.At: {
					return '@';
				}
				break;
				case Token.Query: {
					return '$';
				}
				break;
				case Token.Sharp: {
					return '#';
				}
				break;
				case Token.BkClose: {
					return ']';
				}
				break;
				case Token.BkOpen: {
					return '[';
				}
				break;
				case Token.BrClose: {
					return '}';
				}
				break;
				case Token.BrOpen: {
					return '{';
				}
				break;
				case Token.Comma: {
					return ',';
				}
				break;
				case Token.DblDot: {
					return ':';
				}
				break;
				case Token.Default: {
					return '<!--default-->';
				}
				break;
				case Token.Dot: {
					return '.';
				}
				break;
				case Token.Eof: {
					return '<!--eof-->';
				}
				break;
				case Token.Interval: {
					return '...';
				}
				break;
				case Token.KAs: {
					return 'as';
				}
				break;
				case Token.KBreak: {
					return 'break';
				}
				break;
				case Token.KCase: {
					return 'case';
				}
				break;
				case Token.KCatch: {
					return 'catch';
				}
				break;
				case Token.KClass: {
					return 'class';
				}
				break;
				case Token.KContinue: {
					return 'continue';
				}
				break;
				case Token.KDo: {
					return 'do';
				}
				break;
				case Token.KElse: {
					return 'else';
				}
				break;
				case Token.KEnum: {
					return 'enum';
				}
				break;
				case Token.KExtends: {
					return 'extends';
				}
				break;
				case Token.KDeclare: {
					return 'declare';
				}
				break;
				case Token.KFalse: {
					return 'false';
				}
				break;
				case Token.KFor: {
					return 'for';
				}
				break;
				case Token.KFunction: {
					return 'function';
				}
				break;
				case Token.KIf: {
					return 'if';
				}
				break;
				case Token.KImplements: {
					return 'implements';
				}
				break;
				case Token.KIn: {
					return 'in';
				}
				break;
				case Token.KInterface: {
					return 'interface';
				}
				break;
				case Token.KLet: {
					return 'let';
				}
				break;
				case Token.KNew: {
					return 'new';
				}
				break;
				case Token.KNull: {
					return 'null';
				}
				break;
				case Token.KModule: {
					return 'module';
				}
				break;
				case Token.KPrivate: {
					return 'private';
				}
				break;
				case Token.KReturn: {
					return 'return';
				}
				break;
				case Token.KStatic: {
					return 'static';
				}
				break;
				case Token.KSuper: {
					return 'super';
				}
				break;
				case Token.KSwitch: {
					return 'switch';
				}
				break;
				case Token.KThis: {
					return 'this';
				}
				break;
				case Token.KThrow: {
					return 'throw';
				}
				break;
				case Token.KTrue: {
					return 'true';
				}
				break;
				case Token.KTry: {
					return 'try';
				}
				break;
				case Token.KUsing: {
					return 'using';
				}
				break;
				case Token.KVar: {
					return 'var';
				}
				break;
				case Token.KWhile: {
					return 'while';
				}
				break;
				case Token.OpAdd: {
					return '+';
				}
				break;
				case Token.OpAnd: {
					return '&';
				}
				break;
				case Token.OpArrow: {
					return '=>';
				}
				break;
				case Token.OpAssign: {
					return '=';
				}
				break;
				case Token.OpBoolAnd: {
					return '&&';
				}
				break;
				case Token.OpBoolOr: {
					return '||';
				}
				break;
				case Token.OpDecrement: {
					return '--';
				}
				break;
				case Token.OpDiv: {
					return '/';
				}
				break;
				case Token.OpEq: {
					return '==';
				}
				break;
				case Token.OpGt: {
					return '>';
				}
				break;
				case Token.OpGte: {
					return '>=';
				}
				break;
				case Token.OpIncrement: {
					return '++';
				}
				break;
				case Token.OpIntDiv: {
					return '\\';
				}
				break;
				case Token.OpLt: {
					return '<';
				}
				break;
				case Token.OpLte: {
					return '<=';
				}
				break;
				case Token.OpMod: {
					return '%';
				}
				break;
				case Token.OpMult: {
					return '*';
				}
				break;
				case Token.OpNegBits: {
					return '~';
				}
				break;
				case Token.OpNot: {
					return '!';
				}
				break;
				case Token.OpNotEq: {
					return '!=';
				}
				break;
				case Token.OpOr: {
					return '|';
				}
				break;
				case Token.OpShl: {
					return '<<';
				}
				break;
				case Token.OpShr: {
					return '>>';
				}
				break;
				case Token.OpSub: {
					return '-';
				}
				break;
				case Token.OpUShr: {
					return '>>>';
				}
				break;
				case Token.OpXor: {
					return '^';
				}
				break;
				case Token.OpChain: {
					return '?.';
				}
				break;
				case Token.PClose: {
					return ')';
				}
				break;
				case Token.POpen: {
					return '(';
				}
				break;
				case Token.Question: {
					return '?';
				}
				break;
				case Token.Semicolon: {
					return ';';
				}
				break;
				case Token.Underscore: {
					return '_';
				}
				break;
				case Token.LUpper: {
					return param == (null)? ('<!--upper-->') : (param);
				}
				break;
				case Token.LString: {
					return param == (null)? ('<!--string-->') : (('\'' + (param) + '\''));
				}
				break;
				case Token.LLower: {
					return param == (null)? ('<!--lower-->') : (param);
				}
				break;
				case Token.LInt: {
					return param == (null)? ('<!--integer-->') : (param);
				}
				break;
				case Token.LFloat: {
					return param == (null)? ('<!--float-->') : (param);
				}
				break;
				case Token.LDoc: {
					return ('///' + (param) + '');
				}
				break;
				case Token.KIs: {
					return 'is';
				}
				break;
				
				}};
			},
	};
	NodeType/*!1*/ = {
		Optional:(type)=>{ const $r = ["Optional",0,type]; return $r },
		Type:(name)=>{ const $r = ["Type",1,name]; return $r },
		ParametricType:(name,params)=>{ const $r = ["ParametricType",2,name,params]; return $r },
		Function:(args,ret)=>{ const $r = ["Function",3,args,ret]; return $r },
		FunctionArg:(name,type,defaultValue)=>{ const $r = ["FunctionArg",4,name,type,defaultValue]; return $r },
		Object:(names,types)=>{ const $r = ["Object",5,names,types]; return $r },
	};
	DataHelper/*!5*/ = class DataHelper {

	}
	DataHelper.varName = (v) => {
			{
			const $switch$ = v;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 21: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			default:
				{
				throw ('varName got not a TVar, but `' + (v) + '`');
			}
			}};
		};
	DataHelper.nameOf = (v$1) => {
			{
			const $switch$ = v$1;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 41: {
			const node = $switch$[2];
			{
				return DataHelper.nameOf(node);
			} break; }
			case 21: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			case 33: {
			const t = $switch$[2];
			{
				{
				const $switch$ = t;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 1: {
				const name = $switch$[2];
				{
					return name;
				} break; }
				case 2: {
				const name = $switch$[2];
				{
					return name;
				} break; }
				
				}};
				throw 'unreachable';
			} break; }
			case 20: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			case 23: {
			const t = $switch$[2];
			{
				{
				const $switch$ = t;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 1: {
				const name = $switch$[2];
				{
					return name;
				} break; }
				case 2: {
				const name = $switch$[2];
				{
					return name;
				} break; }
				
				}};
				throw 'unreachable';
			} break; }
			case 35: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			default:
				{
				throw ('nameOf expected named node, but got `' + (v$1) + '`');
			}
			}};
		};
	DataHelper.asStringAttValue = (a, index) => {
			{
			const $switch$ = a.values[index];
			if($switch$ == null) {
				{
				throw 'Got null, not a string';
			}
			} else {
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 0: {
			const s = $switch$[2];
			{
				return s;
			} break; }
			default:
				{
				throw ('Got `' + (a.values[index]) + '`, not a string');
			}
			}
			} };
		};
	DataHelper.getLastOfBlock = (block) => {
			{
			const $switch$ = block;
			if($switch$ == null) {
				{
				throw 'Got null, not a block';
			}
			} else {
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 10: {
			const el = $switch$[2];
			{
				return el[el.length - 1];
			} break; }
			default:
				{
				throw ('Got `' + (block) + '`, not a block');
			}
			}
			} };
		};
	DataHelper.isVoidValue = (block$2) => {
			{
			const $switch$ = block$2;
			if($switch$ == null) {
				{
				return true;
			}
			} else {
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 14: {
			{
				return true;
			} break; }
			case 16: {{
				return true;
			} break; }
			case 17: {{
				return true;
			} break; }
			case 21: {
			{
				return true;
			} break; }
			case 12: {
			const eelse = $switch$[4];
			{
				if (eelse == null) {
					return true;
				};
			} break; }
			case 33: {
			{
				return true;
			} break; }
			case 23: {
			{
				return true;
			} break; }
			case 30: {
			{
				return true;
			} break; }
			case 10: {
			const el = $switch$[2];
			{
				if (el.length == 0) {
					return true;
				};
				return DataHelper.isVoidValue(el[el.length - 1]);
			} break; }
			default:
				{
				return false;
			}
			}
			} };
			return false;
		};
	Node/*!1*/ = {
		TString:(s)=>{ const $r = ["TString",0,s]; return $r },
		TIdent:(s)=>{ const $r = ["TIdent",1,s]; return $r },
		TBool:(b)=>{ const $r = ["TBool",2,b]; return $r },
		TThis:["TThis",3],
		TSuper:["TSuper",4],
		TInt:(s)=>{ const $r = ["TInt",5,s]; return $r },
		TFloat:(s)=>{ const $r = ["TFloat",6,s]; return $r },
		TNull:["TNull",7],
		TBinop:(a,op,b)=>{ const $r = ["TBinop",8,a,op,b]; return $r },
		TAssignop:(a,op,b)=>{ const $r = ["TAssignop",9,a,op,b]; return $r },
		TBlock:(el)=>{ const $r = ["TBlock",10,el]; return $r },
		TCall:(e,args,argNames)=>{ const $r = ["TCall",11,e,args,argNames]; return $r },
		TIf:(econd,eif,eelse)=>{ const $r = ["TIf",12,econd,eif,eelse]; return $r },
		TParenthesis:(inner)=>{ const $r = ["TParenthesis",13,inner]; return $r },
		TReturn:(e)=>{ const $r = ["TReturn",14,e]; return $r },
		TThrow:(e)=>{ const $r = ["TThrow",15,e]; return $r },
		TBreak:["TBreak",16],
		TContinue:["TContinue",17],
		TUnop:(op,postfix,e)=>{ const $r = ["TUnop",18,op,postfix,e]; return $r },
		TWhile:(econd,e,pre)=>{ const $r = ["TWhile",19,econd,e,pre]; return $r },
		TFunction:(name,expr,vars,rettype)=>{ const $r = ["TFunction",20,name,expr,vars,rettype]; return $r },
		TVar:(name,t,expr,$const)=>{ const $r = ["TVar",21,name,t,expr,$const]; return $r },
		TVars:(vars)=>{ const $r = ["TVars",22,vars]; return $r },
		TClass:(t,ext,impl,fields,external)=>{ const $r = ["TClass",23,t,ext,impl,fields,external]; return $r },
		TTry:(expr,t,v,catches)=>{ const $r = ["TTry",24,expr,t,v,catches]; return $r },
		TDot:(expr,name)=>{ const $r = ["TDot",25,expr,name]; return $r },
		TNew:(path,t,args,fields,el)=>{ const $r = ["TNew",26,path,t,args,fields,el]; return $r },
		TArray:(elements)=>{ const $r = ["TArray",27,elements]; return $r },
		TMap:(keys,values)=>{ const $r = ["TMap",28,keys,values]; return $r },
		TIndex:(expr,index)=>{ const $r = ["TIndex",29,expr,index]; return $r },
		TSwitch:(exprs,conds,guards,cases)=>{ const $r = ["TSwitch",30,exprs,conds,guards,cases]; return $r },
		TModule:(path,el)=>{ const $r = ["TModule",31,path,el]; return $r },
		TObject:(names,el)=>{ const $r = ["TObject",32,names,el]; return $r },
		TEnum:(t,fields)=>{ const $r = ["TEnum",33,t,fields]; return $r },
		TEnumExtract:(path,bind,expr)=>{ const $r = ["TEnumExtract",34,path,bind,expr]; return $r },
		TDeclare:(name,t)=>{ const $r = ["TDeclare",35,name,t]; return $r },
		TUsing:(path)=>{ const $r = ["TUsing",36,path]; return $r },
		TIs:(expr,t)=>{ const $r = ["TIs",37,expr,t]; return $r },
		TAs:(expr,kind,t)=>{ const $r = ["TAs",38,expr,kind,t]; return $r },
		TUnderscore:["TUnderscore",39],
		TStatic:(field)=>{ const $r = ["TStatic",40,field]; return $r },
		TPrivate:(field)=>{ const $r = ["TPrivate",41,field]; return $r },
		TExport:(field)=>{ const $r = ["TExport",42,field]; return $r },
		TFor:(name,over,by)=>{ const $r = ["TFor",43,name,over,by]; return $r },
		TElvis:(nullable,othewise)=>{ const $r = ["TElvis",44,nullable,othewise]; return $r },
		NodeTypeValue:(type)=>{ const $r = ["NodeTypeValue",45,type]; return $r },
	};
	NodeData/*!5*/ = class NodeData {

		constructor(atLine, atColumn, atFile) {
	this.line = null;
	this.column = null;
	this.fileName = null
	{
			this.line = atLine;
			this.column = atColumn;
			this.fileName = atFile;
		}
}
	}
;
	Project/*!5*/ = class Project {

	}
	Project.mapAttributes = new Map();
	Project.mapNames = new Map();
	Project.data = new Map();
/*declare Handle*/
/*declare Attribute*/
	Extentions/*!5*/ = class Extentions {

	}
	Extentions.trim = (s) => {
		return s['trim']()
	}
;
/*declare Readline*/const readlinesync = require("readline-sync");
	
/*declare Fs*/const fs = require("fs");
	
/*declare Path*/const path = require("path");
	
	ParsedPath/*!5*/ = class ParsedPath {

	}
;
/*declare Process*/
/*declare ProcessStd*/
/*declare Console*/
/*declare Map*/
/*declare Buffer*/
/*declare eval*/
/*declare __js__*/
/*declare JSON*/
/*declare Math*/
/*declare String*/
/*declare Array*/
	Fail/*!1*/ = {
		ParserError:["ParserError",0],
		ParserInternalError:["ParserInternalError",1],
		LexerError:["LexerError",2],
		TyperError:["TyperError",3],
		InfererError:["InfererError",4],
	};
	CompilerError/*!5*/ = class CompilerError {

		toString() {
			return '[' + this.fileName + ':' + this.line + ':' + this.column + ']: ' + this.details;
		}
		constructor(except, details, line, column, filename) {
	this.exception = null;
	this.details = null;
	this.line = null;
	this.column = null;
	this.fileName = null
	{
			this.exception = except;
			this.details = details == (null)? ('') : (details);
			this.line = line == (null)? (0) : (line);
			this.column = column == (null)? (0) : (column);
			this.fileName = filename == (null)? ('') : (filename);
		}
}
	}
;
	Lexer/*!5*/ = class Lexer {

	}
	Lexer.tokenize = (bytes, fileName) => {
			let position = 0;
			let len = bytes.length;
			let to = 0;
			let s$3 = '';
			let p = 0;
			let line$4 = 1;
			let columnBase = 0;
			let params = new Array();
			let tokens = Buffer.alloc(len + 1);
			let lines = [];
			let columns = [];
			const add = (t) => {
				tokens[to++] = t;
				lines.push(line$4);
				columns.push(position - columnBase - 1);
			};
			const addn = (t, p$5) => {
				params[to] = p$5;
				add(t);
			};
			const curPos = () => {
				return position - columnBase - 1
					};
			const get_8 = (pos) => {
				return bytes[pos]
					};
			const not_eof = () => {
				return (position < len)
					};
			const new_line = () => {
				line$4++;
				columnBase = position;
			};
			const fail = (message, erline, column$6, filename$7) => {
				let erline$8 = erline != (null)? (erline) : (line$4);
				let column$9 = column$6 != (null)? (column$6) : (curPos());
				let filename$10 = filename$7 != (null)? (filename$7) : (fileName);
				return new CompilerError(Fail.LexerError, message, erline$8, column$9, filename$10);
			};
			if (len > 2 && get_8(0) == 239 && get_8(1) == 187 && get_8(2) == 191) {
				position += 3;
			};
			while(position < len) {
				let _8 = 0;
				do{{
					_8 = get_8(position);
					if (_8 == 10) {
						new_line();
					};
				}}while(_8 <= 32 && (++position < len));
				if (!not_eof()) {
					break;
				};
				let _16 = (len - position) > (1)? (_8 | (get_8(position + 1) << 8)) : (_8);
				if (_8 == '/'.charCodeAt(0)) {
					if (_16 == 0x2f2f) {
						let pos = position + 2;
						while(get_8(position) != 10 && not_eof()) {
							position++;
						};
						continue;
					};
					if (_16 == 10799 && get_8(position + 2) == '*'.charCodeAt(0)) {
						position += 3;
						p = position;
						while(not_eof()) {
							let _32 = (len - position) > (3)? (bytes.readUInt32LE(position)) : (get_8(position));
							if ((_32 & 0xFF) == 10) {
								new_line();
							} else if ((_32 & 0xFFFFFF) == 3090986) {
								break;
							};
							position++;
						};
						if (!not_eof()) {
							throw fail('Unclosed doc-comment');
						};
						addn(Token.LDoc, bytes.toString('utf8', p, position));
						position += 3;
						continue;
					};
					if (_16 == 10799) {
						let pos = position + 2;
						p = 0;
						position += 2;
						while(not_eof()) {
							_16 = (len - position) > (1)? (bytes.readUInt16LE(position)) : (get_8(position));
							if ((_16 & 0xFF) == 10) {
								new_line();
							} else if (_16 == 12074 && p > 0) {
								p--;
							} else if (_16 == 10799) {
								p++;
							} else if (_16 == 12074 && p == 0) {
								break;
							};
							position++;
						};
						position += 2;
						continue;
					};
				};
				if (((_8 & 95) >= 65 && (_8 & 95) <= 90) || (_8 == 95)) {
					let titlechar = _8;
					p = position + 1;
					_8 = get_8(p);
					while(p < len && Lexer.isident[_8] != 0) _8 = get_8(++p);
					s$3 = bytes.toString('ascii', position, p);
					let t = (((_16 & 0xFF) <= 90))? (null) : (Lexer.kwd.get(s$3));
					if (t != null) {
						add(t);
					} else {
						if (titlechar >= 65 && titlechar <= 90) {
							addn(Token.LUpper, s$3);
						} else {
							addn(Token.LLower, s$3);
						};
					};
					position = p;
					continue;
				};
				if (_16 == 11822 && (get_8(position + 2) == '.'.charCodeAt(0))) {
					add(Token.Interval);
					position += 3;
					continue;
				};
				if (_16 == 15934 && (get_8(position + 2) == '>'.charCodeAt(0))) {
					add(Token.OpUShr);
					position += 3;
					continue;
				};
				let hash = Lexer.simplehash(_16);
				if (_16 == Lexer.op16token.readUInt16LE(hash * 2)) {
					add(Lexer.op16token[hash + 512]);
					position += 2;
					continue;
				};
				let found = Lexer.ops8a[_8];
				if (found != Token.Eof) {
					add(found);
					position++;
					continue;
				};
				if (_8 < 40) {
					p = _8;
					position++;
					let pos = position;
					while(get_8(position) != p && not_eof()) {
						if (get_8(position) == 10) {
							new_line();
						};
						if (get_8(position) == '\\'.charCodeAt(0)) {
							position += 2;
							continue;
						};
						_16 = (len - position) > (1)? (bytes.readUInt16LE(position)) : (get_8(position));
						position++;
					};
					addn(Token.LString, bytes.toString('utf8', pos, position));
					position++;
					continue;
				};
				if (_16 == 30768) {
					p = position;
					p += 2;
					_8 = get_8(position);
					while((_8 >= 65 && _8 <= 70) || (_8 >= 48 && _8 <= 57) || (_8 >= 97 && _8 <= 102)) {
						_8 = get_8(++p);
					};
					if (p - position == 2) {
						throw fail('Integer `0x` not allowed!');
					};
					addn(Token.LInt, bytes.toString('ascii', position, p));
					position = p;
					continue;
				};
				if (_8 < 58) {
					p = position;
					_8 = get_8(p);
					let found$11 = Token.LInt;
					while(_8 >= 48 && _8 <= 57) {
						_8 = get_8(++p);
					};
					if (_8 == '.'.charCodeAt(0) && get_8(p + 1) != '.'.charCodeAt(0)) {
						_8 = get_8(++p);
						while(_8 >= 48 && _8 <= 57) {
							_8 = get_8(++p);
						};
						found$11 = Token.LFloat;
					};
					if (_8 == 'e'.charCodeAt(0) || _8 == 'E'.charCodeAt(0)) {
						_8 = get_8(++p);
						if (_8 == '+'.charCodeAt(0) || _8 == '-'.charCodeAt(0)) {
							_8 = get_8(++p);
						};
						while(_8 >= 48 && _8 <= 57) {
							_8 = get_8(++p);
						};
						found$11 = Token.LFloat;
					};
					addn(found$11, bytes.toString('ascii', position, p));
					position = p;
					continue;
				};
				if (position >= len) {
					break;
				};
				throw fail('Unexpected character ' + String.fromCharCode(_8));
				break;
			};
			return new Tokens(tokens, to, params, lines, columns, fileName);
		};
	Lexer.init = () => {
			Lexer.isident = Buffer.alloc(256);
			{ let _8 = 0; while(_8 < 256) {Lexer.isident[_8] = (((_8 >= 65 && _8 <= 90) || (_8 >= 48 && _8 <= 57) || (_8 >= 97 && _8 <= 122) || _8 == 95))? (128) : (0)
			_8++; }
			 };
			Lexer.isUpper = Buffer.alloc(256);
			{ let _8 = 0; while(_8 < 256) {Lexer.isident[_8] = (((_8 >= 65 && _8 <= 90) || (_8 >= 48 && _8 <= 57) || (_8 >= 97 && _8 <= 122) || _8 == 95))? (128) : (0)
			_8++; }
			 };
			Lexer.isident = Buffer.alloc(256);
			{ let _8 = 0; while(_8 < 256) {Lexer.isident[_8] = (((_8 >= 65 && _8 <= 90) || (_8 >= 48 && _8 <= 57) || (_8 >= 97 && _8 <= 122) || _8 == 95))? (128) : (0)
			_8++; }
			 };
			Lexer.kwd = new Map([['_', Token.Underscore], ['as', Token.KAs], ['break', Token.KBreak], ['case', Token.KCase], ['catch', Token.KCatch], ['class', Token.KClass], ['continue', Token.KContinue], ['do', Token.KDo], ['else', Token.KElse], ['enum', Token.KEnum], ['extends', Token.KExtends], ['declare', Token.KDeclare], ['false', Token.KFalse], ['for', Token.KFor], ['function', Token.KFunction], ['if', Token.KIf], ['implements', Token.KImplements], ['in', Token.KIn], ['interface', Token.KInterface], ['let', Token.KLet], ['new', Token.KNew], ['null', Token.KNull], ['module', Token.KModule], ['private', Token.KPrivate], ['return', Token.KReturn], ['static', Token.KStatic], ['super', Token.KSuper], ['switch', Token.KSwitch], ['this', Token.KThis], ['throw', Token.KThrow], ['true', Token.KTrue], ['try', Token.KTry], ['using', Token.KUsing], ['var', Token.KVar], ['while', Token.KWhile], ['is', Token.KIs]]);
			let ops8 = new Map([['@'.charCodeAt(0), Token.At], ['$'.charCodeAt(0), Token.Query], ['#'.charCodeAt(0), Token.Sharp], ['!'.charCodeAt(0), Token.OpNot], ['%'.charCodeAt(0), Token.OpMod], ['&'.charCodeAt(0), Token.OpAnd], ['('.charCodeAt(0), Token.POpen], [')'.charCodeAt(0), Token.PClose], ['*'.charCodeAt(0), Token.OpMult], ['+'.charCodeAt(0), Token.OpAdd], [','.charCodeAt(0), Token.Comma], ['-'.charCodeAt(0), Token.OpSub], ['.'.charCodeAt(0), Token.Dot], ['/'.charCodeAt(0), Token.OpDiv], [':'.charCodeAt(0), Token.DblDot], [';'.charCodeAt(0), Token.Semicolon], ['<'.charCodeAt(0), Token.OpLt], ['='.charCodeAt(0), Token.OpAssign], ['>'.charCodeAt(0), Token.OpGt], ['?'.charCodeAt(0), Token.Question], ['['.charCodeAt(0), Token.BkOpen], ['\\'.charCodeAt(0), Token.OpIntDiv], [']'.charCodeAt(0), Token.BkClose], ['^'.charCodeAt(0), Token.OpXor], ['{'.charCodeAt(0), Token.BrOpen], ['|'.charCodeAt(0), Token.OpOr], ['}'.charCodeAt(0), Token.BrClose], ['~'.charCodeAt(0), Token.OpNegBits]]);
			Lexer.ops8a = Buffer.alloc(256);
			for (const key of ops8.keys()) Lexer.ops8a[key] = ops8.get(key);
			let ops16 = new Map([[11051, Token.OpIncrement], [11565, Token.OpDecrement], [15420, Token.OpShl], [15649, Token.OpNotEq], [15676, Token.OpLte], [15677, Token.OpEq], [15678, Token.OpGte], [15934, Token.OpShr], [31868, Token.OpBoolOr], [9766, Token.OpBoolAnd], [15933, Token.OpArrow], [11839, Token.OpChain]]);
			for (const key1 of ops16.keys()) {
				for (const key2 of ops16.keys()) {
					if (key1 != key2 && Lexer.simplehash(key1) == Lexer.simplehash(key2)) {
						throw new CompilerError(Fail.LexerError, '2-byte op hash collision: ' + key1 + ' ' + key2, 0, 0, 'INTERNAL');
					};
				};
			};
			Lexer.op16token = Buffer.alloc(768);
			for (const key of ops16.keys()) {
				let hash = Lexer.simplehash(key);
				Lexer.op16token.writeUInt16LE(key, hash * 2);
				Lexer.op16token[hash + 512] = ops16.get(key);
			};
			return ;
		};
	Lexer.simplehash = (val) => {
			return ((val & 0xff) + (((val >> (8 * 1)) & 0xff) << 3)) & 0xEF;
		};
	Lexer.isident = null;
	Lexer.isUpper = null;
	Lexer.isLower = null;
	Lexer.ops8a = null;
	Lexer.op16token = null;
	Lexer.kwd = null;
	Tokens/*!5*/ = class Tokens {

		constructor(tokens, length, values, lines, columns, fileName$12) {
	this.token = null;
	this.value = null;
	this.length = null;
	this.line = null;
	this.column = null;
	this.fileName = null
	{
			this.token = tokens;
			this.length = length;
			this.value = values;
			this.line = lines;
			this.column = columns;
			this.fileName = fileName$12;
		}
}
	}
;
	TestLexer/*!5*/ = class TestLexer {

	}
	TestLexer.test = () => {
			console.log('TestLexer begin');
			Lexer.init();
			TestLexer.compare('', [], []);
			TestLexer.compare('\n', [], []);
			TestLexer.compare('\n\n', [], []);
			TestLexer.compare('\r\r\n\r\n\r\t', [], []);
			TestLexer.compare(' ', [], []);
			TestLexer.compare('  ', [], []);
			TestLexer.compare('	', [], []);
			TestLexer.compare('		', [], []);
			TestLexer.compare('	 	', [], []);
			TestLexer.compare('123', [Token.LInt], ['123']);
			TestLexer.compare(' 0 ', [Token.LInt], ['0']);
			TestLexer.compare(' } ', [Token.BrClose], [null]);
			TestLexer.compare('0', [Token.LInt], ['0']);
			TestLexer.compare('1 2 3', [Token.LInt, Token.LInt, Token.LInt], ['1', '2', '3']);
			TestLexer.compare('0x1', [Token.LInt], ['0x1']);
			TestLexer.compare('0x0', [Token.LInt], ['0x0']);
			TestLexer.compare('0xF', [Token.LInt], ['0xF']);
			TestLexer.compare('0xFA', [Token.LInt], ['0xFA']);
			TestLexer.compare('0xFABCDEF', [Token.LInt], ['0xFABCDEF']);
			TestLexer.compare('0x1F2A3B4C5D6E7F0', [Token.LInt], ['0x1F2A3B4C5D6E7F0']);
			TestLexer.compare('0.123', [Token.LFloat], ['0.123']);
			TestLexer.compare('0.0', [Token.LFloat], ['0.0']);
			TestLexer.compare('\'s\'', [Token.LString], ['s']);
			TestLexer.compare('\"s\"', [Token.LString], ['s']);
			console.log('TestLexer done');
		};
	TestLexer.compare = (input, expect, expectValue, expectColumn, expectLine) => {
			console.log(input);
			expect.push(Token.Eof);
			const output = Lexer.tokenize(Buffer.from(input), 'TEST');
			let pos = 0;
			for (const ex of expect) {
				if (ex == Token.Eof) {
					break;
				};
				const incorrect = (text) => {
					let got = Token.stringify(output.token[pos], output.value[pos]);
					console.log(('Incorrect token `' + (got) + '` in string `' + (input) + '` at index ' + (pos) + ''));
					console.log(text);
				};
				if (ex != output.token[pos]) {
					return incorrect(('Expected `' + (Token.stringify(ex)) + '`'));
				};
				if (expectValue[pos] != output.value[pos]) {
					return incorrect(('Expected value `' + (expectValue[pos]) + '` but got `' + (output.value[pos]) + '`'));
				};
			};
		};
	Parser/*!5*/ = class Parser {

		parseFields() {
			let fields = [];
			while(this.tok() != Token.BrClose) {
				let atts = [];
				while(this.tok() == Token.At) {
					atts.push(this.parseAttribute());
				};
				let _static = false;
				if (this.tok() == Token.KStatic) {
					_static = true;
					this.i++;
				};
				{
				const $switch$ = this.tok();
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.KPrivate: {
					this.i++;
				}
				break;
				case Token.KVar: {
					let f = this.parseExpr();
					if (_static) {
						f = Node.TStatic(f);
					};
					Project.mapAttributes.set(f, atts);
					fields.push(f);
				}
				break;
				case Token.KFunction: {
					let f = this.parseExpr();
					if (_static) {
						f = Node.TStatic(f);
					};
					Project.mapAttributes.set(f, atts);
					fields.push(f);
				}
				break;
				case Token.KLet: {
					let f = this.parseExpr();
					if (_static) {
						f = Node.TStatic(f);
					};
					Project.mapAttributes.set(f, atts);
					fields.push(f);
				}
				break;
				case Token.KNew: {
					this.i++;
					let expr = null;
					let vars = [];
					let types = [];
					let values$13 = [];
					this.step(Token.POpen);
					while(this.tok() != Token.PClose) {
						vars.push(this.getgo(Token.LLower));
						if (this.tok() == Token.DblDot) {
							this.i++;
							types.push(this.parseType());
						};
						if (this.tok() == Token.OpAssign) {
							this.i++;
							values$13.push(this.parseExpr());
						};
						if (this.tok() == Token.Comma) {
							this.i++;
						};
					};
					this.step(Token.PClose);
					let tmp = this.i;
					while(this.tok() == Token.At) this.parseAttribute();
					if (this.tok() != Token.BrClose && this.tok() != Token.KFunction) {
						this.i = tmp;
						expr = this.parseExpr();
					} else this.i = tmp;
					let v$14 = [];
					{ let $v = vars.length; let i = 0; while(i < $v) {{
						v$14.push(Node.TVar(vars[i], types[i], values$13[i], true));
					}
					i++; }
					 };
					fields.push(Node.TFunction('new', expr, v$14, null));
				}
				break;
				default:
					{
					throw this.fail('Field cannot start with ' + this.print());
				}
				}};
			};
			return fields;
		}
		tok() {
			if (this.i > this.lex.length) {
				console.log('Parser is out of token space!');
				console.log('This should NOT happen.');
				console.log('Please, issue a developer (with a sample code).');
				console.log('i = ' + this.i + ' length = ' + this.lex.length);
				console.log(this.lex);
				throw this.fail(this.lex.fileName + ': Parser Internal Error: Out of token space');
			};
			let t = this.lex.token[this.i];
			if (this.lasttok != this.i) {
				this.lasttok = this.i;
				this.lasttokchecks = 40;
			} else {
				this.lasttokchecks--;
				if (this.lasttokchecks < 0) {
					throw this.fail('Parser Internal Error: Same token parsed too many times: ' + ('`' + (this.print()) + '`'));
				};
			};
			if (t == Token.Sharp) {
				this.i++;
				t = this.lex.token[this.i];
				if (t == Token.KIf) {
					this.i++;
				};
				this.i++;
				t = this.lex.token[this.i];
			};
			return t;
		}
		print() {
		return Token.stringify(this.lex.token[this.i], this.lex.value[this.i])
	}

		expect(t) {
		if (t != this.tok()) {
			this.expected(Token.stringify(t));
		}
	}

		fail(message, line$15, column$16, filename$17) {
			const line$18 = line$15 != (null)? (line$15) : (this.lex.line[this.i]);
			const column$19 = column$16 != (null)? (column$16) : (this.lex.column[this.i]);
			const filename$20 = filename$17 != (null)? (filename$17) : (this.lex.fileName);
			return new CompilerError(Fail.ParserError, message, line$18, column$19, filename$20);
		}
		getgo(t$21) {
			this.expect(t$21);
			return this.lex.value[this.i++];
		}
		step(t$22) {
			this.expect(t$22);
			this.i++;
		}
		next() {
			this.i++;
		}
		offset(v$23) {
			return this.lex.token[this.i + v$23];
		}
		unexpected() {
			let token = Token.stringify(this.lex.token[this.i], this.lex.value[this.i]);
			if (this.tok() == Token.Semicolon) {
				console.log('Note, that Hexa has no semicolons!');
			};
			if (this.print() == 'public') {
				console.log('Note, that Hexa has no `public` keyword!');
			};
			throw this.fail(('Unexpected `' + (token) + '`'));
		}
		expected(str) {
			let token = Token.stringify(this.lex.token[this.i], this.lex.value[this.i]);
			throw this.fail(('Expected `' + (str) + '` before `' + (token) + '`'));
		}
		parseExpr() {
			let atts = [];
			while(this.tok() == Token.At) atts.push(this.parseAttribute());
			let node = this.tok();
			let nodePosition = {line:this.lex.line[this.i], column:this.lex.column[this.i]};
			let result = null;
			{
			const $switch$ = node;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case Token.KUsing: {
				this.next();
				let names = [this.getgo(Token.LUpper)];
				while(this.tok() == Token.Comma) {
					this.step(Token.Comma);
					names.push(this.getgo(Token.LUpper));
				};
				result = Node.TUsing(names);
			}
			break;
			case Token.KDeclare: {
				this.i++;
				let e = null;
				{
				const $switch$ = this.tok();
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.KFunction: {
					e = this.parseFunction(false);
				}
				break;
				case Token.LUpper: {
					let left = this.parseType();
					this.step(Token.OpAssign);
					e = Node.TBinop(Node.NodeTypeValue(left), Token.OpAssign, Node.NodeTypeValue(this.parseType()));
				}
				break;
				default:
					{
					e = this.parseExpr();
					{
					const $switch$ = e;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 23: {
					const t = $switch$[2];
					const ext = $switch$[3];
					const impl = $switch$[4];
					const fields = $switch$[5];
					{
						e = Node.TClass(t, ext, impl, fields, true);
					} break; }
					default:
						{}
					}};
				}
				}};
				let name = null;
				let extracted = null;
				{
				const $switch$ = e;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 41: {
				const el = $switch$[2];
				{
					extracted = el;
				} break; }
				case 40: {
				const el = $switch$[2];
				{
					extracted = el;
				} break; }
				case 42: {
				const el = $switch$[2];
				{
					extracted = el;
				} break; }
				default:
					{
					extracted = e;
				}
				}};
				{
				const $switch$ = extracted;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 8: {
				const a = $switch$[2];
				const op = $switch$[3];
				const b = $switch$[4];
				{
					if (op != Token.OpAssign) {
						throw this.fail('declare =');
					};
					{
					const $switch$ = a;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 45: {
					const t = $switch$[2];
					{
						{
						const $switch$ = t;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 1: {
						const n = $switch$[2];
						{
							name = n;
						} break; }
						case 2: {
						const n = $switch$[2];
						{
							name = n;
						} break; }
						
						}};
					} break; }
					case 1: {
					const n = $switch$[2];
					{
						name = n;
					} break; }
					
					}};
				} break; }
				case 23: {
				const t = $switch$[2];
				{
					{
					const $switch$ = t;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 1: {
					const n = $switch$[2];
					{
						name = n;
					} break; }
					case 2: {
					const n = $switch$[2];
					{
						name = n;
					} break; }
					
					}};
				} break; }
				case 21: {
				const n = $switch$[2];
				const t = $switch$[3];
				const e = $switch$[4];
				{
					if (t == null) {
						throw this.fail(('Variable `' + (n) + '` in `declare` should have a type'));
					};
					if (e != null) {
						throw this.fail(('Variable `' + (n) + '` in `declare` should *not* have a value'));
					};
					name = n;
				} break; }
				case 20: {
				const n = $switch$[2];
				const e = $switch$[3];
				{
					if (n == null) {
						throw this.fail('Function in `declare` should have a name');
					};
					if (e != null) {
						throw this.fail('Functions in `declare` should *not* have a body');
					};
					name = n;
				} break; }
				case 22: {
				{
					throw this.fail('Place only one variable into `declare`');
				} break; }
				default:
					{
					throw this.fail('Incorrect `declare` syntax! Use `declare let name: T` or `declare function name(): T`');
				}
				}};
				result = Node.TDeclare(name, e);
			}
			break;
			case Token.BrOpen: {
				this.i++;
				if (this.tok() == Token.BrClose) {
					this.i++;
					result = Node.TBlock([]);
				} else if (this.tok() == Token.DblDot) {
					this.i++;
					this.step(Token.BrClose);
					result = Node.TObject([], []);
				} else if (this.tok() == Token.LLower && this.lex.token[this.i + 1] == Token.DblDot) {
					let names = []; let el = [];
					while(this.tok() != Token.BrClose) {
						names.push(this.getgo(Token.LLower));
						this.step(Token.DblDot);
						el.push(this.parseExpr());
						if (this.tok() == Token.Comma) {
							this.i++;
						};
					};
					this.step(Token.BrClose);
					result = Node.TObject(names, el);
				} else {
					let el = [];
					while(this.tok() != Token.BrClose) {
						el.push(this.parseExpr());
					};
					this.step(Token.BrClose);
					result = Node.TBlock(el);
				};
			}
			break;
			case Token.KIf: {
				this.i++;
				this.step(Token.POpen);
				let econd = [this.parseExpr()];
				while(this.tok() == Token.Comma) {
					this.next();
					econd.push(this.parseExpr());
				};
				this.step(Token.PClose);
				let eif = null;
				if (this.tok() != Token.DblDot) {
					eif = this.parseExpr();
				};
				let eelse = null;
				if (this.tok() == Token.KElse) {
					this.i++;
					eelse = this.parseExpr();
				};
				result = Node.TIf(econd, eif, eelse);
			}
			break;
			case Token.KWhile: {
				this.i++;
				this.step(Token.POpen);
				let econd = this.parseExpr();
				this.step(Token.PClose);
				let e = this.parseExpr();
				result = Node.TWhile(econd, e, true);
			}
			break;
			case Token.KDo: {
				this.i++;
				let e = this.parseExpr();
				this.step(Token.KWhile);
				this.step(Token.POpen);
				let econd = this.parseExpr();
				this.step(Token.PClose);
				result = Node.TWhile(econd, e, false);
			}
			break;
			case Token.POpen: {
				this.next();
				if ((this.tok() == Token.PClose && this.offset(1) == Token.OpArrow) || (this.tok() == Token.LLower && this.offset(1) == Token.Comma) || (this.tok() == Token.LLower && this.offset(1) == Token.DblDot) || (this.tok() == Token.LLower && this.offset(1) == Token.PClose && this.offset(2) == Token.OpArrow)) {
					let vars = [];
					let types = [];
					let values$24 = [];
					while(this.tok() != Token.PClose) {
						vars.push(this.getgo(Token.LLower));
						if (this.tok() == Token.DblDot) {
							this.i++;
							types.push(this.parseType());
						};
						if (this.tok() == Token.OpAssign) {
							this.i++;
							values$24.push(this.parseExpr());
						};
						if (this.tok() == Token.Comma) {
							this.i++;
						};
					};
					this.step(Token.PClose);
					this.step(Token.OpArrow);
					let v$25 = [];
					{ let $v = vars.length; let i = 0; while(i < $v) {{
						v$25.push(Node.TVar(vars[i], types[i], values$24[i], true));
					}
					i++; }
					 };
					result = Node.TFunction(null, this.parseExpr(), v$25, null);
				} else {
					let expr = this.parseExpr();
					this.step(Token.PClose);
					result = Node.TParenthesis(expr);
				};
			}
			break;
			case Token.KReturn: {
				this.i++;
				{
				const $switch$ = this.tok();
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.BrClose: {
					result = Node.TReturn(null);
				}
				break;
				case Token.KVar: {
					result = Node.TReturn(null);
				}
				break;
				default:
					{
					result = Node.TReturn(this.parseExpr());
				}
				}};
			}
			break;
			case Token.KThrow: {
				this.i++;
				result = Node.TThrow(this.parseExpr());
			}
			break;
			case Token.KContinue: {
				this.i++;
				result = Node.TContinue;
			}
			break;
			case Token.KBreak: {
				this.i++;
				result = Node.TBreak;
			}
			break;
			case Token.Underscore: {
				this.i++;
				result = Node.TUnderscore;
			}
			break;
			case Token.OpNegBits: {
				this.i++;
				result = Node.TUnop(Token.OpNegBits, false, this.parseExpr());
			}
			break;
			case Token.OpSub: {
				this.i++;
				result = Node.TUnop(Token.OpSub, false, this.parseExpr());
			}
			break;
			case Token.OpNot: {
				this.i++;
				result = Node.TUnop(Token.OpNot, false, this.parseExpr());
			}
			break;
			case Token.OpIncrement: {
				this.i++;
				result = Node.TUnop(Token.OpIncrement, false, this.parseExpr());
			}
			break;
			case Token.OpDecrement: {
				this.i++;
				result = Node.TUnop(Token.OpDecrement, false, this.parseExpr());
			}
			break;
			case Token.Interval: {
				this.i++;
				result = Node.TUnop(Token.Interval, false, this.parseExpr());
			}
			break;
			case Token.LFloat: {
				result = Node.TFloat(this.getgo(Token.LFloat));
			}
			break;
			case Token.LInt: {
				result = Node.TInt(this.getgo(Token.LInt));
			}
			break;
			case Token.LUpper: {
				if (this.lex.token[this.i + 1] == Token.OpLt) {
					let res = this.parseType();
					result = Node.NodeTypeValue(res);
				} else {
					let name = this.getgo(Token.LUpper);
					result = Node.TIdent(name);
				};
			}
			break;
			case Token.LLower: {
				let name = this.getgo(Token.LLower);
				if (this.tok() == Token.OpArrow) {
					this.next();
					result = Node.TFunction(null, this.parseExpr(), [Node.TVar(name, null, null, true)], null);
				} else result = Node.TIdent(name);
			}
			break;
			case Token.LString: {
				let str$26 = this.getgo(Token.LString);
				if (this.hasInterpolation(str$26)) {
					result = Node.TParenthesis(this.parseInterpolations(str$26));
				} else result = Node.TString(str$26);
			}
			break;
			case Token.KTrue: {
				this.i++;
				result = Node.TBool(true);
			}
			break;
			case Token.KFalse: {
				this.i++;
				result = Node.TBool(false);
			}
			break;
			case Token.KThis: {
				this.i++;
				result = Node.TThis;
			}
			break;
			case Token.KNull: {
				this.i++;
				result = Node.TNull;
			}
			break;
			case Token.KSuper: {
				this.i++;
				result = Node.TSuper;
			}
			break;
			case Token.KVar: {
				let parsed = this.parseVar();
				if (parsed.length > 1) {
					result = Node.TVars(parsed);
				} else result = parsed[0];
			}
			break;
			case Token.KLet: {
				let parsed = this.parseVar();
				if (parsed.length > 1) {
					result = Node.TVars(parsed);
				} else result = parsed[0];
			}
			break;
			case Token.KTry: {
				this.i++;
				let expr = this.parseExpr();
				let vars = [];
				let t$27 = [];
				let v$28 = [];
				let catches = [];
				while(this.tok() == Token.KCatch) {
					this.step(Token.KCatch);
					this.step(Token.POpen);
					let name = this.getgo(Token.LLower);
					vars.push(name);
					this.step(Token.DblDot);
					let type = this.parseType();
					{
						t$27.push(type);
					};
					v$28.push(Node.TVar(name, type, null, true));
					this.step(Token.PClose);
					catches.push(this.parseExpr());
				};
				result = Node.TTry(expr, t$27, v$28, catches);
			}
			break;
			case Token.KModule: {
				this.i++;
				let path = [];
				if (this.tok() == Token.LLower) {
					path.push(this.getgo(Token.LLower));
					while(this.tok() == Token.Dot) {
						this.i++;
						path.push(this.getgo(Token.LLower));
					};
				};
				this.step(Token.BrOpen);
				let el = [];
				while(this.tok() != Token.BrClose) {
					el.push(this.parseExpr());
				};
				this.step(Token.BrClose);
				result = Node.TModule(path, el);
			}
			break;
			case Token.KEnum: {
				this.i++;
				let t$29 = this.parseType();
				if (this.tok() == Token.DblDot) {
					this.i++;
					this.parseType();
				};
				this.step(Token.BrOpen);
				let names = [];
				while(this.tok() != Token.BrClose) {
					while(this.tok() == Token.At) atts.push(this.parseAttribute());
					atts = [];
					names.push(this.parseExpr());
				};
				this.step(Token.BrClose);
				result = Node.TEnum(t$29, names);
			}
			break;
			case Token.KClass: case Token.KInterface: {
				let isInterface = this.tok() == Token.KInterface;
				let att = atts;
				atts = [];
				this.i++;
				let t$30 = this.parseType();
				let ext = (this.tok() == Token.KExtends)? ((() => {
					this.i++;
					return this.parseType();
				})()) : (null);
				let impl = [];
				while(this.tok() == Token.KImplements) {
					this.i++;
					impl.push(this.parseType());
				};
				this.step(Token.BrOpen);
				let fields = this.parseFields();
				this.step(Token.BrClose);
				let me = Node.TClass(t$30, ext, impl, fields, this.class_external);
				Project.mapAttributes.set(me, att);
				result = me;
			}
			break;
			case Token.KFunction: {
				result = this.parseFunction();
			}
			break;
			case Token.BkOpen: {
				this.i++;
				let el = [];
				let values$31 = [];
				let isMap = false;
				while(this.tok() != Token.BkClose) {
					if (this.tok() == Token.DblDot) {
						isMap = true;
						this.next();
						break;
					};
					el.push(this.parseExpr());
					if (this.tok() == Token.DblDot) {
						this.i++;
						values$31.push(this.parseExpr());
						isMap = true;
					};
					if (this.tok() == Token.Comma) {
						this.i++;
					};
				};
				this.step(Token.BkClose);
				if (isMap) {
					result = Node.TMap(el, values$31);
				} else result = Node.TArray(el);
			}
			break;
			case Token.KNew: {
				this.i++;
				let t$32 = this.parseType();
				let names = [];
				let values$33 = [];
				if (this.tok() == Token.BrOpen) {
					this.i++;
					if (this.tok() == Token.DblDot) {
						this.i++;
						this.step(Token.BrClose);
					} else if (this.tok() == Token.LLower && this.lex.token[this.i + 1] == Token.DblDot) {
						while(this.tok() != Token.BrClose) {
							names.push(this.getgo(Token.LLower));
							this.step(Token.DblDot);
							values$33.push(this.parseExpr());
							if (this.tok() == Token.Comma) {
								this.i++;
							};
						};
						this.step(Token.BrClose);
					} else if (this.tok() == Token.BrClose) {
						this.step(Token.BrClose);
					};
				};
				this.step(Token.POpen);
				let args = [];
				while(this.tok() != Token.PClose) {
					args.push(this.parseExpr());
					if (this.tok() == Token.Comma) {
						this.i++;
					};
				};
				this.step(Token.PClose);
				result = Node.TNew([], t$32, args, names, values$33);
			}
			break;
			case Token.KSwitch: {
				this.i++;
				this.step(Token.POpen);
				let exprs = [];
				while(this.tok() != Token.PClose) {
					exprs.push(this.parseExpr());
					if (this.tok() == Token.Comma) {
						this.i++;
					};
				};
				this.step(Token.PClose);
				this.step(Token.BrOpen);
				let cases = [];
				let conds = [];
				let guards = [];
				while(this.tok() != Token.BrClose) {
					this.step(Token.KCase);
					if (this.tok() == Token.Underscore) {
						conds.push(Node.TUnderscore);
						this.i++;
					} else conds.push(this.parseExpr());
					guards.push(null);
					this.step(Token.DblDot);
					let exs = [];
					while(this.tok() != Token.KCase && this.tok() != Token.BrClose) {
						exs.push(this.parseExpr());
					};
					cases.push(Node.TBlock(exs));
				};
				this.step(Token.BrClose);
				result = Node.TSwitch(exprs, conds, guards, cases);
			}
			break;
			case Token.KFor: {
				this.i++;
				this.step(Token.POpen);
				let n = this.getgo(Token.LLower);
				this.step(Token.KIn);
				let a$34 = this.parseExpr();
				this.step(Token.PClose);
				let b = this.parseExpr();
				result = Node.TFor(n, a$34, b);
			}
			break;
			case Token.KStatic: {
				this.next();
				result = Node.TStatic(this.parseExpr());
			}
			break;
			case Token.KPrivate: {
				this.next();
				result = Node.TPrivate(this.parseExpr());
			}
			break;
			default:
				{
				this.unexpected();
				null;
			}
			}};
			if (result == null) {
				process.stdout.write('\n');
				throw this.fail('Expression is incomplete, current tokens is: ' + Token.stringify(this.tok()));
			};
			Project.data.set(result, new NodeData(nodePosition.line, nodePosition.column, this.lex.fileName));
			if (atts.length > 0) {
				Project.mapAttributes.set(result, atts);
				atts = [];
			};
			let done = this.i >= this.lex.length;
			while(!done) {
				{
				const $switch$ = this.tok();
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.Eof: {
					done = true;
				}
				break;
				case Token.BkOpen: {
					this.i++;
					let index$35 = this.parseExpr();
					this.step(Token.BkClose);
					result = Node.TIndex(result, index$35);
				}
				break;
				case Token.KIs: {
					this.i++;
					{
					const $switch$ = this.tok();
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case Token.LUpper: {
						result = Node.TIs(result, this.parseType());
					}
					break;
					default:
						{
						throw this.fail('Cannot parse type `' + Token.stringify(this.tok()) + '`');
					}
					}};
				}
				break;
				case Token.KAs: {
					this.i++;
					let kind = this.tok();
					if (this.tok() == Token.OpNot) {
						this.i++;
					} else if (this.tok() == Token.Question) {
						this.i++;
					} else kind = Token.Default;
					result = Node.TAs(result, kind, this.parseType());
				}
				break;
				case Token.POpen: {
					{
						let args = [];
						let argNames = [];
						this.i++;
						while(this.tok() != Token.PClose) {
							let argname = null;
							{
							const $switch$ = this.tok();
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case Token.LUpper: {
								args.push(this.parseExpr());
								if (this.tok() == Token.DblDot) {
									this.step(Token.DblDot);
									this.parseType();
								};
							}
							break;
							default:
								{
								if (this.lex.token[this.i + 1] == Token.DblDot) {
									argNames.push(this.getgo(Token.LLower));
									this.step(Token.DblDot);
								} else {
									argNames.push(null);
								};
								args.push(this.parseExpr());
							}
							}};
							if (this.tok() != Token.PClose) {
								this.step(Token.Comma);
							};
						};
						this.step(Token.PClose);
						result = Node.TCall(result, args, argNames);
					};
				}
				break;
				case Token.OpArrow: {
					this.next();
					result = Node.TFunction(null, this.parseExpr(), [result], null);
				}
				break;
				case Token.OpIncrement: {
					this.i++;
					result = Node.TUnop(Token.OpIncrement, true, result);
				}
				break;
				case Token.OpDecrement: {
					this.i++;
					result = Node.TUnop(Token.OpDecrement, true, result);
				}
				break;
				case Token.Dot: {
					this.i++;
					let name = null;
					{
					const $switch$ = this.tok();
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case Token.LUpper: {
						name = this.getgo(Token.LUpper);
					}
					break;
					default:
						{
						name = this.getgo(Token.LLower);
					}
					}};
					result = Node.TDot(result, name);
				}
				break;
				case Token.Question: {
					this.i++;
					if (this.tok() == Token.Dot) {
						let name = this.getgo(Token.LLower);
						result = Node.TDot(result, name);
					} else if (this.tok() == Token.Question) {
						this.i++;
						result = Node.TElvis(result, this.parseExpr());
					} else {
						let eif = this.parseExpr();
						this.step(Token.DblDot);
						let eelse = this.parseExpr();
						result = Node.TIf([result], eif, eelse);
					};
				}
				break;
				case Token.OpChain: {
					this.i++;
					result = this.parseExpr();
				}
				break;
				default:
					{
					const t$36 = this.tok();
					if (Parser.isBinop(t$36) && this.offset(1) == Token.OpAssign) {
						let op = this.tok();
						this.i++;
						this.i++;
						let b = this.parseExpr();
						result = Node.TAssignop(result, op, b);
					} else if (Parser.isBinop(t$36)) {
						this.i++;
						let b = this.parseExpr();
						let a$37 = result;
						{
						const $switch$ = b;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 8: {
						const aa = $switch$[2];
						const op = $switch$[3];
						const bb = $switch$[4];
						{
							let tp = this.precedence(t$36);
							let tLeft = tp > 99;
							tp = tp % 100;
							let bp = this.precedence(op);
							let bLeft = bp > 99;
							bp = bp % 100;
							if (bp > tp) {
								result = Node.TBinop(Node.TBinop(result, t$36, aa), op, bb);
							} else result = Node.TBinop(result, t$36, b);
						} break; }
						default:
							{
							result = Node.TBinop(result, t$36, b);
						}
						}};
					} else done = true;
				}
				}};
			};
			if (result == null) {
				process.stdout.write('\n');
				throw this.fail('Expression postfix is incomplete');
			};
			if (atts.length > 0) {
				Project.mapAttributes.set(result, atts);
				atts = [];
			};
			Project.data.set(result, new NodeData(nodePosition.line, nodePosition.column, this.lex.fileName));
			return result;
		}
		parseVar() {
			let $const = this.tok() == Token.KLet;
			this.i++;
			let vars = [];
			const parseSingleVar = () => {
				let varname = this.getgo(Token.LLower);
				if (varname.endsWith('___')) {
					throw this.fail('Variables can\'t end with `___`, it is reserved.');
				};
				let type = null;
				if (this.tok() == Token.DblDot) {
					this.i++;
					type = this.parseType();
				};
				let expr = null;
				if (this.tok() == Token.OpAssign) {
					this.i++;
					expr = this.parseExpr();
				};
				return Node.TVar(varname, type, expr, $const);
			};
			const parseSingleBinding = () => {
				let path = [];
				while(this.tok() == Token.LLower && this.offset(1) == Token.Dot) {
					path.push(this.getgo(Token.LLower));
					this.i++;
				};
				path.push(this.getgo(Token.LUpper));
				this.step(Token.Dot);
				path.push(this.getgo(Token.LUpper));
				if (this.tok() == Token.POpen && this.offset(1) == Token.PClose) {
					throw this.fail('Don\'t use empty parenthesis for `let ' + path.join('.') + '()` bindings');
				};
				let bind = [];
				if (this.tok() == Token.POpen) {
					do{{
						this.i++;
						if (this.tok() == Token.Underscore) {
							this.i++;
							bind.push(null);
						} else bind.push(Node.TVar(this.getgo(Token.LLower), null, null, $const));
					}}while(this.tok() == Token.Comma);
					this.step(Token.PClose);
				};
				this.step(Token.OpAssign);
				let expr = this.parseExpr();
				return Node.TEnumExtract(path, bind, expr);
			};
			while(true) {
				if (this.tok() == Token.LUpper || (this.tok() == Token.LLower && this.offset(1) == Token.Dot)) {
					vars.push(parseSingleBinding());
				} else vars.push(parseSingleVar());
				if (this.tok() == Token.Comma && this.offset(1) == Token.LLower && (this.offset(2) == Token.OpAssign || this.offset(2) == Token.DblDot)) {
					this.i++;
				} else break;
			};
			return vars;
			let $const$38 = this.tok() == Token.KLet;
			this.i++;
			let vars$39 = [];
			{
			const $switch$ = this.tok();
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case Token.LLower: {
				while(true) {
					let varname = this.getgo(Token.LLower);
					if (varname.endsWith('___')) {
						throw this.fail('Variables can\'t end with `___`, it is reserved.');
					};
					let type = null;
					if (this.tok() == Token.DblDot) {
						this.i++;
						type = this.parseType();
					};
					let expr = null;
					if (this.tok() == Token.OpAssign) {
						this.i++;
						expr = this.parseExpr();
					};
					vars$39.push(Node.TVar(varname, type, expr, $const$38));
					if (this.tok() == Token.Comma && this.offset(1) == Token.LLower && (this.offset(2) == Token.OpAssign || this.offset(2) == Token.DblDot)) {
						this.i++;
					} else break;
				};
			}
			break;
			case Token.LUpper: {
				let left = Node.TIdent(this.getgo(Token.LUpper));
				let res = left;
				while(this.tok() == Token.Dot) {
					res = Node.TDot(res, this.getgo(Token.LUpper));
				};
				{
				const $switch$ = this.tok();
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.POpen: {
					let args = [];
					while(this.tok() != Token.PClose) {
						args.push(this.getgo(Token.LLower));
					};
					this.step(Token.OpAssign);
					let varname = this.getgo(Token.LLower);
				}
				break;
				case Token.OpAssign: {}
				break;
				default:
					{
					throw this.fail('Wrong syntax');
				}
				}};
			}
			break;
			default:
				{
				throw this.fail('Wrong syntax');
			}
			}};
			return vars$39;
		}
		parseFunction(parseBody) {
			const parseBody$40 = ((parseBody != null))? (parseBody) : (true);
			this.i++;
			let expr = null;
			let name = null;
			let vars = [];
			let types = [];
			let values$41 = [];
			{
			const $switch$ = this.tok();
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case Token.LLower: {
				name = this.getgo(Token.LLower);
			}
			break;
			case Token.LUpper: {
				throw this.fail('Function names can\'t start with uppercase.');
			}
			break;
			default:
				{}
			}};
			this.step(Token.POpen);
			{
				while(this.tok() != Token.PClose) {
					let expr$42 = null;
					let t$43 = null;
					if (this.tok() == Token.Interval) {
						this.i++;
					};
					let name$44 = this.getgo(Token.LLower);
					if (this.tok() == Token.DblDot) {
						this.i++;
						t$43 = this.parseType();
					};
					if (this.tok() == Token.OpAssign) {
						this.i++;
						expr$42 = this.parseExpr();
					};
					vars.push(name$44);
					types.push(t$43);
					values$41.push(expr$42);
					if (this.tok() == Token.Comma) {
						this.i++;
					};
				};
				this.step(Token.PClose);
			};
			let rettype = null;
			if (this.tok() == Token.DblDot) {
				this.i++;
				rettype = this.parseType();
			};
			if (parseBody$40) {
				{
				const $switch$ = this.tok();
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.KNew: {
					if (this.lex.token[this.i + 1] == Token.POpen) {} else expr = this.parseExpr();
				}
				break;
				case Token.BrClose: {
					{};
				}
				break;
				case Token.KStatic: {
					{};
				}
				break;
				case Token.KPrivate: {
					{};
				}
				break;
				case Token.KFunction: {
					{};
				}
				break;
				case Token.At: {
					{
						let tmp = this.i;
						while(this.tok() == Token.At) this.parseAttribute();
						if (this.tok() != Token.BrClose && this.tok() != Token.KStatic && this.tok() != Token.KPrivate && this.tok() != Token.KFunction) {
							this.i = tmp;
							expr = this.parseExpr();
						} else this.i = tmp;
					};
				}
				break;
				default:
					{
					expr = this.parseExpr();
				}
				}};
			};
			let v$45 = [];
			{ let $v = vars.length; let i = 0; while(i < $v) {{
				v$45.push(Node.TVar(vars[i], types[i], values$41[i], true));
			}
			i++; }
			 };
			return (Node.TFunction(name, expr, v$45, rettype));
		}
		hasInterpolation(str$46) {
			let chars = str$46.split('');
			let i = 0;
			while(i < chars.length) {
				if (chars[i] == '\\') {
					if (i + 1 < chars.length) {
						if (chars[i + 1] == '\\') {
							i++;
						} else if (chars[i + 1] == '(') {
							return true;
						};
					};
				};
				i++;
			};
			return false;
		}
		parseInterpolations(str$47) {
			const interpolate = (s$48) => {
				let out = ['"'];
				if (s$48.length < 2) {
					return s$48;
				};
				let i = 0;
				const s$49 = s$48.split('"').join('\\"');
				const pushInterpolator = () => {
					i++;
					i++;
					const pushParen = () => {
						i++;
						while(i < s$49.length) {
							out.push(s$49.charAt(i));
							if (s$49.charAt(i) == '(') {
								pushParen();
								continue;
							};
							if (s$49.charAt(i) == ')') {
								i++;
								return ;
							};
							i++;
						};
						throw 'String interpolation error: unclosed inner parenthesis';
					};
					while(i < s$49.length) {
						out.push(s$49.charAt(i));
						if (s$49.charAt(i) == '(') {
							pushParen();
							continue;
						};
						if (s$49.charAt(i) == ')') {
							i++;
							return ;
						};
						i++;
					};
					throw 'String interpolation error: unclosed parenthesis';
				};
				let result = ['"'];
				while(i < s$49.length) {
					if (s$49.charAt(i) == '\\' && s$49.charAt(i + 1) == '(') {
						result.push('" + ');
						out.push('" + (');
						let ii = i + 1;
						pushInterpolator();
						result.push(s$49.substring(ii, i + 1));
						result.push(' + "');
						out.push(' + "');
					} else {
						out.push(s$49.charAt(i));
						result.push(s$49.charAt(i));
						i++;
					};
				};
				result.push('"');
				out.push('"');
				return out.join('');
			};
			let resStr = interpolate(str$47);
			let tokens$50 = Lexer.tokenize(Buffer.from(resStr), '');
			try {
				let parsed = new Parser(tokens$50);
				{
				const $switch$ = parsed.node;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 10: {
				{
					throw null;
				} break; }
				default:
					{
					return parsed.node;
				}
				}}
			} catch(e) {
				throw this.fail('Parse interpolation error: ' + e)
			};
		}
		parseAttribute() {
			this.i++;
			let name = this.getgo(Token.LLower);
			let values$51 = [];
			if (this.tok() == Token.POpen) {
				this.i++;
				while(this.tok() != Token.PClose) {
					values$51.push(this.parseExpr());
					if (this.tok() == Token.Comma) {
						this.i++;
					};
				};
				this.step(Token.PClose);
			};
			return {name:name, values:values$51};
		}
		parseType() {
			let path = [];
			while(this.tok() == Token.LLower && this.offset(1) == Token.Dot) {
				path.push(this.getgo(Token.LLower));
				this.i++;
			};
			let result = null;
			{
			const $switch$ = this.tok();
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case Token.LUpper: {
				let name = this.getgo(Token.LUpper);
				if (path.length != 0) {
					name = path.join('.') + '.' + name;
				};
				while(this.tok() == Token.Dot) {
					this.i++;
					this.getgo(Token.LUpper);
				};
				let sresult = (this.tok() == Token.OpLt)? ((() => {
					this.i++;
					this.parametricTypeNesting++;
					let params = [this.parseType()];
					while(this.tok() == Token.Comma) {
						this.i++;
						params.push(this.parseType());
					};
					if (this.parametricTypeNestingToken == Token.Eof) {
						this.parametricTypeNestingToken = this.tok();
					};
					{
					const $switch$ = this.parametricTypeNestingToken;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case Token.OpGt: {
						this.parametricTypeNesting -= 1;
						this.parametricTypeNestingToken = Token.Eof;
						this.i++;
					}
					break;
					case Token.OpShr: {
						this.parametricTypeNesting -= 1;
						this.parametricTypeNestingToken = Token.OpGt;
					}
					break;
					case Token.OpUShr: {
						this.parametricTypeNesting -= 1;
						this.parametricTypeNestingToken = Token.OpUShr;
					}
					break;
					default:
						{
						this.unexpected();
					}
					}};
					if (this.parametricTypeNesting < 0) {
						throw this.fail('parametricTypeNesting < 0');
					};
					return NodeType.ParametricType(name, params);
				})()) : (NodeType.Type(name));
				if (this.tok() == Token.OpArrow) {
					this.i++;
					sresult = NodeType.Function([sresult], this.parseType());
				};
				result = sresult;
			}
			break;
			case Token.BkOpen: {
				if (path.length != 0) {
					throw this.fail('Token.BkOpen');
				};
				this.i++;
				let res = null;
				{
				const $switch$ = this.tok();
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.BkClose: {
					this.i++;
					res = NodeType.ParametricType('Array', [NodeType.Object([], [])]);
				}
				break;
				case Token.DblDot: {
					this.i++;
					if (this.tok() == Token.BkClose) {
						this.i++;
						res = NodeType.ParametricType('Map', [NodeType.Object([], []), NodeType.Object([], [])]);
					} else {
						res = NodeType.ParametricType('Map', [NodeType.Object([], []), this.parseType()]);
					};
				}
				break;
				default:
					{
					let key = this.parseType();
					let innerRes = (this.tok() == Token.DblDot)? ((() => {
						this.i++;
						return NodeType.ParametricType('Map', [key, this.parseType()]);
					})()) : (NodeType.ParametricType('Array', [key]));
					this.step(Token.BkClose);
					if (this.tok() == Token.OpArrow) {
						this.i++;
						innerRes = NodeType.Function([res], this.parseType());
					};
					res = innerRes;
				}
				}};
				result = res;
			}
			break;
			case Token.BrOpen: {
				if (path.length != 0) {
					throw this.fail('Token.BrOpen');
				};
				this.i++;
				let sresult = (this.tok() == Token.DblDot)? ((() => {
					this.i++;
					return NodeType.Object([], []);
				})()) : ((() => {
					let names = [];
					let types = [];
					while(this.tok() != Token.BrClose) {
						names.push(this.getgo(Token.LLower));
						if (this.tok() == Token.DblDot) {
							this.i++;
							types.push(this.parseType());
						};
						if (this.tok() == Token.Comma) {
							this.i++;
						};
					};
					return NodeType.Object(names, types);
				})());
				this.step(Token.BrClose);
				if (this.tok() == Token.OpArrow) {
					this.i++;
					sresult = NodeType.Function([sresult], this.parseType());
				};
				result = sresult;
			}
			break;
			case Token.POpen: {
				if (path.length != 0) {
					throw this.fail('Token.POpen');
				};
				this.i++;
				let args = [];
				while(this.tok() != Token.PClose) {
					this.parseType();
					if (this.tok() == Token.DblDot) {
						this.i++;
						args.push(this.parseType());
					};
					if (this.tok() == Token.Comma) {
						this.i++;
					};
				};
				this.step(Token.PClose);
				this.step(Token.OpArrow);
				result = NodeType.Function(args, this.parseType());
			}
			break;
			case Token.LLower: {
				let res = null;
				{
				const $switch$ = this.offset(1);
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case Token.DblDot: {
					{
						let argName = this.getgo(this.tok());
						this.step(Token.DblDot);
						let argType = this.parseType();
						res = NodeType.FunctionArg(argName, argType, null);
					};
				}
				break;
				default:
					{
					{
						throw this.fail('Typename can not start with lowercase');
					};
				}
				}};
				result = res;
			}
			break;
			default:
				{
				throw this.fail('Expected Type, parsed `' + Token.stringify(this.tok()) + '`');
			}
			}};
			if (this.tok() == Token.Question) {
				result = NodeType.Optional(result);
			};
			while(this.tok() == Token.Question) this.i++;
			if (this.tok() == Token.OpArrow) {
				this.i++;
				result = NodeType.Function([result], this.parseType());
			};
			return result;
		}
		precedence(op) {
			const left = 100;
			const right = 0;
			{
			const $switch$ = op;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case Token.OpMod: {
				return 0 + left;
			}
			break;
			case Token.OpMult: {
				return 1 + left;
			}
			break;
			case Token.OpDiv: {
				return 1 + left;
			}
			break;
			case Token.OpAdd: {
				return 2 + left;
			}
			break;
			case Token.OpSub: {
				return 2 + left;
			}
			break;
			case Token.OpShl: {
				return 3 + left;
			}
			break;
			case Token.OpShr: {
				return 3 + left;
			}
			break;
			case Token.OpUShr: {
				return 3 + left;
			}
			break;
			case Token.OpOr: {
				return 4 + left;
			}
			break;
			case Token.OpAnd: {
				return 4 + left;
			}
			break;
			case Token.OpXor: {
				return 4 + left;
			}
			break;
			case Token.OpEq: {
				return 5 + left;
			}
			break;
			case Token.OpNotEq: {
				return 5 + left;
			}
			break;
			case Token.OpGt: {
				return 5 + left;
			}
			break;
			case Token.OpLt: {
				return 5 + left;
			}
			break;
			case Token.OpGte: {
				return 5 + left;
			}
			break;
			case Token.OpLte: {
				return 5 + left;
			}
			break;
			case Token.OpBoolAnd: {
				return 7 + left;
			}
			break;
			case Token.OpBoolOr: {
				return 8 + left;
			}
			break;
			case Token.OpAssign: {
				return 10 + right;
			}
			break;
			default:
				{
				throw this.fail('No precedence for ' + Token.stringify(op));
			}
			}};
		}
		constructor(lexe) {
	this.node = null;
	this.lex = null;
	this.i = 0;
	this.lasttok = -1;
	this.lasttokchecks = 10;
	this.class_external = false;
	this.parametricTypeNesting = 0;
	this.parametricTypeNestingToken = Token.Eof
	{
			this.lex = lexe;
			let el = [];
			while(this.i < this.lex.length && this.tok() != Token.Eof) {
				el.push(this.parseExpr());
			};
			this.node = el[0];
			if (el.length == 0) {
				this.node = null;
			};
			if (el.length > 1) {
				this.node = Node.TBlock(el);
			};
		}
}
	}
	Parser.uuid = 0;
	Parser.uid = () => {
		return Parser.uuid++
	}
;
	Parser.isBinop = (t$52) => {
			{
			const $switch$ = t$52;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case Token.OpAdd: {
				return true;
			}
			break;
			case Token.OpMult: {
				return true;
			}
			break;
			case Token.OpDiv: {
				return true;
			}
			break;
			case Token.OpSub: {
				return true;
			}
			break;
			case Token.OpAssign: {
				return true;
			}
			break;
			case Token.OpEq: {
				return true;
			}
			break;
			case Token.OpNotEq: {
				return true;
			}
			break;
			case Token.OpGt: {
				return true;
			}
			break;
			case Token.OpGte: {
				return true;
			}
			break;
			case Token.OpLt: {
				return true;
			}
			break;
			case Token.OpLte: {
				return true;
			}
			break;
			case Token.OpAnd: {
				return true;
			}
			break;
			case Token.OpOr: {
				return true;
			}
			break;
			case Token.OpXor: {
				return true;
			}
			break;
			case Token.OpBoolAnd: {
				return true;
			}
			break;
			case Token.OpBoolOr: {
				return true;
			}
			break;
			case Token.OpShl: {
				return true;
			}
			break;
			case Token.OpShr: {
				return true;
			}
			break;
			case Token.OpUShr: {
				return true;
			}
			break;
			case Token.OpMod: {
				return true;
			}
			break;
			default:
				{
				return false;
			}
			}};
		};
	TestParser/*!5*/ = class TestParser {

	}
	TestParser.test = () => {
			console.log('TestParser begin');
			TestParser.shouldAllEqual(new Map([['', '<!--null-->'], ['  ', '<!--null-->'], ['	', '<!--null-->'], ['   	', '<!--null-->'], ['\n', '<!--null-->'], ['\n\n', '<!--null-->'], ['\r\r\n\r\n\r\t', '<!--null-->'], ['{}', 'TBlock([])'], ['{{}}', 'TBlock([TBlock([])])'], ['{ 0 0 0 }', 'TBlock([TInt(0),TInt(0),TInt(0)])'], ['0', 'TInt(0)'], [' 0 ', 'TInt(0)'], ['123', 'TInt(123)'], ['12', 'TInt(12)'], ['0x1', 'TInt(0x1)'], ['0x0', 'TInt(0x0)'], ['0xF', 'TInt(0xF)'], ['0xFA', 'TInt(0xFA)'], ['0xFABCDEF', 'TInt(0xFABCDEF)'], ['0.0', 'TFloat(0.0)'], ['0.123', 'TFloat(0.123)'], ['\'s\'', 'TString(s)'], ['\"s\"', 'TString(s)']]));
			TestParser.shouldAllEqual(new Map([['1 2 3 trace("Hello!", "World!") + 5 * 6 / 3', 'TBlock([\n				TInt(1),\n				TInt(2),\n				TInt(3),\n				TBinop(\n				TCall(TIdent(trace),[TString(Hello!),TString(World!)]),\n				+,\n				TBinop(TInt(5),*,TBinop(TInt(6),/,TInt(3))))])'], ['enum Test { Demo } hello World', 'TBlock([TEnum(Type(Test),[TIdent(Demo)]),\n				TIdent(hello),\n				TIdent(World)])']]));
			TestParser.shouldAllEqual(new Map([['a + b', 'TBinop(TIdent(a),+,TIdent(b))'], ['a += b', 'TAssignop(TIdent(a),+,TIdent(b))']]));
			TestParser.shouldAllEqual(new Map([['"\\\\(v)"', 'TString(\\\\(v))'], ['"\\(v)"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(v)),+,TString())))'], ['"\\(((v)))"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TParenthesis(TParenthesis(TIdent(v)))),+,TString())))'], ['"\\( v )"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(v)),+,TString())))'], ['"\\(V)\\(v)"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(V)),+,TBinop(TString(),+,TBinop(TParenthesis(TIdent(v)),+,TString())))))'], ['"\\(V)\\(v)s\\(v)"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(V)),+,TBinop(TString(),+,TBinop(TParenthesis(TIdent(v)),+,TBinop(TString(s),+,TBinop(TParenthesis(TIdent(v)),+,TString())))))))'], ['"\\(V)s\\(v)s\\(v)"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(V)),+,TBinop(TString(s),+,TBinop(TParenthesis(TIdent(v)),+,TBinop(TString(s),+,TBinop(TParenthesis(TIdent(v)),+,TString())))))))']]));
			TestParser.shouldAllEqualWithoutTrim(new Map([['"\\( v )"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(v)),+,TString())))'], ['"\\(V)\r\n\\(v)"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(V)),+,TBinop(TString(\r\n),+,TBinop(TParenthesis(TIdent(v)),+,TString())))))'], ['"\\(V) \\(v) \\(v)"', 'TParenthesis(TBinop(TString(),+,TBinop(TParenthesis(TIdent(V)),+,TBinop(TString( ),+,TBinop(TParenthesis(TIdent(v)),+,TBinop(TString( ),+,TBinop(TParenthesis(TIdent(v)),+,TString())))))))']]));
			TestParser.shouldAllEqual(new Map([['using A', 'TUsing(A)'], ['using A, B, C', 'TUsing(A,B,C)']]));
			TestParser.shouldAllEqual(new Map([['module { }', 'TModule(, [])'], ['code module { } code', 'TBlock([TIdent(code),TModule(,[]),TIdent(code)])'], ['code module { } module { } code', 'TBlock([TIdent(code),TModule(,[]),TModule(,[]),TIdent(code)])'], ['module a { }', 'TModule(a, [])'], ['module a.b { }', 'TModule(a.b, [])'], ['module a { module b { } }', 'TModule(a,[TModule(b,[])])']]));
			TestParser.shouldAllEqual(new Map([['var a = new Array<A>()', 'TVar(a,null,TNew([],ParametricType(Array,[Type(A)]),[],[],[]),false)'], ['a = Array<A>.staticField()', 'TBinop(TIdent(a),=,TCall(TDot(NodeTypeValue(ParametricType(Array,[Type(A)])),staticField),[]))'], ['a = EnumTest.EnumField', 'TBinop(TIdent(a),=,TDot(TIdent(EnumTest),EnumField))'], ['a = EnumTest.EnumField(arg)', 'TBinop(TIdent(a),=,TCall(TDot(TIdent(EnumTest),EnumField),[TIdent(arg)]))'], ['a = EnumTest.EnumField(argName: argValue, arg2, arg3: arg3)', 'TBinop(TIdent(a),=,TCall(TDot(TIdent(EnumTest),EnumField),[argName:TIdent(argValue),TIdent(arg2),arg3:TIdent(arg3)]))'], ['a = EnumTest<A,B>.EnumField', 'TBinop(TIdent(a),=,TDot(NodeTypeValue(ParametricType(EnumTest,[Type(A),Type(B)])),EnumField))'], ['var a = b as B, c = d as! B, e = f as? B', 'TVars([TVar(a,null,TAs(TIdent(b),<!--default-->,Type(B)),false),TVar(c,null,TAs(TIdent(d),!,Type(B)),false),TVar(e,null,TAs(TIdent(f),?,Type(B)),false)])'], ['var a = b is B, c = d is B, e = f is B', 'TVars([TVar(a,null,TAs(TIdent(b),Type(B)),false),TVar(c,null,TAs(TIdent(d),Type(B)),false),TVar(e,null,TAs(TIdent(f),Type(B)),false)])']]));
			TestParser.shouldAllEqual(new Map([['var x:[Array<T>]', 'TVar(x,ParametricType(Array,[ParametricType(Array,[Type(T)])]),null,false)'], ['var x:[Map<K,V> : Array<T>]', 'TVar(x,ParametricType(Map,[ParametricType(Map,[Type(K),Type(V)]),ParametricType(Array,[Type(T)])]),null,false)'], ['var x:{:}, y:[], z:[:], w:()=>{:}', 'TVars([TVar(x,Object([],[]),null,false),TVar(y,ParametricType(Array,[Object([],[])]),null,false),TVar(z,ParametricType(Map,[Object([],[]),Object([],[])]),null,false),TVar(w,Function([],Object([],[])),null,false)])'], ['let x:()=>()=>()=>()=>Void', 'TVar(x,Function([],Function([],Function([],Function([],Type(Void))))),null,true)']]));
			TestParser.shouldAllEqual(new Map([['enum A {}', 'TEnum(Type(A),[])'], ['enum A { A B C }', 'TEnum(Type(A),[TIdent(A),TIdent(B),TIdent(C)])'], ['enum A { A(v:Int) B C(v:[K:V], a:Array<T>) }', 'TEnum(Type(A),[TCall(TIdent(A),[v:TIdent(Int)]),TIdent(B),TCall(TIdent(C),[v:TMap([TIdent(K)],[TIdent(V)]),a:NodeTypeValue(ParametricType(Array,[Type(T)]))])])']]));
			TestParser.shouldAllEqual(new Map([['class A {} var a = new A { } ()', 'TBlock([TClass(Type(A),null,[],[],false),TVar(a,null,TNew([],Type(A),[],[],[]),false)])'], ['class A { var field: String } var a = new A { field: "Value" } ()', 'TBlock([TClass(Type(A),null,[],[TVar(field,Type(String),null,false)],false),TVar(a,null,TNew([],Type(A),[],[field],[TString(Value)]),false)])'], ['class A { var field: String var otherfield: Int } var a = new A { field: "Value", otherfield: 25 } ()', 'TBlock([TClass(Type(A),null,[],[TVar(field,Type(String),null,false),TVar(otherfield,Type(Int),null,false)],false),TVar(a,null,TNew([],Type(A),[],[field,otherfield],[TString(Value),TInt(25)]),false)])']]));
			TestParser.shouldAllEqual(new Map([['declare var a: T', 'TDeclare(a,TVar(a,Type(T),null,false))'], ['declare let a: T', 'TDeclare(a,TVar(a,Type(T),null,true))'], ['declare function name()', 'TDeclare(name,TFunction(name,null,[],null))'], ['declare function name() hi()', 'TBlock([TDeclare(name,TFunction(name,null,[],null)),TCall(TIdent(hi),[])])'], ['declare function name() {}', 'TBlock([TDeclare(name,TFunction(name,null,[],null)),TBlock([])])']]));
			TestParser.shouldAllError(['declare var a', 'declare var a = value', 'declare var a: T = value', 'declare function()', 'declare var a, b, c', 'declare anything']);
			TestParser.shouldAllError(['@att']);
			console.log('TestParser done');
		};
	TestParser.shouldEqual = (input$53, test) => {
			console.log('shouldEqual ' + input$53);
			const test$54 = TestParser.deepTrim(test);
			TestParser.shouldEqualWithoutTrim(input$53, test$54);
		};
	TestParser.shouldEqualWithoutTrim = (input$55, test$56) => {
			let lexe$57 = Lexer.tokenize(Buffer.from(input$55), 'TEST');
			let parser = new Parser(lexe$57);
			let res = TestParser.stringify(parser.node);
			if (test$56 != res) {
				throw ('TestParser test fail: `' + (input$55) + '`\n!==: `' + (test$56) + '`\nGot: `' + (res) + '`');
			};
		};
	TestParser.shouldAllEqual = (map) => {
			for (const input$58 of map.keys()) {
				let test$59 = map.get(input$58);
				TestParser.shouldEqual(input$58, test$59);
			};
		};
	TestParser.shouldAllEqualWithoutTrim = (map$60) => {
			for (const input$61 of map$60.keys()) {
				let test$62 = map$60.get(input$61);
				TestParser.shouldEqualWithoutTrim(input$61, test$62);
			};
		};
	TestParser.shouldError = (input$63) => {
			console.log('shouldError ' + input$63);
			try {
				let lexe$64 = Lexer.tokenize(Buffer.from(input$63), 'TEST');
				let parser = new Parser(lexe$64)
			} catch(e) {
				return 
			};
			throw ('TestParser test fail: `' + (input$63) + '` did not throw exception.');
		};
	TestParser.shouldAllError = (input$65) => {
			for (const str$66 of input$65) {
				TestParser.shouldError(str$66);
			};
		};
	TestParser.deepTrim = (s$67) => {
			return s$67.split('\n').join('').split('\r').join('').split('\t').join('').split(' ').join('');
		};
	TestParser.stringify = (node) => {
			{
			const $switch$ = node;
			if($switch$ == null) {
				{
				return '<!--null-->';
			}
			} else {
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 0: {
			const s = $switch$[2];
			{
				return ('TString(' + (s) + ')');
			} break; }
			case 1: {
			const s = $switch$[2];
			{
				return ('TIdent(' + (s) + ')');
			} break; }
			case 2: {
			const b = $switch$[2];
			{
				return ('TBool(' + (b) + ')');
			} break; }
			case 3: {{
				return 'TThis';
			} break; }
			case 4: {{
				return 'TSuper';
			} break; }
			case 5: {
			const s = $switch$[2];
			{
				return ('TInt(' + (s) + ')');
			} break; }
			case 6: {
			const s = $switch$[2];
			{
				return ('TFloat(' + (s) + ')');
			} break; }
			case 7: {{
				return 'TNull';
			} break; }
			case 16: {{
				return 'TBreak';
			} break; }
			case 17: {{
				return 'TContinue';
			} break; }
			case 35: {
			const name = $switch$[2];
			const expr = $switch$[3];
			{
				return ('TDeclare(' + (name) + ',') + TestParser.stringify(expr) + ')';
			} break; }
			case 37: {
			const expr = $switch$[2];
			const type = $switch$[3];
			{
				return 'TAs(' + TestParser.stringify(expr) + ',' + TestParser.stringifyType(type) + ')';
			} break; }
			case 38: {
			const expr = $switch$[2];
			const kind = $switch$[3];
			const type = $switch$[4];
			{
				return 'TAs(' + TestParser.stringify(expr) + ',' + Token.stringify(kind) + ',' + TestParser.stringifyType(type) + ')';
			} break; }
			case 8: {
			const a = $switch$[2];
			const op = $switch$[3];
			const b = $switch$[4];
			{
				return 'TBinop(' + TestParser.stringify(a) + ',' + Token.stringify(op) + ',' + TestParser.stringify(b) + ')';
			} break; }
			case 9: {
			const a = $switch$[2];
			const op = $switch$[3];
			const b = $switch$[4];
			{
				return 'TAssignop(' + TestParser.stringify(a) + ',' + Token.stringify(op) + ',' + TestParser.stringify(b) + ')';
			} break; }
			case 10: {
			const els = $switch$[2];
			{
				return 'TBlock(' + TestParser.stringifyNodeArray(els) + ')';
			} break; }
			case 21: {
			const name = $switch$[2];
			const t = $switch$[3];
			const expr = $switch$[4];
			const $const = $switch$[5];
			{
				return ('TVar(' + (name) + ',') + (((t != null))? (TestParser.stringifyType(t)) : ('null')) + ',' + (((expr != null))? (TestParser.stringify(expr)) : ('null')) + (',' + ($const) + ')');
			} break; }
			case 22: {
			const vars = $switch$[2];
			{
				return 'TVars(' + TestParser.stringifyNodeArray(vars) + ')';
			} break; }
			case 20: {
			const name = $switch$[2];
			const expr = $switch$[3];
			const vars = $switch$[4];
			const rettype = $switch$[5];
			{
				return ('TFunction(' + (name) + ',') + (expr == (null)? ('null') : (TestParser.stringify(expr))) + ',' + TestParser.stringifyNodeArray(vars) + ',' + (((rettype != null))? (TestParser.stringifyType(rettype)) : ('null')) + ')';
			} break; }
			case 11: {
			const e = $switch$[2];
			const el = $switch$[3];
			const argNames = $switch$[4];
			{
				let res = 'TCall(' + TestParser.stringify(e) + ',[';
				{ let $v = el.length; let i = 0; while(i < $v) {{
					res += argNames[i] == (null)? ('') : (argNames[i] + ':');
					res += TestParser.stringify(el[i]) + (((i != el.length - 1))? (',') : (''));
				}
				i++; }
				 };
				return res + '])';
			} break; }
			case 13: {
			const e = $switch$[2];
			{
				return 'TParenthesis(' + TestParser.stringify(e) + ')';
			} break; }
			case 14: {
			const e = $switch$[2];
			{
				return 'TReturn(' + TestParser.stringify(e) + ')';
			} break; }
			case 15: {
			const e = $switch$[2];
			{
				return 'TThrow(' + TestParser.stringify(e) + ')';
			} break; }
			case 33: {
			const t = $switch$[2];
			const els = $switch$[3];
			{
				return 'TEnum(' + TestParser.stringifyType(t) + ',' + TestParser.stringifyNodeArray(els) + ')';
			} break; }
			case 36: {
			const a = $switch$[2];
			{
				return 'TUsing(' + a.join(',') + ')';
			} break; }
			case 31: {
			const paths = $switch$[2];
			const els = $switch$[3];
			{
				return 'TModule(' + paths.join('.') + ',' + TestParser.stringifyNodeArray(els) + ')';
			} break; }
			case 28: {
			const k = $switch$[2];
			const v = $switch$[3];
			{
				return 'TMap([' + ((()=>{const return$$ = []; const $switch$ = k;for (const p of $switch$) { return$$.push(TestParser.stringify(p)); } return return$$;})()).join(',') + '],[' + ((()=>{const return$$ = []; const $switch$ = v;for (const p of $switch$) { return$$.push(TestParser.stringify(p)); } return return$$;})()).join(',') + '])';
			} break; }
			case 23: {
			const type = $switch$[2];
			const extend = $switch$[3];
			const implement = $switch$[4];
			const fields = $switch$[5];
			const external = $switch$[6];
			{
				let res = 'TClass(' + TestParser.stringifyType(type) + ',';
				res += extend != (null)? (TestParser.stringifyType(extend)) : ('null' + ',');
				res += TestParser.stringifyNodeTypeArray(implement) + ',';
				res += TestParser.stringifyNodeArray(fields) + ',';
				res += external + ')';
				return res;
			} break; }
			case 26: {
			const path = $switch$[2];
			const t = $switch$[3];
			const args = $switch$[4];
			const names = $switch$[5];
			const values = $switch$[6];
			{
				return 'TNew([' + path.join('.') + '],' + TestParser.stringifyType(t) + ',' + TestParser.stringifyNodeArray(args) + ',[' + names.join(',') + '],' + TestParser.stringifyNodeArray(values) + ')';
			} break; }
			case 45: {
			const type = $switch$[2];
			{
				return 'NodeTypeValue(' + TestParser.stringifyType(type) + ')';
			} break; }
			case 25: {
			const l = $switch$[2];
			const r = $switch$[3];
			{
				return 'TDot(' + TestParser.stringify(l) + ',' + r + ')';
			} break; }
			default:
				{
				return '<!--' + node + '-->';
			}
			}
			} };
		};
	TestParser.stringifyNodeArray = (arr) => {
			return '[' + ((()=>{const return$$ = []; const $switch$ = arr;for (const e of $switch$) { return$$.push(TestParser.stringify(e)); } return return$$;})()).join(',') + ']';
		};
	TestParser.stringifyNodeTypeArray = (arr$68) => {
			return '[' + ((()=>{const return$$ = []; const $switch$ = arr$68;for (const e of $switch$) { return$$.push(TestParser.stringifyType(e)); } return return$$;})()).join(',') + ']';
		};
	TestParser.stringifyType = (node$69) => {
			{
			const $switch$ = node$69;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 1: {
			const s = $switch$[2];
			{
				return ('Type(' + (s) + ')');
			} break; }
			case 2: {
			const name = $switch$[2];
			const params = $switch$[3];
			{
				return ('ParametricType(' + (name) + ',[') + ((()=>{const return$$ = []; const $switch$ = params;for (const p of $switch$) { return$$.push(TestParser.stringifyType(p)); } return return$$;})()).join(',') + '])';
			} break; }
			case 3: {
			const args = $switch$[2];
			const rettype = $switch$[3];
			{
				return 'Function([' + ((()=>{const return$$ = []; const $switch$ = args;for (const e of $switch$) { return$$.push(TestParser.stringifyType(e)); } return return$$;})()).join(',') + '],' + TestParser.stringifyType(rettype) + ')';
			} break; }
			case 5: {
			const names = $switch$[2];
			const types = $switch$[3];
			{
				return 'Object([' + names.join(',') + '],[' + ((()=>{const return$$ = []; const $switch$ = types;for (const e of $switch$) { return$$.push(TestParser.stringifyType(e)); } return return$$;})()).join(',') + '])';
			} break; }
			default:
				{
				return '<!--' + node$69 + '-->';
			}
			}};
		};
	TestTyper/*!5*/ = class TestTyper {

	}
	TestTyper.test = () => {
			console.log('TestTyper begin');
			TestTyper.shouldNotError('let a = 1');
			TestTyper.shouldError('let a');
			TestTyper.shouldError('let a = 1 a = 2');
			TestTyper.shouldNotError('var a = 1 var b = 1');
			TestTyper.shouldNotError('var a = 1 var b = a');
			TestTyper.shouldNotError('var a = 1 let b = a');
			TestTyper.shouldError('var a = var b = 1');
			TestTyper.shouldError('var a = var b');
			TestTyper.shouldError('var a = { var b }');
			TestTyper.shouldError('var a = { 1 2 3 var b }');
			TestTyper.shouldNotError('var a = { 1 2 var b 3 }');
			TestTyper.shouldError('var a = { }');
			TestTyper.shouldError('let a = var b');
			TestTyper.shouldNotError('var a = 1 a = 2');
			TestTyper.shouldNotError('let a = { 2 }');
			TestTyper.shouldNotError('let a = { 1 2 3 2 }');
			TestTyper.shouldError('let a = return 2');
			TestTyper.shouldError('let a = { return 2 }');
			TestTyper.shouldError('let a = { break }');
			TestTyper.shouldError('let a = break');
			TestTyper.shouldError('var a = 1, b = return 2');
			TestTyper.shouldNotError('var x = function() {return 1} var x = 1');
			TestTyper.shouldError('let x = function() {return 1} x = 1');
			TestTyper.shouldError('function x() {return 1} x = 1');
			TestTyper.shouldError('function x() {return 1} x = function() {return 1}');
			TestTyper.shouldError('{ function x() {return 1} } x()');
			TestTyper.shouldError('{ function x() {return return 1} }');
			TestTyper.shouldNotError('var x = function () {} x = function () {}');
			TestTyper.shouldError('let x = function () {} x = function () {} ');
			TestTyper.shouldError('var a: Int? = null if (var b = a) {}');
			TestTyper.shouldNotError('var a: Int? = null if (let b = a) {} a = 5');
			TestTyper.shouldNotError('var a: Int? = null if (let a = a) {} a = 5');
			TestTyper.shouldNotError('var a: Int? = null if (let a = a, let b = a, let a = b) {} a = 5');
			TestTyper.shouldNotError('let a = [2, 4, 1, 2, 5]');
			TestTyper.shouldNotError('var a = [2, 4, 1, 2, 5] a = [2, 3, 4]');
			TestTyper.shouldError('let a = [2, 4, 1, 2, 5] a = [2, 3, 4]');
			TestTyper.shouldNotError('var a = for (b in [1, 2, 3, 4]) b');
			TestTyper.shouldError('var a = for (b in [1, 2, 3, 4]) a');
			TestTyper.shouldNotError('var a = [ 1: "a", 2: "b", 3: "c" ]');
			TestTyper.shouldNotError('var a = [ "a": 1, "b": 2, "c": 3 ]');
			TestTyper.shouldNotError('var a = [ "a": 1, "b": 2, "c": 3 ] a = ["l": 11]');
			TestTyper.shouldNotError('var a = try { 1 } catch(e: Any) { 2 }');
			TestTyper.shouldNotError('var a = try { 1 } catch(e: Any) { throw 2 }');
			TestTyper.shouldNotError('var a = try { throw 1 } catch(e: Any) { 2 }');
			TestTyper.shouldNotError('var a = { try { throw 1 } catch(e: Any) { 2 } }');
			TestTyper.shouldNotError('@throws function f() throw 123');
			TestTyper.shouldNotError('@throws(Int) function f() throw 123');
			TestTyper.shouldNotError('@throws(Int) function f() {}');
			TestTyper.shouldNotError('function f() try { throw 123 } catch(e: Int) {}');
			TestTyper.shouldNotError('class A {}');
			TestTyper.shouldNotError('class A {} class A extends A {}');
			TestTyper.shouldError('module { class A {} class A {} }');
			TestTyper.shouldError('module { let x = 1 } x = 1');
			TestTyper.shouldNotError('module { var x = 1 } var x = 1');
			TestTyper.shouldNotError('module { var x = 1 } x = 1');
			TestTyper.shouldError('module { class A {} } module { class A {} }');
			TestTyper.shouldNotError('class A {new() {} let a: A = new A()}');
			TestTyper.shouldError('function f() {} f(var a)');
			TestTyper.shouldError('function f(x) {} f(var a)');
			TestTyper.shouldError('function f() {} f(let a = 1)');
			TestTyper.shouldError('module hi { function hi() }');
			TestTyper.shouldError('module hi { function hi() }');
			TestTyper.shouldNotError('@att("value") 123');
			TestTyper.shouldNotError('let known = 1 @att(known) 123');
			('' + (123) + '\n');
			('\n' + (123) + ' \n' + (34) + '');
			('' + (123) + '');
			('TestTyper done ' + (Math.round((TestTyper.passed / TestTyper.overall) * 100)) + '% (' + (TestTyper.passed) + '/' + (TestTyper.overall) + ')');
			console.log(('TestTyper done ' + (Math.round((TestTyper.passed / TestTyper.overall) * 100)) + '% (' + (TestTyper.passed) + '/' + (TestTyper.overall) + ')'));
		};
	TestTyper.passed = 0;
	TestTyper.overall = 0;
	TestTyper.shouldNotError = (input$70) => {
			TestTyper.overall++;
			let errorText = TestTyper.didError(input$70);
			if (errorText != null) {
				throw ('TestTyper test fail: `' + (input$70) + '` should NOT throw error, but it did.\r\n') + errorText;
			};
			console.log(('TestTyper test passed: `' + (input$70) + '`'));
			TestTyper.passed++;
		};
	TestTyper.shouldError = (input$71) => {
			TestTyper.overall++;
			if (TestTyper.didError(input$71) == null) {
				throw ('TestTyper test fail: `' + (input$71) + '` should throw error, but it is not.');
			};
			console.log(('TestTyper test passed: `' + (input$71) + '`'));
			TestTyper.passed++;
		};
	TestTyper.didError = (input$72) => {
			const input$73 = 'module { ' + '@untypedFields declare class Any {} ' + '@untypedFields declare class Void {} ' + '@untypedFields declare class Null<T> {} ' + '@untypedFields declare class Array<T> {} ' + '@untypedFields declare class Map<K, V> {}' + '@untypedFields declare class Bool {}' + '@untypedFields declare class Int {}' + '@untypedFields declare class String {}' + '}' + input$72;
			let lexe$74 = Lexer.tokenize(Buffer.from(input$73), 'TEST');
			let parsed = new Parser(lexe$74).node;
			try {
				Typer.fillScopes(Node.TBlock([parsed]))
			} catch(e) {
				return '' + e
			};
			return null;
		};
	Typer/*!5*/ = class Typer {

	}
	Typer.fillScopes = (allCode) => {
			let namespaces = new Map();
			const nameOfModuleItem = (node$75) => {
				{
				const $switch$ = node$75;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 21: {
				const name = $switch$[2];
				{
					return name;
				} break; }
				case 41: {
				const node = $switch$[2];
				{
					{
					const $switch$ = node;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 23: {
					const t = $switch$[2];
					{
						{
						const $switch$ = t;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 1: {
						const name = $switch$[2];
						{
							return name;
						} break; }
						case 2: {
						const name = $switch$[2];
						{
							return name;
						} break; }
						
						}};
					} break; }
					
					}};
				} break; }
				case 23: {
				const t = $switch$[2];
				{
					{
					const $switch$ = t;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 1: {
					const name = $switch$[2];
					{
						return name;
					} break; }
					case 2: {
					const name = $switch$[2];
					{
						return name;
					} break; }
					
					}};
				} break; }
				case 33: {
				const t = $switch$[2];
				{
					{
					const $switch$ = t;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 1: {
					const name = $switch$[2];
					{
						return name;
					} break; }
					case 2: {
					const name = $switch$[2];
					{
						return name;
					} break; }
					
					}};
				} break; }
				case 35: {
				const name = $switch$[2];
				{
					return name;
				} break; }
				default:
					{
					throw '' + node$75;
				}
				}};
			};
			const fillModuleNamespace = (m) => {
				let el = null;
				let root = null;
				{
				const $switch$ = m;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 31: {
				const path = $switch$[2];
				const els = $switch$[3];
				{
					el = els;
					root = path.join('.');
				} break; }
				default:
					{
					throw 'module?!';
				}
				}};
				if (namespaces[root] == null) {
					namespaces[root] = m;
				} else {
					let els = null;
					{
					const $switch$ = namespaces[root];
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 31: {
					const el = $switch$[3];
					{
						els = el;
					} break; }
					default:
						{
						throw 'module?!';
					}
					}};
					while(el.length > 0) els.push(el.pop());
				};
				{
					let els = null;
					{
					const $switch$ = namespaces[root];
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 31: {
					const el = $switch$[3];
					{
						els = el;
					} break; }
					default:
						{
						throw 'module?!';
					}
					}};
					for (const e of els) {
						let name = nameOfModuleItem(e);
						let found = false;
						for (const e$76 of els) {
							if (nameOfModuleItem(e$76) == name) {
								if (found) {
									throw ('Type `' + (name) + '` already exists in module');
								};
								if (!found) {
									found = true;
								};
							};
						};
					};
				};
			};
			{
			const $switch$ = allCode;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 10: {
			const files = $switch$[2];
			{
				for (const file of files) {
					let didInit = false;
					{
					const $switch$ = file;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 10: {
					const el = $switch$[2];
					{
						for (const e of el) {
						const $switch$ = e;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 31: {
						{
							if (didInit) {
								throw 'Expressions should follow after modules2 ' + e + '\n!! ' + file;
							};
							fillModuleNamespace(e);
						} break; }
						default:
							{
							didInit = true;
						}
						}};
					} break; }
					case 31: {
					{
						if (didInit) {
							throw 'Expressions should follow after modules1' + file;
						};
						fillModuleNamespace(file);
					} break; }
					default:
						{
						didInit = true;
					}
					}};
				};
			} break; }
			default:
				{
				throw 'Typer expects all files to be collected into a block';
			}
			}};
			let intermediate = [];
			{
				let intermediateSubs = [];
				for (const ns of namespaces.keys()) {
					let path = ns.split('.');
					let namespace = path.shift();
					const check = (namespace$77) => {
						if (namespaces[namespace$77] == null && intermediate.indexOf(namespace$77) == -1) {
							intermediate.push(namespace$77);
						};
					};
					check(namespace);
					while(path.length > 0) {
						namespace += '.' + path.shift();
						check(namespace);
					};
				};
				for (const path of intermediate) {
					let m = Node.TModule(path.split('.'), []);
					namespaces[path] = m;
				};
			};
			const findInNamespaceRoots = (name) => {
				if (namespaces[name] != null) {
					return namespaces[name];
				};
				let m = namespaces[''];
				let el = null;
				{
				const $switch$ = m;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 31: {
				const els = $switch$[3];
				{
					el = els;
				} break; }
				default:
					{
					throw 'module?!';
				}
				}};
				for (const e of el) if (name == nameOfModuleItem(e)) {
					return e;
				};
				return null;
			};
			let scopes = [new Map()];
			let currentClass = [];
			let prevnode = null;
			let isInExternalClass = false;
			const pushScope = () => {
				scopes.push(new Map())
					};
			const popScope = () => {
				scopes.pop()
					};
			const addScope = (name, node$78) => {
				scopes[scopes.length - 1].set(name, node$78)
					};
			const fail = (msg, node$79) => {
				let data = Project.data.get(node$79);
				if (data == null) {
					data = Project.data.get(prevnode);
				};
				if (data == null) {
					return new CompilerError(Fail.TyperError, msg, 0, 0, '');
				};
				return new CompilerError(Fail.TyperError, msg, data.line, data.column, data.fileName);
			};
			let prevnode_s = null;
			const findName = (name) => {};
			const fill = (node$80) => {
				prevnode = node$80;
				{
				const $switch$ = node$80;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 34: {
				const path = $switch$[2];
				const bind = $switch$[3];
				const expr = $switch$[4];
				{
					{
						for (const e of bind) {
						const $switch$ = e;
						if($switch$ == null) {
							{
							{};
						}
						} else {
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 21: {
						const name = $switch$[2];
						{
							addScope(name, e);
						} break; }
						default:
							{
							throw 'TEnumExtract contains not a var: ' + e;
						}
						}
						} };
						if (DataHelper.isVoidValue(expr)) {
							throw fail('There should be a non-void value instead of ', expr);
						};
						fill(expr);
					};
				} break; }
				case 22: {
				const e = $switch$[2];
				{
					for (const ee of e) fill(ee);
				} break; }
				case 10: {
				const el = $switch$[2];
				{
					pushScope();
					for (const e of el) fill(e);
					popScope();
				} break; }
				case 1: {
				const name = $switch$[2];
				{
					let subj = null;
					{ let $v = scopes.length; let i = 0; while(i < $v) {{
						subj = scopes[scopes.length - i - 1].get(name);
						if (subj != null) {
							break;
						};
					}
					i++; }
					 };
					if (subj == null) {
						subj = findInNamespaceRoots(name);
					};
					if (subj == null) {
						throw fail(('Cannot find name `' + (name) + '` for ' + (node$80) + ''), node$80);
					};
					if (Project.mapNames.get(node$80) != null && Project.mapNames.get(node$80) != subj) {
						throw fail(('mapNames overwitten from ' + (Project.mapNames.get(node$80)) + ' to ' + (subj) + ' for node ' + (node$80) + ''), node$80);
					};
					Project.mapNames.set(node$80, subj);
					{
					const $switch$ = subj;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 21: {
					{} break; }
					default:
						{}
					}};
				} break; }
				case 36: {
				const names = $switch$[2];
				{
					{};
				} break; }
				case 21: {
				const name = $switch$[2];
				const e = $switch$[4];
				const $const = $switch$[5];
				{
					if (e == null && $const) {
						throw fail(('Constant should have a value `let ' + (name) + ' = value`'), node$80);
					};
					if (e != null) {
						{
						const $switch$ = e;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 23: {
						{
							throw fail('Variable should not have class as a value', node$80);
						} break; }
						default:
							{}
						}};
						if (DataHelper.isVoidValue(e)) {
							throw fail(('Cannot assign var to a void `var ' + (name) + ' = void`'), node$80);
						};
						fill(e);
					};
					addScope(name, node$80);
				} break; }
				case 27: {
				const el = $switch$[2];
				{
					for (const e of el) fill(e);
				} break; }
				case 28: {
				const keys = $switch$[2];
				const values = $switch$[3];
				{
					{ let $v = keys.length; let i = 0; while(i < $v) {{
						fill(keys[i]);
						fill(values[i]);
					}
					i++; }
					 };
				} break; }
				case 38: {
				const e = $switch$[2];
				{
					fill(e);
				} break; }
				case 9: {
				const a = $switch$[2];
				const b = $switch$[4];
				{
					if (DataHelper.isVoidValue(b)) {
						throw fail('Cannot use void as value', node$80);
					};
					fill(a);
					let parent = Project.mapNames.get(a);
					{
					const $switch$ = parent;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 21: {
					const name = $switch$[2];
					const $const = $switch$[5];
					{
						if ($const) {
							throw fail(('Cannot reassign a constant `' + (name) + '`'), node$80);
						};
					} break; }
					case 20: {
					const name = $switch$[2];
					{
						throw fail(('Cannot reassign a function `' + (name) + '`'), node$80);
					} break; }
					default:
						{}
					}};
					fill(b);
				} break; }
				case 8: {
				const a = $switch$[2];
				const op = $switch$[3];
				const b = $switch$[4];
				{
					if (DataHelper.isVoidValue(a)) {
						throw fail('Cannot use void as value', node$80);
					};
					if (DataHelper.isVoidValue(b)) {
						throw fail('Cannot use void as value', node$80);
					};
					fill(a);
					fill(b);
					let parent = Project.mapNames.get(a);
					if (op == Token.OpAssign) {
						{
						const $switch$ = parent;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 21: {
						const name = $switch$[2];
						const $const = $switch$[5];
						{
							if ($const) {
								throw fail(('Cannot reassign a constant `' + (name) + '`'), node$80);
							};
						} break; }
						case 20: {
						const name = $switch$[2];
						{
							throw fail(('Cannot reassign a function `' + (name) + '`'), node$80);
						} break; }
						default:
							{}
						}};
					};
					{
					const $switch$ = node$80;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					default:
						{}
					}};
				} break; }
				case 16: {{
					{};
				} break; }
				case 11: {
				const e = $switch$[2];
				const el = $switch$[3];
				const elnames = $switch$[4];
				{
					fill(e);
					for (const e of el) {
						if (DataHelper.isVoidValue(e)) {
							throw fail('Cannot use void as argument value', node$80);
						};
						fill(e);
					};
				} break; }
				case 23: {
				const t = $switch$[2];
				const ex = $switch$[3];
				const i = $switch$[4];
				const f = $switch$[5];
				const external = $switch$[6];
				{
					let iiec = isInExternalClass;
					isInExternalClass = external;
					let name = Typer.extractTypeName(t);
					addScope(name, node$80);
					currentClass.push(node$80);
					pushScope();
					for (const field of f) {
						let name$81 = null;
						{
						const $switch$ = field;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 21: {
						const fname = $switch$[2];
						{
							name$81 = fname;
						} break; }
						case 20: {
						const fname = $switch$[2];
						{
							if (fname == null) {
								name$81 = 'new';
							} else name$81 = fname;
						} break; }
						case 40: {
						const f = $switch$[2];
						{
							{
							const $switch$ = f;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 21: {
							const fname = $switch$[2];
							{
								name$81 = fname;
							} break; }
							case 20: {
							const fname = $switch$[2];
							{
								name$81 = fname;
							} break; }
							
							}};
						} break; }
						default:
							{
							throw fail(('Incorrect class field node: ' + (field) + ''), node$80);
						}
						}};
						let map$82 = scopes[scopes.length - 1];
						if (map$82.has(name$81)) {
							throw fail(('Class field `' + (name$81) + '` already exists'), node$80);
						};
						map$82.set(name$81, field);
						Project.mapNames.set(field, node$80);
					};
					for (const field of f) {
						{
						const $switch$ = field;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 20: {
						const e = $switch$[3];
						const v = $switch$[4];
						const r = $switch$[5];
						{
							if (e != null) {
								fill(Node.TFunction(null, e, v, r));
							};
						} break; }
						case 21: {
						const e = $switch$[4];
						{
							if (e != null) {
								fill(e);
							};
						} break; }
						case 40: {
						const e = $switch$[2];
						{
							{
							const $switch$ = e;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 20: {
							const e = $switch$[3];
							const v = $switch$[4];
							const r = $switch$[5];
							{
								if (e != null) {
									fill(Node.TFunction(null, e, v, r));
								};
							} break; }
							case 21: {
							const e = $switch$[4];
							{
								if (e != null) {
									fill(e);
								};
							} break; }
							
							}};
						} break; }
						default:
							{
							{};
						}
						}};
					};
					popScope();
					currentClass.pop();
					isInExternalClass = iiec;
				} break; }
				case 35: {
				const name = $switch$[2];
				const vnode = $switch$[3];
				{
					{
					const $switch$ = vnode;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 21: {
					const vname = $switch$[2];
					const t = $switch$[3];
					const expr = $switch$[4];
					const $const = $switch$[5];
					{
						if ($const && expr == null) {
							addScope(name, node$80);
						};
					} break; }
					case 20: {
					const fname = $switch$[2];
					const expr = $switch$[3];
					const vars = $switch$[4];
					const rettype = $switch$[5];
					{
						addScope(name, node$80);
						addScope(name, vnode);
					} break; }
					default:
						{
						addScope(name, node$80);
						fill(vnode);
					}
					}};
				} break; }
				case 25: {
				const e = $switch$[2];
				const n = $switch$[3];
				{
					fill(e);
				} break; }
				case 44: {
				const a = $switch$[2];
				const b = $switch$[3];
				{
					fill(a);
					fill(b);
				} break; }
				case 33: {
				const t = $switch$[2];
				const f = $switch$[3];
				{
					let name = Typer.extractTypeName(t);
					addScope(name, node$80);
					for (const field of f) {
						{
						const $switch$ = field;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 40: {
						const e = $switch$[2];
						{
							{
							const $switch$ = e;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 20: {
							const e = $switch$[3];
							const v = $switch$[4];
							const r = $switch$[5];
							{
								if (e != null) {
									fill(Node.TFunction(null, e, v, r));
								};
							} break; }
							
							}};
						} break; }
						case 20: {
						const e = $switch$[3];
						const v = $switch$[4];
						const r = $switch$[5];
						{
							if (e != null) {
								fill(Node.TFunction(null, e, v, r));
							};
						} break; }
						default:
							{
							{};
						}
						}};
					};
				} break; }
				case 43: {
				const name = $switch$[2];
				const over = $switch$[3];
				const by = $switch$[4];
				{
					if (DataHelper.isVoidValue(over)) {
						throw fail('Cannot use void as value', node$80);
					};
					pushScope();
					fill(over);
					addScope(name, node$80);
					fill(by);
					popScope();
				} break; }
				case 20: {
				const name = $switch$[2];
				const expr = $switch$[3];
				const vars = $switch$[4];
				const rettype = $switch$[5];
				{
					if (expr == null && !isInExternalClass) {
						throw fail('Non-external function should have a body', node$80);
					};
					if (name != null) {
						addScope(name, node$80);
					};
					pushScope();
					for (const v$83 of vars) {
						{
						const $switch$ = v$83;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 21: {
						const vname = $switch$[2];
						{
							addScope(vname, v$83);
						} break; }
						case 1: {
						const vname = $switch$[2];
						{
							addScope(vname, v$83);
						} break; }
						case 13: {
						const e = $switch$[2];
						{
							if (e != null) {
								throw fail(v$83 + '', node$80);
							};
						} break; }
						default:
							{
							throw fail(v$83 + '', node$80);
						}
						}};
					};
					if (expr != null) {
						fill(expr);
					};
					popScope();
				} break; }
				case 12: {
				const econd = $switch$[2];
				const eif = $switch$[3];
				const eelse = $switch$[4];
				{
					let depth = 0;
					for (const e of econd) {
						{
						const $switch$ = e;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 21: {
						const $const = $switch$[5];
						{
							if (!$const) {
								throw fail('Only if-let bindings supported', node$80);
							};
							depth++;
							pushScope();
							fill(e);
						} break; }
						default:
							{
							fill(e);
						}
						}};
					};
					fill(eif);
					while(depth > 0) {
						depth--;
						popScope();
					};
					if (eelse != null) {
						fill(eelse);
					};
				} break; }
				case 29: {
				const e = $switch$[2];
				const i = $switch$[3];
				{
					fill(e);
					fill(i);
				} break; }
				case 31: {
				{
					throw fail('Modules should be at a file\' upper scope', node$80);
				} break; }
				case 26: {
				const path = $switch$[2];
				const el = $switch$[4];
				const names = $switch$[5];
				const values = $switch$[6];
				{
					for (const e of el) fill(e);
				} break; }
				case 32: {
				const names = $switch$[2];
				const el = $switch$[3];
				{
					for (const e of el) fill(e);
				} break; }
				case 13: {
				const e = $switch$[2];
				{
					fill(e);
				} break; }
				case 14: {
				const e = $switch$[2];
				{
					if (e != null && DataHelper.isVoidValue(e)) {
						throw fail('Cannot use void as a returning value', node$80);
					};
					if (e != null) {
						fill(e);
					};
				} break; }
				case 40: {
				const e = $switch$[2];
				{
					fill(e);
				} break; }
				case 4: {{
					Project.mapNames.set(node$80, currentClass[currentClass.length - 1]);
				} break; }
				case 3: {{
					Project.mapNames.set(node$80, currentClass[currentClass.length - 1]);
				} break; }
				case 30: {
				const exprs = $switch$[2];
				const conds = $switch$[3];
				const guards = $switch$[4];
				const cases = $switch$[5];
				{
					{
						for (const e of exprs) {
							pushScope();
							fill(e);
							popScope();
						};
						let i = 0;
						while(i < cases.length) {
							pushScope();
							let e = conds[i];
							const follow = (e$84) => {
								{
								const $switch$ = e$84;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 25: {
								const ex = $switch$[2];
								const name = $switch$[3];
								{
									{
										fill(e$84);
									};
								} break; }
								case 13: {
								const e = $switch$[2];
								{
									{
										fill(e);
									};
								} break; }
								case 39: {{
									{};
								} break; }
								case 7: {{
									{};
								} break; }
								case 2: {
								{
									{};
								} break; }
								case 5: {
								{
									{};
								} break; }
								case 0: {
								{
									{};
								} break; }
								case 11: {
								const ex = $switch$[2];
								const args = $switch$[3];
								const argNames = $switch$[4];
								{
									{
										follow(ex);
										for (const ee of args) follow(ee);
									};
								} break; }
								case 1: {
								const name = $switch$[2];
								{
									{
										if (name.charAt(0) == name.charAt(0).toUpperCase()) {
											fill(e$84);
										} else addScope(name, node$80);
									};
								} break; }
								case 8: {
								const a = $switch$[2];
								const op = $switch$[3];
								const b = $switch$[4];
								{
									if (op == Token.OpOr) {
										follow(a);
										follow(b);
									} else throw fail('' + e$84, e$84);
								} break; }
								case 12: {
								const econd = $switch$[2];
								{
									pushScope();
									fill(econd[0]);
									popScope();
								} break; }
								default:
									{
									throw fail('' + e$84, e$84);
								}
								}};
							};
							follow(e);
							let e$85 = cases[i];
							pushScope();
							fill(e$85);
							popScope();
							popScope();
							i++;
						};
					};
				} break; }
				case 15: {
				const e = $switch$[2];
				{
					fill(e);
				} break; }
				case 24: {
				const e = $switch$[2];
				const t = $switch$[3];
				const v = $switch$[4];
				const ca = $switch$[5];
				{
					fill(e);
					{ let $v = ca.length; let e = 0; while(e < $v) {{
						pushScope();
						scopes[scopes.length - 1].set(DataHelper.varName(v[e]), v[e]);
						fill(ca[e]);
						popScope();
					}
					e++; }
					 };
				} break; }
				case 18: {
				const e = $switch$[4];
				{
					fill(e);
				} break; }
				case 19: {
				const econd = $switch$[2];
				const e = $switch$[3];
				{
					fill(econd);
					fill(e);
				} break; }
				case 37: {
				const el = $switch$[2];
				const el2 = $switch$[3];
				{
					{};
				} break; }
				case 45: {
				const t = $switch$[2];
				{
					{};
				} break; }
				case 39: {{
					{};
				} break; }
				case 7: {{
					{};
				} break; }
				case 17: {{
					{};
				} break; }
				case 0: {
				{
					{};
				} break; }
				case 2: {
				{
					{};
				} break; }
				case 5: {
				{
					{};
				} break; }
				case 6: {
				{
					{};
				} break; }
				case 42: {
				const f = $switch$[2];
				{
					fill(f);
				} break; }
				case 41: {
				const f = $switch$[2];
				{
					fill(f);
				} break; }
				
				}};
			};
			const fillFile = (file) => {
				fill(file);
			};
			const fillModule = (mod) => {
				{
				const $switch$ = mod;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 31: {
				const path = $switch$[2];
				const el = $switch$[3];
				{
					for (const e of el) fill(e);
				} break; }
				default:
					{
					console.log(('-------> fillModule ' + (mod) + ''));
				}
				}};
			};
			{
			const $switch$ = allCode;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 10: {
			const files = $switch$[2];
			{
				pushScope();
				for (const file of files) {
				const $switch$ = file;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 10: {
				const el = $switch$[2];
				{
					for (const e of el) {
					const $switch$ = e;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 31: {
					{
						fillModule(e);
					} break; }
					default:
						{
						{};
					}
					}};
				} break; }
				case 31: {
				{
					fillModule(file);
				} break; }
				default:
					{
					{};
				}
				}};
				popScope();
				for (const file of files) {
					pushScope();
					{
					const $switch$ = file;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 10: {
					const el = $switch$[2];
					{
						for (const e of el) {
						const $switch$ = e;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 31: {
						{
							{};
						} break; }
						default:
							{
							fill(e);
						}
						}};
					} break; }
					case 31: {
					{
						{};
					} break; }
					default:
						{
						fill(file);
					}
					}};
					popScope();
				};
			} break; }
			default:
				{
				throw 'Typer expects all files to be collected into a block';
			}
			}};
		};
	Typer.extractTypeName = (t$86) => {
			{
			const $switch$ = t$86;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 1: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			case 2: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			default:
				{
				throw 'Type has no name: ' + t$86;
			}
			}};
		};
	GenJs/*!5*/ = class GenJs {

	}
	GenJs.id = 0;
	GenJs.tabs = '';
	GenJs.reserved = ['with', 'const'];
	GenJs.rename = (name) => {
			if (GenJs.reserved.indexOf(name) != -1) {
				return '$' + name;
			};
			return name;
		};
	GenJs.unblock = (e) => {
			{
			const $switch$ = e;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 10: {
			const el = $switch$[2];
			{
				if (el.length == 1) {
					return el[0];
				} else return e;
			} break; }
			default:
				{
				return e;
			}
			}};
		};
	GenJs.pushTab = () => {
		GenJs.tabs += '\t'
	}
;
	GenJs.popTab = () => {
		GenJs.tabs = GenJs.tabs.substring(0, GenJs.tabs.length - 1)
	}
;
	GenJs.stringifyBlockExpression = (node$87) => {
			let r = '';
			{
			const $switch$ = node$87;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 33: {
			const t = $switch$[2];
			{
				return r = 'const ' + GenJs.extractTypeName(t) + ' = ' + GenJs.stringify(node$87);
			} break; }
			case 12: {
			const econd = $switch$[2];
			const eif = $switch$[3];
			const eelse = $switch$[4];
			{
				if (econd.length == 1) {
					{
					const $switch$ = econd[0];
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 21: {
					const oname = $switch$[2];
					const t = $switch$[3];
					const expr = $switch$[4];
					const $const = $switch$[5];
					{
						{
							const cond = econd[0];
							r += '\n' + GenJs.tabs + '{\n';
							GenJs.pushTab();
							GenJs.pushScope();
							GenJs.parentNames.set(cond, oname);
							r += GenJs.tabs + 'const ' + oname + ' = ' + GenJs.stringify(expr) + '\n' + GenJs.tabs;
							r += 'if (' + oname + ' != null) ';
							{
							const $switch$ = eif;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 10: {
							{
								r += GenJs.stringify(eif);
							} break; }
							default:
								{
								r += GenJs.stringify(Node.TBlock([eif]));
							}
							}};
							if (eelse != null) {
								r += ' else ' + GenJs.stringifyBlockExpression(eelse);
							};
							GenJs.popTab();
							GenJs.popScope();
							return r + '\n' + GenJs.tabs + '}';
						};
					} break; }
					default:
						{
						{
							const cond = econd[0];
							r += 'if (' + GenJs.unwrapBlockValue(cond) + ') ';
							{
							const $switch$ = eif;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 10: {
							{
								r += GenJs.stringify(eif);
							} break; }
							default:
								{
								r += GenJs.stringify(Node.TBlock([eif]));
							}
							}};
							if (eelse != null) {
								r += ' else ' + GenJs.stringifyBlockExpression(eelse);
							};
							return r;
						};
					}
					}};
				} else {
					GenJs.pushScope();
					GenJs.pushTab();
					r += '{\n' + GenJs.tabs;
					if (eelse != null) {
						GenJs.addToScope('else$$');
						r += 'const else$$ = () => ' + GenJs.stringify(eelse) + '\n' + GenJs.tabs;
					};
					let depth = 0;
					let econds = econd;
					let i = 0;
					let condsstr = '';
					let constsstr = '';
					const addCond = (cond) => {
						return ((condsstr == ''))? (cond) : ((' && ' + cond));
					};
					while(econds[i] != null) {
						let cond = econds[i];
						condsstr = '';
						constsstr = '';
						const run = () => {
							do{{
								let innercond = econds[i];
								{
								const $switch$ = innercond;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 21: {
								const oname = $switch$[2];
								const t = $switch$[3];
								const expr = $switch$[4];
								const $const = $switch$[5];
								{
									GenJs.addToScope(oname);
									let name$88 = GenJs.rename(oname);
									GenJs.parentNames.set(cond, name$88);
									constsstr += 'const ' + name$88 + ' = ' + GenJs.stringify(expr) + ';\n' + GenJs.tabs;
									condsstr += addCond(name$88 + ' != null');
								} break; }
								default:
									{
									condsstr += addCond(GenJs.stringify(innercond));
								}
								}};
								if (econds[i + 1] != null) {
									{
									const $switch$ = econds[i + 1];
									switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
									case 21: {
									const oname = $switch$[2];
									const t = $switch$[3];
									const expr = $switch$[4];
									const $const = $switch$[5];
									{
										{
											return ;
										};
									} break; }
									default:
										{}
									}};
								};
								i++;
							}}while(econds[i] != null)
								};
						run();
						r += constsstr;
						r += 'if (' + condsstr + ') {';
						GenJs.pushTab();
						r += '\n' + GenJs.tabs;
						depth++;
						i++;
					};
					{
					const $switch$ = eif;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 10: {
					{
						r += GenJs.stringify(eif);
					} break; }
					default:
						{
						r += GenJs.stringify(Node.TBlock([eif]));
					}
					}};
					while(depth > 0) {
						GenJs.popTab();
						r += '\n' + GenJs.tabs + '}';
						if (eelse != null) {
							r += ' else else$$()';
						};
						depth--;
					};
					GenJs.popTab();
					GenJs.popScope();
					r += '\n' + GenJs.tabs + '}';
					return r;
				};
			} break; }
			case 20: {
			const name = $switch$[2];
			const expr = $switch$[3];
			const vars = $switch$[4];
			{
				GenJs.pushScope();
				let newname = GenJs.rename(name);
				let ivars = ((()=>{const return$$ = []; const $switch$ = vars;for (const v$89 of $switch$) { return$$.push(((v$90) => {
					{
					const $switch$ = v$90;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 21: {
					const oname = $switch$[2];
					{
						let name$91 = GenJs.rename(oname);
						if (GenJs.hasInScope(name$91)) {
							name$91 += '$' + (++GenJs.id);
						};
						GenJs.addToScope(name$91);
						GenJs.parentNames.set(v$90, name$91);
						return GenJs.parentNames.get(v$90);
					} break; }
					case 1: {
					const oname = $switch$[2];
					{
						let name$92 = GenJs.rename(oname);
						if (GenJs.hasInScope(name$92)) {
							name$92 += '$' + (++GenJs.id);
						};
						GenJs.addToScope(name$92);
						GenJs.parentNames.set(v$90, name$92);
						return GenJs.parentNames.get(v$90);
					} break; }
					case 13: {
					const e = $switch$[2];
					{
						if (e != null) {
							throw v$90;
						};
						return '';
					} break; }
					default:
						{
						throw v$90;
					}
					}}
						})(v$89)); } return return$$;})()).join(', ');
				let funcbody = '';
				if (expr != null) {
					{
					const $switch$ = expr;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 10: {
					const el = $switch$[2];
					{
						funcbody = GenJs.stringify(expr);
					} break; }
					default:
						{
						GenJs.pushScope();
						GenJs.pushTab();
						funcbody = ('{\n' + (GenJs.tabs) + '') + GenJs.stringify(expr) + ('\n\t' + (GenJs.tabs) + '}');
						GenJs.popTab();
						GenJs.popScope();
					}
					}};
				} else funcbody = '{}';
				GenJs.popScope();
				return ('const ' + (newname) + ' = (' + (ivars) + ') => ' + (funcbody) + '');
			} break; }
			default:
				{
				return GenJs.stringify(node$87);
			}
			}};
		};
	GenJs.getAtt = (atts, atname) => {
			if (atts != null && atts.length > 0) {
				for (const att of atts) {
					if (att.name == atname) {
						return att;
					};
				};
			};
			return null;
		};
	GenJs.parentNames = new Map();
	GenJs.scopes = [new Map()];
	GenJs.pushScope = () => {
			GenJs.scopes.push(new Map());
		};
	GenJs.popScope = () => {
			GenJs.scopes.pop();
		};
	GenJs.hasInScope = (name$93) => {
			for (const scope of GenJs.scopes) {
				if (scope.get(name$93) != null) {
					return true;
				};
			};
			return false;
		};
	GenJs.addToScope = (name$94) => {
			GenJs.scopes[GenJs.scopes.length - 1].set(name$94, true);
		};
	GenJs.stringifyProject = (node$95) => {
			{
			const $switch$ = node$95;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 10: {
			const el = $switch$[2];
			{
				let output = ['{', '\t"use strict"'];
				GenJs.pushTab();
				{
					let namespaces = [];
					const placeholder = (e$96) => {
						{
						const $switch$ = e$96;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 35: {
						{
							{};
						} break; }
						case 23: {
						const ex = $switch$[6];
						{
							if (ex) {} else output.push('\tlet ' + DataHelper.nameOf(e$96));
						} break; }
						default:
							{
							output.push('\tlet ' + DataHelper.nameOf(e$96));
						}
						}}
							};
					const pushNamespace = (path) => {
						if (namespaces.indexOf(path.join('.')) == -1) {
							namespaces.push(path.join('.'));
						};
					};
					for (const e$97 of el) {
					const $switch$ = e$97;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 10: {
					const el = $switch$[2];
					{
						for (const e$98 of el) {
						const $switch$ = e$98;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 31: {
						const path = $switch$[2];
						const el = $switch$[3];
						{
							if (path.length == 0) {
								for (const e$99 of el) placeholder(e$99);
							} else pushNamespace(path);
						} break; }
						default:
							{
							{};
						}
						}};
					} break; }
					case 31: {
					const path = $switch$[2];
					const el = $switch$[3];
					{
						if (path.length == 0) {
							for (const e$100 of el) placeholder(e$100);
						} else pushNamespace(path);
					} break; }
					default:
						{
						throw '' + e$97;
					}
					}};
					let intermediate = [];
					for (const ns of namespaces) {
						let path = ns.split('.');
						let namespace = path.shift();
						const check = (namespace$101) => {
							if (intermediate.indexOf(namespace$101) == -1) {
								intermediate.push(namespace$101);
							};
						};
						check(namespace);
						while(path.length > 0) {
							namespace += '.' + path.shift();
							check(namespace);
						};
					};
					for (const ns of intermediate) if (ns == '') {} else if (ns.indexOf('.') == -1) {
						output.push(('\tconst ' + (ns) + ' = {}'));
					} else output.push(('\t' + (ns) + ' = {}'));
				};
				{
					const getClassGUID = (path, e$102) => {
						if (e$102 == null) {
							return GenJs.extractTypeName(e$102);
						};
						if (path.length == 0) {
							return GenJs.extractTypeName(e$102);
						};
						if (path.length == 1) {
							return path[0] + '.' + GenJs.extractTypeName(e$102);
						};
						return path.join('.') + '.' + GenJs.extractTypeName(e$102);
					};
					let cs = 0;
					let fs = 0;
					const fillClasses = (extendsWhat) => {
						cs++;
						const fillClassesOf = (path, el) => {
							fs++;
							if (path.length == 0) {
								for (const e$103 of el) {
								const $switch$ = e$103;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 35: {
								{
									if (extendsWhat == null) {
										output.push(GenJs.stringify(e$103));
									};
								} break; }
								case 23: {
								const t = $switch$[2];
								const ext = $switch$[3];
								const ex = $switch$[6];
								{
									if (ex && extendsWhat == null) {
										output.push(GenJs.stringify(e$103));
									} else if ((extendsWhat == null && ext == null) || extendsWhat == GenJs.extractTypeName(ext)) {
										output.push('\t' + DataHelper.nameOf(e$103) + '/*!5*/ = ' + GenJs.stringifyClass(e$103, null) + ';');
										fillClasses(getClassGUID(path, t));
									} else {};
								} break; }
								default:
									{
									if (extendsWhat == null) {
										output.push('\t' + DataHelper.nameOf(e$103) + '/*!1*/ = ' + GenJs.stringify(e$103) + ';');
									};
								}
								}};
								return ;
							};
							{
								for (const e$104 of el) {
								const $switch$ = e$104;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 35: {
								{
									if (extendsWhat == null) {
										GenJs.stringify(e$104);
									};
								} break; }
								case 23: {
								const t = $switch$[2];
								const ext = $switch$[3];
								const ex = $switch$[6];
								{
									if (ex && extendsWhat == null) {
										GenJs.stringify(e$104);
									} else if ((extendsWhat == null && ext == null) || extendsWhat == GenJs.extractTypeName(ext)) {
										output.push('\t' + path.join('.') + '.' + DataHelper.nameOf(e$104) + '/*!4*/ = ' + GenJs.stringifyClass(e$104, path) + ';');
										fillClasses(getClassGUID(path, t));
									} else {};
								} break; }
								default:
									{
									if (extendsWhat == null) {
										output.push('\t' + path.join('.') + '.' + DataHelper.nameOf(e$104) + '/*!3*/ = ' + GenJs.stringify(e$104) + ';');
									};
								}
								}};
								return ;
							};
						};
						for (const e$105 of el) {
						const $switch$ = e$105;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 10: {
						const el = $switch$[2];
						{
							for (const e$106 of el) {
							const $switch$ = e$106;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 31: {
							const path = $switch$[2];
							const el = $switch$[3];
							{
								fillClassesOf(path, el);
							} break; }
							default:
								{
								{};
							}
							}};
						} break; }
						case 31: {
						const path = $switch$[2];
						const el = $switch$[3];
						{
							fillClassesOf(path, el);
						} break; }
						default:
							{
							throw '' + e$105;
						}
						}};
					};
					fillClasses(null);
				};
				{
					const fill = (path, el) => {
						if (path.length == 0) {
							for (const e$107 of el) {
							const $switch$ = e$107;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 35: {
							{
								GenJs.stringify(e$107);
							} break; }
							case 23: {
							const ext = $switch$[6];
							{
								if (ext) {
									GenJs.stringify(e$107);
								} else output.push('\t' + DataHelper.nameOf(e$107) + '/*!5*/ = ' + GenJs.stringifyClass(e$107, null) + ';');
							} break; }
							default:
								{
								output.push('\t' + DataHelper.nameOf(e$107) + '/*!1*/ = ' + GenJs.stringify(e$107) + ';');
							}
							}};
							return ;
						};
						{
							for (const e$108 of el) {
							const $switch$ = e$108;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 35: {
							{
								GenJs.stringify(e$108);
							} break; }
							case 23: {
							const ex = $switch$[6];
							{
								if (ex) {
									GenJs.stringify(e$108);
								} else output.push('\t' + path.join('.') + '.' + DataHelper.nameOf(e$108) + '/*!3*/ = ' + GenJs.stringifyClass(e$108, path) + ';');
							} break; }
							default:
								{
								output.push('\t' + path.join('.') + '.' + DataHelper.nameOf(e$108) + '/*!3*/ = ' + GenJs.stringify(e$108) + ';');
							}
							}};
							return ;
						};
					};
				};
				{
					for (const e$109 of el) {
					const $switch$ = e$109;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 10: {
					const el = $switch$[2];
					{
						for (const e$110 of el) {
						const $switch$ = e$110;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 31: {
						{
							{};
						} break; }
						default:
							{
							output.push('\t/*!2*/' + GenJs.stringifyBlockExpression(e$110));
						}
						}};
					} break; }
					case 31: {
					{
						{};
					} break; }
					default:
						{
						throw '' + e$109;
					}
					}};
				};
				output.push('}');
				return output.join('\n');
			} break; }
			default:
				{
				throw 'stringifyProject got ' + node$95;
			}
			}};
		};
	GenJs.enumUid = 0;
	GenJs.stringifyClass = (node$111, path) => {
			{
			const $switch$ = node$111;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 23: {
			const t = $switch$[2];
			const ext = $switch$[3];
			const impl = $switch$[4];
			const fields = $switch$[5];
			const external = $switch$[6];
			{
				let cname = GenJs.extractTypeName(t);
				let r = ((external)? ('/* declare class ') : ('class ')) + cname;
				if (path != null) {
					cname = path.join('.') + '.' + cname;
				};
				if (ext != null) {
					r += ' extends ' + GenJs.extractTypeName(ext);
				};
				r += ' {\n';
				let after = [];
				let constructorFieldsInit = [];
				let constructorCode = '';
				for (const f of fields) {
					{
					const $switch$ = f;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 40: {
					const f = $switch$[2];
					{
						{
						const $switch$ = f;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 20: {
						{
							GenJs.parentNames.set(f, DataHelper.nameOf(f));
						} break; }
						case 21: {
						{
							GenJs.parentNames.set(f, DataHelper.nameOf(f));
						} break; }
						
						}};
					} break; }
					case 20: {
					{
						GenJs.parentNames.set(f, DataHelper.nameOf(f));
					} break; }
					case 21: {
					{
						GenJs.parentNames.set(f, DataHelper.nameOf(f));
					} break; }
					default:
						{
						throw '' + f;
					}
					}};
				};
				for (const f of fields) {
					let code = '';
					let isafter = false;
					const unmeta = (f$112) => {
						{
						const $switch$ = f$112;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						default:
							{
							return f$112;
						}
						}};
					};
					let f$113 = unmeta(f);
					{
					const $switch$ = f$113;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 40: {
					const field = $switch$[2];
					{
						f$113 = field;
						isafter = true;
					} break; }
					default:
						{
						{};
					}
					}};
					const f$114 = unmeta(f$113);
					{
					const $switch$ = f$114;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 20: {
					const name = $switch$[2];
					const expr = $switch$[3];
					const vars = $switch$[4];
					{
						if (name != 'new') {
							let out = '';
							if (name == 'new') {
								name = 'constructor';
							};
							if (isafter) {
								out += cname + '.' + GenJs.rename(name) + ' = ';
							} else out += '\t' + GenJs.rename(name);
							out += '(' + ((()=>{const return$$ = []; const $switch$ = vars;for (const v$115 of $switch$) { return$$.push(((v$116) => {
								{
								const $switch$ = v$116;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 21: {
								const oname = $switch$[2];
								{
									let name$117 = GenJs.rename(oname);
									if (GenJs.hasInScope(name$117)) {
										name$117 += '$' + (++GenJs.id);
									};
									GenJs.addToScope(name$117);
									GenJs.parentNames.set(v$116, name$117);
									return GenJs.parentNames.get(v$116);
								} break; }
								default:
									{
									throw v$116;
								}
								}}
									})(v$115)); } return return$$;})()).join(', ') + ') ' + ((isafter)? ('=> ') : (''));
							if (expr != null) {
								{
								const $switch$ = expr;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 10: {
								const el = $switch$[2];
								{
									GenJs.pushTab();
									out += GenJs.stringifyBlockExpression(expr);
									GenJs.popTab();
								} break; }
								default:
									{
									GenJs.pushTab();
									out += ('{\n' + (GenJs.tabs) + '') + GenJs.stringifyBlockExpression(expr);
									GenJs.popTab();
									out += ('\n' + (GenJs.tabs) + '}\n');
								}
								}};
							} else out += '{}';
							code += out;
						};
					} break; }
					case 21: {
					const name = $switch$[2];
					const t = $switch$[3];
					const expr = $switch$[4];
					const $const = $switch$[5];
					{
						if (isafter) {
							code += cname + '.' + GenJs.rename(name);
							if (expr != null) {
								code += ' = ' + GenJs.unwrapBlockValue(expr);
							};
							if (expr == null) {
								code += ' = null';
							};
						};
						if (!isafter) {
							constructorFieldsInit.push(('this.' + (GenJs.rename(name)) + ' = ') + (expr != (null)? (GenJs.unwrapBlockValue(expr)) : ('null')));
						};
					} break; }
					default:
						{
						throw code += '' + f$114;
					}
					}};
					if (code != '') {
						if (isafter) {
							after.push(GenJs.tabs + code);
						} else r += '\n' + GenJs.tabs + code;
					};
				};
				let isafter = false;
				for (const f of fields) {
				const $switch$ = f;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 20: {
				const name = $switch$[2];
				const expr = $switch$[3];
				const vars = $switch$[4];
				{
					if (name == 'new') {
						let out = '';
						let name$118 = name;
						if (name$118 == 'new') {
							name$118 = 'constructor';
						};
						if (isafter) {
							out += cname + '.' + GenJs.rename(name$118) + ' = ';
						} else out += '\t' + GenJs.rename(name$118);
						out += '(' + ((()=>{const return$$ = []; const $switch$ = vars;for (const v$119 of $switch$) { return$$.push(((v$120) => {
							{
							const $switch$ = v$120;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 21: {
							const oname = $switch$[2];
							{
								let name$121 = GenJs.rename(oname);
								if (GenJs.hasInScope(name$121)) {
									name$121 += '$' + (++GenJs.id);
								};
								GenJs.addToScope(name$121);
								GenJs.parentNames.set(v$120, name$121);
								return GenJs.parentNames.get(v$120);
							} break; }
							default:
								{
								throw v$120;
							}
							}}
								})(v$119)); } return return$$;})()).join(', ') + ') ' + ((isafter)? ('=> ') : ('{'));
						out += ('\n' + (GenJs.tabs) + '') + constructorFieldsInit.join((';\n' + (GenJs.tabs) + '')) + ('\n' + (GenJs.tabs) + '');
						if (expr != null) {
							{
							const $switch$ = expr;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 10: {
							const el = $switch$[2];
							{
								GenJs.pushTab();
								out += GenJs.stringifyBlockExpression(expr);
								GenJs.popTab();
							} break; }
							default:
								{
								GenJs.pushTab();
								out += ('\n{\n' + (GenJs.tabs) + '') + GenJs.stringifyBlockExpression(expr);
								GenJs.popTab();
								out += ('\n' + (GenJs.tabs) + '}\n');
							}
							}};
						} else out += '';
						out += '\n}';
						r += '\n' + GenJs.tabs + out;
					};
				} break; }
				default:
					{}
				}};
				r += '\n' + GenJs.tabs + '}' + ((external)? (' */') : (''));
				r += '\n' + after.join(';\n');
				return r;
			} break; }
			default:
				{
				throw '' + node$111;
			}
			}};
		};
	GenJs.stringify = (node$122) => {
			let r = '';
			if (node$122 == null) {
				return '<!-- null -->';
			};
			let atts$123 = Project.mapAttributes.get(node$122);
			let a$124 = '';
			if (atts$123 != null && atts$123.length > 0) {
				for (const att of atts$123) {};
			};
			{
			const $switch$ = node$122;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 41: {
			const f = $switch$[2];
			{
				return '/*tprivate*/ ' + GenJs.stringify(f);
			} break; }
			case 42: {
			const f = $switch$[2];
			{
				return '/*texport*/' + GenJs.stringify(f);
			} break; }
			case 34: {
			const path = $switch$[2];
			const bind = $switch$[3];
			const expr = $switch$[4];
			{
				{
					GenJs.enumUid++;
					let out = '';
					let postout = '';
					let i = 0;
					for (const e$125 of bind) {
						{
						const $switch$ = e$125;
						if($switch$ == null) {
							{
							{};
						}
						} else {
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 21: {
						const name = $switch$[2];
						{
							let name$126 = GenJs.stringify(e$125).split(' ')[1];
							out += ('let ' + (name$126) + ' = null;\n') + GenJs.tabs;
							postout += GenJs.tabs + ('\t' + (name$126) + ' = enum' + (GenJs.enumUid) + '$.values[' + (i) + '];');
						} break; }
						default:
							{
							throw 'TEnumExtract contains not a var: ' + e$125;
						}
						}
						} };
						i++;
					};
					let value = ('const enum' + (GenJs.enumUid) + '$ = ') + GenJs.unwrapBlockValue(expr) + (';\n' + (GenJs.tabs) + '');
					return value + out + ('if (enum' + (GenJs.enumUid) + '$.index == $TODO) {\n') + postout + ('\n' + (GenJs.tabs) + '}');
				};
			} break; }
			case 36: {
			const names = $switch$[2];
			{
				return ('/*using ' + (names) + '*/');
			} break; }
			case 22: {
			const e = $switch$[2];
			{
				return ((()=>{const return$$ = []; const $switch$ = e;for (const e$127 of $switch$) { return$$.push(GenJs.stringify(e$127)); } return return$$;})()).join('; ');
			} break; }
			case 0: {
			const s = $switch$[2];
			{
				let s$128 = s.split('');
				let charsOut = [];
				while(s$128.length > 0) {
					{
					const $switch$ = s$128[0];
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case '\'': {
						charsOut.push('\\');
						charsOut.push('\'');
						s$128.shift();
					}
					break;
					case '\n': {
						charsOut.push('\\n');
						s$128.shift();
					}
					break;
					case '\r': {
						charsOut.push('\\r');
						s$128.shift();
					}
					break;
					case '\\': {
						s$128.shift();
						if (s$128[0] == '\'') {
							charsOut.push('\\');
							charsOut.push('\'');
							s$128.shift();
						} else {
							charsOut.push('\\');
						};
					}
					break;
					default:
						{
						charsOut.push(s$128[0]);
						s$128.shift();
					}
					}};
				};
				return '\'' + charsOut.join('') + '\'';
			} break; }
			case 1: {
			const s = $switch$[2];
			{
				let source = Project.mapNames.get(node$122);
				let n = null;
				{
				const $switch$ = source;
				if($switch$ == null) {
					{
					throw ('Unmapped ' + (node$122) + ' ') + JSON.stringify(Project.data.get(node$122));
				}
				} else {
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 35: {
				const name = $switch$[2];
				const t = $switch$[3];
				{
					let nn = GenJs.parentNames.get(source);
					if (nn == null) {
						throw ('TDeclare `' + (name) + '` parentNames null == ') + GenJs.parentNames.get(source) + ' for ' + source;
					};
					let arename = GenJs.getAtt(Project.mapAttributes.get(source), 'native');
					if (arename != null) {
						{
						const $switch$ = arename.values[0];
						if($switch$ == null) {
							{
							n = nn;
						}
						} else {
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 0: {
						const s = $switch$[2];
						{
							n = s;
						} break; }
						default:
							{
							n = nn;
						}
						}
						} };
					} else n = nn;
				} break; }
				case 33: {
				const t = $switch$[2];
				{
					{
					const $switch$ = t;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 1: {
					const name = $switch$[2];
					{
						n = name;
					} break; }
					default:
						{
						throw t;
					}
					}};
				} break; }
				case 43: {
				const name = $switch$[2];
				{
					n = GenJs.parentNames.get(source);
				} break; }
				case 1: {
				const name = $switch$[2];
				{
					n = GenJs.parentNames.get(source);
				} break; }
				case 21: {
				const name = $switch$[2];
				{
					n = GenJs.parentNames.get(source);
					if (n == null) {
						let data = Project.data.get(node$122);
						let at = (data != null)? (' at ' + data.line + ':' + data.column + ':' + data.fileName) : ('');
						throw ('TVar `' + (name) + '` parentNames null == ') + GenJs.parentNames.get(source) + ' for ' + source + at;
					};
					let static_source = Project.mapNames.get(source);
					if (static_source != null) {
						n = 'this.' + n;
					};
				} break; }
				case 40: {
				const f = $switch$[2];
				{
					let name$129 = null;
					{
					const $switch$ = f;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 21: {
					const n = $switch$[2];
					{
						name$129 = n;
					} break; }
					case 20: {
					const n = $switch$[2];
					{
						name$129 = n;
					} break; }
					default:
						{
						throw ('Node.TStatic ' + (s) + ' ') + source;
					}
					}};
					let static_source = Project.mapNames.get(source);
					{
					const $switch$ = static_source;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 23: {
					const t = $switch$[2];
					{
						n = GenJs.rename(GenJs.extractTypeName(t)) + '.' + GenJs.rename(name$129);
					} break; }
					case 33: {
					const t = $switch$[2];
					{
						n = GenJs.rename(GenJs.extractTypeName(t)) + '.' + GenJs.rename(name$129);
					} break; }
					default:
						{
						throw ('static_source is ' + (static_source) + '');
					}
					}};
				} break; }
				case 20: {
				const name = $switch$[2];
				{
					n = GenJs.rename(name);
					let static_source = Project.mapNames.get(source);
					if (static_source != null) {
						n = 'this.' + n;
					};
				} break; }
				case 23: {
				const t = $switch$[2];
				{
					let arename = GenJs.getAtt(Project.mapAttributes.get(source), 'native');
					let name$130 = GenJs.rename(GenJs.extractTypeName(t));
					if (arename != null) {
						{
						const $switch$ = arename.values[0];
						if($switch$ == null) {
							{
							n = name$130;
						}
						} else {
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 0: {
						const s = $switch$[2];
						{
							n = s;
						} break; }
						default:
							{
							n = name$130;
						}
						}
						} };
					} else n = name$130;
				} break; }
				case 31: {
				const path = $switch$[2];
				{
					n = path.join('.');
				} break; }
				case 30: {
				{
					n = GenJs.rename(s);
				} break; }
				default:
					{
					throw ('' + (s) + ' ') + source;
				}
				}
				} };
				return n;
			} break; }
			case 2: {
			const v = $switch$[2];
			{
				return ((v)? ('true') : ('false'));
			} break; }
			case 3: {{
				return 'this';
			} break; }
			case 4: {{
				return 'super';
			} break; }
			case 5: {
			const s = $switch$[2];
			{
				return s;
			} break; }
			case 6: {
			const s = $switch$[2];
			{
				return s;
			} break; }
			case 7: {{
				return 'null';
			} break; }
			case 16: {{
				return 'break';
			} break; }
			case 17: {{
				return 'continue';
			} break; }
			case 8: {
			const a = $switch$[2];
			const op = $switch$[3];
			const b = $switch$[4];
			{
				return GenJs.unwrapBlockValue(a) + ' ' + Token.stringify(op) + ' ' + GenJs.unwrapBlockValue(b);
			} break; }
			case 9: {
			const a = $switch$[2];
			const op = $switch$[3];
			const b = $switch$[4];
			{
				return GenJs.unwrapBlockValue(a) + ' ' + Token.stringify(op) + '= ' + GenJs.unwrapBlockValue(b);
			} break; }
			case 10: {
			const elements = $switch$[2];
			{
				if (elements.length == 0) {
					return '{}';
				};
				r = '{\n';
				GenJs.pushScope();
				GenJs.pushTab();
				for (const element of elements) {
				const $switch$ = element;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				default:
					{
					let code = GenJs.tabs + GenJs.stringifyBlockExpression(element) + ';\n';
					r += code;
				}
				}};
				GenJs.popTab();
				GenJs.popScope();
				return r + GenJs.tabs + '}';
			} break; }
			case 44: {
			const a = $switch$[2];
			const b = $switch$[3];
			{
				return GenJs.stringify(a) + ' || ' + GenJs.stringify(b);
			} break; }
			case 43: {
			const n = $switch$[2];
			const a = $switch$[3];
			const b = $switch$[4];
			{
				GenJs.pushScope();
				let name$131 = GenJs.rename(n);
				if (GenJs.hasInScope(name$131)) {
					name$131 += '$' + (++GenJs.id);
				};
				GenJs.addToScope(name$131);
				GenJs.parentNames.set(node$122, name$131);
				let res = '';
				{
				const $switch$ = a;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 25: {
				const f = $switch$[3];
				{
					if (f == 'length') {
						let i = GenJs.rename(name$131);
						res = ('{ let $v = ' + (GenJs.stringify(a)) + '; let ' + (i) + ' = 0; while(' + (i) + ' < $v) {') + GenJs.stringifyBlockExpression(b) + ('\n' + (GenJs.tabs) + '' + (i) + '++; }\n' + (GenJs.tabs) + ' }');
					} else {
						res = 'for (const ' + GenJs.rename(name$131) + ' of ' + GenJs.stringify(a) + ') ' + GenJs.stringifyBlockExpression(b);
					};
				} break; }
				case 5: {
				const s = $switch$[2];
				{
					let i = GenJs.rename(name$131);
					res = ('{ let ' + (i) + ' = 0; while(' + (i) + ' < ' + (s) + ') {') + GenJs.stringifyBlockExpression(b) + ('\n' + (GenJs.tabs) + '' + (i) + '++; }\n' + (GenJs.tabs) + ' }');
				} break; }
				default:
					{
					res = 'for (const ' + GenJs.rename(name$131) + ' of ' + GenJs.stringify(a) + ') ' + GenJs.stringifyBlockExpression(b);
				}
				}};
				GenJs.popScope();
				return res;
			} break; }
			case 11: {
			const e = $switch$[2];
			const el = $switch$[3];
			const argNames = $switch$[4];
			{
				let source = Project.mapNames.get(e);
				{
				const $switch$ = source;
				if($switch$ == null) {
					{
					return GenJs.unwrapBlockValue(e) + '(' + ((()=>{const return$$ = []; const $switch$ = el;for (const e$132 of $switch$) { return$$.push(GenJs.unwrapBlockValue(e$132)); } return return$$;})()).join(', ') + ')';
				}
				} else {
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 20: {
				const name = $switch$[2];
				{
					if (name == 'instanceof') {
						return '((' + GenJs.unwrapBlockValue(el[0]) + ') instanceof (' + GenJs.unwrapBlockValue(el[1]) + '))';
					};
					return GenJs.unwrapBlockValue(e) + '(' + ((()=>{const return$$ = []; const $switch$ = el;for (const e$133 of $switch$) { return$$.push(GenJs.unwrapBlockValue(e$133)); } return return$$;})()).join(', ') + ')';
				} break; }
				default:
					{
					return GenJs.unwrapBlockValue(e) + '(' + ((()=>{const return$$ = []; const $switch$ = el;for (const e$134 of $switch$) { return$$.push(GenJs.unwrapBlockValue(e$134)); } return return$$;})()).join(', ') + ')';
				}
				}
				} };
			} break; }
			case 13: {
			const e = $switch$[2];
			{
				{
				const $switch$ = e;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 13: {
				const e = $switch$[2];
				{
					return '(' + GenJs.unwrapBlockValue(e) + ')';
				} break; }
				
				}};
				return '(' + GenJs.unwrapBlockValue(e) + ')';
			} break; }
			case 14: {
			const e = $switch$[2];
			{
				if (e == null) {
					return 'return ';
				} else return 'return ' + GenJs.unwrapBlockValue(e);
			} break; }
			case 15: {
			const e = $switch$[2];
			{
				return 'throw ' + GenJs.unwrapBlockValue(e) + '';
			} break; }
			case 27: {
			const el = $switch$[2];
			{
				{
				const $switch$ = el[0];
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 43: {
				const oname = $switch$[2];
				const array = $switch$[3];
				const expr = $switch$[4];
				{
					const f = el[0];
					GenJs.pushScope();
					r += '((()=>{';
					r += 'const return$$ = []; ';
					let name$135 = GenJs.rename(oname);
					if (GenJs.hasInScope(name$135)) {
						name$135 += '$' + (++GenJs.id);
					};
					GenJs.addToScope(name$135);
					GenJs.parentNames.set(f, name$135);
					r += 'const $switch$ = ' + GenJs.unwrapBlockValue(array) + ';';
					{
					const $switch$ = array;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 25: {
					const f = $switch$[3];
					{
						if (f == 'length') {
							let i = GenJs.rename(name$135);
							r += ('let ' + (i) + ' = -1; while((' + (i) + '+1) < $switch$) { ' + (i) + '++; ');
						} else {
							r += 'for (const ' + GenJs.rename(name$135) + ' of $switch$) { ';
						};
					} break; }
					case 5: {
					const s = $switch$[2];
					{
						let i = GenJs.rename(name$135);
						r += ('let ' + (i) + ' = -1; while((' + (i) + '+1) < $switch$) { ' + (i) + '++; ');
					} break; }
					default:
						{
						r += 'for (const ' + GenJs.rename(name$135) + ' of $switch$) { ';
					}
					}};
					r += 'return$$.push(';
					r += GenJs.unwrapBlockValue(expr);
					r += '); } return return$$;';
					r += '})())';
					GenJs.popScope();
					return r;
				} break; }
				default:
					{
					return '[' + ((()=>{const return$$ = []; const $switch$ = el;for (const e$136 of $switch$) { return$$.push(GenJs.unwrapBlockValue(e$136)); } return return$$;})()).join(', ') + ']';
				}
				}};
			} break; }
			case 28: {
			const keys = $switch$[2];
			const values = $switch$[3];
			{
				if (keys.length == 0) {
					return 'new Map()';
				};
				return 'new Map([' + ((()=>{const return$$ = []; const $switch$ = keys.length;let i = -1; while((i+1) < $switch$) { i++; return$$.push('[' + GenJs.unwrapBlockValue(keys[i]) + ', ' + GenJs.unwrapBlockValue(values[i]) + ']'); } return return$$;})()).join(', ') + '])';
			} break; }
			case 12: {
			const econd = $switch$[2];
			const eif = $switch$[3];
			const eelse = $switch$[4];
			{
				r = '(' + ((()=>{const return$$ = []; const $switch$ = econd;for (const e$137 of $switch$) { return$$.push(GenJs.unwrapBlockValue(e$137)); } return return$$;})()).join(' && ') + ')? (' + GenJs.unwrapBlockValue(eif);
				if (eelse != null) {
					r += ') : (' + GenJs.unwrapBlockValue(eelse) + ')';
				};
				return r;
			} break; }
			case 18: {
			const op = $switch$[2];
			const postfix = $switch$[3];
			const e = $switch$[4];
			{
				return (postfix)? ((GenJs.stringify(e) + Token.stringify(op))) : ((Token.stringify(op) + GenJs.stringify(e)));
			} break; }
			case 19: {
			const econd = $switch$[2];
			const e = $switch$[3];
			const whileDo = $switch$[4];
			{
				if (whileDo) {
					return 'while(' + GenJs.stringify(econd) + ') ' + GenJs.stringify(e);
				};
				return 'do{' + GenJs.stringify(e) + '}while(' + GenJs.stringify(econd) + ')';
			} break; }
			case 45: {
			const type = $switch$[2];
			{
				return GenJs.extractTypeName(type);
			} break; }
			case 25: {
			const expr = $switch$[2];
			const name = $switch$[3];
			{
				{
				const $switch$ = expr;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 0: {
				const s = $switch$[2];
				{
					if (name == 'length') {
						return '' + s.length;
					};
				} break; }
				
				}};
				return GenJs.unwrapBlockValue(expr) + '.' + GenJs.rename(name);
			} break; }
			case 29: {
			const expr = $switch$[2];
			const index = $switch$[3];
			{
				return GenJs.unwrapBlockValue(expr) + '[' + GenJs.unwrapBlockValue(index) + ']';
			} break; }
			case 37: {
			const expr = $switch$[2];
			const t = $switch$[3];
			{
				return '';
			} break; }
			case 38: {
			const expr = $switch$[2];
			const kind = $switch$[3];
			const t = $switch$[4];
			{
				return '(' + GenJs.unwrapBlockValue(expr) + ')';
			} break; }
			case 20: {
			const name = $switch$[2];
			const expr = $switch$[3];
			const vars = $switch$[4];
			{
				GenJs.pushScope();
				r = '';
				if (name != null) {
					r += ' ' + GenJs.rename(name);
				};
				r += '(' + ((()=>{const return$$ = []; const $switch$ = vars;for (const v$138 of $switch$) { return$$.push(((v$139) => {
					{
					const $switch$ = v$139;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 21: {
					const oname = $switch$[2];
					{
						let name$140 = GenJs.rename(oname);
						if (GenJs.hasInScope(name$140)) {
							name$140 += '$' + (++GenJs.id);
						};
						GenJs.addToScope(name$140);
						GenJs.parentNames.set(v$139, name$140);
						return GenJs.parentNames.get(v$139);
					} break; }
					case 1: {
					const oname = $switch$[2];
					{
						let name$141 = GenJs.rename(oname);
						if (GenJs.hasInScope(name$141)) {
							name$141 += '$' + (++GenJs.id);
						};
						GenJs.addToScope(name$141);
						GenJs.parentNames.set(v$139, name$141);
						return GenJs.parentNames.get(v$139);
					} break; }
					case 13: {
					const e = $switch$[2];
					{
						if (e != null) {
							throw v$139;
						};
						return '';
					} break; }
					default:
						{
						throw v$139;
					}
					}}
						})(v$138)); } return return$$;})()).join(', ') + ') => ';
				if (expr != null) {
					{
					const $switch$ = expr;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 10: {
					const el = $switch$[2];
					{
						r += GenJs.stringify(expr);
					} break; }
					default:
						{
						GenJs.pushScope();
						GenJs.pushTab();
						r += ('{\n' + (GenJs.tabs) + '') + GenJs.stringify(expr) + ('\n\t' + (GenJs.tabs) + '}');
						GenJs.popTab();
						GenJs.popScope();
					}
					}};
				} else r += '{}';
				GenJs.popScope();
				return r;
			} break; }
			case 21: {
			const oname = $switch$[2];
			const t = $switch$[3];
			const expr = $switch$[4];
			const $const = $switch$[5];
			{
				if (oname == null) {
					throw ('name is null for ' + (node$122) + '');
				};
				let es = '';
				if (expr != null) {
					es = ' = ' + GenJs.unwrapBlockValue(expr);
				};
				let name$142 = GenJs.rename(oname);
				if (GenJs.hasInScope(name$142)) {
					name$142 += '$' + (++GenJs.id);
				};
				GenJs.addToScope(name$142);
				GenJs.parentNames.set(node$122, name$142);
				if (name$142 == null) {
					throw ('name is null for ' + (node$122) + '');
				};
				r = (($const)? ('const ') : ('let ')) + name$142 + es;
				return r;
			} break; }
			case 24: {
			const expr = $switch$[2];
			const t = $switch$[3];
			const v = $switch$[4];
			const catches = $switch$[5];
			{
				r = ('try {\n' + (GenJs.tabs) + '\t');
				GenJs.pushTab();
				{
				const $switch$ = expr;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 10: {
				const el = $switch$[2];
				{
					r += ((()=>{const return$$ = []; const $switch$ = el;for (const e$143 of $switch$) { return$$.push(GenJs.stringifyBlockExpression(e$143)); } return return$$;})()).join(';\n' + GenJs.tabs);
				} break; }
				default:
					{
					r += GenJs.stringify(expr);
				}
				}};
				GenJs.popTab();
				r += '\n' + GenJs.tabs + '} catch(' + DataHelper.varName(v[0]) + (') {\n' + (GenJs.tabs) + '\t');
				GenJs.pushTab();
				GenJs.parentNames.set(v[0], DataHelper.varName(v[0]));
				{
				const $switch$ = catches[0];
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 10: {
				const el = $switch$[2];
				{
					r += ((()=>{const return$$ = []; const $switch$ = el;for (const e$144 of $switch$) { return$$.push(GenJs.stringify(e$144)); } return return$$;})()).join(';\n' + GenJs.tabs);
				} break; }
				default:
					{
					r += GenJs.stringify(catches[0]);
				}
				}};
				GenJs.popTab();
				return r + '\n' + GenJs.tabs + '}';
			} break; }
			case 26: {
			const path = $switch$[2];
			const t = $switch$[3];
			const args = $switch$[4];
			const names = $switch$[5];
			const values = $switch$[6];
			{
				return 'new ' + path.join('.') + (path.length > (0)? ('.') : ('')) + GenJs.extractTypeName(t) + '(' + ((()=>{const return$$ = []; const $switch$ = args;for (const e$145 of $switch$) { return$$.push(GenJs.unwrapBlockValue(e$145)); } return return$$;})()).join(', ') + ')';
			} break; }
			case 30: {
			const exprs = $switch$[2];
			const conds = $switch$[3];
			const guards = $switch$[4];
			const cases = $switch$[5];
			{
				let nullCase = null;
				let defaultCase = null;
				let isComplexEnum = false;
				{ let $v = cases.length; let i = 0; while(i < $v) {{
					let cond = conds[i];
					{
					const $switch$ = cond;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 11: {
					{
						isComplexEnum = true;
					} break; }
					case 27: {
					{
						isComplexEnum = true;
					} break; }
					case 7: {{
						if (nullCase == null) {
							nullCase = cases[i];
						};
					} break; }
					case 39: {{
						if (defaultCase == null) {
							defaultCase = cases[i];
						};
					} break; }
					case 1: {
					{
						if (defaultCase == null) {
							defaultCase = cases[i];
						};
					} break; }
					default:
						{
						{};
					}
					}};
				}
				i++; }
				 };
				r = ('{\n' + (GenJs.tabs) + '');
				const wrapIntoReturn = (e$146) => {
					if (e$146 == null) {
						return '{}';
					};
					return GenJs.stringifyBlockExpression(e$146);
				};
				let ex = GenJs.unwrapBlockValue(exprs[0]);
				r += 'const $switch$ = ' + ex + (';\n' + (GenJs.tabs) + '');
				if (nullCase != null) {
					r += ('if($switch$ == null) {\n' + (GenJs.tabs) + '');
					r += '\t' + wrapIntoReturn(nullCase);
					r += ('\n' + (GenJs.tabs) + '} else {\n' + (GenJs.tabs) + '');
				};
				{
					r += ('switch((($switch$==undefined) || ([\"number\",\"string\"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {\n' + (GenJs.tabs) + '');
					if (isComplexEnum == false) {
						let usedTags = [];
						{ let $v = cases.length; let i = 0; while(i < $v) {{
							let c = cases[i];
							let cond = conds[i];
							{
							const $switch$ = cond;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 39: {{
								{};
							} break; }
							case 1: {
							{
								{};
							} break; }
							case 7: {{
								{};
							} break; }
							case 8: {
							const a = $switch$[2];
							const op = $switch$[3];
							const b = $switch$[4];
							{
								r += 'case ' + GenJs.stringify(a) + ': ' + 'case ' + GenJs.stringify(b) + ': ' + wrapIntoReturn(c) + ('\n' + (GenJs.tabs) + 'break;\n' + (GenJs.tabs) + '');
							} break; }
							case 12: {
							{
								{};
							} break; }
							default:
								{
								r += 'case ' + GenJs.stringify(cond) + ': ' + wrapIntoReturn(c) + ('\n' + (GenJs.tabs) + 'break;\n' + (GenJs.tabs) + '');
							}
							}};
						}
						i++; }
						 };
					} else {
						let usedTags = [];
						{ let $v = cases.length; let i = 0; while(i < $v) {{
							let c = cases[i];
							const getETN = (node$147) => {
								{
								const $switch$ = node$147;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 11: {
								const e = $switch$[2];
								{
									return getETN(e);
								} break; }
								case 25: {
								const e = $switch$[2];
								const n = $switch$[3];
								{
									{
									const $switch$ = e;
									switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
									case 1: {
									const t = $switch$[2];
									{
										return {e:e, n:n};
									} break; }
									
									}};
								} break; }
								
								}};
							};
							let cond = conds[i];
							{
							const $switch$ = cond;
							switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
							case 39: {{
								{};
							} break; }
							case 1: {
							{
								{};
							} break; }
							case 7: {{
								{};
							} break; }
							default:
								{
								const tagOf = (e$148, n) => {
									let tag = -1;
									let source = Project.mapNames.get(e$148);
									let i$149 = 0;
									{
									const $switch$ = source;
									switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
									case 33: {
									const t = $switch$[2];
									const f = $switch$[3];
									{
										for (const fi of f) {
										const $switch$ = fi;
										switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
										case 11: {
										const a = $switch$[2];
										{
											{
											const $switch$ = a;
											switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
											case 1: {
											const na = $switch$[2];
											{
												if (n == na) {
													tag = i$149;
												};
												i$149++;
											} break; }
											
											}};
										} break; }
										case 1: {
										const na = $switch$[2];
										{
											{
												if (n == na) {
													tag = i$149;
												};
												i$149++;
											};
										} break; }
										default:
											{
											throw '' + fi;
										}
										}};
									} break; }
									default:
										{
										throw ('`' + (source) + '` is not enumerable');
									}
									}};
									if (tag == -1) {
										throw ('Field `' + (n) + '` doesn\'t exists on `' + (source) + '`');
									};
									return tag;
								};
								let e$150 = getETN(cond).e;
								let n = getETN(cond).n;
								let tag = tagOf(e$150, n);
								if (usedTags.indexOf(tag) != -1) {
									throw ('This enum case already matched ' + cond + ' ' + Project.data.get(cond));
								};
								usedTags.push(tag);
								r += 'case ' + tag + ': {';
								{
								const $switch$ = cond;
								switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
								case 11: {
								const a = $switch$[3];
								{
									r += ('\n' + (GenJs.tabs) + '');
									let i$151 = 2;
									for (const a$152 of a) {
										{
										const $switch$ = a$152;
										switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
										case 1: {
										const s = $switch$[2];
										{
											r += ('const ' + (GenJs.rename(s)) + ' = $switch$[' + (i$151) + '];\n' + (GenJs.tabs) + '');
										} break; }
										case 39: {{
											{};
										} break; }
										default:
											{
											{
												throw 'Cannot bind ' + a$152 + JSON.stringify(Project.data.get(cond));
											};
										}
										}};
										i$151++;
									};
								} break; }
								default:
									{
									{};
								}
								}};
								r += wrapIntoReturn(c) + (' break; }\n' + (GenJs.tabs) + '');
							}
							}};
						}
						i++; }
						 };
					};
				};
				if (defaultCase != null) {
					r += ('default:\n' + (GenJs.tabs) + '');
					r += '\t' + wrapIntoReturn(defaultCase);
				};
				{
					r += ('\n' + (GenJs.tabs) + '}');
				};
				if (nullCase != null) {
					r += ('\n' + (GenJs.tabs) + '} ');
				};
				return r + '}';
			} break; }
			case 23: {
			const t = $switch$[2];
			const ext = $switch$[3];
			const impl = $switch$[4];
			const fields = $switch$[5];
			const external = $switch$[6];
			{
				if (external == false) {
					return GenJs.stringifyClass(node$122, null);
				};
				let cname = GenJs.extractTypeName(t);
				let arename = GenJs.getAtt(Project.mapAttributes.get(node$122), 'native');
				if (arename != null) {
					cname = arename.asStringAttValue(0);
				};
				let require = GenJs.getAtt(Project.mapAttributes.get(node$122), 'require');
				if (require != null) {
					{
					const $switch$ = require.values[0];
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 0: {
					const s = $switch$[2];
					{
						r += ('const ' + (cname) + ' = require(\"') + s + '");\n';
						r += GenJs.tabs;
					} break; }
					default:
						{
						throw '@require takes string as argument';
					}
					}};
				};
				return r += ('/* !%# declare class ' + (cname) + ' */');
			} break; }
			case 31: {
			const path = $switch$[2];
			const el = $switch$[3];
			{
				throw 'unreachable';
				r = 'module ' + path.join('.') + ' {\n';
				GenJs.pushTab();
				for (const e$153 of el) {
					GenJs.parentNames.set(e$153, DataHelper.nameOf(e$153));
					{
					const $switch$ = e$153;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 35: {
					const name = $switch$[2];
					const t = $switch$[3];
					{
						{
						const $switch$ = t;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 8: {
						{
							{};
						} break; }
						default:
							{
							GenJs.parentNames.set(t, DataHelper.nameOf(t));
						}
						}};
					} break; }
					default:
						{
						{};
					}
					}};
					r += GenJs.tabs + GenJs.stringify(e$153) + ';\n';
				};
				GenJs.popTab();
				return r + GenJs.tabs + '}';
			} break; }
			case 32: {
			const names = $switch$[2];
			const el = $switch$[3];
			{
				return '{' + ((()=>{const return$$ = []; const $switch$ = el.length;let i = -1; while((i+1) < $switch$) { i++; return$$.push((GenJs.rename(names[i]) + ':' + GenJs.unwrapBlockValue(el[i]))); } return return$$;})()).join(', ') + '}';
			} break; }
			case 40: {
			const field = $switch$[2];
			{
				return 'static ' + GenJs.stringify(field);
			} break; }
			case 33: {
			const t = $switch$[2];
			const fields = $switch$[3];
			{
				r = '';
				r += '{\n';
				GenJs.pushTab();
				let index$154 = 0;
				for (const f of fields) {
					{
					const $switch$ = f;
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 8: {
					const iii = $switch$[2];
					const op = $switch$[3];
					const val = $switch$[4];
					{
						if (op != Token.OpAssign) {
							throw 'Not Token.OpAssign ' + f;
						};
						{
						const $switch$ = iii;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 1: {
						const name = $switch$[2];
						{
							r += GenJs.tabs + GenJs.rename(name) + ':' + GenJs.stringify(val) + ',\n';
						} break; }
						default:
							{
							throw '!!iii ' + iii;
						}
						}};
					} break; }
					case 1: {
					const name = $switch$[2];
					{
						index$154++;
						r += GenJs.tabs + GenJs.rename(name) + (':[\"' + (GenJs.rename(name)) + '\",' + (index$154 - 1) + '],\n');
					} break; }
					case 11: {
					const iii = $switch$[2];
					const args = $switch$[3];
					const argNames = $switch$[4];
					{
						{
						const $switch$ = iii;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 1: {
						const name = $switch$[2];
						{
							let a$155 = ((()=>{const return$$ = []; const $switch$ = argNames;for (const arg of $switch$) { return$$.push(GenJs.rename(arg)); } return return$$;})()).join(',');
							let s$156 = GenJs.tabs + GenJs.rename(name);
							s$156 += ':(' + a$155 + ')=>{ const $r = ["' + GenJs.rename(name) + ('\",' + (index$154) + ',');
							s$156 += a$155;
							s$156 += ']; return $r },\n';
							index$154++;
							r += s$156;
							Project.mapNames.set(f, node$122);
						} break; }
						default:
							{
							throw '!!iii ' + iii;
						}
						}};
					} break; }
					case 20: {
					const name = $switch$[2];
					const expr = $switch$[3];
					const vars = $switch$[4];
					const rettype = $switch$[5];
					{
						{
							r += GenJs.tabs + GenJs.rename(name) + ':';
							r += '()=>{}';
							r += ',\n';
						};
					} break; }
					case 40: {
					const fun = $switch$[2];
					{
						{
						const $switch$ = fun;
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 20: {
						const name = $switch$[2];
						const expr = $switch$[3];
						const vars = $switch$[4];
						const rettype = $switch$[5];
						{
							r += GenJs.tabs + GenJs.rename(name) + ':';
							{
								GenJs.pushScope();
								let code = '';
								const unvar = (v$157) => {
									{
									const $switch$ = v$157;
									switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
									case 21: {
									const oname = $switch$[2];
									{
										let name$158 = GenJs.rename(oname);
										if (GenJs.hasInScope(name$158)) {
											name$158 += '$' + (++GenJs.id);
										};
										GenJs.addToScope(name$158);
										GenJs.parentNames.set(v$157, name$158);
										return GenJs.parentNames.get(v$157);
									} break; }
									default:
										{
										throw v$157;
									}
									}}
										};
								code += '(' + ((()=>{const return$$ = []; const $switch$ = vars;for (const v$159 of $switch$) { return$$.push(unvar(v$159)); } return return$$;})()).join(', ') + ') ' + '=> ';
								if (expr != null) {
									{
									const $switch$ = expr;
									switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
									case 10: {
									const el = $switch$[2];
									{
										GenJs.pushTab();
										code += GenJs.stringifyBlockExpression(expr);
										GenJs.popTab();
									} break; }
									default:
										{
										GenJs.pushTab();
										code += ('{\n' + (GenJs.tabs) + '') + GenJs.stringifyBlockExpression(expr);
										GenJs.popTab();
										code += ('\n' + (GenJs.tabs) + '}\n');
									}
									}};
								} else code += '{}';
								r += code;
								GenJs.popScope();
							};
							r += ',\n';
						} break; }
						
						}};
					} break; }
					default:
						{
						throw '!' + f;
					}
					}};
				};
				GenJs.popTab();
				return r + GenJs.tabs + '}';
			} break; }
			case 39: {{
				return '_';
			} break; }
			case 35: {
			const name = $switch$[2];
			const vnode = $switch$[3];
			{
				r += ('/*declare ' + (name) + '*/');
				GenJs.parentNames.set(node$122, name);
				Project.mapAttributes.set(vnode, Project.mapAttributes.get(node$122));
				{
				const $switch$ = vnode;
				switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
				case 8: {
				{
					{};
				} break; }
				case 23: {
				const t = $switch$[2];
				const ext = $switch$[3];
				const impl = $switch$[4];
				const fields = $switch$[5];
				const external = $switch$[6];
				{
					let cname = GenJs.extractTypeName(t);
					let arename = GenJs.getAtt(Project.mapAttributes.get(node$122), 'native');
					if (arename != null) {
						cname = DataHelper.asStringAttValue(arename, 0);
					};
					let require = GenJs.getAtt(Project.mapAttributes.get(node$122), 'require');
					if (require != null) {
						{
						const $switch$ = require.values[0];
						switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
						case 0: {
						const s = $switch$[2];
						{
							r += ('const ' + (cname) + ' = require(\"' + (s) + '\");\n' + (GenJs.tabs) + '');
						} break; }
						default:
							{
							throw '@require takes string as argument';
						}
						}};
					};
				} break; }
				default:
					{
					GenJs.parentNames.set(vnode, DataHelper.nameOf(vnode));
				}
				}};
				return r;
			} break; }
			
			}};
			throw 'unreachable ' + node$122 + ' ' + JSON.stringify(Project.data.get(node$122));
		};
	GenJs.unwrapBlock = (e$160) => {
			{
			const $switch$ = e$160;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 10: {
			const el = $switch$[2];
			{
				if (el.length == 1) {
					return el[0];
				};
				throw 'Unwrapped block has multiple expressions';
			} break; }
			default:
				{
				return e$160;
			}
			}};
		};
	GenJs.unwrapParenthesis = (e$161) => {
			{
			const $switch$ = e$161;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 13: {
			const e = $switch$[2];
			{
				return GenJs.unwrapParenthesis(e);
			} break; }
			default:
				{
				return e$161;
			}
			}};
		};
	GenJs.unwrapBlockValue = (e$162) => {
			{
			const $switch$ = e$162;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 10: {
			const el = $switch$[2];
			{
				if (el.length == 1) {
					return GenJs.unwrapBlockValue(el[0]);
				};
				{
					let r = '(() => {\n';
					GenJs.pushScope();
					GenJs.pushTab();
					let i = 0;
					while(i < el.length - 1) {
						r += GenJs.tabs + GenJs.stringifyBlockExpression(el[i]) + ';\n';
						i++;
					};
					{
					const $switch$ = el[el.length - 1];
					switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
					case 15: {
					{
						r += GenJs.tabs + '' + GenJs.stringifyBlockExpression(el[el.length - 1]) + ';\n';
					} break; }
					case 21: {
					{
						r += GenJs.tabs + '' + GenJs.stringifyBlockExpression(el[el.length - 1]) + ';\n';
					} break; }
					case 17: {{
						r += GenJs.tabs + '' + GenJs.stringifyBlockExpression(el[el.length - 1]) + ';\n';
					} break; }
					case 14: {
					{
						r += GenJs.tabs + '' + GenJs.stringifyBlockExpression(el[el.length - 1]) + ';\n';
					} break; }
					case 43: {
					{
						r += GenJs.tabs + '' + GenJs.stringifyBlockExpression(el[el.length - 1]) + ';\n';
					} break; }
					case 16: {{
						r += GenJs.tabs + '' + GenJs.stringifyBlockExpression(el[el.length - 1]) + ';\n';
					} break; }
					default:
						{
						r += GenJs.tabs + 'return ' + GenJs.unwrapBlockValue(el[el.length - 1]) + ';\n';
					}
					}};
					GenJs.popTab();
					GenJs.popScope();
					return r + GenJs.tabs + '})()';
				};
			} break; }
			case 15: {
			const e = $switch$[2];
			{
				'(() => { throw ' + GenJs.unwrapBlockValue(e) + ' })()';
			} break; }
			default:
				{
				return GenJs.stringify(e$162);
			}
			}};
		};
	GenJs.extractTypeName = (t$163) => {
			{
			const $switch$ = t$163;
			if($switch$ == null) {
				{
				return null;
			}
			} else {
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case 1: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			case 2: {
			const name = $switch$[2];
			{
				return name;
			} break; }
			default:
				{
				throw 'Type has no name: ' + t$163;
			}
			}
			} };
		};
	GenJs.generatePackageJson = (pack) => {
			let jspackage = {name:pack.main, version:pack.main, description:pack.description, main:pack.main, author:pack.author, license:pack.license};
			return JSON.stringify(jspackage, null, '\t');
		};
	/*!2*/const Generator = {
		JavaScript:'JavaScript',
		C:'C',
		Haxe:'Haxe',
	}
	/*!2*//*declare Target*/
	/*!2*//*declare Package*/
	/*!2*/class Main {

		init() {
			let currentDirTmp = process.argv[1].split(path.sep);
			let packageFileName = currentDirTmp.splice(0, -1).join(path.sep) + path.sep + 'hexa.json';
			let currentDir = currentDirTmp[currentDirTmp.length - 2];
			let name$164 = readlinesync.question(('Enter package name (' + (currentDir) + '): '));
			if (name$164 == '') {
				name$164 = currentDir;
			};
			let version = readlinesync.question('Enter package version (1.0.0): ');
			if (version == '') {
				version = '1.0.0';
			};
			let description = readlinesync.question('Enter package description: ');
			let main = readlinesync.question('Enter main file (main.hexa): ');
			if (main == '') {
				main = 'main.hexa';
			};
			let target = {generator:Generator.JavaScript, instance:{generatePackageJson:false}};
			let generatorstr = readlinesync.question('Enter generator type (JavaScript):\n1. JavaScript\n2. C\n3. Haxe');
			if (generatorstr.toUpperCase() == 'C' || generatorstr == '2') {
				target.generator = Generator.C;
			} else if (generatorstr.toUpperCase() == 'HAXE' || generatorstr == '3') {
				target.generator = Generator.Haxe;
			};
			while(!(main.endsWith('.hexa'))) {
				process.stdout.write('Wrong file name. Must ends with \'.hexa\'.\n');
				main = readlinesync.question('Enter main file (main.hexa): ');
			};
			let author = readlinesync.question('Enter package author name: ');
			let license = readlinesync.question('Enter license: ');
			let pack$165 = {name:name$164, version:version, description:description, output:name$164, main:main, author:author, license:license, target:target, files:[]};
			let packageStr = JSON.stringify(pack$165, null, '\t');
			let answ = readlinesync.question(('About to write to: ' + (packageFileName) + ':\n' + (packageStr) + '\nIs this ok? (yes)'));
			if (answ != '') {
				process.exit(1);
			};
			fs.writeFileSync('hexa.json', packageStr);
			process.stdout.write('Hexa package initialized!\n');
		}
		processFile(target) {
			let content = fs.readFileSync(target);
			let tokens$166 = Lexer.tokenize(content, target);
			let parser = new Parser(tokens$166);
			return parser.node;
		}
		processFiles(targets) {
			let res = [];
			for (const target$167 of targets) {
				res.push(this.processFile(target$167));
			};
			if (targets.length != res.length) {
				throw 'Stopped on errors';
			};
			return res;
		}
		loadPackage(filename$168) {
			let pack$169 = JSON.parse(fs.readFileSync(path.resolve(filename$168)).toString('utf8'));
			const incorrect = (what) => {
				process.stdout.write(('Incorrect package file! Field `' + (what) + '` does not exists\n'));
				process.exit(1);
			};
			if (pack$169.target == null) {
				incorrect('target');
			};
			if (pack$169.main == null) {
				incorrect('main');
			};
			if (pack$169.name == null) {
				incorrect('name');
			};
			return pack$169;
		}
		constructor() {
	
	{
			/*declare Date*/;
			const begin = Date.now();
			TestLexer.test();
			TestParser.test();
			TestTyper.test();
			if (process.argv[2] == 'version') {
				console.log('Hexa Alpha on node.js ' + process.versions.node);
				process.exit(0);
			} else if (process.argv[2] == null) {
				console.log('Usage: `node hexa.js project.json` or `node hexa.js init`');
				process.exit(1);
			} else if (process.argv[2] == 'init') {
				this.init();
				process.exit(0);
			};
			Lexer.init();
			let currentFile = path.resolve(process.argv[2]);
			let currentParsedFile = path.parse(currentFile);
			let input$170 = null;
			let main = null;
			let packageFolder = currentParsedFile.dir;
			if (currentParsedFile.ext == '.json') {
				input$170 = this.loadPackage(currentFile);
				console.log(('[Building ' + (input$170.name) + ']'));
				main = path.resolve(currentFile + '/../') + path.sep + (input$170.main);
			} else if (fs.lstatSync(currentFile).isDirectory()) {
				input$170 = this.loadPackage(currentFile + path.sep + 'hexa.json');
				packageFolder = currentFile;
				main = packageFolder + path.sep + (input$170.main);
			} else if (currentParsedFile.ext == '.hexa') {
				eval('"use strict"\r\n' + GenJs.stringifyProject(this.processFile(currentFile)));
				return ;
			};
			let codes = [];
			if (input$170.files != null) {
				let files = input$170.files.map((file) => {
					return path.resolve(packageFolder + path.sep + file);
				});
				codes = this.processFiles(files);
			};
			codes.push(this.processFile(main));
			let collected = Node.TBlock(codes);
			Typer.fillScopes(collected);
			let parsedMain = collected;
			{
			const $switch$ = input$170.target.generator;
			switch((($switch$==undefined) || (["number","string"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {
			case Generator.JavaScript: {
				let outs = GenJs.stringifyProject(collected);
				let target$171 = packageFolder + path.sep + path.parse(input$170.main).name + '.js';
				if (input$170.output != null) {
					target$171 = packageFolder + path.sep + path.parse(input$170.output).name + '.js';
				};
				const license = input$170.license != (null)? (('// LICENSE ' + (input$170.license) + '\n')) : ('');
				fs.writeFileSync(target$171, license + outs);
				if (input$170.target.instance != null && input$170.target.instance.generatePackageJson) {
					fs.writeFileSync(packageFolder + path.sep + 'package.json', GenJs.generatePackageJson(input$170));
				};
			}
			break;
			case Generator.C: {}
			break;
			case Generator.Haxe: {}
			break;
			default:
				{
				throw 'Generator is not defined or unknown. Is there `target.generator` field in `hexa.json`?';
			}
			}};
			console.log(('[Finished in ' + (Date.now() - begin) + ' ms]'));
		}
}
	}
	Main.main = () => {
		new Main()
	}

	/*!2*/Main.main()
}