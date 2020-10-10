import React from "react";
import "./Backdrop.css";

interface PropsType{
  show: boolean;
  onClick: () => void;
}

const Modal: React.FC<PropsType> = ({show, onClick}) => {
  return  show ? <div className="backdrop" onClick={onClick}></div>: null
};

export default Modal;
