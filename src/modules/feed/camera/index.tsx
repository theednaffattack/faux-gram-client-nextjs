import React, { Fragment, useState } from "react";
import Camera from "./camera";
import { Root, Preview, Footer } from "./styles";
import { Button } from "../../../components/styled-rebass";

interface CameraModuleProps {}

const CameraModule: React.FunctionComponent<CameraModuleProps> = () => {
  let initialCameraState = false;
  const [isCameraOpen, setIsCameraOpen] = useState(initialCameraState);
  const [cardImage, setCardImage] = useState();
  console.log("mounted");
  return (
    <Fragment>
      <Root>
        <Button type="button" onClick={() => setIsCameraOpen(!isCameraOpen)}>
          {isCameraOpen ? "close camera" : "open camera"}
        </Button>
        {isCameraOpen && (
          <Camera
            onCapture={(blob: Blob) => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}

        {cardImage && (
          <div>
            <h2>Preview</h2>
            <Preview src={cardImage && URL.createObjectURL(cardImage)} />
          </div>
        )}

        <Footer>
          <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
          <button
            onClick={() => {
              setIsCameraOpen(false);
              setCardImage(undefined);
            }}
          >
            Close Camera
          </button>
        </Footer>
      </Root>
    </Fragment>
  );
};

export default CameraModule;
