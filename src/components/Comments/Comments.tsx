import React, { ChangeEvent, useEffect } from "react";
import "./Comments.css";
import Send from "@material-ui/icons/SendOutlined";
import Commenter from "./Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  postComment,
  getCommentsAsync,
  patchCommentLike,
  patchCommentDislike,
} from "../../store/actions/blog_actions";
import { ReducersType, CommentType } from "../../models";

interface PropsType {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  blog_id: string;
  resetComment: () => void;
}

const Comments: React.FC<PropsType> = ({
  value,
  onChange,
  show,
  blog_id,
  resetComment,
}) => {
  const { user, blog } = useSelector<ReducersType, ReducersType>(
    (state) => state,
    (cur, prev) => {
      return cur.blog.comments === prev.blog.comments;
    }
  );

  useEffect(() => {
    dispatch(getCommentsAsync(blog_id));
  }, []);

  const dispatch = useDispatch();

  const submitComment = (event: any) => {
    event.preventDefault();
    dispatch(
      postComment(
        {
          user_id: user._id.$oid,
          username: user.username,
          content: value,
          blog_id: blog_id,
        },
        resetComment
      )
    );
  };

  const up = (data: CommentType) => {
    const exist = data.likes.users.find((d) => d.$oid === user._id.$oid);
    return exist ? true : false;
  };

  const down = (data: CommentType) => {
    const exist = data.dislikes.users.find((d) => d.$oid === user._id.$oid);
    return exist ? true : false;
  };

  const likeHandler = (data: CommentType) => {
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
        dispatch(patchCommentDislike(data._id.$oid, user._id.$oid, "dec"));
      }
      dispatch(patchCommentLike(data._id.$oid, user._id.$oid, "inc"));
    }
  };

  const dislikeHandler = (data: CommentType) => {
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
        dispatch(patchCommentLike(data._id.$oid, user._id.$oid, "dec"));
      }
      dispatch(patchCommentDislike(data._id.$oid, user._id.$oid, "inc"));
    }
  };

  let allComments: JSX.Element | JSX.Element[] = <p>"No comments found"</p>;

  if (blog.comments.length > 0) {
    const comments = blog.comments.sort((a, b) => {
      let c = new Date(a.created_at.$date).getTime();
      let d = new Date(b.created_at.$date).getTime();
      return d - c;
    });

    allComments = comments.map((data) => {
      if (user.logged) {
        return (
          <Commenter
            key={data._id.$oid}
            comment={data}
            user_id={user._id.$oid}
            likeHandler={(e) => {
              likeHandler(data);
              e.stopPropagation();
            }}
            dislikeHandler={(e) => {
              dislikeHandler(data);
              e.stopPropagation();
            }}
            like={up(data)}
            dislike={down(data)}
          />
        );
      }
      return (
        <Commenter
          key={data._id.$oid}
          comment={data}
          user_id={user._id.$oid}
          like={up(data)}
          dislike={down(data)}
        />
      );
    });
  }

  return (
    <div className="comments">
      {show ? (
        <div className="comment__input">
          <input
            type="text"
            placeholder="Your Comment Here"
            value={value}
            onChange={onChange}
            onKeyUp={(e) => (e.key === "Enter" ? submitComment(e) : null)}
          />
          <span className="send__icon" onClick={submitComment}>
            <Send />
          </span>
        </div>
      ) : null}

      {allComments}
    </div>
  );
};

export default Comments;
