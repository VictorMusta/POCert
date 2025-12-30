(function () {
  const data = window.NAILFINDER_DATA;

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("nf-theme", theme);
    } catch (e) {
      // ignore
    }
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
    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }
  }

  function createProCard(pro) {
    ...existing code...
  }

  function hydrateFeatured() {
    ...existing code...
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    hydrateFeatured();
  });
})();
