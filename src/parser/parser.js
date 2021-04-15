const antlr4 = require('antlr4/index');
const hoaLexer = require('./generated/hoaLexer');
const hoaParser = require('./generated/hoaParser');
const listener = require('./listenerImplementation').hoaListenerImpl;

const HOA = require('../hoaObject').HOA;


/**
 * Parses hoa string.
 * 
 * @param {string} input - String in hoa format.
 * @returns {HOA} Automaton object.
 */
function parse(input) {
    let chars = new antlr4.InputStream(input);
    let lexer = new hoaLexer.hoaLexer(chars);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser = new hoaParser.hoaParser(tokens);
    parser.buildParseTrees = true;
    let tree = parser.automaton();
    let list = new listener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(list, tree);
    return list.data;
}

exports.parse = parse;

