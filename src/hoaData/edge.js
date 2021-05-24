const Victor = require('victor');
const State = require('./state').State;
class Edge {
    /**
     * Constructs a new edge with given destinations.
     * 
     * @param {number[]} stateConj - Array of numbers representing stateConj.
     * @param {State} parent - Parent state.
     */
    constructor(stateConj, parent) {
        this.stateConj = stateConj || [];
        this.accSets = [];
        this.parent = parent;
        this.offset = new Victor(0, 0);
        this.label = [];
    }
    /**
     * Sets label of this tate using string.
     * 
     * @param {string} labelString - String to turn into label.
     */
    setLabelByString(labelString) {
        let regex = /@\w+|&|\||!|\(|\)|t|f|\d+/g
        this.label = labelString.match(regex);
    }
    /**
     * Returns label of this state as a string.
     * 
     * @returns {string} Label string.
     */
    getLabelString() {
        if (!this.label) {
            return "";
        }
        return this.label.join("");
    }
    /**
     * Adds acceptance set number to this.
     * 
     * @param {number} setNumber - NUmber of the acceptance set that should be added.
     */
    addAccSet(setNumber) {
        this.accSets.push(setNumber);
    }
}
exports.Edge = Edge;