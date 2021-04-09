/* eslint-disable no-prototype-builtins */
const Position = require('../hoaObject').Position;
const Victor = require('victor');
const EditorUtils = require('./editorUtils').EditorUtils;
const HOA = require('../hoaObject').HOA;
const State = require('../hoaObject').State;
const Start = require('../hoaObject').Start;
const Edge = require('../hoaObject').Edge;

const EditorRenderer = require('./editorRenderer').EditorRenderer;
const LabelTranslator = require('../labelTranslator').LabelTranslator;


class EditorCanvas {
    constructor(canvas) {
        /**@type {HOA}*/
        this.automaton = new HOA();
        /**@type {HTMLCanvasElement}*/
        this.canvas = canvas;
        this.circleSize = 25;
        /**@type {AutomatonComponent}*/
        this.selected = null;
        this.downLocation = null;
        this.renderer = new EditorRenderer(canvas)
        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
        this.canvas.ondblclick = this.doubleClick.bind(this);
        this.canvas.onwheel = this.changeZoom.bind(this);
        this.editorState = EditorCanvas.stateEnum.IDLE;
        this.destinations = [];
        this.onStateChangedListeners = [];
        this.onComponentSelectedListeners = [];
        this.offset = new Victor(0, 0)
        this.labelTranslator = new LabelTranslator(this.automaton.aliases, this.automaton.ap);

    }
    resized() {
        if (this.renderer) {
            this.renderer.resize();
            this.draw();
        }
    }
    addOnStateonStateChangedListener(fn) {
        this.onStateChangedListeners.push(fn);
    }
    removeOnStateonStateChangedListener(fn) {
        this.onStateChangedListeners = this.onStateChangedListeners.filter(e => e !== fn)
    }
    escapeClicked() {
        if (this.selected != null && this.editorState != EditorCanvas.stateEnum.SELECTED_MODIFY) {
            this.changeState(EditorCanvas.stateEnum.SELECTED_MODIFY)
        }
        else if (this.editorState != EditorCanvas.stateEnum.IDLE) {
            this.changeState(EditorCanvas.stateEnum.IDLE)
        } else if (this.selected != null) {
            this.setSelected(null);
        }
        this.draw();
    }
    changeState(state) {
        this.editorState = state;
        for (const fn of this.onStateChangedListeners) {
            fn(state);
        }
        console.log(this.editorState);

    }
    /**
     * Binds automaton to editor.
     * 
     * @param {HOA} automaton - Automaton object.
     */

    setAutomaton(automaton) {
        /**@type {HOA}*/
        this.automaton = automaton;
        this.automaton.setImplicitPositions(this.canvas.width, this.canvas.height);
        this.automaton.SetImplicitOffsets();
        let blockedAngles = this.automaton.calculateBlockedAngles(this.circleSize);
        this.automaton.calculateLoopbackAnchors(blockedAngles, this.circleSize);
        this.labelTranslator = new LabelTranslator(this.automaton.aliases, this.automaton.ap);
        this.draw();
    }

