import React from "react";
import "./Modal.css";

import Backdrop from "../Backdrop/Backdrop";

interface PropsType{
  onClick: () => void;
  show: boolean
};

const Modal: React.FC<PropsType> = ({ children, onClick, show }) => {
  return (
    <React.Fragment>
      <Backdrop show={show} onClick={onClick} />
      <div className="modal">{children}</div>
    </React.Fragment>
  );
};

export default Modal;
