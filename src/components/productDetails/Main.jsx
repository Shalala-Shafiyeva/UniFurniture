import React from "react";
import { singleProduct } from "../../slices/productsSlices";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import data from '../../data.json';

function Main() {
  const product=useSelector((state)=>state.products.singleProduct);
  return (
    <section className="mainDetails">
      <div className="container">
        <div className="linksCover">
          <Link to="/shop">
            <img src="/images/shop/arrowleft.png" alt="Back" />
            <span>Back to results</span>
          </Link>
          <div className="links">
            <Link to="/">Home</Link>
            <span><img src="/images/productDetails.png" alt="" /></span>
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <Link to='#'>{product[0].type}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
