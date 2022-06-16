import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./auth-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        auth: authSLice.reducer,
        cart: cartSlice.reducer,
        ui: uiSlice.reducer
    }
})

export default store