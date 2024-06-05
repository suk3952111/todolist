import { useState, useEffect } from "react";

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

  const updateCart = (cartItemToAdd, userData, updateUser) => {
    const cart = userData.cart || [];

    const existingItemIndex = cart.findIndex(
      (item) => item.id === cartItemToAdd.id
    );
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].number = cartItemToAdd.number;
    } else {
      cart.push(cartItemToAdd);
    }

    userData.cart = cart;
    updateUser({ ...userData });
  };

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
