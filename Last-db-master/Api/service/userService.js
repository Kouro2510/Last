const db = require('../models/index');
const bcrypt = require('bcryptjs')
const {Op} = require("sequelize");

//Check
let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};
let checkUsername = (users) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: users },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

//Api
let GetAllEmployee = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                where:{
                    [Op.or]:[
                       {role:'admin'},{role: 'employee'}
                    ]
                },
                include: [{
                    model: db.Image, attributes: ['photo'],
                },],
            });

            console.log('check user', user);

            user.forEach((item) => {
                if (item?.Image?.photo) {
                    item.Image.photo = new Buffer(item.Image.photo, 'base64').toString('binary');
                }
            });

            if (user) {
                resolve({
                    errCode: 0, data: user,
                });
            } else {
                resolve({
                    errCode: 1, errMessage: 'Cannot find user',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let CreateEmployee  = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            ///Hash password
            const salt = await bcrypt.genSalt(10);
            const hased = await bcrypt.hash(data.password, salt);

            let checkMail = await checkEmail(data.email);
            let checkUser = await checkUsername(data.username);

            if (checkMail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists',
                });
            }
           else if(checkUser===true){
                resolve({
                    errCode: 1,
                    errMessage: 'User already exists',
            });
            }
            else {
                let res = await db.User.create({
                    username:data.username,
                    email: data.email,
                    password: hased,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    role: data.role,
                });

                await db.Image.create({
                    userId: res.id,
                    photo: data.avatar,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Create user successfully!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let EditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id||!data.email||!data.firstName || !data.lastName ||!data.address|| !data.role || !data.gender || !data.phonenumber) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!',
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: true,
            });

            if (user) {
                await db.User.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phonenumber: data.phonenumber,
                        address: data.address,
                        role: data.role,
                        image: data.avatar,
                        gender: data.gender,
                    },
                    {
                        where: { id: user.id },
                    },
                );
                await db.Image.update(
                    {
                        photo: data.avatar,
                    },
                    {
                        where: { userId: user.id },
                    },
                );

                resolve({
                    errCode: 0,
                    errMessage: 'Update user successfully',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let DeleteUser = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: Id },
            });
            if (user) {
                await db.User.destroy({
                    where: { id: Id },
                });

                await db.Image.destroy({
                    where: { userId: Id },
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Deleted user!',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Cannot find user on system',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let GetUserInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (user.Image.photo) {
                user.Image.photo = new Buffer(user.Image.photo, 'base64').toString('binary');
            }

            if (user) {
                resolve({
                    errCode: 0,
                    data: user,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    GetAllEmployee,
    CreateEmployee,
    EditUser,
    DeleteUser,
    GetUserInfoById
}