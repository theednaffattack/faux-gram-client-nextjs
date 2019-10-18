// adapted from https://github.com/schickling/calculate-size to support any style attribute

/**
 * An object with the keys width and height.
 * @typedef SizeObject
 * @property {Number} width - offsetWidth
 * @property {Number} height - offsetHeight
 */

/**
 * An object with the keys text, attributes and className.
 * @typedef getSizeConfig
 * @property {String} text - The text string to insert into the element.
 * @property {Object} attributes - The attributes to be added to the `style` of the created element.
 * @property {String} className - A list of classes to be added to the element.
 */

type TUnknownObject = {
  [key: string]: any;
};

interface ICreateDummyElementProps {
  text: string;
  attributes: TUnknownObject;
  className: string;
}

const cache: any = {};

interface IWindowDimensions {
  height: number;
  width: number;
}

/**
 * set the width of the dummy element to 100%
 * if the viewport width is less than 959px and
 * 960px otherwise
 */
export function calculateMessageMaxRowWidth() {
  const windowDimensions: IWindowDimensions = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  // const emBreakpoints = ["37.5em", "40em", "52em", "64em", "80em"];

  // const pxBreakpoints = ["600px", "640px", "832px", "1024px", "1280px"];

  let recommendedWidth;

  // element.getBoundingRect;

  if (windowDimensions.width > 959) {
    recommendedWidth = "960px";
  }

  if (windowDimensions.width <= 959) {
    recommendedWidth = "100%";
  }

  return recommendedWidth;
}

/**
 * Create a dummy HTML element with the provided configuration.
 * @param {getSizeConfig} config - The configuration object for creating the element.
 * @returns {HTMLElement} The created HTML element.
 */
function createDummyElement({
  text,
  attributes,
  className
}: ICreateDummyElementProps) {
  const element: HTMLDivElement = document.createElement("div");
  const textNode = document.createTextNode(text);

  const DOM_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const DOM_rect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  // { x: 10, y: 10, width: 100, height: 20, fill:'#ff00ff' }
  DOM_rect.setAttributeNS(null, "x", "10");
  DOM_rect.setAttributeNS(null, "y", "10");
  DOM_rect.setAttributeNS(null, "height", "100");
  DOM_rect.setAttributeNS(null, "width", "100");
  DOM_rect.setAttributeNS(null, "fill", "black");
  // DOM_img.src = "https://source.unsplash.com/random/800x600";
  // DOM_img.style.width = "175px";
  // DOM_img.style.height = "131px";
  // DOM_img.style.fill = "green";
  // DOM_img.style.maxWidth = "175px";
  // DOM_img.style.maxHeight = "131px";
  // DOM_img.style.maxWidth = "175px";
  // DOM_img.style.maxHeight = "131px";
  // DOM_img.style.display = "block";

  // element.appendChild(DOM_img);
  element.appendChild(DOM_svg);
  DOM_svg.appendChild(DOM_rect);

  element.appendChild(textNode);
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.left = "-999px";
  element.style.top = "-999px";
  element.style.fontSize = attributes["fontSize"];
  element.style.width = calculateMessageMaxRowWidth() || null;
  element.className = className;
  // Object.keys(attributes).forEach((attribute: any) => {
  //   element.style[attribute] = attributes[attribute];
  //   // console.log("WHAAAAT?", Object.entries(element.style));
  // });
  document.body.appendChild(element);

  return element;
}

/**
 * Delete a HTML element from the dom.
 * @param {HTMLElement} element - The HTMLElement to delete.
 */
function destroyElement(element: HTMLDivElement) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
    return;
  }

  if (!element.parentNode) {
    throw Error(
      `No HTML Element detected when ${destroyElement.name} was called.`
    );
  }
}

interface IMessageRowSize {
  width: number;
  height: number;
}

/**
 * Get the size of an element based on provided text and style attributes.
 * @param {getSizeConfig} config - The configuration object for getSize.
 * @returns {IMessageRowSize} IMessageRowSize: {height: number, width: number}
 */
export default function getSize({
  text = "",
  attributes = {},
  className = ""
}): IMessageRowSize {
  const cacheKey = JSON.stringify({ text, attributes, className });

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const element = createDummyElement({ text, attributes, className });

  const size: IMessageRowSize = {
    // width: element.offsetWidth,
    width: element.offsetWidth,

    height: element.offsetHeight
  };

  destroyElement(element);

  cache[cacheKey] = size;

  return size;
}
