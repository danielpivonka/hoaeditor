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
        this.blockedAngles = [];
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
        this.blockedAngles = [];
        this.drawnEdges = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const state of this.automaton.states) {
            this.drawState(state);
            let loopbacks = [];
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj[0] == state.number) {
                    loopbacks.push(edge);
                } else {
                    this.drawEdge(state, edgeIndex);
                }
            }
            if (loopbacks) {
                this.drawLoop(state, loopbacks);
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
    drawLoop(state, loopbacks) {
        let interval = this.getFreeAngleInterval(state.number);
        let prints = state.number == 1;
        for (let i = 0; i < loopbacks.length; i++) {
            let t = (i + 1) / (loopbacks.length + 1);
            let distance = (interval[1] - interval[0]);
            distance = distance > 0 ? distance : distance + 360;
            let angle = interval[0] + distance * t
            if (prints) {
                console.log("angle: " + angle);
            }
            let center = new Victor(1, 0)
                .rotateByDeg(angle)
                .multiplyScalar(this.circleSize * 4)
                .add(Victor.fromObject(this.automaton.positions[state.number]));
            let left = new Victor(1, 0)
                .rotateByDeg(angle - 15)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(this.automaton.positions[state.number]));
            let right = new Victor(1, 0)
                .rotateByDeg(angle + 15)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(this.automaton.positions[state.number]));
            let diff = left.clone().subtract(right).multiplyScalar(3);
            let upperLeft = (center.clone().add(diff));
            let upperRight = (center.clone().subtract(diff));
            this.ctx.beginPath();
            this.ctx.moveTo(left.x, left.y);
            this.ctx.bezierCurveTo(upperLeft.x, upperLeft.y, upperRight.x, upperRight.y, right.x, right.y);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.drawArrowhead(right.clone().subtract(upperRight), right)
            this.drawAccSetsCubic(left, upperLeft, upperRight, right, loopbacks[i].accSets)
        }
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
        this.addBlockedAngle(state.number, originVector, fromPoint);
        this.addBlockedAngle(state.edges[edgeIndex].stateConj[0], destinationVector, toPoint);
        this.drawArrowhead(toPoint.clone().subtract(midpoint), toPoint)
        this.drawAccSetsQuadratic(fromPoint, midpoint, toPoint, state.edges[edgeIndex].accSets)
    }

    /**
     * @param  {Victor} from
     * @param  {Victor} mid
     * @param  {Victor} end
     * @param  {number[]} sets
     */
    drawAccSetsQuadratic(from, mid, end, sets) {
        let setCount = sets.length;
        for (let i = 0; i < setCount; i++) {
            let t = 0.5 - 0.2 * (setCount - 1) + 0.4 * i;
            let point = this.getPointOnQuadraticBezier(from, mid, end, t);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSetsCubic(p0, p1, p2, p3, sets) {
        let setCount = sets.length;
        for (let i = 0; i < setCount; i++) {
            let t = 0.5 - 0.2 * (setCount - 1) + 0.4 * i;
            let point = this.getPointOnCubicBezier(p0, p1, p2, p3, t);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSet(point, label) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, this.circleSize / 2.5, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(label, point.x, point.y);
    }
    getPointOnQuadraticBezier(p0, p1, p2, t) {
        let b0 = (1 - t) * (1 - t);
        let b1 = 2 * (1 - t) * t;
        let b2 = t * t;
        let x = b0 * p0.x + b1 * p1.x + b2 * p2.x;
        let y = b0 * p0.y + b1 * p1.y + b2 * p2.y;
        return new Victor(x, y);
    }
    getPointOnCubicBezier(p0, p1, p2, p3, t) {
        let b0 = (1 - t) * (1 - t) * (1 - t);
        let b1 = 3 * t * (1 - t) * (1 - t);
        let b2 = 3 * t * t * (1 - t);
        let b3 = t * t * t;
        let x = b0 * p0.x + b1 * p1.x + b2 * p2.x + b3 * p3.x;
        let y = b0 * p0.y + b1 * p1.y + b2 * p2.y + b3 * p3.y;
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
    addBlockedAngle(stateIndex, stateCenter, pointOnState) {
        if (!this.blockedAngles[stateIndex]) {
            this.blockedAngles[stateIndex] = [];
        }
        let dirFromCenter = pointOnState.clone().subtract(stateCenter);
        let angle = dirFromCenter.horizontalAngleDeg();
        if (angle < 0) {
            angle += 360;
        }
        this.blockedAngles[stateIndex].push(angle);
    }
    getFreeAngleInterval(stateIndex) {
        let angles = this.blockedAngles[stateIndex];
        angles.sort((a, b) => { return a - b });
        let maxDistance = 0;
        let a1;
        let a2;
        for (let i = 0; i < angles.length; i++) {
            let next = (i + 1) % angles.length //modulo is used to compare last element with first
            let distance = angles[next] - angles[i];
            distance = distance > 0 ? distance : distance + 360;
            if (stateIndex == 1) {
                console.log("comparing: " + [angles[i], angles[next]]);
                console.log("dist: " + distance);
            }
            if (distance > maxDistance) {
                maxDistance = distance;
                a1 = angles[i];
                a2 = angles[next];
            }
        }
        if (stateIndex == 1) {
            console.log("returning: " + [a1, a2] + "with dist " + maxDistance);
        }
        return [a1, a2];
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