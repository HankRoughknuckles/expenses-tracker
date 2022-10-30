import { Button, Grid, TextField } from "@mui/material";
import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import { Category } from "../model/categories";

export interface CategoryFormData {
  name: Category["name"];
}

interface Props {
  onFormSubmit: (categoryFormData: CategoryFormData) => void;
  initialTitle?: CategoryFormData["name"];
}

export const CategoryForm: FunctionComponent<Props> = ({ onFormSubmit, initialTitle = "" }) => {
  const [name, setName] = useState(initialTitle);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onFormSubmit({ name });
  };

  return (
    <Grid container>
      <Grid item md={3}>
        <form onSubmit={handleFormSubmit}>
          <div>
            <TextField label="Category name" variant="outlined" value={name} onChange={onNameChange} />
          </div>
          <p>
            <Button type="submit" variant="contained">Save</Button>
          </p>
        </form>
      </Grid>
    </Grid>
  );
};