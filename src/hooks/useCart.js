// hooks/useCart.js
import { useState, useEffect } from "react";
import { updateCart } from "./cart";

const useCart = (productDetail, user, updateUser, toggleModal) => {
  const [cartItem, setCartItem] = useState({
    price: 0,
    number: 0,
  });

  useEffect(() => {
    if (productDetail) {
      setCartItem({
        price: productDetail.price,
        number: 0,
      });
    }
  }, [productDetail]);

  const addCartItemNumber = () => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem,
      number: prevCartItem.number + 1,
    }));
  };

  const removeCartItemNumber = () => {
    setCartItem((prevCartItem) => ({
      ...prevCartItem,
      number: prevCartItem.number > 0 ? prevCartItem.number - 1 : 0,
    }));
  };

  const handleAddToCart = () => {
    const cartItemToAdd = {
      ...productDetail,
      number: cartItem.number,
    };

    const userData = JSON.parse(localStorage.getItem("user")) || {};
    updateCart(cartItemToAdd, userData, updateUser);
    toggleModal();
    window.location.reload();
  };

  return {
    cartItem,
    addCartItemNumber,
    removeCartItemNumber,
    handleAddToCart,
  };
};

export default useCart;
