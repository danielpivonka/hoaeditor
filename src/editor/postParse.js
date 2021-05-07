const Automaton = require('../hoaObject').HOA;

const State = require('../hoaObject').State;
    /**
     * Prepares the HOAObject for editing.
     * @param {Automaton} automaton - Automaton after being parsed.
     */
function postParse(automaton) {
    checkLabels(automaton);
    fixImplicitLabels(automaton);
}
    /**
     * Checks if automaton is labelled correctly.
     * @param {Automaton} automaton - Automaton to check.
     * @returns {boolean} Result of the check.
     */
function checkLabels(automaton) {
    for (const state of automaton.states.values()) {
        if (!(isStateLabeled(state)||isEdgeLabeled(state)||isImplicitlyLabeled(state,automaton.ap.length))) {
            return false;
        }
    }
    return true;
}
    /**
     * Checks if state is state labeled correctly.
     * 
     * @param {State} state - State to check.
     * @returns {boolean} Result of the check.
     */
function isStateLabeled(state) {

    return state.label.length!=0 && state.edges.every(edge=> edge.label.length==0)
}
    /**
     * Checks if state is edge labeled correctly.
     * 
     * @param {State} state - State to check.
     * @returns {boolean} Result of the check.
     */
function isEdgeLabeled(state) {
    return state.label.length==0 && state.edges.every(edge=> edge.label.length!=0)

}
    /**
     * Checks if state is implicitly labeled correctly.
     * 
     * @param {State} state - State to check.
     * @param {number} apcount - How many atomic propositions does the automaton have.
     * @returns {boolean} Result of the check.
     */
function isImplicitlyLabeled(state,apcount) {
    return state.label.length==0 && state.edges.every(edge=> edge.label.length==0) && state.edges.length == Math.pow(2, apcount)
}


    /**
     * Changes implicit labels to explicit.
     * 
     * @param {Automaton} automaton - Automaton to adjust.
     */
function fixImplicitLabels(automaton) {
    let apcount = automaton.ap.length;
    for (const state of automaton.states.values()) {
        if (isImplicitlyLabeled(state,apcount)) {
            for (let i = 0; i < Math.pow(2, apcount); i++) {
                state.edges[i].label = calculateImplicitLabel(i, apcount, automaton.ap);
            }
        }
    }
    
}
    /**
     * Calculates implicit label of edge.
     * 
     * @param {Automaton} automaton - Automaton to adjust.
     */
function calculateImplicitLabel(edgeIndex, propositionCount,aps) {
    let result = [];
    for (let i = 0; i < propositionCount; i++) {
        let mask = 1 << i;
        if (!(mask & edgeIndex)) {
            result.push(["!"]);
        }
        result.push([aps[i]]);
        if (i + 1 < propositionCount) {
            result.push(["&"])
        }
    }
    return result;
}
exports.postParse = postParse;