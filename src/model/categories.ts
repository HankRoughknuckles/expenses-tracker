import { replaceElement } from "../utils/array";
import { getAccounts } from "./accounts";
import { Categories, DatabaseId, generateId, getDatabase, setDatabase } from "./index";
import { getTransactions, removeCategoryFromTransaction } from "./transactions";

export interface Category {
  id: DatabaseId;
  name: string;
}

/** Throws if the passed input is not a proper category */
const validateCategory = (input: Partial<Category>) => {
  if (input.name === "" || input.name === undefined) {
    throw new Error("Category name must not be blank");
  }
};

/** Returns all the categories stored in the db */
export const getCategories = (): Category[] => {
  return getDatabase().categories;
};

/** Sets the list of all categories in the db to the passed list */
export const setCategories = (newCategories: Categories) => {
  setDatabase({
    ...getDatabase(),
    categories: newCategories
  });
};

/** Appends a category with the passed name to the list of categories in the db */
export const createCategory = (name: string): Category => {
  const newCategory = { id: generateId(), name };
  validateCategory(newCategory);

  const categories = getCategories();
  if (categories.find(category => category.name === name)) {
    throw new Error("A category already exists with that name");
  }

  setCategories([
    ...categories,
    newCategory
  ]);
  return newCategory;
};

/** Removes the category with the passed id from the db */
export const deleteCategory = (categoryId: Category["id"]) => {
  const newList = getCategories().filter(category => category.id !== categoryId);
  setCategories(newList);

  // Remove the category id from all transactions that referenced it
  getAccounts().forEach(({ email, password }) => {
    const loginCredentials = { email, password };
    const transactions = getTransactions(loginCredentials);
    transactions.forEach(transaction => {
      removeCategoryFromTransaction(loginCredentials, transaction.id);
    });
  });
};

/** Changes the category with the passed id to have the new information passed in */
export const updateCategory = (id: Category["id"], name: Category["name"]): Category => {
  const updatedCategory = { id, name };
  validateCategory(updatedCategory);

  const newList = replaceElement(
    getCategories(),
    updatedCategory,
    (category) => category.id === id
  );

  setCategories(newList);
  return updatedCategory;
};
