import { Box, Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import { Transaction } from "../model/transactions";
import { isValidNumberString } from "../utils/string";

/**
 * Since sign is a string and we need to store expenses as negative and incomes as positive, this checks whether the
 * user selected expense or income, then outputs value with the proper sign accordingly
 * @param isExpense
 * @param value
 */
const getValueWithSign = (isExpense: boolean, value: string): string => {
  const valueAsNumber = parseFloat(value);
  if (isExpense) {
    const negative = Math.abs(valueAsNumber) * -1;
    return negative.toFixed(2);
  } else {
    const positive = Math.abs(valueAsNumber);
    return positive.toFixed(2);
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
    // true if expense, false if income
    const [isExpense, setIsExpense] = useState(true);
    const [date, setDate] = useState(initialDate || Date.now());
    const [title, setTitle] = useState(initialTitle || "");
    const [value, setValue] = useState(initialValue || "");

    const onIsExpenseToggle = (_: any, value: string) => {
      setIsExpense(value === "true");
    };

    const onDateChange = (value: Moment | null) => {
      if (value === null) return;
      const msSinceEpoch = value.valueOf();
      setDate(msSinceEpoch);
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
      const valueWithSign = getValueWithSign(isExpense, value);
      onFormSubmit({ date, title, value: valueWithSign });
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