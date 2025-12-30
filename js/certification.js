(function () {
  const data = window.NAILFINDER_DATA;
  if (!data || !data.certifications) return;

  function createLevelCard(level) {
    return `
      <article class="card card-cert-level">
        <h3>${level.name}</h3>
        <p>${level.description}</p>
        <p style="font-size:0.8rem;margin-top:8px;">Exemple fictif pour illustrer la future grille POCERT.</p>
      </article>
    `;
  }

  function hydrateLevels() {
    const container = document.getElementById("certification-levels");
    if (!container) return;
    container.innerHTML = data.certifications.map(createLevelCard).join("");
  }

  document.addEventListener("DOMContentLoaded", hydrateLevels);
})();

