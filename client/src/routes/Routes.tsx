import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutesConfig, routes } from "./config";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "@/components/Dashboard/Index";

const RouteWrapper: FC = () => (
  <BrowserRouter>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}

      {privateRoutesConfig.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <PrivateRoutes>
              <Dashboard>
                <route.component />
              </Dashboard>
            </PrivateRoutes>
          }
        />
      ))}
    </Routes>
  </BrowserRouter>
);

export default RouteWrapper;
