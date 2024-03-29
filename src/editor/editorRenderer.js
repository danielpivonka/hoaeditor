
const Victor = require('victor');
const EditorUtils = require('./editorUtils').EditorUtils;
const Automaton = require('../hoaData/automaton').Automaton;
const State = require('../hoaData/state').State;
const Edge = require('../hoaData/edge').Edge;
const Start = require('../hoaData/start').Start;
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
        this.baseCircleSize = 25;
        this.circleSize = 25;
        /**@type {number}*/
        this.drawnEdges = [];
        this.scale = 1;
        this.labelTranslator;
        this.offset = new Victor(0, 0);
        this.hasMultiEdge = false;
        this.accColors = ["#285943", "#07020D", "#03F7EB", "#ea2b1f", "#13315c", "#8d80ad", "#FFA400", "#009FFD", "#20BF55", "#F6CA83"]
    }
    /**
     * Adjusts the canvas size to match the HTML element. 
     */
    resize() {
        this.canvas.width = this.canvas.parentNode.clientWidth;
        this.canvas.height = this.canvas.parentNode.clientHeight;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    }
    /**
     * Renders automaton onto bound canvas.
     * 
     * @param {Automaton} automaton - Automaton object.
     * @param {Victor} offset - By how much should the canvas be offset.
     * @param {number[][]} angles - Blocked angles.
     * @param {LabelTranslator} translator - Translator bound to te automaton.
     * @param {object} selected - The selected object.
     */
    draw(automaton, offset, angles,translator, selected) {
        this.drawnEdges = [];
        this.offset = offset;
        this.labelTranslator = translator;
        this.circleSize = this.baseCircleSize * this.scale;
        this.ctx.lineWidth = this.scale * 1.5;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawStarts(automaton,selected);
        this.hasMultiEdge = automaton.hasMultiEdge();
        let stateLoopbacks = new Map();
        for (const state of automaton.states.values()) {
            this.drawState(state, this.circleSize, selected);
            let loopbacks = new Map();
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj.length > 1) {
                    this.drawMultiEdge(state, edge, automaton.numbersToStates(edge.stateConj), selected);
                }
                else if (edge.stateConj[0] == state.number) {
                    loopbacks.set(edgeIndex, edge);
                }
                else {
                    this.drawEdge(state, edge, automaton.getStateByNumber(edge.stateConj[0]), selected);
                }
            }
            this.drawAccSetsOnState(state);
            stateLoopbacks.set(state, loopbacks);
        }
        for (let [state, loopbacks] of stateLoopbacks) {
            this.drawLoop(state, loopbacks, selected);
        }
        for (const state of automaton.states.values()) {
            if (state.name) {
                this.drawStateName(state, angles);
            }
        }
    }
    /**
     * Draws state name of given state in free spaces.
     * 
     * @param {State} state - State whose name to draw.
     * @param {number[][]} blockedAngles - Angles occupied by edges.
     */
    drawStateName(state, blockedAngles) {
        let interval = EditorUtils.getFreeAngleInterval(blockedAngles[state.number]);
        let angle;
        if (interval) {
            let distance = (interval[1] - interval[0]);
            distance = distance > 0 ? distance : distance + 360;
            angle = interval[0] + distance * 0.5;
        } else {
            angle = 180;
        }
        let anchor = new Victor(1, 0);
        anchor.rotateToDeg(angle).multiplyScalar(this.circleSize);
        anchor.add(state.position.clone().add(this.offset)).multiplyScalar(this.scale);
        let offset = 5 * state.edges.length + 3 * state.name.length;
        this.drawLabel(state.name, anchor, angle, offset, true);
    }
    /**
     * Draws starts of given automaton.
     * 
     * @param {Automaton} automaton - The automaton whose starts to draw.
     * @param {object} selected - Currently selected object.
     */
    drawStarts(automaton, selected) {
        for (const start of automaton.start) {
            let color = start == selected ? "#8888FF" : "#000000";
            this.drawStartingPoint(start,color);
            if (start.stateConj.length > 1) {
                this.drawMultiStart(start, automaton,color);
            }
            else if (start.stateConj.length == 1) {
                this.drawMonoStart(start, automaton,color);
            }
        }
    }
    /**
     * Draws alternating edge from ortigin state to destination states, plus an additional edge to the given position.
     * 
     * @param {State} originState - State from which the edge originates.
     * @param {State[]} destinationStates - Array of destination states.
     * @param {Victor} additionalPos - The position to which the additional edge will be drawn.
     */
    drawPartialMultiEdge(originState, destinationStates, additionalPos) {

        let originVector = originState.position.clone().add(this.offset).multiplyScalar(this.scale);
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of destinationStates) {
            if (destination.number == originState.number) {
                continue;
            }
            let destinationVector = destination.position.clone().add(this.offset).multiplyScalar(this.scale);
            let directionVector = destinationVector.subtract(originVector);
            midpoint.add(directionVector);
            divider++;
        }
        additionalPos = additionalPos.clone().add(this.offset).multiplyScalar(this.scale);
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


    /**
     * Draws alternating edge from origin state to destination states.
     * 
     * @param {State} originState - The origin state.
     * @param {Edge} edge - The edge to be drawn.
     * @param {State[]} destinationStates - Array of destinatinon states.
     * @param {object} selected - 
     */
    drawMultiEdge(originState, edge, destinationStates, selected) {
        this.ctx.strokeStyle = selected == edge ? "#8888FF" : "#000000"
        let originVector = originState.position.clone().add(this.offset).multiplyScalar(this.scale);
        let [midpoint, angle] = EditorUtils.calculateMultiEdgeMidpoint(originState, destinationStates, edge.offset, this.offset, this.scale)
        midpoint.multiplyScalar(this.scale);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        for (const destination of destinationStates) {
            this.drawMultiEdgeElement(originState, destination, midpoint, angle, this.circleSize);
        }
        let perpendicular = EditorUtils.calculatePerpendicular(fromPoint, midpoint);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        let label = this.labelTranslator.translate(edge.label);

        let labelAnchor = EditorUtils.calculateMultiLabelPosition(originState, destinationStates, midpoint, this.offset, this.scale);
        let pos = this.drawLabel(label, labelAnchor, labelAngle);
        this.drawLabelAccSet(edge.accSets, pos, labelAngle)
    }
    /**
     * Draws a single alternating edge curve.
     * 
     * @param {State} originState - The origin state of the alternating edge.
     * @param {State} destination - One of the destinations states of the alternating edge.
     * @param {Victor} midpoint - Midpoint of the alternating edge.
     * @param {number} angle - Angle of the alternating edge.
     * @param {number} originCircleSize - Radius of state.
     */
    drawMultiEdgeElement(originState, destination, midpoint, angle, originCircleSize) {
        let originVector = originState.position.clone().add(this.offset).multiplyScalar(this.scale);
        let destinationVector = destination.position.clone().add(this.offset).multiplyScalar(this.scale);
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
     * @param {number} background - Should this label have background.
     * @returns {Victor} Position of the rendered label.
     */
    drawLabel(label, anchor, angle, extraPadding = 0, background = false) {
        this.ctx.font = EditorUtils.textStyle(20 * this.scale);
        let [width, height] = EditorUtils.calculateLabelSize(this.ctx, label, extraPadding, this.scale);
        let pos = EditorUtils.calculateLabelAnchor(anchor, angle, width, height)
        if (background) {
            let bgwidth = width * 2 - extraPadding;
            let bgheight = height * 2 - extraPadding - 20 * this.scale;
            this.ctx.fillStyle = '#FFFF99';
            this.ctx.fillRect(pos.x - bgwidth / 2, pos.y - bgheight / 2, bgwidth, bgheight);
        }
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(label, pos.x, pos.y);
        return pos;
    }
    
    /**
     * Draws the given acceptance set at a posiiton of label.
     * 
     * @param {number[]} accSets - Array  of acceptance sets.
     * @param {Victor} anchor - Position of label.
     * @param {number} angle - Angle of label.
     */
    drawLabelAccSet(accSets,anchor,angle) {
        let roundedAngle = this.roundAngle(angle);
        let verticalOffset = new Victor(this.circleSize, 0).rotateToDeg(roundedAngle);
        let baseAnchor = anchor.clone().add(verticalOffset);
        let perpendicular = verticalOffset.clone().rotateDeg(90).normalize();
        let spacing = this.circleSize;
        for (let i = 0; i < accSets.length; i++) {
            let offsetMagnitude = (((1 - accSets.length) / 2) + i) * spacing;
            let horizontalOffset = perpendicular.clone().multiplyScalar(offsetMagnitude);
            this.drawAccSet(horizontalOffset.add(baseAnchor), accSets[i]);
        }

    }
    
    /**
     * Rounds the angle to -90 degrees or to 90 degrees, whichever is closest.
     * 
     * @param {number} angle - Angle to be rounded.
     * @returns {number} The rounded angle.
     */
    roundAngle(angle) {
        if (angle < 0) return -90;
        return 90;
    }
    /**
     * Draws the given state.
     * 
     * @param {State} state - State to be drawn.
     * @param {number} circleSize - Radius of the state.
     * @param {object} selected -
     */
    drawState(state, circleSize, selected) {
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        let pos = state.position.clone().add(this.offset).multiplyScalar(this.scale);
        if (state.label.length!=0) {
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x - circleSize, pos.y);
            this.ctx.lineTo(pos.x + circleSize, pos.y);
            this.ctx.stroke();
            this.ctx.font = EditorUtils.textStyle(18 * this.scale);
            this.ctx.fillText(state.number, pos.x, pos.y - circleSize / 2);
            this.ctx.fillText(this.labelTranslator.translate(state.label), pos.x, pos.y + circleSize / 2);
        }
        else {
            this.ctx.font = EditorUtils.textStyle(36 * this.scale);
            this.ctx.fillText(state.number, pos.x, pos.y);
        }
        this.drawCircle(pos.x, pos.y, circleSize, selected == state)

    }
    /**
     * Draws circle with given radius at given x, y coordinates.
     * 
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} size - The radius.
     * @param {boolean} isSelected - Whether or not should the circle be highlighted.
     */
    drawCircle(x, y, size, isSelected) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.stroke();
        if (isSelected) {
            this.ctx.fillStyle = "#12121240";
            this.ctx.fill();
        }
    }
    /**
     * Draws looping edges for given state.
     * 
     * @param {State} state - The state whose looping edges should be drawn.
     * @param {Edge[]} loopbacks - Array of edges to be drawn.
     * @param {object} selected - Object currently selected by the user.  
     */
    drawLoop(state, loopbacks, selected) {
        for (let [_, loopback] of loopbacks) {
            this.ctx.strokeStyle = selected == loopback ? "#8888FF" : "#000000"
            let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state.position.clone().multiplyScalar(this.scale), loopback.offset.clone().multiplyScalar(this.scale), this.circleSize, this.offset.clone().multiplyScalar(this.scale));
            this.ctx.beginPath();
            this.ctx.moveTo(left.x, left.y);
            this.ctx.bezierCurveTo(upperLeft.x, upperLeft.y, upperRight.x, upperRight.y, right.x, right.y);
            this.ctx.stroke();
            this.drawArrowhead(right.clone().subtract(upperRight), right)
            let anchor = EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
            let label = this.labelTranslator.translate(loopback.label);
            let pos = this.drawLabel(label, anchor, loopback.offset.angleDeg());
            if (this.hasMultiEdge) {
                this.drawLabelAccSet(loopback.accSets, pos, loopback.offset.angleDeg())
            }
            else {
                this.drawAccSetsCubic(left, upperLeft, upperRight, right, loopback.accSets);

            }
        }
    }
    
    /**
     * Draws an edge from one state to another.
     * 
     * @param {State} originState - State from which the edge originates.
     * @param {Edge} edge - The edge to be drawn.
     * @param {State} destinationState - State to which the edge leads.
     * @param {object} selected - Object currently selected by the user. 
     */
    drawEdge(originState, edge, destinationState, selected) {
        this.ctx.strokeStyle = edge == selected ? "#8888FF" : "#000000"
        let originVector = originState.position.clone().add(this.offset).multiplyScalar(this.scale);
        let destinationVector = destinationState.position.clone().add(this.offset).multiplyScalar(this.scale);
        let midpoint = EditorUtils.calculateMiddleWithOffset(originVector, destinationVector, edge.offset.clone().multiplyScalar(this.scale));
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, this.circleSize);
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.quadraticCurveTo(midpoint.x, midpoint.y, toPoint.x, toPoint.y);
        this.ctx.stroke();
        this.drawArrowhead(toPoint.clone().subtract(midpoint), toPoint)
        let perpendicular = EditorUtils.calculatePerpendicular(fromPoint, toPoint);
        let anchor = EditorUtils.getPointOnQuadraticBezier(fromPoint, midpoint, toPoint, 0.5);
        let angle = perpendicular.multiplyScalar(-1).angleDeg();
        let label = this.labelTranslator.translate(edge.label);
        let labelPos = this.drawLabel(label, anchor, angle);
        if (this.hasMultiEdge) {
            this.drawLabelAccSet(edge.accSets,labelPos,angle)
         }
        else {
            this.drawAccSetsQuadratic(fromPoint, midpoint, toPoint, edge.accSets)
        }

    }
    /**
     * Draws a straight line ending with arrow.
     * 
     * @param {Victor} fromPoint - Origin point of the line.
     * @param {Victor} position - Destination point of the line.
     */
    drawLineBetweenPositions(fromPoint, position) {

        fromPoint.add(this.offset).multiplyScalar(this.scale);
        position.add(this.offset).multiplyScalar(this.scale);
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.lineTo(position.x, position.y)
        this.ctx.stroke();
        this.drawArrowhead(position.clone().subtract(fromPoint), position)
    }
    drawQuadraticCurveBetweenPositions(fromPoint,midpoint, position) {
        fromPoint.add(this.offset).multiplyScalar(this.scale);
    position.add(this.offset).multiplyScalar(this.scale);
    this.ctx.beginPath();
    this.ctx.moveTo(fromPoint.x, fromPoint.y);
    this.ctx.quadraticCurveTo(midpoint.x,midpoint.y,position.x, position.y)
    this.ctx.stroke();
    this.drawArrowhead(position.clone().subtract(midpoint), position)
    }
    
    /**
     * Draws an arrowhead onto bound canvas.
     * 
     * @param {Victor} direction - Direction of the arrowhead.
     * @param {Victor} point - Position of the peak of the arrowhead.
     */
    drawArrowhead(direction, point) {
        let directionNormalized = direction.clone().normalize().multiplyScalar(10 * this.scale);
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
     * @param {Automaton} automaton - The automaton to which the start belongs.
     * @param {string} color - Which color should be used to draw the start.
     */
    drawMultiStart(start, automaton,color) {
        let statePositions = EditorUtils.statesToPositions(automaton.numbersToStates(start.stateConj));
        let originVector = start.position.clone().add(this.offset).multiplyScalar(this.scale);
        let offsetPositions = statePositions.map(position => position.clone().add(this.offset).multiplyScalar(this.scale));
        let midpoint = EditorUtils.calculateMidpointBetweenVectors(offsetPositions.concat(new Array(originVector)));
        this.ctx.strokeStyle = color;
        for (const destinationState of automaton.numbersToStates(start.stateConj)) {
            this.drawMultiEdgeElement(start, destinationState, midpoint, 0, 0);
        }
    }
    /**
     * Draws monostart.
     * 
     * @param {Start} start - Start to be drawn.
     * @param {Automaton} automaton - The automaton to which the start belongs.
     * @param {string} color - Which color should be used to draw the start.
     */
    drawMonoStart(start, automaton,color) {
        let originVector = start.position.clone().add(this.offset).multiplyScalar(this.scale);
        let statePosition = automaton.getStateByNumber(start.stateConj[0]).position.clone().add(this.offset).multiplyScalar(this.scale);
        let destinationVector = EditorUtils.getNearestPointOnCircle(statePosition, originVector, this.circleSize);
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(originVector.x, originVector.y);
        this.ctx.lineTo(destinationVector.x, destinationVector.y);
        this.ctx.stroke();
        this.drawArrowhead(destinationVector.clone().subtract(originVector), destinationVector);
    }
    /**
     * Draws the head of the start.
     * 
     * @param {Start} start - The start whose head should be drawn.
     * @param {string} color - Which color should be used to draw the start.
     */
    drawStartingPoint(start,color) {
        let originVector = start.position.clone().add(this.offset).multiplyScalar(this.scale);
        this.ctx.fillStyle = color;
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
       
        let steps = 500;
        let points = EditorUtils.getPointsOnBezier(steps, from, mid, end);
        let bezierLength = points.slice(-1)[0];
        let centerDistance = points[Math.round(steps / 2)];
        let center = centerDistance / bezierLength;
        if (s * sets.length > bezierLength*0.9) {
            s = bezierLength*0.9 / sets.length;
        }
        for (let i = 0; i < sets.length; i++) {
            let absoluteOffset = (((1 - sets.length) / 2) + i) * s;
            let relativeOffset = absoluteOffset / bezierLength + center;
            let convertedOffset = EditorUtils.getTAtPercentage(points,relativeOffset);
            let point = EditorUtils.getPointOnQuadraticBezier(from, mid, end, convertedOffset);
            this.drawAccSet(point, sets[i]);
        }
    }
    /**
     * Draws acceptance sets along a cubic path.
     * 
     * @param {Victor} p0 - Point p0 of cubic curve.
     * @param {Victor} p1 - Point p1 of cubic curve.
     * @param {Victor} p2 - Point p2 of cubic curve.
     * @param {Victor} p3 - Point p3 of cubic curve.
     * @param {number[]} sets - Array of numbers of acceptance sets.
     */
    drawAccSetsCubic(p0, p1, p2, p3, sets) {
        let s = this.circleSize;
        let points = EditorUtils.getPointsOnBezier(500, p0, p1, p2, p3);
        let bezierLength = points.slice(-1)[0];
        if (s * sets.length > bezierLength) {
            s = bezierLength / sets.length;
        }
        for (let i = 0; i < sets.length; i++) {
            let absoluteOffset = (((1 - sets.length) / 2) + i) * (s);
            let relativeOffset = absoluteOffset / bezierLength + 0.5;
            let convertedOffset = EditorUtils.getTAtPercentage(points,relativeOffset);
            let point = EditorUtils.getPointOnCubicBezier(p0, p1, p2, p3, convertedOffset);
            this.drawAccSet(point, sets[i]);
        }
    }
    /**
     * Draws acceptance sets on a state.
     * 
     * @param {State} state - State on which to draw the acceptance sets.
     */
    drawAccSetsOnState(state) {
        let stateCenter = state.position.clone().add(this.offset).multiplyScalar(this.scale);
        let sets = state.accSets;
        let s = 45;
        for (let i = 0; i < sets.length; i++) {
            let angleOffset = (((1 - sets.length) / 2) + i) * s;
            let angle = 135 - angleOffset;
            let position = new Victor(0, this.circleSize * 1).rotateDeg(angle).add(stateCenter);
            this.drawAccSet(position, sets[i]);
        }
    }
    /**
     * Draws an acceptance set marker.
     * 
     * @param {Victor} point - Point at which to draw the marker.
     * @param {number} label - Number of the acceptance set.
     */
    drawAccSet(point, label) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, this.circleSize / 3, 0, Math.PI * 2);
        this.ctx.closePath();
        let color = this.accColors[label % 10];
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.font = EditorUtils.textStyle(16 * this.scale);
        this.ctx.fillStyle = this.getContrastingColor(color);
        this.ctx.fillText(label, point.x, point.y);
    }

    //formulas used below taken from https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
    /**
     * Calculates contrasting color to a given color.
     * 
     * @param {string} color - Hex representation of color.
     * @returns {string} Black or white.
     */
    getContrastingColor(color) {
        let r = this.convertColor(color.slice(1, 3));
        let g = this.convertColor(color.slice(3, 5));
        let b = this.convertColor(color.slice(5));
        let luminence = (0.2126 * r + 0.7152 * g + 0.0722 * b);
        return Math.sqrt(1.05 * 0.05) + 0.05 > luminence ? "#FFFFFF" : "#000000"
    }
    /**
     * Converts color to sRGB luminence.
     * 
     * @param {string} colorHex - Hex representation of color.
     * @returns {string} Converted color.
     */
    convertColor(colorHex) {
        let color = parseInt(colorHex, 16);
        color = color / 255
        let converted = color <= 0.03928 ? (color / 12.92) : Math.pow(((color + 0.055) / 1.055), 2.4)
        return converted;
    }

}
exports.EditorRenderer = EditorRenderer