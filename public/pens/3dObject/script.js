let p1 = { x: 0, y: 0 };

function ondragElt(elt, func) {
  let p2 = { x: 0, y: 0 };
  let p3 = { x: 0, y: 0 };
  elt.onmousedown = dragMouseDown;
  let offset = {};

  function dragMouseDown(e) {
    e.preventDefault();
    offset = {
      x: e.clientX - elt.offsetLeft,
      y: e.clientY - elt.offsetTop
    };
    let p1 = { x: e.clientX, y: e.clientY };
    document.onmouseup = closeMouseDrag;
    document.onmousemove = moveMouse;
  }

  function moveMouse(e) {
    e.preventDefault();
    p3.x = p2.x;
    p3.y = p2.y;
    p2.x = e.clientX;
    p2.y = e.clientY;
    func(p2, p1, p3);
  }

  function closeMouseDrag(e) {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

function mapValue(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function increaseDeg(elt, prop, da) {
  let r = parseInt(
    getComputedStyle(elt).getPropertyValue(`--${prop}`).slice(0, -3)
  );
  elt.style.setProperty(`--${prop}`, r + (da % 360) + "deg");
}

let viewport = document.querySelector(".viewport");
let view = document.querySelector(".view");
ondragElt(viewport, (p2, p1, p3) => {
  let dy = mapValue(p2.x - p3.x, 0, 200, 0, 360);
  let dx = mapValue(p2.y - p3.y, 0, 200, 0, 360);
  increaseDeg(view, "rotateX", dx);
  increaseDeg(view, "rotateY", dy);
});

class Mesh extends HTMLElement {
  constructor(className) {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.className = className;
    this.setup();
  }

  getAttrValue(attr, defaultValue) {
    return this.hasAttribute(attr) ? this.getAttribute(attr) : defaultValue;
  }

  reRender() {
    this.computeHalfProperty();
    this.__setCssPropertyObj(this.__transformProperty);
  }
  createProperty() {
    this.__transformProperty = {
      rotatex: [this.getAttrValue("rotatex", 0), "deg"],
      rotatey: [this.getAttrValue("rotatey", 0), "deg"],
      rotatez: [this.getAttrValue("rotatez", 0), "deg"],
      width: [this.getAttrValue("width", 100), "px"],
      height: [this.getAttrValue("height", 100), "px"],
      depth: [this.getAttrValue("depth", 100), "px"]
    };
    this.computeHalfProperty();
  }
  computeHalfProperty() {
    let halfObj = {
      halfwidth: [this.__transformProperty.width[0] / 2, "px"],
      halfheight: [this.__transformProperty.height[0] / 2, "px"],
      halfdepth: [this.__transformProperty.depth[0] / 2, "px"]
    };
    Object.assign(this.__transformProperty, halfObj);
  }

  setProperty(obj) {
    Object.assign(this.__transformProperty, obj);
    this.__setCssPropertyObj();
  }

  setup() {
    this.mainElt = document.createElement("div");
    this.mainElt.className = this.className;
    this.createProperty();
    this.setupCss();
    this.root.appendChild(this.mainElt);
  }

  setupCss() {
    this.setupCssVariable();
    Object.assign(this.mainElt.style, {
      transformStyle: "preserve-3d",
      transform: `rotatex(var(--rotatex)) rotatey(var(--rotatey))
            rotatez(var(--rotatez))`,
      width: "var(--width)",
      height: "var(--height)"
    });
  }

  __setCssProperty(prop, value) {
    this.mainElt.style.setProperty(`--${prop}`, value);
  }

  __setCssPropertyObj(obj) {
    for (const key in obj) {
      let value, unit;
      [value, unit] = obj[key];
      this.__setCssProperty(key, value + unit);
    }
  }
  setWidth(value) {
    this.__setCssProperty("width", value + "px");
    this.__setCssProperty("halfwidth", value / 2 + "px");
  }

  setHeight(value) {
    this.__setCssProperty("height", value + "px");
    this.__setCssProperty("halfheight", value / 2 + "px");
  }
  setDepth(value) {
    this.__setCssProperty("depth", value + "px");
    this.__setCssProperty("halfdepth", value / 2 + "px");
  }
  setupCssVariable() {
    let obj = this.__transformProperty;
    this.__setCssPropertyObj(obj);
  }

  addChild(child) {
    this.mainElt.appendChild(child);
  }
}

window.customElements.define("d-mesh", Mesh);

class Box extends Mesh {
  static get observedAttributes() {
    return ["width", "height", "depth", "rotatex", "rotatey", "rotatez"];
  }
  constructor(className) {
    super(className);
    this.faces = {
      front: "",
      back: "",
      left: "",
      right: "",
      top: "",
      down: ""
    };
    this.setupCube();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let value = this.__transformProperty[name];
    if (value) {
      this.__transformProperty[name][0] = newValue;
    }
    this.reRender();
  }

  setupCube() {
    this.setupFace();
  }
  createFace(type) {
    let face = document.createElement("div");
    face.className = `face ${type}`;
    this.faces[type] = face;
    this.mainElt.appendChild(face);
  }

  loopFaces(func) {
    for (const key in this.faces) {
      func(key);
    }
  }

  createInitialFaces() {
    this.loopFaces((key) => this.createFace(key));
  }
  setupFacesStyle() {
    let style = {
      transformOrigin: "center",
      width: "var(--width)",
      height: "var(--height)",
      backgroundColor: "rgba(100, 200, 100, 0.5)",
      boxSizing: "border-box",
      border: "1px solid gray",
      position: "absolute"
    };
    this.loopFaces((key) => Object.assign(this.faces[key].style, style));
  }
  setTopFace() {
    this.faces.top.style.setProperty(
      "--offset",
      "calc(var(--halfheight) - var(--halfdepth))"
    );
    Object.assign(this.faces.top.style, {
      height: "var(--depth)",
      transform: `translatey(calc(var(--halfheight) + var(--offset)))
      rotatex(90deg)`
    });
  }

  setDownFace() {
    this.faces.down.style.setProperty(
      "--offset",
      "calc(var(--halfheight) - var(--halfdepth))"
    );
    Object.assign(this.faces.down.style, {
      height: "var(--depth)",
      transform: `translatey(calc(calc(var(--halfheight) - var(--offset)) * -1))
      rotatex(90deg)`
    });
  }

  setFrontFace() {
    Object.assign(this.faces.front.style, {
      transform: `translatez(calc(var(--halfdepth) * -1))`
    });
  }

  setBackFace() {
    Object.assign(this.faces.back.style, {
      transform: `translatez(var(--halfdepth))`
    });
  }

  setLeftFace() {
    this.faces.left.style.setProperty(
      "--offset",
      "calc(var(--halfwidth) - var(--halfdepth))"
    );
    Object.assign(this.faces.left.style, {
      width: "var(--depth)",
      transform: `translatex(calc(calc(var(--width) / 2) + var(--offset)))
            rotatey(90deg)`
    });
  }

  setRightFace() {
    this.faces.right.style.setProperty(
      "--offset",
      "calc(var(--halfwidth) - var(--halfdepth))"
    );
    Object.assign(this.faces.right.style, {
      width: "var(--depth)",
      transform: `translatex(calc(calc(var(--halfwidth) - var(--offset)) * -1))
      rotatey(90deg)`
    });
  }

  setupEachFaceStyle() {
    this.setLeftFace();
    this.setRightFace();
    this.setTopFace();
    this.setDownFace();
    this.setFrontFace();
    this.setBackFace();
  }
  setupFace() {
    this.createInitialFaces();
    this.setupFacesStyle();
    this.setupEachFaceStyle();
  }
}

window.customElements.define("d-box", Box);

// let x = new Box("mesh")
// document.body.appendChild(x)
