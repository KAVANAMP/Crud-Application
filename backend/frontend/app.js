async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    const products = await res.json();

    const list = document.getElementById("product-list");
    list.innerHTML = "";

    products.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - $${p.price} `;

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = async () => {
        await fetch(`/api/products/${p.id}`, { method: "DELETE" });
        loadProducts();
      };

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        document.getElementById("name").value = p.name;
        document.getElementById("price").value = p.price;
        document.getElementById("product-form").dataset.editId = p.id;
      };

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("❌ Failed to load products:", err);
  }
}

// Add or Update product
document.getElementById("product-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const editId = e.target.dataset.editId;

  if (editId) {
    // Update existing product
    await fetch(`/api/products/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    delete e.target.dataset.editId; // clear edit mode
  } else {
    // Add new product
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
  }

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  loadProducts();
});
