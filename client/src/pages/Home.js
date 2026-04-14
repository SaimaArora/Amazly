import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    const res = await axios.get(
      `https://amazly-production.up.railway.app/api/products?search=${search}`
    );
    setProducts(res.data);
  };

  return (
    <div className="container">
      <div className="productGrid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;