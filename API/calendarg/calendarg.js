class Cal {
    constructor(divId) {
        //Сохраняем идентификатор div
        this.divId = divId;
        // Дни недели с понедельника
        this.DaysOfWeek = [
            'Пн',
            'Вт',
            'Ср',
            'Чтв',
            'Птн',
            'Суб',
            'Вск'
        ];
        // Месяцы начиная с января
        this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        //Устанавливаем текущий месяц, год
        var d = new Date();
        this.currMonth = d.getMonth();
        this.currYear = d.getFullYear();
        this.currDay = d.getDate();
    }
    // Переход к следующему месяцу
    nextMonth() {
        if (this.currMonth == 11) {
            this.currMonth = 0;
            this.currYear = this.currYear + 1;
        }
        else {
            this.currMonth = this.currMonth + 1;
        }
        this.showcurr();
        dateClick()
    }
    // Переход к предыдущему месяцу
    previousMonth() {
        if (this.currMonth == 0) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        }
        else {
            this.currMonth = this.currMonth - 1;
        }
        this.showcurr();
        dateClick()
    }
    // Показать текущий месяц
    showcurr() {
        this.showMonth(this.currYear, this.currMonth);
    }
    // Показать месяц (год, месяц)`
    showMonth(y, m) {
        var d = new Date()
            // Первый день недели в выбранном месяце 
            , firstDayOfMonth = new Date(y, m, 7).getDay()
            // Последний день выбранного месяца
            , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
            // Последний день предыдущего месяца
            , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
        var html = '<table>';
        // Запись выбранного месяца и года
        html += '<thead"><tr>';
        html += '<td colspan="7" id="montYers">' + this.Months[m] + ' ' + y + '</td>';
        html += '</tr></thead>';
        // заголовок дней недели
        html += '<tr class="days">';
        for (var i = 0; i < this.DaysOfWeek.length; i++) {
            html += '<td>' + this.DaysOfWeek[i] + '</td>';
        }
        html += '</tr>';
        // Записываем дни
        var i = 1;
        do {
            var dow = new Date(y, m, i).getDay();
            // Начать новую строку в понедельник
            if (dow == 1) {
                html += '<tr>';
            }

            // Если первый день недели не понедельник показать последние дни предыдущего месяца
            else if (i == 1) {
                html += '<tr>';
                var k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (var j = 0; j < firstDayOfMonth; j++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }
            // Записываем текущий день в цикл
            var chk = new Date();
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
            if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
                html += '<td class="today">' + i + '</td>';
            } else {
                html += '<td class="normal">' + i + '</td>';
            }
            // закрыть строку в воскресенье
            if (dow == 0) {
                html += '</tr>';
            }

            // Если последний день месяца не воскресенье, показать первые дни следующего месяца
            else if (i == lastDateOfMonth) {
                var k = 1;
                for (dow; dow < 7; dow++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }
            i++;
        } while (i <= lastDateOfMonth);
        // Конец таблицы
        html += '</table>';
        // Записываем HTML в div
        document.getElementById(this.divId).innerHTML = html;
    }
}
// При загрузке окна
window.onload = function() {
  // Начать календарь
  var c = new Cal("divCal");			
  c.showcurr();
  // Привязываем кнопки «Следующий» и «Предыдущий»
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };
  dateClick();
}
// Получить элемент по id
function getId(id) {
  return document.getElementById(id);
}
//Анимация календаря
let calendarg = document.querySelector("#calendarg");
let calendargBlock = document.querySelector("#calendargBlock");
let closeCalendar = document.querySelector(".close-calendarg");
calendarg.addEventListener("click",closeCalendarShou);
closeCalendar.addEventListener("click",closeCalendarShou);
function closeCalendarShou(){
  calendarg.classList.toggle("activ"); 
  if (calendarg.className == "calendarg activ") {
      calendargBlock.style.display = "block";
  } else {
      calendargBlock.style.display = "none";
  }
 }
/*--------------------------------------------------------*/
//Дата
let data = document.querySelector(".todayDate");
let todayDate = new Date();
data.innerText = todayDate.getFullYear()+"-"+(todayDate.getMonth()+1)+"-"+todayDate.getDate();
//Анимация информации по работе
 let dataBlock = document.querySelector("#dataBlock");
 let infiPointkBlock = document.querySelector("#infoPointkBlock ");
 let closePoints = document.querySelector(".close-points");
 dataBlock.addEventListener("click",closeSettingInfo);
 closePoints.addEventListener("click",closeSettingInfo);
function closeSettingInfo() {
    dataBlock.classList.toggle("activ"); 
    if (dataBlock.className == "dataBlock activ") {
        infiPointkBlock.style.display = "block";
    } else {
        infiPointkBlock.style.display = "none";
    }
}
 //Анимация нaстроек
 let setting = document.querySelector(".setting");
 let settingBlock = document.querySelector("#settingBlock");
 let closeSetting = document.querySelector(".close-setting");
 setting.addEventListener("click",closeSettingShou);
 closeSetting.addEventListener("click",closeSettingShou);
function closeSettingShou() {
    setting.classList.toggle("activ"); 
    if (setting.className == "setting activ") {
        settingBlock.style.display = "block";
    } else {
        settingBlock.style.display = "none";
    }
}
//Анимация условных обозначений
let buttonDesing = document.querySelector(".buttonDesing");
let showDesing = document.querySelector(".showDesing");
let designations = document.querySelector(".designations");
buttonDesing.addEventListener("click",()=>{
    showDesing.classList.toggle("activ"); 
    if (showDesing.className == "showDesing activ") {
        designations.style.display = "block";
        buttonDesing.style.bottom = "125px";
        setting.style.bottom = "165px";
    } else {
        designations.style.display = "none";
        buttonDesing.style.bottom = "0px";
        setting.style.bottom = "45px";
    }
})

///Действия при нажатии на РАБОЧИИ кнопки 
let importPoint = document.querySelector(".fullEdit");
for (let i = 0; i < importPoint.children.length; i++) {
    let childrenElement = importPoint.children[i];
    childrenElement.addEventListener("click",()=>{
        if (childrenElement.id ==="infoPointkBlock") {
            let infoPointkBlock = document.querySelector(".points-wrapper");
            let blockPoint = infoPointkBlock.children;
            for (let i = 0; i < blockPoint.length; i++) {
                let point = blockPoint[i].children;
                for (let i = 0; i < point.length; i++) {
                    if (point[i].className === "pointJobsError") {
                        point[i].addEventListener("click",()=>{
                            let namePointError = point[i].textContent;
                            document.querySelector("#import").style.display = "block";
                            document.querySelector(".namePoint").innerText = namePointError;   
                        document.querySelector(".close-import").addEventListener("click", ()=>{document.querySelector("#import").style.display = "none";;
                        })
                        })
                    }
                }
            }
        }
    })
}

//Effects анимация accordion
let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
  //Toggle between adding and removing the "active" class to highlight the option that controls the panel
  this.classList.toggle("activeAccord");
  //Switch between hiding and showing the active panel
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}            
function dateClick() {
//Date
const dateCalendar = document.getElementsByTagName("table");
dateCalendar[0].addEventListener("click",(e)=>{            
    const montYers = document.querySelector("#montYers").textContent;
    if (e.target.tagName === "TD") {
        if (e.target.className == "normal" || e.target.className == "not-current") {
            console.log(e.target.textContent.padStart(2, '0')+" "+montYers);
        }
    }
})
}