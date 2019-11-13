import React from "react";

import { Button } from "../../src/components/styled-rebass";
import Modal from "../../src/modules/modal/modal";
import ToggleContent from "../../src/modules/modal/toggle-content";

interface Props {
  hello?: "hello";
}

const CreateComment: React.FunctionComponent<Props> = () => {
  return (
    <div
      sx={{
        position: "relative"
      }}
    >
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
    </div>
  );
};

export default CreateComment;
