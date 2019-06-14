// LICENSE LGPL-2.1-or-later
{
    "use strict"
    const $global$ = typeof(window) === "undefined"?global:window
    var NativeOperatorKind = {}
    var Token = {}
    Token.stringify = (token, param) => { {
            {
                const temp_1035 = token;
                switch (temp_1035) {
                case 70: {
                    {
                        {
                            return '@';
                        };
                    }
                } break;

                case 83: {
                    {
                        {
                            return '$';
                        };
                    }
                } break;

                case 78: {
                    {
                        {
                            return '#';
                        };
                    }
                } break;

                case 71: {
                    {
                        {
                            return ']';
                        };
                    }
                } break;

                case 72: {
                    {
                        {
                            return '[';
                        };
                    }
                } break;

                case 73: {
                    {
                        {
                            return '}';
                        };
                    }
                } break;

                case 74: {
                    {
                        {
                            return '{';
                        };
                    }
                } break;

                case 75: {
                    {
                        {
                            return ',';
                        };
                    }
                } break;

                case 76: {
                    {
                        {
                            return ':';
                        };
                    }
                } break;

                case 123: {
                    {
                        {
                            return '<!--default-->';
                        };
                    }
                } break;

                case 77: {
                    {
                        {
                            return '.';
                        };
                    }
                } break;

                case 0: {
                    {
                        {
                            return '<!--eof-->';
                        };
                    }
                } break;

                case 98: {
                    {
                        {
                            return '...';
                        };
                    }
                } break;

                case 58: {
                    {
                        {
                            return 'as';
                        };
                    }
                } break;

                case 3: {
                    {
                        {
                            return 'break';
                        };
                    }
                } break;

                case 4: {
                    {
                        {
                            return 'case';
                        };
                    }
                } break;

                case 6: {
                    {
                        {
                            return 'catch';
                        };
                    }
                } break;

                case 7: {
                    {
                        {
                            return 'class';
                        };
                    }
                } break;

                case 8: {
                    {
                        {
                            return 'continue';
                        };
                    }
                } break;

                case 9: {
                    {
                        {
                            return 'do';
                        };
                    }
                } break;

                case 10: {
                    {
                        {
                            return 'else';
                        };
                    }
                } break;

                case 11: {
                    {
                        {
                            return 'enum';
                        };
                    }
                } break;

                case 12: {
                    {
                        {
                            return 'extends';
                        };
                    }
                } break;

                case 13: {
                    {
                        {
                            return 'declare';
                        };
                    }
                } break;

                case 14: {
                    {
                        {
                            return 'false';
                        };
                    }
                } break;

                case 15: {
                    {
                        {
                            return 'for';
                        };
                    }
                } break;

                case 16: {
                    {
                        {
                            return 'function';
                        };
                    }
                } break;

                case 17: {
                    {
                        {
                            return 'if';
                        };
                    }
                } break;

                case 18: {
                    {
                        {
                            return 'implements';
                        };
                    }
                } break;

                case 20: {
                    {
                        {
                            return 'in';
                        };
                    }
                } break;

                case 22: {
                    {
                        {
                            return 'interface';
                        };
                    }
                } break;

                case 23: {
                    {
                        {
                            return 'let';
                        };
                    }
                } break;

                case 25: {
                    {
                        {
                            return 'new';
                        };
                    }
                } break;

                case 26: {
                    {
                        {
                            return 'null';
                        };
                    }
                } break;

                case 28: {
                    {
                        {
                            return 'module';
                        };
                    }
                } break;

                case 29: {
                    {
                        {
                            return 'private';
                        };
                    }
                } break;

                case 31: {
                    {
                        {
                            return 'return';
                        };
                    }
                } break;

                case 32: {
                    {
                        {
                            return 'static';
                        };
                    }
                } break;

                case 59: {
                    {
                        {
                            return 'super';
                        };
                    }
                } break;

                case 33: {
                    {
                        {
                            return 'switch';
                        };
                    }
                } break;

                case 34: {
                    {
                        {
                            return 'this';
                        };
                    }
                } break;

                case 35: {
                    {
                        {
                            return 'throw';
                        };
                    }
                } break;

                case 36: {
                    {
                        {
                            return 'true';
                        };
                    }
                } break;

                case 37: {
                    {
                        {
                            return 'try';
                        };
                    }
                } break;

                case 39: {
                    {
                        {
                            return 'using';
                        };
                    }
                } break;

                case 40: {
                    {
                        {
                            return 'var';
                        };
                    }
                } break;

                case 41: {
                    {
                        {
                            return 'while';
                        };
                    }
                } break;

                case 111: {
                    {
                        {
                            return '+';
                        };
                    }
                } break;

                case 112: {
                    {
                        {
                            return '&';
                        };
                    }
                } break;

                case 90: {
                    {
                        {
                            return '=>';
                        };
                    }
                } break;

                case 91: {
                    {
                        {
                            return '=';
                        };
                    }
                } break;

                case 92: {
                    {
                        {
                            return '&&';
                        };
                    }
                } break;

                case 93: {
                    {
                        {
                            return '||';
                        };
                    }
                } break;

                case 86: {
                    {
                        {
                            return '--';
                        };
                    }
                } break;

                case 94: {
                    {
                        {
                            return '/';
                        };
                    }
                } break;

                case 95: {
                    {
                        {
                            return '==';
                        };
                    }
                } break;

                case 96: {
                    {
                        {
                            return '>';
                        };
                    }
                } break;

                case 97: {
                    {
                        {
                            return '>=';
                        };
                    }
                } break;

                case 87: {
                    {
                        {
                            return '++';
                        };
                    }
                } break;

                case 110: {
                    {
                        {
                            return '\\';
                        };
                    }
                } break;

                case 99: {
                    {
                        {
                            return '<';
                        };
                    }
                } break;

                case 100: {
                    {
                        {
                            return '<=';
                        };
                    }
                } break;

                case 101: {
                    {
                        {
                            return '%';
                        };
                    }
                } break;

                case 102: {
                    {
                        {
                            return '*';
                        };
                    }
                } break;

                case 88: {
                    {
                        {
                            return '~';
                        };
                    }
                } break;

                case 89: {
                    {
                        {
                            return '!';
                        };
                    }
                } break;

                case 103: {
                    {
                        {
                            return '!=';
                        };
                    }
                } break;

                case 104: {
                    {
                        {
                            return '|';
                        };
                    }
                } break;

                case 105: {
                    {
                        {
                            return '<<';
                        };
                    }
                } break;

                case 106: {
                    {
                        {
                            return '>>';
                        };
                    }
                } break;

                case 107: {
                    {
                        {
                            return '-';
                        };
                    }
                } break;

                case 108: {
                    {
                        {
                            return '>>>';
                        };
                    }
                } break;

                case 109: {
                    {
                        {
                            return '^';
                        };
                    }
                } break;

                case 113: {
                    {
                        {
                            return '?.';
                        };
                    }
                } break;

                case 79: {
                    {
                        {
                            return ')';
                        };
                    }
                } break;

                case 80: {
                    {
                        {
                            return '(';
                        };
                    }
                } break;

                case 81: {
                    {
                        {
                            return '?';
                        };
                    }
                } break;

                case 82: {
                    {
                        {
                            return ';';
                        };
                    }
                } break;

                case 1: {
                    {
                        {
                            return '_';
                        };
                    }
                } break;

                case 61: {
                    {
                        {
                            return param == (null)? ('<!--upper-->') : param;
                        };
                    }
                } break;

                case 64: {
                    {
                        {
                            return param == (null)? ('<!--string-->') : ('\'' + (param) + '\'');
                        };
                    }
                } break;

                case 66: {
                    {
                        {
                            return param == (null)? ('<!--backtick-->') : ('`' + (param) + '`');
                        };
                    }
                } break;

                case 62: {
                    {
                        {
                            return param == (null)? ('<!--lower-->') : param;
                        };
                    }
                } break;

                case 63: {
                    {
                        {
                            return param == (null)? ('<!--integer-->') : param;
                        };
                    }
                } break;

                case 60: {
                    {
                        {
                            return param == (null)? ('<!--float-->') : param;
                        };
                    }
                } break;

                case 65: {
                    {
                        {
                            return ('///' + (param) + '');
                        };
                    }
                } break;

                case 57: {
                    {
                        {
                            return 'is';
                        };
                    }
                } break;
                };
            };
            return ('<!--' + (token) + '-->');
        } };
    var Generator = {}
    var NiceExpression = {}
    NiceExpression.String = (s)=>["String",0,s];
    NiceExpression.Int = (s_68)=>["Int",1,s_68];
    NiceExpression.Float = (s_69)=>["Float",2,s_69];
    NiceExpression.Bool = (s_70)=>["Bool",3,s_70];
    NiceExpression.Ident = (s_71)=>["Ident",4,s_71];
    NiceExpression.Null = ["Null",5];
    NiceExpression.This = ["This",6];
    NiceExpression.Dot = (expr,name)=>["Dot",7,expr,name];
    NiceExpression.Call = (e,args)=>["Call",8,e,args];
    NiceExpression.Enum = (name_72,tag,args_73)=>["Enum",9,name_72,tag,args_73];
    NiceExpression.New = (e_74,args_75)=>["New",10,e_74,args_75];
    NiceExpression.Binop = (a_76,op,b_77)=>["Binop",11,a_76,op,b_77];
    NiceExpression.Function = (name_78,expr_79,args_80,defaults)=>["Function",12,name_78,expr_79,args_80,defaults];
    NiceExpression.Arrow = (expr_81,args_82,defaults_83)=>["Arrow",13,expr_81,args_82,defaults_83];
    NiceExpression.Parenthesis = (inner)=>["Parenthesis",14,inner];
    NiceExpression.Object = (names,el)=>["Object",15,names,el];
    NiceExpression.Array = (el_84)=>["Array",16,el_84];
    NiceExpression.Map = (keys,values)=>["Map",17,keys,values];
    NiceExpression.Unop = (op_85,postfix,e_86)=>["Unop",18,op_85,postfix,e_86];
    NiceExpression.Elvis = (nullable,othewise)=>["Elvis",19,nullable,othewise];
    NiceExpression.If = (econd,eif,eelse)=>["If",20,econd,eif,eelse];
    NiceExpression.Index = (expr_87,index_88)=>["Index",21,expr_87,index_88];
    NiceExpression.Assignop = (name_89,op_90,value_91)=>["Assignop",22,name_89,op_90,value_91];
    NiceExpression.NativeOperator = (kind,args_92,name_93)=>["NativeOperator",23,kind,args_92,name_93];
    NiceExpression.Underscore = ["Underscore",24];
    NiceExpression.Await = (expr_94)=>["Await",25,expr_94];
    var NiceStatement = {}
    NiceStatement.Statements = (el_95)=>["Statements",0,el_95];
    NiceStatement.Block = (el_96)=>["Block",1,el_96];
    NiceStatement.Call = (e_97,args_98)=>["Call",2,e_97,args_98];
    NiceStatement.New = (e_99,args_100)=>["New",3,e_99,args_100];
    NiceStatement.Var = (name_101,expr_102)=>["Var",4,name_101,expr_102];
    NiceStatement.Const = (name_103,expr_104)=>["Const",5,name_103,expr_104];
    NiceStatement.Function = (name_105,expr_106,args_107,defaults_108,async_109)=>["Function",6,name_105,expr_106,args_107,defaults_108,async_109];
    NiceStatement.Return = (e_110)=>["Return",7,e_110];
    NiceStatement.If = (econd_111,eif_112,eelse_113)=>["If",8,econd_111,eif_112,eelse_113];
    NiceStatement.Try = (expr_114,t,v_115,catches)=>["Try",9,expr_114,t,v_115,catches];
    NiceStatement.Throw = (value_116)=>["Throw",10,value_116];
    NiceStatement.Assign = (name_117,value_118)=>["Assign",11,name_117,value_118];
    NiceStatement.Assignop = (name_119,op_120,value_121)=>["Assignop",12,name_119,op_120,value_121];
    NiceStatement.Dot = (expr_122,name_123)=>["Dot",13,expr_122,name_123];
    NiceStatement.For = (name_124,over,by)=>["For",14,name_124,over,by];
    NiceStatement.While = (econd_125,e_126,pre)=>["While",15,econd_125,e_126,pre];
    NiceStatement.Increment = (e_127)=>["Increment",16,e_127];
    NiceStatement.Decrement = (e_128)=>["Decrement",17,e_128];
    NiceStatement.Switch = (expr_129,cases,statements)=>["Switch",18,expr_129,cases,statements];
    NiceStatement.Continue = ["Continue",19];
    NiceStatement.Break = ["Break",20];
    var NodeType = {}
    NodeType.Optional = (type_1036)=>["Optional",0,type_1036];
    NodeType.Type = (name_1037)=>["Type",1,name_1037];
    NodeType.ParametricType = (name_1038,params)=>["ParametricType",2,name_1038,params];
    NodeType.Function = (args_1039,ret)=>["Function",3,args_1039,ret];
    NodeType.FunctionArg = (name_1040,type_1041,defaultValue)=>["FunctionArg",4,name_1040,type_1041,defaultValue];
    NodeType.Object = (names_1042,types)=>["Object",5,names_1042,types];
    var Node = {}
    Node.TString = (s_1075)=>["TString",0,s_1075];
    Node.TIdent = (name_1076)=>["TIdent",1,name_1076];
    Node.TBool = (b_1077)=>["TBool",2,b_1077];
    Node.TThis = ["TThis",3];
    Node.TSuper = ["TSuper",4];
    Node.TInt = (s_1078)=>["TInt",5,s_1078];
    Node.TFloat = (s_1079)=>["TFloat",6,s_1079];
    Node.TNull = ["TNull",7];
    Node.TBinop = (a_1080,op_1081,b_1082)=>["TBinop",8,a_1080,op_1081,b_1082];
    Node.TAssignop = (a_1083,op_1084,b_1085)=>["TAssignop",9,a_1083,op_1084,b_1085];
    Node.TBlock = (el_1086)=>["TBlock",10,el_1086];
    Node.TCall = (e_1087,args_1088,argNames_1089)=>["TCall",11,e_1087,args_1088,argNames_1089];
    Node.TIf = (econd_1090,eif_1091,eelse_1092)=>["TIf",12,econd_1090,eif_1091,eelse_1092];
    Node.TParenthesis = (inner_1093)=>["TParenthesis",13,inner_1093];
    Node.TReturn = (e_1094)=>["TReturn",14,e_1094];
    Node.TThrow = (e_1095)=>["TThrow",15,e_1095];
    Node.TBreak = ["TBreak",16];
    Node.TContinue = ["TContinue",17];
    Node.TUnop = (op_1096,postfix_1097,e_1098)=>["TUnop",18,op_1096,postfix_1097,e_1098];
    Node.TWhile = (econd_1099,e_1100,pre_1101)=>["TWhile",19,econd_1099,e_1100,pre_1101];
    Node.TFunction = (name_1102,expr_1103,vars_1104,retType)=>["TFunction",20,name_1102,expr_1103,vars_1104,retType];
    Node.TArrow = (expr_1105,vars_1106,retType_1107)=>["TArrow",21,expr_1105,vars_1106,retType_1107];
    Node.TVar = (name_1108,t_1109,expr_1110,const_1111)=>["TVar",22,name_1108,t_1109,expr_1110,const_1111];
    Node.TVars = (vars_1112)=>["TVars",23,vars_1112];
    Node.TClass = (t_1113,ext_1114,impl_1115,fields_1116,external_1117)=>["TClass",24,t_1113,ext_1114,impl_1115,fields_1116,external_1117];
    Node.TTry = (expr_1118,t_1119,v_1120,catches_1121)=>["TTry",25,expr_1118,t_1119,v_1120,catches_1121];
    Node.TDot = (expr_1122,name_1123)=>["TDot",26,expr_1122,name_1123];
    Node.TNew = (path_1124,t_1125,args_1126,fields_1127,el_1128)=>["TNew",27,path_1124,t_1125,args_1126,fields_1127,el_1128];
    Node.TArray = (elements)=>["TArray",28,elements];
    Node.TMap = (keys_1129,values_1130)=>["TMap",29,keys_1129,values_1130];
    Node.TIndex = (expr_1131,index_1132)=>["TIndex",30,expr_1131,index_1132];
    Node.TSwitch = (exprs_1133,conds_1134,guards_1135,cases_1136)=>["TSwitch",31,exprs_1133,conds_1134,guards_1135,cases_1136];
    Node.TModule = (path_1137,el_1138)=>["TModule",32,path_1137,el_1138];
    Node.TObject = (names_1139,el_1140)=>["TObject",33,names_1139,el_1140];
    Node.TEnum = (t_1141,fields_1142,valuesType_1143)=>["TEnum",34,t_1141,fields_1142,valuesType_1143];
    Node.TEnumExtract = (path_1144,bind,expr_1145)=>["TEnumExtract",35,path_1144,bind,expr_1145];
    Node.TDeclare = (name_1146,t_1147)=>["TDeclare",36,name_1146,t_1147];
    Node.TUsing = (path_1148)=>["TUsing",37,path_1148];
    Node.TIs = (expr_1149,t_1150)=>["TIs",38,expr_1149,t_1150];
    Node.TAs = (expr_1151,kind_1152,t_1153)=>["TAs",39,expr_1151,kind_1152,t_1153];
    Node.TUnderscore = ["TUnderscore",40];
    Node.TStatic = (field_1154)=>["TStatic",41,field_1154];
    Node.TPrivate = (field_1155)=>["TPrivate",42,field_1155];
    Node.TExport = (field_1156)=>["TExport",43,field_1156];
    Node.TFor = (name_1157,over_1158,by_1159)=>["TFor",44,name_1157,over_1158,by_1159];
    Node.TElvis = (nullable_1160,othewise_1161)=>["TElvis",45,nullable_1160,othewise_1161];
    Node.NodeTypeValue = (type_1162)=>["NodeTypeValue",46,type_1162];
    var Fail = {}
    Fail.ParserError = ["ParserError",0];
    Fail.ParserInternalError = ["ParserInternalError",1];
    Fail.LexerError = ["LexerError",2];
    Fail.TyperError = ["TyperError",3];
    Fail.InfererError = ["InfererError",4];
    var Buffer = $global$.Buffer
    var ProcessStd = $global$.ProcessStd
    var Process = $global$.process
    var ParsedPath = class {
    }
    var Path = require("path")
    var Fs = require("fs")
    var RangeError = $global$.RangeError
    var ReferenceError = $global$.ReferenceError
    var SyntaxError = $global$.SyntaxError
    var TypeError = $global$.TypeError
    var URIError = $global$.URIError
    var EvalError = $global$.EvalError
    var Error = $global$.Error
    var RegExpMatch = $global$.RegExpMatch
    var RegExp = $global$.RegExp
    var Date = $global$.Date
    var Array = $global$.Array
    var Console = $global$.console
    var Map = $global$.Map
    var JSON = $global$.JSON
    var Math = $global$.Math
    var String = $global$.String
    var Bool = $global$.Bool
    var Float = $global$.Float
    var Int = $global$.Int
    var NiceComplexEnum = class {
        constructor() {
        {
        } };
    }
    var NiceSimpleEnum = class {
        constructor() {
            this.staticMethods = []
            this.staticVars = []
        {
        } };
    }
    var NiceClass = class {
        constructor() {
            this.staticMethods = []
            this.staticVars = []
            this.methods = []
            this.vars = []
            this.jsRequire = null
            this.jsNative = null
        {
        } };
    }
    var NiceProject = class {
        constructor() {
            this.interfaces = []
            this.classes = []
            this.enumsSimple = []
            this.enumsComplex = []
            this.globalVars = []
            this.globalFuncs = []
            this.init = []
            this.mapTypes = new Map()
        {
        } };
    }
    var Normalizer = class {
        constructor(collected_130, keywords_131, nativeEnums_132) {
            this.project = new NiceProject()
            this.keywords = []
            this.nativeEnums = false
            this.scopes = [new Map()]
            this.id = 0
            this.parentNames = new Map()
        {
            this.keywords = keywords_131;
            this.nativeEnums = nativeEnums_132;
            {
                const temp = collected_130;
                switch (temp && temp[1]) {
                case 10: {
                    {
                        const el_133 = temp[2];
                        {
                            for (const e of el_133) {
                                const temp_134 = e;
                                switch (temp_134 && temp_134[1]) {
                                case 32: {
                                    {
                                        const path_135 = temp_134[2];
                                        const el_136 = temp_134[3];
                                        {
                                            for (const e of el_136) {
                                                const temp_137 = e;
                                                switch (temp_137 && temp_137[1]) {
                                                case 24: {
                                                    {
                                                        const t_138 = temp_137[2];
                                                        const ext = temp_137[3];
                                                        const impl = temp_137[4];
                                                        const fields = temp_137[5];
                                                        const external = temp_137[6];
                                                        {
                                                            this.renameClassFields(fields);
                                                        };
                                                    }
                                                } break;

                                                case 34: {
                                                    {
                                                        const t_139 = temp_137[2];
                                                        const fields_140 = temp_137[3];
                                                        const valuesType = temp_137[4];
                                                        {
                                                            this.renameClassFields(fields_140);
                                                        };
                                                    }
                                                } break;
                                                };
                                            };
                                        };
                                    }
                                } break;
                                };
                            };
                            for (const e of el_133) {
                                const temp_141 = e;
                                switch (temp_141 && temp_141[1]) {
                                case 32: {
                                    {
                                        const path_142 = temp_141[2];
                                        const el_143 = temp_141[3];
                                        {
                                            for (const e of el_143) this.fillStatement(e);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        const statement = this.fillStatement(e);
                                        if (statement != null) {
                                            const temp_144 = statement;
                                            switch (temp_144 && temp_144[1]) {
                                            case 1: {
                                                {
                                                    const el_145 = temp_144[2];
                                                    {
                                                        if (el_145.length > 0) { this.project.init.push(statement) };
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                    this.project.init.push(statement);
                                                };
                                            }
                                            };
                                        };
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;
                };
            };
        } };
        nodeToExpression(e_146) { {
            if (e_146 == null) { return null };
            const atts = Project.mapAttributes.get(e_146);
            const await_147 = this.getAtt(atts, 'await');
            if (await_147 != null) {
                this.removeAttribute(atts, 'await');
                return NiceExpression.Await(this.nodeToExpression(e_146));
            };
            {
                const temp_148 = e_146;
                switch (temp_148 && temp_148[1]) {
                case 0: {
                    {
                        const v_149 = temp_148[2];
                        {
                            return NiceExpression.String(v_149);
                        };
                    }
                } break;

                case 5: {
                    {
                        const v_150 = temp_148[2];
                        {
                            return NiceExpression.Int(v_150);
                        };
                    }
                } break;

                case 6: {
                    {
                        const v_151 = temp_148[2];
                        {
                            return NiceExpression.Float(v_151);
                        };
                    }
                } break;

                case 2: {
                    {
                        const v_152 = temp_148[2];
                        {
                            return NiceExpression.Bool(v_152);
                        };
                    }
                } break;

                case 7: {
                    {
                        {
                            return NiceExpression.Null;
                        };
                    }
                } break;

                case 1: {
                    {
                        const name_153 = temp_148[2];
                        {
                            const atts_154 = Project.mapAttributes.get(Project.mapNames.get(e_146));
                            const operator = this.getAtt(atts_154, 'keyword');
                            if (operator != null) {
                                const temp_155 = operator.values[0];
                                switch (temp_155 && temp_155[1]) {
                                case 0: {
                                    {
                                        const s_156 = temp_155[2];
                                        {
                                            return NiceExpression.NativeOperator(4, [], s_156);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw '@keyword takes string as argument';
                                    };
                                }
                                };
                            };
                            let source = Project.mapNames.get(e_146);
                            {
                                const temp_157 = source;
                                switch (temp_157 && temp_157[1]) {
                                case null: {
                                    {
                                        {
                                            throw ('Unmapped ' + (e_146) + ' ') + JSON.stringify(Project.data.get(e_146));
                                        };
                                    }
                                } break;

                                case 22: {
                                    {
                                        const name_158 = temp_157[2];
                                        {
                                            if (Project.mapNames.get(source) != null) { return NiceExpression.Dot(NiceExpression.This, name_158) };
                                        };
                                    }
                                } break;

                                case 20: {
                                    {
                                        const name_159 = temp_157[2];
                                        {
                                            if (Project.mapNames.get(source) != null) { return NiceExpression.Dot(NiceExpression.This, name_159) };
                                        };
                                    }
                                } break;

                                case 41: {
                                    {
                                        const f_160 = temp_157[2];
                                        {
                                            const staticSource = Project.mapNames.get(source);
                                            {
                                                const temp_161 = staticSource;
                                                switch (temp_161 && temp_161[1]) {
                                                case 24: {
                                                    {
                                                        const t_162 = temp_161[2];
                                                        {
                                                            return NiceExpression.Dot(NiceExpression.Ident(DataHelper.extractTypeName(t_162)), this.getClassDotField(staticSource, name_153));
                                                        };
                                                    }
                                                } break;

                                                case 34: {
                                                    {
                                                        const t_163 = temp_161[2];
                                                        {
                                                            return NiceExpression.Dot(NiceExpression.Ident(DataHelper.extractTypeName(t_163)), name_153);
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        throw ('staticSource is ' + (staticSource) + '');
                                                    };
                                                }
                                                };
                                            };
                                        };
                                    }
                                } break;
                                };
                            };
                            return NiceExpression.Ident(((this.parentNames.get(source)) || (name_153)));
                        };
                    }
                } break;

                case 26: {
                    {
                        const expr_164 = temp_148[2];
                        const name_165 = temp_148[3];
                        {
                            const parent = Project.mapNames.get(expr_164);
                            {
                                const temp_166 = parent;
                                switch (temp_166 && temp_166[1]) {
                                case 34: {
                                    {
                                        const t_167 = temp_166[2];
                                        const fields_168 = temp_166[3];
                                        const valuesType_169 = temp_166[4];
                                        {
                                            if (valuesType_169 != null) { return ((this.getTag(parent, name_165)) || (NiceExpression.Dot(this.nodeToExpression(expr_164), ((this.getClassDotField(parent, name_165)) || (name_165))))) } else return NiceExpression.Dot(this.nodeToExpression(expr_164), ((this.getClassDotField(parent, name_165)) || (name_165)));
                                        };
                                    }
                                } break;

                                case 24: {
                                    {
                                        {
                                            return NiceExpression.Dot(this.nodeToExpression(expr_164), ((this.getClassDotField(parent, name_165)) || (name_165)));
                                        };
                                    }
                                } break;
                                };
                            };
                            return NiceExpression.Dot(this.nodeToExpression(expr_164), name_165);
                        };
                    }
                } break;

                case 11: {
                    {
                        const e_170 = temp_148[2];
                        const args_171 = temp_148[3];
                        const argNames = temp_148[4];
                        {
                            if (args_171.length == 1) {
                                const temp_172 = e_170;
                                switch (temp_172 && temp_172[1]) {
                                case 26: {
                                    {
                                        const expr_173 = temp_172[2];
                                        const name_174 = temp_172[3];
                                        {
                                            if (name_174 == 'charCodeAt') {
                                                const temp_175 = expr_173;
                                                switch (temp_175 && temp_175[1]) {
                                                case 0: {
                                                    {
                                                        const s_176 = temp_175[2];
                                                        {
                                                            if (s_176.indexOf('\\') == -1) {
                                                                const temp_177 = args_171[0];
                                                                switch (temp_177 && temp_177[1]) {
                                                                case 5: {
                                                                    {
                                                                        const i = temp_177[2];
                                                                        {
                                                                            if ((i < s_176.length) && (i > -1)) { return NiceExpression.Int(s_176.charCodeAt(i)) };
                                                                        };
                                                                    }
                                                                } break;
                                                                };
                                                            };
                                                        };
                                                    }
                                                } break;
                                                };
                                            };
                                        };
                                    }
                                } break;
                                };
                            };
                            const a_178 = [];
                            for (const arg of args_171) {
                                a_178.push(this.nodeToExpression(arg));
                            };
                            const atts_179 = Project.mapAttributes.get(Project.mapNames.get(e_170));
                            const infix = this.getAtt(atts_179, 'infix');
                            if (infix != null) {
                                const temp_180 = infix.values[0];
                                switch (temp_180 && temp_180[1]) {
                                case 0: {
                                    {
                                        const s_181 = temp_180[2];
                                        {
                                            return NiceExpression.NativeOperator(0, a_178, s_181);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw '@infix takes string as argument';
                                    };
                                }
                                };
                            };
                            const operator_182 = this.getAtt(atts_179, 'operator');
                            if (operator_182 != null) {
                                const temp_183 = operator_182.values[0];
                                switch (temp_183 && temp_183[1]) {
                                case 0: {
                                    {
                                        const s_184 = temp_183[2];
                                        {
                                            return NiceExpression.NativeOperator(1, a_178, s_184);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw '@operator takes string as argument';
                                    };
                                }
                                };
                            };
                            const v_185 = this.nodeToExpression(e_170);
                            if (v_185 == null) { throw 'Node.TCall ' + e_170 + ' is null' };
                            return NiceExpression.Call(v_185, a_178);
                        };
                    }
                } break;

                case 8: {
                    {
                        const a_186 = temp_148[2];
                        const op_187 = temp_148[3];
                        const b_188 = temp_148[4];
                        {
                            const ea = this.nodeToExpression(a_186);
                            const eb = this.nodeToExpression(b_188);
                            if (op_187 == 111) {
                                const temp_189 = ea;
                                switch (temp_189 && temp_189[1]) {
                                case 0: {
                                    {
                                        const sa = temp_189[2];
                                        {
                                            {
                                                const temp_190 = eb;
                                                switch (temp_190 && temp_190[1]) {
                                                case 0: {
                                                    {
                                                        const sb = temp_190[2];
                                                        {
                                                            return NiceExpression.String(sa + sb);
                                                        };
                                                    }
                                                } break;
                                                };
                                            };
                                        };
                                    }
                                } break;
                                };
                            };
                            return NiceExpression.Binop(ea, op_187, eb);
                        };
                    }
                } break;

                case 27: {
                    {
                        const path_191 = temp_148[2];
                        const t_192 = temp_148[3];
                        const args_193 = temp_148[4];
                        const fields_194 = temp_148[5];
                        const el_195 = temp_148[6];
                        {
                            const v_196 = NiceExpression.Ident(DataHelper.extractTypeName(t_192));
                            const a_197 = [];
                            for (const arg of args_193) {
                                a_197.push(this.nodeToExpression(arg));
                            };
                            const result = NiceExpression.New(v_196, a_197);
                            return result;
                        };
                    }
                } break;

                case 20: {
                    {
                        const name_198 = temp_148[2];
                        const expr_199 = temp_148[3];
                        const vars = temp_148[4];
                        const rettype = temp_148[5];
                        {
                            const a_200 = [];
                            const defaults_201 = [];
                            for (const arg of vars) {
                                const temp_202 = arg;
                                switch (temp_202 && temp_202[1]) {
                                case 22: {
                                    {
                                        const name_203 = temp_202[2];
                                        const t_204 = temp_202[3];
                                        const expr_205 = temp_202[4];
                                        const const_206 = temp_202[5];
                                        {
                                            a_200.push(this.unique(name_203, arg));
                                            if (expr_205 != null) { defaults_201.push(this.nodeToExpression(expr_205)) } else defaults_201.push(null);
                                        };
                                    }
                                } break;
                                };
                            };
                            return NiceExpression.Function((name_198)? (this.unique(name_198, e_146)) : null, this.nodeToStatement(expr_199), a_200, defaults_201);
                        };
                    }
                } break;

                case 21: {
                    {
                        const expr_207 = temp_148[2];
                        const vars_208 = temp_148[3];
                        const rettype_209 = temp_148[4];
                        {
                            const a_210 = [];
                            const defaults_211 = [];
                            for (const arg of vars_208) {
                                const temp_212 = arg;
                                switch (temp_212 && temp_212[1]) {
                                case 22: {
                                    {
                                        const name_213 = temp_212[2];
                                        const t_214 = temp_212[3];
                                        const expr_215 = temp_212[4];
                                        const const_216 = temp_212[5];
                                        {
                                            a_210.push(this.unique(name_213, arg));
                                            if (expr_215 != null) { defaults_211.push(this.nodeToExpression(expr_215)) } else defaults_211.push(null);
                                        };
                                    }
                                } break;
                                };
                            };
                            return NiceExpression.Arrow(this.nodeToExpression(expr_207), a_210, defaults_211);
                        };
                    }
                } break;

                case 10: {
                    {
                        const el_217 = temp_148[2];
                        {
                            const block = [];
                            let i_218 = 0;
                            while (i_218 < el_217.length - 1) {
                                block.push(this.nodeToStatement(el_217[i_218]));
                                i_218++;
                            };
                            block.push(NiceStatement.Return(this.nodeToExpression(el_217[el_217.length - 1])));
                            return NiceExpression.Call(NiceExpression.Parenthesis(NiceExpression.Function(null, NiceStatement.Block(block), [])), []);
                        };
                    }
                } break;

                case 33: {
                    {
                        const names_219 = temp_148[2];
                        const el_220 = temp_148[3];
                        {
                            const els = [];
                            for (const e of el_220) {
                                els.push(this.nodeToExpression(e));
                            };
                            return NiceExpression.Object(names_219, els);
                        };
                    }
                } break;

                case 13: {
                    {
                        const inner_221 = temp_148[2];
                        {
                            const unwrapNestedParens = (inner_222) => { {
                                const temp_223 = inner_222;
                                switch (temp_223 && temp_223[1]) {
                                case 13: {
                                    {
                                        const i_224 = temp_223[2];
                                        {
                                            return unwrapNestedParens(i_224);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        return inner_222;
                                    };
                                }
                                };
                            } };
                            const value_225 = unwrapNestedParens(inner_221);
                            if (value_225 == null) { console.log('Node.TParenthesis(inner)', JSON.stringify(Project.data.get(inner_221)), JSON.stringify(inner_221)) };
                            return NiceExpression.Parenthesis(this.nodeToExpression(value_225));
                        };
                    }
                } break;

                case 28: {
                    {
                        const el_226 = temp_148[2];
                        {
                            if (el_226.length == 1) {
                                const temp_227 = el_226[0];
                                switch (temp_227 && temp_227[1]) {
                                case 44: {
                                    {
                                        const name_228 = temp_227[2];
                                        const over_229 = temp_227[3];
                                        const by_230 = temp_227[4];
                                        {
                                            const block_231 = [];
                                            const result_232 = this.unique('result');
                                            block_231.push(NiceStatement.Const(result_232, NiceExpression.Array([])));
                                            const value_233 = this.unique('value');
                                            block_231.push(NiceStatement.Const(value_233, this.nodeToExpression(over_229)));
                                            const push = NiceStatement.Call(NiceExpression.Dot(NiceExpression.Ident(result_232), 'push'), [this.nodeToExpression(by_230)]);
                                            const demo = async () => { await demo() };
                                            const fillLoop = () => {
                                                {
                                                    const temp_234 = over_229;
                                                    switch (temp_234 && temp_234[1]) {
                                                    case 26: {
                                                        {
                                                            const f_235 = temp_234[3];
                                                            {
                                                                if (f_235 == 'length') {
                                                                    const i_236 = name_228;
                                                                    block_231.push(NiceStatement.Var(i_236, NiceExpression.Int(-1)));
                                                                    block_231.push(NiceStatement.While(NiceExpression.Binop(NiceExpression.Parenthesis(NiceExpression.Binop(NiceExpression.Ident(i_236), 111, NiceExpression.Int(1))), 99, NiceExpression.Ident(value_233)), NiceStatement.Block([NiceStatement.Increment(NiceExpression.Ident(i_236)), push]), true));
                                                                    return;
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    case 5: {
                                                        {
                                                            const s_237 = temp_234[2];
                                                            {
                                                                const i_238 = name_228;
                                                                block_231.push(NiceStatement.Const(i_238, NiceExpression.Int(-1)));
                                                                block_231.push(NiceStatement.While(NiceExpression.Binop(NiceExpression.Parenthesis(NiceExpression.Binop(NiceExpression.Ident(i_238), 111, NiceExpression.Int(1))), 99, NiceExpression.Ident(value_233)), NiceStatement.Block([NiceStatement.Increment(NiceExpression.Ident(i_238)), push]), true));
                                                                return;
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                };
                                                block_231.push(NiceStatement.For(name_228, NiceExpression.Ident(value_233), push));
                                            };
                                            fillLoop();
                                            block_231.push(NiceStatement.Return(NiceExpression.Ident(result_232)));
                                            return NiceExpression.Call(NiceExpression.Parenthesis(NiceExpression.Function(null, NiceStatement.Block(block_231), [])), []);
                                        };
                                    }
                                } break;
                                };
                            };
                            const els_239 = [];
                            for (const e of el_226) els_239.push(this.nodeToExpression(e));
                            return NiceExpression.Array(els_239);
                        };
                    }
                } break;

                case 45: {
                    {
                        const nullable_240 = temp_148[2];
                        const othewise_241 = temp_148[3];
                        {
                            return NiceExpression.Elvis(this.nodeToExpression(nullable_240), this.nodeToExpression(othewise_241));
                        };
                    }
                } break;

                case 18: {
                    {
                        const op_242 = temp_148[2];
                        const postfix_243 = temp_148[3];
                        const e_244 = temp_148[4];
                        {
                            return NiceExpression.Unop(op_242, postfix_243, this.nodeToExpression(e_244));
                        };
                    }
                } break;

                case 3: {
                    {
                        {
                            return NiceExpression.This;
                        };
                    }
                } break;

                case 29: {
                    {
                        const keys_245 = temp_148[2];
                        const values_246 = temp_148[3];
                        {
                            const k_247 = [];
                            const v_248 = [];
                            for (const key of keys_245) k_247.push(this.nodeToExpression(key));
                            for (const value of values_246) v_248.push(this.nodeToExpression(value));
                            return NiceExpression.Map(k_247, v_248);
                        };
                    }
                } break;

                case 9: {
                    {
                        const a_249 = temp_148[2];
                        const op_250 = temp_148[3];
                        const b_251 = temp_148[4];
                        {
                            return NiceExpression.Assignop(this.nodeToExpression(a_249), op_250, this.nodeToExpression(b_251));
                        };
                    }
                } break;

                case 12: {
                    {
                        const econd_252 = temp_148[2];
                        const eif_253 = temp_148[3];
                        const eelse_254 = temp_148[4];
                        {
                            let binds = false;
                            for (const cond of econd_252) {
                                const temp_255 = cond;
                                switch (temp_255 && temp_255[1]) {
                                case 22: {
                                    {
                                        {
                                            binds = true;
                                        };
                                    }
                                } break;
                                };
                            };
                            if (!binds && econd_252.length == 1) { return NiceExpression.If(this.nodeToExpression(econd_252[0]), this.nodeToExpression(eif_253), this.nodeToExpression(eelse_254)) };
                            if (!binds) {
                                let parens = NiceExpression.Parenthesis(this.nodeToExpression(econd_252[0]));
                                let i_256 = 1;
                                while (i_256 < econd_252.length) {
                                    parens = NiceExpression.Binop(parens, 92, NiceExpression.Parenthesis(this.nodeToExpression(econd_252[i_256])));
                                    i_256++;
                                };
                                return NiceExpression.If(parens, this.nodeToExpression(eif_253), this.nodeToExpression(eelse_254));
                            };
                            return NiceExpression.If(this.nodeToExpression(econd_252[0]), this.nodeToExpression(eif_253), this.nodeToExpression(eelse_254));
                        };
                    }
                } break;

                case 30: {
                    {
                        const expr_257 = temp_148[2];
                        const index_258 = temp_148[3];
                        {
                            return NiceExpression.Index(this.nodeToExpression(expr_257), this.nodeToExpression(index_258));
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown node type for expression:', e_146, Project.data.get(e_146));
                    };
                }
                };
            };
            return null;
        } };
        nodeToStatement(e_259) { {
            if (e_259 == null) { return null };
            {
                const temp_260 = e_259;
                switch (temp_260 && temp_260[1]) {
                case 10: {
                    {
                        const el_261 = temp_260[2];
                        {
                            let els_262 = [];
                            for (const e of el_261) {
                                const statement_263 = this.nodeToStatement(e);
                                if (statement_263 != null) { els_262.push(statement_263) };
                            };
                            return NiceStatement.Block(els_262);
                        };
                    }
                } break;

                case 34: {
                    {
                        const t_264 = temp_260[2];
                        const fields_265 = temp_260[3];
                        const valuesType_266 = temp_260[4];
                        {
                            this.renameClassFields(fields_265);
                            const isComplexEnum = valuesType_266 == null;
                            if (isComplexEnum) {
                                const type = new NiceComplexEnum();
                                type.name = DataHelper.extractTypeName(t_264);
                                const names_267 = [];
                                const constructors = [];
                                for (const f of fields_265) {
                                    const temp_268 = f;
                                    switch (temp_268 && temp_268[1]) {
                                    case 1: {
                                        {
                                            const name_269 = temp_268[2];
                                            {
                                                names_267.push(name_269);
                                                constructors.push(null);
                                            };
                                        }
                                    } break;

                                    case 11: {
                                        {
                                            const e_270 = temp_268[2];
                                            const args_271 = temp_268[3];
                                            const argNames_272 = temp_268[4];
                                            {
                                                {
                                                    const temp_273 = e_270;
                                                    switch (temp_273 && temp_273[1]) {
                                                    case 1: {
                                                        {
                                                            const name_274 = temp_273[2];
                                                            {
                                                                names_267.push(name_274);
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                };
                                                constructors.push((() => {
                                                    const result_275 = [];
                                                    const value_276 = argNames_272;
                                                    for (const arg of value_276) result_275.push(this.unique(arg));
                                                    return result_275;
                                                })());
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            console.error('Unknown complex enum field kind:', f);
                                        };
                                    }
                                    };
                                };
                                type.names = names_267;
                                type.constructors = constructors;
                                this.project.enumsComplex.push(type);
                                return null;
                            } else {
                                const type_277 = new NiceSimpleEnum();
                                type_277.name = DataHelper.extractTypeName(t_264);
                                const names_278 = [];
                                const values_279 = [];
                                for (const f of fields_265) {
                                    const temp_280 = f;
                                    switch (temp_280 && temp_280[1]) {
                                    case 8: {
                                        {
                                            const a_281 = temp_280[2];
                                            const op_282 = temp_280[3];
                                            const b_283 = temp_280[4];
                                            {
                                                {
                                                    const temp_284 = a_281;
                                                    switch (temp_284 && temp_284[1]) {
                                                    case 1: {
                                                        {
                                                            const name_285 = temp_284[2];
                                                            {
                                                                names_278.push(name_285);
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                };
                                                {
                                                    const temp_286 = b_283;
                                                    switch (temp_286 && temp_286[1]) {
                                                    case 0: {
                                                        {
                                                            const s_287 = temp_286[2];
                                                            {
                                                                values_279.push(NiceExpression.String(s_287));
                                                            };
                                                        }
                                                    } break;

                                                    case 5: {
                                                        {
                                                            const s_288 = temp_286[2];
                                                            {
                                                                values_279.push(NiceExpression.Int(s_288));
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            console.error('Unknown node field value kind:', b_283);
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 41: {
                                        {
                                            const field = temp_280[2];
                                            {
                                                {
                                                    const temp_289 = field;
                                                    switch (temp_289 && temp_289[1]) {
                                                    case 22: {
                                                        {
                                                            const name_290 = temp_289[2];
                                                            const t_291 = temp_289[3];
                                                            const expr_292 = temp_289[4];
                                                            const const_293 = temp_289[5];
                                                            {
                                                                const uname = ((this.parentNames.get(field)) || (this.unique(name_290, field)));
                                                                if (const_293) { type_277.staticVars.push(NiceStatement.Const(uname, this.nodeToExpression(expr_292))) } else type_277.staticVars.push(NiceStatement.Var(uname, this.nodeToExpression(expr_292)));
                                                            };
                                                        }
                                                    } break;

                                                    case 20: {
                                                        {
                                                            const name_294 = temp_289[2];
                                                            const expr_295 = temp_289[3];
                                                            const vars_296 = temp_289[4];
                                                            const rettype_297 = temp_289[5];
                                                            {
                                                                const uname_298 = ((this.parentNames.get(field)) || (this.unique(name_294, field)));
                                                                const a_299 = [];
                                                                for (const arg of vars_296) {
                                                                    a_299.push(this.unique(DataHelper.nameOf(arg), arg));
                                                                };
                                                                type_277.staticMethods.push(NiceStatement.Function(uname_298, this.nodeToStatement(expr_295), a_299));
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            console.error('Unknown enum static field kind:', field);
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            console.error('Unknown simple enum field kind:', f);
                                        };
                                    }
                                    };
                                };
                                type_277.names = names_278;
                                type_277.values = values_279;
                                this.project.enumsSimple.push(type_277);
                                return null;
                            };
                        };
                    }
                } break;

                case 24: {
                    {
                        const t_300 = temp_260[2];
                        const ext_301 = temp_260[3];
                        const impl_302 = temp_260[4];
                        const fields_303 = temp_260[5];
                        const external_304 = temp_260[6];
                        {
                            this.renameClassFields(fields_303);
                            const name_305 = DataHelper.extractTypeName(t_300);
                            const type_306 = new NiceClass();
                            type_306.name = name_305;
                            type_306.external = external_304;
                            const atts_307 = Project.mapAttributes.get(e_259);
                            const require = this.getAtt(atts_307, 'require');
                            if (require != null) {
                                const temp_308 = require.values[0];
                                switch (temp_308 && temp_308[1]) {
                                case 0: {
                                    {
                                        const s_309 = temp_308[2];
                                        {
                                            type_306.jsRequire = s_309;
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw '@require takes string as argument';
                                    };
                                }
                                };
                            };
                            const native = this.getAtt(atts_307, 'native');
                            if (native != null) {
                                const temp_310 = native.values[0];
                                switch (temp_310 && temp_310[1]) {
                                case 0: {
                                    {
                                        const s_311 = temp_310[2];
                                        {
                                            type_306.jsNative = s_311;
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw '@native takes string as argument';
                                    };
                                }
                                };
                            };
                            for (const f of fields_303) {
                                const temp_312 = f;
                                switch (temp_312 && temp_312[1]) {
                                case 22: {
                                    {
                                        const name_313 = temp_312[2];
                                        const t_314 = temp_312[3];
                                        const expr_315 = temp_312[4];
                                        const const_316 = temp_312[5];
                                        {
                                            const uname_317 = ((this.parentNames.get(f)) || (this.unique(name_313, f)));
                                            if (const_316) { type_306.vars.push(NiceStatement.Const(uname_317, this.nodeToExpression(expr_315))) } else type_306.vars.push(NiceStatement.Var(uname_317, this.nodeToExpression(expr_315)));
                                        };
                                    }
                                } break;

                                case 20: {
                                    {
                                        const name_318 = temp_312[2];
                                        const expr_319 = temp_312[3];
                                        const vars_320 = temp_312[4];
                                        const rettype_321 = temp_312[5];
                                        {
                                            const uname_322 = ((name_318 == 'new'))? ('new') : (((this.parentNames.get(f)) || (this.unique(name_318, f))));
                                            const a_323 = [];
                                            for (const arg of vars_320) {
                                                a_323.push(this.unique(DataHelper.nameOf(arg), arg));
                                            };
                                            type_306.methods.push(NiceStatement.Function(uname_322, this.nodeToStatement(expr_319), a_323));
                                        };
                                    }
                                } break;

                                case 41: {
                                    {
                                        const field_324 = temp_312[2];
                                        {
                                            {
                                                const temp_325 = field_324;
                                                switch (temp_325 && temp_325[1]) {
                                                case 22: {
                                                    {
                                                        const name_326 = temp_325[2];
                                                        const t_327 = temp_325[3];
                                                        const expr_328 = temp_325[4];
                                                        const const_329 = temp_325[5];
                                                        {
                                                            const uname_330 = ((this.parentNames.get(field_324)) || (this.unique(name_326, field_324)));
                                                            if (const_329) { type_306.staticVars.push(NiceStatement.Const(uname_330, this.nodeToExpression(expr_328))) } else type_306.staticVars.push(NiceStatement.Var(uname_330, this.nodeToExpression(expr_328)));
                                                        };
                                                    }
                                                } break;

                                                case 20: {
                                                    {
                                                        const name_331 = temp_325[2];
                                                        const expr_332 = temp_325[3];
                                                        const vars_333 = temp_325[4];
                                                        const rettype_334 = temp_325[5];
                                                        {
                                                            const uname_335 = ((this.parentNames.get(field_324)) || (this.unique(name_331, field_324)));
                                                            const a_336 = [];
                                                            for (const arg of vars_333) {
                                                                a_336.push(this.unique(DataHelper.nameOf(arg), arg));
                                                            };
                                                            type_306.staticMethods.push(NiceStatement.Function(uname_335, this.nodeToStatement(expr_332), a_336));
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        console.error('Unknown class static field kind:', field_324);
                                                    };
                                                }
                                                };
                                            };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        console.error('Unknown class field kind:', f);
                                    };
                                }
                                };
                            };
                            this.project.classes.push(type_306);
                            return null;
                        };
                    }
                } break;

                case 36: {
                    {
                        const name_337 = temp_260[2];
                        const t_338 = temp_260[3];
                        {
                            {
                                const temp_339 = t_338;
                                switch (temp_339 && temp_339[1]) {
                                case 8: {
                                    {
                                        const a_340 = temp_339[2];
                                        const op_341 = temp_339[3];
                                        const b_342 = temp_339[4];
                                        {
                                        };
                                    }
                                } break;

                                case 20: {
                                    {
                                        {
                                            Project.mapAttributes.set(t_338, Project.mapAttributes.get(e_259));
                                        };
                                    }
                                } break;

                                case 24: {
                                    {
                                        {
                                            Project.mapAttributes.set(t_338, Project.mapAttributes.get(e_259));
                                            this.nodeToStatement(t_338);
                                        };
                                    }
                                } break;

                                case 22: {
                                    {
                                        const name_343 = temp_339[2];
                                        const t_344 = temp_339[3];
                                        const expr_345 = temp_339[4];
                                        const const_346 = temp_339[5];
                                        {
                                            Project.mapAttributes.set(t_344, Project.mapAttributes.get(e_259));
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        console.error('Unknown declare kind:', t_338);
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                case 27: {
                    {
                        const path_347 = temp_260[2];
                        const t_348 = temp_260[3];
                        const args_349 = temp_260[4];
                        const fields_350 = temp_260[5];
                        const values_351 = temp_260[6];
                        {
                            const v_352 = NiceExpression.Ident(DataHelper.extractTypeName(t_348));
                            const a_353 = [];
                            for (const arg of args_349) {
                                a_353.push(this.nodeToExpression(arg));
                            };
                            const result_354 = NiceStatement.New(v_352, a_353);
                            if (fields_350.length > 0) {
                                const temp_355 = this.unique('temp');
                                const block_356 = [NiceStatement.Const(temp_355, NiceExpression.New(v_352, a_353))];
                                {
                                    const value_357 = fields_350.length;
                                    let field = 0;
                                    while (field < value_357) {
                                        block_356.push(NiceStatement.Assign(NiceExpression.Dot(NiceExpression.Ident(temp_355), fields_350[field]), this.nodeToExpression(values_351[field])));
                                        field++;
                                    };
                                };
                                return NiceStatement.Block(block_356);
                            };
                            return result_354;
                        };
                    }
                } break;

                case 11: {
                    {
                        const e_358 = temp_260[2];
                        const args_359 = temp_260[3];
                        const argNames_360 = temp_260[4];
                        {
                            const v_361 = this.nodeToExpression(e_358);
                            const a_362 = [];
                            for (const arg of args_359) {
                                a_362.push(this.nodeToExpression(arg));
                            };
                            return NiceStatement.Call(v_361, a_362);
                        };
                    }
                } break;

                case 22: {
                    {
                        const name_363 = temp_260[2];
                        const t_364 = temp_260[3];
                        const expr_365 = temp_260[4];
                        const const_366 = temp_260[5];
                        {
                            if (const_366) { return this.wrapType(t_364, NiceStatement.Const(this.unique(name_363, e_259), this.nodeToExpression(expr_365))) };
                            return this.wrapType(t_364, NiceStatement.Var(this.unique(name_363, e_259), this.nodeToExpression(expr_365)));
                        };
                    }
                } break;

                case 20: {
                    {
                        const name_367 = temp_260[2];
                        const expr_368 = temp_260[3];
                        const vars_369 = temp_260[4];
                        const rettype_370 = temp_260[5];
                        {
                            const a_371 = [];
                            const defaults_372 = [];
                            for (const arg of vars_369) {
                                const temp_373 = arg;
                                switch (temp_373 && temp_373[1]) {
                                case 22: {
                                    {
                                        const name_374 = temp_373[2];
                                        const t_375 = temp_373[3];
                                        const expr_376 = temp_373[4];
                                        const const_377 = temp_373[5];
                                        {
                                            a_371.push(this.unique(name_374, arg));
                                            if (expr_376 != null) { defaults_372.push(this.nodeToExpression(expr_376)) } else defaults_372.push(null);
                                        };
                                    }
                                } break;
                                };
                            };
                            if (name_367 == 'new') { return NiceStatement.Function(null, this.nodeToStatement(expr_368), a_371, defaults_372) };
                            return NiceStatement.Function((name_367)? (this.unique(name_367, e_259)) : null, this.nodeToStatement(expr_368), a_371, defaults_372, this.hasAttribute(e_259, 'async'));
                        };
                    }
                } break;

                case 44: {
                    {
                        const name_378 = temp_260[2];
                        const over_379 = temp_260[3];
                        const by_380 = temp_260[4];
                        {
                            {
                                const temp_381 = over_379;
                                switch (temp_381 && temp_381[1]) {
                                case 26: {
                                    {
                                        const expr_382 = temp_381[2];
                                        const f_383 = temp_381[3];
                                        {
                                            if (f_383 == 'length') {
                                                const i_384 = name_378;
                                                const v_385 = this.unique('value');
                                                return NiceStatement.Block([NiceStatement.Const(v_385, this.nodeToExpression(over_379)), NiceStatement.Var(i_384, NiceExpression.Int(0)), NiceStatement.While(NiceExpression.Binop(NiceExpression.Ident(i_384), 99, NiceExpression.Ident(v_385)), NiceStatement.Block([this.nodeToStatement(by_380), NiceStatement.Increment(NiceExpression.Ident(i_384))]), true)]);
                                            };
                                        };
                                    }
                                } break;

                                case 5: {
                                    {
                                        const s_386 = temp_381[2];
                                        {
                                            const i_387 = name_378;
                                            return NiceStatement.Block([NiceStatement.Var(i_387, NiceExpression.Int(0)), NiceStatement.While(NiceExpression.Binop(NiceExpression.Ident(i_387), 99, NiceExpression.Int(s_386)), NiceStatement.Block([this.nodeToStatement(by_380), NiceStatement.Increment(NiceExpression.Ident(i_387))]), true)]);
                                        };
                                    }
                                } break;
                                };
                            };
                            return NiceStatement.For(name_378, this.nodeToExpression(over_379), this.nodeToStatement(by_380));
                        };
                    }
                } break;

                case 14: {
                    {
                        const e_388 = temp_260[2];
                        {
                            if (e_388 == null) { return NiceStatement.Return(null) };
                            return NiceStatement.Return(this.nodeToExpression(e_388));
                        };
                    }
                } break;

                case 26: {
                    {
                        const expr_389 = temp_260[2];
                        const name_390 = temp_260[3];
                        {
                            return NiceStatement.Dot(this.nodeToExpression(expr_389), name_390);
                        };
                    }
                } break;

                case 12: {
                    {
                        const econd_391 = temp_260[2];
                        const eif_392 = temp_260[3];
                        const eelse_393 = temp_260[4];
                        {
                            let binds_394 = false;
                            for (const cond of econd_391) {
                                const temp_395 = cond;
                                switch (temp_395 && temp_395[1]) {
                                case 22: {
                                    {
                                        {
                                            binds_394 = true;
                                        };
                                    }
                                } break;
                                };
                            };
                            if (!binds_394 && econd_391.length == 1) { return NiceStatement.If(this.nodeToExpression(econd_391[0]), this.nodeToStatement(eif_392), this.nodeToStatement(eelse_393)) };
                            if (!binds_394) {
                                let parens_396 = NiceExpression.Parenthesis(this.nodeToExpression(econd_391[0]));
                                let i_397 = 1;
                                while (i_397 < econd_391.length) {
                                    parens_396 = NiceExpression.Binop(parens_396, 92, NiceExpression.Parenthesis(this.nodeToExpression(econd_391[i_397])));
                                    i_397++;
                                };
                                return NiceStatement.If(parens_396, this.nodeToStatement(eif_392), this.nodeToStatement(eelse_393));
                            };
                            if ((false) && (0) && (1) && (2 && 3) && (4 || 5) && (6)) { binds_394 = 'wewewer' };
                            {
                                let step = 0;
                                const a = binds_394;
                                let temp_398 = null;
                                if (step == 0 && a != null) {
                                    temp_398 = 0;
                                    step = 1;
                                };
                                let b = null;
                                if (step == 1 && temp_398 != false) {
                                    b = a;
                                    step = 2;
                                };
                                let temp_399 = null;
                                if (step == 2 && b != null) {
                                    temp_399 = 2 && 3;
                                    step = 3;
                                };
                                let temp_400 = null;
                                if (step == 3 && temp_399 != false) {
                                    temp_400 = 4 || 5;
                                    step = 4;
                                };
                                let c = null;
                                if (step == 4 && temp_400 != false) {
                                    c = 6;
                                    step = 5;
                                };
                                if (step == 5 && c != null) { step = 6 };
                                if (step == 6) { binds_394 = 'zazaza' };
                            };
                            {
                                let step_401 = 0;
                                const a = binds_394;
                                let b = null;
                                if (step_401 == 0 && a != null) {
                                    b = a;
                                    step_401 = 1;
                                };
                                if (step_401 == 1 && b != null) { step_401 = 2 };
                                if (step_401 == 2) { binds_394 = 'tytyty' } else {
                                    binds_394 = '123';
                                };
                            };
                            {
                                let step_402 = 0;
                                const a = binds_394;
                                if (step_402 == 0 && a != null) { step_402 = 1 };
                                if (step_402 == 1) { binds_394 = 'hghghg' } else {
                                    binds_394 = '123';
                                };
                            };
                            const block_403 = [];
                            let current = 0;
                            const step_404 = this.unique('step');
                            block_403.push(NiceStatement.Var(step_404, NiceExpression.Int(0)));
                            let nullable_405 = false;
                            let last = '';
                            {
                                const temp_406 = econd_391[0];
                                switch (temp_406 && temp_406[1]) {
                                case 22: {
                                    {
                                        const name_407 = temp_406[2];
                                        const t_408 = temp_406[3];
                                        const expr_409 = temp_406[4];
                                        const const_410 = temp_406[5];
                                        {
                                            last = name_407;
                                            nullable_405 = true;
                                            block_403.push(NiceStatement.Const(last, this.nodeToExpression(expr_409)));
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        last = this.unique('temp');
                                        block_403.push(NiceStatement.Const(last, this.nodeToExpression(econd_391[0])));
                                    };
                                }
                                };
                            };
                            while (current < econd_391.length - 1) {
                                const temp_411 = econd_391[current + 1];
                                switch (temp_411 && temp_411[1]) {
                                case 22: {
                                    {
                                        const name_412 = temp_411[2];
                                        const t_413 = temp_411[3];
                                        const expr_414 = temp_411[4];
                                        const const_415 = temp_411[5];
                                        {
                                            block_403.push(NiceStatement.Var(name_412, NiceExpression.Null));
                                            block_403.push(NiceStatement.If(NiceExpression.Binop(NiceExpression.Binop(NiceExpression.Ident(step_404), 95, NiceExpression.Int(current + 0)), 92, NiceExpression.Binop(NiceExpression.Ident(last), 103, (nullable_405)? (NiceExpression.Null) : NiceExpression.Bool(false))), NiceStatement.Block([NiceStatement.Assign(NiceExpression.Ident(name_412), this.nodeToExpression(expr_414)), NiceStatement.Assign(NiceExpression.Ident(step_404), NiceExpression.Int(current + 1)), null]), null));
                                            current++;
                                            last = name_412;
                                            nullable_405 = true;
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        const next = this.unique('temp');
                                        block_403.push(NiceStatement.Var(next, NiceExpression.Null));
                                        block_403.push(NiceStatement.If(NiceExpression.Binop(NiceExpression.Binop(NiceExpression.Ident(step_404), 95, NiceExpression.Int(current + 0)), 92, NiceExpression.Binop(NiceExpression.Ident(last), 103, (nullable_405)? (NiceExpression.Null) : NiceExpression.Bool(false))), NiceStatement.Block([NiceStatement.Assign(NiceExpression.Ident(next), this.nodeToExpression(econd_391[current + 1])), NiceStatement.Assign(NiceExpression.Ident(step_404), NiceExpression.Int(current + 1)), null]), null));
                                        current++;
                                        last = next;
                                        nullable_405 = false;
                                    };
                                }
                                };
                            };
                            block_403.push(NiceStatement.If(NiceExpression.Binop(NiceExpression.Binop(NiceExpression.Ident(step_404), 95, NiceExpression.Int(econd_391.length - 1)), 92, NiceExpression.Binop(NiceExpression.Ident(last), 103, NiceExpression.Null)), NiceStatement.Assign(NiceExpression.Ident(step_404), NiceExpression.Int(econd_391.length)), null));
                            block_403.push(NiceStatement.If(NiceExpression.Binop(NiceExpression.Ident(step_404), 95, NiceExpression.Int(econd_391.length)), this.nodeToStatement(eif_392), this.nodeToStatement(eelse_393)));
                            return NiceStatement.Block(block_403);
                        };
                    }
                } break;

                case 25: {
                    {
                        const expr_416 = temp_260[2];
                        const t_417 = temp_260[3];
                        const v_418 = temp_260[4];
                        const catches_419 = temp_260[5];
                        {
                            let tt = [];
                            let vv = [];
                            for (const c of v_418) vv.push(DataHelper.nameOf(c));
                            let cc = [];
                            for (const c of catches_419) cc.push(this.nodeToStatement(c));
                            return NiceStatement.Try(this.nodeToStatement(expr_416), tt, vv, cc);
                        };
                    }
                } break;

                case 15: {
                    {
                        const value_420 = temp_260[2];
                        {
                            return NiceStatement.Throw(this.nodeToExpression(value_420));
                        };
                    }
                } break;

                case 9: {
                    {
                        const a_421 = temp_260[2];
                        const op_422 = temp_260[3];
                        const b_423 = temp_260[4];
                        {
                            return NiceStatement.Assignop(this.nodeToExpression(a_421), op_422, this.nodeToExpression(b_423));
                        };
                    }
                } break;

                case 8: {
                    {
                        const a_424 = temp_260[2];
                        const op_425 = temp_260[3];
                        const b_426 = temp_260[4];
                        {
                            {
                                const temp_427 = op_425;
                                switch (temp_427) {
                                case 91: {
                                    {
                                        {
                                            return NiceStatement.Assign(this.nodeToExpression(a_424), this.nodeToExpression(b_426));
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        const sa_428 = this.nodeToStatement(a_424);
                                        const sb_429 = this.nodeToStatement(b_426);
                                        if ((sa_428 == null) && (sb_429 == null)) { return null };
                                        if ((sa_428 == null) || (sb_429 == null)) { return ((sa_428) || (sb_429)) };
                                        return NiceStatement.Statements([sa_428, sb_429]);
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                case 17: {
                    {
                        {
                            return NiceStatement.Continue;
                        };
                    }
                } break;

                case 16: {
                    {
                        {
                            return NiceStatement.Break;
                        };
                    }
                } break;

                case 19: {
                    {
                        const econd_430 = temp_260[2];
                        const e_431 = temp_260[3];
                        const pre_432 = temp_260[4];
                        {
                            return NiceStatement.While(this.nodeToExpression(econd_430), this.nodeToStatement(e_431), pre_432);
                        };
                    }
                } break;

                case 18: {
                    {
                        const op_433 = temp_260[2];
                        const postfix_434 = temp_260[3];
                        const e_435 = temp_260[4];
                        {
                            {
                                const temp_436 = op_433;
                                switch (temp_436) {
                                case 87: {
                                    {
                                        {
                                            return NiceStatement.Increment(this.nodeToExpression(e_435));
                                        };
                                    }
                                } break;

                                case 86: {
                                    {
                                        {
                                            return NiceStatement.Decrement(this.nodeToExpression(e_435));
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                case 13: {
                    {
                        const inner_437 = temp_260[2];
                        {
                            const unwrapNestedParens_439 = (inner_438) => { {
                                const temp_440 = inner_438;
                                switch (temp_440 && temp_440[1]) {
                                case 13: {
                                    {
                                        const i_441 = temp_440[2];
                                        {
                                            return unwrapNestedParens_439(i_441);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        return inner_438;
                                    };
                                }
                                };
                            } };
                            return this.nodeToStatement(unwrapNestedParens_439(inner_437));
                        };
                    }
                } break;

                case 31: {
                    {
                        const exprs = temp_260[2];
                        const conds = temp_260[3];
                        const guards = temp_260[4];
                        const cases_442 = temp_260[5];
                        {
                            if (exprs.length > 1) { console.error('Multiple switch values not supported:', e_259, Project.data.get(e_259)) };
                            const s_443 = [];
                            const c = [];
                            if (this.nativeEnums) {
                                const index_444 = this.nodeToExpression(exprs[0]);
                                {
                                    const value_445 = cases_442.length;
                                    let i = 0;
                                    while (i < value_445) {
                                        {
                                            const toCase = (co) => {
                                                const temp_446 = co;
                                                switch (temp_446 && temp_446[1]) {
                                                case 7: {
                                                    {
                                                        {
                                                            return NiceExpression.Null;
                                                        };
                                                    }
                                                } break;

                                                case 40: {
                                                    {
                                                        {
                                                            return NiceExpression.Underscore;
                                                        };
                                                    }
                                                } break;

                                                case 0: {
                                                    {
                                                        const v_447 = temp_446[2];
                                                        {
                                                            return NiceExpression.String(v_447);
                                                        };
                                                    }
                                                } break;

                                                case 5: {
                                                    {
                                                        const v_448 = temp_446[2];
                                                        {
                                                            return NiceExpression.Int(v_448);
                                                        };
                                                    }
                                                } break;

                                                case 6: {
                                                    {
                                                        const v_449 = temp_446[2];
                                                        {
                                                            return NiceExpression.Float(v_449);
                                                        };
                                                    }
                                                } break;

                                                case 2: {
                                                    {
                                                        const v_450 = temp_446[2];
                                                        {
                                                            return NiceExpression.Bool(v_450);
                                                        };
                                                    }
                                                } break;

                                                case 26: {
                                                    {
                                                        const expr_451 = temp_446[2];
                                                        const name_452 = temp_446[3];
                                                        {
                                                            return this.nodeToExpression(co);
                                                        };
                                                    }
                                                } break;

                                                case 8: {
                                                    {
                                                        const a_453 = temp_446[2];
                                                        const op_454 = temp_446[3];
                                                        const b_455 = temp_446[4];
                                                        {
                                                            {
                                                                const temp_456 = op_454;
                                                                switch (temp_456) {
                                                                case 104: {
                                                                    {
                                                                        {
                                                                            return NiceExpression.Binop(toCase(a_453), 104, toCase(b_455));
                                                                        };
                                                                    }
                                                                } break;

                                                                default:
                                                                {
                                                                    {
                                                                        console.error('Unknown native case binop kind:', e_259, Project.mapNames.get(e_259));
                                                                    };
                                                                }
                                                                };
                                                            };
                                                        };
                                                    }
                                                } break;

                                                case 11: {
                                                    {
                                                        const e_457 = temp_446[2];
                                                        const args_458 = temp_446[3];
                                                        const argNames_459 = temp_446[4];
                                                        {
                                                            {
                                                                const temp_460 = e_457;
                                                                switch (temp_460 && temp_460[1]) {
                                                                case 26: {
                                                                    {
                                                                        const expr_461 = temp_460[2];
                                                                        const name_462 = temp_460[3];
                                                                        {
                                                                            const a_463 = [];
                                                                            {
                                                                                const value_464 = args_458.length;
                                                                                let arg = 0;
                                                                                while (arg < value_464) {
                                                                                    {
                                                                                        const temp_465 = args_458[arg];
                                                                                        switch (temp_465 && temp_465[1]) {
                                                                                        case 1: {
                                                                                            {
                                                                                                const name_466 = temp_465[2];
                                                                                                {
                                                                                                    a_463.push(NiceExpression.Ident(this.unique(name_466, args_458[arg])));
                                                                                                };
                                                                                            }
                                                                                        } break;

                                                                                        case 40: {
                                                                                            {
                                                                                                {
                                                                                                    a_463.push(NiceExpression.Underscore);
                                                                                                };
                                                                                            }
                                                                                        } break;

                                                                                        default:
                                                                                        {
                                                                                            {
                                                                                                console.log('Unknown native case extract value kind:', args_458[arg]);
                                                                                            };
                                                                                        }
                                                                                        };
                                                                                    };
                                                                                    arg++;
                                                                                };
                                                                            };
                                                                            return NiceExpression.Call(this.nodeToExpression(e_457), a_463);
                                                                        };
                                                                    }
                                                                } break;

                                                                default:
                                                                {
                                                                    {
                                                                        console.error('Unknown case extract kind:', e_457, Project.mapNames.get(e_457));
                                                                    };
                                                                }
                                                                };
                                                            };
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        console.error('Unknown native enum case kind:', co, Project.data.get(co));
                                                    };
                                                }
                                                };
                                            };
                                            c.push([toCase(conds[i])]);
                                            s_443.push(this.nodeToStatement(cases_442[i]));
                                        };
                                        i++;
                                    };
                                };
                                return NiceStatement.Switch(index_444, c, s_443);
                            };
                            const temp_467 = this.unique('temp');
                            const value_468 = this.nodeToExpression(exprs[0]);
                            let index_469 = NiceExpression.Ident(temp_467);
                            let i_470 = 0;
                            for (const ec of cases_442) {
                                const block_471 = [];
                                const co_472 = conds[i_470];
                                const cx = [];
                                const addTag = (co_473) => {
                                    const temp_474 = co_473;
                                    switch (temp_474 && temp_474[1]) {
                                    case 7: {
                                        {
                                            {
                                                cx.push(NiceExpression.Null);
                                            };
                                        }
                                    } break;

                                    case 40: {
                                        {
                                            {
                                            };
                                        }
                                    } break;

                                    case 0: {
                                        {
                                            const v_475 = temp_474[2];
                                            {
                                                cx.push(NiceExpression.String(v_475));
                                            };
                                        }
                                    } break;

                                    case 5: {
                                        {
                                            const v_476 = temp_474[2];
                                            {
                                                cx.push(NiceExpression.Int(v_476));
                                            };
                                        }
                                    } break;

                                    case 6: {
                                        {
                                            const v_477 = temp_474[2];
                                            {
                                                cx.push(NiceExpression.Float(v_477));
                                            };
                                        }
                                    } break;

                                    case 2: {
                                        {
                                            const v_478 = temp_474[2];
                                            {
                                                cx.push(NiceExpression.Bool(v_478));
                                            };
                                        }
                                    } break;

                                    case 11: {
                                        {
                                            const e_479 = temp_474[2];
                                            const args_480 = temp_474[3];
                                            const argNames_481 = temp_474[4];
                                            {
                                                {
                                                    const temp_482 = e_479;
                                                    switch (temp_482 && temp_482[1]) {
                                                    case 26: {
                                                        {
                                                            const expr_483 = temp_482[2];
                                                            const name_484 = temp_482[3];
                                                            {
                                                                cx.push(this.getTag(Project.mapNames.get(expr_483), name_484));
                                                                index_469 = NiceExpression.Binop(NiceExpression.Ident(temp_467), 92, NiceExpression.Index(NiceExpression.Ident(temp_467), NiceExpression.Int(1)));
                                                                {
                                                                    const value_485 = args_480.length;
                                                                    let arg = 0;
                                                                    while (arg < value_485) {
                                                                        {
                                                                            const temp_486 = args_480[arg];
                                                                            switch (temp_486 && temp_486[1]) {
                                                                            case 1: {
                                                                                {
                                                                                    const name_487 = temp_486[2];
                                                                                    {
                                                                                        block_471.push(NiceStatement.Const(this.unique(name_487, args_480[arg]), NiceExpression.Index(NiceExpression.Ident(temp_467), NiceExpression.Int(2 + arg))));
                                                                                    };
                                                                                }
                                                                            } break;

                                                                            case 40: {
                                                                                {
                                                                                    {
                                                                                        {
                                                                                        };
                                                                                    };
                                                                                }
                                                                            } break;

                                                                            default:
                                                                            {
                                                                                {
                                                                                    console.log('Unknown case extract value kind:', arg);
                                                                                };
                                                                            }
                                                                            };
                                                                        };
                                                                        arg++;
                                                                    };
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            console.error('Unknown case extract kind:', e_479, Project.mapNames.get(e_479));
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 26: {
                                        {
                                            const expr_488 = temp_474[2];
                                            const name_489 = temp_474[3];
                                            {
                                                cx.push(this.getTag(Project.mapNames.get(expr_488), name_489));
                                            };
                                        }
                                    } break;

                                    case 8: {
                                        {
                                            const a_490 = temp_474[2];
                                            const op_491 = temp_474[3];
                                            const b_492 = temp_474[4];
                                            {
                                                {
                                                    const temp_493 = op_491;
                                                    switch (temp_493) {
                                                    case 104: {
                                                        {
                                                            {
                                                                addTag(a_490);
                                                                addTag(b_492);
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            console.error('Unknown case binop kind:', e_259, Project.mapNames.get(e_259));
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            console.error('Unknown case kind:', co_473, Project.data.get(co_473));
                                        };
                                    }
                                    };
                                };
                                addTag(co_472);
                                c.push(cx);
                                block_471.push(this.nodeToStatement(ec));
                                s_443.push(NiceStatement.Block(block_471));
                                i_470++;
                            };
                            return NiceStatement.Block([NiceStatement.Const(temp_467, value_468), NiceStatement.Switch(index_469, c, s_443)]);
                        };
                    }
                } break;

                case 23: {
                    {
                        const vars_494 = temp_260[2];
                        {
                            const s_495 = [];
                            for (const v of vars_494) s_495.push(this.nodeToStatement(v));
                            return NiceStatement.Statements(s_495);
                        };
                    }
                } break;

                case 30: {
                    {
                        const v_496 = temp_260[2];
                        const index_497 = temp_260[3];
                        {
                            return NiceStatement.Statements([this.nodeToStatement(v_496), this.nodeToStatement(index_497)]);
                        };
                    }
                } break;

                case 1: {
                    {
                        const name_498 = temp_260[2];
                        {
                        };
                    }
                } break;

                case 21: {
                    {
                        {
                        };
                    }
                } break;

                case 0: {
                    {
                        {
                        };
                    }
                } break;

                case 2: {
                    {
                        {
                        };
                    }
                } break;

                case 5: {
                    {
                        {
                        };
                    }
                } break;

                case 6: {
                    {
                        {
                        };
                    }
                } break;

                case 7: {
                    {
                        {
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown node type for statement:', e_259, Project.data.get(e_259));
                    };
                }
                };
            };
            return null;
        } };
        getTag(enumNode, name_499) { {
            {
                const temp_500 = enumNode;
                switch (temp_500 && temp_500[1]) {
                case 34: {
                    {
                        const t_501 = temp_500[2];
                        const fields_502 = temp_500[3];
                        const valuesType_503 = temp_500[4];
                        {
                            let i_504 = 0;
                            for (const f of fields_502) {
                                {
                                    const temp_505 = f;
                                    switch (temp_505 && temp_505[1]) {
                                    case 1: {
                                        {
                                            const n = temp_505[2];
                                            {
                                                if (n == name_499) { return NiceExpression.Int(i_504) };
                                            };
                                        }
                                    } break;

                                    case 11: {
                                        {
                                            const e_506 = temp_505[2];
                                            {
                                                {
                                                    const temp_507 = e_506;
                                                    switch (temp_507 && temp_507[1]) {
                                                    case 1: {
                                                        {
                                                            const n_508 = temp_507[2];
                                                            {
                                                                if (n_508 == name_499) { return NiceExpression.Int(i_504) };
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 8: {
                                        {
                                            const a_509 = temp_505[2];
                                            const op_510 = temp_505[3];
                                            const b_511 = temp_505[4];
                                            {
                                                {
                                                    const temp_512 = a_509;
                                                    switch (temp_512 && temp_512[1]) {
                                                    case 1: {
                                                        {
                                                            const n_513 = temp_512[2];
                                                            {
                                                                if (n_513 == name_499) { return this.nodeToExpression(b_511) };
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 41: {
                                        {
                                            {
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            console.error('Unknown enum tag kind:', f);
                                        };
                                    }
                                    };
                                };
                                i_504++;
                            };
                        };
                    }
                } break;
                };
            };
        } };
        getAtt(atts_514, atname) { {
            if (atts_514 != null && atts_514.length > 0) { for (const att of atts_514) {
                if (att.name == atname) { return att };
            } };
            return null;
        } };
        hasAttribute(e_515, atname_516) { {
            const atts_517 = Project.mapAttributes.get(e_515);
            if (atts_517 != null && atts_517.length > 0) { for (const att of atts_517) {
                if (att.name == atname_516) { return true };
            } };
            return false;
        } };
        removeAttribute(atts_518, attName) { {
            if (atts_518 != null && atts_518.length > 0) {
                const value_519 = atts_518.length;
                let att = 0;
                while (att < value_519) {
                    {
                        if (atts_518[att].name == attName) {
                            atts_518.splice(att, 1);
                            return;
                        };
                    };
                    att++;
                };
            };
        } };
        pushScope() { {
            this.scopes.push(new Map());
        } };
        popScope() { {
            this.scopes.pop();
        } };
        hasInScope(name_520) { {
            for (const scope of this.scopes) {
                if (scope.get(name_520) != null) { return true };
            };
            return false;
        } };
        addToScope(name_521) { {
            this.scopes[this.scopes.length - 1].set(name_521, true);
        } };
        unique(name_522, node) { {
            let uname_523 = name_522;
            while (this.hasInScope(uname_523) || (this.keywords.indexOf(uname_523) != -1)) uname_523 = name_522 + '_' + (++this.id);
            this.addToScope(uname_523);
            this.parentNames.set(node, uname_523);
            return uname_523;
        } };
        fillStatement(e_524) { {
            return this.nodeToStatement(e_524);
        } };
        renameClassFields(fields_525) { {
            this.pushScope();
            for (const f of fields_525) {
                const temp_526 = f;
                switch (temp_526 && temp_526[1]) {
                case 22: {
                    {
                        const name_527 = temp_526[2];
                        const t_528 = temp_526[3];
                        const expr_529 = temp_526[4];
                        const const_530 = temp_526[5];
                        {
                            if (this.parentNames.get(f) == null) { this.unique(name_527, f) };
                        };
                    }
                } break;

                case 20: {
                    {
                        const name_531 = temp_526[2];
                        const expr_532 = temp_526[3];
                        const vars_533 = temp_526[4];
                        const rettype_534 = temp_526[5];
                        {
                            if (name_531 == 'new') { this.parentNames.set(f, 'new') } else if (this.parentNames.get(f) == null) { this.unique(name_531, f) };
                        };
                    }
                } break;

                case 41: {
                    {
                        const field_535 = temp_526[2];
                        {
                            {
                                const temp_536 = field_535;
                                switch (temp_536 && temp_536[1]) {
                                case 22: {
                                    {
                                        const name_537 = temp_536[2];
                                        const t_538 = temp_536[3];
                                        const expr_539 = temp_536[4];
                                        const const_540 = temp_536[5];
                                        {
                                            if (this.parentNames.get(field_535) == null) { this.unique(name_537, field_535) };
                                        };
                                    }
                                } break;

                                case 20: {
                                    {
                                        const name_541 = temp_536[2];
                                        const expr_542 = temp_536[3];
                                        const vars_543 = temp_536[4];
                                        const rettype_544 = temp_536[5];
                                        {
                                            if (this.parentNames.get(field_535) == null) { this.unique(name_541, field_535) };
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;
                };
            };
            this.popScope();
        } };
        getClassDotField(expr_545, name_546) { {
            {
                const temp_547 = expr_545;
                switch (temp_547 && temp_547[1]) {
                case 24: {
                    {
                        const t_548 = temp_547[2];
                        const ext_549 = temp_547[3];
                        const impl_550 = temp_547[4];
                        const fields_551 = temp_547[5];
                        const external_552 = temp_547[6];
                        {
                            for (const f of fields_551) {
                                const temp_553 = f;
                                switch (temp_553 && temp_553[1]) {
                                case 41: {
                                    {
                                        const sf = temp_553[2];
                                        {
                                            if (DataHelper.nameOf(sf) == name_546) { return ((this.parentNames.get(sf)) || (name_546)) };
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                case 34: {
                    {
                        const t_554 = temp_547[2];
                        const fields_555 = temp_547[3];
                        const valuesType_556 = temp_547[4];
                        {
                            for (const f of fields_555) {
                                const temp_557 = f;
                                switch (temp_557 && temp_557[1]) {
                                case 41: {
                                    {
                                        const sf_558 = temp_557[2];
                                        {
                                            if (DataHelper.nameOf(sf_558) == name_546) { return ((this.parentNames.get(sf_558)) || (name_546)) };
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                default:
                {
                    {
                        console.log('????');
                    };
                }
                };
            };
        } };
        wrapType(type_559, node_560) { {
            this.project.mapTypes.set(node_560, type_559);
            return node_560;
        } };
    }
    Normalizer.normalize = (collected, keywords, nativeEnums) => { {
            return (new Normalizer(collected, keywords, nativeEnums)).project;
        } };
    var Inferrer = class {
    }
    var Scoper = class {
    }
    Scoper.fillScopesRunMacroAndConvertToTypedNode = (files) => { {
        } };
    var GenJs = class {
        constructor(project_561) {
            this.buffer = []
            this.tabs = '\t\t'
            this.last = ''
        {
            this.project = project_561;
        } };
        stringify() { {
            let out = '{\n\t"use strict"\n\tconst $global$ = typeof(window) === "undefined"?global:window;var version ="0.0.0";';
            for (const e of this.project.enumsSimple) {
                out += '\n\t' + 'var ' + e.name + ' = {}';
                for (const v of e.staticVars) {
                    const temp_562 = v;
                    switch (temp_562 && temp_562[1]) {
                    case 4: {
                        {
                            const name_563 = temp_562[2];
                            const expr_564 = temp_562[3];
                            {
                                out += '\n\t' + e.name + '.' + name_563;
                                if (expr_564 != null) { out += ' = ' + this.printExpression(expr_564) };
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_565 = temp_562[2];
                            const expr_566 = temp_562[3];
                            {
                                out += '\n\t' + e.name + '.' + name_565;
                                out += ' = ' + this.printExpression(expr_566);
                            };
                        }
                    } break;
                    };
                };
                for (const v of e.staticMethods) {
                    const temp_567 = v;
                    switch (temp_567 && temp_567[1]) {
                    case 6: {
                        {
                            const name_568 = temp_567[2];
                            const expr_569 = temp_567[3];
                            const args_570 = temp_567[4];
                            const defaults_571 = temp_567[5];
                            {
                                out += '\n\t' + e.name + '.' + name_568 + ' = ';
                                out += this.printFunctionArguments(args_570, defaults_571) + ' => { ' + this.printStatement(expr_569) + ' };';
                            };
                        }
                    } break;
                    };
                };
            };
            for (const e of this.project.enumsComplex) {
                out += '\n\t' + 'var ' + e.name + ' = {}';
                let i_572 = 0;
                for (const name of e.names) {
                    out += '\n\t' + e.name + '.' + name + ' = ';
                    if (e.constructors[i_572] != null) {
                        out += '(' + e.constructors[i_572].join(',') + ')=>["';
                        out += name + '",' + i_572 + ',' + e.constructors[i_572].join(',');
                        out += '];';
                    } else out += '["' + name + '",' + i_572 + '];';
                    i_572++;
                };
            };
            for (const i of this.project.interfaces) {
                throw i;
            };
            for (const c of this.project.classes) {
                if (c.external) {
                    if (c.jsRequire != null) {
                        out += '\n\t' + 'var ' + c.name + ' = require("' + c.jsRequire + '")';
                        continue;
                    };
                    out += '\n\t' + 'var ' + c.name + ' = $global$.' + (((c.jsNative) || (c.name)));
                    continue;
                };
                out += '\n\t' + 'var ' + c.name + ' = class {';
                for (const v of c.methods) {
                    const temp_573 = v;
                    switch (temp_573 && temp_573[1]) {
                    case 6: {
                        {
                            const name_574 = temp_573[2];
                            const expr_575 = temp_573[3];
                            const args_576 = temp_573[4];
                            {
                                if (name_574 == null || name_574 == 'new') { out += '\n\t\tconstructor' } else out += '\n\t\t' + name_574;
                                out += '(' + args_576.join(', ') + ') { ';
                                if (name_574 == null || name_574 == 'new') {
                                    for (const v of c.vars) {
                                        const temp_577 = v;
                                        switch (temp_577 && temp_577[1]) {
                                        case 4: {
                                            {
                                                const name_578 = temp_577[2];
                                                const expr_579 = temp_577[3];
                                                {
                                                    if (expr_579 != null) { out += '\n\t\t\tthis.' + name_578 + ' = ' + this.printExpression(expr_579) + '' };
                                                };
                                            }
                                        } break;

                                        case 5: {
                                            {
                                                const name_580 = temp_577[2];
                                                const expr_581 = temp_577[3];
                                                {
                                                    out += '\n\t\t\tthis.' + name_580 + ' = ' + this.printExpression(expr_581) + '';
                                                };
                                            }
                                        } break;
                                        };
                                    };
                                    out += '\n\t\t';
                                };
                                out += this.printStatement(expr_575) + ' };';
                            };
                        }
                    } break;
                    };
                };
                out += '\n\t}';
                for (const v of c.staticVars) {
                    const temp_582 = v;
                    switch (temp_582 && temp_582[1]) {
                    case 4: {
                        {
                            const name_583 = temp_582[2];
                            const expr_584 = temp_582[3];
                            {
                                out += '\n\t' + c.name + '.' + name_583;
                                if (expr_584 != null) { out += ' = ' + this.printExpression(expr_584) };
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_585 = temp_582[2];
                            const expr_586 = temp_582[3];
                            {
                                out += '\n\t' + c.name + '.' + name_585;
                                out += ' = ' + this.printExpression(expr_586);
                            };
                        }
                    } break;
                    };
                };
                for (const v of c.staticMethods) {
                    const temp_587 = v;
                    switch (temp_587 && temp_587[1]) {
                    case 6: {
                        {
                            const name_588 = temp_587[2];
                            const expr_589 = temp_587[3];
                            const args_590 = temp_587[4];
                            const defaults_591 = temp_587[5];
                            {
                                out += '\n\t' + c.name + '.' + name_588 + ' = ';
                                out += this.printFunctionArguments(args_590, defaults_591) + ' => { ' + this.printStatement(expr_589) + ' };';
                            };
                        }
                    } break;
                    };
                };
            };
            for (const g of this.project.globalFuncs) {
                throw g;
            };
            for (const g of this.project.globalVars) {
                throw g;
            };
            for (const init of this.project.init) {
                out += '\n\t{\n\t\t';
                out += this.printStatement(init);
                out += '\n\t}';
            };
            return out + '\n}';
        } };
        pushTab() { this.tabs += '\t' };
        popTab() { this.tabs = this.tabs.substring(0, this.tabs.length - 1) };
        printBlock(s_592) { {
            {
                const temp_593 = s_592;
                switch (temp_593 && temp_593[1]) {
                case 1: {
                    {
                        const el_594 = temp_593[2];
                        {
                            if (el_594.length == 1) { return '{ ' + this.printStatement(el_594[0]) + ' }' };
                            if (el_594.length == 0) { return '{}' };
                            return this.printStatement(s_592);
                        };
                    }
                } break;

                default:
                {
                    {
                        return '{ ' + this.printStatement(s_592) + ' }';
                    };
                }
                };
            };
        } };
        printStatement(s_595) { {
            this.last = ((s_595) || (this.last));
            {
                const temp_596 = s_595;
                switch (temp_596 && temp_596[1]) {
                case 0: {
                    {
                        const els_597 = temp_596[2];
                        {
                            let r = '';
                            for (const s of els_597) if (s != null) { r += '\n' + this.tabs + this.printStatement(s) + ';' };
                            return r;
                        };
                    }
                } break;

                case 20: {
                    {
                        {
                            return 'break';
                        };
                    }
                } break;

                case 19: {
                    {
                        {
                            return 'continue';
                        };
                    }
                } break;

                case 1: {
                    {
                        const el_598 = temp_596[2];
                        {
                            this.pushTab();
                            let r_599 = '{';
                            for (const e of el_598) {
                                const temp_600 = e;
                                switch (temp_600 && temp_600[1]) {
                                case null: {
                                    {
                                        {
                                        };
                                    }
                                } break;

                                case 0: {
                                    {
                                        const els_601 = temp_600[2];
                                        {
                                            for (const s of els_601) if (s != null) { r_599 += '\n' + this.tabs + this.printStatement(s) + ';' };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        r_599 += '\n' + this.tabs + this.printStatement(e) + ';';
                                    };
                                }
                                };
                            };
                            this.popTab();
                            return r_599 + '\n' + this.tabs + '}';
                        };
                    }
                } break;

                case 3: {
                    {
                        const e_602 = temp_596[2];
                        const args_603 = temp_596[3];
                        {
                            return 'new ' + this.printExpression(e_602) + this.printCallArguments(args_603);
                        };
                    }
                } break;

                case 5: {
                    {
                        const name_604 = temp_596[2];
                        const expr_605 = temp_596[3];
                        {
                            return 'const ' + name_604 + (expr_605 == (null)? ('') : ' = ' + this.printExpression(expr_605));
                        };
                    }
                } break;

                case 4: {
                    {
                        const name_606 = temp_596[2];
                        const expr_607 = temp_596[3];
                        {
                            return 'let ' + name_606 + (expr_607 == (null)? ('') : ' = ' + this.printExpression(expr_607));
                        };
                    }
                } break;

                case 6: {
                    {
                        const name_608 = temp_596[2];
                        const expr_609 = temp_596[3];
                        const args_610 = temp_596[4];
                        const defaults_611 = temp_596[5];
                        const async_612 = temp_596[6];
                        {
                            return 'const ' + name_608 + ' = ' + (((async_612 == true))? ('async ') : '') + this.printFunctionArguments(args_610, defaults_611) + ' => ' + this.printBlock(expr_609);
                        };
                    }
                } break;

                case 7: {
                    {
                        const e_613 = temp_596[2];
                        {
                            if (e_613 == null) { return 'return' };
                            return 'return ' + this.printExpression(e_613);
                        };
                    }
                } break;

                case 8: {
                    {
                        const econd_614 = temp_596[2];
                        const eif_615 = temp_596[3];
                        const eelse_616 = temp_596[4];
                        {
                            let r_617 = 'if (' + this.printExpression(econd_614) + ') ' + this.printBlock(eif_615);
                            if (eelse_616 != null) { r_617 += ' else ' + this.printStatement(eelse_616) };
                            return r_617;
                        };
                    }
                } break;

                case 2: {
                    {
                        const e_618 = temp_596[2];
                        const args_619 = temp_596[3];
                        {
                            return this.printExpression(e_618) + this.printCallArguments(args_619);
                        };
                    }
                } break;

                case 9: {
                    {
                        const expr_620 = temp_596[2];
                        const t_621 = temp_596[3];
                        const v_622 = temp_596[4];
                        const catches_623 = temp_596[5];
                        {
                            this.pushTab();
                            let r_624 = 'try {\n' + this.tabs;
                            r_624 += this.printStatement(expr_620);
                            this.popTab();
                            r_624 += '\n' + this.tabs + '} catch (' + v_622[0] + ') {\n' + this.tabs + '\t';
                            this.pushTab();
                            r_624 += this.printStatement(catches_623[0]);
                            this.popTab();
                            return r_624 + '\n' + this.tabs + '}';
                        };
                    }
                } break;

                case 11: {
                    {
                        const a_625 = temp_596[2];
                        const v_626 = temp_596[3];
                        {
                            return this.printExpression(a_625) + ' = ' + this.printExpression(v_626);
                        };
                    }
                } break;

                case 10: {
                    {
                        const e_627 = temp_596[2];
                        {
                            return 'throw ' + this.printExpression(e_627);
                        };
                    }
                } break;

                case 14: {
                    {
                        const name_628 = temp_596[2];
                        const over_629 = temp_596[3];
                        const by_630 = temp_596[4];
                        {
                            return 'for (const ' + name_628 + ' of ' + this.printExpression(over_629) + ') ' + this.printStatement(by_630);
                        };
                    }
                } break;

                case 16: {
                    {
                        const e_631 = temp_596[2];
                        {
                            return this.printExpression(e_631) + '++';
                        };
                    }
                } break;

                case 17: {
                    {
                        const e_632 = temp_596[2];
                        {
                            return this.printExpression(e_632) + '--';
                        };
                    }
                } break;

                case 15: {
                    {
                        const econd_633 = temp_596[2];
                        const e_634 = temp_596[3];
                        const pre_635 = temp_596[4];
                        {
                            if (pre_635) { return 'while (' + this.printExpression(econd_633) + ') ' + this.printStatement(e_634) };
                            return 'do {' + this.printStatement(e_634) + '} while (' + this.printExpression(econd_633) + ')';
                        };
                    }
                } break;

                case 12: {
                    {
                        const a_636 = temp_596[2];
                        const op_637 = temp_596[3];
                        const value_638 = temp_596[4];
                        {
                            return this.printExpression(a_636) + ' ' + Token.stringify(op_637) + '= ' + this.printExpression(value_638);
                        };
                    }
                } break;

                case 13: {
                    {
                        const expr_639 = temp_596[2];
                        const name_640 = temp_596[3];
                        {
                            return this.printExpression(expr_639) + '.' + name_640;
                        };
                    }
                } break;

                case 18: {
                    {
                        const expr_641 = temp_596[2];
                        const cases_642 = temp_596[3];
                        const statements_643 = temp_596[4];
                        {
                            let r_644 = 'switch (' + this.printExpression(expr_641) + ') {';
                            {
                                const value_645 = cases_642.length;
                                let i = 0;
                                while (i < value_645) {
                                    if (cases_642[i].length > 0) {
                                        r_644 += '\n' + this.tabs;
                                        for (const cc of cases_642[i]) r_644 += 'case ' + this.printExpression(cc) + ': ';
                                        this.pushTab();
                                        r_644 += '{\n' + this.tabs;
                                        r_644 += this.printStatement(statements_643[i]);
                                        this.popTab();
                                        r_644 += '\n' + this.tabs + '} break;\n' + this.tabs;
                                    };
                                    i++;
                                };
                            };
                            {
                                const value_646 = cases_642.length;
                                let i = 0;
                                while (i < value_646) {
                                    if (cases_642[i].length == 0) {
                                        r_644 += '\n' + this.tabs + 'default: ';
                                        r_644 += '\n' + this.tabs;
                                        r_644 += this.printStatement(statements_643[i]);
                                        r_644 += '\n' + this.tabs;
                                    };
                                    i++;
                                };
                            };
                            return r_644 + '}';
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown statement kind:', (s_595 || [])[0]);
                    };
                }
                };
            };
        } };
        printCallArguments(args_647) { {
            return '(' + (() => {
                const result_648 = [];
                const value_649 = args_647;
                for (const a of value_649) result_648.push(this.printExpression(a));
                return result_648;
            })().join(', ') + ')';
        } };
        printFunctionArguments(args_650, defaults_651) { {
            return '(' + (() => {
                const result_652 = [];
                const value_653 = args_650.length;
                let a = -1;
                while ((a + 1) < value_653) {
                    a++;
                    result_652.push(args_650[a] + (((defaults_651 != null && defaults_651[a] != null))? (' = ' + this.printExpression(defaults_651[a])) : ''));
                };
                return result_652;
            })().join(', ') + ')';
        } };
        printExpression(e_654) { {
            this.last = ((e_654) || (this.last));
            {
                const temp_655 = e_654;
                switch (temp_655 && temp_655[1]) {
                case 5: {
                    {
                        {
                            return 'null';
                        };
                    }
                } break;

                case 6: {
                    {
                        {
                            return 'this';
                        };
                    }
                } break;

                case 4: {
                    {
                        const name_656 = temp_655[2];
                        {
                            return name_656;
                        };
                    }
                } break;

                case 1: {
                    {
                        const v_657 = temp_655[2];
                        {
                            return '' + v_657;
                        };
                    }
                } break;

                case 2: {
                    {
                        const v_658 = temp_655[2];
                        {
                            return '' + v_658;
                        };
                    }
                } break;

                case 0: {
                    {
                        const s_659 = temp_655[2];
                        {
                            const s_660 = s_659.split('');
                            const charsOut = [];
                            while (s_660.length > 0) {
                                {
                                    const temp_661 = s_660[0];
                                    switch (temp_661) {
                                    case '\'': {
                                        {
                                            {
                                                charsOut.push('\\');
                                                charsOut.push('\'');
                                                s_660.shift();
                                            };
                                        }
                                    } break;

                                    case '\n': {
                                        {
                                            {
                                                charsOut.push('\\n');
                                                s_660.shift();
                                            };
                                        }
                                    } break;

                                    case '\r': {
                                        {
                                            {
                                                charsOut.push('\\r');
                                                s_660.shift();
                                            };
                                        }
                                    } break;

                                    case '\\': {
                                        {
                                            {
                                                s_660.shift();
                                                if (s_660[0] == '\\') {
                                                    charsOut.push('\\');
                                                    charsOut.push('\\');
                                                    s_660.shift();
                                                } else if (s_660[0] == '\'') {
                                                    charsOut.push('\\');
                                                    charsOut.push('\'');
                                                    s_660.shift();
                                                } else {
                                                    charsOut.push('\\');
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            charsOut.push(s_660[0]);
                                            s_660.shift();
                                        };
                                    }
                                    };
                                };
                            };
                            return '\'' + charsOut.join('') + '\'';
                        };
                    }
                } break;

                case 3: {
                    {
                        const v_662 = temp_655[2];
                        {
                            return '' + v_662;
                        };
                    }
                } break;

                case 7: {
                    {
                        const expr_663 = temp_655[2];
                        const name_664 = temp_655[3];
                        {
                            return this.printExpression(expr_663) + '.' + name_664;
                        };
                    }
                } break;

                case 8: {
                    {
                        const e_665 = temp_655[2];
                        const args_666 = temp_655[3];
                        {
                            return this.printExpression(e_665) + this.printCallArguments(args_666);
                        };
                    }
                } break;

                case 9: {
                    {
                        const name_667 = temp_655[2];
                        const tag_668 = temp_655[3];
                        const args_669 = temp_655[4];
                        {
                            return name_667 + '.' + 'tag' + this.printCallArguments(args_669);
                        };
                    }
                } break;

                case 12: {
                    {
                        const name_670 = temp_655[2];
                        const expr_671 = temp_655[3];
                        const args_672 = temp_655[4];
                        const defaults_673 = temp_655[5];
                        {
                            if (name_670 == null) { return this.printFunctionArguments(args_672, defaults_673) + ' => ' + this.printBlock(expr_671) };
                            return '((() => { const ' + name_670 + ' = ' + this.printFunctionArguments(args_672, defaults_673) + ' => ' + this.printBlock(expr_671) + '; return ' + name_670 + ' })())';
                        };
                    }
                } break;

                case 13: {
                    {
                        const expr_674 = temp_655[2];
                        const args_675 = temp_655[3];
                        const defaults_676 = temp_655[4];
                        {
                            return this.printFunctionArguments(args_675, defaults_676) + ' => (' + this.printExpression(expr_674) + ')';
                        };
                    }
                } break;

                case 10: {
                    {
                        const e_677 = temp_655[2];
                        const args_678 = temp_655[3];
                        {
                            return 'new ' + this.printExpression(e_677) + this.printCallArguments(args_678);
                        };
                    }
                } break;

                case 16: {
                    {
                        const el_679 = temp_655[2];
                        {
                            return '[' + (() => {
                                const result_680 = [];
                                const value_681 = el_679;
                                for (const a of value_681) result_680.push(this.printExpression(a));
                                return result_680;
                            })().join(', ') + ']';
                        };
                    }
                } break;

                case 18: {
                    {
                        const op_682 = temp_655[2];
                        const postfix_683 = temp_655[3];
                        const e_684 = temp_655[4];
                        {
                            if (postfix_683) { return this.printExpression(e_684) + Token.stringify(op_682) };
                            return Token.stringify(op_682) + this.printExpression(e_684);
                        };
                    }
                } break;

                case 19: {
                    {
                        const nullable_685 = temp_655[2];
                        const othewise_686 = temp_655[3];
                        {
                            return '((' + this.printExpression(nullable_685) + ') || (' + this.printExpression(othewise_686) + '))';
                        };
                    }
                } break;

                case 14: {
                    {
                        const e_687 = temp_655[2];
                        {
                            return '(' + this.printExpression(e_687) + ')';
                        };
                    }
                } break;

                case 11: {
                    {
                        const a_688 = temp_655[2];
                        const op_689 = temp_655[3];
                        const b_690 = temp_655[4];
                        {
                            return this.printExpression(a_688) + ' ' + Token.stringify(op_689) + ' ' + this.printExpression(b_690);
                        };
                    }
                } break;

                case 21: {
                    {
                        const expr_691 = temp_655[2];
                        const index_692 = temp_655[3];
                        {
                            return this.printExpression(expr_691) + '[' + this.printExpression(index_692) + ']';
                        };
                    }
                } break;

                case 20: {
                    {
                        const econd_693 = temp_655[2];
                        const eif_694 = temp_655[3];
                        const eelse_695 = temp_655[4];
                        {
                            let r_696 = '';
                            try {
                                {
                                    r_696 += '(' + this.printExpression(econd_693) + ')?';
                                    r_696 += ' (' + this.printExpression(eif_694) + ')';
                                    r_696 += ' : ' + this.printExpression(eelse_695);
                                    return r_696;
                                }
                            } catch (error) {
                                {
                                    console.log('If =>', e_654, error);
                                    return r_696 + '<!-- If => error -->';
                                }
                            };
                        };
                    }
                } break;

                case 15: {
                    {
                        const names_697 = temp_655[2];
                        const el_698 = temp_655[3];
                        {
                            return '{' + (() => {
                                const result_699 = [];
                                const value_700 = el_698.length;
                                let i = -1;
                                while ((i + 1) < value_700) {
                                    i++;
                                    result_699.push(((names_697[i]) + ':' + this.printExpression(el_698[i])));
                                };
                                return result_699;
                            })().join(', ') + '}';
                        };
                    }
                } break;

                case 17: {
                    {
                        const keys_701 = temp_655[2];
                        const values_702 = temp_655[3];
                        {
                            if (keys_701.length == 0) { return 'new Map()' };
                            return 'new Map([' + (() => {
                                const result_703 = [];
                                const value_704 = keys_701.length;
                                let i = -1;
                                while ((i + 1) < value_704) {
                                    i++;
                                    result_703.push('[' + this.printExpression(keys_701[i]) + ', ' + this.printExpression(values_702[i]) + ']');
                                };
                                return result_703;
                            })().join(', ') + '])';
                        };
                    }
                } break;

                case 22: {
                    {
                        const a_705 = temp_655[2];
                        const op_706 = temp_655[3];
                        const value_707 = temp_655[4];
                        {
                            return this.printExpression(a_705) + ' ' + Token.stringify(op_706) + '= ' + this.printExpression(value_707);
                        };
                    }
                } break;

                case 23: {
                    {
                        const kind_708 = temp_655[2];
                        const args_709 = temp_655[3];
                        const s_710 = temp_655[4];
                        {
                            {
                                const temp_711 = kind_708;
                                switch (temp_711) {
                                case 0: {
                                    {
                                        {
                                            return '((' + this.printExpression(args_709[0]) + ') ' + s_710 + ' (' + this.printExpression(args_709[1]) + '))';
                                        };
                                    }
                                } break;

                                case 1: {
                                    {
                                        {
                                            return s_710 + this.printCallArguments(args_709);
                                        };
                                    }
                                } break;

                                case 2: {
                                    {
                                        {
                                            return '(' + s_710 + '(' + this.printExpression(args_709[0]) + '))';
                                        };
                                    }
                                } break;

                                case 3: {
                                    {
                                        {
                                            return '((' + this.printExpression(args_709[1]) + ')' + s_710 + ')';
                                        };
                                    }
                                } break;

                                case 4: {
                                    {
                                        {
                                            return s_710;
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                case 25: {
                    {
                        const expr_712 = temp_655[2];
                        {
                            return 'await ' + this.printExpression(expr_712);
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown expression kind:', (e_654 || [])[0], e_654, this.last);
                        return '<!-- undefined -->';
                    };
                }
                };
            };
        } };
    }
    GenJs.reserved = ['with', 'const', 'instanceof', 'typeof', 'delete', 'undefined', 'package', 'async', 'await', 'arguments']
    GenJs.stringifyProject = (project) => { {
            return new GenJs(project).stringify();
        } };
    var GenC = class {
        constructor(project_715) {
            this.forwardDeclarations = []
            this.forwardFunctions = []
            this.tabs = ''
            this.last = ''
        {
            this.project = project_715;
        } };
        stringify() { {
            let out_716 = '';
            this.forwardDeclarations.push('#include <stdint.h>');
            this.forwardDeclarations.push('#ifdef __cplusplus');
            this.forwardDeclarations.push('extern "C" {');
            this.forwardDeclarations.push('#endif');
            this.forwardDeclarations.push('#define try');
            this.forwardDeclarations.push('#define catch(e)');
            this.forwardDeclarations.push('__declspec(dllimport) void* __stdcall HeapAlloc(void* hHeap,unsigned long dwFlags,size_t dwBytes);');
            this.forwardDeclarations.push('__declspec(dllimport) void* __stdcall GetProcessHeap(void);');
            this.forwardDeclarations.push('__declspec(dllimport) int32_t __stdcall HeapFree(void* hHeap,unsigned long dwFlags,void* lpMem);');
            for (const e of this.project.enumsSimple) {
                out_716 += '\n' + '//enum _x' + e.name + ' {}';
                for (const v of e.staticVars) {
                    const temp_717 = v;
                    switch (temp_717 && temp_717[1]) {
                    case 4: {
                        {
                            const name_718 = temp_717[2];
                            const expr_719 = temp_717[3];
                            {
                                out_716 += '\n_x' + e.name + '._x' + name_718;
                                if (expr_719 != null) { out_716 += ' = ' + this.printExpression(expr_719) };
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_720 = temp_717[2];
                            const expr_721 = temp_717[3];
                            {
                                out_716 += '\n_x' + e.name + '._x' + name_720;
                                out_716 += ' = ' + this.printExpression(expr_721);
                            };
                        }
                    } break;
                    };
                };
                for (const v of e.staticMethods) {
                    const temp_722 = v;
                    switch (temp_722 && temp_722[1]) {
                    case 6: {
                        {
                            const name_723 = temp_722[2];
                            const expr_724 = temp_722[3];
                            const args_725 = temp_722[4];
                            const defaults_726 = temp_722[5];
                            {
                                out_716 += '\n' + this.printFunction(false, null, '_x' + e.name + '__' + name_723, expr_724, args_725, defaults_726);
                            };
                        }
                    } break;
                    };
                };
            };
            for (const e of this.project.enumsComplex) {
                this.forwardDeclarations.push('typedef struct _x' + e.name + ' _x' + e.name + ';');
                out_716 += '\nstruct _x' + e.name + '{';
                out_716 += '\nuint8_t _ztag;';
                out_716 += '\nunion{';
                let i_727 = -1;
                for (const name of e.names) {
                    i_727++;
                    if (e.constructors[i_727] == null) { continue };
                    out_716 += '\nstruct{';
                    for (const arg of e.constructors[i_727]) {
                        out_716 += this.printType() + ' _x' + name + '__' + arg + ';';
                    };
                    out_716 += '};';
                };
                out_716 += '\n};};';
                let i_728 = 0;
                for (const name of e.names) {
                    let declaration = '_x' + e.name + '* _x' + e.name + '__' + name + '(';
                    let arguments_729 = [];
                    if (e.constructors[i_728] != null) { for (const arg of e.constructors[i_728]) arguments_729.push(this.printType() + ' _x' + arg) } else arguments_729.push('void');
                    declaration = declaration + arguments_729.join(',') + ')';
                    this.forwardFunctions.push(declaration);
                    out_716 += '\n' + declaration + '{_x' + e.name + '*x=HeapAlloc(GetProcessHeap(),0,sizeof(_x' + e.name + '));';
                    out_716 += ('x->_ztag=' + (i_728) + ';');
                    if (e.constructors[i_728] != null) { for (const arg of e.constructors[i_728]) out_716 += 'x->_x' + name + '__' + arg + '=_x' + arg + ';' };
                    out_716 += 'return x;};';
                    i_728++;
                };
            };
            for (const i of this.project.interfaces) {
                throw i;
            };
            for (const c of this.project.classes) {
                if (c.external) {
                    if (c.jsRequire != null) {
                        out_716 += '\n' + '//class _x' + c.name + ' = require("' + c.jsRequire + '")';
                        continue;
                    };
                    this.forwardDeclarations.push('typedef struct ' + (((c.jsNative) || (c.name))) + ' _x' + c.name + ';');
                    continue;
                };
                this.forwardDeclarations.push('typedef struct _x' + c.name + ' _x' + c.name + ';');
                out_716 += '\nstruct _x' + c.name + '{';
                for (const v of c.vars) {
                    const temp_730 = v;
                    switch (temp_730 && temp_730[1]) {
                    case 4: {
                        {
                            const name_731 = temp_730[2];
                            const expr_732 = temp_730[3];
                            {
                                out_716 += '\n' + this.printType() + ' _x' + name_731 + ';';
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_733 = temp_730[2];
                            const expr_734 = temp_730[3];
                            {
                                out_716 += '\n' + this.printType() + ' _x' + name_733 + ';';
                            };
                        }
                    } break;
                    };
                };
                out_716 += '\n};';
                for (const v of c.methods) {
                    const temp_735 = v;
                    switch (temp_735 && temp_735[1]) {
                    case 6: {
                        {
                            const name_736 = temp_735[2];
                            const expr_737 = temp_735[3];
                            const args_738 = temp_735[4];
                            const defaults_739 = temp_735[5];
                            {
                                if (name_736 == null || name_736 == 'new') {
                                    out_716 += '\n_x' + c.name + '* _x' + c.name + '__new';
                                    out_716 += '(' + (() => {
                                        const result_740 = [];
                                        const value_741 = args_738;
                                        for (const arg of value_741) result_740.push(this.printType() + ' _x' + arg);
                                        return result_740;
                                    })().join(', ') + '){';
                                    out_716 += '\n _x' + c.name + '* _zthis=HeapAlloc(GetProcessHeap(),0,sizeof(_x' + c.name + '));';
                                    for (const v of c.vars) {
                                        const temp_742 = v;
                                        switch (temp_742 && temp_742[1]) {
                                        case 4: {
                                            {
                                                const name_743 = temp_742[2];
                                                const expr_744 = temp_742[3];
                                                {
                                                    if (expr_744 != null) { out_716 += '\n   _zthis->_x' + name_743 + ' = ' + this.printExpression(expr_744) + ';' };
                                                };
                                            }
                                        } break;

                                        case 5: {
                                            {
                                                const name_745 = temp_742[2];
                                                const expr_746 = temp_742[3];
                                                {
                                                    out_716 += '\n   _zthis->_x' + name_745 + ' = ' + this.printExpression(expr_746) + ';';
                                                };
                                            }
                                        } break;
                                        };
                                    };
                                    out_716 += '\n ';
                                    out_716 += this.printStatement(expr_737);
                                    out_716 += 'return _zthis;';
                                    out_716 += '};';
                                } else {
                                    out_716 += '\n' + this.printFunction(false, '_x' + c.name + '*', '_x' + c.name + '__' + name_736, expr_737, args_738, defaults_739);
                                };
                            };
                        }
                    } break;
                    };
                };
                for (const v of c.staticVars) {
                    const temp_747 = v;
                    switch (temp_747 && temp_747[1]) {
                    case 4: {
                        {
                            const name_748 = temp_747[2];
                            const expr_749 = temp_747[3];
                            {
                                out_716 += '\n_x' + c.name + '._x' + name_748;
                                if (expr_749 != null) { out_716 += ' = ' + this.printExpression(expr_749) };
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_750 = temp_747[2];
                            const expr_751 = temp_747[3];
                            {
                                out_716 += '\n_x' + c.name + '._x' + name_750;
                                out_716 += ' = ' + this.printExpression(expr_751);
                            };
                        }
                    } break;
                    };
                };
                for (const v of c.staticMethods) {
                    const temp_752 = v;
                    switch (temp_752 && temp_752[1]) {
                    case 6: {
                        {
                            const name_753 = temp_752[2];
                            const expr_754 = temp_752[3];
                            const args_755 = temp_752[4];
                            const defaults_756 = temp_752[5];
                            {
                                out_716 += '\n' + this.printFunction(false, null, '_x' + c.name + '__' + name_753, expr_754, args_755, defaults_756);
                            };
                        }
                    } break;
                    };
                };
            };
            for (const g of this.project.globalFuncs) {
                throw g;
            };
            for (const g of this.project.globalVars) {
                throw g;
            };
            for (const init of this.project.init) {
                out_716 += '\nint main(int argc, char** argv) {\n ';
                out_716 += this.printStatement(init);
                out_716 += '\nreturn 0;}';
            };
            out_716 += '\n#ifdef __cplusplus\n';
            out_716 += '}\n';
            out_716 += '#endif\n';
            return this.forwardDeclarations.join('\n') + '\n' + this.forwardFunctions.join(';\n') + ';\n' + out_716;
        } };
        pushTab() { this.tabs += ' ' };
        popTab() { this.tabs = this.tabs.substring(0, this.tabs.length - 1) };
        printBlock(s_757) { {
            {
                const temp_758 = s_757;
                switch (temp_758 && temp_758[1]) {
                case 1: {
                    {
                        const el_759 = temp_758[2];
                        {
                            if (el_759.length == 1) { return '{' + this.printStatement(el_759[0]) + ';}' };
                            if (el_759.length == 0) { return '{}' };
                            return this.printStatement(s_757);
                        };
                    }
                } break;

                default:
                {
                    {
                        return '{' + this.printStatement(s_757) + ';}';
                    };
                }
                };
            };
        } };
        printStatement(s_760) { {
            this.last = ((s_760) || (this.last));
            {
                const temp_761 = s_760;
                switch (temp_761 && temp_761[1]) {
                case 0: {
                    {
                        const els_762 = temp_761[2];
                        {
                            let r_763 = '';
                            for (const s of els_762) if (s != null) { r_763 += '\n' + this.tabs + this.printStatement(s) + ';' };
                            return r_763;
                        };
                    }
                } break;

                case 20: {
                    {
                        {
                            return 'break';
                        };
                    }
                } break;

                case 19: {
                    {
                        {
                            return 'continue';
                        };
                    }
                } break;

                case 1: {
                    {
                        const el_764 = temp_761[2];
                        {
                            this.pushTab();
                            let r_765 = '{';
                            for (const e of el_764) {
                                const temp_766 = e;
                                switch (temp_766 && temp_766[1]) {
                                case null: {
                                    {
                                        {
                                        };
                                    }
                                } break;

                                case 0: {
                                    {
                                        const els_767 = temp_766[2];
                                        {
                                            for (const s of els_767) if (s != null) { r_765 += '\n' + this.tabs + this.printStatement(s) + ';' };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        r_765 += '\n' + this.tabs + this.printStatement(e) + ';';
                                    };
                                }
                                };
                            };
                            this.popTab();
                            return r_765 + '\n' + this.tabs + '}';
                        };
                    }
                } break;

                case 3: {
                    {
                        const e_768 = temp_761[2];
                        const args_769 = temp_761[3];
                        {
                            return '' + this.printExpression(e_768) + '__new' + this.printCallArguments(args_769);
                        };
                    }
                } break;

                case 5: {
                    {
                        const name_770 = temp_761[2];
                        const expr_771 = temp_761[3];
                        {
                            return this.printType(this.project.mapTypes.get(s_760)) + ' _x' + name_770 + (expr_771 == (null)? ('') : ' = ' + this.printExpression(expr_771));
                        };
                    }
                } break;

                case 4: {
                    {
                        const name_772 = temp_761[2];
                        const expr_773 = temp_761[3];
                        {
                            return this.printType(this.project.mapTypes.get(s_760)) + ' _x' + name_772 + (expr_773 == (null)? ('') : ' = ' + this.printExpression(expr_773));
                        };
                    }
                } break;

                case 6: {
                    {
                        const name_774 = temp_761[2];
                        const expr_775 = temp_761[3];
                        const args_776 = temp_761[4];
                        const defaults_777 = temp_761[5];
                        const async_778 = temp_761[6];
                        {
                            return this.printType() + ' _x' + name_774 + '' + (((async_778 == true))? ('') : '') + this.printFunctionArguments(args_776, defaults_777) + ' ' + this.printBlock(expr_775);
                        };
                    }
                } break;

                case 7: {
                    {
                        const e_779 = temp_761[2];
                        {
                            if (e_779 == null) { return 'return' };
                            return 'return ' + this.printExpression(e_779);
                        };
                    }
                } break;

                case 8: {
                    {
                        const econd_780 = temp_761[2];
                        const eif_781 = temp_761[3];
                        const eelse_782 = temp_761[4];
                        {
                            let r_783 = 'if(' + this.printExpression(econd_780) + ')' + this.printBlock(eif_781);
                            if (eelse_782 != null) { r_783 += ' else ' + this.printStatement(eelse_782) };
                            return r_783;
                        };
                    }
                } break;

                case 2: {
                    {
                        const e_784 = temp_761[2];
                        const args_785 = temp_761[3];
                        {
                            return this.printExpression(e_784) + this.printCallArguments(args_785);
                        };
                    }
                } break;

                case 9: {
                    {
                        const expr_786 = temp_761[2];
                        const t_787 = temp_761[3];
                        const v_788 = temp_761[4];
                        const catches_789 = temp_761[5];
                        {
                            this.pushTab();
                            let r_790 = 'try{\n' + this.tabs;
                            r_790 += this.printStatement(expr_786);
                            this.popTab();
                            r_790 += '\n' + this.tabs + '}catch(' + v_788[0] + '){\n' + this.tabs + ' ';
                            this.pushTab();
                            r_790 += this.printStatement(catches_789[0]);
                            this.popTab();
                            return r_790 + '\n' + this.tabs + '}';
                        };
                    }
                } break;

                case 11: {
                    {
                        const a_791 = temp_761[2];
                        const v_792 = temp_761[3];
                        {
                            return this.printExpression(a_791) + ' = ' + this.printExpression(v_792);
                        };
                    }
                } break;

                case 10: {
                    {
                        const e_793 = temp_761[2];
                        {
                            return '_zthrow = ' + this.printExpression(e_793) + '; return 0';
                        };
                    }
                } break;

                case 14: {
                    {
                        const name_794 = temp_761[2];
                        const over_795 = temp_761[3];
                        const by_796 = temp_761[4];
                        {
                            return 'for(int _x' + name_794 + ' of ' + this.printExpression(over_795) + ')' + this.printStatement(by_796);
                        };
                    }
                } break;

                case 16: {
                    {
                        const e_797 = temp_761[2];
                        {
                            return this.printExpression(e_797) + '++';
                        };
                    }
                } break;

                case 17: {
                    {
                        const e_798 = temp_761[2];
                        {
                            return this.printExpression(e_798) + '--';
                        };
                    }
                } break;

                case 15: {
                    {
                        const econd_799 = temp_761[2];
                        const e_800 = temp_761[3];
                        const pre_801 = temp_761[4];
                        {
                            if (pre_801) { return 'while(' + this.printExpression(econd_799) + ')' + this.printStatement(e_800) };
                            return 'do{' + this.printStatement(e_800) + '}while(' + this.printExpression(econd_799) + ')';
                        };
                    }
                } break;

                case 12: {
                    {
                        const a_802 = temp_761[2];
                        const op_803 = temp_761[3];
                        const value_804 = temp_761[4];
                        {
                            return this.printExpression(a_802) + ' ' + Token.stringify(op_803) + '= ' + this.printExpression(value_804);
                        };
                    }
                } break;

                case 13: {
                    {
                        const expr_805 = temp_761[2];
                        const name_806 = temp_761[3];
                        {
                            return this.printExpression(expr_805) + '._x' + name_806;
                        };
                    }
                } break;

                case 18: {
                    {
                        const expr_807 = temp_761[2];
                        const cases_808 = temp_761[3];
                        const statements_809 = temp_761[4];
                        {
                            let r_810 = 'switch(' + this.printExpression(expr_807) + '){';
                            {
                                const value_811 = cases_808.length;
                                let i = 0;
                                while (i < value_811) {
                                    if (cases_808[i].length > 0) {
                                        r_810 += '\n' + this.tabs;
                                        for (const cc of cases_808[i]) r_810 += 'case ' + this.printExpression(cc) + ':';
                                        this.pushTab();
                                        r_810 += '{\n' + this.tabs;
                                        r_810 += this.printStatement(statements_809[i]);
                                        this.popTab();
                                        r_810 += '\n' + this.tabs + '}break;\n' + this.tabs;
                                    };
                                    i++;
                                };
                            };
                            {
                                const value_812 = cases_808.length;
                                let i = 0;
                                while (i < value_812) {
                                    if (cases_808[i].length == 0) {
                                        r_810 += '\n' + this.tabs + 'default:';
                                        r_810 += '\n' + this.tabs;
                                        r_810 += this.printStatement(statements_809[i]);
                                        r_810 += '\n' + this.tabs;
                                    };
                                    i++;
                                };
                            };
                            return r_810 + '}';
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown statement kind:', (s_760 || [])[0]);
                    };
                }
                };
            };
        } };
        printCallArguments(args_813) { {
            return '(' + (() => {
                const result_814 = [];
                const value_815 = args_813;
                for (const a of value_815) result_814.push(this.printExpression(a));
                return result_814;
            })().join(',') + ')';
        } };
        printFunctionArguments(args_816, defaults_817) { {
            return '(' + (() => {
                const result_818 = [];
                const value_819 = args_816.length;
                let a = -1;
                while ((a + 1) < value_819) {
                    a++;
                    result_818.push('_x' + args_816[a] + (((defaults_817 != null && defaults_817[a] != null))? (' = ' + this.printExpression(defaults_817[a])) : ''));
                };
                return result_818;
            })().join(', ') + ')';
        } };
        printFunction(throws, closure, nameRaw, expr_820, args_821, defaults_822) { {
            let declaration_823 = this.printType() + ' ' + nameRaw + '(';
            let arguments_824 = [];
            if (throws) { arguments_824.push('void* _zthrow') };
            if (closure) { arguments_824.push(closure + ' _zthis') };
            for (const arg of args_821) arguments_824.push(this.printType() + ' _x' + arg);
            if (arguments_824.length == 0) { arguments_824.push('void') };
            declaration_823 += arguments_824.join(',');
            declaration_823 += ')';
            this.forwardFunctions.push(declaration_823);
            let result_825 = declaration_823;
            result_825 += this.printBlock(expr_820);
            return result_825;
        } };
        printType(t_826) { {
            if (t_826 == null) { return 'int32_t' };
            return 'int32_t';
        } };
        printExpression(e_827) { {
            this.last = ((e_827) || (this.last));
            {
                const temp_828 = e_827;
                switch (temp_828 && temp_828[1]) {
                case 5: {
                    {
                        {
                            return '0';
                        };
                    }
                } break;

                case 6: {
                    {
                        {
                            return '_zthis';
                        };
                    }
                } break;

                case 4: {
                    {
                        const name_829 = temp_828[2];
                        {
                            return '_x' + name_829;
                        };
                    }
                } break;

                case 1: {
                    {
                        const v_830 = temp_828[2];
                        {
                            return '' + v_830;
                        };
                    }
                } break;

                case 2: {
                    {
                        const v_831 = temp_828[2];
                        {
                            return '' + v_831;
                        };
                    }
                } break;

                case 0: {
                    {
                        const s_832 = temp_828[2];
                        {
                            const s_833 = s_832.split('');
                            const charsOut_834 = [];
                            while (s_833.length > 0) {
                                {
                                    const temp_835 = s_833[0];
                                    switch (temp_835) {
                                    case '\'': {
                                        {
                                            {
                                                charsOut_834.push('\\');
                                                charsOut_834.push('\'');
                                                s_833.shift();
                                            };
                                        }
                                    } break;

                                    case '"': {
                                        {
                                            {
                                                charsOut_834.push('\\');
                                                charsOut_834.push('"');
                                                s_833.shift();
                                            };
                                        }
                                    } break;

                                    case '\n': {
                                        {
                                            {
                                                charsOut_834.push('\\n');
                                                s_833.shift();
                                            };
                                        }
                                    } break;

                                    case '\r': {
                                        {
                                            {
                                                charsOut_834.push('\\r');
                                                s_833.shift();
                                            };
                                        }
                                    } break;

                                    case '\\': {
                                        {
                                            {
                                                s_833.shift();
                                                if (s_833[0] == '\'') {
                                                    charsOut_834.push('\\');
                                                    charsOut_834.push('\'');
                                                    s_833.shift();
                                                } else if (s_833[0] == '"') {
                                                    charsOut_834.push('\\');
                                                    charsOut_834.push('"');
                                                    s_833.shift();
                                                } else if (s_833[0] == '\\') {
                                                    charsOut_834.push('\\');
                                                    charsOut_834.push('\\');
                                                    s_833.shift();
                                                } else {
                                                    charsOut_834.push('\\');
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            charsOut_834.push(s_833[0]);
                                            s_833.shift();
                                        };
                                    }
                                    };
                                };
                            };
                            return '_xString__fromUTF8z("' + charsOut_834.join('') + '")';
                        };
                    }
                } break;

                case 3: {
                    {
                        const v_836 = temp_828[2];
                        {
                            return (v_836)? ('1') : '0';
                        };
                    }
                } break;

                case 7: {
                    {
                        const expr_837 = temp_828[2];
                        const name_838 = temp_828[3];
                        {
                            {
                                const temp_839 = expr_837;
                                switch (temp_839) {
                                case 6: {
                                    {
                                        {
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        return this.printExpression(expr_837) + '->_x' + name_838;
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                case 8: {
                    {
                        const e_840 = temp_828[2];
                        const args_841 = temp_828[3];
                        {
                            return this.printExpression(e_840) + this.printCallArguments(args_841);
                        };
                    }
                } break;

                case 12: {
                    {
                        const name_842 = temp_828[2];
                        const expr_843 = temp_828[3];
                        const args_844 = temp_828[4];
                        const defaults_845 = temp_828[5];
                        {
                            if (name_842 == null) { return this.printType() + ' _zlambda' + this.printFunctionArguments(args_844, defaults_845) + ' ' + this.printBlock(expr_843) };
                            return '((() => { int _x' + name_842 + ' = ' + this.printFunctionArguments(args_844, defaults_845) + ' => ' + this.printBlock(expr_843) + ';return _x' + name_842 + ';})())';
                        };
                    }
                } break;

                case 13: {
                    {
                        const expr_846 = temp_828[2];
                        const args_847 = temp_828[3];
                        const defaults_848 = temp_828[4];
                        {
                            return this.printType() + ' _zarrow' + this.printFunctionArguments(args_847, defaults_848) + '' + this.printExpression(expr_846) + ')';
                        };
                    }
                } break;

                case 10: {
                    {
                        const e_849 = temp_828[2];
                        const args_850 = temp_828[3];
                        {
                            return '' + this.printExpression(e_849) + '__new' + this.printCallArguments(args_850);
                        };
                    }
                } break;

                case 16: {
                    {
                        const el_851 = temp_828[2];
                        {
                            return '_xArray__from(' + (() => {
                                const result_852 = [];
                                const value_853 = el_851;
                                for (const a of value_853) result_852.push(this.printExpression(a));
                                return result_852;
                            })().join(', ') + ')';
                        };
                    }
                } break;

                case 18: {
                    {
                        const op_854 = temp_828[2];
                        const postfix_855 = temp_828[3];
                        const e_856 = temp_828[4];
                        {
                            if (postfix_855) { return this.printExpression(e_856) + Token.stringify(op_854) };
                            return Token.stringify(op_854) + this.printExpression(e_856);
                        };
                    }
                } break;

                case 19: {
                    {
                        const nullable_857 = temp_828[2];
                        const othewise_858 = temp_828[3];
                        {
                            return '((' + this.printExpression(nullable_857) + ')||(' + this.printExpression(othewise_858) + '))';
                        };
                    }
                } break;

                case 14: {
                    {
                        const e_859 = temp_828[2];
                        {
                            return '(' + this.printExpression(e_859) + ')';
                        };
                    }
                } break;

                case 11: {
                    {
                        const a_860 = temp_828[2];
                        const op_861 = temp_828[3];
                        const b_862 = temp_828[4];
                        {
                            return this.printExpression(a_860) + Token.stringify(op_861) + this.printExpression(b_862);
                        };
                    }
                } break;

                case 21: {
                    {
                        const expr_863 = temp_828[2];
                        const index_864 = temp_828[3];
                        {
                            return this.printExpression(expr_863) + '[' + this.printExpression(index_864) + ']';
                        };
                    }
                } break;

                case 20: {
                    {
                        const econd_865 = temp_828[2];
                        const eif_866 = temp_828[3];
                        const eelse_867 = temp_828[4];
                        {
                            let r_868 = '';
                            try {
                                {
                                    r_868 += '(' + this.printExpression(econd_865) + ')?';
                                    r_868 += '(' + this.printExpression(eif_866) + ')';
                                    r_868 += ':' + this.printExpression(eelse_867);
                                    return r_868;
                                }
                            } catch (error) {
                                {
                                    console.log('If =>', e_827, error);
                                    return r_868 + '<!-- If => error -->';
                                }
                            };
                        };
                    }
                } break;

                case 15: {
                    {
                        const names_869 = temp_828[2];
                        const el_870 = temp_828[3];
                        {
                            return '{' + (() => {
                                const result_871 = [];
                                const value_872 = el_870.length;
                                let i = -1;
                                while ((i + 1) < value_872) {
                                    i++;
                                    result_871.push(((names_869[i]) + ':' + this.printExpression(el_870[i])));
                                };
                                return result_871;
                            })().join(',') + '}';
                        };
                    }
                } break;

                case 17: {
                    {
                        const keys_873 = temp_828[2];
                        const values_874 = temp_828[3];
                        {
                            if (keys_873.length == 0) { return '_xMap__from()' };
                            return '_xMap__from(' + (() => {
                                const result_875 = [];
                                const value_876 = keys_873.length;
                                let i = -1;
                                while ((i + 1) < value_876) {
                                    i++;
                                    result_875.push('{' + this.printExpression(keys_873[i]) + ', ' + this.printExpression(values_874[i]) + '}');
                                };
                                return result_875;
                            })().join(',') + ')';
                        };
                    }
                } break;

                case 22: {
                    {
                        const a_877 = temp_828[2];
                        const op_878 = temp_828[3];
                        const value_879 = temp_828[4];
                        {
                            return this.printExpression(a_877) + ' ' + Token.stringify(op_878) + '= ' + this.printExpression(value_879);
                        };
                    }
                } break;

                case 23: {
                    {
                        const kind_880 = temp_828[2];
                        const args_881 = temp_828[3];
                        const s_882 = temp_828[4];
                        {
                            {
                                const temp_883 = kind_880;
                                switch (temp_883) {
                                case 0: {
                                    {
                                        {
                                            return '((' + this.printExpression(args_881[0]) + ')' + s_882 + '(' + this.printExpression(args_881[1]) + '))';
                                        };
                                    }
                                } break;

                                case 1: {
                                    {
                                        {
                                            return s_882 + this.printCallArguments(args_881);
                                        };
                                    }
                                } break;

                                case 2: {
                                    {
                                        {
                                            return '(' + s_882 + '(' + this.printExpression(args_881[0]) + '))';
                                        };
                                    }
                                } break;

                                case 3: {
                                    {
                                        {
                                            return '((' + this.printExpression(args_881[1]) + ')' + s_882 + ')';
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown expression kind:', (e_827 || [])[0], e_827, this.last);
                        return '<!-- undefined -->';
                    };
                }
                };
            };
        } };
    }
    GenC.reserved = []
    GenC.stringifyProject = (project_713) => { {
            const result_714 = new GenC(project_713).stringify();
            return result_714;
        } };
    var GenHaxe = class {
        constructor(project_885) {
            this.tabs = '\t'
        {
            this.project = project_885;
        } };
        stringify() { {
            let out_886 = 'package;\n';
            for (const e of this.project.enumsSimple) {
                out_886 += '\n' + '@:enum abstract ' + e.name + '(Dynamic) {';
                for (const v of e.staticVars) {
                    const temp_887 = v;
                    switch (temp_887 && temp_887[1]) {
                    case 4: {
                        {
                            const name_888 = temp_887[2];
                            const expr_889 = temp_887[3];
                            {
                                out_886 += '\n\t' + e.name + '.' + name_888;
                                if (expr_889 != null) { out_886 += ' = ' + this.printExpression(expr_889) };
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_890 = temp_887[2];
                            const expr_891 = temp_887[3];
                            {
                                out_886 += '\n\t' + e.name + '.' + name_890;
                                out_886 += ' = ' + this.printExpression(expr_891);
                            };
                        }
                    } break;
                    };
                };
                for (const v of e.staticMethods) {
                    const temp_892 = v;
                    switch (temp_892 && temp_892[1]) {
                    case 6: {
                        {
                            const name_893 = temp_892[2];
                            const expr_894 = temp_892[3];
                            const args_895 = temp_892[4];
                            {
                                out_886 += '\n\tpublic static function ' + name_893 + '(' + args_895.join(', ') + ') ' + this.printBlock(expr_894) + ';';
                            };
                        }
                    } break;
                    };
                };
                out_886 += '\n}\n';
            };
            for (const e of this.project.enumsComplex) {
                out_886 += '\n' + 'enum ' + e.name + ' {';
                let i_896 = 0;
                for (const name of e.names) {
                    out_886 += '\n\t' + name;
                    if (e.constructors[i_896] != null) {
                        out_886 += '(';
                        out_886 += (() => {
                            const result_897 = [];
                            const value_898 = e.constructors[i_896];
                            for (const c of value_898) result_897.push(c + ': Dynamic');
                            return result_897;
                        })().join(',');
                        out_886 += ');';
                    } else out_886 += ';';
                    i_896++;
                };
                out_886 += '\n}\n';
            };
            for (const i of this.project.interfaces) {
                throw i;
            };
            for (const c of this.project.classes) {
                if (c.external) {
                    if (c.jsRequire != null) {
                        out_886 += '\n\t' + '//var ' + c.name + ' = require("' + c.jsRequire + '")';
                        continue;
                    };
                    out_886 += '\n\t' + '//var ' + c.name + ' = $global$.' + (((c.jsNative) || (c.name)));
                    continue;
                };
                out_886 += '\n' + 'class ' + c.name + ' {';
                for (const v of c.vars) {
                    const temp_899 = v;
                    switch (temp_899 && temp_899[1]) {
                    case 4: {
                        {
                            const name_900 = temp_899[2];
                            const expr_901 = temp_899[3];
                            {
                                out_886 += '\n\tpublic var ' + name_900 + ': Dynamic;';
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_902 = temp_899[2];
                            const expr_903 = temp_899[3];
                            {
                                out_886 += '\n\tpublic var ' + name_902 + ': Dynamic;';
                            };
                        }
                    } break;
                    };
                };
                for (const v of c.methods) {
                    const temp_904 = v;
                    switch (temp_904 && temp_904[1]) {
                    case 6: {
                        {
                            const name_905 = temp_904[2];
                            const expr_906 = temp_904[3];
                            const args_907 = temp_904[4];
                            {
                                if (name_905 == null || name_905 == 'new') { out_886 += '\n\tpublic function new' } else out_886 += '\n\tpublic function ' + name_905;
                                out_886 += '(' + args_907.join(', ') + ') ';
                                if (name_905 == null || name_905 == 'new') {
                                    out_886 += '{ ';
                                    for (const v of c.vars) {
                                        const temp_908 = v;
                                        switch (temp_908 && temp_908[1]) {
                                        case 4: {
                                            {
                                                const name_909 = temp_908[2];
                                                const expr_910 = temp_908[3];
                                                {
                                                    if (expr_910 != null) { out_886 += '\n\t\t\tthis.' + name_909 + ' = ' + this.printExpression(expr_910) + ';' };
                                                };
                                            }
                                        } break;

                                        case 5: {
                                            {
                                                const name_911 = temp_908[2];
                                                const expr_912 = temp_908[3];
                                                {
                                                    out_886 += '\n\t\t\tthis.' + name_911 + ' = ' + this.printExpression(expr_912) + ';';
                                                };
                                            }
                                        } break;
                                        };
                                    };
                                    out_886 += '\n\t\t';
                                    out_886 += this.printBlock(expr_906) + ' };';
                                } else out_886 += this.printBlock(expr_906);
                            };
                        }
                    } break;
                    };
                };
                for (const v of c.staticVars) {
                    const temp_913 = v;
                    switch (temp_913 && temp_913[1]) {
                    case 4: {
                        {
                            const name_914 = temp_913[2];
                            const expr_915 = temp_913[3];
                            {
                                out_886 += '\n\tpublic static var ' + name_914;
                                if (expr_915 != null) { out_886 += ' = ' + this.printExpression(expr_915) };
                                out_886 += ';';
                            };
                        }
                    } break;

                    case 5: {
                        {
                            const name_916 = temp_913[2];
                            const expr_917 = temp_913[3];
                            {
                                out_886 += '\n\tpublic static var ' + name_916;
                                out_886 += ' = ' + this.printExpression(expr_917) + ';';
                            };
                        }
                    } break;
                    };
                };
                for (const v of c.staticMethods) {
                    const temp_918 = v;
                    switch (temp_918 && temp_918[1]) {
                    case 6: {
                        {
                            const name_919 = temp_918[2];
                            const expr_920 = temp_918[3];
                            const args_921 = temp_918[4];
                            {
                                out_886 += '\n\tpublic static function ' + name_919;
                                out_886 += '(' + args_921.join(', ') + ') ' + this.printBlock(expr_920) + ';';
                            };
                        }
                    } break;
                    };
                };
                out_886 += '\n}\n';
            };
            for (const g of this.project.globalFuncs) {
                throw g;
            };
            for (const g of this.project.globalVars) {
                throw g;
            };
            out_886 += 'class HexaHaxe {\n\tpublic static function main() {';
            for (const init of this.project.init) {
                out_886 += '\n\t\t{\n\t\t';
                out_886 += this.printStatement(init);
                out_886 += '\n\t\t}';
            };
            return out_886 + '\n\t}\n}';
        } };
        pushTab() { this.tabs += '\t' };
        popTab() { this.tabs = this.tabs.substring(0, this.tabs.length - 1) };
        printBlock(s_922) { {
            {
                const temp_923 = s_922;
                switch (temp_923 && temp_923[1]) {
                case 1: {
                    {
                        const el_924 = temp_923[2];
                        {
                            if (el_924.length == 1) { return '{ ' + this.printStatement(el_924[0]) + '; }' };
                            if (el_924.length == 0) { return '{}' };
                            return this.printStatement(s_922);
                        };
                    }
                } break;

                default:
                {
                    {
                        return '{ ' + this.printStatement(s_922) + '; }';
                    };
                }
                };
            };
        } };
        printStatement(s_925) { {
            {
                const temp_926 = s_925;
                switch (temp_926 && temp_926[1]) {
                case 0: {
                    {
                        const els_927 = temp_926[2];
                        {
                            let r_928 = '';
                            for (const s of els_927) if (s != null) { r_928 += '\n' + this.tabs + this.printStatement(s) + ';' };
                            return r_928;
                        };
                    }
                } break;

                case 20: {
                    {
                        {
                            return 'break';
                        };
                    }
                } break;

                case 19: {
                    {
                        {
                            return 'continue';
                        };
                    }
                } break;

                case 1: {
                    {
                        const el_929 = temp_926[2];
                        {
                            this.pushTab();
                            let r_930 = '{';
                            for (const e of el_929) {
                                const temp_931 = e;
                                switch (temp_931 && temp_931[1]) {
                                case null: {
                                    {
                                        {
                                        };
                                    }
                                } break;

                                case 0: {
                                    {
                                        const els_932 = temp_931[2];
                                        {
                                            for (const s of els_932) if (s != null) { r_930 += '\n' + this.tabs + this.printStatement(s) + ';' };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        r_930 += '\n' + this.tabs + this.printStatement(e) + ';';
                                    };
                                }
                                };
                            };
                            this.popTab();
                            return r_930 + '\n' + this.tabs + '}';
                        };
                    }
                } break;

                case 3: {
                    {
                        const e_933 = temp_926[2];
                        const args_934 = temp_926[3];
                        {
                            return 'new ' + this.printExpression(e_933) + this.printCallArguments(args_934);
                        };
                    }
                } break;

                case 5: {
                    {
                        const name_935 = temp_926[2];
                        const expr_936 = temp_926[3];
                        {
                            return 'var ' + name_935 + (expr_936 == (null)? ('') : ' = ' + this.printExpression(expr_936));
                        };
                    }
                } break;

                case 4: {
                    {
                        const name_937 = temp_926[2];
                        const expr_938 = temp_926[3];
                        {
                            return 'var ' + name_937 + (expr_938 == (null)? ('') : ' = ' + this.printExpression(expr_938));
                        };
                    }
                } break;

                case 6: {
                    {
                        const name_939 = temp_926[2];
                        const expr_940 = temp_926[3];
                        const args_941 = temp_926[4];
                        {
                            return 'function ' + name_939 + '(' + args_941.join(', ') + ') ' + this.printBlock(expr_940);
                        };
                    }
                } break;

                case 7: {
                    {
                        const e_942 = temp_926[2];
                        {
                            if (e_942 == null) { return 'return' };
                            return 'return ' + this.printExpression(e_942);
                        };
                    }
                } break;

                case 8: {
                    {
                        const econd_943 = temp_926[2];
                        const eif_944 = temp_926[3];
                        const eelse_945 = temp_926[4];
                        {
                            let r_946 = 'if (' + this.printExpression(econd_943) + ') ' + this.printBlock(eif_944);
                            if (eelse_945 != null) { r_946 += ' else ' + this.printStatement(eelse_945) };
                            return r_946;
                        };
                    }
                } break;

                case 2: {
                    {
                        const e_947 = temp_926[2];
                        const args_948 = temp_926[3];
                        {
                            return this.printExpression(e_947) + this.printCallArguments(args_948);
                        };
                    }
                } break;

                case 9: {
                    {
                        const expr_949 = temp_926[2];
                        const t_950 = temp_926[3];
                        const v_951 = temp_926[4];
                        const catches_952 = temp_926[5];
                        {
                            this.pushTab();
                            let r_953 = 'try {\n' + this.tabs;
                            r_953 += this.printStatement(expr_949);
                            this.popTab();
                            r_953 += '\n' + this.tabs + '} catch (' + v_951[0] + ': Dynamic) {\n' + this.tabs + '\t';
                            this.pushTab();
                            r_953 += this.printStatement(catches_952[0]);
                            this.popTab();
                            return r_953 + '\n' + this.tabs + '}';
                        };
                    }
                } break;

                case 11: {
                    {
                        const a_954 = temp_926[2];
                        const v_955 = temp_926[3];
                        {
                            return this.printExpression(a_954) + ' = ' + this.printExpression(v_955);
                        };
                    }
                } break;

                case 10: {
                    {
                        const e_956 = temp_926[2];
                        {
                            return 'throw ' + this.printExpression(e_956);
                        };
                    }
                } break;

                case 14: {
                    {
                        const name_957 = temp_926[2];
                        const over_958 = temp_926[3];
                        const by_959 = temp_926[4];
                        {
                            return 'for (' + name_957 + ' in ' + this.printExpression(over_958) + ') ' + this.printStatement(by_959);
                        };
                    }
                } break;

                case 16: {
                    {
                        const e_960 = temp_926[2];
                        {
                            return this.printExpression(e_960) + '++';
                        };
                    }
                } break;

                case 17: {
                    {
                        const e_961 = temp_926[2];
                        {
                            return this.printExpression(e_961) + '--';
                        };
                    }
                } break;

                case 15: {
                    {
                        const econd_962 = temp_926[2];
                        const e_963 = temp_926[3];
                        const pre_964 = temp_926[4];
                        {
                            if (pre_964) { return 'while (' + this.printExpression(econd_962) + ') ' + this.printStatement(e_963) };
                            return 'do {' + this.printStatement(e_963) + '} while (' + this.printExpression(econd_962) + ')';
                        };
                    }
                } break;

                case 12: {
                    {
                        const a_965 = temp_926[2];
                        const op_966 = temp_926[3];
                        const value_967 = temp_926[4];
                        {
                            return this.printExpression(a_965) + ' ' + Token.stringify(op_966) + '= ' + this.printExpression(value_967);
                        };
                    }
                } break;

                case 13: {
                    {
                        const expr_968 = temp_926[2];
                        const name_969 = temp_926[3];
                        {
                            return this.printExpression(expr_968) + '.' + name_969;
                        };
                    }
                } break;

                case 18: {
                    {
                        const expr_970 = temp_926[2];
                        const cases_971 = temp_926[3];
                        const statements_972 = temp_926[4];
                        {
                            let r_973 = 'switch (' + this.printExpression(expr_970) + ') {';
                            {
                                const value_974 = cases_971.length;
                                let i = 0;
                                while (i < value_974) {
                                    if (cases_971[i].length > 0) {
                                        r_973 += '\n' + this.tabs + 'case ';
                                        r_973 += (() => {
                                            const result_975 = [];
                                            const value_976 = cases_971[i];
                                            for (const cc of value_976) result_975.push(this.printExpression(cc));
                                            return result_975;
                                        })().join(', ');
                                        r_973 += ': ';
                                        this.pushTab();
                                        r_973 += '{\n' + this.tabs;
                                        r_973 += this.printStatement(statements_972[i]);
                                        this.popTab();
                                        r_973 += '\n' + this.tabs + '};\n' + this.tabs;
                                    };
                                    i++;
                                };
                            };
                            {
                                const value_977 = cases_971.length;
                                let i = 0;
                                while (i < value_977) {
                                    if (cases_971[i].length == 0) {
                                        r_973 += '\n' + this.tabs + 'default: ';
                                        r_973 += '\n' + this.tabs;
                                        r_973 += this.printStatement(statements_972[i]);
                                        r_973 += '\n' + this.tabs;
                                    };
                                    i++;
                                };
                            };
                            return r_973 + '}';
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown statement kind:', (s_925 || [])[0]);
                    };
                }
                };
            };
        } };
        printCallArguments(args_978) { {
            return '(' + (() => {
                const result_979 = [];
                const value_980 = args_978;
                for (const a of value_980) result_979.push(this.printExpression(a));
                return result_979;
            })().join(', ') + ')';
        } };
        printExpression(e_981) { {
            {
                const temp_982 = e_981;
                switch (temp_982 && temp_982[1]) {
                case 5: {
                    {
                        {
                            return 'null';
                        };
                    }
                } break;

                case 6: {
                    {
                        {
                            return 'this';
                        };
                    }
                } break;

                case 4: {
                    {
                        const name_983 = temp_982[2];
                        {
                            return name_983;
                        };
                    }
                } break;

                case 1: {
                    {
                        const v_984 = temp_982[2];
                        {
                            return '' + v_984;
                        };
                    }
                } break;

                case 2: {
                    {
                        const v_985 = temp_982[2];
                        {
                            return '' + v_985;
                        };
                    }
                } break;

                case 0: {
                    {
                        const s_986 = temp_982[2];
                        {
                            const s_987 = s_986.split('');
                            const charsOut_988 = [];
                            while (s_987.length > 0) {
                                {
                                    const temp_989 = s_987[0];
                                    switch (temp_989) {
                                    case '$': {
                                        {
                                            {
                                                charsOut_988.push('$');
                                                charsOut_988.push('$');
                                                s_987.shift();
                                            };
                                        }
                                    } break;

                                    case '\'': {
                                        {
                                            {
                                                charsOut_988.push('\\');
                                                charsOut_988.push('\'');
                                                s_987.shift();
                                            };
                                        }
                                    } break;

                                    case '\n': {
                                        {
                                            {
                                                charsOut_988.push('\\n');
                                                s_987.shift();
                                            };
                                        }
                                    } break;

                                    case '\r': {
                                        {
                                            {
                                                charsOut_988.push('\\r');
                                                s_987.shift();
                                            };
                                        }
                                    } break;

                                    case '\\': {
                                        {
                                            {
                                                s_987.shift();
                                                if (s_987[0] == '\'') {
                                                    charsOut_988.push('\\');
                                                    charsOut_988.push('\'');
                                                    s_987.shift();
                                                } else {
                                                    charsOut_988.push('\\');
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            charsOut_988.push(s_987[0]);
                                            s_987.shift();
                                        };
                                    }
                                    };
                                };
                            };
                            return '\'' + charsOut_988.join('') + '\'';
                        };
                    }
                } break;

                case 3: {
                    {
                        const v_990 = temp_982[2];
                        {
                            return '' + v_990;
                        };
                    }
                } break;

                case 7: {
                    {
                        const expr_991 = temp_982[2];
                        const name_992 = temp_982[3];
                        {
                            return this.printExpression(expr_991) + '.' + name_992;
                        };
                    }
                } break;

                case 8: {
                    {
                        const e_993 = temp_982[2];
                        const args_994 = temp_982[3];
                        {
                            return this.printExpression(e_993) + this.printCallArguments(args_994);
                        };
                    }
                } break;

                case 12: {
                    {
                        const name_995 = temp_982[2];
                        const expr_996 = temp_982[3];
                        const args_997 = temp_982[4];
                        {
                            if (name_995 == null) { return 'function (' + args_997.join(', ') + ') ' + this.printBlock(expr_996) };
                            return 'function ' + name_995 + '(' + args_997.join(', ') + ') ' + this.printBlock(expr_996);
                        };
                    }
                } break;

                case 13: {
                    {
                        const expr_998 = temp_982[2];
                        const args_999 = temp_982[3];
                        {
                            return 'function (' + args_999.join(', ') + ') return (' + this.printExpression(expr_998) + ')';
                        };
                    }
                } break;

                case 10: {
                    {
                        const e_1000 = temp_982[2];
                        const args_1001 = temp_982[3];
                        {
                            return 'new ' + this.printExpression(e_1000) + this.printCallArguments(args_1001);
                        };
                    }
                } break;

                case 16: {
                    {
                        const el_1002 = temp_982[2];
                        {
                            return '[' + (() => {
                                const result_1003 = [];
                                const value_1004 = el_1002;
                                for (const a of value_1004) result_1003.push(this.printExpression(a));
                                return result_1003;
                            })().join(', ') + ']';
                        };
                    }
                } break;

                case 18: {
                    {
                        const op_1005 = temp_982[2];
                        const postfix_1006 = temp_982[3];
                        const e_1007 = temp_982[4];
                        {
                            if (postfix_1006) { return this.printExpression(e_1007) + Token.stringify(op_1005) };
                            return Token.stringify(op_1005) + this.printExpression(e_1007);
                        };
                    }
                } break;

                case 19: {
                    {
                        const nullable_1008 = temp_982[2];
                        const othewise_1009 = temp_982[3];
                        {
                            return '((' + this.printExpression(nullable_1008) + ') || (' + this.printExpression(othewise_1009) + '))';
                        };
                    }
                } break;

                case 14: {
                    {
                        const e_1010 = temp_982[2];
                        {
                            return '(' + this.printExpression(e_1010) + ')';
                        };
                    }
                } break;

                case 11: {
                    {
                        const a_1011 = temp_982[2];
                        const op_1012 = temp_982[3];
                        const b_1013 = temp_982[4];
                        {
                            return this.printExpression(a_1011) + ' ' + Token.stringify(op_1012) + ' ' + this.printExpression(b_1013);
                        };
                    }
                } break;

                case 21: {
                    {
                        const expr_1014 = temp_982[2];
                        const index_1015 = temp_982[3];
                        {
                            return this.printExpression(expr_1014) + '[' + this.printExpression(index_1015) + ']';
                        };
                    }
                } break;

                case 20: {
                    {
                        const econd_1016 = temp_982[2];
                        const eif_1017 = temp_982[3];
                        const eelse_1018 = temp_982[4];
                        {
                            let r_1019 = '';
                            try {
                                {
                                    r_1019 += '(' + this.printExpression(econd_1016) + ')?';
                                    r_1019 += ' (' + this.printExpression(eif_1017) + ')';
                                    r_1019 += ' : ' + this.printExpression(eelse_1018);
                                    return r_1019;
                                }
                            } catch (error) {
                                {
                                    console.log('If =>', e_981, error);
                                    return r_1019 + '<!-- If => error -->';
                                }
                            };
                        };
                    }
                } break;

                case 15: {
                    {
                        const names_1020 = temp_982[2];
                        const el_1021 = temp_982[3];
                        {
                            return '{' + (() => {
                                const result_1022 = [];
                                const value_1023 = el_1021.length;
                                let i = -1;
                                while ((i + 1) < value_1023) {
                                    i++;
                                    result_1022.push(((names_1020[i]) + ':' + this.printExpression(el_1021[i])));
                                };
                                return result_1022;
                            })().join(', ') + '}';
                        };
                    }
                } break;

                case 17: {
                    {
                        const keys_1024 = temp_982[2];
                        const values_1025 = temp_982[3];
                        {
                            if (keys_1024.length == 0) { return 'new Map()' };
                            return 'new Map([' + (() => {
                                const result_1026 = [];
                                const value_1027 = keys_1024.length;
                                let i = -1;
                                while ((i + 1) < value_1027) {
                                    i++;
                                    result_1026.push('[' + this.printExpression(keys_1024[i]) + ', ' + this.printExpression(values_1025[i]) + ']');
                                };
                                return result_1026;
                            })().join(', ') + '])';
                        };
                    }
                } break;

                case 22: {
                    {
                        const a_1028 = temp_982[2];
                        const op_1029 = temp_982[3];
                        const value_1030 = temp_982[4];
                        {
                            return this.printExpression(a_1028) + ' ' + Token.stringify(op_1029) + '= ' + this.printExpression(value_1030);
                        };
                    }
                } break;

                case 23: {
                    {
                        const kind_1031 = temp_982[2];
                        const args_1032 = temp_982[3];
                        const s_1033 = temp_982[4];
                        {
                            {
                                const temp_1034 = kind_1031;
                                switch (temp_1034) {
                                case 0: {
                                    {
                                        {
                                            return '((' + this.printExpression(args_1032[0]) + ') ' + s_1033 + ' (' + this.printExpression(args_1032[1]) + '))';
                                        };
                                    }
                                } break;

                                case 1: {
                                    {
                                        {
                                            return s_1033 + this.printCallArguments(args_1032);
                                        };
                                    }
                                } break;

                                case 2: {
                                    {
                                        {
                                            return '(' + s_1033 + '(' + this.printExpression(args_1032[0]) + '))';
                                        };
                                    }
                                } break;

                                case 3: {
                                    {
                                        {
                                            return '((' + this.printExpression(args_1032[1]) + ')' + s_1033 + ')';
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                case 24: {
                    {
                        {
                            return '_';
                        };
                    }
                } break;

                default:
                {
                    {
                        console.error('Unknown expression kind:', (e_981 || [])[0], e_981);
                    };
                }
                };
            };
        } };
    }
    GenHaxe.reserved = ['with', 'var', 'instanceof', 'typeof', 'delete', 'undefined', 'package', 'HexaHaxe']
    GenHaxe.stringifyProject = (project_884) => { {
            return new GenHaxe(project_884).stringify();
        } };
    var DataHelper = class {
    }
    DataHelper.varName = (v_1043) => { {
            {
                const temp_1044 = v_1043;
                switch (temp_1044 && temp_1044[1]) {
                case 22: {
                    {
                        const name_1045 = temp_1044[2];
                        {
                            return name_1045;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw ('varName got not a TVar, but `' + (v_1043) + '`');
                    };
                }
                };
            };
        } };
    DataHelper.nameOf = (v_1046) => { {
            {
                const temp_1047 = v_1046;
                switch (temp_1047 && temp_1047[1]) {
                case 42: {
                    {
                        const node_1048 = temp_1047[2];
                        {
                            return DataHelper.nameOf(node_1048);
                        };
                    }
                } break;

                case 22: {
                    {
                        const name_1049 = temp_1047[2];
                        {
                            return name_1049;
                        };
                    }
                } break;

                case 34: {
                    {
                        const t_1050 = temp_1047[2];
                        {
                            {
                                const temp_1051 = t_1050;
                                switch (temp_1051 && temp_1051[1]) {
                                case 1: {
                                    {
                                        const name_1052 = temp_1051[2];
                                        {
                                            return name_1052;
                                        };
                                    }
                                } break;

                                case 2: {
                                    {
                                        const name_1053 = temp_1051[2];
                                        {
                                            return name_1053;
                                        };
                                    }
                                } break;
                                };
                            };
                            throw 'unreachable';
                        };
                    }
                } break;

                case 20: {
                    {
                        const name_1054 = temp_1047[2];
                        {
                            return name_1054;
                        };
                    }
                } break;

                case 24: {
                    {
                        const t_1055 = temp_1047[2];
                        {
                            {
                                const temp_1056 = t_1055;
                                switch (temp_1056 && temp_1056[1]) {
                                case 1: {
                                    {
                                        const name_1057 = temp_1056[2];
                                        {
                                            return name_1057;
                                        };
                                    }
                                } break;

                                case 2: {
                                    {
                                        const name_1058 = temp_1056[2];
                                        {
                                            return name_1058;
                                        };
                                    }
                                } break;
                                };
                            };
                            throw 'unreachable';
                        };
                    }
                } break;

                case 36: {
                    {
                        const name_1059 = temp_1047[2];
                        {
                            return name_1059;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw ('nameOf expected named node, but got `' + (v_1046) + '`');
                    };
                }
                };
            };
        } };
    DataHelper.asStringAttValue = (a_1060, index_1061) => { {
            {
                const temp_1062 = a_1060.values[index_1061];
                switch (temp_1062 && temp_1062[1]) {
                case null: {
                    {
                        {
                            throw 'Got null, not a string';
                        };
                    }
                } break;

                case 0: {
                    {
                        const s_1063 = temp_1062[2];
                        {
                            return s_1063;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw ('Got `' + (a_1060.values[index_1061]) + '`, not a string');
                    };
                }
                };
            };
        } };
    DataHelper.getLastOfBlock = (block_1064) => { {
            {
                const temp_1065 = block_1064;
                switch (temp_1065 && temp_1065[1]) {
                case null: {
                    {
                        {
                            throw 'Got null, not a block';
                        };
                    }
                } break;

                case 10: {
                    {
                        const el_1066 = temp_1065[2];
                        {
                            return el_1066[el_1066.length - 1];
                        };
                    }
                } break;

                default:
                {
                    {
                        throw ('Got `' + (block_1064) + '`, not a block');
                    };
                }
                };
            };
        } };
    DataHelper.isVoidValue = (block_1067) => { {
            {
                const temp_1068 = block_1067;
                switch (temp_1068 && temp_1068[1]) {
                case null: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 14: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 16: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 17: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 22: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 12: {
                    {
                        const eelse_1069 = temp_1068[4];
                        {
                            if (eelse_1069 == null) { return true };
                        };
                    }
                } break;

                case 34: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 24: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 31: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 10: {
                    {
                        const el_1070 = temp_1068[2];
                        {
                            if (el_1070.length == 0) { return true };
                            return DataHelper.isVoidValue(el_1070[el_1070.length - 1]);
                        };
                    }
                } break;

                default:
                {
                    {
                        return false;
                    };
                }
                };
            };
            return false;
        } };
    DataHelper.extractTypeName = (t_1071) => { {
            {
                const temp_1072 = t_1071;
                switch (temp_1072 && temp_1072[1]) {
                case 1: {
                    {
                        const name_1073 = temp_1072[2];
                        {
                            return name_1073;
                        };
                    }
                } break;

                case 2: {
                    {
                        const name_1074 = temp_1072[2];
                        {
                            return name_1074;
                        };
                    }
                } break;

                case null: {
                    {
                        {
                            return null;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw 'Type has no name: ' + t_1071;
                    };
                }
                };
            };
        } };
    var NodeData = class {
        constructor(atLine, atColumn, atFile) {
        {
            this.line = atLine;
            this.column = atColumn;
            this.fileName = atFile;
        } };
    }
    var Project = class {
    }
    Project.mapAttributes = new Map()
    Project.mapNames = new Map()
    Project.data = new Map()
    Project.defines = {}
    Project.mapTypes = new Map()
    Project.mapNiceTypes = new Map()
    var CompilerError = class {
        constructor(except, details, line, column, filename) {
        {
            this.exception = except;
            this.details = details == (null)? ('') : details;
            this.line = line == (null)? (0) : line;
            this.column = column == (null)? (0) : column;
            this.fileName = filename == (null)? ('') : filename;
        } };
        toString() { {
            return '[' + this.fileName + ':' + this.line + ':' + this.column + ']: ' + this.details;
        } };
    }
    var Lexer = class {
    }
    Lexer.isident
    Lexer.isUpper
    Lexer.isLower
    Lexer.ops8a
    Lexer.op16token
    Lexer.kwd
    Lexer.tokenize = (bytes, fileName) => { {
            let position = 0;
            let len_1163 = bytes.length;
            let to = 0;
            let s_1164 = '';
            let p = 0;
            let line_1165 = 1;
            let columnBase = 0;
            let params_1166 = [];
            let tokens = Buffer.alloc(len_1163 + 1);
            let lines = [];
            let columns = [];
            const add = (t_1167) => {
                tokens[to++] = t_1167;
                lines.push(line_1165);
                columns.push(position - columnBase - 1);
            };
            const addn = (t_1168, p_1169) => {
                params_1166[to] = p_1169;
                add(t_1168);
            };
            const curPos = () => { return position - columnBase - 1 };
            const get_8 = (pos_1170) => { return bytes[pos_1170] };
            const not_eof = () => { return (position < len_1163) };
            const new_line = () => {
                line_1165++;
                columnBase = position;
            };
            const fail = (message_1171, erline = null, column_1172 = null, filename_1173 = null) => {
                let erline_1174 = erline != (null)? (erline) : line_1165;
                let column_1175 = column_1172 != (null)? (column_1172) : curPos();
                let filename_1176 = filename_1173 != (null)? (filename_1173) : fileName;
                return new CompilerError(Fail.LexerError, message_1171, erline_1174, column_1175, filename_1176);
            };
            if (len_1163 > 2 && get_8(0) == 239 && get_8(1) == 187 && get_8(2) == 191) { position += 3 };
            while (position < len_1163) {
                let _8 = 0;
                do {{
                    _8 = get_8(position);
                    if (_8 == 10) { new_line() };
                }} while (_8 <= 32 && (++position < len_1163));
                if (!not_eof()) { break };
                let _16 = (len_1163 - position) > (1)? (_8 | (get_8(position + 1) << 8)) : _8;
                if (_8 == 47) {
                    if (_16 == 0x2f2f) {
                        let pos_1177 = position + 2;
                        while (get_8(position) != 10 && not_eof()) {
                            position++;
                        };
                        continue;
                    };
                    if (_16 == 10799 && get_8(position + 2) == 42) {
                        position += 3;
                        p = position;
                        while (not_eof()) {
                            let _32 = (len_1163 - position) > (3)? (bytes.readUInt32LE(position)) : get_8(position);
                            if ((_32 & 0xFF) == 10) { new_line() } else if ((_32 & 0xFFFFFF) == 3090986) { break };
                            position++;
                        };
                        if (!not_eof()) { throw fail('Unclosed doc-comment') };
                        addn(65, bytes.toString('utf8', p, position));
                        position += 3;
                        continue;
                    };
                    if (_16 == 10799) {
                        let pos_1178 = position + 2;
                        p = 0;
                        position += 2;
                        while (not_eof()) {
                            _16 = (len_1163 - position) > (1)? (bytes.readUInt16LE(position)) : get_8(position);
                            if ((_16 & 0xFF) == 10) { new_line() } else if (_16 == 12074 && p > 0) { p-- } else if (_16 == 10799) { p++ } else if (_16 == 12074 && p == 0) { break };
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
                    while (p < len_1163 && Lexer.isident[_8] != 0) _8 = get_8(++p);
                    s_1164 = bytes.toString('ascii', position, p);
                    let t_1179 = (((_16 & 0xFF) <= 90))? (null) : Lexer.kwd.get(s_1164);
                    if (t_1179 != null) { add(t_1179) } else {
                        if (titlechar >= 65 && titlechar <= 90) { addn(61, s_1164) } else {
                            addn(62, s_1164);
                        };
                    };
                    position = p;
                    continue;
                };
                if (_8 == 96) {
                    position++;
                    let pos_1180 = position;
                    while (get_8(position) != 96 && not_eof()) {
                        if (get_8(position) == 10) { new_line() };
                        position++;
                    };
                    addn(66, bytes.toString('utf8', pos_1180, position));
                    position++;
                    continue;
                };
                if (_16 == 11822 && (get_8(position + 2) == 46)) {
                    add(98);
                    position += 3;
                    continue;
                };
                if (_16 == 15934 && (get_8(position + 2) == 62)) {
                    add(108);
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
                if (found != 0) {
                    add(found);
                    position++;
                    continue;
                };
                if (_8 < 40) {
                    p = _8;
                    position++;
                    let pos_1181 = position;
                    while (get_8(position) != p && not_eof()) {
                        if (get_8(position) == 10) { new_line() };
                        if (get_8(position) == '\\'.charCodeAt(0)) {
                            position += 2;
                            continue;
                        };
                        _16 = (len_1163 - position) > (1)? (bytes.readUInt16LE(position)) : get_8(position);
                        position++;
                    };
                    addn(64, bytes.toString('utf8', pos_1181, position));
                    position++;
                    continue;
                };
                if (_16 == 30768) {
                    p = position;
                    p += 2;
                    _8 = get_8(position);
                    while ((_8 >= 65 && _8 <= 70) || (_8 >= 48 && _8 <= 57) || (_8 >= 97 && _8 <= 102)) {
                        _8 = get_8(++p);
                    };
                    if (p - position == 2) { throw fail('Integer `0x` not allowed!') };
                    addn(63, bytes.toString('ascii', position, p));
                    position = p;
                    continue;
                };
                if (_8 < 58) {
                    p = position;
                    _8 = get_8(p);
                    let found_1182 = 63;
                    while (_8 >= 48 && _8 <= 57) {
                        _8 = get_8(++p);
                    };
                    if (_8 == 46 && get_8(p + 1) != 46) {
                        _8 = get_8(++p);
                        while (_8 >= 48 && _8 <= 57) {
                            _8 = get_8(++p);
                        };
                        found_1182 = 60;
                    };
                    if (_8 == 101 || _8 == 69) {
                        _8 = get_8(++p);
                        if (_8 == 43 || _8 == 45) { _8 = get_8(++p) };
                        while (_8 >= 48 && _8 <= 57) {
                            _8 = get_8(++p);
                        };
                        found_1182 = 60;
                    };
                    addn(found_1182, bytes.toString('ascii', position, p));
                    position = p;
                    continue;
                };
                if (position >= len_1163) { break };
                throw fail('Unexpected character ' + String.fromCharCode(_8));
                break;
            };
            return new Tokens(tokens, to, params_1166, lines, columns, fileName);
        } };
    Lexer.init = () => { {
            Lexer.isident = Buffer.alloc(256);
            {
                let _8 = 0;
                while (_8 < 256) {
                    Lexer.isident[_8] = (((_8 >= 65 && _8 <= 90) || (_8 >= 48 && _8 <= 57) || (_8 >= 97 && _8 <= 122) || _8 == 95))? (128) : 0;
                    _8++;
                };
            };
            Lexer.isUpper = Buffer.alloc(256);
            {
                let _8 = 0;
                while (_8 < 256) {
                    Lexer.isident[_8] = (((_8 >= 65 && _8 <= 90) || (_8 >= 48 && _8 <= 57) || (_8 >= 97 && _8 <= 122) || _8 == 95))? (128) : 0;
                    _8++;
                };
            };
            Lexer.kwd = new Map([['_', 1], ['as', 58], ['break', 3], ['case', 4], ['catch', 6], ['class', 7], ['continue', 8], ['do', 9], ['else', 10], ['enum', 11], ['extends', 12], ['declare', 13], ['false', 14], ['for', 15], ['function', 16], ['if', 17], ['implements', 18], ['in', 20], ['interface', 22], ['let', 23], ['new', 25], ['null', 26], ['module', 28], ['private', 29], ['return', 31], ['static', 32], ['super', 59], ['switch', 33], ['this', 34], ['throw', 35], ['true', 36], ['try', 37], ['using', 39], ['var', 40], ['while', 41], ['is', 57]]);
            let ops8 = new Map([[64, 70], [36, 83], [35, 78], [33, 89], [37, 101], [38, 112], [40, 80], [41, 79], [42, 102], [43, 111], [44, 75], [45, 107], [46, 77], [47, 94], [58, 76], [59, 82], [60, 99], [61, 91], [62, 96], [63, 81], [91, 72], ['\\'.charCodeAt(0), 110], [93, 71], [94, 109], [123, 74], [124, 104], [125, 73], [126, 88]]);
            Lexer.ops8a = Buffer.alloc(256);
            for (const key of ops8.keys()) Lexer.ops8a[key] = ops8.get(key);
            let ops16 = new Map([[11051, 87], [11565, 86], [15420, 105], [15649, 103], [15676, 100], [15677, 95], [15678, 97], [15934, 106], [31868, 93], [9766, 92], [15933, 90], [11839, 113]]);
            for (const key1 of ops16.keys()) {
                for (const key2 of ops16.keys()) {
                    if (key1 != key2 && Lexer.simplehash(key1) == Lexer.simplehash(key2)) { throw new CompilerError(Fail.LexerError, '2-byte op hash collision: ' + key1 + ' ' + key2, 0, 0, 'INTERNAL') };
                };
            };
            Lexer.op16token = Buffer.alloc(768);
            for (const key of ops16.keys()) {
                let hash_1183 = Lexer.simplehash(key);
                Lexer.op16token.writeUInt16LE(key, hash_1183 * 2);
                Lexer.op16token[hash_1183 + 512] = ops16.get(key);
            };
            return;
        } };
    Lexer.simplehash = (val) => { {
            return ((val & 0xff) + (((val >> (8 * 1)) & 0xff) << 3)) & 0xEF;
        } };
    var Tokens = class {
        constructor(tokens_1184, length_1185, values_1186, lines_1187, columns_1188, fileName_1189) {
        {
            this.token = tokens_1184;
            this.length = length_1185;
            this.value = values_1186;
            this.line = lines_1187;
            this.column = columns_1188;
            this.fileName = fileName_1189;
        } };
    }
    var TestLexer = class {
    }
    TestLexer.test = () => { {
            console.log('TestLexer begin');
            TestLexer.compare('', [], []);
            TestLexer.compare('\n', [], []);
            TestLexer.compare('\n\n', [], []);
            TestLexer.compare('\r\r\n\r\n\r\t', [], []);
            TestLexer.compare(' ', [], []);
            TestLexer.compare('  ', [], []);
            TestLexer.compare(' ', [], []);
            TestLexer.compare('     ', [], []);
            TestLexer.compare('     ', [], []);
            TestLexer.compare('/* */', [], []);
            TestLexer.compare('/*\n*/', [], []);
            TestLexer.compare('123', [63], ['123']);
            TestLexer.compare(' 0 ', [63], ['0']);
            TestLexer.compare('0', [63], ['0']);
            TestLexer.compare('1 2 3', [63, 63, 63], ['1', '2', '3']);
            TestLexer.compare('0x1', [63], ['0x1']);
            TestLexer.compare('0x0', [63], ['0x0']);
            TestLexer.compare('0xF', [63], ['0xF']);
            TestLexer.compare('0xFA', [63], ['0xFA']);
            TestLexer.compare('0xFABCDEF', [63], ['0xFABCDEF']);
            TestLexer.compare('0x1F2A3B4C5D6E7F0', [63], ['0x1F2A3B4C5D6E7F0']);
            TestLexer.compare('0.123', [60], ['0.123']);
            TestLexer.compare('0.0', [60], ['0.0']);
            TestLexer.compare('\'s\'', [64], ['s']);
            TestLexer.compare('\"s\"', [64], ['s']);
            TestLexer.compare(' } ', [73], [null]);
            console.log('TestLexer done');
        } };
    TestLexer.compare = (input, expect, expectValue, expectColumn, expectLine) => { {
            expect.push(0);
            const output = Lexer.tokenize(Buffer.from(input), 'TEST');
            let pos_1190 = 0;
            for (const ex of expect) {
                if (ex == 0) { break };
                const incorrect = (text_1191) => {
                    let got = Token.stringify(output.token[pos_1190], output.value[pos_1190]);
                    console.log(('Incorrect token `' + (got) + '` in string `' + (input) + '` at index ' + (pos_1190) + ''));
                    console.log(text_1191);
                };
                if (ex != output.token[pos_1190]) { return incorrect(('Expected `' + (Token.stringify(ex)) + '`')) };
                if (expectValue[pos_1190] != output.value[pos_1190]) { return incorrect(('Expected value `' + (expectValue[pos_1190]) + '` but got `' + (output.value[pos_1190]) + '`')) };
            };
        } };
    var Parser = class {
        constructor(lexe_1192) {
            this.i = 0
            this.endif = 0
            this.lasttok = -1
            this.lasttokchecks = 10
            this.classExternal = false
            this.parametricTypeNesting = 0
            this.parametricTypeNestingToken = 0
        {
            this.lex = lexe_1192;
            let el_1193 = [];
            while (this.i < this.lex.length && this.tok() != 0) {
                el_1193.push(this.parseExpr());
            };
            this.nodes = el_1193;
        } };
        parseFields() { {
            let fields_1194 = [];
            while (this.tok() != 73) {
                let atts_1195 = [];
                while (this.tok() == 70) {
                    atts_1195.push(this.parseAttribute());
                };
                let _static = false;
                if (this.tok() == 32) {
                    _static = true;
                    this.i++;
                };
                {
                    const temp_1196 = this.tok();
                    switch (temp_1196) {
                    case 29: {
                        {
                            {
                                this.i++;
                            };
                        }
                    } break;

                    case 40: {
                        {
                            {
                                let f_1197 = this.parseExpr();
                                if (_static) { f_1197 = Node.TStatic(f_1197) };
                                Project.mapAttributes.set(f_1197, atts_1195);
                                fields_1194.push(f_1197);
                            };
                        }
                    } break;

                    case 16: {
                        {
                            {
                                let f_1198 = this.parseExpr();
                                if (_static) { f_1198 = Node.TStatic(f_1198) };
                                Project.mapAttributes.set(f_1198, atts_1195);
                                fields_1194.push(f_1198);
                            };
                        }
                    } break;

                    case 23: {
                        {
                            {
                                let f_1199 = this.parseExpr();
                                if (_static) { f_1199 = Node.TStatic(f_1199) };
                                Project.mapAttributes.set(f_1199, atts_1195);
                                fields_1194.push(f_1199);
                            };
                        }
                    } break;

                    case 25: {
                        {
                            {
                                this.i++;
                                let expr_1200 = null;
                                let vars_1201 = [];
                                let types_1202 = [];
                                let values_1203 = [];
                                this.step(80);
                                while (this.tok() != 79) {
                                    vars_1201.push(this.getgo(62));
                                    if (this.tok() == 76) {
                                        this.i++;
                                        types_1202.push(this.parseType());
                                    };
                                    if (this.tok() == 91) {
                                        this.i++;
                                        values_1203.push(this.parseExpr());
                                    };
                                    if (this.tok() == 75) { this.i++ };
                                };
                                this.step(79);
                                let tmp = this.i;
                                while (this.tok() == 70) this.parseAttribute();
                                if (this.tok() != 73 && this.tok() != 16) {
                                    this.i = tmp;
                                    expr_1200 = this.parseExpr();
                                } else this.i = tmp;
                                let v_1204 = [];
                                {
                                    const value_1205 = vars_1201.length;
                                    let i = 0;
                                    while (i < value_1205) {
                                        {
                                            v_1204.push(Node.TVar(vars_1201[i], types_1202[i], values_1203[i], true));
                                        };
                                        i++;
                                    };
                                };
                                fields_1194.push(Node.TFunction('new', expr_1200, v_1204, null));
                            };
                        }
                    } break;

                    default:
                    {
                        {
                            throw this.fail('Field cannot start with `' + this.print() + '`');
                        };
                    }
                    };
                };
            };
            return fields_1194;
        } };
        tok() { {
            if (this.i > this.lex.length) {
                console.log('Parser is out of token space!');
                console.log('This should NOT happen.');
                console.log('Please, issue a developer (with a sample code).');
                console.log('i = ' + this.i + ' length = ' + this.lex.length);
                console.log(this.lex);
                throw this.fail(this.lex.fileName + ': Parser Internal Error: Out of token space');
            };
            let t_1206 = this.lex.token[this.i];
            if (this.lasttok != this.i) {
                this.lasttok = this.i;
                this.lasttokchecks = 40;
            } else {
                this.lasttokchecks--;
                if (this.lasttokchecks < 0) { throw this.fail('Parser Internal Error: Same token parsed too many times: ' + ('`' + (this.print()) + '`')) };
            };
            if ((t_1206 == 78) && (this.lex.value[this.i + 1] == 'end')) { if (this.endif > 0) {
                this.i++;
                this.i++;
                this.endif--;
                this.tok();
            } else throw this.fail('Unexpected `#end`') };
            if ((t_1206 == 78) && (this.offset(1) == 17)) {
                this.i++;
                this.i++;
                const defName = this.getgo(62);
                const def = Project.defines[defName];
                if (def == null) { throw this.fail('`#if` tests for `' + defName + '` parameter which is *not* defined in project file') };
                if (def == true) { this.endif++ };
                if (def == false) {
                    let endifs = 1;
                    while (this.i < this.lex.length) {
                        if ((this.offset(0) == 78) && (this.offset(1) == 17)) {
                            this.i++;
                            this.i++;
                            endifs++;
                            continue;
                        };
                        if ((this.offset(0) == 78) && (this.lex.value[this.i + 1] == 'end')) {
                            this.i++;
                            this.i++;
                            endifs--;
                            if (endifs == 0) { break };
                            continue;
                        };
                        this.i++;
                    };
                };
                this.tok();
            };
            return this.lex.token[this.i];
        } };
        print() { return Token.stringify(this.lex.token[this.i], this.lex.value[this.i]) };
        expect(t_1207) { if (t_1207 != this.tok()) { this.expected(Token.stringify(t_1207)) } };
        fail(message_1208, line_1209, column_1210, filename_1211) { {
            const line_1212 = line_1209 != (null)? (line_1209) : this.lex.line[this.i];
            const column_1213 = column_1210 != (null)? (column_1210) : this.lex.column[this.i];
            const filename_1214 = filename_1211 != (null)? (filename_1211) : this.lex.fileName;
            return new CompilerError(Fail.ParserError, message_1208, line_1212, column_1213, filename_1214);
        } };
        getgo(t_1215) { {
            this.expect(t_1215);
            return this.lex.value[this.i++];
        } };
        step(t_1216) { {
            this.expect(t_1216);
            this.i++;
        } };
        next() { {
            this.i++;
        } };
        offset(v_1217) { {
            return this.lex.token[this.i + v_1217];
        } };
        unexpected() { {
            let token_1218 = Token.stringify(this.lex.token[this.i], this.lex.value[this.i]);
            if (this.tok() == 82) { console.log('Note, that Hexa has no semicolons!') };
            if (this.print() == 'public') { console.log('Note, that Hexa has no `public` keyword!') };
            throw this.fail(('Unexpected `' + (token_1218) + '`'));
        } };
        expected(str_1219) { {
            let token_1220 = Token.stringify(this.lex.token[this.i], this.lex.value[this.i]);
            throw this.fail(('Expected `' + (str_1219) + '` before `' + (token_1220) + '`'));
        } };
        parseExpr() { {
            let atts_1221 = [];
            while (this.tok() == 70) atts_1221.push(this.parseAttribute());
            let node_1222 = this.tok();
            let nodePosition = {line:this.lex.line[this.i], column:this.lex.column[this.i]};
            let result_1223 = null;
            {
                const temp_1224 = node_1222;
                switch (temp_1224) {
                case 39: {
                    {
                        {
                            this.next();
                            let names_1225 = [this.getgo(61)];
                            while (this.tok() == 75) {
                                this.step(75);
                                names_1225.push(this.getgo(61));
                            };
                            result_1223 = Node.TUsing(names_1225);
                        };
                    }
                } break;

                case 13: {
                    {
                        {
                            this.i++;
                            let e_1226 = null;
                            {
                                const temp_1227 = this.tok();
                                switch (temp_1227) {
                                case 16: {
                                    {
                                        {
                                            e_1226 = this.parseFunction(false);
                                        };
                                    }
                                } break;

                                case 61: {
                                    {
                                        {
                                            let left = this.parseType();
                                            this.step(91);
                                            e_1226 = Node.TBinop(Node.NodeTypeValue(left), 91, Node.NodeTypeValue(this.parseType()));
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        e_1226 = this.parseExpr();
                                        {
                                            const temp_1228 = e_1226;
                                            switch (temp_1228 && temp_1228[1]) {
                                            case 24: {
                                                {
                                                    const t_1229 = temp_1228[2];
                                                    const ext_1230 = temp_1228[3];
                                                    const impl_1231 = temp_1228[4];
                                                    const fields_1232 = temp_1228[5];
                                                    {
                                                        e_1226 = Node.TClass(t_1229, ext_1230, impl_1231, fields_1232, true);
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                };
                                            }
                                            };
                                        };
                                    };
                                }
                                };
                            };
                            let name_1233 = null;
                            let extracted = null;
                            {
                                const temp_1234 = e_1226;
                                switch (temp_1234 && temp_1234[1]) {
                                case 42: {
                                    {
                                        const el_1235 = temp_1234[2];
                                        {
                                            extracted = el_1235;
                                        };
                                    }
                                } break;

                                case 41: {
                                    {
                                        const el_1236 = temp_1234[2];
                                        {
                                            extracted = el_1236;
                                        };
                                    }
                                } break;

                                case 43: {
                                    {
                                        const el_1237 = temp_1234[2];
                                        {
                                            extracted = el_1237;
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        extracted = e_1226;
                                    };
                                }
                                };
                            };
                            {
                                const temp_1238 = extracted;
                                switch (temp_1238 && temp_1238[1]) {
                                case 8: {
                                    {
                                        const a_1239 = temp_1238[2];
                                        const op_1240 = temp_1238[3];
                                        const b_1241 = temp_1238[4];
                                        {
                                            if (op_1240 != 91) { throw this.fail(('declare =, got ' + (Token.stringify(op_1240)) + '')) };
                                            {
                                                const temp_1242 = a_1239;
                                                switch (temp_1242 && temp_1242[1]) {
                                                case 46: {
                                                    {
                                                        const t_1243 = temp_1242[2];
                                                        {
                                                            {
                                                                const temp_1244 = t_1243;
                                                                switch (temp_1244 && temp_1244[1]) {
                                                                case 1: {
                                                                    {
                                                                        const n_1245 = temp_1244[2];
                                                                        {
                                                                            name_1233 = n_1245;
                                                                        };
                                                                    }
                                                                } break;

                                                                case 2: {
                                                                    {
                                                                        const n_1246 = temp_1244[2];
                                                                        {
                                                                            name_1233 = n_1246;
                                                                        };
                                                                    }
                                                                } break;
                                                                };
                                                            };
                                                        };
                                                    }
                                                } break;

                                                case 1: {
                                                    {
                                                        const n_1247 = temp_1242[2];
                                                        {
                                                            name_1233 = n_1247;
                                                        };
                                                    }
                                                } break;
                                                };
                                            };
                                        };
                                    }
                                } break;

                                case 24: {
                                    {
                                        const t_1248 = temp_1238[2];
                                        {
                                            {
                                                const temp_1249 = t_1248;
                                                switch (temp_1249 && temp_1249[1]) {
                                                case 1: {
                                                    {
                                                        const n_1250 = temp_1249[2];
                                                        {
                                                            name_1233 = n_1250;
                                                        };
                                                    }
                                                } break;

                                                case 2: {
                                                    {
                                                        const n_1251 = temp_1249[2];
                                                        {
                                                            name_1233 = n_1251;
                                                        };
                                                    }
                                                } break;
                                                };
                                            };
                                        };
                                    }
                                } break;

                                case 22: {
                                    {
                                        const n_1252 = temp_1238[2];
                                        const t_1253 = temp_1238[3];
                                        const e_1254 = temp_1238[4];
                                        {
                                            if (t_1253 == null) { throw this.fail(('Variable `' + (n_1252) + '` in `declare` should have a type')) };
                                            if (e_1254 != null) { throw this.fail(('Variable `' + (n_1252) + '` in `declare` should *not* have a value')) };
                                            name_1233 = n_1252;
                                        };
                                    }
                                } break;

                                case 20: {
                                    {
                                        const n_1255 = temp_1238[2];
                                        const e_1256 = temp_1238[3];
                                        {
                                            if (n_1255 == null) { throw this.fail('Function in `declare` should have a name') };
                                            if (e_1256 != null) { throw this.fail('Functions in `declare` should *not* have a body') };
                                            name_1233 = n_1255;
                                        };
                                    }
                                } break;

                                case 23: {
                                    {
                                        {
                                            throw this.fail('Place only one variable into `declare`');
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw this.fail('Incorrect `declare` syntax! Use `declare let name: T` or `declare function name(): T`');
                                    };
                                }
                                };
                            };
                            result_1223 = Node.TDeclare(name_1233, e_1226);
                        };
                    }
                } break;

                case 74: {
                    {
                        {
                            this.i++;
                            if (this.tok() == 73) {
                                this.i++;
                                result_1223 = Node.TBlock([]);
                            } else if (this.tok() == 76) {
                                this.i++;
                                this.step(73);
                                result_1223 = Node.TObject([], []);
                            } else if (this.tok() == 62 && this.lex.token[this.i + 1] == 76) {
                                let names_1257 = [];
                                let el_1258 = [];
                                while (this.tok() != 73) {
                                    names_1257.push(this.getgo(62));
                                    this.step(76);
                                    el_1258.push(this.parseExpr());
                                    if (this.tok() == 75) { this.i++ };
                                };
                                this.step(73);
                                result_1223 = Node.TObject(names_1257, el_1258);
                            } else {
                                let el_1259 = [];
                                while (this.tok() != 73) {
                                    el_1259.push(this.parseExpr());
                                };
                                this.step(73);
                                result_1223 = Node.TBlock(el_1259);
                            };
                        };
                    }
                } break;

                case 17: {
                    {
                        {
                            this.i++;
                            this.step(80);
                            let econd_1260 = [this.parseExpr()];
                            while (this.tok() == 75) {
                                this.next();
                                econd_1260.push(this.parseExpr());
                            };
                            this.step(79);
                            let eif_1261 = null;
                            if (this.tok() != 76) { eif_1261 = this.parseExpr() };
                            let eelse_1262 = null;
                            if (this.tok() == 10) {
                                this.i++;
                                eelse_1262 = this.parseExpr();
                            };
                            result_1223 = Node.TIf(econd_1260, eif_1261, eelse_1262);
                        };
                    }
                } break;

                case 41: {
                    {
                        {
                            this.i++;
                            this.step(80);
                            let econd_1263 = this.parseExpr();
                            this.step(79);
                            let e_1264 = this.parseExpr();
                            result_1223 = Node.TWhile(econd_1263, e_1264, true);
                        };
                    }
                } break;

                case 9: {
                    {
                        {
                            this.i++;
                            let e_1265 = this.parseExpr();
                            this.step(41);
                            this.step(80);
                            let econd_1266 = this.parseExpr();
                            this.step(79);
                            result_1223 = Node.TWhile(econd_1266, e_1265, false);
                        };
                    }
                } break;

                case 80: {
                    {
                        {
                            this.next();
                            if ((this.tok() == 79 && this.offset(1) == 90) || (this.tok() == 62 && this.offset(1) == 75) || (this.tok() == 62 && this.offset(1) == 76) || (this.tok() == 62 && this.offset(1) == 79 && this.offset(2) == 90)) {
                                let vars_1267 = [];
                                let types_1268 = [];
                                let values_1269 = [];
                                while (this.tok() != 79) {
                                    vars_1267.push(this.getgo(62));
                                    if (this.tok() == 76) {
                                        this.i++;
                                        types_1268.push(this.parseType());
                                    };
                                    if (this.tok() == 91) {
                                        this.i++;
                                        values_1269.push(this.parseExpr());
                                    };
                                    if (this.tok() == 75) { this.i++ };
                                };
                                this.step(79);
                                this.step(90);
                                let v_1270 = [];
                                {
                                    const value_1271 = vars_1267.length;
                                    let i = 0;
                                    while (i < value_1271) {
                                        {
                                            v_1270.push(Node.TVar(vars_1267[i], types_1268[i], values_1269[i], true));
                                        };
                                        i++;
                                    };
                                };
                                result_1223 = Node.TArrow(this.parseExpr(), v_1270, null);
                            } else {
                                let expr_1272 = this.parseExpr();
                                this.step(79);
                                result_1223 = Node.TParenthesis(expr_1272);
                            };
                        };
                    }
                } break;

                case 31: {
                    {
                        {
                            this.i++;
                            {
                                const temp_1273 = this.tok();
                                switch (temp_1273) {
                                case 73: {
                                    {
                                        {
                                            result_1223 = Node.TReturn(null);
                                        };
                                    }
                                } break;

                                case 40: {
                                    {
                                        {
                                            result_1223 = Node.TReturn(null);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        result_1223 = Node.TReturn(this.parseExpr());
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                case 35: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TThrow(this.parseExpr());
                        };
                    }
                } break;

                case 8: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TContinue;
                        };
                    }
                } break;

                case 3: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TBreak;
                        };
                    }
                } break;

                case 1: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TUnderscore;
                        };
                    }
                } break;

                case 88: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TUnop(88, false, this.parseExpr());
                        };
                    }
                } break;

                case 107: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TUnop(107, false, this.parseExpr());
                        };
                    }
                } break;

                case 89: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TUnop(89, false, this.parseExpr());
                        };
                    }
                } break;

                case 87: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TUnop(87, false, this.parseExpr());
                        };
                    }
                } break;

                case 86: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TUnop(86, false, this.parseExpr());
                        };
                    }
                } break;

                case 98: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TUnop(98, false, this.parseExpr());
                        };
                    }
                } break;

                case 60: {
                    {
                        {
                            result_1223 = Node.TFloat(this.getgo(60));
                        };
                    }
                } break;

                case 63: {
                    {
                        {
                            result_1223 = Node.TInt(this.getgo(63));
                        };
                    }
                } break;

                case 61: {
                    {
                        {
                            if (this.lex.token[this.i + 1] == 99) {
                                let res = this.parseType();
                                result_1223 = Node.NodeTypeValue(res);
                            } else {
                                let name_1274 = this.getgo(61);
                                result_1223 = Node.TIdent(name_1274);
                            };
                        };
                    }
                } break;

                case 62: {
                    {
                        {
                            let name_1275 = this.getgo(62);
                            if (this.tok() == 90) {
                                this.next();
                                result_1223 = Node.TArrow(this.parseExpr(), [Node.TVar(name_1275, null, null, true)], null);
                            } else result_1223 = Node.TIdent(name_1275);
                        };
                    }
                } break;

                case 66: {
                    {
                        {
                            result_1223 = Node.TString(this.getgo(66));
                        };
                    }
                } break;

                case 64: {
                    {
                        {
                            let str_1276 = this.getgo(64);
                            if (this.hasInterpolation(str_1276)) { result_1223 = Node.TParenthesis(this.parseInterpolations(str_1276)) } else result_1223 = Node.TString(str_1276);
                        };
                    }
                } break;

                case 36: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TBool(true);
                        };
                    }
                } break;

                case 14: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TBool(false);
                        };
                    }
                } break;

                case 34: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TThis;
                        };
                    }
                } break;

                case 26: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TNull;
                        };
                    }
                } break;

                case 59: {
                    {
                        {
                            this.i++;
                            result_1223 = Node.TSuper;
                        };
                    }
                } break;

                case 40: {
                    {
                        {
                            let parsed = this.parseVar();
                            if (parsed.length > 1) { result_1223 = Node.TVars(parsed) } else result_1223 = parsed[0];
                        };
                    }
                } break;

                case 23: {
                    {
                        {
                            let parsed_1277 = this.parseVar();
                            if (parsed_1277.length > 1) { result_1223 = Node.TVars(parsed_1277) } else result_1223 = parsed_1277[0];
                        };
                    }
                } break;

                case 37: {
                    {
                        {
                            this.i++;
                            let expr_1278 = this.parseExpr();
                            let vars_1279 = [];
                            let t_1280 = [];
                            let v_1281 = [];
                            let catches_1282 = [];
                            while (this.tok() == 6) {
                                this.step(6);
                                this.step(80);
                                let name_1283 = this.getgo(62);
                                vars_1279.push(name_1283);
                                this.step(76);
                                let type_1284 = this.parseType();
                                {
                                    t_1280.push(type_1284);
                                };
                                v_1281.push(Node.TVar(name_1283, type_1284, null, true));
                                this.step(79);
                                catches_1282.push(this.parseExpr());
                            };
                            result_1223 = Node.TTry(expr_1278, t_1280, v_1281, catches_1282);
                        };
                    }
                } break;

                case 28: {
                    {
                        {
                            this.i++;
                            let path_1285 = [];
                            if (this.tok() == 62) {
                                path_1285.push(this.getgo(62));
                                while (this.tok() == 77) {
                                    this.i++;
                                    path_1285.push(this.getgo(62));
                                };
                            };
                            this.step(74);
                            let el_1286 = [];
                            while (this.tok() != 73) {
                                el_1286.push(this.parseExpr());
                            };
                            this.step(73);
                            result_1223 = Node.TModule(path_1285, el_1286);
                        };
                    }
                } break;

                case 11: {
                    {
                        {
                            this.i++;
                            let t_1287 = this.parseType();
                            let valuesType_1288 = null;
                            if (this.tok() == 76) {
                                this.i++;
                                valuesType_1288 = this.parseType();
                            };
                            this.step(74);
                            let names_1289 = [];
                            while (this.tok() != 73) {
                                while (this.tok() == 70) atts_1221.push(this.parseAttribute());
                                atts_1221 = [];
                                names_1289.push(this.parseExpr());
                            };
                            this.step(73);
                            result_1223 = Node.TEnum(t_1287, names_1289, valuesType_1288);
                        };
                    }
                } break;

                case 7: case 22: {
                    {
                        {
                            let isInterface = this.tok() == 22;
                            let att = atts_1221;
                            atts_1221 = [];
                            this.i++;
                            let t_1290 = this.parseType();
                            let ext_1291 = (this.tok() == 12)? ((() => {
                                this.i++;
                                return this.parseType();
                            })()) : null;
                            let impl_1292 = [];
                            while (this.tok() == 18) {
                                this.i++;
                                impl_1292.push(this.parseType());
                            };
                            this.step(74);
                            let fields_1293 = this.parseFields();
                            this.step(73);
                            let me = Node.TClass(t_1290, ext_1291, impl_1292, fields_1293, this.classExternal);
                            Project.mapAttributes.set(me, att);
                            result_1223 = me;
                        };
                    }
                } break;

                case 16: {
                    {
                        {
                            result_1223 = this.parseFunction();
                        };
                    }
                } break;

                case 72: {
                    {
                        {
                            this.i++;
                            let el_1294 = [];
                            let values_1295 = [];
                            let isMap = false;
                            while (this.tok() != 71) {
                                if (this.tok() == 76) {
                                    isMap = true;
                                    this.next();
                                    break;
                                };
                                el_1294.push(this.parseExpr());
                                if (this.tok() == 76) {
                                    this.i++;
                                    values_1295.push(this.parseExpr());
                                    isMap = true;
                                };
                                if (this.tok() == 75) { this.i++ };
                            };
                            this.step(71);
                            if (isMap) { result_1223 = Node.TMap(el_1294, values_1295) } else result_1223 = Node.TArray(el_1294);
                        };
                    }
                } break;

                case 25: {
                    {
                        {
                            this.i++;
                            let t_1296 = this.parseType();
                            let names_1297 = [];
                            let values_1298 = [];
                            if (this.tok() == 74) {
                                this.i++;
                                if (this.tok() == 76) {
                                    this.i++;
                                    this.step(73);
                                } else if (this.tok() == 62 && this.lex.token[this.i + 1] == 76) {
                                    while (this.tok() != 73) {
                                        names_1297.push(this.getgo(62));
                                        this.step(76);
                                        values_1298.push(this.parseExpr());
                                        if (this.tok() == 75) { this.i++ };
                                    };
                                    this.step(73);
                                } else if (this.tok() == 73) { this.step(73) };
                            };
                            this.step(80);
                            let args_1299 = [];
                            while (this.tok() != 79) {
                                args_1299.push(this.parseExpr());
                                if (this.tok() == 75) { this.i++ };
                            };
                            this.step(79);
                            result_1223 = Node.TNew([], t_1296, args_1299, names_1297, values_1298);
                        };
                    }
                } break;

                case 33: {
                    {
                        {
                            this.i++;
                            this.step(80);
                            let exprs_1300 = [this.parseExpr()];
                            while (this.tok() == 75) {
                                this.i++;
                                exprs_1300.push(this.parseExpr());
                            };
                            this.step(79);
                            this.step(74);
                            let cases_1301 = [];
                            let conds_1302 = [];
                            let guards_1303 = [];
                            while (this.tok() != 73) {
                                this.step(4);
                                if (this.tok() == 1) {
                                    conds_1302.push(Node.TUnderscore);
                                    this.i++;
                                } else conds_1302.push(this.parseExpr());
                                guards_1303.push(null);
                                this.step(76);
                                let exs = [];
                                while (this.tok() != 4 && this.tok() != 73) {
                                    exs.push(this.parseExpr());
                                };
                                cases_1301.push(Node.TBlock(exs));
                            };
                            this.step(73);
                            result_1223 = Node.TSwitch(exprs_1300, conds_1302, guards_1303, cases_1301);
                        };
                    }
                } break;

                case 15: {
                    {
                        {
                            this.i++;
                            this.step(80);
                            let n_1304 = this.getgo(62);
                            this.step(20);
                            let a_1305 = this.parseExpr();
                            this.step(79);
                            let b_1306 = this.parseExpr();
                            result_1223 = Node.TFor(n_1304, a_1305, b_1306);
                        };
                    }
                } break;

                case 32: {
                    {
                        {
                            this.next();
                            result_1223 = Node.TStatic(this.parseExpr());
                        };
                    }
                } break;

                case 29: {
                    {
                        {
                            this.next();
                            result_1223 = Node.TPrivate(this.parseExpr());
                        };
                    }
                } break;

                default:
                {
                    {
                        this.unexpected();
                    };
                }
                };
            };
            if (result_1223 == null) {
                Process.stdout.write('\n');
                throw this.fail('Expression is incomplete, current tokens is: ' + Token.stringify(this.tok()));
            };
            Project.data.set(result_1223, new NodeData(nodePosition.line, nodePosition.column, this.lex.fileName));
            if (atts_1221.length > 0) {
                Project.mapAttributes.set(result_1223, atts_1221);
                atts_1221 = [];
            };
            let done = this.i >= this.lex.length;
            while (!done) {
                {
                    const temp_1307 = this.tok();
                    switch (temp_1307) {
                    case 0: {
                        {
                            {
                                done = true;
                            };
                        }
                    } break;

                    case 72: {
                        {
                            {
                                this.i++;
                                let index_1308 = this.parseExpr();
                                this.step(71);
                                result_1223 = Node.TIndex(result_1223, index_1308);
                            };
                        }
                    } break;

                    case 57: {
                        {
                            {
                                this.i++;
                                {
                                    const temp_1309 = this.tok();
                                    switch (temp_1309) {
                                    case 61: {
                                        {
                                            {
                                                result_1223 = Node.TIs(result_1223, this.parseType());
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            throw this.fail('Cannot parse type `' + Token.stringify(this.tok()) + '`');
                                        };
                                    }
                                    };
                                };
                            };
                        }
                    } break;

                    case 58: {
                        {
                            {
                                this.i++;
                                let kind_1310 = this.tok();
                                if (this.tok() == 89) { this.i++ } else if (this.tok() == 81) { this.i++ } else kind_1310 = 123;
                                result_1223 = Node.TAs(result_1223, kind_1310, this.parseType());
                            };
                        }
                    } break;

                    case 80: {
                        {
                            {
                                {
                                    let args_1311 = [];
                                    let argNames_1312 = [];
                                    this.i++;
                                    while (this.tok() != 79) {
                                        let argname = null;
                                        {
                                            const temp_1313 = this.tok();
                                            switch (temp_1313) {
                                            case 61: {
                                                {
                                                    {
                                                        args_1311.push(this.parseExpr());
                                                        if (this.tok() == 76) {
                                                            this.step(76);
                                                            this.parseType();
                                                        };
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                    if (this.lex.token[this.i + 1] == 76) {
                                                        argNames_1312.push(this.getgo(62));
                                                        this.step(76);
                                                    } else {
                                                        argNames_1312.push(null);
                                                    };
                                                    args_1311.push(this.parseExpr());
                                                };
                                            }
                                            };
                                        };
                                        if (this.tok() != 79) { this.step(75) };
                                    };
                                    this.step(79);
                                    result_1223 = Node.TCall(result_1223, args_1311, argNames_1312);
                                };
                            };
                        }
                    } break;

                    case 90: {
                        {
                            {
                                this.next();
                                result_1223 = Node.TArrow(this.parseExpr(), [result_1223], null);
                            };
                        }
                    } break;

                    case 87: {
                        {
                            {
                                this.i++;
                                result_1223 = Node.TUnop(87, true, result_1223);
                            };
                        }
                    } break;

                    case 86: {
                        {
                            {
                                this.i++;
                                result_1223 = Node.TUnop(86, true, result_1223);
                            };
                        }
                    } break;

                    case 77: {
                        {
                            {
                                this.i++;
                                let name_1314 = null;
                                {
                                    const temp_1315 = this.tok();
                                    switch (temp_1315) {
                                    case 61: {
                                        {
                                            {
                                                name_1314 = this.getgo(61);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            name_1314 = this.getgo(62);
                                        };
                                    }
                                    };
                                };
                                result_1223 = Node.TDot(result_1223, name_1314);
                            };
                        }
                    } break;

                    case 81: {
                        {
                            {
                                this.i++;
                                if (this.tok() == 77) {
                                    let name_1316 = this.getgo(62);
                                    result_1223 = Node.TDot(result_1223, name_1316);
                                } else if (this.tok() == 81) {
                                    this.i++;
                                    result_1223 = Node.TElvis(result_1223, this.parseExpr());
                                } else {
                                    let eif_1317 = this.parseExpr();
                                    this.step(76);
                                    let eelse_1318 = this.parseExpr();
                                    result_1223 = Node.TIf([result_1223], eif_1317, eelse_1318);
                                };
                            };
                        }
                    } break;

                    case 113: {
                        {
                            {
                                this.i++;
                                result_1223 = this.parseExpr();
                            };
                        }
                    } break;

                    default:
                    {
                        {
                            const t_1319 = this.tok();
                            if (Parser.isBinop(t_1319) && this.offset(1) == 91) {
                                let op_1320 = this.tok();
                                this.i++;
                                this.i++;
                                let b_1321 = this.parseExpr();
                                result_1223 = Node.TAssignop(result_1223, op_1320, b_1321);
                            } else if (Parser.isBinop(t_1319)) {
                                this.i++;
                                let b_1322 = this.parseExpr();
                                let a_1323 = result_1223;
                                {
                                    const temp_1324 = b_1322;
                                    switch (temp_1324 && temp_1324[1]) {
                                    case 8: {
                                        {
                                            const aa = temp_1324[2];
                                            const op_1325 = temp_1324[3];
                                            const bb = temp_1324[4];
                                            {
                                                let tp = this.precedence(t_1319);
                                                let tLeft = tp > 99;
                                                tp = tp % 100;
                                                let bp = this.precedence(op_1325);
                                                let bLeft = bp > 99;
                                                bp = bp % 100;
                                                if (bp > tp) { result_1223 = Node.TBinop(Node.TBinop(result_1223, t_1319, aa), op_1325, bb) } else result_1223 = Node.TBinop(result_1223, t_1319, b_1322);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            result_1223 = Node.TBinop(result_1223, t_1319, b_1322);
                                        };
                                    }
                                    };
                                };
                            } else done = true;
                        };
                    }
                    };
                };
            };
            if (result_1223 == null) {
                Process.stdout.write('\n');
                throw this.fail('Expression postfix is incomplete');
            };
            if (atts_1221.length > 0) {
                Project.mapAttributes.set(result_1223, atts_1221);
                atts_1221 = [];
            };
            Project.data.set(result_1223, new NodeData(nodePosition.line, nodePosition.column, this.lex.fileName));
            return result_1223;
        } };
        parseVar() { {
            let const_1326 = this.tok() == 23;
            this.i++;
            let vars_1327 = [];
            const parseSingleVar = () => {
                let varname = this.getgo(62);
                if (varname.endsWith('___')) { throw this.fail('Variables can\'t end with `___`, it is reserved.') };
                let type_1328 = null;
                if (this.tok() == 76) {
                    this.i++;
                    type_1328 = this.parseType();
                };
                let expr_1329 = null;
                if (this.tok() == 91) {
                    this.i++;
                    expr_1329 = this.parseExpr();
                };
                return Node.TVar(varname, type_1328, expr_1329, const_1326);
            };
            const parseSingleBinding = () => {
                let path_1330 = [];
                while (this.tok() == 62 && this.offset(1) == 77) {
                    path_1330.push(this.getgo(62));
                    this.i++;
                };
                path_1330.push(this.getgo(61));
                this.step(77);
                path_1330.push(this.getgo(61));
                if (this.tok() == 80 && this.offset(1) == 79) { throw this.fail('Don\'t use empty parenthesis for `let ' + path_1330.join('.') + '()` bindings') };
                let bind_1331 = [];
                if (this.tok() == 80) {
                    do {{
                        this.i++;
                        if (this.tok() == 1) {
                            this.i++;
                            bind_1331.push(null);
                        } else bind_1331.push(Node.TVar(this.getgo(62), null, null, const_1326));
                    }} while (this.tok() == 75);
                    this.step(79);
                };
                this.step(91);
                let expr_1332 = this.parseExpr();
                return Node.TEnumExtract(path_1330, bind_1331, expr_1332);
            };
            while (true) {
                if (this.tok() == 61 || (this.tok() == 62 && this.offset(1) == 77)) { vars_1327.push(parseSingleBinding()) } else vars_1327.push(parseSingleVar());
                if (this.tok() == 75 && this.offset(1) == 62 && (this.offset(2) == 91 || this.offset(2) == 76)) { this.i++ } else break;
            };
            return vars_1327;
            let const_1333 = this.tok() == 23;
            this.i++;
            let vars_1334 = [];
            {
                const temp_1335 = this.tok();
                switch (temp_1335) {
                case 62: {
                    {
                        {
                            while (true) {
                                let varname_1336 = this.getgo(62);
                                if (varname_1336.endsWith('___')) { throw this.fail('Variables can\'t end with `___`, it is reserved.') };
                                let type_1337 = null;
                                if (this.tok() == 76) {
                                    this.i++;
                                    type_1337 = this.parseType();
                                };
                                let expr_1338 = null;
                                if (this.tok() == 91) {
                                    this.i++;
                                    expr_1338 = this.parseExpr();
                                };
                                vars_1334.push(Node.TVar(varname_1336, type_1337, expr_1338, const_1333));
                                if (this.tok() == 75 && this.offset(1) == 62 && (this.offset(2) == 91 || this.offset(2) == 76)) { this.i++ } else break;
                            };
                        };
                    }
                } break;

                case 61: {
                    {
                        {
                            let left_1339 = Node.TIdent(this.getgo(61));
                            let res_1340 = left_1339;
                            while (this.tok() == 77) {
                                res_1340 = Node.TDot(res_1340, this.getgo(61));
                            };
                            {
                                const temp_1341 = this.tok();
                                switch (temp_1341) {
                                case 80: {
                                    {
                                        {
                                            let args_1342 = [];
                                            while (this.tok() != 79) {
                                                args_1342.push(this.getgo(62));
                                            };
                                            this.step(91);
                                            let varname_1343 = this.getgo(62);
                                        };
                                    }
                                } break;

                                case 91: {
                                    {
                                        {
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw this.fail('Wrong syntax');
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                default:
                {
                    {
                        throw this.fail('Wrong syntax');
                    };
                }
                };
            };
            return vars_1334;
        } };
        parseFunction(parseBody) { {
            const parseBody_1344 = ((parseBody != null))? (parseBody) : true;
            this.i++;
            let expr_1345 = null;
            let name_1346 = null;
            let vars_1347 = [];
            let types_1348 = [];
            let values_1349 = [];
            {
                const temp_1350 = this.tok();
                switch (temp_1350) {
                case 62: {
                    {
                        {
                            name_1346 = this.getgo(62);
                        };
                    }
                } break;

                case 61: {
                    {
                        {
                            throw this.fail('Function names can\'t start with uppercase.');
                        };
                    }
                } break;

                default:
                {
                    {
                    };
                }
                };
            };
            this.step(80);
            {
                while (this.tok() != 79) {
                    let expr_1351 = null;
                    let t_1352 = null;
                    if (this.tok() == 98) { this.i++ };
                    let name_1353 = this.getgo(62);
                    if (this.tok() == 76) {
                        this.i++;
                        t_1352 = this.parseType();
                    };
                    if (this.tok() == 91) {
                        this.i++;
                        expr_1351 = this.parseExpr();
                    };
                    vars_1347.push(name_1353);
                    types_1348.push(t_1352);
                    values_1349.push(expr_1351);
                    if (this.tok() == 75) { this.i++ };
                };
                this.step(79);
            };
            let rettype_1354 = null;
            if (this.tok() == 76) {
                this.i++;
                rettype_1354 = this.parseType();
            };
            if (parseBody_1344) {
                const temp_1355 = this.tok();
                switch (temp_1355) {
                case 25: {
                    {
                        {
                            if (this.lex.token[this.i + 1] == 80) {} else expr_1345 = this.parseExpr();
                        };
                    }
                } break;

                case 73: {
                    {
                        {
                            {
                            };
                        };
                    }
                } break;

                case 32: {
                    {
                        {
                            {
                            };
                        };
                    }
                } break;

                case 29: {
                    {
                        {
                            {
                            };
                        };
                    }
                } break;

                case 16: {
                    {
                        {
                            {
                            };
                        };
                    }
                } break;

                case 70: {
                    {
                        {
                            {
                                let tmp_1356 = this.i;
                                while (this.tok() == 70) this.parseAttribute();
                                if (this.tok() != 73 && this.tok() != 32 && this.tok() != 29 && this.tok() != 16) {
                                    this.i = tmp_1356;
                                    expr_1345 = this.parseExpr();
                                } else this.i = tmp_1356;
                            };
                        };
                    }
                } break;

                default:
                {
                    {
                        expr_1345 = this.parseExpr();
                    };
                }
                };
            };
            let v_1357 = [];
            {
                const value_1358 = vars_1347.length;
                let i = 0;
                while (i < value_1358) {
                    {
                        v_1357.push(Node.TVar(vars_1347[i], types_1348[i], values_1349[i], true));
                    };
                    i++;
                };
            };
            return (Node.TFunction(name_1346, expr_1345, v_1357, rettype_1354));
        } };
        hasInterpolation(str_1359) { {
            let chars = str_1359.split('');
            let i_1360 = 0;
            while (i_1360 < chars.length) {
                if (chars[i_1360] == '\\') { if (i_1360 + 1 < chars.length) { if (chars[i_1360 + 1] == '\\') { i_1360++ } else if (chars[i_1360 + 1] == '(') { return true } } };
                i_1360++;
            };
            return false;
        } };
        parseInterpolations(str_1361) { {
            const interpolate = (s_1362) => {
                let out_1363 = ['"'];
                if (s_1362.length < 2) { return s_1362 };
                let i_1364 = 0;
                const s_1365 = s_1362.split('"').join('\\"');
                const pushInterpolator = () => {
                    i_1364++;
                    i_1364++;
                    const pushParen = () => {
                        i_1364++;
                        while (i_1364 < s_1365.length) {
                            out_1363.push(s_1365.charAt(i_1364));
                            if (s_1365.charAt(i_1364) == '(') {
                                pushParen();
                                continue;
                            };
                            if (s_1365.charAt(i_1364) == ')') {
                                i_1364++;
                                return;
                            };
                            i_1364++;
                        };
                        throw 'String interpolation error: unclosed inner parenthesis';
                    };
                    while (i_1364 < s_1365.length) {
                        out_1363.push(s_1365.charAt(i_1364));
                        if (s_1365.charAt(i_1364) == '(') {
                            pushParen();
                            continue;
                        };
                        if (s_1365.charAt(i_1364) == ')') {
                            i_1364++;
                            return;
                        };
                        i_1364++;
                    };
                    throw 'String interpolation error: unclosed parenthesis';
                };
                let result_1366 = ['"'];
                while (i_1364 < s_1365.length) {
                    if (s_1365.charAt(i_1364) == '\\' && s_1365.charAt(i_1364 + 1) == '(') {
                        result_1366.push('" + ');
                        out_1363.push('" + (');
                        let ii = i_1364 + 1;
                        pushInterpolator();
                        result_1366.push(s_1365.substring(ii, i_1364 + 1));
                        result_1366.push(' + "');
                        out_1363.push(' + "');
                    } else {
                        out_1363.push(s_1365.charAt(i_1364));
                        result_1366.push(s_1365.charAt(i_1364));
                        i_1364++;
                    };
                };
                result_1366.push('"');
                out_1363.push('"');
                return out_1363.join('');
            };
            let resStr = interpolate(str_1361);
            let tokens_1367 = Lexer.tokenize(Buffer.from(resStr), '');
            try {
                {
                    let parsed_1368 = Parser.toNode(Parser.parseNodes(tokens_1367));
                    {
                        const temp_1369 = parsed_1368;
                        switch (temp_1369 && temp_1369[1]) {
                        case 10: {
                            {
                                {
                                    throw 'Parse interpolation error: got a block';
                                };
                            }
                        } break;

                        default:
                        {
                            {
                                return parsed_1368;
                            };
                        }
                        };
                    };
                }
            } catch (e) {
                {
                    throw this.fail('Parse interpolation error: ' + e);
                }
            };
        } };
        parseAttribute() { {
            this.i++;
            let name_1370 = this.getgo(62);
            let values_1371 = [];
            if (this.tok() == 80) {
                this.i++;
                while (this.tok() != 79) {
                    values_1371.push(this.parseExpr());
                    if (this.tok() == 75) { this.i++ };
                };
                this.step(79);
            };
            return {name:name_1370, values:values_1371};
        } };
        parseType() { {
            let path_1372 = [];
            while (this.tok() == 62 && this.offset(1) == 77) {
                path_1372.push(this.getgo(62));
                this.i++;
            };
            let result_1373 = null;
            {
                const temp_1374 = this.tok();
                switch (temp_1374) {
                case 61: {
                    {
                        {
                            let name_1375 = this.getgo(61);
                            if (path_1372.length != 0) { name_1375 = path_1372.join('.') + '.' + name_1375 };
                            while (this.tok() == 77) {
                                this.i++;
                                this.getgo(61);
                            };
                            let sresult = (this.tok() == 99)? ((() => {
                                this.i++;
                                this.parametricTypeNesting++;
                                let params_1376 = [this.parseType()];
                                while (this.tok() == 75) {
                                    this.i++;
                                    params_1376.push(this.parseType());
                                };
                                if (this.parametricTypeNestingToken == 0) { this.parametricTypeNestingToken = this.tok() };
                                {
                                    const temp_1377 = this.parametricTypeNestingToken;
                                    switch (temp_1377) {
                                    case 96: {
                                        {
                                            {
                                                this.parametricTypeNesting -= 1;
                                                this.parametricTypeNestingToken = 0;
                                                this.i++;
                                            };
                                        }
                                    } break;

                                    case 106: {
                                        {
                                            {
                                                this.parametricTypeNesting -= 1;
                                                this.parametricTypeNestingToken = 96;
                                            };
                                        }
                                    } break;

                                    case 108: {
                                        {
                                            {
                                                this.parametricTypeNesting -= 1;
                                                this.parametricTypeNestingToken = 108;
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            this.unexpected();
                                        };
                                    }
                                    };
                                };
                                if (this.parametricTypeNesting < 0) { throw this.fail('parametricTypeNesting < 0') };
                                return NodeType.ParametricType(name_1375, params_1376);
                            })()) : NodeType.Type(name_1375);
                            if (this.tok() == 90) {
                                this.i++;
                                sresult = NodeType.Function([sresult], this.parseType());
                            };
                            result_1373 = sresult;
                        };
                    }
                } break;

                case 72: {
                    {
                        {
                            if (path_1372.length != 0) { throw this.fail('Token.BkOpen') };
                            this.i++;
                            let res_1378 = null;
                            {
                                const temp_1379 = this.tok();
                                switch (temp_1379) {
                                case 71: {
                                    {
                                        {
                                            this.i++;
                                            res_1378 = NodeType.ParametricType('Array', [NodeType.Object([], [])]);
                                        };
                                    }
                                } break;

                                case 76: {
                                    {
                                        {
                                            this.i++;
                                            if (this.tok() == 71) {
                                                this.i++;
                                                res_1378 = NodeType.ParametricType('Map', [NodeType.Object([], []), NodeType.Object([], [])]);
                                            } else {
                                                res_1378 = NodeType.ParametricType('Map', [NodeType.Object([], []), this.parseType()]);
                                            };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        let key = this.parseType();
                                        let innerRes = (this.tok() == 76)? ((() => {
                                            this.i++;
                                            return NodeType.ParametricType('Map', [key, this.parseType()]);
                                        })()) : NodeType.ParametricType('Array', [key]);
                                        this.step(71);
                                        if (this.tok() == 90) {
                                            this.i++;
                                            innerRes = NodeType.Function([res_1378], this.parseType());
                                        };
                                        res_1378 = innerRes;
                                    };
                                }
                                };
                            };
                            result_1373 = res_1378;
                        };
                    }
                } break;

                case 74: {
                    {
                        {
                            if (path_1372.length != 0) { throw this.fail('Token.BrOpen') };
                            this.i++;
                            let sresult_1380 = (this.tok() == 76)? ((() => {
                                this.i++;
                                return NodeType.Object([], []);
                            })()) : (() => {
                                let names_1381 = [];
                                let types_1382 = [];
                                while (this.tok() != 73) {
                                    names_1381.push(this.getgo(62));
                                    if (this.tok() == 76) {
                                        this.i++;
                                        types_1382.push(this.parseType());
                                    };
                                    if (this.tok() == 75) { this.i++ };
                                };
                                return NodeType.Object(names_1381, types_1382);
                            })();
                            this.step(73);
                            if (this.tok() == 90) {
                                this.i++;
                                sresult_1380 = NodeType.Function([sresult_1380], this.parseType());
                            };
                            result_1373 = sresult_1380;
                        };
                    }
                } break;

                case 80: {
                    {
                        {
                            if (path_1372.length != 0) { throw this.fail('Token.POpen') };
                            this.i++;
                            let args_1383 = [];
                            while (this.tok() != 79) {
                                this.parseType();
                                if (this.tok() == 76) {
                                    this.i++;
                                    args_1383.push(this.parseType());
                                };
                                if (this.tok() == 75) { this.i++ };
                            };
                            this.step(79);
                            this.step(90);
                            result_1373 = NodeType.Function(args_1383, this.parseType());
                        };
                    }
                } break;

                case 62: {
                    {
                        {
                            let res_1384 = null;
                            {
                                const temp_1385 = this.offset(1);
                                switch (temp_1385) {
                                case 76: {
                                    {
                                        {
                                            {
                                                let argName = this.getgo(this.tok());
                                                this.step(76);
                                                let argType = this.parseType();
                                                res_1384 = NodeType.FunctionArg(argName, argType, null);
                                            };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        {
                                            throw this.fail('Typename can not start with lowercase');
                                        };
                                    };
                                }
                                };
                            };
                            result_1373 = res_1384;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw this.fail('Expected Type, parsed `' + Token.stringify(this.tok()) + '`');
                    };
                }
                };
            };
            if (this.tok() == 81) { result_1373 = NodeType.Optional(result_1373) };
            while (this.tok() == 81) this.i++;
            if (this.tok() == 90) {
                this.i++;
                result_1373 = NodeType.Function([result_1373], this.parseType());
            };
            return result_1373;
        } };
        precedence(op_1386) { {
            const left_1387 = 100;
            const right = 0;
            {
                const temp_1388 = op_1386;
                switch (temp_1388) {
                case 101: {
                    {
                        {
                            return 0 + left_1387;
                        };
                    }
                } break;

                case 102: {
                    {
                        {
                            return 1 + left_1387;
                        };
                    }
                } break;

                case 94: {
                    {
                        {
                            return 1 + left_1387;
                        };
                    }
                } break;

                case 111: {
                    {
                        {
                            return 2 + left_1387;
                        };
                    }
                } break;

                case 107: {
                    {
                        {
                            return 2 + left_1387;
                        };
                    }
                } break;

                case 105: {
                    {
                        {
                            return 3 + left_1387;
                        };
                    }
                } break;

                case 106: {
                    {
                        {
                            return 3 + left_1387;
                        };
                    }
                } break;

                case 108: {
                    {
                        {
                            return 3 + left_1387;
                        };
                    }
                } break;

                case 104: {
                    {
                        {
                            return 4 + left_1387;
                        };
                    }
                } break;

                case 112: {
                    {
                        {
                            return 4 + left_1387;
                        };
                    }
                } break;

                case 109: {
                    {
                        {
                            return 4 + left_1387;
                        };
                    }
                } break;

                case 95: {
                    {
                        {
                            return 5 + left_1387;
                        };
                    }
                } break;

                case 103: {
                    {
                        {
                            return 5 + left_1387;
                        };
                    }
                } break;

                case 96: {
                    {
                        {
                            return 5 + left_1387;
                        };
                    }
                } break;

                case 99: {
                    {
                        {
                            return 5 + left_1387;
                        };
                    }
                } break;

                case 97: {
                    {
                        {
                            return 5 + left_1387;
                        };
                    }
                } break;

                case 100: {
                    {
                        {
                            return 5 + left_1387;
                        };
                    }
                } break;

                case 92: {
                    {
                        {
                            return 7 + left_1387;
                        };
                    }
                } break;

                case 93: {
                    {
                        {
                            return 8 + left_1387;
                        };
                    }
                } break;

                case 91: {
                    {
                        {
                            return 10 + right;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw this.fail('No precedence for ' + Token.stringify(op_1386));
                    };
                }
                };
            };
        } };
    }
    Parser.uuid = 0
    Parser.toNode = (nodes) => { {
            if (nodes.length == 0) { return null };
            if (nodes.length > 1) { return Node.TBlock(nodes) };
            return nodes[0];
        } };
    Parser.parseNodes = (lexe) => { {
            const parser = new Parser(lexe);
            return parser.nodes;
        } };
    Parser.uid = () => { return Parser.uuid++ };
    Parser.isBinop = (t_1389) => { {
            {
                const temp_1390 = t_1389;
                switch (temp_1390) {
                case 111: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 102: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 94: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 107: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 91: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 95: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 103: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 96: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 97: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 99: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 100: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 112: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 104: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 109: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 92: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 93: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 105: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 106: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 108: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                case 101: {
                    {
                        {
                            return true;
                        };
                    }
                } break;

                default:
                {
                    {
                        return false;
                    };
                }
                };
            };
        } };
    var TestParser = class {
    }
    TestParser.test = () => { {
            console.log('TestParser begin');
            TestParser.shouldAllEqual(new Map([['', '<!--null-->'], ['  ', '<!--null-->'], ['   ', '<!--null-->'], ['       ', '<!--null-->'], ['\n', '<!--null-->'], ['\n\n', '<!--null-->'], ['\r\r\n\r\n\r\t', '<!--null-->'], ['{}', 'TBlock([])'], ['{{}}', 'TBlock([TBlock([])])'], ['{ 0 0 0 }', 'TBlock([TInt(0),TInt(0),TInt(0)])'], ['0', 'TInt(0)'], [' 0 ', 'TInt(0)'], ['123', 'TInt(123)'], ['12', 'TInt(12)'], ['0x1', 'TInt(0x1)'], ['0x0', 'TInt(0x0)'], ['0xF', 'TInt(0xF)'], ['0xFA', 'TInt(0xFA)'], ['0xFABCDEF', 'TInt(0xFABCDEF)'], ['0.0', 'TFloat(0.0)'], ['0.123', 'TFloat(0.123)'], ['\'s\'', 'TString(s)'], ['\"s\"', 'TString(s)']]));
            TestParser.shouldAllEqual(new Map([['1 2 3 trace("Hello!", "World!") + 5 * 6 / 3', 'TBlock([\r\n                    TInt(1),\r\n                    TInt(2),\r\n                    TInt(3),\r\n                    TBinop(\r\n                 TCall(TIdent(trace),[TString(Hello!),TString(World!)]),\r\n                 +,\r\n                  TBinop(TInt(5),*,TBinop(TInt(6),/,TInt(3))))])'], ['enum Test { Demo } hello World', 'TBlock([TEnum(Type(Test),[TIdent(Demo)]),\r\n                 TIdent(hello),\r\n                  TIdent(World)])']]));
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
        } };
    TestParser.shouldEqual = (input_1391, test) => { {
            const test_1392 = TestParser.deepTrim(test);
            TestParser.shouldEqualWithoutTrim(input_1391, test_1392);
        } };
    TestParser.shouldEqualWithoutTrim = (input_1393, test_1394) => { {
            let lexe_1395 = Lexer.tokenize(Buffer.from(input_1393), 'TEST');
            let parsed_1396 = Parser.toNode(Parser.parseNodes(lexe_1395));
            let res_1397 = TestParser.stringify(parsed_1396);
            if (test_1394 != res_1397) { throw ('TestParser test fail: `' + (input_1393) + '`\n!==: `' + (test_1394) + '`\nGot: `' + (res_1397) + '`\nParsed: `' + (parsed_1396) + '`') };
        } };
    TestParser.shouldAllEqual = (map) => { {
            for (const input of map.keys()) {
                let test_1398 = map.get(input);
                TestParser.shouldEqual(input, test_1398);
            };
        } };
    TestParser.shouldAllEqualWithoutTrim = (map_1399) => { {
            for (const input of map_1399.keys()) {
                let test_1400 = map_1399.get(input);
                TestParser.shouldEqualWithoutTrim(input, test_1400);
            };
        } };
    TestParser.shouldError = (input_1401) => { {
            try {
                {
                    let lexe_1402 = Lexer.tokenize(Buffer.from(input_1401), 'TEST');
                    let parser_1403 = Parser.toNode(Parser.parseNodes(lexe_1402));
                }
            } catch (e) {
                {
                    return;
                }
            };
            throw ('TestParser test fail: `' + (input_1401) + '` did not throw exception.');
        } };
    TestParser.shouldAllError = (input_1404) => { {
            for (const str of input_1404) {
                TestParser.shouldError(str);
            };
        } };
    TestParser.deepTrim = (s_1405) => { {
            return s_1405.split('\n').join('').split('\r').join('').split('\t').join('').split(' ').join('');
        } };
    TestParser.stringify = (node_1406) => { {
            {
                const temp_1407 = node_1406;
                switch (temp_1407 && temp_1407[1]) {
                case null: {
                    {
                        {
                            return '<!--null-->';
                        };
                    }
                } break;

                case 0: {
                    {
                        const s_1408 = temp_1407[2];
                        {
                            return ('TString(' + (s_1408) + ')');
                        };
                    }
                } break;

                case 1: {
                    {
                        const s_1409 = temp_1407[2];
                        {
                            return ('TIdent(' + (s_1409) + ')');
                        };
                    }
                } break;

                case 2: {
                    {
                        const b_1410 = temp_1407[2];
                        {
                            return ('TBool(' + (b_1410) + ')');
                        };
                    }
                } break;

                case 3: {
                    {
                        {
                            return 'TThis';
                        };
                    }
                } break;

                case 4: {
                    {
                        {
                            return 'TSuper';
                        };
                    }
                } break;

                case 5: {
                    {
                        const s_1411 = temp_1407[2];
                        {
                            return ('TInt(' + (s_1411) + ')');
                        };
                    }
                } break;

                case 6: {
                    {
                        const s_1412 = temp_1407[2];
                        {
                            return ('TFloat(' + (s_1412) + ')');
                        };
                    }
                } break;

                case 7: {
                    {
                        {
                            return 'TNull';
                        };
                    }
                } break;

                case 16: {
                    {
                        {
                            return 'TBreak';
                        };
                    }
                } break;

                case 17: {
                    {
                        {
                            return 'TContinue';
                        };
                    }
                } break;

                case 36: {
                    {
                        const name_1413 = temp_1407[2];
                        const expr_1414 = temp_1407[3];
                        {
                            return ('TDeclare(' + (name_1413) + ',') + TestParser.stringify(expr_1414) + ')';
                        };
                    }
                } break;

                case 38: {
                    {
                        const expr_1415 = temp_1407[2];
                        const type_1416 = temp_1407[3];
                        {
                            return 'TAs(' + TestParser.stringify(expr_1415) + ',' + TestParser.stringifyType(type_1416) + ')';
                        };
                    }
                } break;

                case 39: {
                    {
                        const expr_1417 = temp_1407[2];
                        const kind_1418 = temp_1407[3];
                        const type_1419 = temp_1407[4];
                        {
                            return 'TAs(' + TestParser.stringify(expr_1417) + ',' + Token.stringify(kind_1418) + ',' + TestParser.stringifyType(type_1419) + ')';
                        };
                    }
                } break;

                case 8: {
                    {
                        const a_1420 = temp_1407[2];
                        const op_1421 = temp_1407[3];
                        const b_1422 = temp_1407[4];
                        {
                            return 'TBinop(' + TestParser.stringify(a_1420) + ',' + Token.stringify(op_1421) + ',' + TestParser.stringify(b_1422) + ')';
                        };
                    }
                } break;

                case 9: {
                    {
                        const a_1423 = temp_1407[2];
                        const op_1424 = temp_1407[3];
                        const b_1425 = temp_1407[4];
                        {
                            return 'TAssignop(' + TestParser.stringify(a_1423) + ',' + Token.stringify(op_1424) + ',' + TestParser.stringify(b_1425) + ')';
                        };
                    }
                } break;

                case 10: {
                    {
                        const els_1426 = temp_1407[2];
                        {
                            return 'TBlock(' + TestParser.stringifyNodeArray(els_1426) + ')';
                        };
                    }
                } break;

                case 22: {
                    {
                        const name_1427 = temp_1407[2];
                        const t_1428 = temp_1407[3];
                        const expr_1429 = temp_1407[4];
                        const const_1430 = temp_1407[5];
                        {
                            return ('TVar(' + (name_1427) + ',') + (((t_1428 != null))? (TestParser.stringifyType(t_1428)) : 'null') + ',' + (((expr_1429 != null))? (TestParser.stringify(expr_1429)) : 'null') + (',' + (const_1430) + ')');
                        };
                    }
                } break;

                case 23: {
                    {
                        const vars_1431 = temp_1407[2];
                        {
                            return 'TVars(' + TestParser.stringifyNodeArray(vars_1431) + ')';
                        };
                    }
                } break;

                case 20: {
                    {
                        const name_1432 = temp_1407[2];
                        const expr_1433 = temp_1407[3];
                        const vars_1434 = temp_1407[4];
                        const rettype_1435 = temp_1407[5];
                        {
                            return ('TFunction(' + (name_1432) + ',') + (expr_1433 == (null)? ('null') : TestParser.stringify(expr_1433)) + ',' + TestParser.stringifyNodeArray(vars_1434) + ',' + (((rettype_1435 != null))? (TestParser.stringifyType(rettype_1435)) : 'null') + ')';
                        };
                    }
                } break;

                case 11: {
                    {
                        const e_1436 = temp_1407[2];
                        const el_1437 = temp_1407[3];
                        const argNames_1438 = temp_1407[4];
                        {
                            let res_1439 = 'TCall(' + TestParser.stringify(e_1436) + ',[';
                            {
                                const value_1440 = el_1437.length;
                                let i = 0;
                                while (i < value_1440) {
                                    {
                                        res_1439 += argNames_1438[i] == (null)? ('') : argNames_1438[i] + ':';
                                        res_1439 += TestParser.stringify(el_1437[i]) + (((i != el_1437.length - 1))? (',') : '');
                                    };
                                    i++;
                                };
                            };
                            return res_1439 + '])';
                        };
                    }
                } break;

                case 13: {
                    {
                        const e_1441 = temp_1407[2];
                        {
                            return 'TParenthesis(' + TestParser.stringify(e_1441) + ')';
                        };
                    }
                } break;

                case 14: {
                    {
                        const e_1442 = temp_1407[2];
                        {
                            return 'TReturn(' + TestParser.stringify(e_1442) + ')';
                        };
                    }
                } break;

                case 15: {
                    {
                        const e_1443 = temp_1407[2];
                        {
                            return 'TThrow(' + TestParser.stringify(e_1443) + ')';
                        };
                    }
                } break;

                case 34: {
                    {
                        const t_1444 = temp_1407[2];
                        const els_1445 = temp_1407[3];
                        {
                            return 'TEnum(' + TestParser.stringifyType(t_1444) + ',' + TestParser.stringifyNodeArray(els_1445) + ')';
                        };
                    }
                } break;

                case 37: {
                    {
                        const a_1446 = temp_1407[2];
                        {
                            return 'TUsing(' + a_1446.join(',') + ')';
                        };
                    }
                } break;

                case 32: {
                    {
                        const paths = temp_1407[2];
                        const els_1447 = temp_1407[3];
                        {
                            return 'TModule(' + paths.join('.') + ',' + TestParser.stringifyNodeArray(els_1447) + ')';
                        };
                    }
                } break;

                case 29: {
                    {
                        const k_1448 = temp_1407[2];
                        const v_1449 = temp_1407[3];
                        {
                            return 'TMap([' + (() => {
                                const result_1450 = [];
                                const value_1451 = k_1448;
                                for (const p of value_1451) result_1450.push(TestParser.stringify(p));
                                return result_1450;
                            })().join(',') + '],[' + (() => {
                                const result_1452 = [];
                                const value_1453 = v_1449;
                                for (const p of value_1453) result_1452.push(TestParser.stringify(p));
                                return result_1452;
                            })().join(',') + '])';
                        };
                    }
                } break;

                case 24: {
                    {
                        const type_1454 = temp_1407[2];
                        const extend = temp_1407[3];
                        const implement = temp_1407[4];
                        const fields_1455 = temp_1407[5];
                        const external_1456 = temp_1407[6];
                        {
                            let res_1457 = 'TClass(' + TestParser.stringifyType(type_1454) + ',';
                            res_1457 += (extend != (null)? (TestParser.stringifyType(extend)) : 'null') + ',';
                            res_1457 += TestParser.stringifyNodeTypeArray(implement) + ',';
                            res_1457 += TestParser.stringifyNodeArray(fields_1455) + ',';
                            res_1457 += external_1456 + ')';
                            return res_1457;
                        };
                    }
                } break;

                case 27: {
                    {
                        const path_1458 = temp_1407[2];
                        const t_1459 = temp_1407[3];
                        const args_1460 = temp_1407[4];
                        const names_1461 = temp_1407[5];
                        const values_1462 = temp_1407[6];
                        {
                            return 'TNew([' + path_1458.join('.') + '],' + TestParser.stringifyType(t_1459) + ',' + TestParser.stringifyNodeArray(args_1460) + ',[' + names_1461.join(',') + '],' + TestParser.stringifyNodeArray(values_1462) + ')';
                        };
                    }
                } break;

                case 46: {
                    {
                        const type_1463 = temp_1407[2];
                        {
                            return 'NodeTypeValue(' + TestParser.stringifyType(type_1463) + ')';
                        };
                    }
                } break;

                case 26: {
                    {
                        const l = temp_1407[2];
                        const r_1464 = temp_1407[3];
                        {
                            return 'TDot(' + TestParser.stringify(l) + ',' + r_1464 + ')';
                        };
                    }
                } break;

                default:
                {
                    {
                        return '<!--' + node_1406 + '-->';
                    };
                }
                };
            };
        } };
    TestParser.stringifyNodeArray = (arr) => { {
            return '[' + (() => {
                const result_1465 = [];
                const value_1466 = arr;
                for (const e of value_1466) result_1465.push(TestParser.stringify(e));
                return result_1465;
            })().join(',') + ']';
        } };
    TestParser.stringifyNodeTypeArray = (arr_1467) => { {
            return '[' + (() => {
                const result_1468 = [];
                const value_1469 = arr_1467;
                for (const e of value_1469) result_1468.push(TestParser.stringifyType(e));
                return result_1468;
            })().join(',') + ']';
        } };
    TestParser.stringifyType = (node_1470) => { {
            {
                const temp_1471 = node_1470;
                switch (temp_1471 && temp_1471[1]) {
                case 1: {
                    {
                        const s_1472 = temp_1471[2];
                        {
                            return ('Type(' + (s_1472) + ')');
                        };
                    }
                } break;

                case 2: {
                    {
                        const name_1473 = temp_1471[2];
                        const params_1474 = temp_1471[3];
                        {
                            return ('ParametricType(' + (name_1473) + ',[') + (() => {
                                const result_1475 = [];
                                const value_1476 = params_1474;
                                for (const p of value_1476) result_1475.push(TestParser.stringifyType(p));
                                return result_1475;
                            })().join(',') + '])';
                        };
                    }
                } break;

                case 3: {
                    {
                        const args_1477 = temp_1471[2];
                        const rettype_1478 = temp_1471[3];
                        {
                            return 'Function([' + (() => {
                                const result_1479 = [];
                                const value_1480 = args_1477;
                                for (const e of value_1480) result_1479.push(TestParser.stringifyType(e));
                                return result_1479;
                            })().join(',') + '],' + TestParser.stringifyType(rettype_1478) + ')';
                        };
                    }
                } break;

                case 5: {
                    {
                        const names_1481 = temp_1471[2];
                        const types_1482 = temp_1471[3];
                        {
                            return 'Object([' + names_1481.join(',') + '],[' + (() => {
                                const result_1483 = [];
                                const value_1484 = types_1482;
                                for (const e of value_1484) result_1483.push(TestParser.stringifyType(e));
                                return result_1483;
                            })().join(',') + '])';
                        };
                    }
                } break;

                default:
                {
                    {
                        return '<!--' + node_1470 + '-->';
                    };
                }
                };
            };
        } };
    var TestTyper = class {
    }
    TestTyper.passed = 0
    TestTyper.overall = 0
    TestTyper.test = () => { {
            console.log('TestTyper begin');
            TestTyper.shouldNotError('let a = 1');
            //TestTyper.shouldError('let a');
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
            {
            };
            Math.round((TestTyper.passed / TestTyper.overall) * 100);
            console.log(('TestTyper done ' + (Math.round((TestTyper.passed / TestTyper.overall) * 100)) + '% (' + (TestTyper.passed) + '/' + (TestTyper.overall) + ')'));
        } };
    TestTyper.shouldNotError = (input_1485) => { {
            TestTyper.overall++;
            let errorText = TestTyper.didError(input_1485);
            if (errorText != null) { throw ('TestTyper test fail: `' + (input_1485) + '` should NOT throw error, but it did.\r\n') + errorText };
            TestTyper.passed++;
        } };
    TestTyper.shouldError = (input_1486) => { {
            TestTyper.overall++;
            if (TestTyper.didError(input_1486) == null) { throw ('TestTyper test fail: `' + (input_1486) + '` should throw error, but it is not.') };
            TestTyper.passed++;
        } };
    TestTyper.didError = (input_1487) => { {
            const input_1488 = ('module { @untypedFields declare class Any {} @untypedFields declare class Void {} @untypedFields declare class Null<T> {} @untypedFields declare class Array<T> {} @untypedFields declare class Map<K, V> {}@untypedFields declare class Bool {}@untypedFields declare class Int {}@untypedFields declare class String {}}') + input_1487;
            let lexe_1489 = Lexer.tokenize(Buffer.from(input_1488), 'TEST');
            let parsed_1490 = Parser.toNode(Parser.parseNodes(lexe_1489));
            try {
                {
                    Typer.fillScopes(Node.TBlock([parsed_1490]));
                }
            } catch (e) {
                {
                    return '' + e;
                }
            };
            return null;
        } };
    var GenJs1 = class {
    }
    GenJs1.id = 0
    GenJs1.tabs = ''
    GenJs1.reserved = ['with', 'const']
    GenJs1.parentNames = new Map()
    GenJs1.scopes = [new Map()]
    GenJs1.enumUid = 0
    GenJs1.rename = (name_1491) => { {
            if (GenJs1.reserved.indexOf(name_1491) != -1) { return '$' + name_1491 };
            return name_1491;
        } };
    GenJs1.unblock = (e_1492) => { {
            {
                const temp_1493 = e_1492;
                switch (temp_1493 && temp_1493[1]) {
                case 10: {
                    {
                        const el_1494 = temp_1493[2];
                        {
                            if (el_1494.length == 1) { return el_1494[0] } else return e_1492;
                        };
                    }
                } break;

                default:
                {
                    {
                        return e_1492;
                    };
                }
                };
            };
        } };
    GenJs1.pushTab = () => { GenJs1.tabs += '\t' };
    GenJs1.popTab = () => { GenJs1.tabs = GenJs1.tabs.substring(0, GenJs1.tabs.length - 1) };
    GenJs1.stringifyBlockExpression = (node_1495) => { {
            let r_1496 = '';
            {
                const temp_1497 = node_1495;
                switch (temp_1497 && temp_1497[1]) {
                case 34: {
                    {
                        const t_1498 = temp_1497[2];
                        {
                            return r_1496 = 'const ' + GenJs1.extractTypeName(t_1498) + ' = ' + GenJs1.stringify(node_1495);
                        };
                    }
                } break;

                case 12: {
                    {
                        const econd_1499 = temp_1497[2];
                        const eif_1500 = temp_1497[3];
                        const eelse_1501 = temp_1497[4];
                        {
                            if (econd_1499.length == 1) { {
                                const temp_1502 = econd_1499[0];
                                switch (temp_1502 && temp_1502[1]) {
                                case 22: {
                                    {
                                        const oname = temp_1502[2];
                                        const t_1503 = temp_1502[3];
                                        const expr_1504 = temp_1502[4];
                                        const const_1505 = temp_1502[5];
                                        {
                                            {
                                                const cond = econd_1499[0];
                                                r_1496 += '\n' + GenJs1.tabs + '{\n';
                                                GenJs1.pushTab();
                                                GenJs1.pushScope();
                                                GenJs1.parentNames.set(cond, oname);
                                                r_1496 += GenJs1.tabs + 'const ' + oname + ' = ' + GenJs1.stringify(expr_1504) + '\n' + GenJs1.tabs;
                                                r_1496 += 'if (' + oname + ' != null) ';
                                                {
                                                    const temp_1506 = eif_1500;
                                                    switch (temp_1506 && temp_1506[1]) {
                                                    case 10: {
                                                        {
                                                            {
                                                                r_1496 += GenJs1.stringify(eif_1500);
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            r_1496 += GenJs1.stringify(Node.TBlock([eif_1500]));
                                                        };
                                                    }
                                                    };
                                                };
                                                if (eelse_1501 != null) { r_1496 += ' else ' + GenJs1.stringifyBlockExpression(eelse_1501) };
                                                GenJs1.popTab();
                                                GenJs1.popScope();
                                                return r_1496 + '\n' + GenJs1.tabs + '}';
                                            };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        {
                                            const cond_1507 = econd_1499[0];
                                            r_1496 += 'if (' + GenJs1.unwrapBlockValue(cond_1507) + ') ';
                                            {
                                                const temp_1508 = eif_1500;
                                                switch (temp_1508 && temp_1508[1]) {
                                                case 10: {
                                                    {
                                                        {
                                                            r_1496 += GenJs1.stringify(eif_1500);
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        r_1496 += GenJs1.stringify(Node.TBlock([eif_1500]));
                                                    };
                                                }
                                                };
                                            };
                                            if (eelse_1501 != null) { r_1496 += ' else ' + GenJs1.stringifyBlockExpression(eelse_1501) };
                                            return r_1496;
                                        };
                                    };
                                }
                                };
                            } } else {
                                GenJs1.pushScope();
                                GenJs1.pushTab();
                                r_1496 += '{\n' + GenJs1.tabs;
                                if (eelse_1501 != null) {
                                    GenJs1.addToScope('else$$');
                                    r_1496 += 'const else$$ = () => ' + GenJs1.stringify(eelse_1501) + '\n' + GenJs1.tabs;
                                };
                                let depth = 0;
                                let econds = econd_1499;
                                let i_1509 = 0;
                                let condsstr = '';
                                let constsstr = '';
                                const addCond = (cond_1510) => { return ((condsstr == ''))? (cond_1510) : (' && ' + cond_1510) };
                                while (econds[i_1509] != null) {
                                    let cond_1511 = econds[i_1509];
                                    condsstr = '';
                                    constsstr = '';
                                    const run = () => { do {{
                                        let innercond = econds[i_1509];
                                        {
                                            const temp_1512 = innercond;
                                            switch (temp_1512 && temp_1512[1]) {
                                            case 22: {
                                                {
                                                    const oname_1513 = temp_1512[2];
                                                    const t_1514 = temp_1512[3];
                                                    const expr_1515 = temp_1512[4];
                                                    const const_1516 = temp_1512[5];
                                                    {
                                                        GenJs1.addToScope(oname_1513);
                                                        let name_1517 = GenJs1.rename(oname_1513);
                                                        GenJs1.parentNames.set(cond_1511, name_1517);
                                                        constsstr += 'const ' + name_1517 + ' = ' + GenJs1.stringify(expr_1515) + ';\n' + GenJs1.tabs;
                                                        condsstr += addCond(name_1517 + ' != null');
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                    condsstr += addCond(GenJs1.stringify(innercond));
                                                };
                                            }
                                            };
                                        };
                                        if (econds[i_1509 + 1] != null) {
                                            const temp_1518 = econds[i_1509 + 1];
                                            switch (temp_1518 && temp_1518[1]) {
                                            case 22: {
                                                {
                                                    const oname_1519 = temp_1518[2];
                                                    const t_1520 = temp_1518[3];
                                                    const expr_1521 = temp_1518[4];
                                                    const const_1522 = temp_1518[5];
                                                    {
                                                        {
                                                            return;
                                                        };
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                };
                                            }
                                            };
                                        };
                                        i_1509++;
                                    }} while (econds[i_1509] != null) };
                                    run();
                                    r_1496 += constsstr;
                                    r_1496 += 'if (' + condsstr + ') {';
                                    GenJs1.pushTab();
                                    r_1496 += '\n' + GenJs1.tabs;
                                    depth++;
                                    i_1509++;
                                };
                                {
                                    const temp_1523 = eif_1500;
                                    switch (temp_1523 && temp_1523[1]) {
                                    case 10: {
                                        {
                                            {
                                                r_1496 += GenJs1.stringify(eif_1500);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            r_1496 += GenJs1.stringify(Node.TBlock([eif_1500]));
                                        };
                                    }
                                    };
                                };
                                while (depth > 0) {
                                    GenJs1.popTab();
                                    r_1496 += '\n' + GenJs1.tabs + '}';
                                    if (eelse_1501 != null) { r_1496 += ' else else$$()' };
                                    depth--;
                                };
                                GenJs1.popTab();
                                GenJs1.popScope();
                                r_1496 += '\n' + GenJs1.tabs + '}';
                                return r_1496;
                            };
                        };
                    }
                } break;

                case 20: {
                    {
                        const name_1524 = temp_1497[2];
                        const expr_1525 = temp_1497[3];
                        const vars_1526 = temp_1497[4];
                        {
                            GenJs1.pushScope();
                            let newname = GenJs1.rename(name_1524);
                            let ivars = (() => {
                                const result_1527 = [];
                                const value_1528 = vars_1526;
                                for (const v of value_1528) result_1527.push(((v_1529) => {
                                    const temp_1530 = v_1529;
                                    switch (temp_1530 && temp_1530[1]) {
                                    case 22: {
                                        {
                                            const oname_1531 = temp_1530[2];
                                            {
                                                let name_1532 = GenJs1.rename(oname_1531);
                                                if (GenJs1.hasInScope(name_1532)) { name_1532 += '$' + (++GenJs1.id) };
                                                GenJs1.addToScope(name_1532);
                                                GenJs1.parentNames.set(v_1529, name_1532);
                                                return GenJs1.parentNames.get(v_1529);
                                            };
                                        }
                                    } break;

                                    case 1: {
                                        {
                                            const oname_1533 = temp_1530[2];
                                            {
                                                let name_1534 = GenJs1.rename(oname_1533);
                                                if (GenJs1.hasInScope(name_1534)) { name_1534 += '$' + (++GenJs1.id) };
                                                GenJs1.addToScope(name_1534);
                                                GenJs1.parentNames.set(v_1529, name_1534);
                                                return GenJs1.parentNames.get(v_1529);
                                            };
                                        }
                                    } break;

                                    case 13: {
                                        {
                                            const e_1535 = temp_1530[2];
                                            {
                                                if (e_1535 != null) { throw v_1529 };
                                                return '';
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            throw 'v2:' + v_1529;
                                        };
                                    }
                                    };
                                })(v));
                                return result_1527;
                            })().join(', ');
                            let funcbody = '';
                            if (expr_1525 != null) { {
                                const temp_1536 = expr_1525;
                                switch (temp_1536 && temp_1536[1]) {
                                case 10: {
                                    {
                                        const el_1537 = temp_1536[2];
                                        {
                                            funcbody = GenJs1.stringify(expr_1525);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        GenJs1.pushScope();
                                        GenJs1.pushTab();
                                        funcbody = ('{\n' + (GenJs1.tabs) + '') + GenJs1.stringify(expr_1525) + ('\n\t' + (GenJs1.tabs) + '}');
                                        GenJs1.popTab();
                                        GenJs1.popScope();
                                    };
                                }
                                };
                            } } else funcbody = '{}';
                            GenJs1.popScope();
                            return ('const ' + (newname) + ' = (' + (ivars) + ') => ' + (funcbody) + '');
                        };
                    }
                } break;

                default:
                {
                    {
                        return GenJs1.stringify(node_1495);
                    };
                }
                };
            };
        } };
    GenJs1.getAtt = (atts_1538, atname_1539) => { {
            if (atts_1538 != null && atts_1538.length > 0) { for (const att of atts_1538) {
                if (att.name == atname_1539) { return att };
            } };
            return null;
        } };
    GenJs1.pushScope = () => { {
            GenJs1.scopes.push(new Map());
        } };
    GenJs1.popScope = () => { {
            GenJs1.scopes.pop();
        } };
    GenJs1.hasInScope = (name_1540) => { {
            for (const scope of GenJs1.scopes) {
                if (scope.get(name_1540) != null) { return true };
            };
            return false;
        } };
    GenJs1.addToScope = (name_1541) => { {
            GenJs1.scopes[GenJs1.scopes.length - 1].set(name_1541, true);
        } };
    GenJs1.stringifyProject = (node_1542) => { {
            {
                const temp_1543 = node_1542;
                switch (temp_1543 && temp_1543[1]) {
                case 10: {
                    {
                        const el_1544 = temp_1543[2];
                        {
                            let output_1545 = ['{', '\t"use strict"'];
                            GenJs1.pushTab();
                            {
                                let namespaces = [];
                                const placeholder = (e_1546) => {
                                    const temp_1547 = e_1546;
                                    switch (temp_1547 && temp_1547[1]) {
                                    case 36: {
                                        {
                                            {
                                                {
                                                };
                                            };
                                        }
                                    } break;

                                    case 24: {
                                        {
                                            const ex = temp_1547[6];
                                            {
                                                if (ex) {} else output_1545.push('\tlet ' + DataHelper.nameOf(e_1546));
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            output_1545.push('\tlet ' + DataHelper.nameOf(e_1546));
                                        };
                                    }
                                    };
                                };
                                const pushNamespace = (path_1548) => { if (namespaces.indexOf(path_1548.join('.')) == -1) { namespaces.push(path_1548.join('.')) } };
                                for (const e of el_1544) {
                                    const temp_1549 = e;
                                    switch (temp_1549 && temp_1549[1]) {
                                    case 10: {
                                        {
                                            const el_1550 = temp_1549[2];
                                            {
                                                for (const e of el_1550) {
                                                    const temp_1551 = e;
                                                    switch (temp_1551 && temp_1551[1]) {
                                                    case 32: {
                                                        {
                                                            const path_1552 = temp_1551[2];
                                                            const el_1553 = temp_1551[3];
                                                            {
                                                                if (path_1552.length == 0) { for (const e of el_1553) placeholder(e) } else pushNamespace(path_1552);
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            {
                                                            };
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 32: {
                                        {
                                            const path_1554 = temp_1549[2];
                                            const el_1555 = temp_1549[3];
                                            {
                                                if (path_1554.length == 0) { for (const e of el_1555) placeholder(e) } else pushNamespace(path_1554);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                        };
                                    }
                                    };
                                };
                                let intermediate = [];
                                for (const ns of namespaces) {
                                    let path_1556 = ns.split('.');
                                    let namespace = path_1556.shift();
                                    const check = (namespace_1557) => { if (intermediate.indexOf(namespace_1557) == -1) { intermediate.push(namespace_1557) } };
                                    check(namespace);
                                    while (path_1556.length > 0) {
                                        namespace += '.' + path_1556.shift();
                                        check(namespace);
                                    };
                                };
                                for (const ns of intermediate) if (ns == '') {} else if (ns.indexOf('.') == -1) { output_1545.push(('\tconst ' + (ns) + ' = {}')) } else output_1545.push(('\t' + (ns) + ' = {}'));
                            };
                            {
                                const getClassGUID = (path_1558, e_1559) => {
                                    if (e_1559 == null) { return GenJs1.extractTypeName(e_1559) };
                                    if (path_1558.length == 0) { return GenJs1.extractTypeName(e_1559) };
                                    if (path_1558.length == 1) { return path_1558[0] + '.' + GenJs1.extractTypeName(e_1559) };
                                    return path_1558.join('.') + '.' + GenJs1.extractTypeName(e_1559);
                                };
                                let cs = 0;
                                let fs = 0;
                                const fillClasses = (extendsWhat) => {
                                    cs++;
                                    const fillClassesOf = (path_1560, el_1561) => {
                                        fs++;
                                        if (path_1560.length == 0) {
                                            for (const e of el_1561) {
                                                const temp_1562 = e;
                                                switch (temp_1562 && temp_1562[1]) {
                                                case 36: {
                                                    {
                                                        {
                                                            if (extendsWhat == null) { output_1545.push(GenJs1.stringify(e)) };
                                                        };
                                                    }
                                                } break;

                                                case 24: {
                                                    {
                                                        const t_1563 = temp_1562[2];
                                                        const ext_1564 = temp_1562[3];
                                                        const ex_1565 = temp_1562[6];
                                                        {
                                                            if (ex_1565 && extendsWhat == null) { output_1545.push(GenJs1.stringify(e)) } else if ((extendsWhat == null && ext_1564 == null) || extendsWhat == GenJs1.extractTypeName(ext_1564)) {
                                                                output_1545.push('\t' + DataHelper.nameOf(e) + '/*!5*/ = ' + GenJs1.stringifyClass(e, null) + ';');
                                                                fillClasses(getClassGUID(path_1560, t_1563));
                                                            } else {
                                                            };
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        if (extendsWhat == null) { output_1545.push('\t' + DataHelper.nameOf(e) + '/*!1*/ = ' + GenJs1.stringify(e) + ';') };
                                                    };
                                                }
                                                };
                                            };
                                            return;
                                        };
                                        {
                                            for (const e of el_1561) {
                                                const temp_1566 = e;
                                                switch (temp_1566 && temp_1566[1]) {
                                                case 36: {
                                                    {
                                                        {
                                                            if (extendsWhat == null) { GenJs1.stringify(e) };
                                                        };
                                                    }
                                                } break;

                                                case 24: {
                                                    {
                                                        const t_1567 = temp_1566[2];
                                                        const ext_1568 = temp_1566[3];
                                                        const ex_1569 = temp_1566[6];
                                                        {
                                                            if (ex_1569 && extendsWhat == null) { GenJs1.stringify(e) } else if ((extendsWhat == null && ext_1568 == null) || extendsWhat == GenJs1.extractTypeName(ext_1568)) {
                                                                output_1545.push('\t' + path_1560.join('.') + '.' + DataHelper.nameOf(e) + '/*!4*/ = ' + GenJs1.stringifyClass(e, path_1560) + ';');
                                                                fillClasses(getClassGUID(path_1560, t_1567));
                                                            } else {
                                                            };
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        if (extendsWhat == null) { output_1545.push('\t' + path_1560.join('.') + '.' + DataHelper.nameOf(e) + '/*!3*/ = ' + GenJs1.stringify(e) + ';') };
                                                    };
                                                }
                                                };
                                            };
                                            return;
                                        };
                                    };
                                    for (const e of el_1544) {
                                        const temp_1570 = e;
                                        switch (temp_1570 && temp_1570[1]) {
                                        case 10: {
                                            {
                                                const el_1571 = temp_1570[2];
                                                {
                                                    for (const e of el_1571) {
                                                        const temp_1572 = e;
                                                        switch (temp_1572 && temp_1572[1]) {
                                                        case 32: {
                                                            {
                                                                const path_1573 = temp_1572[2];
                                                                const el_1574 = temp_1572[3];
                                                                {
                                                                    fillClassesOf(path_1573, el_1574);
                                                                };
                                                            }
                                                        } break;

                                                        default:
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                        };
                                                    };
                                                };
                                            }
                                        } break;

                                        case 32: {
                                            {
                                                const path_1575 = temp_1570[2];
                                                const el_1576 = temp_1570[3];
                                                {
                                                    fillClassesOf(path_1575, el_1576);
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                            };
                                        }
                                        };
                                    };
                                };
                                fillClasses(null);
                            };
                            {
                                const fill = (path_1577, el_1578) => {
                                    if (path_1577.length == 0) {
                                        for (const e of el_1578) {
                                            const temp_1579 = e;
                                            switch (temp_1579 && temp_1579[1]) {
                                            case 36: {
                                                {
                                                    {
                                                        GenJs1.stringify(e);
                                                    };
                                                }
                                            } break;

                                            case 24: {
                                                {
                                                    const ext_1580 = temp_1579[6];
                                                    {
                                                        if (ext_1580) { GenJs1.stringify(e) } else output_1545.push('\t' + DataHelper.nameOf(e) + '/*!5*/ = ' + GenJs1.stringifyClass(e, null) + ';');
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                    output_1545.push('\t' + DataHelper.nameOf(e) + '/*!1*/ = ' + GenJs1.stringify(e) + ';');
                                                };
                                            }
                                            };
                                        };
                                        return;
                                    };
                                    {
                                        for (const e of el_1578) {
                                            const temp_1581 = e;
                                            switch (temp_1581 && temp_1581[1]) {
                                            case 36: {
                                                {
                                                    {
                                                        GenJs1.stringify(e);
                                                    };
                                                }
                                            } break;

                                            case 24: {
                                                {
                                                    const ex_1582 = temp_1581[6];
                                                    {
                                                        if (ex_1582) { GenJs1.stringify(e) } else output_1545.push('\t' + path_1577.join('.') + '.' + DataHelper.nameOf(e) + '/*!3*/ = ' + GenJs1.stringifyClass(e, path_1577) + ';');
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                    output_1545.push('\t' + path_1577.join('.') + '.' + DataHelper.nameOf(e) + '/*!3*/ = ' + GenJs1.stringify(e) + ';');
                                                };
                                            }
                                            };
                                        };
                                        return;
                                    };
                                };
                            };
                            {
                                for (const e of el_1544) {
                                    const temp_1583 = e;
                                    switch (temp_1583 && temp_1583[1]) {
                                    case 10: {
                                        {
                                            const el_1584 = temp_1583[2];
                                            {
                                                for (const e of el_1584) {
                                                    const temp_1585 = e;
                                                    switch (temp_1585 && temp_1585[1]) {
                                                    case 32: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            output_1545.push('\t/*!2*/' + GenJs1.stringifyBlockExpression(e));
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 32: {
                                        {
                                            {
                                                {
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            output_1545.push('\t/*!22*/' + GenJs1.stringifyBlockExpression(e));
                                        };
                                    }
                                    };
                                };
                            };
                            output_1545.push('}');
                            return output_1545.join('\n');
                        };
                    }
                } break;

                default:
                {
                    {
                        throw 'stringifyProject got ' + node_1542;
                    };
                }
                };
            };
        } };
    GenJs1.stringifyClass = (node_1586, path_1587) => { {
            {
                const temp_1588 = node_1586;
                switch (temp_1588 && temp_1588[1]) {
                case 24: {
                    {
                        const t_1589 = temp_1588[2];
                        const ext_1590 = temp_1588[3];
                        const impl_1591 = temp_1588[4];
                        const fields_1592 = temp_1588[5];
                        const external_1593 = temp_1588[6];
                        {
                            let cname = GenJs1.extractTypeName(t_1589);
                            let r_1594 = ((external_1593)? ('/* declare class ') : 'class ') + cname;
                            if (path_1587 != null) { cname = path_1587.join('.') + '.' + cname };
                            if (ext_1590 != null) { r_1594 += ' extends ' + GenJs1.extractTypeName(ext_1590) };
                            r_1594 += ' {\n';
                            let after = [];
                            let constructorFieldsInit = [];
                            let constructorCode = '';
                            for (const f of fields_1592) {
                                {
                                    const temp_1595 = f;
                                    switch (temp_1595 && temp_1595[1]) {
                                    case 41: {
                                        {
                                            const f_1596 = temp_1595[2];
                                            {
                                                {
                                                    const temp_1597 = f_1596;
                                                    switch (temp_1597 && temp_1597[1]) {
                                                    case 20: {
                                                        {
                                                            {
                                                                GenJs1.parentNames.set(f_1596, DataHelper.nameOf(f_1596));
                                                            };
                                                        }
                                                    } break;

                                                    case 22: {
                                                        {
                                                            {
                                                                GenJs1.parentNames.set(f_1596, DataHelper.nameOf(f_1596));
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 20: {
                                        {
                                            {
                                                GenJs1.parentNames.set(f, DataHelper.nameOf(f));
                                            };
                                        }
                                    } break;

                                    case 22: {
                                        {
                                            {
                                                GenJs1.parentNames.set(f, DataHelper.nameOf(f));
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            throw '$3$ ' + f;
                                        };
                                    }
                                    };
                                };
                            };
                            for (const f of fields_1592) {
                                let code_1598 = '';
                                let isafter = false;
                                const unmeta = (f_1599) => { {
                                    const temp_1600 = f_1599;
                                    switch (temp_1600) {
                                    default:
                                    {
                                        {
                                            return f_1599;
                                        };
                                    }
                                    };
                                } };
                                let f_1601 = unmeta(f);
                                {
                                    const temp_1602 = f_1601;
                                    switch (temp_1602 && temp_1602[1]) {
                                    case 41: {
                                        {
                                            const field_1603 = temp_1602[2];
                                            {
                                                f_1601 = field_1603;
                                                isafter = true;
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            {
                                            };
                                        };
                                    }
                                    };
                                };
                                const f_1604 = unmeta(f_1601);
                                {
                                    const temp_1605 = f_1604;
                                    switch (temp_1605 && temp_1605[1]) {
                                    case 20: {
                                        {
                                            const name_1606 = temp_1605[2];
                                            const expr_1607 = temp_1605[3];
                                            const vars_1608 = temp_1605[4];
                                            {
                                                if (name_1606 != 'new') {
                                                    let out_1609 = '';
                                                    if (name_1606 == 'new') { name_1606 = 'constructor' };
                                                    if (isafter) { out_1609 += cname + '.' + GenJs1.rename(name_1606) + ' = ' } else out_1609 += '\t' + GenJs1.rename(name_1606);
                                                    out_1609 += '(' + (() => {
                                                        const result_1610 = [];
                                                        const value_1611 = vars_1608;
                                                        for (const v of value_1611) result_1610.push(((v_1612) => {
                                                            const temp_1613 = v_1612;
                                                            switch (temp_1613 && temp_1613[1]) {
                                                            case 22: {
                                                                {
                                                                    const oname_1614 = temp_1613[2];
                                                                    {
                                                                        let name_1615 = GenJs1.rename(oname_1614);
                                                                        if (GenJs1.hasInScope(name_1615)) { name_1615 += '$' + (++GenJs1.id) };
                                                                        GenJs1.addToScope(name_1615);
                                                                        GenJs1.parentNames.set(v_1612, name_1615);
                                                                        return GenJs1.parentNames.get(v_1612);
                                                                    };
                                                                }
                                                            } break;

                                                            default:
                                                            {
                                                                {
                                                                    throw v_1612;
                                                                };
                                                            }
                                                            };
                                                        })(v));
                                                        return result_1610;
                                                    })().join(', ') + ') ' + ((isafter)? ('=> ') : '');
                                                    if (expr_1607 != null) { {
                                                        const temp_1616 = expr_1607;
                                                        switch (temp_1616 && temp_1616[1]) {
                                                        case 10: {
                                                            {
                                                                const el_1617 = temp_1616[2];
                                                                {
                                                                    GenJs1.pushTab();
                                                                    out_1609 += GenJs1.stringifyBlockExpression(expr_1607);
                                                                    GenJs1.popTab();
                                                                };
                                                            }
                                                        } break;

                                                        default:
                                                        {
                                                            {
                                                                GenJs1.pushTab();
                                                                out_1609 += ('{\n' + (GenJs1.tabs) + '') + GenJs1.stringifyBlockExpression(expr_1607);
                                                                GenJs1.popTab();
                                                                out_1609 += ('\n' + (GenJs1.tabs) + '}\n');
                                                            };
                                                        }
                                                        };
                                                    } } else out_1609 += '{}';
                                                    code_1598 += out_1609;
                                                };
                                            };
                                        }
                                    } break;

                                    case 22: {
                                        {
                                            const name_1618 = temp_1605[2];
                                            const t_1619 = temp_1605[3];
                                            const expr_1620 = temp_1605[4];
                                            const const_1621 = temp_1605[5];
                                            {
                                                if (isafter) {
                                                    code_1598 += cname + '.' + GenJs1.rename(name_1618);
                                                    if (expr_1620 != null) { code_1598 += ' = ' + GenJs1.unwrapBlockValue(expr_1620) };
                                                    if (expr_1620 == null) { code_1598 += ' = null' };
                                                };
                                                if (!isafter) { constructorFieldsInit.push(('this.' + (GenJs1.rename(name_1618)) + ' = ') + (expr_1620 != (null)? (GenJs1.unwrapBlockValue(expr_1620)) : 'null')) };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            throw code_1598 += '' + f_1604;
                                        };
                                    }
                                    };
                                };
                                if (code_1598 != '') { if (isafter) { after.push(GenJs1.tabs + code_1598) } else r_1594 += '\n' + GenJs1.tabs + code_1598 };
                            };
                            let isafter_1622 = false;
                            for (const f of fields_1592) {
                                const temp_1623 = f;
                                switch (temp_1623 && temp_1623[1]) {
                                case 20: {
                                    {
                                        const name_1624 = temp_1623[2];
                                        const expr_1625 = temp_1623[3];
                                        const vars_1626 = temp_1623[4];
                                        {
                                            if (name_1624 == 'new') {
                                                let out_1627 = '';
                                                let name_1628 = name_1624;
                                                if (name_1628 == 'new') { name_1628 = 'constructor' };
                                                if (isafter_1622) { out_1627 += cname + '.' + GenJs1.rename(name_1628) + ' = ' } else out_1627 += '\t' + GenJs1.rename(name_1628);
                                                out_1627 += '(' + (() => {
                                                    const result_1629 = [];
                                                    const value_1630 = vars_1626;
                                                    for (const v of value_1630) result_1629.push(((v_1631) => {
                                                        const temp_1632 = v_1631;
                                                        switch (temp_1632 && temp_1632[1]) {
                                                        case 22: {
                                                            {
                                                                const oname_1633 = temp_1632[2];
                                                                {
                                                                    let name_1634 = GenJs1.rename(oname_1633);
                                                                    if (GenJs1.hasInScope(name_1634)) { name_1634 += '$' + (++GenJs1.id) };
                                                                    GenJs1.addToScope(name_1634);
                                                                    GenJs1.parentNames.set(v_1631, name_1634);
                                                                    return GenJs1.parentNames.get(v_1631);
                                                                };
                                                            }
                                                        } break;

                                                        default:
                                                        {
                                                            {
                                                                throw v_1631;
                                                            };
                                                        }
                                                        };
                                                    })(v));
                                                    return result_1629;
                                                })().join(', ') + ') ' + ((isafter_1622)? ('=> ') : '{');
                                                out_1627 += ('\n' + (GenJs1.tabs) + '') + constructorFieldsInit.join((';\n' + (GenJs1.tabs) + '')) + ('\n' + (GenJs1.tabs) + '');
                                                if (expr_1625 != null) { {
                                                    const temp_1635 = expr_1625;
                                                    switch (temp_1635 && temp_1635[1]) {
                                                    case 10: {
                                                        {
                                                            const el_1636 = temp_1635[2];
                                                            {
                                                                GenJs1.pushTab();
                                                                out_1627 += GenJs1.stringifyBlockExpression(expr_1625);
                                                                GenJs1.popTab();
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            GenJs1.pushTab();
                                                            out_1627 += ('\n{\n' + (GenJs1.tabs) + '') + GenJs1.stringifyBlockExpression(expr_1625);
                                                            GenJs1.popTab();
                                                            out_1627 += ('\n' + (GenJs1.tabs) + '}\n');
                                                        };
                                                    }
                                                    };
                                                } } else out_1627 += '';
                                                out_1627 += '\n}';
                                                r_1594 += '\n' + GenJs1.tabs + out_1627;
                                            };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                    };
                                }
                                };
                            };
                            r_1594 += '\n' + GenJs1.tabs + '}' + ((external_1593)? (' */') : '');
                            r_1594 += '\n' + after.join(';\n');
                            return r_1594;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw '$4$ ' + node_1586;
                    };
                }
                };
            };
        } };
    GenJs1.stringify = (node_1637) => { {
            let r_1638 = '';
            if (node_1637 == null) { return '<!-- null -->' };
            let atts_1639 = Project.mapAttributes.get(node_1637);
            let a_1640 = '';
            if (atts_1639 != null && atts_1639.length > 0) { for (const att of atts_1639) {
            } };
            {
                const temp_1641 = node_1637;
                switch (temp_1641 && temp_1641[1]) {
                case 42: {
                    {
                        const f_1642 = temp_1641[2];
                        {
                            return '/*tprivate*/ ' + GenJs1.stringify(f_1642);
                        };
                    }
                } break;

                case 43: {
                    {
                        const f_1643 = temp_1641[2];
                        {
                            return '/*texport*/' + GenJs1.stringify(f_1643);
                        };
                    }
                } break;

                case 35: {
                    {
                        const path_1644 = temp_1641[2];
                        const bind_1645 = temp_1641[3];
                        const expr_1646 = temp_1641[4];
                        {
                            {
                                GenJs1.enumUid++;
                                let out_1647 = '';
                                let postout = '';
                                let i_1648 = 0;
                                for (const e of bind_1645) {
                                    {
                                        const temp_1649 = e;
                                        switch (temp_1649 && temp_1649[1]) {
                                        case null: {
                                            {
                                                {
                                                    {
                                                    };
                                                };
                                            }
                                        } break;

                                        case 22: {
                                            {
                                                const name_1650 = temp_1649[2];
                                                {
                                                    let name_1651 = GenJs1.stringify(e).split(' ')[1];
                                                    out_1647 += ('let ' + (name_1651) + ' = null;\n') + GenJs1.tabs;
                                                    postout += GenJs1.tabs + ('\t' + (name_1651) + ' = enum' + (GenJs1.enumUid) + '$.values[' + (i_1648) + '];');
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                throw 'TEnumExtract contains not a var: ' + e;
                                            };
                                        }
                                        };
                                    };
                                    i_1648++;
                                };
                                let value_1652 = ('const enum' + (GenJs1.enumUid) + '$ = ') + GenJs1.unwrapBlockValue(expr_1646) + (';\n' + (GenJs1.tabs) + '');
                                return value_1652 + out_1647 + ('if (enum' + (GenJs1.enumUid) + '$.index == $TODO) {\n') + postout + ('\n' + (GenJs1.tabs) + '}');
                            };
                        };
                    }
                } break;

                case 37: {
                    {
                        const names_1653 = temp_1641[2];
                        {
                            return ('/*using ' + (names_1653) + '*/');
                        };
                    }
                } break;

                case 23: {
                    {
                        const e_1654 = temp_1641[2];
                        {
                            return (() => {
                                const result_1655 = [];
                                const value_1656 = e_1654;
                                for (const e of value_1656) result_1655.push(GenJs1.stringify(e));
                                return result_1655;
                            })().join('; ');
                        };
                    }
                } break;

                case 0: {
                    {
                        const s_1657 = temp_1641[2];
                        {
                            let s_1658 = s_1657.split('');
                            let charsOut_1659 = [];
                            while (s_1658.length > 0) {
                                {
                                    const temp_1660 = s_1658[0];
                                    switch (temp_1660) {
                                    case '\'': {
                                        {
                                            {
                                                charsOut_1659.push('\\');
                                                charsOut_1659.push('\'');
                                                s_1658.shift();
                                            };
                                        }
                                    } break;

                                    case '\n': {
                                        {
                                            {
                                                charsOut_1659.push('\\n');
                                                s_1658.shift();
                                            };
                                        }
                                    } break;

                                    case '\r': {
                                        {
                                            {
                                                charsOut_1659.push('\\r');
                                                s_1658.shift();
                                            };
                                        }
                                    } break;

                                    case '\\': {
                                        {
                                            {
                                                s_1658.shift();
                                                if (s_1658[0] == '\'') {
                                                    charsOut_1659.push('\\');
                                                    charsOut_1659.push('\'');
                                                    s_1658.shift();
                                                } else {
                                                    charsOut_1659.push('\\');
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            charsOut_1659.push(s_1658[0]);
                                            s_1658.shift();
                                        };
                                    }
                                    };
                                };
                            };
                            return '\'' + charsOut_1659.join('') + '\'';
                        };
                    }
                } break;

                case 1: {
                    {
                        const s_1661 = temp_1641[2];
                        {
                            let source_1662 = Project.mapNames.get(node_1637);
                            let n_1663 = null;
                            {
                                const temp_1664 = source_1662;
                                switch (temp_1664 && temp_1664[1]) {
                                case null: {
                                    {
                                        {
                                            throw ('Unmapped ' + (node_1637) + ' ') + JSON.stringify(Project.data.get(node_1637));
                                        };
                                    }
                                } break;

                                case 36: {
                                    {
                                        const name_1665 = temp_1664[2];
                                        const t_1666 = temp_1664[3];
                                        {
                                            let nn = GenJs1.parentNames.get(source_1662);
                                            if (nn == null) { throw ('TDeclare `' + (name_1665) + '` parentNames null == ') + GenJs1.parentNames.get(source_1662) + ' for ' + source_1662 };
                                            let arename = GenJs1.getAtt(Project.mapAttributes.get(source_1662), 'native');
                                            if (arename != null) {
                                                const temp_1667 = arename.values[0];
                                                switch (temp_1667 && temp_1667[1]) {
                                                case null: {
                                                    {
                                                        {
                                                            n_1663 = nn;
                                                        };
                                                    }
                                                } break;

                                                case 0: {
                                                    {
                                                        const s_1668 = temp_1667[2];
                                                        {
                                                            n_1663 = s_1668;
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        n_1663 = nn;
                                                    };
                                                }
                                                };
                                            } else n_1663 = nn;
                                        };
                                    }
                                } break;

                                case 34: {
                                    {
                                        const t_1669 = temp_1664[2];
                                        {
                                            {
                                                const temp_1670 = t_1669;
                                                switch (temp_1670 && temp_1670[1]) {
                                                case 1: {
                                                    {
                                                        const name_1671 = temp_1670[2];
                                                        {
                                                            n_1663 = name_1671;
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        throw 'Expected NodeType.Type' + t_1669;
                                                    };
                                                }
                                                };
                                            };
                                        };
                                    }
                                } break;

                                case 44: {
                                    {
                                        const name_1672 = temp_1664[2];
                                        {
                                            n_1663 = GenJs1.parentNames.get(source_1662);
                                        };
                                    }
                                } break;

                                case 1: {
                                    {
                                        const name_1673 = temp_1664[2];
                                        {
                                            n_1663 = ((GenJs1.parentNames.get(source_1662)) || (GenJs1.rename(name_1673)));
                                        };
                                    }
                                } break;

                                case 22: {
                                    {
                                        const name_1674 = temp_1664[2];
                                        {
                                            n_1663 = GenJs1.parentNames.get(source_1662);
                                            if (n_1663 == null) {
                                                let data_1675 = Project.data.get(node_1637);
                                                let at = (data_1675 != null)? (' at ' + data_1675.line + ':' + data_1675.column + ':' + data_1675.fileName) : '';
                                                throw ('TVar `' + (name_1674) + '` parentNames null == ') + GenJs1.parentNames.get(source_1662) + ' for ' + source_1662 + at;
                                            };
                                            let static_source = Project.mapNames.get(source_1662);
                                            if (static_source != null) { n_1663 = 'this.' + n_1663 };
                                        };
                                    }
                                } break;

                                case 41: {
                                    {
                                        const f_1676 = temp_1664[2];
                                        {
                                            let name_1677 = null;
                                            {
                                                const temp_1678 = f_1676;
                                                switch (temp_1678 && temp_1678[1]) {
                                                case 22: {
                                                    {
                                                        const n_1679 = temp_1678[2];
                                                        {
                                                            name_1677 = n_1679;
                                                        };
                                                    }
                                                } break;

                                                case 20: {
                                                    {
                                                        const n_1680 = temp_1678[2];
                                                        {
                                                            name_1677 = n_1680;
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        throw ('Node.TStatic ' + (s_1661) + ' ') + source_1662;
                                                    };
                                                }
                                                };
                                            };
                                            let static_source_1681 = Project.mapNames.get(source_1662);
                                            {
                                                const temp_1682 = static_source_1681;
                                                switch (temp_1682 && temp_1682[1]) {
                                                case 24: {
                                                    {
                                                        const t_1683 = temp_1682[2];
                                                        {
                                                            n_1663 = GenJs1.rename(GenJs1.extractTypeName(t_1683)) + '.' + GenJs1.rename(name_1677);
                                                        };
                                                    }
                                                } break;

                                                case 34: {
                                                    {
                                                        const t_1684 = temp_1682[2];
                                                        {
                                                            n_1663 = GenJs1.rename(GenJs1.extractTypeName(t_1684)) + '.' + GenJs1.rename(name_1677);
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        throw ('static_source is ' + (static_source_1681) + '');
                                                    };
                                                }
                                                };
                                            };
                                        };
                                    }
                                } break;

                                case 20: {
                                    {
                                        const name_1685 = temp_1664[2];
                                        {
                                            n_1663 = GenJs1.rename(name_1685);
                                            let static_source_1686 = Project.mapNames.get(source_1662);
                                            if (static_source_1686 != null) { n_1663 = 'this.' + n_1663 };
                                        };
                                    }
                                } break;

                                case 24: {
                                    {
                                        const t_1687 = temp_1664[2];
                                        {
                                            let arename_1688 = GenJs1.getAtt(Project.mapAttributes.get(source_1662), 'native');
                                            let name_1689 = GenJs1.rename(GenJs1.extractTypeName(t_1687));
                                            if (arename_1688 != null) {
                                                const temp_1690 = arename_1688.values[0];
                                                switch (temp_1690 && temp_1690[1]) {
                                                case null: {
                                                    {
                                                        {
                                                            n_1663 = name_1689;
                                                        };
                                                    }
                                                } break;

                                                case 0: {
                                                    {
                                                        const s_1691 = temp_1690[2];
                                                        {
                                                            n_1663 = s_1691;
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        n_1663 = name_1689;
                                                    };
                                                }
                                                };
                                            } else n_1663 = name_1689;
                                        };
                                    }
                                } break;

                                case 32: {
                                    {
                                        const path_1692 = temp_1664[2];
                                        {
                                            n_1663 = path_1692.join('.');
                                        };
                                    }
                                } break;

                                case 31: {
                                    {
                                        {
                                            n_1663 = GenJs1.rename(s_1661);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw ('' + (s_1661) + ' ') + source_1662;
                                    };
                                }
                                };
                            };
                            return n_1663;
                        };
                    }
                } break;

                case 2: {
                    {
                        const v_1693 = temp_1641[2];
                        {
                            return ((v_1693)? ('true') : 'false');
                        };
                    }
                } break;

                case 3: {
                    {
                        {
                            return 'this';
                        };
                    }
                } break;

                case 4: {
                    {
                        {
                            return 'super';
                        };
                    }
                } break;

                case 5: {
                    {
                        const s_1694 = temp_1641[2];
                        {
                            return s_1694;
                        };
                    }
                } break;

                case 6: {
                    {
                        const s_1695 = temp_1641[2];
                        {
                            return s_1695;
                        };
                    }
                } break;

                case 7: {
                    {
                        {
                            return 'null';
                        };
                    }
                } break;

                case 16: {
                    {
                        {
                            return 'break';
                        };
                    }
                } break;

                case 17: {
                    {
                        {
                            return 'continue';
                        };
                    }
                } break;

                case 8: {
                    {
                        const a_1696 = temp_1641[2];
                        const op_1697 = temp_1641[3];
                        const b_1698 = temp_1641[4];
                        {
                            return GenJs1.unwrapBlockValue(a_1696) + ' ' + Token.stringify(op_1697) + ' ' + GenJs1.unwrapBlockValue(b_1698);
                        };
                    }
                } break;

                case 9: {
                    {
                        const a_1699 = temp_1641[2];
                        const op_1700 = temp_1641[3];
                        const b_1701 = temp_1641[4];
                        {
                            return GenJs1.unwrapBlockValue(a_1699) + ' ' + Token.stringify(op_1700) + '= ' + GenJs1.unwrapBlockValue(b_1701);
                        };
                    }
                } break;

                case 10: {
                    {
                        const elements_1702 = temp_1641[2];
                        {
                            if (elements_1702.length == 0) { return '{}' };
                            r_1638 = '{\n';
                            GenJs1.pushScope();
                            GenJs1.pushTab();
                            for (const element of elements_1702) {
                                const temp_1703 = element;
                                switch (temp_1703) {
                                default:
                                {
                                    {
                                        let code_1704 = GenJs1.tabs + GenJs1.stringifyBlockExpression(element) + ';\n';
                                        r_1638 += code_1704;
                                    };
                                }
                                };
                            };
                            GenJs1.popTab();
                            GenJs1.popScope();
                            return r_1638 + GenJs1.tabs + '}';
                        };
                    }
                } break;

                case 45: {
                    {
                        const a_1705 = temp_1641[2];
                        const b_1706 = temp_1641[3];
                        {
                            return GenJs1.stringify(a_1705) + ' || ' + GenJs1.stringify(b_1706);
                        };
                    }
                } break;

                case 44: {
                    {
                        const n_1707 = temp_1641[2];
                        const a_1708 = temp_1641[3];
                        const b_1709 = temp_1641[4];
                        {
                            GenJs1.pushScope();
                            let name_1710 = GenJs1.rename(n_1707);
                            if (GenJs1.hasInScope(name_1710)) { name_1710 += '$' + (++GenJs1.id) };
                            GenJs1.addToScope(name_1710);
                            GenJs1.parentNames.set(node_1637, name_1710);
                            let res_1711 = '';
                            {
                                const temp_1712 = a_1708;
                                switch (temp_1712 && temp_1712[1]) {
                                case 26: {
                                    {
                                        const f_1713 = temp_1712[3];
                                        {
                                            if (f_1713 == 'length') {
                                                let i_1714 = GenJs1.rename(name_1710);
                                                res_1711 = ('{ let $v = ' + (GenJs1.stringify(a_1708)) + '; let ' + (i_1714) + ' = 0; while(' + (i_1714) + ' < $v) {') + GenJs1.stringifyBlockExpression(b_1709) + ('\n' + (GenJs1.tabs) + '' + (i_1714) + '++; }\n' + (GenJs1.tabs) + ' }');
                                            } else {
                                                res_1711 = 'for (const ' + GenJs1.rename(name_1710) + ' of ' + GenJs1.stringify(a_1708) + ') ' + GenJs1.stringifyBlockExpression(b_1709);
                                            };
                                        };
                                    }
                                } break;

                                case 5: {
                                    {
                                        const s_1715 = temp_1712[2];
                                        {
                                            let i_1716 = GenJs1.rename(name_1710);
                                            res_1711 = ('{ let ' + (i_1716) + ' = 0; while(' + (i_1716) + ' < ' + (s_1715) + ') {') + GenJs1.stringifyBlockExpression(b_1709) + ('\n' + (GenJs1.tabs) + '' + (i_1716) + '++; }\n' + (GenJs1.tabs) + ' }');
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        res_1711 = 'for (const ' + GenJs1.rename(name_1710) + ' of ' + GenJs1.stringify(a_1708) + ') ' + GenJs1.stringifyBlockExpression(b_1709);
                                    };
                                }
                                };
                            };
                            GenJs1.popScope();
                            return res_1711;
                        };
                    }
                } break;

                case 11: {
                    {
                        const e_1717 = temp_1641[2];
                        const el_1718 = temp_1641[3];
                        const argNames_1719 = temp_1641[4];
                        {
                            let source_1720 = Project.mapNames.get(e_1717);
                            {
                                const temp_1721 = source_1720;
                                switch (temp_1721 && temp_1721[1]) {
                                case null: {
                                    {
                                        {
                                            return GenJs1.unwrapBlockValue(e_1717) + '(' + (() => {
                                                const result_1722 = [];
                                                const value_1723 = el_1718;
                                                for (const e of value_1723) result_1722.push(GenJs1.unwrapBlockValue(e));
                                                return result_1722;
                                            })().join(', ') + ')';
                                        };
                                    }
                                } break;

                                case 20: {
                                    {
                                        const name_1724 = temp_1721[2];
                                        {
                                            if (name_1724 == 'instanceof') { return '((' + GenJs1.unwrapBlockValue(el_1718[0]) + ') instanceof (' + GenJs1.unwrapBlockValue(el_1718[1]) + '))' };
                                            return GenJs1.unwrapBlockValue(e_1717) + '(' + (() => {
                                                const result_1725 = [];
                                                const value_1726 = el_1718;
                                                for (const e of value_1726) result_1725.push(GenJs1.unwrapBlockValue(e));
                                                return result_1725;
                                            })().join(', ') + ')';
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        return GenJs1.unwrapBlockValue(e_1717) + '(' + (() => {
                                            const result_1727 = [];
                                            const value_1728 = el_1718;
                                            for (const e of value_1728) result_1727.push(GenJs1.unwrapBlockValue(e));
                                            return result_1727;
                                        })().join(', ') + ')';
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                case 13: {
                    {
                        const e_1729 = temp_1641[2];
                        {
                            {
                                const temp_1730 = e_1729;
                                switch (temp_1730 && temp_1730[1]) {
                                case 13: {
                                    {
                                        const e_1731 = temp_1730[2];
                                        {
                                            return '(' + GenJs1.unwrapBlockValue(e_1731) + ')';
                                        };
                                    }
                                } break;
                                };
                            };
                            return '(' + GenJs1.unwrapBlockValue(e_1729) + ')';
                        };
                    }
                } break;

                case 14: {
                    {
                        const e_1732 = temp_1641[2];
                        {
                            if (e_1732 == null) { return 'return ' } else return 'return ' + GenJs1.unwrapBlockValue(e_1732);
                        };
                    }
                } break;

                case 15: {
                    {
                        const e_1733 = temp_1641[2];
                        {
                            return 'throw ' + GenJs1.unwrapBlockValue(e_1733) + '';
                        };
                    }
                } break;

                case 28: {
                    {
                        const el_1734 = temp_1641[2];
                        {
                            {
                                const temp_1735 = el_1734[0];
                                switch (temp_1735 && temp_1735[1]) {
                                case 44: {
                                    {
                                        const oname_1736 = temp_1735[2];
                                        const array = temp_1735[3];
                                        const expr_1737 = temp_1735[4];
                                        {
                                            const f_1738 = el_1734[0];
                                            GenJs1.pushScope();
                                            r_1638 += '((()=>{';
                                            r_1638 += 'const return$$ = []; ';
                                            let name_1739 = GenJs1.rename(oname_1736);
                                            if (GenJs1.hasInScope(name_1739)) { name_1739 += '$' + (++GenJs1.id) };
                                            GenJs1.addToScope(name_1739);
                                            GenJs1.parentNames.set(f_1738, name_1739);
                                            r_1638 += 'const $switch$ = ' + GenJs1.unwrapBlockValue(array) + ';';
                                            {
                                                const temp_1740 = array;
                                                switch (temp_1740 && temp_1740[1]) {
                                                case 26: {
                                                    {
                                                        const f_1741 = temp_1740[3];
                                                        {
                                                            if (f_1741 == 'length') {
                                                                let i_1742 = GenJs1.rename(name_1739);
                                                                r_1638 += ('let ' + (i_1742) + ' = -1; while((' + (i_1742) + '+1) < $switch$) { ' + (i_1742) + '++; ');
                                                            } else {
                                                                r_1638 += 'for (const ' + GenJs1.rename(name_1739) + ' of $switch$) { ';
                                                            };
                                                        };
                                                    }
                                                } break;

                                                case 5: {
                                                    {
                                                        const s_1743 = temp_1740[2];
                                                        {
                                                            let i_1744 = GenJs1.rename(name_1739);
                                                            r_1638 += ('let ' + (i_1744) + ' = -1; while((' + (i_1744) + '+1) < $switch$) { ' + (i_1744) + '++; ');
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        r_1638 += 'for (const ' + GenJs1.rename(name_1739) + ' of $switch$) { ';
                                                    };
                                                }
                                                };
                                            };
                                            r_1638 += 'return$$.push(';
                                            r_1638 += GenJs1.unwrapBlockValue(expr_1737);
                                            r_1638 += '); } return return$$;';
                                            r_1638 += '})())';
                                            GenJs1.popScope();
                                            return r_1638;
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        return '[' + (() => {
                                            const result_1745 = [];
                                            const value_1746 = el_1734;
                                            for (const e of value_1746) result_1745.push(GenJs1.unwrapBlockValue(e));
                                            return result_1745;
                                        })().join(', ') + ']';
                                    };
                                }
                                };
                            };
                        };
                    }
                } break;

                case 29: {
                    {
                        const keys_1747 = temp_1641[2];
                        const values_1748 = temp_1641[3];
                        {
                            if (keys_1747.length == 0) { return 'new Map()' };
                            return 'new Map([' + (() => {
                                const result_1749 = [];
                                const value_1750 = keys_1747.length;
                                let i = -1;
                                while ((i + 1) < value_1750) {
                                    i++;
                                    result_1749.push('[' + GenJs1.unwrapBlockValue(keys_1747[i]) + ', ' + GenJs1.unwrapBlockValue(values_1748[i]) + ']');
                                };
                                return result_1749;
                            })().join(', ') + '])';
                        };
                    }
                } break;

                case 12: {
                    {
                        const econd_1751 = temp_1641[2];
                        const eif_1752 = temp_1641[3];
                        const eelse_1753 = temp_1641[4];
                        {
                            r_1638 = '(' + (() => {
                                const result_1754 = [];
                                const value_1755 = econd_1751;
                                for (const e of value_1755) result_1754.push(GenJs1.unwrapBlockValue(e));
                                return result_1754;
                            })().join(' && ') + ')? (' + GenJs1.unwrapBlockValue(eif_1752);
                            if (eelse_1753 != null) { r_1638 += ') : (' + GenJs1.unwrapBlockValue(eelse_1753) + ')' };
                            return r_1638;
                        };
                    }
                } break;

                case 18: {
                    {
                        const op_1756 = temp_1641[2];
                        const postfix_1757 = temp_1641[3];
                        const e_1758 = temp_1641[4];
                        {
                            return (postfix_1757)? ((GenJs1.stringify(e_1758) + Token.stringify(op_1756))) : (Token.stringify(op_1756) + GenJs1.stringify(e_1758));
                        };
                    }
                } break;

                case 19: {
                    {
                        const econd_1759 = temp_1641[2];
                        const e_1760 = temp_1641[3];
                        const whileDo = temp_1641[4];
                        {
                            if (whileDo) { return 'while(' + GenJs1.stringify(econd_1759) + ') ' + GenJs1.stringify(e_1760) };
                            return 'do{' + GenJs1.stringify(e_1760) + '}while(' + GenJs1.stringify(econd_1759) + ')';
                        };
                    }
                } break;

                case 46: {
                    {
                        const type_1761 = temp_1641[2];
                        {
                            return GenJs1.extractTypeName(type_1761);
                        };
                    }
                } break;

                case 26: {
                    {
                        const expr_1762 = temp_1641[2];
                        const name_1763 = temp_1641[3];
                        {
                            {
                                const temp_1764 = expr_1762;
                                switch (temp_1764 && temp_1764[1]) {
                                case 0: {
                                    {
                                        const s_1765 = temp_1764[2];
                                        {
                                            if (name_1763 == 'length') { return '' + s_1765.length };
                                        };
                                    }
                                } break;
                                };
                            };
                            return GenJs1.unwrapBlockValue(expr_1762) + '.' + GenJs1.rename(name_1763);
                        };
                    }
                } break;

                case 30: {
                    {
                        const expr_1766 = temp_1641[2];
                        const index_1767 = temp_1641[3];
                        {
                            return GenJs1.unwrapBlockValue(expr_1766) + '[' + GenJs1.unwrapBlockValue(index_1767) + ']';
                        };
                    }
                } break;

                case 38: {
                    {
                        const expr_1768 = temp_1641[2];
                        const t_1769 = temp_1641[3];
                        {
                            return '';
                        };
                    }
                } break;

                case 39: {
                    {
                        const expr_1770 = temp_1641[2];
                        const kind_1771 = temp_1641[3];
                        const t_1772 = temp_1641[4];
                        {
                            return '(' + GenJs1.unwrapBlockValue(expr_1770) + ')';
                        };
                    }
                } break;

                case 21: {
                    {
                        const expr_1773 = temp_1641[2];
                        const vars_1774 = temp_1641[3];
                        {
                            GenJs1.pushScope();
                            r_1638 = '';
                            r_1638 += '(' + (() => {
                                const result_1775 = [];
                                const value_1776 = vars_1774;
                                for (const v of value_1776) result_1775.push(((v_1777) => {
                                    const temp_1778 = v_1777;
                                    switch (temp_1778 && temp_1778[1]) {
                                    case 22: {
                                        {
                                            const oname_1779 = temp_1778[2];
                                            {
                                                let name_1780 = GenJs1.rename(oname_1779);
                                                if (GenJs1.hasInScope(name_1780)) { name_1780 += '$' + (++GenJs1.id) };
                                                GenJs1.addToScope(name_1780);
                                                GenJs1.parentNames.set(v_1777, name_1780);
                                                return GenJs1.parentNames.get(v_1777);
                                            };
                                        }
                                    } break;

                                    case 1: {
                                        {
                                            const oname_1781 = temp_1778[2];
                                            {
                                                let name_1782 = GenJs1.rename(oname_1781);
                                                if (GenJs1.hasInScope(name_1782)) { name_1782 += '$' + (++GenJs1.id) };
                                                GenJs1.addToScope(name_1782);
                                                GenJs1.parentNames.set(v_1777, name_1782);
                                                return GenJs1.parentNames.get(v_1777);
                                            };
                                        }
                                    } break;

                                    case 13: {
                                        {
                                            const e_1783 = temp_1778[2];
                                            {
                                                if (e_1783 != null) { throw v_1777 };
                                                return '';
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            throw 'at Node.TFunction ' + v_1777;
                                        };
                                    }
                                    };
                                })(v));
                                return result_1775;
                            })().join(', ') + ') => ';
                            if (expr_1773 != null) { {
                                const temp_1784 = expr_1773;
                                switch (temp_1784 && temp_1784[1]) {
                                case 10: {
                                    {
                                        const el_1785 = temp_1784[2];
                                        {
                                            r_1638 += GenJs1.stringify(expr_1773);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        GenJs1.pushScope();
                                        GenJs1.pushTab();
                                        r_1638 += ('{\n' + (GenJs1.tabs) + '') + GenJs1.stringify(expr_1773) + ('\n\t' + (GenJs1.tabs) + '}');
                                        GenJs1.popTab();
                                        GenJs1.popScope();
                                    };
                                }
                                };
                            } } else r_1638 += '{}';
                            GenJs1.popScope();
                            return r_1638;
                        };
                    }
                } break;

                case 20: {
                    {
                        const name_1786 = temp_1641[2];
                        const expr_1787 = temp_1641[3];
                        const vars_1788 = temp_1641[4];
                        {
                            GenJs1.pushScope();
                            r_1638 = '';
                            if (name_1786 != null) { r_1638 += ' ' + GenJs1.rename(name_1786) };
                            r_1638 += '(' + (() => {
                                const result_1789 = [];
                                const value_1790 = vars_1788;
                                for (const v of value_1790) result_1789.push(((v_1791) => {
                                    const temp_1792 = v_1791;
                                    switch (temp_1792 && temp_1792[1]) {
                                    case 22: {
                                        {
                                            const oname_1793 = temp_1792[2];
                                            {
                                                let name_1794 = GenJs1.rename(oname_1793);
                                                if (GenJs1.hasInScope(name_1794)) { name_1794 += '$' + (++GenJs1.id) };
                                                GenJs1.addToScope(name_1794);
                                                GenJs1.parentNames.set(v_1791, name_1794);
                                                return GenJs1.parentNames.get(v_1791);
                                            };
                                        }
                                    } break;

                                    case 1: {
                                        {
                                            const oname_1795 = temp_1792[2];
                                            {
                                                let name_1796 = GenJs1.rename(oname_1795);
                                                if (GenJs1.hasInScope(name_1796)) { name_1796 += '$' + (++GenJs1.id) };
                                                GenJs1.addToScope(name_1796);
                                                GenJs1.parentNames.set(v_1791, name_1796);
                                                return GenJs1.parentNames.get(v_1791);
                                            };
                                        }
                                    } break;

                                    case 13: {
                                        {
                                            const e_1797 = temp_1792[2];
                                            {
                                                if (e_1797 != null) { throw v_1791 };
                                                return '';
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            throw 'at Node.TFunction ' + v_1791;
                                        };
                                    }
                                    };
                                })(v));
                                return result_1789;
                            })().join(', ') + ') => ';
                            if (expr_1787 != null) { {
                                const temp_1798 = expr_1787;
                                switch (temp_1798 && temp_1798[1]) {
                                case 10: {
                                    {
                                        const el_1799 = temp_1798[2];
                                        {
                                            r_1638 += GenJs1.stringify(expr_1787);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        GenJs1.pushScope();
                                        GenJs1.pushTab();
                                        r_1638 += ('{\n' + (GenJs1.tabs) + '') + GenJs1.stringify(expr_1787) + ('\n\t' + (GenJs1.tabs) + '}');
                                        GenJs1.popTab();
                                        GenJs1.popScope();
                                    };
                                }
                                };
                            } } else r_1638 += '{}';
                            GenJs1.popScope();
                            return r_1638;
                        };
                    }
                } break;

                case 22: {
                    {
                        const oname_1800 = temp_1641[2];
                        const t_1801 = temp_1641[3];
                        const expr_1802 = temp_1641[4];
                        const const_1803 = temp_1641[5];
                        {
                            if (oname_1800 == null) { throw ('name is null for ' + (node_1637) + '') };
                            let es = '';
                            if (expr_1802 != null) { es = ' = ' + GenJs1.unwrapBlockValue(expr_1802) };
                            let name_1804 = GenJs1.rename(oname_1800);
                            if (GenJs1.hasInScope(name_1804)) { name_1804 += '$' + (++GenJs1.id) };
                            GenJs1.addToScope(name_1804);
                            GenJs1.parentNames.set(node_1637, name_1804);
                            if (name_1804 == null) { throw ('name is null for ' + (node_1637) + '') };
                            r_1638 = ((const_1803)? ('const ') : 'let ') + name_1804 + es;
                            return r_1638;
                        };
                    }
                } break;

                case 25: {
                    {
                        const expr_1805 = temp_1641[2];
                        const t_1806 = temp_1641[3];
                        const v_1807 = temp_1641[4];
                        const catches_1808 = temp_1641[5];
                        {
                            r_1638 = ('try {\n' + (GenJs1.tabs) + '\t');
                            GenJs1.pushTab();
                            {
                                const temp_1809 = expr_1805;
                                switch (temp_1809 && temp_1809[1]) {
                                case 10: {
                                    {
                                        const el_1810 = temp_1809[2];
                                        {
                                            r_1638 += (() => {
                                                const result_1811 = [];
                                                const value_1812 = el_1810;
                                                for (const e of value_1812) result_1811.push(GenJs1.stringifyBlockExpression(e));
                                                return result_1811;
                                            })().join(';\n' + GenJs1.tabs);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        r_1638 += GenJs1.stringify(expr_1805);
                                    };
                                }
                                };
                            };
                            GenJs1.popTab();
                            r_1638 += '\n' + GenJs1.tabs + '} catch(' + DataHelper.varName(v_1807[0]) + (') {\n' + (GenJs1.tabs) + '\t');
                            GenJs1.pushTab();
                            GenJs1.parentNames.set(v_1807[0], DataHelper.varName(v_1807[0]));
                            {
                                const temp_1813 = catches_1808[0];
                                switch (temp_1813 && temp_1813[1]) {
                                case 10: {
                                    {
                                        const el_1814 = temp_1813[2];
                                        {
                                            r_1638 += (() => {
                                                const result_1815 = [];
                                                const value_1816 = el_1814;
                                                for (const e of value_1816) result_1815.push(GenJs1.stringify(e));
                                                return result_1815;
                                            })().join(';\n' + GenJs1.tabs);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        r_1638 += GenJs1.stringify(catches_1808[0]);
                                    };
                                }
                                };
                            };
                            GenJs1.popTab();
                            return r_1638 + '\n' + GenJs1.tabs + '}';
                        };
                    }
                } break;

                case 27: {
                    {
                        const path_1817 = temp_1641[2];
                        const t_1818 = temp_1641[3];
                        const args_1819 = temp_1641[4];
                        const names_1820 = temp_1641[5];
                        const values_1821 = temp_1641[6];
                        {
                            return 'new ' + path_1817.join('.') + (path_1817.length > (0)? ('.') : '') + GenJs1.extractTypeName(t_1818) + '(' + (() => {
                                const result_1822 = [];
                                const value_1823 = args_1819;
                                for (const e of value_1823) result_1822.push(GenJs1.unwrapBlockValue(e));
                                return result_1822;
                            })().join(', ') + ')';
                        };
                    }
                } break;

                case 31: {
                    {
                        const exprs_1824 = temp_1641[2];
                        const conds_1825 = temp_1641[3];
                        const guards_1826 = temp_1641[4];
                        const cases_1827 = temp_1641[5];
                        {
                            let nullCase = null;
                            let defaultCase = null;
                            let isComplexEnum_1828 = false;
                            {
                                const value_1829 = cases_1827.length;
                                let i = 0;
                                while (i < value_1829) {
                                    {
                                        let cond_1830 = conds_1825[i];
                                        {
                                            const temp_1831 = cond_1830;
                                            switch (temp_1831 && temp_1831[1]) {
                                            case 11: {
                                                {
                                                    {
                                                        isComplexEnum_1828 = true;
                                                    };
                                                }
                                            } break;

                                            case 28: {
                                                {
                                                    {
                                                        isComplexEnum_1828 = true;
                                                    };
                                                }
                                            } break;

                                            case 7: {
                                                {
                                                    {
                                                        if (nullCase == null) { nullCase = cases_1827[i] };
                                                    };
                                                }
                                            } break;

                                            case 40: {
                                                {
                                                    {
                                                        if (defaultCase == null) { defaultCase = cases_1827[i] };
                                                    };
                                                }
                                            } break;

                                            case 1: {
                                                {
                                                    {
                                                        if (defaultCase == null) { defaultCase = cases_1827[i] };
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                    {
                                                    };
                                                };
                                            }
                                            };
                                        };
                                    };
                                    i++;
                                };
                            };
                            r_1638 = ('{\n' + (GenJs1.tabs) + '');
                            const wrapIntoReturn = (e_1832) => {
                                if (e_1832 == null) { return '{}' };
                                return GenJs1.stringifyBlockExpression(e_1832);
                            };
                            let ex_1833 = GenJs1.unwrapBlockValue(exprs_1824[0]);
                            r_1638 += 'const $switch$ = ' + ex_1833 + (';\n' + (GenJs1.tabs) + '');
                            if (nullCase != null) {
                                r_1638 += ('if($switch$ == null) {\n' + (GenJs1.tabs) + '');
                                r_1638 += '\t' + wrapIntoReturn(nullCase);
                                r_1638 += ('\n' + (GenJs1.tabs) + '} else {\n' + (GenJs1.tabs) + '');
                            };
                            {
                                r_1638 += ('switch((($switch$==undefined) || ([\"number\",\"string\"].indexOf(typeof($switch$)) != -1))?$switch$:$switch$[1]) {\n' + (GenJs1.tabs) + '');
                                if (isComplexEnum_1828 == false) {
                                    let usedTags = [];
                                    {
                                        const value_1834 = cases_1827.length;
                                        let i = 0;
                                        while (i < value_1834) {
                                            {
                                                let c_1835 = cases_1827[i];
                                                let cond_1836 = conds_1825[i];
                                                {
                                                    const temp_1837 = cond_1836;
                                                    switch (temp_1837 && temp_1837[1]) {
                                                    case 40: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    case 1: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    case 7: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    case 8: {
                                                        {
                                                            const a_1838 = temp_1837[2];
                                                            const op_1839 = temp_1837[3];
                                                            const b_1840 = temp_1837[4];
                                                            {
                                                                r_1638 += 'case ' + GenJs1.stringify(a_1838) + ': ' + 'case ' + GenJs1.stringify(b_1840) + ': ' + wrapIntoReturn(c_1835) + ('\n' + (GenJs1.tabs) + 'break;\n' + (GenJs1.tabs) + '');
                                                            };
                                                        }
                                                    } break;

                                                    case 12: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            r_1638 += 'case ' + GenJs1.stringify(cond_1836) + ': ' + wrapIntoReturn(c_1835) + ('\n' + (GenJs1.tabs) + 'break;\n' + (GenJs1.tabs) + '');
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                            i++;
                                        };
                                    };
                                } else {
                                    let usedTags_1841 = [];
                                    {
                                        const value_1842 = cases_1827.length;
                                        let i = 0;
                                        while (i < value_1842) {
                                            {
                                                let c_1843 = cases_1827[i];
                                                const getETN = (node_1844) => { {
                                                    const temp_1845 = node_1844;
                                                    switch (temp_1845 && temp_1845[1]) {
                                                    case 11: {
                                                        {
                                                            const e_1846 = temp_1845[2];
                                                            {
                                                                return getETN(e_1846);
                                                            };
                                                        }
                                                    } break;

                                                    case 26: {
                                                        {
                                                            const e_1847 = temp_1845[2];
                                                            const n_1848 = temp_1845[3];
                                                            {
                                                                {
                                                                    const temp_1849 = e_1847;
                                                                    switch (temp_1849 && temp_1849[1]) {
                                                                    case 1: {
                                                                        {
                                                                            const t_1850 = temp_1849[2];
                                                                            {
                                                                                return {e:e_1847, n:n_1848};
                                                                            };
                                                                        }
                                                                    } break;
                                                                    };
                                                                };
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                } };
                                                let cond_1851 = conds_1825[i];
                                                {
                                                    const temp_1852 = cond_1851;
                                                    switch (temp_1852 && temp_1852[1]) {
                                                    case 40: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    case 1: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    case 7: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            const tagOf = (e_1853, n_1854) => {
                                                                let tag_1855 = -1;
                                                                let source_1856 = Project.mapNames.get(e_1853);
                                                                let i_1857 = 0;
                                                                {
                                                                    const temp_1858 = source_1856;
                                                                    switch (temp_1858 && temp_1858[1]) {
                                                                    case 34: {
                                                                        {
                                                                            const t_1859 = temp_1858[2];
                                                                            const f_1860 = temp_1858[3];
                                                                            {
                                                                                for (const fi of f_1860) {
                                                                                    const temp_1861 = fi;
                                                                                    switch (temp_1861 && temp_1861[1]) {
                                                                                    case 11: {
                                                                                        {
                                                                                            const a_1862 = temp_1861[2];
                                                                                            {
                                                                                                {
                                                                                                    const temp_1863 = a_1862;
                                                                                                    switch (temp_1863 && temp_1863[1]) {
                                                                                                    case 1: {
                                                                                                        {
                                                                                                            const na = temp_1863[2];
                                                                                                            {
                                                                                                                if (n_1854 == na) { tag_1855 = i_1857 };
                                                                                                                i_1857++;
                                                                                                            };
                                                                                                        }
                                                                                                    } break;
                                                                                                    };
                                                                                                };
                                                                                            };
                                                                                        }
                                                                                    } break;

                                                                                    case 1: {
                                                                                        {
                                                                                            const na_1864 = temp_1861[2];
                                                                                            {
                                                                                                {
                                                                                                    if (n_1854 == na_1864) { tag_1855 = i_1857 };
                                                                                                    i_1857++;
                                                                                                };
                                                                                            };
                                                                                        }
                                                                                    } break;

                                                                                    default:
                                                                                    {
                                                                                        {
                                                                                            throw 'fi:' + fi;
                                                                                        };
                                                                                    }
                                                                                    };
                                                                                };
                                                                            };
                                                                        }
                                                                    } break;

                                                                    default:
                                                                    {
                                                                        {
                                                                            throw ('`' + (source_1856) + '` is not enumerable');
                                                                        };
                                                                    }
                                                                    };
                                                                };
                                                                if (tag_1855 == -1) { throw ('Field `' + (n_1854) + '` doesn\'t exists on `' + (source_1856) + '`') };
                                                                return tag_1855;
                                                            };
                                                            let e_1865 = getETN(cond_1851).e;
                                                            let n_1866 = getETN(cond_1851).n;
                                                            let tag_1867 = tagOf(e_1865, n_1866);
                                                            if (usedTags_1841.indexOf(tag_1867) != -1) { throw ('This enum case already matched ' + cond_1851 + ' ' + Project.data.get(cond_1851)) };
                                                            usedTags_1841.push(tag_1867);
                                                            r_1638 += 'case ' + tag_1867 + ': {';
                                                            {
                                                                const temp_1868 = cond_1851;
                                                                switch (temp_1868 && temp_1868[1]) {
                                                                case 11: {
                                                                    {
                                                                        const a_1869 = temp_1868[3];
                                                                        {
                                                                            r_1638 += ('\n' + (GenJs1.tabs) + '');
                                                                            let i_1870 = 2;
                                                                            for (const a of a_1869) {
                                                                                {
                                                                                    const temp_1871 = a;
                                                                                    switch (temp_1871 && temp_1871[1]) {
                                                                                    case 1: {
                                                                                        {
                                                                                            const s_1872 = temp_1871[2];
                                                                                            {
                                                                                                r_1638 += ('const ' + (GenJs1.rename(s_1872)) + ' = $switch$[' + (i_1870) + '];\n' + (GenJs1.tabs) + '');
                                                                                            };
                                                                                        }
                                                                                    } break;

                                                                                    case 40: {
                                                                                        {
                                                                                            {
                                                                                                {
                                                                                                };
                                                                                            };
                                                                                        }
                                                                                    } break;

                                                                                    default:
                                                                                    {
                                                                                        {
                                                                                            {
                                                                                                throw 'Cannot bind ' + a + JSON.stringify(Project.data.get(cond_1851));
                                                                                            };
                                                                                        };
                                                                                    }
                                                                                    };
                                                                                };
                                                                                i_1870++;
                                                                            };
                                                                        };
                                                                    }
                                                                } break;

                                                                default:
                                                                {
                                                                    {
                                                                        {
                                                                        };
                                                                    };
                                                                }
                                                                };
                                                            };
                                                            r_1638 += wrapIntoReturn(c_1843) + (' break; }\n' + (GenJs1.tabs) + '');
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                            i++;
                                        };
                                    };
                                };
                            };
                            if (defaultCase != null) {
                                r_1638 += ('default:\n' + (GenJs1.tabs) + '');
                                r_1638 += '\t' + wrapIntoReturn(defaultCase);
                            };
                            {
                                r_1638 += ('\n' + (GenJs1.tabs) + '}');
                            };
                            if (nullCase != null) { r_1638 += ('\n' + (GenJs1.tabs) + '} ') };
                            return r_1638 + '}';
                        };
                    }
                } break;

                case 24: {
                    {
                        const t_1873 = temp_1641[2];
                        const ext_1874 = temp_1641[3];
                        const impl_1875 = temp_1641[4];
                        const fields_1876 = temp_1641[5];
                        const external_1877 = temp_1641[6];
                        {
                            if (external_1877 == false) { return GenJs1.stringifyClass(node_1637, null) };
                            let cname_1878 = GenJs1.extractTypeName(t_1873);
                            let arename_1879 = GenJs1.getAtt(Project.mapAttributes.get(node_1637), 'native');
                            if (arename_1879 != null) { cname_1878 = arename_1879.asStringAttValue(0) };
                            let require_1880 = GenJs1.getAtt(Project.mapAttributes.get(node_1637), 'require');
                            if (require_1880 != null) {
                                const temp_1881 = require_1880.values[0];
                                switch (temp_1881 && temp_1881[1]) {
                                case 0: {
                                    {
                                        const s_1882 = temp_1881[2];
                                        {
                                            r_1638 += ('const ' + (cname_1878) + ' = require(\"') + s_1882 + '");\n';
                                            r_1638 += GenJs1.tabs;
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        throw '@require takes string as argument';
                                    };
                                }
                                };
                            };
                            return r_1638 += ('/* !%# declare class ' + (cname_1878) + ' */');
                        };
                    }
                } break;

                case 32: {
                    {
                        const path_1883 = temp_1641[2];
                        const el_1884 = temp_1641[3];
                        {
                            throw 'unreachable';
                            r_1638 = 'module ' + path_1883.join('.') + ' {\n';
                            GenJs1.pushTab();
                            for (const e of el_1884) {
                                GenJs1.parentNames.set(e, DataHelper.nameOf(e));
                                {
                                    const temp_1885 = e;
                                    switch (temp_1885 && temp_1885[1]) {
                                    case 36: {
                                        {
                                            const name_1886 = temp_1885[2];
                                            const t_1887 = temp_1885[3];
                                            {
                                                {
                                                    const temp_1888 = t_1887;
                                                    switch (temp_1888 && temp_1888[1]) {
                                                    case 8: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            GenJs1.parentNames.set(t_1887, DataHelper.nameOf(t_1887));
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            {
                                            };
                                        };
                                    }
                                    };
                                };
                                r_1638 += GenJs1.tabs + GenJs1.stringify(e) + ';\n';
                            };
                            GenJs1.popTab();
                            return r_1638 + GenJs1.tabs + '}';
                        };
                    }
                } break;

                case 33: {
                    {
                        const names_1889 = temp_1641[2];
                        const el_1890 = temp_1641[3];
                        {
                            return '{' + (() => {
                                const result_1891 = [];
                                const value_1892 = el_1890.length;
                                let i = -1;
                                while ((i + 1) < value_1892) {
                                    i++;
                                    result_1891.push((GenJs1.rename(names_1889[i]) + ':' + GenJs1.unwrapBlockValue(el_1890[i])));
                                };
                                return result_1891;
                            })().join(', ') + '}';
                        };
                    }
                } break;

                case 41: {
                    {
                        const field_1893 = temp_1641[2];
                        {
                            return 'static ' + GenJs1.stringify(field_1893);
                        };
                    }
                } break;

                case 34: {
                    {
                        const t_1894 = temp_1641[2];
                        const fields_1895 = temp_1641[3];
                        {
                            r_1638 = '';
                            r_1638 += '{\n';
                            GenJs1.pushTab();
                            let index_1896 = 0;
                            for (const f of fields_1895) {
                                {
                                    const temp_1897 = f;
                                    switch (temp_1897 && temp_1897[1]) {
                                    case 8: {
                                        {
                                            const iii = temp_1897[2];
                                            const op_1898 = temp_1897[3];
                                            const val_1899 = temp_1897[4];
                                            {
                                                if (op_1898 != 91) { throw 'Not Token.OpAssign ' + f };
                                                {
                                                    const temp_1900 = iii;
                                                    switch (temp_1900 && temp_1900[1]) {
                                                    case 1: {
                                                        {
                                                            const name_1901 = temp_1900[2];
                                                            {
                                                                r_1638 += GenJs1.tabs + GenJs1.rename(name_1901) + ':' + GenJs1.stringify(val_1899) + ',\n';
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            throw '!!iii ' + iii;
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 1: {
                                        {
                                            const name_1902 = temp_1897[2];
                                            {
                                                index_1896++;
                                                r_1638 += GenJs1.tabs + GenJs1.rename(name_1902) + (':[\"' + (GenJs1.rename(name_1902)) + '\",' + (index_1896 - 1) + '],\n');
                                            };
                                        }
                                    } break;

                                    case 11: {
                                        {
                                            const iii_1903 = temp_1897[2];
                                            const args_1904 = temp_1897[3];
                                            const argNames_1905 = temp_1897[4];
                                            {
                                                {
                                                    const temp_1906 = iii_1903;
                                                    switch (temp_1906 && temp_1906[1]) {
                                                    case 1: {
                                                        {
                                                            const name_1907 = temp_1906[2];
                                                            {
                                                                let a_1908 = (() => {
                                                                    const result_1909 = [];
                                                                    const value_1910 = argNames_1905;
                                                                    for (const arg of value_1910) result_1909.push(GenJs1.rename(arg));
                                                                    return result_1909;
                                                                })().join(',');
                                                                let s_1911 = GenJs1.tabs + GenJs1.rename(name_1907);
                                                                s_1911 += ':(' + a_1908 + ')=>{ const $r = ["' + GenJs1.rename(name_1907) + ('\",' + (index_1896) + ',');
                                                                s_1911 += a_1908;
                                                                s_1911 += ']; return $r },\n';
                                                                index_1896++;
                                                                r_1638 += s_1911;
                                                                Project.mapNames.set(f, node_1637);
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            throw '!!iii ' + iii_1903;
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 20: {
                                        {
                                            const name_1912 = temp_1897[2];
                                            const expr_1913 = temp_1897[3];
                                            const vars_1914 = temp_1897[4];
                                            const rettype_1915 = temp_1897[5];
                                            {
                                                {
                                                    r_1638 += GenJs1.tabs + GenJs1.rename(name_1912) + ':';
                                                    r_1638 += '()=>{}';
                                                    r_1638 += ',\n';
                                                };
                                            };
                                        }
                                    } break;

                                    case 41: {
                                        {
                                            const fun = temp_1897[2];
                                            {
                                                {
                                                    const temp_1916 = fun;
                                                    switch (temp_1916 && temp_1916[1]) {
                                                    case 20: {
                                                        {
                                                            const name_1917 = temp_1916[2];
                                                            const expr_1918 = temp_1916[3];
                                                            const vars_1919 = temp_1916[4];
                                                            const rettype_1920 = temp_1916[5];
                                                            {
                                                                r_1638 += GenJs1.tabs + GenJs1.rename(name_1917) + ':';
                                                                {
                                                                    GenJs1.pushScope();
                                                                    let code_1921 = '';
                                                                    const unvar = (v_1922) => {
                                                                        const temp_1923 = v_1922;
                                                                        switch (temp_1923 && temp_1923[1]) {
                                                                        case 22: {
                                                                            {
                                                                                const oname_1924 = temp_1923[2];
                                                                                {
                                                                                    let name_1925 = GenJs1.rename(oname_1924);
                                                                                    if (GenJs1.hasInScope(name_1925)) { name_1925 += '$' + (++GenJs1.id) };
                                                                                    GenJs1.addToScope(name_1925);
                                                                                    GenJs1.parentNames.set(v_1922, name_1925);
                                                                                    return GenJs1.parentNames.get(v_1922);
                                                                                };
                                                                            }
                                                                        } break;

                                                                        default:
                                                                        {
                                                                            {
                                                                                throw 'v:' + v_1922;
                                                                            };
                                                                        }
                                                                        };
                                                                    };
                                                                    code_1921 += '(' + (() => {
                                                                        const result_1926 = [];
                                                                        const value_1927 = vars_1919;
                                                                        for (const v of value_1927) result_1926.push(unvar(v));
                                                                        return result_1926;
                                                                    })().join(', ') + ') => ';
                                                                    if (expr_1918 != null) { {
                                                                        const temp_1928 = expr_1918;
                                                                        switch (temp_1928 && temp_1928[1]) {
                                                                        case 10: {
                                                                            {
                                                                                const el_1929 = temp_1928[2];
                                                                                {
                                                                                    GenJs1.pushTab();
                                                                                    code_1921 += GenJs1.stringifyBlockExpression(expr_1918);
                                                                                    GenJs1.popTab();
                                                                                };
                                                                            }
                                                                        } break;

                                                                        default:
                                                                        {
                                                                            {
                                                                                GenJs1.pushTab();
                                                                                code_1921 += ('{\n' + (GenJs1.tabs) + '') + GenJs1.stringifyBlockExpression(expr_1918);
                                                                                GenJs1.popTab();
                                                                                code_1921 += ('\n' + (GenJs1.tabs) + '}\n');
                                                                            };
                                                                        }
                                                                        };
                                                                    } } else code_1921 += '{}';
                                                                    r_1638 += code_1921;
                                                                    GenJs1.popScope();
                                                                };
                                                                r_1638 += ',\n';
                                                            };
                                                        }
                                                    } break;
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            throw '!' + f;
                                        };
                                    }
                                    };
                                };
                            };
                            GenJs1.popTab();
                            return r_1638 + GenJs1.tabs + '}';
                        };
                    }
                } break;

                case 40: {
                    {
                        {
                            return '_';
                        };
                    }
                } break;

                case 36: {
                    {
                        const name_1930 = temp_1641[2];
                        const vnode = temp_1641[3];
                        {
                            r_1638 += ('/*declare ' + (name_1930) + '*/');
                            GenJs1.parentNames.set(node_1637, name_1930);
                            Project.mapAttributes.set(vnode, Project.mapAttributes.get(node_1637));
                            {
                                const temp_1931 = vnode;
                                switch (temp_1931 && temp_1931[1]) {
                                case 8: {
                                    {
                                        {
                                            {
                                            };
                                        };
                                    }
                                } break;

                                case 24: {
                                    {
                                        const t_1932 = temp_1931[2];
                                        const ext_1933 = temp_1931[3];
                                        const impl_1934 = temp_1931[4];
                                        const fields_1935 = temp_1931[5];
                                        const external_1936 = temp_1931[6];
                                        {
                                            let cname_1937 = GenJs1.extractTypeName(t_1932);
                                            let arename_1938 = GenJs1.getAtt(Project.mapAttributes.get(node_1637), 'native');
                                            if (arename_1938 != null) { cname_1937 = DataHelper.asStringAttValue(arename_1938, 0) };
                                            let require_1939 = GenJs1.getAtt(Project.mapAttributes.get(node_1637), 'require');
                                            if (require_1939 != null) {
                                                const temp_1940 = require_1939.values[0];
                                                switch (temp_1940 && temp_1940[1]) {
                                                case 0: {
                                                    {
                                                        const s_1941 = temp_1940[2];
                                                        {
                                                            r_1638 += ('const ' + (cname_1937) + ' = require(\"' + (s_1941) + '\");\n' + (GenJs1.tabs) + '');
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        throw '@require takes string as argument';
                                                    };
                                                }
                                                };
                                            };
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        GenJs1.parentNames.set(vnode, DataHelper.nameOf(vnode));
                                    };
                                }
                                };
                            };
                            return r_1638;
                        };
                    }
                } break;
                };
            };
            throw 'unreachable ' + node_1637 + ' ' + JSON.stringify(Project.data.get(node_1637));
        } };
    GenJs1.unwrapBlock = (e_1942) => { {
            {
                const temp_1943 = e_1942;
                switch (temp_1943 && temp_1943[1]) {
                case 10: {
                    {
                        const el_1944 = temp_1943[2];
                        {
                            if (el_1944.length == 1) { return el_1944[0] };
                            throw 'Unwrapped block has multiple expressions';
                        };
                    }
                } break;

                default:
                {
                    {
                        return e_1942;
                    };
                }
                };
            };
        } };
    GenJs1.unwrapParenthesis = (e_1945) => { {
            {
                const temp_1946 = e_1945;
                switch (temp_1946 && temp_1946[1]) {
                case 13: {
                    {
                        const e_1947 = temp_1946[2];
                        {
                            return GenJs1.unwrapParenthesis(e_1947);
                        };
                    }
                } break;

                default:
                {
                    {
                        return e_1945;
                    };
                }
                };
            };
        } };
    GenJs1.unwrapBlockValue = (e_1948) => { {
            {
                const temp_1949 = e_1948;
                switch (temp_1949 && temp_1949[1]) {
                case 10: {
                    {
                        const el_1950 = temp_1949[2];
                        {
                            if (el_1950.length == 1) { return GenJs1.unwrapBlockValue(el_1950[0]) };
                            {
                                let r_1951 = '(() => {\n';
                                GenJs1.pushScope();
                                GenJs1.pushTab();
                                let i_1952 = 0;
                                while (i_1952 < el_1950.length - 1) {
                                    r_1951 += GenJs1.tabs + GenJs1.stringifyBlockExpression(el_1950[i_1952]) + ';\n';
                                    i_1952++;
                                };
                                {
                                    const temp_1953 = el_1950[el_1950.length - 1];
                                    switch (temp_1953 && temp_1953[1]) {
                                    case 15: {
                                        {
                                            {
                                                r_1951 += GenJs1.tabs + '' + GenJs1.stringifyBlockExpression(el_1950[el_1950.length - 1]) + ';\n';
                                            };
                                        }
                                    } break;

                                    case 22: {
                                        {
                                            {
                                                r_1951 += GenJs1.tabs + '' + GenJs1.stringifyBlockExpression(el_1950[el_1950.length - 1]) + ';\n';
                                            };
                                        }
                                    } break;

                                    case 17: {
                                        {
                                            {
                                                r_1951 += GenJs1.tabs + '' + GenJs1.stringifyBlockExpression(el_1950[el_1950.length - 1]) + ';\n';
                                            };
                                        }
                                    } break;

                                    case 14: {
                                        {
                                            {
                                                r_1951 += GenJs1.tabs + '' + GenJs1.stringifyBlockExpression(el_1950[el_1950.length - 1]) + ';\n';
                                            };
                                        }
                                    } break;

                                    case 44: {
                                        {
                                            {
                                                r_1951 += GenJs1.tabs + '' + GenJs1.stringifyBlockExpression(el_1950[el_1950.length - 1]) + ';\n';
                                            };
                                        }
                                    } break;

                                    case 16: {
                                        {
                                            {
                                                r_1951 += GenJs1.tabs + '' + GenJs1.stringifyBlockExpression(el_1950[el_1950.length - 1]) + ';\n';
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            r_1951 += GenJs1.tabs + 'return ' + GenJs1.unwrapBlockValue(el_1950[el_1950.length - 1]) + ';\n';
                                        };
                                    }
                                    };
                                };
                                GenJs1.popTab();
                                GenJs1.popScope();
                                return r_1951 + GenJs1.tabs + '})()';
                            };
                        };
                    }
                } break;

                case 15: {
                    {
                        const e_1954 = temp_1949[2];
                        {
                            GenJs1.unwrapBlockValue(e_1954);
                        };
                    }
                } break;

                default:
                {
                    {
                        return GenJs1.stringify(e_1948);
                    };
                }
                };
            };
        } };
    GenJs1.extractTypeName = (t_1955) => { {
            {
                const temp_1956 = t_1955;
                switch (temp_1956 && temp_1956[1]) {
                case 1: {
                    {
                        const name_1957 = temp_1956[2];
                        {
                            return name_1957;
                        };
                    }
                } break;

                case 2: {
                    {
                        const name_1958 = temp_1956[2];
                        {
                            return name_1958;
                        };
                    }
                } break;

                case null: {
                    {
                        {
                            return null;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw 'Type has no name: ' + t_1955;
                    };
                }
                };
            };
        } };
    GenJs1.generatePackageJson = (pack) => { {
            let jspackage = {name:pack.main, version:pack.main, description:pack.description, main:pack.main, author:pack.author, license:pack.license};
            return JSON.stringify(jspackage, null, '\t');
        } };
    var Typer = class {
    }
    Typer.fillScopes = (allCode) => { {
            let namespaces_1959 = new Map();
            const nameOfModuleItem = (node_1960) => { {
                const temp_1961 = node_1960;
                switch (temp_1961 && temp_1961[1]) {
                case 22: {
                    {
                        const name_1962 = temp_1961[2];
                        {
                            return name_1962;
                        };
                    }
                } break;

                case 42: {
                    {
                        const node_1963 = temp_1961[2];
                        {
                            {
                                const temp_1964 = node_1963;
                                switch (temp_1964 && temp_1964[1]) {
                                case 24: {
                                    {
                                        const t_1965 = temp_1964[2];
                                        {
                                            {
                                                const temp_1966 = t_1965;
                                                switch (temp_1966 && temp_1966[1]) {
                                                case 1: {
                                                    {
                                                        const name_1967 = temp_1966[2];
                                                        {
                                                            return name_1967;
                                                        };
                                                    }
                                                } break;

                                                case 2: {
                                                    {
                                                        const name_1968 = temp_1966[2];
                                                        {
                                                            return name_1968;
                                                        };
                                                    }
                                                } break;
                                                };
                                            };
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                case 24: {
                    {
                        const t_1969 = temp_1961[2];
                        {
                            {
                                const temp_1970 = t_1969;
                                switch (temp_1970 && temp_1970[1]) {
                                case 1: {
                                    {
                                        const name_1971 = temp_1970[2];
                                        {
                                            return name_1971;
                                        };
                                    }
                                } break;

                                case 2: {
                                    {
                                        const name_1972 = temp_1970[2];
                                        {
                                            return name_1972;
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                case 34: {
                    {
                        const t_1973 = temp_1961[2];
                        {
                            {
                                const temp_1974 = t_1973;
                                switch (temp_1974 && temp_1974[1]) {
                                case 1: {
                                    {
                                        const name_1975 = temp_1974[2];
                                        {
                                            return name_1975;
                                        };
                                    }
                                } break;

                                case 2: {
                                    {
                                        const name_1976 = temp_1974[2];
                                        {
                                            return name_1976;
                                        };
                                    }
                                } break;
                                };
                            };
                        };
                    }
                } break;

                case 36: {
                    {
                        const name_1977 = temp_1961[2];
                        {
                            return name_1977;
                        };
                    }
                } break;

                default:
                {
                    {
                        //throw '' + node_1960;
                    };
                }
                };
            } };
            const fillModuleNamespace = (m) => {
                let el_1978 = null;
                let root = null;
                {
                    const temp_1979 = m;
                    switch (temp_1979 && temp_1979[1]) {
                    case 32: {
                        {
                            const path_1980 = temp_1979[2];
                            const els_1981 = temp_1979[3];
                            {
                                el_1978 = els_1981;
                                root = path_1980.join('.');
                            };
                        }
                    } break;

                    default:
                    {
                        {
                            throw 'module?!2';
                        };
                    }
                    };
                };
                if (namespaces_1959[root] == null) { namespaces_1959[root] = m } else {
                    let els_1982 = null;
                    {
                        const temp_1983 = namespaces_1959[root];
                        switch (temp_1983 && temp_1983[1]) {
                        case 32: {
                            {
                                const el_1984 = temp_1983[3];
                                {
                                    els_1982 = el_1984;
                                };
                            }
                        } break;

                        default:
                        {
                            {
                                throw 'module?!3';
                            };
                        }
                        };
                    };
                    while (el_1978.length > 0) els_1982.push(el_1978.pop());
                };
                {
                    let els_1985 = null;
                    {
                        const temp_1986 = namespaces_1959[root];
                        switch (temp_1986 && temp_1986[1]) {
                        case 32: {
                            {
                                const el_1987 = temp_1986[3];
                                {
                                    els_1985 = el_1987;
                                };
                            }
                        } break;

                        default:
                        {
                            {
                                throw 'module?!4';
                            };
                        }
                        };
                    };
                    for (const e of els_1985) {
                        let name_1988 = nameOfModuleItem(e);
                        let found_1989 = false;
                        for (const e of els_1985) {
                            if (nameOfModuleItem(e) == name_1988) {
                                if (found_1989) { throw ('Type `' + (name_1988) + '` already exists in module') };
                                if (!found_1989) { found_1989 = true };
                            };
                        };
                    };
                };
            };
            {
                const temp_1990 = allCode;
                switch (temp_1990 && temp_1990[1]) {
                case 10: {
                    {
                        const files_1991 = temp_1990[2];
                        {
                            for (const file of files_1991) {
                                let didInit = false;
                                {
                                    const temp_1992 = file;
                                    switch (temp_1992 && temp_1992[1]) {
                                    case 10: {
                                        {
                                            const el_1993 = temp_1992[2];
                                            {
                                                for (const e of el_1993) {
                                                    const temp_1994 = e;
                                                    switch (temp_1994 && temp_1994[1]) {
                                                    case 32: {
                                                        {
                                                            {
                                                                if (didInit) { throw 'Expressions should follow after modules2 ' + e + '\n!! ' + file };
                                                                fillModuleNamespace(e);
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            didInit = true;
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 32: {
                                        {
                                            {
                                                if (didInit) { throw 'Expressions should follow after modules1' + file };
                                                fillModuleNamespace(file);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            didInit = true;
                                        };
                                    }
                                    };
                                };
                            };
                        };
                    }
                } break;

                default:
                {
                    {
                        throw 'Typer expects all files to be collected into a block';
                    };
                }
                };
            };
            let intermediate_1995 = [];
            {
                let intermediateSubs = [];
                for (const ns of namespaces_1959.keys()) {
                    let path_1996 = ns.split('.');
                    let namespace_1997 = path_1996.shift();
                    const check_1999 = (namespace_1998) => { if (namespaces_1959[namespace_1998] == null && intermediate_1995.indexOf(namespace_1998) == -1) { intermediate_1995.push(namespace_1998) } };
                    check_1999(namespace_1997);
                    while (path_1996.length > 0) {
                        namespace_1997 += '.' + path_1996.shift();
                        check_1999(namespace_1997);
                    };
                };
                for (const path of intermediate_1995) {
                    let m_2000 = Node.TModule(path.split('.'), []);
                    namespaces_1959[path] = m_2000;
                };
            };
            const findInNamespaceRoots = (name_2001) => {
                if (namespaces_1959[name_2001] != null) { return namespaces_1959[name_2001] };
                let m_2002 = namespaces_1959[''];
                let el_2003 = null;
                {
                    const temp_2004 = m_2002;
                    switch (temp_2004 && temp_2004[1]) {
                    case 32: {
                        {
                            const els_2005 = temp_2004[3];
                            {
                                el_2003 = els_2005;
                            };
                        }
                    } break;

                    default:
                    {
                        {
                            return null;
                        };
                    }
                    };
                };
                for (const e of el_2003) if (name_2001 == nameOfModuleItem(e)) { return e };
                return null;
            };
            let scopes = [new Map()];
            let currentClass = [];
            let prevnode = null;
            let isInExternalClass = false;
            const pushScope = () => { scopes.push(new Map()) };
            const popScope = () => { scopes.pop() };
            const addScope = (name_2006, node_2007) => { scopes[scopes.length - 1].set(name_2006, node_2007) };
            const fail_2009 = (msg, node_2008) => {
                let data_2010 = Project.data.get(node_2008);
                if (data_2010 == null) { data_2010 = Project.data.get(prevnode) };
                if (data_2010 == null) { return new CompilerError(Fail.TyperError, msg, 0, 0, '') };
                return new CompilerError(Fail.TyperError, msg, data_2010.line, data_2010.column, data_2010.fileName);
            };
            let prevnode_s = null;
            const findName = (name_2011) => {};
            const fill_2013 = (node_2012) => {
                prevnode = node_2012;
                {
                    const temp_2014 = node_2012;
                    switch (temp_2014 && temp_2014[1]) {
                    case 35: {
                        {
                            const path_2015 = temp_2014[2];
                            const bind_2016 = temp_2014[3];
                            const expr_2017 = temp_2014[4];
                            {
                                {
                                    for (const e of bind_2016) {
                                        const temp_2018 = e;
                                        switch (temp_2018 && temp_2018[1]) {
                                        case null: {
                                            {
                                                {
                                                    {
                                                    };
                                                };
                                            }
                                        } break;

                                        case 22: {
                                            {
                                                const name_2019 = temp_2018[2];
                                                {
                                                    addScope(name_2019, e);
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                throw 'TEnumExtract contains not a var: ' + e;
                                            };
                                        }
                                        };
                                    };
                                    if (DataHelper.isVoidValue(expr_2017)) { throw fail_2009('There should be a non-void value instead of ', expr_2017) };
                                    fill_2013(expr_2017);
                                };
                            };
                        }
                    } break;

                    case 23: {
                        {
                            const e_2020 = temp_2014[2];
                            {
                                for (const ee of e_2020) fill_2013(ee);
                            };
                        }
                    } break;

                    case 10: {
                        {
                            const el_2021 = temp_2014[2];
                            {
                                pushScope();
                                for (const e of el_2021) fill_2013(e);
                                popScope();
                            };
                        }
                    } break;

                    case 1: {
                        {
                            const name_2022 = temp_2014[2];
                            {
                                let subj = null;
                                {
                                    const value_2023 = scopes.length;
                                    let i = 0;
                                    while (i < value_2023) {
                                        {
                                            subj = scopes[scopes.length - i - 1].get(name_2022);
                                            if (subj != null) { break };
                                        };
                                        i++;
                                    };
                                };
                                if (subj == null) { subj = findInNamespaceRoots(name_2022) };
                                if (subj == null) { throw fail_2009(('Cannot find name `' + (name_2022) + '` for ' + (node_2012) + ''), node_2012) };
                                if (Project.mapNames.get(node_2012) != null && Project.mapNames.get(node_2012) != subj) { throw fail_2009(('mapNames overwitten from ' + (Project.mapNames.get(node_2012)) + ' to ' + (subj) + ' for node ' + (node_2012) + ''), node_2012) };
                                Project.mapNames.set(node_2012, subj);
                                {
                                    const temp_2024 = subj;
                                    switch (temp_2024 && temp_2024[1]) {
                                    case 22: {
                                        {
                                            {
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                        };
                                    }
                                    };
                                };
                            };
                        }
                    } break;

                    case 37: {
                        {
                            const names_2025 = temp_2014[2];
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 22: {
                        {
                            const name_2026 = temp_2014[2];
                            const t_2027 = temp_2014[3];
                            const e_2028 = temp_2014[4];
                            const const_2029 = temp_2014[5];
                            {
                                if (e_2028 == null && const_2029) {
                                    //throw fail_2009(('Constant should have a value `let ' + (name_2026) + ' = value`'), node_2012)
                                };
                                if (e_2028 != null) {
                                    {
                                        const temp_2030 = e_2028;
                                        switch (temp_2030 && temp_2030[1]) {
                                        case 24: {
                                            {
                                                {
                                                    throw fail_2009('Variable should not have class as a value', node_2012);
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                            };
                                        }
                                        };
                                    };
                                    if (DataHelper.isVoidValue(e_2028)) { throw fail_2009(('Cannot assign var to a void `var ' + (name_2026) + ' = void`'), node_2012) };
                                    fill_2013(e_2028);
                                };
                                const find = (t_2031) => { if (t_2031 == null) { return null } };
                                const unify = (current_2032, with_2033) => {
                                    if (current_2032 == null) { return with_2033 };
                                    if (with_2033 == null) { return current_2032 };
                                    return ((current_2032) || (with_2033));
                                };
                                Project.mapTypes.set(node_2012, unify(find(t_2027), Project.mapTypes.get(e_2028)));
                                addScope(name_2026, node_2012);
                            };
                        }
                    } break;

                    case 28: {
                        {
                            const el_2034 = temp_2014[2];
                            {
                                for (const e of el_2034) fill_2013(e);
                            };
                        }
                    } break;

                    case 29: {
                        {
                            const keys_2035 = temp_2014[2];
                            const values_2036 = temp_2014[3];
                            {
                                {
                                    const value_2037 = keys_2035.length;
                                    let i = 0;
                                    while (i < value_2037) {
                                        {
                                            fill_2013(keys_2035[i]);
                                            fill_2013(values_2036[i]);
                                        };
                                        i++;
                                    };
                                };
                            };
                        }
                    } break;

                    case 39: {
                        {
                            const e_2038 = temp_2014[2];
                            {
                                fill_2013(e_2038);
                            };
                        }
                    } break;

                    case 9: {
                        {
                            const a_2039 = temp_2014[2];
                            const b_2040 = temp_2014[4];
                            {
                                if (DataHelper.isVoidValue(b_2040)) { throw fail_2009('Cannot use void as value', node_2012) };
                                fill_2013(a_2039);
                                let parent_2041 = Project.mapNames.get(a_2039);
                                {
                                    const temp_2042 = parent_2041;
                                    switch (temp_2042 && temp_2042[1]) {
                                    case 22: {
                                        {
                                            const name_2043 = temp_2042[2];
                                            const const_2044 = temp_2042[5];
                                            {
                                                if (const_2044) { throw fail_2009(('Cannot reassign a constant `' + (name_2043) + '`'), node_2012) };
                                            };
                                        }
                                    } break;

                                    case 20: {
                                        {
                                            const name_2045 = temp_2042[2];
                                            {
                                                throw fail_2009(('Cannot reassign a function `' + (name_2045) + '`'), node_2012);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                        };
                                    }
                                    };
                                };
                                fill_2013(b_2040);
                            };
                        }
                    } break;

                    case 8: {
                        {
                            const a_2046 = temp_2014[2];
                            const op_2047 = temp_2014[3];
                            const b_2048 = temp_2014[4];
                            {
                                if (DataHelper.isVoidValue(a_2046)) { throw fail_2009('Cannot use void as value', node_2012) };
                                if (DataHelper.isVoidValue(b_2048)) { throw fail_2009('Cannot use void as value', node_2012) };
                                fill_2013(a_2046);
                                fill_2013(b_2048);
                                let parent_2049 = Project.mapNames.get(a_2046);
                                if (op_2047 == 91) {
                                    const temp_2050 = parent_2049;
                                    switch (temp_2050 && temp_2050[1]) {
                                    case 22: {
                                        {
                                            const name_2051 = temp_2050[2];
                                            const const_2052 = temp_2050[5];
                                            {
                                                if (const_2052) { throw fail_2009(('Cannot reassign a constant `' + (name_2051) + '`'), node_2012) };
                                            };
                                        }
                                    } break;

                                    case 20: {
                                        {
                                            const name_2053 = temp_2050[2];
                                            {
                                                throw fail_2009(('Cannot reassign a function `' + (name_2053) + '`'), node_2012);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                        };
                                    }
                                    };
                                };
                                {
                                    const temp_2054 = node_2012;
                                    switch (temp_2054) {
                                    default:
                                    {
                                        {
                                        };
                                    }
                                    };
                                };
                            };
                        }
                    } break;

                    case 16: {
                        {
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 11: {
                        {
                            const e_2055 = temp_2014[2];
                            const el_2056 = temp_2014[3];
                            const elnames = temp_2014[4];
                            {
                                fill_2013(e_2055);
                                for (const e of el_2056) {
                                    if (DataHelper.isVoidValue(e)) { throw fail_2009('Cannot use void as argument value', node_2012) };
                                    fill_2013(e);
                                };
                            };
                        }
                    } break;

                    case 24: {
                        {
                            const t_2057 = temp_2014[2];
                            const ex_2058 = temp_2014[3];
                            const i_2059 = temp_2014[4];
                            const f_2060 = temp_2014[5];
                            const external_2061 = temp_2014[6];
                            {
                                let iiec = isInExternalClass;
                                isInExternalClass = external_2061;
                                let name_2062 = Typer.extractTypeName(t_2057);
                                addScope(name_2062, node_2012);
                                currentClass.push(node_2012);
                                pushScope();
                                for (const field of f_2060) {
                                    let name_2063 = null;
                                    {
                                        const temp_2064 = field;
                                        switch (temp_2064 && temp_2064[1]) {
                                        case 22: {
                                            {
                                                const fname = temp_2064[2];
                                                {
                                                    name_2063 = fname;
                                                };
                                            }
                                        } break;

                                        case 20: {
                                            {
                                                const fname_2065 = temp_2064[2];
                                                {
                                                    if (fname_2065 == null) { name_2063 = 'new' } else name_2063 = fname_2065;
                                                };
                                            }
                                        } break;

                                        case 41: {
                                            {
                                                const f_2066 = temp_2064[2];
                                                {
                                                    {
                                                        const temp_2067 = f_2066;
                                                        switch (temp_2067 && temp_2067[1]) {
                                                        case 22: {
                                                            {
                                                                const fname_2068 = temp_2067[2];
                                                                {
                                                                    name_2063 = fname_2068;
                                                                };
                                                            }
                                                        } break;

                                                        case 20: {
                                                            {
                                                                const fname_2069 = temp_2067[2];
                                                                {
                                                                    name_2063 = fname_2069;
                                                                };
                                                            }
                                                        } break;
                                                        };
                                                    };
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                throw fail_2009(('Incorrect class field node: ' + (field) + ''), node_2012);
                                            };
                                        }
                                        };
                                    };
                                    let map_2070 = scopes[scopes.length - 1];
                                    if (map_2070.has(name_2063)) { throw fail_2009(('Class field `' + (name_2063) + '` already exists'), node_2012) };
                                    map_2070.set(name_2063, field);
                                    Project.mapNames.set(field, node_2012);
                                };
                                for (const field of f_2060) {
                                    {
                                        const temp_2071 = field;
                                        switch (temp_2071 && temp_2071[1]) {
                                        case 20: {
                                            {
                                                const e_2072 = temp_2071[3];
                                                const v_2073 = temp_2071[4];
                                                const r_2074 = temp_2071[5];
                                                {
                                                    if (e_2072 != null) { fill_2013(Node.TFunction(null, e_2072, v_2073, r_2074)) };
                                                };
                                            }
                                        } break;

                                        case 22: {
                                            {
                                                const e_2075 = temp_2071[4];
                                                {
                                                    if (e_2075 != null) { fill_2013(e_2075) };
                                                };
                                            }
                                        } break;

                                        case 41: {
                                            {
                                                const e_2076 = temp_2071[2];
                                                {
                                                    {
                                                        const temp_2077 = e_2076;
                                                        switch (temp_2077 && temp_2077[1]) {
                                                        case 20: {
                                                            {
                                                                const e_2078 = temp_2077[3];
                                                                const v_2079 = temp_2077[4];
                                                                const r_2080 = temp_2077[5];
                                                                {
                                                                    if (e_2078 != null) { fill_2013(Node.TFunction(null, e_2078, v_2079, r_2080)) };
                                                                };
                                                            }
                                                        } break;

                                                        case 22: {
                                                            {
                                                                const e_2081 = temp_2077[4];
                                                                {
                                                                    if (e_2081 != null) { fill_2013(e_2081) };
                                                                };
                                                            }
                                                        } break;
                                                        };
                                                    };
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                {
                                                };
                                            };
                                        }
                                        };
                                    };
                                };
                                popScope();
                                currentClass.pop();
                                isInExternalClass = iiec;
                            };
                        }
                    } break;

                    case 36: {
                        {
                            const name_2082 = temp_2014[2];
                            const vnode_2083 = temp_2014[3];
                            {
                                {
                                    const temp_2084 = vnode_2083;
                                    switch (temp_2084 && temp_2084[1]) {
                                    case 22: {
                                        {
                                            const vname = temp_2084[2];
                                            const t_2085 = temp_2084[3];
                                            const expr_2086 = temp_2084[4];
                                            const const_2087 = temp_2084[5];
                                            {
                                                if (const_2087 && expr_2086 == null) { addScope(name_2082, node_2012) };
                                            };
                                        }
                                    } break;

                                    case 20: {
                                        {
                                            const fname_2088 = temp_2084[2];
                                            const expr_2089 = temp_2084[3];
                                            const vars_2090 = temp_2084[4];
                                            const rettype_2091 = temp_2084[5];
                                            {
                                                addScope(name_2082, node_2012);
                                                addScope(name_2082, vnode_2083);
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            addScope(name_2082, node_2012);
                                            fill_2013(vnode_2083);
                                        };
                                    }
                                    };
                                };
                            };
                        }
                    } break;

                    case 26: {
                        {
                            const e_2092 = temp_2014[2];
                            const n_2093 = temp_2014[3];
                            {
                                fill_2013(e_2092);
                            };
                        }
                    } break;

                    case 45: {
                        {
                            const a_2094 = temp_2014[2];
                            const b_2095 = temp_2014[3];
                            {
                                fill_2013(a_2094);
                                fill_2013(b_2095);
                            };
                        }
                    } break;

                    case 34: {
                        {
                            const t_2096 = temp_2014[2];
                            const f_2097 = temp_2014[3];
                            {
                                let name_2098 = Typer.extractTypeName(t_2096);
                                addScope(name_2098, node_2012);
                                for (const field of f_2097) {
                                    {
                                        const temp_2099 = field;
                                        switch (temp_2099 && temp_2099[1]) {
                                        case 41: {
                                            {
                                                const e_2100 = temp_2099[2];
                                                {
                                                    {
                                                        const temp_2101 = e_2100;
                                                        switch (temp_2101 && temp_2101[1]) {
                                                        case 20: {
                                                            {
                                                                const e_2102 = temp_2101[3];
                                                                const v_2103 = temp_2101[4];
                                                                const r_2104 = temp_2101[5];
                                                                {
                                                                    if (e_2102 != null) { fill_2013(Node.TFunction(null, e_2102, v_2103, r_2104)) };
                                                                };
                                                            }
                                                        } break;
                                                        };
                                                    };
                                                };
                                            }
                                        } break;

                                        case 20: {
                                            {
                                                const e_2105 = temp_2099[3];
                                                const v_2106 = temp_2099[4];
                                                const r_2107 = temp_2099[5];
                                                {
                                                    if (e_2105 != null) { fill_2013(Node.TFunction(null, e_2105, v_2106, r_2107)) };
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                {
                                                };
                                            };
                                        }
                                        };
                                    };
                                };
                            };
                        }
                    } break;

                    case 44: {
                        {
                            const name_2108 = temp_2014[2];
                            const over_2109 = temp_2014[3];
                            const by_2110 = temp_2014[4];
                            {
                                if (DataHelper.isVoidValue(over_2109)) { throw fail_2009('Cannot use void as value', node_2012) };
                                pushScope();
                                fill_2013(over_2109);
                                addScope(name_2108, node_2012);
                                fill_2013(by_2110);
                                popScope();
                            };
                        }
                    } break;

                    case 20: {
                        {
                            const name_2111 = temp_2014[2];
                            const expr_2112 = temp_2014[3];
                            const vars_2113 = temp_2014[4];
                            const rettype_2114 = temp_2014[5];
                            {
                                if (expr_2112 == null && !isInExternalClass) { throw fail_2009('Non-external function should have a body', node_2012) };
                                if (name_2111 != null) { addScope(name_2111, node_2012) };
                                pushScope();
                                for (const v of vars_2113) {
                                    {
                                        const temp_2115 = v;
                                        switch (temp_2115 && temp_2115[1]) {
                                        case 22: {
                                            {
                                                const vname_2116 = temp_2115[2];
                                                {
                                                    addScope(vname_2116, v);
                                                };
                                            }
                                        } break;

                                        case 1: {
                                            {
                                                const vname_2117 = temp_2115[2];
                                                {
                                                    addScope(vname_2117, v);
                                                };
                                            }
                                        } break;

                                        case 13: {
                                            {
                                                const e_2118 = temp_2115[2];
                                                {
                                                    if (e_2118 != null) { throw fail_2009(v + '', node_2012) };
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                throw fail_2009(v + '', node_2012);
                                            };
                                        }
                                        };
                                    };
                                };
                                if (expr_2112 != null) { fill_2013(expr_2112) };
                                popScope();
                            };
                        }
                    } break;

                    case 21: {
                        {
                            const expr_2119 = temp_2014[2];
                            const vars_2120 = temp_2014[3];
                            const rettype_2121 = temp_2014[4];
                            {
                                if (expr_2119 == null && !isInExternalClass) { throw fail_2009('Arrow function should have a body', node_2012) };
                                pushScope();
                                for (const v of vars_2120) {
                                    {
                                        const temp_2122 = v;
                                        switch (temp_2122 && temp_2122[1]) {
                                        case 22: {
                                            {
                                                const vname_2123 = temp_2122[2];
                                                {
                                                    addScope(vname_2123, v);
                                                };
                                            }
                                        } break;

                                        case 1: {
                                            {
                                                const vname_2124 = temp_2122[2];
                                                {
                                                    addScope(vname_2124, v);
                                                };
                                            }
                                        } break;

                                        case 13: {
                                            {
                                                const e_2125 = temp_2122[2];
                                                {
                                                    if (e_2125 != null) { throw fail_2009(v + '', node_2012) };
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                throw fail_2009(v + '', node_2012);
                                            };
                                        }
                                        };
                                    };
                                };
                                if (expr_2119 != null) { fill_2013(expr_2119) };
                                popScope();
                            };
                        }
                    } break;

                    case 12: {
                        {
                            const econd_2126 = temp_2014[2];
                            const eif_2127 = temp_2014[3];
                            const eelse_2128 = temp_2014[4];
                            {
                                let depth_2129 = 0;
                                for (const e of econd_2126) {
                                    {
                                        const temp_2130 = e;
                                        switch (temp_2130 && temp_2130[1]) {
                                        case 22: {
                                            {
                                                const const_2131 = temp_2130[5];
                                                {
                                                    if (!const_2131) { throw fail_2009('Only if-let bindings supported', node_2012) };
                                                    depth_2129++;
                                                    pushScope();
                                                    fill_2013(e);
                                                };
                                            }
                                        } break;

                                        default:
                                        {
                                            {
                                                fill_2013(e);
                                            };
                                        }
                                        };
                                    };
                                };
                                fill_2013(eif_2127);
                                while (depth_2129 > 0) {
                                    depth_2129--;
                                    popScope();
                                };
                                if (eelse_2128 != null) { fill_2013(eelse_2128) };
                            };
                        }
                    } break;

                    case 30: {
                        {
                            const e_2132 = temp_2014[2];
                            const i_2133 = temp_2014[3];
                            {
                                fill_2013(e_2132);
                                fill_2013(i_2133);
                            };
                        }
                    } break;

                    case 32: {
                        {
                            {
                                throw fail_2009('Modules should be at a file\' upper scope', node_2012);
                            };
                        }
                    } break;

                    case 27: {
                        {
                            const path_2134 = temp_2014[2];
                            const el_2135 = temp_2014[4];
                            const names_2136 = temp_2014[5];
                            const values_2137 = temp_2014[6];
                            {
                                for (const e of el_2135) fill_2013(e);
                            };
                        }
                    } break;

                    case 33: {
                        {
                            const names_2138 = temp_2014[2];
                            const el_2139 = temp_2014[3];
                            {
                                for (const e of el_2139) fill_2013(e);
                            };
                        }
                    } break;

                    case 13: {
                        {
                            const e_2140 = temp_2014[2];
                            {
                                fill_2013(e_2140);
                            };
                        }
                    } break;

                    case 14: {
                        {
                            const e_2141 = temp_2014[2];
                            {
                                if (e_2141 != null && DataHelper.isVoidValue(e_2141)) { throw fail_2009('Cannot use void as a returning value', node_2012) };
                                if (e_2141 != null) { fill_2013(e_2141) };
                            };
                        }
                    } break;

                    case 41: {
                        {
                            const e_2142 = temp_2014[2];
                            {
                                fill_2013(e_2142);
                            };
                        }
                    } break;

                    case 4: {
                        {
                            {
                                Project.mapNames.set(node_2012, currentClass[currentClass.length - 1]);
                            };
                        }
                    } break;

                    case 3: {
                        {
                            {
                                Project.mapNames.set(node_2012, currentClass[currentClass.length - 1]);
                            };
                        }
                    } break;

                    case 31: {
                        {
                            const exprs_2143 = temp_2014[2];
                            const conds_2144 = temp_2014[3];
                            const guards_2145 = temp_2014[4];
                            const cases_2146 = temp_2014[5];
                            {
                                {
                                    for (const e of exprs_2143) {
                                        pushScope();
                                        fill_2013(e);
                                        popScope();
                                    };
                                    let i_2147 = 0;
                                    while (i_2147 < cases_2146.length) {
                                        pushScope();
                                        let e_2148 = conds_2144[i_2147];
                                        const follow = (e_2149) => { {
                                            const temp_2150 = e_2149;
                                            switch (temp_2150 && temp_2150[1]) {
                                            case 26: {
                                                {
                                                    const ex_2151 = temp_2150[2];
                                                    const name_2152 = temp_2150[3];
                                                    {
                                                        {
                                                            fill_2013(e_2149);
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 13: {
                                                {
                                                    const e_2153 = temp_2150[2];
                                                    {
                                                        {
                                                            fill_2013(e_2153);
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 40: {
                                                {
                                                    {
                                                        {
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 7: {
                                                {
                                                    {
                                                        {
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 2: {
                                                {
                                                    {
                                                        {
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 5: {
                                                {
                                                    {
                                                        {
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 0: {
                                                {
                                                    {
                                                        {
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 11: {
                                                {
                                                    const ex_2154 = temp_2150[2];
                                                    const args_2155 = temp_2150[3];
                                                    const argNames_2156 = temp_2150[4];
                                                    {
                                                        {
                                                            follow(ex_2154);
                                                            for (const ee of args_2155) follow(ee);
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 1: {
                                                {
                                                    const name_2157 = temp_2150[2];
                                                    {
                                                        {
                                                            if (name_2157.charAt(0) == name_2157.charAt(0).toUpperCase()) { fill_2013(e_2149) } else {
                                                                addScope(name_2157, e_2149);
                                                            };
                                                        };
                                                    };
                                                }
                                            } break;

                                            case 8: {
                                                {
                                                    const a_2158 = temp_2150[2];
                                                    const op_2159 = temp_2150[3];
                                                    const b_2160 = temp_2150[4];
                                                    {
                                                        if (op_2159 == 104) {
                                                            follow(a_2158);
                                                            follow(b_2160);
                                                        } else throw fail_2009('' + e_2149, e_2149);
                                                    };
                                                }
                                            } break;

                                            case 12: {
                                                {
                                                    const econd_2161 = temp_2150[2];
                                                    {
                                                        pushScope();
                                                        fill_2013(econd_2161[0]);
                                                        popScope();
                                                    };
                                                }
                                            } break;

                                            default:
                                            {
                                                {
                                                    throw fail_2009('' + e_2149, e_2149);
                                                };
                                            }
                                            };
                                        } };
                                        follow(e_2148);
                                        let e_2162 = cases_2146[i_2147];
                                        pushScope();
                                        fill_2013(e_2162);
                                        popScope();
                                        popScope();
                                        i_2147++;
                                    };
                                };
                            };
                        }
                    } break;

                    case 15: {
                        {
                            const e_2163 = temp_2014[2];
                            {
                                fill_2013(e_2163);
                            };
                        }
                    } break;

                    case 25: {
                        {
                            const e_2164 = temp_2014[2];
                            const t_2165 = temp_2014[3];
                            const v_2166 = temp_2014[4];
                            const ca = temp_2014[5];
                            {
                                fill_2013(e_2164);
                                {
                                    const value_2167 = ca.length;
                                    let e = 0;
                                    while (e < value_2167) {
                                        {
                                            pushScope();
                                            scopes[scopes.length - 1].set(DataHelper.varName(v_2166[e]), v_2166[e]);
                                            fill_2013(ca[e]);
                                            popScope();
                                        };
                                        e++;
                                    };
                                };
                            };
                        }
                    } break;

                    case 18: {
                        {
                            const e_2168 = temp_2014[4];
                            {
                                fill_2013(e_2168);
                            };
                        }
                    } break;

                    case 19: {
                        {
                            const econd_2169 = temp_2014[2];
                            const e_2170 = temp_2014[3];
                            {
                                fill_2013(econd_2169);
                                fill_2013(e_2170);
                            };
                        }
                    } break;

                    case 38: {
                        {
                            const el_2171 = temp_2014[2];
                            const el2 = temp_2014[3];
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 46: {
                        {
                            const t_2172 = temp_2014[2];
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 40: {
                        {
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 7: {
                        {
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 17: {
                        {
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 0: {
                        {
                            {
                                Project.mapTypes.set(node_2012, 'String');
                            };
                        }
                    } break;

                    case 2: {
                        {
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 5: {
                        {
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 6: {
                        {
                            {
                                {
                                };
                            };
                        }
                    } break;

                    case 43: {
                        {
                            const f_2173 = temp_2014[2];
                            {
                                fill_2013(f_2173);
                            };
                        }
                    } break;

                    case 42: {
                        {
                            const f_2174 = temp_2014[2];
                            {
                                fill_2013(f_2174);
                            };
                        }
                    } break;
                    };
                };
            };
            const fillFile = (file) => { fill_2013(file) };
            const fillModule = (mod) => { {
                const temp_2175 = mod;
                switch (temp_2175 && temp_2175[1]) {
                case 32: {
                    {
                        const path_2176 = temp_2175[2];
                        const el_2177 = temp_2175[3];
                        {
                            for (const e of el_2177) fill_2013(e);
                        };
                    }
                } break;

                default:
                {
                    {
                        console.log(('-------> fillModule ' + (mod) + ''));
                    };
                }
                };
            } };
            {
                const temp_2178 = allCode;
                switch (temp_2178 && temp_2178[1]) {
                case 10: {
                    {
                        const files_2179 = temp_2178[2];
                        {
                            pushScope();
                            for (const file of files_2179) {
                                const temp_2180 = file;
                                switch (temp_2180 && temp_2180[1]) {
                                case 10: {
                                    {
                                        const el_2181 = temp_2180[2];
                                        {
                                            for (const e of el_2181) {
                                                const temp_2182 = e;
                                                switch (temp_2182 && temp_2182[1]) {
                                                case 32: {
                                                    {
                                                        {
                                                            fillModule(e);
                                                        };
                                                    }
                                                } break;

                                                default:
                                                {
                                                    {
                                                        {
                                                        };
                                                    };
                                                }
                                                };
                                            };
                                        };
                                    }
                                } break;

                                case 32: {
                                    {
                                        {
                                            fillModule(file);
                                        };
                                    }
                                } break;

                                default:
                                {
                                    {
                                        {
                                        };
                                    };
                                }
                                };
                            };
                            popScope();
                            for (const file of files_2179) {
                                pushScope();
                                {
                                    const temp_2183 = file;
                                    switch (temp_2183 && temp_2183[1]) {
                                    case 10: {
                                        {
                                            const el_2184 = temp_2183[2];
                                            {
                                                for (const e of el_2184) {
                                                    const temp_2185 = e;
                                                    switch (temp_2185 && temp_2185[1]) {
                                                    case 32: {
                                                        {
                                                            {
                                                                {
                                                                };
                                                            };
                                                        }
                                                    } break;

                                                    default:
                                                    {
                                                        {
                                                            fill_2013(e);
                                                        };
                                                    }
                                                    };
                                                };
                                            };
                                        }
                                    } break;

                                    case 32: {
                                        {
                                            {
                                                {
                                                };
                                            };
                                        }
                                    } break;

                                    default:
                                    {
                                        {
                                            fill_2013(file);
                                        };
                                    }
                                    };
                                };
                                popScope();
                            };
                        };
                    }
                } break;

                default:
                {
                    {
                        throw 'Typer expects all files to be collected into a block';
                    };
                }
                };
            };
        } };
    Typer.extractTypeName = (t_2186) => { {
            {
                const temp_2187 = t_2186;
                switch (temp_2187 && temp_2187[1]) {
                case 1: {
                    {
                        const name_2188 = temp_2187[2];
                        {
                            return name_2188;
                        };
                    }
                } break;

                case 2: {
                    {
                        const name_2189 = temp_2187[2];
                        {
                            return name_2189;
                        };
                    }
                } break;

                default:
                {
                    {
                        throw 'Type has no name: ' + t_2186;
                    };
                }
                };
            };
        } };
    var Main = class {
        init() { {
            let currentDirTmp = Process.argv[1].split(Path.sep);
            let packageFileName = currentDirTmp.splice(0, -1).join(Path.sep) + Path.sep + 'hexa.json';
            let currentDir = currentDirTmp[currentDirTmp.length - 2];
            let name_2190 = Main.question(('Enter package name (' + (currentDir) + '): '));
            if (name_2190 == '') { name_2190 = currentDir };
            let version = Main.question('Enter package version (1.0.0): ');
            if (version == '') { version = '1.0.0' };
            let description = Main.question('Enter package description: ');
            let main = Main.question('Enter main file (main.hexa): ');
            if (main == '') { main = 'main.hexa' };
            let target = {generator:'JavaScript', instance:{generatePackageJson:false}};
            let generatorstr = Main.question('Enter generator type (JavaScript):\n1. JavaScript\n2. C\n3. Haxe');
            if (generatorstr.toUpperCase() == 'C' || generatorstr == '2') { target.generator = 'C' } else if (generatorstr.toUpperCase() == 'HAXE' || generatorstr == '3') { target.generator = 'Haxe' };
            while (!(main.endsWith('.hexa'))) {
                Process.stdout.write('Wrong file name. Must ends with \'.hexa\'.\n');
                main = Main.question('Enter main file (main.hexa): ');
            };
            let author = Main.question('Enter package author name: ');
            let license = Main.question('Enter license: ');
            let pack_2191 = {name:name_2190, version:version, description:description, output:name_2190, main:main, author:author, license:license, target:target, files:[]};
            let packageStr = JSON.stringify(pack_2191, null, '\t');
            let answ = Main.question(('About to write to: ' + (packageFileName) + ':\n' + (packageStr) + '\nIs this ok? (yes)'));
            if (answ != '') { Process.exit(1) };
            Fs.writeFileSync('hexa.json', packageStr);
            Process.stdout.write('Hexa package initialized!\n');
        } };
        processFile(target_2192) { {
            let content = Fs.readFileSync(target_2192);
            let tokens_2193 = Lexer.tokenize(content, target_2192);
            let parser_2194 = Parser.toNode(Parser.parseNodes(tokens_2193));
            return parser_2194;
        } };
        repl() { {
            const js = this.processFile('library/js/js.hexa');
            const nodejs = this.processFile('library/nodejs/nodejs.hexa');
            const lines_2195 = [];
            let lines_2196 = [];
            while (true) {
                let line_2197 = Main.question('> ');
                if (line_2197.length == 0) { continue };
                lines_2196.push(line_2197);
                lines_2196 = [line_2197];
                try {
                    {
                        let code_2198 = '"use strict"\r\n';
                        try {
                            {
                                const content_2199 = lines_2196.join('\n');
                                const tokens_2200 = Lexer.tokenize(Buffer.from(content_2199), 'REPL');
                                const parser_2201 = Parser.toNode(Parser.parseNodes(tokens_2200));
                                let collected_2202 = Node.TBlock([js, nodejs, parser_2201]);
                                if (parser_2201 == null) { continue };
                                Typer.fillScopes(collected_2202);
                                code_2198 += GenJs.stringifyProject(Normalizer.normalize(collected_2202, GenJs.reserved));
                                console.log(code_2198);
                            }
                        } catch (e) {
                            {
                                lines_2196.pop();
                                console.error('\x1b[31mCompilation Error: ' + e, '\x1b[0m');
                                continue;
                            }
                        };
                        const result_2203 = eval(code_2198);
                        if (result_2203 == null) { console.log('\x1b[90m' + result_2203, '\x1b[0m') } else if (result_2203 == true) { console.log('\x1b[33m' + result_2203, '\x1b[0m') } else if (result_2203 == false) { console.log('\x1b[33m' + result_2203, '\x1b[0m') } else console.log(result_2203);
                    }
                } catch (e) {
                    {
                        console.error('Error: ' + e);
                    }
                };
            };
        } };
        processFiles(targets) { {
            let res_2204 = [];
            for (const target of targets) {
                try {
                    {
                        res_2204.push(this.processFile(target));
                    }
                } catch (e) {
                    {
                        console.log(e.toString());
                    }
                };
            };
            if (targets.length != res_2204.length) { throw 'Stopped on errors' };
            return res_2204;
        } };
        loadPackage(filename_2205) { {
            let pack_2206 = JSON.parse(Fs.readFileSync(Path.resolve(filename_2205)).toString('utf8'));
            const incorrect_2207 = (what) => {
                Process.stdout.write(('Incorrect package file! Field `' + (what) + '` does not exists\n'));
                Process.exit(1);
            };
            if (pack_2206.target == null) { incorrect_2207('target') };
            if (pack_2206.output == null) { incorrect_2207('output') };
            if (pack_2206.name == null) { incorrect_2207('name') };
            Project.defines = ((pack_2206.define) || ({}));
            if (pack_2206.files == null) { pack_2206.files = [] };
            pack_2206.files.unshift(Path.resolve('library/js/js.hexa'));
            pack_2206.files.unshift(Path.resolve('library/nodejs/nodejs.hexa'));
            {
                const temp_2208 = pack_2206.target.generator;
                switch (temp_2208) {
                case 'JavaScript': {
                    {
                        {
                            Project.defines.js = ((Project.defines.js) || (true));
                        };
                    }
                } break;

                case 'C': {
                    {
                        {
                            Project.defines.c = ((Project.defines.c) || (true));
                            Project.defines.native = ((Project.defines.native) || (true));
                        };
                    }
                } break;

                case 'Haxe': {
                    {
                        {
                            Project.defines.haxe = ((Project.defines.haxe) || (true));
                        };
                    }
                } break;
                };
            };
            return pack_2206;
        } };
        constructor() {
        {
            const begin = Date.now();
            Lexer.init();
            TestLexer.test();
            TestParser.test();
            TestTyper.test();
            if (Process.argv[2] == '--version') {
                console.log('Hexa Alpha on node.js ' + Process.versions.node);
                Process.exit(0);
            } else if (Process.argv[2] == '--help') {
                console.log('Usage: `node hexa.js project.json` or `node hexa.js init`');
                Process.exit(1);
            } else if (Process.argv[2] == null) {
                this.repl();
                Process.exit(0);
            } else if (Process.argv[2] == 'init') {
                this.init();
                Process.exit(0);
            };
            let currentFile = Path.resolve(Process.argv[2]);
            let currentParsedFile = Path.parse(currentFile);
            let input_2209 = null;
            let main_2210 = null;
            let packageFolder = currentParsedFile.dir;
            if (currentParsedFile.ext == '.json') {
                input_2209 = this.loadPackage(currentFile);
                console.log(('[Building ' + (input_2209.name) + ']'));
                if (input_2209.main) { main_2210 = Path.resolve(currentFile + '/../') + Path.sep + (input_2209.main) };
            } else if (Fs.lstatSync(currentFile).isDirectory()) {
                input_2209 = this.loadPackage(currentFile + Path.sep + 'hexa.json');
                packageFolder = currentFile;
                if (input_2209.main) { main_2210 = packageFolder + Path.sep + (input_2209.main) };
            } else if (currentParsedFile.ext == '.hexa') {
                Project.defines.js = ((Project.defines.js) || (true));
                const code_2211 = '"use strict"\r\n' + GenJs.stringifyProject(Normalizer.normalize(Node.TBlock([this.processFile(currentFile)]), GenJs.reserved));
                console.log(code_2211);
                eval(code_2211);
                return;
            };
            let codes = [];
            if (input_2209.files != null) {
                let files_2212 = input_2209.files.map((file_2213) => {
                    if (file_2213.startsWith('/') || file_2213.charAt(1) == ':') { return Path.resolve(file_2213) };
                    return Path.resolve(packageFolder + Path.sep + file_2213);
                });
                codes = this.processFiles(files_2212);
            };
            if (main_2210) { codes.push(this.processFile(main_2210)) };
            let collected_2214 = Node.TBlock(codes);
            Typer.fillScopes(collected_2214);
            {
                const temp_2215 = input_2209.target.generator;
                switch (temp_2215) {
                case 'JavaScript': {
                    {
                        {
                            let target_2216 = packageFolder + Path.sep + Path.parse(input_2209.output).name + '.js';
                            const license_2217 = input_2209.license != (null)? (('// LICENSE ' + (input_2209.license) + '\r\n')) : '';
                            const normal = Normalizer.normalize(collected_2214, GenJs.reserved);
                            const outs = GenJs.stringifyProject(normal);
                            Fs.writeFileSync(target_2216, license_2217 + outs);
                        };
                    }
                } break;

                case 'C': {
                    {
                        {
                            console.error('C target is not yet supported');
                            let target_2218 = packageFolder + Path.sep + Path.parse(input_2209.output).name + '.c';
                            const license_2219 = input_2209.license != (null)? (('// LICENSE ' + (input_2209.license) + '\r\n')) : '';
                            const normal_2220 = Normalizer.normalize(collected_2214, GenC.reserved);
                            const outs_2221 = GenC.stringifyProject(normal_2220);
                            Fs.writeFileSync(target_2218, license_2219 + outs_2221);
                        };
                    }
                } break;

                case 'Haxe': {
                    {
                        {
                            console.error('Haxe target is not yet supported');
                            let target_2222 = packageFolder + Path.sep + Path.parse(input_2209.output).name + '.hx';
                            const license_2223 = input_2209.license != (null)? (('// LICENSE ' + (input_2209.license) + '\r\n')) : '';
                            const normal_2224 = Normalizer.normalize(collected_2214, GenHaxe.reserved, true);
                            const outs_2225 = GenHaxe.stringifyProject(normal_2224);
                            Fs.writeFileSync(target_2222, license_2223 + outs_2225);
                        };
                    }
                } break;

                default:
                {
                    {
                        throw 'Generator is not defined or unknown. Is there `target.generator` field in `hexa.json`?';
                    };
                }
                };
            };
            console.log(('[Finished in ' + (Date.now() - begin) + ' ms]'));
        } };
    }
    Main.question = (query) => { {
            Process.stdout.write(query);
            let bufsize = 256;
            let buf = new Buffer(bufsize);
            let bytesRead = 0;
            try {
                {
                    bytesRead = Fs.readSync(Process.stdin.fd, buf, 0, bufsize);
                }
            } catch (e) {
                {
                    {
                        if (e.code == 'EAGAIN') { return 'ERROR: interactive stdin input not supported.' };
                        if (e.code == 'EOF') { return '' };
                        throw e;
                    };
                }
            };
            if (bytesRead == 0) { return '' };
            const answer = buf.toString('utf8', 0, bytesRead).trim();
            return answer;
        } };
    {
        {
            new Main();
        }
    }
}
