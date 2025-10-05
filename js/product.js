let navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

let params = new URLSearchParams(location.search);
let id = params.get("id");
let root = document.getElementById("pd-grid");

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

    <div class="pd-actions">
      <button class="pd-add"
        data-id="${p.id}"
        data-title="${p.title.replace(/"/g, "&quot;")}"
        data-price="${p.price}"
        data-image="${p.image}">Add to Cart</button>
    </div>
  </div>
`;
    })
    .catch(() => {
      root.innerHTML = "<p>Failed to load product.</p>";
    });
}

document.addEventListener("click", function (e) {
  let b = e.target.closest(".pd-add");
  if (!b) return;
  Cart.add({
    id: Number(b.dataset.id),
    title: b.dataset.title,
    price: Number(b.dataset.price),
    image: b.dataset.image,
    qty: 1,
  });
  alert("Added to cart");
});
