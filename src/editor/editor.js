const HOA = require('../hoaObject').HOA;
const Position = require('../hoaObject').Position;

class Editor {
    constructor(canvas) {
        /**@type {HTMLCanvasElement}*/
        this.canvas = canvas;
        /**@type {CanvasRenderingContext2D}*/
        this.ctx = canvas.getContext("2d");
        this.circleSize = 10;
        this.selected = null;
        this.downLocation = null;
        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
    }
    /**
     * binds automaton to editor
     * @param {HOA} automaton object
     */
    setAutomaton(automaton) {
        this.automaton = automaton;
        this.automaton.setImplicitPositions();
        this.draw();
    }
    getAutomaton() {
        return this.automaton;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(this.automaton.states.length);
        for (const state of this.automaton.states) {
            let pos = this.automaton.positions[state.number];
            this.drawCircle(pos.x, pos.y, this.circleSize);
        }
    }
    drawCircle(x, y, r) {
        this.ctx.fillStyle = "#000044";
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        console.log(x);
        console.log(y);
        this.selected = this.getObjectIndexAtPosition(x, y);
        console.log("selected: " + this.selected);
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
            console.log("move cancelled");
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