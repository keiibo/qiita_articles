// src/routes/AppRouter.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "../feature/auth/Login";
import { Home } from "../Home";
import { Path } from "../constant/Path";

type TProps = {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
};

export const AppRouter = ({
  isLoggedIn,
  onLoginSuccess,
}: TProps): React.JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate replace to={Path.TECH_ARTICLE} />
            ) : (
              <Navigate replace to={Path.LOGIN} />
            )
          }
        />
        <Route
          path={Path.LOGIN}
          element={
            isLoggedIn ? <Home /> : <Login onLoginSuccess={onLoginSuccess} />
          }
        />
        <Route
          path={Path.TECH_ARTICLE}
          element={
            isLoggedIn ? <Home /> : <Login onLoginSuccess={onLoginSuccess} />
          }
        />
        <Route path="*" element={<Navigate replace to={Path.LOGIN} />} />
      </Routes>
    </Router>
  );
};
