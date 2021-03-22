
const HOA = require('../hoaObject').HOA;

class AutomatonSidebar {
    constructor(automaton) {
        /**@type { HOA }*/
        this.automaton = automaton;
        this.sidebarRedrawRequestListener = null;
        this.collapsedState = [];
    }
    generateSidebar() {
        let sidebar = document.createElement("div");
        sidebar.append(this.createApList());
        sidebar.append(this.createAliasList());
        let sidebarTable = document.createElement("div");
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createAcceptanceCount());
        sidebarTable.append(this.createAcceptanceCondition());
        sidebarTable.append(this.createAccname());
        sidebarTable.append(this.createName());
        sidebar.append(sidebarTable);
        return sidebar;
    }
    requestRedraw() {
        if (this.sidebarRedrawRequestListener != null) {
            this.sidebarRedrawRequestListener();
        }
    }
    createList(fn, array, name) {
        let wrap = document.createElement("div");
        let list = document.createElement("div");
        list.setAttribute("class", "collapsible");
        for (let i = 0; i < array.length; i++) {
            list.append(fn(i));
        }
        let button = document.createElement("button")
        button.setAttribute("class", "collapsibleButton");
        button.setAttribute("type", "button");
        button.innerHTML = name;
        if (this.collapsedState[name] == null) {
            this.collapsedState[name] = "none";
            list.style.display = "none";
        }
        else {
            list.style.display = this.collapsedState[name];
        }
        button.addEventListener("click", () => {
            if (list.style.display === "block") {
                list.style.display = "none";
            } else {
                list.style.display = "block";
            }
            this.collapsedState[name] = list.style.display;
        });
        wrap.append(button);
        wrap.append(list);
        return wrap;
    }
    createApList() {
        let wrap = this.createList(this.createAP.bind(this), this.automaton.ap, "Atomic propositions");
        let inner = wrap.getElementsByTagName("div")[0];
        let addButton = document.createElement("button")
        addButton.setAttribute("type", "button");
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", () => {
            this.automaton.ap.push("")
            this.requestRedraw();
        });
        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button");
        removeButton.innerHTML = "Remove";
        removeButton.addEventListener("click", () => {
            this.automaton.ap.pop();
            this.requestRedraw();
        });
        inner.append(this.createDivWithChildren(addButton, removeButton));
        return wrap;

    }
    createAliasList() {
        this.automaton.aliases = this.automaton.aliases.filter((e) => e != null);
        let wrap = this.createList(this.createAlias.bind(this), this.automaton.aliases, "Aliases");
        let inner = wrap.getElementsByTagName("div")[0];
        let addButton = document.createElement("button")
        addButton.setAttribute("type", "button");
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", () => {
            this.automaton.aliases.push({ aname: "", lexpr: "" })
            this.requestRedraw();
        });
        inner.append(addButton);
        return wrap;
    }
    createAP(index) {
        let id = "ap" + index;
        let label = this.createLabel(id, index + ":");
        let field = this.createField(id);
        field.value = this.automaton.ap[index];
        field.oninput = (e) => { this.automaton.ap[index] = e.target.value; };
        return this.createDivWithChildren(label, field);
    }
    createAcceptanceCount() {
        let id = "acccount";
        let label = this.createLabel(id, "Acceptance sets:");
        let field = this.createField(id, "number");
        field.value = this.automaton.acceptance.count;
        field.oninput = (e) => { this.automaton.acceptance.count = e.target.value; };
        return this.createDivWithChildren(label, field);
    }
    createAcceptanceCondition() {
        let id = "acccond";
        let label = this.createLabel(id, "Acceptance condition:");
        let field = this.createField(id);
        field.value = this.automaton.acceptance.str;
        field.oninput = (e) => { this.automaton.acceptance.str = e.target.value; };
        return this.createDivWithChildren(label, field);
    }
    createAccname() {
        let id = "accname";
        let label = this.createLabel(id, "Acceptance name:");
        let field = this.createField(id);
        field.value = this.automaton.accname;
        field.oninput = (e) => { this.automaton.accname = e.target.value; };
        return this.createDivWithChildren(label, field);
    }
    createName() {
        let id = "name";
        let label = this.createLabel(id, "Name:");
        let field = this.createField(id);
        field.value = this.automaton.name;
        field.oninput = (e) => { this.automaton.name = e.target.value; };
        return this.createDivWithChildren(label, field);
    }
    createDivWithChildren() {
        let div = document.createElement("div");
        for (var i = 0; i < arguments.length; i++) {
            div.appendChild(arguments[i]);
        }
        div.setAttribute("class", "sidebarRow");
        return div;
    }
    createLabel(id, name) {
        let label = document.createElement("label");
        label.innerHTML = name;
        label.setAttribute("for", id);
        return label;
    }
    createField(id, type = "text") {
        let field = document.createElement("input");
        field.setAttribute("type", type);
        field.setAttribute("id", id);
        field.setAttribute("class", "inputField");
        return field;
    }
    createAlias(index) {
        let keyLabel = this.createLabel(index + "k", "@");
        let keyField = this.createField(index + "k");
        let aliasObject = this.automaton.aliases[index]
        keyField.value = aliasObject.aname.substring(1);
        keyField.oninput = (e) => {
            if (e.target.value) {
                aliasObject.aname = "@" + e.target.value;
            }
        };
        let valueLabel = this.createLabel(index + "v", ":");
        let valueField = this.createField(index + "v");
        valueField.value = aliasObject.lexpr;
        valueField.oninput = (e) => {
            aliasObject.lexpr = e.target.value;
        };
        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button");
        removeButton.innerHTML = "X";
        removeButton.addEventListener("click", () => {
            this.automaton.aliases[index] = null;
            this.requestRedraw();
        });
        return this.createDivWithChildren(keyLabel, keyField, valueLabel, valueField, removeButton);
    }
}
exports.AutomatonSidebar = AutomatonSidebar;