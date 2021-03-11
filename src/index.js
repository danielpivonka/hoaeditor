//@ts-nocheck
require('./index.html')
const parse = require('./parser/parser').parse;
const Editor = require('./editor/editor').Editor;
const field = document.getElementById('HOAInput');
const jsonOutput = document.getElementById('jsonText');
const hoaOutput = document.getElementById('hoaText');
const raw = document.getElementById('rawText');
const parseButton = document.getElementById('HOAParse');

const canvas = document.getElementById('canvas');
function onParseClicked(e) {
    if (field && field.value) {
        let oa = parse(field.value);
        raw.innerHTML = field.value;
        jsonOutput.innerHTML = JSON.stringify(oa);
        hoaOutput.innerHTML = oa.toHoaString();
        editor.setAutomaton(oa);
    }
}


let editor = new Editor(canvas);
parseButton.addEventListener('click', onParseClicked);
document.addEventListener("keydown", function onPress(event) {
    if (event.key === "Delete") {
        editor.removeClicked();
    }
    if (event.key === "Shift") {
        editor.setShift(true);
    }
});
document.addEventListener("keyup", function onPress(event) {
    if (event.key === "Shift") {
        editor.setShift(false);
    }
});


