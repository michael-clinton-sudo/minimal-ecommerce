import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { createOrder } from "../../api/orderApi";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../api/paymentApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

const PlaceOrder = () => {
  const { user, cart, shippingAddress, checkout, setCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!shippingAddress) navigate("/checkout/shipping");
    else if (!checkout.payment) navigate("/checkout/payment");
  }, [shippingAddress, checkout, navigate]);

  const handleCOD = async () => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.items.map((i) => ({
          name: i.product.name,
          qty: i.qty,
          image: i.product.image,
          price: i.product.price,
          product: i.product._id,
        })),
        shippingAddress,
        paymentMethod: "COD",
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: cart.totalPrice,
      };
      await createOrder(orderData, user.token);
      alert("Order placed successfully!");
      setCart({ items: [], totalPrice: 0 });
      navigate("/myorders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    }
    setLoading(false);
  };

  const handleRazorpay = async () => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.items.map((i) => ({
          name: i.product.name,
          qty: i.qty,
          image: i.product.image,
          price: i.product.price,
          product: i.product._id,
        })),
        shippingAddress,
        paymentMethod: "Razorpay",
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: cart.totalPrice,
      };
      const createdOrder = await createOrder(orderData, user.token);

      const razorOrder = await createRazorpayOrder(cart.totalPrice, createdOrder._id, user.token);

      const options = {
        key:  "rzp_test_aoXAc54cIyrPl1", // process.env.REACT_APP_RAZORPAY_KEY_ID
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: razorOrder.id,
        handler: async function (response) {
          try {
            await verifyRazorpayPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature,
              createdOrder._id,
              user.token
            );
            alert("Payment successful!");
            setCart({ items: [], totalPrice: 0 });
            navigate("/myorders");
          } catch (err) {
            console.error(err);
            alert("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate Razorpay payment. Try again.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <h2>Review Your Order</h2>

      <Card>
        <h3>Shipping</h3>
        <p>{shippingAddress?.address}</p>
        <p>
          {shippingAddress?.city}, {shippingAddress?.postalCode},{" "}
          {shippingAddress?.country}
        </p>
      </Card>

      <Card>
        <h3>Items</h3>
        {cart.items.map((item) => (
          <div key={item.product._id}>
            {item.product.name} x {item.qty} = ₹{item.product.price * item.qty}
          </div>
        ))}
        <h4>Total: ₹{cart.totalPrice}</h4>
      </Card>

      <Card>
        <h3>Payment Options</h3>
        <Button disabled={loading} onClick={handleCOD}>
          Pay with Cash on Delivery
        </Button>
        <Button disabled={loading} onClick={handleRazorpay}>
          Pay with Razorpay
        </Button>
      </Card>
    </Container>
  );
};

export default PlaceOrder;
