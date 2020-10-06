//@ts-nocheck

const antlr4 = require('antlr4/index');
const hoaLexer = require('./hoaLexer');
const hoaParser = require('./hoaParser');
const listener = require('./listenerImplementation').hoaListenerImpl;
const HOA = require('../hoaObject').HOA;


/**
 * Parses hoa string
 * @param  {string} input string in hoa format
 * @returns {HOA} automaton object
 */
export function parse(input) {
    var chars = new antlr4.InputStream(input);
    var lexer = new hoaLexer.hoaLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new hoaParser.hoaParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.automaton();
    var list = new listener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(list, tree);
    return list.data;
}
