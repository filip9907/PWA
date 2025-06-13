
document.addEventListener('DOMContentLoaded', async () => {
  const user = localStorage.getItem('username');
  const ctx = document.getElementById('budgetChart').getContext('2d');

  try {
    const res = await fetch('https://pwabackend-production.up.railway.app/api/transactions/' + user);
    const data = await res.json();

    let income = 0;
    let expense = 0;

    data.forEach(tx => {
      if (tx.type === 'income') income += tx.amount;
      else expense += tx.amount;
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Przychody', 'Wydatki'],
        datasets: [{
          label: 'Budżet (zł)',
          data: [income, expense],
          backgroundColor: ['#4caf50', '#f44336']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } catch (err) {
    console.error('Błąd ładowania danych do wykresu:', err);
    ctx.font = "16px Arial";
    ctx.fillText("Błąd ładowania danych", 50, 50);
  }
});
