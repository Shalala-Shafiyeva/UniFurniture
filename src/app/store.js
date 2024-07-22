import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../slices/productsSlices';

export const store=configureStore({
    reducer:{
       products:productReducer 
    }
})