import React, { useEffect, useState } from "react";
import { singledProduct } from "../../slices/productsSlices";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import data from "../../data.json";

function Main() {
  let product = useSelector((state) => state.products.singleProduct);
  const { type, id } = useParams();

  product=product.filter(prod=>prod.id==id && prod.type==type);
  const [quantity, setQuantity] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);
  const [img, setImg] = useState(product[0]?.colorImgs[colorIndex]?.imgs[0]);
  useEffect(() => {
    setImg(product[0].colorImgs[colorIndex].imgs[0]);
  }, [colorIndex]);

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
    const smallImgs = [...e.currentTarget.parentElement.children];
    smallImgs.map((child) => {
      //child.classList.remove("active");
      child.style.border="2px solid #6d6e7423"
    });
    product
      .filter((prod) => prod.id == id)
      .map((product) => {
        product?.colorImgs[colorIndex]?.imgs.map((img) => {
          try {
            let src = e.target.src.split("/");
            src = "/" + src.slice(3).join("/");
            if (img == src) {
              //e.currentTarget.classList.add("active");
              e.currentTarget.style.border="2px solid #00A991";
            }
            setImg(e.target.src);
          } catch (err) {
            console.log(err);
          }
        });
      });
  };

  const handleColorChange = (index) => {
    setColorIndex(index);
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
        <div className="desktopMode">
          {product
            .filter((prod) => prod.id == id && prod.type == type)
            .map((product) => (
              <div className="wrapper" key={product.id}>
                <div className="imgDetails">
                  {/* <div className="nextBtn">
                    <img src="/images/shop/arrowleft.png" alt="Next" />
                  </div> */}
                  <div className="imgs">
                    <div className="mainImg">
                      <img src={img} alt="Product image" />
                    </div>
                    <div className="smallImgs">
                      {product.colorImgs[colorIndex].imgs.map((img, index) => (
                        <div
                          className="img"
                          key={img.id}
                          onClick={(e) => {
                            handleSmallImg(e);
                          }}
                        >
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
                        <img
                          src={product.colorImgs[colorIndex].imgs[0]}
                          alt="Product"
                        />
                      </div>
                      <span>{product.colorImgs[colorIndex].colorName}</span>
                    </div>
                    <div className="canChoose">
                      <span>
                        Select Upholstery Colour:{" "}
                        {product.colorImgs[colorIndex].colorName}
                      </span>
                      <div className="colors">
                        {product.colorImgs.map((color, index) => (
                          <div
                            key={color.id}
                            className="img"
                            onClick={() => handleColorChange(index)}
                          >
                            <img src={color.imgs[0]} alt="" />
                            <span>{color.colorName}</span>
                          </div>
                        ))}
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
        <div className="mobileMode">
          {product
            .filter((prod) => prod.id == id)
            .map((product) => (
              <div className="wrapper" key={product.id}>
                <div className="imgDetails">
                  <div className="chooseColor">
                    {product.colorImgs.map((color,index) => (
                      <div className="canChoose" key={color.id}>
                        <div
                          className={`img ${colorIndex==index ? "active" : ""}`}
                          onClick={() => handleColorChange(index)}
                        >
                          <img src={color.imgs[colorIndex]} alt="Product" />
                        </div>
                        <span className="colorName">{color.colorName}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mainImg">
                    <div className="bigImg">
                      <div className="chosedColor">
                        Select Upholstery:{" "}
                        {product.colorImgs[colorIndex].colorName}
                      </div>
                      <img
                        src={img}
                        alt="Product image"
                      />
                    </div>
                    <div className="smallImgs">
                      {
                        product.colorImgs[colorIndex].imgs.map((img) => (
                          <div
                            className="img"
                            key={img.id}
                            onClick={(e) => {
                              handleSmallImg(e);
                            }}
                          >
                            <img src={img} alt="Product image" />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="descDetails">
                  <span className="fullTitle">{product.fullTitle}</span>
                  {!product.hasStock ? (
                    <p className="outOfStock">
                      Sorry, but this product is out of stock
                    </p>
                  ) : null}
                  <span className="rating">(8 reviews)</span>
                  <span className="price">${product.price}</span>
                  <span className="garranty">Warranty Length {product.garranty} Year</span>
                  <p className="desc">{product.description}</p>
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
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Main;
