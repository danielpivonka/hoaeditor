const State = require('../hoaObject').State;
const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;

class StateSidebar {
    constructor() {
        this.collapsedState = [];
        this.sidebarRedrawRequestListener = null;
    }
    generateSidebar(state) {
        let sidebar = document.createElement("div");
        sidebar.append(this.createAccSetsList(state));
        let sidebarTable = document.createElement("div");
        sidebarTable.setAttribute("class", "sidebarTable");
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
    createAccSetsList(state) {
        state.accSets = state.accSets.filter((e) => e != null);
        let wrap = SidebarUtils.createList(this.createAccSet.bind(this), state.accSets, "Aliases", this.collapsedState);
        let inner = wrap.getElementsByTagName("div")[0];
        let addButton = document.createElement("button")
        addButton.setAttribute("type", "button");
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", () => {
            state.accSets.push(0);
            this.requestRedraw();
        });
        inner.append(addButton);
        return wrap;

    }
    createAccSet(accSets, index) {
        let valueField = SidebarUtils.createField(index + "sas");
        valueField.value = accSets[index];
        valueField.oninput = (e) => {
            accSets[index] = e.target.value;
        };
        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button");
        removeButton.innerHTML = "X";
        removeButton.addEventListener("click", () => {
            accSets[index] = null;
            this.requestRedraw();
        });
        return SidebarUtils.createDivWithChildren(valueField, removeButton);
    }
    requestRedraw() {
        if (this.sidebarRedrawRequestListener != null) {
            this.sidebarRedrawRequestListener();
        }
    }
}
exports.StateSidebar = StateSidebar;