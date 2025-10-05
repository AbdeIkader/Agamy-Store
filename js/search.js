let input = document.getElementById("nav-search");
let box = document.getElementById("nav-suggest");
let allProducts = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => (allProducts = data))
  .catch(() => {
    box.innerHTML = "<div class='empty-suggest'>Error loading products</div>";
  });

input.addEventListener("input", () => {
  let q = input.value.trim().toLowerCase();
  if (!q) {
    box.classList.add("hidden");
    return;
  }

  let results = allProducts.filter((p) => p.title.toLowerCase().includes(q));
  showResults(results);
});

function showResults(list) {
  if (!list.length) {
    box.innerHTML = "<div class='empty-suggest'>No results found</div>";
    box.classList.remove("hidden");
    return;
  }

  let html = list
    .slice(0, 6)
    .map(
      (p) => `
    <div class="row" data-id="${p.id}">
      <img src="${p.image}" alt="">
      <div class="t">${p.title}</div>
      <div class="p">$${p.price}</div>
    </div>
  `
    )
    .join("");

  box.innerHTML = html;
  box.classList.remove("hidden");
}

box.addEventListener("click", (e) => {
  let row = e.target.closest(".row");
  if (!row) return;
  let id = row.dataset.id;
  location.href = "../pages/product.html?id=" + id;
});

document.addEventListener("click", (e) => {
  if (!box.contains(e.target) && e.target !== input) {
    box.classList.add("hidden");
  }
});
