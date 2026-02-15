// ===============================
// Get products from localStorage
// ===============================
function getProducts() {
    // Returns an array of products or an empty array if none exist
    return JSON.parse(localStorage.getItem("products")) || [];
}

// ===============================
// Save products to localStorage
// ===============================
function saveProducts(products) {
    // Convert the products array to a JSON string and store it
    localStorage.setItem("products", JSON.stringify(products));
}

// ===============================
// Display products on product.html
// ===============================
function displayProducts(category = "all") {
    const productList = document.getElementById("product-list");
    if (!productList) return; // Stop if not on product page

    const products = getProducts();
    productList.innerHTML = ""; // Clear previous content

    // Filter products if a category is selected
    const filteredProducts =
        category === "all"
            ? products
            : products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No products available.</p>";
        return;
    }

    // Create product cards dynamically
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-item");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price} Ksh</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        productList.appendChild(productCard);
    });
}

// ===============================
// Add new product from add.html
// ===============================
const form = document.getElementById("addProductForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get input values
        const name = document.getElementById("productName").value.trim();
        const category = document.getElementById("productCategory").value;
        const price = document.getElementById("productPrice").value;
        const imageInput = document.getElementById("productImage");

        // Check if all fields are filled
        if (!name || !category || !price || !imageInput.files[0]) {
            alert("Please fill in all fields.");
            return;
        }

        const reader = new FileReader();

        // Convert image to Base64 and store it
        reader.onload = function () {
            const imageData = reader.result;

            const products = getProducts();

            products.push({
                name,
                category,
                price,
                image: imageData
            });

            saveProducts(products);

            // Reset form after adding product
            form.reset();
        };

        reader.readAsDataURL(imageInput.files[0]); // Read the selected image
    });
}

// ===============================
// Filter buttons functionality
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        const category = button.getAttribute("data-category");
        displayProducts(category); // Display filtered products
    });
});

// ===============================
// Delete product functionality
// ===============================
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");
        const products = getProducts();

        products.splice(index, 1); // Remove product from array
        saveProducts(products); // Update localStorage
        displayProducts(); // Refresh product list
    }
});

// ===============================
// Initial display of all products
// ===============================
displayProducts();
