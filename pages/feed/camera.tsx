import React from "react";

import {
  // HelloWorldComponent,
  MeComponent
} from "../../src/components/generated/apollo-graphql";
import { MyContext } from "../../types/types";
import { getLayout } from "../../src/modules/site-layout/layout";
// import CameraContainer from "../../src/modules/feed/camera_v1/video-container";
import CameraModule from "../../src/modules/feed/camera";
// import CameraComponent from "../../src/modules/feed/camera/camera";

interface ICamera {
  ({ pathname, query }: MyContext): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Camera: ICamera = () => {
  return (
    <MeComponent>
      {({ data, error, loading }) => {
        console.log({ data, error, loading });
        return (
          <CameraModule me={data && data.me && data.me ? data.me.id : ""} />
        );
      }}
    </MeComponent>
  );
};

Camera.getLayout = getLayout;
Camera.title = "Camera";

export default Camera;
