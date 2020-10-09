// Generated from /home/daniel/Desktop/bakalarka/hoaeditor/src/parser/generated/hoa.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class hoaParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, BODYDELIM=21, ENDDELIM=22, HEADERNAME=23, 
		STRING=24, INT=25, WHITESPACE=26, BOOLEAN=27, IDENTIFIER=28, ANAME=29, 
		COMMENT=30;
	public static final int
		RULE_automaton = 0, RULE_header = 1, RULE_formatVersion = 2, RULE_headerItem = 3, 
		RULE_states = 4, RULE_start = 5, RULE_stateConj = 6, RULE_ap = 7, RULE_alias = 8, 
		RULE_acceptance = 9, RULE_accname = 10, RULE_accstr = 11, RULE_tool = 12, 
		RULE_toolstr = 13, RULE_name = 14, RULE_props = 15, RULE_propval = 16, 
		RULE_etc = 17, RULE_lexpr = 18, RULE_lexpr2 = 19, RULE_acceptanceCond = 20, 
		RULE_acceptanceCond2 = 21, RULE_body = 22, RULE_vertex = 23, RULE_stateName = 24, 
		RULE_accSig = 25, RULE_edge = 26, RULE_label = 27;
	private static String[] makeRuleNames() {
		return new String[] {
			"automaton", "header", "formatVersion", "headerItem", "states", "start", 
			"stateConj", "ap", "alias", "acceptance", "accname", "accstr", "tool", 
			"toolstr", "name", "props", "propval", "etc", "lexpr", "lexpr2", "acceptanceCond", 
			"acceptanceCond2", "body", "vertex", "stateName", "accSig", "edge", "label"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'HOA:'", "'States:'", "'Start:'", "'&'", "'AP:'", "'Alias:'", 
			"'Acceptance:'", "'acc-name:'", "'tool:'", "'name:'", "'properties:'", 
			"'!'", "'('", "')'", "'|'", "'State:'", "'{'", "'}'", "'['", "']'", "'--BODY--'", 
			"'--END--'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, "BODYDELIM", "ENDDELIM", 
			"HEADERNAME", "STRING", "INT", "WHITESPACE", "BOOLEAN", "IDENTIFIER", 
			"ANAME", "COMMENT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "hoa.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public hoaParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class AutomatonContext extends ParserRuleContext {
		public HeaderContext header() {
			return getRuleContext(HeaderContext.class,0);
		}
		public TerminalNode BODYDELIM() { return getToken(hoaParser.BODYDELIM, 0); }
		public BodyContext body() {
			return getRuleContext(BodyContext.class,0);
		}
		public TerminalNode ENDDELIM() { return getToken(hoaParser.ENDDELIM, 0); }
		public AutomatonContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_automaton; }
	}

	public final AutomatonContext automaton() throws RecognitionException {
		AutomatonContext _localctx = new AutomatonContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_automaton);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(56);
			header();
			setState(57);
			match(BODYDELIM);
			setState(58);
			body();
			setState(59);
			match(ENDDELIM);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HeaderContext extends ParserRuleContext {
		public FormatVersionContext formatVersion() {
			return getRuleContext(FormatVersionContext.class,0);
		}
		public List<HeaderItemContext> headerItem() {
			return getRuleContexts(HeaderItemContext.class);
		}
		public HeaderItemContext headerItem(int i) {
			return getRuleContext(HeaderItemContext.class,i);
		}
		public HeaderContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_header; }
	}

	public final HeaderContext header() throws RecognitionException {
		HeaderContext _localctx = new HeaderContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_header);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(61);
			formatVersion();
			setState(65);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__1) | (1L << T__2) | (1L << T__4) | (1L << T__5) | (1L << T__6) | (1L << T__7) | (1L << T__8) | (1L << T__9) | (1L << T__10) | (1L << HEADERNAME))) != 0)) {
				{
				{
				setState(62);
				headerItem();
				}
				}
				setState(67);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FormatVersionContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(hoaParser.IDENTIFIER, 0); }
		public FormatVersionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formatVersion; }
	}

	public final FormatVersionContext formatVersion() throws RecognitionException {
		FormatVersionContext _localctx = new FormatVersionContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_formatVersion);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(68);
			match(T__0);
			setState(69);
			match(IDENTIFIER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class HeaderItemContext extends ParserRuleContext {
		public StatesContext states() {
			return getRuleContext(StatesContext.class,0);
		}
		public StartContext start() {
			return getRuleContext(StartContext.class,0);
		}
		public ApContext ap() {
			return getRuleContext(ApContext.class,0);
		}
		public AliasContext alias() {
			return getRuleContext(AliasContext.class,0);
		}
		public AcceptanceContext acceptance() {
			return getRuleContext(AcceptanceContext.class,0);
		}
		public AccnameContext accname() {
			return getRuleContext(AccnameContext.class,0);
		}
		public ToolContext tool() {
			return getRuleContext(ToolContext.class,0);
		}
		public NameContext name() {
			return getRuleContext(NameContext.class,0);
		}
		public PropsContext props() {
			return getRuleContext(PropsContext.class,0);
		}
		public EtcContext etc() {
			return getRuleContext(EtcContext.class,0);
		}
		public HeaderItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_headerItem; }
	}

	public final HeaderItemContext headerItem() throws RecognitionException {
		HeaderItemContext _localctx = new HeaderItemContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_headerItem);
		try {
			setState(81);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				enterOuterAlt(_localctx, 1);
				{
				setState(71);
				states();
				}
				break;
			case T__2:
				enterOuterAlt(_localctx, 2);
				{
				setState(72);
				start();
				}
				break;
			case T__4:
				enterOuterAlt(_localctx, 3);
				{
				setState(73);
				ap();
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 4);
				{
				setState(74);
				alias();
				}
				break;
			case T__6:
				enterOuterAlt(_localctx, 5);
				{
				setState(75);
				acceptance();
				}
				break;
			case T__7:
				enterOuterAlt(_localctx, 6);
				{
				setState(76);
				accname();
				}
				break;
			case T__8:
				enterOuterAlt(_localctx, 7);
				{
				setState(77);
				tool();
				}
				break;
			case T__9:
				enterOuterAlt(_localctx, 8);
				{
				setState(78);
				name();
				}
				break;
			case T__10:
				enterOuterAlt(_localctx, 9);
				{
				setState(79);
				props();
				}
				break;
			case HEADERNAME:
				enterOuterAlt(_localctx, 10);
				{
				setState(80);
				etc();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StatesContext extends ParserRuleContext {
		public TerminalNode INT() { return getToken(hoaParser.INT, 0); }
		public StatesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_states; }
	}

	public final StatesContext states() throws RecognitionException {
		StatesContext _localctx = new StatesContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_states);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(83);
			match(T__1);
			setState(84);
			match(INT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StartContext extends ParserRuleContext {
		public StateConjContext stateConj() {
			return getRuleContext(StateConjContext.class,0);
		}
		public StartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_start; }
	}

	public final StartContext start() throws RecognitionException {
		StartContext _localctx = new StartContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_start);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(86);
			match(T__2);
			setState(87);
			stateConj();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StateConjContext extends ParserRuleContext {
		public TerminalNode INT() { return getToken(hoaParser.INT, 0); }
		public StateConjContext stateConj() {
			return getRuleContext(StateConjContext.class,0);
		}
		public StateConjContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stateConj; }
	}

	public final StateConjContext stateConj() throws RecognitionException {
		StateConjContext _localctx = new StateConjContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_stateConj);
		try {
			setState(93);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(89);
				match(INT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(90);
				match(INT);
				setState(91);
				match(T__3);
				setState(92);
				stateConj();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ApContext extends ParserRuleContext {
		public TerminalNode INT() { return getToken(hoaParser.INT, 0); }
		public List<TerminalNode> STRING() { return getTokens(hoaParser.STRING); }
		public TerminalNode STRING(int i) {
			return getToken(hoaParser.STRING, i);
		}
		public ApContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ap; }
	}

	public final ApContext ap() throws RecognitionException {
		ApContext _localctx = new ApContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_ap);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(95);
			match(T__4);
			setState(96);
			match(INT);
			setState(100);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==STRING) {
				{
				{
				setState(97);
				match(STRING);
				}
				}
				setState(102);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AliasContext extends ParserRuleContext {
		public TerminalNode ANAME() { return getToken(hoaParser.ANAME, 0); }
		public LexprContext lexpr() {
			return getRuleContext(LexprContext.class,0);
		}
		public AliasContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_alias; }
	}

	public final AliasContext alias() throws RecognitionException {
		AliasContext _localctx = new AliasContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_alias);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(103);
			match(T__5);
			setState(104);
			match(ANAME);
			setState(105);
			lexpr();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AcceptanceContext extends ParserRuleContext {
		public TerminalNode INT() { return getToken(hoaParser.INT, 0); }
		public AcceptanceCondContext acceptanceCond() {
			return getRuleContext(AcceptanceCondContext.class,0);
		}
		public AcceptanceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_acceptance; }
	}

	public final AcceptanceContext acceptance() throws RecognitionException {
		AcceptanceContext _localctx = new AcceptanceContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_acceptance);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(107);
			match(T__6);
			setState(108);
			match(INT);
			setState(109);
			acceptanceCond();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AccnameContext extends ParserRuleContext {
		public AccstrContext accstr() {
			return getRuleContext(AccstrContext.class,0);
		}
		public AccnameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_accname; }
	}

	public final AccnameContext accname() throws RecognitionException {
		AccnameContext _localctx = new AccnameContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_accname);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(111);
			match(T__7);
			setState(112);
			accstr();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AccstrContext extends ParserRuleContext {
		public List<TerminalNode> IDENTIFIER() { return getTokens(hoaParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(hoaParser.IDENTIFIER, i);
		}
		public List<TerminalNode> BOOLEAN() { return getTokens(hoaParser.BOOLEAN); }
		public TerminalNode BOOLEAN(int i) {
			return getToken(hoaParser.BOOLEAN, i);
		}
		public List<TerminalNode> INT() { return getTokens(hoaParser.INT); }
		public TerminalNode INT(int i) {
			return getToken(hoaParser.INT, i);
		}
		public AccstrContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_accstr; }
	}

	public final AccstrContext accstr() throws RecognitionException {
		AccstrContext _localctx = new AccstrContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_accstr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(114);
			match(IDENTIFIER);
			setState(118);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << INT) | (1L << BOOLEAN) | (1L << IDENTIFIER))) != 0)) {
				{
				{
				setState(115);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << INT) | (1L << BOOLEAN) | (1L << IDENTIFIER))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				}
				setState(120);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ToolContext extends ParserRuleContext {
		public ToolstrContext toolstr() {
			return getRuleContext(ToolstrContext.class,0);
		}
		public ToolContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tool; }
	}

	public final ToolContext tool() throws RecognitionException {
		ToolContext _localctx = new ToolContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_tool);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(121);
			match(T__8);
			setState(122);
			toolstr();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ToolstrContext extends ParserRuleContext {
		public List<TerminalNode> STRING() { return getTokens(hoaParser.STRING); }
		public TerminalNode STRING(int i) {
			return getToken(hoaParser.STRING, i);
		}
		public ToolstrContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_toolstr; }
	}

	public final ToolstrContext toolstr() throws RecognitionException {
		ToolstrContext _localctx = new ToolstrContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_toolstr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(124);
			match(STRING);
			setState(126);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STRING) {
				{
				setState(125);
				match(STRING);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NameContext extends ParserRuleContext {
		public TerminalNode STRING() { return getToken(hoaParser.STRING, 0); }
		public NameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_name; }
	}

	public final NameContext name() throws RecognitionException {
		NameContext _localctx = new NameContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_name);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(128);
			match(T__9);
			setState(129);
			match(STRING);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PropsContext extends ParserRuleContext {
		public PropvalContext propval() {
			return getRuleContext(PropvalContext.class,0);
		}
		public PropsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_props; }
	}

	public final PropsContext props() throws RecognitionException {
		PropsContext _localctx = new PropsContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_props);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(131);
			match(T__10);
			setState(132);
			propval();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PropvalContext extends ParserRuleContext {
		public List<TerminalNode> IDENTIFIER() { return getTokens(hoaParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(hoaParser.IDENTIFIER, i);
		}
		public PropvalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propval; }
	}

	public final PropvalContext propval() throws RecognitionException {
		PropvalContext _localctx = new PropvalContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_propval);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(137);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==IDENTIFIER) {
				{
				{
				setState(134);
				match(IDENTIFIER);
				}
				}
				setState(139);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EtcContext extends ParserRuleContext {
		public TerminalNode HEADERNAME() { return getToken(hoaParser.HEADERNAME, 0); }
		public List<TerminalNode> BOOLEAN() { return getTokens(hoaParser.BOOLEAN); }
		public TerminalNode BOOLEAN(int i) {
			return getToken(hoaParser.BOOLEAN, i);
		}
		public List<TerminalNode> INT() { return getTokens(hoaParser.INT); }
		public TerminalNode INT(int i) {
			return getToken(hoaParser.INT, i);
		}
		public List<TerminalNode> STRING() { return getTokens(hoaParser.STRING); }
		public TerminalNode STRING(int i) {
			return getToken(hoaParser.STRING, i);
		}
		public List<TerminalNode> IDENTIFIER() { return getTokens(hoaParser.IDENTIFIER); }
		public TerminalNode IDENTIFIER(int i) {
			return getToken(hoaParser.IDENTIFIER, i);
		}
		public EtcContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_etc; }
	}

	public final EtcContext etc() throws RecognitionException {
		EtcContext _localctx = new EtcContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_etc);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(140);
			match(HEADERNAME);
			setState(144);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << STRING) | (1L << INT) | (1L << BOOLEAN) | (1L << IDENTIFIER))) != 0)) {
				{
				{
				setState(141);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << STRING) | (1L << INT) | (1L << BOOLEAN) | (1L << IDENTIFIER))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				}
				setState(146);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LexprContext extends ParserRuleContext {
		public TerminalNode BOOLEAN() { return getToken(hoaParser.BOOLEAN, 0); }
		public Lexpr2Context lexpr2() {
			return getRuleContext(Lexpr2Context.class,0);
		}
		public TerminalNode INT() { return getToken(hoaParser.INT, 0); }
		public TerminalNode ANAME() { return getToken(hoaParser.ANAME, 0); }
		public LexprContext lexpr() {
			return getRuleContext(LexprContext.class,0);
		}
		public LexprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lexpr; }
	}

	public final LexprContext lexpr() throws RecognitionException {
		LexprContext _localctx = new LexprContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_lexpr);
		try {
			setState(162);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BOOLEAN:
				enterOuterAlt(_localctx, 1);
				{
				setState(147);
				match(BOOLEAN);
				setState(148);
				lexpr2();
				}
				break;
			case INT:
				enterOuterAlt(_localctx, 2);
				{
				setState(149);
				match(INT);
				setState(150);
				lexpr2();
				}
				break;
			case ANAME:
				enterOuterAlt(_localctx, 3);
				{
				setState(151);
				match(ANAME);
				setState(152);
				lexpr2();
				}
				break;
			case T__11:
				enterOuterAlt(_localctx, 4);
				{
				setState(153);
				match(T__11);
				setState(154);
				lexpr();
				setState(155);
				lexpr2();
				}
				break;
			case T__12:
				enterOuterAlt(_localctx, 5);
				{
				setState(157);
				match(T__12);
				setState(158);
				lexpr();
				setState(159);
				match(T__13);
				setState(160);
				lexpr2();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Lexpr2Context extends ParserRuleContext {
		public LexprContext lexpr() {
			return getRuleContext(LexprContext.class,0);
		}
		public Lexpr2Context lexpr2() {
			return getRuleContext(Lexpr2Context.class,0);
		}
		public Lexpr2Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_lexpr2; }
	}

	public final Lexpr2Context lexpr2() throws RecognitionException {
		Lexpr2Context _localctx = new Lexpr2Context(_ctx, getState());
		enterRule(_localctx, 38, RULE_lexpr2);
		try {
			setState(173);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(164);
				match(T__3);
				setState(165);
				lexpr();
				setState(166);
				lexpr2();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(168);
				match(T__14);
				setState(169);
				lexpr();
				setState(170);
				lexpr2();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AcceptanceCondContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(hoaParser.IDENTIFIER, 0); }
		public TerminalNode INT() { return getToken(hoaParser.INT, 0); }
		public AcceptanceCond2Context acceptanceCond2() {
			return getRuleContext(AcceptanceCond2Context.class,0);
		}
		public AcceptanceCondContext acceptanceCond() {
			return getRuleContext(AcceptanceCondContext.class,0);
		}
		public TerminalNode BOOLEAN() { return getToken(hoaParser.BOOLEAN, 0); }
		public AcceptanceCondContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_acceptanceCond; }
	}

	public final AcceptanceCondContext acceptanceCond() throws RecognitionException {
		AcceptanceCondContext _localctx = new AcceptanceCondContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_acceptanceCond);
		int _la;
		try {
			setState(190);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENTIFIER:
				enterOuterAlt(_localctx, 1);
				{
				setState(175);
				match(IDENTIFIER);
				setState(176);
				match(T__12);
				setState(178);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__11) {
					{
					setState(177);
					match(T__11);
					}
				}

				setState(180);
				match(INT);
				setState(181);
				match(T__13);
				setState(182);
				acceptanceCond2();
				}
				break;
			case T__12:
				enterOuterAlt(_localctx, 2);
				{
				setState(183);
				match(T__12);
				setState(184);
				acceptanceCond();
				setState(185);
				match(T__13);
				setState(186);
				acceptanceCond2();
				}
				break;
			case BOOLEAN:
				enterOuterAlt(_localctx, 3);
				{
				setState(188);
				match(BOOLEAN);
				setState(189);
				acceptanceCond2();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AcceptanceCond2Context extends ParserRuleContext {
		public AcceptanceCondContext acceptanceCond() {
			return getRuleContext(AcceptanceCondContext.class,0);
		}
		public AcceptanceCond2Context acceptanceCond2() {
			return getRuleContext(AcceptanceCond2Context.class,0);
		}
		public AcceptanceCond2Context(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_acceptanceCond2; }
	}

	public final AcceptanceCond2Context acceptanceCond2() throws RecognitionException {
		AcceptanceCond2Context _localctx = new AcceptanceCond2Context(_ctx, getState());
		enterRule(_localctx, 42, RULE_acceptanceCond2);
		try {
			setState(201);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(192);
				match(T__3);
				setState(193);
				acceptanceCond();
				setState(194);
				acceptanceCond2();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(196);
				match(T__14);
				setState(197);
				acceptanceCond();
				setState(198);
				acceptanceCond2();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BodyContext extends ParserRuleContext {
		public List<VertexContext> vertex() {
			return getRuleContexts(VertexContext.class);
		}
		public VertexContext vertex(int i) {
			return getRuleContext(VertexContext.class,i);
		}
		public BodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_body; }
	}

	public final BodyContext body() throws RecognitionException {
		BodyContext _localctx = new BodyContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_body);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(206);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__15) {
				{
				{
				setState(203);
				vertex();
				}
				}
				setState(208);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VertexContext extends ParserRuleContext {
		public StateNameContext stateName() {
			return getRuleContext(StateNameContext.class,0);
		}
		public List<EdgeContext> edge() {
			return getRuleContexts(EdgeContext.class);
		}
		public EdgeContext edge(int i) {
			return getRuleContext(EdgeContext.class,i);
		}
		public VertexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_vertex; }
	}

	public final VertexContext vertex() throws RecognitionException {
		VertexContext _localctx = new VertexContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_vertex);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(209);
			stateName();
			setState(213);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__18 || _la==INT) {
				{
				{
				setState(210);
				edge();
				}
				}
				setState(215);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StateNameContext extends ParserRuleContext {
		public TerminalNode INT() { return getToken(hoaParser.INT, 0); }
		public LabelContext label() {
			return getRuleContext(LabelContext.class,0);
		}
		public TerminalNode STRING() { return getToken(hoaParser.STRING, 0); }
		public AccSigContext accSig() {
			return getRuleContext(AccSigContext.class,0);
		}
		public StateNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stateName; }
	}

	public final StateNameContext stateName() throws RecognitionException {
		StateNameContext _localctx = new StateNameContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_stateName);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(216);
			match(T__15);
			setState(218);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__18) {
				{
				setState(217);
				label();
				}
			}

			setState(220);
			match(INT);
			setState(222);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STRING) {
				{
				setState(221);
				match(STRING);
				}
			}

			setState(225);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__16) {
				{
				setState(224);
				accSig();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AccSigContext extends ParserRuleContext {
		public List<TerminalNode> INT() { return getTokens(hoaParser.INT); }
		public TerminalNode INT(int i) {
			return getToken(hoaParser.INT, i);
		}
		public AccSigContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_accSig; }
	}

	public final AccSigContext accSig() throws RecognitionException {
		AccSigContext _localctx = new AccSigContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_accSig);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(227);
			match(T__16);
			setState(231);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INT) {
				{
				{
				setState(228);
				match(INT);
				}
				}
				setState(233);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(234);
			match(T__17);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EdgeContext extends ParserRuleContext {
		public StateConjContext stateConj() {
			return getRuleContext(StateConjContext.class,0);
		}
		public LabelContext label() {
			return getRuleContext(LabelContext.class,0);
		}
		public AccSigContext accSig() {
			return getRuleContext(AccSigContext.class,0);
		}
		public EdgeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_edge; }
	}

	public final EdgeContext edge() throws RecognitionException {
		EdgeContext _localctx = new EdgeContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_edge);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(237);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__18) {
				{
				setState(236);
				label();
				}
			}

			setState(239);
			stateConj();
			setState(241);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__16) {
				{
				setState(240);
				accSig();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LabelContext extends ParserRuleContext {
		public LexprContext lexpr() {
			return getRuleContext(LexprContext.class,0);
		}
		public LabelContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_label; }
	}

	public final LabelContext label() throws RecognitionException {
		LabelContext _localctx = new LabelContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_label);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(243);
			match(T__18);
			setState(244);
			lexpr();
			setState(245);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3 \u00fa\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\3\2\3\2\3\2\3\2\3\2\3\3\3\3\7"+
		"\3B\n\3\f\3\16\3E\13\3\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5"+
		"\3\5\5\5T\n\5\3\6\3\6\3\6\3\7\3\7\3\7\3\b\3\b\3\b\3\b\5\b`\n\b\3\t\3\t"+
		"\3\t\7\te\n\t\f\t\16\th\13\t\3\n\3\n\3\n\3\n\3\13\3\13\3\13\3\13\3\f\3"+
		"\f\3\f\3\r\3\r\7\rw\n\r\f\r\16\rz\13\r\3\16\3\16\3\16\3\17\3\17\5\17\u0081"+
		"\n\17\3\20\3\20\3\20\3\21\3\21\3\21\3\22\7\22\u008a\n\22\f\22\16\22\u008d"+
		"\13\22\3\23\3\23\7\23\u0091\n\23\f\23\16\23\u0094\13\23\3\24\3\24\3\24"+
		"\3\24\3\24\3\24\3\24\3\24\3\24\3\24\3\24\3\24\3\24\3\24\3\24\5\24\u00a5"+
		"\n\24\3\25\3\25\3\25\3\25\3\25\3\25\3\25\3\25\3\25\5\25\u00b0\n\25\3\26"+
		"\3\26\3\26\5\26\u00b5\n\26\3\26\3\26\3\26\3\26\3\26\3\26\3\26\3\26\3\26"+
		"\3\26\5\26\u00c1\n\26\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\3\27\5\27"+
		"\u00cc\n\27\3\30\7\30\u00cf\n\30\f\30\16\30\u00d2\13\30\3\31\3\31\7\31"+
		"\u00d6\n\31\f\31\16\31\u00d9\13\31\3\32\3\32\5\32\u00dd\n\32\3\32\3\32"+
		"\5\32\u00e1\n\32\3\32\5\32\u00e4\n\32\3\33\3\33\7\33\u00e8\n\33\f\33\16"+
		"\33\u00eb\13\33\3\33\3\33\3\34\5\34\u00f0\n\34\3\34\3\34\5\34\u00f4\n"+
		"\34\3\35\3\35\3\35\3\35\3\35\2\2\36\2\4\6\b\n\f\16\20\22\24\26\30\32\34"+
		"\36 \"$&(*,.\60\62\64\668\2\4\4\2\33\33\35\36\4\2\32\33\35\36\2\u0100"+
		"\2:\3\2\2\2\4?\3\2\2\2\6F\3\2\2\2\bS\3\2\2\2\nU\3\2\2\2\fX\3\2\2\2\16"+
		"_\3\2\2\2\20a\3\2\2\2\22i\3\2\2\2\24m\3\2\2\2\26q\3\2\2\2\30t\3\2\2\2"+
		"\32{\3\2\2\2\34~\3\2\2\2\36\u0082\3\2\2\2 \u0085\3\2\2\2\"\u008b\3\2\2"+
		"\2$\u008e\3\2\2\2&\u00a4\3\2\2\2(\u00af\3\2\2\2*\u00c0\3\2\2\2,\u00cb"+
		"\3\2\2\2.\u00d0\3\2\2\2\60\u00d3\3\2\2\2\62\u00da\3\2\2\2\64\u00e5\3\2"+
		"\2\2\66\u00ef\3\2\2\28\u00f5\3\2\2\2:;\5\4\3\2;<\7\27\2\2<=\5.\30\2=>"+
		"\7\30\2\2>\3\3\2\2\2?C\5\6\4\2@B\5\b\5\2A@\3\2\2\2BE\3\2\2\2CA\3\2\2\2"+
		"CD\3\2\2\2D\5\3\2\2\2EC\3\2\2\2FG\7\3\2\2GH\7\36\2\2H\7\3\2\2\2IT\5\n"+
		"\6\2JT\5\f\7\2KT\5\20\t\2LT\5\22\n\2MT\5\24\13\2NT\5\26\f\2OT\5\32\16"+
		"\2PT\5\36\20\2QT\5 \21\2RT\5$\23\2SI\3\2\2\2SJ\3\2\2\2SK\3\2\2\2SL\3\2"+
		"\2\2SM\3\2\2\2SN\3\2\2\2SO\3\2\2\2SP\3\2\2\2SQ\3\2\2\2SR\3\2\2\2T\t\3"+
		"\2\2\2UV\7\4\2\2VW\7\33\2\2W\13\3\2\2\2XY\7\5\2\2YZ\5\16\b\2Z\r\3\2\2"+
		"\2[`\7\33\2\2\\]\7\33\2\2]^\7\6\2\2^`\5\16\b\2_[\3\2\2\2_\\\3\2\2\2`\17"+
		"\3\2\2\2ab\7\7\2\2bf\7\33\2\2ce\7\32\2\2dc\3\2\2\2eh\3\2\2\2fd\3\2\2\2"+
		"fg\3\2\2\2g\21\3\2\2\2hf\3\2\2\2ij\7\b\2\2jk\7\37\2\2kl\5&\24\2l\23\3"+
		"\2\2\2mn\7\t\2\2no\7\33\2\2op\5*\26\2p\25\3\2\2\2qr\7\n\2\2rs\5\30\r\2"+
		"s\27\3\2\2\2tx\7\36\2\2uw\t\2\2\2vu\3\2\2\2wz\3\2\2\2xv\3\2\2\2xy\3\2"+
		"\2\2y\31\3\2\2\2zx\3\2\2\2{|\7\13\2\2|}\5\34\17\2}\33\3\2\2\2~\u0080\7"+
		"\32\2\2\177\u0081\7\32\2\2\u0080\177\3\2\2\2\u0080\u0081\3\2\2\2\u0081"+
		"\35\3\2\2\2\u0082\u0083\7\f\2\2\u0083\u0084\7\32\2\2\u0084\37\3\2\2\2"+
		"\u0085\u0086\7\r\2\2\u0086\u0087\5\"\22\2\u0087!\3\2\2\2\u0088\u008a\7"+
		"\36\2\2\u0089\u0088\3\2\2\2\u008a\u008d\3\2\2\2\u008b\u0089\3\2\2\2\u008b"+
		"\u008c\3\2\2\2\u008c#\3\2\2\2\u008d\u008b\3\2\2\2\u008e\u0092\7\31\2\2"+
		"\u008f\u0091\t\3\2\2\u0090\u008f\3\2\2\2\u0091\u0094\3\2\2\2\u0092\u0090"+
		"\3\2\2\2\u0092\u0093\3\2\2\2\u0093%\3\2\2\2\u0094\u0092\3\2\2\2\u0095"+
		"\u0096\7\35\2\2\u0096\u00a5\5(\25\2\u0097\u0098\7\33\2\2\u0098\u00a5\5"+
		"(\25\2\u0099\u009a\7\37\2\2\u009a\u00a5\5(\25\2\u009b\u009c\7\16\2\2\u009c"+
		"\u009d\5&\24\2\u009d\u009e\5(\25\2\u009e\u00a5\3\2\2\2\u009f\u00a0\7\17"+
		"\2\2\u00a0\u00a1\5&\24\2\u00a1\u00a2\7\20\2\2\u00a2\u00a3\5(\25\2\u00a3"+
		"\u00a5\3\2\2\2\u00a4\u0095\3\2\2\2\u00a4\u0097\3\2\2\2\u00a4\u0099\3\2"+
		"\2\2\u00a4\u009b\3\2\2\2\u00a4\u009f\3\2\2\2\u00a5\'\3\2\2\2\u00a6\u00a7"+
		"\7\6\2\2\u00a7\u00a8\5&\24\2\u00a8\u00a9\5(\25\2\u00a9\u00b0\3\2\2\2\u00aa"+
		"\u00ab\7\21\2\2\u00ab\u00ac\5&\24\2\u00ac\u00ad\5(\25\2\u00ad\u00b0\3"+
		"\2\2\2\u00ae\u00b0\3\2\2\2\u00af\u00a6\3\2\2\2\u00af\u00aa\3\2\2\2\u00af"+
		"\u00ae\3\2\2\2\u00b0)\3\2\2\2\u00b1\u00b2\7\36\2\2\u00b2\u00b4\7\17\2"+
		"\2\u00b3\u00b5\7\16\2\2\u00b4\u00b3\3\2\2\2\u00b4\u00b5\3\2\2\2\u00b5"+
		"\u00b6\3\2\2\2\u00b6\u00b7\7\33\2\2\u00b7\u00b8\7\20\2\2\u00b8\u00c1\5"+
		",\27\2\u00b9\u00ba\7\17\2\2\u00ba\u00bb\5*\26\2\u00bb\u00bc\7\20\2\2\u00bc"+
		"\u00bd\5,\27\2\u00bd\u00c1\3\2\2\2\u00be\u00bf\7\35\2\2\u00bf\u00c1\5"+
		",\27\2\u00c0\u00b1\3\2\2\2\u00c0\u00b9\3\2\2\2\u00c0\u00be\3\2\2\2\u00c1"+
		"+\3\2\2\2\u00c2\u00c3\7\6\2\2\u00c3\u00c4\5*\26\2\u00c4\u00c5\5,\27\2"+
		"\u00c5\u00cc\3\2\2\2\u00c6\u00c7\7\21\2\2\u00c7\u00c8\5*\26\2\u00c8\u00c9"+
		"\5,\27\2\u00c9\u00cc\3\2\2\2\u00ca\u00cc\3\2\2\2\u00cb\u00c2\3\2\2\2\u00cb"+
		"\u00c6\3\2\2\2\u00cb\u00ca\3\2\2\2\u00cc-\3\2\2\2\u00cd\u00cf\5\60\31"+
		"\2\u00ce\u00cd\3\2\2\2\u00cf\u00d2\3\2\2\2\u00d0\u00ce\3\2\2\2\u00d0\u00d1"+
		"\3\2\2\2\u00d1/\3\2\2\2\u00d2\u00d0\3\2\2\2\u00d3\u00d7\5\62\32\2\u00d4"+
		"\u00d6\5\66\34\2\u00d5\u00d4\3\2\2\2\u00d6\u00d9\3\2\2\2\u00d7\u00d5\3"+
		"\2\2\2\u00d7\u00d8\3\2\2\2\u00d8\61\3\2\2\2\u00d9\u00d7\3\2\2\2\u00da"+
		"\u00dc\7\22\2\2\u00db\u00dd\58\35\2\u00dc\u00db\3\2\2\2\u00dc\u00dd\3"+
		"\2\2\2\u00dd\u00de\3\2\2\2\u00de\u00e0\7\33\2\2\u00df\u00e1\7\32\2\2\u00e0"+
		"\u00df\3\2\2\2\u00e0\u00e1\3\2\2\2\u00e1\u00e3\3\2\2\2\u00e2\u00e4\5\64"+
		"\33\2\u00e3\u00e2\3\2\2\2\u00e3\u00e4\3\2\2\2\u00e4\63\3\2\2\2\u00e5\u00e9"+
		"\7\23\2\2\u00e6\u00e8\7\33\2\2\u00e7\u00e6\3\2\2\2\u00e8\u00eb\3\2\2\2"+
		"\u00e9\u00e7\3\2\2\2\u00e9\u00ea\3\2\2\2\u00ea\u00ec\3\2\2\2\u00eb\u00e9"+
		"\3\2\2\2\u00ec\u00ed\7\24\2\2\u00ed\65\3\2\2\2\u00ee\u00f0\58\35\2\u00ef"+
		"\u00ee\3\2\2\2\u00ef\u00f0\3\2\2\2\u00f0\u00f1\3\2\2\2\u00f1\u00f3\5\16"+
		"\b\2\u00f2\u00f4\5\64\33\2\u00f3\u00f2\3\2\2\2\u00f3\u00f4\3\2\2\2\u00f4"+
		"\67\3\2\2\2\u00f5\u00f6\7\25\2\2\u00f6\u00f7\5&\24\2\u00f7\u00f8\7\26"+
		"\2\2\u00f89\3\2\2\2\27CS_fx\u0080\u008b\u0092\u00a4\u00af\u00b4\u00c0"+
		"\u00cb\u00d0\u00d7\u00dc\u00e0\u00e3\u00e9\u00ef\u00f3";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}