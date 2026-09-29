/* Toy Haven — wishlist / collection tracking */

const STATUSES = ["Interested", "Owned", "Not Interested"];

function renderWishlist() {
  const grid = document.getElementById("wishlistGrid");
  const emptyEl = document.getElementById("wishlistEmpty");
  const wishlist = getWishlist();
  const ids = Object.keys(wishlist);

  if (!ids.length) {
    grid.innerHTML = "";
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  grid.innerHTML = ids.map((id) => {
    const product = TOY_HAVEN_PRODUCTS.find((p) => p.id === id);
    if (!product) return "";
    const status = wishlist[id];
    return `
      <article class="wishlist-card" data-item="${id}">
        <div class="product-media" style="aspect-ratio:16/10;">
          <img src="${product.img}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-body" style="padding-bottom:6px;">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <div class="status-row">
          ${STATUSES.map((s) => `
            <button class="status-btn ${s === status ? "is-selected" : ""}" data-status="${s}">${s}</button>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".wishlist-card").forEach((card) => {
    const id = card.dataset.item;
    card.querySelectorAll(".status-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setWishlistStatus(id, btn.dataset.status);
        renderWishlist();
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", renderWishlist);
