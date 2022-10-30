import { generatePath } from "react-router-dom";
import { Category } from "../model/categories";
import { Transaction } from "../model/transactions";

export const TRANSACTIONS_PATH = "/";
export const NEW_TRANSACTION_PATH = "/transactions/new";
export const EDIT_TRANSACTION_PATH = "/transactions/edit/:transactionId";
export const getEditTransactionUrl = (transactionId: Transaction["id"]) => {
  return generatePath(EDIT_TRANSACTION_PATH, { transactionId });
};

export const CATEGORIES_PATH = "/categories";
export const NEW_CATEGORY_PATH = "/categories/new";
export const EDIT_CATEGORY_PATH = "/categories/edit/:categoryId";
export const getEditCategoryUrl = (categoryId: Category["id"]) => {
  return generatePath(EDIT_CATEGORY_PATH, { categoryId });
};

export const LOGIN_PATH = "/login";
export const NEW_ACCOUNT_PATH = "/accounts/new";

export const ROOT_PATH = TRANSACTIONS_PATH;