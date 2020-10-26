import React, { ChangeEvent } from "react";
import "./TextBox.css";
import { InputType } from "../../../models";

interface PropsType {
  config: InputType;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextBox: React.FC<PropsType> = ({ config, onChange }) => {
  let classes = ["textBox"];
  if (config.edit) {
    config.isValid ? classes.push("valid") : classes.push("invalid");
  }

  return (
    <textarea
      className={classes.join(" ")}
      placeholder={config.elementConfig.placeHolder}
      value={config.elementConfig.value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextBox;
