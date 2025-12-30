(function () {
  const data = window.NAILFINDER_DATA;
  if (!data || !data.pros) return;

  function getProFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return null;
    return data.pros.find((p) => p.id === id) || null;
  }

  function buildSummary(pro) {
    const parts = [];
    if (pro.city && pro.postalCode) {
      parts.push(`${pro.city} · ${pro.postalCode}`);
    }
    parts.push(`${pro.rating.toFixed(1)}★ (${pro.reviewsCount} avis fictifs)`);
    if (pro.certified) {
      parts.push("Certifiée POCERT");
    }
    if (Array.isArray(pro.specialties) && pro.specialties.length) {
      parts.push(`Spécialisée en ${pro.specialties.slice(0, 2).join(", ")}`);
    }
    return parts.join(" · ");
  }

  function buildFictiveReviews(pro) {
    const baseFirstName = pro.name.split(" ")[0] || "Cette pro";
    return [
      {
        author: "Claire, cliente fictive",
        rating: pro.rating,
        text: `${baseFirstName} est très à l'écoute, la pose tient parfaitement et le rendu reste très naturel.`,
      },
      {
        author: "Élodie, cliente fictive",
        rating: Math.max(4.5, pro.rating - 0.2),
        text: "Cabine propre, explications claires sur l'entretien et choix de couleurs très pointus.",
      },
      {
        author: "Julie, cliente fictive",
        rating: Math.max(4.3, pro.rating - 0.4),
        text: "On se sent en confiance, l'expérience est douce du début à la fin (avis fictif pour la démo).",
      },
    ];
  }

  function renderProfile(pro) {
    const profileSection = document.getElementById("profile");
    const notFoundSection = document.getElementById("profile-not-found");
    if (!profileSection || !notFoundSection) return;

    if (!pro) {
      profileSection.hidden = true;
      profileSection.setAttribute("aria-busy", "false");
      notFoundSection.hidden = false;
      return;
    }

    const avatarEl = document.getElementById("profile-avatar");
    const nameEl = document.getElementById("profile-name");
    const cityEl = document.getElementById("profile-city");
    const ratingEl = document.getElementById("profile-rating");
    const badgesEl = document.getElementById("profile-badges");
    const bioEl = document.getElementById("profile-bio");
    const specialtiesEl = document.getElementById("profile-specialties");
    const reviewsEl = document.getElementById("profile-reviews");
    const summaryEl = document.getElementById("profile-summary");

    if (!avatarEl || !nameEl || !cityEl || !ratingEl || !badgesEl || !bioEl || !specialtiesEl || !reviewsEl || !summaryEl) {
      return;
    }

    avatarEl.src = pro.avatar;
    avatarEl.alt = pro.name;
    nameEl.textContent = pro.name;
    cityEl.textContent = `${pro.city} · ${pro.postalCode}`;
    ratingEl.textContent = pro.rating.toFixed(1);

    const badges = [];
    if (pro.certified) {
      badges.push('<span class="badge badge-certified">Certifiée POCERT</span>');
    }
    if (pro.demoOnly) {
      badges.push('<span class="badge badge-soft">Démo POCERT · Données fictives</span>');
    }
    badgesEl.innerHTML = badges.join(" ");

    bioEl.textContent = pro.bio;

    specialtiesEl.innerHTML = (Array.isArray(pro.specialties) ? pro.specialties : [])
      .map((s) => `<span class="tag-choice">${s}</span>`)
      .join("");

    const reviews = buildFictiveReviews(pro);
    reviewsEl.innerHTML = reviews
      .map(
        (r) => `
        <article class="review">
          <div class="review__meta">
            <span class="rating">${r.rating.toFixed(1)}</span>
            <span>${r.author}</span>
          </div>
          <p>${r.text}</p>
        </article>
      `
      )
      .join("");

    summaryEl.textContent = buildSummary(pro);

    profileSection.setAttribute("aria-busy", "false");
    profileSection.hidden = false;
    notFoundSection.hidden = true;
  }

  function init() {
    const pro = getProFromUrl();
    renderProfile(pro);
  }

  document.addEventListener("DOMContentLoaded", init);
})();

