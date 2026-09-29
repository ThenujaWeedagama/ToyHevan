/* Toy Haven — shared utilities, loaded on every page.
   Handles: cart/wishlist storage, nav + hamburger, scroll reveal, footer newsletter. */

const TH_KEYS = {
  cart: "th_cart",
  wishlist: "th_wishlist",
  orders: "th_orders",
  feedback: "th_feedback",
  newsletter: "th_newsletter_email",
};

/* ---------- Reusable helpers (used across multiple pages) ---------- */

// Reusable across index/products/cart/checkout pages.
function formatPrice(amount) {
  return "$" + Number(amount).toFixed(2);
}

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCart() {
  return readStore(TH_KEYS.cart, []);
}

function saveCart(cart) {
  writeStore(TH_KEYS.cart, cart);
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
}

function cartItemCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-badge]").forEach((el) => {
    const count = cartItemCount();
    el.textContent = count;
    el.classList.toggle("is-hidden", count === 0);
  });
}

/* ---------- Wishlist ---------- */

function getWishlist() {
  return readStore(TH_KEYS.wishlist, {});
}

function setWishlistStatus(productId, status) {
  const list = getWishlist();
  if (status === null) {
    delete list[productId];
  } else {
    list[productId] = status;
  }
  writeStore(TH_KEYS.wishlist, list);
}

/* ---------- Nav / hamburger ---------- */

function initNav() {
  const toggle = document.querySelector(".js-nav-toggle");
  const nav = document.querySelector(".js-nav-menu");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Mark the current page's nav link */
function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".js-nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("is-active-link");
  });
}

/* ---------- Scroll reveal (single orchestrated effect) ---------- */

function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((t) => t.classList.add("is-revealed"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => observer.observe(t));
}

/* ---------- Footer newsletter ---------- */

function initNewsletterForm() {
  const form = document.querySelector(".js-newsletter-form");
  if (!form) return;
  const input = form.querySelector("input[type='email']");
  const note = form.querySelector(".js-newsletter-note");
  const saved = localStorage.getItem(TH_KEYS.newsletter);
  if (saved && note) {
    note.textContent = `Subscribed as ${saved}.`;
    note.classList.add("is-success");
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      note.textContent = "Enter a valid email address.";
      note.classList.remove("is-success");
      note.classList.add("is-error");
      return;
    }
    localStorage.setItem(TH_KEYS.newsletter, email);
    note.textContent = `Subscribed as ${email}. Welcome to the Haven.`;
    note.classList.remove("is-error");
    note.classList.add("is-success");
    form.reset();
  });
}

/* ---------- Toast ---------- */

function showToast(message) {
  let toast = document.querySelector(".th-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "th-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove("is-visible");
  // force reflow so the animation restarts on rapid triggers
  void toast.offsetWidth;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  markActiveNav();
  updateCartBadge();
  initScrollReveal();
  initNewsletterForm();

  const year = document.querySelector(".js-year");
  if (year) year.textContent = new Date().getFullYear();
});
