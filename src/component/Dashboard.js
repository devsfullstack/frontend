import React from 'react';
import { Grid } from '@mui/material';
import StatsCard from './StatsCard';
import SalesChart from './SalesChart';
import SummaryBox from './SummaryBox';

const Dashboard = () => {
  const stats = {
    ventasCreadas: 150,
    ventasPromedio: 200,
    cantidadVentas: 75,
  };

  return (
    <div
      className="dashboard"
      style={{
        padding: '16px',
        width: '100%',
        marginLeft: '250px',
        height: '100%',
        maxWidth: 'calc(100% - 35%)', // Deja espacio para el menú lateral
        margin: '0 auto',
        marginTop: '80px', // Ajusta el margen superior para no quedar debajo del header
        overflowX: 'hidden', // Elimina el scroll horizontal
        boxSizing: 'border-box', // Asegura que el padding no cause desbordamiento
      }}
    >
      {/* Contenedor para las estadísticas */}
      <div
        className="dashboard-grid"
        style={{
          display: 'flex',
          justifyContent: 'center', // Centra las tarjetas horizontalmente
          alignItems: 'center', // Centra las tarjetas verticalmente
          flexWrap: 'wrap', // Permite que las tarjetas se ajusten en caso de que haya poco espacio
          gap: '16px', // Espacio entre las tarjetas
        }}
      >
        {/* Grid para las estadísticas */}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatsCard title="Ventas Creadas" value={stats.ventasCreadas} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatsCard title="Ventas Promedio" value={stats.ventasPromedio} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatsCard title="Cantidad de Ventas" value={stats.cantidadVentas} />
          </Grid>
        </Grid>
      </div>

      {/* SalesChart y SummaryBox */}
      <div style={{ marginTop: '16px', width: '100%' }}>
        <SalesChart />
      </div>
      <div style={{ marginTop: '16px', width: '100%' }}>
        <SummaryBox />
      </div>
    </div>
  );
};

export default Dashboard;
