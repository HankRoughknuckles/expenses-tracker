import { Button, Grid } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { NEW_TRANSACTION_PATH } from "../utils/routes";
import { TransactionsTable } from "./TransactionsTable";

export const TransactionsListPage: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Expenses</h2>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => navigate(NEW_TRANSACTION_PATH)}>Create New Expense</Button>
      </Grid>
      <TransactionsTable />
    </Grid>
  );
};