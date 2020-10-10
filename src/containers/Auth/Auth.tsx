import React, { ChangeEvent, useState } from "react";
import "./Auth.css";

import axios from "../../axios";
import Modal from "../../components/UI/Modal/Modal";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Button from "../../components/UI/Button/Button";
import { Redirect, RouteProps } from "react-router-dom";


const Auth: React.FC<RouteProps> = ({ location }) => {
  const [email, setEmail] = useState<string>("");

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState<string>("");

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    axios
      .post("/auth/user", {
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.data.jwt)})
      .catch((e) => console.log(e));
  };

  const [show, setShow] = useState<boolean>(true);

  const modalClickHandler = () => {
    setShow(false);
  }


  return (
    <React.Fragment>
      {show?  null : <Redirect to="/" />}
      <Modal show={show} onClick={modalClickHandler} >
      <form className="auth__form">
        <h1>Login to Create Posts</h1>
        <InputFeild
          type="email"
          value={email}
          onChange={changeEmailHandler}
          placeHolder="Email"
        />
        <InputFeild
          type="password"
          value={password}
          onChange={changePasswordHandler}
          placeHolder="Password"
        />
        <Button text="Login" onClick={submitHandler} />
      </form>
    </Modal>
    </React.Fragment>

  );
};

export default Auth;
