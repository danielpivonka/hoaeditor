//@ts-nocheck
require('./index.html')
require('./index.css')
const Parser = require('./parser/parser').Parser;
const parseLabel = require('./parser/parser').parseLabel;

const Editor = require('./editor/editor').Editor
const field = document.getElementById('HOA_input');
const container = document.getElementById('input_container');
const parseButton = document.getElementById('HOA_parse');
const closeButton = document.getElementById("close");
const importButton = document.getElementById("import");
const exportButton = document.getElementById("export");
const errorArea = document.getElementById("error_log");
const exportWithPosButton = document.getElementById("export_with_pos");
const sidebarContainer = document.getElementById('sidebarContainer');
const canvas = document.getElementById('canvas');
let savedText = "";
function parseClicked() {
    if (field && field.value) {
        let parser = new Parser();
        let oa = parser.parse(field.value);
        if (oa) {
            editor.setAutomaton(oa);
            hide();
        }
        else {
            writeErrors(parser.errors);
        }
        savedText = field.value;
    }
}

function showExport(withPositions) {
    container.style.visibility = "visible"
    parseButton.style.visibility = "collapse"
    field.readOnly = true;
    field.value = editor.editorCanvas.automaton.toHoaString(withPositions);
}

function writeErrors(array) {
    errorArea.innerHTML = "";
    for (const error of array) {
        let errorNode = document.createElement("div");
        errorNode.className = "error_message"
        errorNode.innerHTML = error;
        errorArea.appendChild(errorNode);
    }

}
let editor = new Editor(canvas, sidebarContainer);
window.addEventListener('resize', () => editor.resized());
parseButton.addEventListener('click', ()=>{
    parseClicked();
});

closeButton.addEventListener('click',()=>hide());
function hide() {
    container.style.visibility = "collapse"
    parseButton.style.visibility = "collapse"

}
importButton.addEventListener('click', function showImport() {
    container.style.visibility = "visible"
    parseButton.style.visibility = "visible"
    field.value = savedText;
    field.readOnly = false;

});
exportButton.addEventListener('click', () => showExport(false));
exportWithPosButton.addEventListener('click', () => showExport(true));

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



