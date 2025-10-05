let navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

let container = document.getElementById("products");
let urlParams = new URLSearchParams(location.search);
let selectedCat = urlParams.get("cat");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    if (selectedCat) {
      products = products.filter((p) => p.category === selectedCat);
      document.querySelector("h2").textContent = selectedCat.toUpperCase();
    }

    container.innerHTML = "";
    products.forEach((p) => {
      let card = document.createElement("article");
      card.className = "card";

      let favBtn = document.createElement("button");
      favBtn.className = "fav-btn" + (Fav.has(p.id) ? " active" : "");
      favBtn.dataset.id = p.id;
      favBtn.dataset.title = p.title;
      favBtn.dataset.price = p.price;
      favBtn.dataset.image = p.image;
      favBtn.innerHTML = `<i class="fa-${
        Fav.has(p.id) ? "solid" : "regular"
      } fa-heart"></i>`;
      card.appendChild(favBtn);

      let link = document.createElement("a");
      link.href = `../pages/product.html?id=${p.id}`;
      link.className = "view";
      link.innerHTML = `<img src="${p.image}" alt="${p.title}">`;
      card.appendChild(link);

      let meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `
        <h4><a href="../pages/product.html?id=${p.id}">${p.title}</a></h4>
        <p class="price">$${p.price}</p>
        <button class="add" data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-image="${p.image}">
          Add To Cart <i class="fa-solid fa-cart-shopping"></i>
        </button>
      `;
      card.appendChild(meta);

      container.appendChild(card);
    });
  })
  .catch(() => {
    container.innerHTML = "<p>Could not load products right now.</p>";
  });

document.addEventListener("click", (e) => {
  let btn = e.target.closest(".add");
  if (!btn) return;

  Cart.add({
    id: +btn.dataset.id,
    title: btn.dataset.title,
    price: +btn.dataset.price,
    image: btn.dataset.image,
    qty: 1,
  });

  alert("Added to cart!");
});

document.addEventListener("click", (e) => {
  let favBtn = e.target.closest(".fav-btn");
  if (!favBtn) return;

  let prod = {
    id: +favBtn.dataset.id,
    title: favBtn.dataset.title,
    price: +favBtn.dataset.price,
    image: favBtn.dataset.image,
  };

  Fav.toggle(prod);

  let isFav = Fav.has(prod.id);
  favBtn.classList.toggle("active", isFav);
  favBtn.querySelector("i").className = `fa-${
    isFav ? "solid" : "regular"
  } fa-heart`;
  Fav.updateBadge();
});
