
// GET PRODUCTS FROM LOCAL STORAGE

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// SAVE PRODUCTS TO LOCAL STORAGE

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// DISPLAY PRODUCTS

function displayProducts(category = "all") {
    const productList = document.getElementById("product-list");
    if (!productList) return; // If not on product page, stop

    const products = getProducts();

    productList.innerHTML = "";

    const filteredProducts = category === "all"
        ? products
        : products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No products available.</p>";
        return;
    }

    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-item");

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price} Ksh</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        productList.appendChild(productCard);
    });
}

// ADD PRODUCT (ADD PAGE)
const form = document.getElementById("addProductForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("productName").value.trim();
        const category = document.getElementById("productCategory").value;
        const price = document.getElementById("productPrice").value;
        const image = document.getElementById("productImage").value;

        if (!name || !category || !price || !image[0]) {
            alert("Please fill in all fields.");
            return;
        }

        const reader = new FileReader();
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

        alert("Product added successfully!");

        form.reset();
    });

    reader.readAsDataURL(image[0]);
    });
} 

// FILTER BUTTONS

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        displayProducts(category);
    });
});

// ===============================
// DELETE PRODUCT
// ===============================
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");
        const products = getProducts();

        products.splice(index, 1);
        saveProducts(products);

        displayProducts();
    }
});

// ===============================
// INITIAL DISPLAY
// ===============================
displayProducts();
