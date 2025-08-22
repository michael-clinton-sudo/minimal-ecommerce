import axios from "./axiosConfig";

export const createOrder = async (orderData, token) => {
  const response = await axios.post("/orders", orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyOrders = async (token) => {
  const response = await axios.get("/orders/myorders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllOrders = async (token) => {
  const response = await axios.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const payOrder = async (orderId, token) => {
  const response = await axios.put(`/orders/${orderId}/pay`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
