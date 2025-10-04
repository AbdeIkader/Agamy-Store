let ALL_PRODUCTS = [];
let input = document.getElementById("nav-search");
let box = document.getElementById("nav-suggest");

function loadProducts() {
  let cached = localStorage.getItem("agamy_products");
  if (cached) {
    try {
      ALL_PRODUCTS = JSON.parse(cached) || [];
    } catch {
      ALL_PRODUCTS = [];
    }
  }
  if (ALL_PRODUCTS.length) {
    showDefault();
    return;
  }

  fetch("https://fakestoreapi.com/products")
    .then((r) => r.json())
    .then((data) => {
      ALL_PRODUCTS = Array.isArray(data) ? data : [];
      localStorage.setItem("agamy_products", JSON.stringify(ALL_PRODUCTS));
      showDefault();
    })
    .catch(() => {
      box.innerHTML =
        '<div class="empty-suggest">Could not load products.</div>';
    });
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

function render(list) {
  if (!list || !list.length) {
    box.innerHTML = '<div class="empty-suggest">No results</div>';
    box.classList.remove("hidden");
    return;
  }

  let html = list
    .slice(0, 8)
    .map(
      (p) => `
    <div class="row" data-id="${p.id}">
      <img src="${p.image}" alt="">
      <div class="t">${escapeHtml(p.title)}</div>
      <div class="p">$${p.price}</div>
    </div>
  `
    )
    .join("");

  box.innerHTML = html;
  box.classList.remove("hidden");
}

function showDefault() {
  render(ALL_PRODUCTS.slice(0, 8));
}

function filterProducts() {
  let q = input.value.trim().toLowerCase();
  let list = !q
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
  render(list);
}

function handleClick(e) {
  let row = e.target.closest(".row");
  if (!row) return;
  let id = row.dataset.id;
  location.href = "../pages/product.html?id=" + encodeURIComponent(id);
}

function setupSearch() {
  if (!input || !box) return;

  input.addEventListener("focus", function () {
    if (!ALL_PRODUCTS.length) loadProducts();
    else if (!input.value.trim()) showDefault();
    else filterProducts();
  });

  input.addEventListener("input", filterProducts);
  box.addEventListener("mousedown", handleClick);

  document.addEventListener("click", function (e) {
    if (!box.contains(e.target) && e.target !== input) {
      box.classList.add("hidden");
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") box.classList.add("hidden");
    if (e.key === "Enter") {
      let first = box.querySelector(".row");
      if (first) {
        location.href =
          "../pages/product.html?id=" + encodeURIComponent(first.dataset.id);
      }
    }
  });
}

setupSearch();
