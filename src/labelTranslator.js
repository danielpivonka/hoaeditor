class LabelTranslator {
    constructor(aliases, aps) {
        /**@type{Object[]}*/
        this.aliases = aliases;
        this.aps = aps;
        this.aliasRegex = /!?\s*@[0-9a-zA-Z_-]+/g;
        this.apRegex = /\d+/g;
    }

    translate(string) {
        while (string.includes("@")) {
            string = string.replace(this.aliasRegex, this.aliasReplacer.bind(this));
        }
        string = string.replace(this.apRegex, this.apReplacer.bind(this));
        return string;
    }

    aliasReplacer(substring) {
        let innerValue = this.cutInnerValue(substring);
        let translated = this.getByAname(innerValue);
        if (substring.substring(0, 1) == "!") {
            if (translated.includes("|") | translated.includes("&")) {
                return "!(" + translated + ")";
            }
            return "!" + translated;
        }
        if (translated.includes("|")) {
            return "(" + translated + ")";
        }
        return translated;
    }
    cutInnerValue(string) {
        let cut = string.match(/@[0-9a-zA-Z_-]+/g)[0];
        return cut;
    }
    apReplacer(digitString) {
        let digit = parseInt(digitString);
        return this.aps[digit];
    }
    getByAname(aname) {
        return this.aliases.find(e => e.aname == aname).lexpr;
    }
}
exports.LabelTranslator = LabelTranslator;
