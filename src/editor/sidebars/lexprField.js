const verifyLabel = require('../verifiers/labelVerifier.js').verifyLabel;
const LabelKeyboard = require('./labelKeyboard.js').LabelKeyboard;
const AbstractField = require('./abstractField').AbstractField;
const Automaton = require('../../hoaData/automaton').Automaton;
const LabelTranslator = require('../../labelTranslator').LabelTranslator;

class LexprField extends AbstractField{
    /**
     * Creates new object for generating label expresion fields for details.
     * 
     * @param {Automaton} automaton - The automaton to which the detail is bound.
     * @param {LabelTranslator} translator - LabelTranslator bound to the automaton.
     */
    constructor(automaton, translator) {
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
        this.keyboardNode;
        this.isSelected = false;
        this.onSelected;
        this.onKeyboardGenerated;
    }
    /**
     * Sets which label element can not ocur in this field.
     * 
     * @param {string} object - The element to exclude.
     */
    setExcludedObject(object) {
        this.excluded = object;
    }
    /**
     * Generates label field based on given array.
     * User input mutates the array.
     * 
     * @param {string[]} labelArray - Array containing the label elements.
     * @returns {HTMLDivElement} - The generated HTML element.
     */
    drawField(labelArray) {
        this.field = document.createElement("div");
        this.originalArray = labelArray;
        this.localArray = [...labelArray];
        this.drawElements(this.localArray);
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
    /**
     * Moves the cursor to given position.
     * 
     * @param {number} position - The position to which to move the cursor.
     */
    selected(position) {
        this.labelCursor = position;
        if (!this.isSelected) {
            if (this.onSelected) {
                this.onSelected();
            }
            this.labelCursor = position;

        this.changed = false;
        this.isSelected = true;
        this.createKeyboard(this.field, this.localArray);
    }

}
    /**
     * Draws elements of current label.
     * 
     * @param {string[]} labelArray - Elements to draw.
     */
    drawElements(labelArray) {
        this.field.innerHTML = "";
        this.field.appendChild(this.createFiller());
        let cursorDrawn = false;
        if (verifyLabel(labelArray,this.originalArray.length==0)) {
            this.field.className = "label_area";
            this.isCorrect = true;
        }
        else {
            this.field.className = "label_area error";
            this.isCorrect = false;
        }
        for (let i = 0; i < labelArray.length; i++) {
            let labelElement = labelArray[i];
            let element = document.createElement("div");

            element.className = "label_element";
            element.innerHTML = this.translator.translate([labelElement]);
            if (this.labelCursor == i) {
                this.drawCursor();
                cursorDrawn = true;
            }
            element.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.selected(i);
                this.drawElements(this.localArray);
            };
            element.oncontextmenu = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.selected(this.localArray.length);
                labelArray.splice(i, 1);
                this.attemptCommit();
                this.drawElements(labelArray)
            }
            this.field.appendChild(element);
        }
        if (!cursorDrawn && this.labelCursor != -1) {
            this.drawCursor(labelArray);
        }
        let padding = document.createElement("div");
        padding.style.width ="10px"
        this.field.appendChild(padding);
        
    }
    /**
     * Draws cursor.
     */
    drawCursor() {
        let cursor = document.createElement("div");
        cursor.className = "cursor blink";
        this.cursorNode = this.field.appendChild(cursor);
    }
    
    /**
     * Deselects the label.
     */
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
        this.isSelected = false;
        this.changed = false;
    }
    /**
     * Creates a keyboard that can be used to modify this field.
     * 
     * @param {string[]} labelArray - Array of labels currently in the field, this array is mutated by the keyboard.
     */
    createKeyboard(labelArray) {
        if (!this.keyboardNode) {
            this.labelKeyboard.onInput = (str) => {
                labelArray.splice(this.labelCursor, 0, str)
                this.labelCursor++;
                this.drawElements(this.field, labelArray)
                this.attemptCommit();
            };
            this.keyboardNode = this.labelKeyboard.generateKeyboard(this.excluded);
            if (this.onKeyboardGenerated) {
                this.onKeyboardGenerated(this.keyboardNode);
                this.keyboardNode.className = "container";
            }
            else {
                this.keyboardNode.className = "container keyboard";
                document.getElementsByTagName("body")[0].appendChild(this.keyboardNode);
            }
            this.drawElements(this.field,labelArray)
        }
    }
    /**
     * Attempts to save changes to the label.
     * Saving fails if label is invalid.
     */
    attemptCommit() {
        if (verifyLabel(this.localArray)) {
            this.originalArray.splice(0, this.originalArray.length, ...this.localArray);
        }
        this.changed = true;
    }
    /**
     * Calls the onValueChangedListener.
     */
    valueChanged() {
        if (this.onValueChanged) {
            this.onValueChanged();
        }
    }
}
exports.LexprField = LexprField;