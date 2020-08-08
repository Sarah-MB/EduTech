module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
      'Admin',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: DataTypes.INTEGER,
        },
        last_name: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        username: DataTypes.STRING,
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        paranoid: true,
        underscored: true,
      },
    );
    Admin.associate = ((models) => {
      Admin.belongsTo(models.User, { foreignKey: 'user_id' });
    });
    return Admin;
  };
  