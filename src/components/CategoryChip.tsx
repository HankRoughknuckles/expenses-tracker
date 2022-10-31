import { Chip } from "@mui/material";
import React, { FunctionComponent, useMemo } from "react";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../model/categories";

interface Props {
  id: Category["id"];
}

export const CategoryChip: FunctionComponent<Props> = ({ id }) => {
  const { getCategory } = useCategories();
  const category = useMemo(() => getCategory(id), [getCategory, id]);

  if (category === undefined) throw new Error(`Tried to make category chip for non-existent category id ${id}`);

  return <Chip label={category.name} />;
};