import { Alert, Button, TextField } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { NEW_ACCOUNT_PATH, TRANSACTIONS_PATH } from "../utils/routes";

export const LoginPage: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const { login } = useLogin();
  const navigate = useNavigate();

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onFormSubmit = () => {
    try {
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
      <h2>Login</h2>
      {alertText !== "" && <Alert severity="error">{alertText}</Alert>}
      <form onSubmit={onFormSubmit}>
        <div>
          <TextField label="email" variant="standard" value={email} onChange={onEmailChange} />
        </div>
        <div>
          <TextField
            label="password"
            type={"password"}
            variant="standard"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <p>
          <Button type="submit" variant="contained">Save</Button>
        </p>
        <p>
          Not a user? <Link to={NEW_ACCOUNT_PATH}>Create an account</Link>
        </p>
      </form>
    </>
  );
};