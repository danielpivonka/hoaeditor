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
    }
    setExcludedObject(object) {
        this.excluded = object;
    }
    drawField(labelArray) {
        this.field = document.createElement("div");
        this.originalArray = labelArray;
        this.localArray = [...labelArray];
        this.drawElements(this.field, this.localArray);
        let sel =  (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.createKeyboard(this.field, this.localArray)
            this.labelCursor = this.localArray.length;
            this.selected()
            this.drawElements(this.field, this.localArray);
            console.log("empty clicked");
         }
        this.field.onclick = sel;
        this.field.oncontextmenu = sel;
        this.field.onmousedown = (e) => {
            e.stopPropagation();
        }
        return this.field;
    }
    selected() {
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
            element.onmousedown = () => {
                this.createKeyboard(field,labelArray)
                this.labelCursor = i;
                this.drawElements(field,labelArray)
            };
            element.oncontextmenu = () => {
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
        this.drawElements(this.field, this.originalArray)
    }
    createKeyboard(field,labelArray) {
        if (!this.keyboardNode) {
            this.labelKeyboard.onInput = (str) => {
                labelArray.splice(this.labelCursor, 0, str)
                this.labelCursor++;
                this.drawElements(field, labelArray)
                this.attemptCommit();
            };
            this.labelCursor = labelArray.length;
            this.keyboardNode = this.labelKeyboard.generateKeyboard(this.excluded);
            document.getElementsByTagName("body")[0].appendChild(this.keyboardNode )
            this.drawElements(field,labelArray)
        }
    }
    attemptCommit() {
        console.log("attempting commit")
        if (this.localArray.length == 0 || verifyLabel(this.localArray)) {
            this.originalArray.splice(0, this.originalArray.length, ...this.localArray);
            console.log("commited")
        }
    }
}
exports.LexprField = LexprField;