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
  loading: false,
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
    error: undefined,
  } as UserState;
};

const redirectUrl = (state: UserState, action: any) => {
  const newState = updateState<UserState>(state, { redirect_url: action.url });
  return newState;
};

const logOutUser = (state: UserState, action: any) => {
  return initialState;
};

const authFailure = (state: UserState, action: any) => {
  const newState: UserState = {
    ...state,
    error: {
      ...action.error,
    },
  };
  return newState;
};

const resetError = (state: UserState, action: any) => {
  const newState: UserState = {
    ...state,
    error: undefined,
  };

  return newState;
};

const registerError = (state: UserState, action: any) => {
  const newState: UserState = {
    ...state,
    error: {
      ...action.error,
    },
  };
  return newState;
};

const resetPasswordSuccess = (state: UserState, action: any) => {
  return {
    ...state,
    resetPass: {
      reset: true,
      type: 0,
      cause: "",
    },
  } as UserState;
};

const resetPasswordFailure = (state: UserState, action: any) => {
  return {
    ...state,
    resetPass: {
      reset: false,
      type: action.error_type,
      cause: action.cause,
    },
  } as UserState;
};

const resetPasswordReset = (state: UserState, action: any) => {
  return {
    ...state,
    resetPass: undefined,
  } as UserState;
};

const userPatch = (state: UserState, action: any) => {
  return {
    ...state,
    ...action.user,
  } as UserState;
};

const forgetPass = (state: UserState, action: any) => {
  return {
    ...state,
    forgetPass: {
      email: action.email,
      send: true,
    },
  } as UserState;
};

const setForgetError = (state: UserState, action: any) => {
  return {
    ...state,
    error: {
      error_type: action.error_type,
      cause: action.cause,
      email: "",
      password: "",
    },
  } as UserState;
};

const setForgetSuccess = (state: UserState, action: any) => {
  return {
    ...state,
    forgetPass: {
      send: false,
      email: "",
      done: true,
    },
  } as UserState;
};

const resetForgetPass = (state: UserState, action: any) => {
  return {
    ...state,
    forgetPass: undefined,
  } as UserState;
};

export const userReducer: Reducer<UserState, any> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS: {
      return initUser(state, action);
    }
    case ActionTypes.AUTH_FAILURE: {
      return authFailure(state, action);
    }
    case ActionTypes.REDIRECT_URL: {
      return redirectUrl(state, action);
    }
    case ActionTypes.LOGOUT_USER: {
      return logOutUser(state, action);
    }

    case ActionTypes.RESET_ERROR: {
      return resetError(state, action);
    }

    case ActionTypes.REGISTRATION_ERROR: {
      return registerError(state, action);
    }

    case ActionTypes.RESET_PASSWORD_SUCCESS: {
      return resetPasswordSuccess(state, action);
    }

    case ActionTypes.RESET_PASSWORD_FAILURE: {
      return resetPasswordFailure(state, action);
    }

    case ActionTypes.RESET_ERROR_RS: {
      return resetPasswordReset(state, action);
    }

    case ActionTypes.PATCH_USER_DETAILS: {
      return userPatch(state, action);
    }

    case ActionTypes.FORGET_PASSWORD: {
      return forgetPass(state, action);
    }

    case ActionTypes.FORGET_PASSWORD_FAIL: {
      return setForgetError(state, action);
    }

    case ActionTypes.SET_FORGET_SUCCESS: {
      return setForgetSuccess(state, action);
    }

    case ActionTypes.RESET_FORGET_PASS: {
      return resetForgetPass(state, action);
    }

    default:
      return state;
  }
};
