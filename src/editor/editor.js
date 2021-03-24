const EditorCanvas = require('./editorCanvas').EditorCanvas;
const AutomatonSidebar = require('./automatonSidebar').AutomatonSidebar;

class Editor {
    constructor(canvas, sidebarContainer) {
        this.sidebarContainer = sidebarContainer;
        this.editorCanvas = new EditorCanvas(canvas);
    }

    setAutomaton(automaton) {
        this.editorCanvas.setAutomaton(automaton);
        this.automatonSidebar = new AutomatonSidebar(automaton);
        this.automatonSidebar.sidebarRedrawRequestListener = this.drawSidebar.bind(this);
        this.drawSidebar();
    }
    drawSidebar(selected) {
        this.sidebarContainer.innerHTML = "";
        if (!selected) {
            this.sidebarContainer.append(this.automatonSidebar.generateSidebar());
        }
    }
    resized() {
        this.editorCanvas.resized();
    }
}
exports.Editor = Editor;