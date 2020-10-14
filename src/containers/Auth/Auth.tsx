import React, { ChangeEvent, useState } from "react";
import "./Auth.css";

import Modal from "../../components/UI/Modal/Modal";
import InputFeild from "../../components/UI/InputFeild/InputFeild";
import Button from "../../components/UI/Button/Button";
import { Redirect, RouteProps, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserState, ReducersType } from "../../models";
import { initUserAsync } from "../../store/actions/user_actions";

const Auth: React.FC<RouteProps> = ({ location }) => {
  const state = useSelector<ReducersType, UserState>(
    (state) => state.user,
    (curr, prev) => {
      return curr.logged === prev.logged;
    }
  );

  const history = useHistory();

  const dispatch = useDispatch();

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
    dispatch(
      initUserAsync(
        {
          email: email,
          password: password,
        },
        () => history.push(state.redirect_url)
      )
    );
  };

  const [show, setShow] = useState<boolean>(true);

  const modalClickHandler = () => {
    setShow(false);
  };

  const body = (
    <Modal show={show} onClick={modalClickHandler}>
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
