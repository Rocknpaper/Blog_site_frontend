import React from "react";
import "./Post.css";
import Edit from "@material-ui/icons/EditOutlined";
import Delete from "@material-ui/icons/DeleteOutline";

interface PropsType {
  title: String;
  author: String;
  date?: Date;
  editable?: true;
  onEditClick?: (e: any) => void;
  onDeleteClick?: (e: any) => void;
}

const Post: React.FC<PropsType> = ({
  title,
  author,
  date,
  editable,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <React.Fragment>
      <div className="post">
        <div className="post__header">
          <h2 className="post__title">{title}</h2>
        </div>
        <div className="post__body">
          <h3 className="post__author">{author}</h3>
          <h4 className="post__time">
            {new Date(date ? date : "").toString()}
          </h4>
        </div>
      </div>

      {editable ? (
        <div className="post__tail">
          <div
            className="post__edit"
            onClick={(e: any) => {
              if (onEditClick) onEditClick(e);
              e.stopPropagation();
            }}
          >
            <Edit />
          </div>
          <div
            className="post__delete"
            onClick={(e: any) => {
              if (onDeleteClick) onDeleteClick(e);
              e.stopPropagation();
            }}
          >
            <Delete />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Post;
