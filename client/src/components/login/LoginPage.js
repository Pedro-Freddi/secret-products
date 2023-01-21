import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Render login form
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Log in to your account</h2>
      <LoginForm />
      <p className={styles.registerMessage}>
        Don't have an account? <Link to="/register" className={styles.link}>Register here.</Link>
      </p>
    </section>
  );
};

export default LoginPage;