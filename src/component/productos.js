import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  TextField,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Menu,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Simulación de la obtención de productos desde la base de datos
const fetchProducts = () => {
  return [
    {
      id: 1,
      nombre: 'Producto A',
      codigo: 'A001',
      stock: 100,
      costo: 50,
      precioVenta: 100,
      ivaVenta: 21,
      ivaCompra: 21,
      tipo: 'Electrónica',
      tipoProducto: 'Consumible',
      proveedor: 'Proveedor A',
      descripcion: 'Descripción del producto A'
    },
    {
      id: 2,
      nombre: 'Producto B',
      codigo: 'B001',
      stock: 50,
      costo: 30,
      precioVenta: 60,
      ivaVenta: 21,
      ivaCompra: 21,
      tipo: 'Hogar',
      tipoProducto: 'Permanente',
      proveedor: 'Proveedor B',
      descripcion: 'Descripción del producto B'
    },
    // Más productos de ejemplo...
  ];
};

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(0);
  const [productosPorPagina] = useState(5); // Número de productos por página
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú
  const navigate = useNavigate();

  useEffect(() => {
    const productosData = fetchProducts();
    setProductos(productosData);
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleImportarDatos = () => {
    console.log('Importando datos...');
  };

  const handleNuevoProducto = () => {
    navigate('/nuevo-producto');
  };

  const toggleFiltro = () => {
    setMostrarFiltro(!mostrarFiltro);
  };

  const handleChangePage = (event, newPage) => {
    setPaginaActual(newPage);
  };

  const handleExportarDatos = () => {
    console.log('Exportando datos...');
  };

  // Filtrar los productos que contienen el filtro en su nombre
  const productosFiltrados = productos.filter((product) =>
    product.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // Obtener los productos para la página actual
  const productosPaginados = productosFiltrados.slice(
    paginaActual * productosPorPagina,
    (paginaActual + 1) * productosPorPagina
  );

  // Función para abrir el menú de Ajustar Stock
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú de Ajustar Stock
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Funciones para aumentar o disminuir el stock
  const handleAumento = () => {
    navigate('/nuevo-aumento'); // Redirige a la página de nuevo aumento
    handleClose();
  };

  const handleDisminucion = () => {
    navigate('/nueva-disminucion'); // Redirige a la página de nueva disminución
    handleClose();
  };

  return (
    <div style={{ marginTop: '110px', padding: '20px', maxWidth: '75%', marginLeft: '18%' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>

      {/* Card de Filtros */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} sm={4}>
              {mostrarFiltro && (
                <TextField
                  label="Filtro"
                  value={filtro}
                  onChange={handleFiltroChange}
                  variant="outlined"
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={8} container justifyContent="flex-end" spacing={1}>
              <Grid item>
                <Button variant="contained" size="small" onClick={toggleFiltro}>
                  Filtros
                </Button>
              </Grid>
              <Grid item>
              <Button 
    variant="contained" 
    size="small" 
    onClick={handleImportarDatos}
    style={{ backgroundColor: '#8A2BE2', color: 'white' }} // Violeta con texto blanco
>
    Importar Datos
</Button>

              </Grid>
              <Grid item>
              <Button 
    variant="contained" 
    size="small" 
    onClick={handleClick}
    sx={{ backgroundColor: '#FF0000', color: 'white' }}
>
    Ajustar Stock
</Button>

                {/* Menú para Ajustar Stock */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleAumento}>Aumento</MenuItem>
                  <MenuItem onClick={handleDisminucion}>Disminución</MenuItem>
                </Menu>
              </Grid>
              <Grid item>
              <Button 
    variant="contained" 
    size="small" 
    onClick={handleNuevoProducto}
    sx={{ backgroundColor: '#4CAF50', color: 'white' }}
>
    Nuevo Producto
</Button>

              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider style={{ margin: '20px 0' }} />

      {/* Estadísticas dentro de una tarjeta */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Grid container spacing={3} style={{ marginBottom: '20px' }}>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Unidades en Stock</Typography>
              <Typography variant="body1">{productos.reduce((total, item) => total + item.stock, 0)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Costo Total</Typography>
              <Typography variant="body1">
                {productos.reduce((total, item) => total + item.stock * item.costo, 0).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Valor de Venta Total</Typography>
              <Typography variant="body1">
                {productos.reduce((total, item) => total + item.stock * item.precioVenta, 0).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Lista de productos dentro de una tarjeta */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Lista de Productos
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Código</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Costo</TableCell>
                  <TableCell>Precio de Venta</TableCell>
                  <TableCell>IVA Venta</TableCell>
                  <TableCell>IVA Compra</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Tipo de Producto</TableCell>
                  <TableCell>Proveedor</TableCell>
                  <TableCell>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosPaginados.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.codigo}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.costo}</TableCell>
                    <TableCell>{product.precioVenta}</TableCell>
                    <TableCell>{product.ivaVenta}</TableCell>
                    <TableCell>{product.ivaCompra}</TableCell>
                    <TableCell>{product.tipo}</TableCell>
                    <TableCell>{product.tipoProducto}</TableCell>
                    <TableCell>{product.proveedor}</TableCell>
                    <TableCell>{product.descripcion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <TablePagination
            component="div"
            count={productosFiltrados.length}
            page={paginaActual}
            onPageChange={handleChangePage}
            rowsPerPage={productosPorPagina}
            onRowsPerPageChange={() => {}}
            rowsPerPageOptions={[]}
          />
        </CardContent>

        {/* Botón de exportar pequeño alineado a la izquierda */}
        <CardActions style={{ paddingLeft: '20px', paddingBottom: '10px', width: "20%" }}>
          <Button variant="outlined" size="small" onClick={handleExportarDatos}>
            Exportar Datos
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Productos;
