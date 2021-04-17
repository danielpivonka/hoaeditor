const verifyLabel = require('../verifiers/labelVerifier.js').verifyLabel;
const LabelKeyboard = require('./labelKeyboard.js').LabelKeyboard;

class LexprField {
    constructor(automaton, translator) {
        this.translator = translator;
        this.automaton = automaton;
        this.labelCursor = -1;
        this.labelKeyboard = new LabelKeyboard(automaton, translator)
        this.onSelected;
        this.keyboardNode;
        this.cursorNode;
        this.originalArray;
        this.localArray = [];
        this.excluded;
        this.field;
        this.onValueChanged;
        this.changed = false;
        this.isSelected = false;
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
        console.log("setting cursor: " + cursor);
        console.log("current cursor: " + this.labelCursor);
    if (!this.isSelected) {
        this.changed = false;
        this.isSelected = true;
        this.createKeyboard(this.field, this.localArray)
        if (this.onSelected) {
            this.onSelected();
        }

    }

}
    drawElements(field, labelArray) {
        field.innerHTML = "";
        let cursorDrawn = false;
        if (labelArray.length==0||verifyLabel(labelArray)) {
            field.className = "label_area";
        }
        else {
            field.className = "label_area error";
        }
        for (let i = 0; i < labelArray.length; i++) {
            let labelElement = labelArray[i];
            let element = document.createElement("div");

            element.className = "label_element";
            element.innerHTML = this.translator.translate(labelElement);
            if (this.labelCursor == i) {
                this.drawCursor(field);
                cursorDrawn = true;
            }
            element.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.selected(i);
                this.drawElements(this.field, this.localArray);
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
        let filler = document.createElement("div");
        filler.style.width ="10px"
        field.appendChild(filler);
        
    }
    drawCursor(field) {
        let cursor = document.createElement("div");
        let inner = document.createElement("span");
        inner.innerHTML = "."
        inner.style.visibility = "hidden";
        cursor.appendChild(inner);
        cursor.className = "cursor blink";
        this.cursorNode = field.appendChild(cursor);
    }
    deselect() {
        if (this.keyboardNode) {
            this.keyboardNode.remove();
            this.keyboardNode = null;
        }
        if (this.cursorNode) {
            this.cursorNode.remove();
            this.cursorNode = null;
        }
        this.labelCursor = -1;
        if (this.changed) {
            this.valueChanged();
        }
        this.isSelected = false;
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
            document.getElementsByTagName("body")[0].appendChild(this.keyboardNode )
            this.drawElements(field,labelArray)
        }
    }
    attemptCommit() {
        if (this.localArray.length == 0 || verifyLabel(this.localArray)) {
            this.originalArray.splice(0, this.originalArray.length, ...this.localArray);
            this.changed = true;
        }
    }
    valueChanged() {
        if (this.onValueChanged) {
            this.onValueChanged();
        }
    }
}
exports.LexprField = LexprField;