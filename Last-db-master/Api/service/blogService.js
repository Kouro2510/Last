const db = require('../models/index');

let checkBlogName = (blogs) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.Blog.findOne({
                where: { Blogname: blogs },
            });
            if (blog) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};
let GetAllBlog = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let Blog = await db.Blog.findAll({
                include: [{
                    model: db.Image, attributes: ['photo'],
                },],
            });

            console.log('check Blog', Blog);

            Blog.forEach((item) => {
                if (item?.Image?.photo) {
                    item.Image.photo = new Buffer(item.Image.photo, 'base64').toString('binary');
                }
            });

            if (Blog) {
                resolve({
                    errCode: 0, data: Blog,
                });
            } else {
                resolve({
                    errCode: 1, errMessage: 'Cannot find Blog',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let CreateBlog  = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            ///Hash password
            let checkBlog = await checkBlogName(data.Blogname);
            if(checkBlog===true){
                resolve({
                    errCode: 1,
                    errMessage: 'Blog already exists',
                });
            }
            else {
                let res = await db.Blog.create({
                    Blogname:data.Blogname,
                    sumary: data.sumary,
                    title: data.title,
                });

                await db.Image.create({
                    BlogId: res.id,
                    photo: data.avatar,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Create Blog successfully!',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let EditBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!',
                });
            }

            let Blog = await db.Blog.findOne({
                where: { id: data.id },
                raw: true,
            });

            if (Blog) {
                await db.Blog.update(
                    {
                        Blogname:data.Blogname,
                        sumary: data.sumary,
                        title: data.title,
                    },
                    {
                        where: { id: Blog.id },
                    },
                );
                await db.Image.update(
                    {
                        photo: data.avatar,
                    },
                    {
                        where: { BlogId: Blog.id },
                    },
                );

                resolve({
                    errCode: 0,
                    errMessage: 'Update Blog successfully',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Blog not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let DeleteBlog = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Blog = await db.Blog.findOne({
                where: { id: Id },
            });
            if (Blog) {
                await db.Blog.destroy({
                    where: { id: Id },
                });

                await db.Image.destroy({
                    where: { BlogId: Id },
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Deleted Blog!',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Cannot find Blog on system',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let GetBlogInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Blog = await db.Blog.findOne({
                where: { id: id },
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (Blog.Image.photo) {
                Blog.Image.photo = new Buffer(Blog.Image.photo, 'base64').toString('binary');
            }

            if (Blog) {
                resolve({
                    errCode: 0,
                    data: Blog,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    GetAllBlog,
    CreateBlog,
    EditBlog,
    DeleteBlog,
    GetBlogInfoById
}