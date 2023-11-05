import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import CreateCourse from "../pages/Courses/CreateCourse";
import ViewCourse from "../pages/Courses/ViewCourse";
import Auth from "../pages/Auth/Index";
import Dashboard from "../pages/Dashboard/Dashboard";
import UpdateCourse from "../pages/Dashboard/Courses/UpdateCourse";

const RouteWrapper: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="course/create" element={<CreateCourse />} />
      <Route path="course/:id" element={<ViewCourse />} />
      <Route path="auth" element={<Auth />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="update/course/:id" element={<UpdateCourse />} />
    </Routes>
  </BrowserRouter>
);

export default RouteWrapper;
