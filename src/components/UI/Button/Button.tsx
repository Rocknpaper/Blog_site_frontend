import React from "react";
import "./Button.css";

interface PropsType {
  text: string;
  onClick?: (event: any) => void;
}

const Button: React.FC<PropsType> = ({ text, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
