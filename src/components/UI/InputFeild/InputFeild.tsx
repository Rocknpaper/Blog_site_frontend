import React, { ChangeEvent } from "react";
import "./InputFeild.css";

interface PropsType {
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  value: string;
}

const InputFeild: React.FC<PropsType> = ({
  type,
  onChange,
  placeHolder,
  value,
}) => {
  return (
    <input
      className="inputFeild"
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputFeild;
