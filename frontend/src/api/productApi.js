import axiosInstance from "./axiosConfig";

export const getAllProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};
