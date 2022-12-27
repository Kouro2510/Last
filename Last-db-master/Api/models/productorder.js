'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProductOrder.belongsTo(models.Order, {
                foreignKey: 'orderId',
            });
            ProductOrder.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'imageData',
            });
        }
    }
    ProductOrder.init(
        {
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'ProductOrder',
        },
    );
    return ProductOrder;
};
