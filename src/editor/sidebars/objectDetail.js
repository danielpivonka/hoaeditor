const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;
const AccSetVerifier = require('../verifiers/accSetVerifier.js').AccSetVerifier;
const verifyLabel = require('../verifiers/labelVerifier.js').verifyLabel;
const State = require('../../hoaObject').State;
const LexprField = require('./lexprField.js').LexprField;


class ObjectDetail {
    constructor(automaton,translator) {
        this.sidebarRedrawRequestListener = null;
        this.translator = translator;
        this.accSetVerifier = new AccSetVerifier(automaton);
        this.lexprField = new LexprField(automaton,translator)
        this.currentLabel;
        this.currentAccSet;
        this.object;
    }
    generateDetail(object) {
        this.object = object;
        this.currentLabel = [...object.label];
        this.currentAccSet = [...object.accSets];
        let sidebar = document.createElement("div");
        let sidebarTable = document.createElement("div");
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createAccSet(object.accSets));
        if (object instanceof State) {
            sidebarTable.append(this.createName(object));
        }
        sidebarTable.append(this.createLabel(object));
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
        let field = SidebarUtils.createField(id);
        field.value = accSetArray.join(" ");
        this.currentAccSet = field.value;
        field.oninput = (e) => {
            this.currentAccSet = e.target.value;
            let parsedValues = this.currentAccSet.split(" ").filter(s=> s!="" && s!=" ").map(num => parseInt(num));
            if (this.accSetVerifier.verify(parsedValues)) {
                field.className = "inputField";
            }
            else {
                field.className = "inputField error";
            }
        };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    close() {
        this.commitChanges();
        this.lexprField.deselect();
    }
    commitChanges() {
        let parsedAccSet = this.currentAccSet.split(" ").filter(s=> s!="" && s!=" ").map(num => parseInt(num));
        if (this.accSetVerifier.verify(parsedAccSet)) {
            console.log("setting acc set: " + parsedAccSet)
            this.object.accSets = parsedAccSet;
        }
        if (verifyLabel(this.currentLabel)) {
            console.log("label verified as true");
            this.object.label = this.currentLabel;
        }
    }
}
exports.ObjectDetail = ObjectDetail;