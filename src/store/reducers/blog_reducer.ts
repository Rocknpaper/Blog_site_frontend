import { BlogState } from "../../models";
import { Reducer } from "redux";
import { ActionTypes } from "../actions/actionTypes";
import { Action, VoteAction } from "../../models/index";
import { updateBlogs, updateComments } from "../utility";

const initPosts = (state: BlogState, action: Action) => {
  const newState: BlogState = {
    ...state,
    blogs: updateBlogs(state.blogs, action.blogs),
    loading: false,
  };
  return newState;
};

const upVotesInc = (state: BlogState, action: VoteAction) => {
  const index = state.blogs.findIndex((data) => {
    return data._id?.$oid === action.blog_id;
  });
  const newState: BlogState = {
    ...state,
    blogs: [...state.blogs],
  };
  newState.blogs[index].upvotes.users.push({ $oid: action.user_id });
  newState.blogs[index].upvotes.count = newState.blogs[index].upvotes.count + 1;
  return newState;
};

const upVotesDec = (state: BlogState, action: VoteAction) => {
  const index = state.blogs.findIndex((data) => {
    return data._id?.$oid === action.blog_id;
  });
  const newState: BlogState = {
    ...state,
    blogs: [...state.blogs],
  };
  newState.blogs[index].upvotes.users = newState.blogs[
    index
  ].upvotes.users.filter((data) => {
    return data.$oid !== action.user_id;
  });
  newState.blogs[index].upvotes.count =
    newState.blogs[index].upvotes.count === 0
      ? newState.blogs[index].upvotes.count
      : newState.blogs[index].upvotes.count - 1;
  return newState;
};

const downVotesInc = (state: BlogState, action: VoteAction) => {
  const index = state.blogs.findIndex((data) => {
    return data._id?.$oid === action.blog_id;
  });
  const newState: BlogState = {
    ...state,
    blogs: [...state.blogs],
  };
  newState.blogs[index].downvotes.users.push({ $oid: action.user_id });

  newState.blogs[index].downvotes.count =
    newState.blogs[index].downvotes.count + 1;
  return newState;
};

const downVotesDec = (state: BlogState, action: VoteAction) => {
  const index = state.blogs.findIndex((data) => {
    return data._id?.$oid === action.blog_id;
  });
  const newState: BlogState = {
    ...state,
    blogs: [...state.blogs],
  };
  newState.blogs[index].downvotes.users = newState.blogs[
    index
  ].downvotes.users.filter((data) => {
    return data.$oid !== action.user_id;
  });
  newState.blogs[index].downvotes.count =
    newState.blogs[index].downvotes.count === 0
      ? newState.blogs[index].downvotes.count
      : newState.blogs[index].downvotes.count - 1;
  return newState;
};

const userPosts = (state: BlogState, action: any) => {
  const newState: BlogState = {
    ...state,
    blogs: action.blogs,
  };
  return newState;
};

const deletePost = (state: BlogState, action: any) => {
  const newState = { ...state };

  newState.blogs = newState.blogs.filter((data) => {
    return data._id?.$oid !== action.blog_id;
  });
  return newState;
};

const editPost = (state: BlogState, action: any) => {
  const newState = { ...state };

  const index = newState.blogs.findIndex(
    (data) => data._id?.$oid === action.blog_id
  );
  newState.blogs[index].title = action.title;
  newState.blogs[index].content = action.content;

  return newState;
};

const getUserData = (state: BlogState, action: any) => {
  const newState: BlogState = { ...state, user: { ...action.user } };
  return newState;
};

const resetData = (state: BlogState, action: any) => {
  return {
    ...state,
    user: {
      user_avatar: "",
      username: "",
      email: "",
      _id: {
        $oid: "",
      },
    },
    comments: [],
    loading: false,
  } as BlogState;
};

const getComments = (state: BlogState, action: any) => {
  return {
    ...state,
    comments: updateComments(state.comments, action.comments),
  };
};

const initialState: BlogState = {
  blogs: [],
  user: {
    user_avatar: "",
    username: "",
    email: "",
    _id: {
      $oid: "",
    },
  },
  comments: [],
  replyTo: {
    _id: {
      $oid: "",
    },
    username: "",
    user_id: {
      $oid: "",
    },
    created_at: { $date: new Date() },
    blog_id: { $oid: "" },
    replies: [],
    likes: {
      users: [],
      count: 0,
    },
    dislikes: {
      users: [],
      count: 0,
    },
    content: "",
  },
  reply: false,
  edit: false,
  loading: false,
};

const commentsUpdate = (state: BlogState, action: any) => {
  return {
    ...state,
    comments: updateComments(state.comments, action.comments),
  };
};

