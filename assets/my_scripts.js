document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        en: {
            home: "Home",
            about: "About Us",
            heritage: "Urban Heritage",
            activities: "Our Activities",
            contact: "Contact Us"
        },
        ar: {
            home: "الرئيسية",
            about: "معلومات عنا",
            heritage: "التراث الحضري",
            activities: "أنشطتنا",
            contact: "اتصل بنا"
        },
        ti: { 
            home: "ቤት",
            about: "ስለኛ",
            heritage: "የከተማ ቅርስ",
            activities: "እንቅስቃሴታትና",
            contact: "አግኙን"
        }
    };

    function changeLanguage(lang) {
        if (!translations[lang]) {
            console.error("Language not supported:", lang);
            return;
        }

        console.log("Language changed to:", lang); // Debugging

        // Get all navigation items
        const home = document.getElementById("home");
        const about = document.getElementById("about");
        const heritage = document.getElementById("heritage");
        const activities = document.getElementById("activities");
        const contact = document.getElementById("contact");

        // Check if elements exist before setting text
        if (home) home.textContent = translations[lang].home;
        if (about) about.textContent = translations[lang].about;
        if (heritage) heritage.textContent = translations[lang].heritage;
        if (activities) activities.textContent = translations[lang].activities;
        if (contact) contact.textContent = translations[lang].contact;
    }

    async function loadTranslations(lang) {
        try {
            const response = await fetch("translations.json"); 
            const translations = await response.json();
            document.querySelector('nav ul li:nth-child(1) a').textContent = translations[lang].home;
            document.querySelector('nav ul li:nth-child(2) a').textContent = translations[lang].about;
            document.querySelector('nav ul li:nth-child(3) a').textContent = translations[lang].heritage;
            document.querySelector('nav ul li:nth-child(4) a').textContent = translations[lang].activities;
            document.querySelector('nav ul li:nth-child(5) a').textContent = translations[lang].contact;
        } catch (error) {
            console.error("Error loading translations:", error);
        }
    }

    // ✅ Correcting the event listener
    const langSelect = document.getElementById("language"); // Corrected ID
    if (langSelect) {
        langSelect.addEventListener("change", function () {
            changeLanguage(this.value);
            loadTranslations(this.value);
        });
    } else {
        console.error("Language selector not found!");
    }
});