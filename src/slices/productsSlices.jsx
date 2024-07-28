import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";
import { act } from "react-dom/test-utils";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredData")) || data.products,
    singleProduct: data.products,
    error: false,
  },
  reducers: {
    filterProducts(state, action) {
      try {
        const filter = data.products.filter(
          (product) => product.type == action.payload
        );
        state.filteredProducts = filter;
        const saveState = JSON.stringify(filter);
        sessionStorage.setItem("filteredData", saveState);
      } catch (error) {
        return error;
      }
    },
    singledProduct(state, action) {
      const {id, type}=action.payload
      try {
        const oneProduct = data.products.filter(
          (product) => product.id == id && product.type == type
        );
        state.singleProduct = oneProduct;
      } catch (error) {
        return error;
      }
    },
    filterByColor(state, action) {
      try {
        const filteredByColor = state.filteredProducts.filter((product) =>
          product.colorImgs.some(
            (colorImg) => colorImg.colorName === action.payload
          )
        );
        state.error = false;
        state.filteredProducts = filteredByColor;
        if (filteredByColor.length) {
          state.error = false;
          // const saveState = JSON.stringify(filteredByColor);
          // sessionStorage.setItem("filteredData", saveState);
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
    sortByHighestPrice(state, action) {
      try {
        const filteredByHighPrice = state.filteredProducts
          .slice(0)
          .sort((a, b) => b.price - a.price);
        if (filteredByHighPrice.length) {
          const noError = false;
          state.error = noError;
          if (!noError) {
            state.filteredProducts = filteredByHighPrice;
            // const saveState = JSON.stringify(filteredByHighPrice);
            // sessionStorage.setItem("filteredData", saveState);
          }
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
    sortByLowestPrice(state, action) {
      try {
        const filteredByLowPrice = state.filteredProducts
          .slice(0)
          .sort((a, b) => a.price - b.price);
        if (filteredByLowPrice.length) {
          const noError = false;
          state.error = noError;
          if (!noError) {
            state.filteredProducts = filteredByLowPrice;
            // const saveState = JSON.stringify(filteredByLowPrice);
            // sessionStorage.setItem("filteredData", saveState);
          }
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
    sortByDateAdded(state, action) {
      try {
        const filteredByDate = state.filteredProducts
          .slice(0)
          .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        state.filteredProducts = filteredByDate;
        if (filteredByDate.length) {
          state.error = false;
          // const saveState = JSON.stringify(filteredByDate);
          // sessionStorage.setItem("filteredData", saveState);
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
    filterByCategory(state, action) {
      try {
        const filteredByCategoty = state.filteredProducts.filter(
          (product) => product.category == action.payload
        );
        state.filteredProducts = filteredByCategoty;
        if (filteredByCategoty.length) {
          state.error = false;
          // const saveState = JSON.stringify(filteredByCategoty);
          // sessionStorage.setItem("filteredData", saveState);
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
    filterByStock(state, action) {
      try {
        const filteredByStock = state.filteredProducts.filter(
          (product) => product.hasStock == action.payload
        );
        state.filteredProducts = filteredByStock;
        if (filteredByStock.length) {
          state.error = false;
          // const saveState = JSON.stringify(filteredByStock);
          // sessionStorage.setItem("filteredData", saveState);
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
    filterBySale(state, action) {
      try {
        const filteredBySale = state.filteredProducts.filter(
          (product) => product.onSale == action.payload
        );
        state.filteredProducts = filteredBySale;
        if (filteredBySale.length) {
          state.error = false;
          // const saveState = JSON.stringify(filteredBySale);
          // sessionStorage.setItem("filteredData", saveState);
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
  },
});

export const {
  filterProducts,
  singledProduct,
  filterByColor,
  sortByHighestPrice,
  sortByLowestPrice,
  sortByDateAdded,
  filterByCategory,
  filterBySale,
  filterByStock,
} = productsSlice.actions;
export default productsSlice.reducer;
