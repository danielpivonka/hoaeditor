const antlr4 = require('antlr4/index');
const hoaLexer = require('../../parser/generated/hoaLexer');
const hoaParser = require('../../parser/generated/hoaParser');
const Automaton = require('../../hoaData/automaton').Automaton;
/**
 * Verifies if acceptance acceptance condition is valid.
 * 
 * @param {string} accCond - Acceptance condition to check.
 * @param {Automaton} automaton - Automaton to which the acceptance condition belongs to.
 * @returns {boolean} Result of the check.
 */
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
    return success && parsed == accCond.replace(/\s+/g, '') && areNumbersValid(parsed,automaton);
}
/**
 * Verifies if acceptance set numbers in acceptance condition are valid.
 * 
 * @param {string} text - Acceptance condition to check.
 * @param {Automaton} automaton - Automaton to which the acceptance condition belongs to.
 * @returns {boolean} Result of the check.
 */
function areNumbersValid(text,automaton) {
    let maxAccSet = automaton.acceptance.count;
    let matcher = /\d+/g
    let matches = [...text.matchAll(matcher)];
    return matches.every(e => e < maxAccSet && e>=0);

}


exports.verifyAccCond = verifyAccCond;