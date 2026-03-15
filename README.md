# CRUD Product Manager

## Overview

This project is a simple **CRUD (Create, Read, Update, Delete) Product Manager** built using JavaScript.
It allows users to add, view, edit, and delete products from a product list.

The application communicates with backend API endpoints using the **Fetch API**.

## Features

* Add new products with name and price
* View all products in a list
* Edit existing products
* Delete products
* Dynamic updates without reloading the page

## Technologies Used

* HTML
* CSS
* JavaScript (Fetch API)
* Backend API 

## Project Structure

```
crud/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── backend/
    └── server.js
```

## API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/products     | Get all products  |
| POST   | /api/products     | Add a new product |
| PUT    | /api/products/:id | Update a product  |
| DELETE | /api/products/:id | Delete a product  |

How It Works

# Load Products

When the page loads, the `loadProducts()` function fetches all products from the backend and displays them in the list.

# Add Product

The form allows users to add a new product by sending a **POST request** to the API.

# Edit Product

Clicking the **Edit** button fills the form with the selected product details and allows updating it using a **PUT request**.

# Delete Product

Clicking the **Delete** button removes the product by sending a **DELETE request** to the API.

 How to Run the Project

# 1. Navigate to Backend Folder

Open Command Prompt and run:

```
cd Desktop\crud\backend
```

# 2. Start Backend Server

```
node server.js
```

# 3. Open Frontend

Open `index.html` in your browser.

