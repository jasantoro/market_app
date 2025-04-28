import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Backoffice from "./pages/admin/Orders";
import Layout from "./Layout";
import UsersAdmin from "./pages/admin/crud/UsersAdmin";
import Profile from "./pages/Profile";
import { Product, User } from "./models";
import ProductsAdmin from "./pages/admin/crud/ProductsAdmin";
import ProductForm from "./pages/admin/crud/ProductForm";
import Metrics from "./pages/admin/Metrics";

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const onLogin = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/");
  };

  const onCheckoutFinished = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const onUserUpdate = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/");
  };

  interface ProtectedRouteProps {
    children: React.ReactNode;
    onlyForAdmin?: boolean;
  }

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    onlyForAdmin,
  }) => {
    if (!user) {
      return (
        <div style={{ padding: "2em" }}>
          <h3>Acceso restringido. Iniciá sesión.</h3>
        </div>
      );
    }
    if (onlyForAdmin && user.role !== "admin") {
      return (
        <div style={{ padding: "2em" }}>
          <h3>Acceso restringido. Solo administradores.</h3>
        </div>
      );
    }
    return <>{children}</>;
  };

  return (
    <Layout user={user} cart={cart} handleLogout={handleLogout}>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "cliente" ? (
                <Products addToCart={addToCart} />
              ) : (
                <ProtectedRoute onlyForAdmin={true}>
                  <Backoffice user={user} />
                </ProtectedRoute>
              )
            ) : (
              <Login onLogin={onLogin} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile user={user} onUserUpdate={onUserUpdate} />}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cart={cart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout
                user={user}
                cart={cart}
                onCheckoutFinished={onCheckoutFinished}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metrics"
          element={
            <ProtectedRoute onlyForAdmin={true}>
              <Metrics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute onlyForAdmin={true}>
              <UsersAdmin currentUser={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute onlyForAdmin={true}>
              <ProductsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute onlyForAdmin={true}>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedRoute onlyForAdmin={true}>
              <ProductForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
