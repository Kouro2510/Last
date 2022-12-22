'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Markdown.belongsTo(models.Product, { foreignKey: 'productId' });

            Markdown.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    Markdown.init(
        {
            descriptionHtml: DataTypes.STRING,
            specificationHtml: DataTypes.STRING,
            featureHtml: DataTypes.STRING,
            assignHtml: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Markdown',
        },
    );
    return Markdown;
};
