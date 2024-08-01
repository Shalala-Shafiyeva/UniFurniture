import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../slices/productsSlices';
import cartReducer from '../slices/cartSlice';
import addressReducer from '../slices/addressSlice';

export const store=configureStore({
    reducer:{
       products:productReducer,
       cart:cartReducer, 
       address: addressReducer,
    }
})