class SidebarUtils {
    createDivWithChildren() {
        let div = document.createElement("div");
        for (var i = 0; i < arguments.length; i++) {
            div.appendChild(arguments[i]);
        }
        div.setAttribute("class", "sidebarRow");
        return div;
    }
    createLabel(id, name) {
        let label = document.createElement("label");
        label.innerHTML = name;
        label.setAttribute("for", id);
        return label;
    }
    createField(id, type = "text") {
        let field = document.createElement("input");
        field.setAttribute("type", type);
        field.setAttribute("id", id);
        field.setAttribute("class", "inputField");
        return field;
    }


    createList(fn, array, name, collapsedState) {
        let wrap = document.createElement("div");
        let list = document.createElement("div");
        list.setAttribute("class", "collapsible");
        for (let i = 0; i < array.length; i++) {
            list.append(fn(i));
        }
        let button = document.createElement("button")
        button.setAttribute("class", "collapsibleButton");
        button.setAttribute("type", "button");
        button.innerHTML = name;
        if (collapsedState[name] == null) {
            collapsedState[name] = "none";
            list.style.display = "none";
        }
        else {
            list.style.display = collapsedState[name];
        }
        button.addEventListener("click", () => {
            if (list.style.display === "block") {
                list.style.display = "none";
            } else {
                list.style.display = "block";
            }
            collapsedState[name] = list.style.display;
        });
        wrap.append(button);
        wrap.append(list);
        return wrap;
    }


}


exports.SidebarUtils = SidebarUtils;
