// Generated from /home/daniel/Desktop/bakalarka/hoaeditor/src/parser/hoa.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var hoaListener = require('./hoaListener').hoaListener;
var grammarFileName = "hoa.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003#\u00fc\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0007\u0003@\n\u0003\f\u0003",
    "\u000e\u0003C\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005S",
    "\n\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b_\n\b\u0003\t\u0003",
    "\t\u0003\t\u0007\td\n\t\f\t\u000e\tg\u000b\t\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003",
    "\f\u0003\f\u0003\r\u0003\r\u0007\rv\n\r\f\r\u000e\ry\u000b\r\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0005\u000f\u0080\n",
    "\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0013\u0007\u0013\u008c",
    "\n\u0013\f\u0013\u000e\u0013\u008f\u000b\u0013\u0003\u0014\u0003\u0014",
    "\u0007\u0014\u0093\n\u0014\f\u0014\u000e\u0014\u0096\u000b\u0014\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015\u00a2\n\u0015",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0007\u0015\u00aa\n\u0015\f\u0015\u000e\u0015\u00ad\u000b\u0015\u0003",
    "\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00b3\n\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016",
    "\u00ba\n\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00c3\n\u0016\u0003\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0007\u0016",
    "\u00cb\n\u0016\f\u0016\u000e\u0016\u00ce\u000b\u0016\u0003\u0017\u0007",
    "\u0017\u00d1\n\u0017\f\u0017\u000e\u0017\u00d4\u000b\u0017\u0003\u0018",
    "\u0003\u0018\u0007\u0018\u00d8\n\u0018\f\u0018\u000e\u0018\u00db\u000b",
    "\u0018\u0003\u0019\u0003\u0019\u0005\u0019\u00df\n\u0019\u0003\u0019",
    "\u0003\u0019\u0005\u0019\u00e3\n\u0019\u0003\u0019\u0005\u0019\u00e6",
    "\n\u0019\u0003\u001a\u0003\u001a\u0007\u001a\u00ea\n\u001a\f\u001a\u000e",
    "\u001a\u00ed\u000b\u001a\u0003\u001a\u0003\u001a\u0003\u001b\u0005\u001b",
    "\u00f2\n\u001b\u0003\u001b\u0003\u001b\u0005\u001b\u00f6\n\u001b\u0003",
    "\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0002\u0004(",
    "*\u001d\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018",
    "\u001a\u001c\u001e \"$&(*,.0246\u0002\u0004\u0004\u0002\u001e\u001e",
    " !\u0004\u0002\u001d\u001e !\u0002\u0106\u00028\u0003\u0002\u0002\u0002",
    "\u0004=\u0003\u0002\u0002\u0002\u0006D\u0003\u0002\u0002\u0002\bR\u0003",
    "\u0002\u0002\u0002\nT\u0003\u0002\u0002\u0002\fW\u0003\u0002\u0002\u0002",
    "\u000e^\u0003\u0002\u0002\u0002\u0010`\u0003\u0002\u0002\u0002\u0012",
    "h\u0003\u0002\u0002\u0002\u0014l\u0003\u0002\u0002\u0002\u0016p\u0003",
    "\u0002\u0002\u0002\u0018s\u0003\u0002\u0002\u0002\u001az\u0003\u0002",
    "\u0002\u0002\u001c}\u0003\u0002\u0002\u0002\u001e\u0081\u0003\u0002",
    "\u0002\u0002 \u0084\u0003\u0002\u0002\u0002\"\u0087\u0003\u0002\u0002",
    "\u0002$\u008d\u0003\u0002\u0002\u0002&\u0090\u0003\u0002\u0002\u0002",
    "(\u00a1\u0003\u0002\u0002\u0002*\u00c2\u0003\u0002\u0002\u0002,\u00d2",
    "\u0003\u0002\u0002\u0002.\u00d5\u0003\u0002\u0002\u00020\u00dc\u0003",
    "\u0002\u0002\u00022\u00e7\u0003\u0002\u0002\u00024\u00f1\u0003\u0002",
    "\u0002\u00026\u00f7\u0003\u0002\u0002\u000289\u0005\u0004\u0003\u0002",
    "9:\u0007\u001a\u0002\u0002:;\u0005,\u0017\u0002;<\u0007\u001b\u0002",
    "\u0002<\u0003\u0003\u0002\u0002\u0002=A\u0005\u0006\u0004\u0002>@\u0005",
    "\b\u0005\u0002?>\u0003\u0002\u0002\u0002@C\u0003\u0002\u0002\u0002A",
    "?\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002B\u0005\u0003\u0002",
    "\u0002\u0002CA\u0003\u0002\u0002\u0002DE\u0007\u0003\u0002\u0002EF\u0007",
    "!\u0002\u0002F\u0007\u0003\u0002\u0002\u0002GS\u0005\n\u0006\u0002H",
    "S\u0005\f\u0007\u0002IS\u0005\u0010\t\u0002JS\u0005\u0012\n\u0002KS",
    "\u0005\u0014\u000b\u0002LS\u0005\u0016\f\u0002MS\u0005\u001a\u000e\u0002",
    "NS\u0005\u001e\u0010\u0002OS\u0005 \u0011\u0002PS\u0005\"\u0012\u0002",
    "QS\u0005&\u0014\u0002RG\u0003\u0002\u0002\u0002RH\u0003\u0002\u0002",
    "\u0002RI\u0003\u0002\u0002\u0002RJ\u0003\u0002\u0002\u0002RK\u0003\u0002",
    "\u0002\u0002RL\u0003\u0002\u0002\u0002RM\u0003\u0002\u0002\u0002RN\u0003",
    "\u0002\u0002\u0002RO\u0003\u0002\u0002\u0002RP\u0003\u0002\u0002\u0002",
    "RQ\u0003\u0002\u0002\u0002S\t\u0003\u0002\u0002\u0002TU\u0007\u0004",
    "\u0002\u0002UV\u0007\u001e\u0002\u0002V\u000b\u0003\u0002\u0002\u0002",
    "WX\u0007\u0005\u0002\u0002XY\u0005\u000e\b\u0002Y\r\u0003\u0002\u0002",
    "\u0002Z_\u0007\u001e\u0002\u0002[\\\u0007\u001e\u0002\u0002\\]\u0007",
    "\u0006\u0002\u0002]_\u0005\u000e\b\u0002^Z\u0003\u0002\u0002\u0002^",
    "[\u0003\u0002\u0002\u0002_\u000f\u0003\u0002\u0002\u0002`a\u0007\u0007",
    "\u0002\u0002ae\u0007\u001e\u0002\u0002bd\u0007\u001d\u0002\u0002cb\u0003",
    "\u0002\u0002\u0002dg\u0003\u0002\u0002\u0002ec\u0003\u0002\u0002\u0002",
    "ef\u0003\u0002\u0002\u0002f\u0011\u0003\u0002\u0002\u0002ge\u0003\u0002",
    "\u0002\u0002hi\u0007\b\u0002\u0002ij\u0007\"\u0002\u0002jk\u0005(\u0015",
    "\u0002k\u0013\u0003\u0002\u0002\u0002lm\u0007\t\u0002\u0002mn\u0007",
    "\u001e\u0002\u0002no\u0005*\u0016\u0002o\u0015\u0003\u0002\u0002\u0002",
    "pq\u0007\n\u0002\u0002qr\u0005\u0018\r\u0002r\u0017\u0003\u0002\u0002",
    "\u0002sw\u0007!\u0002\u0002tv\t\u0002\u0002\u0002ut\u0003\u0002\u0002",
    "\u0002vy\u0003\u0002\u0002\u0002wu\u0003\u0002\u0002\u0002wx\u0003\u0002",
    "\u0002\u0002x\u0019\u0003\u0002\u0002\u0002yw\u0003\u0002\u0002\u0002",
    "z{\u0007\u000b\u0002\u0002{|\u0005\u001c\u000f\u0002|\u001b\u0003\u0002",
    "\u0002\u0002}\u007f\u0007\u001d\u0002\u0002~\u0080\u0007\u001d\u0002",
    "\u0002\u007f~\u0003\u0002\u0002\u0002\u007f\u0080\u0003\u0002\u0002",
    "\u0002\u0080\u001d\u0003\u0002\u0002\u0002\u0081\u0082\u0007\f\u0002",
    "\u0002\u0082\u0083\u0007\u001d\u0002\u0002\u0083\u001f\u0003\u0002\u0002",
    "\u0002\u0084\u0085\u0007\r\u0002\u0002\u0085\u0086\u0007\u001d\u0002",
    "\u0002\u0086!\u0003\u0002\u0002\u0002\u0087\u0088\u0007\u000e\u0002",
    "\u0002\u0088\u0089\u0005$\u0013\u0002\u0089#\u0003\u0002\u0002\u0002",
    "\u008a\u008c\u0007!\u0002\u0002\u008b\u008a\u0003\u0002\u0002\u0002",
    "\u008c\u008f\u0003\u0002\u0002\u0002\u008d\u008b\u0003\u0002\u0002\u0002",
    "\u008d\u008e\u0003\u0002\u0002\u0002\u008e%\u0003\u0002\u0002\u0002",
    "\u008f\u008d\u0003\u0002\u0002\u0002\u0090\u0094\u0007\u001c\u0002\u0002",
    "\u0091\u0093\t\u0003\u0002\u0002\u0092\u0091\u0003\u0002\u0002\u0002",
    "\u0093\u0096\u0003\u0002\u0002\u0002\u0094\u0092\u0003\u0002\u0002\u0002",
    "\u0094\u0095\u0003\u0002\u0002\u0002\u0095\'\u0003\u0002\u0002\u0002",
    "\u0096\u0094\u0003\u0002\u0002\u0002\u0097\u0098\b\u0015\u0001\u0002",
    "\u0098\u00a2\u0007 \u0002\u0002\u0099\u00a2\u0007\u001e\u0002\u0002",
    "\u009a\u00a2\u0007\"\u0002\u0002\u009b\u009c\u0007\u000f\u0002\u0002",
    "\u009c\u00a2\u0005(\u0015\u0006\u009d\u009e\u0007\u0010\u0002\u0002",
    "\u009e\u009f\u0005(\u0015\u0002\u009f\u00a0\u0007\u0011\u0002\u0002",
    "\u00a0\u00a2\u0003\u0002\u0002\u0002\u00a1\u0097\u0003\u0002\u0002\u0002",
    "\u00a1\u0099\u0003\u0002\u0002\u0002\u00a1\u009a\u0003\u0002\u0002\u0002",
    "\u00a1\u009b\u0003\u0002\u0002\u0002\u00a1\u009d\u0003\u0002\u0002\u0002",
    "\u00a2\u00ab\u0003\u0002\u0002\u0002\u00a3\u00a4\f\u0004\u0002\u0002",
    "\u00a4\u00a5\u0007\u0006\u0002\u0002\u00a5\u00aa\u0005(\u0015\u0005",
    "\u00a6\u00a7\f\u0003\u0002\u0002\u00a7\u00a8\u0007\u0012\u0002\u0002",
    "\u00a8\u00aa\u0005(\u0015\u0004\u00a9\u00a3\u0003\u0002\u0002\u0002",
    "\u00a9\u00a6\u0003\u0002\u0002\u0002\u00aa\u00ad\u0003\u0002\u0002\u0002",
    "\u00ab\u00a9\u0003\u0002\u0002\u0002\u00ab\u00ac\u0003\u0002\u0002\u0002",
    "\u00ac)\u0003\u0002\u0002\u0002\u00ad\u00ab\u0003\u0002\u0002\u0002",
    "\u00ae\u00af\b\u0016\u0001\u0002\u00af\u00b0\u0007\u0013\u0002\u0002",
    "\u00b0\u00b2\u0007\u0010\u0002\u0002\u00b1\u00b3\u0007\u000f\u0002\u0002",
    "\u00b2\u00b1\u0003\u0002\u0002\u0002\u00b2\u00b3\u0003\u0002\u0002\u0002",
    "\u00b3\u00b4\u0003\u0002\u0002\u0002\u00b4\u00b5\u0007\u001e\u0002\u0002",
    "\u00b5\u00c3\u0007\u0011\u0002\u0002\u00b6\u00b7\u0007\u0014\u0002\u0002",
    "\u00b7\u00b9\u0007\u0010\u0002\u0002\u00b8\u00ba\u0007\u000f\u0002\u0002",
    "\u00b9\u00b8\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002\u0002",
    "\u00ba\u00bb\u0003\u0002\u0002\u0002\u00bb\u00bc\u0007\u001e\u0002\u0002",
    "\u00bc\u00c3\u0007\u0011\u0002\u0002\u00bd\u00be\u0007\u0010\u0002\u0002",
    "\u00be\u00bf\u0005*\u0016\u0002\u00bf\u00c0\u0007\u0011\u0002\u0002",
    "\u00c0\u00c3\u0003\u0002\u0002\u0002\u00c1\u00c3\u0007 \u0002\u0002",
    "\u00c2\u00ae\u0003\u0002\u0002\u0002\u00c2\u00b6\u0003\u0002\u0002\u0002",
    "\u00c2\u00bd\u0003\u0002\u0002\u0002\u00c2\u00c1\u0003\u0002\u0002\u0002",
    "\u00c3\u00cc\u0003\u0002\u0002\u0002\u00c4\u00c5\f\u0005\u0002\u0002",
    "\u00c5\u00c6\u0007\u0006\u0002\u0002\u00c6\u00cb\u0005*\u0016\u0006",
    "\u00c7\u00c8\f\u0004\u0002\u0002\u00c8\u00c9\u0007\u0012\u0002\u0002",
    "\u00c9\u00cb\u0005*\u0016\u0005\u00ca\u00c4\u0003\u0002\u0002\u0002",
    "\u00ca\u00c7\u0003\u0002\u0002\u0002\u00cb\u00ce\u0003\u0002\u0002\u0002",
    "\u00cc\u00ca\u0003\u0002\u0002\u0002\u00cc\u00cd\u0003\u0002\u0002\u0002",
    "\u00cd+\u0003\u0002\u0002\u0002\u00ce\u00cc\u0003\u0002\u0002\u0002",
    "\u00cf\u00d1\u0005.\u0018\u0002\u00d0\u00cf\u0003\u0002\u0002\u0002",
    "\u00d1\u00d4\u0003\u0002\u0002\u0002\u00d2\u00d0\u0003\u0002\u0002\u0002",
    "\u00d2\u00d3\u0003\u0002\u0002\u0002\u00d3-\u0003\u0002\u0002\u0002",
    "\u00d4\u00d2\u0003\u0002\u0002\u0002\u00d5\u00d9\u00050\u0019\u0002",
    "\u00d6\u00d8\u00054\u001b\u0002\u00d7\u00d6\u0003\u0002\u0002\u0002",
    "\u00d8\u00db\u0003\u0002\u0002\u0002\u00d9\u00d7\u0003\u0002\u0002\u0002",
    "\u00d9\u00da\u0003\u0002\u0002\u0002\u00da/\u0003\u0002\u0002\u0002",
    "\u00db\u00d9\u0003\u0002\u0002\u0002\u00dc\u00de\u0007\u0015\u0002\u0002",
    "\u00dd\u00df\u00056\u001c\u0002\u00de\u00dd\u0003\u0002\u0002\u0002",
    "\u00de\u00df\u0003\u0002\u0002\u0002\u00df\u00e0\u0003\u0002\u0002\u0002",
    "\u00e0\u00e2\u0007\u001e\u0002\u0002\u00e1\u00e3\u0007\u001d\u0002\u0002",
    "\u00e2\u00e1\u0003\u0002\u0002\u0002\u00e2\u00e3\u0003\u0002\u0002\u0002",
    "\u00e3\u00e5\u0003\u0002\u0002\u0002\u00e4\u00e6\u00052\u001a\u0002",
    "\u00e5\u00e4\u0003\u0002\u0002\u0002\u00e5\u00e6\u0003\u0002\u0002\u0002",
    "\u00e61\u0003\u0002\u0002\u0002\u00e7\u00eb\u0007\u0016\u0002\u0002",
    "\u00e8\u00ea\u0007\u001e\u0002\u0002\u00e9\u00e8\u0003\u0002\u0002\u0002",
    "\u00ea\u00ed\u0003\u0002\u0002\u0002\u00eb\u00e9\u0003\u0002\u0002\u0002",
    "\u00eb\u00ec\u0003\u0002\u0002\u0002\u00ec\u00ee\u0003\u0002\u0002\u0002",
    "\u00ed\u00eb\u0003\u0002\u0002\u0002\u00ee\u00ef\u0007\u0017\u0002\u0002",
    "\u00ef3\u0003\u0002\u0002\u0002\u00f0\u00f2\u00056\u001c\u0002\u00f1",
    "\u00f0\u0003\u0002\u0002\u0002\u00f1\u00f2\u0003\u0002\u0002\u0002\u00f2",
    "\u00f3\u0003\u0002\u0002\u0002\u00f3\u00f5\u0005\u000e\b\u0002\u00f4",
    "\u00f6\u00052\u001a\u0002\u00f5\u00f4\u0003\u0002\u0002\u0002\u00f5",
    "\u00f6\u0003\u0002\u0002\u0002\u00f65\u0003\u0002\u0002\u0002\u00f7",
    "\u00f8\u0007\u0018\u0002\u0002\u00f8\u00f9\u0005(\u0015\u0002\u00f9",
    "\u00fa\u0007\u0019\u0002\u0002\u00fa7\u0003\u0002\u0002\u0002\u001a",
    "AR^ew\u007f\u008d\u0094\u00a1\u00a9\u00ab\u00b2\u00b9\u00c2\u00ca\u00cc",
    "\u00d2\u00d9\u00de\u00e2\u00e5\u00eb\u00f1\u00f5"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'HOA:'", "'States:'", "'Start:'", "'&'", "'AP:'", 
                     "'Alias:'", "'Acceptance:'", "'acc-name:'", "'tool:'", 
                     "'name:'", "'positions:'", "'properties:'", "'!'", 
                     "'('", "')'", "'|'", "'Inf'", "'Fin'", "'State:'", 
                     "'{'", "'}'", "'['", "']'", "'--BODY--'", "'--END--'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, "BODYDELIM", "ENDDELIM", 
                      "HEADERNAME", "STRING", "INT", "WHITESPACE", "BOOLEAN", 
                      "IDENTIFIER", "ANAME", "COMMENT" ];

