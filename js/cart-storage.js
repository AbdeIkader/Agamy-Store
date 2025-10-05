const Cart = {
  all() {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  },
  save(list) {
    localStorage.setItem("cart", JSON.stringify(list));
  },
  add(item) {
    let cart = this.all();
    let found = cart.find((p) => p.id === item.id);
    if (found) found.qty += item.qty || 1;
    else cart.push({ ...item, qty: item.qty || 1 });
    this.save(cart);
    this.updateBadge();
  },
  setQty(id, qty) {
    let cart = this.all();
    let prod = cart.find((p) => p.id === id);
    if (!prod) return;
    if (qty <= 0) cart = cart.filter((p) => p.id !== id);
    else prod.qty = qty;
    this.save(cart);
    this.updateBadge();
  },
  remove(id) {
    this.save(this.all().filter((p) => p.id !== id));
    this.updateBadge();
  },
  count() {
    return this.all().reduce((sum, p) => sum + p.qty, 0);
  },
  total() {
    return this.all().reduce((sum, p) => sum + p.price * p.qty, 0);
  },
  updateBadge() {
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = this.count();
  },
};

const Fav = {
  all() {
    try {
      return JSON.parse(localStorage.getItem("favs") || "[]");
    } catch {
      return [];
    }
  },
  save(list) {
    localStorage.setItem("favs", JSON.stringify(list));
  },
  has(id) {
    return this.all().some((p) => p.id === id);
  },
  add(prod) {
    if (this.has(prod.id)) return;
    let list = this.all();
    list.push(prod);
    this.save(list);
    this.updateBadge();
  },
  remove(id) {
    this.save(this.all().filter((p) => p.id !== id));
    this.updateBadge();
  },
  toggle(prod) {
    this.has(prod.id) ? this.remove(prod.id) : this.add(prod);
  },
  count() {
    return this.all().length;
  },
  updateBadge() {
    const badge = document.getElementById("fav-count");
    if (badge) badge.textContent = this.count();
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Cart.updateBadge();
  Fav.updateBadge();
});
