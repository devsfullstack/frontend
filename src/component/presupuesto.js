import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Collapse } from '@mui/material';

const Presupuesto = () => {
  const [filtersOpen, setFiltersOpen] = useState(false); // Para mostrar/ocultar filtros
  const [presupuestoData, setPresupuestoData] = useState([]); // Datos de la base de datos (simulados)
  const [page, setPage] = useState(0); // Página de la tabla
  const [rowsPerPage, setRowsPerPage] = useState(5); // Número de filas por página

  // Datos simulados para las estadísticas
  const salesStats = {
    vendidos: 120,
    rechazados: 10,
    pendientesSinEnviar: 30,
    enviadosAceptados: 70,
    totalDisponibles: 150,
  };

  // Datos simulados para la tabla
  const data = [
    { estado: 'Activo', id: '123', emision: '2024-12-01', vencimiento: '2024-12-15', cliente: 'Cliente A', categoria: 'Categoria 1', nroPresupuesto: '001', subtotal: 1000, descuento: 50 },
    { estado: 'Vencido', id: '124', emision: '2024-11-20', vencimiento: '2024-12-01', cliente: 'Cliente B', categoria: 'Categoria 2', nroPresupuesto: '002', subtotal: 2000, descuento: 100 },
    // Más datos simulados...
  ];

  const handleFilterToggle = () => setFiltersOpen(!filtersOpen);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));
  const handleNewPresupuesto = () => console.log('Nuevo presupuesto creado');
  const handleExport = () => console.log('Exportando datos...');

  return (
    <div style={{ marginTop: '80px', padding: '20px', maxWidth: '60%', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Presupuesto</Typography>

      {/* Filtros y nuevo presupuesto */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="outlined"
            color="primary"  // Color azul para el botón
            onClick={handleFilterToggle}
            size="small"
            style={{
              backgroundColor: '#1976d2', // Azul oscuro
              color: 'white',
              fontWeight: 'bold',
              marginRight: '10px',
            }}
          >
            {filtersOpen ? 'Cerrar Filtros' : 'Filtros'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewPresupuesto}
            size="small"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Nuevo Presupuesto
          </Button>
        </Grid>
      </Grid>

      {/* Sección de estadísticas de ventas (Horizontal y chiquitas) */}
      <div style={{ marginBottom: '20px' }}>
        <Grid container spacing={2} justifyContent="center">
          {/* Card: Vendidos */}
          <Grid item xs={12} sm={4} md={2}>
            <div style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              minHeight: '80px'
            }}>
              <Typography variant="body1"><strong>Vendidos:</strong> {salesStats.vendidos}</Typography>
            </div>
          </Grid>

          {/* Card: Rechazados */}
          <Grid item xs={12} sm={4} md={2}>
            <div style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              minHeight: '80px'
            }}>
              <Typography variant="body1"><strong>Rechazados:</strong> {salesStats.rechazados}</Typography>
            </div>
          </Grid>

          {/* Card: Pendientes sin Enviar */}
          <Grid item xs={12} sm={4} md={2}>
            <div style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              minHeight: '80px'
            }}>
              <Typography variant="body1"><strong>Pendientes sin Enviar:</strong> {salesStats.pendientesSinEnviar}</Typography>
            </div>
          </Grid>

          {/* Card: Enviados Aceptados */}
          <Grid item xs={12} sm={4} md={2}>
            <div style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              minHeight: '80px'
            }}>
              <Typography variant="body1"><strong>Enviados Aceptados:</strong> {salesStats.enviadosAceptados}</Typography>
            </div>
          </Grid>

          {/* Card: Total Disponibles */}
          <Grid item xs={12} sm={4} md={2}>
            <div style={{
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              minHeight: '80px'
            }}>
              <Typography variant="body1"><strong>Total Disponibles:</strong> {salesStats.totalDisponibles}</Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Filtros */}
      <Collapse in={filtersOpen}>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={3}><TextField label="Producto" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Cliente" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Estado del Presupuesto" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Categoría" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Número de Presupuesto" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Etiqueta" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Vendedor" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Forma de Pago" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Método de Envío" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Usuario" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Nota para el Cliente" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Nota Interna" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Servicio Interno" variant="outlined" fullWidth /></Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Fecha Desde"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Fecha Hasta"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" style={{ width: '100%' }}>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Collapse>

      {/* Tabla de registros de presupuesto */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Emisión</TableCell>
              <TableCell>Vencimiento</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Nro Presupuesto</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Descuento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presupuestoData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.estado}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.emision}</TableCell>
                <TableCell>{row.vencimiento}</TableCell>
                <TableCell>{row.cliente}</TableCell>
                <TableCell>{row.categoria}</TableCell>
                <TableCell>{row.nroPresupuesto}</TableCell>
                <TableCell>{row.subtotal}</TableCell>
                <TableCell>{row.descuento}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={presupuestoData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Botón de Exportar */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
          style={{ fontWeight: 'bold', padding: '10px 20px' }}
        >
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default Presupuesto;
