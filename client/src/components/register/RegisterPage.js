import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import RegisterForm from "./RegisterForm.js";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {

  const navigate = useNavigate();

  // Local state variable to track a successful registration
  const [ registrationSuccess, setRegistrationSuccess ] = useState(false);

  // On registration success, render a confirmation message and redirect
  // user to login page after 3 seconds
  useEffect(() => {
    if (registrationSuccess) {
      const timerId = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
      return () => clearTimeout(timerId);
    }
  });

  if (registrationSuccess) {
    return (
      <section className={styles.container}>
        <p className={styles.successMessage}>Registration successful!</p>
        <p className={styles.redirectMessage}>Redirecting to login page...</p>
        <ClipLoader />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create an Account</h2>
      <RegisterForm onRegistrationSuccess={setRegistrationSuccess} />
      <p className={styles.loginMessage}>
        Already have an account? <Link to="/login" className={styles.link}>Log in here.</Link>
      </p>
    </section>
  );
};

export default RegisterPage;