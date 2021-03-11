const Position = require('../hoaObject').Position;
const Victor = require('victor');
const EditorUtils = require('./editorUtils').EditorUtils;
const HOA = require('../hoaObject').HOA;
const EditorRenderer = require('./editorRenderer').EditorRenderer;


class Editor {
    constructor(canvas) {
        /**@type {HOA}*/
        this.automaton = new HOA();
        /**@type {HTMLCanvasElement}*/
        this.canvas = canvas;
        this.circleSize = 25;
        /**@type {number}*/
        this.selected = null;
        this.selectedType = null;
        this.downLocation = null;
        this.renderer = new EditorRenderer(canvas)
        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
        this.canvas.ondblclick = this.doubleClick.bind(this);
        this.editorState = Editor.stateEnum.IDLE;
        this.destinations = [];
        this.onStateChangedListeners = [];

    }
    addOnStateonStateChangedListener(fn) {
        this.onStateChangedListeners.push(fn);
    }
    removeOnStateonStateChangedListener(fn) {
        this.onStateChangedListeners = this.onStateChangedListeners.filter(e => e !== fn)
    }
    changeState(state) {
        this.editorState = state;
        console.log(state);
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
        if (this.selectedType == Editor.selectedEnum.STATE) {
            this.renderer.draw(this.automaton, this.automaton.getStateByNumber(this.selected));

        } else {
            this.renderer.draw(this.automaton);
        }
    }
    getAutomaton() {
        return this.automaton;
    }
    setShift(value) {
        if (value) {
            if (this.editorState == Editor.stateEnum.ADD_EDGE) {
                this.changeState(Editor.stateEnum.ADD_EDGE_MULTI_BEGIN);
            }
            else if (this.editorState == Editor.stateEnum.ADD_EDGE_MULTI_LAST) {
                this.changeState(Editor.stateEnum.ADD_EDGE_MULTI);
            }
        }
        else {
            if (this.editorState == Editor.stateEnum.ADD_EDGE_MULTI_BEGIN) {
                this.changeState(Editor.stateEnum.ADD_EDGE);
            }
            else if (this.editorState == Editor.stateEnum.ADD_EDGE_MULTI) {
                this.changeState(Editor.stateEnum.ADD_EDGE_MULTI_LAST);
            }
        }
    }

