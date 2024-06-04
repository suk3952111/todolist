import CartItem from "../components/CartItem";
import { useAuthContext } from "../App";

const Cart = () => {
  const { user, updateUser } = useAuthContext();

  if (!user || !user.cart) {
    return <p>장바구니가 비었습니다</p>;
  }

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => {
      return total + item.price * item.number;
    }, 0);
  };

  const updateCart = (id, newQuantity) => {
    const updatedCart = user.cart.map((item) => {
      if (item.id === id) {
        return { ...item, number: newQuantity };
      }
      return item;
    });
    updateUser({ ...user, cart: updatedCart });
  };

  const removeItem = (id) => {
    const updatedCart = user.cart.filter((item) => item.id !== id);
    updateUser({ ...user, cart: updatedCart });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {user.cart.length === 0 ? (
        <p>장바구니가 비었습니다</p>
      ) : (
        <ul>
          {user.cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateCart={updateCart}
              removeItem={removeItem}
            />
          ))}
        </ul>
      )}
      <h2>총 금액: ${calculateTotalPrice(user.cart).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
