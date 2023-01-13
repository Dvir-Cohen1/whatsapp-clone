import { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import DefaultLayout from "../layout/DefaultLayout";
import { getLoggedInUser } from "../services/authentication";
import { getCookie } from "../utils/cookieHandler";

const Index = lazy(() => import("../pages/Index"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));




const AppRoutes = () => {
  const { isLogin }: any = useAuthContext();


  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={isLogin ? <Index /> : <Navigate to='/login' />} />
        <Route path="/login" element={!isLogin ? <Login /> : <Navigate to='/' />} />
        <Route path="/register" element={!isLogin ? <Register /> : <Navigate to='/' />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
