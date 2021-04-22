class AbstractField{
    constructor(automaton) {
        this.automaton = automaton;
        this.keyboardNode;
        this.isSelected = false;
        this.onSelected;
        this.onKeyboardGenerated;

    }
    deselect() {
        if (this.keyboardNode) {
            this.keyboardNode.remove();
            this.keyboardNode = null;
        }
        this.isSelected = false;
    }
    createFiller() {
        let filler = document.createElement("span");
        filler.innerHTML = "."
        filler.style.visibility = "hidden";
        filler.style.width = "0px"
        return filler;
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

}
exports.AbstractField = AbstractField;