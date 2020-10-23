import React, { useEffect } from "react";
import "./Feed.css";
import { useDispatch, useSelector } from "react-redux";

import QuickPost from "./QuickPost/QuickPost";
import SinglePost from "../../components/SinglePost/SinglePost";
import { Blogs, ReducersType } from "../../models";
import * as actions from "../../store/actions/blog_actions";
import { useHistory } from "react-router-dom";

const Feed: React.FC = () => {
  const { user, blog } = useSelector<ReducersType, ReducersType>(
    (state) => state,
    (curr, prev) =>
      curr.user.logged === prev.user.logged &&
      curr.blog.blogs === prev.blog.blogs
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(actions.initBlogs());
  }, []);

  const upVoteHandler = (data: Blogs) => {
    let exist_up = false,
      exist_down = false;

    for (let i in data.upvotes.users) {
      if (exist_up) break;
      exist_up = data.upvotes.users[i].$oid === user._id.$oid;
    }

    for (let i in data.downvotes.users) {
      if (exist_down) break;
      exist_down = data.downvotes.users[i].$oid === user._id.$oid;
    }

    if (!exist_up) {
      if (exist_down) {
        dispatch(
          actions.downVoteAsync(
            data._id ? data._id.$oid : "",
            user._id.$oid,
            "dec"
          )
        );
      }
      dispatch(
        actions.upVoteAsync(data._id ? data._id.$oid : "", user._id.$oid, "inc")
      );
    }
  };

  const up = (data: Blogs) => {
    const exist = data.upvotes.users.find((d) => d.$oid === user._id.$oid);
    return exist ? true : false;
  };

  const down = (data: Blogs) => {
    const exist = data.downvotes.users.find((d) => d.$oid === user._id.$oid);
    return exist ? true : false;
  };

  const downVoteHandler = (data: Blogs) => {
    let exist_up = false,
      exist_down = false;

    for (let i in data.upvotes.users) {
      if (exist_up) break;
      exist_up = data.upvotes.users[i].$oid === user._id.$oid;
    }

    for (let i in data.downvotes.users) {
      if (exist_down) break;
      exist_down = data.downvotes.users[i].$oid === user._id.$oid;
    }

    if (!exist_down) {
      if (exist_up) {
        dispatch(
          actions.upVoteAsync(
            data._id ? data._id.$oid : "",
            user._id.$oid,
            "dec"
          )
        );
      }

      dispatch(
        actions.downVoteAsync(
          data._id ? data._id.$oid : "",
          user._id.$oid,
          "inc"
        )
      );
    }
  };

  const res =
    blog.blogs.length <= 0
      ? "No Posts Found"
      : blog.blogs.map((data) => (
          <SinglePost
            key={data._id?.$oid}
            title={data.title}
            author={data.username ? data.username : ""}
            date={data.created_at?.$date}
            upVote={data.upvotes.count}
            downVote={data.downvotes.count}
            onUpvoteClick={(e: any) => {
              if (user.logged) upVoteHandler(data);
              e.stopPropagation();
            }}
            onDownvoteClick={(e: any) => {
              if (user.logged) downVoteHandler(data);
              e.stopPropagation();
            }}
            onClick={() => {
              history.push(`/explore/blog/${data._id?.$oid}`);
            }}
            up={up(data)}
            down={down(data)}
          />
        ));

  return (
    <div className="feed">
      {user.logged ? (
        <QuickPost onClick={() => history.push("/create-post")} />
      ) : null}
      <div className="feed__posts"> {res} </div>
    </div>
  );
};

export default React.memo(Feed);
