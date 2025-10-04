let navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

let list = document.getElementById("cart-list");
let totalEl = document.getElementById("cart-total");

function render() {
  let cart = Cart.all();
  if (!cart.length) {
    list.innerHTML = '<p class="empty">Your cart is empty.</p>';
    totalEl.textContent = "0.00";
    Cart.updateBadge();
    return;
  }

  let html = "";
  for (let i = 0; i < cart.length; i++) {
    let it = cart[i];
    html +=
      '<article class="cart-item" data-id="' +
      it.id +
      '">' +
      '  <img src="' +
      it.image +
      '" alt="' +
      it.title +
      '">' +
      '  <h4 class="ci-title">' +
      it.title +
      "</h4>" +
      '  <div class="qty">' +
      '    <button class="qty-btn dec">-</button>' +
      '    <span class="qty-value">' +
      it.qty +
      "</span>" +
      '    <button class="qty-btn inc">+</button>' +
      "  </div>" +
      '  <p class="ci-price">$' +
      (it.price * it.qty).toFixed(2) +
      "</p>" +
      '  <button class="remove" title="Remove"><i class="fa-solid fa-trash"></i></button>' +
      "</article>";
  }
  list.innerHTML = html;
  totalEl.textContent = Cart.total().toFixed(2);
  Cart.updateBadge();
}
render();

list.addEventListener("click", function (e) {
  let row = e.target.closest(".cart-item");
  if (!row) return;
  let id = Number(row.dataset.id);

  if (e.target.closest(".inc")) {
    let it = Cart.all().find(function (x) {
      return x.id === id;
    });
    Cart.setQty(id, (it ? it.qty : 0) + 1);
    render();
  } else if (e.target.closest(".dec")) {
    let it2 = Cart.all().find(function (x) {
      return x.id === id;
    });
    if (!it2) return;
    Cart.setQty(id, it2.qty - 1);
    render();
  } else if (e.target.closest(".remove")) {
    Cart.remove(id);
    render();
  }
});

document.getElementById("checkout-btn").addEventListener("click", function () {
  if (!Cart.all().length) {
    alert("Your cart is empty.");
    return;
  }
  location.href = "../pages/checkout.html";
});
