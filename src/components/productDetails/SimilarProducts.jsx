import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import data from "../../data.json";
import { singledProduct } from "../../slices/productsSlices";

function SimilarProducts({ similarProducts }) {
  const { type, id } = useParams();
  // const singleProduct = data.products.filter(
  //   (product) => product.id == id && product.type == type
  // );

  //without backend
  // const similarProducts = data.products.filter(
  //   (prod) => prod.type == type && prod.id != id
  // );

  //with backend use prop = {similarProducts}

  const dispatch = useDispatch();

  //pagination
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [haveSimilar, setHaveSimilar] = useState(true);
  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [type, id]);

  useEffect(() => {
    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    let products = [];
    setHaveSimilar(similarProducts?.data?.length > 0);
    if (similarProducts?.data?.length > 0) {
      products = similarProducts?.data?.slice(firstPostIndex, lastPostIndex);
      setTotalPages(Math.ceil(similarProducts?.data?.length / productsPerPage));
      setCurrentProducts(products);
    }
  }, [similarProducts, currentPage]);
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

  //rating system
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
    <section className="similarProducts">
      <div className="container">
        <span className="head">Compare similar Item</span>
        <div className="products">
          {haveSimilar ? (
            currentProducts.map((similarProduct, index) => {
              return (
                <div className="product" key={similarProduct?.id}>
                  <Link
                    to={`/product/${similarProduct?.category?.name.toLowerCase()}/${
                      similarProduct?.id
                    }`}
                    onClick={() => {
                      dispatch(
                        singledProduct({
                          id: similarProduct.id,
                          type: similarProduct.type,
                        })
                      );
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="img">
                      <img
                        src={`http://localhost:8000/storage/${similarProduct?.image}`}
                        alt={similarProduct?.type}
                      />
                    </div>
                    <div className="review">
                      <div className="stars">
                        {renderStars(similarProducts?.rating[index]?.[similarProduct?.id]?.original?.average_rating || 0)}
                        {/* <img src="/images/star.png" alt="star" />
                      <img src="/images/star.png" alt="star" />
                      <img src="/images/star.png" alt="star" />
                      <img src="/images/star.png" alt="star" />
                      <img src="/images/emptystar.png" alt="star" /> */}
                      </div>
                      ({similarProducts?.reviews[index]?.[similarProduct?.id]?.original?.data || 0} reviews)
                    </div>
                    <span className="title">{similarProduct?.name}</span>
                    <div className="prices">
                      <span>${similarProduct?.price.toFixed(2)}</span>
                      {similarProduct?.discount > 0 && (
                        <span>
                          $
                          {(
                            similarProduct?.price *
                            (1 - similarProduct?.discount / 100)
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <h2 className="noSimilar">
              This product doesn't have similar products
            </h2>
          )}
        </div>
        {haveSimilar ? (
          <div className="pagination">
            <div className="prevBtn" onClick={prevPage}>
              <img src="/images/shop/prev.png" alt="Previous page" />
            </div>
            <div className="pages">{paginate()}</div>
            <div className="nextBtn" onClick={nextPage}>
              <img src="/images/shop/next.png" alt="Next page" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default SimilarProducts;
