import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// // static import
import Layout from "./layouts";
import { guestRoutes, userRoutes } from "./routes";
import "./App.css";

const mainContent = userRoutes.map((route) => {
  return route.component ? (
    <Route
      key={route.name}
      path={route.path}
      exact={route.exact}
      name={route.name}
      element={<route.component />}
    />
  ) : (
    route.redirectRoute && (
      <Route path="*" key={route.name} element={<Navigate to={route.path} />} />
    )
  );
});

const guestContent = guestRoutes.map((route) => (
  <Route
    key={route.name}
    path={route.path}
    exact={route.exact}
    element={<route.component />}
  />
));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>{mainContent}</Route>
      {guestContent}
    </Routes>
  );
}

export default App;
