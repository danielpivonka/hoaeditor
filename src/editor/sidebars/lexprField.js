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
    }
    drawField(labelArray) {
        let field = document.createElement("div");
        this.drawElements(field, labelArray);
        field.onclick = (e) => {
            e.stopPropagation();
            this.createKeyboard(field, labelArray)
            this.labelCursor = labelArray.length;
            this.slected()
            this.drawElements(field, labelArray);
            console.log("empty clicked");
        }
        return field;
    }
    slected() {
        if (this.onSelected) {
            this.onSelected();
        }
}
    drawElements(field,labelArray) {
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
            element.onmousedown = (e) => {
                e.stopPropagation();
                this.slected()
                this.createKeyboard(field,labelArray)
                this.labelCursor = i;
                this.drawElements(field,labelArray)
            };
            element.oncontextmenu = (e) => {
                e.preventDefault();
                e.stopPropagation();
                labelArray.splice(i, 1);
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
    }
    createKeyboard(field,labelArray) {
        if (!this.keyboardNode) {
            this.labelKeyboard.onInput = (str) => {
                labelArray.splice(this.labelCursor, 0, str)
                this.labelCursor++;
                this.drawElements(field,labelArray)
            };
            this.labelCursor = labelArray.length;
            this.keyboardNode = this.labelKeyboard.generateKeyboard();
            document.getElementsByTagName("body")[0].appendChild(this.keyboardNode )
            this.drawElements(field,labelArray)
        }
    }
}
exports.LexprField = LexprField;