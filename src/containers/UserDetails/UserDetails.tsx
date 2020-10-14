import React, { useEffect, useState, ChangeEvent } from "react";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Label from "../../components/UI/Label/Label";
import "./UserDetails.css";
import { ReducersType, UserState } from "../../models/index";
import { useSelector, useDispatch } from "react-redux";
import Edit from "@material-ui/icons/EditOutlined";
import { useHistory } from "react-router-dom";

const UserDetails: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector<ReducersType, UserState>(
    (state) => state.user,
    (state) => state === state
  );

  const [state, setState] = useState({
    username: {
      value: "",
      edit: false,
    },
    email: {
      value: "",
      edit: false,
    },
  });

  useEffect(() => {
    if (!user.logged) {
      history.push("/auth");
    }

    setState((prev) => {
      return {
        username: { ...prev.username, value: user.username },
        email: { ...prev.email, value: user.email },
      };
    });
  }, []);

  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return {
        ...prev,
        username: { ...prev.username, value: val },
      };
    });
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setState((prev) => {
      return {
        ...prev,
        email: { ...prev.email, value: val },
      };
    });
  };

  return (
    <div className="userDetails">
      <div className="user__avatar">
        <img src=""/*{user.user_avatar}*/ alt="user profile image" />
        <Edit />
      </div>
      <div className="user__details">
        <Label text="username" />
        {state.username.edit ? (
          <InputFeild
            type="text"
            value={state.username.value}
            onChange={usernameChangeHandler}
            placeHolder="username"
            onFoucusOut={(event) => {
              setState((prev) => {
                return {
                  ...prev,
                  username: {
                    ...prev.username,
                    edit: false,
                  },
                };
              });
            }}
          />
        ) : (
          <div
            className="user__data"
            onClick={() =>
              setState((prev) => {
                return { ...prev, username: { ...prev.username, edit: true } };
              })
            }
          >
            <p>{state.username.value}</p>
          </div>
        )}

        <Label text="email" />
        {state.email.edit ? (
          <InputFeild
            type="email"
            value={state.email.value}
            onChange={emailChangeHandler}
            placeHolder="email"
            onFoucusOut={(event) => {
              setState((prev) => {
                return {
                  ...prev,
                  email: {
                    ...prev.email,
                    edit: false,
                  },
                };
              });
            }}
          />
        ) : (
          <div
            className="user__data"
            onClick={() =>
              setState((prev) => {
                return { ...prev, email: { ...prev.email, edit: true } };
              })
            }
          >
            <p>{state.email.value}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
