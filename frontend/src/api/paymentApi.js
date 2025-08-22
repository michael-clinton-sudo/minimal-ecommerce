import axiosInstance from "./axiosConfig";

export const createRazorpayOrder = async (amount, orderId, token) => {
  const { data } = await axiosInstance.post(
    "/payments/razorpay",
    { amount, orderId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const verifyRazorpayPayment = async (
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  orderId,
  token
) => {
  const { data } = await axiosInstance.post(
    "/payments/verify",
    {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
