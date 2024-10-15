module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define('Bootcamp', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Bootcamp;
};
