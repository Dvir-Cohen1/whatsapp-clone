import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";

const Index = lazy(() => import("../pages/Index"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const AppRoutes = () => {
  return (

    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
