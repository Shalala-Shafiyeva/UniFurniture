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
              Hər bir <span className="orange">Məhsulun</span> gözəl bir hekayəsi
              var
            </h2>
            <p>
              {" "}
              Təklif etdiyimiz hər bir mebelin özünə məxsus bir tarixçəsi və
              ustalığı var. Vaxtsız dizaynlardan müasir üslublara qədər, hər bir
              əşya evinizə istilik və xarakter qataraq öz hekayəsini danışır.
            </p>
          </div>
        </div>
        <div className="searchBar">
          <div className="inp">
            <input
              className="orange"
              type="text"
              name="search"
              placeholder="Ehtiyaclarınızı qarşılamağa başlayaq"
              value={filters.search}
              onChange={(e) => {
                // handleSearchInputChange(e);
                // handleSearchChange(e.target.value);
                handleFilterChange(e.target.name, e.target.value);
                if (e.target.value === "") {
                  setFilteredKey(false);
                } else {
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
