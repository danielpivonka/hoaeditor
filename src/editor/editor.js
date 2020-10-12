const HOA = require('../hoaObject').HOA;
const Position = require('../hoaObject').Position;
const Victor = require('victor');
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
        for (const state of this.automaton.states) {
            this.drawState(state.number);
            this.drawEdges(state.number);
        }
    }
    drawState(index) {
        let pos = this.automaton.positions[index];
        this.ctx.fillStyle = "#000044";
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, this.circleSize, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawEdges(originIndex) {
        for (const edge of this.automaton.states[originIndex].edges) {
            for (const destinationIndex of edge.stateConj) {
                if (originIndex == destinationIndex) {
                    //this.drawCurvedEdge();
                }
                else {
                    this.drawStraightEdge(originIndex, destinationIndex);
                }
            }
        }

    }
    drawStraightEdge(origin, destination) {
        let originVector = Victor.fromObject(this.automaton.positions[origin]);
        let destinationVector = Victor.fromObject(this.automaton.positions[destination]);
        let direction = destinationVector.clone().subtract(originVector);
        let distance = direction.magnitude();
        let directionUnit = direction.clone().normalize();
        let fromPoint = originVector.clone().add(directionUnit.clone().multiplyScalar(this.circleSize));
        let toPoint = originVector.clone().add(directionUnit.clone().multiplyScalar(distance - this.circleSize));
        this.ctx.beginPath();
        this.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.ctx.lineTo(toPoint.x, toPoint.y);
        console.log("Drawing from " + fromPoint.x + ", " + fromPoint.y + "to " + toPoint.x + ", " + toPoint.y);
        this.ctx.stroke();
        this.drawArrowhead(direction, toPoint)
    }
    /**
     * @param  {Victor} direction
     * @param  {Victor} point
     */
    drawArrowhead(direction, point) {
        let directionNormalized = direction.clone().normalize().multiplyScalar(20);
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
    edgeExists(fromIndex, toIndex) {
        return this.automaton.states[fromIndex].edges.some((element) => element.stateConj.includes(toIndex));
    }
    mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        let boundingBox = this.canvas.getBoundingClientRect()
        let x = e.clientX - boundingBox.left;
        let y = e.clientY - boundingBox.top;
        this.selected = this.getObjectIndexAtPosition(x, y);
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