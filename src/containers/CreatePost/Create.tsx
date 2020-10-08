import React, { ChangeEvent, useState } from "react";
import "./Create.css";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Button from "../../components/UI/Button/Button";
import TextBox from "../../components/UI/TextBox/TextBox";

const Create: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [text, setText] = useState<string>("");

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const textAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <form className="postForm">
      <InputFeild
        type="text"
        placeHolder="Title"
        value={value}
        onChange={inputChange}
      />
      <TextBox
        placeHolder="Your blog post here"
        value={text}
        onChange={textAreaChange}
      />
      <InputFeild
        type="text"
        placeHolder="Tags"
        value={value}
        onChange={inputChange}
      />
      <Button text="Submit" />
    </form>
  );
};

export default Create;
