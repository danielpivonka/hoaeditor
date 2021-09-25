const { Automaton } = require("../hoaData/automaton");
const { Edge } = require("../hoaData/edge");
const { State } = require("../hoaData/state");
const { EditorUtils } = require("../editor/editorUtils");
const header = "\\documentclass{standalone}\n\
\\usepackage[utf8]{inputenc}\n\
\\usepackage{tikz}\n\
\\usetikzlibrary{automata}\n\
\\usetikzlibrary{arrows}\n\
\\usetikzlibrary{quotes}\n\
\\usetikzlibrary{calc}\n\
\\tikzstyle{automaton}=[\n\
  % Disable the \"start\" text in front of the initial arrow.\n\
  initial text=,\n\
  % Reduce the size of the hidden node at the beginning of the initial arrow.\n\
  every initial by arrow/.style={every node/.style={inner sep=0pt}},\n\
  % Encourage a common size of all states that is smaller than the default.\n\
  every state/.style={minimum size=7.5mm,fill=white}\n\
]\n\
\\tikzstyle{state-labels}=[state/.style=state with output,inner sep=2pt]\n\
% State names are labels displayed below a state\n\
\\tikzstyle{statename}=[\n\
  below,label distance=2pt,\n\
  fill=yellow!30!white,\n\
  rounded corners=1mm,inner sep=2pt\n\
]\n\
% Acceptance sets are displayed as small dark blue circle with white\n\
% sans-serif number.  Use anchor=center to ignore the predefined\n\
% anchor on edges like \"loop above\" or \"loop left\".\n\
\\tikzstyle{accset}=[\n\
  fill=blue!50!black,draw=white,text=white,thin,\n\
  circle,inner sep=.9pt,anchor=center,font=\\bfseries\\sffamily\\tiny\n\
]\n\
% Automaton environment with\n\
% 150% scaling, because SVG output is too small otherwise.\n\
\\usepackage{environ}\n\
\\NewEnviron{automaton}[1][]%\n\
{\\scalebox{1.5}{\\begin{tikzpicture}[x = 0.01cm, y = -0.01cm, automaton,#1]\n\
\\BODY\n\
\\end{tikzpicture}}}\n\
\\usepackage{amsmath}\n\
\\DeclareMathOperator{\\F}{\\textup{\\textsf{F}}}\n\
\\DeclareMathOperator{\\G}{\\textup{\\textsf{G}}}\n\
\\DeclareMathOperator{\\X}{\\textup{\\textsf{X}}}\n\
\\newcommand{\\U}{\\mathbin{\\textsf{U}}}\n\
\\newcommand{\\R}{\\mathbin{\\textsf{R}}}\n\
\\newcommand{\\W}{\\mathbin{\\textsf{W}}}\n\
\\newcommand{\\M}{\\mathbin{\\textsf{M}}}\n\
"
/**
 * Returns automaton in TikZ format.
 *
 * @param {Automaton} automaton - Automaton to convert to string.
 * @returns {string} TikZ string.
 */
function automatonToTikz(automaton) {
	let tikzString = header + "\\begin{document}\n \\begin{automaton}\n"
	tikzString += serializeStates(automaton);
	tikzString += serializeTransitions(automaton);
	tikzString += "\\end{automaton}\n \\end{document}\n";
	return tikzString;

}
/**
 * Returns states in TikZ format.
 *
 * @param {Automaton} automaton - Array containing states to convert to TikZ format.
 * @returns {string} - string containing states in TikZ format.
 */
function serializeStates(automaton) {
	let statesString = "";
	for (const state of automaton.states.values()) {
		statesString += ("\\node[state]" + (automaton.start.includes(state.number) ? "initial," : "") + "(" + state.number + ") at(" + state.position.x + ", " + state.position.y + ") {" + state.number + "}; \n")
	}
	return statesString;
}
/**
 * Returns transitions in TikZ format.
 *
 * @param {Automaton} automaton - Array containing states to convert to TikZ format.
 * @returns {string} - string containing transitions in TikZ format.
 */
function serializeTransitions(automaton) {
	let transitionString = "\\path[->]";
	for (const state of automaton.states.values()) {
		transitionString += "(" + state.number + ")"
		for (const transition of state.edges) {
			if (state.number == transition.stateConj[0]) {
				transitionString += "edge" + generateLoop(state, transition) + "(" + state.number + ")\n"
			}
		}
	}
	return transitionString + ";";
}
/**
 * Returns transitions in TikZ format.
 *
 * @param {State} state - Object representing state from which the transition originates.
 * @param {Edge} transition - Object representing loop transition.
 * @returns {string} - string containing transitions in TikZ format.
 */
function generateLoop(state, transition) {
	let adjustedOffset = transition.offset.clone();
	let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state.position, adjustedOffset, 25)
	let angle = adjustedOffset.angleDeg() * -1;
	let startAngle = angle - 14;
	let endAngle = angle + 16;
	let peak = EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
	let relativePeak = peak.subtract(state.position);
	return "[distance=" + (relativePeak.magnitude() - 25) * 0.01 + "cm, in= " + startAngle + ", out = " + endAngle + ", loop, right, looseness=10] node{$" + transition.label + "$}";
}
exports.automatonToTikz = automatonToTikz;