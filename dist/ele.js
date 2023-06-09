"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Ele.js
 * 
 * A simple Element Builder to replace the horrendous 
 * native DOM API methods for creating new Elements.
 * 
 * @author Nick Adams
 * @see {@link https://github.com/nickolasjadams/ele|Repository}
 * @license MIT
 * @version 1.0.8
 */

// Used to determine environment
var _ele_document, _ele_window;
if (typeof document != 'undefined') {
  _ele_document = document;
}
if (typeof window != 'undefined') {
  _ele_window = window;
}
var Ele = /*#__PURE__*/function () {
  function Ele(options) {
    _classCallCheck(this, Ele);
    if (options) {
      this.element = this.mint(options);
    }
    this.options = options;
  }
  _createClass(Ele, [{
    key: "setDocument",
    value: function setDocument(object) {
      this.document = object;
    }
  }, {
    key: "setWindow",
    value: function setWindow(object) {
      this.window = object;
    }
  }, {
    key: "mint",
    value: function mint(options) {
      if (!this.options && !options) {
        throw new Error("options are required.");
      }
      if (options.element == 'undefined') {
        throw new Error("options.element: string is required.");
      }

      // Set the window and document in browser environments.
      if (typeof _ele_document != 'undefined') {
        document = _ele_document;
        window = _ele_window;
      } else {
        // Create new document and window in node environments.
        var document = this.document;
        var window = this.window;
      }
      var element = document.createElement(options.element);
      if (options.class) {
        // if it's multiple (whitespace or array)
        if (/\s/g.test(options.class) || Array.isArray(options.class)) {
          if (!Array.isArray(options.class)) {
            options.class = options.class.trim();
            options.class = options.class.split(/\s/g);
          }
          options.class.forEach(function (s) {
            return element.classList.add(s);
          });
        } else {
          element.classList.add(options.class);
        }
        delete options.class;
      }
      if (options.id) {
        if (options.id.length < 1) {
          throw new Error("options.id: String length must be greater than 0.");
        }
        if (/\s/g.test(options.id) || Array.isArray(options.id)) {
          throw new Error("options.id: Elements may only have one id. Space is an illegal character in ids.");
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
          options.event.forEach(function (e) {
            return element.addEventListener(e.type, e.listener);
          });
        } else {
          var e = options.event;
          element.addEventListener(e.type, e.listener);
        }
        delete options.event;
      }
      if (options.children) {
        if (!Array.isArray(options.children)) {
          throw new Error("options.children must be an Array.");
        }
        options.children.forEach(function (child) {
          return element.appendChild(child);
        });
        delete options.children;
      }
      delete options.element;
      for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        var oldKey = key;
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
  }], [{
    key: "mint",
    value: function mint(options) {
      // A new Ele with options will mint on construction.
      var ele = new Ele(options);
      return ele.element;
    }
  }]);
  return Ele;
}();
if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
  module.exports = Ele;
}
