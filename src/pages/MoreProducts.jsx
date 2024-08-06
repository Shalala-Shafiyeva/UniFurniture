import React from "react";
import "../components/moreProducts/moreProducts.css";
import "../components/moreProducts/moreProductsResponsive.css";
import Header from "../components/header/Header";
import HeadFilters from "../components/moreProducts/HeadFilters";
import data from "../data.json";
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
  return (
    <>
      <Helmet>
        <title>More Furnitures</title>
      </Helmet>
      <Header />
      <HeadFilters />
      <div className="sections">
        <div className="container">
          <Filters />
          <FilteredProducts />
        </div>
      </div>
      <Delivery />
      <Footer />
    </>
  );
}

export default MoreProducts;
