const userService = require("../service/userService");


const GetAllEmployee = async (req, res) => {
    try {
        let response = await userService.GetAllEmployee();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const registerEmployee = async (req, res) => {
    try {
        let response = await userService.CreateEmployee(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const EditUser = async (req, res) => {
    try {
        let response = await userService.EditUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const DeleteUser = async (req, res) => {
    try {
        let response = await userService.DeleteUser(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const GetUserInfoById = async (req, res) => {
    try {
        let response = await userService.GetUserInfoById(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
module.exports = {
    GetAllEmployee,
    registerEmployee,
    EditUser,
    DeleteUser,
    GetUserInfoById
}