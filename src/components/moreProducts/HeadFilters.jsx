import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  sortByDateAdded,
  sortByHighestPrice,
  sortByLowestPrice,
  resetFilters,
} from "../../slices/productsSlices";

function HeadFilters() {
  const products = useSelector((state) => state.products.filteredProducts);
  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(null);
  const handleActiveSort = (sortType) => {
    if (activeSort === sortType) {
      dispatch(resetFilters());
      setActiveSort(null);
    } else {
      switch (sortType) {
        case "date":
          dispatch(sortByDateAdded());
          break;
        case "highest":
          dispatch(sortByHighestPrice());
          break;
        case "lowest":
          dispatch(sortByLowestPrice());
          break;
        default:
          break;
      }
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
            <span>Back to results</span>
          </Link>
          <div className="backLinks">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </Link>
            <img src="/images/chevron-left.png" alt="Icon" />
            <Link
              to="/shop"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Shop
            </Link>
            <img src="/images/chevron-left.png" alt="Icon" />
            <Link to="#">More Products</Link>
          </div>
          <div className="sort">
            <span>Sort by:</span>
            <div className="sortBtns">
              <button
                className={`${activeSort === "date" ? "active" : ""}`}
                onClick={() => handleActiveSort("date")}
              >
                New
              </button>
              <button
                className={`${activeSort === "highest" ? "active" : ""}`}
                onClick={() => handleActiveSort("highest")}
              >
                Highest Price
              </button>
              <button
                className={`${activeSort === "lowest" ? "active" : ""}`}
                onClick={() => handleActiveSort("lowest")}
              >
                Lowest Price
              </button>
            </div>
            <span>{products.length} results</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeadFilters;