var ruleNames =  [ "automaton", "header", "formatVersion", "headerItem", 
                   "states", "start", "stateConj", "ap", "alias", "acceptance", 
                   "accname", "accstr", "tool", "toolstr", "name", "positions", 
                   "props", "propval", "etc", "lexpr", "acceptanceCond", 
                   "body", "vertex", "stateName", "accSig", "edge", "label" ];

function hoaParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

hoaParser.prototype = Object.create(antlr4.Parser.prototype);
hoaParser.prototype.constructor = hoaParser;

Object.defineProperty(hoaParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

hoaParser.EOF = antlr4.Token.EOF;
hoaParser.T__0 = 1;
hoaParser.T__1 = 2;
hoaParser.T__2 = 3;
hoaParser.T__3 = 4;
hoaParser.T__4 = 5;
hoaParser.T__5 = 6;
hoaParser.T__6 = 7;
hoaParser.T__7 = 8;
hoaParser.T__8 = 9;
hoaParser.T__9 = 10;
hoaParser.T__10 = 11;
hoaParser.T__11 = 12;
hoaParser.T__12 = 13;
hoaParser.T__13 = 14;
hoaParser.T__14 = 15;
hoaParser.T__15 = 16;
hoaParser.T__16 = 17;
hoaParser.T__17 = 18;
hoaParser.T__18 = 19;
hoaParser.T__19 = 20;
hoaParser.T__20 = 21;
hoaParser.T__21 = 22;
hoaParser.T__22 = 23;
hoaParser.BODYDELIM = 24;
hoaParser.ENDDELIM = 25;
hoaParser.HEADERNAME = 26;
hoaParser.STRING = 27;
hoaParser.INT = 28;
hoaParser.WHITESPACE = 29;
hoaParser.BOOLEAN = 30;
hoaParser.IDENTIFIER = 31;
hoaParser.ANAME = 32;
hoaParser.COMMENT = 33;

hoaParser.RULE_automaton = 0;
hoaParser.RULE_header = 1;
hoaParser.RULE_formatVersion = 2;
hoaParser.RULE_headerItem = 3;
hoaParser.RULE_states = 4;
hoaParser.RULE_start = 5;
hoaParser.RULE_stateConj = 6;
hoaParser.RULE_ap = 7;
hoaParser.RULE_alias = 8;
hoaParser.RULE_acceptance = 9;
hoaParser.RULE_accname = 10;
hoaParser.RULE_accstr = 11;
hoaParser.RULE_tool = 12;
hoaParser.RULE_toolstr = 13;
hoaParser.RULE_name = 14;
hoaParser.RULE_positions = 15;
hoaParser.RULE_props = 16;
hoaParser.RULE_propval = 17;
hoaParser.RULE_etc = 18;
hoaParser.RULE_lexpr = 19;
hoaParser.RULE_acceptanceCond = 20;
hoaParser.RULE_body = 21;
hoaParser.RULE_vertex = 22;
hoaParser.RULE_stateName = 23;
hoaParser.RULE_accSig = 24;
hoaParser.RULE_edge = 25;
hoaParser.RULE_label = 26;


function AutomatonContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_automaton;
    return this;
}

AutomatonContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AutomatonContext.prototype.constructor = AutomatonContext;

AutomatonContext.prototype.header = function() {
    return this.getTypedRuleContext(HeaderContext,0);
};

AutomatonContext.prototype.BODYDELIM = function() {
    return this.getToken(hoaParser.BODYDELIM, 0);
};

AutomatonContext.prototype.body = function() {
    return this.getTypedRuleContext(BodyContext,0);
};

AutomatonContext.prototype.ENDDELIM = function() {
    return this.getToken(hoaParser.ENDDELIM, 0);
};

AutomatonContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAutomaton(this);
	}
};

AutomatonContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAutomaton(this);
	}
};




hoaParser.AutomatonContext = AutomatonContext;

hoaParser.prototype.automaton = function() {

    var localctx = new AutomatonContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, hoaParser.RULE_automaton);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 54;
        this.header();
        this.state = 55;
        this.match(hoaParser.BODYDELIM);
        this.state = 56;
        this.body();
        this.state = 57;
        this.match(hoaParser.ENDDELIM);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function HeaderContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_header;
    return this;
}

HeaderContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HeaderContext.prototype.constructor = HeaderContext;

HeaderContext.prototype.formatVersion = function() {
    return this.getTypedRuleContext(FormatVersionContext,0);
};

