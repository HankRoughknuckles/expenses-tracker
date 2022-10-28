import { replaceElement } from "../utils/array";
import { Categories, DatabaseId, generateId, getDatabase, setDatabase } from "./index";

export interface Category {
  id: DatabaseId;
  name: string;
}

const validateCategory = (input: Partial<Category>) => {
  if (input.name === "" || input.name === undefined) {
    throw new Error("Category name must not be blank");
  }
};

export const getCategories = (): Category[] => {
  return getDatabase().categories;
};

export const setCategories = (newCategories: Categories) => {
  setDatabase({
    ...getDatabase(),
    categories: newCategories
  });
};

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

export const deleteCategory = (categoryId: Category["id"]) => {
  const newList = getCategories().filter(category => category.id !== categoryId);
  setCategories(newList);
  // TODO: remove the id from expenses that have the id when you implement expenses
};

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
