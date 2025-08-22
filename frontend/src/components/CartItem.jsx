import React, { useContext } from "react";
import { AppContext } from "../context/appContext";

const CartItem = ({ item }) => {
  const { cart, setCart } = useContext(AppContext);

  const handleRemove = () => {
    const updatedItems = cart.items.filter(
      (i) => i.product._id !== item.product._id
    );
    setCart({ ...cart, items: updatedItems });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>
        {item.product.name} (x{item.qty}) - ₹{item.product.price * item.qty}
      </span>
      <button onClick={handleRemove} style={{ color: "red" }}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
