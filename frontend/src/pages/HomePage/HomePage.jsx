import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProducts } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";

const Container = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <h1>Products</h1>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
