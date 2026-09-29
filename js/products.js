/* Toy Haven — product listing: filter by category, search by name */

let activeCategory = "All";
let searchTerm = "";

function initCategoryChips() {
  const wrap = document.getElementById("categoryChips");
  TOY_HAVEN_CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.dataset.category = cat;
    btn.textContent = cat;
    wrap.appendChild(btn);
  });

  wrap.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      wrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeCategory = chip.dataset.category;
      renderProducts();
    });
  });
}

function applyCategoryFromUrl() {
  const params = new URLSearchParams(location.search);
  const cat = params.get("category");
  if (cat && TOY_HAVEN_CATEGORIES.includes(cat)) {
    activeCategory = cat;
    document.querySelectorAll("#categoryChips .chip").forEach((c) => {
      c.classList.toggle("is-active", c.dataset.category === cat);
    });
  }
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const countEl = document.getElementById("resultCount");
  const wishlist = getWishlist();

  const filtered = TOY_HAVEN_PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  countEl.textContent = `${filtered.length} product${filtered.length === 1 ? "" : "s"}`;

  if (!filtered.length) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = filtered.map((p) => `
    <article class="product-card">
      <div class="product-media">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="wish-btn ${wishlist[p.id] ? "is-active" : ""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">♥</button>
      </div>
      <div class="product-body">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-blurb">${p.blurb}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button class="btn btn-primary" data-add="${p.id}" style="padding:9px 16px;font-size:0.85rem;">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = TOY_HAVEN_PRODUCTS.find((p) => p.id === btn.dataset.add);
      addToCart(product.id, 1);
      showToast(`${product.name} added to cart`);
    });
  });

  grid.querySelectorAll("[data-wish]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.wish;
      const list = getWishlist();
      if (list[id]) {
        setWishlistStatus(id, null);
        btn.classList.remove("is-active");
      } else {
        setWishlistStatus(id, "Interested");
        btn.classList.add("is-active");
        showToast("Saved to wishlist");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCategoryChips();
  applyCategoryFromUrl();
  renderProducts();

  document.getElementById("productSearch").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderProducts();
  });
});
