const antlr4 = require('antlr4/index');
const hoaLexer = require('../../parser/generated/hoaLexer');
const hoaParser = require('../../parser/generated/hoaParser');

function verifyAccCond(accCond) {
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
    return success && parsed == accCond;
}

exports.verifyAccCond = verifyAccCond;