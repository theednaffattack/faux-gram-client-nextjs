import React, { Component } from "react";
import dFormat from "date-fns/format";
import axios from "axios";
import uuidv4 from "uuid/v4";

import { IDropZoneContainerProps, IDropZoneContainerState } from "./types";
import { Flex } from "./styled-rebass";
import CreatePostForm from "./create-post-form";
import { SignS3Component } from "./generated/apollo-graphql";

const { log } = console;

export const inputStyles = {
  display: "none"
};

const initialState = {
  disabled: false,
  files: [],
  fileInputKey: Date.now().toString(),
  fileNames: [],
  highlight: false,
  previewSource: null
};

// highlight: false,
// files: [],
// name: "",
// disabled: false,
// fileInputKey: initialState.fileInputKey

export default class DropZoneContainer extends Component<
  IDropZoneContainerProps,
  IDropZoneContainerState
> {
  fileInputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IDropZoneContainerProps) {
    super(props);

    this.fileInputRef = React.createRef();

    this.handlePost = this.handlePost.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.fileListToArray = this.fileListToArray.bind(this);
    this.handleClearFilePreview = this.handleClearFilePreview.bind(this);
    this.handleRemoveIndividualImagePreview = this.handleRemoveIndividualImagePreview.bind(
      this
    );
    this.makeObjectUrls = this.makeObjectUrls.bind(this);
    this.getSignature = this.getSignature.bind(this);
    this.formatFilename = this.formatFilename.bind(this);
    this.uploadToS3 = this.uploadToS3.bind(this);

    this.state = {
      highlight: false,
      files: [],
      name: "",
      disabled: false,
      fileInputKey: initialState.fileInputKey
    };
  }

  handleRemoveIndividualImagePreview(index: number) {
    this.setState(prevState => {
      // @ts-ignore
      let newFiles = prevState.files.filter(function(file, fileIndex) {
        return fileIndex !== index;
      });
      return {
        files: newFiles
      };
    });
  }

  async handlePost(submissionData: any, { resetForm, setErrors }: any) {
    if (submissionData.images.length < 1) return;

    // event.preventDefault();
    log("WHAT IS FORMIK SENDING?");

    log({ submissionData });
    log("`handlePost` FIRING");

    // const theImage = this.dataURItoBlob(submissionData.pic);

    const imagesAreUploadedToS3 = await this.getSignature();

    console.log("imagesAreUploadedToS3".toUpperCase());
    console.log({ imagesAreUploadedToS3 });

    if (imagesAreUploadedToS3) {
      try {
        this.props.mutate({
          variables: {
            data: {
              text: submissionData.text,
              title: submissionData.title,
              images: [...submissionData.images],
              user: submissionData.user //"de5527bc-58f4-4666-819c-c0e7983bdcc3"
            }
          }
        });
        this.handleClearFilePreview();
      } catch (error) {
        const displayErrors: { [key: string]: string } = {};

        let graphErrors = error.graphQLErrors;
        graphErrors.forEach((errorThing: any) => {
          displayErrors[errorThing.path[0]] = errorThing.message;
        });
        console.log(graphErrors);
        return setErrors(displayErrors);
      }
    }

    // `text` and `title` both come from the form inputs
    log("is the error after mutate?");
    resetForm({
      text: "",
      title: "",
      user: this.props.me,
      images: []
    });
    this.setState({
      fileInputKey: Date.now().toString(),
      files: []
    });
    this.handleClearFilePreview();
  }

  onDragOver(evt: React.MouseEvent) {
    evt.preventDefault();

    if (this.state.disabled) return;

    this.setState({ highlight: true });
  }

  onDragLeave() {
    this.setState({ highlight: false });
  }

  onDrop(evt: React.DragEvent<HTMLDivElement>) {
    evt.preventDefault();

    if (this.state.disabled) return;

    const files = evt.dataTransfer.files;

    log({ files });

    if (this.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.onFilesAdded(array);
    }
    this.setState({ highlight: false });
  }

  handleClearFilePreview() {
    this.setState({
      files: []
    });
  }

  openFileDialog() {
    if (this.state.disabled) return;
    if (this.fileInputRef && this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  }

  fileListToArray(list: FileList) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list[i]);
    }
    return array;
  }

  async makeBlobUrlsFromState() {
    const self = this;

    return await Promise.all(
      self.state.files.map(async myFile => {
        return await fetch(myFile)
          .then(r => r.blob())
          .then(
            blobFile =>
              new File([blobFile], uuidv4(), {
                type: "image/png"
              })
          );
      })
    );
  }

  async makeBlobUrlsFromReference(myFile: any) {
    return await fetch(myFile)
      .then(r => r.blob())
      .then(blobFile => {
        console.log({ myFile });

        const getFileName = this.state.files
          .filter(aFile => aFile.blobUrl === myFile)
          .map(theFile => theFile.name)[0];
        console.log({ getFileName });

        console.log({
          teams: new File([blobFile], getFileName, {
            type: myFile.type
          })
        });
        return new File([blobFile], getFileName, {
          type: myFile.type
        });
      });

    // return await Promise.all(
    //   self.state.files.map(async myFile => {
    //     return await fetch(myFile)
    //       .then(r => r.blob())
    //       .then(
    //         blobFile =>
    //           new File([blobFile], uuidv4(), {
    //             type: "image/png"
    //           })
    //       );
    //   })
    // );
  }

  uploadToS3 = async ({ file, signedRequest }: any) => {
    const options = {
      headers: {
        "Content-Type": "image/png"
      }
    };
    console.log("look at theFile", file);

    const theFile = await this.makeBlobUrlsFromReference(file);

    console.log("look at theFile", theFile);

    let s3ReturnInfo = await axios
      .put(signedRequest, theFile, options)
      .catch(error => console.error({ error }));

    console.log("s3ReturnInfo".toUpperCase(), s3ReturnInfo);

    return s3ReturnInfo;
  };

  formatFilename = (file: any) => {
    const filename = file.name;

    const date = dFormat(new Date(), "YYYYMMDD");

    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);

    const fileExtension = file.type.substring(
      file.type.lastIndexOf("/") + 1,
      file.type.length
    );

    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const restrictedLengthCleanFileName = cleanFileName.substring(0, 40);

    const newFilename = `${date}-${randomString}-${restrictedLengthCleanFileName}.${fileExtension}`;

    return newFilename;
  };

  getFileExtension() {}

  getMimeType() {}

  async getSignature() {
    const { files } = this.state;
    const { mutateSignS3 } = this.props;

    const preppedFiles = files.map(file => {
      return { filename: file.name, filetype: file.type };
    });

    if (!files || !files[0]) return;

    console.log("Files".toUpperCase(), files);
    console.log("preppedFiles".toUpperCase(), preppedFiles);
    const response = await mutateSignS3({
      variables: {
        files: [...preppedFiles]
      }
    });

    const { signatures } = response.data.signS3;
    let s3Uploads = await Promise.all(
      signatures.map(async (signature: any, signatureIndex: number) => {
        console.log({ signature, signatureIndex });
        return await this.uploadToS3({
          file: files[signatureIndex].blobUrl,
          signedRequest: signature.signedRequest
        }).catch(error => console.error(JSON.stringify({ ...error }, null, 2)));
      })
    );

    console.log("signatures?");
    console.log(signatures);
    console.log("s3Uploads?");
    console.log(s3Uploads);

    return signatures;

    // this needs to be a call to create Post?
    // probably wrap w/ mutation component from outside and pass in
    // const graphqlResponse = await this.props.createChampion({
    //   variables: {
    //     name,
    //     pictureUrl: url
    //   }
    // });
  }

  makeObjectUrls(someArray: any) {
    return someArray.map((file: any) => {
      const {
        lastModified,
        lastModifiedDate,

        size,
        type,
        webkitRelativePath
      } = file;

      return {
        blobUrl: URL.createObjectURL(file),
        lastModified,
        lastModifiedDate,
        name: this.formatFilename(file),
        size,
        type,
        webkitRelativePath
      };
    });
  }

  onFilesAdded(evt: any) {
    // evt && evt.preventDefault();
    if (this.state.disabled) return;

    let array;

    if (evt && evt.target) {
      array = this.fileListToArray(evt.target.files);
      const previewFiles = this.makeObjectUrls(array);
      this.setState({
        files: [...previewFiles]
      });
      return previewFiles;
    } else {
      array = this.fileListToArray(evt);
      const previewFiles = this.makeObjectUrls(array);
      log("previewFiles else", previewFiles);
      this.setState({
        files: [...previewFiles]
      });
      return previewFiles;
    }

    // if (this.onFilesAdded) {
    //   this.onFilesAdded(array);
    // }
  }

  render() {
    // const { signS3 } = this.props;

    const { dataCreatePost, errorCreatePost, loadingCreatePost } = this.props;
    return (
      <SignS3Component>
        {(
          signS3,
          { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
        ) => {
          if (errorCreatePost) return <div>Error creating post!</div>;

          if (loadingCreatePost) return <div>loading...</div>;

          if (dataCreatePost)
            return (
              <div>
                <pre>{JSON.stringify(dataCreatePost, null, 2)}</pre>
              </div>
            );

          return (
            <Flex justifyContent="center">
              {/* <Dropzone
                openFileDialog={this.openFileDialog}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                fileInputRef={this.fileInputRef}
                onFilesAdded={this.onFilesAdded}
                highlight={this.state.highlight}
                getSignature={this.getSignature}
                files={this.state.files}
                disabled={this.state.disabled}
                handleClearFilePreview={this.handleClearFilePreview}
                // signS3={this.sig}
              /> */}
              {/* interface ICreatePostFormProps {
              //   handleFormUpload: any;
              handleDrop?: any;
              handlePost: any;
              me: any;
              fileInputKey?: string;
              setPreviewImageRef?: any;

              mutationSignS3: any;
              dataSignS3: any;
              errorSignS3: any;
              loadingSignS3: any;
              disabled: boolean;
            } */}
              <CreatePostForm
                files={this.state.files}
                handlePost={this.handlePost}
                me={this.props.me}
                fileInputKey={this.state.fileInputKey}
                mutationSignS3={signS3}
                dataSignS3={dataSignS3}
                errorSignS3={errorSignS3}
                loadingSignS3={loadingSignS3}
                disabled={this.state.disabled}
                handleRemoveIndividualImagePreview={
                  this.handleRemoveIndividualImagePreview
                }
                handleClearFilePreview={this.handleClearFilePreview}
                openFileDialog={this.openFileDialog}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                fileInputRef={this.fileInputRef}
                onFilesAdded={this.onFilesAdded}
                highlight={this.state.highlight}
                getSignature={this.getSignature}
                fileListToArray={this.fileListToArray}
                dataCreatePost={dataCreatePost}
                errorCreatePost={errorCreatePost}
                loadingCreatePost={loadingCreatePost}
                // files={this.state.files}
                // disabled={this.state.disabled}
                // handleClearFilePreview={this.handleClearFilePreview}
              />
            </Flex>
          );
        }}
      </SignS3Component>
      // <Flex flexDirection="column" width={[1, 1, 1]}>
      //   The Drop DropZone
      //   <Flex alignItems="center" flexDirection="column" width={[1, 1, 1]}>
      //     <MaxFlex
      //       bg={this.state.highlight ? "rgb(188,185,236)" : "#fff"}
      //       width="350px"
      //       border="2px dashed rgb(187, 186, 186)"
      //       minHeight={["350px"]}
      //       maxHeight="350px"
      //       style={{
      //         borderRadius: "50%",
      //         fontSize: "16px",
      //         cursor: this.props.disabled ? "default" : "pointer"
      //       }}
      //       onClick={this.openFileDialog}
      //       onDragOver={this.onDragOver}
      //       onDragLeave={this.onDragLeave}
      //       onDrop={this.onDrop}
      //     >
      //       <input
      //         ref={this.fileInputRef}
      //         type="file"
      //         onChange={this.onFilesAdded}
      //         style={inputStyles}
      //         multiple
      //       />
      //     </MaxFlex>
      //   </Flex>
      //   <Button type="button" onClick={this.getSignature}>
      //     Upload to S3
      //   </Button>
      //   <Flex flexWrap="wrap" width={[1, 1, 1]} border="lime">
      //     <ImagePreview imageFiles={this.state.files} />
      //   </Flex>
      //   <Button type="button" onClick={this.handleClearFilePreview}>
      //     Clear `Files` State
      //   </Button>
      // </Flex>
    );
  }
}
