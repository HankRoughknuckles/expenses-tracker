import { Button } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { LOGIN_PATH, NEW_ACCOUNT_PATH } from "../utils/routes";

export const LogInAndLogOutButtons: FunctionComponent = () => {
  const { isUserLoggedIn, logout } = useLogin();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    logout();
    navigate(LOGIN_PATH);
  };

  if (isUserLoggedIn) return (<Button onClick={onLogoutClick}>Log Out</Button>);

  return (
    <>
      <Link to={LOGIN_PATH} className={"navItem"}>Login</Link>
      <Link to={NEW_ACCOUNT_PATH} className={"navItem"}>Create account</Link>
    </>
  );
};