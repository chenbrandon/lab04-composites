var TextNode = (function () {
    /**
     * Constructs a new TextNode
     * @param text The text content of this TextNode
     */
    function TextNode(text) {
        var _this = this;
        this.text = text;
        /**
         * This method prints out the contents of this TextNode
         * @param indent The indentation level. May or may not be indented. Indents are 2 spaces
         */
        this.print = function (indent) {
            console.log(indent + _this.text);
        };
    }
    return TextNode;
}());
var DomElement = (function () {
    /**
     * Constructs a new DomElement.
     * @param type The type of element that this DomElement will be
     * @param text The text that this element will contain, if exists
     */
    function DomElement(type, text) {
        var _this = this;
        this.type = type;
        this.text = text;
        /**
         * @param type The type of element to be added in as a child node of this DomElement
         */
        this.add = function (type) {
            _this.types.push(type);
        };
        /**
         * This method prints out the DomElement and all of its child nodes, if it has any
         * @param indent The indentation level. May or may not be indented. Indents are 2 spaces. Children will have greater indentation than the parent node.
         */
        this.print = function (indent) {
            var indentation = "";
            if (indent) {
                indentation = indent;
            }
            console.log(indentation + "<" + _this.type + ">");
            if (_this.text) {
                console.log(indentation + _this.text);
            }
            for (var _i = 0, _a = _this.types; _i < _a.length; _i++) {
                var type = _a[_i];
                type.print(indentation + "  "); // increases indent recursively
            }
            console.log(indentation + "</" + _this.type + ">"); // close recursive call
        };
        this.types = [];
    }
    return DomElement;
}());
/* Test cases matching output in README.MD */
var p1 = new DomElement("p");
var p2 = new DomElement("p");
var div = new DomElement("div");
var html = new DomElement("html");
p1.add(new TextNode("Hi, I am a TextNode being printed!"));
p2.add(new TextNode("TextNode == leaf"));
div.add(p1);
div.add(p2);
html.add(div);
html.print();
