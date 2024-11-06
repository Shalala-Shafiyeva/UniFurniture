import React, { useEffect, useState } from "react";
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
  //withoout backend
  // const allProducts = useSelector((state) => state.products.products);
  // const { type, id } = useParams();
  // const product = allProducts.find(
  //   (prod) => prod.id == id && prod.type == type
  // );
  // console.log(product, "product");

  //with backend
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState(0);
  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      response.status == 200 ? setProduct(result.data) : setProduct({});
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/similarProducts/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setSimilarProducts(result.data);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  const fetchProductReviews = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product/${id}/reviews`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success == true) {
        setReviews(result.data);
      } else {
        setReviews(0);
      }
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  const addView = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product/${id}/addView`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };
  
  useEffect(() => {
    fetchProduct(id);
    fetchSimilarProducts();
    fetchProductReviews(id);
    addView(id);
  }, [id]);

  if (!product) {
    // return <div>Notfound</div>;
    return (
      <>
        <Helmet>
          <title>Not Found</title>
        </Helmet>
        <Navigate to="/notFound" />
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <Header />
      <Main product={product} reviews={reviews} />
      <ProductOverview product={product} />
      <SimilarProducts similarProducts={similarProducts} />
      <Footer />
    </>
  );
}

export default ProductDetails;
