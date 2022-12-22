'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.hasOne(models.Markdown, { foreignKey: 'productId' });

            Product.hasMany(models.Review, { foreignKey: 'productId' });

            Product.hasMany(models.Image, { foreignKey: 'productId' });

            Product.hasOne(models.ProductOrder, { foreignKey: 'productId', as: 'imageData' });

            Product.belongsTo(models.Category, {
                foreignKey: 'catId',
            });
            Product.belongsTo(models.Brand, {
                foreignKey: 'brandId',
            });
        }
    }
    Product.init(
        {
            title: DataTypes.STRING,
            type: DataTypes.STRING,
            stock: DataTypes.INTEGER,
            unit_of_product: DataTypes.STRING,
            expiry: DataTypes.STRING,
            price: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            condition: DataTypes.STRING,
            sold: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
