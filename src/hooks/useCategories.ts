import { useCallback } from "react";
import * as api from "../api";
import { Category } from "../model/categories";
import { replaceElement } from "../utils/array";
import { useAccountContext } from "./useAccounts";
import { useTransactions } from "./useTransactions";

export const useCategories = () => {
  const { categories, setCategories } = useAccountContext();
  const { pruneCategoryId } = useTransactions();

  /** Calls the backend to create a new category */
  const createCategory = useCallback((name: string) => {
    const category = api.createCategory(name);
    setCategories([...categories, category]);
  }, [categories, setCategories]);

  /** Calls the backend to fetch the list of categories */
  const fetchCategories = useCallback((): void => {
    const categories = api.getCategories();
    setCategories(categories);
  }, [setCategories]);

  /** Calls the backend to delete the category with the passed id */
  const deleteCategory = useCallback((id: Category["id"]) => {
    api.deleteCategory(id);
    setCategories(categories => categories.filter(category => category.id !== id));
    pruneCategoryId(id);
  }, [pruneCategoryId, setCategories]);

  /** searches the local state to find the category with the passed id */
  const getCategory = useCallback((id: Category["id"]) => {
    return categories.find(category => category.id === id);
  }, [categories]);

  /** Calls the backend to update the category with the passed id */
  const updateCategory = useCallback((id: Category["id"], name: Category["name"]) => {
    const category = api.updateCategory(id, name);
    setCategories(categories =>
      replaceElement(
        categories,
        category,
        (category) => category.id === id
      ));
  }, [setCategories]);

  return {
    createCategory,
    fetchCategories,
    deleteCategory,
    updateCategory,
    getCategory,
    categories
  };
};