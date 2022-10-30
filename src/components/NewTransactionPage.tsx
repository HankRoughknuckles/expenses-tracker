import { Alert, Grid } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import { TRANSACTIONS_PATH } from "../utils/routes";
import { ExpenseFormData, TransactionForm } from "./TransactionForm";

export const NewTransactionPage: FunctionComponent = () => {
  const [alertText, setAlertText] = useState("");
  const { createTransaction } = useTransactions();
  const navigate = useNavigate();

  const onFormSubmit = ({ date, title, value }: ExpenseFormData) => {
    try {
      createTransaction({
        date,
        title,
        value
      });

      navigate(TRANSACTIONS_PATH);
    } catch (e) {
      if (e instanceof Error) {
        setAlertText(e.message);
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>New Transaction</h2>
      </Grid>
      {alertText !== "" && (
        <Grid item md={12}>
          <Alert severity="error">{alertText}</Alert>
        </Grid>
      )}
      <TransactionForm onFormSubmit={onFormSubmit} />
    </Grid>
  );
};