import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios para hacer solicitudes HTTP

const Compras = () => {
  const [compras, setCompras] = useState([]);  // Inicializamos con un array vacío
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [vencimientoDesde, setVencimientoDesde] = useState('');
  const [vencimientoHasta, setVencimientoHasta] = useState('');
  const [pagina, setPagina] = useState(0);
  const [porPagina, setPorPagina] = useState(5);  // Paginación
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate(); // Hook para la redirección

  // Cargar los datos desde la base de datos (API) cuando el componente se monte
  useEffect(() => {
    axios.get('https://tuservidorapi.com/compras')  // Cambia esta URL por la de tu API
      .then(response => {
        setCompras(response.data);  // Supongamos que la respuesta tiene la lista de compras
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
        setSnackbarMessage('Error al cargar los datos');
        setOpenSnackbar(true);
      });
  }, []);

  const handleFiltro = () => {
    let comprasFiltradas = [...compras];
    if (fechaDesde) {
      comprasFiltradas = comprasFiltradas.filter(compra => new Date(compra.emision) >= new Date(fechaDesde));
    }
    if (fechaHasta) {
      comprasFiltradas = comprasFiltradas.filter(compra => new Date(compra.emision) <= new Date(fechaHasta));
    }
    if (vencimientoDesde) {
      comprasFiltradas = comprasFiltradas.filter(compra => new Date(compra.vencimiento) >= new Date(vencimientoDesde));
    }
    if (vencimientoHasta) {
      comprasFiltradas = comprasFiltradas.filter(compra => new Date(compra.vencimiento) <= new Date(vencimientoHasta));
    }

    setCompras(comprasFiltradas);
    setSnackbarMessage('Filtro aplicado');
    setOpenSnackbar(true);
  };

  const handleNuevaCompra = () => {
    navigate('/nueva-compra');
  };

  const handleExportar = () => {
    setSnackbarMessage('Exportando datos...');
    setOpenSnackbar(true);
  };

  const handleChangePage = (event, newPage) => {
    setPagina(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const resumenData = {
    totalCompras: compras.length,
    cantidadPagar: 10,  // Ejemplo de número
    pagado: 5000,  // Ejemplo de valor
    vencidos: 5,  // Ejemplo de número
    subtotalConDescuento: 4500,  // Ejemplo de valor
    totalConDescuento: 4700,  // Ejemplo de valor
  };

  return (
    <div style={{ padding: '32px', marginLeft: '250px', marginTop: '80px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {/* Botones de Filtro y Nueva Compra en la parte superior */}
          <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            <Grid item xs={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                onClick={handleFiltro}
              >
                Filtros
              </Button>
            </Grid>
            <Grid item xs={6} md={3}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="small"
                onClick={handleNuevaCompra}
              >
                Nueva Compra
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Filtros pequeños entre los botones */}
              <Grid container spacing={1} justifyContent="flex-start" style={{ marginTop: '5px' }}>
                <Grid item>
                  <TextField
                    label="Fecha Desde"
                    variant="outlined"
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Fecha Hasta"
                    variant="outlined"
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Vencimiento Desde"
                    variant="outlined"
                    type="date"
                    value={vencimientoDesde}
                    onChange={(e) => setVencimientoDesde(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Vencimiento Hasta"
                    variant="outlined"
                    type="date"
                    value={vencimientoHasta}
                    onChange={(e) => setVencimientoHasta(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Resumen de compras en tarjetas */}
          <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            {Object.keys(resumenData).map((key) => (
              <Grid item xs={4} key={key}>
                <Card elevation={3} style={{ padding: '10px' }}>
                  <CardContent>
                    <Typography variant="h6">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Typography>
                    <Typography variant="h5">{resumenData[key]}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Tabla de compras */}
          <Paper elevation={6} style={{ padding: '20px', borderRadius: '15px' }}>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>Lista de Compras</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Emisión</TableCell>
                    <TableCell>Vencimiento</TableCell>
                    <TableCell>Proveedor</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Descuento</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compras.slice(pagina * porPagina, pagina * porPagina + porPagina).map((compra) => (
                    <TableRow key={compra.id}>
                      <TableCell>{compra.id}</TableCell>
                      <TableCell>{compra.emision}</TableCell>
                      <TableCell>{compra.vencimiento}</TableCell>
                      <TableCell>{compra.proveedor}</TableCell>
                      <TableCell>{compra.categoria}</TableCell>
                      <TableCell>{compra.subtotal}</TableCell>
                      <TableCell>{compra.descuento}</TableCell>
                      <TableCell>{compra.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={compras.length}
              page={pagina}
              onPageChange={handleChangePage}
              rowsPerPage={porPagina}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* Botón Exportar debajo de la tabla */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="small"
            onClick={handleExportar}
            style={{ marginTop: '20px' }}
          >
            Exportar
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Compras;
