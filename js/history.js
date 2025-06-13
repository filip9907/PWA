
document.addEventListener('DOMContentLoaded', async () => {
  const user = localStorage.getItem('username');
  const list = document.getElementById('historyList');

  try {
    const res = await fetch('https://pwabackend-production.up.railway.app/api/transactions/' + user);
    const data = await res.json();

    if (data.length === 0) {
      list.innerHTML = '<li>Brak transakcji</li>';
      return;
    }

    data.reverse().forEach(tx => {
      const li = document.createElement('li');
      li.textContent = `${tx.date} - ${tx.category} (${tx.type}): ${tx.amount} zł`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Błąd pobierania historii:', err);
    list.innerHTML = '<li>Błąd ładowania danych</li>';
  }
});
