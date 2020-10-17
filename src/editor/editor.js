const HOA = require('../hoaObject').HOA;
const Position = require('../hoaObject').Position;
const State = require('../hoaObject').State;
const Edge = require('../hoaObject').Edge;
const Victor = require('victor');
class Editor {
    constructor(canvas) {
        /**@type {HTMLCanvasElement}*/
        this.canvas = canvas;
        /**@type {CanvasRenderingContext2D}*/
        this.ctx = canvas.getContext("2d");
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.circleSize = 25;
        this.selected = null;
        this.downLocation = null;
        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
        this.drawnEdges = [];
    }
    /**
     * binds automaton to editor
     * @param {HOA} automaton object
     */
    setAutomaton(automaton) {
        this.automaton = automaton;
        this.automaton.setImplicitPositions();
        this.automaton.SetImplicitOffsets();
        this.draw();
    }
    getAutomaton() {
        return this.automaton;
    }

    draw() {
        this.drawnEdges = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const state of this.automaton.states) {
            this.drawState(state);
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj[0] == state.number) {
                    continue;
                }
                this.drawEdge(state, edgeIndex);
            }
        }

    }
    drawState(state) {
        let pos = this.automaton.positions[state.number];
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, this.circleSize, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.font = "36px Arial";
        this.ctx.fillText(state.number, pos.x, pos.y);
    }
    /**
 * @param  {State} state
 * @param  {number} edgeIndex
 */
    drawEdge(state, edgeIndex) {
        let destinationIndex = state.edges[edgeIndex].stateConj[0];
        let curveOffset = this.automaton.edgeOffsets[state.number][edgeIndex];
        let originVector = Victor.fromObject(this.automaton.positions[state.number]);
        let destinationVector = Victor.fromObject(this.automaton.positions[destinationIndex]);
        let midpoint = this.calculateMiddleWithOffset(originVector, destinationVector, curveOffset);
        let fromPoint = this.getNearestPointOnCircle(originVector, midpoint);
        let toPoint = this.getNearestPointOnCircle(destinationVector, midpoint);
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, toPoint.x, toPoint.y);
        this.ctx.stroke();
        this.drawArrowhead(toPoint.clone().subtract(midpoint), toPoint)
        this.drawAccSets(fromPoint, midpoint, toPoint, state.edges[edgeIndex].accSets)
    }
    /**
     * @param  {Victor} from
     * @param  {Victor} mid
     * @param  {Victor} end
     * @param  {number[]} sets
     */
    drawAccSets(from, mid, end, sets) {
        let setCount = sets.length;
        console.log("entered acc set, len: " + setCount);
        for (let i = 0; i < setCount; i++) {
            let t = 0.5 - 0.05 * (setCount - 1) + 0.1 * i;
            let point = this.getPointOnBezier(from, mid, end, t);
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, this.circleSize / 2.5, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fillStyle = 'blue';
            this.ctx.fill();
            this.ctx.font = "16px Arial";
            console.log("drawing acc set");
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(sets[i], point.x, point.y);
        }
    }
    getPointOnBezier(p0, p1, p2, t) {
        let x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
        let y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
        return new Victor(x, y);
    }
    /**
     * @param  {Victor} p1
     * @param  {Victor} p2
     * @param  {number} offset
     */
    calculateMiddleWithOffset(p1, p2, offset) {
        let dir = p1.clone().subtract(p2).multiplyScalar(0.5);
        let midpoint = dir.clone().add(p2);
        let perpendicular = new Victor(dir.y, -dir.x).normalize();
        perpendicular.multiplyScalar(offset);
        perpendicular.add(midpoint);
        return perpendicular;
    }
    /**
     * @param  {Victor} center
     * @param  {Victor} point - the point to which the resulting point will be the nearest on circle
     * @param  {number} offset
     */
    getNearestPointOnCircle(center, point, offset = 0) {
        let direction = point.clone().subtract(center).normalize();
        //No idea why this must be cloned so many times, but it does not work otherwise
        direction = direction.clone().multiplyScalar(this.circleSize).clone().rotate(offset);
        return direction.clone().add(center);
    }
    /**
     * @param  {Victor} direction
     * @param  {Victor} point
     */
    drawArrowhead(direction, point) {
        let directionNormalized = direction.clone().normalize().multiplyScalar(10);
        let perpendicular = new Victor(directionNormalized.y, -directionNormalized.x).multiplyScalar(0.5);
        let arrowFoot = point.clone().subtract(directionNormalized);
        let arrowStart = arrowFoot.clone().subtract(perpendicular);
        let arrowEnd = arrowFoot.clone().add(perpendicular);
        this.ctx.beginPath();
        this.ctx.moveTo(arrowStart.x, arrowStart.y);
        this.ctx.lineTo(point.x, point.y);
        this.ctx.lineTo(arrowEnd.x, arrowEnd.y);
        this.ctx.stroke();
    }

    mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        this.selected = this.getObjectIndexAtPosition(x, y);
        if (this.selected != null) {
            this.downLocation = new Position(x, y);
        }
    }
    mouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        this.selected = null;
        this.downLocation = null;
    }
    mouseMove(e) {
        if (this.selected == null || this.downLocation == null) {
            return;
        }
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        let dx = x - this.downLocation.x;
        let dy = y - this.downLocation.y;
        this.automaton.positions[this.selected].x += dx;
        this.automaton.positions[this.selected].y += dy;
        this.downLocation.x = x;
        this.downLocation.y = y;
        this.draw();
    }
    getObjectIndexAtPosition(x, y) {
        for (const state of this.automaton.states) {
            let pos = this.automaton.positions[state.number];
            let a = pos.x - x;
            let b = pos.y - y;
            var dist = Math.sqrt(a * a + b * b);
            if (dist < this.circleSize) {
                return state.number
            }
        }
        return null;
    }
}
exports.Editor = Editor;