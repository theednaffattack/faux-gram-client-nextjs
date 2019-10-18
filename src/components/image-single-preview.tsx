import React, { Component } from "react";
import { Image } from "rebass";

import { IImagePreviewSingleProps } from "./types";

export default class ImageSinglePreview extends Component<
  IImagePreviewSingleProps,
  object
> {
  render() {
    const { imageFile } = this.props;
    return (
      <Image
        height="auto"
        width={[1 / 2, 1 / 2, 1 / 2]}
        src={imageFile.blobUrl}
      />
    );
  }
}
