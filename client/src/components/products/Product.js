import React from "react";
import styles from "./Product.module.css";

const Product = ({ product }) => {
  return (
    <article className={styles.container}>
        <img 
        src={product.image}
        alt={product.display_name}
        className={styles.image}
        />
        <h3 className={styles.title}>{product.display_name}</h3>
      <p className={styles.price}>${product.price}</p>
    </article>
  );
};

export default Product;