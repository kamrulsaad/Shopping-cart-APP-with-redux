import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
        changed: false,
    },
    reducers: {
        replaceData(state, action){
            state.totalQuantity = action.payload.totalQuantity
            state.itemsList = action.payload.itemsList
        },
        addToCart(state, action) {
            state.changed = true
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
            state.changed = true
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

export const cartActions = cartSlice.actions
export default cartSlice