const express = require('express');
const posts = require('../controllers/posts');

const router = express.Router();


router.get('/', posts.getPosts);
router.get('/:id', posts.getPost);
router.post('/', posts.addPost);
router.delete('/:id', posts.deletePost);
router.put('/:id', posts.updatePost);



module.exports = router;