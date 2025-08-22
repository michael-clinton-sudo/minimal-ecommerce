import axiosInstance from "./axiosConfig";

export const signupUser = async ({ name, email, password }) => {
  const { data } = await axiosInstance.post("/auth/signup", {
    name,
    email,
    password,
  });
  return data;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return data;
};
