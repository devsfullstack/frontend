import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Collapse } from '@mui/material';

const OtrosIngresos = () => {
  const [filtersOpen, setFiltersOpen] = useState(false); // Para mostrar/ocultar filtros
  const [otrosIngresosData, setOtrosIngresosData] = useState([]); // Datos de ingresos (simulados)
  const [page, setPage] = useState(0); // Página de la tabla
  const [rowsPerPage, setRowsPerPage] = useState(5); // Número de filas por página
  const [fecha, setFecha] = useState(''); // Fecha de búsqueda

  // Datos simulados para la tabla
  const ingresosData = [
    { estado: 'Activo', id: '123', fecha: '2024-12-01', categoria: 'Venta', descripcion: 'Venta de producto A', metodoPago: 'Tarjeta', monto: 150 },
    { estado: 'Vencido', id: '124', fecha: '2024-11-20', categoria: 'Servicios', descripcion: 'Consultoría', metodoPago: 'Transferencia', monto: 200 },
    // Más datos simulados...
  ];

  // Filtra los datos por fecha
  const handleSearchByDate = () => {
    if (fecha) {
      setOtrosIngresosData(ingresosData.filter(item => item.fecha.includes(fecha)));
    } else {
      setOtrosIngresosData(ingresosData);
    }
  };

  // Control de paginación
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  // Lógica para nuevo ingreso
  const handleNewIngreso = () => {
    console.log('Nuevo ingreso creado');
  };

  // Lógica para exportar datos
  const handleExport = () => {
    console.log('Exportando datos...');
  };

  return (
    <div style={{ marginTop: '80px', padding: '20px', maxWidth: '100%', margin: '0 auto', marginLeft: '20%' }}> {/* Mueve el contenedor 20% a la derecha */}
      <Typography variant="h4" gutterBottom>Otros Ingresos</Typography>

      {/* Filtros y nuevo ingreso */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setFiltersOpen(!filtersOpen)}
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
            onClick={handleNewIngreso}
            size="small"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Nuevo Ingreso
          </Button>
        </Grid>
      </Grid>

      {/* Filtros */}
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
              style={{ width: '100%' }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Collapse>

      {/* Tabla de ingresos */}
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
            {otrosIngresosData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={otrosIngresosData.length}
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

export default OtrosIngresos;
