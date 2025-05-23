document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const res = await fetch("https://pwabackend-production.up.railway.app/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  console.log(await res.json());
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
  console.log(await res.json());
});