HeaderContext.prototype.headerItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HeaderItemContext);
    } else {
        return this.getTypedRuleContext(HeaderItemContext,i);
    }
};

HeaderContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterHeader(this);
	}
};

HeaderContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitHeader(this);
	}
};




hoaParser.HeaderContext = HeaderContext;

hoaParser.prototype.header = function() {

    var localctx = new HeaderContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, hoaParser.RULE_header);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 59;
        this.formatVersion();
        this.state = 63;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.T__1) | (1 << hoaParser.T__2) | (1 << hoaParser.T__4) | (1 << hoaParser.T__5) | (1 << hoaParser.T__6) | (1 << hoaParser.T__7) | (1 << hoaParser.T__8) | (1 << hoaParser.T__9) | (1 << hoaParser.T__10) | (1 << hoaParser.T__11) | (1 << hoaParser.HEADERNAME))) !== 0)) {
            this.state = 60;
            this.headerItem();
            this.state = 65;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function FormatVersionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_formatVersion;
    return this;
}

FormatVersionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormatVersionContext.prototype.constructor = FormatVersionContext;

FormatVersionContext.prototype.IDENTIFIER = function() {
    return this.getToken(hoaParser.IDENTIFIER, 0);
};

FormatVersionContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterFormatVersion(this);
	}
};

FormatVersionContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitFormatVersion(this);
	}
};




hoaParser.FormatVersionContext = FormatVersionContext;

hoaParser.prototype.formatVersion = function() {

    var localctx = new FormatVersionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, hoaParser.RULE_formatVersion);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 66;
        this.match(hoaParser.T__0);
        this.state = 67;
        this.match(hoaParser.IDENTIFIER);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function HeaderItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_headerItem;
    return this;
}

HeaderItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HeaderItemContext.prototype.constructor = HeaderItemContext;

HeaderItemContext.prototype.states = function() {
    return this.getTypedRuleContext(StatesContext,0);
};

HeaderItemContext.prototype.start = function() {
    return this.getTypedRuleContext(StartContext,0);
};

HeaderItemContext.prototype.ap = function() {
    return this.getTypedRuleContext(ApContext,0);
};

HeaderItemContext.prototype.alias = function() {
    return this.getTypedRuleContext(AliasContext,0);
};

HeaderItemContext.prototype.acceptance = function() {
    return this.getTypedRuleContext(AcceptanceContext,0);
};

HeaderItemContext.prototype.accname = function() {
    return this.getTypedRuleContext(AccnameContext,0);
};

HeaderItemContext.prototype.tool = function() {
    return this.getTypedRuleContext(ToolContext,0);
};

HeaderItemContext.prototype.name = function() {
    return this.getTypedRuleContext(NameContext,0);
};

HeaderItemContext.prototype.positions = function() {
    return this.getTypedRuleContext(PositionsContext,0);
};

HeaderItemContext.prototype.props = function() {
    return this.getTypedRuleContext(PropsContext,0);
};

HeaderItemContext.prototype.etc = function() {
    return this.getTypedRuleContext(EtcContext,0);
};

HeaderItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterHeaderItem(this);
	}
};

HeaderItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitHeaderItem(this);
	}
};




hoaParser.HeaderItemContext = HeaderItemContext;

hoaParser.prototype.headerItem = function() {

    var localctx = new HeaderItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, hoaParser.RULE_headerItem);
    try {
        this.state = 80;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case hoaParser.T__1:
            this.enterOuterAlt(localctx, 1);
            this.state = 69;
            this.states();
            break;
        case hoaParser.T__2:
            this.enterOuterAlt(localctx, 2);
            this.state = 70;
            this.start();
            break;
        case hoaParser.T__4:
            this.enterOuterAlt(localctx, 3);
            this.state = 71;
            this.ap();
            break;
        case hoaParser.T__5:
            this.enterOuterAlt(localctx, 4);
            this.state = 72;
            this.alias();
            break;
        case hoaParser.T__6:
            this.enterOuterAlt(localctx, 5);
            this.state = 73;
            this.acceptance();
            break;
        case hoaParser.T__7:
            this.enterOuterAlt(localctx, 6);
            this.state = 74;
            this.accname();
            break;
        case hoaParser.T__8:
            this.enterOuterAlt(localctx, 7);
            this.state = 75;
            this.tool();
            break;
        case hoaParser.T__9:
            this.enterOuterAlt(localctx, 8);
            this.state = 76;
            this.name();
            break;
        case hoaParser.T__10:
            this.enterOuterAlt(localctx, 9);
            this.state = 77;
            this.positions();
            break;
        case hoaParser.T__11:
            this.enterOuterAlt(localctx, 10);
            this.state = 78;
            this.props();
            break;
        case hoaParser.HEADERNAME:
            this.enterOuterAlt(localctx, 11);
            this.state = 79;
            this.etc();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StatesContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_states;
    return this;
}

StatesContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatesContext.prototype.constructor = StatesContext;

StatesContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

StatesContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterStates(this);
	}
};

StatesContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitStates(this);
	}
};




hoaParser.StatesContext = StatesContext;

hoaParser.prototype.states = function() {

    var localctx = new StatesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, hoaParser.RULE_states);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 82;
        this.match(hoaParser.T__1);
        this.state = 83;
        this.match(hoaParser.INT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StartContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_start;
    return this;
}

StartContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StartContext.prototype.constructor = StartContext;

StartContext.prototype.stateConj = function() {
    return this.getTypedRuleContext(StateConjContext,0);
};

StartContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterStart(this);
	}
};

StartContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitStart(this);
	}
};




hoaParser.StartContext = StartContext;

hoaParser.prototype.start = function() {

    var localctx = new StartContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, hoaParser.RULE_start);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        this.match(hoaParser.T__2);
        this.state = 86;
        this.stateConj();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StateConjContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_stateConj;
    return this;
}

StateConjContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateConjContext.prototype.constructor = StateConjContext;

StateConjContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

StateConjContext.prototype.stateConj = function() {
    return this.getTypedRuleContext(StateConjContext,0);
};

StateConjContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterStateConj(this);
	}
};

StateConjContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitStateConj(this);
	}
};




hoaParser.StateConjContext = StateConjContext;

hoaParser.prototype.stateConj = function() {

    var localctx = new StateConjContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, hoaParser.RULE_stateConj);
    try {
        this.state = 92;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 88;
            this.match(hoaParser.INT);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 89;
            this.match(hoaParser.INT);
            this.state = 90;
            this.match(hoaParser.T__3);
            this.state = 91;
            this.stateConj();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ApContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_ap;
    return this;
}

ApContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ApContext.prototype.constructor = ApContext;

ApContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

ApContext.prototype.STRING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.STRING);
    } else {
        return this.getToken(hoaParser.STRING, i);
    }
};


ApContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAp(this);
	}
};

ApContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAp(this);
	}
};




