let navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

let itemsBox = document.getElementById("co-items");
let subEl = document.getElementById("sum-sub");
let shipEl = document.getElementById("sum-ship");
let totalEl = document.getElementById("sum-total");
let shipSel = document.getElementById("ship");

Cart.updateBadge();
render();

shipSel.addEventListener("change", render);

itemsBox.addEventListener("click", function (e) {
  let row = e.target.closest(".item");
  if (!row) return;
  let id = Number(row.dataset.id);

  if (e.target.classList.contains("inc")) {
    let it = Cart.all().find(function (x) {
      return x.id === id;
    });
    Cart.setQty(id, (it ? it.qty : 0) + 1);
    render();
  }
  if (e.target.classList.contains("dec")) {
    let it2 = Cart.all().find(function (x) {
      return x.id === id;
    });
    if (!it2) return;
    Cart.setQty(id, it2.qty - 1);
    render();
  }
});

let cardBox = document.getElementById("card-box");
document.querySelectorAll('input[name="pay"]').forEach(function (r) {
  r.addEventListener("change", function () {
    cardBox.style.display = this.value === "card" ? "block" : "none";
  });
});

document.getElementById("co-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let need = ["full-name", "email", "address", "city", "zip", "country"];
  for (let i = 0; i < need.length; i++) {
    let el = document.getElementById(need[i]);
    if (!el.value.trim()) {
      el.focus();
      alert("Please fill your details.");
      return;
    }
  }

  let pay = document.querySelector('input[name="pay"]:checked').value;
  if (pay === "card") {
    let must = ["cc-num", "cc-name", "cc-exp", "cc-cvc"];
    for (let j = 0; j < must.length; j++) {
      if (!document.getElementById(must[j]).value.trim()) {
        document.getElementById(must[j]).focus();
        alert("Please enter your card info.");
        return;
      }
    }
  }

  if (!Cart.all().length) {
    alert("Your cart is empty.");
    return;
  }

  let orderId = "AG-" + Date.now().toString().slice(-6);
  alert(
    "Order placed ✅\nOrder ID: " + orderId + "\nTotal: " + totalEl.textContent
  );

  Cart.save([]);
  Cart.updateBadge();
  location.href = "../pages/home.html";
});

function render() {
  let cart = Cart.all();

  if (!cart.length) {
    itemsBox.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let html = "";
    for (let i = 0; i < cart.length; i++) {
      let it = cart[i];
      html +=
        '<div class="item" data-id="' +
        it.id +
        '">' +
        '  <img src="' +
        it.image +
        '" alt="">' +
        "  <div>" +
        "    <h4>" +
        escapeHtml(it.title) +
        "</h4>" +
        '    <div class="qty">' +
        '      <button type="button" class="dec">-</button>' +
        "      <span>" +
        it.qty +
        "</span>" +
        '      <button type="button" class="inc">+</button>' +
        "    </div>" +
        "  </div>" +
        '  <div class="price">$' +
        (it.price * it.qty).toFixed(2) +
        "</div>" +
        "</div>";
    }
    itemsBox.innerHTML = html;
  }

  let sub = Cart.total();
  let ship = Number(shipSel.value) || 0;
  let total = sub + ship;

  subEl.textContent = "$" + sub.toFixed(2);
  shipEl.textContent = "$" + ship.toFixed(2);
  totalEl.textContent = "$" + total.toFixed(2);

  Cart.updateBadge();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}

(function () {
  let num = document.getElementById("cc-num");
  let exp = document.getElementById("cc-exp");
  if (num)
    num.addEventListener("input", function () {
      this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
    });
  if (exp)
    exp.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "").slice(0, 4);
      this.value = v.length >= 3 ? v.slice(0, 2) + "/" + v.slice(2) : v;
    });
})();
