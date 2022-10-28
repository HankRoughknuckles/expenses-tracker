import { Button } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { CREATE_ACCOUNT_PATH, LOGIN_PATH } from "../utils/routes";

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
      {/* TODO: consider making these buttons instead of links */}
      <Link to={LOGIN_PATH} className={"navItem"}>Login</Link>
      <Link to={CREATE_ACCOUNT_PATH} className={"navItem"}>Create account</Link>
    </>
  );
};