// Generated from hoa.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var hoaListener = require('./hoaListener').hoaListener;
var grammarFileName = "hoa.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003!\u0100\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0007\u0003D\n\u0003\f\u0003\u000e\u0003G\u000b\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0005\u0005W\n\u0005\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b",
    "\u0005\bc\n\b\u0003\t\u0003\t\u0003\t\u0007\th\n\t\f\t\u000e\tk\u000b",
    "\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0007\rz\n\r\f",
    "\r\u000e\r}\u000b\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000f",
    "\u0003\u000f\u0005\u000f\u0084\n\u000f\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0003\u0013\u0007\u0013\u0090\n\u0013\f\u0013\u000e\u0013\u0093",
    "\u000b\u0013\u0003\u0014\u0003\u0014\u0007\u0014\u0097\n\u0014\f\u0014",
    "\u000e\u0014\u009a\u000b\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0005",
    "\u0015\u00ab\n\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016",
    "\u00b6\n\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0005\u0017\u00bb",
    "\n\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0005\u0017",
    "\u00c7\n\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003",
    "\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0005\u0018\u00d2",
    "\n\u0018\u0003\u0019\u0007\u0019\u00d5\n\u0019\f\u0019\u000e\u0019\u00d8",
    "\u000b\u0019\u0003\u001a\u0003\u001a\u0007\u001a\u00dc\n\u001a\f\u001a",
    "\u000e\u001a\u00df\u000b\u001a\u0003\u001b\u0003\u001b\u0005\u001b\u00e3",
    "\n\u001b\u0003\u001b\u0003\u001b\u0005\u001b\u00e7\n\u001b\u0003\u001b",
    "\u0005\u001b\u00ea\n\u001b\u0003\u001c\u0003\u001c\u0007\u001c\u00ee",
    "\n\u001c\f\u001c\u000e\u001c\u00f1\u000b\u001c\u0003\u001c\u0003\u001c",
    "\u0003\u001d\u0005\u001d\u00f6\n\u001d\u0003\u001d\u0003\u001d\u0005",
    "\u001d\u00fa\n\u001d\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e",
    "\u0003\u001e\u0002\u0002\u001f\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012",
    "\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:\u0002\u0004\u0004",
    "\u0002\u001c\u001c\u001e\u001f\u0004\u0002\u001b\u001c\u001e\u001f\u0002",
    "\u0106\u0002<\u0003\u0002\u0002\u0002\u0004A\u0003\u0002\u0002\u0002",
    "\u0006H\u0003\u0002\u0002\u0002\bV\u0003\u0002\u0002\u0002\nX\u0003",
    "\u0002\u0002\u0002\f[\u0003\u0002\u0002\u0002\u000eb\u0003\u0002\u0002",
    "\u0002\u0010d\u0003\u0002\u0002\u0002\u0012l\u0003\u0002\u0002\u0002",
    "\u0014p\u0003\u0002\u0002\u0002\u0016t\u0003\u0002\u0002\u0002\u0018",
    "w\u0003\u0002\u0002\u0002\u001a~\u0003\u0002\u0002\u0002\u001c\u0081",
    "\u0003\u0002\u0002\u0002\u001e\u0085\u0003\u0002\u0002\u0002 \u0088",
    "\u0003\u0002\u0002\u0002\"\u008b\u0003\u0002\u0002\u0002$\u0091\u0003",
    "\u0002\u0002\u0002&\u0094\u0003\u0002\u0002\u0002(\u00aa\u0003\u0002",
    "\u0002\u0002*\u00b5\u0003\u0002\u0002\u0002,\u00c6\u0003\u0002\u0002",
    "\u0002.\u00d1\u0003\u0002\u0002\u00020\u00d6\u0003\u0002\u0002\u0002",
    "2\u00d9\u0003\u0002\u0002\u00024\u00e0\u0003\u0002\u0002\u00026\u00eb",
    "\u0003\u0002\u0002\u00028\u00f5\u0003\u0002\u0002\u0002:\u00fb\u0003",
    "\u0002\u0002\u0002<=\u0005\u0004\u0003\u0002=>\u0007\u0018\u0002\u0002",
    ">?\u00050\u0019\u0002?@\u0007\u0019\u0002\u0002@\u0003\u0003\u0002\u0002",
    "\u0002AE\u0005\u0006\u0004\u0002BD\u0005\b\u0005\u0002CB\u0003\u0002",
    "\u0002\u0002DG\u0003\u0002\u0002\u0002EC\u0003\u0002\u0002\u0002EF\u0003",
    "\u0002\u0002\u0002F\u0005\u0003\u0002\u0002\u0002GE\u0003\u0002\u0002",
    "\u0002HI\u0007\u0003\u0002\u0002IJ\u0007\u001f\u0002\u0002J\u0007\u0003",
    "\u0002\u0002\u0002KW\u0005\n\u0006\u0002LW\u0005\f\u0007\u0002MW\u0005",
    "\u0010\t\u0002NW\u0005\u0012\n\u0002OW\u0005\u0014\u000b\u0002PW\u0005",
    "\u0016\f\u0002QW\u0005\u001a\u000e\u0002RW\u0005\u001e\u0010\u0002S",
    "W\u0005 \u0011\u0002TW\u0005\"\u0012\u0002UW\u0005&\u0014\u0002VK\u0003",
    "\u0002\u0002\u0002VL\u0003\u0002\u0002\u0002VM\u0003\u0002\u0002\u0002",
    "VN\u0003\u0002\u0002\u0002VO\u0003\u0002\u0002\u0002VP\u0003\u0002\u0002",
    "\u0002VQ\u0003\u0002\u0002\u0002VR\u0003\u0002\u0002\u0002VS\u0003\u0002",
    "\u0002\u0002VT\u0003\u0002\u0002\u0002VU\u0003\u0002\u0002\u0002W\t",
    "\u0003\u0002\u0002\u0002XY\u0007\u0004\u0002\u0002YZ\u0007\u001c\u0002",
    "\u0002Z\u000b\u0003\u0002\u0002\u0002[\\\u0007\u0005\u0002\u0002\\]",
    "\u0005\u000e\b\u0002]\r\u0003\u0002\u0002\u0002^c\u0007\u001c\u0002",
    "\u0002_`\u0007\u001c\u0002\u0002`a\u0007\u0006\u0002\u0002ac\u0005\u000e",
    "\b\u0002b^\u0003\u0002\u0002\u0002b_\u0003\u0002\u0002\u0002c\u000f",
    "\u0003\u0002\u0002\u0002de\u0007\u0007\u0002\u0002ei\u0007\u001c\u0002",
    "\u0002fh\u0007\u001b\u0002\u0002gf\u0003\u0002\u0002\u0002hk\u0003\u0002",
    "\u0002\u0002ig\u0003\u0002\u0002\u0002ij\u0003\u0002\u0002\u0002j\u0011",
    "\u0003\u0002\u0002\u0002ki\u0003\u0002\u0002\u0002lm\u0007\b\u0002\u0002",
    "mn\u0007 \u0002\u0002no\u0005(\u0015\u0002o\u0013\u0003\u0002\u0002",
    "\u0002pq\u0007\t\u0002\u0002qr\u0007\u001c\u0002\u0002rs\u0005,\u0017",
    "\u0002s\u0015\u0003\u0002\u0002\u0002tu\u0007\n\u0002\u0002uv\u0005",
    "\u0018\r\u0002v\u0017\u0003\u0002\u0002\u0002w{\u0007\u001f\u0002\u0002",
    "xz\t\u0002\u0002\u0002yx\u0003\u0002\u0002\u0002z}\u0003\u0002\u0002",
    "\u0002{y\u0003\u0002\u0002\u0002{|\u0003\u0002\u0002\u0002|\u0019\u0003",
    "\u0002\u0002\u0002}{\u0003\u0002\u0002\u0002~\u007f\u0007\u000b\u0002",
    "\u0002\u007f\u0080\u0005\u001c\u000f\u0002\u0080\u001b\u0003\u0002\u0002",
    "\u0002\u0081\u0083\u0007\u001b\u0002\u0002\u0082\u0084\u0007\u001b\u0002",
    "\u0002\u0083\u0082\u0003\u0002\u0002\u0002\u0083\u0084\u0003\u0002\u0002",
    "\u0002\u0084\u001d\u0003\u0002\u0002\u0002\u0085\u0086\u0007\f\u0002",
    "\u0002\u0086\u0087\u0007\u001b\u0002\u0002\u0087\u001f\u0003\u0002\u0002",
    "\u0002\u0088\u0089\u0007\r\u0002\u0002\u0089\u008a\u0007\u001b\u0002",
    "\u0002\u008a!\u0003\u0002\u0002\u0002\u008b\u008c\u0007\u000e\u0002",
    "\u0002\u008c\u008d\u0005$\u0013\u0002\u008d#\u0003\u0002\u0002\u0002",
    "\u008e\u0090\u0007\u001f\u0002\u0002\u008f\u008e\u0003\u0002\u0002\u0002",
    "\u0090\u0093\u0003\u0002\u0002\u0002\u0091\u008f\u0003\u0002\u0002\u0002",
    "\u0091\u0092\u0003\u0002\u0002\u0002\u0092%\u0003\u0002\u0002\u0002",
    "\u0093\u0091\u0003\u0002\u0002\u0002\u0094\u0098\u0007\u001a\u0002\u0002",
    "\u0095\u0097\t\u0003\u0002\u0002\u0096\u0095\u0003\u0002\u0002\u0002",
    "\u0097\u009a\u0003\u0002\u0002\u0002\u0098\u0096\u0003\u0002\u0002\u0002",
    "\u0098\u0099\u0003\u0002\u0002\u0002\u0099\'\u0003\u0002\u0002\u0002",
    "\u009a\u0098\u0003\u0002\u0002\u0002\u009b\u009c\u0007\u001e\u0002\u0002",
    "\u009c\u00ab\u0005*\u0016\u0002\u009d\u009e\u0007\u001c\u0002\u0002",
    "\u009e\u00ab\u0005*\u0016\u0002\u009f\u00a0\u0007 \u0002\u0002\u00a0",
    "\u00ab\u0005*\u0016\u0002\u00a1\u00a2\u0007\u000f\u0002\u0002\u00a2",
    "\u00a3\u0005(\u0015\u0002\u00a3\u00a4\u0005*\u0016\u0002\u00a4\u00ab",
    "\u0003\u0002\u0002\u0002\u00a5\u00a6\u0007\u0010\u0002\u0002\u00a6\u00a7",
    "\u0005(\u0015\u0002\u00a7\u00a8\u0007\u0011\u0002\u0002\u00a8\u00a9",
    "\u0005*\u0016\u0002\u00a9\u00ab\u0003\u0002\u0002\u0002\u00aa\u009b",
    "\u0003\u0002\u0002\u0002\u00aa\u009d\u0003\u0002\u0002\u0002\u00aa\u009f",
    "\u0003\u0002\u0002\u0002\u00aa\u00a1\u0003\u0002\u0002\u0002\u00aa\u00a5",
    "\u0003\u0002\u0002\u0002\u00ab)\u0003\u0002\u0002\u0002\u00ac\u00ad",
    "\u0007\u0006\u0002\u0002\u00ad\u00ae\u0005(\u0015\u0002\u00ae\u00af",
    "\u0005*\u0016\u0002\u00af\u00b6\u0003\u0002\u0002\u0002\u00b0\u00b1",
    "\u0007\u0012\u0002\u0002\u00b1\u00b2\u0005(\u0015\u0002\u00b2\u00b3",
    "\u0005*\u0016\u0002\u00b3\u00b6\u0003\u0002\u0002\u0002\u00b4\u00b6",
    "\u0003\u0002\u0002\u0002\u00b5\u00ac\u0003\u0002\u0002\u0002\u00b5\u00b0",
    "\u0003\u0002\u0002\u0002\u00b5\u00b4\u0003\u0002\u0002\u0002\u00b6+",
    "\u0003\u0002\u0002\u0002\u00b7\u00b8\u0007\u001f\u0002\u0002\u00b8\u00ba",
    "\u0007\u0010\u0002\u0002\u00b9\u00bb\u0007\u000f\u0002\u0002\u00ba\u00b9",
    "\u0003\u0002\u0002\u0002\u00ba\u00bb\u0003\u0002\u0002\u0002\u00bb\u00bc",
    "\u0003\u0002\u0002\u0002\u00bc\u00bd\u0007\u001c\u0002\u0002\u00bd\u00be",
    "\u0007\u0011\u0002\u0002\u00be\u00c7\u0005.\u0018\u0002\u00bf\u00c0",
    "\u0007\u0010\u0002\u0002\u00c0\u00c1\u0005,\u0017\u0002\u00c1\u00c2",
    "\u0007\u0011\u0002\u0002\u00c2\u00c3\u0005.\u0018\u0002\u00c3\u00c7",
    "\u0003\u0002\u0002\u0002\u00c4\u00c5\u0007\u001e\u0002\u0002\u00c5\u00c7",
    "\u0005.\u0018\u0002\u00c6\u00b7\u0003\u0002\u0002\u0002\u00c6\u00bf",
    "\u0003\u0002\u0002\u0002\u00c6\u00c4\u0003\u0002\u0002\u0002\u00c7-",
    "\u0003\u0002\u0002\u0002\u00c8\u00c9\u0007\u0006\u0002\u0002\u00c9\u00ca",
    "\u0005,\u0017\u0002\u00ca\u00cb\u0005.\u0018\u0002\u00cb\u00d2\u0003",
    "\u0002\u0002\u0002\u00cc\u00cd\u0007\u0012\u0002\u0002\u00cd\u00ce\u0005",
    ",\u0017\u0002\u00ce\u00cf\u0005.\u0018\u0002\u00cf\u00d2\u0003\u0002",
    "\u0002\u0002\u00d0\u00d2\u0003\u0002\u0002\u0002\u00d1\u00c8\u0003\u0002",
    "\u0002\u0002\u00d1\u00cc\u0003\u0002\u0002\u0002\u00d1\u00d0\u0003\u0002",
    "\u0002\u0002\u00d2/\u0003\u0002\u0002\u0002\u00d3\u00d5\u00052\u001a",
    "\u0002\u00d4\u00d3\u0003\u0002\u0002\u0002\u00d5\u00d8\u0003\u0002\u0002",
    "\u0002\u00d6\u00d4\u0003\u0002\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002",
    "\u0002\u00d71\u0003\u0002\u0002\u0002\u00d8\u00d6\u0003\u0002\u0002",
    "\u0002\u00d9\u00dd\u00054\u001b\u0002\u00da\u00dc\u00058\u001d\u0002",
    "\u00db\u00da\u0003\u0002\u0002\u0002\u00dc\u00df\u0003\u0002\u0002\u0002",
    "\u00dd\u00db\u0003\u0002\u0002\u0002\u00dd\u00de\u0003\u0002\u0002\u0002",
    "\u00de3\u0003\u0002\u0002\u0002\u00df\u00dd\u0003\u0002\u0002\u0002",
    "\u00e0\u00e2\u0007\u0013\u0002\u0002\u00e1\u00e3\u0005:\u001e\u0002",
    "\u00e2\u00e1\u0003\u0002\u0002\u0002\u00e2\u00e3\u0003\u0002\u0002\u0002",
    "\u00e3\u00e4\u0003\u0002\u0002\u0002\u00e4\u00e6\u0007\u001c\u0002\u0002",
    "\u00e5\u00e7\u0007\u001b\u0002\u0002\u00e6\u00e5\u0003\u0002\u0002\u0002",
    "\u00e6\u00e7\u0003\u0002\u0002\u0002\u00e7\u00e9\u0003\u0002\u0002\u0002",
    "\u00e8\u00ea\u00056\u001c\u0002\u00e9\u00e8\u0003\u0002\u0002\u0002",
    "\u00e9\u00ea\u0003\u0002\u0002\u0002\u00ea5\u0003\u0002\u0002\u0002",
    "\u00eb\u00ef\u0007\u0014\u0002\u0002\u00ec\u00ee\u0007\u001c\u0002\u0002",
    "\u00ed\u00ec\u0003\u0002\u0002\u0002\u00ee\u00f1\u0003\u0002\u0002\u0002",
    "\u00ef\u00ed\u0003\u0002\u0002\u0002\u00ef\u00f0\u0003\u0002\u0002\u0002",
    "\u00f0\u00f2\u0003\u0002\u0002\u0002\u00f1\u00ef\u0003\u0002\u0002\u0002",
    "\u00f2\u00f3\u0007\u0015\u0002\u0002\u00f37\u0003\u0002\u0002\u0002",
    "\u00f4\u00f6\u0005:\u001e\u0002\u00f5\u00f4\u0003\u0002\u0002\u0002",
    "\u00f5\u00f6\u0003\u0002\u0002\u0002\u00f6\u00f7\u0003\u0002\u0002\u0002",
    "\u00f7\u00f9\u0005\u000e\b\u0002\u00f8\u00fa\u00056\u001c\u0002\u00f9",
    "\u00f8\u0003\u0002\u0002\u0002\u00f9\u00fa\u0003\u0002\u0002\u0002\u00fa",
    "9\u0003\u0002\u0002\u0002\u00fb\u00fc\u0007\u0016\u0002\u0002\u00fc",
    "\u00fd\u0005(\u0015\u0002\u00fd\u00fe\u0007\u0017\u0002\u0002\u00fe",
    ";\u0003\u0002\u0002\u0002\u0017EVbi{\u0083\u0091\u0098\u00aa\u00b5\u00ba",
    "\u00c6\u00d1\u00d6\u00dd\u00e2\u00e6\u00e9\u00ef\u00f5\u00f9"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'HOA:'", "'States:'", "'Start:'", "'&'", "'AP:'", 
                     "'Alias:'", "'Acceptance:'", "'acc-name:'", "'tool:'", 
                     "'name:'", "'positions:'", "'properties:'", "'!'", 
                     "'('", "')'", "'|'", "'State:'", "'{'", "'}'", "'['", 
                     "']'", "'--BODY--'", "'--END--'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, "BODYDELIM", "ENDDELIM", "HEADERNAME", 
                      "STRING", "INT", "WHITESPACE", "BOOLEAN", "IDENTIFIER", 
                      "ANAME", "COMMENT" ];

