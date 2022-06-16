import { createSlice } from "@reduxjs/toolkit";

const authSLice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        },
    }
})

export const authActions = authSLice.actions

export default authSLice