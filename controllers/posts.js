
const Post = require('../models/Post');


exports.fetchAll = async (req, res) => {
    try {
        const postsData = await Post.find({});
        res.status(200).json({
            message: 'Posts fetch succesfully!',
            posts: postsData
        });
    } catch (err) {
        throw err;
    }
};
exports.addPost = async (req, res) => {
    try {
        const post = req.body;
        console.log(post);
        res.status(201).json({
            message: 'Posts added succesfully!'
        });
    } catch (err) {
        throw err;
    }
};