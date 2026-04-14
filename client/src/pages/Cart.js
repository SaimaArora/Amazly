import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container cartPage">
      {/* LEFT: CART ITEMS */}
      <div className="cartLeft">
        <h2>Shopping Cart</h2>
        <hr />

        {cart.length === 0 ? (
          <div className="emptyCart">
            <h3>Your Amazon Cart is empty</h3>
            <button onClick={() => navigate("/")}>Shop now</button>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.image} alt={item.name} />

              <div className="itemDetails">
                <h4>{item.name}</h4>
                <p className="stock">In Stock</p>

                <div className="itemActions">
                <div className="qtyContainer">
                    <label htmlFor={`qty-${item.id}`}>Qty:</label>
                    <select
                    id={`qty-${item.id}`}
                    className="qtyDropdown"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                        <option key={q} value={q}>{q}</option>
                    ))}
                    </select>
                </div>

                <span className="divider">|</span>

                <span
                    className="deleteLink"
                    onClick={() => removeFromCart(item.id)}
                >
                    Delete
                </span>
                
                <span className="divider">|</span>
                
                <span className="saveForLaterLink">Save for later</span>
                </div>
              </div> {/* FIXED: Added missing closing div for itemDetails */}
              
              <div className="itemPrice">
                <strong>₹{item.price}</strong>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT: SUBTOTAL SECTION */}
      {/* FIXED: Moved this OUTSIDE of cartLeft so it floats correctly on the right */}
      {cart.length > 0 && (
        <div className="cartRight">
          <h3>
            Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items):{" "}
            <strong>₹{subtotal}</strong>
          </h3>

          <button
            className="checkoutBtn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;