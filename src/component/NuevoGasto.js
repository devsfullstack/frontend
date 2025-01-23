import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NuevoGasto = () => {
  const [fecha, setFecha] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [pendiente, setPendiente] = useState(false);
  const navigate = useNavigate();

  // Manejar el formulario de envío
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoGasto = {
      fecha,
      monto,
      categoria,
      metodoPago,
      descripcion,
      pendiente,
    };

    // Lógica para crear el nuevo gasto (enviar a la API o manejarlo localmente)
    console.log('Nuevo gasto:', nuevoGasto);

    // Redirigir de vuelta a la página de gastos
    navigate('/gastos');
  };

  // Cancelar y volver
  const handleCancel = () => {
    navigate('/gastos');
  };

  return (
    <div style={{ marginTop: '120px', padding: '30px', maxWidth: '70%', marginLeft: '18%' }}>
      <Typography variant="h4" gutterBottom>Nuevo Gasto</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
            <TextField
              label="Monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Método de Pago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={<Checkbox checked={pendiente} onChange={(e) => setPendiente(e.target.checked)} />}
              label="Marcar como Pendiente"
            />
          </Grid>
        </Grid>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' ,gap:"10px",width:"60%"}}>
        <Button 
  variant="contained" 
  color="error"  // Rojo de fondo
  onClick={handleCancel}
  style={{ color: 'white' }} // Texto blanco
>
  Cancelar
</Button>

<Button 
  variant="contained" 
  color="success" // Verde de fondo
  type="submit"
  style={{ color: 'white' }} // Texto blanco
>
  Crear
</Button>

        </div>
      </form>
    </div>
  );
};

export default NuevoGasto;
