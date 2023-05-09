import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import { useEffect } from "react";
import CategoryPage from "./pages/category/CategoryPage";
import ProductPage from "./pages/products/ProductPage";
import useAuthStore from "./zustand/AuthStore";
import Login from "./pages/login/Login";

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  useEffect(() => {
    if (email) {
      setUser(email);
    }

    console.log(email);
  }, []);

  return (
    <div className="App">
      {location.pathname === "/login" ? <div></div> : <Navbar user={user} />}
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
      </Routes>
    </div>
  );
}

export default App;
