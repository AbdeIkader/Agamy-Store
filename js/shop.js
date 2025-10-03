var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

var container = document.getElementById("products");
var urlParams = new URLSearchParams(location.search);
var selectedCat = urlParams.get("cat");

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
    var html = "";
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      html +=
        '<article class="card">' +
        '  <button class="fav-btn" data-id="' +
        p.id +
        '"><i class="fa-regular fa-heart"></i></button>' +
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
        '    <button class="add" data-id="' +
        p.id +
        '">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>' +
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
  var btn = e.target.closest(".add");
  if (!btn) return;
  alert("Added to cart (demo)");
  var cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = Number(cartCount.textContent) + 1;
});

document.addEventListener("click", function (e) {
  var favBtn = e.target.closest(".fav-btn");
  if (!favBtn) return;

  favBtn.classList.toggle("active");
  var icon = favBtn.querySelector("i");
  var favCount = document.getElementById("fav-count");

  if (favBtn.classList.contains("active")) {
    icon.classList.replace("fa-regular", "fa-solid");
    alert("Added to favorites (demo)");
    if (favCount) favCount.textContent = Number(favCount.textContent) + 1;
  } else {
    icon.classList.replace("fa-solid", "fa-regular");
    if (favCount)
      favCount.textContent = Math.max(0, Number(favCount.textContent) - 1);
  }
});

var darkToggle = document.getElementById("dark-toggle");
if (darkToggle) {
  darkToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    var icon = darkToggle.querySelector("i");
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}
