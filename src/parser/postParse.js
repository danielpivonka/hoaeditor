const Automaton = require('../hoaData/automaton').Automaton;
const State = require('../hoaData/state').State;
const AccSetVerifier = require('../editor/verifiers/accSetVerifier').AccSetVerifier;
const verifyAccCond = require('../editor/verifiers/accConditionVerifier').verifyAccCond;

//TODO: ADD SEMANTIC CHECKING FOR IMPORTED LABELS.

    /**
     * Prepares the HOAObject for editing.
     * 
     * @param {Automaton} automaton - Automaton after being parsed.
     * @param {string} json - Json containing the postions.
     * @param {string[]} errors - Array for storing error messages.
     * @returns {boolean} If the labeling of the automaton is correct.
     */
function postParse(automaton,json,errors) {
    if (!checkLabels(automaton)) {
        errors.push("Labels are incorrect")
        return false;
    }
    if (!verifyAccCond(automaton.acceptance.str, automaton)) {
        errors.push("Acceptance condition is incorrect")
        return false;
    }
    if (!checkAccSets(automaton)) {
        errors.push("Acceptance sets are incorrect")
        return false;
    }
    if (json) {
        if(setPositions(automaton, json)||!hasPositions(automaton)){
            errors.push("Error parsing positons");
            return false;
        }
    }
    fixImplicitLabels(automaton);
    return true;
}
    /**
     * Checks if automaton is labelled correctly.
     * 
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
     * @param {number} edgeIndex - Index of edge to calculate.
     * @param {number} propositionCount - Ammount of atomic propositions.
     * @param {string[]} aps - List of atomic propositions.
     * @returns {string} Calculated implicit label.
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


    /**
     * Checks whether acc sets on automaton elements are correct.
     * 
     * @param {Automaton} automaton - Automaton to adjust.
     * @returns {boolean} Result of the check.
     */
function checkAccSets(automaton) {
    let verifier = new AccSetVerifier(automaton);
    for (const state of automaton.states.values()) {
        if (!verifier.verify(state.accSets)) {
            return false;
        }
        for (const edge of state.edges) {
            if (!verifier.verify(edge.accSets)) {
                return false;
            }
        }
    }
    return true;
}

    /**
     * Checks whether all elements have set position.
     * 
     * @param {Automaton} automaton - Automaton to which to import position.
     * @param {string} json - Json containing the positions.
     * @returns {boolean} Whether or not was the impor sucessful.
     */
function setPositions(automaton, json) {
    try {
        automaton.importPositions(json);
        automaton.hasExplicitPositions = true;
        return true
    }
    catch {
        return false;
    }
}

    /**
     * Checks whether all elements have set position.
     * 
     * @param {Automaton} automaton - Automaton to check.
     * @returns {boolean} Result of the check.
     */
function hasPositions(automaton) {
    for (const state of automaton.states.values()) {
        if (!state.position) {
            return false;
        }
        for (const edge of state.edges) {
            if (!edge.position) {
                return false;
            }
        }
    }
    for (const start of automaton.start) {
        if (!start.position) {
            return false;
        }
    }
    return true;
}




exports.postParse = postParse;