import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
import { getCardData, sendCartData } from "./store/cart-actions";
let isFirstRender = true;

function App() {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart)
  useEffect(() => {
    dispatch(getCardData())
  },[dispatch])
  useEffect(() => {
    if (isFirstRender) return isFirstRender = false;
    if(cart.changed){
      dispatch(sendCartData(cart))
    }
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
