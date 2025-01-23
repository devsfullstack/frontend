import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../imagenes/LOGO.png';  // Importa el logo

const Facturar = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [cuit, setCuit] = useState('');
  const [tipoFactura, setTipoFactura] = useState('');
  const [condicionIva, setCondicionIva] = useState('');
  const [telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [fechaEmision, setFechaEmision] = useState('');
  const [ingresosBrutos, setIngresosBrutos] = useState('');
  const [productos, setProductos] = useState([{ productoId: '', cantidad: '', precio: '' }]);
  const [productosDisponibles, setProductosDisponibles] = useState([]); // Lista de productos disponibles
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate(); // Hook para la redirección

  // Función para obtener los productos de la base de datos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        if (response.ok) {
          setProductosDisponibles(data); // Almacenar los productos obtenidos
        } else {
          setSnackbarMessage('Error al cargar los productos.');
          setOpenSnackbar(true);
        }
      } catch (error) {
        setSnackbarMessage('Error al obtener productos.');
        setOpenSnackbar(true);
      }
    };
    fetchProductos();
  }, []);

  // Calcular el subtotal, IVA y total de la factura
  const calcularTotales = () => {
    let subtotal = 0;
    productos.forEach((producto) => {
      if (producto.precio && producto.cantidad) {
        subtotal += parseFloat(producto.precio) * parseFloat(producto.cantidad);
      }
    });

    // Aplicar IVA (si es necesario)
    const iva = condicionIva === 'Responsable Inscripto' ? subtotal * 0.21 : 0;
    const total = subtotal + iva;

    return { subtotal, iva, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !razonSocial || !cuit || !tipoFactura || !condicionIva || !telefono || !domicilio || !fechaEmision || !ingresosBrutos || productos.some(p => !p.productoId || !p.cantidad || !p.precio)) {
      setSnackbarMessage('Por favor, complete todos los campos.');
      setOpenSnackbar(true);
      return;
    }

    const datosFactura = { nombre, apellido, razonSocial, cuit, tipoFactura, condicionIva, telefono, domicilio, fechaEmision, ingresosBrutos, productos };

    try {
      const response = await fetch('http://localhost:3000/facturar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFactura),
      });

      const data = await response.json();
      if (!response.ok) {
        setSnackbarMessage(data.error || 'Error al generar la factura.');
      } else {
        setSnackbarMessage('Factura generada con éxito.');
        navigate('/ventas'); // Redirige a la página de ventas o cualquier otra página
      }
    } catch (error) {
      setSnackbarMessage('Error en la conexión con el servidor.');
    }

    setOpenSnackbar(true);
  };

  const handleProductoChange = (index, field, value) => {
    const newProductos = [...productos];
    newProductos[index][field] = value;
    setProductos(newProductos);
  };

  const addProducto = () => {
    setProductos([...productos, { productoId: '', cantidad: '', precio: '' }]);
  };

  const { subtotal, iva, total } = calcularTotales();

  return (
    <div style={{ padding: '32px', marginLeft: '250px', marginTop: '80px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={6} style={{ padding: '20px', borderRadius: '15px' }}>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Generar Factura
            </Typography>

            {/* Logo de la empresa */}
            <Grid item xs={12}>
              <img
                src={Logo}
                alt="Logo Producto Oceánico"
                style={{ width: '150px', marginBottom: '20px' }}
              />
            </Grid>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Empresa */}
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ marginBottom: '20px' }}>
                    PRODUCTO OCEANICO SRL
                  </Typography>
                  <Box>
                    <Typography>Santa Magdalena 309, Caba - 1277 - Caba - Buenos Aires</Typography>
                    <Typography>Tel: 7546-2063</Typography>
                    <Typography>productooceanicopatricio@gmail.com</Typography>
                    <Typography>www.productooceanico.com.ar</Typography>
                  </Box>
                </Grid>

                {/* Cliente */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Razón Social"
                    variant="outlined"
                    fullWidth
                    value={razonSocial}
                    onChange={(e) => setRazonSocial(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="CUIT"
                    variant="outlined"
                    fullWidth
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tipo de Factura"
                    variant="outlined"
                    fullWidth
                    value={tipoFactura}
                    onChange={(e) => setTipoFactura(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Condición IVA"
                    variant="outlined"
                    fullWidth
                    value={condicionIva}
                    onChange={(e) => setCondicionIva(e.target.value)}
                  />
                </Grid>

                {/* Datos adicionales */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Domicilio"
                    variant="outlined"
                    fullWidth
                    value={domicilio}
                    onChange={(e) => setDomicilio(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de Emisión"
                    variant="outlined"
                    fullWidth
                    type="date"
                    value={fechaEmision}
                    onChange={(e) => setFechaEmision(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de Vencimiento de pago"
                    variant="outlined"
                    fullWidth
                    type="date"
                    value={fechaEmision}
                    onChange={(e) => setFechaEmision(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ingresos Brutos"
                    variant="outlined"
                    fullWidth
                    value={ingresosBrutos}
                    onChange={(e) => setIngresosBrutos(e.target.value)}
                    type="number"
                  />
                </Grid>

                {/* Productos */}
                {productos.map((producto, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                      <FormControl fullWidth>
                        <InputLabel>Seleccionar Producto</InputLabel>
                        <Select
                          label="Seleccionar Producto"
                          value={producto.productoId}
                          onChange={(e) => handleProductoChange(index, 'productoId', e.target.value)}
                        >
                          {productosDisponibles.map((prod) => (
                            <MenuItem key={prod.id} value={prod.id}>
                              {prod.descripcion} - ${prod.precio}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        label="Cantidad"
                        variant="outlined"
                        fullWidth
                        value={producto.cantidad}
                        onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                        type="number"
                      />
                      <TextField
                        label="Precio"
                        variant="outlined"
                        fullWidth
                        value={producto.precio}
                        onChange={(e) => handleProductoChange(index, 'precio', e.target.value)}
                        type="number"
                        disabled
                      />
                    </Paper>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={addProducto}
                    style={{ marginBottom: '20px' }}
                  >
                    Agregar Producto
                  </Button>
                </Grid>

                {/* Totales */}
                <Grid item xs={12}>
                  <Typography variant="h6">Totales:</Typography>
                  <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
                  <Typography>IVA (21%): ${iva.toFixed(2)}</Typography>
                  <Typography>Total: ${total.toFixed(2)}</Typography>
                </Grid>

                {/* Botón para generar factura */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ padding: '10px 20px' }}
                  >
                    Generar Factura
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Facturar;
