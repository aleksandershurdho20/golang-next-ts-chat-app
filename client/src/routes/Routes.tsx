import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./config";

const RouteWrapper: FC = () => (
  <BrowserRouter>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default RouteWrapper;
