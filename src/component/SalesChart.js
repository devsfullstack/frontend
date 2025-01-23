import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Registrar las escalas y componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Ventas',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Ingresos',
        data: [],
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
      },
      {
        label: 'Compras',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Gastos',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  });

  useEffect(() => {
    // Obtener los datos desde el backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/ventas');
        const data = response.data;

        // Procesar los datos para usarlos en el gráfico
        const labels = data.map(item => item.mes);
        const ventasData = data.map(item => item.ventas);
        const ingresosData = data.map(item => item.ingresos);
        const comprasData = data.map(item => item.compras);
        const gastosData = data.map(item => item.gastos);

        // Actualizar el estado del gráfico de manera segura
        setChartData(prevData => ({
          labels,
          datasets: [
            { ...prevData.datasets[0], data: ventasData },
            { ...prevData.datasets[1], data: ingresosData },
            { ...prevData.datasets[2], data: comprasData },
            { ...prevData.datasets[3], data: gastosData },
          ],
        }));
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []); // Aquí no es necesario incluir chartData.datasets en la dependencia

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 10000,
          beginAtZero: true,
        },
        title: {
          display: true,
          text: 'Monto (en pesos)',
        },
      },
    },
  };

  return (
    <div className="sales-chart" style={{ width: '100%', marginLeft: '20px', height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
