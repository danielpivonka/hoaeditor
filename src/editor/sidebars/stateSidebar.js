const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;
const AccSetVerifier = require('../verifiers/accSetVerifier.js').AccSetVerifier;

class StateSidebar {
    constructor(automaton) {
        this.collapsedState = [];
        this.sidebarRedrawRequestListener = null;
        this.accSetVerifier = new AccSetVerifier(automaton);
    }
    generateSidebar(state) {
        let sidebar = document.createElement("div");
        let sidebarTable = document.createElement("div");
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createAccSet(state.accSets));
        sidebarTable.append(this.createName(state));
        sidebarTable.append(this.createLabel(state));
        sidebar.append(sidebarTable);
        return sidebar;
    }

    createName(state) {
        let id = "name";
        let label = SidebarUtils.createLabel(id, "Name:");
        let field = SidebarUtils.createField(id);
        field.value = state.name;
        field.oninput = (e) => { state.name = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createLabel(state) {
        let id = "label";
        let label = SidebarUtils.createLabel(id, "Label:");
        let field = SidebarUtils.createField(id);
        field.value = state.label;
        field.oninput = (e) => { state.label = e.target.value; };
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
exports.StateSidebar = StateSidebar;