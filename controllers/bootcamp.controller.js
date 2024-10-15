const { Bootcamp } = require('../models');

// Crear un bootcamp
exports.createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;
    const newBootcamp = await Bootcamp.create({ title, cue, description });
    res.status(201).json(newBootcamp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los bootcamps
exports.getAllBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll();
    res.status(200).json(bootcamps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
