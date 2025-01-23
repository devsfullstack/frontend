import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../imagenes/LOGO.png';
import '../../src/headers.css';

const Header = ({ username, onLogout }) => {
  const [openIngresos, setOpenIngresos] = useState(false);
  const [openEgresos, setOpenEgresos] = useState(false);
  const [openBaseDeDatos, setOpenBaseDeDatos] = useState(false);
  const [openUsuarios, setOpenUsuarios] = useState(false); // Nuevo estado para "Usuarios"
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    axios.get('/api/usuario-logueado', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el nombre del usuario:', error);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    console.log('Cerrar sesión');
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    // Limpiar el estado de usuario
    onLogout();
    // Redirigir a la página de login
    navigate('/login');
  };

  const toggleIngresos = () => setOpenIngresos(!openIngresos);
  const toggleEgresos = () => setOpenEgresos(!openEgresos);
  const toggleBaseDeDatos = () => setOpenBaseDeDatos(!openBaseDeDatos);
  const toggleUsuarios = () => setOpenUsuarios(!openUsuarios); // Función para manejar el toggle de "Usuarios"

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} />
          <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
            {loading ? (
              <span>Cargando...</span>
            ) : (
              <span className="username" style={{ marginRight: '10px' }}>{username}</span> // Nombre de usuario
            )}
            <button onClick={handleLogout} className="logout-button" style={{ marginLeft: '10px' }}>Cerrar sesión</button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left">
        <div className="drawer-container">
          <div className="logo-1" style={{ padding: '16px', textAlign: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '60px' }} />
          </div>
          <List>
            {['Inicio', 'Informes', 'Contabilidad'].map((text) => (
              <ListItem button key={text}>
                <ListItemText
                  primary={<Link to={text === 'Inicio' ? '/dashboard' : `#${text.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{text}</Link>}
                />
              </ListItem>
            ))}
            <ListItem button onClick={toggleBaseDeDatos}>
              <ListItemText primary="Base de Datos" />
            </ListItem>
            <Collapse in={openBaseDeDatos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/clientes" style={{ textDecoration: 'none', color: 'inherit' }}>Clientes</Link>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/proveedores" style={{ textDecoration: 'none', color: 'inherit' }}>Proveedores</Link>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/productos" style={{ textDecoration: 'none', color: 'inherit' }}>Productos</Link>} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button>
              <ListItemText primary={<Link to="/facturar" style={{ textDecoration: 'none', color: 'inherit' }}>Facturación</Link>} />
            </ListItem>
            <ListItem button onClick={toggleIngresos}>
              <ListItemText primary="Ingresos" />
            </ListItem>
            <Collapse in={openIngresos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/presupuesto" style={{ textDecoration: 'none', color: 'inherit' }}>Presupuesto</Link>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/ventas" style={{ textDecoration: 'none', color: 'inherit' }}>Ventas</Link>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/otros-ingresos" style={{ textDecoration: 'none', color: 'inherit' }}>Otros Ingresos</Link>} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={toggleEgresos}>
              <ListItemText primary="Egresos" />
            </ListItem>
            <Collapse in={openEgresos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/compras" style={{ textDecoration: 'none', color: 'inherit' }}>Compras</Link>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/gastos" style={{ textDecoration: 'none', color: 'inherit' }}>Gastos</Link>} />
                </ListItem>
              </List>
            </Collapse>
            {/* Nueva sección de Usuarios */}
            <ListItem button onClick={toggleUsuarios}>
              <ListItemText primary="Usuarios" />
            </ListItem>
            <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/usuarios" style={{ textDecoration: 'none', color: 'inherit' }}>Nuevo Usuarios</Link>} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary={<Link to="/editarusuarios" style={{ textDecoration: 'none', color: 'inherit' }}>Editar Usuarios</Link>} />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
