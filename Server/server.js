let add = [];
let systemCoordinates = [];
let positionType= [];
let funktionalAddEdit = document.querySelector("#funktionalAddEdit");
// Получаем элементы input и datalist - systemCoordinates
const coordinateInput = document.getElementById('coordinate');
const validOptions = Array.from(document.querySelectorAll('#coordinateSystem option')).map(option => option.value);
// Получаем элементы input и datalist - systemCoordinates
const typeInput = document.getElementById('position');
const validOptionsType = Array.from(document.querySelectorAll('#positionType option')).map(option => option.value);
funktionalAddEdit.addEventListener("click",funktionalAdd);
async function funktionalAdd() {
    let dataName = document.querySelector(".namePoint").getAttribute('data-name');
    let dataJobs = document.querySelector(".namePoint").getAttribute('data-jobs');
    let id = document.querySelector(".namePoint").textContent;
    let positionX = document.getElementById("position X").value;
    let positionY = document.getElementById("position Y").value;
    let vyska = document.getElementById("vyska").value;
    let date = document.getElementById("date").value;
    //add.push(`${id}:{position:[${positionX},${positionY}], vycka: ${vyska}, date: ${date}, systemCoordinates : ${systemCoordinates}, positionType: ${positionType}}`);    
    //console.log(add);
    const API_URL = 'http://localhost:4000/data';
    const response = await fetch(API_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({dataName, dataJobs, id, positionX, positionY, vyska, date, systemCoordinates, positionType})
    });
    const result = await response.json();
    alert(result.message || result.error);
    // Перезагрузка страницы
    location.reload();
    //обнуление
    document.querySelector("#import").style.display = "none"; 
    add =[];
    coordinateInput.value=[];
    typeInput.value=[];
    systemCoordinates = [];
}


 // Обработчик изменения ввода
 coordinateInput.addEventListener('input', () => {
   const currentValue = coordinateInput.value;
   // Проверяем, соответствует ли введённое значение одному из доступных вариантов
   if (validOptions.includes(currentValue)) {systemCoordinates.push(currentValue);} 
 });  
 

 // Обработчик изменения ввода
 typeInput.addEventListener('input', () => {
   const currentValue = typeInput.value;
   // Проверяем, соответствует ли введённое значение одному из доступных вариантов
   if (validOptionsType.includes(currentValue)) {positionType.push(currentValue);} 
 });  
 