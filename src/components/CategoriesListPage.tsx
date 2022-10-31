import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../model/categories";
import { getEditCategoryUrl, NEW_CATEGORY_PATH } from "../utils/routes";
import { DeleteButtonWithConfirm } from "./DeleteButtonWithConfirm";

export const CategoriesListPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { categories, deleteCategory } = useCategories();

  const getDeleteHandler = (categoryId: Category["id"]) => () => {
    deleteCategory(categoryId);
  };

  const getOnEditClickHandler = (categoryId: Category["id"]) => () => {
    navigate(getEditCategoryUrl(categoryId));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Categories</h2>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => navigate(NEW_CATEGORY_PATH)}>Create New Category</Button>
      </Grid>
      <Grid item xs={6} md={4}>
        <List>
          {categories.map(({ name, id }) => (
            <ListItem key={id}>
              <Grid item xs={4} md={3}><ListItemText>{name}</ListItemText></Grid>
              <Grid item xs={2} md={3}>
                <EditIcon sx={{ cursor: "pointer" }} onClick={getOnEditClickHandler(id)} />
                &nbsp;
                <DeleteButtonWithConfirm onConfirm={getDeleteHandler(id)} />
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};