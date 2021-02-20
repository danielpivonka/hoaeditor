//@ts-nocheck
require('./index.html')
const parse = require('./parser/parser').parse;
const Editor = require('./editor/editor').Editor;
const field = document.getElementById('HOAInput');
const jsonOutput = document.getElementById('jsonText');
const hoaOutput = document.getElementById('hoaText');
const raw = document.getElementById('rawText');
const parseButton = document.getElementById('HOAParse');
const addStateButton = document.getElementById('addStateButton');
const addEdgeButton = document.getElementById('addEdgeButton');
const removeButton = document.getElementById('removeButton');

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
function clickerino() {
    editor.addStateClicked();
}
function clickerino2() {
    editor.addEdgeClicked();
}
function clickerino3() {
    editor.removeClicked();
}
let editor = new Editor(canvas);
parseButton.addEventListener('click', onParseClicked);
addStateButton.addEventListener('click', clickerino);
addEdgeButton.addEventListener('click', clickerino2);
removeButton.addEventListener('click', clickerino3);


