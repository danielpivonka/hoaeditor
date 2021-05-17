const antlr4 = require('antlr4/index');
const hoaLexer = require('../../parser/generated/hoaLexer');
const hoaParser = require('../../parser/generated/hoaParser');


function verifyLabel(labelArray, canBeEmpty) {
    if (labelArray.length == 0) {
        return canBeEmpty;
    }
    if (!checkDoubleInt(labelArray)) {
        return false;
    }
    return checkStructure("[" + labelArray.join("") + "]");
}

function checkDoubleInt(labelArray) {
    for (let i = 0; i < labelArray.length - 1; i++) {
        if (!isNaN(labelArray[i]) && !isNaN(labelArray[i + 1])) {
            return false;
        }
    }
    return true;
}
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