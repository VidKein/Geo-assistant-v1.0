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
async function funktionalAdd(e) {   
    let dataPlace = document.querySelector(".namePoint").getAttribute('place'); //имя участка работы SOD-11
    let dataName = document.querySelector(".namePoint").getAttribute('data-name');//имя тип точек Рабочии Базовые
    let dataJobs = document.querySelector(".namePoint").getAttribute('data-jobs');//Тип сьемки Нив Тах
    let id = document.querySelector(".namePoint").textContent;
    let positionX = document.getElementById("position X").value.trim();
    let positionY = document.getElementById("position Y").value.trim();
    let vyckaPoint = document.getElementById("vycka").value.trim();
    let date = document.getElementById("date").value.trim();
    /* Контроль
    add.push(`dataName: ${dataName}, dataJobs: ${dataJobs} / ${id}:{position:[${positionX},${positionY}], vycka: ${vycka}, date: ${date}, systemCoordinates : ${systemCoordinates}, positionType: ${positionType}}`);    
    console.log(add);
    */
  
   if (!positionX || !positionY || !vyckaPoint || !date || positionType.length == 0 || systemCoordinates.length == 0) {
   alert("You have not filled in all the fields or the fields were filled in incorrectly.");
    e.preventDefault(); // Останавливаем отправку формы
   } else {
    const API_URL = 'http://localhost:4000/addDat';
    const response = await fetch(API_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({dataPlace, dataName, dataJobs, id, positionX, positionY, vyckaPoint, date, systemCoordinates, positionType})
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
}

 // Обработчик изменения ввода
 coordinateInput.addEventListener('input', () => {
   const currentValue = coordinateInput.value.trim();
   // Проверяем, соответствует ли введённое значение одному из доступных вариантов
   if (validOptions.includes(currentValue)) {systemCoordinates.push(currentValue);}
 });  
 

 // Обработчик изменения ввода
 typeInput.addEventListener('input', () => {
   const currentValue = typeInput.value.trim();
   // Проверяем, соответствует ли введённое значение одному из доступных вариантов
   if (validOptionsType.includes(currentValue)) {positionType.push(currentValue);}
 });  
 