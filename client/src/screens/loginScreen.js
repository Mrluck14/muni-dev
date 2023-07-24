import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await axios.post('/login', formData);
      const { redirectTo, activo, error: serverError } = response.data;

      if (!activo) {
        setError(serverError || 'La cuenta está desactivada. Por favor, contacta al administrador.');
      } else {
        // Redirigir al usuario a la pantalla adecuada según la respuesta del servidor
        navigate(redirectTo);
      }
    } catch (error) {
      console.error(error);
      setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-4xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Iniciar sesión</span></h2>
        <form onSubmit={handleSubmit}>
        <div className="relative z-0">
          <input type="text" id="email" 
            className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="relative z-0">
          <input type="password" id="password" 
            className="block py-5 mb-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='flex justify-center'>
          <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            Iniciar sesión
          </button>
        </div>
        {error && <p className="text-center text-red-500 text-sm mb-4">{error}</p>}
        </form>
        <p className="mt-2 text-center">
          No tienes cuenta? <Link to="/register" className="text-blue-700 text-center">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
