import { useState } from "react";
import { API_URL, CURRENCY } from "../config";

export default function ProductCard({ product, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <button className="card" onClick={() => onSelect(product.id)}>
      <div className="card-img">
        {imgFailed ? (
          <span className="card-placeholder">🧶</span>
        ) : (
          <img
            src={`${API_URL}${product.image_url}`}
            alt={product.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="price">
          {CURRENCY}
          {product.price}
        </span>
      </div>
    </button>
  );
}