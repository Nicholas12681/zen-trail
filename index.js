// ===============================
// LOAD CART
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// PRODUCTS (DYNAMIC)
// ===============================
let products = [
    { name: "Smartphone", price: 250000, img: "./iPhone-17-Pro-Max-Orange-PNG-Pic.webp" },
    { name: "Electric Scooter", price: 450000, img: "./harley_davidson_electric_scooter.webp" },
    { name: "Smart Camera", price: 180000, img: "./shopping.webp" }
];

// ===============================
// RENDER PRODUCTS
// ===============================
function displayProducts(list = products) {
    let container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "";

    list.forEach(p => {
        let div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
            <img src="${p.img}" width="200">
            <h3>${p.name}</h3>
            <p>₦${p.price}</p>
            <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
        `;

        container.appendChild(div);
    });
}

// ===============================
// ADD TO CART (WITH QUANTITY)
// ===============================
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
}

// ===============================
// SAVE + UPDATE
// ===============================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// ===============================
// CART COUNT
// ===============================
function updateCartCount() {
    let count = document.getElementById("cart-count");
    if (count) {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        count.innerText = totalItems;
    }
}

// ===============================
// DISPLAY CART (UI UPGRADED)
// ===============================
function displayCartItems() {
    let container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty 🛒</p>";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        let div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>₦${item.price}</p>
            <div>
                <button onclick="changeQty(${index}, -1)">➖</button>
                ${item.quantity}
                <button onclick="changeQty(${index}, 1)">➕</button>
            </div>
            <button onclick="removeFromCart(${index})">❌ Remove</button>
        `;

        container.appendChild(div);
    });

    container.innerHTML += `<h3>Total: ₦${total}</h3>`;
}

// ===============================
// CHANGE QUANTITY
// ===============================
function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}

// ===============================
// REMOVE
// ===============================
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

// ===============================
// CLEAR CART
// ===============================
function clearCart() {
    cart = [];
    saveCart();
}

// ===============================
// SEARCH
// ===============================
function searchProducts() {
    let input = document.getElementById("search").value.toLowerCase();

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(input)
    );

    displayProducts(filtered);
}

// ===============================
// DARK MODE (PERSISTENT)
// ===============================
let toggle = document.getElementById("darkModeToggle");

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        let mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", mode);
    });
}

// Load theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// ===============================
// CHECKOUT (BASIC)
// ===============================
function checkout(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    alert("Order placed successfully 🎉");

    clearCart();
}

// ===============================
// INIT
// ===============================
updateCartCount();
displayCartItems();
displayProducts();