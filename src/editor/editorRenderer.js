
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
        this.scale = 1;
        this.labelTranslator = null;
        this.offset = new Victor(0, 0);
        this.accColors = ["#285943", "#07020D", "#03F7EB", "#ea2b1f", "#13315c", "#8d80ad", "#FFA400", "#009FFD", "#20BF55", "#F6CA83"]
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
     * @param {Victor} offset - by how much should the canvas be offset.
     * @param {Object} selected - the selected object.
     * @param {number[][]} angles - blocked angles.
     */
    draw(automaton, offset, angles, selected) {
        this.drawnEdges = [];
        this.offset = offset;
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
                    this.drawMultiEdge(state, edgeIndex, automaton.numbersToStates(edge.stateConj), automaton.ap, selected);
                }
                else if (edge.stateConj[0] == state.number) {
                    loopbacks.set(edgeIndex, edge);
                }
                else {
                    this.drawEdge(state, edgeIndex, automaton.getStateByNumber(edge.stateConj[0]), automaton.ap, selected);
                }
            }
            this.drawAccSetsOnState(state);
            stateLoopbacks.set(state, loopbacks);
        }
        for (let [state, loopbacks] of stateLoopbacks) {
            this.drawLoop(state, loopbacks, automaton.ap, selected);
        }
        for (const state of automaton.states.values()) {
            if (state.name) {
                this.drawStateLabels(state, angles);
            }
        }
    }

    drawStateLabels(state, blockedAngles) {
        let interval = EditorUtils.getFreeAngleInterval(blockedAngles[state.number]);
        let distance = (interval[1] - interval[0]);
        distance = distance > 0 ? distance : distance + 360;
        let angle = interval[0] + distance * 0.5;
        let anchor = new Victor(1, 0);
        anchor.rotateToDeg(angle).multiplyScalar(this.circleSize);
        anchor.add(state.position.clone().add(this.offset));
        let offset = 5 * state.edges.length + 3 * state.name.length;
        this.drawLabelEdge(state.name, anchor, angle, offset, true);
    }
    drawStarts(automaton) {
        this.ctx.strokeStyle = "#000000"
        for (const start of automaton.start) {
            this.drawStartingPoint(start);
            if (start.stateConj.length > 1) {
                this.drawMultiStart(start, automaton);
            }
            else if (start.stateConj.length == 1) {
                this.drawMonoStart(start, automaton);
            }
        }
    }
    drawPartialMultiEdge(originState, destinationStates, additionalPos) {

        let originVector = originState.position.clone().add(this.offset);
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of destinationStates) {
            if (destination.number == originState.number) {
                continue;
            }
            let destinationVector = destination.position.clone().add(this.offset);
            let directionVector = destinationVector.subtract(originVector);
            midpoint.add(directionVector);
            divider++;
        }
        additionalPos = additionalPos.clone().add(this.offset);
        let directionVector = additionalPos.clone().subtract(originVector);
        midpoint.add(directionVector);
        divider++;
        let angle = midpoint.angleDeg();
        midpoint.divideScalar(divider * 2);
        midpoint.add(originVector);
        let circleSize = originState instanceof State ? this.circleSize : this.circleSize / 5;
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, circleSize);
        for (const destination of destinationStates) {
            this.drawMultiEdgeElement(originState, destination, midpoint, angle, circleSize);
        }
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, additionalPos.x, additionalPos.y);
        this.ctx.stroke();
        this.drawArrowhead(additionalPos.clone().subtract(midpoint), additionalPos);
    }



    drawMultiEdge(originState, edgeIndex, destinationStates, aps, selected) {
        let edge = originState.edges[edgeIndex];
        this.ctx.strokeStyle = selected == edge ? "#8888FF" : "#000000"
        let originVector = originState.position.clone().add(this.offset);
        let [midpoint, angle] = EditorUtils.calculateMultiEdgeMidpoint(originState, destinationStates, edge.offset, this.offset)
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        for (const destination of destinationStates) {
            this.drawMultiEdgeElement(originState, destination, midpoint, angle, this.circleSize);
        }
        let perpendicular = EditorUtils.calculatePerpendicular(fromPoint, midpoint);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        let label = EditorUtils.getLabel(originState, edgeIndex, aps);
        this.drawLabelEdge(label, midpoint, labelAngle);
    }
    drawMultiEdgeElement(originState, destination, midpoint, angle, originCircleSize) {
        let originVector = originState.position.clone().add(this.offset);
        let destinationVector = destination.position.clone().add(this.offset);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, originCircleSize);
        if (destination.number == originState.number) {
            let [left, right, upperLeft, upperRight] = EditorUtils.calculateMultiedgeLoopbackPoints(angle, originVector, originCircleSize)
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
        let [width, height] = EditorUtils.calculateLabelSize(this.ctx, label, extraPadding);
        let pos = EditorUtils.calculateLabelAnchor(anchor, angle, width, height)
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
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        let pos = state.position.clone().add(this.offset);
        if (state.label) {
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x - circleSize, pos.y);
            this.ctx.lineTo(pos.x + circleSize, pos.y);
            this.ctx.stroke();
            this.ctx.font = "18px Arial";
            this.ctx.fillText(state.number, pos.x, pos.y - circleSize / 2);
            this.ctx.fillText(state.label, pos.x, pos.y + circleSize / 2);
        }
        else {
            this.ctx.font = "36px Arial";
            this.ctx.fillText(state.number, pos.x, pos.y);
        }
        this.drawCircle(pos.x, pos.y, circleSize, selected == state)

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
    drawLoop(state, loopbacks, aps, selected) {
        for (let [index, loopback] of loopbacks) {
            this.ctx.strokeStyle = selected == loopback ? "#8888FF" : "#000000"
            let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state, loopback.offset, this.circleSize, this.offset);
            this.ctx.beginPath();
            this.ctx.moveTo(left.x, left.y);
            this.ctx.bezierCurveTo(upperLeft.x, upperLeft.y, upperRight.x, upperRight.y, right.x, right.y);
            this.ctx.stroke();
            this.drawArrowhead(right.clone().subtract(upperRight), right)
            this.drawAccSetsCubic(left, upperLeft, upperRight, right, loopback.accSets);
            let anchor = EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
            let label = EditorUtils.getLabel(state, index, aps);
            this.drawLabelEdge(label, anchor, loopback.offset.angleDeg());
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
    drawEdge(originState, edgeIndex, destinationState, aps, selected) {
        let edge = originState.edges[edgeIndex];
        this.ctx.strokeStyle = edge == selected ? "#8888FF" : "#000000"
        let originVector = originState.position.clone().add(this.offset);
        let destinationVector = destinationState.position.clone().add(this.offset);
        let midpoint = EditorUtils.calculateMiddleWithOffset(originVector, destinationVector, originState.edges[edgeIndex].offset);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, this.circleSize);
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, toPoint.x, toPoint.y);
        this.ctx.stroke();
        this.drawArrowhead(toPoint.clone().subtract(midpoint), toPoint)
        this.drawAccSetsQuadratic(fromPoint, midpoint, toPoint, edge.accSets)
        let perpendicular = EditorUtils.calculatePerpendicular(fromPoint, toPoint);
        let anchor = EditorUtils.getPointOnQuadraticBezier(fromPoint, midpoint, toPoint, 0.5);
        let angle = perpendicular.multiplyScalar(-1).angleDeg();
        let label = EditorUtils.getLabel(originState, edgeIndex, aps);
        this.drawLabelEdge(label, anchor, angle);
    }
    drawEdgeBetweenPositions(fromPoint, position) {
        fromPoint.add(this.offset);
        position.add(this.offset);
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
        let statePositions = EditorUtils.statesToPositions(automaton.numbersToStates(start.stateConj));
        let originVector = start.position.clone().add(this.offset);
        let offsetPositions = statePositions.map(position => position.clone().add(this.offset));
        let midpoint = EditorUtils.calculateMidpointBetweenVectors(offsetPositions.concat(new Array(originVector)));
        this.ctx.fillStyle = "#000000";
        for (const destinationState of automaton.numbersToStates(start.stateConj)) {
            this.drawMultiEdgeElement(start, destinationState, midpoint, 0, 0);
        }
    }
    /**
     * Draws monostart.
     * 
     * @param {Start} start - Start to be drawn.
     * @param {HOA} automaton - The automaton.
     */
    drawMonoStart(start, automaton) {
        let originVector = start.position.clone().add(this.offset);
        let statePosition = automaton.getStateByNumber(start.stateConj[0]).position.clone().add(this.offset);
        let destinationVector = EditorUtils.getNearestPointOnCircle(statePosition, originVector, this.circleSize);
        this.ctx.beginPath();
        this.ctx.moveTo(originVector.x, originVector.y);
        this.ctx.lineTo(destinationVector.x, destinationVector.y);
        this.ctx.stroke();
        this.drawArrowhead(destinationVector.clone().subtract(originVector), destinationVector);
    }
    drawStartingPoint(start) {
        let originVector = start.position.clone().add(this.offset);
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(originVector.x, originVector.y, this.circleSize / 5, 0, 2 * Math.PI);
        this.ctx.fill();
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
        let s = this.circleSize;
        for (let i = 0; i < sets.length; i++) {
            let absoluteOffset = (((1 - sets.length) / 2) + i) * s;
            let bezierLength = EditorUtils.approxBezierLength(from, mid, end);
            let relativeOffset = absoluteOffset / bezierLength + 0.5;
            let point = EditorUtils.getPointOnQuadraticBezier(from, mid, end, relativeOffset);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSetsCubic(p0, p1, p2, p3, sets) {
        let s = this.circleSize;
        for (let i = 0; i < sets.length; i++) {
            let absoluteOffset = (((1 - sets.length) / 2) + i) * s;
            let bezierLength = EditorUtils.approxBezierLength(p0, p1, p2, p3);
            let relativeOffset = absoluteOffset / bezierLength + 0.5;
            let point = EditorUtils.getPointOnCubicBezier(p0, p1, p2, p3, relativeOffset);
            this.drawAccSet(point, sets[i]);
        }
    }
    drawAccSetsOnState(state) {
        let stateCenter = state.position.clone().add(this.offset);
        let sets = state.accSets;
        let s = 45;
        for (let i = 0; i < sets.length; i++) {
            let angleOffset = (((1 - sets.length) / 2) + i) * s;
            let angle = 135 - angleOffset;
            console.log(angle);
            let position = new Victor(0, this.circleSize * 1).rotateDeg(angle).add(stateCenter);
            this.drawAccSet(position, sets[i]);
        }
    }
    drawAccSet(point, label) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, this.circleSize / 3, 0, Math.PI * 2);
        this.ctx.closePath();
        let color = this.accColors[label % 10];
        console.log(color);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = this.getContrastingColor(color);
        this.ctx.fillText(label, point.x, point.y);
    }
    /**
     * Draws an edge from one state to another.
     * 
     * @param {String} color - hex representation of color.
     * @returns {String} black or white
     */
    getContrastingColor(color) {
        let r = this.convertColor(color.slice(1, 3));
        let g = this.convertColor(color.slice(3, 5));
        let b = this.convertColor(color.slice(5));
        let luminence = (0.2126 * r + 0.7152 * g + 0.0722 * b);
        return Math.sqrt(1.05 * 0.05) + 0.05 > luminence ? "#FFFFFF" : "#000000"
    }
    convertColor(colorHex) {
        let color = parseInt(colorHex, 16);
        color = color / 255
        let converted = color <= 0.03928 ? (color / 12.92) : Math.pow(((color + 0.055) / 1.055), 2.4)
        return converted;
    }
}
exports.EditorRenderer = EditorRenderer