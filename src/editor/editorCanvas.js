/* eslint-disable no-prototype-builtins */
const Victor = require('victor');
const EditorUtils = require('./editorUtils').EditorUtils;
const Automaton = require('../hoaData/automaton').Automaton;
const State = require('../hoaData/state').State;
const Start = require('../hoaData/start').Start;
const Edge = require('../hoaData/edge').Edge;
const initializePositions = require('./automatonInitializer').initializePositions;
const EditorRenderer = require('./editorRenderer').EditorRenderer;


class CanvasController {
    constructor(canvas) {
        /**@type {Automaton}*/
        /**@private */
        this.automaton = new Automaton();
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
        /**@type {function(Automaton): void}*/
        this.onSaveRequested;
        this.editorState = CanvasController.stateEnum.IDLE;
        this.destinations = [];
        this.onStateChangedListeners = [];
        this.onComponentSelectedListeners = [];
        this.detailRequestedListener;
        this.onFocusListeners = [];
        this.offset = new Victor(0, 0)
        this.labelTranslator;
        this.lastMove;
        this.backEdgeLocked = false;
        this.isLocked = false;
    }



    /**
     * Temorarily sets the backEdgeLocked variable to true.
     */
    lockBackEdge() {
        this.backEdgeLocked = true;
        setTimeout(
            ()=> this.backEdgeLocked = false
        , 750);
    }
    /**
     * Adjusts the size of canvas to fit the page.
     */
    resized() {
        if (this.renderer) {
            this.renderer.resize();
            this.draw();
        }
    }
    requestSave() {
        if (this.onSaveRequested) {
            this.onSaveRequested(this.automaton);
        }
    }
    /**
     * Adds a listener that is called when editor changes state.
     * 
     * @param {Function} fn - Callback to be added.
     */
    addonStateChangedListener(fn) {
        this.onStateChangedListeners.push(fn);
    }
    /**
     * Removes a listener that is called when editor changes state.
     * 
     * @param {Function} fn - Callback to be removed.
     */
    removeOnStateonStateChangedListener(fn) {
        this.onStateChangedListeners = this.onStateChangedListeners.filter(e => e !== fn)
    }
    /**
     * Deselects state or cancels edge addition.
     */
    escapeClicked() {
        if (this.selected != null && this.editorState != CanvasController.stateEnum.SELECTED_MODIFY) {
            this.changeState(CanvasController.stateEnum.SELECTED_MODIFY)
        }
        else if (this.editorState != CanvasController.stateEnum.IDLE) {
            this.changeState(CanvasController.stateEnum.IDLE)
        } else if (this.selected != null) {
            this.setSelected(null);
        }
        this.draw();
    }
    /**
     * Changes current state of the controller.
     * 
     * @param {stateEnum} state - New state of the automaton.
     */
    changeState(state) {
        this.editorState = state;
        for (const fn of this.onStateChangedListeners) {
            fn(state);
        }
    }
    /**
     * Binds automaton to editor.
     * 
     * @param {Automaton} automaton - Automaton object.
     */

