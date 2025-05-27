function loadGame(url, script) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content-area').innerHTML = html;
      if (script) {
        const s = document.createElement('script');
        s.src = script;
        document.body.appendChild(s);
      }
    });
}

// Şifre kontrolü ve diğer kodlar aynı kalabilir

// Quiz bitince çağrılacak fonksiyon
window.loadCardGame = function() {
  loadGame('card.html', 'card.js');
};

// Şifre kontrolü
const correctPassword = "999"; // Buraya kendi 3 haneli şifreni yazabilirsin

const passwordBtn = document.getElementById("password-btn");
if (passwordBtn) {
  passwordBtn.onclick = function() {
    const val = document.getElementById("password").value;
    if (val === correctPassword) {
      loadGame('quiz.html', 'quiz.js');
    } else {
      document.getElementById("password-error").classList.remove("hidden");
    }
  };
}