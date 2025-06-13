console.log("✅ push.js załadowany");

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🌐 DOMContentLoaded");

  if (!('serviceWorker' in navigator)) {
    console.warn("❌ Brak wsparcia dla Service Workerów w tej przeglądarce");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    console.log("🛠️ Service Worker gotowy:", registration);

    const permission = await Notification.requestPermission();
    console.log("🔔 Status zgody na powiadomienia:", permission);

    if (permission !== 'granted') {
      console.warn('❌ Brak zgody użytkownika na powiadomienia');
      return;
    }

    const vapidPublicKey = 'BMK8iPg7IBhcfNizqCEazCqjDr8mE4sbi-BzJmhDLtqymOJjsLt3MZ2vEv-bRLzrWRqu5heA5J8F--NCvE1E1kA';
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });

    console.log("📬 Subskrypcja PUSH:", subscription);

    const response = await fetch('https://pwabackend-production.up.railway.app/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    console.log("📡 Odpowiedź z backendu:", result);

  } catch (err) {
    console.error("❌ Błąd przy subskrypcji push:", err);
  }
});

// Pomocnicza funkcja konwersji klucza VAPID
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
