import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { singledProduct } from "../../slices/productsSlices";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";

function Furnitures({ filteredData, handleCategoryFilter }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const handleColorAndImg = (product) => {
    let productColor = product.colorImgs[0].colorName;
    let productImg = product.colorImgs[0].imgs[0];
    return [productColor, productImg];
  };
  //pagination
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 9;
  useEffect(() => {
    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    const products = filteredData.slice(firstPostIndex, lastPostIndex);
    setTotalPages(Math.ceil(filteredData.length / productsPerPage));
    setCurrentProducts(products);
  }, [currentPage, filteredData]);
  const paginate = () => {
    let pages = [];
    const firstPage = currentPage - 4 < 1 ? 1 : currentPage - 4;
    const lastPage =
      currentPage + 4 > totalPages ? totalPages : currentPage + 4;
    for (let i = firstPage; i <= lastPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${currentPage === i ? "active" : ""}`}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //filter btns
  const filterBtns = [
    {
      id: 1,
      name: "Office",
      img: "/images/shop/office.svg",
    },
    {
      id: 2,
      name: "Wardrobe",
      img: "/images/shop/wardrobe.svg",
    },
    {
      id: 3,
      name: "Sofa",
      img: "/images/shop/sofa.svg",
    },
    {
      id: 4,
      name: "Table",
      img: "/images/shop/table.svg",
    },
    {
      id: 5,
      name: "Chair",
      img: "/images/shop/chair.svg",
    },
  ];

  //make clicked filter btn active
  const activeBtn = (el) => {
    let btns = [...document.querySelectorAll(".filterBtns button")];
    btns.forEach((btnn) => {
      btnn.classList.remove("active");
    });
    if (el.target.dataset && el.target.dataset.id == "button") {
      el.target.classList.add("active");
    } else {
      el.target.parentElement.classList.add("active");
    }
  };
  const activeBtnForChild = (el) => {
    el.target.parentElement.classList.add("active");
  };

  const success = () => {
    toast.success("Successfully added to cart");
  };

  const error = () => {
    toast.error("Sorry, this product is out of stock");
  };

  const handleAddToCart = (product) => {
    if (product.hasStock) {
      toast.success("Successfully added to cart");
      dispatch(
        addToCart({
          id: product.id,
          fullTitle: product.fullTitle,
          color: handleColorAndImg(product)[0],
          img: handleColorAndImg(product)[1],
          price: parseFloat(product.price),
          amount: 1,
          stock: product.stock,
          hasStock: product.hasStock,
          discount: product.discount,
          reviews: product.reviews,
          shipping: product.shipping,
        })
      );
    }
    if (!product.hasStock || !product.stock) {
      toast.error("Sorry, this product is out of stock");
    }
  };

  return (
    <section className="furnitures">
      <Toaster position="top-center" />
      <div className="container">
        <div className="head">
          <h2 className="title">
            Latest <span>Furnitures</span>
          </h2>
          <Link to="/shop/moreFurnitures">
            <span>More Furnitures</span>
            <img src="/images/shop/arrowleft.png" alt="Arrow More" />
          </Link>
        </div>
        <div className="filterBtns">
          {filterBtns.map((btn) => {
            return (
              <button
                data-id="button"
                key={btn.id}
                onClick={(e) => {
                  handleCategoryFilter(btn.name.toLowerCase());
                  activeBtn(e);
                  setCurrentPage(1);
                }}
              >
                <img
                  onClick={(e) => activeBtnForChild(e)}
                  src={btn.img}
                  alt={btn.name}
                />
                <span onClick={(e) => activeBtnForChild(e)}>{btn.name}</span>
              </button>
            );
          })}
        </div>
        <div className="products">
          {filteredData.length === 0 ? (
            <div className="notFound">We don't have such product. Sorry.</div>
          ) : (
            currentProducts.map((product) => {
              return (
                <Link
                  to={`/product/${product.type}/${product.id}`}
                  className="productCard"
                  key={product.id}
                  onClick={() =>
                    dispatch(
                      singledProduct({ id: product.id, type: product.type })
                    )
                  }
                >
                  <div className="productContext">
                    <div className="head">
                      <div className="favorite">
                        <img src="/images/shop/heartempty.png" alt="Favorite" />
                      </div>
                      <span className="price">$ {product.price} USD</span>
                    </div>
                    <span className="productName">{product.name}</span>
                    <p className="productDesc">{product.text}</p>
                  </div>
                  <div className="productImg">
                    <img src={product.img} alt={product.type} />
                  </div>
                  <div className="btn">
                      <button
                        className="addCart"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        Add to cart
                      </button>
                  </div>
                </Link>
              );
            })
          )}
        </div>
        {filteredData.length === 0 ? null : (
          <div className="pagination">
            <div className="prevBtn" onClick={prevPage}>
              <img src="/images/shop/prev.png" alt="Previous page" />
            </div>
            <div className="pages">{paginate()}</div>
            <div className="nextBtn" onClick={nextPage}>
              <img src="/images/shop/next.png" alt="Next page" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default Furnitures;
