import React from "react";

function ShoppingHero() {
  return (
    <section className="shoppingHero">
      <div className="container">
        <img src="images/shop/hero.png" alt="Your furniture" />
        <div className="context">
          <div className="cover">
            <h2>
              Every <span className="orange">Furniture</span> has a beautiful
              story
            </h2>
            <p>
              Lectus commodo aenean quis molestie ultricies nunc viverra
              eleifend non viverra amet dictum massa consequat mattis.
            </p>
          </div>
        </div>
        <div className="searchBar">
          <div className="inp">
            <input
              className="orange"
              type="text"
              name="search"
              placeholder="Let's Start your needs"
            />
            <button>
              <img src="/images/shop/search.png" alt="Search icon" />
            </button>
          </div>
        </div>
        <div className="circle itemm1"></div>
        <div className="circle itemm2"></div>
        <div className="circle itemm3"></div>
        <div className="circle itemm4"></div>
        <div className="circle itemm5"></div>
        <div className="circle itemm6"></div>
      </div>
    </section>
  );
}

export default ShoppingHero;
