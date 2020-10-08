import React from "react";
import "./Label.css";

interface PropsType {
  text: string;
}

const Label: React.FC<PropsType> = ({ text }) => {
  return <label className="inputLabel">{text}</label>;
};

export default Label;
