import React, { ChangeEvent, useState, useEffect } from "react";
import "./Auth.css";

import Modal from "../../components/UI/Modal/Modal";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Button from "../../components/UI/Button/Button";
import { Redirect, RouteProps, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserState, ReducersType, InputType } from "../../models";
import { loginAsync, resetError } from "../../store/actions/user_actions";
import validate from "../../util/validation";

const Auth: React.FC<RouteProps> = ({ location }) => {
  const state = useSelector<ReducersType, UserState>(
    (state) => state.user,
    (curr, prev) => {
      return curr.logged === prev.logged && curr.error === prev.error;
    }
  );

  const cfg: { email: InputType; password: InputType } = {
    email: {
      elementConfig: {
        type: "email",
        value: "",
        placeHolder: "Email",
      },
      validation: {
        required: true,
      },
      isValid: false,
    },
    password: {
      elementConfig: {
        type: "password",
        value: "",
        placeHolder: "Password",
      },
      validation: {
        required: true,
      },
      isValid: false,
    },
  };

  const [feild, setFeild] = useState(cfg);
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, []);

  const history = useHistory();

  const dispatch = useDispatch();

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setFeild((prev) => {
      return {
        ...prev,
        email: {
          ...prev.email,
          elementConfig: {
            ...prev.email.elementConfig,
            value: val,
          },
          isValid: validate({
            ...prev.email,
            elementConfig: { ...prev.email.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setFeild((prev) => {
      return {
        ...prev,
        password: {
          ...prev.password,
          elementConfig: {
            ...prev.password.elementConfig,
            value: val,
          },
          isValid: validate({
            ...prev.password,
            elementConfig: { ...prev.password.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    let key: keyof typeof feild;
    let isValid = true;
    for (key in feild) {
      isValid = feild[key].isValid && isValid;
    }

    if (isValid) {
      dispatch(
        loginAsync(
          {
            email: feild.email.elementConfig.value,
            password: feild.password.elementConfig.value,
          },
          () => history.push(state.redirect_url)
        )
      );
    }
  };

  const modalClickHandler = () => {
    setShow(false);
    dispatch(resetError());
  };

  const body = (
    <Modal show={show} onClick={modalClickHandler}>
      <form className="auth__form">
        <h1>Login to Create Posts</h1>
        {state.error ? (
          state.error.error_type === 404 ? (
            <p className="error_box">Invalid email or password</p>
          ) : (
            <p className="error_box">Internal Server error try again later</p>
          )
        ) : null}
        <InputFeild config={feild.email} onChange={changeEmailHandler} />
        <InputFeild config={feild.password} onChange={changePasswordHandler} />
        <Button text="Login" onClick={submitHandler} />
        <Link to="/register">
          <h3>Register</h3>
        </Link>
      </form>
    </Modal>
  );

  return (
    <React.Fragment>
      {show ? null : <Redirect to="/" />}
      {state.logged ? <Redirect to="/user" /> : body}
    </React.Fragment>
  );
};

export default Auth;
