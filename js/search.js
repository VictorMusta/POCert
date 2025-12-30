(function () {
  const data = window.NAILFINDER_DATA;
  if (!data || !data.pros) return;

  function renderResults(list, options = {}) {
    const container = document.getElementById("results-list");
    const summary = document.getElementById("results-summary");
    const empty = document.getElementById("results-empty");
    if (!container || !summary || !empty) return;

    const { query = "", minRating = 0, onlyCertified = false } = options;

    if (!list.length) {
      container.innerHTML = "";
      summary.textContent = "0 prothésiste trouvée dans ce POC de démonstration";
      empty.hidden = false;
      return;
    }

    const plural = list.length > 1 ? "prothésistes" : "prothésiste";
    const base = `${list.length} ${plural} trouvée(s) dans ce POC de démonstration`;
    const parts = [];
    if (query) {
      parts.push(`autour de "${query}"`);
    } else {
      parts.push("sur l'ensemble des profils de démo");
    }
    if (minRating > 0) {
      parts.push(`note minimale ${minRating}★`);
    }
    if (onlyCertified) {
      parts.push("certifiées POCERT uniquement");
    }
    summary.textContent = `${base} (${parts.join(" · ")})`;
    empty.hidden = true;

    container.innerHTML = list
      .map((pro) => {
        const url = `profil.html?id=${encodeURIComponent(pro.id)}`;
        const certifiedBadge = pro.certified
          ? '<span class="badge badge-certified">Certifiée POCERT</span>'
          : "";
        const demoBadge = pro.demoOnly
          ? '<span class="badge badge-soft">Démo POCERT · Données fictives</span>'
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
            <p style="margin-top:10px;font-size:0.8rem;">Données fictives pour la démonstration · aucune prise de rendez-vous possible.</p>
            <a href="${url}" class="btn btn-secondary" style="margin-top:10px;">Voir le profil</a>
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

    renderResults(filtered, { query: cityInput.value.trim(), minRating, onlyCertified });
  }

  function resetFilters() {
    const cityInput = document.getElementById("search-city");
    const ratingSelect = document.getElementById("search-rating");
    const certifiedCheckbox = document.getElementById("search-certified");
    const resetButton = document.getElementById("search-reset");
    if (!cityInput || !ratingSelect || !certifiedCheckbox) return;

    cityInput.value = "";
    ratingSelect.value = "0";
    certifiedCheckbox.checked = false;
    renderResults(data.pros, {});

    if (resetButton) {
      resetButton.classList.add("btn--subtle-active");
      setTimeout(() => resetButton.classList.remove("btn--subtle-active"), 600);
    }
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
      renderResults(data.pros, {});
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
