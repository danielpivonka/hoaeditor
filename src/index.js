//@ts-nocheck
require('./index.html')
require('./index.css')
const Parser = require('./parser/parser').Parser;
const automatonToHoaString = require('./hoaData/exporter/exporter').automatonToHoaString;

const Editor = require('./editor/editor').Editor
const parseField = document.getElementById('HOA_input');
const parseContainer = document.getElementById('input_container');
const parseButton = document.getElementById('HOA_parse');
const closeButton = document.getElementById("close");
const importButton = document.getElementById("import");
const exportButton = document.getElementById("export");
const lockButton = document.getElementById("lock");
const helpButton = document.getElementById("help");
const closeHelpButton = document.getElementById("close_help");
const helpWindow = document.getElementById("helpWindow");
const errorArea = document.getElementById("error_log");
const exportWithPosButton = document.getElementById("export_with_pos");
const sidebarContainer = document.getElementById('sidebarContainer');

const canvas = document.getElementById('canvas');
let savedText = "";
function parseClicked() {
    if (parseField && parseField.value) {
        let parser = new Parser();
        let oa = parser.parse(parseField.value);
        if (oa) {
            editor.setAutomaton(oa);
            hideExport();
        }
        else {
            writeErrors(parser.errors);
        }
        savedText = parseField.value;
    }
}

function enableExport(enabled) {
    exportButton.disabled = !enabled
    exportWithPosButton.disabled = !enabled;
}

function showExport(withPositions) {
    parseContainer.style.visibility = "visible"
    parseButton.style.visibility = "collapse"
    parseField.readOnly = true;
    parseField.value = automatonToHoaString(editor.editorCanvas.automaton,withPositions);
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
function hideExport() {
    parseContainer.style.visibility = "collapse"
    parseButton.style.visibility = "collapse"
    errorArea.innerHTML = "";

}
function lockClicked() {
    editor.switchLock();
    lockButton.innerHTML = editor.isLocked() ? "Unlock" : "Lock";
}
let editor = new Editor(canvas, sidebarContainer);
editor.onAutomatonChanged = () => {
    enableExport(editor.isValid);
}
enableExport(editor.isValid);
window.addEventListener('resize', () => editor.resized());
parseButton.addEventListener('click', ()=>{
    parseClicked();
});


closeButton.addEventListener('click',()=>hideExport());
importButton.addEventListener('click', function showImport() {
    parseContainer.style.visibility = "visible"
    parseButton.style.visibility = "visible"
    parseField.value = savedText;
    parseField.readOnly = false;

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
helpButton.addEventListener('click',()=> helpWindow.style.visibility = "visible")
closeHelpButton.addEventListener('click', () => helpWindow.style.visibility = "collapse")
lockButton.addEventListener('click', lockClicked.bind(this));



