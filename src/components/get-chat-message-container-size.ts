// import ImageSinglePreview from "./image-single-preview";

// import { string } from "yup";

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
 * @property {String} text - The text string to insert into the measuredElement.
 * @property {Object} attributes - The attributes to be added to the `style` of the created measuredElement.
 * @property {String} className - A list of classes to be added to the measuredElement.
 */

type TUnknownObject = {
  [key: string]: any;
};

interface ICreateDummyElementProps {
  attributes: TUnknownObject;
  className: string;
  data?: any;
  itemIndex: number;
  text: string;
  created_at: string;
  images?: any[];
}

const cache: any = {};

interface IWindowDimensions {
  height: number;
  width: number;
}

/**
 * set the width of the dummy measuredElement to 100%
 * if the viewport width is less than 959px and
 * 960px otherwise
 */
export function calculateMessageMaxRowWidth() {
  const windowDimensions: IWindowDimensions = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  let recommendedWidth;

  if (windowDimensions.width > 959) {
    recommendedWidth = "960px";
  }

  if (windowDimensions.width <= 959) {
    recommendedWidth = "100%";
  }

  return recommendedWidth;
}

/**
 * Create a dummy HTML measuredElement with the provided configuration.
 * @param {getSizeConfig} config - The configuration object for creating the measuredElement.
 * @returns {HTMLElement} The created HTML measuredElement.
 */
