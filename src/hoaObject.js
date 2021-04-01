const EditorUtils = require("./editor/editorUtils").EditorUtils;
const Victor = require('victor');
class HOA {
    constructor() {
        /**@type {Start[]}*/
        this.start = []
        this.aliases = [];
        this.ap = []
        this.properties = []
        /**@type {Position[]}*/
        this.positions = []
        /**@type {number[][]}*/
        this.edgeOffsets = []
        /**@type {Position[]}*/
        this.startOffsets = []
        this.acceptance = {
            count: 0, str: ""
        };
        this.etc = []
        /**@type {Map<number,State>}*/
        this.states = new Map();
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
        this.aliases.push({
            aname: aname, lexpr: lexpr
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
            console.log("you done messed up");
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
    numbersToStates(numbers) {
        return numbers.map((number) => { return this.getStateByNumber(number); });
    }
    setImplicitPositions(width, height) {
        let rows = Math.round(Math.sqrt(this.states.size));
        let columns = Math.ceil(this.states.size / rows);
        let positionsSet = 0;
        for (const state of this.states.values()) {
            if (!state.position) {
                let currentRow = Math.floor(positionsSet / columns);
                let currentColumn = positionsSet % columns;
                let x = width * (1 + currentColumn) / (columns + 1);
                let y = height * (1 + currentRow) / (rows + 1);
                state.position = new Victor(x, y);
                positionsSet++;
            }
        }
        for (const start of this.start) {
            let states = this.numbersToStates(start.stateConj);

            let positions = EditorUtils.statesToVectors(states);

            let anchor = EditorUtils.calculateMidpointBetweenVectors(positions);
            if (start.stateConj.length > 1) {
                start.position = new Victor(anchor.x, anchor.y);
            }
            else {
                start.position = new Victor(anchor.x, anchor.y + 50);
            }
        }
    }
    SetImplicitOffsets() {
        this.stateCount = this.states.size;

        for (const state of this.states.values()) {
            let count = new Array(Math.max(...this.states.keys()) + 1).fill(0);
            for (const edge of state.edges) {
                let edgeDirection = edge.stateConj[0];
                let offset = ++count[edgeDirection];
                if (this.getEdgeCount(edgeDirection, state.number)) { //single or multiple edges to state with reverse edge(s)
                    edge.offset = offset * 30
                }
                else if (count[edgeDirection] > 1 || this.getEdgeCount(state.number, edgeDirection) > 1) { //multiple edges to state without reverse edge
                    if (offset % 2) {
                        edge.offset = ((offset + 1) / 2) * (-40);
                    }
                    else {
                        edge.offset = (offset / 2) * 40;
                    }
                }
                else {
                    edge.offset = 0;
                }
            }
        }
    }
    removeState(stateToRemove) {
        for (const state of this.states.values()) {
            state.edges = state.edges.filter((edge) => { return !edge.stateConj.includes(stateToRemove.number); });
        }
        this.start = this.start.filter((start) => { return !start.stateConj.includes(stateToRemove.number) });
        this.states.delete(stateToRemove.number);
    }
    removeStart(startToRemove) {
        this.start = this.start.filter((start) => { return start != startToRemove });
    }

    /**
     * Returns automaton in hoa format.
     * 
     * @returns {string} Hoa string.
     */
    toHoaString() {
        let string = "";
        string += "HOA: " + this.version + "\n";
        if (this.stateCount) {
            string += "States: " + this.stateCount + "\n";
        }
        for (const start of this.start) {

            string += "Start: " + start.stateConj.toString().replace(",", "&") + "\n";
        }
        if (this.accname) {
            string += "acc-name: " + this.accname + "\n";
        }
        if (this.acceptance) {
            string += "Acceptance: " + this.acceptance.count + " " + this.acceptance.str + "\n";
        }
        if (this.ap.length > 0) {
            string += "AP: ";
            string += this.ap.length;
            for (const ap of this.ap) {
                string += " \"" + ap + "\"";
            }
            string += "\n";
        }
        if (this.tool) {
            string += "tool: " + "\"" + this.tool + "\"" + "\n";
        }
        if (this.name) {
            string += "name: " + "\"" + this.name + "\"" + "\n";
        }
        for (const alias of this.aliases) {
            string += "Alias: " + alias.aname + " " + alias.lexpr + "\n";
        }
        if (this.properties.length > 0) {
            string += "properties:";
            for (const property of this.properties) {
                string += " " + property;
            }
            string += "\n";
        }
        for (const etc of this.etc) {
            string += etc.join(" ") + "\n";
        }
        string += "--BODY--\n";
        for (const state of this.states.values()) {
            string += state.stringify();
        }
        string += "--END--\n";
        return string;
    }
    getEdgeCount(fromIndex, toIndex) {
        let count = this.states.get(fromIndex).edges.filter((element) => element.stateConj.includes(toIndex)).length;
        return count;
    }
}
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
        /**@type {Position}*/
        this.position;
        /**@type {string}*/
        this.label;
        /**@type {string}*/
        this.name;
    }
    setLabel(label) {
        this.label = label;
    }
    setName(name) {
        this.name = name;
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
        let edge = new Edge(stateConj);
        this.edges.push(edge);
        return edge;
    }
    stringify() {
        let str = "State:"
        if (this.label) {
            str += " [" + this.label + "]";
        }
        str += " " + this.number;
        if (this.name) {
            str += " \"" + this.name + "\"";
        }
        if (this.accSets.length > 0) {
            str += " {";
            for (const set of this.accSets) {
                str += set + " ";
            }
            str = str.slice(0, -1);
            str += "}";
        }
        str += "\n"
        for (const edge of this.edges) {
            str += edge.stringify() + "\n";
        }
        return str;
    }
}
class Edge {
    /**
     * Constructs a new edge with given destinations.
     * 
     * @param {number[]} stateConj - Array of numbers representing stateConj.
     */
    constructor(stateConj) {
        this.stateConj = stateConj;
        this.accSets = [];
        this.offset = 0;
    }
    setLabel(label) {
        this.label = label;
    }
    addAccSet(setNumber) {
        this.accSets.push(setNumber);
    }
    stringify() {
        let str = "";
        if (this.label) {
            str += "[" + this.label + "] ";
        }
        str += this.stateConj.toString().replace(",", "&");
        if (this.accSets.length > 0) {
            str += " {";
            for (const set of this.accSets) {
                str += set + " ";
            }
            str = str.slice(0, -1);
            str += "}";
        }
        return str;
    }
}
class Start {
    constructor(stateConj) {
        /**@type{number[]}*/
        this.stateConj = stateConj;
        this.position = null;
    }
    addEdge(stateConj) {
        this.stateConj = this.stateConj.concat(stateConj)
    }

}
exports.HOA = HOA;
exports.State = State;
exports.Edge = Edge;
exports.Start = Start;
