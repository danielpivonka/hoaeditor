const AbstractField = require('./abstractField').AbstractField;
const Automaton = require('../../hoaData/automaton').Automaton;

class AccSetField extends AbstractField{
    
    /**
     * Constructs acceptance set field generator for given automaton.
     * 
     * @param {Automaton} automaton - The automaton for which the acc set field will be generated.
     */
    constructor(automaton) {
        super(automaton)
        this.field;
        this.onValueChanged;
    }
    /**
     * Generates the field for given array.
     * 
     * @param {number[]} accSetArray - The array which will be mutated by the field.
     * @returns {HTMLDivElement} The HTML element generated.
     */
    drawField(accSetArray) {
        this.field = document.createElement("div");
        this.drawElements(this.field, accSetArray);
        this.field.className = "label_area";
        return this.field;
    }
    /**
     * Draws acceptance set switches int given fiels.
     * 
     * @param {HTMLDivElement} field - The field to which to draw.
     * @param {number[]} stateAccSetArray - Array of acceptance set numbers which are currently selected.
     */
    drawElements(field, stateAccSetArray) {
        field.innerHTML = "";
        field.appendChild(this.createFiller());
        stateAccSetArray.sort();
        for (let i = 0; i < this.automaton.acceptance.count; i++) {
            
            field.appendChild(this.createElement(i,stateAccSetArray,field));
        }
        let padding = document.createElement("div");
        padding.style.width ="10px"
        field.appendChild(padding);
        
    }
    /**
     * Creates a switch for adding or emoving acceptance set.
     * 
     * @param {number} i - The index of the acceptance set to draw.
     * @param {number[]} stateAccSetArray - Array of acceptance set numbers which are currently selected.
     * @param {HTMLDivElement} field - The field to which this element belongs.
     * @returns {HTMLDivElement} The generated switch.
     */
    createElement(i, stateAccSetArray, field) {
        let selected = stateAccSetArray.includes(i);
        let element = document.createElement("div");
        element.innerHTML = i;
        element.className = "label_element";
        if (!selected) {
            element.style.backgroundColor = "gray";
        }
        let onclick = selected ? () => stateAccSetArray.splice(stateAccSetArray.indexOf(i),1) : () => stateAccSetArray.push(i);
        element.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            onclick();
            this.valueChanged();
            this.drawElements(field, stateAccSetArray)
        }
        return element;
    }
    /**
     * Calls the on value changed listener.
     */
    valueChanged() {
        if (this.onValueChanged) {
            this.onValueChanged();
        }
    }
}
exports.AccSetField = AccSetField;