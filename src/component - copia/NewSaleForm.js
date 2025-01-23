import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';

const NewSaleForm = ({ onSave, onCancel }) => {
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [emissionDate, setEmissionDate] = useState('');
  const [serviceStartDate, setServiceStartDate] = useState('');
  const [serviceEndDate, setServiceEndDate] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleSave = () => {
    const newSale = {
      id: Math.random(), // Asigna un ID único
      emissionDate,
      dueDate: serviceEndDate, // Puedes ajustar esto según tu lógica
      client,
      category,
      subtotal: price * quantity,
      discount,
    };
    onSave(newSale);
  };

  return (
    <Box 
      mt={10} // Aumenta el margen superior para bajar el contenido
      p={2} 
      border={1} 
      borderColor="grey.400" 
      maxWidth={600} 
      mx="auto" 
      minHeight={400}
    >
      <Typography variant="h5" gutterBottom>
        Nueva Venta
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField 
            label="Cliente" 
            fullWidth 
            value={client} 
            onChange={(e) => setClient(e.target.value)} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            label="Categoría" 
            fullWidth 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Fecha de Emisión"
            type="date"
            fullWidth
            value={emissionDate}
            onChange={(e) => setEmissionDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Fecha de Servicio Desde"
            type="date"
            fullWidth
            value={serviceStartDate}
            onChange={(e) => setServiceStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Fecha de Servicio Hasta"
            type="date"
            fullWidth
            value={serviceEndDate}
            onChange={(e) => setServiceEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            label="Producto" 
            fullWidth 
            value={product} 
            onChange={(e) => setProduct(e.target.value)} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Cantidad"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Precio"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Descuento"
            type="number"
            fullWidth
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default NewSaleForm;
