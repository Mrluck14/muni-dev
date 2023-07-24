import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegisterScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setSelectedDate] = useState(null);
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDniChange = (event) => {
    setDni(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !date ||
      !dni ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, ingresa un email válido');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
  
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('date', date);
    formData.append('dni', dni);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePicture', event.target.profilePicture.files[0]);
  
    
    try {
      const response = await axios.post('/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Usuario registrado con éxito!')
      navigate('/'); // Redireccionar a LoginScreen
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-4xl text-center font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Registrarme</span></h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Nombre"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name='lastName'
                className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Apellido"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div className="relative">
              <input
                type="text"
                id="dni"
                name='dni'
                className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="DNI"
                value={dni}
                onChange={handleDniChange}
              />
            </div>
              <div className="relative">
                <DatePicker
                  selected={date}
                  name='date'
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="block form-input py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholderText='Fecha de nacimiento'
                />
              </div>
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                id="email"
                name='email'
                className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div className="relative">
              <input
                type="password"
                id="password"
                name='password'
                className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="relative z-0">
              <input
                type="password"
                id="confirmPassword"
                name='confirmPassword'
                className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Foto de perfíl</label>
          <input className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" id="profilePicture" name="profilePicture" accept='image/*' type="file"></input>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Registrarme
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </form>
        <p className="mt-2 text-center">
          ¿Ya tienes una cuenta? <Link to="/" className="text-blue-500">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterScreen;
