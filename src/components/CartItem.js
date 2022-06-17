import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import "./Cart.css";
const CartItem = ({ name, quantity, total, price, id }) => {
  const dispatch = useDispatch()
  const decrementAmount= () => {
    dispatch(cartActions.removeFromCart(id))
  }
  const incrementAmount = () => {
    dispatch(cartActions.addToCart({
      name, id, price
    }))
  }
  return (
    <div className="cartItem">
      <h2> {name}</h2>
      <p>Price: ${price} /-</p>
      <p>x{quantity}</p>
      <article>Total ${total}</article>
      <button className="cart-actions" onClick={decrementAmount}>
        -
      </button>
      <button className="cart-actions" onClick={incrementAmount}>
        +
      </button>
    </div>
  );
};

export default CartItem;
