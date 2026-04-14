import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
    const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">amazon</Link>

      <input
        className="searchBar"
        placeholder="Search Amazon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />

        <Link to="/cart" className="cart">
        🛒 Cart
        {cart.length > 0 && (
            <span className="cartCount">{cart.length}</span>
        )}
        </Link>    
    </div>
  );
}

export default Navbar;