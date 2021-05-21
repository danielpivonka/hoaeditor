const AbstratctKeyboard = require('./abstractKeyboard').AbstratctKeyboard;
const Automaton = require('../../hoaData/automaton').Automaton;
const LabelTranslator = require('../../labelTranslator').LabelTranslator;
class LabelKeyboard extends AbstratctKeyboard
{
    /**
     * Constructs a label keyboard generator.
     * 
     * @param {Automaton} automaton - Automaton whose label will be edited.
     * @param {LabelTranslator} translator - Translator bound to the automaton.
     */
    constructor(automaton, translator) {
        super(automaton)
        this.translator = translator;
        this.basicSymbols = ["!", "(", ")", "&", "|","t","f"]
    }
    
    /**
     * Generates row containing atomic propositions.
     * 
     * @returns {HTMLDivElement} Row containing atomic proposition buttons.
     */
    generateAPRow() {
        let row = document.createElement("div");
        row.className = "button_row"
        for (let i = 0; i < this.automaton.ap.length;i++) {
            row.appendChild( this.generateButton(this.automaton.ap[i], i));
        }
        return row;
    }
    /**
     * Generates row containing aliases.
     * 
     * @param {{aname:string,lexpr:string}} excludedAlias - Alias to be excluded.
     * @returns {HTMLDivElement} Row containing aliase buttons.
     */
    generateAliasRow(excludedAlias) {
        let row = document.createElement("div");
        row.className = "button_row"
        for (const alias of this.automaton.aliases) {
            if (alias != excludedAlias&& alias.lexpr.length>0&&alias.aname.length>1) {
            row.appendChild( this.generateButton(alias.aname, alias.aname));
            }
        }
        return row;
    }
    /**
     * Generates row containing basic elements of label.
     * 
     * @returns {HTMLDivElement} Row containing the basic element buttons.
     */
    generateBasicRow() {
        let row = document.createElement("div");
        row.className = "button_row"
        for (const symbol of this.basicSymbols) {
            row.appendChild( this.generateButton(symbol, symbol));
        }
        return row
    }
    /**
     * Generates the keyboard.
     * 
     * @param {{aname:string,lexpr:string}} excludedAlias - Alias to be excluded from the keyboard.
     * @returns {HTMLDivElement} The keyboard HTML element.
     */
    generateKeyboard(excludedAlias) {
        let keyboard = document.createElement("div");
        keyboard.id = "lexprKeyboard";
        keyboard.addEventListener("mousedown", (e) => e.stopPropagation());
        keyboard.appendChild(this.generateAPRow());
        keyboard.appendChild(this.generateAliasRow(excludedAlias));
        keyboard.appendChild(this.generateBasicRow());

        return keyboard;
    }
}
exports.LabelKeyboard = LabelKeyboard;