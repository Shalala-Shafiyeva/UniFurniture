import { createSlice } from "@reduxjs/toolkit";

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
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productId.id && product.type === productId.type
        );
        if (exist) {
          exist.amount += productId.amount;
          exist.totalPrice = exist.price * exist.amount;
          exist.stock -= productId.amount;
        } else {
          state.cart.push({
            id: productId.id,
            price: productId.price,
            img: productId.img,
            color: productId.color,
            amount: productId.amount,
            totalPrice: productId.price * productId.amount,
            discount: productId.discount,
            fullTitle: productId.fullTitle,
            stock: productId.stock - 1,
            hasStock: productId.hasStock,
          });
        }
        state.totalAmount += productId.amount;
        state.totalPrice += productId.price * productId.amount;
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
      state.totalAmount -= productId.amount;
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
        if (exist.stock - exist.amount > 0) {
          exist.amount++;
          // exist.stock--;
          exist.totalPrice += productId.price;
        }
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
        if (exist.amount > 1) {
          exist.amount--;
          // exist.stock++;
          exist.totalPrice -= productId.price;
        }
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
