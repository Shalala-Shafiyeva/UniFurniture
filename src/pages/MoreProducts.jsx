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
  const [filters, setFilters] = useState({
    types: [],
    color: null,
    sale: false,
    hasStock: false,
    created_at: false,
    highest: false,
    lowest: false,
  });

  const handleFilterChange = (filterKey, value) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   [filterKey]: value,
    // }));
    setFilters((prevFilters) => {
      if (filterKey === "created_at") {
        return {
          ...prevFilters,
          highest: false,
          lowest: false,
          [filterKey]: value,
        };
      } else if (filterKey === "highest") {
        return {
          ...prevFilters,
          created_at: false,
          lowest: false,
          [filterKey]: value,
        };
      } else if (filterKey === "lowest") {
        return {
          ...prevFilters,
          created_at: false,
          highest: false,
          [filterKey]: value,
        };
      }

      return {
        ...prevFilters,
        [filterKey]: value,
      };
    });
  };

  const handleTypeChange = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      types: prevFilters.types.includes(type)
        ? prevFilters.types.filter((t) => t !== type)
        : [...prevFilters.types, type],
    }));
  };

  const formatFilters = () => {
    const formattedFilters = {
      types: filters.types.length > 0 ? filters.types.join(",") : undefined,
      color: filters.color || undefined,
      sale: filters.sale ? 1 : undefined,
      hasStock: filters.hasStock ? 1 : undefined,
      created_at: filters.created_at ? 1 : undefined,
      highest: filters.highest ? 1 : undefined,
      lowest: filters.lowest ? 1 : undefined,
    };

    const cleanedFilters = Object.fromEntries(
      Object.entries(formattedFilters).filter(
        ([_, value]) => value !== undefined
      )
    );

    return new URLSearchParams(cleanedFilters).toString();
  };
  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/filteredProducts",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const result = await response.json();
  //     setProducts(result.data || []);
  //   } catch (err) {
  //     console.log("Error fetching: ", err);
  //   }
  // };
  const fetchFilteredProducts = async () => {
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
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>More Furnitures</title>
      </Helmet>
      <Header />
      <HeadFilters
        productsCount={products?.length || 0}
        filters={filters}
        fetchFilteredProducts={fetchFilteredProducts}
        handleFilterChange={handleFilterChange}
        formatFilters={formatFilters}
      />
      <div className="sections">
        <div className="container">
          <Filters
            filters={filters}
            fetchFilteredProducts={fetchFilteredProducts}
            handleFilterChange={handleFilterChange}
            handleTypeChange={handleTypeChange}
            formatFilters={formatFilters}
          />
          <FilteredProducts fetchedProducts={products} />
        </div>
      </div>
      <Delivery />
      <Footer />
    </>
  );
}

export default MoreProducts;
