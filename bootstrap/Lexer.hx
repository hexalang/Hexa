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

import NodeJs;
import Token;

class Tokens {
	public var length(default, null): Int;
	public var token(default, null): Buffer<Token>;
	public var value(default, null): Array<String>;

	public function new(tokens, length, values) {
		this.token = tokens;
		this.length = length;
		this.value = values;
	}
}

class Lexer {
	public static function tokenize(bytes : Buffer<Int>): Tokens {
		// Variables
		var position = 0;
		var len = bytes.length;
		var to = 0;
		var s = "";
		var p = 0;

		// Prefetch
		var params = new Array<String>(/*bytes.length*/);
		var tokens = Buffer.alloc(bytes.length);

		// Helpers
		// Just add plain token
		inline function add(t: Token) {
			tokens[to++] = t;
		}
		// Add parametrized token
		inline function addn(t: Token, p: String) {
			params[to] = p;
			tokens[to++] = t;
		}
		// Getting bytes
		inline function get_8(pos) return bytes[pos];
		// Not out of length
		inline function not_eof(): Bool return (position < len);
		// Lines
		inline function new_line() { }

		// UTF-8 with BOM
		if (len > 2 && get_8(0) == 239 && get_8(1) == 187 && get_8(2) == 191) position += 3;
		// Lexer main loop
		while (position < len) {
			// Variable
			var _8 = 0; // Current byte value

			// Whitespace
			do {
				// \r\n case works fine, but we dont support \r-only case!
				_8 = get_8(position);
				if (_8 == "\n".code) {
				}
			} while (_8 <= 32 && (++position < len));
			if (!not_eof()) break ;

			// Current two-byte value
			var _16 = (len - position) > 1 ? _8 | (get_8(position + 1) << 8) : _8;

			// Comments
			if (_8 == "/".code) {
				// // Comment
				if (_16 == 0x2f2f) {
					while (get_8(position) != "\n".code && not_eof()) position++;
					new_line();
					continue ;
				}
				// /** Doc **/
				if (_16 == 10799 && get_8(position + 2) == "*".code) {
					position += 3;
					p = position;
					while (not_eof()) {
						var _32 = (len - position) > 3 ? bytes.readUInt32LE(position) : get_8(position);
						if ((_32 & 0xFF) == "\n".code) new_line();
						else if (_32 & 0xFFFFFF == 3090986) break ;
						position++;
					}
					if (!not_eof()) throw "Unclosed doc-comment";
					addn(LDoc, bytes.toString(p, position));
					position += 3;
					continue ;
				}
				// /* Comment */
				if (_16 == 10799) {
					p = 0; // Nesting level
					position += 2;
					while (not_eof()) {
						_16 = (len - position) > 1 ? bytes.readUInt16LE(position) : get_8(position);
						if ((_16 & 0xFF) == "\n".code) new_line();
						else if (_16 == 12074 && p > 0) p--;
						else if (_16 == 10799) p++;
						else if (_16 == 12074 && p == 0) break ;
						position++;
					}
					position += 2;
					continue ;
				}
			}

			// Identifiers and keywords
			// A-z _
			if (((_8 & 95) >= 65 && (_8 & 95) <= 90) || (_8 == 95)) {
				p = position + 1;
				_8 = get_8(p);
				while (p < len && isident[_8] != 0) _8 = get_8(++p);
				s = bytes.toString(position, p); // TODO encoding ascii?
				var t = ((_16 & 0xFF) <= 90) ? null : kwd[s];
				if (t == null) addn(LIdent, s);
				else add(t);
				position = p;
				continue ;
			}

			// ...
			if (_16 == 11822 && (get_8(position + 2) == ".".code)) {
				add(Interval);
				position += 3;
				continue ;
			}

			// >>>
			if (_16 == 15934 && (get_8(position + 2) == ">".code)) {
				add(OpUShr);
				position += 3;
				continue ;
			}

			// 16 bit ops
			// Verify & extract
			var hash = simplehash(_16);
			if (_16 == op16token.readUInt16LE(hash * 2)) {
				add(op16token[hash + 512]);
				position += 2;
				continue ;
			}

			// 8 bit ops
			var found = ops8a[_8];
			if (found != Eof) {
				add(found);
				position++;
				continue ;
			}

			// Strings
			// "" and ''
			if (_8 < 40) {
				p = _8; // Remember, if double/singlequoted
				position++;
				var pos = position;

				while (get_8(position) != p && not_eof()) {
					_16 = (len - position) > 1 ? bytes.readUInt16LE(position) : get_8(position);
					position++;
				}
				addn(LString, bytes.toString(pos, position));
				position++;
				continue ;
			}

			// Int Hex 0x123ABC
			if (_16 == 30768) {
				p = position;
				p += 2;
				_8 = get_8(position);
				while (
					(_8 >= 65 && _8 <= 70) // A...F
					||
					(_8 >= 48 && _8 <= 57) // 0...9
					||
					(_8 >= 97 && _8 <= 102) // a...f
				) {
					_8 = get_8(++p);
				}
				if (p - position == 2) throw "Integer `0x` not allowed!";
				addn(LInt, bytes.toString(position, p));
				position = p;
				continue ;
			}

			// Float & Int
			if (_8 < 58) {
				p = position;
				_8 = get_8(p);
				var found : Token = LInt;
				while (
					_8 >= 48 && _8 <= 57 // 0...9
				) {
					_8 = get_8(++p);
				}

				// Float
				// point
				if (_8 == ".".code && get_8(p + 1) != ".".code) {
					_8 = get_8(++p);
					while (
						_8 >= 48 && _8 <= 57 // 0...9
					) {
						_8 = get_8(++p);
					}
					found = LFloat;
				}

				// exponent
				if (_8 == "e".code || _8 == "E".code) {
					_8 = get_8(++p);
					if (_8 == "+".code || _8 == "-".code) _8 = get_8(++p);
					while (
						_8 >= 48 && _8 <= 57 // 0...9
					) {
						_8 = get_8(++p);
					}
					found = LFloat;
				}
				addn(found, bytes.toString(position, p));
				position = p;
				continue ;
			}

			// Error
			if (position >= len) break;
			trace('to=$to p=$p position=$position _8=$_8 len=$len');
			throw  _8;
			break ;
		}

		add(Eof);
		return new Tokens(tokens, to, params);
	}

