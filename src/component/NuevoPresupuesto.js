import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NuevoPresupuesto = () => {
  const [fechaEmision, setFechaEmision] = useState('');
  const [fechaValidez, setFechaValidez] = useState('');
  const [cliente, setCliente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [formaPago, setFormaPago] = useState('');
  const [metodoEnvio, setMetodoEnvio] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [productos, setProductos] = useState([]);
  const [notaCliente, setNotaCliente] = useState('');
  const [notaInterna, setNotaInterna] = useState('');
  const [descuentoGeneral, setDescuentoGeneral] = useState(0);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    const subtotal = cantidad * precio;
    const iva = subtotal * 0.21; // Ejemplo de IVA al 21%
    const total = subtotal + iva;

    setProductos([
      ...productos,
      { producto, cantidad, precio, subtotal, iva, total, descuento }
    ]);

    setProducto('');
    setCantidad(1);
    setPrecio('');
    setDescuento(0);
  };

  const handleDeleteProduct = (index) => {
    const newProducts = [...productos];
    newProducts.splice(index, 1);
    setProductos(newProducts);
  };

  const calculateTotal = () => {
    const subtotalGeneral = productos.reduce((acc, item) => acc + item.subtotal, 0);
    const ivaGeneral = productos.reduce((acc, item) => acc + item.iva, 0);
    const totalGeneral = subtotalGeneral + ivaGeneral;
    const descuentoFinal = (descuentoGeneral / 100) * totalGeneral;
    return totalGeneral - descuentoFinal;
  };

  const handleSubmit = () => {
    // Lógica para guardar o enviar el presupuesto
    console.log('Presupuesto enviado:', {
      fechaEmision,
      fechaValidez,
      cliente,
      categoria,
      formaPago,
      metodoEnvio,
      productos,
      notaCliente,
      notaInterna,
      descuentoGeneral,
    });
    navigate('/presupuestos'); // Redirigir a la página de presupuestos
  };

  return (
    <div style={{ marginTop: '110px', padding: '20px', maxWidth: '70%', marginLeft: '20%' }}>
      <Typography variant="h4" gutterBottom>
        Nuevo Presupuesto
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Cliente y categoría */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Fechas */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Fecha de Emisión"
              type="date"
              value={fechaEmision}
              onChange={(e) => setFechaEmision(e.target.value)}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Fecha de Validez"
              type="date"
              value={fechaValidez}
              onChange={(e) => setFechaValidez(e.target.value)}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Forma de pago y método de envío */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Forma de Pago"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Método de Envío"
              value={metodoEnvio}
              onChange={(e) => setMetodoEnvio(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Productos */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Seleccionar o Crear Productos
            </Typography>

            <Box style={{ marginBottom: '20px' }}>
              <TextField
                label="Producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                variant="outlined"
                style={{ marginTop: '10px' }}
                fullWidth
              />
              <TextField
                label="Precio"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(Number(e.target.value))}
                variant="outlined"
                style={{ marginTop: '10px' }}
                fullWidth
              />
              <TextField
                label="Descuento (%)"
                type="number"
                value={descuento}
                onChange={(e) => setDescuento(Number(e.target.value))}
                variant="outlined"
                style={{ marginTop: '10px' }}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                style={{ marginTop: '10px' }}
              >
                Agregar Producto
              </Button>
            </Box>

            <div style={{ marginTop: '20px' }}>
              {productos.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <Typography>
                    {item.producto} - Cantidad: {item.cantidad} - Precio: {item.precio} - Subtotal: {item.subtotal} - IVA: {item.iva} - Total: {item.total}
                  </Typography>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteProduct(index)}>
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          </Grid>

          {/* Notas */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Nota para el Cliente"
              multiline
              rows={4}
              value={notaCliente}
              onChange={(e) => setNotaCliente(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nota Interna"
              multiline
              rows={4}
              value={notaInterna}
              onChange={(e) => setNotaInterna(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Descuento general */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Descuento General (%)"
              type="number"
              value={descuentoGeneral}
              onChange={(e) => setDescuentoGeneral(Number(e.target.value))}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Total y botones */}
        <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

        <Typography variant="h6">
          Total Presupuesto: {calculateTotal()}
        </Typography>

        {/* Botones en fila horizontal */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <Button variant="outlined" color="secondary" style={{ flex: 1 }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" style={{ flex: 1 }}>
            Guardar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ flex: 1 }}>
            Guardar y Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
