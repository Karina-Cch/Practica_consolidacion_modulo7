const express = require('express');
const bodyParser = require('body-parser');
const { User, Bootcamp, sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());
// consultar un Bootcamp por ID, incluyendo los usuarios
app.get('/bootcamps/:id', async (req, res) => {
  try {
    const bootcampId = req.params.id;
    const bootcamp = await Bootcamp.findOne({
      where: { id: bootcampId },
      include: {
        model: User,
        as: 'users',
        attributes: ['id', 'firstName', 'lastName', 'email']
      }
    });

    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp no encontrado' });
    }

    res.json(bootcamp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//listar todos los Bootcamps con sus usuarios
app.get('/bootcamps', async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: {
        model: User,
        as: 'users',
        attributes: ['id', 'firstName', 'lastName', 'email']
      }
    });

    res.json(bootcamps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//consultar un usuario por ID, incluyendo los Bootcamps
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Bootcamp,
        as: 'bootcamps',
        attributes: ['id', 'title', 'cue', 'description']
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//listar todos los usuarios con sus Bootcamps
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Bootcamp,
        as: 'bootcamps',
        attributes: ['id', 'title', 'cue', 'description']
      }
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar un usuario por ID
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;

    const [updated] = await User.update({ firstName, lastName, email }, {
      where: { id: userId }
    });

    if (updated) {
      const updatedUser = await User.findOne({ where: { id: userId } });
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//eliminar un usuario por ID
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({
      where: { id: userId }
    });

    if (deleted) {
      res.json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//sincronizar la base de datos
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada');

    app.listen(3000, () => {
      console.log('Servidor corriendo en el puerto 3000');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();


/* Consultas:
-Consultando el Bootcamp por id, incluyendo los usuarios. --> curl http://localhost:3000/bootcamps/1
-Listar todos los Bootcamp con sus usuarios. --> curl http://localhost:3000/bootcamps
-Consultar un usuario por id, incluyendo los Bootcamp. --> curl http://localhost:3000/users/2 
-Listar los usuarios con sus Bootcamp. --> curl http://localhost:3000/users
-Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro
Sánchez. curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"firstName": "Pedro", "lastName": "Sánchez", "email": "pedro.sanchez@correo.com"}'
-Eliminar un usuario por id; por ejemplo: el usuario con id=1 --> curl -X DELETE http://localhost:3000/users/1
  (ya elimine al user con id 1, por eso aparece {"message":"Usuario no encontrado"}) */
 