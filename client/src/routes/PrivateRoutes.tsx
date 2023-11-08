import React from "react";
import { Route, Navigate } from "react-router-dom";

type PrivateRouteProps = {
  path: string;
  element: React.ReactNode; // Component or layout
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const isAuth = true;
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
