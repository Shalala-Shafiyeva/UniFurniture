import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: data.products,
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredData")) || data.products,
    selectedCategories: [],
    selectedColor: null,
    singleProduct:
      JSON.parse(sessionStorage.getItem("singleData")) || data.products,
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
      const { id, type } = action.payload;
      try {
        const oneProduct = data.products.filter(
          (product) => product.id == id && product.type == type
        );
        state.singleProduct = oneProduct;
        const saveState = JSON.stringify(oneProduct);
        sessionStorage.setItem("singleData", saveState);
      } catch (error) {
        return error;
      }
    },
    filterByColor(state, action) {
      // let tempData;
      // if (state.selectedCategories.length) {
      //   tempData = state.filteredProducts;
      // } else {
      //   tempData = state.products;
      // }
      // try {
      //   const filteredByColor = tempData.filter((product) =>
      //     product.colorImgs.some(
      //       (colorImg) => colorImg.colorName === action.payload
      //     )
      //   );
      //   state.error = false;
      //   state.filteredProducts = filteredByColor;
      //   if (filteredByColor.length) {
      //     state.error = false;
      //     // const saveState = JSON.stringify(filteredByColor);
      //     // sessionStorage.setItem("filteredData", saveState);
      //   } else {
      //     state.error = true;
      //     state.filteredProducts = [];
      //   }
      // } catch (error) {
      //   return error;
      // }
      state.selectedColor = action.payload;
      state.filteredProducts = state.products.filter(
        (product) =>
          (state.selectedCategories.length === 0 ||
            state.selectedCategories.includes(product.category)) &&
          (!state.selectedColor ||
            product.colorImgs.some(
              (colorImg) => colorImg.colorName === state.selectedColor
            ))
      );

      state.error = state.filteredProducts.length === 0;
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
      let tempProducts = state.products;
      const category = action.payload;

      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (item) => item !== category
        );
      } else {
        state.selectedCategories.push(category);
      }
      // if (state.selectedCategories.length > 0) {
      //   state.filteredProducts = tempProducts.filter((product) =>
      //     state.selectedCategories.includes(product.category)
      //   );
      // } else {
      //   state.filteredProducts = tempProducts;
      // }
      // state.error = state.filteredProducts.length == 0;
      state.filteredProducts = state.products.filter(
        (product) =>
          (state.selectedCategories.length === 0 ||
            state.selectedCategories.includes(product.category)) &&
          (!state.selectedColor ||
            product.colorImgs.some(
              (colorImg) => colorImg.colorName === state.selectedColor
            ))
      );

      state.error = state.filteredProducts.length === 0;
    },
    filterByStock(state, action) {
      try {
        const filteredByStock = state.products.filter(
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
        const filteredBySale = state.products.filter(
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
    resetFilters(state, action) {
      state.selectedCategories = [];
      state.selectedColor = null;
      state.filteredProducts = state.products;
      state.error = false;
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
  resetFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
