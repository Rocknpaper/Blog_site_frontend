import React from "react";
import "./Modal.css";

import Backdrop from "../Backdrop/Backdrop";

const Modal: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Backdrop />
      <div className="modal">{children}</div>
    </React.Fragment>
  );
};

export default Modal;
