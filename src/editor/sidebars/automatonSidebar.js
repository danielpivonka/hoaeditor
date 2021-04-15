
const HOA = require('../../hoaObject').HOA;
const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;
const LexprField = require('./lexprField.js').LexprField;
class AutomatonSidebar {
    constructor(automaton,translator) {
        /**@type { HOA }*/
        this.automaton = automaton;
        this.sidebarRedrawRequestListener = null;
        this.automatonChangedListeners = [];
        this.collapsedState = [];
        this.translator = translator;
        this.keyboard;
        this.selectedAliasIndex = -1;
        this.aliasFields = [];
    }
    addAutomatonChangedListener(func) {
        this.automatonChangedListeners.push(func)
    }
    automatonChanged() {
        for (const func of this.automatonChangedListeners) {
            func();
        }
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

    createApList() {
        let wrap = SidebarUtils.createList(this.createAP.bind(this), this.automaton.ap, "Atomic propositions", this.collapsedState);
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
        inner.append(SidebarUtils.createDivWithChildren(addButton, removeButton));
        return wrap;

    }
    createAliasList() {
        this.aliasFields = [];
        this.automaton.aliases = this.automaton.aliases.filter((e) => e != null);
        let wrap = SidebarUtils.createList(this.createAlias.bind(this), this.automaton.aliases, "Aliases", this.collapsedState);
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
    createAP(array, index) {
        let id = "ap" + index;
        let label = SidebarUtils.createLabel(id, index + ":");
        let field = SidebarUtils.createField(id);
        field.value = array[index];
        field.oninput = (e) => {
            array[index] = e.target.value;
            this.automatonChanged();
        };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createAcceptanceCount() {
        let id = "acccount";
        let label = SidebarUtils.createLabel(id, "Acceptance sets:");
        let field = SidebarUtils.createField(id, "number");
        field.value = this.automaton.acceptance.count;
        field.oninput = (e) => { this.automaton.acceptance.count = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createAcceptanceCondition() {
        let id = "acccond";
        let label = SidebarUtils.createLabel(id, "Acceptance condition:");
        let field = SidebarUtils.createField(id);
        field.value = this.automaton.acceptance.str;
        field.oninput = (e) => { this.automaton.acceptance.str = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createAccname() {
        let id = "accname";
        let label = SidebarUtils.createLabel(id, "acceptance name:");
        let field = SidebarUtils.createField(id);
        field.value = this.automaton.accname;
        field.oninput = (e) => { this.automaton.accname = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createName() {
        let id = "name";
        let label = SidebarUtils.createLabel(id, "name:");
        let field = SidebarUtils.createField(id);
        field.value = this.automaton.name;
        field.oninput = (e) => { this.automaton.name = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }

    createAlias(array, index) {
        let keyLabel = SidebarUtils.createLabel(index + "k", "@");
        let keyField = SidebarUtils.createField(index + "k");
        let aliasObject = array[index]
        keyField.value = aliasObject.aname.substring(1);
        let valueLabel = SidebarUtils.createLabel(index + "v", ":");
        let lexprObj = new LexprField(this.automaton, this.translator)
        let valueField = lexprObj.drawField(aliasObject.lexpr)
        this.aliasFields.push(lexprObj);
        lexprObj.onSelected = () => {
            if (this.selectedAliasIndex != index) {
                this.deselectAliases(lexprObj);
            }
            this.selectedAliasIndex = index;
        }
        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button");
        removeButton.innerHTML = "X";
        removeButton.addEventListener("click", () => {
            array[index] = null;
            this.requestRedraw();
        });
        return SidebarUtils.createDivWithChildren(keyLabel, keyField, valueLabel, valueField, removeButton);
    }
    deselectAliases(except) {
        console.log("deselecting")
        for (const field of this.aliasFields) {
            if (field != except) {
                field.deselect();
            }
        }
    }
}
exports.AutomatonSidebar = AutomatonSidebar;