// The Hexa Compiler
// Copyright (C) 2018  Oleg Petrenko
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
import Lexer;
import Parser;
import Typer;
import Data;

using StringTools;
using Lambda;

// Allows Hexa to be used from web browser
class OnlineCompiler {
    static function main() new OnlineCompiler();
    var input: js.html.Element;
    var colored: js.html.Element;
    var output: js.html.Element;
    var debug: js.html.Element;
    var last = '';

    function new() {
        trace("Hexa Online Compiler");
        input = js.Browser.document.getElementById("editor");
        colored = js.Browser.document.getElementById("editorColored");
        output = js.Browser.document.getElementById("output");
        debug = js.Browser.document.getElementById("debug");
        Lexer.init();
        input.onkeyup = build;
        build();
    }

    function build() {
        trace("Hexa Compiler Performs Build");
        var code = input.innerText;
        if (code == last) return;
        last = code;
        var content = Buffer.from(code);
        var result = '';
        output.innerHTML = '1';
        debug.innerHTML = '2';
        try {
            var tokens = Lexer.tokenize(content, 'main.hexa');
            var parser = new Parser(tokens);
            var collected: Node = TBlock([parser.node]);
            Typer.fillScopes(collected);
            result = GenJs.stringify(collected);
        } catch(e: CompilerError) {
            trace('CompilerError begin');
            trace(e);
            trace('CompilerError done');
            output.innerHTML = 'Error: ' + e.toString();
            debug.innerHTML = 'Fix errors to run the code!';
            return;
        } catch(e: Dynamic) {
            output.innerHTML = '' + e.toString();
            debug.innerHTML = 'Fix errors to run the code!';
            return;
        }
        var html = result;
        html = html.split('<').join('&lt;');
        html = html.split('>').join('&gt;');
        html = html.split(' ').join('&nbsp;');
        html = html.split('\t').join('&nbsp;&nbsp;&nbsp;&nbsp;');
        html = html.split('\r\n').join('<br/>');
        html = html.split('\n').join('<br/>');
        output.innerHTML = html;

        {
            function color(input:String, begin:String, end:String/*, tagBegin:String, tagEnd:String*/):String {
                var parts = input.split(begin);
                var out = '' + parts.shift();
                for (p in parts) out += '<i>' + begin + p.split(end)[0] + end + '</i>' + p.split(end)[1];
                return out;
            }

            output.innerHTML = color(output.innerHTML, '/*', '*/');

        }

        output.innerHTML = "<i>// JavaScript from Hexa</i><br/>" + output.innerHTML;
        debug.innerHTML = '';
        try {
            js.Lib.eval(result.split("console").join("$console"));
        } catch(e: Dynamic) {
            debug.innerHTML = '' + e;
        }
    }
}
