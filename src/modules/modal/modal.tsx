import React from "react";
import ReactDOM from "react-dom";

import { Flex } from "../../components/styled-rebass";

interface ModalProps {}

const styles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  padding: 0,
  margin: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  border: "3px solid grey"
};

const Modal: React.FunctionComponent<ModalProps> = ({ children }) => {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(
    <div style={styles}>
      <Flex pt="115px" width={1} justifyContent="center" border="crimson">
        <Flex flexDirection="column" width={[1, 1, "960px"]} border="lime">
          {children}
        </Flex>
      </Flex>
    </div>,
    modalRoot
  );
};

export default Modal;