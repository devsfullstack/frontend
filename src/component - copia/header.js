import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { Link } from 'react-router-dom'; // Importa Link para navegación
import Logo from '../imagenes/LOGO.png';
import '../../src/headers.css';

const Header = ({ username }) => {
  // Estados para manejar la visibilidad de los submenús
  const [openIngresos, setOpenIngresos] = useState(false);
  const [openEgresos, setOpenEgresos] = useState(false);

  const handleLogout = () => {
    console.log('Cerrar sesión');
  };

  const toggleIngresos = () => {
    setOpenIngresos(!openIngresos); // Alterna el estado del submenú de Ingresos
  };

  const toggleEgresos = () => {
    setOpenEgresos(!openEgresos); // Alterna el estado del submenú de Egresos
  };

  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} />
          <div className="user-info">
            <span className="username">{username}</span>
            <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left">
        <div className="drawer-container">
          <div className="logo-1" style={{ padding: '16px', textAlign: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '60px' }} />
          </div>
          <List>
            {/* Elementos principales del menú sin 'Ventas' */}
            {['Inicio', 'Base de Datos', 'Informes', 'Contabilidad', 'Facturación'].map((text) => (
              <ListItem button key={text}>
                <ListItemText
                  primary={
                    <Link 
                      to={text === 'Inicio' ? '/dashboard' : `#${text.toLowerCase().replace(/\s+/g, '-')}`} 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {text}
                    </Link>
                  }
                />
              </ListItem>
            ))}

            {/* Elemento "Ingresos" con submenú */}
            <ListItem button onClick={toggleIngresos}>
              <ListItemText primary="Ingresos" />
            </ListItem>

            {/* Submenú de Ingresos */}
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

            {/* Elemento "Egresos" con submenú */}
            <ListItem button onClick={toggleEgresos}>
              <ListItemText primary="Egresos" />
            </ListItem>

            {/* Submenú de Egresos */}
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

          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
