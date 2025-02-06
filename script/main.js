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
    "Satelit Map": OSMsatelitMap,
    "Strit Map": OSMstritMap
  };
//ТОЧЕК
//Бызовые точки
//Нивилирования
var pointBaseLayerNiv = [];
//Тахеометрии
var pointBaseLayerTax = [];

//Рабочии точки
//Нивилирования
var pointOperatingLayerNiv = [];
//Тахеометпии
var pointOperatingLayerTax = [];
//Меню отображения слоев Карт
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
    if (planingBaseNiv.length > 0) {
        levelingBaseLeng.textContent = planingBaseNiv.length+1;
        let parsedData =  parsinWork(planingBaseNiv);
        parsedData.forEach(row => {
           if (row["position"] !== undefined) { 
            pointBaseLayerNiv.push(createMarker(row["namber"], row["position"], row["systemCoordinates"], row["vycka"], row["positionType"], markerBasePointNiv)); 
            //Создаем новый div
            const jobDivNiv = document.createElement('div');
            jobDivNiv.className = 'pointJobs'; // Добавляем класс
            //Создаем доплнительные атрибуты
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
            jobDivNivError.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointBaseNiv.appendChild(jobDivNivError);
            //Добавляем span с финкцией изменения 
            let pointError = document.createElement('div');
            pointError.className = 'pointError';
            //Создаем доплнительные атрибуты
            jobDivNivError.setAttribute("place", row["place"]);
            jobDivNivError.setAttribute("data-name", "Base");
            jobDivNivError.setAttribute("data-jobs", "niv");
            jobDivNivError.setAttribute("title", "Base/niv "+row["place"]);
            jobDivNivError.appendChild(pointError);
            console.log("Базовые точки НИВ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
        //Выводим точки на карту и привязываем к переключателю
        operatingBasePointsNiv = L.layerGroup(pointBaseLayerNiv);
        layerControl.addOverlay(operatingBasePointsNiv, "<span style='color: red'>Base points Niv.</span>");
    }else {
        let nouWork = document.createElement('div');
        nouWork.className = "pointJobs";
        nouWork.textContent = "No work leveling points"
        pointBaseNiv.appendChild(nouWork);
        console.log("Базовых точек для невилированию нет");
    }

    //Нивелирование - рабочие 
    //Информацинный блок Нивелирования
    let pointJobsNiv = document.querySelector("#levelingJobs"); 
    let levelingJobsLeng = document.querySelector("#levelingJobsLength");//количество
    if (planingWorkNiv.length > 0) { 
        levelingJobsLeng.textContent = planingWorkNiv.length+1;
        let parsedData =  parsinWork(planingWorkNiv);
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
            jobDivNivError.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointJobsNiv.appendChild(jobDivNivError);
            //Добавляем span с финкцией изменения 
            let pointError = document.createElement('div');
            pointError.className = 'pointError';
            //Создаем доплнительные атрибуты
            jobDivNivError.setAttribute("place", row["place"]);
            jobDivNivError.setAttribute("data-name", "poligons");
            jobDivNivError.setAttribute("data-jobs", "niv");
            jobDivNivError.setAttribute("title", "Poligons/niv "+row["place"]);
            jobDivNivError.appendChild(pointError);
            console.log("Точки НИВ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
        //Выводим точки на карту и привязываем к переключателю
        operatingPointsNiv = L.layerGroup(pointOperatingLayerNiv);
        layerControl.addOverlay(operatingPointsNiv, "<span style='color: green'>Operating points Niv.</span><hr>");    
    }else{
        let nouWork = document.createElement('div');
        nouWork.className = "pointJobs";
        nouWork.textContent = "No work leveling points"
        pointJobsNiv.appendChild(nouWork);
        console.log("Работы по невилированию нет");
    }

    //Тахеометрия - начальные точки(базовые)
    //Информацинный блок Нивелирования
    let pointBaseTax = document.querySelector("#tacheometryBasic"); 
    let tacheometryBaseLength = document.querySelector("#tacheometryBasicLength");//количество
    if (planingBaseTrig.length > 0) {
        tacheometryBaseLength.textContent = planingBaseTrig.length+1;
        let parsedData =  parsinWork(planingBaseTrig); 
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
            jobDivTaxError.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointBaseTax.appendChild(jobDivTaxError);
            //Добавляем span с финкцией изменения 
            let pointError = document.createElement('div');
            pointError.className = 'pointError';
            //Создаем доплнительные атрибуты
            jobDivTaxError.setAttribute("place", row["place"]);
            jobDivTaxError.setAttribute("data-name", "Base");
            jobDivTaxError.setAttribute("data-jobs", "trig");
            jobDivTaxError.setAttribute("title", "Base/trig "+row["place"]);
            jobDivTaxError.appendChild(pointError);
            console.log("Базовые точки ТАХ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
        //Выводим точки на карту и привязываем к переключателю
        operatingBaseTax = L.layerGroup(pointBaseLayerTax);
        layerControl.addOverlay(operatingBaseTax, "<span style='color: red'>Base points Tax.</span>");
    }else{
        let nouWork = document.createElement('div');
        nouWork.className = "pointJobs";
        nouWork.textContent = "No work tacheometry points"
        pointBaseTax.appendChild(nouWork);
        console.log("Базовых точек для тахеoметрии нет");
    }
    
    //Тахеометрия - рабочие 
    //Информацинный блок Нивелирования
    let pointJobsTax = document.querySelector("#tacheometryJobs"); 
    let tacheometryJobsLength = document.querySelector("#tacheometryJobsLength");//количество
    if (planingWorkTax.length > 0) {
        tacheometryJobsLength.textContent = planingWorkTax.length+1;
        let parsedData =  parsinWork(planingWorkTax); 
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
            jobDivTaxError.textContent = row["namber"]; // Устанавливаем текст внутри div
            //Добавляем div в контейнер
            pointJobsTax.appendChild(jobDivTaxError);
            //Добавляем span с финкцией изменения 
            let pointError = document.createElement('div');
            pointError.className = 'pointError';
            //Создаем доплнительные атрибуты
            jobDivTaxError.setAttribute("place", row["place"]);
            jobDivTaxError.setAttribute("data-name", "poligons");
            jobDivTaxError.setAttribute("data-jobs", "trig");
            jobDivTaxError.setAttribute("title", "Poligons/trig "+row["place"]);
            jobDivTaxError.appendChild(pointError);
            console.log("Точки ТАХ с числом - "+row["namber"]+" в базе не найдены"); 
            }  
        }) 
        //Выводим точки на карту и привязываем к переключателю
        operatingPointsTax = L.layerGroup(pointOperatingLayerTax);
        layerControl.addOverlay(operatingPointsTax, "<span style='color: green'>Operating points Tax.</span>");
    }else{
        let nouWork = document.createElement('div');
        nouWork.className = "pointJobs";
        nouWork.textContent = "No work tacheometry points"
        pointJobsTax.appendChild(nouWork);
        console.log("Работы по тахеoметрии нет");
    } 
    //Присваеваем имена слоям
    operatingBasePointsNiv.layerName = 'operatingBasePointsNiv';
    operatingPointsNiv.layerName = 'operatingPointsNiv';
    operatingBaseTax.layerName = 'operatingBaseTax';
    operatingPointsTax.layerName = 'operatingPointsTax';
    onLayerGroup(operatingBasePointsNiv, operatingPointsNiv, operatingBaseTax, operatingPointsTax); 
}

//Функция парсинга информации переданной из planing-work.js
function parsinWork(planing) {
    if (!Array.isArray(planing)) {
        throw new Error("Input must be an array of strings");
    }
    const arrayPoint = [];
    const regex = /place:\s*([\w-]+)|namber:\s*([\w-]+(?:\([\d]+\))?)|position:\s*([\d\s,.]+)|vycka:\s*([\d.,]+)|date:\s*([\d.]+)|systemCoordinates:\s*([\w]+)|positionType:\s*(\w+)/g;
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
            if (match[6]) parsedData["systemCoordinates"] = match[6].trim();
            if (match[7]) parsedData["positionType"] = match[7];
        }
        arrayPoint.push(parsedData);
    });
    return arrayPoint;
}

