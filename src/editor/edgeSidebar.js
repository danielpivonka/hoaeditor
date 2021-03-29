const State = require('../hoaObject').State;
const Edge = require('../hoaObject').Edge;

const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;

class EdgeSidebar {
    constructor() {
        this.collapsedState = [];
        this.sidebarRedrawRequestListener = null;
    }
    generateSidebar(edge) {
        let sidebar = document.createElement("div");
        sidebar.append(this.createAccSetsList(edge));
        let sidebarTable = document.createElement("div");
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
        field.oninput = (e) => { edge.label = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createAccSetsList(edge) {
        edge.accSets = edge.accSets.filter((e) => e != null);
        let wrap = SidebarUtils.createList(this.createAccSet.bind(this), edge.accSets, "Acceptance sets", this.collapsedState);
        let inner = wrap.getElementsByTagName("div")[0];
        let addButton = document.createElement("button")
        addButton.setAttribute("type", "button");
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", () => {
            edge.accSets.push(0);
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
exports.EdgeSidebar = EdgeSidebar;