function createDummyElement({
  className,
  text,
  created_at,
  images
}: ICreateDummyElementProps) {
  // function makeTextElements({ textNodes }: IMakeTextElements) {
  //   return textNodes.map(
  //     (node: ITextNode, index: number, nodesArr: ITextNode[]) => {
  //       return {
  //         [node.label]: document.createElement("p"),
  //         [node.label]: document.createTextNode(nodesArr[index].text)
  //       };
  //     }
  //   );
  // }

  const measuredElement: HTMLDivElement = document.createElement("div");
  const userProfileImage: HTMLDivElement = document.createElement("div");
  const messageCard: HTMLDivElement = document.createElement("div");
  const messageCardInner: HTMLDivElement = document.createElement("div");

  const DOM_messageTextWrapper: HTMLParagraphElement = document.createElement(
    "p"
  );
  const DOM_createdAtTextWrapper: HTMLParagraphElement = document.createElement(
    "div"
  );
  const DOM_imageWrapper: HTMLDivElement = document.createElement("div");

  const messageTextNode: any = document.createTextNode(
    // data.edges[itemIndex].node.message
    text
  );
  const createdAtTextNode: Text = document.createTextNode(
    // data.edges[itemIndex].node.created_at
    created_at
  );

  const DOM_profile_svg: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  const DOM_rect: SVGRectElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );

  // const DOM_image_measurement_rect: SVGRectElement = document.createElementNS(
  //   "http://www.w3.org/2000/svg",
  //   "rect"
  // );

  DOM_rect.setAttributeNS(null, "x", "10");
  DOM_rect.setAttributeNS(null, "y", "10");
  DOM_rect.setAttributeNS(null, "height", "40");
  DOM_rect.setAttributeNS(null, "width", "40");
  DOM_rect.setAttributeNS(null, "fill", "black");

  // DOM_image_measurement_rect.setAttributeNS(null, "x", "10");
  // DOM_image_measurement_rect.setAttributeNS(null, "y", "10");
  // DOM_image_measurement_rect.setAttributeNS(null, "height", "131");
  // DOM_image_measurement_rect.setAttributeNS(null, "width", "175");
  // DOM_image_measurement_rect.setAttributeNS(null, "fill", "black");

  messageCardInner.style.display = "flex";
  messageCardInner.style.flexDirection = "column";
  messageCardInner.style.width = "100%";
  messageCardInner.style.padding = "0";
  messageCardInner.style.margin = "0";

  messageCard.style.display = "flex";
  messageCard.style.flexDirection = "column";
  messageCard.style.width = "100%";
  messageCard.style.padding = "16px";
  messageCard.style.marginTop = "8px";
  messageCard.style.marginBottom = "8px";
  messageCard.setAttribute("id", "message-card");

  userProfileImage.style.display = "flex";
  userProfileImage.style.flexDirection = "column";
  userProfileImage.style.width = "52px";

  DOM_createdAtTextWrapper.style.display = "block";
  DOM_createdAtTextWrapper.style.marginTop = "8px";
  DOM_createdAtTextWrapper.style.marginBottom = "4px";

  DOM_createdAtTextWrapper.style.fontSize = "14.4px";

  DOM_messageTextWrapper.style.display = "block";
  DOM_messageTextWrapper.style.marginTop = "16px";
  DOM_messageTextWrapper.style.marginBottom = "16px";

  DOM_messageTextWrapper.style.fontSize = "16px";

  DOM_imageWrapper.style.display = "flex";
  DOM_imageWrapper.style.flexWrap = "wrap";
  DOM_imageWrapper.style.margin = "0";
  DOM_imageWrapper.style.padding = "0";
  DOM_imageWrapper.style.marginTop = "8px";
  DOM_imageWrapper.style.marginRight = "16px";
  DOM_imageWrapper.style.minHeight = "40px";
  // DOM_imageWrapper.style.height = "131";
  DOM_imageWrapper.style.width = "100%";

  // stand-in for `MessageBox` (React.FC<IMessageBoxProps>)
  // the outer container handed the index value by List
  // the function just below outer scope (of List)
  // What we're ultimately measuring!!!

  measuredElement.style.position = "absolute";
  measuredElement.style.visibility = "hidden";
  measuredElement.style.left = "-999px";
  measuredElement.style.top = "-999px";

  measuredElement.style.display = "flex";
  measuredElement.style.width = calculateMessageMaxRowWidth() || null;

  measuredElement.style.paddingTop = "16px";
  measuredElement.style.paddingRight = "16px";
  measuredElement.style.paddingBottom = "16px";
  measuredElement.style.paddingLeft = "16px";

  measuredElement.style.marginTop = "8px";
  measuredElement.style.marginBottom = "8px";

  measuredElement.className = className;

  // ELEMENT | VAR NAME | STYLES & ATTRIBUTES
  // div = "measuredElement" => display:flex
  //    div = "userProfileImage"* => flex-direction:column;
  //    div = "messageCard"* => flex-direction:column;   * = needs to be created above for measuring
  //      div = "createdAt"* ** => flex-direction:column;   * = needs to be created above for measuring, ** = needs to be changed to p tag in real layout
  //      p = "messageCard"* => flex-direction:column;   * = needs to be created above for measuring

  document.body.appendChild(measuredElement);
  measuredElement.appendChild(userProfileImage);
  userProfileImage.appendChild(DOM_profile_svg);
  DOM_profile_svg.appendChild(DOM_rect);

  measuredElement.appendChild(messageCard);
  messageCard.appendChild(messageCardInner);

  const ShowAllImages = ({ images }: any) => {
    if (images && images.length > 0) {
    }

    // const DOM_individual_image_wrapper: HTMLDivElement = document.createElement(
    //   "div"
    // );

    const numberOfItems = images.length < 3 ? images.length : 3;

    const firstSuchAndSuch = images.slice(0, numberOfItems);

    // const createImageWrapperObject = {
    //   div: document.createElement("div"),
    //   outer: document.createElement("div")
    // };

    // const svgImageToMeasure = {
    //   svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    //   rect: document.createElementNS("http://www.w3.org/2000/svg", "rect"),
    //   div: document.createElement("div")
    // };

    // @ts-ignore
    let tryMappingIt = firstSuchAndSuch.map((element: any, index: number) => {
      const newDiv = document.createElement("div");
      const newSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      const newRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );

      newSvg.setAttributeNS(null, "width", "175");
      newSvg.setAttributeNS(null, "height", "131");
      newSvg.setAttributeNS(null, "class", "my-lil-svg");
      newSvg.style.width = "175";
      newSvg.style.height = "131";

      newRect.setAttributeNS(null, "width", "175");
      newRect.setAttributeNS(null, "height", "131");

      newDiv.setAttribute("height", "131px");
      newDiv.setAttribute("width", "175px");
      newDiv.style.overflow = "hidden";

      DOM_imageWrapper.appendChild(newDiv);
      newDiv.appendChild(newSvg);
      newSvg.appendChild(newRect);

      return newDiv;
    });
  };

  if (
    images &&
    images.length > 0
    // data.edges &&
    // data.edges[itemIndex].node.images &&
    // data.edges[itemIndex].node.images.length > 0
  ) {
    // measuredElement.style.paddingTop = "16px";
    // measuredElement.style.paddingBottom = "16px";

    DOM_imageWrapper.setAttribute("height", "131px");
    DOM_imageWrapper.setAttribute("class", "outer-wrapper");
    // DOM_imageWrapper.setAttribute("width", "175px");
    messageCardInner.appendChild(DOM_imageWrapper);

    ShowAllImages({ images });
  }

  // add created at and message text blocks
  messageCardInner.appendChild(DOM_createdAtTextWrapper);
  messageCardInner.appendChild(DOM_messageTextWrapper);

  // add the text nodes to the text blocks
  DOM_createdAtTextWrapper.appendChild(createdAtTextNode);
  DOM_messageTextWrapper.appendChild(messageTextNode);

  return measuredElement;
}

