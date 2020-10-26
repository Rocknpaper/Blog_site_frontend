import React, { useEffect } from "react";
import "./UserPage.css";
import { useParams, useHistory } from "react-router-dom";
import {
  userDataAsync,
  getUserBlogAsync,
} from "../../store/actions/blog_actions";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType, BlogState } from "../../models";
import Label from "../../components/UI/Label/Label";
import { Avatar } from "@material-ui/core";
import SinglePost from "../../components/SinglePost/SinglePost";

interface Params {
  id: string;
}

const UserPage: React.FC = () => {
  const { id } = useParams<Params>();
  const blog = useSelector<ReducersType, BlogState>((state) => state.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDataAsync(id));
    dispatch(getUserBlogAsync(id));
  }, []);

  const history = useHistory();

  return (
    <div className="userDetails">
      <Avatar src={blog.user.user_avatar} />
      <Label text="Username" onClick={() => {}} />
      <p>{blog.user.username}</p>
      <Label text="Email" onClick={() => {}} />
      <p className="seprator">{blog.user.email}</p>
      {blog.user.blogs
        ? blog.user.blogs.map((post) => {
            return (
              <SinglePost
                key={post._id?.$oid}
                title={post.title}
                author={post.username ? post.username : ""}
                upVote={post.upvotes.count}
                downVote={post.downvotes.count}
                date={post.created_at?.$date}
                onClick={() => history.push(`/explore/blog/${post._id?.$oid}`)}
              />
            );
          })
        : null}
    </div>
  );
};

export default UserPage;
