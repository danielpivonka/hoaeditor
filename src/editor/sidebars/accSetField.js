const AbstractField = require('./abstractField').AbstractField;

class AccSetField extends AbstractField{
    constructor(automaton) {
        super(automaton)
        this.field;
        this.onValueChanged;
    }
    drawField(labelArray) {
        this.field = document.createElement("div");
        this.drawElements(this.field, labelArray);
        this.field.className = "label_area";
        return this.field;
    }
    drawElements(field, stateAccSetArray) {
        field.innerHTML = "";
        field.appendChild(this.createFiller());
        stateAccSetArray.sort();
        for (let i = 1; i <= this.automaton.acceptance.count; i++) {
            
            field.appendChild(this.createElement(i,stateAccSetArray,field));
        }
        let padding = document.createElement("div");
        padding.style.width ="10px"
        field.appendChild(padding);
        
    }
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

    valueChanged() {
        if (this.onValueChanged) {
            this.onValueChanged();
        }
    }
}
exports.AccSetField = AccSetField;