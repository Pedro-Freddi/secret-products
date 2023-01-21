import React from "react";
import styles from "./Product.module.css";

const Product = ({ product }) => {
  return (
    <article className={styles.container}>
        <img 
        src={`${process.env.REACT_APP_API_HOST_URL}${product.image}`}
        alt={product.displayName}
        className={styles.image}
        />
        <h3 className={styles.title}>{product.displayName}</h3>
      <p className={styles.price}>${product.price}</p>
    </article>
  );
};

export default Product;