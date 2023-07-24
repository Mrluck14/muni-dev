import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDetailScreen() {
  const { userId } = useParams(); // Obtener el id del usuario de los parámetros de la URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data for the specific user from the backend API
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`); // Make a GET request to the endpoint /api/users/:userId
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]); // Vuelve a cargar los datos del usuario cuando cambia el userId en los parámetros de la URL

  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleEditUser = async () => {
    try {
      await axios.put(`/api/users/${userId}`, user);

      alert('Usuario editado con éxito!')

      navigate(-1); 

    } catch (error) {
      console.error(error);
      // Optional: Show an error message or handle errors
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-5 px-5 py-5">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`/uploads/${user.fotoPerfil}`} alt={`${user.nombre} ${user.apellido}`} />
          <form encType="multipart/form-data">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <input type="text" id="nombre" value={user.nombre} onChange={(e) => setUser({ ...user, nombre: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <input type="text" id="apellido" value={user.apellido} onChange={(e) => setUser({ ...user, apellido: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
            </div>
            <div class="mb-6">
              <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
              <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" checked={user.activo} onChange={(e) => setUser({ ...user, activo: e.target.checked })} className="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Activar</span>
              </label>
              <div class="grid gap-6 mb-6 mt-3 md:grid-cols-2 mt-5">
              <button type="button" onClick={handleEditUser} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar</button>
              <Link to="/admin" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Cancelar</Link>
              </div>
          </form>
          </div>
        </div>
      </div>
  );
}

export default UserDetailScreen;
