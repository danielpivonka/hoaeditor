const { Automaton } = require("../hoaData/automaton");
const { Edge } = require("../hoaData/edge");
const { State } = require("../hoaData/state");

/**
 * Returns automaton in TikZ format.
 *
 * @param {Automaton} automaton - Automaton to convert to string.
 * @returns {string} TikZ string.
 */
function automatonToTikz(automaton) {
	let tikzString = "\\begin{tikzpicture} [x = 0.01cm, y = -0.01cm]" // the [x = 0.01cm, y = -0.01cm] makes TikZ coordinates roughly match our coordinates
	tikzString += serializeStates(automaton.states.values());
	tikzString += "\\end{tikzpicture}";
	return tikzString;

}
/**
 * Returns automaton in TikZ format.
 *
 * @param {State[]} states - Array containing states to convert to TikZ format.
 * @returns {string} - string containing states in TikZ format.
 */
function serializeStates(states) {
	let statesString = "";
	for (const state of states) {
		statesString += "\\node[shape = circle, draw = black](" + state.number + ") at(" + state.position.x + ", " + state.position.y + ") {" + state.number + "}; \n";
	}
	return statesString;
}
exports.automatonToTikz = automatonToTikz;