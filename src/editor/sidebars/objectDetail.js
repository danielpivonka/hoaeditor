const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;
const AccSetVerifier = require('../verifiers/accSetVerifier.js').AccSetVerifier;
const verifyLabel = require('../verifiers/labelVerifier.js').verifyLabel;
const State = require('../../hoaObject').State;
const LexprField = require('./lexprField.js').LexprField;

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
        this.lexprField.onSelected = () => this.accSetField.deselect();
        this.accSetField.onSelected = () => this.lexprField.deselect();

    }
    generateDetail(object) {
        this.object = object;
        this.currentLabel = [...object.label];
        let sidebar = document.createElement("div");
        let sidebarTable = document.createElement("div");
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createAccSet(object.accSets));
        sidebarTable.append(this.createLabel(object));
        if (object instanceof State) {
            sidebarTable.append(this.createName(object));
            sidebarTable.append(this.createAddStartButton(object));
        }
        sidebar.append(sidebarTable);
        return sidebar;
    }
    
    createName(object) {
        let id = "name";
        let label = SidebarUtils.createLabel(id, "Name:");
        let field = SidebarUtils.createField(id);
        field.value = object.name;
        field.oninput = (e) => { object.name = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createLabel(object) {
        this.labelCursor = -1;
        let id = "label";
        let canHaveLabel = object.canHaveLabel();
        let label = SidebarUtils.createLabel(id, "Label:");
        if (canHaveLabel) {
            label.style.textDecorationLine = "none"
        }
        else {
            label.style.textDecorationLine = "line-through"
            return SidebarUtils.createDivWithChildren(label);
        }
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
        this.accSetField.deselect();
    }
    commitChanges() {
        if (verifyLabel(this.currentLabel)) {
            this.object.label = this.currentLabel;
        }
        if (this.onAutomatonChanged) {
            this.onAutomatonChanged();
        }
    }
}
exports.ObjectDetail = ObjectDetail;