import React from "react";

import { Button } from "../../src/components/styled-rebass";
import Modal from "../../src/modules/modal/modal";
import ToggleContent from "../../src/modules/modal/toggle-content";
import { getLayout } from "../../src/modules/site-layout/layout";

interface ICreateComment {
  // ({ hello }: { hello?: string }): JSX.Element;
  (): JSX.Element;
  getLayout: (page: any) => JSX.Element;
  title: string;
}

const CreateComment: ICreateComment = () => {
  return (
    <ToggleContent
      toggle={(show: any) => (
        <Button type="button" onClick={show}>
          Open
        </Button>
      )}
      content={(hide: any) => (
        <Modal>
          There is no spoon...
          <Button type="button" onClick={hide}>
            Close
          </Button>
        </Modal>
      )}
    />
  );
};

CreateComment.getLayout = getLayout;
CreateComment.title = "Comment";

export default CreateComment;
