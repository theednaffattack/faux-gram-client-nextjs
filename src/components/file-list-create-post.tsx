import React, { Component } from "react";
import { Flex as FlexBase, Text } from "rebass";
import styled from "styled-components";
import { borders, minHeight } from "styled-system";

import { SignS3Component } from "./generated/apollo-graphql";

const Flex = styled(FlexBase)`
  ${borders}
  ${minHeight}
`;

const { log } = console;
const { stringify: str } = JSON;

function cl(args: any): void {
  return log(str(args));
}

interface IFileListState {
  files: string[];
  previewSource: ArrayBuffer | null;
  fileNames: string[];
  fileInputKey: string;
}

interface IFileListProps {
  mutate: any;
  me: string;
}

const initialState = {
  files: [],
  previewSource: null,
  fileNames: [],
  fileInputKey: Date.now().toString()
};

type FileListState = Readonly<IFileListState>;

class FileListBase extends Component<IFileListProps, FileListState> {
  image: HTMLImageElement | null;
  fileUpload: HTMLInputElement | null;
  setPreviewImageRef: React.RefObject<HTMLImageElement>;
  setFileUploadRef: React.RefObject<HTMLInputElement>;

  constructor(props: IFileListProps) {
    super(props);

    this.image = null;

    this.fileUpload = null;

    // this.handleFormUpload = this.handleFormUpload.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.dataURItoBlob = this.dataURItoBlob.bind(this);
    this.handlePost = this.handlePost.bind(this);

    // @ts-ignore
    this.setFileUploadRef = (reffedElement: HTMLInputElement) =>
      (this.fileUpload = reffedElement);

    // @ts-ignore
    this.setPreviewImageRef = (element: HTMLImageElement) =>
      (this.image = element);

    this.state = {
      files: initialState.files,
      previewSource: initialState.previewSource,
      fileNames: initialState.fileNames,
      fileInputKey: initialState.fileInputKey
    };
  }

  async handlePreview(self: any, files: any) {
    return await new Promise(function(resolve: any, reject: any) {
      let previewImages = new FileReader();

      previewImages.onerror = function(error) {
        // The file's text will be printed here
        reject({ error, previewImages });
      };

      previewImages.onloadend = function() {
        // The file's text will be printed here
        resolve(previewImages.result);
      };

      const fileNames = [...self.state.files];

      for (var i = 0; i < files.length; i++) {
        fileNames.push(files[i]);
      }
      log(fileNames);
      self.setState({ fileNames: [...fileNames] });
      previewImages.readAsDataURL(files[0]);
    });
  }

  dataURItoBlob(dataURI: any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    let newBlob = new Blob([ab], { type: mimeString });
    // let newObj = URL.createObjectURL(newBlob);
    log("view state files and names".toUpperCase());
    log(this.state.files);
    log(this.state.fileNames);

    const finalFile = new File([newBlob], this.state.files[0], {
      type: "image/png"
    });

    log("newBlob");
    log(URL.createObjectURL(newBlob));

    log("finalFile");
    log(URL.createObjectURL(finalFile));

    return finalFile;
  }

  async handlePost(submissionData: any, { resetForm, setErrors }: any) {
    // event.preventDefault();
    log("WHAT IS FORMIK SENDING?");
    log(setErrors);
    log(resetForm);
    log(submissionData.pic);
    cl("`handlePost` FIRING");
    // log(this.image.src);

    // const theImage = this.dataURItoBlob(submissionData.pic);

    log(this.state.fileNames);

    // `text` and `title` both come from the form inputs
    this.props.mutate({
      variables: {
        data: {
          text: submissionData.text,
          title: submissionData.title,
          images: [
            submissionData.pic && submissionData.pic.name
              ? submissionData.pic.name
              : this.state.files[0]
          ],
          user: submissionData.user, //"de5527bc-58f4-4666-819c-c0e7983bdcc3",
          picture:
            submissionData.pic && submissionData.pic.name
              ? submissionData.pic
              : this.image
              ? this.dataURItoBlob(this.image.src)
              : null
        }
      }
      // update: (cache: any, { data }: any) => {
      //   if (!data || !data.createPost) {
      //     return;
      //   }
      //   cache.writeQuery({
      //     query: this.props.mutate,
      //     data: {
      //       __typename: "Mutation",
      //       createPost: data.createPost
      //     }
      //   });
      // }
    });
    log("is the error after mutate?");
    resetForm({
      text: "",
      title: "",
      pic: null,
      user: this.props.me
    });
    this.setState({
      fileInputKey: Date.now().toString(),
      files: []
    });
    if (this.image) {
      this.image.src = "";
    }
  }

  handleDrop = async (event: any) => {
    log("VIEW HANDLEDROP");
    log(event);

    const { dataTransfer } = event;
    log("dataTransfer", dataTransfer);

    let fileList = [...this.state.files];

    if (dataTransfer) {
      log("DRAG N DROP");
      cl(fileList);

      for (var i = 0; i < dataTransfer.files.length; i++) {
        if (!dataTransfer.files[i].name) return;
        fileList.push(dataTransfer.files[i].name);
      }

      // let b64filePreview = await handleImagePreview(this, event);

      let b64filePreview = await new Promise(function(
        resolve: any,
        reject: any
      ) {
        let previewImages = new FileReader();

        previewImages.onerror = function(error) {
          // The file's text will be printed here
          reject({ error, previewImages });
        };

        previewImages.onloadend = function() {
          // The file's text will be printed here
          resolve(previewImages.result);
        };

        previewImages.readAsDataURL(dataTransfer.files[0]);
        return;
      })
        .then(data => data)
        .catch(error => console.error({ error }));

      this.setState({
        files: [...fileList]
      });

      if (this.image && this.image.src && b64filePreview) {
        this.image.src = b64filePreview as string;
      }

      // this.image && b64filePreview
      //   ? (this.image.src = b64filePreview as string)
      //   : null;
      return;
    }

    throw Error("Upload failure, client-side");
  };

  render() {
    return (
      <Flex flexDirection="column">
        <Text>{this.props.me}</Text>
        <Text>{this.props.me}</Text>
        <SignS3Component>
          {(
            signS3,
            { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
          ) => {
            console.log({ signS3, dataSignS3, errorSignS3, loadingSignS3 });
            return (
              <div>Fake something</div>
              // <CreatePostForm
              //   mutationSignS3={signS3}
              //   dataSignS3={dataSignS3}
              //   errorSignS3={errorSignS3}
              //   loadingSignS3={loadingSignS3}
              //   handlePost={this.handlePost}
              //   handleDrop={this.handleDrop}
              //   me={this.props.me}
              //   // createPost={this.props.mutate}
              //   fileInputKey={this.state.fileInputKey}
              //   setPreviewImageRef={this.setPreviewImageRef}
              // />
            );
          }}
        </SignS3Component>
      </Flex>
    );
  }
}

export default FileListBase;
