import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";
import { useSelector, useDispatch } from "react-redux";
import { sortByDateAdded, sortByHighestPrice, sortByLowestPrice } from "../../slices/productsSlices";

function HeadFilters({ sortedData }) {
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const dispatch = useDispatch();
  return (
    <section className="headFilters">
      <div className="container">
        <div className="cover">
          <Link className="backBtn" to="/shop">
            <img src="/images/shop/arrowleft.png" alt="Back" />
            <span>Back to results</span>
          </Link>
          <div className="backLinks">
            <Link to="/">Home</Link>
            <img src="/images/chevron-left.png" alt="Icon" />
            <Link to="/shop">Shop</Link>
            <img src="/images/chevron-left.png" alt="Icon" />
            <Link to="#">More Products</Link>
          </div>
          <div className="sort">
            <span>Sort by:</span>
            <div className="sortBtns">
              <button onClick={()=>dispatch(sortByDateAdded())}>New</button>
              <button onClick={()=>dispatch(sortByHighestPrice())}>Highest Price</button>
              <button onClick={()=>dispatch(sortByLowestPrice())}>Lowest Price</button>
            </div>
            <span>{filteredProducts.length} results</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeadFilters;
