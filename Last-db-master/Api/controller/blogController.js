const blogService = require("../service/blogService");

const GetAllBlog= async (req, res) => {
    try {
        let response = await blogService.GetAllBlog();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const createBlog = async (req, res) => {
    try {
        let response = await blogService.CreateBlog(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const DeleteBlog = async (req, res) => {
    try {
        let response = await blogService.DeleteBlog(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const EditBlog = async (req, res) => {
    try {
        let response = await blogService.EditBlog(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const GetBlogInfoById = async (req, res) => {
    try {
        let response = await blogService.GetBlogInfoById(req.query.id);
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
    GetAllBlog,
    DeleteBlog,
    EditBlog,
    GetBlogInfoById,
    createBlog
}