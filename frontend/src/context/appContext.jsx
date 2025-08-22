import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");
  const [user, setUser] = useState(savedUser);

  const savedCartRaw = localStorage.getItem("cart");
  let savedCart;
  try {
    savedCart = savedCartRaw ? JSON.parse(savedCartRaw) : null;
  } catch (err) {
    savedCart = null;
  }

  const [cart, setCart] = useState(
    savedCart && Array.isArray(savedCart.items)
      ? savedCart
      : { items: [], totalPrice: 0 }
  );

  const savedShipping = JSON.parse(localStorage.getItem("shippingAddress") || "null");
  const savedPayment = localStorage.getItem("paymentMethod");

  const [shippingAddress, setShippingAddress] = useState(savedShipping);
  const [paymentMethod, setPaymentMethod] = useState(savedPayment || "");
  const [checkout, setCheckout] = useState({
    shipping: !!savedShipping, 
    payment: !!savedPayment, 
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (shippingAddress) {
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (paymentMethod) {
      localStorage.setItem("paymentMethod", paymentMethod);
    }
  }, [paymentMethod]);

  useEffect(() => {
    const items = cart?.items || [];
    const newTotal = items.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    );
    if (cart.totalPrice !== newTotal) {
      setCart((prev) => ({ ...prev, totalPrice: newTotal, items }));
    }
  }, [cart?.items]);

  const addToCart = (product, qty = 1) => {
    const items = cart.items || [];
    const existingItem = items.find((i) => i.product._id === product._id);
    let updatedItems;
    if (existingItem) {
      updatedItems = items.map((i) =>
        i.product._id === product._id ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      updatedItems = [...items, { product, qty }];
    }
    setCart({ ...cart, items: updatedItems });
  };

  const removeFromCart = (productId) => {
    const items = cart.items || [];
    const updatedItems = items.filter((i) => i.product._id !== productId);
    setCart({ ...cart, items: updatedItems });
  };

  const updateCartItemQty = (productId, qty) => {
    const items = cart.items || [];
    const updatedItems = items.map((i) =>
      i.product._id === productId ? { ...i, qty } : i
    );
    setCart({ ...cart, items: updatedItems });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateCartItemQty,
        shippingAddress,
        setShippingAddress,
        paymentMethod,
        setPaymentMethod,
        checkout,
        setCheckout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
