import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./components/homepage/HomePage.js";
import LoginPage from "./components/login/LoginPage.js";
import RegisterPage from "./components/register/RegisterPage.js";
import NotFound from "./components/not-found/NotFound.js";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;