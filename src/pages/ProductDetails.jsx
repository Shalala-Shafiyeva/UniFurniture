import React from "react";
import "../components/productDetails/productDetails.css";
import "../components/productDetails/productDetailsResponsive.css";
import Header from "../components/header/Header";
import Main from "../components/productDetails/Main";
import ProductOverview from "../components/productDetails/ProductOverview";
import SimilarProducts from "../components/productDetails/SimilarProducts";
import Footer from "../components/footer/Footer";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

function ProductDetails() {
  const singleProduct = useSelector((state) => state.products.singleProduct);
  const { type, id } = useParams();
  const product = singleProduct.find(
    (prod) => prod.id == id && prod.type == type);
  if (!product) {
    return (
      <>
        <Helmet>
          <title>Not Found</title>
        </Helmet>
        <Navigate to="notFound" />
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Product</title>
        </Helmet>
        <Header />
        <Main />
        <ProductOverview />
        <SimilarProducts />
        <Footer />
      </>
    );
  }
}

export default ProductDetails;
