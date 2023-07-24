import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // asegúrate de haber instalado react-redux
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import PublicScreen from './screens/publicScreen';
import AdminScreen from './screens/adminScreen';
import './styles.css';
import 'flowbite';
import UserDetailScreen from './screens/userDetailScreen';


function App() {

  const user = useSelector(state => state.user); 

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/public" element={<PublicScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/user/:userId" element={<UserDetailScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;