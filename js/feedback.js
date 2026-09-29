/* Toy Haven — feedback form + FAQ accordion */

const FAQ_ITEMS = [
  { q: "How long does shipping take?", a: "Orders typically arrive within 3–7 business days, depending on your location. You'll see an estimated delivery window at checkout." },
  { q: "Can I change my order after checkout?", a: "Since this is a front-end demo, orders are stored locally in your browser and can't be edited after confirmation — you're welcome to place a new order." },
  { q: "Do you restock sold-out figurines?", a: "Limited-run figurines are restocked occasionally. Join the newsletter to be notified when a shelf item returns." },
  { q: "How do I track items I'm interested in?", a: "Use the heart icon on any product card, then visit your Wishlist page to mark items as Interested, Owned, or Not Interested." },
  { q: "Is my data stored anywhere besides my browser?", a: "No — cart, wishlist, orders, and feedback are all stored locally on your device using localStorage." },
];

function buildFaq() {
  const wrap = document.getElementById("faqAccordion");
  wrap.innerHTML = FAQ_ITEMS.map((item, i) => `
    <div class="accordion-item" id="faqItem${i}">
      <button class="accordion-trigger" aria-expanded="false" data-index="${i}">
        <span>${item.q}</span>
        <span class="plus" aria-hidden="true">+</span>
      </button>
      <div class="accordion-panel">
        <div class="accordion-panel-inner">${item.a}</div>
      </div>
    </div>
  `).join("");

  wrap.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const panel = item.querySelector(".accordion-panel");
      const isOpen = item.classList.contains("is-open");

      // close all
      wrap.querySelectorAll(".accordion-item").forEach((el) => {
        el.classList.remove("is-open");
        el.querySelector(".accordion-panel").style.maxHeight = null;
        el.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function setFbError(fieldId, hasError) {
  document.getElementById(fieldId).classList.toggle("has-error", hasError);
}

function initFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let valid = true;

    if (!name) { setFbError("fbFieldName", true); valid = false; } else setFbError("fbFieldName", false);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { setFbError("fbFieldEmail", true); valid = false; } else setFbError("fbFieldEmail", false);
    if (!message) { setFbError("fbFieldMessage", true); valid = false; } else setFbError("fbFieldMessage", false);

    if (!valid) {
      showToast("Please fix the highlighted fields");
      return;
    }

    const entries = readStore(TH_KEYS.feedback, []);
    entries.push({ name, email, message, date: new Date().toISOString() });
    writeStore(TH_KEYS.feedback, entries);

    document.getElementById("fbConfirmation").style.display = "block";
    form.reset();
    showToast("Message sent — thank you!");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildFaq();
  initFeedbackForm();
});
