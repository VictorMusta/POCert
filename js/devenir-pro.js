(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function setFieldError(fieldEl, hasError) {
    if (!fieldEl) return;
    if (hasError) {
      fieldEl.classList.add("field--error");
    } else {
      fieldEl.classList.remove("field--error");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const nameField = form.querySelector("#pro-name").closest(".field");
    const cityField = form.querySelector("#pro-city").closest(".field");
    const emailField = form.querySelector("#pro-email").closest(".field");
    const consentField = form.querySelector("#pro-consent").closest(".field");
    const messageEl = byId("pro-form-message");

    let hasError = false;

    const nameInput = form.querySelector("#pro-name");
    const cityInput = form.querySelector("#pro-city");
    const emailInput = form.querySelector("#pro-email");
    const consentInput = form.querySelector("#pro-consent");

    if (!nameInput.value.trim()) {
      hasError = true;
      setFieldError(nameField, true);
    } else {
      setFieldError(nameField, false);
    }

    if (!cityInput.value.trim()) {
      hasError = true;
      setFieldError(cityField, true);
    } else {
      setFieldError(cityField, false);
    }

    if (!emailInput.value.trim()) {
      hasError = true;
      setFieldError(emailField, true);
    } else {
      setFieldError(emailField, false);
    }

    if (!consentInput.checked) {
      hasError = true;
      setFieldError(consentField, true);
    } else {
      setFieldError(consentField, false);
    }

    if (!messageEl) return;

    messageEl.textContent = "";
    messageEl.classList.remove("form-message--error", "form-message--success");

    if (hasError) {
      messageEl.textContent = "Merci de remplir les champs obligatoires et de confirmer que vous avez bien compris le caractère fictif de ce formulaire.";
      messageEl.classList.add("form-message--error");
      return;
    }

    form.reset();
    messageEl.textContent = "Merci ! Si POCERT voit le jour, ce type de profil sera mis en avant pour rassurer les clientes et valoriser les professionnelles engagées.";
    messageEl.classList.add("form-message--success");
  }

  function init() {
    const form = byId("pro-form");
    if (!form) return;
    form.addEventListener("submit", onSubmit);
  }

  document.addEventListener("DOMContentLoaded", init);
})();

