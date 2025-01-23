import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import StatsCard from './StatsCard';
import SalesChart from './SalesChart';
import SummaryBox from './SummaryBox';

// Registrar el gráfico de torta
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    ventasCreadas: 0,
    ventasPromedio: 0,
    cantidadVentas: 0,
    ingresosTotales: 0,
    comprasTotales: 0,
    gastosTotales: 0,
    porcentajeCrecimiento: 0,
  });


  useEffect(() => {
    // Obtener datos desde el backend
    const fetchData = async () => {
      try {
        const ventasResponse = await axios.get('/api/ventas');
        const comprasResponse = await axios.get('/api/compras');
        const gastosResponse = await axios.get('/api/gastos');
        const resumenResponse = await axios.get('/api/resumen');

        // Verificar los datos en conola
        console.log('Ventas:', ventasResponse.data);
        console.log('Compras:', comprasResponse.data);
        console.log('Gastos:', gastosResponse.data);
        console.log('Resumen:', resumenResponse.data);

        // Actualizar el estado con los datos obtenidos
        setStats({
          ventasCreadas: ventasResponse.data.total_ventas || 0,
          ventasPromedio: ventasResponse.data.total_ventas / (ventasResponse.data.cantidad_ventas || 1) || 0,  // Calcular correctamente el promedio de ventas
          cantidadVentas: ventasResponse.data.cantidad_ventas || 0,  // Asegurarse de que esto sea correcto
          ingresosTotales: resumenResponse.data.ingresos || 0,
          comprasTotales: comprasResponse.data.total_compras || 0,
          gastosTotales: gastosResponse.data.total_gastos || 0,
          porcentajeCrecimiento: 10,  // Puedes ajustar este cálculo
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const pieData = {
    labels: ['Ventas', 'Ingresos', 'Compras', 'Gastos'],
    datasets: [
      {
        data: [
          stats.ventasCreadas,
          stats.ingresosTotales,
          stats.comprasTotales,
          stats.gastosTotales,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  return (
    <div
      className="dashboard"
      style={{
        padding: '32px',
        marginLeft: '350px',
        height: '100%',
        maxWidth: 'calc(100% - 35%)',
        marginTop: '80px',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Contenedor de estadísticas principales */}
      <Grid container spacing={2} style={{ marginBottom: '32px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Ventas Creadas" value={stats.ventasCreadas} color="#4caf50" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Ventas Promedio" value={stats.ventasPromedio} color="#ff9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Cantidad de Ventas" value={stats.cantidadVentas} color="#2196f3" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Ingresos Totales" value={stats.ingresosTotales} color="#8bc34a" />
        </Grid>
      </Grid>

      {/* Gráficos principales */}
      <Grid container spacing={2} style={{ marginTop: '32px' }}>
        {/* Gráfico de torta */}
        <Grid item xs={12} sm={6}>
          <div
            style={{
              padding: '20px',
              borderRadius: '15px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>
              Distribución de Datos
            </Typography>
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                }}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                }}
              />
            </div>
          </div>
        </Grid>

        {/* Gráfico de ventas */}
        <Grid item xs={12} sm={6}>
          <div
            style={{
              padding: '20px',
              borderRadius: '15px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>
              Gráfico de Ventas
            </Typography>
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SalesChart />
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Resumen adicional */}
      <Grid container style={{ marginTop: '32px' }}>
        <Grid item xs={12}>
          <div
            style={{
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <SummaryBox />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
