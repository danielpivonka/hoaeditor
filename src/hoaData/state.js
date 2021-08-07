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
    /**
     * Sets label of this tate using string.
     * 
     * @param {string} labelString - String to turn into label.
     */
    setLabelByString(labelString) {
        let regex = /@\w+|&|\||!|\(|\)|\d+/g
        this.label = labelString.match(regex);
    }
    /**
     * Sets the name of the automaton.
     * 
     * @param {string} name - The name to set.
     */
    setName(name) {
        this.name = name;
    }
    /**
     * Checks whether or not are the outgoind edges labeled.
     * 
     * @returns {boolean} Result of the check.
     */
    areEdgesLabeled() {
        for (const edge of this.edges) {
            if (edge.label != 0) {
                return true
            }
        }
        return false;
    }
    /**
     * Transfers label from this state to its outgoing edges.
     */
    transferLabel() {
        for (const edge of this.edges) {
            if (edge.label.length == 0) {
                edge.label.splice(0, this.label.length, ...this.label);
            }
        }
        this.label = [];
    }
    /**
     * Sets the label of this state.
     * 
     * @param {string[]} label - Array of label elements.
     */
    setLabel(label) {
        this.label = label;
        if (label.length != 0) {
            for (const edge of this.edges) {
                edge.label = [];

            }
        }
    }
    /**
     * Sets position of this state.
     * 
     * @param {number} x - The x coordinate of the position.
     * @param {number} y - The y coordinate of the position.
     */
    setPosition(x, y) {
        this.position = new Victor(x, y);
    }
    /**
     * Adds acceptance set number to this.
     * 
     * @param {number} setNumber - NUmber of the acceptance set that should be added.
     */
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
    /**
     * Returns label of this state as a string.
     * 
     * @returns {string} Label string.
     */
    getLabelString() {
        return this.label.join("");
    }

}
exports.State = State;