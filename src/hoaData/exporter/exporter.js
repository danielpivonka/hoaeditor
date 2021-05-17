const Automaton = require('../automaton').Automaton;
const State = require('../state').State;
const PositionsExport = require('./positionsExport').PositionsExport;

/**
 * Returns automaton in hoa format.
 * 
 * @param  {Automaton} automaton - Automaton to convert to string.
 * @param  {boolean} extended - Whether or not should positions be included.
 * @returns {string} Hoa string.
 */
function automatonToHoaString(automaton,extended = false) {
    let string = "";
    string += "HOA: " + automaton.version + "\n";
    if (automaton.stateCount) {
        string += "States: " + automaton.stateCount + "\n";
    }
    for (const start of automaton.start) {

        string += "Start: " + start.stateConj.toString().replace(",", "&") + "\n";
    }
    if (automaton.accname) {
        string += "acc-name: " + automaton.accname + "\n";
    }
    if (automaton.acceptance) {
        string += "Acceptance: " + automaton.acceptance.count + " " + automaton.acceptance.str + "\n";
    }
    if (automaton.ap.length > 0) {
        string += "AP: ";
        string += automaton.ap.length;
        for (const ap of automaton.ap) {
            string += " \"" + ap + "\"";
        }
        string += "\n";
    }
    if (automaton.tool) {
        string += "tool: " + "\"" + automaton.tool + "\"" + "\n";
    }
    if (automaton.name) {
        string += "name: " + "\"" + automaton.name + "\"" + "\n";
    }
    if (extended) {
        string += "positions: ";
        string += "\"" + exportPositions(automaton) + "\"" + "\n";
    }
    for (const alias of automaton.aliases) {
        string += "Alias: " + alias.aname + " " + alias.lexpr.join("") + "\n";
    }
    if (automaton.properties.length > 0) {
        string += "properties:";
        for (const property of automaton.properties) {
            string += " " + property;
        }
        string += "\n";
    }
    for (const etc of automaton.etc) {
        string += etc.join(" ") + "\n";
    }
    string += "--BODY--\n";
    for (const state of automaton.states.values()) {
        string += stateToString(state);
    }
    string += "--END--\n";
    return string;
}

function stateToString(state) {
        let str = "State:"
        if (state.label.length!=0) {
            str += " [" + state.getLabelString() + "]";
        }
        str += " " + state.number;
        if (state.name) {
            str += " \"" + state.name.replace(/"/g,"\\\"") + "\"";
        }
        if (state.accSets.length > 0) {
            str += " {";
            for (const set of state.accSets) {
                str += set + " ";
            }
            str = str.slice(0, -1);
            str += "}";
        }
        str += "\n"
        for (const edge of state.edges) {
            str += edgeToString(edge) + "\n";
        }
        return str;
}

function edgeToString(edge) {
    let str = "";
    if (edge.label.length!=0) {
        str += "[" + edge.getLabelString() + "] ";
    }
    str += edge.stateConj.toString().replace(",", "&");
    if (edge.accSets.length > 0) {
        str += " {";
        for (const set of edge.accSets) {
            str += set + " ";
        }
        str = str.slice(0, -1);
        str += "}";
    }
    return str;
}


function exportPositions(automaton) {
    let exportData = new PositionsExport(automaton.states.values(), automaton.start);
    return JSON.stringify(exportData).replace(/"/g, "\\\"");
}
exports.automatonToHoaString = automatonToHoaString;