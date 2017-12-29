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

@:native("Buffer")
extern class Buffer<T> implements ArrayAccess<T> {
	static function alloc<T>(size:Int): Buffer<T>;
	var length:Int;
	function readUInt16LE(offset:Int):Int;
	function writeUInt16LE(value:Int, offset:Int):Int;
	function readUInt32LE(offset:Int):Int;
	function toString(encoding:String, ?start:Int, ?end:Int):String;
	static function from<T>(string:String, ?encoding:String):Buffer<T>;
}

@:native('Map')
extern class JSMap<K, V> {
	public function new();
	public function get(k: K): V;
	public function set(k: K, v: V): Void;
	public function has(k: K): Bool;
	public function keys(): Array<K>;
}

@:native("console")
extern class Console {
	static function log(str: String): Void;
	static function error(data: Any, message: String): Void;
}

@:native("process")
extern class Process {
    public static var stdout: {
		function write(text: String): Void;
	};
    public static var argv: Array<String>;
    public static function exit(errorCode: Int): Void;
}

@:jsRequire("path")
@:native("path")
extern class Path {
    public static var sep: String;
    public static function resolve(path: String): String;
}

@:jsRequire("fs")
@:native("fs")
extern class Fs {
	public static function writeFileSync(path: String, data: String): Void;
	public static function readdirSync(path: String): Array<String>;
	public static function readFileSync<T>(path: String): Buffer<T>;
}
