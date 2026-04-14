import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, getQuantity, decreaseQty } = useContext(CartContext);

  const qty = getQuantity(product.id);

  return (
    <div className="card">

      {/* CLICK IMAGE */}
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="cardImg" />
      </Link>

      <h4 className="title">{product.name}</h4>

      <p className="price">₹{product.price}</p>

      {/* AMAZON STYLE BUTTON */}
      {qty === 0 ? (
        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      ) : (
        <div className="qtyBox">
          <button onClick={() => decreaseQty(product.id)}>-</button>
          <span>{qty}</span>
          <button onClick={() => addToCart(product)}>+</button>
        </div>
      )}

      <Link to={`/product/${product.id}`} className="viewBtn">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;