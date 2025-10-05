let itemsBox = document.getElementById("co-items");
let shipSel = document.getElementById("ship");
let subEl = document.getElementById("sum-sub");
let shipEl = document.getElementById("sum-ship");
let totalEl = document.getElementById("sum-total");
let cardBox = document.getElementById("card-box");
let form = document.getElementById("co-form");

Cart.updateBadge();
render();

shipSel.addEventListener("change", render);

itemsBox.addEventListener("click", (e) => {
  let item = e.target.closest(".item");
  if (!item) return;
  let id = +item.dataset.id;
  let prod = Cart.all().find((p) => p.id === id);

  if (e.target.classList.contains("inc")) Cart.setQty(id, prod.qty + 1);
  if (e.target.classList.contains("dec")) Cart.setQty(id, prod.qty - 1);
  render();
});

document.querySelectorAll('input[name="pay"]').forEach((r) => {
  r.addEventListener("change", () => {
    cardBox.style.display = r.value === "card" ? "block" : "none";
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let fields = ["full-name", "email", "address", "city", "zip", "country"];
  for (let id of fields) {
    if (!document.getElementById(id).value.trim()) {
      alert("Please fill your details.");
      return;
    }
  }

  if (!Cart.all().length) return alert("Your cart is empty.");

  let orderId = "AG-" + Date.now().toString().slice(-5);
  alert(
    `✅ Order placed!\nOrder ID: ${orderId}\nTotal: ${totalEl.textContent}`
  );

  Cart.save([]);
  Cart.updateBadge();
  location.href = "../pages/home.html";
});

function render() {
  let cart = Cart.all();
  if (!cart.length) {
    itemsBox.innerHTML = `<p>Your cart is empty.</p>`;
    subEl.textContent = shipEl.textContent = totalEl.textContent = "$0.00";
    return;
  }

  itemsBox.innerHTML = cart
    .map(
      (p) => `
      <div class="item" data-id="${p.id}">
        <img src="${p.image}" alt="">
        <div>
          <h4>${p.title}</h4>
          <div class="qty">
            <button class="dec">-</button>
            <span>${p.qty}</span>
            <button class="inc">+</button>
          </div>
        </div>
        <div class="price">$${(p.price * p.qty).toFixed(2)}</div>
      </div>
    `
    )
    .join("");

  let sub = Cart.total();
  let ship = +shipSel.value || 0;
  let total = sub + ship;

  subEl.textContent = `$${sub.toFixed(2)}`;
  shipEl.textContent = `$${ship.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}