const commentLikeInc = (state: BlogState, action: any) => {
  const index = state.comments.findIndex((data) => {
    return data._id?.$oid === action.comment_id;
  });

  const newState: BlogState = {
    ...state,
    comments: [...state.comments],
  };
  newState.comments[index].likes.users.push({ $oid: action.user_id });

  newState.comments[index].likes.count =
    newState.comments[index].likes.count + 1;
  return newState;
};

const commentLikeDec = (state: BlogState, action: any) => {
  const index = state.comments.findIndex((data) => {
    return data._id?.$oid === action.comment_id;
  });

  const newState: BlogState = {
    ...state,
    comments: [...state.comments],
  };

  newState.comments[index].likes.users = newState.comments[
    index
  ].likes.users.filter((data) => {
    return data.$oid !== action.user_id;
  });

  newState.comments[index].likes.count =
    newState.comments[index].likes.count - 1;
  return newState;
};

const commentDislikeInc = (state: BlogState, action: any) => {
  const index = state.comments.findIndex((data) => {
    return data._id?.$oid === action.comment_id;
  });

  const newState: BlogState = {
    ...state,
    comments: [...state.comments],
  };
  newState.comments[index].dislikes.users.push({ $oid: action.user_id });

  newState.comments[index].dislikes.count =
    newState.comments[index].dislikes.count + 1;
  return newState;
};

const commentDislikeDec = (state: BlogState, action: any) => {
  const index = state.comments.findIndex((data) => {
    return data._id?.$oid === action.comment_id;
  });

  console.log(index);

  const newState: BlogState = {
    ...state,
    comments: [...state.comments],
  };

  newState.comments[index].dislikes.users = newState.comments[
    index
  ].dislikes.users.filter((data) => {
    return data.$oid !== action.user_id;
  });

  newState.comments[index].dislikes.count =
    newState.comments[index].dislikes.count - 1;
  return newState;
};

const replyDislikeInc = (state: BlogState, action: any) => {
  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  const replyIndex = state.comments[commentIndex].replies.findIndex(
    (reply) => reply._id.$oid === action.reply_id
  );

  const newState: BlogState = {
    ...state,
  };

  newState.comments[commentIndex].replies[replyIndex].dislikes.users.push({
    $oid: action.user_id,
  });
  newState.comments[commentIndex].replies[replyIndex].dislikes.count =
    newState.comments[commentIndex].replies[replyIndex].dislikes.count + 1;

  return newState;
};

const replyDislikeDec = (state: BlogState, action: any) => {
  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  const replyIndex = state.comments[commentIndex].replies.findIndex(
    (reply) => reply._id.$oid === action.reply_id
  );

  const newState: BlogState = {
    ...state,
  };

  newState.comments[commentIndex].replies[
    replyIndex
  ].dislikes.users = newState.comments[commentIndex].replies[
    replyIndex
  ].dislikes.users.filter((u) => {
    return u.$oid !== action.user_id;
  });
  newState.comments[commentIndex].replies[replyIndex].dislikes.count =
    newState.comments[commentIndex].replies[replyIndex].dislikes.count - 1;

  return newState;
};

const replyLikeInc = (state: BlogState, action: any) => {
  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  const replyIndex = state.comments[commentIndex].replies.findIndex(
    (reply) => reply._id.$oid === action.reply_id
  );

  const newState: BlogState = {
    ...state,
  };

  newState.comments[commentIndex].replies[replyIndex].likes.users.push({
    $oid: action.user_id,
  });
  newState.comments[commentIndex].replies[replyIndex].likes.count =
    newState.comments[commentIndex].replies[replyIndex].likes.count + 1;

  return newState;
};

const replyLikeDec = (state: BlogState, action: any) => {
  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  const replyIndex = state.comments[commentIndex].replies.findIndex(
    (reply) => reply._id.$oid === action.reply_id
  );

  const newState: BlogState = {
    ...state,
  };

  newState.comments[commentIndex].replies[
    replyIndex
  ].likes.users = newState.comments[commentIndex].replies[
    replyIndex
  ].likes.users.filter((u) => {
    console.log(action.user_id);
    return u.$oid !== action.user_id;
  });
  newState.comments[commentIndex].replies[replyIndex].likes.count =
    newState.comments[commentIndex].replies[replyIndex].likes.count - 1;

  return newState;
};

const deleteComments = (state: BlogState, action: any) => {
  const newState = {
    ...state,
  };
  newState.comments = newState.comments.filter(
    (comment) => comment._id.$oid !== action.comment_id
  );

  return newState;
};

const deleteReply = (state: BlogState, action: any) => {
  const newState = {
    ...state,
  };

  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  if (commentIndex >= 0) {
    newState.comments[commentIndex].replies = newState.comments[
      commentIndex
    ].replies.filter((reply) => reply._id.$oid !== action.reply_id);
  }

  return newState;
};

