    //Отображение настроек
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
