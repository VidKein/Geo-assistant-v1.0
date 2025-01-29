import {typeJobsArray} from './planning-work.js';//Импортируем информаци по типу и типу роботы
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
for (let i = 0; i < settingBlock.length; i++) {
    settingBlock[i].addEventListener("click",(e)=>{
        if (settingBlock[i].style.display == "block") { 
            //Работаем с языком
            if (e.target.id == "runLangAplikac") {
                    let lang = document.querySelector("#lang");
                    const validOptions = Array.from(document.querySelectorAll('#langAplikac option')).map(option => option.value);
                    const currentValue = lang.value.trim();
                    // Проверяем, соответствует ли введённое значение одному из доступных вариантов
                    if(validOptions.includes(currentValue)) {console.log("Выбран язык "+currentValue);}else{alert("You haven't selected a language")} 
            }
            //Работаем с загрузкой выгрузкой файла
            if (e.target.id == "runCalendAplikac") {console.log("runCalendAplikac");}
            //Работаем с загрузкой, редоктированием и удалением информации о точки
            let namePoint = document.querySelector(".namePoint");
                //Edit
                let point = document.querySelector("#point").value.trim();
                if (e.target.id == "runPointEdit") {
                    if (Number(point)) {
                      console.log(point);  
                    } else {
                        console.log(alert("Enter point number"));  
                    }
                }
                //Add
                if (e.target.id == "runPointAdd") {
                    if (Number(point)) {
                        console.log(typeJobsArray);
                        //Тип и Вид работы
                        let typeAndJobsPoint = document.querySelector(".typeAndJobsPoint");
                        let firstSelectHtml = `
                            <select id="firstSelect" style="background-color: #cdc4c4;">
                                <option value="">Type</option>
                            </select>
                        `;
                        typeAndJobsPoint.innerHTML = firstSelectHtml;
                        //Название Участка работы
                        let plasePoint = document.querySelector(".plasePoint");
                        let secondSelectHtml =`
                        <select id="secondSelect"  style="background-color: cornflowerblue;">
                            <option value="">Select type</option>
                        </select>
                        `;
                        plasePoint.innerHTML = secondSelectHtml;
                        settingBlockFull.style.display = "none";
                        document.querySelector("#import").style.display = "block";
                        namePoint.innerText = point;

                        // Заполняем первый select (Base, poligons)
                        Object.keys(typeJobsArray).forEach(key => {
                            const option = document.createElement("option");
                            option.value = key;
                            option.textContent = key;
                            firstSelect.appendChild(option);
                        });
                        // Обработчик изменения первого select
                        firstSelect.addEventListener("change", function () {
                            secondSelect.innerHTML = '<option value="">Select</option>'; // Очищаем второй select
                        
                            const selectedCategory = this.value;
                            if (selectedCategory) {
                                Object.keys(typeJobsArray[selectedCategory]).forEach(subKey => {
                                    const option = document.createElement("option");
                                    option.value = subKey;
                                    option.textContent = subKey;
                                    secondSelect.appendChild(option);
                                });
                            }
                        });
                        //Закрытие изменений
                        document.querySelector(".close-import").addEventListener("click", ()=>{
                            settingBlockFull.style.display = "block";
                            document.querySelector("#import").style.display = "none";
                        });
                      } else {
                          console.log(alert("Enter point number"));  
                      }
                }
                //Delat
                if (e.target.id == "runPointDelat") {
                    if (Number(point)) {
                        console.log(point);  
                        document.querySelector("#point").value = "";
                      } else {
                          console.log(alert("Enter point number"));  
                      }
                }
            //Отображаем/не отображаем наименование точки на карте       
            if (e.target.id == "nameDisplay") {console.log("nameDisplay");}
        }
    })
}