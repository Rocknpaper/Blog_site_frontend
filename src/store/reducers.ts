import {BlogState } from "../models";
import { Reducer } from "redux";
import { ActionTypes } from "./actionTypes";
import { Action } from "../models/index";
import { updateBlogs } from "./utility";

const addPosts = (state: BlogState, action: Action) =>{
    const newState:BlogState = {
        blogs: updateBlogs(state.blogs, action.blogs)
    }
    return newState
}


const initialState:BlogState = {
    blogs: []
}

export const blogsReducer: Reducer<BlogState, Action> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ADD_POSTS: {
      return addPosts(state, action);
    }

    default:
      return state;
  }
};
