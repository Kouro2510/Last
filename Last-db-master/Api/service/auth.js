const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Check
let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: username },
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
//Token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user,
        },
        process.env.JWT_ACCESS_KEY,
        {
            expiresIn: '20s',
        },
    );
};
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user,
        },
        process.env.JWT_REFRESH_KEY,
        {
            expiresIn: '365d',
        },
    );
};
//Api
let UserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExitUser=await checkUsername(username);
            if (isExitUser) {
                //user is already exits
                let user = await db.User.findOne({
                    where:  {username : username},
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'email',
                        'address',
                        'password',
                        'role',
                        'rememberToken',
                    ],
                    include: [
                        {
                            model: db.Image,
                            attributes: ['photo'],
                        },
                    ],
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        const accessToken = generateAccessToken(user.id);
                        const refreshToken = generateRefreshToken(user.id);

                        await db.User.update(
                            {
                                rememberToken: refreshToken,
                            },
                            {
                                where: { id: user.id },
                            },
                        );
                        if (user?.Image?.photo) {
                            user.Image.photo = new Buffer(user?.Image?.photo, 'base64').toString('binary');
                        }

                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                        userData.accessToken = accessToken;
                        userData.refreshToken = refreshToken;
                        delete user.rememberToken;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    (userData.errCode = 2);(userData.errMessage = 'User is not found! ');
                }
            } else {
                //return error
                (userData.errCode = 1);
                (userData.errMessage = "Your's username isn't exits in your system. Plz try other email! ");
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};
let Logout = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(
                {
                    rememberToken: null,
                },
                {
                    where: { id: id },
                },
            );

            resolve({
                errCode: 0,
                errMessage: 'Logged out!!',
            });
        } catch (e) {
            reject(e);
        }
    });
};
let RefreshToken = (refreshToken,refreshTokenOld) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { rememberToken: refreshToken },
            });
            if (!user) {
                resolve({
                    errCode: -1,
                    errMessage: 'Refresh token is not valid',
                });
            }
            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, userToken) => {
                if (err) {
                    console.log(err);
                }
                const newAccessToken = generateAccessToken(userToken);
                const newFreshToken = generateRefreshToken(userToken);

                await db.User.update(
                    {
                        rememberToken: newFreshToken,
                    },
                    {
                        where: { rememberToken: refreshTokenOld },
                    },
                );

                resolve({
                    accessToken: newAccessToken,
                    refreshToken: newFreshToken,
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    UserLogin,
    Logout,
    RefreshToken
}