hoaParser.ApContext = ApContext;

hoaParser.prototype.ap = function() {

    var localctx = new ApContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, hoaParser.RULE_ap);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 94;
        this.match(hoaParser.T__4);
        this.state = 95;
        this.match(hoaParser.INT);
        this.state = 99;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.STRING) {
            this.state = 96;
            this.match(hoaParser.STRING);
            this.state = 101;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AliasContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_alias;
    return this;
}

AliasContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AliasContext.prototype.constructor = AliasContext;

AliasContext.prototype.ANAME = function() {
    return this.getToken(hoaParser.ANAME, 0);
};

AliasContext.prototype.lexpr = function() {
    return this.getTypedRuleContext(LexprContext,0);
};

AliasContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAlias(this);
	}
};

AliasContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAlias(this);
	}
};




hoaParser.AliasContext = AliasContext;

hoaParser.prototype.alias = function() {

    var localctx = new AliasContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, hoaParser.RULE_alias);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 102;
        this.match(hoaParser.T__5);
        this.state = 103;
        this.match(hoaParser.ANAME);
        this.state = 104;
        this.lexpr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AcceptanceContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_acceptance;
    return this;
}

AcceptanceContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AcceptanceContext.prototype.constructor = AcceptanceContext;

AcceptanceContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

AcceptanceContext.prototype.acceptanceCond = function() {
    return this.getTypedRuleContext(AcceptanceCondContext,0);
};

AcceptanceContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAcceptance(this);
	}
};

AcceptanceContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAcceptance(this);
	}
};




hoaParser.AcceptanceContext = AcceptanceContext;

hoaParser.prototype.acceptance = function() {

    var localctx = new AcceptanceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, hoaParser.RULE_acceptance);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 106;
        this.match(hoaParser.T__6);
        this.state = 107;
        this.match(hoaParser.INT);
        this.state = 108;
        this.acceptanceCond(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AccnameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_accname;
    return this;
}

AccnameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AccnameContext.prototype.constructor = AccnameContext;

AccnameContext.prototype.accstr = function() {
    return this.getTypedRuleContext(AccstrContext,0);
};

AccnameContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAccname(this);
	}
};

AccnameContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAccname(this);
	}
};




hoaParser.AccnameContext = AccnameContext;

hoaParser.prototype.accname = function() {

    var localctx = new AccnameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, hoaParser.RULE_accname);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 110;
        this.match(hoaParser.T__7);
        this.state = 111;
        this.accstr();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AccstrContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_accstr;
    return this;
}

AccstrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AccstrContext.prototype.constructor = AccstrContext;

AccstrContext.prototype.IDENTIFIER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.IDENTIFIER);
    } else {
        return this.getToken(hoaParser.IDENTIFIER, i);
    }
};


AccstrContext.prototype.BOOLEAN = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.BOOLEAN);
    } else {
        return this.getToken(hoaParser.BOOLEAN, i);
    }
};


AccstrContext.prototype.INT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.INT);
    } else {
        return this.getToken(hoaParser.INT, i);
    }
};


AccstrContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAccstr(this);
	}
};

AccstrContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAccstr(this);
	}
};




hoaParser.AccstrContext = AccstrContext;

hoaParser.prototype.accstr = function() {

    var localctx = new AccstrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, hoaParser.RULE_accstr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 113;
        this.match(hoaParser.IDENTIFIER);
        this.state = 117;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0)) {
            this.state = 114;
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0))) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 119;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ToolContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_tool;
    return this;
}

ToolContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ToolContext.prototype.constructor = ToolContext;

ToolContext.prototype.toolstr = function() {
    return this.getTypedRuleContext(ToolstrContext,0);
};

ToolContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterTool(this);
	}
};

ToolContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitTool(this);
	}
};




hoaParser.ToolContext = ToolContext;

hoaParser.prototype.tool = function() {

    var localctx = new ToolContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, hoaParser.RULE_tool);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 120;
        this.match(hoaParser.T__8);
        this.state = 121;
        this.toolstr();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ToolstrContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_toolstr;
    return this;
}

ToolstrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ToolstrContext.prototype.constructor = ToolstrContext;

ToolstrContext.prototype.STRING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.STRING);
    } else {
        return this.getToken(hoaParser.STRING, i);
    }
};


ToolstrContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterToolstr(this);
	}
};

ToolstrContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitToolstr(this);
	}
};




hoaParser.ToolstrContext = ToolstrContext;

hoaParser.prototype.toolstr = function() {

    var localctx = new ToolstrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, hoaParser.RULE_toolstr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 123;
        this.match(hoaParser.STRING);
        this.state = 125;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.STRING) {
            this.state = 124;
            this.match(hoaParser.STRING);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function NameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_name;
    return this;
}

NameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NameContext.prototype.constructor = NameContext;

NameContext.prototype.STRING = function() {
    return this.getToken(hoaParser.STRING, 0);
};

NameContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterName(this);
	}
};

NameContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitName(this);
	}
};




hoaParser.NameContext = NameContext;

hoaParser.prototype.name = function() {

    var localctx = new NameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, hoaParser.RULE_name);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 127;
        this.match(hoaParser.T__9);
        this.state = 128;
        this.match(hoaParser.STRING);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function PositionsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_positions;
    return this;
}

PositionsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PositionsContext.prototype.constructor = PositionsContext;

PositionsContext.prototype.STRING = function() {
    return this.getToken(hoaParser.STRING, 0);
};

PositionsContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterPositions(this);
	}
};

PositionsContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitPositions(this);
	}
};




hoaParser.PositionsContext = PositionsContext;

hoaParser.prototype.positions = function() {

    var localctx = new PositionsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, hoaParser.RULE_positions);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 130;
        this.match(hoaParser.T__10);
        this.state = 131;
        this.match(hoaParser.STRING);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function PropsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_props;
    return this;
}

PropsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PropsContext.prototype.constructor = PropsContext;

PropsContext.prototype.propval = function() {
    return this.getTypedRuleContext(PropvalContext,0);
};

PropsContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterProps(this);
	}
};

PropsContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitProps(this);
	}
};




hoaParser.PropsContext = PropsContext;

hoaParser.prototype.props = function() {

    var localctx = new PropsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, hoaParser.RULE_props);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 133;
        this.match(hoaParser.T__11);
        this.state = 134;
        this.propval();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function PropvalContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_propval;
    return this;
}

PropvalContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PropvalContext.prototype.constructor = PropvalContext;

PropvalContext.prototype.IDENTIFIER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.IDENTIFIER);
    } else {
        return this.getToken(hoaParser.IDENTIFIER, i);
    }
};


PropvalContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterPropval(this);
	}
};

PropvalContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitPropval(this);
	}
};




hoaParser.PropvalContext = PropvalContext;

hoaParser.prototype.propval = function() {

    var localctx = new PropvalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, hoaParser.RULE_propval);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 139;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.IDENTIFIER) {
            this.state = 136;
            this.match(hoaParser.IDENTIFIER);
            this.state = 141;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EtcContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_etc;
    return this;
}

EtcContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EtcContext.prototype.constructor = EtcContext;

EtcContext.prototype.HEADERNAME = function() {
    return this.getToken(hoaParser.HEADERNAME, 0);
};

EtcContext.prototype.BOOLEAN = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.BOOLEAN);
    } else {
        return this.getToken(hoaParser.BOOLEAN, i);
    }
};


EtcContext.prototype.INT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.INT);
    } else {
        return this.getToken(hoaParser.INT, i);
    }
};


EtcContext.prototype.STRING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.STRING);
    } else {
        return this.getToken(hoaParser.STRING, i);
    }
};


EtcContext.prototype.IDENTIFIER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.IDENTIFIER);
    } else {
        return this.getToken(hoaParser.IDENTIFIER, i);
    }
};


EtcContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterEtc(this);
	}
};

EtcContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitEtc(this);
	}
};




hoaParser.EtcContext = EtcContext;

hoaParser.prototype.etc = function() {

    var localctx = new EtcContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, hoaParser.RULE_etc);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 142;
        this.match(hoaParser.HEADERNAME);
        this.state = 146;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.STRING) | (1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0)) {
            this.state = 143;
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.STRING) | (1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0))) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 148;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LexprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_lexpr;
    return this;
}

LexprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LexprContext.prototype.constructor = LexprContext;

LexprContext.prototype.BOOLEAN = function() {
    return this.getToken(hoaParser.BOOLEAN, 0);
};

LexprContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

LexprContext.prototype.ANAME = function() {
    return this.getToken(hoaParser.ANAME, 0);
};

LexprContext.prototype.lexpr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LexprContext);
    } else {
        return this.getTypedRuleContext(LexprContext,i);
    }
};

LexprContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterLexpr(this);
	}
};

LexprContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitLexpr(this);
	}
};



hoaParser.prototype.lexpr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new LexprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 38;
    this.enterRecursionRule(localctx, 38, hoaParser.RULE_lexpr, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 159;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case hoaParser.BOOLEAN:
            this.state = 150;
            this.match(hoaParser.BOOLEAN);
            break;
        case hoaParser.INT:
            this.state = 151;
            this.match(hoaParser.INT);
            break;
        case hoaParser.ANAME:
            this.state = 152;
            this.match(hoaParser.ANAME);
            break;
        case hoaParser.T__12:
            this.state = 153;
            this.match(hoaParser.T__12);
            this.state = 154;
            this.lexpr(4);
            break;
        case hoaParser.T__13:
            this.state = 155;
            this.match(hoaParser.T__13);
            this.state = 156;
            this.lexpr(0);
            this.state = 157;
            this.match(hoaParser.T__14);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 169;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,10,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 167;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new LexprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, hoaParser.RULE_lexpr);
                    this.state = 161;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 162;
                    this.match(hoaParser.T__3);
                    this.state = 163;
                    this.lexpr(3);
                    break;

                case 2:
                    localctx = new LexprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, hoaParser.RULE_lexpr);
                    this.state = 164;
                    if (!( this.precpred(this._ctx, 1))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                    }
                    this.state = 165;
                    this.match(hoaParser.T__15);
                    this.state = 166;
                    this.lexpr(2);
                    break;

                } 
            }
            this.state = 171;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,10,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function AcceptanceCondContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_acceptanceCond;
    return this;
}

AcceptanceCondContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AcceptanceCondContext.prototype.constructor = AcceptanceCondContext;

AcceptanceCondContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

AcceptanceCondContext.prototype.acceptanceCond = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AcceptanceCondContext);
    } else {
        return this.getTypedRuleContext(AcceptanceCondContext,i);
    }
};

AcceptanceCondContext.prototype.BOOLEAN = function() {
    return this.getToken(hoaParser.BOOLEAN, 0);
};

AcceptanceCondContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAcceptanceCond(this);
	}
};

AcceptanceCondContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAcceptanceCond(this);
	}
};



hoaParser.prototype.acceptanceCond = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new AcceptanceCondContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 40;
    this.enterRecursionRule(localctx, 40, hoaParser.RULE_acceptanceCond, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 192;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case hoaParser.T__16:
            this.state = 173;
            this.match(hoaParser.T__16);
            this.state = 174;
            this.match(hoaParser.T__13);
            this.state = 176;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===hoaParser.T__12) {
                this.state = 175;
                this.match(hoaParser.T__12);
            }

            this.state = 178;
            this.match(hoaParser.INT);
            this.state = 179;
            this.match(hoaParser.T__14);
            break;
        case hoaParser.T__17:
            this.state = 180;
            this.match(hoaParser.T__17);
            this.state = 181;
            this.match(hoaParser.T__13);
            this.state = 183;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===hoaParser.T__12) {
                this.state = 182;
                this.match(hoaParser.T__12);
            }

            this.state = 185;
            this.match(hoaParser.INT);
            this.state = 186;
            this.match(hoaParser.T__14);
            break;
        case hoaParser.T__13:
            this.state = 187;
            this.match(hoaParser.T__13);
            this.state = 188;
            this.acceptanceCond(0);
            this.state = 189;
            this.match(hoaParser.T__14);
            break;
        case hoaParser.BOOLEAN:
            this.state = 191;
            this.match(hoaParser.BOOLEAN);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 202;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,15,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 200;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new AcceptanceCondContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, hoaParser.RULE_acceptanceCond);
                    this.state = 194;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 195;
                    this.match(hoaParser.T__3);
                    this.state = 196;
                    this.acceptanceCond(4);
                    break;

                case 2:
                    localctx = new AcceptanceCondContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, hoaParser.RULE_acceptanceCond);
                    this.state = 197;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 198;
                    this.match(hoaParser.T__15);
                    this.state = 199;
                    this.acceptanceCond(3);
                    break;

                } 
            }
            this.state = 204;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,15,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function BodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_body;
    return this;
}

BodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BodyContext.prototype.constructor = BodyContext;

BodyContext.prototype.vertex = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VertexContext);
    } else {
        return this.getTypedRuleContext(VertexContext,i);
    }
};

BodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterBody(this);
	}
};

BodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitBody(this);
	}
};




hoaParser.BodyContext = BodyContext;

hoaParser.prototype.body = function() {

    var localctx = new BodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, hoaParser.RULE_body);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 208;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.T__18) {
            this.state = 205;
            this.vertex();
            this.state = 210;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function VertexContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_vertex;
    return this;
}

VertexContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VertexContext.prototype.constructor = VertexContext;

VertexContext.prototype.stateName = function() {
    return this.getTypedRuleContext(StateNameContext,0);
};

VertexContext.prototype.edge = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EdgeContext);
    } else {
        return this.getTypedRuleContext(EdgeContext,i);
    }
};

VertexContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterVertex(this);
	}
};

VertexContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitVertex(this);
	}
};




hoaParser.VertexContext = VertexContext;

hoaParser.prototype.vertex = function() {

    var localctx = new VertexContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, hoaParser.RULE_vertex);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 211;
        this.stateName();
        this.state = 215;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.T__21 || _la===hoaParser.INT) {
            this.state = 212;
            this.edge();
            this.state = 217;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StateNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_stateName;
    return this;
}

StateNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateNameContext.prototype.constructor = StateNameContext;

StateNameContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

StateNameContext.prototype.label = function() {
    return this.getTypedRuleContext(LabelContext,0);
};

StateNameContext.prototype.STRING = function() {
    return this.getToken(hoaParser.STRING, 0);
};

StateNameContext.prototype.accSig = function() {
    return this.getTypedRuleContext(AccSigContext,0);
};

StateNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterStateName(this);
	}
};

StateNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitStateName(this);
	}
};




hoaParser.StateNameContext = StateNameContext;

hoaParser.prototype.stateName = function() {

    var localctx = new StateNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, hoaParser.RULE_stateName);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 218;
        this.match(hoaParser.T__18);
        this.state = 220;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__21) {
            this.state = 219;
            this.label();
        }

        this.state = 222;
        this.match(hoaParser.INT);
        this.state = 224;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.STRING) {
            this.state = 223;
            this.match(hoaParser.STRING);
        }

        this.state = 227;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__19) {
            this.state = 226;
            this.accSig();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AccSigContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_accSig;
    return this;
}

AccSigContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AccSigContext.prototype.constructor = AccSigContext;

AccSigContext.prototype.INT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(hoaParser.INT);
    } else {
        return this.getToken(hoaParser.INT, i);
    }
};


AccSigContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAccSig(this);
	}
};

AccSigContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAccSig(this);
	}
};




hoaParser.AccSigContext = AccSigContext;

hoaParser.prototype.accSig = function() {

    var localctx = new AccSigContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, hoaParser.RULE_accSig);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 229;
        this.match(hoaParser.T__19);
        this.state = 233;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.INT) {
            this.state = 230;
            this.match(hoaParser.INT);
            this.state = 235;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 236;
        this.match(hoaParser.T__20);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EdgeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_edge;
    return this;
}

EdgeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EdgeContext.prototype.constructor = EdgeContext;

EdgeContext.prototype.stateConj = function() {
    return this.getTypedRuleContext(StateConjContext,0);
};

EdgeContext.prototype.label = function() {
    return this.getTypedRuleContext(LabelContext,0);
};

EdgeContext.prototype.accSig = function() {
    return this.getTypedRuleContext(AccSigContext,0);
};

EdgeContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterEdge(this);
	}
};

EdgeContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitEdge(this);
	}
};




hoaParser.EdgeContext = EdgeContext;

hoaParser.prototype.edge = function() {

    var localctx = new EdgeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, hoaParser.RULE_edge);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 239;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__21) {
            this.state = 238;
            this.label();
        }

        this.state = 241;
        this.stateConj();
        this.state = 243;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__19) {
            this.state = 242;
            this.accSig();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LabelContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_label;
    return this;
}

LabelContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LabelContext.prototype.constructor = LabelContext;

LabelContext.prototype.lexpr = function() {
    return this.getTypedRuleContext(LexprContext,0);
};

LabelContext.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterLabel(this);
	}
};

LabelContext.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitLabel(this);
	}
};




hoaParser.LabelContext = LabelContext;

hoaParser.prototype.label = function() {

    var localctx = new LabelContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, hoaParser.RULE_label);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 245;
        this.match(hoaParser.T__21);
        this.state = 246;
        this.lexpr(0);
        this.state = 247;
        this.match(hoaParser.T__22);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


hoaParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 19:
			return this.lexpr_sempred(localctx, predIndex);
	case 20:
			return this.acceptanceCond_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

hoaParser.prototype.lexpr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 2);
		case 1:
			return this.precpred(this._ctx, 1);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

hoaParser.prototype.acceptanceCond_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 2:
			return this.precpred(this._ctx, 3);
		case 3:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.hoaParser = hoaParser;
