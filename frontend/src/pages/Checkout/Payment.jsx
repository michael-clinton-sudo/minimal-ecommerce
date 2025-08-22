import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../context/appContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
`;

const Payment = () => {
  const { checkout, setCheckout, paymentMethod, setPaymentMethod } =
    useContext(AppContext);
  const [method, setMethod] = useState(paymentMethod || "COD");
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkout.shipping) {
      navigate("/checkout/shipping");
    }
  }, [checkout, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPaymentMethod(method);

    setCheckout((prev) => ({ ...prev, payment: true }));

    navigate("/checkout/placeorder");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Payment Method</h2>
        <Select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Credit / Debit Card</option>
          <option value="UPI">UPI</option>
        </Select>
        <Button type="submit">Continue</Button>
      </Form>
    </Container>
  );
};

export default Payment;
