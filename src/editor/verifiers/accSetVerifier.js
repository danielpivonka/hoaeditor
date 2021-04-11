const HOA = require('../../hoaObject').HOA;
class AccSetVerifier {
    /**
     * Creates neww verifier for acc sets using data from given automaton.
     * 
     * @param {HOA} automaton - Automaton object.
     */
    constructor(automaton) {
        this.automaton = automaton;
    }

    verify(accSetArray) {
        for (const element of accSetArray) {
            if (isNaN(element)) {
                return false;
            }
        }
        if ((new Set(accSetArray)).size != accSetArray.length) {
            return false
        }
        return !(accSetArray.some(num => num > this.automaton.acceptance.count || num < 0))
    }
}
exports.AccSetVerifier = AccSetVerifier;