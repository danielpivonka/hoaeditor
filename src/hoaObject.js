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
        this.startOffsets = []
        this.acceptance = {
            count: 0, str: ""
        };
        this.hasExplicitPositions = false;
        this.etc = []
        /**@type {Map<number,State>}*/
        this.states = new Map();
        this.version = "v1";
        this.accname = "";
        this.name = "";
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
    numbersToStates(numbers) {
        return numbers.map((number) => { return this.getStateByNumber(number); });
    }
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
    getHighestAccSetUsed() {
        let max = -1;
        for (const state of this.states.values()) {
            max = Math.max(max, ...state.accSets)
            for (const edge of state.edges) {
                max = Math.max(max, ...edge.accSets)
            }
        }
        return max;
    }
    getMaxIntFromString(string) {
        let array = string.split(" ");
        return Math.max(...array);
    }
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
    isAPUsed(ap) {
        let APString = String(ap);
        for (const alias of this.aliases) {
            if (alias.lexpr.find(lexpr => (lexpr == APString))) {
                return true;
            }
        }
        return this.isAliasUsed(APString);

    }
    removeAP(index) {
        this.ap.splice(index, 1);
        for (const alias of this.aliases) {
            this.replaceNumbersInLexpr(alias.lexpr, index);
        }
        for (const state of this.states.values()) {
            this.replaceNumbersInLexpr(state.label, index);
            for (const edge of state.edges) {
                this.replaceNumbersInLexpr(edge.label, index);
            }
        }
    }
    replaceNumbersInLexpr(lexprArray, threshold) {
        if (lexprArray) {
            for (let i = 0; i < lexprArray.length; i++) {
                let element = lexprArray[i];
                if (!isNaN(element) && Number(element) > threshold) {
                    lexprArray[i] = String(element - 1);
                }
            }
        }
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
    }
    SetImplicitOffsets() {
        this.stateCount = this.states.size;

        for (const state of this.states.values()) {
            let count = new Array(Math.max(...this.states.keys()) + 1).fill(0);
            for (const edge of state.edges) {
                let edgeDirection = edge.stateConj[0];
                let offset = ++count[edgeDirection];
                if (edge.stateConj.length > 1) {
                    edge.offset.x = 0;
                }
                else if (this.getEdgeCount(edgeDirection, state.number)) { //single or multiple edges to state with reverse edge(s)
                    edge.offset.x = offset * 30
                }
                else if (count[edgeDirection] > 1 || this.getEdgeCount(state.number, edgeDirection) > 1) { //multiple edges to state without reverse edge
                    if (offset % 2) {
                        edge.offset.x = ((offset + 1) / 2) * (-40);
                    }
                    else {
                        edge.offset.x = (offset / 2) * 40;
                    }
                }
                else {
                    edge.offset.x = 0;
                }
            }
        }
    }
    calculateBlockedAngles(circleSize) {
        let blockedAngles = [];
        for (const state of this.states.values()) {
            blockedAngles[state.number] = [];
        }
        for (const state of this.states.values()) {
            for (const edge of state.edges) {
                if (edge.stateConj.length > 1) {
                    let originVector = state.position;
                    let destinationStates = this.numbersToStates(edge.stateConj);
                    let midpoint = EditorUtils.calculateMultiEdgeMidpoint(state, destinationStates)[0];
                    let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, circleSize);
                    for (const destinationState of destinationStates) {
                        if (destinationState.number != state.number) {
                            let destinationVector = destinationState.position;
                            let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
                            blockedAngles[state.number].push(EditorUtils.calculateBlockedAngle(fromPoint, originVector));
                            blockedAngles[destinationState.number].push(EditorUtils.calculateBlockedAngle(toPoint, destinationVector));
                        }
                    }
                }
                else if (edge.stateConj[0] != state.number) {
                    let destinationState = this.getStateByNumber(edge.stateConj[0]);
                    let originVector = state.position;
                    let destinationVector = destinationState.position;
                    let midpoint = EditorUtils.calculateMiddleWithOffset(originVector, destinationVector, edge.offset);
                    let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, circleSize);
                    let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
                    blockedAngles[state.number].push(EditorUtils.calculateBlockedAngle(fromPoint, originVector));
                    blockedAngles[destinationState.number].push(EditorUtils.calculateBlockedAngle(toPoint, destinationVector));
                }
            }
        }
        return blockedAngles;
    }
    calculateLoopbackAngles() {
        let blockedAngles = [];
        for (const state of this.states.values()) {
            blockedAngles[state.number] = [];
            for (const edge of state.edges) {
                if (edge.stateConj.length == 1 && edge.stateConj[0] == state.number) {
                    let baseAngle = edge.offset.angleDeg();
                    blockedAngles[state.number].push(EditorUtils.angle360(baseAngle + 16));
                    blockedAngles[state.number].push(EditorUtils.angle360(baseAngle - 14));
                }

            }
        }
        return blockedAngles;
    }
    calculateLoopbackAnchors(blockedAngles, circleSize) {
        let stateLoopbacks = new Map();
        for (const state of this.states.values()) {
            let loopbacks = [];
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj.length == 1 && edge.stateConj[0] == state.number) {
                    loopbacks.push(edge);
                }
            }
            stateLoopbacks.set(state, loopbacks);
        }
        for (let [state, loopbacks] of stateLoopbacks) {
            let interval = EditorUtils.getFreeAngleInterval(blockedAngles[state.number]);
            let i = 0;
            for (const loopback of loopbacks) {
                let angle = EditorUtils.calculateImplicitLoopbackAngle(loopbacks.length, i, interval);
                loopback.offset = new Victor(1, 0).rotateDeg(angle).multiplyScalar(circleSize * 4);
                i++;
            }
        }
    }
    calculateStartAngles(circleSize) {
        let blockedAngles = [];
        for (const stateKey of this.states.keys()) {
            blockedAngles[stateKey] = [];
        }
        for (const start of this.start) {
            if (start.stateConj.length > 1) {
                let destinationStates = this.numbersToStates(start.stateConj);
                let statePositions = EditorUtils.statesToPositions(destinationStates);
                let midpoint = EditorUtils.calculateMidpointBetweenVectors(statePositions.concat(new Array(start.position)));
                for (const destinationState of destinationStates) {
                    let destinationVector = destinationState.position;
                    let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
                    blockedAngles[destinationState.number].push(EditorUtils.calculateBlockedAngle(toPoint, destinationVector));
                }
            }
            else if (start.stateConj.length == 1){
                let stateNumber = start.stateConj[0];
                let statePosition = this.getStateByNumber(stateNumber).position;
                let originVector = start.position;
                let destinationVector = EditorUtils.getNearestPointOnCircle(statePosition, originVector, circleSize);
                let angle = EditorUtils.calculateBlockedAngle(destinationVector, statePosition);

                blockedAngles[stateNumber].push(angle);
            }
        }
        return blockedAngles;
    }
    calculateStartAnchors(blockedAngles) {
        for (const start of this.start) {
            let states = this.numbersToStates(start.stateConj);
            let positions = EditorUtils.statesToPositions(states);
            let anchor = EditorUtils.calculateMidpointBetweenVectors(positions);
            let perpendicular = anchor.clone().rotateDeg(90).normalize().multiplyScalar(50);
            if (start.stateConj.length > 1) {
                start.position = perpendicular.add(anchor);
            }
            else {
                let state = states[0];
                let interval = EditorUtils.getFreeAngleInterval(blockedAngles[state.number]);
                let angle = EditorUtils.calculateImplicitLoopbackAngle(1, 0, interval);
                let offset = new Victor(50, 0).rotateToDeg(angle);
                start.position = offset.add(anchor);
            }
        }
    }
    removeState(stateToRemove) {
        for (const state of this.states.values()) {
            state.edges = state.edges.filter((edge) => { return !edge.stateConj.includes(stateToRemove.number); });
        }
        this.start = this.start.filter((start) => { return !start.stateConj.includes(stateToRemove.number) });
        this.states.delete(stateToRemove.number);
        this.collapseStateNumbers(stateToRemove.number)
    }
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
    removeStart(startToRemove) {
        this.start = this.start.filter((start) => { return start != startToRemove });
    }

    /**
     * Returns automaton in hoa format.
     * 
     * @returns {string} Hoa string.
     */
    toHoaString(extended = false) {
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
        if (extended) {
            string += "positions:";
            string += "\"" + this.exportPositions() + "\"" + "\n";
        }
        for (const alias of this.aliases) {
            string += "Alias: " + alias.aname + " " + alias.lexpr.join("") + "\n";
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
    exportPositions() {
        let exportData = new PositionsExport(this.states.values(), this.start);
        return JSON.stringify(exportData).replace(/"/g, "\\\"");
    }
    /**
     * Constructs simplified representation of state.
     * 
     * @param {string} importString - string representing PositionsExport.
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
    getEdgeCount(fromIndex, toIndex) {
        let count = this.states.get(fromIndex).edges.filter((element) => element.stateConj.includes(toIndex)).length;
        return count;
    }
    
}
class PositionsExport {


    /**
    * Constructs an empty state with given number.
    * 
    * @param {State[]} statesIn - Array of states.
    * @param {Start[]} startsIn - Array of starts.
    */
    constructor(statesIn, startsIn) {
        /**@type {PositionExport[]}*/
        this.starts = [];
        /**@type {StateExport[]}*/
        this.states = [];
        for (const state of statesIn) {
            let stateExport = new StateExport(state.position);
            for (const edge of state.edges) {
                stateExport.edges.push(new PositionExport(edge.offset));
            }
            this.states.push(stateExport);
        }
        for (const start of startsIn) {
            this.starts.push(new PositionExport(start.position))
        }
    }
}
class StateExport {

    /**
     * Constructs simplified representation of state.
     * 
     * @param {Victor} victor - Position of the state.
     */
    constructor(victor) {
        /**@type {PositionExport}*/
        this.position;
        /**@type {PositionExport[]}*/
        this.edges = [];
        this.position = new PositionExport(victor)
    }
}
class PositionExport {
    /**
     * Constructs simplified representation of position with whole number values.
     * 
     * @param {Victor} victor - Victor from which the position will be constructed.
     */
    constructor(victor) {
        /**@type {number}*/
        this.x = Math.round(victor.x);
        /**@type {number}*/
        this.y = Math.round(victor.y);
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
    canHaveLabel() {
        for (const edge of this.edges) {
            if (edge.label!=0) {
                return false
            }
        }
        return true
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
    stringify() {
        let str = "State:"
        if (this.label.length!=0) {
            str += " [" + this.getLabelString() + "]";
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
     * @param {State} parent - parent state.
     */
    constructor(stateConj, parent) {
        this.stateConj = stateConj || [];
        this.accSets = [];
        this.parent = parent;
        this.offset = new Victor(0, 0);
        this.label = ["t"];
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
    stringify() {
        let str = "";
        if (this.label.length!=0) {
            str += "[" + this.getLabelString() + "] ";
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
    constructor(stateConj = []) {
        /**@type{number[]}*/
        this.stateConj = stateConj;
        this.position = null;
    }
    addEdge(newStateConj) {
        for (const state of newStateConj) {
            let stateNum = Number(state);
            if (this.stateConj.length>0 &&this.stateConj.filter(e => e == stateNum).length>0) {
                this.stateConj = this.stateConj.filter(e => e != stateNum);
            } else {
                this.stateConj.push(stateNum);
            }
        }
    }
}


exports.HOA = HOA;
exports.State = State;
exports.Edge = Edge;
exports.Start = Start;
