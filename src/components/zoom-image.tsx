import React from "react";
import posed from "react-pose";

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
};

export const Frame = posed.div({
  init: {
    applyAtEnd: { display: "none" },
    opacity: 0,
    position: "static",
    // width: "auto",
    // height: "auto",
    transition,
    flip: true
  },
  zoom: {
    applyAtStart: { display: "block" },
    opacity: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition,
    flip: true
  }
});

const Image = posed.img({
  init: {
    position: "static",
    width: "auto",
    height: "auto",
    transition,
    flip: true
  },
  zoom: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition,
    flip: true
  }
});

interface IZoomImgProps {
  imageWidth: number | string;
  imageHeight: number | string;
  src: string;
}

interface IZoomImgState {
  isZoomed: boolean;
}

class ZoomImg extends React.Component<IZoomImgProps, IZoomImgState> {
  state = { isZoomed: false };

  zoomIn() {
    window.addEventListener("scroll", this.zoomOut);
    this.setState({ isZoomed: true });
  }

  zoomOut = () => {
    window.removeEventListener("scroll", this.zoomOut);
    this.setState({ isZoomed: false });
  };

  toggleZoom = () => (this.state.isZoomed ? this.zoomOut() : this.zoomIn());

  render() {
    const { isZoomed } = this.state;
    const { imageWidth, imageHeight, ...props } = this.props;
    const pose = isZoomed ? "zoom" : "init";

    return (
      <div
        // style={{ width: imageWidth, height: imageHeight }}
        style={{
          maxWidth: isZoomed ? "100%" : "150px",
          maxHeight: isZoomed ? "100%" : "150px",
          position: "relative"
        }}
        onClick={this.toggleZoom}
      >
        <Frame
          pose={pose}
          className="frame"
          style={{
            // backgroundColor: isZoomed ? "rgba(255,255,255,0.5)" : "transparent"
            backgroundColor: "rgba(255,255,255,1)",
            width: "100vw",
            height: "100vh"
          }}
        />
        <Image
          pose={pose}
          style={{
            maxWidth: isZoomed ? "100%" : "150px",
            maxHeight: isZoomed ? "100%" : "150px"
          }}
          {...props}
        />
      </div>
    );
  }
}

export default ZoomImg;
