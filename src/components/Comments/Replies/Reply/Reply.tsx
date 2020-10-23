import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Like from "@material-ui/icons/ThumbUpOutlined";
import DisLike from "@material-ui/icons/ThumbDownOutlined";
import RepliesIcon from "@material-ui/icons/ReplyOutlined";
import Edit from "@material-ui/icons/EditOutlined";
import Delete from "@material-ui/icons/DeleteOutline";
import Send from "@material-ui/icons/SendOutlined";
import { Reply, ReducersType } from "../../../../models";
import { useSelector, useDispatch } from "react-redux";
import {
  setReplyTo,
  deleteReplyAsync,
  updateReplyAsync,
  patchReplyDislike,
  patchReplyLike,
} from "../../../../store/actions/blog_actions";

interface PropsType {
  reply: Reply;
  comment_id: string;
}

const Replys: React.FC<PropsType> = ({ reply, comment_id }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(reply.content);

  const { blog, user } = useSelector<ReducersType, ReducersType>(
    (state) => state
  );

  const dispatch = useDispatch();

  const up = (data: Reply) => {
    const exist = data.likes.users.find((d) => d.$oid === user._id.$oid);
    return exist ? true : false;
  };

  const down = (data: Reply) => {
    const exist = data.dislikes.users.find((d) => d.$oid === user._id.$oid);
    return exist ? true : false;
  };

  const replyHandler = () => {
    const comment = blog.comments.find((com) => com._id.$oid === comment_id);
    if (comment) {
      dispatch(setReplyTo(comment));
    }
  };

  const replyLikeHandler = (data: Reply) => {
    let exist_up = false,
      exist_down = false;

    data.likes.users.every((u) => {
      if (exist_up) return !exist_up;
      exist_up = u.$oid === user._id.$oid;
      return true;
    });

    data.dislikes.users.every((u) => {
      if (exist_down) return !exist_down;
      exist_down = u.$oid === user._id.$oid;
      return true;
    });

    if (!exist_up) {
      if (exist_down) {
        dispatch(
          patchReplyDislike(comment_id, data._id.$oid, user._id.$oid, "dec")
        );
      }
      dispatch(patchReplyLike(comment_id, data._id.$oid, user._id.$oid, "inc"));
    }
  };

  const replyDislikeHandler = (data: Reply) => {
    let exist_up = false,
      exist_down = false;

    data.likes.users.every((u) => {
      if (exist_up) return !exist_up;
      exist_up = u.$oid === user._id.$oid;
      return true;
    });

    data.dislikes.users.every((u) => {
      if (exist_down) return !exist_down;
      exist_down = u.$oid === user._id.$oid;
      return true;
    });

    if (!exist_down) {
      if (exist_up) {
        dispatch(
          patchReplyLike(comment_id, data._id.$oid, user._id.$oid, "dec")
        );
      }
      dispatch(
        patchReplyDislike(comment_id, data._id.$oid, user._id.$oid, "inc")
      );
    }
  };

  const deleteHandler = (data: Reply) => {
    dispatch(deleteReplyAsync(comment_id, data._id.$oid));
  };

  const submitHandler = (data: Reply) => {
    dispatch(updateReplyAsync(comment_id, data._id.$oid, value));
    setEdit(false);
  };

  return (
    <div className="comment replies" key={reply._id.$oid}>
      <div className="comment-user__details">
        <Avatar src="" alt="user image" />
        <h2>{reply.username}</h2>
        <h4>{new Date(reply.created_at.$date).toString().slice(0, 25)}</h4>
      </div>
      <div className="content">
        {edit ? (
          <div className="comment__input">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setEdit(false)}
              type="text"
              placeholder="Your Comment Here"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  submitHandler(reply);
                  setEdit(false);
                }
              }}
            />
            <span
              className="send__icon"
              onClick={(e) => {
                submitHandler(reply);
                setEdit(false);
                e.stopPropagation();
              }}
            >
              <Send />
            </span>
          </div>
        ) : (
          <p>{reply.content}</p>
        )}
      </div>
      <div className="comment-footer">
        <div
          className={up(reply) ? "like active" : "like"}
          onClick={(e) => {
            if (user.logged) replyLikeHandler(reply);
            e.stopPropagation();
          }}
        >
          <Like />
          <span>{reply.likes ? reply.likes.count : 0}</span>
        </div>
        <div
          className={down(reply) ? "dislike active" : "dislike"}
          onClick={(e) => {
            if (user.logged) replyDislikeHandler(reply);
            e.stopPropagation();
          }}
        >
          <DisLike />
          <span>{reply.dislikes ? reply.dislikes.count : 0}</span>
        </div>
        <div
          className="reply"
          onClick={(e) => {
            if (user.logged) replyHandler();
          }}
        >
          <RepliesIcon />
        </div>
      </div>
      {user._id.$oid === reply.user_id.$oid ? (
        <div className="admin__edit">
          <span className="edit" onClick={() => setEdit(true)}>
            <Edit />
          </span>
          <span
            className="delete"
            onClick={(e) => {
              if (user.logged) deleteHandler(reply);
              e.stopPropagation();
            }}
          >
            <Delete />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Replys;
