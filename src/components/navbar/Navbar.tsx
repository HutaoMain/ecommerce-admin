import "./Navbar.css";
const Navbar = () => {
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
          <span>Admin Name</span>
          <button className="navbar-logoutbtn">
            <span className="navbar-link">Logout</span>
          </button>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
