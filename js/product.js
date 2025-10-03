var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

var darkToggle = document.getElementById("dark-toggle");
if (darkToggle) {
  darkToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    var icon = darkToggle.querySelector("i");
    icon.classList.toggle("fa-sun", document.body.classList.contains("dark"));
    icon.classList.toggle("fa-moon", !document.body.classList.contains("dark"));
  });
}

var params = new URLSearchParams(location.search);
var id = params.get("id");
var root = document.getElementById("pd-grid");

if (!id) {
  root.innerHTML = "<p>Product not found.</p>";
} else {
  fetch("https://fakestoreapi.com/products/" + id)
    .then((r) => r.json())
    .then((p) => {
      root.innerHTML = `
        <img class="pd-img" src="${p.image}" alt="${p.title}">
        <div>
          <h3 class="pd-title">${p.title}</h3>
          <p class="pd-desc">${p.description}</p>
          <p class="pd-price">Price: $${p.price}</p>
          <a class="pd-btn" href="../pages/shop.html">Back to Products</a>
        </div>
      `;
    })
    .catch(() => {
      root.innerHTML = "<p>Failed to load product.</p>";
    });
}

const back = document.querySelector(".pd-back");
if (back && window.history.length > 1) {
  back.addEventListener("click", function (e) {
    e.preventDefault();
    history.back();
  });
}
