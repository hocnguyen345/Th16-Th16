// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Show a toast notification
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  // Render shopping cart contents
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toLocaleString()}$
        <button onclick="removeItem(${index})" class="remove-btn" title="Remove item">✖</button>
      `;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toLocaleString();
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Remove item from cart
  window.removeItem = function(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    renderCart();
    showToast("🗑️ Item removed from cart", "info");
  };

  // Add item to cart
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const name = product.dataset.name;
      const price = parseInt(product.dataset.price);

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      renderCart();
      showToast(`✅ "${name}" has been added to your cart!`);
    });

    // Tooltip on hover
    button.parentElement.addEventListener("mouseenter", () => {
      const tip = document.createElement("div");
      tip.className = "tooltip";
      tip.textContent = "Click to add to cart";
      button.parentElement.appendChild(tip);
    });

    button.parentElement.addEventListener("mouseleave", () => {
      const tip = button.parentElement.querySelector(".tooltip");
      if (tip) tip.remove();
    });
  });

  renderCart();
});


