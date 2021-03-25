const EditorCanvas = require('./editorCanvas').EditorCanvas;
const AutomatonSidebar = require('./automatonSidebar').AutomatonSidebar;
const StateSidebar = require('./stateSidebar').StateSidebar;
const State = require('../hoaObject').State;

class Editor {
    constructor(canvas, sidebarContainer) {
        this.sidebarContainer = sidebarContainer;
        this.editorCanvas = new EditorCanvas(canvas);
        this.editorCanvas.onComponentSelectedListeners.push(this.componentSelected.bind(this));
        this.automatonSidebar = null;
        this.stateSidebar = new StateSidebar();
        this.stateSidebar.sidebarRedrawRequestListener = this.drawSidebar.bind(this);
        this.selected = null;
    }

    setAutomaton(automaton) {
        this.editorCanvas.setAutomaton(automaton);
        this.automatonSidebar = new AutomatonSidebar(automaton);
        this.automatonSidebar.sidebarRedrawRequestListener = this.drawSidebar.bind(this);
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