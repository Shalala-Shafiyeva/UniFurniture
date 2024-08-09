import React, { useEffect } from "react";
import Header from "../components/header/Header";
import "../components/shopping/shopping.css";
import "../components/shopping/shoppingResponsive.css";
import ShoppingHero from "../components/shopping/ShoppingHero";
import Furnitures from "../components/shopping/Furnitures";
import ServiceCommite from "../components/shopping/ServiceCommite";
import ShopSlider from "../components/shopping/ShopSlider";
import Gallary from "../components/shopping/Gallary";
import PeopleSlider from "../components/shopping/PeopleSlider";
import StartShopping from "../components/shopping/StartShopping";
import Footer from "../components/footer/Footer";
import { Helmet } from "react-helmet";
import data from "../data.json";
import { useState } from "react";
function Shopping() {
  const [searchValue, setSearchValue] = useState(null);
  const [filteredData, setFilteredData] = useState(data.products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filterByInput = (products, searchValue) => {
    return products.filter(
      (prod) =>
        prod.fullTitle.toLowerCase().includes(searchValue) ||
        prod.type.toLowerCase().includes(searchValue) ||
        prod.category.toLowerCase().includes(searchValue) ||
        prod.price.toLowerCase().includes(searchValue) ||
        prod.name.toLowerCase().includes(searchValue) ||
        prod.description.toLowerCase().includes(searchValue) ||
        prod.text.toLowerCase().includes(searchValue)
    );
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    let products = data.products;

    if (selectedCategory) {
      products = products.filter(
        (prod) => prod.type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchValue) {
      products = filterByInput(products, searchValue);
    }

    setFilteredData(products);
  }, [searchValue, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <Header />
      <ShoppingHero
        searchValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
      />
      <Furnitures filteredData={filteredData} handleCategoryFilter={handleCategoryFilter} />
      <ServiceCommite />
      <ShopSlider />
      <Gallary />
      <PeopleSlider />
      <StartShopping />
      <Footer />
    </>
  );
}

export default Shopping;
