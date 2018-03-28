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
import Token;
import Lexer;
import Parser;
import NodeJs;

using TestParser;
using StringTools;

class TestTyper {
	public static function test() {
		trace("TestTyper begin");

		// Function
		shouldError('let x = function(){return 1} x = 1');
		shouldNotError('var x = function(){return 1} var x = 1');
		shouldError('function x(){return 1} x = 1');
		shouldError('var z = 1 function x(){return 1} z = x');
		shouldError('function x(){return 1} x = function(){return 1}');
		shouldError('{ function x(){return 1} } x()');
		shouldError('{ function x(){return return 1} }');
		shouldNotError('var x = function (){} x = function (){}');
		shouldError('let x = function (){} x = function (){} ');
		shouldNotError('var a: Int? = null if(let a = a) {} a = 5');

		// Var
		shouldNotError('var a = 1 var b = 1');
		shouldNotError('var a = 1 var b = a');
		shouldNotError('var a = 1 let b = a');
		shouldError('var a = var b = 1');
		shouldError('var a = var b');
		shouldError('var a = { var b }');
		shouldError('let a = var b');
		shouldError('let a = 1 a = 2');
		shouldNotError('var a = 1 a = 2');
		shouldNotError('let a = { 2 }');
		shouldNotError('let a = { 1 2 3 2 }');
		shouldError('let a = return 2');
		shouldError('let a = { return 2 }');
		shouldError('var a = 1, b = return 2');

		// Arrays
		shouldNotError('let a = [2, 4, 1, 2, 5]');
		shouldError('let a = [2, 4, 1, 2, ""]');
		shouldError('let a = [2, 4, 1, 2, 5.1]');
		shouldNotError('var a = [2, 4, 1, 2, 5] a = [2, 3, 4]');
		shouldError('let a = [2, 4, 1, 2, 5] a = [2, 3, 4]');
		shouldNotError('var a = 4, b = 2, c = 4 let arr = [a, b, c]');
		shouldError('var a = 4, b = 2, c = 4 let arr = [a, b, c, ""]');
		shouldNotError('var a = for(b in [1, 2, 3, 4]) b');
		shouldError('var a = for(b in [1, 2, 3, 4]) a');

		// Maps
		shouldNotError('var a = [ 1: "a", 2: "b", 3: "c" ]');
		shouldError('var a = [ 1: "a", 2: "b", 3: 2 ]');
		shouldError('var a = [ 1: "a", 2: "b", "3": 2 ]');
		shouldNotError('var a = [ "a": 1, "b": 2, "c": 3 ]');
		shouldError('var a = [ "a": 1, "b": 2, 3: 25 ]');
		shouldError('var a = [ "a": 1, "b": 2, "3": "25" ]');
		shouldNotError('var a = [ "a": 1, "b": 2, "c": 3 ] a = ["l": 11]');

		// Throw-Try-Catch
		shouldError('var a = try { throw 1 } catch(e:Any) { throw 2 }');
		shouldError('var a = { try { throw 1 } catch(e:Any) { throw 2 } }');
		shouldNotError('var a = try { 1 } catch(e:Any) { 2 }');
		shouldNotError('var a = try { 1 } catch(e:Any) { throw 2 }');
		shouldNotError('var a = try { throw 1 } catch(e:Any) { 2 }');
		shouldNotError('var a =  { try { throw 1 } catch(e:Any) { 2 } }');
		shouldError('var a = throw 1');
		shouldError('var a = { throw 1 }');

		// Global modules
		shouldNotError('class A {}');
		shouldError('module { let x = 1 } x = 1'); // Constant
		shouldNotError('module { var x = 1 } var x = 1'); // Overlapping of global var x
		shouldNotError('module { var x = 1 } x = 1'); // Global var x
		shouldError('module { class A {} class A {} }'); // Can not redefine in same namespace
		shouldError('module { class A {} } module { class A {} }'); // Can not redefine in same namespace
	    shouldError('module { class A extends B {} class B extends A {} }'); // Cyclic inheritance
		shouldNotError('class A {new(){} let a:A = new A()}'); // `A` sees itself

		trace("TestTyper done");
	}

	public static function shouldNotError(input: String): Void {
		if(didError(input))
			throw 'TestTyper test fail: `$input` should NOT throw error, but it did.';
		trace('TestTyper test passed: `$input`');
	}

	public static function shouldError(input: String): Void {
		if(!didError(input))
			throw 'TestTyper test fail: `$input` should throw error, but it is not.';
		trace('TestTyper test passed: `$input`');
	}

	public static function didError(input: String): Bool {
		var lexe = Lexer.tokenize(Buffer.from(input), "TEST");
		var parsed = new Parser(lexe).node;
		try {
		} catch(e: Any) {
			return true;
		}
		return false;
	}
}
