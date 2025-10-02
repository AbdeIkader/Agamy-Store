// Navbar on scroll
var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// جلب المنتجات وعرضها
var container = document.getElementById("products");

fetch("https://fakestoreapi.com/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (products) {
    var html = "";
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      html +=
        '<article class="card">' +
        '  <button class="fav-btn" data-id="' +
        p.id +
        '">' +
        '    <i class="fa-regular fa-heart"></i>' +
        "  </button>" +
        '  <img src="' +
        p.image +
        '" alt="' +
        p.title +
        '">' +
        '  <div class="meta">' +
        "    <h4>" +
        p.title +
        "</h4>" +
        "    <p class='price'>$" +
        p.price +
        "</p>" +
        '    <button class="add" data-id="' +
        p.id +
        '">' +
        '      Add To Cart <i class="fa-solid fa-cart-shopping"></i>' +
        "    </button>" +
        "  </div>" +
        "</article>";
    }
    container.innerHTML = html;
  })
  .catch(function () {
    container.innerHTML = "<p>Could not load products right now.</p>";
  });

// Add to cart (demo)
document.addEventListener("click", function (e) {
  var btn = e.target.closest(".add");
  if (!btn) return;
  alert("Added to cart (demo)");
  var cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = Number(cartCount.textContent) + 1;
});

// Favorites (demo)
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

// Dark mode toggle
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
