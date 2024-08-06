import React, { useState } from "react";
import ReactPlayer from "react-player";
import data from "../../data.json";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ProductOverview() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let product = useSelector((state) => state.products.singleProduct);
  product = product[0];

  const [hidden, setHidden] = useState(false);
  const [play, setPlay] = useState(false);
  const hiddenElements = () => {
    setHidden(true);
    setPlay(true);
  };

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
                {product?.charasteristics?.map((charasteristic, index) => (
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
            <div className="cover">
              <ReactPlayer
                controls={true}
                url="/images/productDetails/product1/videoproduct1.mp4"
                playing={play}
                width={"100%"}
                height={"100%"}
              />
              {/* <video
                width="320"
                height="240"
                controls
                src="/images/productDetails/product1/videoproduct1.mp4"
              /> */}
              <img
                onClick={() => hiddenElements()}
                className={`play ${hidden ? "hidden" : ""}`}
                src="/images/play.png"
                alt="Play video"
              />
              <img
                className={`overlay ${hidden ? "hidden" : ""}`}
                src="/images/productDetails/product1/mainImg.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bottomSection">
          <Link className="orderBtn" to="/cart/deliveryaddress">
            Order Now
          </Link>
          <div className="questions">
            <div className="left">
              <span>Have a question?</span>
              <span>We're here to help</span>
            </div>
            <Link className="messegeBtn" to="mailto:unifurniture@gmail.com">
              <span>Messege us</span>
              <img src="/images/messenge.png" alt="Messege us" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductOverview;
