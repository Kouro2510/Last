const express= require ('express');
const userController = require("../controller/userController")
const authController = require("../controller/authController");
const middlewareController = require("../controller/middlewareController");
const blogController = require("../controller/blogController");
const productController = require("../controller/productController");
let router = express.Router();

let initWebRoutes = (app) => {
    //users
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
    //Product

    //Api product

    //Brands product
    router.post(
        '/api/createNewBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.createNewBrand,
    );
    router.get(
        '/api/getAllBrands',
        // middlewareController.verifyToken,
        // middlewareController.verifyTokenAndAdminAuth,
        productController.getAllBrands,
    );
    router.put(
        '/api/editBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.editBrand,
    );
    router.delete(
        '/api/deleteBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.DeleteBrand,
    );

    //Category API
    router.post(
        '/api/createNewCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.createNewCategory,
    );
    router.get(
        '/api/getAllCategoryAdmin',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.getAllCategoryAdmin,
    );

    router.get('/api/getAllParentCategory', productController.getAllParentCategory);
    router.put(
        '/api/editCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.editCategory,
    );
    router.delete(
        '/api/deleteCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.DeleteCategory,
    );

    //Product API
    router.post(
        '/api/createNewProduct',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.saveDetailProduct,
    );
    router.delete(
        '/api/deleteProduct',

        productController.DeleteProduct,
    );
    router.get(
        '/api/getAllProduct',

        productController.getAllProduct,
    );
    router.get(
        '/api/getAllProductHome',

        productController.getAllProductHome,
    );
    router.get(
        '/api/getProductInfoAdminById',

        productController.getProductInfoAdminById,
    );
    router.get(
        '/api/getProductInfoById',

        productController.getProductInfoById,
    );
    router.post(
        '/api/ReviewProduct',

        productController.ReviewProduct,
    );
    router.post('/api/add-product-to-cart', productController.AddProductToCart);
    //coupon
    router.post('/api/add-coupon', productController.AddCoupon);
    router.put('/api/update-coupon', productController.UpdateCoupon);
    router.get('/api/search-coupon', productController.SearchCoupon);

    router.get('/api/getTurnover', productController.getTurnover);
    router.get('/api/getTurnoverWeek', productController.TurnoverWeek);

    router.get('/api/getTurnoverMonth', productController.TurnoverMonth);
    //customer

    router.get(
        '/api/getAllCategory',

        productController.getAllCategory,
    );
    router.get(
        '/api/getProductByCategory',

        productController.getProductByCategory,
    );
    
    return app.use('/', router);
};

module.exports = initWebRoutes;
