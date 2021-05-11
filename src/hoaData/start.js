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
exports.Start = Start;