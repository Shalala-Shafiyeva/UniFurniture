import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import data from "../../data.json";
import { singledProduct } from "../../slices/productsSlices";

function SimilarProducts() {
  const { type, id } = useParams();
  const singleProduct = data.products.filter(
    (product) => product.id == id && product.type == type
  );

  const similarProducts = data.products.filter(
    (prod) =>
      prod.type == singleProduct[0]?.type && prod.id != singleProduct[0]?.id
  );

  const dispatch = useDispatch();

  //pagination
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [haveSimilar, setHaveSimilar] = useState(true);
  const productsPerPage = 8;

  useEffect(() => {
    console.log(type, id);
    console.log(singleProduct);
    setCurrentPage(1);
  }, [type, id]);

  useEffect(() => {
    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    let products = [];

    if (similarProducts.length) {
      products = similarProducts.slice(firstPostIndex, lastPostIndex);
      setTotalPages(Math.ceil(similarProducts.length / productsPerPage));
    } else {
      setHaveSimilar(false);
    }

    setCurrentProducts(products);
  }, [currentPage]);

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
    <section className="similarProducts">
      <div className="container">
        <span className="head">Compare similar Item</span>
        <div className="products">
          {haveSimilar ? (
            currentProducts.map((similarProduct) => (
              <div className="product" key={similarProduct.id}>
                <Link
                  to={`/product/${similarProduct.type}/${similarProduct.id}`}
                  onClick={() =>
                    dispatch(singledProduct({
                      id: similarProduct.id,
                      type: similarProduct.type,
                    }))
                  }
                >
                  <div className="img">
                    <img src={similarProduct.img} alt={similarProduct.type} />
                  </div>
                  <div className="review">
                    <div className="stars">
                      <img src="/images/star.png" alt="star" />
                      <img src="/images/star.png" alt="star" />
                      <img src="/images/star.png" alt="star" />
                      <img src="/images/star.png" alt="star" />
                      <img src="/images/emptystar.png" alt="star" />
                    </div>
                    ({similarProduct.reviews} reviews)
                  </div>
                  <span className="title">{similarProduct.name}</span>
                  <div className="prices">
                    <span>${similarProduct.priceBefore}</span>
                    <span>${similarProduct.price}</span>
                  </div>
                </Link>
              </div>
            ))
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
