import React, { useState, ChangeEvent, useEffect } from "react";
import "./Registration.css";

import Modal from "../../components/UI/Modal/Modal";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import { useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Image from "@material-ui/icons/ImageOutlined";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType, UserState } from "../../models";
import { userRegister } from "../../store/actions/user_actions";

interface StateType {
  username: {
    value: string;
  };
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  confirmPassword: {
    value: string;
  };
  file: {
    value: string;
  };
}

const Registration: React.FC = () => {
  const [show, setShow] = useState(true);

  const history = useHistory();

  const user = useSelector<ReducersType, UserState>((state) => state.user);

  useEffect(() => {
    if (user.logged) history.push("/");
  }, []);

  const dispatch = useDispatch();

  const modalClickHandler = () => {
    setShow(false);
    history.push("/");
  };

  const [state, setState] = useState<StateType>({
    username: {
      value: "",
    },
    email: {
      value: "",
    },
    password: {
      value: "",
    },
    confirmPassword: {
      value: "",
    },
    file: {
      value: "",
    },
  });

  const [file, setFile] = useState<null | File>(null);

  const usernameOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return { ...prev, username: { value: val } };
    });
  };

  const emailOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return { ...prev, email: { value: val } };
    });
  };

  const passwordOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return { ...prev, password: { value: val } };
    });
  };

  const confirmOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setState((prev) => {
      return { ...prev, confirmPassword: { value: val } };
    });
  };

  const fileOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const img = event.target.files ? event.target.files[0] : null;
    setFile(img);
    setState((prev) => {
      return { ...prev, file: { value: val } };
    });
  };

  const onRegister = (event: any) => {
    event.preventDefault();
    let req = {
      email: state.email.value,
      username: state.username.value,
      password: state.password.value,
    };
    dispatch(
      userRegister(req, file, () => {
        history.push("/auth");
      })
    );
  };

  return (
    <Modal show={show} onClick={modalClickHandler}>
      <form className="registration__form">
        <h2>Registration Form</h2>
        <InputFeild
          type="text"
          placeHolder="Username"
          onChange={usernameOnchange}
          value={state.username.value}
        />
        <InputFeild
          type="email"
          placeHolder="Email"
          onChange={emailOnchange}
          value={state.email.value}
        />
        <InputFeild
          type="password"
          placeHolder="Password"
          onChange={passwordOnchange}
          value={state.password.value}
        />
        <InputFeild
          type="password"
          placeHolder="Confirm password"
          onChange={confirmOnchange}
          value={state.confirmPassword.value}
        />
        <input
          id="file"
          type="file"
          onChange={fileOnChange}
          value={state.file.value}
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
