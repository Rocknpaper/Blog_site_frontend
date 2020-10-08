import React from "react";
import "./ShowPosts.css";
import SinglePost from "../UI/SinglePost/SinglePost";

const ShowPosts: React.FC = () => {
  return (
    <div className="showPosts">
      <SinglePost title="hello" author="Tharun" date={new Date()} />
      <SinglePost title="hello" author="Tharun" date={new Date()} />
      <SinglePost title="hello" author="Tharun" date={new Date()} />
    </div>
  );
};

export default ShowPosts;
