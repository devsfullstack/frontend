import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Select, MenuItem, InputLabel, FormControl, InputAdornment } from '@mui/material';

const NuevaCompra = () => {
  const [proveedor, setProveedor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [contador, setContador] = useState('');
  const [emision, setEmision] = useState('');
  const [vencimientoPago, setVencimientoPago] = useState('');
  const [tipoCompra, setTipoCompra] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const [notaInterna, setNotaInterna] = useState('');

  // Función para calcular los totales
  const calcularTotales = () => {
    const subtotalCalculado = cantidad * precio - descuento;
    const ivaCalculado = subtotalCalculado * 0.21; // Suponiendo un IVA del 21%
    const totalCalculado = subtotalCalculado + ivaCalculado;
    setSubtotal(subtotalCalculado);
    setIva(ivaCalculado);
    setTotal(totalCalculado);
  };

  return (
    <div style={{ padding: '32px', marginLeft: '250px', marginTop: '80px' }}>
      <Grid container spacing={3}>
        {/* Formulario de Nueva Compra */}
        <Grid item xs={12}>
          <Paper elevation={6} style={{ padding: '20px', borderRadius: '15px' }}>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>Nueva Compra</Typography>
            
            <Grid container spacing={3}>
              {/* Proveedor */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Proveedor</InputLabel>
                  <Select
                    value={proveedor}
                    onChange={(e) => setProveedor(e.target.value)}
                    label="Proveedor"
                  >
                    <MenuItem value="Proveedor A">Proveedor A</MenuItem>
                    <MenuItem value="Proveedor B">Proveedor B</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Categoria */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    label="Categoría"
                  >
                    <MenuItem value="Categoría 1">Categoría 1</MenuItem>
                    <MenuItem value="Categoría 2">Categoría 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Contador */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Contador"
                  variant="outlined"
                  fullWidth
                  value={contador}
                  onChange={(e) => setContador(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              {/* Emisión */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Emisión"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={emision}
                  onChange={(e) => setEmision(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Vencimiento de Pago */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Vencimiento Pago"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={vencimientoPago}
                  onChange={(e) => setVencimientoPago(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Tipo de Compra */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Compra</InputLabel>
                  <Select
                    value={tipoCompra}
                    onChange={(e) => setTipoCompra(e.target.value)}
                    label="Tipo de Compra"
                  >
                    <MenuItem value="Compra A">Compra A</MenuItem>
                    <MenuItem value="Compra B">Compra B</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              {/* Producto */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Producto"
                  variant="outlined"
                  fullWidth
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                />
              </Grid>

              {/* Cantidad */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Cantidad"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  onBlur={calcularTotales}
                />
              </Grid>

              {/* Precio */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Precio"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  onBlur={calcularTotales}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              {/* Descuento */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Descuento"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                  onBlur={calcularTotales}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>

              {/* Subtotal */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Subtotal"
                  variant="outlined"
                  fullWidth
                  value={subtotal}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* IVA */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="IVA"
                  variant="outlined"
                  fullWidth
                  value={iva}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              {/* Total */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Total"
                  variant="outlined"
                  fullWidth
                  value={total}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Nota Interna */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Nota Interna"
                  variant="outlined"
                  fullWidth
                  value={notaInterna}
                  onChange={(e) => setNotaInterna(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              {/* Botones de Guardar y Eliminar */}
              <Grid item xs={6} md={3}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  size="small"
                  onClick={() => console.log("Eliminar")}
                >
                  Eliminar
                </Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  size="small"
                  onClick={() => console.log("Guardar")}
                >
                  Guardar Compra
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default NuevaCompra;
