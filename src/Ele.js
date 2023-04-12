/**
 * Ele.js
 * 
 * A simple Element Builder to replace the horrendous 
 * native DOM API methods for creating new Elements.
 * 
 * @author Nick Adams
 * @see {@link https://github.com/nickolasjadams/ele|Repository}
 * @license MIT
 * @version 1.0.0
 */

// Used to determine environment
var _ele_document, _ele_window;
if (typeof document != 'undefined') {
    _ele_document = document;
}
if (typeof window != 'undefined') {
    _ele_window = window;
}

class Ele {
    constructor(options) {
        if (options) {
            this.element = this.mint(options);
        }
        this.options = options;
    }
    setDocument(object) {
        this.document = object;
    }
    setWindow(object) {
        this.window = object;
    }
    mint(options) {
        if (!this.options && !options) { throw new Error("options are required."); }
        if (options.element == 'undefined') { throw new Error("options.element: string is required."); }

        // Set the window and document in browser environments.
        if (typeof _ele_document != 'undefined') {
            document = _ele_document;
            window = _ele_window;
        } else { // Create new document and window in node environments.
            var document = this.document;
            var window = this.window;
        }
        
        let element = document.createElement(options.element);

        if (options.class) {
            // if it's multiple (whitespace or array)
            if (/\s/g.test(options.class) || Array.isArray(options.class)) {
                if (!Array.isArray(options.class)) {
                    options.class = options.class.split(/\s/g);
                }
                options.class.forEach(s => element.classList.add(s));
            } else {
                element.classList.add(options.class);
            }
            delete options.class;
        }
        if (options.id) {
            if (options.id.length < 1) { throw new Error("options.id: String length must be greater than 0.")}
            if (/\s/g.test(options.id) || Array.isArray(options.id)) {
                throw new Error("options.id: Elements may only have one id. Space is an illegal character in ids.")
            }
            if (/^[0-9]/.test(options.id)) {
                throw new Error("options.id: Don't begin an id with a digit.");
            }
            element.id = options.id;
            delete options.id;
        }
        if (options.html && options.text) {
            throw new Error("Element can't contain options.html and options.text");
        }
        if (options.html) {
            element.innerHTML = options.html;
            delete options.html;
        }
        if (options.text) {
            element.innerText = options.text;
            delete options.text;
        }
        if (options.event) {
            if (Array.isArray(options.event)) {
                options.event.forEach(e => element.addEventListener(e.type, e.listener))
            } else {
                let e = options.event;
                element.addEventListener(e.type, e.listener);
            }
            delete options.event;
        }

        if (options.children) {
            if (!Array.isArray(options.children)) { throw new Error("options.children must be an Array."); }
            options.children.forEach(child => element.appendChild(child));
            delete options.children;
        }

        delete options.element;

        for (let [key, value] of Object.entries(options)) {
            let oldKey = key;
            if (/[A-Z]/.test(key)) {
                key = key.replaceAll(/([A-Z])/g, '-$1');
                key = key.toLowerCase();
            }
            element.setAttribute(key, value);
            delete options[oldKey];
        }

        // document.querySelector("#test").appendChild(element);

        return element;
    }
    static mint(options) {
        // A new Ele with options will mint on construction.
        let ele = new Ele(options);
        return ele.element;
    }
}
if (typeof module === 'object') {
    module.exports = Ele;
}