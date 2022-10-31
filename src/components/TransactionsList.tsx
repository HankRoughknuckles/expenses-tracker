import EditIcon from "@mui/icons-material/Edit";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import React, { FunctionComponent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import { Transaction } from "../model/transactions";
import { dateAsReadable, dateStringAsMs } from "../utils/dates";
import { valueAsReadable } from "../utils/money";
import { getEditTransactionUrl } from "../utils/routes";
import { CategoryChip } from "./CategoryChip";
import { DeleteButtonWithConfirm } from "./DeleteButtonWithConfirm";
import { IncomeOrExpenseChip } from "./IncomeOrExpenseChip";

/** Displays the list of transactions for the current user */
export const TransactionsList: FunctionComponent = () => {
  const { transactions, deleteTransaction, isExpense } = useTransactions();
  const navigate = useNavigate();

  const getDeleteHandler = (transactionId: Transaction["id"]) => () => {
    deleteTransaction(transactionId);
  };

  const getOnEditClickHandler = (transactionId: Transaction["id"]) => () => {
    navigate(getEditTransactionUrl(transactionId));
  };

  // The list of transactions sorted from earliest to latest
  const sortedTransactions = useMemo(() => {
    const transactionsCopy = [...transactions];
    transactionsCopy.sort((a, b) => dateStringAsMs(a.date) - dateStringAsMs(b.date));
    return transactionsCopy;
  }, [transactions]);

  return (
    <Grid item xs={12}>
      <List>
        {sortedTransactions.map(({ id, date, title, value, categoryId }) => (
          <ListItem key={id}>
            <Grid item xs={4} md={1}>
              <IncomeOrExpenseChip isExpense={isExpense(value)} />
            </Grid>
            <Grid item xs={4} md={1}>
              <ListItemText>{valueAsReadable(value)}</ListItemText>
            </Grid>
            <Grid item xs={4} md={2}>
              <ListItemText>{title}</ListItemText>
            </Grid>
            <Grid item xs={4} md={1}>
              {categoryId && <CategoryChip id={categoryId} />}
            </Grid>
            <Grid item xs={4} md={1}><ListItemText>{dateAsReadable(date)}</ListItemText></Grid>
            <Grid item xs={2} md={1}>
              <EditIcon sx={{ cursor: "pointer" }} onClick={getOnEditClickHandler(id)} />
              &nbsp;
              <DeleteButtonWithConfirm onConfirm={getDeleteHandler(id)} />
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};