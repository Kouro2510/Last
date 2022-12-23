'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.Image, {
                foreignKey: 'userId'
            });
            // User.belongsTo(models.Allcode, {
            //     foreignKey: 'positionId',
            //     targetKey: 'key',
            //     as: 'positionData',
            // });
            // User.belongsTo(models.Allcode, {
            //     foreignKey: 'gender',
            //     targetKey: 'key',
            //     as: 'genderData',
            // });
            User.hasMany(models.Order,{
                foreignKey: 'userId'
            });
            User.hasOne(models.Markdown, { foreignKey: 'userId' });
            User.hasOne(models.Review, {
                foreignKey: 'userId',
            });
        }
    }

    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        address: DataTypes.STRING,
        gender:DataTypes.STRING,
        role: DataTypes.STRING,
        rememberToken: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'User',
    });
    return User;
};