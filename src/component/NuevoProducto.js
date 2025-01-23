import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  Input,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    estado: false,
    tipo: 'Producto',
    enVenta: false,
    enCompra: false,
    precioVenta: '',
    ivaVenta: 21,
    listaPrecio: '',
    costo: '',
    ivaCompra: 21,
    proveedor: '',
    imagen: null, // Para la imagen
  });

  const [proveedores, setProveedores] = useState([]); // Lista de proveedores
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de obtención de proveedores desde la base de datos
    const fetchProveedores = async () => {
      // Simula obtener proveedores desde la base de datos
      const proveedoresData = [
        { id: 1, nombre: 'Proveedor A' },
        { id: 2, nombre: 'Proveedor B' },
        { id: 3, nombre: 'Proveedor C' },
      ];
      setProveedores(proveedoresData);
    };

    fetchProveedores();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGuardar = () => {
    // Lógica para guardar el producto
    console.log('Producto guardado', producto);
    // Redirigir a otra página o realizar alguna acción
    navigate('/');
  };

  const handleCancelar = () => {
    // Redirigir al listado de productos o hacer alguna otra acción
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProducto((prevState) => ({
        ...prevState,
        imagen: file,
      }));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '75%', marginLeft: '18%' ,marginTop:"90px"}}>
      {/* Título de la sección con tamaño reducido */}
      <Typography variant="h5" gutterBottom style={{ marginBottom: '8px' }}>
        Nuevo Producto
      </Typography>

      <Card style={{ marginBottom: '20px', padding: '10px 15px' }}>
        <CardContent>
          <Grid container spacing={1} direction="column">
            {/* Nombre */}
            <Grid item>
              <TextField
                label="Nombre del Producto"
                variant="outlined"
                fullWidth
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                size="small" // Hace el campo más compacto
              />
            </Grid>

            {/* Código */}
            <Grid item>
              <TextField
                label="Código"
                variant="outlined"
                fullWidth
                name="codigo"
                value={producto.codigo}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Descripción */}
            <Grid item>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Estado */}
            <Grid item container spacing={1}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={producto.estado}
                      onChange={handleChange}
                      name="estado"
                    />
                  }
                  label="Activo"
                  style={{ marginLeft: 0 }} // Alinea mejor el checkbox
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!producto.estado}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: 'estado',
                            value: !producto.estado,
                            type: 'checkbox',
                            checked: !producto.estado,
                          },
                        })
                      }
                    />
                  }
                  label="Desactivo"
                  style={{ marginLeft: 0 }}
                />
              </Grid>
            </Grid>

            {/* Tipo */}
            <Grid item>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Tipo</InputLabel>
                <Select
                  label="Tipo"
                  name="tipo"
                  value={producto.tipo}
                  onChange={handleChange}
                >
                  <MenuItem value="Producto">Producto</MenuItem>
                  <MenuItem value="Servicio">Servicio</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Proveedor */}
            <Grid item>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Proveedor</InputLabel>
                <Select
                  label="Proveedor"
                  name="proveedor"
                  value={producto.proveedor}
                  onChange={handleChange}
                >
                  {proveedores.map((proveedor) => (
                    <MenuItem key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Subir Imagen */}
            <Grid item>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                fullWidth
                inputProps={{ name: 'imagen' }}
                size="small"
              />
              {producto.imagen && (
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '5px' }}>
                  {producto.imagen.name}
                </Typography>
              )}
            </Grid>

            {/* Sección de Venta */}
            <Grid item>
              <Typography variant="h6" gutterBottom style={{ fontSize: '14px' }}>
                Venta
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={producto.enVenta}
                    onChange={handleChange}
                    name="enVenta"
                  />
                }
                label="Mostrar en ventas"
                style={{ marginLeft: 0 }}
              />

              {producto.enVenta && (
                <>
                  <Grid item>
                    <TextField
                      label="Precio de Venta"
                      variant="outlined"
                      fullWidth
                      name="precioVenta"
                      value={producto.precioVenta}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>

                  <Grid item>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>IVA Venta</InputLabel>
                      <Select
                        label="IVA Venta"
                        name="ivaVenta"
                        value={producto.ivaVenta}
                        onChange={handleChange}
                      >
                        <MenuItem value={21}>21%</MenuItem>
                        <MenuItem value={10}>10%</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Lista de Precio"
                      variant="outlined"
                      fullWidth
                      name="listaPrecio"
                      value={producto.listaPrecio}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                </>
              )}
            </Grid>

            {/* Sección de Compra */}
            <Grid item>
              <Typography variant="h6" gutterBottom style={{ fontSize: '14px' }}>
                Compra
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={producto.enCompra}
                    onChange={handleChange}
                    name="enCompra"
                  />
                }
                label="Mostrar en compras"
                style={{ marginLeft: 0 }}
              />

              {producto.enCompra && (
                <>
                  <Grid item>
                    <TextField
                      label="Costo"
                      variant="outlined"
                      fullWidth
                      name="costo"
                      value={producto.costo}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>

                  <Grid item>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>IVA Compra</InputLabel>
                      <Select
                        label="IVA Compra"
                        name="ivaCompra"
                        value={producto.ivaCompra}
                        onChange={handleChange}
                      >
                        <MenuItem value={21}>21%</MenuItem>
                        <MenuItem value={10}>10%</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>

            {/* Botones */}
            <Grid item container spacing={2} justifyContent="flex-end" style={{ marginTop: '10px' }}>
              <Grid item>
                <Button variant="contained" onClick={handleGuardar} style={{ width: '130px' }}>
                  Guardar
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={handleCancelar} style={{ width: '130px' }}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default NuevoProducto;
