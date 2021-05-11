class LabelTranslator {
    constructor(automaton) {
        /**@type{Object[]}*/
        this.automaton = automaton;
        this.aliasRegex = /!?\s*@[0-9a-zA-Z_-]+/g;
        this.apRegex = /\d+/g;
    }

    translate(lexprArray) {
        let string = "";
        for (const lexprElement of lexprArray) {
            if (!isNaN(lexprElement)) {
                string += this.apReplacer(lexprElement);
            } else {
                string += lexprElement;
            }
        }
        return string;
    }


    apReplacer(digitString) {
        let digit = parseInt(digitString);
        return this.automaton.ap[digit];
    }

}
exports.LabelTranslator = LabelTranslator;
