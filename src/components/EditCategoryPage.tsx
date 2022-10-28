import { Alert, Grid } from "@mui/material";
import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../model/categories";
import { CATEGORIES_PATH } from "../utils/routes";
import { CategoryForm } from "./CategoryForm";

export const EditCategoryPage: FunctionComponent = () => {
  const [alertText, setAlertText] = useState("");
  const { categoryId } = useParams();
  const { getCategory, updateCategory } = useCategories();
  const category = getCategory(categoryId || "");
  const navigate = useNavigate();

  const onFormSubmit = ({ event, category }: { event: SyntheticEvent, category: { name: Category["name"] } }) => {
    try {
      event.preventDefault();
      updateCategory(categoryId!, category.name);
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
        <h2>Edit Category</h2>
      </Grid>
      {alertText !== "" && (
        <Grid item md={12}>
          <Alert severity="error">{alertText}</Alert>
        </Grid>
      )}
      {
        category !== undefined ? (
          <Grid item md={6}>
            <CategoryForm onFormSubmit={onFormSubmit} initialName={category.name} />
          </Grid>
        ) : <p>Category not found...</p>
      }
    </Grid>
  );
};