    removeClicked() {
        if (this.selectedType == Editor.selectedEnum.STATE) {
            this.automaton.removeState(this.selected);
            this.draw();
            this.selected = null;
        }
    }
    mouseDown(e) {
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == Editor.stateEnum.IDLE) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected != null) {
                this.downLocation = new Position(x, y);
                this.changeState(Editor.stateEnum.SELECTED)
            }
        }
        else if (this.editorState == Editor.stateEnum.ADD_EDGE) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selectedType == Editor.selectedEnum.STATE && this.selected != null) {
                this.automaton.getStateByNumber(this.first).addEdge([this.selected]);
                this.automaton.SetImplicitOffsets();
            }
            this.changeState(Editor.stateEnum.IDLE);
            this.draw();
        }
        else if (this.editorState == Editor.stateEnum.ADD_EDGE_MULTI_BEGIN) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selectedType == Editor.selectedEnum.STATE && this.selected != null) {
                this.destinations.push(this.selected);
                this.changeState(Editor.stateEnum.ADD_EDGE_MULTI);
            } else {
                this.changeState(Editor.stateEnum.IDLE);
            }
            this.selected = this.first;
            this.draw();
        }
        else if (this.editorState == Editor.stateEnum.ADD_EDGE_MULTI) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selectedType == Editor.selectedEnum.STATE && this.selected != null) {
                this.destinations.push(this.selected);
                this.changeState(Editor.stateEnum.ADD_EDGE_MULTI);
            }
            else {
                this.automaton.getStateByNumber(this.first).addEdge(this.destinations);
                this.first = null;
                this.destinations = [];
                this.changeState(Editor.stateEnum.IDLE);
            }
            this.selected = this.first;
            this.draw();
        }
        else if (this.editorState == Editor.stateEnum.ADD_EDGE_MULTI_LAST) {
            this.first = this.selected;
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selectedType == Editor.selectedEnum.STATE && this.selected != null) {
                this.destinations.push(this.selected);
                this.changeState(Editor.stateEnum.ADD_EDGE_MULTI);
            }

            this.automaton.getStateByNumber(this.first).addEdge(this.destinations);
            this.first = null;
            this.destinations = [];
            this.changeState(Editor.stateEnum.IDLE);
            this.selected = this.first;
            this.draw();
        }
    }
    doubleClick(e) {
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        e.preventDefault();
        e.stopPropagation();
        this.changeState(Editor.stateEnum.IDLE);
        this.addStateAtPosition(x, y);
        this.draw();
    }
    addStateAtPosition(x, y) {
        let state = this.automaton.addStateImplicit();
        state.setPosition(x, y);

    }
    mouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == Editor.stateEnum.SELECTED) {
            this.changeState(Editor.stateEnum.ADD_EDGE)
        }
        else if (this.editorState != Editor.stateEnum.ADD_EDGE_MULTI & this.editorState != Editor.stateEnum.ADD_EDGE_MULTI_BEGIN & this.editorState != Editor.stateEnum.ADD_EDGE_MULTI_LAST) {
            this.changeState(Editor.stateEnum.IDLE)

        }
        this.draw();
    }
    mouseMove(e) {
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        if (this.editorState == Editor.stateEnum.SELECTED || this.editorState == Editor.stateEnum.MOVE) {
            if (this.selected == null || this.downLocation == null) {
                return;
            }
            this.changeState(Editor.stateEnum.MOVE)
            let dx = x - this.downLocation.x;
            let dy = y - this.downLocation.y;
            this.moveSelectedItem(dx, dy);
            this.downLocation.x = x;
            this.downLocation.y = y;
            this.draw();
        }
        else if (this.editorState == Editor.stateEnum.ADD_EDGE && this.selected != null) {
            this.draw();
            this.renderer.drawEdgeFromStateToPosition(this.automaton.getStateByNumber(this.selected), new Victor(x, y));
        }
        else if (this.editorState == Editor.stateEnum.ADD_EDGE_MULTI || this.editorState == Editor.stateEnum.ADD_EDGE_MULTI_BEGIN || this.editorState == Editor.stateEnum.ADD_EDGE_MULTI_LAST) {
            this.draw();
            this.renderer.drawPartialMultiEdge(this.automaton.getStateByNumber(this.selected), this.automaton.numbersToStates(this.destinations), new Victor(x, y));
        }
    }
    checkCollisionsAtPosition(position) {
        for (const state of this.automaton.states.values()) {
            if (this.checkCircleCollision(state.position, this.circleSize, position)) {
                this.selected = state.number;
                this.selectedType = Editor.selectedEnum.STATE;
                return
            }
            for (let i = 0; i < this.automaton.start.length; i++) {
                let pos = EditorUtils.calculateMidpointBetweenVectors(EditorUtils.statesToPositions(this.automaton.numbersToStates(this.automaton.start[i])));
                let offset = this.automaton.startOffsets[i];
                let center = new Victor(pos.x + offset.x, pos.y + offset.y);
                if (this.checkCircleCollision(center, this.circleSize / 5, position)) {
                    this.selected = i;
                    this.selectedType = Editor.selectedEnum.START;
                    return
                }
            }
        }
        this.selected = null;
    }
    moveSelectedItem(dx, dy) {
        if (this.selectedType == Editor.selectedEnum.STATE) {
            this.automaton.getStateByNumber(this.selected).position.x += dx;
            this.automaton.getStateByNumber(this.selected).position.y += dy;
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
Editor.selectedEnum = {
    STATE: 1,
    START: 2
}
Editor.stateEnum = {
    IDLE: 1,
    SELECTED: 2,
    ADD_EDGE: 3,
    MOVE: 4,
    ADD_EDGE_MULTI_BEGIN: 5,
    ADD_EDGE_MULTI: 6,
    ADD_EDGE_MULTI_LAST: 7
}
exports.Editor = Editor;