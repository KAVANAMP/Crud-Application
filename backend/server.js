const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();   // ✅ app is defined here
const PORT = 3000;

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Load products from db.json
const dbPath = path.join(__dirname, "db.json");

function readDB() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// API: Get products (READ)
app.get("/api/products", (req, res) => {
  const db = readDB();
  res.json(db.products || []);
});

// API: Add product (CREATE)
app.post("/api/products", (req, res) => {
  const db = readDB();
  const newProduct = { id: uuidv4(), ...req.body };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json(newProduct);
});

// API: Delete product (DELETE)
app.delete("/api/products/:id", (req, res) => {
  const db = readDB();
  const productId = req.params.id;

  db.products = db.products.filter((p) => p.id !== productId);
  writeDB(db);

  res.json({ message: "Product deleted" });
});

// API: Update product (UPDATE)
app.put("/api/products/:id", (req, res) => {
  const db = readDB();
  const productId = req.params.id;

  const productIndex = db.products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  db.products[productIndex] = { ...db.products[productIndex], ...req.body };
  writeDB(db);

  res.json(db.products[productIndex]);
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
