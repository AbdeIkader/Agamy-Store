var navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

var slides = document.querySelectorAll(".slide");
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");
var currentIndex = 0;
var timer;

function showSlide(index) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  currentIndex = (index + slides.length) % slides.length;
  slides[currentIndex].classList.add("active");
}

function startAutoSlide() {
  clearInterval(timer);
  timer = setInterval(function () {
    showSlide(currentIndex + 1);
  }, 3000);
}

if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    showSlide(currentIndex - 1);
    startAutoSlide();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    showSlide(currentIndex + 1);
    startAutoSlide();
  });
}

if (slides.length > 0) {
  showSlide(0);
  startAutoSlide();
}

var categories = document.querySelectorAll(".cat");

function revealCategories() {
  var triggerPoint = window.innerHeight * 0.85;
  for (var i = 0; i < categories.length; i++) {
    var top = categories[i].getBoundingClientRect().top;
    if (top < triggerPoint) {
      categories[i].classList.add("show");
    }
  }
}

window.addEventListener("scroll", revealCategories);
revealCategories();

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
        '    <h4><a class="view" href="../pages/product.html?id=' +
        p.id +
        '">' +
        p.title +
        "</a></h4>" +
        "    <p class='price'>$" +
        p.price +
        "</p>" +
        '    <button class="add" data-id="' +
        p.id +
        '">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>' +
        "  </div>" +
        "</article>";
    }
    container.innerHTML = html;
  })
  .catch(function () {
    container.innerHTML = "<p>Could not load products right now.</p>";
  });

document.addEventListener("click", function (e) {
  var btn = e.target.closest(".add");
  if (!btn) return;

  alert("Added to cart (demo)");
  var cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = Number(cartCount.textContent) + 1;
  }
});
document.addEventListener("click", function (e) {
  var favBtn = e.target.closest(".fav-btn");
  if (!favBtn) return;

  favBtn.classList.toggle("active");
  var icon = favBtn.querySelector("i");

  if (favBtn.classList.contains("active")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    alert("Added to favorites (demo)");
    var favCount = document.getElementById("fav-count");
    if (favCount) {
      favCount.textContent = Number(favCount.textContent) + 1;
    }
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    var favCount = document.getElementById("fav-count");
    if (favCount) {
      favCount.textContent = Math.max(0, Number(favCount.textContent) - 1);
    }
  }
});

/* --------------------------------------------------Dark Mode Toggle--------------------------------------------------------*/
var darkToggle = document.getElementById("dark-toggle");

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

document.querySelectorAll(".cat").forEach(function (el) {
  el.addEventListener("click", function () {
    var cat = el.dataset.cat || "";
    location.href = "../pages/shop.html?cat=" + encodeURIComponent(cat);
  });
});
