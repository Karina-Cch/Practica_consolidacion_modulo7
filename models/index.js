const sequelize = require('../config/db.config');
const User = require('./user.model')(sequelize, require('sequelize').DataTypes);
const Bootcamp = require('./bootcamp.model')(sequelize, require('sequelize').DataTypes);

// Definir las relaciones
User.belongsToMany(Bootcamp, { through: 'user_bootcamp', as: 'bootcamps' });
Bootcamp.belongsToMany(User, { through: 'user_bootcamp', as: 'users' });

// Sincronizar la base
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos', err);
  });

module.exports = { sequelize, User, Bootcamp };
