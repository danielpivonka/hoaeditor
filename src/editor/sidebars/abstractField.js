class AbstractField{
    constructor(automaton) {
        this.automaton = automaton;
        this.keyboardNode;
        this.isSelected = false;
        this.onSelected;

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
}
exports.AbstractField = AbstractField;