//Функция формированм маркеров
function createMarker(name, position, systemCoordinates, vycka, positionType, iconPoint) {   
  if (systemCoordinates == "JTSK") {
        var conv = new JTSK_Converter();
        var wgs = conv.JTSKtoWGS84(position[1], position[0]);
        //Подключение маркера с конвертацией JTSKtoWGS84
        /*var marker = L.marker([wgs.lat,wgs.lon],{icon: iconPoint}).bindPopup("<b>"+name+"</b><br>Vycka: "+vycka+" m.<br>Type: "+positionType);*/
        // Создаем всплывающее меню с радиокнопкой
        const popupContent = `<input type="checkbox" id="checkbox"> completed`;
        var marker = L.marker([wgs.lat,wgs.lon],{icon: iconPoint}).bindPopup(name+"<br>Vycka: "+vycka+" m.<br>Type: "+positionType+"<br>"+popupContent).bindTooltip(name, { 
            permanent: true, // Постоянное отображение
            direction: "bottom", // Направление отображения
            opacity :1,// прозрачность
            offset: L.point(10,15),// Смещение popup относительно маркера
            className: 'no-arrow' // Убираем стандартные стили
        });
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
        if (getActiveLayer() == "Satelit Map") {
            // Изменяем цвет текста у всех tooltip
            leafletTooltip.forEach(tooltip => {tooltip.style.color = 'rgb(255, 255, 255)';});
        } else {
            // Изменяем цвет текста у всех tooltip
            leafletTooltip.forEach(tooltip => {tooltip.style.color = ' #202124';});
        }
    }     
});
// Функция для определения текущего активного слоя
function getActiveLayer() {
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
    checkedMarkers(operatingBasePointsNiv);
    checkedMarkers(operatingPointsNiv);
    checkedMarkers(operatingBaseTax);
    checkedMarkers(operatingPointsTax);

        
};

