// 'use strict';
// module.exports = (sequelize, DataTypes) => {
  // var User = sequelize.define('User', {
  //   username: DataTypes.STRING,
  //   first_name: DataTypes.STRING,
  //   last_name: DataTypes.STRING,
  //   email: {
  //       type: DataTypes.STRING(250),
  //       allowNull: false,
  //       unique: true,
  //     },
  //     password: {
  //       type: DataTypes.STRING(250),
  //       allowNull: false,
  //     },
  //   role: DataTypes.STRING,
  // });

  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('user', {
  
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
  
        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
  
        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
  
        username: {
            type: Sequelize.TEXT,
            allowNull: false,
          //   validate: {
          //     len: [8, 50] // must be between 8 and 50.
          //   }
        },
        
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
  
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
  
        last_login: {
            type: Sequelize.DATE
        },
  
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
  
        img_url: {
            type: Sequelize.STRING,
        },
  
    });
  
  //   User.associate = function(models) {
  //     // models.user.hasMany(models.Task);
  //      models.user.hasMany(models.message);
  
  //     models.user.belongsToMany(models.group, { 
  //         as: 'groups',
  //         through: 'GroupUsers',
  //         foreignKey: 'user_id'
  //     });
  // };
  
    return User;
  
  }
