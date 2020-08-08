'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    role: DataTypes.STRING,
  });

  User.associate = function(models) {
    models.User.hasMany(models.Task);
  };

  return User;
};
