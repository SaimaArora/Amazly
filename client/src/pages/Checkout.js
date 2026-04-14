import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.address) {
      alert("Please fill all fields");
      return;
    }

    const res = await axios.post("https://amazly-production.up.railway.app/api/orders", {
      items: cart,
      total,
    });

    navigate(`/success/${res.data.orderId}`);
  };

  return (
    <div className="container checkoutPage">

      {/* LEFT SECTION */}
      <div className="checkoutLeft">

        {/* ADDRESS */}
        <div className="box">
          <h3>Shipping Address</h3>

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>

        {/* ITEMS REVIEW */}
        <div className="box">
          <h3>Review Items</h3>

          {cart.map((item) => (
            <div key={item.id} className="checkoutItem">
              <img src={item.image} />

              <div>
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
              </div>

              <p>₹{item.price}</p>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT SUMMARY */}
      <div className="checkoutRight">
        <h3>Order Summary</h3>

        <p>Items: ₹{total}</p>
        <p>Delivery: FREE</p>

        <h2>Total: ₹{total}</h2>

        <button className="placeOrderBtn" onClick={placeOrder}>
          Place your order
        </button>
      </div>
    </div>
  );
}

export default Checkout;