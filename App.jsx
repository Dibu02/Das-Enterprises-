
import React, { useState } from "react";

const categories = ["Tiffins", "Containers", "Steel Items", "Plasticware", "Combo Packs"];

const initialProducts = [
  { id: 1, name: "2-Tier Tiffin", price: 199, category: "Tiffins" },
  { id: 2, name: "Plastic Jar Set", price: 249, category: "Containers" },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: categories[0] });

  const addToCart = (product) => setCart([...cart, product]);

  const addProduct = () => {
    setProducts([
      ...products,
      { id: products.length + 1, ...newProduct, price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ name: "", price: "", category: categories[0] });
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1 style={{ fontSize: "2em", color: "#2c3e50" }}>Das Enterprises</h1>

      {/* Admin Panel */}
      <section style={{ marginBottom: 30 }}>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={addProduct}>Add Product</button>
      </section>

      {/* Products */}
      {categories.map((cat) => (
        <section key={cat}>
          <h3>{cat}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {products.filter((p) => p.category === cat).map((p) => (
              <div key={p.id} style={{ border: "1px solid #ccc", padding: 10, borderRadius: 6 }}>
                <strong>{p.name}</strong>
                <p>₹{p.price}</p>
                <button onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Cart */}
      <section style={{ marginTop: 40 }}>
        <h3>🛒 Cart ({cart.length})</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in cart</p>
        )}
      </section>
    </div>
  );
}
