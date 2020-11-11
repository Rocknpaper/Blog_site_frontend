import React, { useState, ChangeEvent } from "react";
import "./Comment.css";
import { Avatar } from "@material-ui/core";
import Like from "@material-ui/icons/ThumbUpOutlined";
import DisLike from "@material-ui/icons/ThumbDownOutlined";
import { CommentType } from "../../../models";
import RepliesIcon from "@material-ui/icons/ReplyOutlined";
import Replies from "../Replies/Replies";
import Edit from "@material-ui/icons/EditOutlined";
import Delete from "@material-ui/icons/DeleteOutline";
import Send from "@material-ui/icons/SendOutlined";
import { updateCommentAsync } from "../../../store/actions/blog_actions";
import { useDispatch } from "react-redux";

interface PropsType {
  comment: CommentType;
  user_id: string;
  likeHandler?: (event: any) => void;
  dislikeHandler?: (event: any) => void;
  deleteHandler?: (event: any) => void;
  replyHandler?: (event: any) => void;
  like: boolean;
  dislike: boolean;
}

const Comment: React.FC<PropsType> = ({
  comment,
  user_id,
  likeHandler,
  dislikeHandler,
  deleteHandler,
  replyHandler,
  like,
  dislike,
}) => {
  
  const [value, setValue] = useState(comment.content);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  
  const replies = comment.replies && comment.replies.length > 0;

  const dispatch = useDispatch();

  const ClickHandler = () => {
    setShow((prev) => !prev);
  };

  const like_classes = ["like"];
  if (like) like_classes.push("active");

  const dislike_classes = ["dislike"];
  if (dislike) dislike_classes.push("active");


  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
  };

  const onblur = () => {
    setEdit(false);
  };

  const submitHandler = (data: CommentType) => {
    dispatch(updateCommentAsync(data._id.$oid, value));
  };


  return (
    <React.Fragment>
      <div className="comment">
        <div className="comment-user__details">
          <Avatar src="" alt="user image" />
          <h2>{comment.username}</h2>
          <h4>{new Date(comment.created_at.$date).toString().slice(0, 25)}</h4>
        </div>
        <div className="content">
          {edit ? (
            <div className="comment__input">
              <input
                value={value}
                onChange={onChangeHandler}
                onBlur={onblur}
                type="text"
                placeholder="Your Comment Here"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    submitHandler(comment);
                    setEdit(false);
                  }
                }}
              />
              <span
                className="send__icon"
                onClick={(e) => {
                  submitHandler(comment);
                  setEdit(false);
                  e.stopPropagation();
                }}
              >
                <Send />
              </span>
            </div>
          ) : (
            <p>{comment.content}</p>
          )}
        </div>
        <div className="comment-footer">
          <div className={like_classes.join(" ")} onClick={likeHandler}>
            <Like />
            <span>{comment.likes ? comment.likes.count : 0}</span>
          </div>
          <div className={dislike_classes.join(" ")} onClick={dislikeHandler}>
            <DisLike />
            <span>{comment.dislikes ? comment.dislikes.count : 0}</span>
          </div>
          <div className="reply" onClick={replyHandler}>
            <RepliesIcon />
          </div>
          {user_id === comment.user_id.$oid ? (
            <div className="admin__edit">
              <span
                className="edit"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <Edit />
              </span>
              <span className="delete" onClick={deleteHandler}>
                <Delete />
              </span>
            </div>
          ) : null}
        </div>
        {replies ? (
          <a className="show__more">
            <p onClick={ClickHandler}>{show ? "Show less" : "Show More"}</p>
          </a>
        ) : null}
      </div>
      {replies && show ? (
        <Replies replies={comment.replies} comment_id={comment._id.$oid} />
      ) : null}
    </React.Fragment>
  );
};

export default Comment;