var ruleNames =  [ "automaton", "header", "formatVersion", "headerItem", 
                   "states", "start", "stateConj", "ap", "alias", "acceptance", 
                   "accname", "accstr", "tool", "toolstr", "name", "positions", 
                   "props", "propval", "etc", "lexpr", "lexpr2", "acceptanceCond", 
                   "acceptanceCond2", "body", "vertex", "stateName", "accSig", 
                   "edge", "label" ];

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
hoaParser.BODYDELIM = 22;
hoaParser.ENDDELIM = 23;
hoaParser.HEADERNAME = 24;
hoaParser.STRING = 25;
hoaParser.INT = 26;
hoaParser.WHITESPACE = 27;
hoaParser.BOOLEAN = 28;
hoaParser.IDENTIFIER = 29;
hoaParser.ANAME = 30;
hoaParser.COMMENT = 31;

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
hoaParser.RULE_lexpr2 = 20;
hoaParser.RULE_acceptanceCond = 21;
hoaParser.RULE_acceptanceCond2 = 22;
hoaParser.RULE_body = 23;
hoaParser.RULE_vertex = 24;
hoaParser.RULE_stateName = 25;
hoaParser.RULE_accSig = 26;
hoaParser.RULE_edge = 27;
hoaParser.RULE_label = 28;


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
        this.state = 58;
        this.header();
        this.state = 59;
        this.match(hoaParser.BODYDELIM);
        this.state = 60;
        this.body();
        this.state = 61;
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
        this.state = 63;
        this.formatVersion();
        this.state = 67;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.T__1) | (1 << hoaParser.T__2) | (1 << hoaParser.T__4) | (1 << hoaParser.T__5) | (1 << hoaParser.T__6) | (1 << hoaParser.T__7) | (1 << hoaParser.T__8) | (1 << hoaParser.T__9) | (1 << hoaParser.T__10) | (1 << hoaParser.T__11) | (1 << hoaParser.HEADERNAME))) !== 0)) {
            this.state = 64;
            this.headerItem();
            this.state = 69;
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
        this.state = 70;
        this.match(hoaParser.T__0);
        this.state = 71;
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
        this.state = 84;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case hoaParser.T__1:
            this.enterOuterAlt(localctx, 1);
            this.state = 73;
            this.states();
            break;
        case hoaParser.T__2:
            this.enterOuterAlt(localctx, 2);
            this.state = 74;
            this.start();
            break;
        case hoaParser.T__4:
            this.enterOuterAlt(localctx, 3);
            this.state = 75;
            this.ap();
            break;
        case hoaParser.T__5:
            this.enterOuterAlt(localctx, 4);
            this.state = 76;
            this.alias();
            break;
        case hoaParser.T__6:
            this.enterOuterAlt(localctx, 5);
            this.state = 77;
            this.acceptance();
            break;
        case hoaParser.T__7:
            this.enterOuterAlt(localctx, 6);
            this.state = 78;
            this.accname();
            break;
        case hoaParser.T__8:
            this.enterOuterAlt(localctx, 7);
            this.state = 79;
            this.tool();
            break;
        case hoaParser.T__9:
            this.enterOuterAlt(localctx, 8);
            this.state = 80;
            this.name();
            break;
        case hoaParser.T__10:
            this.enterOuterAlt(localctx, 9);
            this.state = 81;
            this.positions();
            break;
        case hoaParser.T__11:
            this.enterOuterAlt(localctx, 10);
            this.state = 82;
            this.props();
            break;
        case hoaParser.HEADERNAME:
            this.enterOuterAlt(localctx, 11);
            this.state = 83;
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
        this.state = 86;
        this.match(hoaParser.T__1);
        this.state = 87;
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
        this.state = 89;
        this.match(hoaParser.T__2);
        this.state = 90;
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
        this.state = 96;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 92;
            this.match(hoaParser.INT);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 93;
            this.match(hoaParser.INT);
            this.state = 94;
            this.match(hoaParser.T__3);
            this.state = 95;
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
        this.state = 98;
        this.match(hoaParser.T__4);
        this.state = 99;
        this.match(hoaParser.INT);
        this.state = 103;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.STRING) {
            this.state = 100;
            this.match(hoaParser.STRING);
            this.state = 105;
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
        this.state = 106;
        this.match(hoaParser.T__5);
        this.state = 107;
        this.match(hoaParser.ANAME);
        this.state = 108;
        this.lexpr();
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
        this.state = 110;
        this.match(hoaParser.T__6);
        this.state = 111;
        this.match(hoaParser.INT);
        this.state = 112;
        this.acceptanceCond();
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
        this.state = 114;
        this.match(hoaParser.T__7);
        this.state = 115;
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
        this.state = 117;
        this.match(hoaParser.IDENTIFIER);
        this.state = 121;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0)) {
            this.state = 118;
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0))) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 123;
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
        this.state = 124;
        this.match(hoaParser.T__8);
        this.state = 125;
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
        this.state = 127;
        this.match(hoaParser.STRING);
        this.state = 129;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.STRING) {
            this.state = 128;
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
        this.state = 131;
        this.match(hoaParser.T__9);
        this.state = 132;
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
        this.state = 134;
        this.match(hoaParser.T__10);
        this.state = 135;
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
        this.state = 137;
        this.match(hoaParser.T__11);
        this.state = 138;
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
        this.state = 143;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.IDENTIFIER) {
            this.state = 140;
            this.match(hoaParser.IDENTIFIER);
            this.state = 145;
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
        this.state = 146;
        this.match(hoaParser.HEADERNAME);
        this.state = 150;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.STRING) | (1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0)) {
            this.state = 147;
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << hoaParser.STRING) | (1 << hoaParser.INT) | (1 << hoaParser.BOOLEAN) | (1 << hoaParser.IDENTIFIER))) !== 0))) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 152;
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

