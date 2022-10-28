import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { CategoriesListPage } from "./components/CategoriesListPage";
import { CreateAccountPage } from "./components/CreateAccountPage";
import { ExpensesListPage } from "./components/ExpensesListPage";
import { LoginPage } from "./components/LoginPage";
import { Nav } from "./components/Nav";
import { useLogin } from "./hooks/useLogin";
import { setupAccountDatabase } from "./model/user";
import { CATEGORIES_PATH, CREATE_ACCOUNT_PATH, LOGIN_PATH, ROOT_PATH } from "./utils/routes";

/** Routes that can only be accessed if a user is logged in */
const privateRoutes = (
  <>
    <Route path={ROOT_PATH} element={<ExpensesListPage />} />
    <Route path={CATEGORIES_PATH} element={<CategoriesListPage />} />
  </>
);

/** Routes that can be accessed by someone who is not logged in */
const publicRoutes = (
  <>
    <Route path={LOGIN_PATH} element={<LoginPage />} />
    <Route path={CREATE_ACCOUNT_PATH} element={<CreateAccountPage />} />
    {/* Need * route to redirect any other attempts back to the login page */}
    <Route path={"*"} element={<Navigate replace to={LOGIN_PATH} />} />
  </>
);

function App() {
  const { isUserLoggedIn } = useLogin();

  useEffect(() => {
    setupAccountDatabase();
  }, []);

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
