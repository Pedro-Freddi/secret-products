import React, { useState } from "react";
import mailIcon from "../../icons/mail.png";
import nameIcon from "../../icons/name.png";
import keyIcon from "../../icons/key.png";
import LoadingSpinner from "../utils/LoadingSpinner.js";
import errorIcon from "../../icons/error.png";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onRegistrationSuccess }) => {

  // Component state variables
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  
  // Form variables
  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  // State setters collection
  const stateSetter = {
    email: setEmail,
    firstName: setName,
    password: setPassword,
    confirmPassword: setConfirmPassword
  };

  // Input change handler
  const handleInputChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    stateSetter[name](value);
  };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    })
    .then(response => {
      if (response.status === 201) {
        onRegistrationSuccess(true);
        return;
      }
      return response.json();
    })
    .then(data => {
      setIsLoading(false);
      if (data.message) setError(data.message);
    })
    .catch(err => {
      setIsLoading(false);
      setError(err.message);
    })
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="email-register" className={styles.label}>
        <img src={mailIcon} alt="" className={styles.icon} />
        E-mail
      </label>
      <input
        id="email-register"
        className={styles.input}
        name="email"
        type="email"
        value={email}
        onChange={handleInputChange}
        required={true}
      />
      <label htmlFor="name-register" className={styles.label}>
        <img src={nameIcon} alt="" className={styles.icon} />
        Name
      </label>
      <input 
        id="firstName-register"
        className={styles.input}
        name="firstName"
        type="text"
        value={name}
        onChange={handleInputChange}
        required={true}
        maxLength="100"
      />
      <label htmlFor="password-register" className={styles.label}>
        <img src={keyIcon} alt="" className={styles.icon} />
        Password <br/><span className={styles.labelDescription}>(8-64 characters, 1+ uppercase letters, symbols and numbers)</span>
      </label>
      <input
        id="password-register"
        className={styles.input}
        name="password"
        type="password"
        value={password}
        onChange={handleInputChange}
        required={true}
        minLength="8"
        maxLength="64"
      />
      <label htmlFor="confirmPassword-register" className={styles.label}>
        Confirm Password
      </label>
      <input
        id="confirmPassword-register"
        className={styles.input}
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={handleInputChange}
        required={true}
        minLength="8"
        maxLength="64"
      />
      { isLoading ?
        <LoadingSpinner size="8px" />
        :
        <input type="submit" className={styles.button} value="Submit" /> }
      { error && <p className={styles.errorMessage}>
                   <img src={errorIcon} alt="Error" className={styles.icon} />
                   {error}
                 </p>  
      }
    </form>
  );
};

export default RegisterForm;