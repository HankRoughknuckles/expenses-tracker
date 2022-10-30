import { Box, Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { Transaction } from "../model/transactions";
import { msAsDateString } from "../utils/dates";
import { isValidNumberString } from "../utils/string";

/**
 * Since we need to store expenses as negative and incomes as positive, this checks whether the
 * user selected expense or income, then outputs value with the proper sign accordingly
 */
const getValueWithSign = (isExpense: boolean, value: number): number => {
  if (isExpense) {
    return Math.abs(value) * -1;
  } else {
    return Math.abs(value);
  }
};

export interface ExpenseFormData {
  /** when the expense occurred (in ms since epoch) */
  date: Transaction["date"];
  title: Transaction["title"];
  /**
   * How much the expense / income was for.  If negative, then it's
   * an expense.  If positive, then it was an income.
   **/
  value: Transaction["value"];
}

interface Props {
  onFormSubmit: (expenseFormData: ExpenseFormData) => void;
  initialDate?: ExpenseFormData["date"];
  initialTitle?: ExpenseFormData["title"];
  initialValue?: ExpenseFormData["value"];
}

export const TransactionForm: FunctionComponent<Props> =
  ({
     onFormSubmit,
     initialDate,
     initialTitle,
     initialValue
   }) => {
    const { isExpense: isTransactionAnExpense } = useTransactions();
    const [isExpense, setIsExpense] = useState<boolean>(initialValue !== undefined ? isTransactionAnExpense(initialValue) : true);
    const [date, setDate] = useState<string>(initialDate ?? msAsDateString(Date.now()));
    const [title, setTitle] = useState<string>(initialTitle ?? "");
    // need to store value as a string to get around the weirdness with entering numbers in the input
    const [value, setValue] = useState<string>(initialValue?.toString() ?? "");

    const onIsExpenseToggle = (_: any, value: string) => {
      setIsExpense(value === "true");
    };

    const onDateChange = (valueAsMoment: Moment | null) => {
      if (valueAsMoment === null) return;
      const dateString = msAsDateString(valueAsMoment.valueOf());
      setDate(dateString);
    };

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (!isValidNumberString(value)) return;
      setValue(value);
    };

    const handleFormSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
      const valueWithSign = getValueWithSign(isExpense, parseFloat(value));
      onFormSubmit({
        date,
        title,
        value: valueWithSign
      });
    };

    return (
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ marginBottom: "1em" }}>
          <ToggleButtonGroup
            color={isExpense ? "error" : "success"}
            value={isExpense}
            exclusive
            onChange={onIsExpenseToggle}
          >
            <ToggleButton selected={isExpense} value="true">Expense</ToggleButton>
            <ToggleButton selected={!isExpense} value="false">Income</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ marginBottom: "1em" }}>
          <DesktopDatePicker
            label="Date"
            value={date}
            onChange={onDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{ marginBottom: "1em" }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={onTitleChange}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ marginBottom: "1em" }}>
          <TextField
            label="Value"
            variant="outlined"
            value={value}
            onChange={onValueChange}
            sx={{ width: "100%" }}
          />
        </Box>
        <Button type="submit" variant="contained">Save</Button>
      </form>
    );
  };