    setAutomaton(automaton,translator) {
        /**@type {Automaton}*/
        this.automaton = automaton;
        if (!this.automaton.hasExplicitPositions) {
            initializePositions(automaton,this.canvas.width,this.canvas.height,this.circleSize)
        }
        this.labelTranslator = translator;
        this.draw();
    }

    
    /**
     * Passes current automaton to current renderer.
     */
    draw() {
        let blockedAngles = EditorUtils.calculateBlockedAngles(this.automaton,this.circleSize);
        let blockedLoopbackAngles = EditorUtils.calculateLoopbackAngles(this.automaton)
        let mergedAngles = blockedAngles.map((arr1, index) => arr1.concat(blockedLoopbackAngles[index]));
        let startAngles = EditorUtils.calculateStartAngles(this.automaton,this.circleSize)
        mergedAngles = mergedAngles.map((arr1, index) => arr1.concat(startAngles[index]));
        this.renderer.draw(this.automaton, this.offset, mergedAngles,this.labelTranslator, this.selected);

    }
    /**
     * Returns automaton currently bound to the editor.
     * 
     * @returns {Automaton} Currently bound aumaton.
     */
    getAutomaton() {
        return this.automaton;
    }
    /**
     * Sets alternative mode for editig actions.
     * 
     * @param {boolean} value - If alternative mode should be active.
     */
    setShift(value) {
        if (value) {
            if (this.editorState == CanvasController.stateEnum.ADD_EDGE) {
                this.changeState(CanvasController.stateEnum.ADD_EDGE_MULTI_BEGIN);
            }
            else if (this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI_LAST) {
                this.changeState(CanvasController.stateEnum.ADD_EDGE_MULTI);
            }
            else if (this.editorState == CanvasController.stateEnum.IDLE) {
                this.changeState(CanvasController.stateEnum.ADD_START);
            }
            else if (this.editorState == CanvasController.stateEnum.SELECTED_MODIFY) {
                this.changeState(CanvasController.stateEnum.SELECTED_SHIFT);

            }
        }
        else {
            if (this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI_BEGIN) {
                this.changeState(CanvasController.stateEnum.ADD_EDGE);
            }
            else if (this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI) {
                this.changeState(CanvasController.stateEnum.ADD_EDGE_MULTI_LAST);
            }
            else if (this.editorState == CanvasController.stateEnum.ADD_START) {
                this.changeState(CanvasController.stateEnum.IDLE);
            }
            else if (this.editorState == CanvasController.stateEnum.SELECTED_SHIFT) {
                this.changeState(CanvasController.stateEnum.SELECTED_MODIFY);
            }
        }
        this.draw();
        this.mouseMove(this.lastMove);
    }
    /**
     * Removes currently selectd object.
     */
    removeClicked() {
        if (this.isLocked) {
            return;
        }
        if (this.selected instanceof State) {
            this.requestSave();
            this.automaton.removeState(this.selected);
        }
        else if (this.selected instanceof Start) {
            this.requestSave();
            this.automaton.removeStart(this.selected);
        } else if (this.selected instanceof Edge) {
            this.requestSave();
            for (const state of this.automaton.states.values()) {
                state.edges = state.edges.filter(edge => edge != this.selected);
            }
        }
        else return;
        this.draw();
        this.setSelected(null);
        this.changeState(CanvasController.stateEnum.IDLE);
    }
    /**
     * Handles mouseDown events.
     * 
     * @param {MouseEvent} e - The mouse event.
     */
    mouseDown(e) {
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = (e.clientX - boundingBox.left) / this.renderer.scale - this.offset.x;
        let y = (e.clientY - boundingBox.top) / this.renderer.scale - this.offset.y;
        document.activeElement.blur()
        this.onFocus();
        e.preventDefault();
        e.stopPropagation();
        if (this.isLocked || this.editorState == CanvasController.stateEnum.IDLE || this.editorState == CanvasController.stateEnum.SELECTED_MODIFY) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected) {
                this.downLocation = new Victor(x, y);
                this.changeState(CanvasController.stateEnum.SELECTED);
                this.lockBackEdge();
            } else {
                this.downLocation = new Victor(x, y).add(this.offset);
                this.changeState(CanvasController.stateEnum.DRAG);
            }
        }
        else if (this.editorState == CanvasController.stateEnum.ADD_EDGE) {
            
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected instanceof State) {
                if (!this.backEdgeLocked || this.selected.number != this.first.number) {
                    this.requestSave();
                    this.addEdge(this.first, [this.selected.number]);
                    this.changeState(CanvasController.stateEnum.IDLE);
                }
            } else {
                this.first = null;
                this.destinations = [];
                this.draw();
                this.changeState(CanvasController.stateEnum.IDLE);
            }
        }
        else if (this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI_BEGIN) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.first instanceof State) {
                if (this.selected instanceof State) {
                    this.destinations.push(this.selected.number);
                    this.changeState(CanvasController.stateEnum.ADD_EDGE_MULTI);
                } else {
                    this.changeState(CanvasController.stateEnum.IDLE);
                }
            }
            else if (this.first instanceof Start) {
                this.requestSave();
                this.first.addEdge([this.selected.number]);
            }
                this.setSelected(this.first);
                this.draw();
                this.renderer.drawPartialMultiEdge(this.selected, this.automaton.numbersToStates(this.destinations), new Victor(x, y));
        }
        else if (this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected instanceof State) {
                if (this.destinations.filter(e => this.selected.number == e).length == 0) {
                    this.destinations.push(this.selected.number);
                }
                else {
                    this.destinations = this.destinations.filter(e => this.selected.number != e);
                }
                this.setSelected(this.first);
                this.draw();
                this.renderer.drawPartialMultiEdge(this.selected, this.automaton.numbersToStates(this.destinations), new Victor(x, y));
            }
            else {
                this.requestSave();
                this.addEdge(this.first, this.destinations);
                this.changeState(CanvasController.stateEnum.IDLE);
                this.setSelected(this.first);
                this.draw();
            }
        }
        else if (this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI_LAST) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected instanceof State) {
                if (this.destinations.filter(e => this.selected.number == e).length == 0) {
                    this.destinations.push(this.selected.number);
                }
                else {
                    this.destinations = this.destinations.filter(e => this.selected.number != e);
                }
            }
            this.requestSave();
            this.addEdge(this.first, this.destinations);
            this.changeState(CanvasController.stateEnum.IDLE);
            this.setSelected(this.first);
            this.draw();
        }
        else if (this.editorState == CanvasController.stateEnum.SELECTED_SHIFT && this.selected instanceof Edge||this.selected instanceof Start) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            let wasMono = this.first.stateConj.length == 1;
            if (this.selected instanceof State) {
                if (this.first instanceof Edge) {
                    if (this.first.stateConj.includes(this.selected.number) && this.first.stateConj.length > 1) {
                        this.requestSave();
                        this.first.stateConj = this.first.stateConj.filter(n => n != this.selected.number);
                    }
                    else if (!this.first.stateConj.includes(this.selected.number)) {
                        this.requestSave();
                        this.first.stateConj.push(this.selected.number)
                    }
                }
                else if (this.first instanceof Start) {
                    this.requestSave();
                    this.first.addEdge([this.selected.number]);
                }
            }
            let isMono = this.first.stateConj.length == 1;
            if (isMono != wasMono && this.first instanceof Edge) {
                this.first.offset = new Victor(0, 0);
            }
            this.selected = this.first;
            this.mouseMove(this.lastMove);
        }
    }
    /**
     * Adds edge from one state to one or more stats.
     * 
     * @param {State} from - The origin state.
     * @param {number[]} to - Array of numbers of destination states.
     */
    addEdge(from, to) {
        this.first = null;
        this.destinations = [];
        let edge = from.addEdge(to);
        if (from instanceof State) {
            edge.label = from.label.length == 0 ? ["t"] : [];
            if (from.number == to[0]) {
                edge.offset.x = this.circleSize * 4;
            }
        }
    }
    /**
     * Handles double click events.
     * 
     * @param {MouseEvent} e - The mouse event.
     */
    doubleClick(e) {
        if (this.isLocked) {
            return;
        }
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = (e.clientX - boundingBox.left) / this.renderer.scale - this.offset.x;
        let y = (e.clientY - boundingBox.top) / this.renderer.scale - this.offset.y;
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == CanvasController.stateEnum.SELECTED || this.editorState == CanvasController.stateEnum.ADD_EDGE||this.editorState ==CanvasController.stateEnum.SELECTED_MODIFY) {
            this.changeState(CanvasController.stateEnum.SELECTED_MODIFY);
            if (this.selected instanceof State || this.selected instanceof Edge) {
                this.requestDetail(this.selected, this.downLocation.clone().add(this.offset).multiplyScalar(this.renderer.scale));
            }
            this.draw();
        }
        else if (this.editorState == CanvasController.stateEnum.IDLE) {
            this.requestSave();
            this.addStateAtPosition(x, y);
            this.draw();
        }
        else if (this.editorState == CanvasController.stateEnum.ADD_START) {
            this.requestSave();
            let start = this.automaton.addStart();
            start.position = new Victor(x, y);
            this.draw();
        }
    }
    /**
     * Creates new empty state at given location.
     * 
     * @param {number} x - The x coordinate of the new state.
     * @param {number} y - The y coordinate of the new state.
     */
    addStateAtPosition(x, y) {
        let state = this.automaton.addStateImplicit();
        state.setPosition(x, y);

    }
    /**
     * Handles mouseDown events.
     * 
     * @param {MouseEvent} e - The mouse event.
     */
    mouseUp(e) {
       
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = (e.clientX - boundingBox.left) / this.renderer.scale - this.offset.x;
        let y = (e.clientY - boundingBox.top) / this.renderer.scale - this.offset.y;
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == CanvasController.stateEnum.SELECTED) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if ((this.selected instanceof State || this.selected instanceof Start) && !this.isLocked) {
                this.changeState(CanvasController.stateEnum.ADD_EDGE)
                this.draw();
            }
            else {
                this.changeState(CanvasController.stateEnum.SELECTED_MODIFY)
                this.draw();
            }
        }
        else if (this.editorState == CanvasController.stateEnum.MOVE) {
            this.changeState(CanvasController.stateEnum.SELECTED_MODIFY);
        }
        else if (this.editorState != CanvasController.stateEnum.SELECTED_SHIFT
            && this.editorState != CanvasController.stateEnum.ADD_EDGE
            && this.editorState != CanvasController.stateEnum.SELECTED_MODIFY
            && this.editorState != CanvasController.stateEnum.ADD_EDGE_MULTI
            && this.editorState != CanvasController.stateEnum.ADD_EDGE_MULTI_BEGIN
            && this.editorState != CanvasController.stateEnum.ADD_EDGE_MULTI_LAST
            && this.editorState != CanvasController.stateEnum.ADD_START) {
            this.changeState(CanvasController.stateEnum.IDLE)
            this.draw();
        }
    }
    /**
     * Handles mouse movement events.
     * 
     * @param {MouseEvent} e - The mouse event.
     */
    mouseMove(e) {
        this.lastMove = e;
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = (e.clientX - boundingBox.left) / this.renderer.scale - this.offset.x;
        let y = (e.clientY - boundingBox.top) / this.renderer.scale - this.offset.y;
        if (this.editorState == CanvasController.stateEnum.SELECTED||this.editorState == CanvasController.stateEnum.MOVE) {
            if (this.selected == null || this.downLocation == null) {
                return;
            }
            if (this.editorState == CanvasController.stateEnum.SELECTED) {
                this.requestSave();
            }
            this.changeState(CanvasController.stateEnum.MOVE)
            let dx = x - this.downLocation.x;
            let dy = y - this.downLocation.y;
            this.moveSelectedItem(dx, dy);
            this.downLocation.x = x;
            this.downLocation.y = y;
            this.draw();
        }
        else if (this.editorState == CanvasController.stateEnum.DRAG) {
            let dx = x - this.downLocation.x + this.offset.x;
            let dy = y - this.downLocation.y + this.offset.y;
            this.downLocation.x = this.downLocation.x + dx;
            this.downLocation.y = this.downLocation.y + dy;
            this.offset.x = this.offset.x + dx;
            this.offset.y = this.offset.y + dy;

            this.draw();
        }
        else if (this.editorState == CanvasController.stateEnum.ADD_EDGE && this.selected != null) {
            this.draw();
            let destination = new Victor(x, y);
            if (this.selected instanceof State) {
                let fromPoint = EditorUtils.getNearestPointOnCircle(this.selected.position, destination, this.circleSize);
                this.renderer.drawLineBetweenPositions(fromPoint, destination);

            }
            else if (this.selected instanceof Start) {
                let fromPoint = EditorUtils.getNearestPointOnCircle(this.selected.position, destination, this.circleSize / 5);
                this.renderer.drawLineBetweenPositions(fromPoint, destination);

            }
        }
        else if (this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI || this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI_BEGIN || this.editorState == CanvasController.stateEnum.ADD_EDGE_MULTI_LAST && this.selected != null) {
            this.draw();
            this.renderer.drawPartialMultiEdge(this.selected, this.automaton.numbersToStates(this.destinations), new Victor(x, y));
        }
        else if (this.editorState == CanvasController.stateEnum.SELECTED_SHIFT) {
            this.draw();
            let midpoint;
            let fromPoint;
            if (this.selected instanceof Start) {
                midpoint = EditorUtils.calculateMultiEdgeMidpoint(this.selected, this.automaton.numbersToStates(this.selected.stateConj), this.selected.offset, this.offset, this.renderer.scale)[0]
                fromPoint = EditorUtils.getNearestPointOnCircle(this.selected.position, midpoint, 0);
            }
            else if (this.selected instanceof Edge) {
                if (this.selected.stateConj.length == 1) {
                    midpoint = EditorUtils.calculateMiddleWithOffset(this.selected.parent.position, this.automaton.numbersToStates(this.selected.stateConj)[0].position, this.selected.offset.clone().multiplyScalar(this.renderer.scale));
                    console.log("if");
                }
                else {
                    midpoint = EditorUtils.calculateMultiEdgeMidpoint(this.selected.parent, this.automaton.numbersToStates(this.selected.stateConj), this.selected.offset, this.offset, this.renderer.scale)[0];
                    console.log("else");

                }
                fromPoint = EditorUtils.getNearestPointOnCircle(this.selected.parent.position, midpoint, this.circleSize);
            }
            if (midpoint) {
                this.renderer.drawQuadraticCurveBetweenPositions(fromPoint, midpoint.multiplyScalar(this.renderer.scale), new Victor(x, y));
            }
        }
    }
    /**
     * Checks if any object lies at given position.
     * 
     * @param {Victor} position - Position to check.
     */
    checkCollisionsAtPosition(position) {
        for (const start of this.automaton.start) {

            if (this.checkCircleCollision(start.position, this.circleSize / 4, position)) {
                this.setSelected(start);
                return
            }
        }
        for (const state of this.automaton.states.values()) {
            if (this.checkCircleCollision(state.position, this.circleSize, position)) {
                this.setSelected(state);
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
    /**
     * Sets object as selected.
     * 
     * @param {State|Edge|Start} object - Object to be selected.
     */
    setSelected(object) {
        this.selected = object;
        for (const fn of this.onComponentSelectedListeners) {
            fn(object);
        }
    }
    /**
     * Calls detailRequestedListener.
     * 
     * @param {State|Edge} object - Object for which the detail should be displayed.
     * @param {Victor} position - Position at which the detail should be displayed.
     */
    requestDetail(object,position) {
        if (this.detailRequestedListener) {
            this.detailRequestedListener(object,position);
        }
    }
    /**
     * Called when canvas is focused.
     */
    onFocus() {
        for (const fn of this.onFocusListeners) {
            fn();
        }
    }
    /**
     * Adds on focus listener.
     * 
     * @param {Function} listener - 
     */
    addOnFocusListener(listener) {
        this.onFocusListeners.push(listener);
    }
    /**
     * Moves currently selected object by given ammount.
     * 
     * @param {number} dx - By how much to change the position along x axis.
     * @param {number} dy - By how much to change the position along y axis.
     */
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
    /**
     * Changes offset of given edge by given ammount.
     * 
     * @param {Edge} edge - The edge which should be modified.
     * @param {number} dx - By how much to change the position along x axis.
     * @param {number} dy - By how much to change the position along y axis.
     */
    moveMonoEdge(edge, dx, dy) {
        let perpendicular = EditorUtils.calculatePerpendicular(this.automaton.getStateByNumber(edge.stateConj[0]).position, edge.parent.position)
        let movementVector = new Victor(dx, dy).rotateDeg(-perpendicular.angleDeg());
        edge.offset.add(movementVector);
    }
    /**
     * Changes offset of given alternating edge by given ammount.
     * 
     * @param {Edge} edge -  The edge which should be modified.
     * @param {number} dx - By how much to change the position along x axis.
     * @param {number} dy - By how much to change the position along y axis.
     */
    moveMultiEdge(edge, dx, dy) {

        edge.offset.add(new Victor(dx, dy));
    }
    /**
     * Check whether poin lies in circle with given center and radius.
     * 
     * @param {Victor} center - The center of the cirlce.
     * @param {number} size - Radius of the circle.
     * @param {Victor} point - The point to check.
     * @returns {boolean} True if the point lies within circle.
     */
    checkCircleCollision(center, size, point) {
        let a = center.x - point.x;
        let b = center.y - point.y;
        var dist = Math.sqrt(a * a + b * b);
        return dist < size
    }
    /**
     * Check if point lies within any label of currently bound automaton.
     * If the point collides, returns edge of colliding label.
     * 
     * @param {Victor} position - Point to check.
     * @returns {Edge|null} The edge at the position or null, if no edge is at position.
     */
    checkEdgeLabelCollision(position) {
        let stateLoopbacks = new Map();
        for (const state of this.automaton.states.values()) {
            let loopbacks = new Map();
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj.length > 1) {
                    if (this.checkMultiEdgeLabelCollision(state, edgeIndex, position)) {
                        return edge
                    }
                }
                else if (edge.stateConj[0] == state.number) {
                    loopbacks.set(edgeIndex, edge);
                }
                else {
                    if (this.chcheckSingleEdgeLabelCollision(state, edgeIndex, position)) {
                        return edge
                    }
                }
            }
            stateLoopbacks.set(state, loopbacks);
        }
        for (let [state, loopbacks] of stateLoopbacks) {
            let loobpackEdges = loopbacks.values();
            let collision = this.checkLoopbackEdgeCollision(state, loobpackEdges, position);
            if (collision != null) {
                return collision;
            }
        }
        return null;
    }
    /**
     * Checks if given point collides with any loopback edge of given state.
     * If the point collides, returns colliding edge.
     * 
     * @param {State} state - The state whose loopbacks should be checked.
     * @param {Edge[]} loopbacks - Loopbacks of given state.
     * @param {Victor} position - Position to check.
     * @returns {Edge|null} The colliding edge or null.
     */
    checkLoopbackEdgeCollision(state, loopbacks, position) {
        for (let loopback of loopbacks) {
            let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state.position, loopback.offset, this.circleSize);
            let anchor = EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
            let label = this.labelTranslator.translate(loopback.label);
            if (this.checkLabelCollision(anchor, loopback.offset.angleDeg(), label, position)) {
                return loopback;
            }
        }
        return null;
    }
    /**
     * Check if edge going out of state or its label collides with poistion.
     * 
     * @param {State} state - Origin state of the edge.
     * @param {number} edgeIndex - The index of edge in state.
     * @param {Victor} position - The position to check.
     * @returns {boolean} True if collision occured.
     */
    chcheckSingleEdgeLabelCollision(state, edgeIndex, position) {
        let edge = state.edges[edgeIndex];
        let destination = this.automaton.getStateByNumber(edge.stateConj[0]);
        let anchor = EditorUtils.calculateSingleLabelPosition(state, destination, edge, this.circleSize);

        let label = this.labelTranslator.translate(edge.label);
        let perpendicular = EditorUtils.calculatePerpendicular(state.position, destination.position);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        return this.checkLabelCollision(anchor, labelAngle, label, position);
    }
    /**
     * Check if alternating edge going out of state or its label collides with poistion.
     * 
     * @param {State} state - Origin state of the edge.
     * @param {number} edgeIndex - The index of edge in state.
     * @param {Victor} position - The position to check.
     * @returns {boolean} True if collision occured.
     */
    checkMultiEdgeLabelCollision(state, edgeIndex, position) {
        let edge = state.edges[edgeIndex];
        let destinations = this.automaton.numbersToStates(edge.stateConj);
        let midpoint = EditorUtils.calculateMultiEdgeMidpoint(state, destinations, edge.offset)[0];
        let anchor = EditorUtils.calculateMultiLabelPosition(state, destinations, midpoint);
        let label = this.labelTranslator.translate(edge.label);
        let perpendicular = EditorUtils.calculatePerpendicular(state.position, anchor);
        let labelAngle = perpendicular.multiplyScalar(-1).angleDeg()
        return this.checkLabelCollision(anchor, labelAngle, label, position);
    }

    /**
     * Check if label collides with a point.
     * 
     * @param {Victor} baseAnchor - The base anchor of label.
     * @param {number} angle - Angle of label position relative to the edge.
     * @param {string} label - Label text.
     * @param {Victor} position - Position to check.
     * @param {Victor} extraPadding - Padding around the text.
     * @returns {boolean} True if collision occured.
     */
    checkLabelCollision(baseAnchor, angle, label, position, extraPadding = 0) {
        let ctx = this.canvas.getContext("2d");
        ctx.font = EditorUtils.textStyle(20);
        let [width, height] = EditorUtils.calculateLabelSize(ctx, label, extraPadding);
        let pos = EditorUtils.calculateLabelAnchor(baseAnchor, angle, width, height)
        let [min, max] = EditorUtils.calculateLabelBounds(pos, width, height)
        return EditorUtils.isPointWithinBounds(min, max, position);
    }

    /**
     * Check if point lies within any edge of currently bound automaton.
     * If the point collides, returns edge of colliding label.
     * 
     * @param {Victor} position - Point to check.
     * @returns {Edge|null} The edge at the position or null, if no edge is at position.
     */
    checkEdgeCollision(position) {
        for (const state of this.automaton.states.values()) {
            for (const edge of state.edges) {
                if (edge.stateConj.length > 1) {
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
        var dist = EditorUtils.approxBezierLength(10,p0, p1, p2);
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
   /**
    * Checks collision with cubic curve.
    *
    * @param {Victor} p0 - First point.
    * @param {Victor} p1 - Second point.
    * @param {Victor} p2 - Third point.
    * @param {Victor} p3 - Fourth point.
    * @param {Victor} position - The position at which to check for collision.
    * @param {number} distance - Maximum distance for collision to be registered.
    * @returns {boolean} Whether or not is the point near quadratic curve.    
    */
    checkCubicCollision(p0, p1, p2, p3, position, distance) {
        var dist = EditorUtils.approxBezierLength(10,p0, p1, p2, p3);
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
    /**
     * Handles scroll events.
     * 
     * @param {MouseEvent} e - The scroll event.
     */
    changeZoom(e) {
        let change = 1 - (Math.sign(e.deltaY) / 10);
        if ((this.renderer.scale * change) > 0.1 && (this.renderer.scale * change)<10) {
            this.renderer.scale *= change;
        }
        e.preventDefault();
        e.stopPropagation();
        this.draw();
    }
}
/**
 * Enum for CanvasController states.
 * 
 * @readonly
 * @enum {number}
 */
var stateEnum = {
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
CanvasController.stateEnum = stateEnum;
exports.CanvasController = CanvasController;
