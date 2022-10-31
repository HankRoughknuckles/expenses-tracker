import { Toolbar } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES_PATH, ROOT_PATH, TRANSACTIONS_PATH } from "../utils/routes";
import { LogInAndLogOutButtons } from "./LogInAndLogOutButtons";

export const Nav: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Toolbar component={"nav"} className={"nav"}>
      <div className={"left"}>
        <h1 className={"navItem"} onClick={() => navigate(ROOT_PATH)} style={{ cursor: "pointer" }}>
          Expense Tracker
        </h1>
        <Link to={TRANSACTIONS_PATH} className={"navItem"}>Expenses</Link>
        <Link to={CATEGORIES_PATH} className={"navItem"}>Categories</Link>
      </div>
      <div>
        <LogInAndLogOutButtons />
      </div>
    </Toolbar>
  );
};