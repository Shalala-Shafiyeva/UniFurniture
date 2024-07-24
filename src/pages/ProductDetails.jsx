import React from "react";
import "../components/productDetails/productDetails.css";
import Header from "../components/header/Header";
import Main from "../components/productDetails/Main";
import ProductOverview from "../components/productDetails/ProductOverview";

function ProductDetails() {
  return (
    <>
      <Header />
      <Main />
      <ProductOverview />
    </>
  );
}

export default ProductDetails;
