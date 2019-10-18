import React from "react";
import uuidv4 from "uuid/v4";
import dFormat from "date-fns/format";
import axios from "axios";

import CreateThreadAndAddMessageToThread from "./create-thread-and-add-message-to-thread";
import AddMessageToThread from "./add-message-to-thread";
import { IChatFormProps, IChatFormState } from "./types";

export const inputStyles = {
  display: "none"
};

class ChatForm extends React.Component<IChatFormProps, IChatFormState> {
  fileInputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IChatFormProps) {
    super(props);

    this.fileInputRef = React.createRef();

    this.handleClearFilePreview = this.handleClearFilePreview.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.fileListToArray = this.fileListToArray.bind(this);
    this.makeObjectUrls = this.makeObjectUrls.bind(this);
    this.makeBlobUrls = this.makeBlobUrls.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.dataUriToBlob = this.dataUriToBlob.bind(this);
    this.handleRemoveIndividualImagePreview = this.handleRemoveIndividualImagePreview.bind(
      this
    );
    this.getS3Signature = this.getS3Signature.bind(this);

    this.uploadToS3 = this.uploadToS3.bind(this);
    this.makeBlobUrlsFromReference = this.makeBlobUrlsFromReference.bind(this);
    this.formatFilename = this.formatFilename.bind(this);

    this.state = {
      files: []
    };
  }

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

  async makeBlobUrlsFromReference(myFile: any) {
    return await fetch(myFile)
      .then(r => r.blob())
      .then(blobFile => {
        const getFileName = this.state.files
          .filter(aFile => aFile.blobUrl === myFile)
          .map(theFile => theFile.name)[0];

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

    const theFile = await this.makeBlobUrlsFromReference(file);

    let s3ReturnInfo = await axios
      .put(signedRequest, theFile, options)
      .catch(error => console.error({ error }));

    return s3ReturnInfo;
  };

  async getS3Signature() {
    const { files } = this.state;
    const { signS3Mutation } = this.props;

    const preppedFiles = files.map(file => {
      return { filename: file.name, filetype: file.type };
    });

    if (!files || !files[0]) return;

    const response = await signS3Mutation({
      variables: {
        files: [...preppedFiles]
      }
    });

    const { signatures } = response.data.signS3;

    await Promise.all(
      signatures.map(async (signature: any, signatureIndex: number) => {
        return await this.uploadToS3({
          file: files[signatureIndex].blobUrl,
          signedRequest: signature.signedRequest
        }).catch(error => console.error(JSON.stringify({ ...error }, null, 2)));
      })
    );

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

  handleClearFilePreview() {
    this.setState(prevState => {
      if (prevState.files.length === 0) return;
      // let newFiles = prevState.files.filter(function(file, fileIndex) {
      //   return fileIndex !== 0;
      // });
      let newFiles: any[] = [];
      return {
        files: newFiles
      };
    });
  }

  openFileDialog() {
    if (this.props.disabled) return;
    if (this.fileInputRef && this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  }

  fileListToArray(list: any) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list[i]);
    }
    return array;
  }

  makeObjectUrls(someArray: any) {
    // return someArray.map((file: any) => URL.createObjectURL(file));

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

  async makeBlobUrls() {
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

  onFilesAdded(evt: any) {
    if (this.props.disabled) return;

    evt && evt.preventDefault();

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

      this.setState({
        files: [...previewFiles]
      });
      return previewFiles;
    }

    // if (this.onFilesAdded) {
    //   this.props.onFilesAdded(array);
    // }
  }

  dataUriToBlob(dataURI: any) {
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

    const finalFile = new File([newBlob], this.state.files[0], {
      type: "image/png"
    });

    return finalFile;
  }

  // componentDidMount() {
  //   this.props.handleSetLastMessenger();
  //   this.props.handleSetLastMessage();
  // }

  render() {
    const {
      chatEmoji,
      disabled,
      emojiPickerVisible,
      handleThreadSelection,
      handleEngageMicrophoneClick,
      handleOpenEmojiMenuClick,
      sentTo,
      threadId,
      selectedThreadId,
      newThreadInvitees,
      newThreadDisabled
    } = this.props;
    return (
      <>
        {selectedThreadId ? (
          <AddMessageToThread
            chatEmoji={chatEmoji}
            disabled={disabled}
            emojiPickerVisible={emojiPickerVisible}
            files={this.state.files}
            fileInputRef={this.fileInputRef}
            getS3Signature={this.getS3Signature}
            handleClearFilePreview={this.handleClearFilePreview}
            handleEngageMicrophoneClick={handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={handleOpenEmojiMenuClick}
            handleRemoveIndividualImagePreview={
              this.handleRemoveIndividualImagePreview
            }
            makeBlobUrls={this.makeBlobUrls}
            newThreadInvitees={newThreadInvitees}
            onFilesAdded={this.onFilesAdded}
            openFileDialog={this.openFileDialog}
            sentTo={sentTo}
            threadId={threadId}
          />
        ) : (
          <CreateThreadAndAddMessageToThread
            chatEmoji={chatEmoji}
            emojiPickerVisible={emojiPickerVisible}
            fileInputRef={this.fileInputRef}
            files={this.state.files}
            getS3Signature={this.getS3Signature}
            handleClearFilePreview={this.handleClearFilePreview}
            handleEngageMicrophoneClick={handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={handleOpenEmojiMenuClick}
            handleRemoveIndividualImagePreview={
              this.handleRemoveIndividualImagePreview
            }
            handleThreadSelection={handleThreadSelection}
            makeBlobUrls={this.makeBlobUrls}
            newThreadDisabled={newThreadDisabled}
            newThreadInvitees={newThreadInvitees}
            onFilesAdded={this.onFilesAdded}
            openFileDialog={this.openFileDialog}
            sentTo={sentTo}
            threadId={threadId}
          />
        )}
      </>
    );
  }
}

export default ChatForm;
