const Victor = require('victor');
const EditorUtils = require('./editorUtils').EditorUtils;

function initializePositions(automaton,width,height,circleSize) {
            setImplicitPositions(automaton, width, height);
            setImplicitOffsets(automaton);
            let blockedAngles = EditorUtils.calculateBlockedAngles(automaton,circleSize);
            EditorUtils.calculateLoopbackAnchors(automaton,blockedAngles, circleSize);
            let blockedLoopbackAngles = EditorUtils.calculateLoopbackAngles(automaton)
            let mergedAngles = blockedAngles.map((arr1, index) => arr1.concat(blockedLoopbackAngles[index]));
            calculateStartAnchors(automaton,mergedAngles)
}
function setImplicitPositions(automaton, width, height) {
    let rows = Math.round(Math.sqrt(automaton.states.size));
    let columns = Math.ceil(automaton.states.size / rows);
    let positionsSet = 0;
    for (const state of automaton.states.values()) {
        if (!state.position) {
            let currentRow = Math.floor(positionsSet / columns);
            let currentColumn = positionsSet % columns;
            let x = width * (1 + currentColumn) / (columns + 1);
            let y = height * (1 + currentRow) / (rows + 1);
            state.position = new Victor(x, y);
            positionsSet++;
        }
    }
}
function setImplicitOffsets(automaton) {
    automaton.stateCount = automaton.states.size;
    for (const state of automaton.states.values()) {
        let count = new Array(Math.max(...automaton.states.keys()) + 1).fill(0);
        for (const edge of state.edges) {
            let edgeDirection = edge.stateConj[0];
            let offset = ++count[edgeDirection];
            if (edge.stateConj.length > 1) {
                edge.offset.x = 0;
            }
            else if (automaton.getEdgeCount(edgeDirection, state.number)) { //single or multiple edges to state with reverse edge(s)
                edge.offset.x = offset * 30
            }
            else if (count[edgeDirection] > 1 || automaton.getEdgeCount(state.number, edgeDirection) > 1) { //multiple edges to state without reverse edge
                if (offset % 2) {
                    edge.offset.x = ((offset + 1) / 2) * (-40);
                }
                else {
                    edge.offset.x = (offset / 2) * 40;
                }
            }
            else {
                edge.offset.x = 0;
            }
        }
    }
}

function calculateStartAnchors(automaton, blockedAngles) {
    for (const start of automaton.start) {
        let states = automaton.numbersToStates(start.stateConj);
        let positions = EditorUtils.statesToPositions(states);
        let anchor = EditorUtils.calculateMidpointBetweenVectors(positions);
        let perpendicular = anchor.clone().rotateDeg(90).normalize().multiplyScalar(50);
        if (start.stateConj.length > 1) {
            start.position = perpendicular.add(anchor);
        }
        else {
            let state = states[0];
            let interval = EditorUtils.getFreeAngleInterval(blockedAngles[state.number]);
            let angle = EditorUtils.calculateImplicitLoopbackAngle(1, 0, interval);
            let offset = new Victor(50, 0).rotateToDeg(angle);
            start.position = offset.add(anchor);
        }
    }
}
exports.initializePositions = initializePositions;