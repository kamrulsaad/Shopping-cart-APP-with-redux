import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;

function App() {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart)
  useEffect(() => {
    if (isFirstRender) return isFirstRender = false;
    const sendRequest = async () => {
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: 'warning'
      }))
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
    sendRequest().catch(err => {
      dispatch(uiActions.showNotification({
        open: true,
        message: "Something Occured",
        type: 'Error'
      }))
    })
  }, [cart, dispatch])
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <div className="App">
      {notification && <Notifications type={notification.type} message={notification.message}></Notifications>}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
