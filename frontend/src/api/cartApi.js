import axiosInstance from "./axiosConfig";

export const addToCart = async ({ productId, qty }) => {
  const token = localStorage.getItem("token"); // get JWT token
  const { data } = await axiosInstance.post(
    "/cart/add",
    { productId, qty },
    {
      headers: {
        Authorization: `Bearer ${token}`, // send token in header
      },
    }
  );
  return data;
};

export const removeItemFromCart = async ({ productId }) => {
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.post(
    "/cart/remove",
    { productId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};