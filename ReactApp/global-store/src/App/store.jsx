import { configureStore } from "@reduxjs/toolkit";
import {productApi} from "../apis/productApis";
import {loginApi} from "../apis/loginApi";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]:productApi.reducer,
        [loginApi.reducerPath] : loginApi.reducer
    },
    middleware: (getDefaultMiddleware)=>(getDefaultMiddleware().concat(productApi.middleware,loginApi.middleware))
});
export default store;

