class Start {
    
    /**
     * Creates new start.
     *
     * @param {number[]} stateConj - States to which the start belongs.
     */
    constructor(stateConj = []) {
        /**@type{number[]}*/
        this.stateConj = stateConj;
        this.position = null;
    }
    /**
     * Adds or removes states to this start.
     * 
     * @param {number[]} newStateConj - Array os state numbers to add or remove.
     */
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
exports.Start = Start;