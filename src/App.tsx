import { Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { CategoriesListPage } from "./components/CategoriesListPage";
import { ExpensesListPage } from "./components/ExpensesListPage";
import { Nav } from "./components/Nav";
import { CATEGORIES_PATH, ROOT_PATH } from "./utils/routes";

function App() {
  return (
    <Container maxWidth={"xl"} className={"container"}>
      <Nav />
      <Routes>
        <Route path={ROOT_PATH} element={<ExpensesListPage />} />
        <Route path={CATEGORIES_PATH} element={<CategoriesListPage />} />
      </Routes>
    </Container>
  );
}

export default App;
