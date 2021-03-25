
const Victor = require('victor');
const EditorUtils = require('./editorUtils').EditorUtils;
const HOA = require('../hoaObject').HOA;
const State = require('../hoaObject').State;
const LabelTranslator = require('../labelTranslator').LabelTranslator;

class EditorRenderer {

    constructor(canvas) {
        /**@type {HTMLCanvasElement}*/
        this.canvas = canvas;
        /**@type {CanvasRenderingContext2D}*/
        this.ctx = canvas.getContext("2d");
        if (this.canvas.parentNode) {
            this.canvas.width = this.canvas.parentNode.clientWidth;
            this.canvas.height = this.canvas.parentNode.clientHeight;
        }
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.circleSize = 25;
        /**@type {number}*/
        this.drawnEdges = [];
        this.blockedAngles = [];
        this.labelTranslator = null;
    }

    resize() {
        this.canvas.width = this.canvas.parentNode.clientWidth;
        this.canvas.height = this.canvas.parentNode.clientHeight;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    }
    /**
     * Renders automaton onto bound canvas.
     * 
     * @param {HOA} automaton - Automaton object.
     * @param {Object} selected - the selected object.
     */
    draw(automaton, selected) {

        this.blockedAngles = [];
        this.drawnEdges = [];
        this.labelTranslator = new LabelTranslator(automaton.aliases, automaton.ap);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawStarts(automaton);
        let stateLoopbacks = new Map();
        for (const state of automaton.states.values()) {
            this.drawState(state, this.circleSize, selected);
            let loopbacks = new Map();
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj.length > 1) {
                    this.drawMultiEdge(state, edgeIndex, automaton.numbersToStates(edge.stateConj), automaton.ap);
                }
                else if (edge.stateConj[0] == state.number) {
                    loopbacks.set(edgeIndex, edge);
                }
                else {
                    this.drawEdge(state, edgeIndex, automaton.getStateByNumber(edge.stateConj[0]), automaton.ap);
                }
            }
            this.drawAccSetsOnState(state);
            stateLoopbacks.set(state, loopbacks);
        }
        for (let [state, loopbacks] of stateLoopbacks) {
            this.drawLoop(state, loopbacks, automaton.ap);
        }
        for (const state of automaton.states.values()) {
            if (state.name) {
                this.drawStateLabels(state);
            }

        }
    }

    drawStateLabels(state) {
        let interval = EditorUtils.getFreeAngleInterval(this.blockedAngles[state.number]);
        let distance = (interval[1] - interval[0]);
        distance = distance > 0 ? distance : distance + 360;
        let angle = interval[0] + distance * 0.5;
        let anchor = new Victor(1, 0);
        anchor.rotateToDeg(angle).multiplyScalar(this.circleSize);
        anchor.add(state.position);
        let offset = 5 * state.edges.length + 3 * state.name.length;
        this.drawLabelEdge(state.name, anchor, angle, offset, true);
    }
    drawStarts(automaton) {
        for (const start of automaton.start) {
            if (start.stateConj.length > 1) {
                this.drawMultiStart(start, automaton);
            }
            else {
                this.drawMonoStart(start, automaton);
            }
        }
    }
    drawPartialMultiEdge(originState, destinationStates, additionalPos) {
        let originVector = Victor.fromObject(originState.position);
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of destinationStates) {
            if (destination.number == originState.number) {
                continue;
            }
            let destinationVector = Victor.fromObject(destination.position);
            let directionVector = destinationVector.subtract(originVector);
            midpoint.add(directionVector);
            divider++;
        }
        let destinationVector = Victor.fromObject(additionalPos);
        let directionVector = destinationVector.subtract(originVector);
        midpoint.add(directionVector);
        divider++;
        let angle = midpoint.angleDeg();
        midpoint.divideScalar(divider * 2);
        midpoint.add(originVector);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        for (const destination of destinationStates) {
            this.drawMultiEdgeElement(originState, destination, midpoint, angle);
        }
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, additionalPos.x, additionalPos.y);
        this.ctx.stroke();
        this.drawArrowhead(additionalPos.clone().subtract(midpoint), additionalPos);
    }



    drawMultiEdge(originState, edgeIndex, destinationStates, aps) {
        let originVector = Victor.fromObject(originState.position);
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of destinationStates) {
            if (destination.number == originState.number) {
                continue;
            }
            let destinationVector = Victor.fromObject(destination.position);
            let directionVector = destinationVector.subtract(originVector);
            midpoint.add(directionVector);
            divider++;
        }
        let angle = midpoint.angleDeg();
        midpoint.divideScalar(divider * 2); //*2 puts the midpoint close to origin state
        midpoint.add(originVector);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        for (const destination of destinationStates) {
            this.drawMultiEdgeElement(originState, destination, midpoint, angle);
        }
        let perpendicular = EditorUtils.calculatePerpendicular(fromPoint, midpoint);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        let label = this.getLabel(originState, edgeIndex, aps);
        this.drawLabelEdge(label, midpoint, labelAngle);
    }
    drawMultiEdgeElement(originState, destination, midpoint, angle) {
        let originVector = Victor.fromObject(originState.position);
        let destinationVector = Victor.fromObject(destination.position);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        if (destination.number == originState.number) {
            let left = new Victor(1, 0)
                .rotateDeg(angle)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(originState.position));
            let right = new Victor(1, 0)
                .rotateDeg(angle - 20)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(originState.position
                ));
            let upperLeft = new Victor(1, 0)
                .rotateDeg(angle)
                .multiplyScalar(this.circleSize * 4)
                .add(Victor.fromObject(originState.position
                ));
            let upperRight = new Victor(1, 0)
                .rotateDeg(angle - 30)
                .multiplyScalar(this.circleSize * 4)
                .add(Victor.fromObject(originState.position
                ));
            this.ctx.beginPath();
            this.ctx.moveTo(left.x, left.y);
            this.ctx.bezierCurveTo(upperLeft.x, upperLeft.y, upperRight.x, upperRight.y, right.x, right.y);
            this.ctx.stroke();
            this.drawArrowhead(right.clone().subtract(upperRight), right)
        }
        else {
            let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, this.circleSize);
            this.ctx.beginPath();
            this.ctx.moveTo(fromPoint.x, fromPoint.y);
            this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, toPoint.x, toPoint.y);
            this.ctx.stroke();
            this.addBlockedAngle(originState.number, originVector, fromPoint);
            this.addBlockedAngle(destination.number, destinationVector, toPoint);
            this.drawArrowhead(toPoint.clone().subtract(midpoint), toPoint);
        }
    }
    /**
     * Draws label at the position of the anchor.
     * 
     * @param {string} label - The text of the label.
     * @param {Victor} anchor - Where the label should be anchored.
     * @param {number} angle - Perpendicular angle to the edge in direction of anchor.
     * @param {number} extraPadding - Extra horizontal padding for the text.
     * @param {number} background - should this label have background.
     */
    drawLabelEdge(label, anchor, angle, extraPadding = 0, background = false) {
        this.ctx.font = "20px Arial";
        let textMeasurements = this.ctx.measureText(label);
        let height = 20 + extraPadding / 2; // TextMetrics.fontBoundingBox is not widely supported
        let width = (textMeasurements.width + 20 + extraPadding) / 2; // +20 to give further padding
        let anchorOffset = new Victor(width, height).rotateToDeg(angle);
        anchorOffset = new Victor(EditorUtils.clamp(-width, width, anchorOffset.x), EditorUtils.clamp(-height, height, anchorOffset.y));
        let pos = anchor.clone().add(anchorOffset);
        if (background) {
            let bgwidth = width * 2 - extraPadding;
            let bgheight = height * 2 - extraPadding - 20;
            this.ctx.fillStyle = '#FFFF99';
            this.ctx.fillRect(pos.x - bgwidth / 2, pos.y - bgheight / 2, bgwidth, bgheight);
        }
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.labelTranslator.translate(label), pos.x, pos.y);

    }
    drawState(state, circleSize, selected) {
        this.ctx.fillStyle = 'black';
        if (state.label) {
            this.ctx.beginPath();
            this.ctx.moveTo(state.position.x - circleSize, state.position.y);
            this.ctx.lineTo(state.position.x + circleSize, state.position.y);
            this.ctx.stroke();
            this.ctx.font = "18px Arial";
            this.ctx.fillText(state.number, state.position.x, state.position.y - circleSize / 2);
            this.ctx.fillText(state.label, state.position.x, state.position.y + circleSize / 2);
        }
        else {
            this.ctx.font = "36px Arial";
            this.ctx.fillText(state.number, state.position.x, state.position.y);
        }
        this.drawCircle(state.position.x, state.position.y, circleSize, selected == state)

    }
    drawCircle(x, y, size, isSelected) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.stroke();
        if (isSelected) {
            this.ctx.fillStyle = "#12121240";
            this.ctx.fill();
        }
    }
    drawLoop(state, loopbacks, aps) {
        let interval = EditorUtils.getFreeAngleInterval(this.blockedAngles[state.number]);
        let i = 0;
        for (let [index, loopback] of loopbacks) {
            let t = (i + 1) / (loopbacks.size + 1);
            let distance = (interval[1] - interval[0]);
            distance = distance > 0 ? distance : distance + 360;
            let angle = interval[0] + distance * t
            let left = new Victor(1, 0)
                .rotateDeg(angle - 14)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(state.position));
            let right = new Victor(1, 0)
                .rotateDeg(angle + 16)
                .multiplyScalar(this.circleSize)
                .add(Victor.fromObject(state.position
                ));
            let upperLeft = new Victor(1, 0)
                .rotateDeg(angle - 20)
                .multiplyScalar(this.circleSize * 4)
                .add(Victor.fromObject(state.position
                ));
            let upperRight = new Victor(1, 0)
                .rotateDeg(angle + 20)
                .multiplyScalar(this.circleSize * 4)
                .add(Victor.fromObject(state.position
                ));
            this.addBlockedAngle(state.number, state.position, left);
            this.addBlockedAngle(state.number, state.position, right);
            this.ctx.beginPath();
            this.ctx.moveTo(left.x, left.y);
            this.ctx.bezierCurveTo(upperLeft.x, upperLeft.y, upperRight.x, upperRight.y, right.x, right.y);
            this.ctx.stroke();
            this.drawArrowhead(right.clone().subtract(upperRight), right)
            this.drawAccSetsCubic(left, upperLeft, upperRight, right, loopback.accSets);
            let anchor = EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
            let label = this.getLabel(state, index, aps);
            this.drawLabelEdge(label, anchor, angle);
            i++;
        }
    }
    /**
     * Draws an edge from one state to another.
     * 
     * @param {State} originState - State from which the edge originates.
     * @param {number} edgeIndex - Index of edge to be drawn.
     * @param {State} destinationState - State to which the edge leads.
     * @param {any[]} aps - Array of atomic propositions. 
     */
    drawEdge(originState, edgeIndex, destinationState, aps) {
        let originVector = Victor.fromObject(originState.position);
        let destinationVector = Victor.fromObject(destinationState.position);
        let midpoint = EditorUtils.calculateMiddleWithOffset(originVector, destinationVector, originState.edges[edgeIndex].offset);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, this.circleSize);
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, toPoint.x, toPoint.y);
        this.ctx.stroke();
        this.addBlockedAngle(originState.number, originVector, fromPoint);
        this.addBlockedAngle(destinationState.number, destinationVector, toPoint);
        this.drawArrowhead(toPoint.clone().subtract(midpoint), toPoint)
        this.drawAccSetsQuadratic(fromPoint, midpoint, toPoint, originState.edges[edgeIndex].accSets)
        let perpendicular = EditorUtils.calculatePerpendicular(fromPoint, toPoint);
        let anchor = EditorUtils.getPointOnQuadraticBezier(fromPoint, midpoint, toPoint, 0.5);
        let angle = perpendicular.multiplyScalar(-1).angleDeg();
        let label = this.getLabel(originState, edgeIndex, aps);
        this.drawLabelEdge(label, anchor, angle);
    }
    drawEdgeFromStateToPosition(originState, position) {
        let fromPoint = EditorUtils.getNearestPointOnCircle(Victor.fromObject(originState.position), position, this.circleSize);
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.lineTo(position.x, position.y);
        this.ctx.stroke();
        this.drawArrowhead(position.clone().subtract(fromPoint), position)
    }
    /**
     * Draws an arrowhead onto bound canvas.
     * 
     * @param {Victor} direction - Direction of the arrowhead.
     * @param {Victor} point - Position of the peak of the arrowhead.
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
    /**
     * Draws multistart.
     * 
     * @param {Start} start - Start to be drawn.
     * @param {HOA} automaton - The automaton.
     */
    drawMultiStart(start, automaton) {
        let statePositions = Victor.fromObject(EditorUtils.statesToPositions(automaton.numbersToStates(start.stateConj)).position);
        let anchor = EditorUtils.calculateMidpointBetweenVectors(statePositions);
        let offsetVector = Victor.fromObject(start.position);
        let originVector = anchor.clone().add(offsetVector);
        let midpoint = EditorUtils.calculateMidpointBetweenVectors(statePositions.concat(new Array(originVector)));
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(originVector.x, originVector.y, this.circleSize / 5, 0, 2 * Math.PI);
        this.ctx.fill();
        for (const destinationState of automaton.numbersToStates(start.stateConj)) {
            let destinationVector = EditorUtils.getNearestPointOnCircle(destinationState.position, midpoint, this.circleSize);
            this.ctx.beginPath();
            this.ctx.moveTo(originVector.x, originVector.y);
            this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, destinationVector.x, destinationVector.y);
            this.ctx.stroke();
            this.addBlockedAngle(destinationState.number, destinationState.position, destinationVector);
            this.drawArrowhead(destinationVector.clone().subtract(midpoint), destinationVector);
        }
    }
    /**
     * Draws monostart.
     * 
     * @param {Start} start - Start to be drawn.
     * @param {HOA} automaton - The automaton.
     */
    drawMonoStart(start, automaton) {
        let statePositions = Victor.fromObject(automaton.getStateByNumber(start.stateConj[0]).position);
        let offsetVector = Victor.fromObject(start.position);
        let originVector = statePositions.clone().add(offsetVector);
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(originVector.x, originVector.y, this.circleSize / 5, 0, 2 * Math.PI);
        this.ctx.fill();
        let destinationVector = EditorUtils.getNearestPointOnCircle(statePositions, originVector, this.circleSize);
        this.ctx.beginPath();
        this.ctx.moveTo(originVector.x, originVector.y);
        this.ctx.lineTo(destinationVector.x, destinationVector.y);
        this.ctx.stroke();
        this.addBlockedAngle(start.stateConj[0], statePositions, destinationVector);
        this.drawArrowhead(destinationVector.clone().subtract(originVector), destinationVector);
    }


    /**
     * Draws acceptance sets along a quadratic path.
     * 
     * @param {Victor} from - Point p0 of quadratic curve.
     * @param {Victor} mid - Point p1 of quadratic curve.
     * @param {Victor} end - Point p2 of quadratic curve.
     * @param {number[]} sets - Array of numbers of acceptance sets.
     */
    drawAccSetsQuadratic(from, mid, end, sets) {
        for (let i = 0; i < sets.length; i++) {
            let t = (i + 1) / (sets.length + 1);
            let point = EditorUtils.getPointOnQuadraticBezier(from, mid, end, t);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSetsCubic(p0, p1, p2, p3, sets) {
        for (let i = 0; i < sets.length; i++) {
            let t = (i + 1) / (sets.length + 1);
            let point = EditorUtils.getPointOnCubicBezier(p0, p1, p2, p3, t);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSetsOnState(state) {
        let stateCenter = Victor.fromObject(state.position);
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
    calculateImplicitLabel(edgeIndex, propositionCount) {
        let result = "";
        for (let i = 0; i < propositionCount; i++) {
            let mask = 1 << i;
            if (!(mask & edgeIndex)) {
                result += "!";
            }
            result += i
            if (i + 1 < propositionCount) {
                result += "&"
            }
        }
        return result;
    }

    /**
     * Gets label of given edge.
     * 
     * @param {State} state - State from which the edge originates.
     * @param {number} edgeIndex - Index of the edge.
     * @param {any[]} aps - Atomic propositions.
     * @returns {Victor[]} Vectors with state positions.
     */
    getLabel(state, edgeIndex, aps) {
        if (state.edges[edgeIndex].label) {
            return state.edges[edgeIndex].label;
        }
        if (state.edges.length == Math.pow(2, aps.length) && !state.label) {
            return this.calculateImplicitLabel(edgeIndex, aps.length);
        }
        return "";
    }
}
exports.EditorRenderer = EditorRenderer