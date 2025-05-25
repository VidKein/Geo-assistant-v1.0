// Настроенные логин/пароль
const validEmail = "vidkein75@gmail.com";
const validPasswordHash = "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"; // хэш от "password123"

// Функция хеширования SHA-256
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Логин
async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pass').value;
  const rememberme = document.getElementById('rememberme');
  
  const hash = await sha256(password);

  if (email === validEmail && hash === validPasswordHash) {
    if (rememberme.checked) {
        localStorage.setItem('isLoggedIn', 'true');
        showSecretContent();
    } else {
        showSecretContent();
    }
  } else {
    alert('Неверный логин или пароль');
  }
}
//Закрытие окна
function showSecretContent() {document.querySelector(".entrance").style.display = 'none';}

// При загрузке страницы — проверка логина
if (localStorage.getItem('isLoggedIn') === 'true') {
  showSecretContent();
}