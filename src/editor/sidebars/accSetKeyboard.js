const AbstratctKeyboard = require('./abstractKeyboard').AbstratctKeyboard;

class AccSetKeyboard extends AbstratctKeyboard
{
    constructor(automaton) {
        super(automaton)
        this.keyboard;
    }
    generateKeyboard(usedAccSets) {
        this.keyboard = document.createElement("div");
        this.keyboard.className = "container keyboard";
        this.keyboard.id = "lexprKeyboard";
        this.keyboard.addEventListener("mousedown", (e) => e.stopPropagation());
        this.keyboard.appendChild(this.generateAliasRow(usedAccSets));
        this.onUpdate = () => this.updateKeyboard(usedAccSets);
        return this.keyboard;
    }
    updateKeyboard(usedAccSets) {
        this.keyboard.innerHTML = "";
        this.keyboard.appendChild(this.generateAliasRow(usedAccSets));
    }
    generateAliasRow(usedAccSets) {
        let row = document.createElement("div");
        row.className = "button_row"
        console.log("usedAccSets.length: " + usedAccSets.length);
        console.log("this.automaton.acceptance.count: " + this.automaton.acceptance.count);
        console.log("usedAccSets: " + JSON.stringify(usedAccSets));
        console.log("this.automaton.acceptance: " + JSON.stringify(this.automaton.acceptance));

        if (usedAccSets.length != this.automaton.acceptance.count) {
            for (let i = 0; i < this.automaton.acceptance.count; i++) {
                if (!usedAccSets.includes(String(i))) {
                    row.appendChild(this.generateButton(i, i));
                }
            }
        }
        else {
            row.innerHTML = "No unused acceptance sets";
        }
        return row;
    }
}
exports.AccSetKeyboard = AccSetKeyboard;