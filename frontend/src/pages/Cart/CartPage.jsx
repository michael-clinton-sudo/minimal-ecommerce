import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../../images/No Image.png";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Summary = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Total = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const CheckoutButton = styled.button`
  padding: 12px 20px;
  background-color: teal;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #006666;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyMessage = styled.p`
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  margin-top: 50px;
`;

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ItemQtyPrice = styled.div`
  color: #555;
`;

const RemoveButton = styled.button`
  padding: 6px 12px;
  font-size: 0.9rem;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #999;
  }
`;

const CartItem = ({ item, onRemove }) => {
  return (
    <CartItemContainer>
      <Image src={item.product.image || placeholderImg} alt={item.product.name} />
      <ItemDetails>
        <ItemName>{item.product.name}</ItemName>
        <ItemQtyPrice>
          {item.qty} x ₹{item.product.price} = ₹{item.qty * item.product.price}
        </ItemQtyPrice>
      </ItemDetails>
      <RemoveButton onClick={() => onRemove(item.product._id)}>Remove</RemoveButton>
    </CartItemContainer>
  );
};

const CartPage = () => {
  const { cart, removeFromCart } = useContext(AppContext);
  const navigate = useNavigate();

  const totalPrice = cart?.items?.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  return (
    <Container>
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <EmptyMessage>Your cart is empty</EmptyMessage>
      ) : (
        <>
          <CartList>
            {cart.items.map((item) => (
              <CartItem key={item.product._id} item={item} onRemove={removeFromCart} />
            ))}
          </CartList>

          <Summary>
            <Total>Total: ₹{totalPrice}</Total>
            <CheckoutButton onClick={() => navigate("/checkout/shipping")}>
              Proceed to Checkout
            </CheckoutButton>
          </Summary>
        </>
      )}
    </Container>
  );
};

export default CartPage;
