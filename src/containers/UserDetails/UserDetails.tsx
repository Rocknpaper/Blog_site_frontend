import React, { useEffect, useState, ChangeEvent } from "react";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Label from "../../components/UI/Label/Label";
import "./UserDetails.css";
import { ReducersType, UserState, InputType } from "../../models/index";
import { useSelector, /* useDispatch, */ shallowEqual } from "react-redux";
import Edit from "@material-ui/icons/EditOutlined";
import { useHistory } from "react-router-dom";
import validate from "../../util/validation";

const UserDetails: React.FC = () => {
  const user = useSelector<ReducersType, UserState>(
    (state) => state.user,
    shallowEqual
  );

  const cfg: { username: InputType; email: InputType } = {
    username: {
      elementConfig: {
        value: "",
        placeHolder: "Username",
        type: "text",
      },
      validation: {
        required: true,
        minLength: 4,
        maxLength: 16,
      },
      edit: false,
      isValid: false,
    },
    email: {
      elementConfig: {
        value: "",
        placeHolder: "Email",
        type: "password",
      },
      validation: {
        required: true,
        isEmail: true,
      },
      edit: false,
      isValid: false,
    },
  };

  const [state, setState] = useState(cfg);

  useEffect(() => {
    if (!user.logged) {
      history.push("/auth");
    }

    setState((prev) => {
      return {
        ...prev,
        username: {
          ...prev.username,
          elementConfig: {
            ...prev.username.elementConfig,
            value: user.username,
          },
          isValid: validate({
            ...prev.username,
            elementConfig: {
              ...prev.username.elementConfig,
              value: user.username,
            },
          }),
        },
        email: {
          ...prev.email,
          elementConfig: {
            ...prev.email.elementConfig,
            value: user.email,
          },
          isValid: validate({
            ...prev.email,
            elementConfig: {
              ...prev.email.elementConfig,
              value: user.email,
            },
          }),
        },
      };
    });
  }, []);

  const history = useHistory();

  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return {
        ...prev,
        username: {
          ...prev.username,
          elementConfig: { ...prev.username.elementConfig, value: val },
          isValid: validate({
            ...prev.username,
            elementConfig: { ...prev.username.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setState((prev) => {
      return {
        ...prev,
        email: {
          ...prev.email,
          elementConfig: { ...prev.email.elementConfig, value: val },
        },
        isValid: validate({
          ...prev.username,
          elementConfig: { ...prev.username.elementConfig, value: val },
        }),
      };
    });
  };

  return (
    <div className="userDetails">
      <div className="user__avatar">
        <img src={user.user_avatar} alt="user profile image" />
        <Edit />
      </div>
      <div className="user__details">
        <Label text="username" />
        {state.username.edit ? (
          <InputFeild
            config={state.username}
            onChange={usernameChangeHandler}
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
            <p>{state.username.elementConfig.value}</p>
          </div>
        )}

        <Label text="email" />
        {state.email.edit ? (
          <InputFeild
            config={state.email}
            onChange={emailChangeHandler}
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
            <p>{state.email.elementConfig.value}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
