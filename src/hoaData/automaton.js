const Victor = require('victor');
const Start = require('./start').Start;
const State = require('./state').State;

class Automaton {
    /**
     * Creates a new empty omega-automaton.
     */
    constructor() {
        /**@type {Start[]}*/
        this.start = []
        this.aliases = [];
        this.properties = []
        /**@type {Position[]}*/
        this.startOffsets = []
        this.hasExplicitPositions = false;
        this.etc = []
        /**@type {Map<number,State>}*/
        this.states = new Map();
        this.accname = "";
        this.name = "";
    }
    /**
     * Initializes empty automaton.
     */
    initializeEmpty() {
        this.version = "v1";
        this.acceptance = {
            count: 0, str: ""
        };
        this.ap = [];
    }
    /**
     * Sets the hoa format version.
     * 
     * @param {string} version - Hoa format version.
     */
    setVersion(version) {
        this.version = version
        //TODO duplicate error
    }
    /**
     * Sets the ammount of states in automaton.
     * 
     * @param {number} states - Ammount of states.
     */
    setStateCount(states) {
        this.stateCount = states
        //TODO duplicate error
    }
    /**
     * Adds starting state or state conjunction.
     * 
     * @param {number[]} startConj - Array of numbers representing stateConj.
     * @returns {Start} New start object.
     */
    addStart(startConj) {
        let start = new Start(startConj)
        this.start.push(start);
        return start;
    }
    /**
     * Adds an alias to a label, atomic proposition, already existing alias, or a group of thereof.
     * 
     * @param {string} aname - The alias.
     * @param {string} lexpr - Label, atomic proposition, already existing alias, or a group of thereof.
     */
    addAlias(aname, lexpr) {
        let regex = /@\w+|&|\||!|\(|\)|\d+/g
        let lexprParsed = lexpr.match(regex);
        this.aliases.push({
            aname: aname, lexpr: lexprParsed
        });
    }
    /**
     * Adds an atomic proposition.
     * 
     * @param {number} ap - Atomic proposition.
     */
    addAp(ap) {
        this.ap.push(ap)
    }
    /**
     * Sets the acceptance condition for this automaton.
     * 
     * @param {number} count - Ammount of acceptance sets.
     * @param {string} str - String defining the acceptance condition.
     */
    setAcceptance(count, str) {
        this.acceptance = {
            count: count, str: str
        };
    }
    /**
     * Sets the symbolic name of the acceptance conditions.
     * 
     * @param {string} name - Symbolinc name for the acceptance conditions.
     */
    setAccname(name) {
        this.accname = name;
    }
    /**
     * Sets the toolname header-item.
     * 
     * @param {string} toolname - Toolname.
     */
    setTool(toolname) {
        this.tool = toolname;
    }
    /**
     * Sets the name of the automaton.
     * 
     * @param {string} name - Name to set.
     */
    setName(name) {
        this.name = name;
    }
    /**
     * Adds a property to the automaton header.
     * 
     * @param {string} prop - IDENTIFIER* Additional property.
     */
    addProp(prop) {
        this.properties.push(prop);
    }
    /**
     * Adds aditional header items.
     * 
     * @param {any[]} etc - Additional header-item.
     */
    addEtc(etc) {
        this.etc.push(etc);
    }
    /**
     * Adds an empty state with implicit number.
     * 
     * @returns {State} The newly created state.
     */
    addStateImplicit() {
        let index = 0;
        if (this.states.size != 0) {
            index = Math.max(...this.states.keys()) + 1;
        }
        let n = this.addState(index);
        return n;
    }
    /**
     * Adds an empty state with given number.
     * 
     * @param {number} number - The number of the new state.
     * @returns {State} The newly created state.
     */
    addState(number) {
        if (this.states.get(number)) {
            //TODO error message
        }
        else {
            this.states.set(number, new State(number));
            return this.states.get(number);
        }
    }
    /**
     * Returns state at number.
     * 
     * @param {number} number - The nimber of the state to return.
     * @returns {State} Reference to state.
     */