LexprContext.prototype.lexpr2 = function() {
    return this.getTypedRuleContext(Lexpr2Context,0);
};

LexprContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

LexprContext.prototype.ANAME = function() {
    return this.getToken(hoaParser.ANAME, 0);
};

LexprContext.prototype.lexpr = function() {
    return this.getTypedRuleContext(LexprContext,0);
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




hoaParser.LexprContext = LexprContext;

hoaParser.prototype.lexpr = function() {

    var localctx = new LexprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, hoaParser.RULE_lexpr);
    try {
        this.state = 168;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case hoaParser.BOOLEAN:
            this.enterOuterAlt(localctx, 1);
            this.state = 153;
            this.match(hoaParser.BOOLEAN);
            this.state = 154;
            this.lexpr2();
            break;
        case hoaParser.INT:
            this.enterOuterAlt(localctx, 2);
            this.state = 155;
            this.match(hoaParser.INT);
            this.state = 156;
            this.lexpr2();
            break;
        case hoaParser.ANAME:
            this.enterOuterAlt(localctx, 3);
            this.state = 157;
            this.match(hoaParser.ANAME);
            this.state = 158;
            this.lexpr2();
            break;
        case hoaParser.T__12:
            this.enterOuterAlt(localctx, 4);
            this.state = 159;
            this.match(hoaParser.T__12);
            this.state = 160;
            this.lexpr();
            this.state = 161;
            this.lexpr2();
            break;
        case hoaParser.T__13:
            this.enterOuterAlt(localctx, 5);
            this.state = 163;
            this.match(hoaParser.T__13);
            this.state = 164;
            this.lexpr();
            this.state = 165;
            this.match(hoaParser.T__14);
            this.state = 166;
            this.lexpr2();
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


function Lexpr2Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_lexpr2;
    return this;
}

Lexpr2Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Lexpr2Context.prototype.constructor = Lexpr2Context;

Lexpr2Context.prototype.lexpr = function() {
    return this.getTypedRuleContext(LexprContext,0);
};

Lexpr2Context.prototype.lexpr2 = function() {
    return this.getTypedRuleContext(Lexpr2Context,0);
};

Lexpr2Context.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterLexpr2(this);
	}
};

