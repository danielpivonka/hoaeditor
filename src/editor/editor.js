const Position = require('../hoaObject').Position;
const Victor = require('victor');
const EditorUtils = require('./editorUtils').EditorUtils;
const HOA = require('../hoaObject').HOA;
const EditorRenderer = require('./editorRenderer').EditorRenderer;


class Editor {
    constructor(canvas) {
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
        this.selectedEnum = {
            STATE: 0,
            START: 1
        }
        this.stateEnum = {
            IDLE: 0,
            ADD_STATE: 1,
            ADD_EDGE: 2,
            REMOVE: 3

        }
        this.makredState1 = null;
        this.makredState2 = null;
        this.editorState = this.stateEnum.IDLE;
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
        this.renderer.draw(this.automaton);
    }
    getAutomaton() {
        return this.automaton;
    }
    addStateClicked() {
        this.editorState = this.stateEnum.ADD_STATE;
    }
    addEdgeClicked() {
        this.editorState = this.stateEnum.ADD_EDGE;
    }
    removeClicked() {
        this.editorState = this.stateEnum.REMOVE;
    }
    mouseDown(e) {
        let boundingBox = this.canvas.getBoundingClientRect();
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        e.preventDefault();
        e.stopPropagation();
        if (this.editorState == this.stateEnum.IDLE) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selected != null) {
                this.downLocation = new Position(x, y);
            }
        }
        else if (this.editorState == this.stateEnum.ADD_STATE) {
            this.editorState = this.stateEnum.IDLE;
            this.addStateAtPosition(x, y);
            this.draw();
        }
        else if (this.editorState == this.stateEnum.REMOVE) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selectedType == this.selectedEnum.STATE) {
                this.automaton.removeState(this.selected);
                this.editorState = this.stateEnum.IDLE;
                this.draw();
            }

        }
        else if (this.makredState1 == null) {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selectedType == this.selectedEnum.STATE) {
                this.makredState1 = this.selected;
            }
        }
        else {
            this.checkCollisionsAtPosition(new Victor(x, y));
            if (this.selectedType == this.selectedEnum.STATE) {
                this.makredState2 = this.selected;
                console.log("Connecting " + this.makredState1 + " and " + this.makredState2)
                this.automaton.getStateByNumber(this.makredState1).addEdge([this.makredState2]);
                this.editorState = this.stateEnum.IDLE;
                this.makredState1 = null;
                this.makredState2 = null;
                this.automaton.SetImplicitOffsets();
                this.draw();
            }
        }

    }
    addStateAtPosition(x, y) {
        let state = this.automaton.addStateImplicit();
        state.setPosition(x, y);

    }
    mouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        this.selected = null;
        this.downLocation = null;
    }
    mouseMove(e) {
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        if (this.editorState == this.stateEnum.IDLE) {
            if (this.selected == null || this.downLocation == null) {
                return;
            }
            let dx = x - this.downLocation.x;
            let dy = y - this.downLocation.y;
            this.moveSelectedItem(dx, dy);
            this.downLocation.x = x;
            this.downLocation.y = y;
            this.draw();
        }
        else if (this.editorState == this.stateEnum.ADD_STATE) {
            this.draw();
            this.renderer.drawCircle(x, y, this.circleSize);
        }
        else if (this.editorState == this.stateEnum.ADD_EDGE && this.makredState1 != null) {
            console.log("drawing edge")
            this.draw();
            this.renderer.drawEdgeFromStateToPosition(this.automaton.getStateByNumber(this.makredState1), new Victor(x, y));
        }
    }
    checkCollisionsAtPosition(position) {
        for (const state of this.automaton.states.values()) {
            if (this.checkCircleCollision(state.position, this.circleSize, position)) {
                this.selected = state.number;
                this.selectedType = this.selectedEnum.STATE;
                return
            }
            for (let i = 0; i < this.automaton.start.length; i++) {
                let pos = EditorUtils.calculateMidpointBetweenVectors(EditorUtils.statesToPositions(this.automaton.numbersToStates(this.automaton.start[i])));
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
exports.Editor = Editor;