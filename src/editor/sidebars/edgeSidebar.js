const State = require('../../hoaObject').State;
const Edge = require('../../hoaObject').Edge;
const AccSetVerifier = require('../verifiers/accSetVerifier.js').AccSetVerifier;

const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;

class EdgeSidebar {
    constructor(automaton) {
        this.collapsedState = [];
        this.sidebarRedrawRequestListener = null;
        this.accSetVerifier = new AccSetVerifier(automaton);

    }
    generateSidebar(edge) {
        let sidebar = document.createElement("div");
        let sidebarTable = document.createElement("div");
        sidebarTable.append(this.createAccSet(edge.accSets));
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createLabel(edge));
        sidebar.append(sidebarTable);
        return sidebar;
    }

    createLabel(edge) {
        let id = "label";
        let label = SidebarUtils.createLabel(id, "Label:");
        let field = SidebarUtils.createField(id);
        field.value = edge.label;
        field.disabled = !edge.canHaveLabel();
        field.oninput = (e) => { edge.label = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createAccSet(accSetArray) {
        console.log(accSetArray);
        let id = "accSet";
        let label = SidebarUtils.createLabel(id, "Acceptance sets:");
        let field = SidebarUtils.createField(id);
        field.value = accSetArray.join(" ");
        field.oninput = (e) => {
            let value = e.target.value;
            let parsedValues = value.split(" ").map(num => parseInt(num));
            if (this.accSetVerifier.verify(parsedValues)) {
                accSetArray.length = 0;
                accSetArray.push(...parsedValues);
                field.className = "inputField";
            }
            else {
                field.className = "inputFieldError";
            }
        };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    requestRedraw() {
        if (this.sidebarRedrawRequestListener != null) {
            this.sidebarRedrawRequestListener();
        }
    }
}
exports.EdgeSidebar = EdgeSidebar;