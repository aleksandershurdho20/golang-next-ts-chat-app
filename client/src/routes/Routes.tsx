import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import CreateCourse from "../pages/Courses/CreateCourse";
import ViewCourse from "../pages/Courses/ViewCourse";
import Auth from "../pages/Auth/Index";

const RouteWrapper: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="course/create" element={<CreateCourse />} />
      <Route path="course/:id" element={<ViewCourse />} />
      <Route path="auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>
);

export default RouteWrapper;
