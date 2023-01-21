import React from "react";
import { PulseLoader } from "react-spinners";

const LoadingSpinner = ({ size, margin }) => {
  const loaderSize = size || "15px";
  const loaderMargin = margin || "20px";
  const styles = {
    margin: loaderMargin,
    alignSelf: "center",
    textAlign: "center"
  };
  return <PulseLoader size={loaderSize} cssOverride={styles} />;
};

export default LoadingSpinner;