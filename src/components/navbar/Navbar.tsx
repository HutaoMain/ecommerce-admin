import "./Navbar.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserInterface } from "../../types/Types";
import axios from "axios";

import useAuthStore from "../../zustand/AuthStore";
import { Link } from "react-router-dom";

const Navbar = ({ user }: any) => {
  const { data } = useQuery<UserInterface>({
    queryKey: ["getUserByEmailNavbar"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`)
        .then((res) => res.data),
  });

  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    if (data?.userRole === "ROLE_USER") {
      alert("you are not allowed to login");
    }
    console.log("navbar");
  }, [user]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Combra Admin</div>
      <div className="navbar-links">
        <a href="/" className="navbar-link">
          Dashboard
        </a>
        <a href="/categories" className="navbar-link">
          Category
        </a>
        <a href="/products" className="navbar-link">
          Products
        </a>
        <a href="/contact" className="navbar-link">
          Orders
        </a>
        <a href="/contact" className="navbar-link">
          Users
        </a>
        <section className="navbar-profile">
          {user && data?.userRole === "ROLE_ADMIN" ? (
            <>
              <span>{data?.name}</span>
              <button className="navbar-logoutbtn">
                <span className="navbar-link" onClick={clearUser}>
                  Logout
                </span>
              </button>
            </>
          ) : (
            <Link to="/login">
              <button
                className="navbar-logoutbtn"
                style={{ fontWeight: "bold" }}
              >
                <span className="navbar-link">Login</span>
              </button>
            </Link>
          )}
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
