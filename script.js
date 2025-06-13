// Rejestracja Service Workera
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/PWA/service-worker.js')
      .then(reg => console.log("SW registered", reg))
      .catch(err => console.error("SW registration failed", err));
  });
}

// Formularze
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const res = await fetch("https://pwabackend-production.up.railway.app/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const result = await res.json();
  console.log(result);
  if (res.status === 200) {
    alert("Zarejestrowano! Teraz się zaloguj.");
  } else {
    alert(result.message || "Błąd rejestracji");
  }
});

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const res = await fetch("https://pwabackend-production.up.railway.app/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const result = await res.json();
  console.log(result);
  if (res.status === 200) {
    localStorage.setItem('username', username);
    window.location.href = 'dashboard.html';
  } else {
    alert(result.message || "Błąd logowania");
  }
});
