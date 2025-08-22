import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getAllOrders } from "../../api/orderApi";
import { AppContext } from "../../context/appContext";

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const OrderCard = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #fafafa;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const AdminOrders = () => {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getAllOrders(user.token);
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch orders");
      }
      setLoading(false);
    };

    if (user && user.isAdmin) fetchOrders();
  }, [user]);

  if (!user || !user.isAdmin) {
    return <Container><p>Access denied. Admins only.</p></Container>;
  }

  return (
    <Container>
      <Header>All Orders (Admin)</Header>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p>
              <strong>User:</strong>{" "}
              {order.user ? `${order.user.name} (${order.user.email})` : "Deleted user"}
            </p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
            <p><strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}</p>
          </OrderCard>
        ))
      )}
    </Container>
  );
};

export default AdminOrders;