/**
 * Delete a HTML measuredElement from the dom.
 * @param {HTMLElement} measuredElement - The HTMLElement to delete.
 */
function destroyElement(measuredElement: HTMLDivElement) {
  if (measuredElement.parentNode) {
    measuredElement.parentNode.removeChild(measuredElement);
    return;
  }

  if (!measuredElement.parentNode) {
    throw Error(
      `No HTML Element detected when ${destroyElement.name} was called.`
    );
  }
}

interface IMessageRowSize {
  width: number;
  height: number;
}

interface IGetSizeProps {
  attributes: any;
  className: string;
  data?: any;
  itemIndex: number;
  text: string;
  created_at: string;
  images?: any[];
  items?: any[];
  id?: string;
}

/**
 * Calculate the row height on the fly for react-window
 *
 * @param {string} [attributes] optional. HTML attributes passed along to the outer measuredElement
 * @param className CSS className
 * @param data data from your data source passed down to populate the VariableSizedList
 * @param itemIndex? the item index given from **`react-window`**
 * @param text? attributes
 * @return {string} a number.
 *
 * @example
 *
 *     getRowHeight({
 *                    text: "Lorem ipsum blah blah blah...",
 *                    attributes: { fontSize: "1.3em" },
 *                    className: "ayo",
 *                    itemIndex: 0
 *                  })
 *                // => 75
 */

// attributes: { fontSize: "2em" }
// className: "fakeClassName",
// data,
// itemIndex: index,
// text: items[index].node.message,
export function getRowHeight({
  attributes,
  className,
  data,
  itemIndex,
  text,
  created_at,
  images,
  items,
  id
}: IGetSizeProps): number {
  const { height } = getSize({
    attributes,
    className,
    data,
    text,
    itemIndex,
    created_at,
    images,
    items,
    id
  });
  return height;
}

/**
 * Get the size of an measuredElement based on provided text and style attributes.
 * @param {getSizeConfig} IGetSizeProps - The configuration object for getSize.
 * @returns {getSizeConfig} IMessageRowSize: {height: number, width: number}
 */
export default function getSize({
  attributes,
  className,
  data,
  itemIndex,
  text,
  created_at,
  images,
  id
}: IGetSizeProps): IMessageRowSize {
  const cacheKey = JSON.stringify(id);

  // if (cache[cacheKey]) {
  //   console.log("returning early".toUpperCase(), cache[cacheKey]);
  //   console.log("view cacheKey".toUpperCase(), cacheKey);
  //   return cache[cacheKey];
  // }

  const measuredElement = createDummyElement({
    attributes,
    className,
    data,
    itemIndex,
    text,
    created_at,
    images
  });

  const size: IMessageRowSize = {
    width: measuredElement.offsetWidth,

    height: measuredElement.offsetHeight
  };

  destroyElement(measuredElement);

  cache[cacheKey] = size;

  return size;
}
