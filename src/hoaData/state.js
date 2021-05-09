const Victor = require('victor');
const Edge = require('./edge').Edge;
class State {
    /**
     * Constructs an empty state with given number.
     * 
     * @param {number} number - Number of the state.
     */
    constructor(number) {
        /**@type {number}*/
        this.number = number;
        /**@type {number[]}*/
        this.accSets = [];
        /**@type {Edge[]}*/
        this.edges = [];
        /**@type {Victor}*/
        this.position;
        /**@type {string[]}*/
        this.label = [];
        /**@type {string}*/
        this.name = "";
    }
    setLabelByString(labelString) {
        let regex = /@\w+|&|\||!|\(|\)|\d+/g
        this.label = labelString.match(regex);
    }
    setName(name) {
        this.name = name;
    }
    areEdgesLabeled() {
        for (const edge of this.edges) {
            if (edge.label!=0) {
                return true
            }
        }
        return false;
    }
    transferLabel() {
        for (const edge of this.edges) {
            if (edge.label.length == 0) {
                edge.label.splice(0, this.label.length, ...this.label);
            }
        }
        this.label = [];
    }
    setLabel(label) {
        this.label = label;
        if (label.length != 0) {
            for (const edge of this.edges) {
                edge.label = [];
            
            }
        }
    }
    setPosition(x, y) {
        this.position = new Victor(x, y);
    }
    addAccSet(setNumber) {
        this.accSets.push(setNumber);
    }
    /**
     * Adds edge to this state.
     * 
     * @param {number[]} stateConj - Array of numbers representing stateConj.
     * @returns {Edge} The newly created edge.
     */
    addEdge(stateConj) {
        let edge = new Edge(stateConj, this);
        this.edges.push(edge);
        return edge;
    }
    getLabelString() {
        return this.label.join("");
    }

}
exports.State = State;