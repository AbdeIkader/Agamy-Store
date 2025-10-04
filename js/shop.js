let navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

let container = document.getElementById("products");
let urlParams = new URLSearchParams(location.search);
let selectedCat = urlParams.get("cat");

fetch("https://fakestoreapi.com/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (products) {
    if (selectedCat) {
      products = products.filter(function (p) {
        return p.category === selectedCat;
      });
    }

    if (selectedCat)
      document.querySelector("h2").textContent = selectedCat.toUpperCase();
    let html = "";
    for (let i = 0; i < products.length; i++) {
      let p = products[i];
      let isFav = Fav.has(p.id);
      html +=
        '<article class="card">' +
        '  <button class="fav-btn ' +
        (isFav ? "active" : "") +
        '"' +
        '          data-id="' +
        p.id +
        '"' +
        '          data-title="' +
        p.title.replace(/"/g, "&quot;") +
        '"' +
        '          data-price="' +
        p.price +
        '"' +
        '          data-image="' +
        p.image +
        '">' +
        '    <i class="fa-' +
        (isFav ? "solid" : "regular") +
        ' fa-heart"></i>' +
        "  </button>" +
        '  <a class="view" href="../pages/product.html?id=' +
        p.id +
        '">' +
        '    <img src="' +
        p.image +
        '" alt="' +
        p.title +
        '">' +
        "  </a>" +
        '  <div class="meta">' +
        '    <div class="meta-row">' +
        '      <h4><a class="view" href="../pages/product.html?id=' +
        p.id +
        '">' +
        p.title +
        "</a></h4>" +
        "      <p class='price'>$" +
        p.price +
        "</p>" +
        "    </div>" +
        '    <button class="add" ' +
        '      data-id="' +
        p.id +
        '" ' +
        '      data-title="' +
        p.title.replace(/"/g, "&quot;") +
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
    container.innerHTML = html;
  })
  .catch(function (err) {
    container.innerHTML = "<p>Could not load products right now.</p>";
    console.log(err);
  });

document.addEventListener("click", function (e) {
  let btn = e.target.closest(".add");
  if (!btn) return;

  Cart.add({
    id: Number(btn.dataset.id),
    title: btn.dataset.title,
    price: Number(btn.dataset.price),
    image: btn.dataset.image,
    qty: 1,
  });

  alert("Added to cart");
});
document.addEventListener("click", function (e) {
  let favBtn = e.target.closest(".fav-btn");
  if (!favBtn) return;

  let prod = {
    id: Number(favBtn.dataset.id),
    title: favBtn.dataset.title,
    price: Number(favBtn.dataset.price || 0),
    image: favBtn.dataset.image,
  };

  Fav.toggle(prod);

  let active = Fav.has(prod.id);
  favBtn.classList.toggle("active", active);
  let icon = favBtn.querySelector("i");
  icon.classList.toggle("fa-solid", active);
  icon.classList.toggle("fa-regular", !active);
  Fav.updateBadge();
});
