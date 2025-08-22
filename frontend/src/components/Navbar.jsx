import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../context/appContext";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: teal;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const Navbar = () => {
  const { user, setUser, cart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    }
  };


  return (
    <Nav>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        My E-Commerce
      </Link>

      <NavLinks>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart ({cart?.items?.length || 0})
        </Link>

        {!user ? (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
              Signup
            </Link>
          </>
        ) : (
          <>
            <span>Hello, {user.name}</span>
            {user.isAdmin && (
              <Link to="/admin/orders" style={{ color: "white", textDecoration: "none" }}>
                Admin Orders
              </Link>
            )}
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;