import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mailIcon from "../../icons/mail.png";
import keyIcon from "../../icons/key.png";
import LoadingSpinner from "../utils/LoadingSpinner.js";
import errorIcon from "../../icons/error.png";
import styles from "./LoginForm.module.css";

const LoginForm = () => {

  const navigate = useNavigate();

  // Component state variables
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  // Form variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const stateSetters = {
    email: setEmail,
    password: setPassword
  };

  // Form change event handler
  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    stateSetters[name](value);
  };

  // Submit event handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    fetch("api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      setIsLoading(false);

      // Set error message if present
      if (data.message) {
        setError(data.message);
        return;
      }

      // Store JWT token in local storage
      localStorage.setItem("token", data.token);

      setError(null);
      navigate("/");
    })
    .catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="email-login" className={styles.label}>
        <img src={mailIcon} alt="" className={styles.icon} />
        E-mail
      </label>
      <input
        id="email-login"
        className={styles.input}
        name="email"
        type="email"
        value={email}
        onChange={handleInputChange}
        required={true}
        />
      <label htmlFor="password-login" className={styles.label}>
        <img src={keyIcon} alt="" className={styles.icon} />
        Password
      </label>
      <input
        id="password-login"
        className={styles.input}
        name="password"
        type="password"
        value={password}
        onChange={handleInputChange}
        required={true}
        />
      { isLoading ? 
        <LoadingSpinner size="8px" />
        : <input type="submit" className={styles.button} value="Login" /> }
      { error && <p className={styles.errorMessage}>
                    <img src={errorIcon} alt="Error" className={styles.icon} />
                    {error}
                  </p> 
      }
    </form>
  );
};

export default LoginForm;