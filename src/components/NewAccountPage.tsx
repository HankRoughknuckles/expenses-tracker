import { Alert, Button, TextField } from "@mui/material";
import * as React from "react";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { LOGIN_PATH, TRANSACTIONS_PATH } from "../utils/routes";

export const NewAccountPage: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const { login, createAccount } = useLogin();
  const navigate = useNavigate();

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onFormSubmit = () => {
    try {
      createAccount(email, password);
      login(email, password);
      navigate(TRANSACTIONS_PATH, { replace: true });
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
      <form onSubmit={onFormSubmit}>
        <div>
          <TextField label="email" variant="standard" value={email} onChange={onEmailChange} />
        </div>
        <div>
          <TextField label="password" type={"password"} variant="standard" value={password}
                     onChange={onPasswordChange} />
        </div>
        <p>
          <Button type="submit" variant="contained">Create Account</Button>
        </p>
        <p>
          Have an account? <Link to={LOGIN_PATH}>Log in here</Link>
        </p>
      </form>
    </>
  );
};