import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  sortByDateAdded,
  sortByHighestPrice,
  sortByLowestPrice,
  resetFilters,
} from "../../slices/productsSlices";

function HeadFilters({
  productsCount,
  filters,
  fetchFilteredProducts,
  handleFilterChange,
  formatFilters,
}) {
  useEffect(() => {
    formatFilters();
    fetchFilteredProducts();
  }, [filters]);

  // useEffect(() => {
  //   fetchFilteredProducts();
  // }, []);
  

  // const products = useSelector((state) => state.products.filteredProducts);
  // const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState("");
  // const handleActiveSort = (sortType) => {
  //   if (activeSort == sortType) {
  //     // dispatch(resetFilters());
  //     setActiveSort("");
  //   }
    // else {
    //   switch (sortType) {
    //     case "date":
    //       dispatch(sortByDateAdded());
    //       break;
    //     case "highest":
    //       dispatch(sortByHighestPrice());
    //       break;
    //     case "lowest":
    //       dispatch(sortByLowestPrice());
    //       break;
    //     default:
    //       break;
    //   }
    // setActiveSort(sortType);
    // }
  //};

  const handleActiveSort = (sortType) => {
    if (activeSort === sortType) {
      setActiveSort("");
    } else {
      setActiveSort(sortType);
    }
  };

  return (
    <section className="headFilters">
      <div className="container">
        <div className="cover">
          <Link
            className="backBtn"
            to="/shop"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src="/images/shop/arrowleft.png" alt="Back" />
            <span>Geri qayıt</span>
          </Link>
          <div className="backLinks">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Ana səhifə
            </Link>
            <img src="/images/chevron-left.png" alt="Icon" />
            <Link
              to="/shop"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Alış-veriş
            </Link>
            <img src="/images/chevron-left.png" alt="Icon" />
            <Link to="#">Daha çox</Link>
          </div>
          <div className="sort">
            <span>Sırala:</span>
            <div className="sortBtns">
              <input
                type="checkbox"
                id="date"
                name="created_at"
                onChange={(e) => {
                  handleFilterChange("created_at", e.target.checked);
                  fetchFilteredProducts();
                }}
              />
              <label
                htmlFor="date"
                className={`${activeSort == "created_at" ? "active" : ""}`}
                onClick={() => handleActiveSort("created_at")}
              >
                Yeni
              </label>
              <input
                type="checkbox"
                id="highest"
                name="highest"
                onChange={(e) => {
                  handleFilterChange("highest", e.target.checked);
                  fetchFilteredProducts();
                }}
              />
              <label
                htmlFor="highest"
                className={`${activeSort == "highest" ? "active" : ""}`}
                onClick={() => handleActiveSort("highest")}
              >
                Ən bahalı
              </label>
              <input
                type="checkbox"
                id="lowest"
                name="lowest"
                onChange={(e) => {
                  handleFilterChange("lowest", e.target.checked);
                  fetchFilteredProducts();
                }}
              />
              <label
                htmlFor="lowest"
                className={`${activeSort == "lowest" ? "active" : ""}`}
                onClick={() => handleActiveSort("lowest")}
              >
                Ən ucuz
              </label>
            </div>
            {/*without backend
             <span>{products.length} results</span> */}
            {/* with backend */}
            <span>{productsCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeadFilters;
