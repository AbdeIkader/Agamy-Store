let list = document.getElementById("cart-list");
let totalEl = document.getElementById("cart-total");
let checkoutBtn = document.getElementById("checkout-btn");

Cart.updateBadge();

render();

function render() {
  let cart = Cart.all();

  if (!cart.length) {
    list.innerHTML = `<p class="empty">Your cart is empty.</p>`;
    totalEl.textContent = "0.00";
    return;
  }

  list.innerHTML = cart
    .map(
      (item) => `
      <article class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}">
        <h4>${item.title}</h4>
        <div class="qty">
          <button class="qty-btn dec">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn inc">+</button>
        </div>
        <p class="ci-price">$${(item.price * item.qty).toFixed(2)}</p>
        <button class="remove"><i class="fa-solid fa-trash"></i></button>
      </article>
    `
    )
    .join("");

  totalEl.textContent = Cart.total().toFixed(2);
  Cart.updateBadge();
}

list.addEventListener("click", (e) => {
  let itemRow = e.target.closest(".cart-item");
  if (!itemRow) return;
  let id = +itemRow.dataset.id;

  if (e.target.closest(".inc")) {
    let item = Cart.all().find((p) => p.id === id);
    Cart.setQty(id, (item ? item.qty : 0) + 1);
  } else if (e.target.closest(".dec")) {
    let item = Cart.all().find((p) => p.id === id);
    if (item && item.qty > 1) Cart.setQty(id, item.qty - 1);
    else Cart.remove(id);
  } else if (e.target.closest(".remove")) {
    Cart.remove(id);
  }

  render();
});

checkoutBtn.addEventListener("click", () => {
  if (!Cart.all().length) return alert("Your cart is empty.");
  location.href = "../pages/checkout.html";
});
