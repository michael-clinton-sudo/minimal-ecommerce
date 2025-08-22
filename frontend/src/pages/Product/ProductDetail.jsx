import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProductById } from "../../api/productApi";
import { AppContext } from "../../context/appContext";
import { addToCart as addToCartApi } from "../../api/cartApi";
import placeholderImg from "../../images/No Image.png"; // optional local placeholder

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Description = styled.p`
  color: #555;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

const QtyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QtyInput = styled.input`
  width: 60px;
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.2s;

  &:hover {
    background-color: #006666;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      addToCart(product, qty);
      await addToCartApi({ productId: product._id, qty });
      alert("Added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container>
      <ProductCard>
        <Image src={product.image || placeholderImg} alt={product.name} />
        <Info>
          <Title>{product.name}</Title>
          <Description>{product.description}</Description>
          <Price>₹{product.price}</Price>
          <QtyContainer>
            <label htmlFor="qty">Quantity:</label>
            <QtyInput
              id="qty"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </QtyContainer>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </Info>
      </ProductCard>
    </Container>
  );
};

export default ProductDetail;
