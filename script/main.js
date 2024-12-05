document.addEventListener("planningWork", (planning) => {
    parsinWork(planning.detail.planningNiv, jobsNiv);
    parsinWork(planning.detail.planningTrig, jobsTrig);
});
function parsinWork(planingWork, markerPoimt) {    
    planingWork.forEach(point => {
        const parsedData = {};
        const regex = /namber:\s*([\w\d\(\)-]+)|position:\s*([\d\s,.]+)|vycka:\s*([\d.,]+)|date:\s*([\d.]+)|JTSK:\s*([\w\d\s]+)|positionType:\s*(\w+)/g;
        let match;
        while ((match = regex.exec(point)) !== null) {            
            if (match[1]) parsedData["namber"] = match[1];
            if (match[2]) parsedData["position"] = match[2]
                .split(/[,\s]+/) // Разделяем по запятым и пробелам
                .filter(num => num.trim() !== "") // Убираем пустые строки
                .map(Number); // Преобразуем в числа
            if (match[3]) parsedData["vycka"] = parseFloat(match[3].replace(',', '.'));;
            if (match[4]) parsedData["date"] = match[4];
            if (match[5]) parsedData["JTSK"] = match[5].trim();
            if (match[6]) parsedData["positionType"] = match[6];
        }
        console.log(parsedData["namber"], parsedData["position"], parsedData["JTSK"], parsedData["vycka"], parsedData["positionType"], markerPoimt);
        if (parsedData["position"] !== undefined) {
            createMarker(parsedData["namber"], parsedData["position"], parsedData["JTSK"], parsedData["vycka"], parsedData["positionType"], markerPoimt); 
        }         
    });
}


//Карта
//Спутник
let key = "328W3i5uAdhtTMZr8hrV";
let OSMsatelitMap = L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key='+key, {maxZoom: 22,attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'});
//Растр
let OSMstritMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
//Определие слоя
let map = L.map('map', {
  center: [50.047266, 14.440722],
  zoom: 15,
  //вращение карты
  rotate: true,
  rotateControl: {
    closeOnZeroBearing: false,
    position: 'topleft',
    },
  bearing: 0, 
  compassBearing: true, 
  //сенсорное взаимодействие вращало карту
  touchRotate: true,
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
//Виды карт
let baseMaps = {
  "Satelit Map": OSMsatelitMap,
  "Strit Map": OSMstritMap
};


let layerControl = L.control.layers(baseMaps).addTo(map);


//Нивелирная съемка
//Базовые точки
let basePointsNiv = L.marker([39.75, -105.09]).bindPopup('Base points Niv');
//Рабочие точки
let operatingPointsNiv = L.marker([39.75, -105.09]).bindPopup('Operating points Niv .');

//Тахеометрическая съемка
//Базовые точки
let basePointsTax = L.marker([39.75, -105.09]).bindPopup('Base points Tax.');
//Рабочие точки
let operatingPointsTax = L.marker([39.75, -105.09]).bindPopup('Operating points Tax.');

layerControl.addOverlay(basePointsNiv, "<span style='color: red'>Base points Niv.</span>");
layerControl.addOverlay(operatingPointsNiv, "<span style='color: green'>Operating points Niv.</span><hr>");
layerControl.addOverlay(basePointsTax, "<span style='color: red'>Base points Tax.</span>");
layerControl.addOverlay(operatingPointsTax, "<span style='color: green'>Operating points Tax.</span>");


//Моя геолокация
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
        returnToPrevBounds: true//Возврат назат
  }).addTo(map);
//Выводит ошибки геолокации
function onLocationError(e) {alert(e.message);}
map.on('locationerror', onLocationError);

/*------------------------------------------*/
//Извлекаем информацию о точках
let xhr = new XMLHttpRequest();
//запрос на извлечение
xhr.open("GET","./koordinaty/koordinats.json");
//Устанавливаем что будем возврашать
xhr.responseType = "json";
xhr.send();
createСontent();
//Считываем информацию для отображения информации на карте
function createСontent() {
    xhr.onload = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            let respon = xhr.response;
            for (const infoPoint of Object.entries(respon)) {
                switch (infoPoint[0]) {
                        case "base":
                        for (const info of Object.entries(infoPoint[1].niv)){
                            //console.log(info);
                            createMarker(info[0], info[1].position, info[1].systemCoordinates, info[1].vycka, info[1].positionType, mainNiv);
                            //console.log(info[0], info[1].position, info[1].systemCoordinates, info[1].vycka, info[1].positionType);   
                        }
                        for (const info of Object.entries(infoPoint[1].trig)){
                            createMarker(info[0], info[1].position, info[1].systemCoordinates, info[1].vycka, info[1].positionType, mainTrig);
                            //console.log(info[0], info[1].position, info[1].systemCoordinates, info[1].vycka, info[1].positionType);
                        }       
                        break;
                        case "poligons":
                        for (const info of Object.entries(infoPoint[1])){
                            for (const  value of Object.entries(info)) {
                                if (value[0] == 0) {
                                    //console.log(value[1]);
                                }
                                if (value[0] == 1) {
                                    for (const  bot of Object.entries(value[1])) {
                                        //createMarker(bot[0], bot[1].position, bot[1].systemCoordinates, bot[1].vycka, bot[1].positionType, jobsNiv)
                                        //console.log(bot[0], bot[1].position, bot[1].systemCoordinates, bot[1].vycka, bot[1].positionType);   
                                    }
                                }
                            }
                        }
                        break;
                }
            }
        }    
    }
}

function createMarker(name, position, systemCoordinates, vycka, positionType, iconPoint) {
 if (systemCoordinates == "JTSK") {
        var conv = new JTSK_Converter();
        var wgs = conv.JTSKtoWGS84(position[1], position[0]);
        //Подключение маркера с конвертацией JTSKtoWGS84
        var marker = L.marker([wgs.lat,wgs.lon],{icon: iconPoint}).addTo(map);
        marker.bindPopup("<b>"+name+"</b><br>Vycka: "+vycka+" m.<br>Type: "+positionType);
    } else {
        //Подключение маркера с WGS84
    }
}
//Масштабная линейка
L.control.betterscale().addTo(map);
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




var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

var cities = L.layerGroup([littleton, denver, aurora, golden]);
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});

var map = L.map('map', {
center: [39.73, -104.99],
zoom: 10,
layers: [osm, cities]
});  
var baseMaps = {
"OpenStreetMap": osm,
"OpenStreetMap.HOT": osmHOT
};

var overlayMaps = {
"Cities": cities
}; 
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);     
var baseMaps = {
"OpenStreetMap": osm,
"<span style='color: red'>OpenStreetMap.HOT</span>": osmHOT
};
var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.'),
rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');

var parks = L.layerGroup([crownHill, rubyHill]);
var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

layerControl.addBaseLayer(openTopoMap, "OpenTopoMap");
layerControl.addOverlay(parks, "Parks");
*/
/*------------------------------------------*/
/*

let layerControl = L.control.layers(baseMaps).addTo(map);


const cities = L.layerGroup();
const mLittleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities);
const mDenver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities);
const mAurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities);
const mGolden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

const map = L.map('map', {
	center: [39.73, -104.99],
	zoom: 10,
	layers: [osm, cities]
});

const baseLayers = {
	'OpenStreetMap': osm,
	'OpenStreetMap.HOT': osmHOT
};

const overlays = {
	'Cities': cities
};

const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

const crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.');
const rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');

const parks = L.layerGroup([crownHill, rubyHill]);

const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
layerControl.addBaseLayer(openTopoMap, 'OpenTopoMap');
layerControl.addOverlay(parks, 'Parks');
*/