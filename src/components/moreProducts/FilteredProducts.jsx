import React from "react";
import data from "../../data.json";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function FilteredProducts() {
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const error = useSelector((state) => state.products.error);

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

  return (
    <section className="filteredProducts">
      <div className="container">
        {error ? (
          <div className="error">Sorry we don't have this product</div>
        ) : (
          <>
            <div className="products">
              {currentProducts.map((product) => (
                <Link
                  className="product"
                  to={`/product/${product.type}/${product.id}`}
                  key={product.id}
                >
                  <div className="img">
                    <img src={product.img} alt={product.title} />
                  </div>
                  <div className="details">
                    {product.trending && <div className="trend">Trending</div>}
                    {product.onSale && product.discount && (
                      <div className="sale">-{product.discount}%</div>
                    )}
                    <div className="rating">
                      <div className="stars">
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/emptystar.png" alt="star" />
                      </div>
                      <span>({product.reviews} reviews)</span>
                    </div>
                    <div className="title">{product.name}</div>
                    <div className="price">
                      ${product.priceBefore}-${product.price}
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
        )}
      </div>
    </section>
  );
}

export default FilteredProducts;
