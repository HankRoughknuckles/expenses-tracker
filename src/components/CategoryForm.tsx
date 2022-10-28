import { Button, Grid, TextField } from "@mui/material";
import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import { Category } from "../model/categories";

interface Props {
  onFormSubmit: ({
                   event,
                   category
                 }: { event: SyntheticEvent, category: { name: Category["name"] } }) => void;
  initialName?: string;
}

export const CategoryForm: FunctionComponent<Props> = ({ onFormSubmit, initialName = "" }) => {
  const [name, setName] = useState(initialName);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleFormSubmit = (event: SyntheticEvent) => {
    onFormSubmit({
      event,
      category: { name }
    });
  };

  return (
    <Grid container>
      <Grid item md={3}>
        <form onSubmit={handleFormSubmit}>
          <div>
            <TextField label="Category name" variant="standard" value={name} onChange={onNameChange} />
          </div>
          <p>
            <Button type="submit" variant="contained">Save</Button>
          </p>
        </form>
      </Grid>
    </Grid>
  );
};