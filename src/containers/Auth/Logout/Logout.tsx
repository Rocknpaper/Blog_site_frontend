import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../store/actions/user_actions";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOutUser());
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
