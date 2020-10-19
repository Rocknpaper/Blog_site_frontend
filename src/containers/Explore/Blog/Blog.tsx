import React, { useState, ChangeEvent, useEffect } from "react";
import "./Blog.css";
import { useParams, useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Comments from "../../../components/Comments/Comments";
import { ReducersType } from "../../../models";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Blogs } from "../../../models/index";
import {
  userDataAsync,
  resetUserData,
} from "../../../store/actions/blog_actions";

interface ParamsType {
  type: string;
  id: string;
}

const Blog: React.FC = () => {
  const { type, id } = useParams<ParamsType>();
  const [comment, setComment] = useState("");

  const state = useSelector<ReducersType, ReducersType>(
    (state) => state,
    shallowEqual
  );
  const dispatch = useDispatch();

  const history = useHistory();
  const [post, setPost] = useState<Blogs>({
    title: "",
    content: "",
    upvotes: {
      count: 0,
      users: [],
    },
    downvotes: {
      count: 0,
      users: [],
    },
  });

  const resetValue = () => {
    setComment("");
  };

  useEffect(() => {
    if (type === "blog" && id) {
      const blog = state.blog.blogs.find((post) => post._id?.$oid === id);
      if (blog && blog.user_id) {
        setPost(blog);
        dispatch(userDataAsync(blog.user_id));
      } else {
        history.push("/");
      }
    }

    return () => {
      if (type === "blog" && id) {
        dispatch(resetUserData());
      }
    };
  }, []);

  const commentOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setComment(val);
  };

  return (
    <div className="blog">
      <div className="post">
        <div className="blog__header">
          <h1>{post.title}</h1>
          <h3>
            {new Date(post.created_at ? post.created_at.$date : "").toString()}
          </h3>
        </div>
        <div className="content">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="post__user-details">
        <h3>Written by</h3>
        <Avatar src={state.blog.user.user_avatar} />
        <h2>{state.blog.user.username}</h2>
      </div>
      <hr />
      <Comments
        resetComment={resetValue}
        blog_id={id}
        show={state.user.logged}
        value={comment}
        onChange={commentOnChange}
      />
    </div>
  );
};

export default Blog;
