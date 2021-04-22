class AbstratctKeyboard{
    constructor(automaton) {
        this.automaton = automaton;
        this.onInput;
        this.onUpdate;
    }

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