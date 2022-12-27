const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(200).json({
                    errCode: 1,
                    errMessage: 'Token is not valid',
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(200).json("You're not authenticate");
    }
};



module.exports = {
    verifyToken
};
