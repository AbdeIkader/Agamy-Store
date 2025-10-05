let grid = document.getElementById("fav-products");
let emptyBox = document.getElementById("fav-empty");
let clearBtn = document.getElementById("fav-clear");

render();

Cart.updateBadge();
Fav.updateBadge();

clearBtn.addEventListener("click", () => {
  if (!Fav.all().length) return;
  if (confirm("Are you sure you want to clear all favorites?")) {
    Fav.save([]);
    render();
    Fav.updateBadge();
  }
});

grid.addEventListener("click", (e) => {
  let removeBtn = e.target.closest(".remove-fav");
  let addBtn = e.target.closest(".add");

  if (removeBtn) {
    Fav.remove(+removeBtn.dataset.id);
    render();
  }

  if (addBtn) {
    Cart.add({
      id: +addBtn.dataset.id,
      title: addBtn.dataset.title,
      price: +addBtn.dataset.price,
      image: addBtn.dataset.image,
      qty: 1,
    });
    alert("Added to cart!");
  }
});

function render() {
  let favs = Fav.all();

  if (!favs.length) {
    grid.innerHTML = "";
    emptyBox.hidden = false;
    clearBtn.style.display = "none";
    return;
  }

  emptyBox.hidden = true;
  clearBtn.style.display = "inline-block";

  grid.innerHTML = favs
    .map(
      (p) => `
    <article class="card">
      <button class="remove-fav" data-id="${p.id}" title="Remove">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <a href="../pages/product.html?id=${p.id}" class="view">
        <img src="${p.image}" alt="${p.title}">
      </a>
      <div class="meta">
        <h4><a href="../pages/product.html?id=${p.id}">${p.title}</a></h4>
        <p class="price">$${Number(p.price).toFixed(2)}</p>
        <button class="add" 
          data-id="${p.id}" 
          data-title="${p.title}" 
          data-price="${p.price}" 
          data-image="${p.image}">
          Add To Cart <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </article>
  `
    )
    .join("");
}
