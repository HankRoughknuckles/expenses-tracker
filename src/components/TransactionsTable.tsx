import EditIcon from "@mui/icons-material/Edit";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import React, { FunctionComponent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import { Transaction } from "../model/transactions";
import { getEditTransactionUrl } from "../utils/routes";
import { DeleteButtonWithConfirm } from "./DeleteButtonWithConfirm";
import { IncomeOrExpenseChip } from "./IncomeOrExpenseChip";

/** Displays the list of transactions for the current user */
export const TransactionsTable: FunctionComponent = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const navigate = useNavigate();

  const getDeleteHandler = (transactionId: Transaction["id"]) => () => {
    deleteTransaction(transactionId);
  };

  const getOnEditClickHandler = (transactionId: Transaction["id"]) => () => {
    navigate(getEditTransactionUrl(transactionId));
  };

  // The list of transactions sorted from earliest to latest
  const transactionsByDate = useMemo(() => {
    const transactionsCopy = [...transactions];
    transactionsCopy.sort((a, b) => a.date - b.date);
    return transactionsCopy;
  }, [transactions]);

  return (
    <Grid item xs={12}>
      <List>
        {transactionsByDate.map(({ id, date, title, value }) => (
          <ListItem key={id}>
            <Grid item xs={4} md={1}>
              <IncomeOrExpenseChip isExpense={parseInt(value) < 0} />
            </Grid>
            <Grid item xs={4} md={2}>
              <ListItemText>{title}</ListItemText>
            </Grid>
            <Grid item xs={4} md={1}><ListItemText>{moment(date).format("ll")}</ListItemText></Grid>
            <Grid item xs={4} md={1}><ListItemText>{value}</ListItemText></Grid>
            <Grid item xs={2} md={1}><EditIcon sx={{ cursor: "pointer" }} onClick={getOnEditClickHandler(id)} />
            </Grid>
            <Grid item xs={3} md={1}><DeleteButtonWithConfirm onConfirm={getDeleteHandler(id)} /></Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};