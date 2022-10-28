import { useCallback } from "react";
import * as api from "../api";
import { Category } from "../model/categories";
import { replaceElement } from "../utils/array";
import { useAccountContext } from "./useAccounts";

export const useCategories = () => {
  const { categories, setCategories } = useAccountContext();

  const createCategory = useCallback((name: string) => {
    const category = api.createCategory(name);
    setCategories([...categories, category]);
  }, [categories, setCategories]);

  const fetchCategories = useCallback((): void => {
    const categories = api.getCategories();
    setCategories(categories);
  }, [setCategories]);

  const deleteCategory = useCallback((id: Category["id"]) => {
    api.deleteCategory(id);
    setCategories(categories => categories.filter(category => category.id !== id));
    // TODO: prune the ids from expenses that have the category id
  }, [setCategories]);

  const getCategory = useCallback((id: Category["id"]) => {
    return categories.find(category => category.id === id);
  }, [categories]);

  const updateCategory = useCallback((id: Category["id"], name: Category["name"]) => {
    const category = api.updateCategory(id, name);
    setCategories(categories =>
      replaceElement(
        categories,
        category,
        (category) => category.id === id
      ))
    ;
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