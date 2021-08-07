const CanvasController = require('./editorCanvas').CanvasController;
const AutomatonSidebar = require('./sidebars/automatonSidebar').AutomatonSidebar;
const ObjectDetail = require('./sidebars/objectDetail').ObjectDetail;
const Automaton = require('../hoaData/automaton').Automaton;
const LabelTranslator = require('../labelTranslator').LabelTranslator;
const cloneDeep = require('lodash/cloneDeep');
const Exporter = require('../hoaData/exporter/exporter').automatonToHoaString;


class Editor {
    constructor(canvas, sidebarContainer) {
        this.sidebarContainer = sidebarContainer;
        this.editorCanvas = new CanvasController(canvas);
        this.editorCanvas.onComponentSelectedListeners.push(this.componentSelected.bind(this));
        this.automatonSidebar = null;
        this.editorCanvas.detailRequestedListener = this.showDetails.bind(this);
        this.editorCanvas.detailRemoveListener = this.removeDetail.bind(this);
        this.editorCanvas.onSaveRequested = this.saveState.bind(this);
        /**@type {Automaton}*/
        this.automaton = null;
        this.selected = null;
        let automaton = new Automaton();
        automaton.initializeEmpty();
        this.setAutomaton(automaton);
        this.currentDetail;
        document.body.addEventListener('mousedown', () => this.resetFocus());
        this.editorCanvas.addOnFocusListener(() => this.resetFocus());
        this.editorCanvas.addonStateChangedListener((state) => {
            if (state == CanvasController.stateEnum.ADD_EDGE) {
                this.removeDetail();
            }
        })
        this.onAutomatonChanged;
        this.isValid;
        this.savedStates = [];
    }

    resetFocus() {
        this.automatonSidebar.deselectAliases();
        this.removeDetail()
    }
    setAutomaton(automaton) {
        this.translator = new LabelTranslator(automaton);
        this.editorCanvas.setAutomaton(automaton, this.translator);
        this.automatonSidebar = new AutomatonSidebar(automaton, this.translator);
        this.detail = new ObjectDetail(automaton, this.translator);
        this.automatonSidebar.addAutomatonChangedListener(() => this.refresh());
        this.automaton = automaton;
        this.drawSidebar();
    }
    setShift(val) {
        this.editorCanvas.setShift(val);
    }
    removeClicked() {
        this.editorCanvas.removeClicked()
        this.removeDetail();
    }
    escapeClicked() {
        this.editorCanvas.escapeClicked();
        this.removeDetail();
    }
    refresh() {
        this.editorCanvas.draw();
        this.drawSidebar();
        if (this.onAutomatonChanged) {
            this.onAutomatonChanged();
        }
        this.saveState()
    }
    drawSidebar() {
        this.sidebarContainer.innerHTML = "";
        this.sidebarContainer.append(this.automatonSidebar.generateSidebar());
        this.isValid = Array.from(this.automatonSidebar.correctMap.values()).every(e => e == true);
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
        container.style.left = mousePosition.x + 10 + "px";
        container.style.top = mousePosition.y + "px";
        container.setAttribute("id", "objectDetail");
        container.appendChild(this.detail.generateDetail(object));
        container.addEventListener("mousedown", (e) => {
            e.stopPropagation()
            this.detail.lexprField.deselect();
        });
        this.currentDetail = this.detail;
        this.currentDetail.onAutomatonChanged = () => this.refresh();
        document.getElementsByTagName("body")[0].appendChild(container);
    }

    removeDetail() {
        if (this.currentDetail) {
            this.currentDetail.close();
            this.currentDetail = null;
        }
        if (document.getElementById("objectDetail")) {
            document.getElementById("objectDetail").remove();
        }
    }
    isLocked() {
        if (this.editorCanvas) {
            return this.editorCanvas.isLocked
        }
        return false;
    }
    switchLock() {
        if (this.editorCanvas) {
            this.editorCanvas.isLocked = !this.editorCanvas.isLocked;
        }

    }
    saveState() {
        this.savedStates.push(cloneDeep(this.automaton));
        if (this.savedStates.length > 100) {
            this.savedStates.shift();
        }
    }
    undo() {
        if (this.savedStates.length > 0) {
            this.setAutomaton(this.savedStates.pop());
            console.log("undo succesful")
        }
    }
}
exports.Editor = Editor;