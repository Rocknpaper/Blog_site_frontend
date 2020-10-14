import { Reducer } from "redux";
import { ActionTypes } from "../actions/actionTypes";
import { UserState } from "../../models/index";
import { updateState } from "../utility";
// import { updateState } from "../utility";

const initialState: UserState = {
  logged: false,
  _id: {
    $oid: "",
  },
  jwt: "",
  redirect_url: "/",
  username: "",
  email: "",
  user_avatar: "",
};

const initUser = (state: UserState, action: any) => {
  return {
    logged: true,
    jwt: action.jwt,
    redirect_url: "/",
    username: action.username,
    email: action.email,
    user_avatar: action.user_avatar,
    _id: action._id,
  };
};

const redirectUrl = (state: UserState, action: any) => {
  const newState = updateState<UserState>(state, { redirect_url: action.url });
  return newState;
};

const logOutUser = (state: UserState, action: any) => {
  return initialState;
}

export const userReducer: Reducer<UserState, any> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ActionTypes.USER_INIT: {
      return initUser(state, action);
    }
    case ActionTypes.REDIRECT_URL: {
      return redirectUrl(state, action);
    }
    case ActionTypes.LOGOUT_USER: {
      return logOutUser(state, action);
    }

    default:
      return state;
  }
};
