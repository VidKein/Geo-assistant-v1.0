let satelitMap = ["https://tile.openstreetmap.org/{z}/{x}/{y}.png","&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"];
let stritMap = ["https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=328W3i5uAdhtTMZr8hrV","<a href='https://www.maptiler.com/copyright/' target='_blank'>&copy; MapTiler</a>"];
//Карта
var map = L.map('map').setView([50.051407558040246, 14.442352440062974],15);
//Подключение типа карты
L.tileLayer(satelitMap[0], {
maxZoom: 19,
attribution: satelitMap[1]
}).addTo(map);
/*------------------------------------------*/
//Извлекаем информацию о точках
let xhr = new XMLHttpRequest();
//запрос на извлечение
xhr.open("GET","./koordinaty/niv-znaky.json");
//Устанавливаем что будем возврашать
xhr.responseType = "json";
xhr.send();
createСontent();
//Считываем информацию для отображения информации на карте
function createСontent() {
    xhr.onload = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            let respon = xhr.response;
            for (const infoPoint of respon) {
                createMarker(infoPoint.name, infoPoint.position, infoPoint.systemCoordinates, infoPoint.vycka);
            }
        }    
    }
}
//Формируем наполнение на карте
function createMarker(name, position, systemCoordinates, vycka) {
    if (systemCoordinates == "JTSK") {
        var conv = new JTSK_Converter();
        var wgs = conv.JTSKtoWGS84(position[0], position[1]);
        //Подключение маркера с конвертацией JTSKtoWGS84
        var marker = L.marker([wgs.lat,wgs.lon]).addTo(map);
        marker.bindPopup("<b>"+name+"</b><br>vycka: "+vycka+" m.");
        console.log(name, wgs, systemCoordinates, vycka); 
    } else {
        //Подключение маркера с WGS84
        console.log(name, position, systemCoordinates, vycka);  
    }
}
/*------------------------------------------*/
//Real time location tracker
var marker, circle, lat, long, accuracy;

function getPosition(position) {
  //console.log(position)
  lat = position.coords.latitude;
  long = position.coords.longitude;
  accuracy = position.coords.accuracy;

  if (marker) {
    map.removeLayer(marker);
  }

  if (circle) {
    map.removeLayer(circle);
  }

  marker = L.marker([lat, long]);
  circle = L.circle([lat, long], { radius: accuracy });

  var featureGroup = L.featureGroup([marker, circle]).addTo(map);

  map.fitBounds(featureGroup.getBounds());

  console.log(
    "Your coordinate is: Lat: " +
      lat +
      " Long: " +
      long +
      " Accuracy: " +
      accuracy
  );
}


//Моя геолокация
function onLocationFound(e) {
var radius = e.accuracy;
L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point " + e.latlng );
L.circle(e.latlng, radius).addTo(map);
}

//Выводит ошибки
function onLocationError(e) {alert(e.message);}
map.on('locationerror', onLocationError);
let clickContrGrupGeolocation = document.querySelector(".clickContrGrupGeolocation");
clickContrGrupGeolocation.addEventListener("click",function(){
    clickContrGrupGeolocation.classList.toggle("activ");
    if (clickContrGrupGeolocation.className == "clickContrGrupGeolocation activ") {
        map.locate({setView: true, maxZoom: 19});
        document.querySelector(".imgcontrGrupGeolocation").style.setProperty("background-image", "url(../icons/location-crosshairs-solid-active.svg)");
        map.on('locationfound', onLocationFound);
        if (!navigator.geolocation) {
            console.log("Your browser doesn't support geolocation feature!");
          } else {
            setInterval(() => {
              navigator.geolocation.getCurrentPosition(getPosition);
            }, 5000);
          } 
    } else {
        map.stopLocate();
        document.querySelector(".imgcontrGrupGeolocation").style.setProperty("background-image", "url(../icons/location-crosshairs-solid.svg)");
    }
})


/*
//Определяем координаты
var popup = L.popup();
function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
map.on('click', onMapClick);



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