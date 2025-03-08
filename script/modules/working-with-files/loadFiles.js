let runCalendAplikac = document.querySelector("#runCalendAplikac");
runCalendAplikac.addEventListener("click",loadFiles);
async function loadFiles() {
    console.log("0000");
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    try {
        const response = await fetch('http://localhost:4000/uploadFile', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        document.getElementById('fileName').textContent = result.message;
    } catch (error) {
        document.getElementById('fileName').textContent = 'Ошибка загрузки';
    }
}