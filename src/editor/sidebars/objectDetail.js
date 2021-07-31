const SidebarUtils = require('./sidebarUtils').SidebarUtils;
const AccSetVerifier = require('../verifiers/accSetVerifier').AccSetVerifier;
const verifyLabel = require('../verifiers/labelVerifier').verifyLabel;
const State = require('../../hoaData/state').State;
const LexprField = require('./lexprField').LexprField;
const Edge = require('../../hoaData/edge').Edge;
const Automaton = require('../../hoaData/automaton').Automaton;
const LabelTranslator = require('../../labelTranslator').LabelTranslator;
const AccSetField = require('./accSetField').AccSetField;

class ObjectDetail {
    /**
     * Creates a new object which can be used to generate automaton element detail.
     * 
     * @param {Automaton} automaton - Automaton for which te details will be generated.
     * @param {LabelTranslator} translator - Label translator associated with the automaton.
     */
    constructor(automaton,translator) {
        this.sidebarRedrawRequestListener = null;
        this.translator = translator;
        this.accSetVerifier = new AccSetVerifier(automaton);
        this.lexprField = new LexprField(automaton, translator)
        this.accSetField = new AccSetField(automaton);
        this.automaton = automaton;
        this.currentLabel;
        this.object;
        this.onAutomatonChanged;
        this.lexprField.onKeyboardGenerated = (keyboardNode) =>this.onKeyboardGenerated(keyboardNode)
        this.sidebar;
        this.keyboardDiv;
    }
    /**
     * Generates the HTML of the detail.
     * 
     * @param {State|Edge} object - Generates detail from the given element.
     * @returns {HTMLDivElement} The generated detail.
     */
    generateDetail(object) {
        this.object = object;
        this.sidebar = document.createElement("div");
        this.draw();
        return this.sidebar;
    }
    /**
     * Updates current detail.
     */
    draw() {
        this.currentLabel = [...this.object.label];
        this.sidebar.innerHTML = "";
        let sidebarTable = document.createElement("div");
        this.sidebar.append(sidebarTable);
        sidebarTable.setAttribute("class", "sidebarTable");
        sidebarTable.append(this.createAccSet(this.object.accSets));
        sidebarTable.append(this.createLabel(this.object));
        if (this.object instanceof State) {
            sidebarTable.append(this.createName(this.object));
            this.sidebar.append(this.createAddStartButton(this.object));
            if (this.object.areEdgesLabeled()) {
                sidebarTable.append(this.createWarning());
            }
            else if (this.object.label.length>0 ){
                this.sidebar.append(this.createTransferButton(this.object));
            }
        }
        this.keyboardDiv = document.createElement("div")
        this.sidebar.append(this.keyboardDiv);

    }
    /**
     * Appends keyboard ro rhe detail.
     * 
     * @param {HTMLDivElement} keyboardNode - The keyboard to be generated.
     */
    onKeyboardGenerated(keyboardNode) {
        this.keyboardDiv.innerHTML = "";
        this.keyboardDiv.appendChild(keyboardNode);
    }
    /**
     * Creates a row for editing name of state.
     * 
     * @param {State} object - State bound to the detail.
     * @returns {HTMLDivElement} - The generated row.
     */
    createName(object) {
        let id = "name";
        let label = SidebarUtils.createLabel(id, "name:");
        let field = SidebarUtils.createField(id);
        field.value = object.name;
        field.oninput = (e) => { object.name = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
    /**
     * Creates a row for editing label of element.
     * 
     * @returns {HTMLDivElement} - The generated row.
     */
    createLabel() {
        this.labelCursor = -1;
        let id = "label";
        let label = SidebarUtils.createLabel(id, "Label:");
        let field = this.lexprField.drawField(this.currentLabel)
        return SidebarUtils.createDivWithChildren(label, field);
    }
    /**
     * Creates a row for editing acceptance sets.
     * The supplied array is mutated by user actions.
     * 
     * @param {number[]} accSetArray - Array of acceptance sets of the element.
     * @returns {HTMLDivElement} - The generated row.
     */
    createAccSet(accSetArray) {
        let id = "accSet";
        let label = SidebarUtils.createLabel(id, "Acceptance sets:");
        let field = this.accSetField.drawField(accSetArray);
        return SidebarUtils.createDivWithChildren(label, field);
    }
    /**
     * Creates a button that marks the state as starting.
     * 
     * @param {State} state - The state bound to teh detail.
     * @returns {HTMLButtonElement} The generated button.
     */
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
    /**
     * Closes the current detail.
     */
    close() {
        this.commitChanges();
        this.lexprField.deselect();
    }
    /**
     * Saves the changes made to the bound elements.
     */
    commitChanges() {
        if (verifyLabel(this.currentLabel)) {
            if (this.object instanceof State) {
                this.object.setLabel(this.currentLabel);
            }
            else if (this.object instanceof Edge) {
                if (this.object.parent.label.length!=0) {
                    this.object.parent.transferLabel();
                }
                this.object.label = this.currentLabel;
            }
        }
        if (this.onAutomatonChanged) {
            this.onAutomatonChanged();
        }
    }
    /**
     * Creates warning text about potentially unwanted removal of labels from edges.
     * 
     * @returns {HTMLDivElement} Div containing the warining text.
     */
    createWarning() {
        let warning = document.createElement("div");
        let label = document.createElement("div");
        warning.className = "detailText";
        label.className = "detailText";
        label.innerHTML = "Warning: ";
        warning.innerHTML = "Setting label to this state<br>will erase labels from outgoing edges"
        return SidebarUtils.createDivWithChildren(label, warning);
    }
    /**
     * Creates a button that transfers labels from state to outgoing edges.
     * 
     * @param {State} state - State bound to current detail.
     * @returns {HTMLButtonElement} The generated button.
     */
    createTransferButton(state) {
        let button = document.createElement("button");
        button.className = "button";
        button.innerHTML = "Transfer labels to edge"
        button.onclick = () => {
            state.transferLabel();
            this.draw();
            this.onAutomatonChanged();
        }
        return button;
    }

}
exports.ObjectDetail = ObjectDetail;