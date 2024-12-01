import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ShoppingHero({
  // searchValue,
  // handleSearchInputChange,
  fetchProducts,
  fetchedProducts,
  handleFilterChange,
  filters,
  filteredKey,
  setFilteredKey,
}) {
  // const filteredProducts = useSelector(
  //   (state) => state.products.filteredProducts
  // );

  return (
    <section className="shoppingHero">
      <div className="container">
        <img src="images/shop/hero.png" alt="Your furniture" />
        <div className="context">
          <div className="cover">
            <h2>
              Every <span className="orange">Furniture</span> has a beautiful
              story
            </h2>
            <p>
              {" "}
              Every piece of furniture we offer has its own unique history and
              craftsmanship. From timeless designs to modern styles, each item
              tells a story that brings warmth and character to your home.
            </p>
          </div>
        </div>
        <div className="searchBar">
          <div className="inp">
            <input
              className="orange"
              type="text"
              name="search"
              placeholder="Let's Start your needs"
              value={filters.search}
              onChange={(e) => {
                // handleSearchInputChange(e);
                // handleSearchChange(e.target.value);
                handleFilterChange(e.target.name, e.target.value);
                if (e.target.value === "") {
                  setFilteredKey(false);
                }else{
                  setFilteredKey(true);
                }
              }}
              // value={searchValue}
            />
            <button>
              <img src="/images/shop/search.png" alt="Search icon" />
            </button>
          </div>
        </div>
        <div className="circle itemm1"></div>
        <div className="circle itemm2"></div>
        <div className="circle itemm3"></div>
        <div className="circle itemm4"></div>
        <div className="circle itemm5"></div>
        <div className="circle itemm6"></div>
      </div>
    </section>
  );
}

export default ShoppingHero;
