import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { filterProducts, singledProduct } from "../../slices/productsSlices";
import { useDispatch, useSelector } from "react-redux";
import data from "../../data.json";
import { addToCart } from "../../slices/cartSlice";

function Furnitures() {
  //single page/productDetails
  const dispatchProduct = useDispatch();
  ////////
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
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
    let products = [];

    if (filteredProducts.length) {
      products = filteredProducts.slice(firstPostIndex, lastPostIndex);
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    } else {
      products = data.products.slice(firstPostIndex, lastPostIndex);
      setTotalPages(Math.ceil(data.products.length / productsPerPage));
    }

    setCurrentProducts(products);
  }, [currentPage, filteredProducts]);
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
  console.log(cart);
  return (
    <section className="furnitures">
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
                  dispatch(filterProducts(btn.name.toLowerCase()));
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
          {currentProducts.map((product) => {
            return (
              <Link
                to={`/product/${product.type}/${product.id}`}
                className="productCard"
                key={product.id}
                onClick={() =>
                  dispatchProduct(
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
                      dispatch(
                        addToCart({
                          id: product.id,
                          fullTitle: product.fullTitle,
                          color: handleColorAndImg(product)[0],
                          img: handleColorAndImg(product)[1],
                          price: Math.round(Number(product.price)),
                          amount: 1,
                        })
                      );
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="pagination">
          <div className="prevBtn" onClick={prevPage}>
            <img src="/images/shop/prev.png" alt="Previous page" />
          </div>
          <div className="pages">{paginate()}</div>
          <div className="nextBtn" onClick={nextPage}>
            <img src="/images/shop/next.png" alt="Next page" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Furnitures;
