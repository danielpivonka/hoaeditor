const { Automaton } = require("../../hoaData/automaton");

class AbstratctKeyboard{
    
    /**
     * Creates keyboard bound to automaton.
     * 
     * @param {Automaton} automaton - The automaton to bind.
     */
    constructor(automaton) {
        this.automaton = automaton;
        this.onInput;
        this.onUpdate;
    }
    /**
     * Generates button containing given label element.
     * 
     * @param {string} display - The value to display on the button.
     * @param {string} value - The value to be added to label on click.
     * @returns {HTMLInputElement} The generated button.
     */
    generateButton(display, value) {
        let button = document.createElement("input");
        button.type = "button";
        button.className = "button";
        button.value = display;
        button.onclick = () => {
            this.onInput(String(value))
            if (this.onUpdate) {
                this.onUpdate();
            }
        }
        return button;
    }
}
exports.AbstratctKeyboard = AbstratctKeyboard;