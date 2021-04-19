
const HOA = require('../../hoaObject').HOA;
const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;
const LexprField = require('./lexprField.js').LexprField;
const AliasKeyVerifier = require('../verifiers/aliasKeyVerifier.js').AliasKeyVerifier;
const verifyAccCond = require('../verifiers/accConditionVerifier').verifyAccCond;

class AutomatonSidebar {
    constructor(automaton,translator) {
        /**@type { HOA }*/
        this.automaton = automaton;
        this.automatonChangedListeners = [];
        this.collapsedState = [];
        this.translator = translator;
        this.keyboard;
        this.selectedAliasIndex = -1;
        this.aliasFields = [];
        this.aliasKeyVerifier = new AliasKeyVerifier(automaton);
        this.oldAccCond;
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
    createApList() {
        let wrap = SidebarUtils.createList(this.createAP.bind(this), this.automaton.ap, "Atomic propositions", this.collapsedState);
        let inner = wrap.getElementsByTagName("div")[0];
        let addButton = document.createElement("button")
        addButton.setAttribute("type", "button");
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", () => {
            this.automaton.ap.push("")
            this.automatonChanged();
        });
        inner.append(SidebarUtils.createDivWithChildren(addButton));
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
            this.automaton.aliases.push({ aname: "@", lexpr: [] })
            this.automatonChanged();
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
            
        };
        field.onblur = () => { this.automatonChanged(); };
        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button");
        removeButton.innerHTML = "X";
        removeButton.disabled = this.automaton.isAPUsed(index);
        removeButton.addEventListener("click", () => {
            this.automaton.removeAP(index);
            this.automatonChanged();
        });
        return SidebarUtils.createDivWithChildren(label, field,removeButton);
    }
    createAcceptanceCount() {
        let id = "acccount";
        let label = SidebarUtils.createLabel(id, "Acceptance sets:");
        let field = SidebarUtils.createField(id, "number");
        field.value = this.automaton.acceptance.count;
        field.min = this.automaton.getHighestAccSetUsed()+1;
        field.oninput = (e) => { this.automaton.acceptance.count = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    createAcceptanceCondition() {
        let id = "acccond";
        let label = SidebarUtils.createLabel(id, "Acceptance condition:");
        let field = SidebarUtils.createField(id);
        field.value = this.automaton.acceptance.str;
        field.oninput = (e) => { if (verifyAccCond(e.target.value)) {
            field.className = "inputField"
        }
        else {
            field.className = "inputField error"
        }
        };
        field.onblur = (e) => {
            if (e.target.value != this.oldAccCond && verifyAccCond(e.target.value)) {
                this.automaton.acceptance.str = e.target.value;
                this.automaton.accname = "";
            }
            this.automatonChanged();
        }
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
        let aliasObject = array[index]
        let isUsed = this.automaton.isAliasUsed(aliasObject.aname);
        let keyField = this.createAliasKey(aliasObject,index,isUsed)
        let valueLabel = SidebarUtils.createLabel(index + "v", ":");
        let valueField = this.createLexprField(aliasObject)
        let removeButton = this.createAliasRemoveButton(array, index, isUsed);
        return SidebarUtils.createDivWithChildren(keyLabel, keyField, valueLabel, valueField, removeButton);
    }
    createLexprField(aliasObject) {
        let lexprObj = new LexprField(this.automaton, this.translator)
        lexprObj.setExcludedObject(aliasObject);
        let valueField = document.createElement("div");
        valueField.className = "cell";
        lexprObj.onValueChanged = () => this.automatonChanged();
        let valueContent = lexprObj.drawField(aliasObject.lexpr)
        valueField.appendChild(valueContent);
        this.aliasFields.push(lexprObj);
        lexprObj.onSelected = () => {
            this.deselectAliases(lexprObj);
        }
        return valueField;
    }
    createAliasKey(aliasObject,index,isUsed) {
        let keyField = SidebarUtils.createField(index + "k");
        keyField.value = aliasObject.aname.substring(1);
        keyField.disabled = isUsed;
        keyField.oninput = (e) => {
            if (this.aliasKeyVerifier.verify(e.target.value)) {
                aliasObject.aname = "@" + e.target.value
                keyField.className = "inputField"
            }
            else {
                keyField.className = "inputField error"
            }
        }
        return keyField;
    }
    createAliasRemoveButton(array,index,isUsed) {
    let removeButton = document.createElement("button")
    removeButton.setAttribute("type", "button");
    removeButton.innerHTML = "X";
    removeButton.disabled = isUsed;
    removeButton.addEventListener("click", () => {
        array[index] = null;
        this.automatonChanged();
    });
        return removeButton;
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