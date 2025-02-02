import React, { useEffect, useState } from 'react';
//import axios from 'axios';
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

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/estadisticas');
      const datos = await response.json();

      // Verificar los datos en consola
      console.log('Ventas:', datos.ventasCreadas);
      console.log('Compras:', datos.comprasTotales);
      console.log('Gastos:', datos.gastosTotales);
      console.log('Resumen:', datos.ingresosTotales);

      // Actualizar el estado con los datos obtenidos
      setStats({
        ventasCreadas: datos.ventasCreadas || 0,
        ventasPromedio: datos.ventasPromedio || 0,
        cantidadVentas: datos.cantidadVentas || 0,
        ingresosTotales: datos.ingresosTotales || 0,
        comprasTotales: datos.comprasTotales || 0,
        gastosTotales: datos.gastosTotales || 0,
        porcentajeCrecimiento: datos.porcentajeCrecimiento || 0,
      });
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  useEffect(() => {
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

/*import React, { useState, useEffect } from 'react';

const Estadisticas = () => {
    const [datos, setDatos] = useState(null);

    useEffect(() => {
        // Hacer la solicitud a tu API
        fetch('http://localhost:3001/api/estadisticas')
            .then(response => response.json())
            .then(datos => {
                setDatos(datos);       
            })
            .catch(error => {
                console.error('Error al obtener las estadísticas:', error);
            });
    }, []);

    if (!datos) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Estadísticas</h2>
            <ul>
                <li>Ventas creadas: {datos.ventasCreadas}</li>
                <li>Ventas promedio: {datos.ventasPromedio}</li>
                <li>Ingresos totales: {datos.ingresosTotales}</li>
                <li>Compras totales: {datos.comprasTotales}</li>
                <li>Gastos totales: {datos.gastosTotales}</li>
                <li>Porcentaje de crecimiento de ventas: {datos.porcentajeCrecimientoVentas}%</li>
                <li>Porcentaje de crecimiento de compras: {datos.porcentajeCrecimientoCompras}%</li>
                <li>Porcentaje de crecimiento de gastos: {datos.porcentajeCrecimientoGastos}%</li>
            </ul>
        </div>
    );
};

export default Estadisticas;
*/