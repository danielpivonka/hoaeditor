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
        this.editorCanvas.detailRequestedListener = this.showDetails.bind(this);
        this.editorCanvas.detailRemoveListener = this.removeDetail;
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
        this.sidebarContainer.append(this.automatonSidebar.generateSidebar());
       
    }
    resized() {
        this.editorCanvas.resized();
    }
    componentSelected(component) {
        this.selected = component;
        this.drawSidebar();
    }
    showDetails(object, mousePosition) {
        let container = document.createElement("div");
        container.className = "container detail_area"
        container.style.left = mousePosition.x+10+ "px";
        container.style.top = mousePosition.y + "px";
        container.setAttribute("id", "objectDetail");
        if (object instanceof State) {
            container.appendChild(this.stateSidebar.generateSidebar(this.selected));
        }
        else if (object instanceof Edge) {
            container.appendChild(this.edgeSidebar.generateSidebar(this.selected));
        }
        document.getElementsByTagName("body")[0].appendChild(container);
    }
    removeDetail() {
        if (document.getElementById("objectDetail")) {
            document.getElementById("objectDetail").remove();
        }
    }
}
exports.Editor = Editor;