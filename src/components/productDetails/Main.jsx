import React, { useState } from "react";
import { singleProduct } from "../../slices/productsSlices";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import data from "../../data.json";

function Main() {
  let product = useSelector((state) => state.products.singleProduct);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [img, setImg] = useState(product[0].colorImgs[0].imgs[0]);
  const increaseQty = () => {
    if (quantity < product[0].stock) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSmallImg = (e) => {
    setImg(e.target.src);
  };

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
            <span>
              <img src="/images/chevron-left.png" alt="Icon" />
            </span>
            <Link to="/shop">Shop</Link>
            <span>
              <img src="/images/chevron-left.png" alt="Icon" />
            </span>
            <Link to="#" className="active">
              {product[0].type}
            </Link>
          </div>
        </div>
        {product
          .filter((prod) => prod.id == id)
          .map((product) => (
            <div className="wrapper" key={product.id}>
              <div className="imgDetails">
                <div className="nextBtn">
                  <img src="/images/shop/arrowleft.png" alt="Next" />
                </div>
                <div className="imgs">
                  <div className="mainImg">
                    <img
                      src={img}
                      alt="Product image"
                    />
                  </div>
                  <div className="smallImgs">
                    {product.colorImgs[0].imgs.map((img) => (
                      <div className="img" key={img.id} onClick={(e)=>{handleSmallImg(e)}}>
                        <img src={img} alt="Product image" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="descDetails">
                <span className="fullTitle">{product.fullTitle}</span>
                <div className="rating">34 Reviews</div>
                <span className="price">${product.price}</span>
                <p className="desc">{product.description}</p>
                <div className="chooseColor">
                  <div className="currentColor">
                    <div className="img">
                      <img src={product.colorImgs[0].imgs[0]} alt="Product" />
                    </div>
                    <span>{product.colorImgs[0].colorName}</span>
                  </div>
                  <div className="canChoose">
                    <span>
                      Select Upholstery Colour: {product.colorImgs[0].colorName}
                    </span>
                    <div className="colors">
                      <div className="img">
                        <img src={product.colorImgs[1].imgs[1]} alt="" />
                        <span>{product.colorImgs[1].colorName}</span>
                      </div>
                      <div className="img">
                        <img src={product.colorImgs[2].imgs[1]} alt="" />
                        <span>{product.colorImgs[2].colorName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="qtyAndAddToCart">
                  <div className="quantity">
                    <span>QTY</span>
                    <div className="selectQty">
                      <span className="minus" onClick={decreaseQty}>
                        -
                      </span>
                      <span className="qty">{quantity}</span>
                      <span className="plus" onClick={increaseQty}>
                        +
                      </span>
                    </div>
                  </div>
                  {!product.hasStock ? (
                    <button disabled="disabled" className="addToCart">
                      <span>ADD TO CART</span>
                      <img
                        src="/images/productDetails/product1/cartbtnicon.png"
                        alt=""
                      />
                    </button>
                  ) : (
                    <button className="addToCart">
                      <span>ADD TO CART</span>
                      <img
                        src="/images/productDetails/product1/cartbtnicon.png"
                        alt=""
                      />
                    </button>
                  )}
                </div>
                <span className="garranty">
                  Warranty Length {product.garranty} Year
                </span>
                {!product.hasStock ? (
                  <p className="outOfStock">
                    Sorry, but this product is out of stock
                  </p>
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Main;
