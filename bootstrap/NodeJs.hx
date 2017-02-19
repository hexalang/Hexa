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

@:native("Buffer")
extern class Buffer<T> implements ArrayAccess<T> {
	static function alloc<T>(size:Int): Buffer<T>; // TODO allocUnsafe
	var length:Int;
	function readUInt16LE(offset:Int):Int;
	function writeUInt16LE(value:Int, offset:Int):Int;
	function readUInt32LE(offset:Int):Int;
	function toString(?encoding:String, start:Int, end:Int):String;
	static function from<T>(string:String, ?encoding:String):Buffer<T>;
}

@:jsRequire("fs")
@:native("fs")
extern class Fs {
	public static function readdirSync(path: String): Array<String>;
	public static function readFileSync<T>(path: String): Buffer<T>;
}
