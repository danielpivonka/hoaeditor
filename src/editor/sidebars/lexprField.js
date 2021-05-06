const verifyLabel = require('../verifiers/labelVerifier.js').verifyLabel;
const LabelKeyboard = require('./labelKeyboard.js').LabelKeyboard;
const AbstractField = require('./abstractField').AbstractField;

class LexprField extends AbstractField{
    constructor(automaton, translator, mandatory) {
        super(automaton)
        this.translator = translator;
        this.labelCursor = -1;
        this.labelKeyboard = new LabelKeyboard(automaton, translator)
        this.cursorNode;
        this.originalArray;
        this.localArray = [];
        this.excluded;
        this.field;
        this.onValueChanged;
        this.changed = false;
        this.isCorrect = false;
        this.isMandatory = mandatory;
        this.keyboardNode;
        this.isSelected = false;
        this.onSelected;
        this.onKeyboardGenerated;
    }
    keyboardGenerated() {
        if (this.onKeyboardGenerated) {
            this.onKeyboardGenerated(this.keyboardNode);
            this.keyboardNode.className = "container";
        }
        else {
            this.keyboardNode.className = "container keyboard";
            document.getElementsByTagName("body")[0].appendChild(this.keyboardNode);
        }
    }
    setExcludedObject(object) {
        this.excluded = object;
    }
    drawField(labelArray) {
        this.field = document.createElement("div");
        this.originalArray = labelArray;
        this.localArray = [...labelArray];
        this.drawElements(this.field, this.localArray);
        let sel = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.selected(this.localArray.length);
            this.drawElements(this.field, this.localArray);
         }
        this.field.onclick = sel;
        this.field.oncontextmenu = sel;
        this.field.onmousedown = (e) => {
            e.stopPropagation();
        }
        return this.field;
    }
    selected(cursor) {
        this.labelCursor = cursor;
        console.log("this.isSelected: " + this.isSelected);
        if (!this.isSelected) {
            if (this.onSelected) {
                this.onSelected();
            }
            this.labelCursor = cursor;

        this.changed = false;
        this.isSelected = true;
            console.log("drawing keyboard");
        this.createKeyboard(this.field, this.localArray);
    }

}
    drawElements(field, labelArray) {
        field.innerHTML = "";
        field.appendChild(this.createFiller());
        let cursorDrawn = false;
        if ((labelArray.length!=0||!this.isMandatory)&&verifyLabel(labelArray)) {
            field.className = "label_area";
            this.isCorrect = true;
        }
        else {
            field.className = "label_area error";
            this.isCorrect = false;
        }
        for (let i = 0; i < labelArray.length; i++) {
            let labelElement = labelArray[i];
            let element = document.createElement("div");

            element.className = "label_element";
            element.innerHTML = this.translator.translate([labelElement]);
            if (this.labelCursor == i) {
                this.drawCursor(field);
                cursorDrawn = true;
            }
            element.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.selected(i);
                this.drawElements(field, this.localArray);
            };
            element.oncontextmenu = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.selected(this.localArray.length);
                labelArray.splice(i, 1);
                this.attemptCommit();
                this.drawElements(field,labelArray)
            }
            field.appendChild(element);
        }
        if (!cursorDrawn && this.labelCursor != -1) {
            this.drawCursor(field, labelArray);
        }
        let padding = document.createElement("div");
        padding.style.width ="10px"
        field.appendChild(padding);
        
    }
    drawCursor(field) {
        let cursor = document.createElement("div");
        cursor.className = "cursor blink";
        this.cursorNode = field.appendChild(cursor);
    }
    deselect() {
        if (this.keyboardNode) {
            this.keyboardNode.remove();
            this.keyboardNode = null;
        }
        this.isSelected = false;
        if (this.cursorNode) {
            this.cursorNode.remove();
            this.cursorNode = null;
        }
        this.labelCursor = -1;
        if (this.changed) {
            this.valueChanged();
        }
        console.log("deselecting");
        this.isSelected = false;
        this.changed = false;
    }
    createKeyboard(field,labelArray) {
        if (!this.keyboardNode) {
            this.labelKeyboard.onInput = (str) => {
                labelArray.splice(this.labelCursor, 0, str)
                this.labelCursor++;
                this.drawElements(field, labelArray)
                this.attemptCommit();
            };
            this.keyboardNode = this.labelKeyboard.generateKeyboard(this.excluded);
            this.keyboardGenerated();
            this.drawElements(field,labelArray)
        }
    }
    attemptCommit() {
        if (this.localArray.length == 0 || verifyLabel(this.localArray)) {
            this.originalArray.splice(0, this.originalArray.length, ...this.localArray);
        }
        this.changed = true;
    }
    valueChanged() {
        if (this.onValueChanged) {
            this.onValueChanged();
        }
    }
}
exports.LexprField = LexprField;