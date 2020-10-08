import React from "react";
import Button from "../../UI/Button/Button";
import "./QuickPost.css";

const QuickPost:React.FC = () => {
  return (
    <div className="quickPost">
      <h2>Share Your Thoughts</h2>
      <h1>Write a post</h1>
      <Button text="Post" />
    </div>
  );
};

export default QuickPost;
