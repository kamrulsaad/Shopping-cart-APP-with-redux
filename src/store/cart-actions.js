import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const getCardData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch('https://redux-tutorial-with-database-default-rtdb.firebaseio.com/cart.json')
            const data = await res.json()
            return data
        }
        try {
            const getData = await fetchData()
            dispatch(cartActions.replaceData(getData))
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

export const sendCartData = (cart) => {
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