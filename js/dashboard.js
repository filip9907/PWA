document.addEventListener('DOMContentLoaded', async () => {
  const user = localStorage.getItem('username');
  document.getElementById('userDisplay').textContent = user;

  try {
    const res = await fetch('https://pwabackend-production.up.railway.app/api/transactions/' + user);
    const data = await res.json();

    let balance = 0;
    const latest = data.slice(-5).reverse();
    const ul = document.getElementById('latestTransactions');
    ul.innerHTML = '';

    latest.forEach(tx => {
      const li = document.createElement('li');
      li.textContent = `${tx.date} - ${tx.category} (${tx.type}): ${tx.amount} zł`;
      ul.appendChild(li);
    });

    data.forEach(tx => {
      balance += tx.type === 'income' ? tx.amount : -tx.amount;
    });

    document.getElementById('balance').textContent = balance.toFixed(2) + ' zł';
  } catch (err) {
    console.error('Błąd pobierania danych:', err);
  }
});
