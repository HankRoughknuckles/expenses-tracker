import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { CategoriesListPage } from "./components/CategoriesListPage";
import { EditCategoryPage } from "./components/EditCategoryPage";
import { EditTransactionPage } from "./components/EditTransactionPage";
import { LoginPage } from "./components/LoginPage";
import { Nav } from "./components/Nav";
import { NewAccountPage } from "./components/NewAccountPage";
import { NewCategoryPage } from "./components/NewCategoryPage";
import { NewTransactionPage } from "./components/NewTransactionPage";
import { TransactionsListPage } from "./components/TransactionsListPage";
import { useCategories } from "./hooks/useCategories";
import { useLogin } from "./hooks/useLogin";
import { useTransactions } from "./hooks/useTransactions";
import { setupDatabase } from "./model";
import {
  CATEGORIES_PATH,
  EDIT_CATEGORY_PATH,
  EDIT_TRANSACTION_PATH,
  LOGIN_PATH,
  NEW_ACCOUNT_PATH,
  NEW_CATEGORY_PATH,
  NEW_TRANSACTION_PATH,
  ROOT_PATH
} from "./utils/routes";

/** Routes that can only be accessed if a user is logged in */
const privateRoutes = (
  <>
    <Route path={ROOT_PATH} element={<TransactionsListPage />} />
    <Route path={NEW_TRANSACTION_PATH} element={<NewTransactionPage />} />
    <Route path={EDIT_TRANSACTION_PATH} element={<EditTransactionPage />} />
    <Route path={CATEGORIES_PATH} element={<CategoriesListPage />} />
    <Route path={NEW_CATEGORY_PATH} element={<NewCategoryPage />} />
    <Route path={EDIT_CATEGORY_PATH} element={<EditCategoryPage />} />
  </>
);

/** Routes that can be accessed by someone who is not logged in */
const publicRoutes = (
  <>
    <Route path={LOGIN_PATH} element={<LoginPage />} />
    <Route path={NEW_ACCOUNT_PATH} element={<NewAccountPage />} />
    {/* Need a * route to redirect any other attempts back to the login page */}
    <Route path={"*"} element={<Navigate replace to={LOGIN_PATH} />} />
  </>
);

function App() {
  const { isUserLoggedIn } = useLogin();
  // // TODO: warning, remove this before finishing everything
  // const { isUserLoggedIn, login } = useLogin();
  const { fetchCategories } = useCategories();
  const { fetchTransactions } = useTransactions();

  // Setup the database and fetch the categories on app load
  useEffect(() => {
    setupDatabase();
    fetchCategories();

    // // // TODO: WARNING! REMOVE THIS
    // // // TODO: WARNING! REMOVE THIS
    // const account = getAccounts().find(a => a.email === "admin" && a.password === "admin");
    // if (!account) {
    //   createAccount("admin", "admin");
    // }
    // login("admin", "admin");
  }, [fetchCategories]);

  // Fetch transactions for the user on login
  useEffect(() => {
    if (!isUserLoggedIn) return;
    fetchTransactions();
  }, [fetchTransactions, isUserLoggedIn]);

  return (
    <Container maxWidth={"xl"} className={"container"}>
      <Nav />
      <Routes>
        {isUserLoggedIn ? privateRoutes : publicRoutes}
      </Routes>
    </Container>
  );
}

export default App;
