export const updateCart = (cartItemToAdd, userData, updateUser) => {
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
