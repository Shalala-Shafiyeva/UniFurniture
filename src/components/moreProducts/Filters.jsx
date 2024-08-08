import React from "react";
import {
  filterByColor,
  filterByCategory,
  filterByStock,
  filterBySale,
} from "../../slices/productsSlices";
import { useDispatch, useSelector } from "react-redux";
function Filters() {
  const categoryBtns = [
    {
      id: 1,
      btnName: "Living Room",
      btnCategory: "livingroom",
    },
    {
      id: 2,
      btnName: "Bedroom",
      btnCategory: "bedroom",
    },
    {
      id: 3,
      btnName: "Business Solutions",
      btnCategory: "businesssolution",
    },
    {
      id: 4,
      btnName: "Home Office",
      btnCategory: "office",
    },
    {
      id: 5,
      btnName: "Home Decoration",
      btnCategory: "homedecoration",
    },
  ];

  const colorBtns = [
    "Black",
    "Blue",
    "Brown",
    "Grey",
    "Green",
    "Orange",
    "Red",
    "White",
  ];

  const selectedCategories = useSelector(
    (state) => state.products.selectedCategories
  );
  const dispatch = useDispatch();
  return (
    <section className="filters">
      <div className="container">
        <div className="filter">
          <h4>Product Categories</h4>
          <div className="inps">
            {categoryBtns.map((btn) => {
              return (
                <div className="inp" key={btn.id}>
                  <input
                    type="checkbox"
                    name={`category${btn.id}`}
                    id={`category${btn.id}`}
                    checked={selectedCategories.includes(btn.btnCategory)}
                    onChange={() => dispatch(filterByCategory(btn.btnCategory))}
                  />
                  <label htmlFor={`category${btn.id}`}>{btn.btnName}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="filter">
          <h4>Filter by Color</h4>
          <div className="inps">
            {colorBtns.map((btn, index) => {
              return (
                <div className="inp" key={index}>
                  <div>
                    <input
                      onClick={() => dispatch(filterByColor(btn))}
                      type="radio"
                      name="color"
                      id={`btn${index}`}
                    />
                    <label htmlFor={`btn${index}`}>{btn}</label>
                  </div>
                  <span className="count">(29)</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="filter">
          <h4>Product Categories</h4>
          <div className="inps">
            <div className="inp">
              <input
                type="checkbox"
                name="stock"
                id="stock"
                onClick={() => dispatch(filterByStock(true))}
              />
              <label htmlFor="stock">In Stock</label>
            </div>
            <div className="inp">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                onClick={() => dispatch(filterBySale(true))}
              />
              <label htmlFor="sale">On Sale</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filters;
