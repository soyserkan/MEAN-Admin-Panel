const express = require('express');

const posts = require('../controllers/posts');

const checkAuth = require("../middlewares/check-auth");
const fileUpload = require("../middlewares/fileUpload");

const router = express.Router();


router.get('/', checkAuth, posts.getPosts);
router.get('/:id', checkAuth, posts.getPost);
router.post('/', checkAuth, fileUpload, posts.addPost);
router.delete('/:id', checkAuth, posts.deletePost);
router.put('/:id', checkAuth, fileUpload, posts.updatePost);



module.exports = router;