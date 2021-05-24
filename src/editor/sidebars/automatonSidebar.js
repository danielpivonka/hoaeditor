
const Automaton = require('../../hoaData/automaton').Automaton;
const SidebarUtils = require('./sidebarUtils.js').SidebarUtils;
const LexprField = require('./lexprField.js').LexprField;
const AliasKeyVerifier = require('../verifiers/aliasKeyVerifier.js').AliasKeyVerifier;
const verifyAccCond = require('../verifiers/accConditionVerifier').verifyAccCond;
const LabelTranslator = require('../../labelTranslator').LabelTranslator;

class AutomatonSidebar {

    
    /**
     * Creates an automaton sidebar generator.
     * 
     * @param {Automaton} automaton - Automaton whose sidebar will be generated.
     * @param {LabelTranslator} translator - Translator bound to the automaton.
     */
    constructor(automaton,translator) {
        this.automaton = automaton;
        this.automatonChangedListeners = [];
        this.collapsedState = [];
        this.translator = translator;
        this.keyboard;
        this.selectedAliasIndex = -1;
        this.aliasKeyVerifier = new AliasKeyVerifier(automaton);
        this.aliasFields = [];
        for (let i = 0; i < automaton.aliases.length; i++) {
            this.aliasFields.push(new LexprField(automaton,translator,true))
        }
        this.oldAccCond;
        this.correctMap = new Map();
    }
    /**
     * Adds listener that will be called when automaton is changed.
     * 
     * @param {Function} func - Function that will be called.
     */
    addAutomatonChangedListener(func) {
        this.automatonChangedListeners.push(func)
    }
    /**
     * Calls automaton checnged listeners.
     */
    automatonChanged() {
        for (const func of this.automatonChangedListeners) {
            func();
        }
    }
    /**
     * Generates sidebar.
     * 
     * @returns {HTMLDivElement} The sidebar.
     */
    generateSidebar() {
        this.correctMap = new Map();
        let sidebar = document.createElement("div");
        sidebar.append(this.createApList());
        sidebar.append(this.createAliasList());
        sidebar.append(this.createPropsList());
        let sidebarTable = document.createElement("div");
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createAcceptanceCount());
        sidebarTable.append(this.createAcceptanceCondition());
        sidebarTable.append(this.createAccname());
        sidebarTable.append(this.createName());
        sidebar.append(sidebarTable);
        return sidebar;
    }
    /**
     * Creates a list of atomic proposition fields.
     * 
     * @returns {HTMLDivElement} The atomic proposition list.
     */
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
    /**
     * Creates a list of properties of the automaton.
     * 
     * @returns {HTMLDivElement} The properties list.
     */
    createPropsList() {
        let wrap = SidebarUtils.createList(this.createProp.bind(this), this.automaton.properties, "Properties", this.collapsedState);
        let inner = wrap.getElementsByTagName("div")[0];
        let addButton = document.createElement("button")
        addButton.setAttribute("type", "button");
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", () => {
            this.automaton.properties.push("")
            this.automatonChanged();
        });
        inner.append(SidebarUtils.createDivWithChildren(addButton));
        return wrap;
    }
    /**
     * Creates a propery field.
     * 
     * @param {string[]} array - List of automaton properties.
     * @param {number} index - Index of property to bind.
     * @returns {HTMLDivElement} Div containing the property field.
     */
    createProp(array,index) {
        let id = index + "prop";
        let field = SidebarUtils.createField(id);
        field.value = array[index];
        field.oninput = (e) => {
            this.setFieldCorrectness(field, /^[a-zA-Z_][0-9a-zA-Z_-]*$/.test(e.target.value))
            if (/^[a-zA-Z_][0-9a-zA-Z_-]*$/.test(e.target.value)) {
                array[index] = e.target.value;
            }
        };
        field.onblur = (e) => {
            e.target.value = array[index]; 
        }

        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button");
        removeButton.innerHTML = "X";
        removeButton.disabled = this.automaton.isAPUsed(index);
        removeButton.addEventListener("click", () => {
            array.splice(index, 1);
            this.automatonChanged();
        });
        return SidebarUtils.createDivWithChildren(field,removeButton);
    }
    /**
     * Creates a list of alias fields.
     * 
     * @returns {HTMLDivElement} Div containing the alias fields.
     */
    createAliasList() {
        this.automaton.aliases = this.automaton.aliases.filter((e) => e != null);
        let wrap = SidebarUtils.createList(this.createAlias.bind(this), this.automaton.aliases, "Aliases", this.collapsedState);
        let inner = wrap.getElementsByTagName("div")[0];
        let addButton = document.createElement("button")
        addButton.setAttribute("type", "button");
        addButton.innerHTML = "Add";
        addButton.addEventListener("click", () => {
            this.automaton.aliases.push({ aname: "@", lexpr: [] })
            this.aliasFields.push(new LexprField(this.automaton,this.translator,true))
            this.automatonChanged();
        });
        inner.append(addButton);
        return wrap;
    }
    /**
     * Creates an atomic proposition field.
     * 
     * @param {string[]} array - List of atomic propositions.
     * @param {number} index - Index of atomic propositions to bind.
     * @returns {HTMLDivElement} Div containing the atomic proposition field.
     */
    createAP(array, index) {
        let id = "ap" + index;
        let label = SidebarUtils.createLabel(id, index + ":");
        let field = SidebarUtils.createField(id);
        field.value = array[index];
        if (field.value != "") {
            field.className = "inputField"
            this.correctMap.set(id, true);
        }
        else {
            field.className = "inputField error"
            this.correctMap.set(id, false);
        }
        field.oninput = (e) => {
            array[index] = e.target.value;
            if (e.target.value!="") {
                field.className = "inputField"
                this.correctMap.set(id, true);
            }
            else {
                field.className = "inputField error"
                this.correctMap.set(id, false);
            }
        };
        field.onblur = () => { this.automatonChanged(); };
        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button");
        removeButton.innerHTML = "X";
        removeButton.disabled = this.automaton.isAPUsed(index);
        removeButton.title = this.automaton.isAPUsed(index) ? "Used atomic proposition can not be removed" : "";

        removeButton.addEventListener("click", () => {
            this.automaton.removeAP(index);
            this.automatonChanged();
        });
        return SidebarUtils.createDivWithChildren(label, field,removeButton);
    }
    /**
     * Creates row for editing acceptance count of bound automaton.
     * 
     * @returns {HTMLDivElement} Row containing the field for editing and label.
     */
    createAcceptanceCount() {
        let id = "acccount";
        let label = SidebarUtils.createLabel(id, "Acceptance sets:");
        let field = SidebarUtils.createField(id, "number");
        field.value = this.automaton.acceptance.count;
        field.min = this.maxAccSetUsed();
        field.oninput = (e) => {
                this.automaton.acceptance.count = e.target.value; 
        };
        field.onchange = () => {
            document.activeElement.blur();
        }
        field.onblur = () => {
            if (this.automaton.acceptance.count < field.min) {
                this.automaton.acceptance.count = field.min;
            }
            this.automatonChanged();
        }
        
        return SidebarUtils.createDivWithChildren(label, field);
    }
    /**
     * Calculates max acceptance set used in this automaton bound to this sidebar.
     * 
     * @returns {number} Max acceptance set number.
     */
    maxAccSetUsed() {
        let inAutomaton = this.automaton.getHighestAccSetUsed();
        let matcher = /\d+/g
        let matches = [...this.automaton.acceptance.str.matchAll(matcher)];
        return Math.max(...matches,inAutomaton)+1;
    }
    /**
     * Creates field for editing acceptance condition.
     * 
     * @returns {HTMLDivElement} Field for editing acceptance condition.
     */
    createAcceptanceCondition() {
        let id = "acccond";
        let label = SidebarUtils.createLabel(id, "Acceptance condition:");
        let field = SidebarUtils.createField(id);
        field.value = this.automaton.acceptance.str;
        this.setFieldCorrectness(field,verifyAccCond(field.value,this.automaton)&&field.value!="")
        field.oninput = (e) => {
            this.setFieldCorrectness(field,verifyAccCond(e.target.value,this.automaton)&&e.target.value!="")
        };
        field.onblur = (e) => {
            if (e.target.value != this.oldAccCond && verifyAccCond(e.target.value,this.automaton)) {
                this.automaton.acceptance.str = e.target.value;
                this.automaton.accname = "";
            }
            this.automatonChanged();
        }
        return SidebarUtils.createDivWithChildren(label, field);
    }
    /**
     * Creates field for editing acceptance name.
     * 
     * @returns {HTMLDivElement} Field for editing acceptance name.
     */
    createAccname() {
        let id = "accname";
        let label = SidebarUtils.createLabel(id, "acceptance name:");
        let field = SidebarUtils.createField(id);
        field.value = this.automaton.accname;
        field.oninput = (e) => { this.automaton.accname = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    /**
     * Creates field for editing automaton name.
     * 
     * @returns {HTMLDivElement} Field for editing automaton name.
     */
    createName() {
        let id = "name";
        let label = SidebarUtils.createLabel(id, "name:");
        let field = SidebarUtils.createField(id);
        field.value = this.automaton.name;
        field.oninput = (e) => { this.automaton.name = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }

    /**
     * Creates field for editing alias.
     * 
     * @param {string[]} array - List of aliases.
     * @param {number} index - Index of alias to bind.
     * @returns {HTMLDivElement} Field for editing automaton name.
     */
    createAlias(array, index) {
        let keyLabel = SidebarUtils.createLabel(index + "k", "@");
        let aliasObject = array[index]
        let isUsed = this.automaton.isAliasUsed(aliasObject.aname);
        let keyField = this.createAliasKey(aliasObject,index,isUsed)
        let valueLabel = SidebarUtils.createLabel(index + "v", ":");
        let valueField = this.createLexprField(aliasObject,index)
        let removeButton = this.createAliasRemoveButton(array, index, isUsed);
        return SidebarUtils.createDivWithChildren(keyLabel, keyField, valueLabel, valueField, removeButton);
    }
    /**
     * Creates field for editing label expression for alias.
     * 
     * @param {{aname:string,lexpr:string}} aliasObject - The alias object which this field will mutate.
     * @param {number} index - Index of given alias.
     * @returns {HTMLDivElement} Field for editing alias label expression.
     */
    createLexprField(aliasObject, index) {
        let lexprObj = this.aliasFields[index];
        lexprObj.setExcludedObject(aliasObject);
        let valueField = document.createElement("div");
        valueField.className = "cell";
        lexprObj.onValueChanged = () => {
            this.automatonChanged()
            this.correctMap.set(index+"v", lexprObj.isCorrect);
        };
        let valueContent = lexprObj.drawField(aliasObject.lexpr)
        valueField.appendChild(valueContent);
        lexprObj.onSelected = () => {
            this.deselectAliases(lexprObj);
        }
        return valueField;
    }
    /**
     * Creates field for editing key for alias.
     * 
     * @param {{aname:string,lexpr:string}} aliasObject - The alias object which this field will mutate.
     * @param {number} index - Index of given alias.
     * @param {boolean} isUsed - Whether or not is the given alias used in automaton. 
     * @returns {HTMLDivElement} Field for editing alias label expression.
     */
    createAliasKey(aliasObject, index, isUsed) {
        let id = index + "k";
        let keyField = SidebarUtils.createField(id);
        keyField.value = aliasObject.aname.substring(1);
        keyField.disabled = isUsed;
        keyField.title = isUsed ? "Key can not be changed if alias is used" : "";
        this.setFieldCorrectness(keyField,keyField.value!="")
        keyField.oninput = (e) => {
            if (this.aliasKeyVerifier.verify(e.target.value)) {
                aliasObject.aname = "@" + e.target.value
                this.setFieldCorrectness(keyField, true)
            }
            else {
                this.setFieldCorrectness(keyField, false)
            }
        }
        return keyField;
    }
    /**
     * Creates an atomic proposition field.
     * 
     * @param {{aname:string,lexpr:string}[]} array - List of aliases.
     * @param {number} index - Index of alias to bind.
     * @param {boolean} isUsed - Whether or not is the given alias used in automaton. 
     * @returns {HTMLDivElement} Button to remove atomic proposition with given index.
     */
    createAliasRemoveButton(array,index,isUsed) {
    let removeButton = document.createElement("button")
    removeButton.setAttribute("type", "button");
    removeButton.innerHTML = "X";
    removeButton.disabled = isUsed;
    removeButton.title = isUsed ? "Used aliases can not be removed" : "";
    removeButton.addEventListener("click", () => {
        array[index] = null;
        this.aliasFields.splice(index, 1);
        this.automatonChanged();
    });
        return removeButton;
    }
    /**
     * Deselects all aliases except one.
     * 
     * @param {{aname:string,lexpr:string}} except - The alias which wont be deselected.
     */
    deselectAliases(except) {
        for (const field of this.aliasFields) {
            if (field != except) {
                field.deselect();
            }
        }
    }
    /**
     * Marks given field as correct.
     * 
     * @param {HTMLDivElement} field - Field to be marked.
     * @param {boolean} isCorrect - True to mark field as correct, false to mark field as incorrect.
     */
    setFieldCorrectness(field,isCorrect) {
        field.className = isCorrect ? "inputField" : "inputField error";
        this.correctMap.set(field, isCorrect);
    }
}
exports.AutomatonSidebar = AutomatonSidebar;