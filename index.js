const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { window } = new JSDOM(`...`);
// or even
const { document } = (new JSDOM(`...`)).window;


let Ele = new (require('./src/Ele.js'))();
Ele.setWindow(window);
Ele.setDocument(document);


let html = Ele.mint({
    element: "button",
    class: "hello world",
    id: "dude",
    html: "<strong>asdf</strong>",
    event: [
        {
            type: 'click',
            listener: () => alert('d')
        },
    ],
    children: [
        Ele.mint({ 
            element: "div",
            text: "child 1",
            children: [
                Ele.mint({
                    element: "button",
                    text: "Button in a button",
                    event: [
                        {
                            type: 'blur',
                            listener: () => alert('focus out!')
                        },
                    ],
                })
            ]
        }),
        Ele.mint({ 
            element: "div",
            text: "child 2",
            children: [
                Ele.mint({
                    element: "button",
                    text: "Button in a button"
                })
            ]
        }),
    ]
});

document.body.appendChild(html);

console.log(document.querySelector("#dude").children.length);