	public static function init() {
		// Aplhanumeric _
		isident = Buffer.alloc(256);
		for (_8 in 0...256)
			isident[_8] =
				((_8 >= 65 && _8 <= 90) // A...Z
				 ||
				 (_8 >= 48 && _8 <= 57) // 0...9
				 ||
				 (_8 >= 97 && _8 <= 122) // a...z
				 || _8 == 95) ? 128 : 0
				; // _

		// Keywords
		kwd =
			[
				"_" => Underscore,
				"as" => KAs,
				"break" => KBreak,
				"case" => KCase,
				"catch" => KCatch,
				"class" => KClass,
				"continue" => KContinue,
				"do" => KDo,
				"else" => KElse,
				"enum" => KEnum,
				"extends" => KExtends,
				"declare" => KExtern,
				"false" => KFalse,
				"for" => KFor,
				"function" => KFunction,
				"if" => KIf,
				"implements" => KImplements,
				"import" => KImport,
				"in" => KIn,
				"inline" => KInline,
				"interface" => KInterface,
				"let" => KLet,
				"new" => KNew,
				"null" => KNull,
				"module" => KPackage,
				"private" => KPrivate,
				"public" => KPublic,
				"return" => KReturn,
				"static" => KStatic,
				"super" => KSuper,
				"switch" => KSwitch,
				"this" => KThis,
				"throw" => KThrow,
				"true" => KTrue,
				"try" => KTry,
				"type" => KType,
				"using" => KUsing,
				"var" => KVar,
				"while" => KWhile,
			];

		// 1-byte op
		var ops8 : Map<Int, Token> =
			[
				"@".code => At,
				"!".code => OpNot,
				"%".code => OpMod,
				"&".code => OpAnd,
				"(".code => POpen,
				")".code => PClose,
				"*".code => OpMult,
				"+".code => OpAdd,
				",".code => Comma,
				"-".code => OpSub,
				".".code => Dot,
				"/".code => OpDiv,
				":".code => DblDot,
				";".code => Semicolon,
				"<".code => OpLt,
				"=".code => OpAssign,
				">".code => OpGt,
				"?".code => Question,
				"[".code => BkOpen,
				"\\".code => OpIntDiv,
				"]".code => BkClose,
				"^".code => OpXor,
				"{".code => BrOpen,
				"|".code => OpOr,
				"}".code => BrClose,
				"~".code => OpNegBits,
			];
		ops8a = Buffer.alloc(256);
		for (key in ops8.keys()) ops8a[key] = ops8[key];

		// 2-byte op
		var ops16 : Map<Int, Token> =
			[
				11051 => Token.OpIncrement, // ++
				11565 => Token.OpDecrement, // --
				15420 => Token.OpShl,       // <<
				15649 => Token.OpNotEq,     // !=
				15676 => Token.OpLte,       // <=
				15677 => Token.OpEq,        // ==
				15678 => Token.OpGte,       // >=
				15934 => Token.OpShr,       // >>
				31868 => Token.OpBoolOr,    // ||
				9766  => Token.OpBoolAnd,   // &&
				15933 => Token.OpArrow,     // =>
			];
		for (key1 in ops16.keys()) {
			for (key2 in ops16.keys()) {
				if (key1 != key2 && simplehash(key1) == simplehash(key2)) {
					throw("2-byte op hash collision: " + key1 + " " + key2);
				}
			}
		}

		op16token = Buffer.alloc(768);
		for (key in ops16.keys()) {
			var hash = simplehash(key);
			// Verify
			op16token.writeUInt16LE(key, hash * 2);
			// Tokens
			op16token[hash + 512] = ops16[key];
		}
		return ;
	}


	// Free of collisions for current set
	static inline function simplehash(val: Int): Int {
		return ((val & 0xff) + (((val >> (8 * 1)) & 0xff) << 3)) & 0xEF;
	}

	// Pre-calculated array of is byte in A-z 0-9 _
	static var isident: Buffer<Int>;

	// Single-byte operators and symbols
	static var ops8a: Buffer<Token>;

	// Double-byte operators and symbols
	static var op16token: Buffer<Token>;

	// Keywords
	static var kwd : Map<String, Token>;
}
