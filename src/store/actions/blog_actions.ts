import { Blogs } from "../../models";
import { ActionTypes } from "./actionTypes";
import axios from "../../axios";

const addBlogPosts = (blogs: Array<Blogs>) => {
  return {
    type: ActionTypes.INIT_POSTS,
    blogs: blogs,
  };
};

const addUserPosts = (blogs: Blogs[]) => {
  return {
    type: ActionTypes.USER_POSTS,
    blogs: blogs,
  };
};

export const addPost = (blog: Blogs, cb: Function = () => {}) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .post(
        "/blog",
        {
          title: blog.title,
          content: blog.content,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        cb();
      })
      .catch((e) => console.log(e));
  };
};
export const initBlogs = (cb: Function = () => {}) => {
  return (dispatch: any) => {
    axios
      .get<Blogs[]>("/blogs")
      .then((data) => {
        dispatch(addBlogPosts(data.data));
        cb();
      })
      .catch((e) => console.log(e));
  };
};

const upVote = (blog_id: string) => {
  return {
    type: ActionTypes.UPVOTE,
    blog_id: blog_id,
  };
};

export const upVoteAsync = (blog_id: string) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(`/upvote/${blog_id}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) =>
        res.status === 200 ? dispatch(upVote(blog_id)) : console.log("error")
      )
      .catch((e) => console.log(e));
  };
};

const downVote = (blog_id: string) => {
  return {
    type: ActionTypes.DOWNVOTE,
    blog_id: blog_id,
  };
};

export const downVoteAsync = (blog_id: string) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(`/downvote/${blog_id}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) =>
        res.status === 200 ? dispatch(downVote(blog_id)) : console.log("error")
      )
      .catch((e) => console.log(e));
  };
};

export const getUserPostAsync = () => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");

    axios
      .get("/user-blog", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(addUserPosts(res.data));
      })
      .catch((e) => console.log(e));
  };
};

const deletePosts = (blog_id: string) => {
  return {
    type: ActionTypes.DELETE_POST,
    blog_id: blog_id,
  };
};

export const deleteUserPostAsync = (blog_id: string) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");

    axios
      .delete(`/blog/${blog_id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        dispatch(deletePosts(blog_id));
      })
      .catch((e) => console.log(e));
  };
};

const editPosts = (blog_id: string, title: string, content: string) => {
  return {
    type: ActionTypes.EDIT_POST,
    blog_id: blog_id,
    title: title,
    content: content,
  };
};

export const editUserPostAsync = (
  blog_id: string,
  title: string,
  content: string,
  cb: Function = () => {}
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);

    axios
      .patch(
        `/blog/${blog_id}`,
        { title: title, content: content },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(editPosts(blog_id, title, content));
          cb();
        }
      })
      .catch((e) => console.log(e));
  };
};
