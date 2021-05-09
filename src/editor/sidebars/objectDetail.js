const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;
const AccSetVerifier = require('../verifiers/accSetVerifier.js').AccSetVerifier;
const verifyLabel = require('../verifiers/labelVerifier.js').verifyLabel;
const State = require('../../hoaData/state').State;
const LexprField = require('./lexprField.js').LexprField;
const Edge = require('../../hoaData/edge').Edge;

const AccSetField = require('./accSetField.js').AccSetField;

class ObjectDetail {
    constructor(automaton,translator) {
        this.sidebarRedrawRequestListener = null;
        this.translator = translator;
        this.accSetVerifier = new AccSetVerifier(automaton);
        this.lexprField = new LexprField(automaton, translator, false)
        this.accSetField = new AccSetField(automaton);
        this.automaton = automaton;
        this.currentLabel;
        this.object;
        this.onAutomatonChanged;
        this.lexprField.onKeyboardGenerated = (keyboardNode) =>this.onKeyboardGenerated(keyboardNode)
        this.sidebar;
        this.keyboardDiv;
    }
    generateDetail(object) {
        this.object = object;
        this.currentLabel = [...object.label];
        this.sidebar = document.createElement("div");
        let sidebarTable = document.createElement("div");
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createAccSet(object.accSets));
        sidebarTable.append(this.createLabel(object));
        if (object instanceof State) {
            sidebarTable.append(this.createName(object));
            sidebarTable.append(this.createAddStartButton(object));
            if (object.areEdgesLabeled()) {
                sidebarTable.append(this.createWarning());
            }
        }
        this.sidebar.append(sidebarTable);
        this.keyboardDiv = document.createElement("div")
        this.sidebar.append(this.keyboardDiv);

        return this.sidebar;
    }
    onKeyboardGenerated(keyboardNode) {
        this.keyboardDiv.innerHTML = "";
        this.keyboardDiv.appendChild(keyboardNode);
    }
    createName(object) {
        let id = "name";
        let label = SidebarUtils.createLabel(id, "name:");
        let field = SidebarUtils.createField(id);
        field.value = object.name;
        field.oninput = (e) => { object.name = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createLabel() {
        this.labelCursor = -1;
        let id = "label";
        let label = SidebarUtils.createLabel(id, "Label:");
        let field = this.lexprField.drawField(this.currentLabel)
        return SidebarUtils.createDivWithChildren(label, field);
    }

    createAccSet(accSetArray) {
        let id = "accSet";
        let label = SidebarUtils.createLabel(id, "Acceptance sets:");
        let field = this.accSetField.drawField(accSetArray);
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createAddStartButton(state) {
        let button = document.createElement("button");
        button.className = "button";
        button.innerHTML = "Add start"
        button.onclick = () => {
            let start = this.automaton.addStart([state.number]);
            start.position = state.position.clone().subtractScalarX(50);
            this.onAutomatonChanged();
        }
        return button;
    }
    close() {
        this.commitChanges();
        this.lexprField.deselect();
    }
    commitChanges() {
        if (verifyLabel(this.currentLabel)) {
            if (this.object instanceof State) {
                this.object.setLabel(this.currentLabel);
            }
            else if (this.object instanceof Edge) {
                if (this.object.parent.label.length!=0) {
                    this.object.parent.transferLabel();
                }
                this.object.label = this.currentLabel;
            }
        }
        if (this.onAutomatonChanged) {
            this.onAutomatonChanged();
        }
    }
    createWarning() {
        let warning = document.createElement("div");
        let label = document.createElement("div");
        warning.className = "detailText";
        label.className = "detailText";
        label.innerHTML = "Warning: ";
        warning.innerHTML = "Setting label to this state<br>will erase labels from outgoing edges"
        return SidebarUtils.createDivWithChildren(label, warning);
    }

}
exports.ObjectDetail = ObjectDetail;