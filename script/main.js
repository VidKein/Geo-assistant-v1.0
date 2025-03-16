//Перключатель отоброжения точек
const namePointDisplay = localStorage.getItem('namePointDisplay') || "false";
//Определение языка
const siteLanguage = localStorage.getItem('siteLanguage') || "eng";
//Перевод текста для блока Setting
let langsMaps = {
    "eng": {
        "MapTyp1": "Satelit Map",
        "MapTyp2": "Strit Map type",
        "LayerBaseNiv":" - base points Niv;",
        "LayerOperatingNiv":" - operating points Niv;",
        "LayerBaseTrig":" - base points Tax;",
        "LayerOperatingTrig":" - operating points Tax;",
        "nouWorkNiv":"No work leveling points",
        "nouWorkTax":"No work tacheometry points"
    },
    "ua": {
        "MapTyp1": "Супутникова карта",
        "MapTyp2": "Miська карта",
        "LayerBaseNiv":" - базові точки Niv;",
        "LayerOperatingNiv":" - робочі точки Niv;",
        "LayerBaseTrig":" - базові точки Tax;",
        "LayerOperatingTrig":" - робочі точки Tax;",
        "nouWorkNiv":"Немає точок роботи для Niv",
        "nouWorkTax":"Немає точок роботи для Tax"
    },
    "cz": {
        "MapTyp1": "Satelitní mapa",
        "MapTyp2": "Typ rozvržení mapy",
        "LayerBaseNiv":" - základní body Niv;",
        "LayerOperatingNiv":" - provozní body Niv;",
        "LayerBaseTrig":" - základní body Tax;",
        "LayerOperatingTrig":" - provozní body Tax;",
        "nouWorkNiv":"Žádné body pro vyrovnávání práce",
        "nouWorkTax":"Žádné pracovní tachemetrické body"
    }
};

/*Карта*/
//СЛОИ КАРТЫ
//Спутник
let key = "328W3i5uAdhtTMZr8hrV";
let OSMsatelitMap = L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key='+key, {maxZoom: 22,attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'});
//Растр
let OSMstritMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 22, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
//Определие слоя КАРТЫ
let map = L.map('map', {
  center: [50.047266, 14.440722],
  zoom: 15,
  layers: [OSMstritMap]});

//Наполнение слоя
//Формируем наполнение на карте
//Базовые точки
let mainNiv = L.icon({
    iconUrl: './icons/main-niv.png',
    iconRetinaUrl: './icons/main-niv-2x.png',
    shadowUrl: './icons/main-niv-shadow.png',

    iconSize:     [20, 20],
    iconAnchor:   [0,0], 
    popupAnchor:  [8, -1]
});
let mainTrig = L.icon({
    iconUrl: './icons/main-trig.png',
    iconRetinaUrl: './icons/main-trig-2x.png',
    shadowUrl: './icons/main-trig-shadow.png',

    iconSize:     [20, 20],
    iconAnchor:   [0,0],
    popupAnchor:  [8, -1]
});
//Рабочие точки
let jobsNiv = L.icon({
    iconUrl: './icons/jobs-niv.png',
    iconRetinaUrl: './icons/jobs-niv-2x.png',
    shadowUrl: './icons/jobs-niv-shadow.png',

    iconSize:     [20, 20],
    iconAnchor:   [0,0], 
    popupAnchor:  [8, -1]
});
let jobsTrig = L.icon({
    iconUrl: './icons/jobs-trig.png',
    iconRetinaUrl: './icons/jobs-trig-2x.png',
    shadowUrl: './icons/jobs-trig-shadow.png',

    iconSize:     [20, 20],
    iconAnchor:   [0,0],
    popupAnchor:  [8, -1]
});
// Иконка галочки
const checkIcon = L.icon({
    iconUrl: './icons/check_red.png', // URL для иконки галочки
    iconSize: [10, 10], // Размер иконки
    iconAnchor: [-17, -15], // Точка привязки
});
/*СЛОИ*/
//КАРТ
let baseMaps = {
    [langsMaps[siteLanguage].MapTyp1]: OSMsatelitMap,
    [langsMaps[siteLanguage].MapTyp2]: OSMstritMap
  };

//Меню отображения слоев Карт
let overlayMaps = {};
let layerControl = L.control.layers(baseMaps).addTo(map);
let operatingBasePointsNiv;
let operatingPointsNiv;
let operatingBaseTax;
let operatingPointsTax;

//Импорт информации с таблицы с планом работы planning-work.js
document.addEventListener("planningWork", (planning) => {
    layerControlPoint(planning.detail.baseNiv, mainNiv, planning.detail.baseTrig, mainTrig, planning.detail.planningNiv, jobsNiv, planning.detail.planningTrig, jobsTrig);
});

