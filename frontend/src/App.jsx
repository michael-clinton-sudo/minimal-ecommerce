import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./context/appContext";

import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CartPage from "./pages/Cart/CartPage";
import Shipping from "./pages/Checkout/Shipping";
import Payment from "./pages/Checkout/Payment";
import PlaceOrder from "./pages/Checkout/PlaceOrder";
import MyOrders from "./pages/Order/MyOrders";
import AdminOrders from "./pages/Admin/AdminOrders";
import ProductDetail from "./pages/Product/ProductDetail";

import Navbar from "./components/Navbar";

const App = () => {
  const { user } = useContext(AppContext);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const PrivateOutlet = () => {
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const AdminRoute = ({ children }) => {
    return user && user.isAdmin ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />

        <Route path="/checkout" element={<PrivateOutlet />}>
          <Route index element={<Navigate to="shipping" replace />} /> {/* default redirect */}
          <Route path="shipping" element={<Shipping />} />
          <Route path="payment" element={<Payment />} />
          <Route path="placeorder" element={<PlaceOrder />} />
        </Route>

        <Route
          path="/myorders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
};

export default App;
