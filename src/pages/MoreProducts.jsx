import React, { useEffect, useState } from "react";
import "../components/moreProducts/moreProducts.css";
import "../components/moreProducts/moreProductsResponsive.css";
import Header from "../components/header/Header";
import HeadFilters from "../components/moreProducts/HeadFilters";
import Filters from "../components/moreProducts/Filters";
import FilteredProducts from "../components/moreProducts/FilteredProducts";
import Delivery from "../components/moreProducts/Delivery";
import Footer from "../components/footer/Footer";
import { Helmet } from "react-helmet";

function MoreProducts() {
  // let sortedData = data.products;
  // const sortByNew = () => {
  //   sortedData = data.products
  //     .slice(0)
  //     .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  // };

  // const sortByHighPrice = () => {
  //   sortedData = data.products.slice(0).sort((a, b) => b.price - a.price);
  // };

  // const sortByLowPrice = () => {
  //   sortedData = data.products.slice(0).sort((a, b) => a.price - b.price);
  // };

  //products from backend
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/publishedProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setProducts(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>More Furnitures</title>
      </Helmet>
      <Header />
      <HeadFilters productsCount={products?.length || 0} />
      <div className="sections">
        <div className="container">
          <Filters />
          <FilteredProducts fetchedProducts={products} />
        </div>
      </div>
      <Delivery />
      <Footer />
    </>
  );
}

export default MoreProducts;