//Функция обработки данных переданных из planing-work.js и формирует слои с маркерами
function layerControlPoint(planingBaseNiv, markerBasePointNiv, planingBaseTrig, markerBasePointTrig, planingWorkNiv, markerPointNiv, planingWorkTax, markerPointTax) {
    //Нивелирование - начальные точки(базовые)
    //Информацинный блок Нивелирования    
    let pointBaseNiv = document.querySelector("#levelingBasic"); 
    let levelingBaseLeng = document.querySelector("#levelingBasicLength");//количество
    //Очишаем блок с информацией
    pointBaseNiv.querySelectorAll(".pointJobs").forEach(el => el.remove());
    if (pointBaseNiv.querySelectorAll(".pointJobsError")) {pointBaseNiv.querySelectorAll(".pointJobsError").forEach(el => el.remove());};
    if (planingBaseNiv.length > 0) {
        levelingBaseLeng.textContent = planingBaseNiv.length;
        let parsedData = parsinWork(planingBaseNiv);
        //Нивилирования базовые
        var pointBaseLayerNiv = [];
        parsedData.forEach(row => {
           if (row["position"] !== undefined) { 
            pointBaseLayerNiv.push(createMarker(row["namber"], row["position"], row["systemCoordinates"], row["vycka"], row["positionType"], markerBasePointNiv)); 
            //Создаем новый div
            const jobDivNiv = document.createElement('div');
            jobDivNiv.className = 'pointJobs'; // Добавляем класс
            //Создаем дополнительные атрибуты
            jobDivNiv.setAttribute("place", row["place"]);
            jobDivNiv.setAttribute("data-name", "Base");
            jobDivNiv.setAttribute("data-jobs", "niv");
            jobDivNiv.setAttribute("title", "Base/niv "+row["place"]);
            jobDivNiv.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointBaseNiv.appendChild(jobDivNiv);
            }else{
                 // Создаем новый div
                 const jobDivNivError = document.createElement('div');
                 jobDivNivError.className = 'pointJobsError'; // Добавляем класс
                 //Создаем доплнительные атрибуты
                 jobDivNivError.setAttribute("place", row["place"]);
                 jobDivNivError.setAttribute("data-name", "Base");
                 jobDivNivError.setAttribute("data-jobs", "niv");
                 jobDivNivError.setAttribute("title", "Base/niv "+row["place"]);
                 if (row["namber"] == "undefined" || row["namber"] == "body") {
                    jobDivNivError.textContent = "The point is not on the calendar"; // Устанавливаем текст внутри div
                    //Добавляем div в контейнер
                    pointBaseNiv.appendChild(jobDivNivError);
                } else {
                    jobDivNivError.textContent = row["namber"]; // Устанавливаем текст внутри div
                    //Добавляем div в контейнер
                    pointBaseNiv.appendChild(jobDivNivError);
                    //Добавляем span с финкцией изменения 
                    let pointError = document.createElement('div');
                    pointError.className = 'pointError';
                    jobDivNivError.appendChild(pointError);
                }
                 console.log("Базовые точки НИВ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
       //Выводим точки на карту и привязываем к переключателю
        operatingBasePointsNiv = L.layerGroup(pointBaseLayerNiv);  
        removeOverlayLayer("Base points Niv.",operatingBasePointsNiv);
    }else {
        let nouWork = document.createElement('div');
        levelingBaseLeng.textContent = planingBaseNiv.length;
        nouWork.className = "pointJobs";
        nouWork.textContent = langsMaps[siteLanguage].nouWorkNiv;
        pointBaseNiv.appendChild(nouWork);
        console.log("Базовых точек для невилированию нет");
        removeOverlayLayer("Base points Niv.",null);
    }

    //Нивелирование - рабочие 
    //Информацинный блок Нивелирования (рабочие)
    let pointJobsNiv = document.querySelector("#levelingJobs"); 
    let levelingJobsLeng = document.querySelector("#levelingJobsLength");//количество
    //Очишаем блок с информацией
    pointJobsNiv.querySelectorAll(".pointJobs").forEach(el => el.remove());
    if (pointJobsNiv.querySelectorAll(".pointJobsError")) {pointJobsNiv.querySelectorAll(".pointJobsError").forEach(el => el.remove());};
    if (planingWorkNiv.length > 0) { 
        levelingJobsLeng.textContent = planingWorkNiv.length;
        let parsedData =  parsinWork(planingWorkNiv);
        //Нивелирования рабочие
        var pointOperatingLayerNiv = [];
        parsedData.forEach(row => {
           if (row["position"] !== undefined) { 
            pointOperatingLayerNiv.push(createMarker(row["namber"], row["position"], row["systemCoordinates"], row["vycka"], row["positionType"], markerPointNiv)); 
            //Создаем новый div
            const jobDivNiv = document.createElement('div');
            jobDivNiv.className = 'pointJobs'; // Добавляем класс
            //Создаем доплнительные атрибуты
            jobDivNiv.setAttribute("place", row["place"]);
            jobDivNiv.setAttribute("data-name", "poligons");
            jobDivNiv.setAttribute("data-jobs", "niv");
            jobDivNiv.setAttribute("title", "Poligons/niv "+row["place"]);
            jobDivNiv.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointJobsNiv.appendChild(jobDivNiv);
            }else{
                // Создаем новый div
                const jobDivNivError = document.createElement('div');
                jobDivNivError.className = 'pointJobsError'; // Добавляем класс
                //Создаем доплнительные атрибуты
                jobDivNivError.setAttribute("place", row["place"]);
                jobDivNivError.setAttribute("data-name", "poligons");
                jobDivNivError.setAttribute("data-jobs", "niv");
                jobDivNivError.setAttribute("title", "Poligons/niv "+row["place"]);
                if (row["namber"] == "undefined" || row["namber"] == "body") {
                    jobDivNivError.textContent = "The point is not on the calendar"; // Устанавливаем текст внутри div
                    //Добавляем div в контейнер
                    pointJobsNiv.appendChild(jobDivNivError);
                } else {
                    jobDivNivError.textContent = row["namber"]; // Устанавливаем текст внутри div
                    //Добавляем div в контейнер
                    pointJobsNiv.appendChild(jobDivNivError);
                    //Добавляем span с финкцией изменения 
                    let pointError = document.createElement('div');
                    pointError.className = 'pointError';
                    jobDivNivError.appendChild(pointError);
                }
                console.log("Точки НИВ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
        //Выводим точки на карту и привязываем к переключателю
        operatingPointsNiv = L.layerGroup(pointOperatingLayerNiv);
        removeOverlayLayer("Operating points Niv.",operatingPointsNiv);
    }else{
        let nouWork = document.createElement('div');
        nouWork.className = "pointJobs";
        levelingJobsLeng.textContent = planingWorkNiv.length;
        nouWork.textContent = langsMaps[siteLanguage].nouWorkNiv;
        pointJobsNiv.appendChild(nouWork);
        console.log("Работы по невилированию нет");
        removeOverlayLayer("Operating points Niv.",null);
    }

    //Тахеометрия - начальные точки(базовые)
    //Информацинный блок Нивелирования
    let pointBaseTax = document.querySelector("#tacheometryBasic"); 
    let tacheometryBaseLength = document.querySelector("#tacheometryBasicLength");//количество
    //Очишаем блок с информацией
    pointBaseTax.querySelectorAll(".pointJobs").forEach(el => el.remove());
    if (pointBaseTax.querySelectorAll(".pointJobsError")) {pointBaseTax.querySelectorAll(".pointJobsError").forEach(el => el.remove());};
    if (planingBaseTrig.length > 0) {
        tacheometryBaseLength.textContent = planingBaseTrig.length;
        let parsedData =  parsinWork(planingBaseTrig); 
        //Тахеометрии базовые
        var pointBaseLayerTax = [];
        parsedData.forEach(row => {
           if (row["position"] !== undefined) {
            pointBaseLayerTax.push(createMarker(row["namber"], row["position"], row["systemCoordinates"], row["vycka"], row["positionType"], markerBasePointTrig)); 
            //Создаем новый div
            const jobDivTax = document.createElement('div');
            jobDivTax.className = 'pointJobs'; // Добавляем класс
            //Создаем доплнительные атрибуты
            jobDivTax.setAttribute("place", row["place"]);
            jobDivTax.setAttribute("data-name", "Base");
            jobDivTax.setAttribute("data-jobs", "trig");
            jobDivTax.setAttribute("title", "Base/trig "+row["place"]);
            jobDivTax.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointBaseTax.appendChild(jobDivTax);
            }else{
            // Создаем новый div
            const jobDivTaxError = document.createElement('div');
            jobDivTaxError.className = 'pointJobsError'; // Добавляем класс
            //Создаем доплнительные атрибуты
            jobDivTaxError.setAttribute("place", row["place"]);
            jobDivTaxError.setAttribute("data-name", "Base");
            jobDivTaxError.setAttribute("data-jobs", "trig");
            jobDivTaxError.setAttribute("title", "Base/trig "+row["place"]);
            if (row["namber"] == "undefined" || row["namber"] == "body") {
                jobDivTaxError.textContent = "The point is not on the calendar"; // Устанавливаем текст внутри div
                //Добавляем div в контейнер
                pointBaseTax.appendChild(jobDivTaxError);
            } else {
                jobDivTaxError.textContent = row["namber"]; // Устанавливаем текст внутри div
                //Добавляем div в контейнер
                pointBaseTax.appendChild(jobDivTaxError);
                //Добавляем span с финкцией изменения 
                let pointError = document.createElement('div');
                pointError.className = 'pointError';
                jobDivTaxError.appendChild(pointError);
            }
            console.log("Базовые точки ТАХ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
        //Выводим точки на карту и привязываем к переключателю
        operatingBaseTax = L.layerGroup(pointBaseLayerTax);
        removeOverlayLayer("Base points Tax.",operatingBaseTax);
    }else{
        let nouWork = document.createElement('div');
        nouWork.className = "pointJobs";
        tacheometryBaseLength.textContent = planingBaseTrig.length;
        nouWork.textContent = langsMaps[siteLanguage].nouWorkTax;
        pointBaseTax.appendChild(nouWork);
        console.log("Базовых точек для тахеoметрии нет");
        removeOverlayLayer("Base points Tax.",null);
    }
    
    //Тахеометрия - рабочие 
    //Информацинный блок Нивелирования
    let pointJobsTax = document.querySelector("#tacheometryJobs"); 
    let tacheometryJobsLength = document.querySelector("#tacheometryJobsLength");//количество
    //Очишаем блок с информацией
    pointJobsTax.querySelectorAll(".pointJobs").forEach(el => el.remove());
    if (pointJobsTax.querySelectorAll(".pointJobsError")) {pointJobsTax.querySelectorAll(".pointJobsError").forEach(el => el.remove());};
    if (planingWorkTax.length > 0) {
        tacheometryJobsLength.textContent = planingWorkTax.length;
        let parsedData =  parsinWork(planingWorkTax); 
        //Тахеометпии рабочие
        var pointOperatingLayerTax = [];
        parsedData.forEach(row => {
           if (row["position"] !== undefined) {
            pointOperatingLayerTax.push(createMarker(row["namber"], row["position"], row["systemCoordinates"], row["vycka"], row["positionType"], markerPointTax)); 
            //Создаем новый div
            const jobDivTax = document.createElement('div');
            jobDivTax.className = 'pointJobs'; // Добавляем класс
            //Создаем доплнительные атрибуты
            jobDivTax.setAttribute("place", row["place"]);
            jobDivTax.setAttribute("data-name", "poligons");
            jobDivTax.setAttribute("data-jobs", "trig");
            jobDivTax.setAttribute("title", "Poligons/trig "+row["place"]);
            jobDivTax.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointJobsTax.appendChild(jobDivTax);
            }else{
            // Создаем новый div
            const jobDivTaxError = document.createElement('div');
            jobDivTaxError.className = 'pointJobsError'; // Добавляем класс
            //Создаем доплнительные атрибуты
            jobDivTaxError.setAttribute("place", row["place"]);
            jobDivTaxError.setAttribute("data-name", "poligons");
            jobDivTaxError.setAttribute("data-jobs", "trig");
            jobDivTaxError.setAttribute("title", "Poligons/trig "+row["place"]);
            if (row["namber"] == "undefined" || row["namber"] == "body") {
                jobDivTaxError.textContent = "The point is not on the calendar"; // Устанавливаем текст внутри div
                //Добавляем div в контейнер
                pointJobsTax.appendChild(jobDivTaxError);
            } else {
                jobDivTaxError.textContent = row["namber"]; // Устанавливаем текст внутри div
                //Добавляем div в контейнер
                pointJobsTax.appendChild(jobDivTaxError);
                //Добавляем span с финкцией изменения 
                let pointError = document.createElement('div');
                pointError.className = 'pointError';
                jobDivTaxError.appendChild(pointError);
            }
            console.log("Точки ТАХ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
         //Выводим точки на карту и привязываем к переключателю
        operatingPointsTax = L.layerGroup(pointOperatingLayerTax);
        removeOverlayLayer("Operating points Tax.",operatingPointsTax);
    }else{
        let nouWork = document.createElement('div');
        nouWork.className = "pointJobs";
        tacheometryJobsLength.textContent = planingWorkTax.length;
        nouWork.textContent = langsMaps[siteLanguage].nouWorkTax;
        pointJobsTax.appendChild(nouWork);
        console.log("Работы по тахеoметрии нет");
        removeOverlayLayer("Operating points Tax.",null);
    } 
    //Присваеваем имена слоям
    if (planingBaseNiv.length > 0 || planingWorkNiv.length > 0 || planingBaseTrig.length > 0 || planingWorkTax.length > 0) {
        if (operatingBasePointsNiv !== undefined) {operatingBasePointsNiv.layerName = 'operatingBasePointsNiv';};
        if (operatingPointsNiv !== undefined) {operatingPointsNiv.layerName = 'operatingPointsNiv';};
        if (operatingBaseTax !== undefined) {operatingBaseTax.layerName = 'operatingBaseTax';};
        if (operatingPointsTax !== undefined) {operatingPointsTax.layerName = 'operatingPointsTax';};
       onLayerGroup(operatingBasePointsNiv, operatingPointsNiv, operatingBaseTax, operatingPointsTax); 
    } else {
        console.log("Слоев по работе нет");  
    } 
    //Изменяем базовый слой и входяший в него
    layerControl = L.control.layers(baseMaps,overlayMaps).addTo(map);
    //Меняем стиль названия слоев
    customizeLayerControl();
    console.log(layerControl._layers);
    console.log(overlayMaps);
};
//Функция создаюшая слои
function removeOverlayLayer(layerName, pointLayer) {  
    if (pointLayer === null) {
        delete overlayMaps[layerName];
    } else {
        if (layerName in overlayMaps) {
            delete overlayMaps[layerName]
            overlayMaps[layerName] = pointLayer;
        } else { 
            overlayMaps[layerName] = pointLayer;
        }
    }
    //Удаляем базовый слой и входяший в него
    map.removeControl(layerControl);
}
//Кастомизируем информационный текст переключателей слоев
function customizeLayerControl() {
    let labels = document.querySelectorAll('.leaflet-control-layers-overlays label span span');
    labels.forEach(label => {
        if (label.textContent.trim() === "Base points Niv.") {
            label.innerHTML = '<span style="color: red;">'+langsMaps[siteLanguage].LayerBaseNiv+'</span>';
        }
        if (label.textContent.trim() === "Operating points Niv.") {
            label.innerHTML = '<span style="color: green;">'+langsMaps[siteLanguage].LayerOperatingNiv+'</span>';
        }
        if (label.textContent.trim() === "Base points Tax.") {
            label.innerHTML = '<span style="color: red;">'+langsMaps[siteLanguage].LayerBaseTrig+'</span>';
        }
        if (label.textContent.trim() === "Operating points Tax.") {
            label.innerHTML = '<span style="color: green;">'+langsMaps[siteLanguage].LayerOperatingTrig+'</span>';
        }
    });
}
//Функция парсинга информации переданной из planing-work.js
function parsinWork(planing) {
    if (!Array.isArray(planing)) {
        throw new Error("Input must be an array of strings");
    }
    const arrayPoint = [];
    const regex = /place:\s*([\w-]+)|namber:\s*([\w-]+(?:\([\d]+\))?)|position:\s*([\d\s,.]+)|vycka:\s*([\d.,]+)|date:\s*([\d{4}-\d{2}-\d{2}]+)|systemCoordinates:\s*([\w-]+)|positionType:\s*([\w-]+)/g;
    planing.forEach(point => {
        const parsedData = {};
        let match;
        while ((match = regex.exec(point)) !== null) {
            if (match[1]) parsedData["place"] = match[1];
            if (match[2]) parsedData["namber"] = match[2];
            if (match[3]) parsedData["position"] = match[3]
                .split(/[,\s]+/)
                .filter(num => num.trim() !== "")
                .map(Number);
            if (match[4]) parsedData["vycka"] = parseFloat(match[4].replace(',', '.'));
            if (match[5]) parsedData["date"] = match[5];
            if (match[6]) parsedData["systemCoordinates"] = match[6];
            if (match[7]) parsedData["positionType"] =  match[7]; 
        }
        arrayPoint.push(parsedData);
    }); 
    return arrayPoint;
}
//Функция формированм маркеров
function createMarker(name, position, systemCoordinates, vycka, positionType, iconPoint) {
  if (systemCoordinates == "JTSK") {
        //Подключение маркера с конвертацией JTSKtoWGS84
        var conv = new JTSK_Converter();
        var wgs = conv.JTSKtoWGS84(position[1], position[0]);
        // Создаем всплывающее меню с радиокнопкой
        const popupContent = `<input type="checkbox" id="checkbox"> completed`;
        if (namePointDisplay == "false") {
            var marker = L.marker([wgs.lat,wgs.lon],{icon: iconPoint}).bindPopup(name+"<br>Vycka: "+vycka+" m.<br>Type: "+positionType+"<br>"+popupContent);
        } else {
            var marker = L.marker([wgs.lat,wgs.lon],{icon: iconPoint}).bindPopup(name+"<br>Vycka: "+vycka+" m.<br>Type: "+positionType+"<br>"+popupContent).bindTooltip(name, { 
                permanent: true, // Постоянное отображение
                direction: "bottom", // Направление отображения
                opacity :1,// прозрачность
                offset: L.point(10,15),// Смещение popup относительно маркера
                className: 'no-arrow' // Убираем стандартные стили
            });
        }
        marker.id = name;
        return marker;
    } else {
        //Подключение маркера с WGS84
        
  }
}

//Изменять цвет номера точки при переключении между слоями
//Контролируем переключатель карты
map.on('baselayerchange', function(e) {   
    let leafletTooltip = document.querySelectorAll(".leaflet-tooltip");   
    if (e.name == 'Satelit Map' && leafletTooltip.length !== 0) {
          // Изменяем цвет текста у всех tooltip
          leafletTooltip.forEach(tooltip => {tooltip.style.color = 'rgb(255, 255, 255)';});
      }else{
          // Изменяем цвет текста у всех tooltip
          leafletTooltip.forEach(tooltip => {tooltip.style.color = ' #202124';});
      }  
    });
//Контролируем переключатель рабочих слоев
map.on('overlayadd', function(e) {
    let leafletTooltip = document.querySelectorAll(".leaflet-tooltip");  
    if (e.layer.layerName == "operatingBasePointsNiv" || e.layer.layerName == "operatingPointsNiv" || e.layer.layerName == "operatingBaseTax" || e.layer.layerName == "operatingPointsTax") {
        if (getActiveMapsLayer() == "Satelit Map") {
            // Изменяем цвет текста у всех tooltip
            leafletTooltip.forEach(tooltip => {tooltip.style.color = 'rgb(255, 255, 255)';});
        } else {
            // Изменяем цвет текста у всех tooltip
            leafletTooltip.forEach(tooltip => {tooltip.style.color = ' #202124';});
        }
    }     
});
// Функция для определения текущего активного слоя
function getActiveMapsLayer() {
    let activeLayerName = null;
    // Перебираем базовые слои и проверяем, какой слой добавлен на карту
    for (const name in baseMaps) {
        if (map.hasLayer(baseMaps[name])) {
            activeLayerName = name;
            break;
        }
    }
    return activeLayerName;
}

/*Моя геолокация*/
let lc = L.control.locate({
    locateOptions: {
        maxZoom: 18,//масштабиролвание
        enableHighAccuracy: true//высокая точность
      },
        strings: {
            title: "Find my location"
          },
        enableHighAccuracy: true,
        flyTo: true,//Плавное увеличение
        returnToPrevBounds: true,//Возврат назат
        position: 'topleft'
  }).addTo(map);
//Выводит ошибки геолокации
function onLocationError(e) {alert(e.message);}
map.on('locationerror', onLocationError);

//Анимация условных обозначений
//Календарь
const buttonCalendarg = L.Control.extend({
    options: { position: 'topleft' },
    onAdd: function () {
        const calendarg = L.DomUtil.create('div', 'leaflet-control-calendarg-work leaflet-bar leaflet-control');
        const divCalendargButton = document.createElement('div');//calendarg
        divCalendargButton.setAttribute("data-lang-key", "calendarg");
        divCalendargButton.setAttribute("langs-atr", "title");
        divCalendargButton.className = "calendarg";
        divCalendargButton.id = "calendarg";
        divCalendargButton.title = "Work calendar";
        calendarg.appendChild(divCalendargButton);
        const calendargIkon = document.createElement('span');//settingIkon
        calendargIkon.className = 'calendargIkon';
        divCalendargButton.appendChild(calendargIkon);

        let calendargBlock = document.querySelector("#calendargBlock");
        let closeCalendar = document.querySelector(".close-calendarg");
        calendarg.addEventListener("click",closeCalendarShou);
        closeCalendar.addEventListener("click",closeCalendarShou);
        function closeCalendarShou(){
        divCalendargButton.classList.toggle("activ"); 
          if (divCalendargButton.className == "calendarg activ") {
              calendargBlock.style.display = "block";
              // Не отобаржать слои
              if (operatingBasePointsNiv !== undefined) {map.removeLayer(operatingBasePointsNiv);}
              if (operatingPointsNiv !== undefined) {map.removeLayer(operatingPointsNiv);}
              if (operatingBaseTax !== undefined) {map.removeLayer(operatingBaseTax);}
              if (operatingPointsTax !== undefined) {map.removeLayer(operatingPointsTax);}    
              //Меняем стиль названия слоев
              customizeLayerControl();        
          } else {
              calendargBlock.style.display = "none";
          }
         }
        return calendarg;
    }
});
map.addControl(new buttonCalendarg());
//Условные обозначения
const buttonDesing = L.Control.extend({
    options: { position: 'bottomleft' },
    onAdd: function () {
        const desing = L.DomUtil.create('div', 'leaflet-control-desing-map leaflet-bar leaflet-control');
        const divDesingButton = document.createElement('div');//buttonDesing
        divDesingButton.setAttribute("data-lang-key", "buttonDesing");
        divDesingButton.setAttribute("langs-atr", "title");
        divDesingButton.className = 'buttonDesing';
        divDesingButton.title = 'Designations maps';
        desing.appendChild(divDesingButton);
        const buttonDesing = document.createElement('button');//showDesing
        buttonDesing.className = 'showDesing';
        divDesingButton.appendChild(buttonDesing);
        desing.addEventListener("click",() => {
            let buttonDesing = document.querySelector(".buttonDesing");
            let showDesing = document.querySelector(".showDesing");
            let designations = document.querySelector(".designations");
            showDesing.classList.toggle("activ"); 
            if (showDesing.className == "showDesing activ") {
                designations.style.display = "block";
                buttonDesing.style.marginBottom = "150px";
            } else {
                designations.style.display = "none";
                buttonDesing.style.marginBottom = "-2px";
            }
        })
        return desing;
    }
});
map.addControl(new buttonDesing());
//Настройки
const buttonSetting = L.Control.extend({
    options: { position: 'bottomleft' },
    onAdd: function () {
        const setting = L.DomUtil.create('div', 'leaflet-control-setting-map leaflet-bar leaflet-control');
        const divSettingButton = document.createElement('div');//setting
        divSettingButton.setAttribute("data-lang-key", "setting");
        divSettingButton.setAttribute("langs-atr", "title");
        divSettingButton.className = 'setting';
        divSettingButton.id = 'setting';
        divSettingButton.title = 'Setting maps';
        setting.appendChild(divSettingButton);
        const settingIkon = document.createElement('span');//settingIkon
        settingIkon.className = 'settingIkon';
        divSettingButton.appendChild(settingIkon);

        let settingBlock = document.querySelector("#settingBlock");
        let closeSetting = document.querySelector(".close-setting");
        setting.addEventListener("click",closeSettingShou);
        closeSetting.addEventListener("click",closeSettingShou);
        function closeSettingShou(){
            divSettingButton.classList.toggle("activ"); 
          if (divSettingButton.className == "setting activ") {
            settingBlock.style.display = "block";
          } else {
            settingBlock.style.display = "none";
            document.querySelector("#namePointAddEditDelat").value = "";
            let status = document.querySelector("#status");
            status.textContent = "";
            status.style.display = "none";
            document.querySelector("#fileName").textContent = "file not loaded";
            document.querySelector("#fileName").style.color = "bleck";
          }
         }
        return setting;
    }
});
map.addControl(new buttonSetting());
//Масштабная линейка
L.control.scalebar({ position: 'bottomright' }).addTo(map);
//Функция создания маркера состояния
function onLayerGroup(operatingBasePointsNiv, operatingPointsNiv, operatingBaseTax, operatingPointsTax) {
     let markers = {};//Создаем обьект для хранения маркеров
     let checkMarker;//Маркер
    //Функция изменения состояния галочки 
     function checkedMarkers(layerName) {
        const pointCheckedMarkers = layerName.getLayers();
        for (let i = 0; i < pointCheckedMarkers.length; i++) {
            pointCheckedMarkers[i].on('click', function(event) { 
            const checkbox = document.getElementById("checkbox");
                checkbox.addEventListener('click', () => { 
                        if (checkbox.checked) {
                        checkbox.checked = !checkbox.checked;// Переключение состояния
                        //При нажатии на checkbox изменяем чекбокс на активный переписывая Popup
                        let checkboxChecked = pointCheckedMarkers[i]._popup._content.replace(/id="checkbox"/, 'id="checkbox" checked');
                        pointCheckedMarkers[i].bindPopup(checkboxChecked);
                        //Создаем маркер галочку
                        checkMarker = L.marker([event.latlng.lat,event.latlng.lng], {icon: checkIcon }).addTo(map);
                        //checkMarker.name = pointCheckedMarkers[i].id;//присваеваваем ему номер ДЛЯ ПОИСКА
                        markers[pointCheckedMarkers[i].id]= checkMarker;//добавляем в обьект
                        layerName.addLayer(checkMarker);//добавляем к слою
                        } else {    
                        //При нажатии на checkbox изменяем чекбокс на не активный Popup   
                        let checkboxChecked = pointCheckedMarkers[i]._popup._content.replace(/id="checkbox" checked/, 'id="checkbox" ');
                        pointCheckedMarkers[i].bindPopup(checkboxChecked);         
                        //Удаляем маркер галочку
                        layerName.removeLayer(markers[pointCheckedMarkers[i].id]);//из слоя
                        delete markers[pointCheckedMarkers[i].id];//из масива
                        }
                });
            });    
        }
    }
    //Запускаем функцию создания маркера
    if (operatingBasePointsNiv) {checkedMarkers(operatingBasePointsNiv);};
    if (operatingPointsNiv) {checkedMarkers(operatingPointsNiv);};
    if (operatingBaseTax) {checkedMarkers(operatingBaseTax);};
    if (operatingPointsTax) {checkedMarkers(operatingPointsTax);};
};

//Показываем какой РАБОЧИЙ слой открыт/закрыт
map.on('overlayadd', function(e) {
    console.log("open - "+e.layer.layerName);
});
map.on('overlayremove', function(e) {
    console.log("close - "+e.layer.layerName);
});

//Наполнение селекта для coordinateSystem и positionType
// Функция загрузки JSON и заполнения select
async function loadOptions() {
  const jsonFileKod = './kod/kod.json'; // Укажите URL-адрес json файла
  try {
    const response = await fetch(jsonFileKod); // Загружаем JSON
    const jsonData = await response.json(); // Преобразуем в объект
    
    // Получаем элементы select
    const coordinateSelect = document.getElementById('coordinateSystem');
    const positionSelect = document.getElementById('positionType');
    const coordSystem = document.getElementById('coordSystem');
    // Заполняем select для coordinateSystem
    jsonData[siteLanguage].coordinateSystem.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.value;
      coordinateSelect.appendChild(option);
    });
    // Заполняем select для coordinateSystem
    jsonData[siteLanguage].coordinateSystem.forEach(item => {
      const option = document.createElement('option');
      option.value = item.value;
      option.textContent = item.value;
      coordSystem.appendChild(option);
    });
    // Заполняем select для positionType
    jsonData[siteLanguage].positionType.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.value;
      positionSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Ошибка загрузки JSON:', error);
  }
}

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', loadOptions);

//Определяем координаты
//Кнопка активизации функции определения координат
let determinationСoordinates = document.querySelector(".determinationСoordinates");
determinationСoordinates.addEventListener('click', determinationСoordinatesClick);
//Отображение блока
function determinationСoordinatesClick() {
    if (document.querySelector(".close-import").id == "infoPoint") {
        closeMarkerLabel.id = document.querySelector(".close-import").id;
        document.querySelector(".import").style.display = "none"; 
        document.querySelector(".infoPointkBlock").style.display = "none";
        document.querySelector(".markerDeterminationСoordinates").style.display = "block";
    } else {
        closeMarkerLabel.id = document.querySelector(".close-import").id;
        document.querySelector(".import").style.display = "none"; 
        document.querySelector(".settingBlock").style.display = "none";
        document.querySelector(".markerDeterminationСoordinates").style.display = "block";
    } 
}
//Закрытие блока
let closeMarkerLabel = document.querySelector(".closeMarkerLabel");
closeMarkerLabel.addEventListener('click', determinationСoordinatesClose);
function determinationСoordinatesClose() {
    if (closeMarkerLabel.id == "infoPoint") {
        closeMarkerLabel.removeAttribute("id");
        document.querySelector(".import").style.display = "block"; 
        document.querySelector(".infoPointkBlock").style.display = "block";
        document.querySelector(".markerDeterminationСoordinates").style.display = "none";
    } else {
        closeMarkerLabel.removeAttribute("id");
        document.querySelector(".import").style.display = "block"; 
        document.querySelector(".settingBlock").style.display = "block";
        document.querySelector(".markerDeterminationСoordinates").style.display = "none";
    } 
}
//Получаем и передаем информацию координатами
//Передача информации
let coordSystem = document.querySelector("#coordSystem");
let getCoordinates = document.querySelector("#getCoordinates");
async function loadOptionSelekt(nameSelekt, value) {
    const jsonFileKod = './kod/kod.json'; // Укажите URL-адрес json файла
    const response = await fetch(jsonFileKod); // Загружаем JSON
    const jsonData = await response.json(); // Преобразуем в объект
        for (const item of jsonData[siteLanguage][nameSelekt]) {
            if (item.value === value) {
                document.getElementById(nameSelekt).value = item.id; // Нашли → возвращаем ID
            }
        }
}   
//Определение координат по карте
getCoordinates.addEventListener('click', getCoordinatesClick);
function getCoordinatesClick() {
    let center = map.getCenter();
    let lat = center.lat;
    let lng = center.lng;
    if (coordSystem.value === "JTSK") {
        //JTSK
        let conv = new JTSK_Converter();
        let wgs = conv.WGS84toJTSK(lat, lng);
        //Выводим информацию
        document.getElementById("position X").value = (wgs.y).toFixed(0);
        document.getElementById("position Y").value = (wgs.x).toFixed(0);
        loadOptionSelekt("coordinateSystem" , coordSystem.value);
        console.log(`Координаты: X=${(wgs.y).toFixed(0)}, Y=${(wgs.x).toFixed(0)}`);
    } else {
        //WGS84
        //Выводим информацию
        document.getElementById("position X").value = lat.toFixed(8);
        document.getElementById("position Y").value = lng.toFixed(8);
        loadOptionSelekt("coordinateSystem" , coordSystem.value);
        console.log(`Координаты: ${lat.toFixed(8)}, ${lng.toFixed(8)}`);
    }
    //Закрываем экран
    if (closeMarkerLabel.id == "infoPoint") {
        closeMarkerLabel.removeAttribute("id");
        document.querySelector(".import").style.display = "block"; 
        document.querySelector(".infoPointkBlock").style.display = "block";
        document.querySelector(".markerDeterminationСoordinates").style.display = "none";
    } else {
        closeMarkerLabel.removeAttribute("id");
        document.querySelector(".import").style.display = "block"; 
        document.querySelector(".settingBlock").style.display = "block";
        document.querySelector(".markerDeterminationСoordinates").style.display = "none";
    } 
}
/*------------------------------------------*/
/*
//Подключаем камеру
let constraints = { audio: false, video: { width: 1280, height: 720 } };
let setting = document.querySelector(".setting");
setting.addEventListener("click",()=>{
    promise = navigator.mediaDevices.getUserMedia(constraints);
})
*/