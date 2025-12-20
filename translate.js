let currentLang = localStorage.getItem("lang") || "en";

// Main function that loads translation file and updates the page
async function setLanguage(lang) {
  try {
    const response = await fetch(`translations/${lang}.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const translations = await response.json();

    // Replace all data-i18n elements
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = key.split(".").reduce((obj, i) => (obj ? obj[i] : undefined), translations) || "";
el.innerHTML = text;
      
    });

    // RTL support
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Save preference
    localStorage.setItem("lang", lang);
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}
// Called when user selects a language
function changeLanguage(lang) {
  setLanguage(lang);
}

// Load selected language at startup
window.onload = () => setLanguage(currentLang);


