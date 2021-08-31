const { Automaton } = require("./hoaData/automaton");

class LabelTranslator {
    /**
     * Creates new label translator
     * @public
     * @param  {Automaton} automaton - Automaton for which the translator will translate.
     */
    constructor(automaton) {
        this.automaton = automaton;
        this.aliasRegex = /!?\s*@[0-9a-zA-Z_-]+/g;
        this.apRegex = /\d+/g;
    }
    setAutomaton(automaton) {
        this.automaton = automaton;
    }
    /**
     * Replaces atomic expression numbers with atomic expression values.
     * 
     * @public
     * @param {string[]} lexprArray - Array representing the label.
     * @returns {string} Translated label expression.
     */
    translate(lexprArray) {
        let string = "";
        for (const lexprElement of lexprArray) {
            if (!isNaN(lexprElement)) {
                string += this.apReplacer(lexprElement);
            } else {
                string += lexprElement;
            }
        }
        return string;
    }

    
    /**
     * Translates atomic proposition key with value.
     * 
     * @private
     * @param {string} digitString - String containing the atomic proposition number.
     * @returns {string} Atomic proposition value.
     */
    apReplacer(digitString) {
        let digit = parseInt(digitString);
        return this.automaton.ap[digit];
    }

}
exports.LabelTranslator = LabelTranslator;
