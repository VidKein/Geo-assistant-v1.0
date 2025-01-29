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
                //Edit
                let point = document.querySelector("#point").value.trim();
                if (e.target.id == "runPointEdit") {
                    if (Number(point)) {
                      console.log(point);  
                      document.querySelector("#point").value = "";
                    } else {
                        console.log(alert("Enter point number"));  
                    }
                }
                //Add
                if (e.target.id == "runPointAdd") {
                    if (Number(point)) {
                        console.log(point);
                        document.querySelector("#point").value = "";
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