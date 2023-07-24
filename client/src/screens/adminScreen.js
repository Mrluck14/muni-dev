import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AdminScreen() {
    const [users, setUsers] = useState([]);
    const [filterDNI, setFilterDNI] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      // Fetch user data from the backend API
      const fetchUsers = async () => {
        try {
          const response = await axios.get('/api/users'); // Make a GET request to the endpoint /api/users
          setUsers(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUsers();
    }, []);

    const handleFilterChange = (event) => {
        setFilterDNI(event.target.value);
      };
    
      // Filtrar los usuarios por número de DNI
      const filteredUsers = users.filter((user) =>
        user.dni.includes(filterDNI)
      );

      const handleLogout = () => {
        navigate('/');
      };
    
  
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-4">
        <div>
            <button onClick={handleLogout} id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span class="sr-only">Cerrar sesión</span>
                Cerrar sesión
            </button>
        </div>
        <label for="table-search" class="sr-only">Buscar por DNI</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" value={filterDNI} onChange={handleFilterChange} id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por DNI"/>
        </div>
    </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Usuario
                    </th>
                    <th scope="col" class="px-6 py-3">
                        DNI
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Estado
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Editar
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    
                    <img className="w-10 h-10 rounded-full" src={`/uploads/${user.fotoPerfil}`} alt={`${user.nombre} ${user.apellido}`} />
                    <div className="pl-3">
                        <div className="text-base font-semibold">{`${user.nombre} ${user.apellido}`}</div>
                        <div className="font-normal text-gray-500">{user.email}</div>
                    </div>
                    </th>
                    
                    <td className="px-6 py-4">{user.dni}</td>
                    <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${user.activo ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                        {user.activo ? 'Activado' : 'Desactivado'}
                    </div>
                    </td>
                    <td className="px-6 py-4">
                        <Link to={`/user/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</Link>
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    export default AdminScreen;