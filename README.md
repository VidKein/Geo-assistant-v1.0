# 🌍 Geo-assistant v1.0
[https://vidkein.github.io/Geo-assistant-v1.0/](https://vidkein.github.io/Geo-assistant-v1.0/)

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
- Vytvoření pracovního plánu pomocí tabulek (Jobs_kalendar.xlsx)
- Převod souřadnic JTSK → WGS84
- Určení aktuální polohy
- Práce s body
- Práce s typy bodů


### 🌍 Funkční

![Map](./icons/readme/Menu%205.jpg)
### Vrstvy na mapě
#### - Mapě:
  1. Základní
  2. Satelitní
 #### - Body:
  1. Základní
  2. Pracovní
 #### - Informace o bodech (zobrazí se po kliknutí na složku):
  1. Číslo
  2. Výška bodu
  3. Typ umístění
  4. Přepínač Měřeno/neměřeno

![Zoom](./icons/readme/Menu%206.png)
### Tlačítka přiblížení mapy

![Global](./icons/readme/Menu.jpg)
### Polohovací tlačítko

Pokud je povolena geolokace, bod polohy je modrý kruh (se směrovou šipkou - záleží na telefonu)

![Kalendarg](./icons/readme/Menu%202.jpg)
### Kalendář:

Zobrazí se kalendář s plány měření (totální stanice/nivelace). Při prvním načtení nebo výběru data se v kalendáři zobrazí datum a informace podle pracoviště (zobrazení počtu bodů).

![Seting](./icons/readme/Menu%203.jpg)
### Nastavení:
  1. Obecná nastavení:
    * Jazyk zobrazení webu
    * Výběr, zda se má zobrazovat číslo bodu
    * Obnovení všech obecných nastavení
  2. Import pracovního kalendáře
  
  PRAVIDLA PRO VYPLNĚNÍ TABULKY PRACOVNÍHO PLÁNU:
  - SLOUPEC A - vyplňte libovolné
  - SLOUPEC B - číslo bodu (možnosti vyplnění číslo 141801 nebo extenso EXT-306(480901), EXT-336(550401))
  - SLOUPEC C - druh práce (možnosti vyplnění písmenem (druh práce n-úrovňové zaměření, t-tachyometrické zaměření))
  3. Práce s body:
    * Přidávání
    * Úpravy
    * Mazání
  4. Kódy typů bodů/souřadnicový systém:
    * Přidávání
    * Mazání
  5. Import bodů jako seznamu

  Import seznamu bodů pomocí souborů .csv, .txt. 

  PŘÍKLAD ODDĚLOVAČE USPOŘÁDÁNÍ SLOUPCŮ ";"

  ```txt

     Number|      X    |      Y     |   H    |   date   |systemCoordinates|positionType
      1;     741976.7448;1047497.7509;268.1013;25-05-25;         1;           12
  
  ```
  6. Odhlaste se   
### Symboly:
- BODY:
  * Základní:
    1. nivelace - zelený trojúhelník
    2. tachyometrie - modrý přeškrtnutý kruh
  * Pracovní:
    1. nivelace - zelený kruh s písmenem H uvnitř
    2. tachyometrie - zelený kruh s písmenem T uvnitř
- Zaškrtávací značka označující, že bod je změřen nebo orientován

![Data](./icons/readme/data_ua.png)
### Informace podle data
Zobrazuje den v týdnu a datum. Po stisknutí se zobrazí informace o datu vybraném v kalendáři.
### Měřítko - metry/km v závislosti na měřítku
### Nápověda - odkaz v pravém rohu

Po kliknutí se otevře stránka s nápovědou pro práci s programem (v závislosti na zvoleném jazyce zobrazení webu).

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
- Формування плану роботи за допомогою таблиць (Jobs_kalendar.xlsx)
- Перетворення координат JTSK → WGS84
- Визначення поточного місцезнаходження
- Робота з точками
- Робота з типами точок

### 🌍 Функціонал

![Map](./icons/readme/Menu%205.jpg)
### Шари на картi
#### - Мапа:
  1. Базова
  2. Супутникова
 #### - Течки:
  1. Базовi
  2. Рабочi
 #### - Інформація по точках (з'являється при натисканні на течку):
  1. Номер
  2. Висота точки
  3. Тип розташування
  4. Переключатель - виміряно/не виміряно

![Zoom](./icons/readme/Menu%206.png)
### Кнопки масштабування картки

![Global](./icons/readme/Menu.jpg)
### Кнопка позиціонування

При включенні геолокації точка розташування – блакитне коло (зі стрілкою вказівної напрямки – залежить від телефону)

![Kalendarg](./icons/readme/Menu%202.jpg)
### Календар:

Відображається календар із планами вимірювання (тахеометрія/нівелювання). При початковому завантаженні або виборі дати на календарі відображається дата та інформація за місцями роботи (відображенням кількості точок).

![Seting](./icons/readme/Menu%203.jpg)
### Налаштування:
  1. Загальні налаштування:
      * Мова відображення сайту
      * Вибір відображення номера точки чи ні
      * Скидання всіх загальних налаштувань
  2. Імпорт календаря работ

  ПРАВИЛА ЗАПОВНЕННЯ ТАБЛИЦІ ПЛАНУ ВИКОНАННЯ РОБОТ:
  - СТОВПЕЦ А - заповнення будь-яке
  - СТОВПЕЦ Б - номер точки (варіанти заповнення число 141801 або екстензо EXT-306(480901), EXT-336(550401))
  - СТОВПЕЦ В - тип робіт (варіанти заповнення літерою (тип робіт n-нівелірна зйомка, t-тахеометрична зйомка))
  3. Робота з точками:
      * Додавання
      * Редагування
      * Видалення
  4. Коди типів точок/системи координат:
      * Додавання
      * Видалення
  5. Імпорт точок у вигляді списку
  
  Імпортування списку точок за допомогою файлів формату .csv, .txt. 
  
  ПРИКЛАД РОЗМІЩЕННЯ СТОЛБЧІВ РОЗДІЛЮВАЧ ";"

  ```txt

     Number|      X    |      Y     |   H    |   date   |systemCoordinates|positionType
      1;     741976.7448;1047497.7509;268.1013;25-05-25;         1;           12
  
  ```
  6. Вийти із реєстрації    
### Умовні позначення:
   - ТОЧКИ:
      * Базові:
        1. нівелювання – зелений трикутник
        2. тахеометричні - синє перекреслене коло
      * Робочі:
        1. нівелювання – зелене коло з буквою всередині Н
        2. тахеометричні - зелене коло з літерою всередині Т
   - Маркер у вигляді галочки, що означає, що точка виміряна або зорієнтована

![Data](./icons/readme/data_ua.png)
### Інформація за датою 
Відображає день тижня та дату. При натисканні відображається інформація про дату, вибрану в календарі.
### Масштабна лінійка - метрах/км залежно від масштабу
### Допомога - посилання в крайньому правому кутку

При натисканні відкриває сторінку допомоги для роботи з програмою (залежно від вибраної мови відображення сайту). 

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
    "niv": { "..." }
  },
  "poligons": {
    "SOD-11": { "..." },
    "SOD-12": { "..." },
    "SOD-13": { "..." }
  }
}
```

---

📧 Contact: [VidKein](https://github.com/VidKein) 
📘 License: MIT
