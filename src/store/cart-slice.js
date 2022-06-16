import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload
            const existingItems = state.itemsList.find(item => item.id === newItem.id)
            if (existingItems) {
                existingItems.quantity++
                existingItems.totalPrice += newItem.price;
            }
            else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++
            }
        },
        removeFromCart(state, action) {
            const id = action.payload
            const existingProduct = state.itemsList.find(item => item.id === id)
            if (existingProduct.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id)
                state.totalQuantity--
                existingProduct.totalPrice -= existingProduct.price
            }
            else {
                existingProduct.quantity--
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart
        }
    }
})

export const sendRequest = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: "Sending Request",
            type: 'warning'
        }))
        const sendRequest = async () => {
            const res = await fetch('https://redux-tutorial-with-database-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            })
            const data = await res.json();
            dispatch(uiActions.showNotification({
                open: true,
                message: "Request Sent",
                type: 'success'
            }))
        }
        try {
            await sendRequest();
        }
        catch (err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: "Something Occured",
                type: 'Error'
            }))
        }
    }
}

export const cartActions = cartSlice.actions
export default cartSlice