import { UserDetails, CommentType, Reply, Blogs } from "../../models";
import { ActionTypes } from "./actionTypes";
import axios from "../../axios";

type incOrDec = "inc" | "dec";

export const setLoading = () => {
  return {
    type: ActionTypes.SET_LOADING,
  };
};

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

const upVoteInc = (blog_id: string, user_id: string) => {
  return {
    type: ActionTypes.UPVOTEINC,
    blog_id: blog_id,
    user_id: user_id,
  };
};

const upVoteDec = (blog_id: string, user_id: string) => {
  return {
    type: ActionTypes.UPVOTEDEC,
    blog_id: blog_id,
    user_id: user_id,
  };
};

export const upVoteAsync = (
  blog_id: string,
  user_id: string,
  type: incOrDec,
  cb: Function = () => {}
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(`/upvote/${type}/${blog_id}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        res.status === 200
          ? type === "inc"
            ? dispatch(upVoteInc(blog_id, user_id))
            : dispatch(upVoteDec(blog_id, user_id))
          : console.log("error");
        cb();
      })
      .catch((e) => console.log(e));
  };
};

const downVoteInc = (blog_id: string, user_id: string) => {
  return {
    type: ActionTypes.DOWNVOTEINC,
    blog_id: blog_id,
    user_id: user_id,
  };
};

const downVoteDec = (blog_id: string, user_id: string) => {
  return {
    type: ActionTypes.DOWNVOTEDEC,
    blog_id: blog_id,
    user_id: user_id,
  };
};

export const downVoteAsync = (
  blog_id: string,
  user_id: string,
  type: incOrDec,
  cb: Function = () => {}
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(`/downvote/${type}/${blog_id}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        res.status === 200
          ? type === "inc"
            ? dispatch(downVoteInc(blog_id, user_id))
            : dispatch(downVoteDec(blog_id, user_id))
          : console.log("error");
        cb();
      })
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

const userData = (user: UserDetails) => {
  return {
    type: ActionTypes.BLOG_USER,
    user: user,
  };
};

export const userDataAsync = (user_id: string) => {
  return (dispatch: any) => {
    axios
      .get(`/user/${user_id}`)
      .then((res) => {
        dispatch(userData(res.data));
      })
      .catch((e) => console.log(e));
  };
};

export const resetUserData = () => {
  return {
    type: ActionTypes.RESET_USER_BLOG,
  };
};

const commentUpdate = (comments: CommentType) => {
  return {
    type: ActionTypes.POST_COMMENT,
    comments: [comments],
  };
};

export const postComment = (
  obj: {
    user_id: string;
    username: string;
    content: string;
    blog_id: string;
  },
  cb: Function = () => {}
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");

    axios
      .post("/comment", obj, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200)
          dispatch(
            commentUpdate({
              _id: {
                $oid: res.data.id,
              },
              user_id: {
                $oid: obj.user_id,
              },
              created_at: {
                $date: new Date(),
              },
              blog_id: {
                $oid: obj.blog_id,
              },
              username: obj.username,
              content: obj.content,
              replies: [],
              likes: {
                users: [],
                count: 0,
              },
              dislikes: {
                users: [],
                count: 0,
              },
            })
          );
        cb();
      })
      .catch((e) => console.log(e));
  };
};

const getComments = (comments: CommentType) => {
  return {
    type: ActionTypes.GET_COMMENTS,
    comments: comments,
  };
};

export const getCommentsAsync = (blog_id: string) => {
  return (dispatch: any) => {
    axios
      .get(`/comment/${blog_id}`)
      .then((res) => {
        dispatch(getComments(res.data));
      })
      .catch((e) => console.log(e));
  };
};

const commentLikeInc = (comment_id: string, user_id: string) => {
  return {
    type: ActionTypes.COMMENT_LIKE_INC,
    comment_id: comment_id,
    user_id: user_id,
  };
};

const commentLikeDec = (comment_id: string, user_id: string) => {
  return {
    type: ActionTypes.COMMENT_LIKE_DEC,
    comment_id: comment_id,
    user_id: user_id,
  };
};

export const patchCommentLike = (
  comment_id: string,
  user_id: string,
  patch_type: incOrDec
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(
        `/like/${patch_type}/${comment_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        patch_type === "inc"
          ? dispatch(commentLikeInc(comment_id, user_id))
          : dispatch(commentLikeDec(comment_id, user_id));
        console.log(res);
      })
      .catch((e) => console.log(e));
  };
};

const commentDislikeInc = (comment_id: string, user_id: string) => {
  return {
    type: ActionTypes.COMMENT_DISLIKE_INC,
    comment_id: comment_id,
    user_id: user_id,
  };
};

const commentDislikeDec = (comment_id: string, user_id: string) => {
  return {
    type: ActionTypes.COMMENT_DISLIKE_DEC,
    comment_id: comment_id,
    user_id: user_id,
  };
};

export const patchCommentDislike = (
  comment_id: string,
  user_id: string,
  patch_type: incOrDec
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(
        `/dislike/${patch_type}/${comment_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        patch_type === "inc"
          ? dispatch(commentDislikeInc(comment_id, user_id))
          : dispatch(commentDislikeDec(comment_id, user_id));
        console.log(res);
      })
      .catch((e) => console.log(e));
  };
};

