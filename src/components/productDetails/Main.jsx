import React, { useEffect, useState } from "react";
import { addToCart } from "../../slices/cartSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

function Main({ product }) {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);
  //without backend
  //const [img, setImg] = useState(product?.colorImgs[colorIndex]?.imgs[0]);
  // const [img, setImg] = useState("");

  // useEffect(() => {
  //   setImg(product.colorImgs[colorIndex].imgs[0]);
  // }, [colorIndex, type, id]);

  // const handleSmallImg = (e) => {
  //   const smallImgs = [...e.currentTarget.parentElement.children];
  //   smallImgs.map((child) => {
  //     //child.classList.remove("active");
  //     child.style.border = "2px solid #6d6e7423";
  //   });

  //   product?.colorImgs[colorIndex]?.imgs.map((img) => {
  //     try {
  //       let src = e.target.src.split("/");
  //       src = "/" + src.slice(3).join("/");
  //       if (img == src) {
  //         //e.currentTarget.classList.add("active");
  //         e.currentTarget.style.border = "2px solid #00A991";
  //       }
  //       //setImg(e.target.src);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // };

  // const handleColorChange = (index) => {
  //   setColorIndex(index);
  // };

  //with Backend - start
  const [selectedImage, setSelectedImage] = useState(
    `http://localhost:8000/storage/${product?.data?.colors[colorIndex]?.color_images?.[0]?.image}`
  );

  useEffect(() => {
    // Update the selected image whenever colorIndex changes
    if (product?.data?.colors[colorIndex]?.color_images?.length) {
      setSelectedImage(
        `http://localhost:8000/storage/${product?.data?.colors[colorIndex]?.color_images[0].image}`
      );
    }
  }, [colorIndex, product?.data]);

  const handleSmallImg = (e, img) => {
    setSelectedImage(`http://localhost:8000/storage/${img}`);
  };

  const handleColorChange = (index) => {
    setColorIndex(index);
  };

  //end

  const increaseQty = (productStock, productHasStock) => {
    if (quantity < productStock && productHasStock) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product.hasStock || !product.stock) {
      toast.error("This product is out of stock");
    }
    if (product.hasStock) {
      dispatch(
        addToCart({
          id: product.id,
          fullTitle: product.fullTitle,
          color: product.colorImgs[colorIndex].colorName,
          img: product.colorImgs[colorIndex].imgs[0],
          price: parseFloat(product.price),
          amount: quantity,
          stock: product.hasStock,
          discount: product.discount,
          reviews: product.reviews,
          shipping: product.shipping,
        })
      );
      toast.success("Successfully added to cart");
    }
  };

  //rating sistemi
  const submitRating = async (rating) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product/${id}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ rating }),
        }
      );
      if (response.status == 200) {
        // fetchAverageRating();
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const fullStar = "/images/star.png";
  const emptyStar = "/images/emptyStar.png";

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={
            i <= Number(product?.rating?.original?.average_rating)
              ? fullStar
              : emptyStar
          }
          alt={`${
            i <= Number(product?.rating?.original?.average_rating)
              ? "Full"
              : "Empty"
          } Star`}
          onClick={() => submitRating(i)}
          style={{ cursor: "pointer" }}
        />
      );
    }
    return stars;
  };

  //Basket logic
  const queryClient = useQueryClient();
  // Mutation to add product to the cart
  const addProductToCart = useMutation(
    async ({ productId, productColor, colorImage }) => {
      const response = await fetch(`http://localhost:8000/api/basket/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
          product_color: productColor,
          color_image: colorImage,
        }),
      });
      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries("cartProducts");
          queryClient.invalidateQueries("cartTotal");
          queryClient.invalidateQueries("cartCount");
          queryClient.invalidateQueries("totalDiscount");
        } else {
          toast.error(data.message || "Failed to remove product");
        }
      },
    }
  );

  return (
    <section className="mainDetails">
      <Toaster position="top-center" />
      <div className="container">
        <div className="linksCover">
          <Link
            to="/shop"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src="/images/shop/arrowleft.png" alt="Back" />
            <span>Back to results</span>
          </Link>
          <div className="links">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </Link>
            <span>
              <img src="/images/chevron-left.png" alt="Icon" />
            </span>
            <Link
              to="/shop"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Shop
            </Link>
            <span>
              <img src="/images/chevron-left.png" alt="Icon" />
            </span>
            <Link to="#" className="active">
              {/* {product?.data?.map((prod) => prod.type)} */}
            </Link>
          </div>
        </div>
        <div className="desktopMode">
          <div className="wrapper" key={product?.data?.id}>
            <div className="imgDetails">
              <div className="imgs">
                <div className="mainImg">
                  <img src={selectedImage} alt="Product image" />
                </div>
                {/* without backend 
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
                </div> */}
                {/* with backend */}
                {product?.data?.colors && (
                  <div className="smallImgs">
                    {product?.data?.colors[colorIndex]?.color_images?.map(
                      (img, index) => (
                        <div
                          className="img"
                          key={img?.id}
                          onClick={(e) => {
                            handleSmallImg(e, img?.image);
                          }}
                        >
                          <img
                            src={`http://localhost:8000/storage/${img?.image}`}
                            alt="Product image"
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="descDetails">
              <span className="fullTitle">{product?.data?.full_title}</span>
              <div className="rating">
                {renderStars()} ({product?.reviews?.original?.data || 0}{" "}
                Reviews)
              </div>
              <span className="price">${product?.data?.price?.toFixed(2)}</span>
              <p className="desc">{product?.data?.description}</p>
              <div className="chooseColor">
                <div className="currentColor">
                  <div className="img">
                    {/* without backend 
                    <img
                      src={product.colorImgs[colorIndex].imgs[0]}
                      alt="Product"
                    /> */}
                    {/* with backend */}
                    {product?.data?.colors && (
                      <img
                        src={`http://localhost:8000/storage/${product?.data?.colors[0]?.color_images[0]?.image}`}
                        alt="Product"
                      />
                    )}
                  </div>
                  {/* without backend 
                  <span>{product.colorImgs[colorIndex].colorName}</span> */}
                  {/* with backend */}
                  <span>{product?.data?.colors[0]?.name}</span>
                </div>
                <div className="canChoose">
                  {/* without backend
                  <span>
                    Select Upholstery Colour:{" "}
                    {product.colorImgs[colorIndex].colorName}
                  </span> */}
                  {/* with backend */}
                  <span>
                    Select Upholstery Colour:{" "}
                    {product?.data?.colors[colorIndex]?.name}
                  </span>
                  <div className="colors">
                    {/* without backend 
                    {product.colorImgs.map((color, index) => (
                      <div
                        key={color.id}
                        className="img"
                        onClick={() => handleColorChange(index)}
                      >
                        <img src={color.imgs[0]} alt="" />
                        <span>{color.colorName}</span>
                      </div>
                    ))} */}
                    {/* with backend */}
                    {product?.data?.colors?.map((color, index) => (
                      <div
                        key={color?.id}
                        className="img"
                        onClick={() => handleColorChange(index)}
                      >
                        <img
                          src={`http://localhost:8000/storage/${color?.color_images[0]?.image}`}
                          alt="Product"
                        />
                        <span>{color?.name}</span>
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
                    <span
                      className="plus"
                      onClick={() =>
                        increaseQty(
                          product?.data?.stock,
                          product?.data?.hasStock
                        )
                      }
                    >
                      +
                    </span>
                  </div>
                </div>
                <button
                  disabled={!product?.data?.stock}
                  onClick={() => {
                    //without backend
                    // handleAddToCart();
                    //with backend
                    localStorage.getItem("token")
                      ? addProductToCart.mutate({
                          productId: product?.data?.id,
                          productColor: product?.data?.colors[colorIndex]?.name,
                          colorImage:
                            product?.data?.colors[colorIndex]?.color_images[0]
                              ?.image,
                        })
                      : navigate("/login");
                  }}
                  className="addToCart"
                >
                  <span>ADD TO CART</span>
                  <img
                    src="/images/productDetails/product1/cartbtnicon.png"
                    alt=""
                  />
                </button>
              </div>
              <span className="garranty">
                {product?.data?.garranty
                  ? `Warranty Length ${product?.data?.garranty} Year`
                  : "This product doesn't have warranty"}
              </span>
              {!product?.data?.hasStock ? (
                <p className="outOfStock">
                  Sorry, but this product is out of stock
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mobileMode">
          <div className="wrapper" key={product?.data?.id}>
            <div className="imgDetails">
              <div className="chooseColor">
                {/* without backend 
                {product.colorImgs.map((color, index) => (
                  <div className="canChoose" key={color.id}>
                    <div
                      className={`img ${colorIndex == index ? "active" : ""}`}
                      onClick={() => handleColorChange(index)}
                    >
                      <img src={color.imgs[0]} alt="Product" />
                    </div>
                    <span className="colorName">{color.colorName}</span>
                  </div>
                ))} */}
                {/* with backend */}
                {product?.data?.colors.map((color, index) => (
                  <div className="canChoose" key={color.id}>
                    <div
                      className={`img ${colorIndex == index ? "active" : ""}`}
                      onClick={() => handleColorChange(index)}
                    >
                      <img
                        src={`http://localhost:8000/storage/${color?.color_images[0]?.image}`}
                        alt="Product"
                      />
                    </div>
                    <span className="colorName">{color.colorName}</span>
                  </div>
                ))}
              </div>
              <div className="mainImg">
                <div className="bigImg">
                  {/* without backend 
                  <div className="chosedColor">
                    Select Upholstery: {product.colorImgs[colorIndex].colorName}
                  </div> 
                  <img src={product.image} alt="Product image" />
                  */}
                  {/* with backend */}
                  <div className="chosedColor">
                    Select Upholstery: {product?.data?.colors[colorIndex]?.name}
                  </div>
                  <img src={selectedImage} alt="Product image" />
                </div>
                <div className="smallImgs">
                  {/* without backend
                  {product.colorImgs[colorIndex].imgs.map((img) => (
                    <div
                      className="img"
                      key={img.id}
                      onClick={(e) => {
                        handleSmallImg(e);
                      }}
                    >
                      <img src={img} alt="Product image" />
                    </div>
                  ))} */}
                  {/* with backend */}
                  {product?.data?.colors &&
                    product?.data?.colors[colorIndex]?.color_images?.map(
                      (img) => (
                        <div
                          className="img"
                          key={img.id}
                          onClick={(e) => {
                            handleSmallImg(e, img.image);
                          }}
                        >
                          <img
                            src={`http://localhost:8000/storage/${img.image}`}
                            alt="Product image"
                          />
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
            <div className="descDetails">
              <span className="fullTitle">{product?.data?.full_title}</span>
              {!product?.data?.hasStock ? (
                <p className="outOfStock">
                  Sorry, but this product is out of stock
                </p>
              ) : null}
              <span className="rating">
                {renderStars()} ({product?.reviews?.original?.data || 0}{" "}
                reviews)
              </span>
              <span className="price">${product?.data?.price.toFixed(2)}</span>
              <span className="garranty">
                {product?.data?.garranty
                  ? `Warranty Length ${product?.data?.garranty} Year`
                  : "This product doesn't have warranty"}
              </span>
              <p className="desc">{product?.data?.description}</p>
              <div className="qtyAndAddToCart">
                <div className="quantity">
                  <span>QTY</span>
                  <div className="selectQty">
                    <span className="minus" onClick={decreaseQty}>
                      -
                    </span>
                    <span className="qty">{quantity}</span>
                    <span
                      className="plus"
                      onClick={() => {
                        increaseQty(
                          product?.data?.stock,
                          product?.data?.hasStock
                        );
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
                {!product?.data?.hasStock ? (
                  <button disabled="disabled" className="addToCart">
                    <span>ADD TO CART</span>
                    <img
                      src="/images/productDetails/product1/cartbtnicon.png"
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    className="addToCart"
                    onClick={() => {
                      //without backend
                      // dispatch(
                      //   addToCart({
                      //     id: product.id,
                      //     fullTitle: product.fullTitle,
                      //     color: product.colorImgs[colorIndex].colorName,
                      //     img: product.colorImgs[colorIndex].imgs[0],
                      //     price: parseFloat(product.price),
                      //     amount: quantity,
                      //     stock: product.hasStock,
                      //     discount: product.discount,
                      //     reviews: product.reviews,
                      //     shipping: product.shipping,
                      //   })
                      //)
                      //with backend
                      localStorage.getItem("token")
                        ? addProductToCart.mutate({
                            productId: product?.data?.id,
                            productColor:
                              product?.data?.colors[colorIndex]?.name,
                            colorImage:
                              product?.data?.colors[colorIndex]?.color_images[0]
                                ?.image,
                          })
                        : navigate("/login");
                    }}
                  >
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
        </div>
      </div>
    </section>
  );
}

export default Main;
