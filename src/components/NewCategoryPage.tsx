import { Alert, Grid } from "@mui/material";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { CATEGORIES_PATH } from "../utils/routes";
import { CategoryForm, CategoryFormData } from "./CategoryForm";

export const NewCategoryPage: FunctionComponent = () => {
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();
  const { createCategory } = useCategories();

  const onFormSubmit = ({ name }: CategoryFormData) => {
    try {
      createCategory(name);
      navigate(CATEGORIES_PATH);
    } catch (e) {
      if (e instanceof Error) {
        setAlertText(e.message);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <h2>New Category</h2>
      </Grid>
      {alertText !== "" && (
        <Grid item md={12}>
          <Alert severity="error">{alertText}</Alert>
        </Grid>
      )}
      <Grid item md={6}>
        <CategoryForm onFormSubmit={onFormSubmit} />
      </Grid>
    </Grid>
  );
};