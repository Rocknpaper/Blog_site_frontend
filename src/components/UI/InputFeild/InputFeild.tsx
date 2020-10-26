import React, { ChangeEvent } from "react";
import "./InputFeild.css";
import { InputType } from "../../../models";

interface PropsType {
  config: InputType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFoucusOut?: (event: any) => void;
  onSubmit?: (event: any) => void;
}

const InputFeild: React.FC<PropsType> = ({
  onFoucusOut,
  onChange,
  config,
  onSubmit,
}) => {
  let classes = ["inputFeild"];
  if (config.edit) {
    config.isValid ? classes.push("valid") : classes.push("invalid");
  }

  return (
    <input
      className={classes.join(" ")}
      type={config.elementConfig.type}
      placeholder={config.elementConfig.placeHolder}
      value={config.elementConfig.value}
      onChange={onChange}
      onBlur={onFoucusOut}
      onKeyUp={onSubmit}
      formNoValidate
    />
  );
};

export default InputFeild;
