import React, { useState } from 'react';
import Axios from 'axios'; // Asegúrate de instalar Axios con `npm install axios`
import Logo from '../imagenes/LOGO.png'; // Ajusta la ruta según tu estructura
import '../App.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = ({ onLogin }) => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

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

            console.log(response.data); // Para depuración

            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Almacena el token
                setSuccessMessage('Inicio de sesión exitoso');
                onLogin(usuario); // Llama a la función de inicio de sesión con el nombre de usuario
                navigate('/dashboard'); // Redirige al dashboard
            } else {
                setError(response.data.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            console.error(err);
            setError(err.response ? err.response.data.error : 'Error al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <img src="https://via.placeholder.com/100" alt="Avatar" className="avatar" />
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
                            onChange={(e) => {
                                setUsuario(e.target.value);
                                setError('');
                                setSuccessMessage('');
                            }} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input 
                            type="password" 
                            id="contraseña" 
                            value={contraseña} 
                            onChange={(e) => {
                                setContraseña(e.target.value);
                                setError('');
                                setSuccessMessage('');
                            }} 
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
