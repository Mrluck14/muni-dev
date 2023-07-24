const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('muni', 'root', 'Lucas_15585577', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

module.exports = sequelize;