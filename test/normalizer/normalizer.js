// Generated by Hexa https://hexalang.github.io
// normalizer
// LICENSE LGPL-3.0-only
;(() => {
	"use strict"
	const $global = typeof(window) === "undefined"? global : window
	if (typeof($global.require) === "undefined") { $global.require = () => {} };
	const selfVersion="1.0.0";
	var NiceExpression = {
	}
	Object.defineProperty(NiceExpression, "Other", { get: () => { return [0] }})
	var console_46 = $global.console
	var EasE = class {
		constructor(value_130) {};
	}
	var AutoKeep = class {
		constructor() {};
	}
	var $Renamed = class {
		constructor() { 
			this.$renames = '123'
		{
		} };
		$ren() { return '123' };
	}
	$Renamed.$rename = '123'
	$Renamed.$renamed = () => { return '123' };
	function hasOwnProperty(object, name) { return object.hasOwnProperty(name) };
	function btoa(text_113) { return Buffer.from(text_113, 'binary').toString('base64') };
	function atob(base64) { return Buffer.from(base64, 'base64').toString('binary') };
	function $renamed() { return '123' };
	var value = 'hello'
	var another = 'hello'
	var boolean = true
	var $rename = 123
	{
		{
			console.log('Thank you for choosing Hexa');
			console.log('abcdce');
			console.log('abcdcefff');
			console.log('abc123');
			console.log('3');
			console.log('2');
			console.log('0.7');
			console.log('hello');
			console.log('xhelloy');
			console.log('xhelloy');
			{
				const nested = 'hi';
				console.log('xhiy');
			};
			{
				const bool = true;
				const bool_114 = true;
				const bool_115 = false;
				const bool_116 = false;
				const bool_117 = true;
				const bool_118 = true;
				console.log('xtruey');
				console.log('x' + true + 'y');
				const bool_119 = true == true;
				console.log('x' + bool_119);
				const bool_120 = false;
				const bool_121 = false;
				console.log('false == false');
				const bool_122 = true;
				const bool_123 = true;
				console.log('true == true');
				const bool_124 = false;
				const bool_125 = false;
				console.log('false == false');
				const bool_126 = true;
				const bool_127 = true;
				console.log('true == true');
				console.log('true == true');
				console.log('true == true');
				const t = true;
				const f = false;
				console.log('keep');
				console.log('keep');
				console.log('keep');
			};
			{
				try {} catch (temp) {
					if (true) { 
					const e = temp
					{
					} } else
					
					throw temp;
				};
				try {
					console.log('keep');
					throw 123;
				} catch (temp_128) {
					if (true) { 
					const e = temp_128
					{
					} } else
					
					throw temp_128;
				};
				for (const i of [1, 2, 3]) {
					{
						console.log('keep');
						break;
					};
					console.log('keep');
					continue;
				};
				const test = () => {
					console.log('keep');
					return 123;
				};
			};
			{
				let i = 0;
				i++;
				i++;
				i--;
				i--;
				const bool_129 = () => { return false };
			};
			{
				const temp_131 = new EasE();
				const temp_132 = new EasE(123);
			};
			{
				{
					const temp_133 = 123;
					switch (temp_133) {
					default: 
					console.log('hi')
					};
				};
				{
					const temp_134 = 123;
					switch (temp_134) {
					case 123: {
						console.log('123')
					} break;
					
					default: 
					console.log('case _: is ok at any position')
					};
				};
				{
					const temp_135 = 123;
					switch (temp_135) {
					case 123: {
						console.log('123')
					} break;
					
					default: 
					console.log('case _: is ok at any position')
					};
				};
			};
			{
				const temp_136 = new AutoKeep();
			};
			{
				const r = new $Renamed();
				console.log(r.$renames);
				console.log(r.$ren());
				console.log($Renamed.$rename);
				console.log($Renamed.$renamed());
				console.log($rename);
				console.log($renamed());
				const $local = () => { return '123' };
				console.log($local());
			};
			{
				const x = 3;
				const x_137 = 50 == 50;
			};
			{
				const expression = /*Other*/[0];
				{
					const temp_138 = expression;
					switch (temp_138&&temp_138[0]) {
					case 0: {
						console.log('Other')
					} break;
					};
				};
				{
					const temp_139 = (expression);
					switch (temp_139&&temp_139[0]) {
					case 0: {
						console.log('Other')
					} break;
					};
				};
			};
		}
	}
})();
