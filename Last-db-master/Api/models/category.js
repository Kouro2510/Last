'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Category.hasMany(models.Product, {
                foreignKey: 'catId',
            });
            Category.hasOne(models.Image, {
                foreignKey: 'catId',
            });
        }
    }
    Category.init(
        {
            title: DataTypes.STRING,
            summary: DataTypes.STRING,
            isParent: DataTypes.BOOLEAN,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Category',
        },
    );
    return Category;
};
