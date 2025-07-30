const savedLang = localStorage.getItem("lang") || "en";

i18next.init({
  lng: savedLang, 
  resources: {
    en: { translation: translations.en },
    fr: { translation: translations.fr },
  }
}, () => {
  updateContent();
  document.getElementById("languageSwitcher").value = i18next.language;
});

function updateContent() {
  // Update text content for elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = i18next.t(key);
  });
  
  // Update the reflection content
  document.getElementById("reflection1").textContent = i18next.t("reflection1");
  document.getElementById("reflection2").textContent = i18next.t("reflection2");
  document.getElementById("reflection3").textContent = i18next.t("reflection3");
}

document.getElementById("languageSwitcher").addEventListener("change", (e) => {
  const lang = e.target.value;
  i18next.changeLanguage(lang, () => {
    updateContent();
    localStorage.setItem("lang", lang);
  });
});