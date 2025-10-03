function setupThemeToggle() {
  var toggle = document.getElementById("dark-toggle");
  var icon = toggle ? toggle.querySelector("i") : null;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (icon) {
      icon.classList.add("fa-sun");
      icon.classList.remove("fa-moon");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      var dark = document.body.classList.contains("dark");

      localStorage.setItem("theme", dark ? "dark" : "light");

      if (icon) {
        icon.classList.toggle("fa-sun", dark);
        icon.classList.toggle("fa-moon", !dark);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", setupThemeToggle);
