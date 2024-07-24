import React from "react";
import { singleProduct } from "../../slices/productsSlices";
import data from "../../data.json";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ProductOverview() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let product = useSelector((state) => state.products.singleProduct);
  product = product.filter((prod) => prod.id == id);
  product = product[0];
  return (
    <section className="overview">
      <div className="container">
        <div className="topSection">
          <div className="txt">
            <h3>Product Overview</h3>
            <div className="desc">
              <span>Description</span>
              <p>{product.description}</p>
            </div>
            <div className="characteristics">
              <ul>
                {product.charasteristics.map((charasteristic, index) => (
                  <li key={index}>
                    <div className="img">
                      <img
                        src="/images/productDetails/product1/Check.png"
                        alt="Check"
                      />
                    </div>
                    <span>{charasteristic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="video">
            <div>
              <span>Product Video</span>
              <img
                src="/images/productDetails/product1/Share.png"
                alt="Share"
              />
            </div>
            <video width="320" height="240" controls  src='/images/productDetails/product1/videoproduct1.mp4'/>
          </div>
        </div>
        <div className="bottomSection">
          <div className="btn"></div>
          <div className="questions"></div>
        </div>
      </div>
    </section>
  );
}

export default ProductOverview;
