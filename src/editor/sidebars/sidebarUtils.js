class SidebarUtils {
    
    /**
     * Creates a HTML div containing all elements passed to the function.
     * 
     * @param {...HTMLElement} element - Elements to be contained inside the div.
     * @returns {HTMLDivElement} Div containing given elements.
     */
    static createDivWithChildren(element) {
        let div = document.createElement("div");
        for (var i = 0; i < arguments.length; i++) {
            div.appendChild(arguments[i]);
        }
        div.setAttribute("class", "sidebarRow");
        return div;
    }
    /**
     * Creates a HTML label element.
     * 
     * @param {string} id - Id of the element this label belongs to.
     * @param {string} name - Text of the label.
     * @returns {HTMLLabelElement} The generated label.
     */
    static createLabel(id, name) {
        let label = document.createElement("label");
        label.innerHTML = name;
        label.setAttribute("for", id);
        return label;
    }
    /**
     * Creates an input field.
     * 
     * @param {string} id - Id of the new element.
     * @param {string} [type = "text"] - Type of the input field.
     * @returns {HTMLInputElement} The generated input element.
     */
    static createField(id, type = "text") {
        let field = document.createElement("input");
        field.setAttribute("type", type);
        field.setAttribute("id", id);
        field.setAttribute("class", "inputField");
        return field;
    }
    /**
     * Creates a list of elements.
     * 
     * @param {Function} fn - Element generating function.
     * @param {*[]} array - Array to be passed to the function.
     * @param {string} name - Name of the list.
     * @param {string} collapsedState - If contens of the list are visible.
     * @returns {HTMLDivElement} The generated list.
     */
    static createList(fn, array, name, collapsedState) {
        let wrap = document.createElement("div");
        let list = document.createElement("div");
        list.setAttribute("class", "collapsible");
        for (let i = 0; i < array.length; i++) {
            list.append(fn(array, i));
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
