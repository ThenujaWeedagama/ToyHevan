/* Toy Haven — shopping cart page */

const SHIPPING_FLAT = 4.99;
const FREE_SHIPPING_THRESHOLD = 60;

function cartWithProducts() {
  return getCart()
    .map((item) => {
      const product = TOY_HAVEN_PRODUCTS.find((p) => p.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);
}

function renderCart() {
  const list = document.getElementById("cartList");
  const layout = document.getElementById("cartLayout");
  const emptyEl = document.getElementById("cartEmpty");
  const items = cartWithProducts();

  if (!items.length) {
    layout.style.display = "none";
    emptyEl.hidden = false;
    return;
  }
  layout.style.display = "";
  emptyEl.hidden = true;

  list.innerHTML = items.map(({ id, qty, product }) => `
    <div class="cart-item" data-item="${id}">
      <img src="${product.img}" alt="${product.name}">
      <div>
        <h3 class="cart-item-name">${product.name}</h3>
        <p class="cart-item-meta">${product.category} · ${formatPrice(product.price)} each</p>
        <div class="qty-control">
          <button data-action="dec" aria-label="Decrease quantity">−</button>
          <span data-qty>${qty}</span>
          <button data-action="inc" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-subtotal">${formatPrice(product.price * qty)}</span>
        <button class="remove-link" data-action="remove">Remove</button>
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".cart-item").forEach((row) => {
    const id = row.dataset.item;
    row.querySelector("[data-action='inc']").addEventListener("click", () => changeQty(id, 1));
    row.querySelector("[data-action='dec']").addEventListener("click", () => changeQty(id, -1));
    row.querySelector("[data-action='remove']").addEventListener("click", () => removeItem(id));
  });

  renderSummary(items);
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  const next = item.qty <= 0 ? cart.filter((i) => i.id !== id) : cart;
  saveCart(next);
  renderCart();
}

function removeItem(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  renderCart();
  showToast("Item removed");
}

function renderSummary(items) {
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  document.getElementById("sumSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("sumShipping").textContent = shipping === 0 ? "Free" : formatPrice(shipping);
  document.getElementById("sumTotal").textContent = formatPrice(total);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.getElementById("clearCartBtn").addEventListener("click", () => {
    if (!getCart().length) return;
    saveCart([]);
    renderCart();
    showToast("Cart cleared");
  });
});
