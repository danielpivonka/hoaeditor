//@ts-nocheck
require('./index.html')
require('./index.css')
const parse = require('./parser/parser').parse;
const Editor = require('./editor/editor').Editor
const field = document.getElementById('HOA_input');
const container = document.getElementById('input_container');
const parseButton = document.getElementById('HOA_parse');
const closeButton = document.getElementById("close");
const importButton = document.getElementById("import");
const exportButton = document.getElementById("export");
const sidebarContainer = document.getElementById('sidebarContainer');
const canvas = document.getElementById('canvas');
function onParseClicked(e) {
    if (field && field.value) {
        let oa = parse(field.value);
        editor.setAutomaton(oa);
    }
}




let editor = new Editor(canvas, sidebarContainer);
window.addEventListener('resize', () => editor.resized());
parseButton.addEventListener('click', onParseClicked);
closeButton.addEventListener('click', function hide() {
    container.style.visibility = "collapse"
    parseButton.style.visibility = "collapse"

});
importButton.addEventListener('click', function showImport() {
    container.style.visibility = "visible"
    parseButton.style.visibility = "visible"
    field.readOnly = false;

});
exportButton.addEventListener('click', function showExport() {
    container.style.visibility = "visible"
    parseButton.style.visibility = "collapse"
    field.readOnly = true;
    field.value = editor.editorCanvas.automaton.toHoaString();
});
document.addEventListener("keydown", function onPress(event) {
    if (event.key === "Delete") {
        editor.removeClicked();
    }
    if (event.key === "Shift") {
        editor.setShift(true);
    }
    if (event.key === "Escape") {
        editor.escapeClicked();
    }
});
document.addEventListener("keyup", function onPress(event) {
    if (event.key === "Shift") {
        editor.setShift(false);
    }
});



