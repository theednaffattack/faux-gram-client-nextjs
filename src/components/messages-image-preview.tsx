import React, { Component } from "react";
import { Image } from "rebass";

import { Flex } from "./styled-rebass";

interface IImagePreviewProps {
  errors?: any;
  touched?: any;
  files?: string[];
  imageFiles: string[];
  values?: any;
}

export default class ImagePreview extends Component<
  IImagePreviewProps,
  object
> {
  render() {
    const { imageFiles } = this.props;
    return (
      <Flex width={[1]} flexWrap="wrap">
        {imageFiles
          ? imageFiles.map((imageFile: any, index: number) => {
              return (
                <Image
                  // height="auto"
                  width={[1 / 2, 1 / 2, 1 / 2]}
                  key={index}
                  src={imageFile}
                />
              );
            })
          : ""}
      </Flex>
    );
  }
}
