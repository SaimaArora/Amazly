import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/productDetail.css";

function ProductDetail() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, []);

    const fetchProduct = async () => {
    try {
        const res = await axios.get(`https://amazly-production.up.railway.app/api/products/${id}`);
        const data = res.data;

        // Helper to handle MySQL JSON vs String inconsistency
        const parseImages = (imgData) => {
        if (!imgData) return [];
        // If it's already an array/object, don't parse it
        if (typeof imgData !== 'string') return imgData; 
        try {
            return JSON.parse(imgData);
        } catch (e) {
            return [];
        }
        };

        const imageArray = parseImages(data.images);
        
        setProduct(data);
        setSelectedImg(imageArray.length > 0 ? imageArray[0] : data.image);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
    };

  if (!product) return <h2>Loading...</h2>;

 // Replace your old 'const images = ...' with this:
    const images = Array.isArray(product.images) 
    ? product.images 
    : (typeof product.images === 'string' ? JSON.parse(product.images) : [product.image]);

  return (
    <div className="container productPage">

      {/* LEFT: IMAGE CAROUSEL */}
      <div className="imageSection">
        <div className="thumbnailList">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImg(img)}
              className="thumb"
            />
          ))}
        </div>

        <img src={selectedImg} className="mainImage" />
      </div>

      {/* MIDDLE: DETAILS */}
      <div className="detailsSection">
        <h2 className="title">{product.name}</h2>

        <p className="desc">{product.description}</p>

        <h3 className="price">₹{product.price}</h3>

        <p className="stock">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <hr />

        <h4>Product Details:</h4>
        <ul>
          <li>High quality product</li>
          <li>Fast delivery</li>
          <li>Best in category</li>
        </ul>
      </div>

      {/* RIGHT: BUY BOX */}
      <div className="buyBox">
        <h3>₹{product.price}</h3>

        <p className="stock">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <button
        className="buyNow"
        onClick={() => {
            addToCart(product);
            navigate("/checkout");
        }}
        >
        Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;