'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userId'
      })
    }
  }
  link.init({
    uniqid: DataTypes.STRING,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    vlog: DataTypes.STRING,
    galery: DataTypes.STRING,
    contact: DataTypes.STRING,
    about: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    youtube: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    phone: DataTypes.STRING,
    web: DataTypes.STRING,
    lazada: DataTypes.STRING,
    photo: DataTypes.STRING,
    view: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'link',
  });
  return link;
};