//Показываем какой РАБОЧИЙ слой открыт/закрыт
map.on('overlayadd', function(e) {
    console.log("open - "+e.layer.layerName);
});
map.on('overlayremove', function(e) {
    console.log("close - "+e.layer.layerName);
});
/*------------------------------------------*/
/*
//Определяем координаты
var popup = L.popup();
function onMapClick(e) {
    //JTSK
    var conv = new JTSK_Converter();
    var wgs = conv.WGS84toJTSK(e.latlng.lat, e.latlng.lng);
    console.log(typeof(e.latlng.lat));
    
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at:  <br><b>WGS84 -</b> <br>" + (e.latlng.lat).toFixed(8)+","+(e.latlng.lng).toFixed(8)+"<br> <b>JTSK - </b><br>"+(wgs.x).toFixed(0)+","+(wgs.y).toFixed(0) )
    .openOn(map);  
}
map.on('click', onMapClick);

//Подключаем камеру
let constraints = { audio: false, video: { width: 1280, height: 720 } };
let setting = document.querySelector(".setting");
setting.addEventListener("click",()=>{
    promise = navigator.mediaDevices.getUserMedia(constraints);
})
*/
//Наполнение селекта для coordinateSystem и positionType
const jsonFileKod = './koordinaty/kod.json'; // Укажите URL-адрес json файла
  // Функция загрузки JSON и заполнения select
  async function loadOptions() {
    try {
      const response = await fetch(jsonFileKod); // Загружаем JSON
      const jsonData = await response.json(); // Преобразуем в объект
      
      // Получаем элементы select
      const coordinateSelect = document.getElementById('coordinateSystem');
      const positionSelect = document.getElementById('positionType');

      // Заполняем select для coordinateSystem
      jsonData.kod.coordinateSystem.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.value;
        coordinateSelect.appendChild(option);
      });

      // Заполняем select для positionType
      jsonData.kod.positionType.forEach(item => {
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


