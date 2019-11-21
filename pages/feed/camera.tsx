import React from "react";

import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import CameraPage from "../../src/modules/feed/camera";
import { MyContext } from "../../types/types";
import { getLayout } from "../../src/modules/site-layout/layout";

interface ICamera {
  ({ pathname, query }: MyContext): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Camera: ICamera = () => {
  return (
    <HelloWorldComponent>
      {() => {
        return <CameraPage />;
      }}
    </HelloWorldComponent>
  );
};

Camera.getLayout = getLayout;
Camera.title = "Camera";

export default Camera;
