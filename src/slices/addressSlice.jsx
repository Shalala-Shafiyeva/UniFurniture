import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
  },
  reducers: {
    addAddress: (state, action) => {
      state.address.push({
        id: state.address.length + 1,
        adrs: action.payload,
      });
    },
    editAddress: (state, action) => {
      const { id, newAddress } = action.payload;
      const address = state.address.find((a) => a.id == id);
      if (address != -1) {
        address.adrs = newAddress;
      }
    },
  },
});

export const { addAddress, editAddress } = addressSlice.actions;
export default addressSlice.reducer;
