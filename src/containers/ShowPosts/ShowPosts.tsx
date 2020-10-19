import React, { useEffect } from "react";
import "./ShowPosts.css";
import SinglePost from "../../components/SinglePost/SinglePost";
import { useSelector, useDispatch } from "react-redux";
import { ReducersType } from "../../models";
import * as blogActions from "../../store/actions/blog_actions";
import { redirectUrl } from "../../store/actions/user_actions";
import { useHistory } from "react-router-dom";
import QuickPost from "../Feed/QuickPost/QuickPost";

const ShowPosts: React.FC = () => {
  const { blog, user } = useSelector<ReducersType, ReducersType>(
    (state) => state
  );
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!user.logged) {
      dispatch(redirectUrl("/show-posts"));
      return history.push("/auth");
    }
    dispatch(blogActions.getUserPostAsync());
  }, []);

  const res =
    blog.blogs.length <= 0 ? (
      <QuickPost />
    ) : (
      blog.blogs.map((data) => (
        <SinglePost
          key={data._id?.$oid}
          title={data.title}
          author={data.username ? data.username : ""}
          date={data.created_at?.$date}
          upVote={data.upvotes.count}
          downVote={data.downvotes.count}
          editable={true}
          onDeleteClick={() =>
            dispatch(
              blogActions.deleteUserPostAsync(data._id ? data._id?.$oid : "")
            )
          }
          onEditClick={() => history.push(`/show-post/${data._id?.$oid}`)}
          onClick={() => {}}
        />
      ))
    );

  return (
    <div className="showPosts">{user.logged ? res : "No posts Found"}</div>
  );
};

export default ShowPosts;