Lexpr2Context.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitLexpr2(this);
	}
};




hoaParser.Lexpr2Context = Lexpr2Context;

hoaParser.prototype.lexpr2 = function() {

    var localctx = new Lexpr2Context(this, this._ctx, this.state);
    this.enterRule(localctx, 40, hoaParser.RULE_lexpr2);
    try {
        this.state = 179;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 170;
            this.match(hoaParser.T__3);
            this.state = 171;
            this.lexpr();
            this.state = 172;
            this.lexpr2();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 174;
            this.match(hoaParser.T__15);
            this.state = 175;
            this.lexpr();
            this.state = 176;
            this.lexpr2();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);

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

AcceptanceCondContext.prototype.IDENTIFIER = function() {
    return this.getToken(hoaParser.IDENTIFIER, 0);
};

AcceptanceCondContext.prototype.INT = function() {
    return this.getToken(hoaParser.INT, 0);
};

AcceptanceCondContext.prototype.acceptanceCond2 = function() {
    return this.getTypedRuleContext(AcceptanceCond2Context,0);
};

AcceptanceCondContext.prototype.acceptanceCond = function() {
    return this.getTypedRuleContext(AcceptanceCondContext,0);
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




hoaParser.AcceptanceCondContext = AcceptanceCondContext;

hoaParser.prototype.acceptanceCond = function() {

    var localctx = new AcceptanceCondContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, hoaParser.RULE_acceptanceCond);
    var _la = 0; // Token type
    try {
        this.state = 196;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case hoaParser.IDENTIFIER:
            this.enterOuterAlt(localctx, 1);
            this.state = 181;
            this.match(hoaParser.IDENTIFIER);
            this.state = 182;
            this.match(hoaParser.T__13);
            this.state = 184;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===hoaParser.T__12) {
                this.state = 183;
                this.match(hoaParser.T__12);
            }

            this.state = 186;
            this.match(hoaParser.INT);
            this.state = 187;
            this.match(hoaParser.T__14);
            this.state = 188;
            this.acceptanceCond2();
            break;
        case hoaParser.T__13:
            this.enterOuterAlt(localctx, 2);
            this.state = 189;
            this.match(hoaParser.T__13);
            this.state = 190;
            this.acceptanceCond();
            this.state = 191;
            this.match(hoaParser.T__14);
            this.state = 192;
            this.acceptanceCond2();
            break;
        case hoaParser.BOOLEAN:
            this.enterOuterAlt(localctx, 3);
            this.state = 194;
            this.match(hoaParser.BOOLEAN);
            this.state = 195;
            this.acceptanceCond2();
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


function AcceptanceCond2Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = hoaParser.RULE_acceptanceCond2;
    return this;
}

AcceptanceCond2Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AcceptanceCond2Context.prototype.constructor = AcceptanceCond2Context;

AcceptanceCond2Context.prototype.acceptanceCond = function() {
    return this.getTypedRuleContext(AcceptanceCondContext,0);
};

AcceptanceCond2Context.prototype.acceptanceCond2 = function() {
    return this.getTypedRuleContext(AcceptanceCond2Context,0);
};

AcceptanceCond2Context.prototype.enterRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.enterAcceptanceCond2(this);
	}
};

