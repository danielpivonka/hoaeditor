export class HOA {
    constructor() {
        /**@type {number[][]}*/
        this.start = []
        this.aliases = []
        this.ap = []
        this.properities = []
        this.etc = []
        /**
        * @type {State[]}
        */
        this.states = []
    }
    /**
     * Sets the hoa format version
     * @param  {string} version hoa format version
     */
    setVersion(version) {
        this.version = version
        //TODO duplicate error
    }
    /**
     * Sets the ammount of states in automaton
     * @param  {string} states ammount of states
     */
    setStateCount(states) {
        this.stateCount = states
        //TODO duplicate error
    }
    /**
     * Adds starting state or state conjunction
     * @param  {number[]} start array of numbers representing stateConj
     */
    addStart(start) {
        this.start.push(start);
    }
    /**
     * Adds an alias to a label, atomic proposition, already existing alias, or a group of thereof
     * @param  {string} ANAME - the alias
     * @param  {string} lexpr - label, atomic proposition, already existing alias, or a group of thereof
     */
    addAlias(name, expr) {
        this.aliases.push({
            name: name, expr: expr
        });
    }
    /**
     * Adds an atomic proposition
     * @param  {number} ap Atomic proposition
     */
    addAp(ap) {
        this.ap.push(ap)
    }
    /**
     * Sets the acceptance condition for this automaton
     * @param  {number} count ammount of acceptance sets
     * @param  {string} str string defining the acceptance condition
     */
    setAcceptance(count, str) {
        this.acceptance = {
            count: count, str: str
        };
    }
    /**
     * Sets the symbolic name of the acceptance conditions
     * @param  {string} name
     */
    setAccname(name) {
        this.accname = name;
    }
    /**
     * Sets the toolname header-item
     * @param  {string} toolname
     */
    setTool(toolname) {
        this.tool = toolname;
    }
    /**
     * Sets the name of the automaton
     * @param  {string} name
     */
    setName(name) {
        this.name = name;
    }
    /**
     * Adds a property to the automaton header
     * @param  {string} prop IDENTIFIER* - additional property
     */
    addProp(prop) {
        this.properities.push(prop);
    }
    /**
     * @param  {string} etc additional header-item
     */
    addEtc(etc) {
        this.etc.push(etc);
    }

    /**
     * Adds an empty state with implicit number
     * @returns {State} the newly created state
     */
    addStateImplicit() {
        return addState(this.states.lastIndexOf(this.getLastState()) - 1);
    }
    /**
     * Adds an empty state with given number 
     * @param  {number} number
     * @returns {State} the newly created state
     */
    addState(number) {
        if (this.states[number]) {
            //TODO error message
        }
        else {
            this.states[number] = new State(number);
            return this.states[number];
        }
    }
    /**
     * Returns state at index
     * @param  {number} index
     * @returns {State} Reference to state
     */
    getStateAt(index) {
        return this.states[index];
    }
    /**
     * Returns the last state
     * @returns {State} Reference to last added state
     */
    getLastState() {
        return this.states.slice(-1)[0];
    }
    /**
     * Returns automaton in hoa format
     * @returns {string} hoa string
     */
    toHoaString() {
        let string = "";
        string += "HOA: " + this.version + "\n";
        if (this.stateCount) {
            string += "States: " + this.stateCount + "\n";
        }
        for (const start of this.start) {

            string += "Start: " + start.toString().replace(",", "&") + "\n";
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
            string += "tool: " + this.tool + "\n";
        }
        if (this.name) {
            string += "name: " + this.name + "\n";
        }
        for (const alias of this.aliases) {
            string += "Alias: " + alias.name + " " + alias.expr + "\n";
        }
        for (const property of this.properities) {
            string += "properties: " + property + "\n";
        }
        for (const etc of this.etc) {
            string += etc + "\n";
        }
        string += "--BODY--\n";
        for (const state of this.states) {
            string += state.stringify();
        }
        string += "--END--\n";
        return string;
    }
}
class State {
    /**
     * Constructs an empty state with given number
     * @param  {number} number
     */
    constructor(number) {
        this.number = number;
        this.accSets = [];
        /**@type {Edge[]}*/
        this.edges = [];
    }
    setLabel(label) {
        this.label = label;
    }
    setName(name) {
        this.name = name;
    }
    addAccSet(setNumber) {
        this.accSets.push(setNumber);
    }
    /**
     * @param  {number[]} stateConj - array of numbers representing stateConj
     * @returns {Edge} the newly created edge
     */
    addEdge(stateConj) {
        let edge = new Edge(stateConj);
        this.edges.push(edge);
        return edge;
    }
    stringify() {
        let str = "State: "
        if (this.label) {
            str += "[" + this.label + "] ";
        }
        str += this.number;
        if (this.name) {
            str += " \"" + this.name + "\" ";
        }
        if (this.accSets.length > 0) {
            str += "{";
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
     * @param  {number[]} stateConj - array of numbers representing stateConj
     */
    constructor(stateConj) {
        this.stateConj = stateConj;
        this.accSets = [];
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