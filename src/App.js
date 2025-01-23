import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './component/header'; 
import Dashboard from './component/Dashboard'; 
import Login from './component/login'; 
import SalesSection from './component/SalesSection'; 
import NewSale from './component/NewSaleForm'; 
import Presupuesto from './component/presupuesto'; 
import OtrosIngresos from './component/otros_ingresos'; 
import Facturar from './component/facturar'; 
import Compras from './component/compras'; 
import NuevaCompra from './component/nuevacompra'; 
import Usuarios from './component/usuarios'; // Importa el componente de usuarios
import EditarUsuarios from './component/editarusuarios'; // Importa el componente de usuarios
import NuevoIngreso from './component/NuevoIngreso'; // Asegúrate de tener la ruta correcta
import Gastos from './component/gastos';
import NuevoGasto from './component/NuevoGasto';
import NuevoPresupuesto from './component/NuevoPresupuesto';
import Productos from './component/productos';
import NuevoProducto from './component/NuevoProducto';
import NuevoAumento from './component/NuevoAumento';
import NuevoDisminucion from './component/NuevaDisminucion';
import Proveedores from './component/proveedores'; 
import './App.css';
import NuevoProveedor from './component/NuevoProveedor';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Mejor manejo inicial del estado
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/api/usuario-logueado', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUsername(response.data.username);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const handleLogin = (usuario, token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUsername(usuario);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal para login */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />

        {/* Ruta protegida del dashboard */}
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? (
            <>
              <Header username={username} onLogout={handleLogout} />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/" />
          )} 
        />

        {/* Rutas protegidas */}
        {isLoggedIn ? (
          <>
            <Route path="/compras" element={<><Header username={username} onLogout={handleLogout} /><Compras /></>} />
            <Route path="/ventas" element={<><Header username={username} onLogout={handleLogout} /><SalesSection /></>} />
            <Route path="/nueva-venta" element={<><Header username={username} onLogout={handleLogout} /><NewSale /></>} />
            <Route path="/presupuesto" element={<><Header username={username} onLogout={handleLogout} /><Presupuesto /></>} />
            <Route path="/otros-ingresos" element={<><Header username={username} onLogout={handleLogout} /><OtrosIngresos /></>} />
            <Route path="/facturar" element={<><Header username={username} onLogout={handleLogout} /><Facturar /></>} />
            <Route path="/nueva-compra" element={<><Header username={username} onLogout={handleLogout} /><NuevaCompra /></>} />
            <Route path="/editarusuarios" element={<><Header username={username} onLogout={handleLogout} /><EditarUsuarios /></>} />
            <Route path="/nuevo-ingreso" element={<><Header username={username} onLogout={handleLogout} /><NuevoIngreso /></>} />
            <Route path="/gastos" element={<><Header username={username} onLogout={handleLogout} /><Gastos/></>} />
            <Route path="/gastos" element={<><Header username={username} onLogout={handleLogout} /><Gastos/></>} />
            {/* Ruta para la gestión de usuarios */}
            <Route path="/usuarios" element={<><Header username={username} onLogout={handleLogout} /><Usuarios /></>} />
            <Route path="/nuevo-gasto" element={<><Header username={username} onLogout={handleLogout} /><NuevoGasto /></>} />
            <Route path="/nuevo-presupuesto" element={<><Header username={username} onLogout={handleLogout} /><NuevoPresupuesto /></>} />
            <Route path="/productos" element={<><Header username={username} onLogout={handleLogout} /><Productos /></>} />
            <Route path="/nuevo-producto" element={<><Header username={username} onLogout={handleLogout} /><NuevoProducto /></>} />
            <Route path="/nuevo-aumento" element={<><Header username={username} onLogout={handleLogout} /><NuevoAumento /></>} />
            <Route path="/nueva-disminucion" element={<><Header username={username} onLogout={handleLogout} /><NuevoDisminucion /></>} />
            <Route path="/proveedores" element={<><Header username={username} onLogout={handleLogout} /><Proveedores/></>} />

            <Route path="/nuevo-proveedor" element={<><Header username={username} onLogout={handleLogout} /><NuevoProveedor /></>} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
