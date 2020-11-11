import React, { useState, ChangeEvent, useEffect } from "react";
import "./Registration.css";

import Modal from "../../components/UI/Modal/Modal";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import { useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Image from "@material-ui/icons/ImageOutlined";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType, UserState, InputType } from "../../models";
import { userRegister, resetError } from "../../store/actions/user_actions";
import validate from "../../util/validation";

const Registration: React.FC = () => {
  const user = useSelector<ReducersType, UserState>(
    (state) => state.user,
    (cur, prev) => cur.error === prev.error
  );
  const [show, setShow] = useState(true);

  const cfg: {
    username: InputType;
    email: InputType;
    password: InputType;
    confirmPassword: InputType;
    file: InputType;
  } = {
    username: {
      elementConfig: {
        placeHolder: "Username",
        value: "",
        type: "text",
      },
      isValid: false,
      edit: false,
      validation: {
        required: true,
        minLength: 4,
        maxLength: 16,
      },
    },
    email: {
      elementConfig: {
        placeHolder: "Email",
        value: "",
        type: "email",
      },
      isValid: false,
      edit: false,
      validation: {
        required: true,
        isEmail: true,
      },
    },
    password: {
      elementConfig: {
        placeHolder: "Password",
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
    file: {
      elementConfig: {
        placeHolder: "File",
        value: "",
        type: "file",
      },
      edit: false,
      isValid: true,
    },
  };

  const [state, setState] = useState(cfg);

  const [file, setFile] = useState<null | File>(null);

  const history = useHistory();

  useEffect(() => {
    if (user.logged) history.push("/");
  }, []);

  const dispatch = useDispatch();

  const modalClickHandler = () => {
    setShow(false);
    history.push("/");
    dispatch(resetError());
  };

  const usernameOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return {
        ...prev,
        username: {
          ...prev.username,
          elementConfig: {
            ...prev.username.elementConfig,
            value: val,
          },
          edit: true,
          isValid: validate({
            ...prev.username,
            elementConfig: { ...prev.username.elementConfig, value: val },
          }),
        },
      };
    });
  };

  const emailOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
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

  const passwordOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
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

  const confirmOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return {
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          elementConfig: {
            ...prev.confirmPassword.elementConfig,
            value: val,
          },
          edit: true,
          isValid:
            validate({
              ...prev.password,
              elementConfig: { ...prev.password.elementConfig, value: val },
            }) && prev.password.elementConfig.value === val,
        },
      };
    });
  };

  const fileOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const img = event.target.files ? event.target.files[0] : null;
    setFile(img);

    setState((prev) => {
      return {
        ...prev,
        file: {
          ...prev.file,
          elementConfig: {
            ...prev.file.elementConfig,
            value: val,
          },
          isValid: true,
        },
      };
    });
  };

  const onRegister = (event: any) => {
    event.preventDefault();
    let req = {
      email: state.email.elementConfig.value,
      username: state.username.elementConfig.value,
      password: state.password.elementConfig.value,
    };

    let key: keyof typeof state;
    let isValid = true;
    for (key in state) {
      isValid = isValid && state[key].isValid;
    }

    if (isValid) {
      dispatch(
        userRegister(req, file, () => {
          history.push("/auth");
        })
      );
    }
  };

  let error;

  if (user.error) {
    if (user.error.error_type === 201) {
      error =
        user.error.cause === "USERNAME_EXISTS" ? (
          <p className="error_box">Username already exists</p>
        ) : (
          <p className="error_box">Email already exists</p>
        );
    } else {
      error = (
        <p className="error_box">Internal Server error try again later</p>
      );
    }
  }

  return (
    <Modal show={show} onClick={modalClickHandler}>
      <form className="registration__form">
        <h2>Registration Form</h2>
        {error}
        <InputFeild config={state.username} onChange={usernameOnchange} />
        <InputFeild config={state.email} onChange={emailOnchange} />
        <InputFeild config={state.password} onChange={passwordOnchange} />
        <InputFeild config={state.confirmPassword} onChange={confirmOnchange} />
        <input
          id="file"
          type={state.file.elementConfig.type}
          onChange={fileOnChange}
          value={state.file.elementConfig.value}
          accept="image/*"
        />
        <label htmlFor="file">
          <Image />
          Choose a Image
        </label>
        <Button text="Register" onClick={onRegister} />
      </form>
    </Modal>
  );
};

export default Registration;
