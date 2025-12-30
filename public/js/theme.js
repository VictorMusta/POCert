(function () {
  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("nf-theme", theme);
    } catch (e) {}
    const toggle = document.querySelector("#theme-toggle");
    if (toggle) {
      toggle.textContent = theme === "dark" ? "Mode clair" : "Mode sombre";
    }
  }

  function initTheme() {
    let theme = "light";
    try {
      const stored = localStorage.getItem("nf-theme");
      if (stored === "dark" || stored === "light") theme = stored;
    } catch (e) {}
    applyTheme(theme);

    const toggle = document.querySelector("#theme-toggle");
    if (toggle && !toggle.dataset.bound) {
      toggle.dataset.bound = "true";
      toggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("./sw.js")
          .catch(() => {});
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    registerServiceWorker();
  });
})();

