import { Chip } from "@mui/material";
import React, { FunctionComponent } from "react";

interface Props {
  isExpense: boolean;
}

export const IncomeOrExpenseChip: FunctionComponent<Props> = ({ isExpense }) => {
  const label = isExpense ? "Expense" : "Income";
  const color = isExpense ? "error" : "success";

  return <Chip label={label} color={color} />;
};
