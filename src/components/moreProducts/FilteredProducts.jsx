import React, { useCallback } from "react";
import data from "../../data.json";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function FilteredProducts({ fetchedProducts, filteredKey }) {
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  // const error = useSelector((state) => state.products.error);

  //pagination
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 9;
  useEffect(() => {
    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    let products = [];

    //without backend
    // if (filteredProducts.length) {
    //   products = filteredProducts.slice(firstPostIndex, lastPostIndex);
    //   setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    // } else {
    //   products = data.products.slice(firstPostIndex, lastPostIndex);
    //   setTotalPages(Math.ceil(data.products.length / productsPerPage));
    // }

    //with backend + withoud filters
    // if (filteredProducts.length) {
    //   products = filteredProducts.slice(firstPostIndex, lastPostIndex);
    //   setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    // } else {
    products = fetchedProducts?.data?.slice(firstPostIndex, lastPostIndex);
    setTotalPages(Math.ceil(fetchedProducts?.data?.length / productsPerPage));
    //}

    setCurrentProducts(products);
  }, [currentPage, filteredProducts, fetchedProducts]);

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

  //rating and review logic
  const fullStar = "/images/star.png";
  const emptyStar = "/images/emptyStar.png";

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? fullStar : emptyStar}
          alt={`${i <= rating ? "Full" : "Empty"} Star`}
        />
      );
    }
    return stars;
  };

  return (
    <section className="filteredProducts">
      <div className="container">
        {
          // error ? (
          !fetchedProducts?.data?.length && filteredKey ?  (
            <div className="error">Sorry we don't have such product</div>
          ) : (
            <>
              <div className="products">
                {currentProducts?.map((product, index) => (
                  <Link
                    className="product"
                    to={`/product/${product?.category?.name?.toLowerCase()}/${product?.id}`}
                    key={product?.id}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="img">
                      <img
                        src={`http://localhost:8000/storage/${product?.image}`}
                        alt={product?.name}
                      />
                    </div>
                    <div className="details">
                      {product.discount > 0 && (
                        <div className="sale">-{product?.discount}%</div>
                      )}
                      <div className="rating">
                        <div className="stars">
                          {renderStars(fetchedProducts?.rating[index]?.[product?.id]?.original?.average_rating || 0)}
                          {/* <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/emptystar.png" alt="star" /> */}
                        </div>
                        <span>({fetchedProducts?.reviews[index]?.[product?.id]?.original?.data || 0} reviews)</span>
                      </div>
                      <div className="title">{product.name}</div>
                      <div className="price">
                        <span>${product.price.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <span>
                            {" "}
                            - $
                            {(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="shipping">
                        {product.shipping} days shipping
                      </div>
                    </div>
                  </Link>
                ))}
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
            </>
          )
        }
      </div>
    </section>
  );
}

export default FilteredProducts;
