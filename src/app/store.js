import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../slices/productsSlices';
import cartReducer from '../slices/cartSlice';

export const store=configureStore({
    reducer:{
       products:productReducer,
       cart:cartReducer, 
    }
})