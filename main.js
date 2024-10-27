//Карта
var map = L.map('map').setView([50.051407558040246, 14.442352440062974],15);
//Подключение типа карты
L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=328W3i5uAdhtTMZr8hrV', {
maxZoom: 19,
attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> '
}).addTo(map);
//Подключение маркера
var marker = L.marker([50.051407558040246, 14.442352440062974]).addTo(map);
marker.bindPopup("<b>9102</b><br>vycka:266.4284");
//Определяем координаты
var popup = L.popup();
function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
map.on('click', onMapClick);

//Моя геолокация


function onLocationFound(e) {
var radius = e.accuracy;

L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point " + e.latlng );

L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);
function onLocationError(e) {
alert(e.message);
}
map.on('locationerror', onLocationError);
let track = document.getElementById("track");
track.addEventListener("change",function(){map.locate({setView: true, maxZoom: 19});})
/*
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