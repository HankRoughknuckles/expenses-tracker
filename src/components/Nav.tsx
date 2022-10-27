import { Toolbar } from "@mui/material";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES_PATH, EXPENSES_PATH } from "../utils/routes";

export const Nav: FunctionComponent = () => {
  return (
    <Toolbar component={"nav"} className={"nav"}>
      <h1>Expense Tracker</h1>
      <Link to={EXPENSES_PATH} className={"navLink"}>Expenses</Link>
      <Link to={CATEGORIES_PATH} className={"navLink"}>Categories</Link>
    </Toolbar>
  );
};