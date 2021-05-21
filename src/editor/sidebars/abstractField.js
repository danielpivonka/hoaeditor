const { Automaton } = require("../../hoaData/automaton");

class AbstractField{
    
    /**
     * Creates the field generator.
     * 
     * @param {Automaton} automaton - The automaton bound to the field.
     */
    constructor(automaton) {
        this.automaton = automaton;
    }
    /**
     * Creates a spacer.
     * 
     * @returns {HTMLSpanElement} Padding element.
     */
    createFiller() {
        let filler = document.createElement("span");
        filler.innerHTML = "."
        filler.style.visibility = "hidden";
        filler.style.width = "0px"
        return filler;
    }


}
exports.AbstractField = AbstractField;