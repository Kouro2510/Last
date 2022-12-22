'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Brand.hasOne(models.Image, { foreignKey: 'brandId' });

            Brand.hasMany(models.Product, {foreignKey: 'brandId',});
        }
    }
    Brand.init(
        {
            title: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Brand',
        },
    );
    return Brand;
};
