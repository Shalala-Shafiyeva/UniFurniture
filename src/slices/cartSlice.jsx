import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
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
          exist.totalPrice += productId.price;
          state.totalAmount++;
          state.totalPrice += productId.price;
        } else {
          state.cart.push({
            id: productId.id,
            price: productId.price,
            img: productId.img,
            color: productId.color,
            amount: 1,
            totalPrice: productId.price,
            fullTitle: productId.fullTitle,
          });
        }
        state.totalAmount++;
        state.totalPrice += productId.price;
      } catch (error) {
        return error;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
