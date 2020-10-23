import React from "react";
import Button from "../../../components/UI/Button/Button";
import "./QuickPost.css";

interface PropsType {
  onClick?: () => void;
}

const QuickPost: React.FC<PropsType> = ({ onClick }) => {
  return (
    <div className="quickPost">
      <h2>Share Your Thoughts</h2>
      <h1>Write a post</h1>
      <Button text="Post" onClick={onClick} />
    </div>
  );
};

export default QuickPost;
