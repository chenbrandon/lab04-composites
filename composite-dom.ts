interface IDomElement {
  print(indent?: string);
}

class TextNode implements IDomElement{
  indent: number; // the level of indentation
  
  /**
   * Constructs a new TextNode
   * @param text The text content of this TextNode
   */
  constructor(private text: string) {
  }

  /**
   * This method prints out the contents of this TextNode
   * @param indent The indentation level. May or may not be indented. Indents are 2 spaces
   */
  print = (indent?: string) => {
    console.log(indent + this.text);    
  }
}

class DomElement implements IDomElement {
  types: IDomElement[]; // the child nodes, may be other DomElements or TextNodes

  /**
   * Constructs a new DomElement.
   * @param type The type of element that this DomElement will be
   * @param text The text that this element will contain, if exists
   */
  constructor(public type: string, public text?: string) { 
    this.types = [];
  }
  
  /**
   * @param type The type of element to be added in as a child node of this DomElement
   */
  add = (type: IDomElement) => {
    this.types.push(type);
  }

  /**
   * This method prints out the DomElement and all of its child nodes, if it has any
   * @param indent The indentation level. May or may not be indented. Indents are 2 spaces. Children will have greater indentation than the parent node.
   */
  print = (indent?: string) => {
    let indentation: string = "";
    if(indent) { // sets indentation appropriately (if exists)
      indentation = indent;
    }
    console.log(indentation + "<" + this.type + ">");
    if(this.text) {
      console.log(indentation + this.text);
    }
    for(let type of this.types) {
        type.print(indentation + "  "); // increases indent recursively
    }
    console.log(indentation + "</" + this.type + ">"); // close recursive call
  }
}



/* Test cases matching output in README.MD */
let p1 = new DomElement("p");
let p2 = new DomElement("p");
let div = new DomElement("div");
let html = new DomElement("html");
p1.add(new TextNode("Hi, I am a TextNode being printed!"));
p2.add(new TextNode("TextNode == leaf"));
div.add(p1);
div.add(p2);
html.add(div);
html.print();