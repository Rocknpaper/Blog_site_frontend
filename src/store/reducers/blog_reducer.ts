import { BlogState } from "../../models";
import { Reducer } from "redux";
import { ActionTypes } from "../actions/actionTypes";
import { Action, VoteAction } from "../../models/index";
import { updateBlogs } from "../utility";

const initPosts = (state: BlogState, action: Action) => {
  const newState: BlogState = {
    blogs: updateBlogs(state.blogs, action.blogs),
  };
  return newState;
};

const upVotes = (state: BlogState, action: VoteAction) => {
  const index = state.blogs.findIndex((data) => {
    return data._id?.$oid === action.blog_id;
  });
  const newState: BlogState = {
    blogs: [...state.blogs],
  };
  newState.blogs[index].upvotes.count = newState.blogs[index].upvotes.count + 1;
  return newState;
};

const downVotes = (state: BlogState, action: VoteAction) => {
  const index = state.blogs.findIndex((data) => {
    return data._id?.$oid === action.blog_id;
  });
  const newState: BlogState = {
    blogs: [...state.blogs],
  };
  newState.blogs[index].downvotes.count =
    newState.blogs[index].downvotes.count + 1;
  return newState;
};

const userPosts = (state: BlogState, action: any) => {
  const newState: BlogState = {
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

const editPost =  (state: BlogState, action: any) => {
  const newState = {...state};

  const index = newState.blogs.findIndex(data => data._id?.$oid === action.blog_id);
  newState.blogs[index].title = action.title;
  newState.blogs[index].content = action.content;

  return newState;
}

const initialState: BlogState = {
  blogs: [],
};

export const blogsReducer: Reducer<BlogState, Action> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ActionTypes.INIT_POSTS: {
      return initPosts(state, action);
    }

    case ActionTypes.UPVOTE: {
      return upVotes(state, action);
    }

    case ActionTypes.DOWNVOTE: {
      return downVotes(state, action);
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

    default:
      return state;
  }
};
