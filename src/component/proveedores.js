import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Proveedores = () => {
  const [filtersOpen, setFiltersOpen] = useState(false); // Para mostrar/ocultar filtros
  const [proveedoresData, setProveedoresData] = useState([]); // Datos de la base de datos (simulados)
  const [page, setPage] = useState(0); // Página de la tabla
  const [rowsPerPage, setRowsPerPage] = useState(5); // Número de filas por página

  const navigate = useNavigate();

  const handleFilterToggle = () => setFiltersOpen(!filtersOpen);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  const handleNuevoProveedor = () => {
    console.log('Nuevo proveedor creado');
    navigate('/nuevo-proveedor'); // Cambia '/ruta-donde-redirigir' por la ruta deseada
  };

  const handleImportar = () => {
    console.log('Importando datos...');
  };

  const handleExport = () => {
    console.log('Exportando datos...');
  };

  // Datos simulados para la tabla de proveedores
  const data = [
    {
      id: 'P001', nombre: 'Proveedor A', apellido: 'Apellido A', mail: 'contacto1@example.com', telefono: '123-456-7890',
      domicilio: 'Calle Falsa 123', localidad: 'Localidad A', provincia: 'Provincia A', dni: '12345678', cuit: '20-12345678-9', condicion: 'Activo'
    },
    {
      id: 'P002', nombre: 'Proveedor B', apellido: 'Apellido B', mail: 'contacto2@example.com', telefono: '987-654-3210',
      domicilio: 'Calle Falsa 456', localidad: 'Localidad B', provincia: 'Provincia B', dni: '87654321', cuit: '20-98765432-1', condicion: 'Inactivo'
    },
    // Más datos simulados...
  ];

  return (
    <div style={{ marginTop: '170px', height: "60%", padding: '90px', maxWidth: '60%', margin: '10px', marginLeft: "320px" }}>
      <Typography variant="h4" gutterBottom>Proveedores</Typography>

      {/* Filtros y botones de búsqueda */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNuevoProveedor}
            size="small"
            style={{
              backgroundColor: '#4caf50', // Verde para crear nuevo
              color: 'white',
              fontWeight: 'bold',
              marginLeft: '10px',
            }}
          >
            Nuevo Proveedor
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleImportar}
            size="small"
            style={{
                backgroundColor: '#8A2BE2' ,

                
              color: 'white',
              fontWeight: 'bold',
              marginLeft: '10px',
            }}
          >
            Importar Datos
          </Button>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            label="Buscar Proveedor"
            variant="outlined"
            fullWidth
            size="small"
            style={{ maxWidth: '300px' }}
          />
        </Grid>
      </Grid>

      {/* Lista de proveedores */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Domicilio</TableCell>
              <TableCell>Localidad</TableCell>
              <TableCell>Provincia</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>CUIT</TableCell>
              <TableCell>Condición</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedoresData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.apellido}</TableCell>
                <TableCell>{row.mail}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.domicilio}</TableCell>
                <TableCell>{row.localidad}</TableCell>
                <TableCell>{row.provincia}</TableCell>
                <TableCell>{row.dni}</TableCell>
                <TableCell>{row.cuit}</TableCell>
                <TableCell>{row.condicion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={proveedoresData.length}
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

export default Proveedores;
