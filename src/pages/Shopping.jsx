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
  // const [searchValue, setSearchValue] = useState(null);
  // const [filteredData, setFilteredData] = useState(data.products);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const filterByInput = (products, searchValue) => {
  //   return products.filter(
  //     (prod) =>
  //       prod.fullTitle.toLowerCase().includes(searchValue) ||
  //       prod.type.toLowerCase().includes(searchValue) ||
  //       prod.category.toLowerCase().includes(searchValue) ||
  //       prod.price.toLowerCase().includes(searchValue) ||
  //       prod.name.toLowerCase().includes(searchValue) ||
  //       prod.description.toLowerCase().includes(searchValue) ||
  //       prod.text.toLowerCase().includes(searchValue)
  //   );
  // };

  // const handleSearchInputChange = (e) => {
  //   setSearchValue(e.target.value.toLowerCase());
  // };

  // const handleCategoryFilter = (category) => {
  //   setSelectedCategory(category);
  // };

  // useEffect(() => {
  //   let products = data.products;

  //   if (selectedCategory) {
  //     products = products.filter(
  //       (prod) => prod.type.toLowerCase() === selectedCategory.toLowerCase()
  //     );
  //   }

  //   if (searchValue) {
  //     products = filterByInput(products, searchValue);
  //   }

  //   setFilteredData(products);
  // }, [searchValue, selectedCategory]);

  //with backend
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [filters, setFilters] = useState({ search: null, categories: null });
  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  const formatFilters = () => {
    const formattedFilters = {
      search: filters.search || undefined,
      categories: filters.categories || undefined,
    };

    const cleanedFilters = Object.fromEntries(
      Object.entries(formattedFilters).filter(
        ([_, value]) => value !== undefined
      )
    );

    return new URLSearchParams(cleanedFilters).toString();
  };
  const fetchProducts = async () => {
    try {
      const query = formatFilters();
      const response = await fetch(
        `http://localhost:8000/api/filteredProducts?${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setFetchedProducts(result.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <Header />
      <ShoppingHero
        // searchValue={searchValue}
        // handleSearchInputChange={handleSearchInputChange}
        fetchProducts={fetchProducts}
        handleFilterChange={handleFilterChange}
        filters={filters}
      />
      <Furnitures
        // filteredData={filteredData}
        // handleCategoryFilter={handleCategoryFilter}
        fetchProducts={fetchProducts}
        fetchedProducts={fetchedProducts}
        handleFilterChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
      />
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
