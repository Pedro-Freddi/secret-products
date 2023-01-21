import React from "react";
import Product from "../products/Product.js";

const HomePage = () => {
  return (
    <Product 
    product={{ displayName: "Item 1", image: "/product1", price: 45.99 }} 
    />
  );
};

export default HomePage;