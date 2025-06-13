document.getElementById('transactionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const transaction = {
    userId: localStorage.getItem('username'),
    type: document.getElementById('type').value,
    amount: parseFloat(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    date: document.getElementById('date').value
  };

  try {
    const res = await fetch('https://pwabackend-production.up.railway.app/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });

    if (res.ok) {
      alert('Transakcja zapisana!');
      window.location.href = 'dashboard.html';
    } else {
      alert('Błąd zapisu transakcji');
    }
  } catch (err) {
    console.error('Błąd połączenia:', err);
  }
});
