import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useCategories } from "../../hooks/useCategories";
import { Transaction } from "../../model/transactions";

interface Props {
  value: Transaction["categoryId"];
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const TransactionCategoryInput: FunctionComponent<Props> = ({ value, onChange }) => {
  const { categories } = useCategories();

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={value}
        label="Category"
        onChange={onChange}
      >
        <MenuItem key={"undefined"} value="">None</MenuItem>
        {categories.map(({ id, name }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))}
      </Select>
    </FormControl>
  );
};