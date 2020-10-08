import { Avatar } from "@material-ui/core";
import React from "react";
import "./SinglePost.css";

interface PropsType {
  title: String;
  author: String;
  date: Date;
}

const SinglePost: React.FC<PropsType> = ({ title, author, date }) => {
  return (
    <div className="singlePost">
      <div className="post__header">
        <Avatar src="https://picsum.photos/200/300" className="post__avatar"/>
        <h3 className="post_author">{author}</h3>
      </div>
      <div className="post__body">
        <h2 className="post__title">{title}</h2>
        <h4 className="post__time">{`${date.getHours()}:${date.getMinutes()}  ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</h4>
      </div>
    </div>
  );
};

export default SinglePost;
