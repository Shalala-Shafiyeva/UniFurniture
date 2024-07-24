import React from "react";
import "../components/productDetails/productDetails.css";
import '../components/productDetails/productDetailsResponsive.css';
import Header from "../components/header/Header";
import Main from "../components/productDetails/Main";
import ProductOverview from "../components/productDetails/ProductOverview";
import SimilarProducts from "../components/productDetails/SimilarProducts";
import Footer from '../components/footer/Footer';

function ProductDetails() {
  return (
    <>
      <Header />
      <Main />
      <ProductOverview />
      <SimilarProducts />
      <Footer/>
    </>
  );
}

export default ProductDetails;
