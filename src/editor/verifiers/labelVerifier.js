const antlr4 = require('antlr4/index');
const hoaLexer = require('../../parser/generated/hoaLexer');
const hoaParser = require('../../parser/generated/hoaParser');

/**
 * Checks if label is correct.
 * 
 * @param {string[]} labelArray - Array containing the label elements.
 * @param {boolean} canBeEmpty - If empty labels are considered valid.
 * @returns {boolean} Result of the check.
 */
function verifyLabel(labelArray, canBeEmpty) {
    if (labelArray.length == 0) {
        return canBeEmpty;
    }
    if (!checkDoubleInt(labelArray)) { // The syntax chceker cannot differentiate between [1,0] (invalid)  and [10] (valid)
        return false;
    }
    return checkStructure("[" + labelArray.join("") + "]");
}
/**
 * Checks if array contains two numbers next to each other.
 * 
 * @param {string[]} labelArray - Array containing the label elements.
 * @returns {boolean} True if there are no numbers next to each other.
 */
function checkDoubleInt(labelArray) {
    for (let i = 0; i < labelArray.length - 1; i++) {
        if (!isNaN(labelArray[i]) && !isNaN(labelArray[i + 1])) {
            return false;
        }
    }
    return true;
}
/**
 * Checks if the label has correct syntax.
 * 
 * @param {string} label - String representing the label.
 * @returns {boolean} Result of the check.
 */
function checkStructure(label) {
    let chars = new antlr4.InputStream(label);
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
    parser.label();
    return success;
}

exports.verifyLabel = verifyLabel;