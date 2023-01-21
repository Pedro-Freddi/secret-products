import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../products/Product.js";
import LoadingSpinner from "../utils/LoadingSpinner.js";
import styles from "./Homepage.module.css";

const HomePage = () => {

  const navigate = useNavigate();

  // Component state variables
  const [ products, setProducts ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  // Get JWT token from local storage
  const token = localStorage.getItem("token");

  // Logic to verify token and fetch products
  useEffect(() => {
    // Redirect to login page if token is not present
    if (!token) {
      navigate("/login");
      return;
    }

    setIsLoading(true);

    // Fetch products
    fetch("/api/products", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setIsLoading(false);
      
      // Redirect to login if token is invalid
      if (data.message === "Invalid authentication token.") {
        navigate("/login");
        return;
      }

      // Set error message if present
      if (data.message) {
        setError(data.message);
        return;
      }

      setProducts(data);
      setError(null);
    })
    .catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className={styles.container}>
      { isLoading && <LoadingSpinner size="8px" /> }
      { error && <p>{error}</p> }
      <section className={styles.productsContainer}>
        { products && products.map(product => {
            return <Product product={product} key={product.id} />;
            }) 
        }
      </section>
      {
        products && <button
                     name="logout"
                     className={styles.button} 
                     value="Logout" 
                     onClick={handleLogout}>
                      Logout
                     </button>
      }
    </section>
  );
};

export default HomePage;