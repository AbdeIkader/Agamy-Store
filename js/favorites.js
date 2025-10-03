var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

var grid = document.getElementById("fav-products");
var emptyBox = document.getElementById("fav-empty");
var clearBtn = document.getElementById("fav-clear");

render();
Cart.updateBadge();
Fav.updateBadge();

clearBtn.addEventListener("click", function () {
  if (!Fav.all().length) return;
  if (!confirm("Remove all favorites?")) return;
  Fav.save([]);
  render();
});

grid.addEventListener("click", function (e) {
  var rm = e.target.closest(".remove-fav");
  if (rm) {
    var id = Number(rm.dataset.id);
    Fav.remove(id);
    render();
    return;
  }

  var addBtn = e.target.closest(".add");
  if (addBtn) {
    Cart.add({
      id: Number(addBtn.dataset.id),
      title: addBtn.dataset.title,
      price: Number(addBtn.dataset.price),
      image: addBtn.dataset.image,
      qty: 1,
    });
    alert("Added to cart");
  }
});

function render() {
  var favs = Fav.all();
  if (!favs.length) {
    grid.innerHTML = "";
    emptyBox.hidden = false;
    clearBtn.style.display = "none";
    Fav.updateBadge();
    Cart.updateBadge();
    return;
  }

  emptyBox.hidden = true;
  clearBtn.style.display = "inline-block";

  var html = "";
  for (var i = 0; i < favs.length; i++) {
    var p = favs[i];
    html +=
      '<article class="card">' +
      '  <button class="remove-fav" title="Remove" data-id="' +
      p.id +
      '">' +
      '    <i class="fa-solid fa-xmark"></i>' +
      "  </button>" +
      '  <a class="view" href="../pages/product.html?id=' +
      p.id +
      '">' +
      '    <img src="' +
      p.image +
      '" alt="' +
      escapeHtml(p.title) +
      '">' +
      "  </a>" +
      '  <div class="meta">' +
      '    <h4><a class="view" href="../pages/product.html?id=' +
      p.id +
      '">' +
      escapeHtml(p.title) +
      "</a></h4>" +
      "    <p class='price'>$" +
      Number(p.price).toFixed(2) +
      "</p>" +
      '    <button class="add" ' +
      '      data-id="' +
      p.id +
      '" ' +
      '      data-title="' +
      escapeAttr(p.title) +
      '" ' +
      '      data-price="' +
      p.price +
      '" ' +
      '      data-image="' +
      p.image +
      '"' +
      '    >Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>' +
      "  </div>" +
      "</article>";
  }
  grid.innerHTML = html;

  Fav.updateBadge();
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
function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}
