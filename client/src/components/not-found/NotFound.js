import React from "react";
import notFoundIcon from "../../icons/not-found.png";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Not Found</h2>
      <img src={notFoundIcon} alt="404 error icon" />
      <p className={styles.message}>Sorry, can't find the requested page.</p>
    </div>
  );
};

export default NotFound;