const express= require ('express');
const userController = require("../controller/userController")
const authController = require("../controller/authController");
const middlewareController = require("../controller/middlewareController");
const blogController = require("../controller/blogController");
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/api/getallemployee", middlewareController.verifyToken,userController.GetAllEmployee);
    router.post("/api/registeremployee" ,middlewareController.verifyToken,userController.registerEmployee);
    router.get('/api/logout', middlewareController.verifyToken, authController.Logout);
    router.post("/api/login",authController.Login);
    router.put('/api/edituser', userController.EditUser);
    router.delete('/api/deleteuser',userController.DeleteUser);
    router.get('/api/getuserinfobyid', userController.GetUserInfoById);
    router.get("/api/getallblog",blogController.GetAllBlog);
    router.post("/api/createblog",blogController.createBlog);
    router.put('/api/editblog', blogController.EditBlog);
    router.delete('/api/deleteuser',blogController.DeleteBlog);
    router.post('/api/refreshToken', authController.RefreshToken);
    return app.use('/', router);
};

module.exports = initWebRoutes;
