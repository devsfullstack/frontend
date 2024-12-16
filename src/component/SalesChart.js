import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar las escalas y componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], // Meses
    datasets: [
      {
        label: 'Ventas',
        data: [12000, 19000, 3000, 5000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color para Ventas
      },
      {
        label: 'Ingresos',
        data: [15000, 25000, 8000, 10000],
        backgroundColor: 'rgba(255, 205, 86, 0.6)', // Color para Ingresos
      },
      {
        label: 'Compras',
        data: [10000, 15000, 5000, 7000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color para Compras
      },
      {
        label: 'Gastos',
        data: [5000, 10000, 2000, 4000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color para Gastos
      },
    ],
  };

  const options = {
    responsive: true, // Habilita la respuesta al cambio de tamaño de la ventana
    maintainAspectRatio: false, // Permite que el gráfico cambie de tamaño según el contenedor
    scales: {
      y: {
        ticks: {
          stepSize: 10000, // Establece el incremento de los valores en el eje Y de a 10,000
          beginAtZero: true, // Empieza en cero
        },
        title: {
          display: true,
          text: 'Monto (en pesos)', // Título para el eje Y
        },
      },
    },
  };

  return (
    <div className="sales-chart" style={{ width: '100%', marginLeft: '20px', height: '300px' }}>
      {/* El gráfico se ajusta al 100% del contenedor con una altura de 400px */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
