import React, { useState, useEffect } from 'react';
import { Container, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Obtener el token del localStorage o cookies
  const token = localStorage.getItem('token'); // O la forma en que almacenes el token

  // Obtener la lista de usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        // Verificar si el token existe
        if (!token) {
          console.error('Token no encontrado');
          return;
        }

        // Realizar la solicitud con el token en el encabezado Authorization
        const response = await axios.get('http://localhost:3001/api/todos-los-usuarios', {
          headers: {
            Authorization: `Bearer ${token}`, // Pasar el token en el header
          },
        });

        if (response && response.data) {
          setUsuarios(response.data); // Asignar los usuarios a la lista
        } else {
          console.error('No se encontraron usuarios');
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [token]); // Ejecutar una vez al cargar el componente, sólo si el token está disponible

  // Función para eliminar un usuario
  const handleDelete = async (id) => {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Asegúrate de pasar el token en la eliminación
        });

        if (response.status === 200) {
          setUsuarios(usuarios.filter((usuario) => usuario.id !== id)); // Actualiza la lista de usuarios después de eliminar
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  // Función para navegar al formulario de edición
  const handleEdit = (id) => {
    navigate(`/editar-usuario/${id}`);
  };

  return (
    <Container style={{ marginTop: '150px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Editar Usuarios
      </Typography>

      {loading ? (
        <Typography variant="h6" align="center">Cargando usuarios...</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Fecha Registro</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.usuario}</TableCell>
                  <TableCell>{usuario.nombre} {usuario.apellido}</TableCell>
                  <TableCell>{usuario.email}</TableCell> {/* Cambié correo por email */}
                  <TableCell>{usuario.cargo}</TableCell>
                  <TableCell>{usuario.direccion}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                  <TableCell>{usuario.fecha_registro}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(usuario.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(usuario.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default EditarUsuarios;
