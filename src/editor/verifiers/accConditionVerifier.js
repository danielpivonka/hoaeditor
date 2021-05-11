const antlr4 = require('antlr4/index');
const hoaLexer = require('../../parser/generated/hoaLexer');
const hoaParser = require('../../parser/generated/hoaParser');
const Automaton = require('../../hoaData/automaton').Automaton;

function verifyAccCond(accCond,automaton) {
    let chars = new antlr4.InputStream(accCond);
    let lexer = new hoaLexer.hoaLexer(chars);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser = new hoaParser.hoaParser(tokens);
    parser.buildParseTrees = true;
    let success = true;
    parser.removeErrorListeners();
    parser.addErrorListener({
        syntaxError: () => {
            success = false;
        },
        reportAmbiguity: () => { },
        reportAttemptingFullContext: () => { },
        reportContextSensitivity: () => { },
    });
    let parsed = parser.acceptanceCond().getText();
    return success && parsed == accCond && areNumbersValid(parsed,automaton);
}
/**
 * @param  {string} text
 * @param  {Automaton} automaton
 * @returns {boolean}
 */
function areNumbersValid(text,automaton) {
    let maxAccSet = automaton.acceptance.count;
    let matcher = /\d+/g
    let matches = [...text.matchAll(matcher)];
    return matches.every(e => e < maxAccSet && e>=0);

}


exports.verifyAccCond = verifyAccCond;