import React, { useState } from "react";
import ReactPlayer from "react-player";
import data from "../../data.json";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ProductOverview({ product }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  // let product = useSelector((state) => state.products.singleProduct);
  // product = product[0];

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
            <h3>Məhsulun Ümumi Baxışı</h3>
            <div className="desc">
              <span>Açıqlama</span>
              <p>{product?.data?.text}</p>
            </div>
            <div className="characteristics">
              <ul>
                {product?.data?.characteristics?.map((characteristic, index) => (
                  <li key={characteristic?.id}>
                    <div className="img">
                      <img
                        src="/images/productDetails/product1/Check.png"
                        alt="Check"
                      />
                    </div>
                    <span>{characteristic?.characteristic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="video">
            <div>
              <span>Məhsul Videosu</span>
              <img
                src="/images/productDetails/product1/Share.png"
                alt="Share"
              />
            </div>
            <div className="cover">
              <ReactPlayer
                controls={true}
                // url="/images/productDetails/product1/videoproduct1.mp4"
                url={`http://localhost:8000/storage/${product?.data?.video}`}
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
              <div
                className={`overlay ${hidden ? "hidden" : ""}`}
                style={{ backgroundImage: `url('http://localhost:8000/storage/${product?.data?.image}')`, 'backgroundColor': 'lightGrey' }}
                // src="/images/productDetails/product1/mainImg.png"
              ></div>
            </div>
          </div>
        </div>
        <div className="bottomSection">
          <Link
            className="orderBtn"
            to="/cart/deliveryaddress"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            İndi Sifariş Verin
          </Link>
          <div className="questions">
            <div className="left">
              <span>Sualınız var?</span>
              <span>Sizə kömək etməyə hazırıq</span>
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
