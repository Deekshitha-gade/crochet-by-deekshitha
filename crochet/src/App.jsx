import { useEffect, useMemo, useState } from "react";
import Background from "./components/Background";
import ProductCard from "./components/Productcard";
import ProductModal from "./components/Productmodal";
import { API_URL } from "./config";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [selectedId, setSelectedId] = useState(null);

  // Load all products once when the page opens
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setProducts(data.items);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  // Search + sort happen in the browser (fine for a small catalogue)
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = products.filter(
      (p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [products, search, sort]);

  return (
    <>
      <Background />

      <div className="page">
        <header className="hero">
          <p className="eyebrow">handmade with love</p>
          <h1>Deekshitha's Crochet Corner</h1>
          <p className="tagline">Every stitch made by hand, one little piece at a time.</p>
        </header>

        <div className="controls">
          <input
            type="search"
            placeholder="Search for something cozy…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {status === "loading" && <p className="state-msg">Gathering the yarn… 🧶</p>}

        {status === "error" && (
          <p className="state-msg">
            Couldn't reach the shop. Is the FastAPI server running at {API_URL}?
          </p>
        )}

        {status === "ready" && visible.length === 0 && (
          <p className="state-msg">Nothing matches your search yet.</p>
        )}

        {status === "ready" && (
          <main className="grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={setSelectedId} />
            ))}
          </main>
        )}

        <footer className="footer">Made with 🧶 and a little FastAPI</footer>
      </div>

      {selectedId !== null && (
        <ProductModal
          key={selectedId}
          productId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
}