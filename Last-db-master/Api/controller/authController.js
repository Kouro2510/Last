const authService = require("../service/auth");

const Login = async (req, res) => {
    try {
        let response = await authService.UserLogin(req.body.username, req.body.password);

        res.cookie('refreshToken', response.refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            user: response.user,
            accessToken: response.accessToken,
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const RefreshToken = async (req, res) => {
    let refreshToken = req.cookies.refreshToken;
    let refreshTokenOld = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json("You're not authenticate");

    let verifyRefreshToken = await authService.RefreshToken(refreshToken,refreshTokenOld);

    res.cookie('refreshToken', verifyRefreshToken.refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
    });
    return res.status(200).json({ accessToken: verifyRefreshToken.accessToken });
    // return res.status(200).json(refreshToken);
};

const Logout = async (req, res) => {
    await res.clearCookie('refreshToken');
    let response = await authService.Logout(req.query.id);

    return res.status(200).json(response);
};
module.exports = {
    Login,
    Logout,
    RefreshToken
}