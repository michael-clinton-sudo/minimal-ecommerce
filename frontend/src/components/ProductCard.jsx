import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import placeholderImg from "../images/No Image.png";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  font-size: 1.1rem;
  margin: 5px 0;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 5px 0;
`;

const Button = styled(Link)`
  padding: 8px 12px;
  background-color: teal;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #006666;
  }
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Image src={product.image || placeholderImg} alt={product.name} />
      <Name>{product.name}</Name>
      <Price>₹{product.price}</Price>
      <Button to={`/product/${product._id}`}>View Details</Button>
    </Card>
  );
};

export default ProductCard;
