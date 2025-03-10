document.addEventListener("DOMContentLoaded", function() {
    const siteLanguage = localStorage.getItem('siteLanguage') || "eng";
    console.log(siteLanguage);
    // Загрузка языка при загрузке страницы
    loadLanguage(siteLanguage);

    // Функция загрузки JSON-файла и перевода страницы
    function loadLanguage(lang) {
        fetch("./language/"+siteLanguage+".json")
            .then(response => response.json())
            .then(data => {
                translatePage(data, lang);
            })
            .catch(error => console.error("Error loading language file:", error));
    }

    // Функция перевода элементов
    function translatePage(data, lang) {
        const elements = document.querySelectorAll('[langs]');
        elements.forEach(element => {
            const key = element.getAttribute('langs');
            if (data[key]) {                
                element.textContent = data[key];
            }
        });
    }
});