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
function editorStateChanged(state) {
    addStateButton.style["background-color"] = "#dddddd"
    addEdgeButton.style["background-color"] = "#dddddd"
    removeButton.style["background-color"] = "#dddddd"
    switch (state) {
        case Editor.stateEnum.ADD_STATE:
            addStateButton.style["background-color"] = "#a5a5a5";
            break;
        case Editor.stateEnum.ADD_EDGE:
            addEdgeButton.style["background-color"] = "#a5a5a5";
            break;
        case Editor.stateEnum.REMOVE:
            removeButton.style["background-color"] = "#a5a5a5";
            break;
        default:
            break;
    }
}

let editor = new Editor(canvas);
editor.addOnStateonStateChangedListener(editorStateChanged.bind(this));
parseButton.addEventListener('click', onParseClicked);
addStateButton.addEventListener('click', () => { editor.addStateClicked(); });
addEdgeButton.addEventListener('click', () => { editor.addEdgeClicked(); });
removeButton.addEventListener('click', () => { editor.removeClicked(); });
document.addEventListener("keypress", function onPress(event) {
    if (event.key === "e") {
        editor.addEdgeClicked();
    }
    else if (event.key === "s") {
        editor.addStateClicked();
    }
    else if (event.key === "r") {
        editor.removeClicked();
    }
});
addStateButton.style["background-color"] = "#dddddd"
addEdgeButton.style["background-color"] = "#dddddd"
removeButton.style["background-color"] = "#dddddd"

