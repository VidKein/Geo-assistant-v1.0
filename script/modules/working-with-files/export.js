let runExportAplikac = document.querySelector("#runExportAplikac");
runExportAplikac.addEventListener("click",importLispPoint);
async function importLispPoint(e) {
    let type = document.querySelector("#firstSelectEmport").value;
    let place = document.querySelector("#secondSelectEmport").value;
    //Контроль
    //console.log(type,place);
    try{
        if (!type || !place) {
             e.preventDefault(); // Останавливаем отправку формы
        }else{
        const API_URL = 'http://localhost:4000/exportLispPoint';
        const response = await fetch(API_URL, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({type, place})
        });
        const result = await response.json();
        alert(result.message || result.error);
        // Перезагрузка страницы
        location.reload();
        }
    } catch (error) {
    alert('Server error.');
    }
}