AcceptanceCond2Context.prototype.exitRule = function(listener) {
    if(listener instanceof hoaListener ) {
        listener.exitAcceptanceCond2(this);
	}
};




hoaParser.AcceptanceCond2Context = AcceptanceCond2Context;

hoaParser.prototype.acceptanceCond2 = function() {

    var localctx = new AcceptanceCond2Context(this, this._ctx, this.state);
    this.enterRule(localctx, 44, hoaParser.RULE_acceptanceCond2);
    try {
        this.state = 207;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 198;
            this.match(hoaParser.T__3);
            this.state = 199;
            this.acceptanceCond();
            this.state = 200;
            this.acceptanceCond2();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 202;
            this.match(hoaParser.T__15);
            this.state = 203;
            this.acceptanceCond();
            this.state = 204;
            this.acceptanceCond2();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);

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
    this.enterRule(localctx, 46, hoaParser.RULE_body);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 212;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.T__16) {
            this.state = 209;
            this.vertex();
            this.state = 214;
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
    this.enterRule(localctx, 48, hoaParser.RULE_vertex);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 215;
        this.stateName();
        this.state = 219;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.T__19 || _la===hoaParser.INT) {
            this.state = 216;
            this.edge();
            this.state = 221;
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
    this.enterRule(localctx, 50, hoaParser.RULE_stateName);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 222;
        this.match(hoaParser.T__16);
        this.state = 224;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__19) {
            this.state = 223;
            this.label();
        }

        this.state = 226;
        this.match(hoaParser.INT);
        this.state = 228;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.STRING) {
            this.state = 227;
            this.match(hoaParser.STRING);
        }

        this.state = 231;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__17) {
            this.state = 230;
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
    this.enterRule(localctx, 52, hoaParser.RULE_accSig);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 233;
        this.match(hoaParser.T__17);
        this.state = 237;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===hoaParser.INT) {
            this.state = 234;
            this.match(hoaParser.INT);
            this.state = 239;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 240;
        this.match(hoaParser.T__18);
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
    this.enterRule(localctx, 54, hoaParser.RULE_edge);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 243;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__19) {
            this.state = 242;
            this.label();
        }

        this.state = 245;
        this.stateConj();
        this.state = 247;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===hoaParser.T__17) {
            this.state = 246;
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
    this.enterRule(localctx, 56, hoaParser.RULE_label);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 249;
        this.match(hoaParser.T__19);
        this.state = 250;
        this.lexpr();
        this.state = 251;
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


exports.hoaParser = hoaParser;
