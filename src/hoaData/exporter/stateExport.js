const Victor = require('victor');
const PositionExport = require('./positionExport').PositionExport;

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
exports.StateExport = StateExport;