    getStateByNumber(number) {
        return this.states.get(number);
    }
    /**
     * Converts array of state indexes to array of states.
     * 
     * @param {number[]} numbers - Array of state indexes.
     * @returns {State[]} Array of states with given indexes.
     */
    numbersToStates(numbers) {
        return numbers.map((number) => { return this.getStateByNumber(number); });
    }
    /**
     * Checks whether or not the automaton has alternating edge.
     * 
     * @returns {boolean} True if the automaton has alternating edge.
     */
    hasMultiEdge() {
        for (const state of this.states.values()) {
            for (const edge of state.edges.values()) {
                if (edge.stateConj.length > 1) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Calculates the highest acceptance set index used in automaton.
     * 
     * @returns {number} The highest acceptance set number used.
     */
    getHighestAccSetUsed() {
        let max = -0;
        for (const state of this.states.values()) {
            max = Math.max(max, ...state.accSets)
            for (const edge of state.edges) {
                max = Math.max(max, ...edge.accSets)
            }
        }
        return max-1;
    }
    /** Finds the highest number in a string.
     * 
     * @param {string} string - The string to search.
     * @returns {number} The highest number.
     */
    getMaxIntFromString(string) {
        let array = string.split(" ");
        return Math.max(...array);
    }
    /**
     * Checks if given alias is used in an automaton.
     * 
     * @param {string} aname - Key of the alias.
     * @returns {boolean} True if alias is used.
     */
    isAliasUsed(aname) {
        for (const state of this.states.values()) {
            if (state.label.find(lexpr => (lexpr == aname))) {
                return true;
            }
            for (const edge of state.edges) {
                if (edge.label.find(lexpr => (lexpr == aname))) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Checks if given atomic proposiiton is used in an automaton.
     * 
     * @param {string|number} ap - Number of the atomic proposiiton.
     * @returns {boolean} True if atomic proposiiton is used.
     */
    isAPUsed(ap) {
        let APString = String(ap);
        for (const alias of this.aliases) {
            if (alias.lexpr.find(lexpr => (lexpr == APString))) {
                return true;
            }
        }
        return this.isAliasUsed(APString);

    }
    /**
     * Removes atomic proposition with given index.
     * 
     * @param {number} index - Index of atomic proposition to remove.
     */
    removeAP(index) {
        this.ap.splice(index, 1);
        for (const alias of this.aliases) {
            this.decrementNumbersInLexpr(alias.lexpr, index);
        }
        for (const state of this.states.values()) {
            this.decrementNumbersInLexpr(state.label, index);
            for (const edge of state.edges) {
                this.decrementNumbersInLexpr(edge.label, index);
            }
        }
    }
    
    /**
     * Decrements every number in given lexpr that is higher than treshold .
     * 
     * @param {string[]} lexprArray - Array representing the lexpr.
     * @param {number} threshold - Number above which the numbers will be decreased (exclusive).
     */
    decrementNumbersInLexpr(lexprArray, threshold) {
        if (lexprArray) {
            for (let i = 0; i < lexprArray.length; i++) {
                let element = lexprArray[i];
                if (!isNaN(element) && Number(element) > threshold) {
                    lexprArray[i] = String(element - 1);
                }
            }
        }
    }
    /**
     * Removes state.
     * 
     * @param {number} stateToRemove - Number of state to remove.
     */
    removeState(stateToRemove) {
        for (const state of this.states.values()) {
            state.edges = state.edges.filter((edge) => { return !edge.stateConj.includes(stateToRemove.number); });
        }
        this.start = this.start.filter((start) => { return !start.stateConj.includes(stateToRemove.number) });
        this.states.delete(stateToRemove.number);
        this.collapseStateNumbers(stateToRemove.number)
    }
    /**
     * Decreases number of states with higher number than removed state.
     * 
     * @param {number} removedStateNumber - Number of state that was removed.
     */
    collapseStateNumbers(removedStateNumber) {
        let size = this.states.size+1;
        for (let i = 0; i < size; i++) {
            if (i != removedStateNumber) {
                let state = this.states.get(i);
                if (state.number > removedStateNumber) {
                    this.states.set(state.number - 1, state);
                    state.number -= 1;
                }
            for (const edge of state.edges) {
                    edge.stateConj = edge.stateConj.map(n => n > removedStateNumber ? n - 1 : n);
                }
            }
        }
        if (removedStateNumber != size-1) {
            this.states.delete(this.states.size - 1);
        }
    }
    /**
     * Removes given start.
     * 
     * @param {Start} startToRemove - Start to be removed.
     */
    removeStart(startToRemove) {
        this.start = this.start.filter((start) => { return start != startToRemove });
    }

    /**
     * Imports positions from import string.
     * 
     * @param {string} importString - String representing PositionsExport.
     */
    importPositions(importString) {

        /**@type {PositionsExport}*/
        let importData = JSON.parse(importString.replace(/\\"/g, "\"").slice(1, -1));
        for (let stateIndex = 0; stateIndex < importData.states.length; stateIndex++) {
            let state = this.states.get(stateIndex);
            let importedState = importData.states[stateIndex];
            state.position = Victor.fromObject(importedState.position);
            for (let edgeIndex = 0; edgeIndex < state.edges.length; edgeIndex++) {
                state.edges[edgeIndex].offset = Victor.fromObject(importedState.edges[edgeIndex]);
            }
        }
        for (let startIndex = 0; startIndex < importData.starts.length; startIndex++) {
            this.start[startIndex].position = Victor.fromObject(importData.starts[startIndex]);
        }
    }
    /**
     * Calculates how many edges are from one state to another.
     * 
     * @param {number} fromIndex - Index of the origin state.
     * @param {number} toIndex - Index of the destination state.
     * @returns {number} The ammount of the edges.
     */
    getEdgeCount(fromIndex, toIndex) {
        let count = this.states.get(fromIndex).edges.filter((element) => element.stateConj.includes(toIndex)).length;
        return count;
    }
    
}
exports.Automaton = Automaton;