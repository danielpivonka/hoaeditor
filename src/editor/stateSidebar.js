const State = require('../hoaObject').State;
const SidebarUtils = require('../sidebarUtils.js').SidebarUtils;

class StateSidebar {
    generateSidebar(state) {

    }

    createName(state) {
        let id = "name";
        let label = SidebarUtils.createLabel(id, "Name:");
        let field = SidebarUtils.createField(id);
        field.value = state.name;
        field.oninput = (e) => { state.name = e.target.value; };
        return SidebarUtils.createDivWithChildren(label, field);
    }
}