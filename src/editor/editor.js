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
        /**@type {number}*/
        this.selected = null;
        this.selectedType = null;
        this.downLocation = null;
        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
        this.drawnEdges = [];
        this.blockedAngles = [];
        this.selectedEnum = {
            STATE: 0,
            START: 1
        }
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
        this.drawStarts(this.automaton.start);
        for (const state of this.automaton.states) {
            this.drawState(state);
            let loopbacks = [];
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj.length > 1) {
                    this.drawMultiEdge(state, edgeIndex);
                }
                else if (edge.stateConj[0] == state.number) {
                    loopbacks.push(edge);
                }
                else {
                    this.drawEdge(state, edgeIndex);
                }
            }
            if (loopbacks) {
                this.drawLoop(state, loopbacks);
            }
            this.drawAccSetsOnState(state);
        }

    }
    drawStarts(starts) {
        for (let i = 0; i < starts.length; i++) {
            if (starts[i].length > 1) {
                this.drawMultiStart(i);
            }
        }
    }
    drawMultiStart(startIndex) {
        let states = this.automaton.start[startIndex]
        let midpoint = this.calculateMidpointBetweenStates(states);
        let offset = Victor.fromObject(this.automaton.startOffsets[startIndex]);
        let originVector = midpoint.clone().add(offset);
        for (const destination of states) {
            let destinationVector = this.getNearestPointOnCircle(Victor.fromObject(this.automaton.positions[destination]), midpoint);
            this.ctx.beginPath();
            this.ctx.moveTo(originVector.x, originVector.y);
            this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, destinationVector.x, destinationVector.y);
            this.ctx.stroke();
            this.addBlockedAngle(destination, this.automaton.positions[destination], destinationVector);
            this.drawArrowhead(destinationVector.clone().subtract(midpoint), destinationVector);
        }
    }
    /**
     * @param  {Number[]} states
     * @returns {Victor} vector representing midpoint
     */
    calculateMidpointBetweenStates(states) {
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of states) {
            midpoint.add(Victor.fromObject(this.automaton.positions[destination]));
            divider++;
        }
        midpoint.divideScalar(divider);
        return midpoint
    }
    drawMultiEdge(state, edgeIndex) {
        let destStateList = state.edges[edgeIndex].stateConj;
        let originVector = Victor.fromObject(this.automaton.positions[state.number]);
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of destStateList) {
            if (destination == state.number) {
                continue;
            }
            let destinationVector = Victor.fromObject(this.automaton.positions[destination]);
            let directionVector = destinationVector.subtract(originVector);
            midpoint.add(directionVector);
            divider++;
        }
        let angle = midpoint.angleDeg();
        midpoint.divideScalar(divider * 2); //*2 puts the midpoint close to origin state
        midpoint.add(originVector);
        let fromPoint = this.getNearestPointOnCircle(originVector, midpoint);
        for (const destination of destStateList) {
            let destinationVector = Victor.fromObject(this.automaton.positions[destination]);
            if (destination == state.number) {
                let left = new Victor(1, 0)
                    .rotateDeg(angle)
                    .multiplyScalar(this.circleSize)
                    .add(Victor.fromObject(this.automaton.positions[state.number]));
                let right = new Victor(1, 0)
                    .rotateDeg(angle + 20)
                    .multiplyScalar(this.circleSize)
                    .add(Victor.fromObject(this.automaton.positions[state.number]
                    ));
                let upperLeft = new Victor(1, 0)
                    .rotateDeg(angle)
                    .multiplyScalar(this.circleSize * 4)
                    .add(Victor.fromObject(this.automaton.positions[state.number]
                    ));
                let upperRight = new Victor(1, 0)
                    .rotateDeg(angle + 30)
                    .multiplyScalar(this.circleSize * 4)
                    .add(Victor.fromObject(this.automaton.positions[state.number]
                    ));
                this.ctx.beginPath();
                this.ctx.moveTo(left.x, left.y);
                this.ctx.bezierCurveTo(upperLeft.x, upperLeft.y, upperRight.x, upperRight.y, right.x, right.y);
                this.ctx.stroke();
                this.drawArrowhead(right.clone().subtract(upperRight), right)
            }
            else {
                let toPoint = this.getNearestPointOnCircle(destinationVector, midpoint);
                this.ctx.beginPath();
                this.ctx.moveTo(fromPoint.x, fromPoint.y);
                this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, toPoint.x, toPoint.y);
                this.ctx.stroke();
                this.addBlockedAngle(state.number, originVector, fromPoint);
                this.addBlockedAngle(destination, destinationVector, toPoint);
                this.drawArrowhead(toPoint.clone().subtract(midpoint), toPoint);
            }
        }
        let perpendicular = this.calculatePerpendicular(fromPoint, midpoint);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        this.drawLabelEdge(state.edges[edgeIndex].label, midpoint, labelAngle);


    }
    /**
     * @param  {string} label - the text of the label
     * @param  {Victor} anchor - where the label should be anchored
     * @param  {number} angle - perpendicular angle to the edge in direction of anchor
     */
    drawLabelEdge(label, anchor, angle) {
        this.ctx.font = "20px Arial";
        let textMeasurements = this.ctx.measureText(label);
        let height = 20; // TextMetrics.fontBoundingBox is not widely supported
        let width = (textMeasurements.width + 20) / 2; // +20 to give extra padding
        let anchorOffset = new Victor(width, height).rotateToDeg(angle);
        anchorOffset = new Victor(this.clamp(-width, width, anchorOffset.x), this.clamp(-height, height, anchorOffset.y));
        console.log(anchorOffset.toString());
        let pos = anchor.clone().add(anchorOffset);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(label, pos.x, pos.y);

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
        for (let i = 0; i < loopbacks.length; i++) {
            let t = (i + 1) / (loopbacks.length + 1);
            let distance = (interval[1] - interval[0]);
            distance = distance > 0 ? distance : distance + 360;
            let angle = interval[0] + distance * t
            let left = new Victor(1, 0)
                .rotateDeg(angle - 15)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(this.automaton.positions[state.number]));
            let right = new Victor(1, 0)
                .rotateDeg(angle + 15)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(this.automaton.positions[state.number]
                ));
            let upperLeft = new Victor(1, 0)
                .rotateDeg(angle - 20)
                .multiplyScalar(this.circleSize * 4)
                .add(Victor.fromObject(this.automaton.positions[state.number]
                ));
            let upperRight = new Victor(1, 0)
                .rotateDeg(angle + 20)
                .multiplyScalar(this.circleSize * 4)
                .add(Victor.fromObject(this.automaton.positions[state.number]
                ));
            this.ctx.beginPath();
            this.ctx.moveTo(left.x, left.y);
            this.ctx.bezierCurveTo(upperLeft.x, upperLeft.y, upperRight.x, upperRight.y, right.x, right.y);
            this.ctx.stroke();
            this.drawArrowhead(right.clone().subtract(upperRight), right)
            this.drawAccSetsCubic(left, upperLeft, upperRight, right, loopbacks[i].accSets)
            let anchor = this.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
            this.drawLabelEdge(loopbacks[i].label, anchor, angle);
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
        let perpendicular = this.calculatePerpendicular(fromPoint, toPoint);
        let anchor = this.getPointOnQuadraticBezier(fromPoint, midpoint, toPoint, 0.5);
        let angle = perpendicular.multiplyScalar(-1).angleDeg()
        this.drawLabelEdge(state.edges[edgeIndex].label, anchor, angle);
    }

    /**
     * @param  {Victor} from
     * @param  {Victor} mid
     * @param  {Victor} end
     * @param  {number[]} sets
     */
    drawAccSetsQuadratic(from, mid, end, sets) {
        for (let i = 0; i < sets.length; i++) {
            let t = (i + 1) / (sets.length + 1);
            let point = this.getPointOnQuadraticBezier(from, mid, end, t);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSetsCubic(p0, p1, p2, p3, sets) {
        for (let i = 0; i < sets.length; i++) {
            let t = (i + 1) / (sets.length + 1);
            let point = this.getPointOnCubicBezier(p0, p1, p2, p3, t);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSetsOnState(state) {
        let stateCenter = Victor.fromObject(this.automaton.positions[state.number]);
        let sets = state.accSets;
        for (let i = 0; i < sets.length; i++) {
            let t = (i + 1) / (sets.length + 1);
            let angle = 170 - 60 * t;
            let position = new Victor(0, this.circleSize * 0.9).rotateDeg(angle).add(stateCenter);
            this.drawAccSet(position, sets[i]);
        }
    }
    drawAccSet(point, label) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, this.circleSize / 3, 0, Math.PI * 2);
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
    clamp(min, max, value) {
        return Math.min(max, Math.max(min, value));
    }
    calculatePerpendicular(p1, p2) {
        let dir = p2.clone().subtract(p1);
        return new Victor(dir.y, -dir.x).normalize();
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
            if (distance > maxDistance) {
                maxDistance = distance;
                a1 = angles[i];
                a2 = angles[next];
            }
        }
        return [a1, a2];
    }
    mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        this.checkCollisionsAtPosition(new Victor(x, y));
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
        this.moveSelectedItem(dx, dy);
        this.downLocation.x = x;
        this.downLocation.y = y;
        this.draw();
    }
    checkCollisionsAtPosition(position) {
        for (const state of this.automaton.states) {
            let centre = this.automaton.positions[state.number];
            if (this.checkCircleCollision(centre, this.circleSize, position)) {
                this.selected = state.number;
                this.selectedType = this.selectedEnum.STATE;
                return
            }
            for (let i = 0; i < this.automaton.start.length; i++) {
                let pos = this.calculateMidpointBetweenStates(this.automaton.start[i]);
                let offset = this.automaton.startOffsets[i];
                let center = new Victor(pos.x + offset.x, pos.y + offset.y);
                if (this.checkCircleCollision(center, this.circleSize / 5, position)) {
                    this.selected = i;
                    this.selectedType = this.selectedEnum.START;
                    return
                }
            }
        }
        this.selected = null;
    }
    moveSelectedItem(dx, dy) {
        if (this.selectedType == this.selectedEnum.STATE) {
            this.automaton.positions[this.selected].x += dx;
            this.automaton.positions[this.selected].y += dy;
        }
        else {
            this.automaton.startOffsets[this.selected].x += dx;
            this.automaton.startOffsets[this.selected].y += dy;

        }
    }
    checkCircleCollision(center, size, point) {
        let a = center.x - point.x;
        let b = center.y - point.y;
        var dist = Math.sqrt(a * a + b * b);
        return dist < size
    }
}
exports.Editor = Editor;