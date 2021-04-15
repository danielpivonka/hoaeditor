const EditorCanvas = require('./editorCanvas').EditorCanvas;
const AutomatonSidebar = require('./sidebars/automatonSidebar').AutomatonSidebar;
const ObjectDetail = require('./sidebars/objectDetail').ObjectDetail;
const State = require('../hoaObject').State;
const Edge = require('../hoaObject').Edge;
const HOA = require('../hoaObject').HOA;
const LabelTranslator = require('../labelTranslator').LabelTranslator;


class Editor {
    constructor(canvas, sidebarContainer) {
        this.sidebarContainer = sidebarContainer;
        this.editorCanvas = new EditorCanvas(canvas);
        this.editorCanvas.onComponentSelectedListeners.push(this.componentSelected.bind(this));
        this.automatonSidebar = null;
        this.editorCanvas.detailRequestedListener = this.showDetails.bind(this);
        this.editorCanvas.detailRemoveListener = this.removeDetail.bind(this);
        this.selected = null;
        let automaton = new HOA();
        console.log("aliases: " + JSON.stringify(automaton.aliases));
        this.setAutomaton(automaton);
        this.currentDetail;
        document.body.addEventListener('mousedown', () => this.resetFocus());
        this.editorCanvas.addOnFocusListener(() => this.resetFocus());
    }

    resetFocus() {
        this.automatonSidebar.deselectAliases();
        this.removeDetail()
    }
    setAutomaton(automaton) {
        this.translator = new LabelTranslator(automaton);
        this.editorCanvas.setAutomaton(automaton,this.translator);
        this.automatonSidebar = new AutomatonSidebar(automaton,this.translator);
        this.detail = new ObjectDetail(automaton,this.translator);
        this.automatonSidebar.sidebarRedrawRequestListener = this.drawSidebar.bind(this);
        this.automatonSidebar.addAutomatonChangedListener(() => this.editorCanvas.draw());
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
        container.appendChild(this.detail.generateDetail(object));
        container.addEventListener("mousedown", (e) => {
            e.stopPropagation()
            this.detail.lexprField.deselect();
        });
        this.currentDetail = this.detail;
        document.getElementsByTagName("body")[0].appendChild(container);
    }
    
    removeDetail() {
        if (this.currentDetail) {
            console.log("calling close");
            this.currentDetail.close();
            this.currentDetail = null;
        }
        if (document.getElementById("objectDetail")) {
            document.getElementById("objectDetail").remove();
        }
        if (this.automatonSidebar) {
            //this.automatonSidebar.closeKeyboard();
        }
    }
}
exports.Editor = Editor;