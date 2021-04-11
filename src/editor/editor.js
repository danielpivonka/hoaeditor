const EditorCanvas = require('./editorCanvas').EditorCanvas;
const AutomatonSidebar = require('./sidebars/automatonSidebar').AutomatonSidebar;
const StateSidebar = require('./sidebars/stateSidebar').StateSidebar;
const EdgeSidebar = require('./sidebars/edgeSidebar').EdgeSidebar;
const State = require('../hoaObject').State;
const Edge = require('../hoaObject').Edge;
const HOA = require('../hoaObject').HOA;

class Editor {
    constructor(canvas, sidebarContainer) {
        this.sidebarContainer = sidebarContainer;
        this.editorCanvas = new EditorCanvas(canvas);
        this.editorCanvas.onComponentSelectedListeners.push(this.componentSelected.bind(this));
        this.automatonSidebar = null;

        this.selected = null;
        this.setAutomaton(new HOA());
    }

    setAutomaton(automaton) {
        this.editorCanvas.setAutomaton(automaton);
        this.automatonSidebar = new AutomatonSidebar(automaton);
        this.stateSidebar = new StateSidebar(automaton);
        this.edgeSidebar = new EdgeSidebar(automaton);
        this.automatonSidebar.sidebarRedrawRequestListener = this.drawSidebar.bind(this);
        this.stateSidebar.sidebarRedrawRequestListener = this.drawSidebar.bind(this);
        this.edgeSidebar.sidebarRedrawRequestListener = this.drawSidebar.bind(this);
        this.drawSidebar();
    }
    setShift(val) {
        this.editorCanvas.setShift(val);
    }
    removeClicked() {
        this.editorCanvas.removeClicked()
    }
    escapeClicked() {
        this.editorCanvas.escapeClicked();
    }
    drawSidebar() {
        this.sidebarContainer.innerHTML = "";
        if (!this.selected) {
            this.sidebarContainer.append(this.automatonSidebar.generateSidebar());
        }
        else if (this.selected instanceof State) {
            this.sidebarContainer.append(this.stateSidebar.generateSidebar(this.selected));
        }
        else if (this.selected instanceof Edge) {
            this.sidebarContainer.append(this.edgeSidebar.generateSidebar(this.selected));
        }
    }
    resized() {
        this.editorCanvas.resized();
    }
    componentSelected(component) {
        this.selected = component;
        this.drawSidebar();
    }
}
exports.Editor = Editor;