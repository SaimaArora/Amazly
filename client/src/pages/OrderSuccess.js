import { useParams, useNavigate } from "react-router-dom";
import "../styles/orderSuccess.css";

function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="successPage">
      <div className="successBox">

        <h2>✅ Order Confirmed</h2>

        <p>Thank you for your purchase!</p>

        <div className="orderCard">
          <p>Order ID:</p>
          <h3>{id}</h3>
        </div>

        <p>You will receive an update when your item ships.</p>

        <button className="btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;