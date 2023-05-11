import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import CategoryPage from "./pages/category/CategoryPage";
import ProductPage from "./pages/products/ProductPage";
import useAuthStore from "./zustand/AuthStore";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Orders from "./pages/orders/Orders";
import ViewOrder from "./components/viewOrderList/ViewOrder";

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const location = useLocation();

  useEffect(() => {
    if (email) {
      setUser(email);
    }

    console.log(email);
  }, []);

  return (
    <div className="App">
      {location.pathname !== "/login" ? <Navbar user={user} /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/categories"
          element={user ? <CategoryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={user ? <ProductPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={user ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders/:id"
          element={user ? <ViewOrder /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
