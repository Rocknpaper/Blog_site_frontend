import React, { ChangeEvent } from "react";
import "./TextBox.css";

interface PropsType {
  placeHolder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextBox: React.FC<PropsType> = ({ placeHolder, onChange, value }) => {
  return (
    <textarea
      className="textBox"
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextBox;
