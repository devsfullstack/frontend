import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NuevoAumento = () => {
  const [cantidad, setCantidad] = useState('');
  const [producto, setProducto] = useState('');
  const [notaInterna, setNotaInterna] = useState('');
  const navigate = useNavigate();

  // Manejar el formulario de envío
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAumento = { cantidad, producto, notaInterna };
    console.log('Nuevo Aumento:', nuevoAumento);
    navigate('/aumentos');
  };

  // Cancelar y volver
  const handleCancel = () => {
    navigate('/aumentos');
  };

  return (
    <div style={{ marginTop: '120px', padding: '20px', maxWidth: '75%', marginLeft: '18%' }}>
      <Typography variant="h4" gutterBottom>Nuevo Aumento</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Producto</InputLabel>
              <Select
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                label="Producto"
              >
                {/* Agregar productos dinámicamente desde tu base de datos */}
                <MenuItem value="Producto A">Producto A</MenuItem>
                <MenuItem value="Producto B">Producto B</MenuItem>
                <MenuItem value="Producto C">Producto C</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Nota Interna"
              value={notaInterna}
              onChange={(e) => setNotaInterna(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" onClick={handleCancel} style={{ width: '120px' }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" type="submit" style={{ width: '120px' }}>
            Crear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NuevoAumento;
