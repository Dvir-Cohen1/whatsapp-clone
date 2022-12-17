import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { getCookie } from "../utils/cookieHandler";

const Index = lazy(() => import("../pages/Index"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const accessTokenCoockie = getCookie('accessToken') ? true : false;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={accessTokenCoockie ? <Index /> : <Navigate to='/login'/>} />
        <Route path="/login" element={!accessTokenCoockie ? <Login /> : <Navigate to='/'/>} />
        <Route path="/register" element={!accessTokenCoockie ? <Register /> : <Navigate to='/'/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
