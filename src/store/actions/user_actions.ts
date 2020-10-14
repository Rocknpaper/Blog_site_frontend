import axios from "../../axios";
import { ActionTypes } from "./actionTypes";

const initUser = (obj: {
  _id: {
    $oid: string;
  };
  jwt: string;
  username: string;
  email: string;
  user_avatar: string;
}) => {
  return {
    type: ActionTypes.USER_INIT,
    ...obj,
  };
};

export const redirectUrl = (url: string) => {
  return {
    type: ActionTypes.REDIRECT_URL,
    url: url,
  };
};

export const initUserAsync = (
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
        dispatch(initUser(data.data));
        localStorage.setItem("jwt", data.data.jwt);
        cb();
      })
      .catch((e) => console.log(e));
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
        if (res.status === 200) cb();
      })
      .catch((e) => console.log(e));
  };
};

export const logOutUser = (cb: Function = () => {}) => {
  localStorage.removeItem("jwt");
  cb();
  return {
    type: ActionTypes.LOGOUT_USER,
  };
};
