module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define(
      'Course'
             course_name: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true
            },
            tutors: {
            tutor: DataTypes.STRING,
              allowNull: false,
              unique: true
            },
            categorrye: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true
            })

    return Course;
  };
  