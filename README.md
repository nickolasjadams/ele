# Ele

[![npm version](https://badge.fury.io/js/ele.svg)](//npmjs.com/package/@stegopop/ele)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple Element Builder to replace the horrendous native DOM API methods for creating new Elements.

Instead of this.

```
var wrapper = document.createElement("div");
wrapper.classList.add("wrapper"); // not chainable off createElement
wrapper.id = "wrapper"; // not chainable off createElement
wrapper.innerText = "Press a button.";

var child = document.createElement("button");
child.classList.add("ugh");
child.id = "child";
child.setAttribute("data-prop", "A data property");
child.addEventListener(function() {
    alert("You pressed the button");
});

var child2 = document.createElement("button");
child.classList.add("omg");
child.id = "child2";
child.addEventListener("click", function() {
    alert("You pressed the other button");
});

wrapper.append(child, child2);
document.body.appendChild(wrapper);
```

You can instead use this more simple object structure.

```
var wrapper = Ele.mint({
    element: "div",
    class: "wrapper",
    id: "wrapper",
    text: "Press a button.",
    children: [
        Ele.mint({
            element: "button",
            "id": "child",
            "class": "much nicer"
            dataProp: "A data property",
            event: {
                type: "click",
                listener: function() { alert("You pressed the button"); }
            }
        }),
        Ele.mint({
            element: "button",
            "id": "child2",
            "class": "add many if you want"
            event: {
                type: "click",
                listener: function() { alert("You pressed the other button"); }
            }
        })
    ]
});
document.body.appendChild(wrapper);
```

## Install

```
npm install @stegopop/ele
```

## In Browser

```
<script src="/dist/ele.min.js"></script>
var button = Ele.mint({
    element: "button",
    id: "dude",
    html: "Press me!"
});
document.body.appendChild(button);
```

## In Node

There is no DOM in the node environment. So you'll have to provide one. 

You might use JSDom.

```
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { window } = new JSDOM(`...`);
// or even
const { document } = (new JSDOM(`...`)).window;


let Ele = new (require('./src/Ele.js'))();
Ele.setWindow(window);
Ele.setDocument(document);

let html = Ele.mint({
    element: "div",
    id: "dude",
    text: "Dude",
});

document.body.appendChild(html);
console.log(document.body.length);
```

## Methods

In the browser, the only thing you need is to statically mint your elements.
You do this with the mint(options) method.

In node, there are 2 more methods. This is because node doesn't provide a DOM. You'll need to set it up yourself with setDocument(object), or setWindow(object). These methods are dynamic so you'll need to instantiate an Ele.

## Options

| Option     | Type   | Description |
| ---------- | ------ | ----------- |
| `element`  | String | Required - The element to create. |
| `id`       | String | A string to assign to the element id. Must not begin with a digit. Must not contain spaces. Must not be a duplicate of another id. |
| `class`    | String \| Array | The class or classes to add to the element. Can be a space delimited String. |
| `html`     | String | HTML content within the element. If this is given to you by the user, then you should use `text` instead. |
| `text`     | String | Text content within the element. |
| `children` | Array&lt;Ele&gt; | Array that contains any children Ele elements. Displays after html/text. |
| `event` | Array&lt;Object&gt; | Array of objects with values { type: 'event_type', listener: function } |
| `[other]` | Object | Any camelCase property passed as an option will be assigned as a kebab-cased attribute to the element. This allows you to specify any attribute (aria, data, etc.). |