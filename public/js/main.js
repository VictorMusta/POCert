(function () {
  const data = window.NAILFINDER_DATA;

  function createProCard(pro) {
    const url = `pages/profil.html?id=${encodeURIComponent(pro.id)}`;
    const certifiedBadge = pro.certified
      ? '<span class="badge badge-certified">Certifiée NailFinder</span>'
      : '<span class="badge badge-soft">Profil en découverte</span>';

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
            </div>
          </div>
        </div>
        <p style="margin-top:12px;font-size:0.9rem;">${pro.bio}</p>
        <a href="${url}" class="btn btn-secondary" style="margin-top:14px;">Voir le profil</a>
      </article>
    `;
  }

  function hydrateFeatured() {
    const container = document.getElementById("featured-pros");
    if (!container || !data) return;
    const featured = data.pros.slice(0, 3);
    container.innerHTML = featured.map(createProCard).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    hydrateFeatured();
  });
})();
