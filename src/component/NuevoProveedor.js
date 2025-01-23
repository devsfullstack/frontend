import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Box, FormControl, Select, MenuItem, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const NuevoProveedor = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    telefono: '',
    direccion: '',
    localidad: '',
    provincia: '',
    paginaWeb: '',
    cp: '',
    nota: '',
    categoria: '',
    descuento: '',
    notaInterna: '',
    razonSocial: '',
    cuit: '',
    iva: 'inscripto',
    comprobante: 'A',
    telefonoFiscal: '',
    domicilioFiscal: '',
    localidadFiscal: '',
    provinciaFiscal: '',
    cpFiscal: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí iría el código para guardar el proveedor
  };

  const handleCancel = () => {
    // Aquí iría el código para cancelar el formulario (limpiar o redirigir)
  };

  return (
    <div style={{ marginTop: '120px', padding: '10px', maxWidth: '70%', marginLeft: '20%' }}>
      <Typography variant="h4" gutterBottom>Nuevo Proveedor</Typography>

      {/* Formulario de Proveedor */}
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>Datos del Proveedor</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              name="mail"
              value={formData.mail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Localidad"
              variant="outlined"
              fullWidth
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Provincia"
              variant="outlined"
              fullWidth
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Página Web"
              variant="outlined"
              fullWidth
              name="paginaWeb"
              value={formData.paginaWeb}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Código Postal"
              variant="outlined"
              fullWidth
              name="cp"
              value={formData.cp}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nota"
              variant="outlined"
              fullWidth
              name="nota"
              value={formData.nota}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Sección de Compras */}
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>Compras</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Buscar Categoría"
              variant="outlined"
              fullWidth
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Porcentaje de Descuento"
              variant="outlined"
              fullWidth
              name="descuento"
              value={formData.descuento}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nota Interna"
              variant="outlined"
              fullWidth
              name="notaInterna"
              value={formData.notaInterna}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Sección de Datos de Facturación */}
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>Datos de Facturación</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Razón Social"
              variant="outlined"
              fullWidth
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CUIT"
              variant="outlined"
              fullWidth
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Condición IVA</InputLabel>
              <Select
                name="iva"
                value={formData.iva}
                onChange={handleChange}
                label="Condición IVA"
              >
                <MenuItem value="inscripto">Inscripto</MenuItem>
                <MenuItem value="no_inscripto">No Inscripto</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Comprobante</InputLabel>
              <Select
                name="comprobante"
                value={formData.comprobante}
                onChange={handleChange}
                label="Comprobante"
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Teléfono Fiscal"
              variant="outlined"
              fullWidth
              name="telefonoFiscal"
              value={formData.telefonoFiscal}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Domicilio Fiscal"
              variant="outlined"
              fullWidth
              name="domicilioFiscal"
              value={formData.domicilioFiscal}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Localidad Fiscal"
              variant="outlined"
              fullWidth
              name="localidadFiscal"
              value={formData.localidadFiscal}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Provincia Fiscal"
              variant="outlined"
              fullWidth
              name="provinciaFiscal"
              value={formData.provinciaFiscal}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Código Postal Fiscal"
              variant="outlined"
              fullWidth
              name="cpFiscal"
              value={formData.cpFiscal}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Paper>

     {/* Botones Crear y Cancelar */}
<Box display="flex" justifyContent="space-between" style={{ marginTop: '20px' }}>
    {/* Botón verde */}
    <Button 
        variant="contained" 
        style={{ 
            backgroundColor: '#4CAF50',  // Verde
            color: 'white',
            width: '48%' 
        }} 
        onClick={handleSubmit}
    >
        Crear
    </Button>

    {/* Botón rojo */}
    <Button 
        variant="contained" 
        style={{ 
            backgroundColor: '#F44336',  // Rojo
            color: 'white',
            width: '48%' 
        }} 
        onClick={handleCancel}
    >
        Cancelar
    </Button>
</Box>

    </div>
  );
};

export default NuevoProveedor;