const commentReply = (state: BlogState, action: any) => {
  const newState = {
    ...state,
  };

  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  newState.comments[commentIndex].replies.push({ ...action.reply });
  return newState;
};

const setReplyTo = (state: BlogState, action: any) => {
  const newState: BlogState = {
    ...state,
    replyTo: action.replyTo,
    reply: true,
  };
  return newState;
};

const resetReply = (state: BlogState, action: any) => {
  const newState: BlogState = {
    ...state,
    replyTo: {
      _id: {
        $oid: "",
      },
      username: "",
      user_id: {
        $oid: "",
      },
      created_at: { $date: new Date() },
      blog_id: { $oid: "" },
      replies: [],
      likes: {
        users: [],
        count: 0,
      },
      dislikes: {
        users: [],
        count: 0,
      },
      content: "",
    },
    reply: false,
  };
  return newState;
};

const updateComment = (state: BlogState, action: any) => {
  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  const newState: BlogState = {
    ...state,
  };

  newState.comments[commentIndex] = {
    ...newState.comments[commentIndex],
    content: action.content,
  };
  return newState;
};

const updateReply = (state: BlogState, action: any) => {
  const commentIndex = state.comments.findIndex(
    (comment) => comment._id.$oid === action.comment_id
  );

  const replyIndex = state.comments[commentIndex].replies.findIndex(
    (reply) => reply._id.$oid === action.reply_id
  );

  const newState: BlogState = {
    ...state,
  };

  newState.comments[commentIndex].replies[replyIndex] = {
    ...newState.comments[commentIndex].replies[replyIndex],
    content: action.content,
  };
  return newState;
};

const setLoading = (state: BlogState, action: any) => {
  const newState: BlogState = {
    ...state,
    loading: true,
  };
  return newState;
};

const getUserBlog = (state: BlogState, action: any) => {
  return {
    ...state,
    user: {
      ...state.user,
      blogs: action.blogs,
    },
  } as BlogState;
};

export const blogsReducer: Reducer<BlogState, Action> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ActionTypes.INIT_POSTS: {
      return initPosts(state, action);
    }

    case ActionTypes.UPVOTEINC: {
      return upVotesInc(state, action);
    }

    case ActionTypes.UPVOTEDEC: {
      return upVotesDec(state, action);
    }

    case ActionTypes.DOWNVOTEINC: {
      return downVotesInc(state, action);
    }

    case ActionTypes.DOWNVOTEDEC: {
      return downVotesDec(state, action);
    }

    case ActionTypes.USER_POSTS: {
      return userPosts(state, action);
    }

    case ActionTypes.DELETE_POST: {
      return deletePost(state, action);
    }

    case ActionTypes.EDIT_POST: {
      return editPost(state, action);
    }

    case ActionTypes.BLOG_USER: {
      return getUserData(state, action);
    }

    case ActionTypes.RESET_USER_BLOG: {
      return resetData(state, action);
    }

    case ActionTypes.GET_COMMENTS: {
      return getComments(state, action);
    }

    case ActionTypes.POST_COMMENT: {
      return commentsUpdate(state, action);
    }

    case ActionTypes.COMMENT_LIKE_INC: {
      return commentLikeInc(state, action);
    }

    case ActionTypes.COMMENT_LIKE_DEC: {
      return commentLikeDec(state, action);
    }

    case ActionTypes.COMMENT_DISLIKE_INC: {
      return commentDislikeInc(state, action);
    }

    case ActionTypes.COMMENT_DISLIKE_DEC: {
      return commentDislikeDec(state, action);
    }

    case ActionTypes.REPLY_DISLIKE_INC: {
      return replyDislikeInc(state, action);
    }

    case ActionTypes.REPLY_DISLIKE_DEC: {
      return replyDislikeDec(state, action);
    }

    case ActionTypes.REPLY_LIKE_INC: {
      return replyLikeInc(state, action);
    }

    case ActionTypes.REPLY_LIKE_DEC: {
      return replyLikeDec(state, action);
    }

    case ActionTypes.DELETE_COMMENTS: {
      return deleteComments(state, action);
    }

    case ActionTypes.DELETE_REPLY: {
      return deleteReply(state, action);
    }

    case ActionTypes.COMMENT_REPLY: {
      return commentReply(state, action);
    }

    case ActionTypes.SET_REPLY: {
      return setReplyTo(state, action);
    }

    case ActionTypes.RESET_REPLY: {
      return resetReply(state, action);
    }

    case ActionTypes.UPDATE_COMMENT: {
      return updateComment(state, action);
    }

    case ActionTypes.UPDATE_REPLY: {
      return updateReply(state, action);
    }

    case ActionTypes.SET_LOADING: {
      return setLoading(state, action);
    }

    case ActionTypes.GET_USER_BLOG: {
      return getUserBlog(state, action);
    }

    default:
      return state;
  }
};
