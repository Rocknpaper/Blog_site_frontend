import React, { ChangeEvent, useEffect, useState } from "react";
import InputFeild from "../UI/InputFeild/InputFeild";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import { InputType, ReducersType, UserState } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import validate from "../../util/validation";
import {
  checkRecovery,
  forgetPassAsync,
  patchPassword,
  resetForgetPass,
  setPassword,
} from "../../store/actions/user_actions";
import { Redirect, useHistory } from "react-router-dom";

const ForgetPass: React.FC = () => {
  const [show, setShow] = useState(false);

  const cfg: {
    email: InputType;
    code: InputType;
    password: InputType;
    confirmPassword: InputType;
  } = {
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
      isValid: false,
      edit: false,
    },
    code: {
      elementConfig: {
        value: "",
        placeHolder: "4 Digit Code",
        type: "number",
      },
      validation: {
        required: true,
        minLength: 4,
        maxLength: 4,
      },
      isValid: false,
      edit: false,
    },
    password: {
      elementConfig: {
        placeHolder: "New Password",
        value: "",
        type: "password",
      },
      isValid: false,
      edit: false,
      validation: {
        required: true,
        minLength: 8,
        maxLength: 32,
      },
    },
    confirmPassword: {
      elementConfig: {
        placeHolder: "Confirm Password",
        value: "",
        type: "password",
      },
      isValid: false,
      edit: false,
      validation: {
        required: true,
      },
    },
  };

  const [feild, setFeild] = useState(cfg);
  const state = useSelector<ReducersType, UserState>((state) => state.user);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (state.logged) {
      history.push("/");
    }
  });
  const modalClickHandler = () => {
    setShow(true);
  };

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
          edit: true,
          isValid: validate({
            ...prev.email,
            elementConfig: { ...prev.email.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const changeCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setFeild((prev) => {
      return {
        ...prev,
        code: {
          ...prev.code,
          elementConfig: {
            ...prev.code.elementConfig,
            value: val,
          },
          edit: true,
          isValid: validate({
            ...prev.code,
            elementConfig: { ...prev.code.elementConfig, value: val },
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
          edit: true,
          isValid: validate({
            ...prev.password,
            elementConfig: { ...prev.password.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const changeConfirmPasswordHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const val = event.target.value;
    setFeild((prev) => {
      return {
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          elementConfig: {
            ...prev.confirmPassword.elementConfig,
            value: val,
          },
          edit: true,
          isValid: validate({
            ...prev.confirmPassword,
            elementConfig: {
              ...prev.confirmPassword.elementConfig,
              value: val,
            },
          }),
        },
      };
    });
  };

  const resetHandler = (e: any) => {
    e.preventDefault();
    dispatch(forgetPassAsync(feild.email.elementConfig.value));
  };

  const verifyHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      checkRecovery(
        feild.email.elementConfig.value,
        +feild.code.elementConfig.value
      )
    );
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      setPassword(
        feild.email.elementConfig.value,
        feild.password.elementConfig.value
      )
    );
    setRedirect(true);
  };

  return (
    <React.Fragment>
      {redirect ? <Redirect to="/auth" /> : null}
      <Modal show={show} onClick={modalClickHandler}>
        {state.forgetPass && state.forgetPass.done ? (
          <form className="auth__form">
            <h1>New Password</h1>
            <InputFeild
              config={feild.password}
              onChange={changePasswordHandler}
            />
            <InputFeild
              config={feild.confirmPassword}
              onChange={changeConfirmPasswordHandler}
            />
            <Button text="Confirm" onClick={submitHandler} />
          </form>
        ) : (
          <form className="auth__form">
            <h1>Account Recovery</h1>
            {state.error ? (
              state.error.error_type === 404 ? (
                <p className="error_box">Invalid email or password</p>
              ) : (
                <p className="error_box">
                  {state.error.error_type === 201
                    ? "Invalid Token"
                    : "Internal Server error try again later"}
                </p>
              )
            ) : null}
            {state.forgetPass && state.forgetPass.send ? (
              <React.Fragment>
                <InputFeild config={feild.code} onChange={changeCodeHandler} />
                <Button text="Confirm Code" onClick={verifyHandler} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <InputFeild
                  config={feild.email}
                  onChange={changeEmailHandler}
                />
                <Button text="Send mail" onClick={resetHandler} />
              </React.Fragment>
            )}
          </form>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default ForgetPass;
