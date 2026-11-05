import { useEffect, useState } from "react";
import { API_URL, CURRENCY } from "../config";

export default function ProductModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  // Fetch the single product using your /products/id/{product_id} endpoint
  useEffect(() => {
    
    fetch(`${API_URL}/products/id/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setProduct)
      .catch(() => setError(true));
  }, [productId]);

  // Close with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {error && <p className="state-msg">Couldn't load this product 🧶</p>}
        {!error && !product && <p className="state-msg">Loading…</p>}

        {product && (
          <>
            <img className="modal-img" src={`${API_URL}${product.image_url}`} alt={product.name} />
            <div className="modal-body">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span className="price big">
                {CURRENCY}
                {product.price}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}