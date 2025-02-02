import React, { useState } from 'react';
import Axios from 'axios';
import Logo from '../imagenes/LOGO.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material'; // Importa Avatar correctamente desde MUI

const Login = ({ onLogin }) => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!usuario || !contraseña) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await Axios.post('http://localhost:3001/api/login', {
                usuario,
                contraseña,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setSuccessMessage('Inicio de sesión exitoso');
                onLogin(usuario);
                navigate('/dashboard');
            } else {
                setError(response.data.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                {/* Avatar de Material UI con tamaño personalizado */}
                <Avatar 
                    src="https://via.placeholder.com/150" 
                    alt="Avatar"
                    sx={{ width: 100, height: 100, margin: '0 auto' }} 
                />
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input 
                            type="text" 
                            id="usuario" 
                            value={usuario} 
                            onChange={(e) => setUsuario(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input 
                            type="password" 
                            id="contraseña" 
                            value={contraseña} 
                            onChange={(e) => setContraseña(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <div className="logo-container">
                <img src={Logo} alt="Logo" className="logo" />
                <p className="text">Productos Oceánicos</p>
            </div>
        </div>
    );
};

export default Login;
