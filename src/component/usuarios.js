import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, FormControl, InputLabel, Select, MenuItem, Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    cargo: '',
    contraseña: '',
    rol: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { usuario, nombre, apellido, correo, direccion, cargo, contraseña, rol } = formData;

    if (!usuario || !nombre || !apellido || !correo || !direccion || !cargo || !contraseña || !rol) {
      setMessage('Todos los campos son requeridos.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(correo)) {
      setMessage('El formato del correo electrónico es inválido.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3001/api/user', {
        ...formData,
        fecha_registro: new Date().toISOString(),
      });
      setMessage('Usuario creado exitosamente.');
      setFormData({ usuario: '', nombre: '', apellido: '', correo: '', direccion: '', cargo: '', contraseña: '', rol: '' });
      navigate('/usuarios');
    } catch (error) {
      setMessage(error.response?.data.message || 'Error al crear el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          marginTop: '120px', // Aquí se agrega el margen superior
          padding: '32px',
          borderRadius: '16px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Crear Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: 'Usuario', name: 'usuario' },
              { label: 'Contraseña', name: 'contraseña', type: 'password' },
              { label: 'Apellido', name: 'apellido' },
              { label: 'Nombre', name: 'nombre' },
              { label: 'Dirección', name: 'direccion' },
              { label: 'Cargo', name: 'cargo' },
              { label: 'Correo', name: 'correo' },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  variant="outlined"
                  fullWidth
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">Empleado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Usuario'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {message && (
          <Typography
            variant="body1"
            color={message.includes('exitosamente') ? 'green' : 'red'}
            style={{ marginTop: '20px', textAlign: 'center' }}
          >
            {message}
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default Usuarios;
