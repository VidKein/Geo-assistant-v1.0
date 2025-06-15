# 🌍 Geo-assistant v1.0
[Geo-assistant v1.0](https://vidkein.github.io/Geo-assistant-v1.0/).

🗺️ Multi-language README:  
[🇬🇧 English](#english) | [🇨🇿 Czech](#czech) | [🇺🇦 Ukrainian](#ukrainian)

---

## English

**Geo-assistant** is a tool designed to assist with geodetic surveys. It serves as a testing ground for various technologies. This is an early-stage demo and **not intended for business use**.

### ⚠️ Security Notice
- No database used — data is stored in JSON files.
- Authentication is done **on the client side** — not secure.

### 📌 Features
- User authentication (client-side).
- Manage geodetic points (stored in [koordinats.json](#Data)):
  - Point number
  - Location (e.g., SOD-11)
  - Placement type (asphalt, pipe, wall, etc.)
  - Coordinates
  - Coordinate system
  - Elevation
  - Date added
- Import from spreadsheets (.csv or .txt with `;` as separator).
- Coordinate system transformation: JTSK → WGS84.
- Show current device location on map.
- Layered map display:
  - Base/Satellite maps
  - Points: Base/Working
- Point info popup: number, height, type, measured toggle
- Zoom and geolocation controls
- Calendar for planned surveys (nivelling/theodolite)
- Settings:
  - Language
  - Toggle point numbers
  - Reset settings
  - Work calendar import
  - Add/edit/delete points
  - Point/system code import
- Symbol legend (triangle, circle, etc.)
- Scale bar
- Help link (per language)

---

## Czech

**Geo-assistant** je aplikace pro usnadnění geodetických prací. Slouží k testování různých technologií. Jde o demonstrační verzi **nevhodnou pro komerční použití**.

### ⚠️ Upozornění na bezpečnost
- Data nejsou v databázi — uloženo v JSON.
- Ověření uživatele probíhá **na straně klienta** — není bezpečné.

### 📌 Funkce
- Přihlášení uživatele
- Práce s body (soubor [koordinats.json](#Data)):
  - Číslo bodu
  - Název lokality (SOD-11 atd.)
  - Typ umístění
  - Souřadnice
  - Systém souřadnic
  - Výška
  - Datum
- Import z tabulek (.csv, .txt s `;`)
- Transformace souřadnic: JTSK → WGS84
- Zobrazení aktuální polohy zařízení
- Vrstvy mapy:
  - Základní / satelitní
  - Body: základní / pracovní
- Detail bodu: číslo, výška, typ, přepínač měření
- Ovládací prvky mapy
- Kalendář plánovaných prací
- Nastavení:
  - Jazyk
  - Čísla bodů
  - Reset
  - Import kalendáře
  - Přidat/editovat/smazat body
  - Import kódů
- Legenda
- Měřítko mapy
- Nápověda

---

## Ukrainian

**Geo-assistant** — це інструмент для оптимізації геодезичних робіт. Проєкт створено для тестування різних технологій. Це демонстраційна версія і **не призначена для комерційного використання**.

### ⚠️ Попередження щодо безпеки
- Дані зберігаються в JSON-файлах, без бази даних.
- Аутентифікація — **на стороні клієнта**, що небезпечно.

### 📌 Можливості
- Аутентифікація користувача
- Робота з точками ([koordinats.json](#Data)):
  - Номер
  - Назва ділянки (SOD-11...)
  - Тип розміщення
  - Координати
  - Система координат
  - Висота
  - Дата
- Імпорт з таблиць (.csv або .txt, розділювач — `;`)
- Перетворення координат JTSK → WGS84
- Визначення поточного місцезнаходження

### 🌍 Функціонал
### ШАРИ НА КАРТІ
 1. #### Мапа:
    - Базова
    - Супутникова
 2. #### Течки:
    - Базова
    - Рабочi
 3. #### Інформація по точках (з'являється при натисканні на течку):
    - Номер
    - Висота точки
    - Тип розташування
    - Переключатель - виміряно/не виміряно
 4. #### Кнопки масштабування картки
 5. #### Кнопка позиціонування
    При включенні геолокації точка розташування – блакитне коло (зі стрілкою вказівної напрямки – залежить від телефону)
 6. #### Календар:
   Відображається календар із планами вимірювання (тахеометрія/нівелювання). При початковому завантаженні або виборі дати на календарі відображається дата та інформація за місцями роботи (з відображенням кількості точок).
 7. #### Налаштування:
  - Загальні налаштування:
    * Мова відображення сайту
    * Вибір відображення номера точки чи ні
    * Скидання всіх загальних налаштувань
  - Імпорт календаря работ
    ПРАВИЛА ЗАПОВНЕННЯ ТАБЛИЦІ ПЛАНУ ВИКОНАННЯ РОБОТ
    СТОВПЕЦ А - заповнення будь-яке
    СТОВПЕЦ Б - номер точки (варіанти заповнення число 141801 або екстензо EXT-306(480901), EXT-336(550401))
    СТОВПЕЦ - тип робіт (варіанти заповнення літерою (тип робіт n-нівелірна зйомка, t-тахеометрична зйомка))
  - Робота з точками:
    * Додавання
    * редагування
    * Видалення
  - Коди типів точок/системи координат:
    * Додавання
    * Видалення
  - Імпорт точок у вигляді списку
    Імпортування списку точок за допомогою файлів формату .csv, .txt
    ПРИКЛАД РОЗМІЩЕННЯ СТОЛБЧІВ РОЗДІЛЮВАЧ ";"
     Number|      X    |      Y     |   H    |   date   |systemCoordinates|positionType
      1;     741976.7448;1047497.7509;268.1013;25-05-25;         1;           12
  - Вийти із реєстрації    
  8. #### Умовні позначення:
   - ТОЧКИ:
     * Базові:
      а. нівелювання – зелений трикутник
      б. тахеометричні - синє перекреслене коло
    * Робочі:
      а. нівелювання – зелене коло з буквою всередині Н
      б. тахеометричні - зелене коло з літерою всередині Т
   - Маркер у вигляді галочки, що означає, що точка виміряна або зорієнтована
  9. Масштабна лінійка - метрах/км залежно від масштабу
  10. Допомога - посилання в крайньому правому кутку. При натисканні відкриває сторінку допомоги для роботи з програмою (залежно від вибраної мови відображення сайту). 
    

---
## Data
📄 **Data structure (`koordinats.json`)**:

```json
{
  "Base": {
    "trig": {
      "11005": {
        "position": [50.08684, 14.42057],
        "vycka": 268.377,
        "date": "2024-10-27",
        "systemCoordinates": "WGS84",
        "positionType": "pillar-target cross"
      }
    },
    "niv": { ... }
  },
  "poligons": {
    "SOD-11": { ... },
    "SOD-12": { ... },
    "SOD-13": { ... }
  }
}
```

---

📧 Contact: [Your GitHub Username]  
📘 License: MIT
