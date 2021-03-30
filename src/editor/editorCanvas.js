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
        this.editorState = EditorCanvas.stateEnum.IDLE;
        this.destinations = [];
        this.onStateChangedListeners = [];
        this.onComponentSelectedListeners = [];
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
        if (this.editorState != EditorCanvas.stateEnum.IDLE) {
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
        this.draw();
    }

    draw() {
        if (this.selected instanceof State || this.selected instanceof Edge) {
            this.blockedAngles = this.renderer.draw(this.automaton, this.selected);

        } else {
            this.blockedAngles = this.renderer.draw(this.automaton);
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
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        document.activeElement.blur()
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == EditorCanvas.stateEnum.IDLE) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected != null) {
                this.downLocation = new Position(x, y);
                this.changeState(EditorCanvas.stateEnum.SELECTED)
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
    }
    addEdgePrompt(from, to) {
        this.first = null;
        this.destinations = [];
        let edge = from.addEdge(to);
        this.automaton.SetImplicitOffsets();
        if (from instanceof State) {
            this.createEdgePromp(from, edge, to);
        }
    }
    createEdgePromp(state, edge, destinations) {
        let input = document.createElement("input");
        let boundingBox = this.canvas.getBoundingClientRect();
        let position = EditorUtils.calculateLabelPosition(state, this.automaton.numbersToStates(destinations), edge)
        input.setAttribute("type", "text");
        input.setAttribute("id", "edgePrompt");
        let x = boundingBox.left + position.x;
        let y = boundingBox.top + position.y;
        input.setAttribute("style", "position: absolute; left: " + x + "px;top: " + y + "px; transform: translate(-50%, -50%);;")
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
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == EditorCanvas.stateEnum.IDLE) {
            this.addStateAtPosition(x, y);
        }
        else if (this.editorState == EditorCanvas.stateEnum.ADD_START) {
            let start = this.automaton.addStart([]);
            start.position = new Position(x, y);
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

        }
        else if (this.editorState != EditorCanvas.stateEnum.ADD_EDGE_MULTI & this.editorState != EditorCanvas.stateEnum.ADD_EDGE_MULTI_BEGIN & this.editorState != EditorCanvas.stateEnum.ADD_EDGE_MULTI_LAST & this.editorState != EditorCanvas.stateEnum.ADD_START) {
            this.changeState(EditorCanvas.stateEnum.IDLE)
            this.draw();
        }
    }
    mouseMove(e) {
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
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
        else if (this.editorState == EditorCanvas.stateEnum.ADD_EDGE && this.selected != null) {
            this.draw();
            let destination = new Victor(x, y);
            if (this.selected instanceof State) {
                let fromPoint = EditorUtils.getNearestPointOnCircle(Victor.fromObject(this.selected.position), destination, this.circleSize);
                this.renderer.drawEdgeBetweenPositions(fromPoint, destination, this.circleSize);

            }
            else if (this.selected instanceof Start) {
                let fromPoint = EditorUtils.getNearestPointOnCircle(Victor.fromObject(this.selected.position), destination, this.circleSize / 5);
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
            let offset = start.position;
            let center = new Victor(offset.x, offset.y);
            if (this.checkCircleCollision(center, this.circleSize / 5, position)) {
                this.setSelected(start);
                return
            }
        }
        this.setSelected(this.checkEdgeLabelCollision(position));
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
        }
        else if (this.selected instanceof Start) {
            this.selected.position.x += dx;
            this.selected.position.y += dy;

        }
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
        let interval = EditorUtils.getFreeAngleInterval(this.blockedAngles[state.number]);
        let i = 0;
        for (let [index, loopback] of loopbacks) {
            let angle = EditorUtils.calculateImplicitLoopbackAngle(loopbacks.size, i, interval);
            let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state, angle, this.circleSize);
            let anchor = EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
            let label = EditorUtils.getLabel(state, index, this.automaton.ap);
            label = this.labelTranslator.translate(label);
            if (this.checkLabelCollision(anchor, angle, label, position)) {
                return loopback;
            }
            i++;
        }
        return null;
    }
    checkSingleEdgeCollision(state, edgeIndex, position) {
        let edge = state.edges[edgeIndex];
        let destination = this.automaton.getStateByNumber(edge.stateConj[0]);
        let anchor = EditorUtils.calculateSingleLabelPosition(state, destination, edge);
        let label = EditorUtils.getLabel(state, edgeIndex, this.automaton.ap);
        let perpendicular = EditorUtils.calculatePerpendicular(state.position, Victor.fromObject(destination.position));
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        label = this.labelTranslator.translate(label);
        return this.checkLabelCollision(anchor, labelAngle, label, position);
    }
    checkMultiEdgeCollision(state, edgeIndex, position) {
        let edge = state.edges[edgeIndex];
        let destinations = this.automaton.numbersToStates(edge.stateConj);
        let anchor = EditorUtils.calculateMultiLabelPosition(state, destinations);
        let label = EditorUtils.getLabel(state, edgeIndex, this.automaton.ap);
        let perpendicular = EditorUtils.calculatePerpendicular(state.position, anchor);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        label = this.labelTranslator.translate(label);
        return this.checkLabelCollision(anchor, labelAngle, label, position);
    }


    checkLabelCollision(baseAnchor, angle, label, position, extraPadding = 0) {
        let ctx = this.canvas.getContext("2d");
        ctx.font = "20px Arial";
        let [width, height] = EditorUtils.calculateLabelSize(ctx, label, extraPadding);
        let pos = EditorUtils.calculateLabelAnchor(baseAnchor, angle, width, height)
        let [min, max] = EditorUtils.calculateLabelBounds(pos, width, height)
        return EditorUtils.isPointWithinBounds(min, max, position);
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
    ADD_START: 8
}
exports.EditorCanvas = EditorCanvas;