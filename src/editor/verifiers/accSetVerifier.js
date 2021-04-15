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
        console.log(JSON.stringify(accSetArray))
        for (const element of accSetArray) {
            if (isNaN(element)) {
                console.log("nan")
                return false;
            }
        }
        if ((new Set(accSetArray)).size != accSetArray.length) {
            console.log("length")
            return false
        }
        return !(accSetArray.some(num => num > this.automaton.acceptance.count-1 || num < 0))
    }
}
exports.AccSetVerifier = AccSetVerifier;