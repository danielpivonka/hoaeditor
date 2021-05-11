const Victor = require('victor');
class Edge {
    /**
     * Constructs a new edge with given destinations.
     * 
     * @param {number[]} stateConj - Array of numbers representing stateConj.
     * @param {State} parent - parent state.
     */
    constructor(stateConj, parent) {
        this.stateConj = stateConj || [];
        this.accSets = [];
        this.parent = parent;
        this.offset = new Victor(0, 0);
        this.label = [];
    }
    setLabelByString(labelString) {
        let regex = /@\w+|&|\||!|\(|\)|t|f|\d+/g
        this.label = labelString.match(regex);
    }
    getLabelString() {
        if (!this.label) {
            return "";
        }
        return this.label.join("");
    }
    addAccSet(setNumber) {
        this.accSets.push(setNumber);
    }
    canHaveLabel() {
        return this.parent.label.length==0;
    }
}
exports.Edge = Edge;