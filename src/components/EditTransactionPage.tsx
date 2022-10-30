import { Alert, Grid } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import { TRANSACTIONS_PATH } from "../utils/routes";
import { ExpenseFormData, TransactionForm } from "./TransactionForm";

export const EditTransactionPage: FunctionComponent = () => {
  const [alertText, setAlertText] = useState("");
  const { transactionId } = useParams();
  const { getTransaction, updateTransaction } = useTransactions();
  const transaction = getTransaction(transactionId ?? "");
  const { date, title, value } = transaction ?? {};
  const navigate = useNavigate();

  const onFormSubmit = ({ date, title, value }: ExpenseFormData) => {
    if (transactionId === undefined) throw new Error("Transaction not found");

    try {
      updateTransaction(transactionId, {
        id: transactionId,
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
      {
        transaction !== undefined ? (
          <TransactionForm onFormSubmit={onFormSubmit} initialDate={date} initialTitle={title} initialValue={value} />
        ) : <p>Category not found...</p>
      }
    </Grid>
  );
};