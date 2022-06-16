import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./auth-slice";

const store = configureStore({
    reducer: {
        auth: authSLice.reducer
    }
})

export default store