import { createSlice } from "@reduxjs/toolkit";
import  data from "../data.json";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredData")) || data.products
  },
  reducers: {
    filterProducts(state, action) {
      try {
        const filter = data.products.filter((product) => product.type == action.payload)
        state.filteredProducts=filter;
        const saveState=JSON.stringify(filter);
        sessionStorage.setItem("filteredData", saveState);

      } catch (error) {
        return error
      }
    }
  }
});

export const { filterProducts } = productsSlice.actions;
export default productsSlice.reducer;
