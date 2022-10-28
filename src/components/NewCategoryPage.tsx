import { Alert, Grid } from "@mui/material";
import * as React from "react";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../model/categories";
import { CATEGORIES_PATH } from "../utils/routes";
import { CategoryForm } from "./CategoryForm";

export const NewCategoryPage: FunctionComponent = () => {
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();
  const { createCategory } = useCategories();

  const onFormSubmit = ({ event, category }: { event: SyntheticEvent, category: { name: Category["name"] } }) => {
    try {
      event.preventDefault();
      createCategory(category.name);
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