import { Avatar } from "@material-ui/core";
import React from "react";
import "./SinglePost.css";
import UpVote from "@material-ui/icons/ArrowUpwardOutlined";
import DownVote from "@material-ui/icons/ArrowDownwardOutlined";
import Edit from "@material-ui/icons/EditOutlined";
import Delete from "@material-ui/icons/DeleteOutline"


interface PropsType {
  title: String;
  author: String;
  date?: Date;
  upVote: number;
  downVote: number;
  editable?: true;
  onUpvoteClick?: () => void;
  onDownvoteClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const SinglePost: React.FC<PropsType> = ({ title, author, date, upVote, downVote, editable, onDownvoteClick, onUpvoteClick, onEditClick, onDeleteClick }) => {


  return (
    <div className="singlePost">

      <div className="post__votes">
        <div className="upvote" onClick={onUpvoteClick}>
          <UpVote/>
        </div>
        <p>{upVote}</p>
        <div className="downvote" onClick={onDownvoteClick}>
          <DownVote/>
        </div>
        <p>{downVote}</p>
      </div>

      <div className="post">
        <div className="post__header">
          <Avatar src="https://picsum.photos/200/300" className="post__avatar"/>
          <h2 className="post__title">{title}</h2>
        </div>
        <div className="post__body">
          <h3 className="post__author">{author}</h3>
          <h4 className="post__time">{new Date(date ? date: "").toString()}</h4>
        </div>
      </div>

    {editable ? 
      <div className="post__tail">
        <div className="post__edit" onClick={onEditClick}>
          <Edit />
        </div>
        <div className="post__delete" onClick={onDeleteClick}>
          <Delete/>
        </div>
      </div>: null}
    </div>
  );
};

export default SinglePost;
