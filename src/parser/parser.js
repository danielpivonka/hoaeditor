const antlr4 = require('antlr4/index');
const hoaLexer = require('./generated/hoaLexer');
const hoaParser = require('./generated/hoaParser');
const listener = require('./listenerImplementation').hoaListenerImpl;
const postParse = require('./postParse').postParse;
const Automaton = require('../hoaData/automaton').Automaton;

class Parser {
    constructor() {
        this.errors = [];
    }
    /**
     * Parses hoa string.
     * 
     * @param {string} input - String in hoa format.
     * @returns {Automaton} Automaton object.
     */
    parse(input) {
        this.errors = [];
        let chars = new antlr4.InputStream(input);
        let lexer = new hoaLexer.hoaLexer(chars);
        let tokens = new antlr4.CommonTokenStream(lexer);
        let parser = new hoaParser.hoaParser(tokens);
        parser.buildParseTrees = true;
        let failed = false;
        parser.removeErrorListeners();
        parser.addErrorListener({
            syntaxError: (recognizer, offendingSymbol, line, column, msg) => {
                failed = true;
                this.errors.push(line + ":" + column + " " + msg);
            },
            reportAmbiguity: () => {
            },
            reportAttemptingFullContext: () => {
            },
            reportContextSensitivity: () => {
            },
        });
        let tree = parser.automaton();
        if (failed) {
            return null;
        }

        let list = new listener();
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(list, tree);
        if (list.invalid) {
            this.errors.push("Invalid automaton header");
            return null;
        }
        if (!postParse(list.data, list.positions, this.errors)) {
            return null;
        }
        return list.data;
    }
}
exports.Parser = Parser;

