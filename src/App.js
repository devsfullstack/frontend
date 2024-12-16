import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './component/header'; // Asegúrate de que la ruta sea correcta
import Dashboard from './component/Dashboard'; // Asegúrate de que la ruta sea correcta
import Login from './component/login'; // Asegúrate de que la ruta sea correcta
import SalesSection from './component/SalesSection'; // Asegúrate de que la ruta sea correcta
import NewSale from './component/NewSaleForm'; // Asegúrate de que este componente exista
import Presupuesto from './component/presupuesto'; // Asegúrate de que la ruta sea correcta
import OtrosIngresos from './component/otros_ingresos'; // Importamos el componente de Otros Ingresos
import './App.css'; // Asegúrate de que la ruta sea correcta

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación

  const handleLogin = (usuario) => {
    setIsLoggedIn(true); // Cambiar estado a autenticado
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal para login */}
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" /> // Redirige al dashboard si está autenticado
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        
        {/* Ruta para el dashboard */}
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn ? (
              <>
                <Header username="UsuarioEjemplo" /> {/* Muestra el Header solo si está autenticado */}
                <Dashboard />
              </>
            ) : (
              <Navigate to="/" />
            )
          } 
        />

        {/* Ruta para la sección de ventas */}
        <Route 
          path="/ventas" 
          element={
            isLoggedIn ? (
              <>
                <Header username="UsuarioEjemplo" />
                <SalesSection />
              </>
            ) : (
              <Navigate to="/" />
            )
          } 
        />

        {/* Ruta para la creación de nueva venta */}
        <Route 
          path="/nueva-venta" 
          element={
            isLoggedIn ? (
              <>
                <Header username="UsuarioEjemplo" />
                <NewSale /> {/* Componente para manejar la nueva venta */}
              </>
            ) : (
              <Navigate to="/" />
            )
          } 
        />

        {/* Ruta para la sección de Presupuesto */}
        <Route 
          path="/presupuesto" 
          element={
            isLoggedIn ? (
              <>
                <Header username="UsuarioEjemplo" />
                <Presupuesto /> {/* Componente para manejar los presupuestos */}
              </>
            ) : (
              <Navigate to="/" />
            )
          } 
        />

        {/* Ruta para la sección de Otros Ingresos */}
        <Route 
          path="/otros-ingresos" 
          element={
            isLoggedIn ? (
              <>
                <Header username="UsuarioEjemplo" />
                <OtrosIngresos /> {/* Componente de Otros Ingresos */}
              </>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
