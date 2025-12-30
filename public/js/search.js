(function () {
  const data = window.NAILFINDER_DATA;
  if (!data || !data.pros) return;

  function renderResults(list) {
    const container = document.getElementById("results-list");
    const summary = document.getElementById("results-summary");
    const empty = document.getElementById("results-empty");
    if (!container || !summary || !empty) return;

    if (!list.length) {
      container.innerHTML = "";
      summary.textContent = "0 prothésiste trouvée";
      empty.hidden = false;
      return;
    }

    const plural = list.length > 1 ? "prothésistes" : "prothésiste";
    summary.textContent = `${list.length} ${plural} trouvée(s) dans ce POC`;
    empty.hidden = true;

    container.innerHTML = list
      .map((pro) => {
        const url = `profil.html?id=${encodeURIComponent(pro.id)}`;
        const certifiedBadge = pro.certified
          ? '<span class="badge badge-certified">Certifiée</span>'
          : "";
        const demoBadge = pro.demoOnly
          ? '<span class="badge badge-soft">Démo POCERT</span>'
          : "";

        return `
          <article class="card card-pro">
            <div style="display:flex;gap:16px;align-items:center;">
              <img src="${pro.avatar}" alt="${pro.name}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;" />
              <div>
                <h3>${pro.name}</h3>
                <p style="margin-bottom:6px;">${pro.city} · ${pro.postalCode}</p>
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:0.85rem;">
                  <span class="rating">${pro.rating.toFixed(1)}</span>
                  <span>(${pro.reviewsCount} avis)</span>
                  ${certifiedBadge}
                  ${demoBadge}
                </div>
              </div>
            </div>
            <a href="${url}" class="btn btn-secondary" style="margin-top:14px;">Voir le profil</a>
          </article>
        `;
      })
      .join("");
  }

  function applyFilters() {
    const cityInput = document.getElementById("search-city");
    const ratingSelect = document.getElementById("search-rating");
    const certifiedCheckbox = document.getElementById("search-certified");
    if (!cityInput || !ratingSelect || !certifiedCheckbox) return;

    const q = cityInput.value.trim().toLowerCase();
    const minRating = parseFloat(ratingSelect.value || "0");
    const onlyCertified = certifiedCheckbox.checked;

    const filtered = data.pros.filter((pro) => {
      const city = (pro.city || "").toLowerCase();
      const postal = (pro.postalCode || "").toLowerCase();

      const matchesCity = q
        ? city.includes(q) || postal.includes(q)
        : true;

      const matchesRating = pro.rating >= minRating;
      const matchesCertified = onlyCertified ? pro.certified : true;

      return matchesCity && matchesRating && matchesCertified;
    });

    renderResults(filtered);
  }

  function resetFilters() {
    const cityInput = document.getElementById("search-city");
    const ratingSelect = document.getElementById("search-rating");
    const certifiedCheckbox = document.getElementById("search-certified");
    if (!cityInput || !ratingSelect || !certifiedCheckbox) return;

    cityInput.value = "";
    ratingSelect.value = "0";
    certifiedCheckbox.checked = false;
    renderResults(data.pros);
  }

  function init() {
    const searchButton = document.getElementById("search-button");
    const resetButton = document.getElementById("search-reset");
    const form = document.getElementById("search-form");

    if (searchButton) searchButton.addEventListener("click", applyFilters);
    if (resetButton) resetButton.addEventListener("click", resetFilters);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        applyFilters();
      });
    }

    // Pré-remplissage à partir de la query `q` éventuelle
    const params = new URLSearchParams(window.location.search);
    const initialQ = params.get("q");
    if (initialQ) {
      const cityInput = document.getElementById("search-city");
      if (cityInput) cityInput.value = initialQ;
      applyFilters();
    } else {
      // Afficher tous les résultats au chargement pour la démo
      renderResults(data.pros);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

