import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getMyOrders } from "../../api/orderApi";
import { AppContext } from "../../context/appContext";

const Container = styled.div`
  padding: 20px;
`;

const OrderCard = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
`;

const MyOrders = () => {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.token);
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch orders");
      }
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <Container>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
            <p><strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}</p>
          </OrderCard>
        ))
      )}
    </Container>
  );
};

export default MyOrders;
