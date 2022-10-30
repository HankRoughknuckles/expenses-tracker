import { Toolbar } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES_PATH, TRANSACTIONS_PATH } from "../utils/routes";
import { LogInAndLogOutButtons } from "./LogInAndLogOutButtons";

export const Nav: FunctionComponent = () => {
  return (
    <Toolbar component={"nav"} className={"nav"}>
      <div className={"left"}>
        <h1 className={"navItem"}>Expense Tracker</h1>
        <Link to={TRANSACTIONS_PATH} className={"navItem"}>Expenses</Link>
        <Link to={CATEGORIES_PATH} className={"navItem"}>Categories</Link>
      </div>
      <div>
        <LogInAndLogOutButtons />
      </div>
    </Toolbar>
  );
};