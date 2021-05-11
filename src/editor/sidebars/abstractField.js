class AbstractField{
    constructor(automaton) {
        this.automaton = automaton;
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