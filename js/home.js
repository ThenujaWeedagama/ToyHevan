/* Toy Haven — home page: hero rotator + featured products */

const HERO_SLIDES = [
  {
    tag: "Figurines",
    title: "Hand-finished figurines for the display shelf",
    copy: "Limited-run resin and vinyl pieces, painted in small batches.",
    img: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=900&q=80",
    link: "products.html?category=Figurines",
  },
  {
    tag: "Toys",
    title: "Toys built for hours of play",
    copy: "Building sets, plush, and wind-up classics for every age.",
    img: "https://images.unsplash.com/photo-1560961911-ba7ef651e7d6?w=900&q=80",
    link: "products.html?category=Toys",
  },
  {
    tag: "Board Games",
    title: "Game nights start here",
    copy: "Co-op, trading, and party games for two to eight players.",
    img: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=900&q=80",
    link: "products.html?category=Board+Games",
  },
  {
    tag: "Diecast Cars",
    title: "Scale models with real detail",
    copy: "Opening doors, working suspension, and true-to-livery paint.",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
    link: "products.html?category=Diecast+Cars",
  },
];

function renderHero() {
  const slidesEl = document.getElementById("heroSlides");
  const dotsEl = document.getElementById("heroDots");
  if (!slidesEl) return;

  slidesEl.innerHTML = HERO_SLIDES.map((slide, i) => `
    <div class="hero-slide ${i === 0 ? "is-active" : ""}" data-slide="${i}">
      <div class="container">
        <div>
          <span class="hero-eyebrow-tag">${slide.tag}</span>
          <h1>${slide.title}</h1>
          <p>${slide.copy}</p>
          <div class="hero-actions">
            <a href="${slide.link}" class="btn btn-marigold">Shop Now</a>
            <a href="products.html" class="btn btn-secondary" style="border-color:rgba(250,246,239,0.5);color:#fff;">Browse all</a>
          </div>
        </div>
        <div class="hero-art"><img src="${slide.img}" alt="${slide.tag} promotional image"></div>
      </div>
    </div>
  `).join("");

  dotsEl.innerHTML = HERO_SLIDES.map((_, i) =>
    `<button aria-label="Show slide ${i + 1}" data-dot="${i}" class="${i === 0 ? "is-active" : ""}"></button>`
  ).join("");

  let current = 0;
  const slides = slidesEl.querySelectorAll(".hero-slide");
  const dots = dotsEl.querySelectorAll("button");

  function goTo(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = index;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  let timer = setInterval(() => goTo((current + 1) % slides.length), 5000);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(timer);
      goTo(i);
      timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
    });
  });
}

function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;
  const featured = TOY_HAVEN_PRODUCTS.filter((_, i) => i % 4 === 0).slice(0, 4);
  const wishlist = getWishlist();

  grid.innerHTML = featured.map((p) => `
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
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderFeatured();
});