const replyDislikeInc = (
  comment_id: string,
  reply_id: string,
  user_id: string
) => {
  return {
    type: ActionTypes.REPLY_DISLIKE_INC,
    comment_id: comment_id,
    reply_id: reply_id,
    user_id: user_id,
  };
};

const replyDislikeDec = (
  comment_id: string,
  reply_id: string,
  user_id: string
) => {
  return {
    type: ActionTypes.REPLY_DISLIKE_DEC,
    comment_id: comment_id,
    reply_id: reply_id,
    user_id: user_id,
  };
};

export const patchReplyDislike = (
  comment_id: string,
  reply_id: string,
  user_id: string,
  patch_type: incOrDec
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");

    axios
      .patch(
        `/reply/dislike/${patch_type}/${comment_id}/${reply_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) =>
        res.status === 200
          ? patch_type === "inc"
            ? dispatch(replyDislikeInc(comment_id, reply_id, user_id))
            : dispatch(replyDislikeDec(comment_id, reply_id, user_id))
          : console.log(res)
      )
      .catch((e) => console.log(e));
  };
};

const replyLikeInc = (
  comment_id: string,
  reply_id: string,
  user_id: string
) => {
  return {
    type: ActionTypes.REPLY_LIKE_INC,
    comment_id: comment_id,
    reply_id: reply_id,
    user_id: user_id,
  };
};

const replyLikeDec = (
  comment_id: string,
  reply_id: string,
  user_id: string
) => {
  return {
    type: ActionTypes.REPLY_LIKE_DEC,
    comment_id: comment_id,
    reply_id: reply_id,
    user_id: user_id,
  };
};

export const patchReplyLike = (
  comment_id: string,
  reply_id: string,
  user_id: string,
  patch_type: incOrDec
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");

    axios
      .patch(
        `/reply/like/${patch_type}/${comment_id}/${reply_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) =>
        res.status === 200
          ? patch_type === "inc"
            ? dispatch(replyLikeInc(comment_id, reply_id, user_id))
            : dispatch(replyLikeDec(comment_id, reply_id, user_id))
          : console.log(res)
      )
      .catch((e) => console.log(e));
  };
};

const deleteComments = (comment_id: string) => {
  return {
    type: ActionTypes.DELETE_COMMENTS,
    comment_id: comment_id,
  };
};

export const deleteCommentAsync = (comment_id: string) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .delete(`/comment/${comment_id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) dispatch(deleteComments(comment_id));
      });
  };
};

const deleteReply = (comment_id: string, reply_id: string) => {
  return {
    type: ActionTypes.DELETE_REPLY,
    comment_id: comment_id,
    reply_id: reply_id,
  };
};

export const deleteReplyAsync = (comment_id: string, reply_id: string) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .delete(`/reply-comment/${comment_id}/${reply_id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteReply(comment_id, reply_id));
        }
      })
      .catch((e) => console.log(e));
  };
};

const postReply = (comment_id: string, reply: Reply) => {
  return {
    type: ActionTypes.COMMENT_REPLY,
    comment_id: comment_id,
    reply: reply,
  };
};

interface PostReply {
  username: string;
  user_id: string;
  content: string;
}

export const postReplyAsync = (comment_id: string, reply: PostReply) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .post(`/reply-comment/${comment_id}`, reply, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const c_reply: Reply = {
            ...reply,
            user_id: {
              $oid: reply.user_id,
            },
            _id: {
              $oid: res.data.id,
            },
            created_at: {
              $date: new Date(),
            },
            likes: {
              users: [],
              count: 0,
            },
            dislikes: {
              users: [],
              count: 0,
            },
          };
          console.log(comment_id);
          dispatch(postReply(comment_id, c_reply));
        }
      });
  };
};

export const setReplyTo = (replyTo: CommentType) => {
  return {
    type: ActionTypes.SET_REPLY,
    replyTo: replyTo,
  };
};

export const resetReplyTo = () => {
  return {
    type: ActionTypes.RESET_REPLY,
  };
};

const updateComment = (comment_id: string, content: string) => {
  return {
    type: ActionTypes.UPDATE_COMMENT,
    comment_id: comment_id,
    content: content,
  };
};

const updateReply = (comment_id: string, reply_id: string, content: string) => {
  return {
    type: ActionTypes.UPDATE_REPLY,
    comment_id: comment_id,
    reply_id: reply_id,
    content: content,
  };
};

export const updateCommentAsync = (comment_id: string, content: string) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(
        `/comment/${comment_id}`,
        {
          user_id: "placeholder",
          username: "placeholder",
          content: content,
          blog_id: "placeholder",
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateComment(comment_id, content));
        }
      });
  };
};

export const updateReplyAsync = (
  comment_id: string,
  reply_id: string,
  content: string
) => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .patch(
        `/reply-comment/${comment_id}/${reply_id}`,
        {
          user_id: "placeholder",
          username: "placeholder",
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateReply(comment_id, reply_id, content));
        }
      });
  };
};

const getUserBlog = (blogs: Blogs[]) => {
  return {
    type: ActionTypes.GET_USER_BLOG,
    blogs: blogs,
  };
};

export const getUserBlogAsync = (user_id: string) => {
  return (dispatch: any) => {
    axios
      .get(`/blog/user/${user_id}`)
      .then((res) => {
        if (res.status === 200) dispatch(getUserBlog(res.data));
      })
      .catch((e) => console.log(e));
  };
};
