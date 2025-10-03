(function () {
  function read() {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  }
  function write(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.Cart = {
    all: read,
    save: write,
    add: function (item) {
      var cart = read();
      var exist = cart.find(function (x) {
        return x.id === item.id;
      });
      if (exist) exist.qty += item.qty || 1;
      else
        cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          qty: item.qty || 1,
        });
      write(cart);
      this.updateBadge();
    },
    setQty: function (id, qty) {
      var cart = read();
      var it = cart.find(function (x) {
        return x.id === id;
      });
      if (!it) return;
      if (qty <= 0)
        cart = cart.filter(function (x) {
          return x.id !== id;
        });
      else it.qty = qty;
      write(cart);
      this.updateBadge();
    },
    remove: function (id) {
      write(
        read().filter(function (x) {
          return x.id !== id;
        })
      );
      this.updateBadge();
    },
    count: function () {
      return read().reduce(function (s, i) {
        return s + i.qty;
      }, 0);
    },
    total: function () {
      return read().reduce(function (s, i) {
        return s + i.price * i.qty;
      }, 0);
    },
    updateBadge: function () {
      var b = document.getElementById("cart-count");
      if (b) b.textContent = String(this.count());
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    Cart.updateBadge();
  });
})();
