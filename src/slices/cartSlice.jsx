import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(sessionStorage.getItem("cartData")) || [],
    amount: 0,
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      const productStock = data.products.filter(
        (product) =>
          product.id === productId.id && product.type === productId.type
      ).stock;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productId.id && product.type === productId.type
        );
        if (exist) {
          exist.amount += productId.amount;
          exist.totalPrice = productId.price * productId.amount;
          exist.stock -= productId.amount;
          state.totalAmount++;
          state.totalPrice += productId.totalPrice;
        } else {
          state.cart.push({
            id: productId.id,
            price: productId.price,
            img: productId.img,
            color: productId.color,
            amount: 1,
            totalPrice: productId.price,
            fullTitle: productId.fullTitle,
            stock: productStock,
          });
        }
        state.totalAmount++;
        state.totalPrice += productId.price;
        const saveState = JSON.stringify(state.cart);
        sessionStorage.setItem("cartData", saveState);
      } catch (error) {
        return error;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(
        (product) =>
          !(product.id === productId.id && product.type === productId.type)
      );
      state.totalAmount--;
      state.totalPrice -= productId.price;
      const saveState = JSON.stringify(state.cart);
      sessionStorage.setItem("cartData", saveState);
    },
    increaseAmount: (state, action) => {
      const productId = action.payload;
      const exist = state.cart.find(
        (product) =>
          product.id === productId.id && product.type === productId.type
      );
      if (exist) {
        exist.amount ++;
        exist.totalPrice += productId.price;
      }
      state.totalAmount++;
      state.totalPrice += productId.price;

      const saveState = JSON.stringify(state.cart);
      sessionStorage.setItem("cartData", saveState);
    },
    decreaseAmount: (state, action) => {
      const productId = action.payload;
      const exist = state.cart.find(
        (product) =>
          product.id === productId.id && product.type === productId.type
      );
      if (exist) {
        exist.amount --;
        exist.totalPrice -= productId.price;
      }
      state.totalAmount--;
      state.totalPrice -= productId.price;

      const saveState = JSON.stringify(state.cart);
      sessionStorage.setItem("cartData", saveState);
    },
  },
});

export const { addToCart, removeFromCart, increaseAmount, decreaseAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
