const productService = require('../service/productService');

//Controller Brand
const createNewBrand = async (req, res) => {
    try {
        let response = await productService.createNewBrand(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllBrands = async (req, res) => {
    try {
        let response = await productService.getAllBrands();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const editBrand = async (req, res) => {
    try {
        let response = await productService.editBrand(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const DeleteBrand = async (req, res) => {
    try {
        let response = await productService.DeleteBrand(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

//Controller Category
const createNewCategory = async (req, res) => {
    try {
        let response = await productService.createNewCategory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllParentCategory = async (req, res) => {
    try {
        let limit = req.query.limit;

        let response = await productService.getAllParentCategory(limit);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllCategory = async (req, res) => {
    try {
        let limit = req.query.limit;
        console.log(typeof limit);
        let response = await productService.getAllCategory(+limit);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const getAllCategoryAdmin = async (req, res) => {
    try {
        let response = await productService.getAllCategoryAdmin();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const editCategory = async (req, res) => {
    try {
        let response = await productService.editCategory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const DeleteCategory = async (req, res) => {
    try {
        let response = await productService.DeleteCategory(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const saveDetailProduct = async (req, res) => {
    try {
        let response = await productService.saveDetailProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        let response = await productService.DeleteProduct(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        let response = await productService.getAllProduct();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const getProductByCategory = async (req, res) => {
    try {
        let data = {
            id: +req.query?.id,
            brand_id: req.query?.brand_id,
            priceA: req.query?.priceA,
            priceB: req.query?.priceB,
            action: req.query?.action,
        };
        let response = await productService.getProductByCategory(data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const getProductInfoAdminById = async (req, res) => {
    try {
        let response = await productService.getProductInfoAdminById(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const getProductInfoById = async (req, res) => {
    try {
        let response = await productService.getProductInfoById(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const SearchProduct = async (req, res) => {
    try {
        let response = await productService.SearchProduct(req.query.q);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const getAllProductHome = async (req, res) => {
    try {
        let response = await productService.getAllProductHome();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const ReviewProduct = async (req, res) => {
    try {
        let response = await productService.ReviewProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const AddProductToCart = async (req, res) => {
    if (req.body) {
        try {
            let response = await productService.AddProductToCart(req.body);
            return res.status(200).json(response);
        } catch (e) {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server...',
            });
        }
    }
};

const AddCoupon = async (req, res) => {
    if (req.body) {
        try {
            let response = await productService.AddCoupon(req.body);
            return res.status(200).json(response);
        } catch (e) {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server...',
            });
        }
    }
};
const UpdateCoupon = async (req, res) => {
    if (req.body) {
        try {
            let response = await productService.UpdateCoupon(req.body);
            return res.status(200).json(response);
        } catch (e) {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server...',
            });
        }
    }
};
const SearchCoupon = async (req, res) => {
    try {
        let response = await productService.SearchCoupon(req.query.q);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const CreateOrder = async (req, res) => {
    console.log('check:', req.body);
    try {
        let response = await productService.CreateOrder(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getTurnover = async (req, res) => {
    try {
        let response = await productService.Turnover(req.query.date);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const TurnoverMonth = async (req, res) => {
    try {
        let response = await productService.TurnoverMonth();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const TurnoverWeek = async (req, res) => {
    try {
        let response = await productService.TurnoverWeek();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
module.exports = {
    createNewBrand,
    getAllBrands,
    editBrand,
    DeleteBrand,
    createNewCategory,
    getAllCategory,
    getAllCategoryAdmin,
    editCategory,
    DeleteCategory,
    getAllParentCategory,
    saveDetailProduct,
    DeleteProduct,
    getAllProduct,
    getProductInfoAdminById,
    getProductInfoById,
    ReviewProduct,
    SearchProduct,
    getAllProductHome,
    AddProductToCart,
    AddCoupon,
    UpdateCoupon,
    SearchCoupon,
    CreateOrder,
    getProductByCategory,
    getTurnover,
    TurnoverMonth,
    TurnoverWeek,
};
