import React, { useState, useContext } from "react";
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

const Input = styled.input`
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

const Shipping = () => {
  const { setShippingAddress } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShippingAddress({ address, city, postalCode, country });
    navigate("/checkout/payment");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Shipping Address</h2>
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <Button type="submit">Continue</Button>
      </Form>
    </Container>
  );
};

export default Shipping;
