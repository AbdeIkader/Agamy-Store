let navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

let slides = document.querySelectorAll(".slide");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let currentIndex = 0;
let timer;

function showSlide(index) {
  for (let i = 0; i < slides.length; i++) {
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

let categories = document.querySelectorAll(".cat");

function revealCategories() {
  let triggerPoint = window.innerHeight * 0.85;
  for (let i = 0; i < categories.length; i++) {
    let top = categories[i].getBoundingClientRect().top;
    if (top < triggerPoint) {
      categories[i].classList.add("show");
    }
  }
}

window.addEventListener("scroll", revealCategories);
revealCategories();

let container = document.getElementById("products");

fetch("https://fakestoreapi.com/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (products) {
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
        '    <h4><a class="view" href="../pages/product.html?id=' +
        p.id +
        '">' +
        p.title +
        "</a></h4>" +
        "    <p class='price'>$" +
        p.price +
        "</p>" +
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
  .catch(function () {
    container.innerHTML = "<p>Could not load products right now.</p>";
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

document.getElementById("f-search")?.addEventListener("input", applyFilters);
document.getElementById("f-cat")?.addEventListener("change", applyFilters);

document.querySelectorAll(".cat").forEach(function (el) {
  el.addEventListener("click", function () {
    let cat = el.dataset.cat || "";
    location.href = "../pages/shop.html?cat=" + encodeURIComponent(cat);
  });
});
