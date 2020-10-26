import React from "react";
import "./Label.css";

interface PropsType {
  text: string;
  onClick: () => void;
}

const Label: React.FC<PropsType> = ({ text, onClick }) => {
  return (
    <label className="inputLabel" onClick={onClick}>
      {text}
    </label>
  );
};

export default Label;
