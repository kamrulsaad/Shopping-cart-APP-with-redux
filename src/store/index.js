import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./auth-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
    reducer: {
        auth: authSLice.reducer,
        cart: cartSlice.reducer
    }
})

export default store