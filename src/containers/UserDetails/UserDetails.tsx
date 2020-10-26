import React, { useEffect, useState, ChangeEvent } from "react";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Label from "../../components/UI/Label/Label";
import "./UserDetails.css";
import { ReducersType, UserState, InputType } from "../../models/index";
import {
  useSelector,
  /* useDispatch, */ shallowEqual,
  useDispatch,
} from "react-redux";
import Edit from "@material-ui/icons/EditOutlined";
import { useHistory } from "react-router-dom";
import validate from "../../util/validation";
import {
  resetPasswordAsync,
  resetPassReset,
  patchUserDetailsAsync,
  patchPassword,
} from "../../store/actions/user_actions";
import Button from "../../components/UI/Button/Button";

const UserDetails: React.FC = () => {
  const user = useSelector<ReducersType, UserState>(
    (state) => state.user,
    (curr, prev) => curr.resetPass === prev.resetPass
  );

  const cfg: { username: InputType; email: InputType; password: InputType } = {
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
        type: "email",
      },
      validation: {
        required: true,
        isEmail: true,
      },
      edit: false,
      isValid: false,
    },
    password: {
      elementConfig: {
        value: "",
        placeHolder: "Old Password",
        type: "password",
      },
      validation: {
        required: true,
        minLength: 8,
        maxLength: 32,
      },
      edit: false,
      isValid: false,
    },
  };

  const [state, setState] = useState(cfg);
  const [showPassword, setShowPassword] = useState(false);
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
        password: {
          ...prev.password,
          elementConfig: {
            ...prev.password.elementConfig,
            placeHolder: user.resetPass ? "New Password" : "Old Password",
          },
        },
      };
    });

    return () => {
      dispatch(resetPassReset());
    };
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return {
        ...prev,
        username: {
          ...prev.username,
          elementConfig: { ...prev.username.elementConfig, value: val },
          changed: user.username !== val,
          isValid: validate({
            ...prev.username,
            elementConfig: { ...prev.username.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return {
        ...prev,
        password: {
          ...prev.password,
          elementConfig: { ...prev.password.elementConfig, value: val },

          isValid: validate({
            ...prev.password,
            elementConfig: { ...prev.password.elementConfig, value: val },
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
          changed: user.email !== val,
          isValid: validate({
            ...prev.email,
            elementConfig: { ...prev.email.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const passwordValueReset = () => {
    setState((prev) => {
      return {
        ...prev,
        password: {
          ...prev.password,
          elementConfig: {
            ...prev.password.elementConfig,
            value: "",
          },
        },
      };
    });
  };

  let changed = false;
  let key: keyof typeof state;
  for (key in state) {
    changed =
      changed || (state[key].changed && state[key].changed === true)
        ? true
        : false;
  }

  console.log(state.email.changed);

  return (
    <div className="userDetails">
      <div className="user__avatar">
        <img src={user.user_avatar} alt="user profile image" />
        <Edit />
      </div>
      <div className="user__details">
        <Label
          text="username"
          onClick={() =>
            setState((prev) => {
              return {
                ...prev,
                username: {
                  ...prev.username,
                  edit: !prev.username.edit,
                },
              };
            })
          }
        />
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

        <Label
          text="email"
          onClick={() =>
            setState((prev) => {
              return {
                ...prev,
                email: { ...prev.email, edit: !prev.email.edit },
              };
            })
          }
        />
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
      <div className="user__data">
        <span
          className="change__password"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          Change Password
        </span>
      </div>
      {showPassword ? (
        <InputFeild
          config={{
            ...state.password,
            elementConfig: {
              ...state.password.elementConfig,
              placeHolder: user.resetPass?.reset
                ? "New Password"
                : "Old Password",
            },
          }}
          onChange={passwordChangeHandler}
          onSubmit={(e) => {
            if (e.key === "Enter") {
              if (!user.resetPass?.reset) {
                dispatch(
                  resetPasswordAsync(
                    {
                      email: user.email,
                      password: state.password.elementConfig.value,
                    },
                    passwordValueReset
                  )
                );
              } else {
              }
            }
          }}
        />
      ) : null}
      {user.resetPass && user.resetPass.type ? (
        <p className="error_box">
          {user.resetPass.type === 401
            ? "Invalid Password"
            : "Internal Server Error"}
        </p>
      ) : null}
      {user.resetPass?.reset || changed ? (
        <div className="controls">
          <Button text="Cancel" />
          <Button
            text="Save"
            onClick={(e) => {
              e.preventDefault();
              if (changed) {
                dispatch(
                  patchUserDetailsAsync({
                    username: state.username.elementConfig.value,
                    email: state.email.elementConfig.value,
                  })
                );
              }
              changed = false;

              if (user.resetPass?.reset) {
                dispatch(patchPassword(state.password.elementConfig.value));
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserDetails;