    draw() {
        let blockedAngles = this.automaton.calculateBlockedAngles(this.circleSize);
        let blockedLoopbackAngles = this.automaton.calculateLoopbackAngles()
        let mergedAngles = blockedAngles.map((arr1, index) => arr1.concat(blockedLoopbackAngles[index]));
        if (this.selected instanceof State || this.selected instanceof Edge) {
            this.renderer.draw(this.automaton, this.offset, mergedAngles, this.selected);

        } else {
            this.renderer.draw(this.automaton, this.offset, mergedAngles);
        }
    }
    getAutomaton() {
        return this.automaton;
    }
    setShift(value) {
        if (value) {
            if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE) {
                this.changeState(EditorCanvas.stateEnum.ADD_EDGE_MULTI_BEGIN);
            }
            else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI_LAST) {
                this.changeState(EditorCanvas.stateEnum.ADD_EDGE_MULTI);
            }
            else if (this.editorState == EditorCanvas.stateEnum.IDLE) {
                this.changeState(EditorCanvas.stateEnum.ADD_START);
            }
            else if (this.editorState == EditorCanvas.stateEnum.SELECTED_MODIFY) {
                this.changeState(EditorCanvas.stateEnum.SELECTED_SHIFT);

            }
        }
        else {
            if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI_BEGIN) {
                this.changeState(EditorCanvas.stateEnum.ADD_EDGE);
            }
            else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI) {
                this.changeState(EditorCanvas.stateEnum.ADD_EDGE_MULTI_LAST);
            }
            else if (this.editorState == EditorCanvas.stateEnum.ADD_START) {
                this.changeState(EditorCanvas.stateEnum.IDLE);
            }
            else if (this.editorState == EditorCanvas.stateEnum.SELECTED_SHIFT) {
                this.changeState(EditorCanvas.stateEnum.SELECTED_MODIFY);
            }
        }
    }

    removeClicked() {
        if (this.selected instanceof State) {
            this.automaton.removeState(this.selected);
            this.draw();
            this.setSelected(null);
        }
        else if (this.selected instanceof Start) {
            this.automaton.removeStart(this.selected);
            this.draw();
            this.setSelected(null);
        } else if (this.selected instanceof Edge) {
            for (const state of this.automaton.states.values()) {
                state.edges = state.edges.filter(edge => edge != this.selected);
            }
            this.draw();
            this.setSelected(null);
        }
    }
    mouseDown(e) {
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = (e.clientX - boundingBox.left) / this.renderer.scale - this.offset.x;
        let y = (e.clientY - boundingBox.top) / this.renderer.scale - this.offset.y;
        document.activeElement.blur()
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == EditorCanvas.stateEnum.IDLE || this.editorState == EditorCanvas.stateEnum.SELECTED_MODIFY) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected != null) {
                this.downLocation = new Victor(x, y);
                this.changeState(EditorCanvas.stateEnum.SELECTED)
                this.draw();
            }
            else {
                this.downLocation = new Victor(x, y).add(this.offset);
                this.changeState(EditorCanvas.stateEnum.DRAG)
            }
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected instanceof State) {
                this.addEdgePrompt(this.first, [this.selected.number]);
            } else {
                this.first = null;
                this.destinations = [];
                this.changeState(EditorCanvas.stateEnum.IDLE);
                this.draw();
            }
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI_BEGIN) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected instanceof State) {
                this.destinations.push(this.selected.number);
                this.changeState(EditorCanvas.stateEnum.ADD_EDGE_MULTI);
            } else {
                this.changeState(EditorCanvas.stateEnum.IDLE);
            }
            this.setSelected(this.first);
            this.draw();
            this.renderer.drawPartialMultiEdge(this.selected, this.automaton.numbersToStates(this.destinations), new Victor(x, y));
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected instanceof State) {
                this.destinations.push(this.selected.number);
                this.changeState(EditorCanvas.stateEnum.ADD_EDGE_MULTI);
            }
            else {
                this.addEdgePrompt(this.first, this.destinations);
            }
            this.setSelected(this.first);
            this.draw();
            this.renderer.drawPartialMultiEdge(this.selected, this.automaton.numbersToStates(this.destinations), new Victor(x, y));
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI_LAST) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected instanceof State) {
                this.destinations.push(this.selected.number);
                this.changeState(EditorCanvas.stateEnum.ADD_EDGE_MULTI);
            }
            this.addEdgePrompt(this.first, this.destinations);
            this.changeState(EditorCanvas.stateEnum.IDLE);
            this.setSelected(this.first);
            this.draw();
        }
        else if (this.editorState == EditorCanvas.stateEnum.SELECTED_SHIFT && this.selected instanceof Edge) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            let wasMono = this.first.stateConj.length == 1;
            if (this.selected instanceof State && this.first instanceof Edge) {
                if (this.first.stateConj.includes(this.selected.number) && this.first.stateConj.length > 1) {
                    this.first.stateConj = this.first.stateConj.filter(n => n != this.selected.number);
                }
                else {
                    this.first.stateConj.push(this.selected.number)
                }

            }
            let isMono = this.first.stateConj.length == 1;
            if (isMono != wasMono) {
                this.first.offset = new Victor(0, 0);
            }
            this.selected = this.first;
            this.draw();

        }
    }
    addEdgePrompt(from, to) {
        this.first = null;
        this.destinations = [];
        let edge = from.addEdge(to);
        if (from.number == to[0]) {
            edge.offset.x = this.circleSize * 4;
        }
        if (from instanceof State) {
            this.createEdgePromp(from, edge, to);
        }
    }
    createEdgePromp(state, edge, destinations) {
        let input = document.createElement("input");
        let boundingBox = this.canvas.getBoundingClientRect();
        let position = EditorUtils.calculateLabelPosition(state, this.automaton.numbersToStates(destinations), edge, this.circleSize * this.renderer.scale);
        input.setAttribute("type", "text");
        input.setAttribute("id", "edgePrompt");
        let x = boundingBox.left + (position.x + this.offset.x) * this.renderer.scale;
        let y = boundingBox.top + (position.y + this.offset.y) * this.renderer.scale;
        console.log("position: absolute; left: " + x + "px;top: " + y + "px; transform: translate(-50%, -50%);");
        input.setAttribute("style", "position: absolute; left: " + x + "px;top: " + y + "px; transform: translate(-50%, -50%);")
        document.getElementsByTagName("body")[0].appendChild(input);
        input.focus();
        input.addEventListener("focusout", () => this.saveEdgePrompt(edge, input.value));
        input.addEventListener("keydown", (e) => { if (e.key == "Enter") { this.saveEdgePrompt(edge, input.value) } })
    }
    saveEdgePrompt(edge, input) {
        edge.setLabel(input);
        document.getElementById("edgePrompt").remove()
        this.draw();
    }
    doubleClick(e) {
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = (e.clientX - boundingBox.left) / this.renderer.scale - this.offset.x;
        let y = (e.clientY - boundingBox.top) / this.renderer.scale - this.offset.y;
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == EditorCanvas.stateEnum.IDLE) {
            this.addStateAtPosition(x, y);
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_START) {
            let start = this.automaton.addStart([]);
            start.position = new Victor(x, y);
        }
        this.draw();
    }
    addStateAtPosition(x, y) {
        let state = this.automaton.addStateImplicit();
        state.setPosition(x, y);

    }
    mouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == EditorCanvas.stateEnum.SELECTED && !(this.selected instanceof Edge)) {
            this.changeState(EditorCanvas.stateEnum.ADD_EDGE)
            this.draw();

        } else if (this.editorState == EditorCanvas.stateEnum.SELECTED || this.editorState == EditorCanvas.stateEnum.MOVE) {
            this.changeState(EditorCanvas.stateEnum.SELECTED_MODIFY);

        }
        else if (this.editorState != EditorCanvas.stateEnum.SELECTED_SHIFT && this.editorState != EditorCanvas.stateEnum.SELECTED_MODIFY && this.editorState != EditorCanvas.stateEnum.ADD_EDGE_MULTI && this.editorState != EditorCanvas.stateEnum.ADD_EDGE_MULTI_BEGIN && this.editorState != EditorCanvas.stateEnum.ADD_EDGE_MULTI_LAST && this.editorState != EditorCanvas.stateEnum.ADD_START) {
            this.changeState(EditorCanvas.stateEnum.IDLE)
            this.draw();
        }
    }
    mouseMove(e) {
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = (e.clientX - boundingBox.left) / this.renderer.scale - this.offset.x;
        let y = (e.clientY - boundingBox.top) / this.renderer.scale - this.offset.y;
        if (this.editorState == EditorCanvas.stateEnum.SELECTED || this.editorState == EditorCanvas.stateEnum.MOVE) {
            if (this.selected == null || this.downLocation == null) {
                return;
            }
            this.changeState(EditorCanvas.stateEnum.MOVE)
            let dx = x - this.downLocation.x;
            let dy = y - this.downLocation.y;
            this.moveSelectedItem(dx, dy);
            this.downLocation.x = x;
            this.downLocation.y = y;
            this.draw();
        }
        else if (this.editorState == EditorCanvas.stateEnum.DRAG) {
            let dx = x - this.downLocation.x + this.offset.x;
            let dy = y - this.downLocation.y + this.offset.y;
            this.downLocation.x = this.downLocation.x + dx;
            this.downLocation.y = this.downLocation.y + dy;
            this.offset.x = this.offset.x + dx;
            this.offset.y = this.offset.y + dy;

            this.draw();
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE && this.selected != null) {
            this.draw();
            let destination = new Victor(x, y);
            if (this.selected instanceof State) {
                let fromPoint = EditorUtils.getNearestPointOnCircle(this.selected.position, destination, this.circleSize);
                this.renderer.drawEdgeBetweenPositions(fromPoint, destination);

            }
            else if (this.selected instanceof Start) {
                let fromPoint = EditorUtils.getNearestPointOnCircle(this.selected.position, destination, this.circleSize / 5);
                this.renderer.drawEdgeBetweenPositions(fromPoint, destination);

            }
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI || this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI_BEGIN || this.editorState == EditorCanvas.stateEnum.ADD_EDGE_MULTI_LAST && this.selected != null) {
            this.draw();
            this.renderer.drawPartialMultiEdge(this.selected, this.automaton.numbersToStates(this.destinations), new Victor(x, y));
        }
    }

    checkCollisionsAtPosition(position) {
        for (const state of this.automaton.states.values()) {
            if (this.checkCircleCollision(state.position, this.circleSize, position)) {
                this.setSelected(state);
                return
            }
        }
        for (const start of this.automaton.start) {

            if (this.checkCircleCollision(start.position, this.circleSize / 5, position)) {
                this.setSelected(start);
                return
            }
        }
        let labelResult = this.checkEdgeLabelCollision(position);
        if (labelResult) {
            this.setSelected(labelResult);
            return
        }
        let edgeResult = this.checkEdgeCollision(position);
        if (edgeResult) {
            this.setSelected(edgeResult);
            return
        }
        this.setSelected(null);

    }
    setSelected(object) {
        this.selected = object;
        for (const fn of this.onComponentSelectedListeners) {
            fn(object);
        }
    }
    moveSelectedItem(dx, dy) {
        if (this.selected instanceof State) {
            this.selected.position.x += dx;
            this.selected.position.y += dy;
            for (const start of this.automaton.start) {
                if (start.stateConj.length == 1 && start.stateConj[0] == this.selected.number) {
                    start.position.x += dx;
                    start.position.y += dy;
                }
            }
        }
        else if (this.selected instanceof Start) {
            this.selected.position.x += dx;
            this.selected.position.y += dy;

        }
        else if (this.selected instanceof Edge) {
            if (this.selected.stateConj.length > 1) {
                this.moveMultiEdge(this.selected, dx, dy)
            } else {
                this.moveMonoEdge(this.selected, dx, dy);
            }
        }
    }

    moveMonoEdge(edge, dx, dy) {
        let perpendicular = EditorUtils.calculatePerpendicular(this.automaton.getStateByNumber(edge.stateConj[0]).position, this.automaton.getStateByNumber(edge.parent).position)
        let movementVector = new Victor(dx, dy).rotateDeg(-perpendicular.angleDeg());
        edge.offset.add(movementVector);
    }
    moveMultiEdge(edge, dx, dy) {

        edge.offset.add(new Victor(dx, dy));
    }
    checkCircleCollision(center, size, point) {
        let a = center.x - point.x;
        let b = center.y - point.y;
        var dist = Math.sqrt(a * a + b * b);
        return dist < size
    }
    checkEdgeLabelCollision(position) {
        let stateLoopbacks = new Map();
        for (const state of this.automaton.states.values()) {
            let loopbacks = new Map();
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj.length > 1) {
                    if (this.checkMultiEdgeCollision(state, edgeIndex, position)) {
                        return edge
                    }
                }
                else if (edge.stateConj[0] == state.number) {
                    loopbacks.set(edgeIndex, edge);
                }
                else {
                    if (this.checkSingleEdgeCollision(state, edgeIndex, position)) {
                        return edge
                    }
                }
            }
            stateLoopbacks.set(state, loopbacks);
        }
        for (let [state, loopbacks] of stateLoopbacks) {
            let collision = this.checkLoopbackEdgeCollision(state, loopbacks, position);
            if (collision != null) {
                return collision;
            }
        }
        return null;
    }
    checkLoopbackEdgeCollision(state, loopbacks, position) {
        for (let [index, loopback] of loopbacks) {
            let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state.position, loopback.offset, this.circleSize);
            let anchor = EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
            let label = EditorUtils.getLabel(state, index, this.automaton.ap);
            label = this.labelTranslator.translate(label);
            if (this.checkLabelCollision(anchor, loopback.offset.angleDeg(), label, position)) {
                return loopback;
            }
        }
        return null;
    }
    checkSingleEdgeCollision(state, edgeIndex, position) {
        let edge = state.edges[edgeIndex];
        let destination = this.automaton.getStateByNumber(edge.stateConj[0]);
        let anchor = EditorUtils.calculateSingleLabelPosition(state, destination, edge, this.circleSize);

        let label = EditorUtils.getLabel(state, edgeIndex, this.automaton.ap);
        label = this.labelTranslator.translate(label);
        let perpendicular = EditorUtils.calculatePerpendicular(state.position, destination.position);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        return this.checkLabelCollision(anchor, labelAngle, label, position);
    }
    checkMultiEdgeCollision(state, edgeIndex, position) {
        let edge = state.edges[edgeIndex];
        let destinations = this.automaton.numbersToStates(edge.stateConj);
        let midpoint = EditorUtils.calculateMultiEdgeMidpoint(state, destinations, edge.offset)[0];
        let anchor = EditorUtils.calculateMultiLabelPosition(state, destinations, midpoint);
        let label = EditorUtils.getLabel(state, edgeIndex, this.automaton.ap);
        let perpendicular = EditorUtils.calculatePerpendicular(state.position, anchor);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        label = this.labelTranslator.translate(label);
        return this.checkLabelCollision(anchor, labelAngle, label, position);
    }


    checkLabelCollision(baseAnchor, angle, label, position, extraPadding = 0) {
        let ctx = this.canvas.getContext("2d");
        ctx.font = EditorUtils.textStyle(20);
        let [width, height] = EditorUtils.calculateLabelSize(ctx, label, extraPadding);
        let pos = EditorUtils.calculateLabelAnchor(baseAnchor, angle, width, height)
        let [min, max] = EditorUtils.calculateLabelBounds(pos, width, height)
        return EditorUtils.isPointWithinBounds(min, max, position);
    }
    checkEdgeCollision(position) {
        for (const state of this.automaton.states.values()) {
            for (const edge of state.edges) {
                if (edge.stateConj.length > 1) {
                    console.log("checking for multi edge collision")
                    let destinationStates = this.automaton.numbersToStates(edge.stateConj);
                    let [midpoint, angle] = EditorUtils.calculateMultiEdgeMidpoint(state, destinationStates, edge.offset)
                    let fromPoint = EditorUtils.getNearestPointOnCircle(state.position, midpoint, this.circleSize);
                    for (const destinationState of destinationStates) {
                        if (destinationState == state) {
                            let [left, right, upperLeft, upperRight] = EditorUtils.calculateMultiedgeLoopbackPoints(angle, state.position, this.circleSize)
                            if (this.checkCubicCollision(left, upperLeft, upperRight, right, position, 5)) {
                                return edge;
                            }
                        }
                        else {
                            let toPoint = EditorUtils.getNearestPointOnCircle(destinationState.position, midpoint, this.circleSize);

                            if (this.checkQuadraticCollision(fromPoint, midpoint, toPoint, position, 5)) {
                                return edge;
                            }
                        }
                    }
                }
                else if (edge.stateConj[0] == state.number) {
                    let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state.position, edge.offset, this.circleSize);
                    if (this.checkCubicCollision(left, upperLeft, upperRight, right, position, 5)) {
                        return edge;
                    }
                }
                else {
                    let destinationVector = this.automaton.getStateByNumber(edge.stateConj[0]).position;
                    let midpoint = EditorUtils.calculateMiddleWithOffset(state.position, destinationVector, edge.offset);
                    let fromPoint = EditorUtils.getNearestPointOnCircle(state.position, midpoint, this.circleSize);
                    let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, this.circleSize);
                    if (this.checkQuadraticCollision(fromPoint, midpoint, toPoint, position, 5)) {
                        return edge;
                    }
                }
            }
        }
    }


    /**
    * Checks collision with quadratic curve.
    *
    * @param {Victor} p0 - First point.
    * @param {Victor} p1 - Second point.
    * @param {Victor} p2 - Third point.
    * @param {Victor} position - The position at which to check for collision.
    * @param {number} distance - Maximum distance for collision to be registered.
    * @returns {boolean} Whether or not is the point near quadratic curve.    
    */
    checkQuadraticCollision(p0, p1, p2, position, distance) {
        var dist = EditorUtils.approxBezierLength(p0, p1, p2);
        let steps = Math.ceil(dist)
        let stepSize = 1 / steps;
        let distanceLimitSquared = distance * distance;
        for (var i = 0; i < steps; i++) {
            let bezierPoint = EditorUtils.getPointOnQuadraticBezier(p0, p1, p2, i * stepSize);
            let distanceSquared = bezierPoint.subtract(position).lengthSq();
            if (distanceSquared < distanceLimitSquared) {
                return true;
            }
        }
        return false;
    }
    checkCubicCollision(p0, p1, p2, p3, position, distance) {
        var dist = EditorUtils.approxBezierLength(p0, p1, p2, p3);
        let steps = Math.ceil(dist)
        let stepSize = 1 / steps;
        let distanceLimitSquared = distance * distance;
        for (var i = 0; i < steps; i++) {
            let bezierPoint = EditorUtils.getPointOnCubicBezier(p0, p1, p2, p3, i * stepSize);
            let distanceSquared = bezierPoint.subtract(position).lengthSq();
            if (distanceSquared < distanceLimitSquared) {
                return true;
            }
        }
        return false;
    }
    changeZoom(e) {
        let change = 1 - (e.deltaY / 10);
        console.log("change: " + this.renderer.scale);
        if ((this.renderer.scale * change) > 0.1) {
            this.renderer.scale *= change;
            console.log("scale: " + this.renderer.scale);
        }
        e.preventDefault();
        e.stopPropagation();
        this.draw();
    }
}
EditorCanvas.stateEnum = {
    IDLE: 1,
    SELECTED: 2,
    ADD_EDGE: 3,
    MOVE: 4,
    ADD_EDGE_MULTI_BEGIN: 5,
    ADD_EDGE_MULTI: 6,
    ADD_EDGE_MULTI_LAST: 7,
    ADD_START: 8,
    DRAG: 9,
    SELECTED_MODIFY: 10,
    SELECTED_SHIFT: 11
}
exports.EditorCanvas = EditorCanvas;