/* Toy Haven — checkout: validation, totals, order confirmation */

function checkoutTotals() {
  const items = getCart()
    .map((item) => {
      const product = TOY_HAVEN_PRODUCTS.find((p) => p.id === item.id);
      return product ? { qty: item.qty, price: product.price } : null;
    })
    .filter(Boolean);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 60 ? 0 : 4.99;
  return { subtotal, shipping, total: subtotal + shipping };
}

function renderCheckoutSummary() {
  const { subtotal, shipping, total } = checkoutTotals();
  document.getElementById("coSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("coShipping").textContent = shipping === 0 ? "Free" : formatPrice(shipping);
  document.getElementById("coTotal").textContent = formatPrice(total);
}

function setFieldError(fieldId, hasError) {
  document.getElementById(fieldId).classList.toggle("has-error", hasError);
}

function validateForm(data) {
  let valid = true;

  if (!data.fullName.trim()) { setFieldError("fieldName", true); valid = false; }
  else setFieldError("fieldName", false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
  if (!emailOk) { setFieldError("fieldEmail", true); valid = false; }
  else setFieldError("fieldEmail", false);

  if (!data.address.trim()) { setFieldError("fieldAddress", true); valid = false; }
  else setFieldError("fieldAddress", false);

  return valid;
}

function initPaymentToggle() {
  document.querySelectorAll("input[name='payment']").forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".pay-option").forEach((opt) => opt.classList.remove("is-selected"));
      radio.closest(".pay-option").classList.add("is-selected");
    });
  });
}

function saveOrder(data, totals) {
  const orders = readStore(TH_KEYS.orders, []);
  orders.push({
    id: "order-" + Date.now(),
    date: new Date().toISOString(),
    customer: { name: data.fullName, email: data.email, address: data.address },
    payment: data.payment,
    items: getCart(),
    totals,
  });
  writeStore(TH_KEYS.orders, orders);
}

document.addEventListener("DOMContentLoaded", () => {
  const hasItems = getCart().length > 0;
  document.getElementById("checkoutEmpty").hidden = hasItems;
  document.getElementById("checkoutForm").hidden = !hasItems;
  if (!hasItems) return;

  renderCheckoutSummary();
  initPaymentToggle();

  document.getElementById("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      fullName: form.fullName.value,
      email: form.email.value,
      address: form.address.value,
      payment: form.payment.value,
    };

    if (!validateForm(data)) {
      showToast("Please fix the highlighted fields");
      return;
    }

    const totals = checkoutTotals();
    saveOrder(data, totals);
    saveCart([]);

    document.getElementById("checkoutForm").hidden = true;
    document.getElementById("successName").textContent = `, ${data.fullName}`;
    document.getElementById("successPanel").hidden = false;
  });
});
