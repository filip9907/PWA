console.log("✅ push.js załadowany");

document.addEventListener('DOMContentLoaded', async () => {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.ready;

  // Zgoda użytkownika na powiadomienia
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.warn('Brak zgody na powiadomienia push');
    return;
  }

  // VAPID public key (dostosuj do własnej)
  const vapidPublicKey = 'BMK8iPg7IBhcfNizqCEazCqjDr8mE4sbi-BzJmhDLtqymOJjsLt3MZ2vEv-bRLzrWRqu5heA5J8F--NCvE1E1kA';
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });

    console.log("Subskrypcja PUSH:", subscription);

    // Wyślij subskrypcję do backendu
    await fetch('https://pwabackend-production.up.railway.app/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Subskrypcja push nie powiodła się', err);
  }
});

// Funkcja pomocnicza
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map(char => char.charCodeAt(0)));
}
