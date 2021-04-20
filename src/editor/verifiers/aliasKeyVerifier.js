const HOA = require('../../hoaObject').HOA;
class AliasKeyVerifier {
    /**
     * Creates neww verifier for acc sets using data from given automaton.
     * 
     * @param {HOA} automaton - Automaton object.
     */
    constructor(automaton) {
        this.automaton = automaton;
        this.regex = /[0-9a-zA-Z_-]+/
    }

    verify(alias) {
        if (!this.regex.test(alias)) {
            return false;
        }
        for (const aliasObject of this.automaton.aliases) {
            if (aliasObject.aname.substring(1) == alias) {
                console.log("multiplicity")
                return false;
            }
        }
        return true;
    }
}
exports.AliasKeyVerifier = AliasKeyVerifier;