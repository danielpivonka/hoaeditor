const Automaton = require('../../hoaData/automaton').Automaton;
class AliasKeyVerifier {
    /**
     * Creates neww verifier for acc sets using data from given automaton.
     * 
     * @param {Automaton} automaton - Automaton object.
     */
    constructor(automaton) {
        this.automaton = automaton;
        this.regex = /^[0-9a-zA-Z_-]+$/
    }
    /**
     * Verifies given alias key (aname).
     * 
     * @param {string} aliasKey - String to be verified.
     * @returns {boolean} Result of the check.
     */
    verify(aliasKey) {
        if (!this.regex.test(aliasKey)) {
            return false;
        }
        for (const aliasObject of this.automaton.aliases) {
            if (aliasObject.aname.substring(1) == aliasKey) {
                return false;
            }
        }
        return true;
    }
}
exports.AliasKeyVerifier = AliasKeyVerifier;