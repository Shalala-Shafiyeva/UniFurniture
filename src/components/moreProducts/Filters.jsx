import React, { useEffect, useState } from "react";
import {
  filterByColor,
  filterByCategory,
  filterByStock,
  filterBySale,
} from "../../slices/productsSlices";
import { useDispatch, useSelector } from "react-redux";

function Filters({
  filters,
  fetchFilteredProducts,
  handleFilterChange,
  handleTypeChange,
  formatFilters,
  setFilteredKey,
}) {
  const [typeBtns, setTypeBtns] = useState([]);

  const fetchTypes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/type", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setTypeBtns(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  const [colorBtns, setColorBtns] = useState([]);
  const fetchColorCount = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/colorsCount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setColorBtns(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchColorCount();
  }, []);

  // const categoryBtns = [
  //   {
  //     id: 1,
  //     btnName: "Living Room",
  //     btnCategory: "livingroom",
  //   },
  //   {
  //     id: 2,
  //     btnName: "Bedroom",
  //     btnCategory: "bedroom",
  //   },
  //   {
  //     id: 3,
  //     btnName: "Business Solutions",
  //     btnCategory: "businesssolution",
  //   },
  //   {
  //     id: 4,
  //     btnName: "Home Office",
  //     btnCategory: "office",
  //   },
  //   {
  //     id: 5,
  //     btnName: "Home Decoration",
  //     btnCategory: "homedecoration",
  //   },
  // ];

  // const colorBtns = [
  //   "Black",
  //   "Blue",
  //   "Brown",
  //   "Grey",
  //   "Green",
  //   "Orange",
  //   "Red",
  //   "White",
  // ];

  // const selectedCategories = useSelector(
  //   (state) => state.products.selectedCategories
  // );
  // const dispatch = useDispatch();

  return (
    <section className="filters">
      <div className="container">
        <div className="filter">
          {typeBtns.length > 0 && (
            <>
              <h4>Məhsul Kateqoriyaları</h4>
              <div className="inps">
                {typeBtns.map((btn) => (
                  <div className="inp" key={btn.id}>
                    <input
                      type="checkbox"
                      id={`category${btn.id}`}
                      onChange={() => {
                        handleTypeChange(btn.name);
                        setFilteredKey(true);
                      }}
                    />
                    <label htmlFor={`category${btn.id}`}>{btn.name}</label>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* {categoryBtns.map((btn) => {
              return (
                <div className="inp" key={btn.id}>
                  <input
                    type="checkbox"
                    name={`category${btn.id}`}
                    id={`category${btn.id}`}
                    // checked={selectedCategories.includes(btn.btnCategory)}
                    // onChange={() => dispatch(filterByCategory(btn.btnCategory))}
                  />
                  <label htmlFor={`category${btn.id}`}>{btn.btnName}</label>
                </div>
              );
            })} */}
        </div>
        <div className="filter">
          {colorBtns.length > 0 && (
            <>
              <h4>Rəngə görə filtr</h4>
              <div className="inps">
                {colorBtns.map((color, index) => {
                  return (
                    <div className="inp" key={index}>
                      <div>
                        <input
                          // onClick={() => dispatch(filterByColor(color))}
                          onChange={() => {
                            handleFilterChange("color", color.name);
                            setFilteredKey(true);
                          }}
                          type="radio"
                          name="color"
                          id={`color${index}`}
                        />
                        <label htmlFor={`color${index}`}>{color.name}</label>
                      </div>
                      <span className="count">({color.count})</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="filter">
          <h4>Digər filtrlər</h4>
          <div className="inps">
            <div className="inp">
              <input
                type="checkbox"
                name="hasStock"
                id="stock"
                onChange={(e) => {
                  handleFilterChange("hasStock", e.target.checked);
                  setFilteredKey(true);
                }}
                // onClick={() => dispatch(filterByStock(true))}
              />
              <label htmlFor="stock">Stokda</label>
            </div>
            <div className="inp">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                onChange={(e) => {
                  handleFilterChange("sale", e.target.checked);
                  setFilteredKey(true);
                }}
                // onClick={() => dispatch(filterBySale(true))}
              />
              <label htmlFor="sale">Endirimli</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filters;
