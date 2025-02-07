//Отображение настроек при нажатии на левые кнопки выбора настроек
        let leftSettingFunctional = document.querySelector(".leftSettingFunctional");
        let blockSetting = leftSettingFunctional.children;     
        for (let i = 0; i < blockSetting.length; i++) {
            blockSetting[i].addEventListener("click", ()=> {
                let rightSettingFunctional = document.querySelector(".rightSettingFunctional").children;
                for (let i = 0; i < rightSettingFunctional.length; i++) {
                  rightSettingFunctional[i].style.display = "none";
                  blockSetting[i].style.backgroundColor = "rgb(242, 242, 242)"
                }
                rightSettingFunctional[i].style.display = "block";
                blockSetting[i].style.backgroundColor = "#c3c4c7"
            }); 
        }
//Действия при нажатии на РАБОЧИИ кнопки внутри блок
let settingBlock = document.querySelector(".rightSettingFunctional").children;
let settingBlockFull = document.querySelector("#settingBlock");
//Тип и Вид работы при Создании, Редоктировании и Удаления точки
let runTypeAndJobsPoint = document.querySelector(".runTypeAndJobsPoint");
let runPlasePoint = document.querySelector(".runPlasePoint");
// Слушаем сообщение от другого скрипта о тип работы
document.addEventListener("typeJobsArray", (e) => {
    let typeJobsArray = e.detail;
    preparationInfoEditPoint(runTypeAndJobsPoint, runPlasePoint, typeJobsArray);
});
for (let i = 0; i < settingBlock.length; i++) {
    settingBlock[i].addEventListener("click",(e)=>{
        if (settingBlock[i].style.display == "block") { 
            //Номер точки
            let namePointAddEditDelat = document.querySelector("#namePointAddEditDelat").value.trim();
            //Работаем с языком
            if (e.target.id == "runLangAplikac") {
                    let lang = document.querySelector("#lang");
                    const currentValue = lang.options[lang.selectedIndex].text;
                    // Проверяем, соответствует ли введённое значение одному из доступных вариантов
                    if(currentValue !== "Select") {console.log("Выбран язык "+currentValue);}else{alert("You haven't selected a language")} 
            }
            //Работаем с загрузкой выгрузкой файла
            if (e.target.id == "runCalendAplikac") {console.log("runCalendAplikac");}
            //Работаем с загрузкой, редоктированием и удалением информации о точки
            let namePointInfo = document.querySelector(".namePoint");
            //Тип и Вид работы
            let typeAndJobsPoint = document.querySelector(".typeAndJobsPoint");
            //Название Участка работы
            let plasePoint = document.querySelector(".plasePoint");
                //Edit
                if (e.target.id == "runPointEdit") {
                    if (Number(namePointAddEditDelat)) {
                        //Запoлняем дополнительную информацию по точкам
                        //Создаем новые атрибуты
                        let type = document.querySelector("#firstSelect");
                        let place = document.querySelector("#secondSelect");
                        let dataName = type.value;//имя тип точек Рабочии Базовые
                        let dataJobsPlase = place.value;//имя участка работы SOD-11/Нив Тах 
                        typeAndJobsPoint.innerText = type.value;
                        plasePoint.innerText = place.value;
                        infoPoint(dataName ,dataJobsPlase, namePointAddEditDelat);
                        //Передача информации для получения информации
                        async function infoPoint(dataName ,dataJobsPlase, id) {
                            if (!id || !dataName) {
                            alert("You have not filled in all the fields or the fields were filled in incorrectly.");
                            e.preventDefault(); // Останавливаем отправку формы
                            } else {
                                try {
                                    async function loadOptionSelekt(nameSelekt, value) {
                                        const jsonFileKod = './koordinaty/kod.json'; // Укажите URL-адрес json файла
                                        const response = await fetch(jsonFileKod); // Загружаем JSON
                                        const jsonData = await response.json(); // Преобразуем в объект
                                            for (const item of jsonData.kod[nameSelekt]) {
                                                if (item.value === value) {
                                                    document.getElementById(nameSelekt).value = item.id; // Нашли → возвращаем ID
                                                }
                                            }
                                    }   
                                    
                                     const API_URL = `http://localhost:4000/pointDat/${dataName}/${dataJobsPlase}/${id}`;
                                     const response = await fetch(API_URL);
                                     const data = await response.json();
                                     if (response.ok) {
                                        //Открываем окно для внесения информации
                                        settingBlockFull.style.display = "none";
                                        document.querySelector("#import").style.display = "block";
                                        document.querySelector("#funktionalAdd").style.display = "none";
                                        namePointInfo.innerText = namePointAddEditDelat;
                                        document.querySelector(".close-import").id ='editPoint';
                                        //Запoлняем дополнительную информацию по точкам
                                        //Создаем новые атрибуты
                                        let type = document.querySelector("#firstSelect");
                                        let place = document.querySelector("#secondSelect");
                                        if (type.value =="Base") {
                                            namePointInfo.setAttribute("data-name", type.value);//имя тип точек Базовые
                                            namePointInfo.setAttribute("data-jobs", place.value);//Тип сьемки Нив Тах
                                            namePointInfo.removeAttribute("place");
                                            typeAndJobsPoint.innerText = type.value;
                                            plasePoint.innerText = place.value;
                                        }else{
                                            namePointInfo.setAttribute("data-name", type.value);//имя тип точек Рабочии...
                                            namePointInfo.setAttribute("place", place.value);//имя участка работы SOD-11
                                            namePointInfo.removeAttribute("data-jobs");
                                            typeAndJobsPoint.innerText = type.value;
                                            plasePoint.innerText = place.value;
                                        }
                                        //Выводим информацию
                                         document.getElementById("position X").value = data.position[0];
                                         document.getElementById("position Y").value = data.position[1];
                                         document.getElementById("vycka").value = data.vycka;
                                         document.getElementById("date").value = data.date; 
                                         loadOptionSelekt("coordinateSystem" , data.systemCoordinates);
                                         loadOptionSelekt("positionType" , data.positionType);
                
                                         //Закрытие изменений
                                        document.querySelector("#editPoint").addEventListener("click", ()=>{
                                            settingBlockFull.style.display = "block";
                                            document.querySelector("#import").style.display = "none";
                                            document.querySelector(".close-import").removeAttribute("id");
                                            document.querySelector("#funktionalAdd").style.display = "block";
                                        });
                                         
                                     } else {
                                         alert(data.error);
                                     }
                                }catch(error) {
                                    console.error("Ошибка загрузки:", error);
                                    alert("Ошибка при загрузке данных.");
                                }
                           }
                         }

                    } else {
                      console.log(alert("Enter point number"));  
                    }
                }
                //Add
                if (e.target.id == "runPointAdd") {
                    if (Number(namePointAddEditDelat && !secondSelect.value == "")) {
                        //Открываем окно для внесения информации
                        settingBlockFull.style.display = "none";
                        document.querySelector("#import").style.display = "block";
                        document.querySelector("#funktionalEdit").style.display = "none";
                        namePointInfo.innerText = namePointAddEditDelat;
                        document.querySelector(".close-import").id ='addPoint';
                        //Запoлняем дополнительную информацию по точкам
                        //Создаем новые атрибуты
                        let type = document.querySelector("#firstSelect");
                        let place = document.querySelector("#secondSelect");
                        if (type.value =="Base") {
                            namePointInfo.setAttribute("data-name", type.value);//имя тип точек Базовые
                            namePointInfo.setAttribute("data-jobs", place.value);//Тип сьемки Нив Тах
                            namePointInfo.removeAttribute("place");
                            typeAndJobsPoint.innerText = type.value;
                            plasePoint.innerText = place.value;
                        }else{
                            namePointInfo.setAttribute("data-name", type.value);//имя тип точек Рабочии...
                            namePointInfo.setAttribute("place", place.value);//имя участка работы SOD-11
                            namePointInfo.removeAttribute("data-jobs");
                            typeAndJobsPoint.innerText = type.value;
                            plasePoint.innerText = place.value;
                        }
                        //Закрытие изменений
                        document.querySelector("#addPoint").addEventListener("click", ()=>{
                            settingBlockFull.style.display = "block";
                            document.querySelector("#import").style.display = "none";
                            document.querySelector(".close-import").removeAttribute("id");
                            document.querySelector("#funktionalEdit").style.display = "block";
                        });
                      } else {
                          console.log(alert("Enter point number and type, jops/plase"));  
                      }
                }
                //Delat
                if (e.target.id == "runPointDelat") {
                    if (Number(namePointAddEditDelat) && !secondSelect.value == "") {
                        //Открываем окно
                        settingBlockFull.style.display = "none";
                        document.querySelector("#infoWindows").style.display = "block";
                        //Создание блока
                        let textDelat = document.createElement('p');
                        textDelat.innerText = "Attention, do you really want to delete - ";
                        let span = document.createElement('span');
                        span.style = "color:red";
                        span.id = "delateNamePoin";
                        span.innerText = namePointAddEditDelat;
                        //Тип
                        let typeAndJobsPointDelat = document.createElement('div');
                        typeAndJobsPointDelat.className = "typeAndJobsPointDelat";
                        textDelat.appendChild(typeAndJobsPointDelat);
                        //Вид
                        let plasePointDelat = document.createElement('div');
                        plasePointDelat.className = "plasePointDelat";
                        typeAndJobsPointDelat.after(plasePointDelat);        
                        //Запoлняем дополнительную информацию по точкам
                        //Создаем новые атрибуты
                        let type = document.querySelector("#firstSelect");
                        let place = document.querySelector("#secondSelect");
                        if (type.value =="Base") {
                            span.setAttribute("data-name", type.value);//имя тип точек Базовые
                            span.setAttribute("data-jobs", place.value);//Тип сьемки Нив Тах
                            span.removeAttribute("place");
                            typeAndJobsPointDelat.innerText = type.value;
                            plasePointDelat.innerText = place.value;
                        }else{
                            span.setAttribute("data-name", type.value);//имя тип точек Рабочии...
                            span.setAttribute("place", place.value);//имя участка работы SOD-11
                            span.removeAttribute("data-jobs");
                            typeAndJobsPointDelat.innerText = type.value;
                            plasePointDelat.innerText = place.value;
                        }
                        document.querySelector(".textWindows").appendChild(textDelat);
                        textDelat.appendChild(span);
                        //Закрытие изменений
                        document.querySelector(".close-infoWindows").addEventListener("click", ()=>{
                            //Удаление блока
                            textDelat.remove();
                            settingBlockFull.style.display = "block";
                            document.querySelector("#infoWindows").style.display = "none";
                        });
                      } else {
                          console.log(alert("Enter point number and type, jops/plase"));  
                      }
                }
                //Отображаем/не отображаем наименование точки на карте       
                if (e.target.id == "nameDisplay") {
                    console.log("nameDisplay");
                }
        }
    })
}
//Функция подготовки для информаци в результате работы с точками
function preparationInfoEditPoint(runTypeAndJobsPoint, runPlasePoint, typeJobsArray) {
                        //Название Участка работы
                        let firstSelectHtml = `
                            <select id="firstSelect" style="background-color: #cdc4c4; cursor: pointer;">
                                <option value="">Type</option>
                            </select>
                        `;
                        runTypeAndJobsPoint.innerHTML = firstSelectHtml;
                        //Название Участка работы
                        let secondSelectHtml =`
                        <select id="secondSelect"  style="background-color: cornflowerblue; cursor: pointer;">
                            <option value="">Select type</option>
                        </select>
                        `;
                        runPlasePoint.innerHTML = secondSelectHtml;

                        // Заполняем первый select (Base, poligons)
                        Object.keys(typeJobsArray).forEach(key => {
                            const option = document.createElement("option");
                            option.value = key;
                            option.textContent = key;
                            firstSelect.appendChild(option);
                        });

                        //Обработчик изменения первого select
                        firstSelect.addEventListener("change", function () {
                            secondSelect.innerHTML = '<option value="">Select</option>'; // Очищаем второй select
                            const selectedCategory = this.value;
                            if (selectedCategory) {
                                typeJobsArray[selectedCategory].forEach(subKey => {
                                    const option = document.createElement("option");
                                    option.value = subKey;
                                    option.textContent = subKey;
                                    secondSelect.appendChild(option);
                                });
                            }
                        });
}