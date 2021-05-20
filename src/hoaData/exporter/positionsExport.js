const State = require('../state').State;
const Start = require('../start').Start;
const StateExport = require('./stateExport').StateExport;
const PositionExport = require('./stateExport').StateExport;
class PositionsExport {

   /**
    * Constructs an representation of positions in automaton.
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

exports.PositionsExport = PositionsExport;


