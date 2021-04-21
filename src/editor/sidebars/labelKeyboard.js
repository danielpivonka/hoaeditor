class LabelKeyboard
{
    constructor(automaton, translator) {
        this.automaton = automaton;
        this.translator = translator;
        this.basicSymbols = ["!", "(",")","&","|"]
        this.onInputListener;
    }
    onInput(str) {
        if (this.onInputListener) {
            this.onInputListener(str)
        }
    }
    generateButton(display, value) {
        let button = document.createElement("input");
        button.type = "button";
        button.className = "button";
        button.value = display;
        button.onclick = () => {
            this.onInput(String(value))
        }
        return button;
    }
    generateAPRow() {
        let row = document.createElement("div");
        row.className = "button_row"
        for (let i = 0; i < this.automaton.ap.length;i++) {
            row.appendChild( this.generateButton(this.automaton.ap[i], i));
        }
        return row;
    }
    generateAliasRow(excludedAlias) {
        let row = document.createElement("div");
        row.className = "button_row"
        for (const alias of this.automaton.aliases) {
            if (alias != excludedAlias) {
            row.appendChild( this.generateButton(this.translator.translate(alias.lexpr.join("")), alias.aname));
            }
        }
        return row;
    }
    generateBasicRow() {
        let row = document.createElement("div");
        row.className = "button_row"
        for (const symbol of this.basicSymbols) {
            row.appendChild( this.generateButton(symbol, symbol));
        }
        return row
    }
    generateKeyboard(excludedAlias) {
        let keyboard = document.createElement("div");
        keyboard.className = "container keyboard";
        keyboard.id = "lexprKeyboard";
        keyboard.addEventListener("mousedown", (e) => e.stopPropagation());
        keyboard.appendChild(this.generateAPRow());
        keyboard.appendChild(this.generateAliasRow(excludedAlias));
        keyboard.appendChild(this.generateBasicRow());

        return keyboard;
    }
}
exports.LabelKeyboard = LabelKeyboard;