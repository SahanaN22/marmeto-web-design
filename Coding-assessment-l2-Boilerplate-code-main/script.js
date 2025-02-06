document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889");
    const data = await response.json();
    const cartItemsContainer = document.getElementById("cart-items");
    let subtotal = 0;

    data.items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Vendor: ${item.vendor}</p>
                <p>Price: <del>₹${(item.original_price / 100).toFixed(2)}</del> <strong>₹${(item.discounted_price / 100).toFixed(2)}</strong></p>
                <p>Discount: ₹${(item.total_discount / 100).toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" class="quantity" data-id="${item.id}">
                <button class="remove-item" data-id="${item.id}">🗑️</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        subtotal += item.discounted_price * item.quantity;
    });

    document.getElementById("subtotal").textContent = `₹${(subtotal / 100).toFixed(2)}`;
    document.getElementById("total").textContent = `₹${(subtotal / 100).toFixed(2)}`;

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            e.target.closest(".cart-item").remove();
            updateTotal();
        });
    });

    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("change", () => {
            updateTotal();
        });
    });

    function updateTotal() {
        let newSubtotal = 0;
        document.querySelectorAll(".cart-item").forEach(item => {
            const price = parseFloat(item.querySelector("strong").textContent.replace("₹", ""));
            const quantity = parseInt(item.querySelector(".quantity").value);
            newSubtotal += price * quantity;
        });
        document.getElementById("subtotal").textContent = `₹${newSubtotal.toFixed(2)}`;
        document.getElementById("total").textContent = `₹${newSubtotal.toFixed(2)}`;
    }
});
