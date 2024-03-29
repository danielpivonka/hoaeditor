const Automaton = require('../../hoaData/automaton').Automaton;
class AccSetVerifier {
    /**
     * Creates neww verifier for acc sets using data from given automaton.
     * 
     * @param {Automaton} automaton - Automaton object.
     */
    constructor(automaton) {
        this.automaton = automaton;
    }
    /**
     * Check if all values in an array are valid acceptance sets.
     * 
     * @param {string|number[]} accSetArray - Array to be checked.
     * @returns {boolean} Result of the check.
     */
    verify(accSetArray) {
        for (const element of accSetArray) {
            if (isNaN(element)) {
                return false;
            }
        }
        if ((new Set(accSetArray)).size != accSetArray.length) {
            return false
        }
        return !(accSetArray.some(num => num > this.automaton.acceptance.count-1 || num < 0))
    }
}
exports.AccSetVerifier = AccSetVerifier;