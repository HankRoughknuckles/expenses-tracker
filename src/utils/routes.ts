import { generatePath } from "react-router-dom";
import { Category } from "../model/categories";

export const EXPENSES_PATH = "/";

export const CATEGORIES_PATH = "/categories";
export const NEW_CATEGORY_PATH = "/categories/new";
export const EDIT_CATEGORY_PATH = "/categories/edit/:categoryId";
export const getEditCategoryUrl = (categoryId: Category["id"]) => {
  return generatePath(EDIT_CATEGORY_PATH, { categoryId });
};

export const LOGIN_PATH = "/login";
export const NEW_ACCOUNT_PATH = "/accounts/new";

export const ROOT_PATH = EXPENSES_PATH;