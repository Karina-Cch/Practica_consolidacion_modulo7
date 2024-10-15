const { User } = require('../models');

// Crear el usuario
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const newUser = await User.create({ firstName, lastName, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
