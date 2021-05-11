const Victor = require('victor');
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
exports.PositionExport = PositionExport;