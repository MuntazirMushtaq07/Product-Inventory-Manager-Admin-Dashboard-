// ✅ Step 1: Get all input fields and buttons from the HTML
let titleInput = document.getElementById("titleInput");         // Product title input
let priceInput = document.getElementById("priceInput");         // Product price input
let stockInput = document.getElementById("stockInput");         // Product stock input
let imageInput = document.getElementById("imageInput");         // Product image URL input
let addProductBtn = document.getElementById("addProductBtn");   // Add Product button
let productListDiv = document.getElementById("productList");    // The div to display product cards


// ✅ Step 2: Load products from localStorage or start with empty array
let products = JSON.parse(localStorage.getItem("products")) || [];

// ✅ Step 3: Handle Add Product button click
addProductBtn.addEventListener("click", function () {
  // 1️⃣ Get values from input fields
  let title = titleInput.value.trim();             // Remove leading/trailing spaces
  let price = parseFloat(priceInput.value);        // Convert to float
  let stock = parseInt(stockInput.value);          // Convert to integer
  let image = imageInput.value.trim();             // Image URL

  // 2️⃣ Validate (optional but recommended - skip for now)

  // 3️⃣ Create a new product object
  let product = {
    id: Date.now(),        // Unique ID based on timestamp
    title: title,
    price: price,
    stock: stock,
    image: image
  };

  // 4️⃣ Push the product into the array
  products.push(product);

  // 5️⃣ Save updated array to localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // 6️⃣ Refresh product list on screen
  displayProducts();

  // 7️⃣ Clear input fields
  titleInput.value = "";
  priceInput.value = "";
  stockInput.value = "";
  imageInput.value = "";
});

// ✅ Step 4: Display products on screen
function displayProducts() {
  // 1️⃣ Clear existing content before re-rendering
  productListDiv.innerHTML = "";

  // 2️⃣ Loop through all products
  products.forEach(function (product, index) {
    // 🧱 Create a card for each product
    let card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.width = "200px";

    // 📌 Title
    let title = document.createElement("h3");
    title.innerText = product.title;
    card.appendChild(title);

    // 💲 Price
    let price = document.createElement("p");
    price.innerText = "Price: $" + product.price;
    card.appendChild(price);

    // 📦 Stock
    let stock = document.createElement("p");
    stock.innerText = "Stock: " + product.stock;
    card.appendChild(stock);

    // 🖼️ Product Image
    let img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";
    img.style.height = "100px";
    img.style.objectFit = "contain";
    card.appendChild(img);

    // 🗑️ Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️ Delete";
    deleteBtn.style.marginTop = "10px";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.color = "white";

    // 🧠 Delete Functionality
    deleteBtn.addEventListener("click", function () {
      // Remove the product at this index from array
      products.splice(index, 1);

      // Update localStorage with updated product list
      localStorage.setItem("products", JSON.stringify(products));

      // Refresh the product list again
      displayProducts();
    });

    // ➕ Add delete button to card
    card.appendChild(deleteBtn);

    // 📦 Finally, add card to the product list container
    productListDiv.appendChild(card);
  });
}

// ✅ Step 5: On page load, show all saved products
displayProducts();
