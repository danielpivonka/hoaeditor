const AccSetKeyboard = require('./accSetKeyboard').AccSetKeyboard;
const AbstractField = require('./abstractField').AbstractField;

class AccSetField extends AbstractField{
    constructor(automaton) {
        super(automaton)
        this.accSetKeyboard = new AccSetKeyboard(automaton)
        this.field;
        this.onValueChanged;
    }
    drawField(labelArray) {
        this.field = document.createElement("div");
        this.drawElements(this.field, labelArray);
        let sel = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.selected(labelArray)
            this.drawElements(this.field, labelArray);
         }
        this.field.onclick = sel;
        this.field.oncontextmenu = sel;
        this.field.onmousedown = (e) => {
            e.stopPropagation();
        }
        this.field.className = "label_area";
        return this.field;
    }
    selected(arr) {
        console.log("selected called");
    if (!this.isSelected) {
        this.isSelected = true;
        this.createKeyboard(this.field, arr)
        if (this.onSelected) {
            this.onSelected();
        }

    }

}
    drawElements(field, labelArray) {
        field.innerHTML = "";
        field.appendChild(this.createFiller());
        labelArray.sort();
        for (let i = 0; i < labelArray.length; i++) {
            let element = document.createElement("div");
            element.innerHTML = labelArray[i];
            element.className = "label_element";
            element.oncontextmenu = (e) => {
                e.stopPropagation();
                e.preventDefault();
                labelArray.splice(i, 1);
                this.drawElements(field, labelArray)
                this.accSetKeyboard.onUpdate();
            }
            field.appendChild(element);
        }
        let padding = document.createElement("div");
        padding.style.width ="10px"
        field.appendChild(padding);
        
    }

    createKeyboard(field,labelArray) {
        if (!this.keyboardNode) {
            this.accSetKeyboard.onInput = (str) => {
                labelArray.push(str)
                this.drawElements(field, labelArray)
            };
            this.keyboardNode = this.accSetKeyboard.generateKeyboard(labelArray);
            document.getElementsByTagName("body")[0].appendChild(this.keyboardNode )
            this.drawElements(field,labelArray)
        }
    }
    valueChanged() {
        if (this.onValueChanged) {
            this.onValueChanged();
        }
    }
}
exports.AccSetField = AccSetField;