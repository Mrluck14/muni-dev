const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const sequelize = require('./database');
const User = require('./models/user');
const { Op } = require('sequelize');

const app = express();
const port = 3000;

// Configuración de bodyParser para leer los datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de Multer para el almacenamiento de la foto de perfil
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'client/public/uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, 'profilePicture-' + uniqueSuffix + ext);
    }
  })
});

// Configuración para servir la aplicación React
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Sincronizar el modelo User con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos:', error);
  });

  app.post('/register', upload.single('profilePicture'), async (req, res) => {
    // Verificar si se adjuntó un archivo
    if (!req.file) {
      res.status(400).send('No se adjuntó ningún archivo');
      return;
    }
  
    // Obtener los datos del formulario y el archivo adjunto
    const { firstName, lastName, date, dni, email, password } = req.body;
    const profilePicture = req.file.filename;

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear un nuevo usuario en la base de datos
  try {
    await User.create({
      nombre: firstName,
      apellido: lastName,
      fechaNacimiento: date,
      dni,
      email,
      contraseña: hashedPassword,
      fotoPerfil: req.file.filename
    });

    res.send('Usuario registrado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar el usuario');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ where: { email } });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (user && await bcrypt.compare(password, user.contraseña)) {
      // Verificar el valor del campo "isActive" para determinar si la cuenta está activa
      if (user.activo) {
        // Si el usuario está activo, redirigir a la pantalla adecuada
        if (user.admin === true) {
          res.json({ redirectTo: '/admin', activo: true });
        } else {
          res.json({ redirectTo: '/public', activo: true });
        }
      } else {
        // Si la cuenta está desactivada, enviar un mensaje de error
        res.json({ error: 'La cuenta está desactivada. Por favor, contacta al administrador.', activo: false });
      }
    } else {
      // Credenciales inválidas
      res.json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.get('/api/users', async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'apellido', 'fechaNacimiento', 'dni', 'email', 'fotoPerfil', 'admin', 'activo']
    });

    const usersWithBooleanActivo = users.map(user => ({
      ...user.toJSON(),
      activo: !!user.activo, // Convertir a valor booleano (true o false)
    }));

    res.json(usersWithBooleanActivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }

});

app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Obtener datos del usuario desde la base de datos según el userId
    const user = await User.findByPk(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { nombre, apellido, email, activo } = req.body;

  try {
    // Buscar el usuario por el ID en la base de datos
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario con los nuevos valores
    user.nombre = nombre;
    user.apellido = apellido;
    user.email = email;
    user.activo = activo;

    // Guardar los cambios en la base de datos
    await user.save();

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
