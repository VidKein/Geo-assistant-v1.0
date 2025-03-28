let runInputAplikac = document.querySelector("#runImportAplikac");
runInputAplikac.addEventListener("click",importLispPoint);
async function importLispPoint() {
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('http://localhost:4000/importLispPoint', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    alert(result.message|| result.error);  
    // Перезагрузка страницы
    location.reload();
    document.querySelector("#runImportAplikac").setAttribute('disabled', '');
}