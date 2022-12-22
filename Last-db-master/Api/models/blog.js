'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.hasOne(models.Image, { foreignKey: 'blogId' });
    }
  }
  Blog.init({
    Blogname: DataTypes.STRING,
    sumary: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};