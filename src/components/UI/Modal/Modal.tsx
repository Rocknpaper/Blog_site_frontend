import React, { useEffect, useRef } from "react";
import "./Modal.css";

import Backdrop from "../Backdrop/Backdrop";
import { TweenLite } from "gsap";

interface PropsType {
  onClick: () => void;
  show: boolean;
}

const Modal: React.FC<PropsType> = ({ children, onClick, show }) => {
  let auth: any = useRef(null);

  useEffect(() => {
    TweenLite.from(auth, 0.5, {
      scale: 0.5,
    });
  });

  return (
    <React.Fragment>
      <Backdrop show={show} onClick={onClick} />
      <div ref={(el) => (auth = el)} className="modal">
        {children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
