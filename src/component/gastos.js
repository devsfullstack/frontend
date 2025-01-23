import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Gastos = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gastosData, setGastosData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fecha, setFecha] = useState('');
  const navigate = useNavigate();

  const gastosSimulados = [
    { estado: 'Activo', id: '001', fecha: '2024-12-01', categoria: 'Alquiler', descripcion: 'Pago mensual de oficina', metodoPago: 'Transferencia', monto: 1000 },
    { estado: 'Vencido', id: '002', fecha: '2024-11-20', categoria: 'Servicios', descripcion: 'Factura de electricidad', metodoPago: 'Efectivo', monto: 200 }
  ];

  const handleSearchByDate = () => {
    if (fecha) {
      setGastosData(gastosSimulados.filter(item => item.fecha.includes(fecha)));
    } else {
      setGastosData(gastosSimulados);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  const handleNewGasto = () => {
    navigate('/nuevo-gasto');
  };

  const handleExport = () => {
    console.log('Exportando gastos...');
  };

  return (
    <div style={{ marginTop: '80px', padding: '90px', maxWidth: '100%', margin: '0 auto', marginLeft: '20%' }}>
      <Typography variant="h4" gutterBottom>Gastos</Typography>

      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
        <Button
  variant="contained" // Cambiado a "contained" para que tenga el fondo del color primario
  color="primary" // Usando el color primario definido en el tema
  onClick={() => setFiltersOpen(!filtersOpen)}
  size="small"
  style={{ color: 'white' }} // Asegurando que el texto sea blanco
>
  {filtersOpen ? 'Cerrar Filtros' : 'Filtros'}
</Button>

        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
  variant="contained"
  style={{ backgroundColor: '#28a745', color: 'white' }} // Verde con texto blanco
  onClick={handleNewGasto}
  size="small"
>
  Nuevo Gasto
</Button>

        </Grid>
      </Grid>

      <Collapse in={filtersOpen}>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchByDate}
              fullWidth
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Collapse>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Método de Pago</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gastosData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.estado}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.categoria}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.metodoPago}</TableCell>
                <TableCell>{row.monto}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={gastosData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
          style={{ fontWeight: 'bold' }}
        >
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default Gastos;
