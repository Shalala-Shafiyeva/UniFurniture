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
}) {
  // const [filters, setFilters] = useState({
  //   types: [],
  //   color: null,
  //   sale: false,
  //   hasStock: false,
  // });

  // const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    formatFilters();
     fetchFilteredProducts();
  }, [filters]);

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  // const handleFilterChange = (filterKey, value) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [filterKey]: value,
  //   }));
  // };

  // const handleTypeChange = (type) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     types: prevFilters.types.includes(type)
  //       ? prevFilters.types.filter((t) => t !== type)
  //       : [...prevFilters.types, type],
  //   }));
  // };

  // const formatFilters = () => {
  //   const formattedFilters = {
  //     types: filters.types.length > 0 ? filters.types.join(",") : undefined,
  //     color: filters.color || undefined,
  //     sale: filters.sale ? 1 : undefined,
  //     hasStock: filters.hasStock ? 1 : undefined,
  //   };

  //   const cleanedFilters = Object.fromEntries(
  //     Object.entries(formattedFilters).filter(
  //       ([_, value]) => value !== undefined
  //     )
  //   );

  //   return new URLSearchParams(cleanedFilters).toString();
  // };

  // useEffect(() => {
  //   const query = formatFilters();
  // }, [filters]);

  // const fetchFilteredProducts = async () => {
  //   try {
  //     const query = formatFilters();
  //     console.log("Filters query:", query);
  //     const response = await fetch(
  //       `http://localhost:8000/api/filteredProducts?${query}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const result = await response.json();
  //     setProducts(result.data);
  //   } catch (error) {
  //     console.error("Error fetching filtered products:", error);
  //   }
  // };
  // console.log(products);

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

  // const selectedCategories = useSelector(
  //   (state) => state.products.selectedCategories
  // );
  // const dispatch = useDispatch();

  return (
    <section className="filters">
      <div className="container">
        <div className="filter">
          <h4>Product Categories</h4>
          <div className="inps">
            {typeBtns.map((btn) => (
              <div className="inp" key={btn.id}>
                <input
                  type="checkbox"
                  id={`category${btn.id}`}
                  onChange={() => {
                    handleTypeChange(btn.name);
                    fetchFilteredProducts();
                  }}
                />
                <label htmlFor={`category${btn.id}`}>{btn.name}</label>
              </div>
            ))}
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
        </div>
        <div className="filter">
          <h4>Filter by Color</h4>
          <div className="inps">
            {colorBtns.map((color, index) => {
              return (
                <div className="inp" key={index}>
                  <div>
                    <input
                      // onClick={() => dispatch(filterByColor(color))}
                      onChange={() => {
                        handleFilterChange("color", color);
                        fetchFilteredProducts();
                      }}
                      type="radio"
                      name="color"
                      id={`color${index}`}
                    />
                    <label htmlFor={`color${index}`}>{color}</label>
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
                name="hasStock"
                id="stock"
                onChange={(e) => {
                  handleFilterChange("hasStock", e.target.checked);
                  fetchFilteredProducts();
                }}
                // onClick={() => dispatch(filterByStock(true))}
              />
              <label htmlFor="stock">In Stock</label>
            </div>
            <div className="inp">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                onChange={(e) => {
                  handleFilterChange("sale", e.target.checked);
                  fetchFilteredProducts();
                }}
                // onClick={() => dispatch(filterBySale(true))}
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
