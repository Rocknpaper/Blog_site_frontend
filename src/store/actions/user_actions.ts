import axios from "../../axios";
import { ActionTypes } from "./actionTypes";

const authSuccess = (obj: {
  _id: {
    $oid: string;
  };
  jwt: string;
  username: string;
  email: string;
  user_avatar: string;
}) => {
  localStorage.setItem("jwt", obj.jwt);
  localStorage.setItem(
    "expiresIn",
    (new Date().getTime() + 86400 * 1000).toString()
  );
  localStorage.setItem("user_id", obj._id.$oid);
  localStorage.setItem("username", obj.username);
  localStorage.setItem("email", obj.email);
  localStorage.setItem("userAvatar", obj.user_avatar);
  return {
    type: ActionTypes.AUTH_SUCCESS,
    ...obj,
  };
};

const authFailiure = (error: {
  error_type: number;
  email: string;
  password: string;
}) => {
  return {
    type: ActionTypes.AUTH_FAILURE,
    error: {
      ...error,
    },
  };
};

export const redirectUrl = (url: string) => {
  return {
    type: ActionTypes.REDIRECT_URL,
    url: url,
  };
};

export const loginAsync = (
  obj: { email: string; password: string },
  cb: Function = () => {}
) => {
  return (dispatch: any) => {
    axios
      .post("/auth/user", {
        email: obj.email,
        password: obj.password,
      })
      .then((data) => {
        dispatch(authSuccess(data.data));
        cb();
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          authFailiure({
            error_type: e.response.status,
            ...obj,
          })
        );
      });
  };
};

const registerFail = (error: {
  error_type: number;
  cause: string;
  email: string;
  password: string;
}) => {
  return {
    type: ActionTypes.REGISTRATION_ERROR,
    error: {
      ...error,
    },
  };
};

export const userRegister = (
  obj: {
    username: string;
    email: string;
    password: string;
  },
  file: File | null,
  cb: Function = () => {}
) => {
  return (dispatch: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    formData.append("file", file as Blob);

    axios
      .post("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          if (res.data.cause) {
            dispatch(
              registerFail({
                error_type: 201,
                cause: res.data.cause,
                email: "",
                password: "",
              })
            );
          }
        } else if (res.status === 200) {
          dispatch(resetError());
          cb();
        }
      })
      .catch((e) => console.log(e));
  };
};

export const tryAutoLogin = () => {
  return (dispatch: any) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      const user_id = localStorage.getItem("user_id");
      let time = localStorage.getItem("expiresIn");
      const expiresIn = time ? new Date(+time) : new Date();
      const user_avatar = localStorage.getItem("userAvatar");
      console.log(expiresIn, new Date());
      if (expiresIn > new Date()) {
        dispatch(
          authSuccess({
            _id: { $oid: user_id ? user_id : "" },
            user_avatar: user_avatar ? user_avatar : "",
            username: username ? username : "",
            email: email ? email : "",
            jwt: jwt,
          })
        );
      } else {
        dispatch(logOutUser());
      }
    } else {
      dispatch(logOutUser());
    }
  };
};

export const resetError = () => {
  return {
    type: ActionTypes.RESET_ERROR,
  };
};

export const logOutUser = (cb: Function = () => {}) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("user_id");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("userAvatar");
  cb();
  return {
    type: ActionTypes.LOGOUT_USER,
  };
};
