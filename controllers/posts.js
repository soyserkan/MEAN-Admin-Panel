const Post = require('../models/Post');



exports.getPosts = async (req, res) => {
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

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!' });
        }
    } catch (err) {
        throw err;
    }
}

exports.addPost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        file: url + "/public/images/" + req.file.filename,
        title: req.body.title,
        category: req.body.category,
        allowComments: req.body.allowComments,
        status: req.body.status,
        body: req.body.body
    });
    try {
        const savedPost = await post.save();
        res.status(201).json({
            message: 'Posts added succesfully!',
            post: {
                ...savedPost,
                id: savedPost._id
            }
        });
    } catch (err) {
        throw err;
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Post deleted!', data: post });
    } catch (err) {
        throw err
    }
}

exports.updatePost = async (req, res) => {
    let file = req.body.file;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        file = url + "/public/images/" + req.file.filename;
    };
    const post = {
        title: req.body.title,
        status: req.body.status,
        allowComments: req.body.allowComments,
        body: req.body.body,
        category: req.body.category,
        file: file
    };
    try {
        const result = await Post.findByIdAndUpdate(req.params.id, post, { new: true, useFindAndModify: false });
        res.status(200).json({ message: 'Update successful!', data: result })
    } catch (err) {
        throw err
    }
}