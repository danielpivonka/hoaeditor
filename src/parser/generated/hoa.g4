grammar hoa;
automaton: header BODYDELIM body ENDDELIM;
header: formatVersion headerItem*;
formatVersion: 'HOA:' IDENTIFIER;
headerItem:
	states
	| start
	| ap
	| alias
	| acceptance
	| accname
	| tool
	| name
	| positions
	| props
	| etc;
states: 'States:' INT;
start: 'Start:' stateConj;
stateConj: INT | INT '&' stateConj;
ap: 'AP:' INT STRING*;
alias: 'Alias:' ANAME lexpr;
acceptance: 'Acceptance:' INT acceptanceCond;
accname: 'acc-name:' accstr;
accstr: IDENTIFIER (BOOLEAN | INT | IDENTIFIER)*;
tool: 'tool:' toolstr;
toolstr: STRING STRING?;
name: 'name:' STRING;
positions: 'positions:' STRING;
props: 'properties:' propval;
propval: IDENTIFIER*;
etc: HEADERNAME (BOOLEAN | INT | STRING | IDENTIFIER)*;
lexpr:
	BOOLEAN lexpr2
	| INT lexpr2
	| ANAME lexpr2
	| '!' lexpr lexpr2
	| '(' lexpr ')' lexpr2;
lexpr2: '&' lexpr lexpr2 | '|' lexpr lexpr2 |;
acceptanceCond:
	IDENTIFIER '(' '!'? INT ')' acceptanceCond2
	| '(' acceptanceCond ')' acceptanceCond2
	| BOOLEAN acceptanceCond2;
acceptanceCond2:
	'&' acceptanceCond acceptanceCond2
	| '|' acceptanceCond acceptanceCond2
	|;

body: vertex*;
vertex: stateName edge*;
stateName: 'State:' label? INT STRING? accSig?;
accSig: '{' INT* '}';
edge: label? stateConj accSig?;
label: '[' lexpr ']';
BODYDELIM: '--BODY--';
ENDDELIM: '--END--';
HEADERNAME: [a-zA-Z_][0-9a-zA-Z_-]* ':';
STRING: '"' ('\\' . | ~[\\"])* '"';
INT: '0' | [1-9][0-9]*;
WHITESPACE: (' ' | '\r' | '\t' | '\n') -> skip;
BOOLEAN: [tf];
IDENTIFIER: [a-zA-Z_][0-9a-zA-Z_-]*;
ANAME: '@' [0-9a-zA-Z_-]+;

COMMENT: '/*' .*? '*/' -> skip;
