import { Alert, Button, TextField } from "@mui/material";
import * as React from "react";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { createAccount } from "../model/user";
import { EXPENSES_PATH, LOGIN_PATH } from "../utils/routes";

export const CreateAccountPage: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const { login } = useLogin();
  const navigate = useNavigate();

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onCreateAccountClick = () => {
    try {
      createAccount(email, password);
      login(email, password);
      navigate(EXPENSES_PATH, { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        setAlertText(e.message);
      }
    }
  };

  return (
    <>
      <h2>Create Account</h2>
      {alertText !== "" && <Alert severity="error">{alertText}</Alert>}
      <div>
        <TextField label="email" variant="standard" value={email} onChange={onEmailChange} />
      </div>
      <div>
        <TextField label="password" type={"password"} variant="standard" value={password} onChange={onPasswordChange} />
      </div>
      <p>
        <Button variant="contained" onClick={onCreateAccountClick}>Create Account</Button>
      </p>
      <p>
        Have an account? <Link to={LOGIN_PATH}>Log in here</Link>
      </p>
    </>
  );
};